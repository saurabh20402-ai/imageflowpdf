'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Download, RotateCcw, Loader2, Type, Layers, ImageIcon, LayoutTemplate,
  Plus, Trash2, Undo2, Redo2, ArrowUp, ArrowDown, Sparkles, Shapes, Eraser, Save,
} from 'lucide-react';
import FileUploader from '@/components/FileUploader';
import { loadImage, canvasToBlob, removeSolidBackground, loadImageFromDataUrl } from '@/lib/image-processor';
import { downloadBlob } from '@/lib/download';
import { formatBytes } from '@/lib/utils';
import { toast } from 'sonner';
import { THUMBNAIL_FONTS, loadGoogleFont, preloadThumbnailFonts } from '@/lib/thumbnail-fonts';
import { renderThumbnail, hitTestElement, fitImageToCanvas, fitSubjectLayer, measureTextElement } from '@/lib/thumbnail-renderer';
import {
  PLATFORMS, BG_GRADIENTS, STICKERS, BADGES, TEMPLATES, TEXT_PRESETS,
  createTextLayer, createSticker, createBadge, createShape, createImageLayer,
  scaleTemplateElements,
} from '@/lib/thumbnail-templates';
import { buildDraftPayload, saveDraft, loadDraftRaw, clearDraft } from '@/lib/thumbnail-project-storage';

const TABS = [
  { id: 'templates', label: 'Templates', icon: LayoutTemplate },
  { id: 'background', label: 'Background', icon: ImageIcon },
  { id: 'text', label: 'Text', icon: Type },
  { id: 'stickers', label: 'Stickers', icon: Sparkles },
  { id: 'shapes', label: 'Shapes', icon: Shapes },
];

export default function ThumbnailCreatorTool() {
  const [platformId, setPlatformId] = useState('youtube');
  const platform = PLATFORMS.find((p) => p.id === platformId) || PLATFORMS[0];
  const [canvasW, setCanvasW] = useState(platform.w);
  const [canvasH, setCanvasH] = useState(platform.h);

  const [bgType, setBgType] = useState('gradient');
  const [bgColor, setBgColor] = useState('#1a1a2e');
  const [bgGradient, setBgGradient] = useState(BG_GRADIENTS[2].colors);
  const [bgImage, setBgImage] = useState(null);
  const [bgFile, setBgFile] = useState(null);
  const [bgScale, setBgScale] = useState(1);
  const [bgX, setBgX] = useState(0);
  const [bgY, setBgY] = useState(0);
  const [bgBrightness, setBgBrightness] = useState(100);
  const [bgContrast, setBgContrast] = useState(100);
  const [bgOverlayOpacity, setBgOverlayOpacity] = useState(35);
  const [bgFit, setBgFit] = useState('cover');
  const [removeBgColor, setRemoveBgColor] = useState('#ffffff');
  const [removeBgTolerance, setRemoveBgTolerance] = useState(35);
  const [processingSubject, setProcessingSubject] = useState(false);
  const [subjectSource, setSubjectSource] = useState(null);
  const [draftRestored, setDraftRestored] = useState(false);

  const [elements, setElements] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [activeTab, setActiveTab] = useState('templates');
  const [exporting, setExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState('png');
  const [started, setStarted] = useState(false);

  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const dragRef = useRef(null);
  const [displayScale, setDisplayScale] = useState(1);

  const selected = elements.find((e) => e.id === selectedId);

  const pushHistory = useCallback((nextElements) => {
    setHistory((prev) => {
      const trimmed = prev.slice(0, historyIndex + 1);
      return [...trimmed, JSON.parse(JSON.stringify(nextElements))].slice(-30);
    });
    setHistoryIndex((i) => Math.min(i + 1, 29));
  }, [historyIndex]);

  const setElementsWithHistory = useCallback((updater) => {
    setElements((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      pushHistory(next);
      return next;
    });
  }, [pushHistory]);

  const undo = () => {
    if (historyIndex <= 0) return;
    const idx = historyIndex - 1;
    setHistoryIndex(idx);
    setElements(JSON.parse(JSON.stringify(history[idx])));
    setSelectedId(null);
  };

  const redo = () => {
    if (historyIndex >= history.length - 1) return;
    const idx = historyIndex + 1;
    setHistoryIndex(idx);
    setElements(JSON.parse(JSON.stringify(history[idx])));
    setSelectedId(null);
  };

  useEffect(() => {
    preloadThumbnailFonts();
  }, []);

  useEffect(() => {
    if (draftRestored) return;
    const raw = loadDraftRaw();
    if (!raw?.elements?.length) return;
    (async () => {
      try {
        const elements = await Promise.all(
          raw.elements.map(async (el) => {
            if (el.type === 'image' && el.imageDataUrl) {
              const image = await loadImageFromDataUrl(el.imageDataUrl);
              const { imageDataUrl, ...rest } = el;
              return { ...rest, image };
            }
            return el;
          })
        );
        let restoredBg = null;
        if (raw.bgImageDataUrl) {
          restoredBg = await loadImageFromDataUrl(raw.bgImageDataUrl);
        }
        setPlatformId(raw.platformId || 'youtube');
        setCanvasW(raw.canvasW || 1280);
        setCanvasH(raw.canvasH || 720);
        setBgType(raw.bgType || 'gradient');
        setBgColor(raw.bgColor || '#1a1a2e');
        setBgGradient(raw.bgGradient || BG_GRADIENTS[2].colors);
        setBgScale(raw.bgScale ?? 1);
        setBgX(raw.bgX ?? 0);
        setBgY(raw.bgY ?? 0);
        setBgBrightness(raw.bgBrightness ?? 100);
        setBgContrast(raw.bgContrast ?? 100);
        setBgOverlayOpacity(raw.bgOverlayOpacity ?? 35);
        setBgFit(raw.bgFit || 'cover');
        if (restoredBg) {
          setBgImage(restoredBg);
          setBgType('image');
        }
        setElements(elements);
        setHistory([JSON.parse(JSON.stringify(elements))]);
        setHistoryIndex(0);
        setStarted(true);
        setDraftRestored(true);
        toast.success('Restored your last thumbnail draft');
      } catch {
        /* ignore corrupt draft */
      }
    })();
  }, [draftRestored]);

  useEffect(() => {
    if (!started) return;
    const timer = setTimeout(async () => {
      const payload = await buildDraftPayload(
        {
          platformId, canvasW, canvasH, bgType, bgColor, bgGradient,
          bgScale, bgX, bgY, bgBrightness, bgContrast, bgOverlayOpacity, bgFit,
        },
        elements,
        bgImage
      );
      saveDraft(payload);
    }, 800);
    return () => clearTimeout(timer);
  }, [started, platformId, canvasW, canvasH, bgType, bgColor, bgGradient, bgScale, bgX, bgY, bgBrightness, bgContrast, bgOverlayOpacity, bgFit, elements, bgImage]);

  const getBackground = useCallback(() => {
    if (bgType === 'image' && bgImage) {
      return {
        type: 'image',
        image: bgImage,
        scale: bgScale,
        x: bgX,
        y: bgY,
        brightness: bgBrightness,
        contrast: bgContrast,
        overlay: bgOverlayOpacity > 0 ? `rgba(0,0,0,${bgOverlayOpacity / 100})` : null,
        fit: bgFit,
      };
    }
    if (bgType === 'gradient') {
      return { type: 'gradient', colors: bgGradient };
    }
    return { type: 'color', color: bgColor };
  }, [bgType, bgImage, bgScale, bgX, bgY, bgBrightness, bgContrast, bgOverlayOpacity, bgGradient, bgColor, bgFit]);

  const paintCanvas = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const fonts = new Set(
      elements.filter((e) => e.type === 'text').map((e) => e.fontFamily)
    );
    await Promise.all([...fonts].map(loadGoogleFont));
    await new Promise((r) => setTimeout(r, 50));

    const rendered = renderThumbnail({
      width: canvasW,
      height: canvasH,
      background: getBackground(),
      elements,
    });

    const ctx = canvas.getContext('2d');
    canvas.width = canvasW;
    canvas.height = canvasH;
    ctx.drawImage(rendered, 0, 0);

    if (selectedId) {
      const sel = elements.find((e) => e.id === selectedId);
      if (sel) {
        ctx.save();
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 4]);
        if (sel.type === 'text') {
          const { width, height } = measureTextElement(ctx, sel);
          let left = sel.x;
          if (sel.align === 'center') left = sel.x - width / 2;
          if (sel.align === 'right') left = sel.x - width;
          ctx.strokeRect(left - 4, sel.y - 4, width + 8, height + 8);
        } else if (sel.type === 'shape') {
          ctx.strokeRect(sel.x - 2, sel.y - 2, sel.w + 4, sel.h + 4);
        } else if (sel.type === 'image' && sel.image) {
          const w = sel.image.naturalWidth * (sel.scale ?? 1);
          const h = sel.image.naturalHeight * (sel.scale ?? 1);
          ctx.strokeRect(sel.x - 2, sel.y - 2, w + 4, h + 4);
        } else {
          const size = sel.badge ? sel.fontSize * 2 : (sel.size || 48);
          ctx.strokeRect(sel.x - 2, sel.y - 2, size + 4, size + 4);
        }
        ctx.restore();
      }
    }
  }, [canvasW, canvasH, elements, getBackground, selectedId]);

  useEffect(() => {
    paintCanvas();
  }, [paintCanvas]);

  useEffect(() => {
    const updateScale = () => {
      if (!wrapRef.current) return;
      const maxW = wrapRef.current.clientWidth;
      setDisplayScale(Math.min(1, maxW / canvasW));
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [canvasW, canvasH]);

  const startBlank = () => {
    const initial = [createTextLayer({ text: 'YOUR TITLE HERE', x: 80, y: Math.round(canvasH * 0.38) })];
    setElements(initial);
    setHistory([JSON.parse(JSON.stringify(initial))]);
    setHistoryIndex(0);
    setStarted(true);
    setActiveTab('background');
  };

  const applyTemplate = (tpl) => {
    const bg = tpl.background;
    if (bg.type === 'gradient') {
      setBgType('gradient');
      setBgGradient(bg.colors);
    } else if (bg.type === 'color') {
      setBgType('color');
      setBgColor(bg.color);
    }
    const scaled = scaleTemplateElements(tpl.elements, 1280, 720, canvasW, canvasH);
    setElements(scaled);
    setHistory([JSON.parse(JSON.stringify(scaled))]);
    setHistoryIndex(0);
    setStarted(true);
    setSelectedId(scaled[0]?.id || null);
    toast.success(`Applied "${tpl.name}" template`);
  };

  const onBgImageSelected = useCallback(async (files) => {
    const f = files[0];
    try {
      const img = await loadImage(f);
      const fit = fitImageToCanvas(img, canvasW, canvasH, 'cover');
      setBgFile(f);
      setBgImage(img);
      setBgType('image');
      setBgFit('cover');
      setBgScale(fit.scale);
      setBgX(fit.x);
      setBgY(fit.y);
      setStarted(true);
      if (elements.length === 0) {
        const initial = [createTextLayer({ text: 'YOUR TITLE', x: 80, y: Math.round(canvasH * 0.38) })];
        setElements(initial);
        setHistory([JSON.parse(JSON.stringify(initial))]);
        setHistoryIndex(0);
      }
      toast.success('Background image added');
    } catch {
      toast.error('Failed to load image');
    }
  }, [canvasW, canvasH, elements.length]);

  const onSubjectSelected = useCallback(async (files) => {
    const f = files[0];
    try {
      const img = await loadImage(f);
      setSubjectSource(img);
      toast.success('Subject loaded — remove background or add as layer');
    } catch {
      toast.error('Failed to load subject');
    }
  }, []);

  const addSubjectLayer = useCallback(async (cutout = false) => {
    if (!subjectSource) return;
    setProcessingSubject(true);
    try {
      let img = subjectSource;
      if (cutout) {
        const cutCanvas = removeSolidBackground(subjectSource, removeBgColor, removeBgTolerance);
        img = await loadImageFromDataUrl(cutCanvas.toDataURL('image/png'));
      }
      const pos = fitSubjectLayer(img, canvasW, canvasH);
      const el = createImageLayer(img, { ...pos, zIndex: 25 });
      setElementsWithHistory((prev) => [...prev, el]);
      setSelectedId(el.id);
      setStarted(true);
      toast.success(cutout ? 'Cutout added as layer' : 'Photo added as layer');
    } catch (err) {
      toast.error('Failed: ' + err.message);
    } finally {
      setProcessingSubject(false);
    }
  }, [subjectSource, removeBgColor, removeBgTolerance, canvasW, canvasH, setElementsWithHistory]);

  const changePlatform = (p) => {
    setPlatformId(p.id);
    setCanvasW(p.w);
    setCanvasH(p.h);
    if (bgImage) {
      const fit = fitImageToCanvas(bgImage, p.w, p.h, 'cover');
      setBgScale(fit.scale);
      setBgX(fit.x);
      setBgY(fit.y);
    }
    setElements((prev) =>
      scaleTemplateElements(prev, canvasW, canvasH, p.w, p.h)
    );
    toast.success(`Canvas: ${p.label} (${p.w}×${p.h})`);
  };

  const updateElement = (id, patch) => {
    setElementsWithHistory((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...patch } : e))
    );
  };

  const deleteSelected = () => {
    if (!selectedId) return;
    setElementsWithHistory((prev) => prev.filter((e) => e.id !== selectedId));
    setSelectedId(null);
  };

  const moveLayer = (dir) => {
    if (!selectedId) return;
    setElementsWithHistory((prev) => {
      const sorted = [...prev].sort((a, b) => a.zIndex - b.zIndex);
      const idx = sorted.findIndex((e) => e.id === selectedId);
      if (idx < 0) return prev;
      const swap = dir === 'up' ? idx + 1 : idx - 1;
      if (swap < 0 || swap >= sorted.length) return prev;
      const a = sorted[idx];
      const b = sorted[swap];
      return prev.map((e) => {
        if (e.id === a.id) return { ...e, zIndex: b.zIndex };
        if (e.id === b.id) return { ...e, zIndex: a.zIndex };
        return e;
      });
    });
  };

  const canvasToLocal = (clientX, clientY) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((clientX - rect.left) / rect.width) * canvasW,
      y: ((clientY - rect.top) / rect.height) * canvasH,
    };
  };

  const handleCanvasPointerDown = (e) => {
    const { x, y } = canvasToLocal(e.clientX, e.clientY);
    const sorted = [...elements].sort((a, b) => b.zIndex - a.zIndex);
    const measureCanvas = renderThumbnail({
      width: canvasW,
      height: canvasH,
      background: { type: 'color', color: '#000' },
      elements: [],
    });
    const mctx = measureCanvas.getContext('2d');

    for (const el of sorted) {
      if (hitTestElement(mctx, el, x, y)) {
        setSelectedId(el.id);
        dragRef.current = { id: el.id, startX: x, startY: y, origX: el.x, origY: el.y };
        return;
      }
    }
    setSelectedId(null);
  };

  const handleCanvasPointerMove = (e) => {
    if (!dragRef.current) return;
    const { x, y } = canvasToLocal(e.clientX, e.clientY);
    const dx = x - dragRef.current.startX;
    const dy = y - dragRef.current.startY;
    setElements((prev) =>
      prev.map((el) =>
        el.id === dragRef.current.id
          ? { ...el, x: dragRef.current.origX + dx, y: dragRef.current.origY + dy }
          : el
      )
    );
  };

  const handleCanvasPointerUp = () => {
    if (dragRef.current) {
      pushHistory(elements);
      dragRef.current = null;
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const fonts = new Set(elements.filter((e) => e.type === 'text').map((e) => e.fontFamily));
      await Promise.all([...fonts].map(loadGoogleFont));
      await new Promise((r) => setTimeout(r, 100));
      const canvas = renderThumbnail({
        width: canvasW,
        height: canvasH,
        background: getBackground(),
        elements,
      });
      const mime = exportFormat === 'jpg' ? 'image/jpeg' : 'image/png';
      const blob = await canvasToBlob(canvas, mime, exportFormat === 'jpg' ? 0.92 : 0.95);
      downloadBlob(blob, `thumbnail-${canvasW}x${canvasH}.${exportFormat}`);
      toast.success(`Downloaded ${formatBytes(blob.size)}`);
    } catch (err) {
      toast.error('Export failed: ' + err.message);
    } finally {
      setExporting(false);
    }
  };

  const reset = () => {
    setStarted(false);
    setElements([]);
    setSelectedId(null);
    setBgImage(null);
    setBgFile(null);
    setSubjectSource(null);
    setHistory([]);
    setHistoryIndex(-1);
    setBgType('gradient');
    setBgGradient(BG_GRADIENTS[2].colors);
    setBgFit('cover');
    clearDraft();
  };

  const applyTextPreset = (preset) => {
    if (selected?.type === 'text') {
      updateElement(selected.id, preset.patch);
      loadGoogleFont(preset.patch.fontFamily || selected.fontFamily);
    } else {
      const el = createTextLayer({
        y: Math.round(canvasH * 0.35),
        x: preset.patch.align === 'center' ? Math.round(canvasW / 2) : 80,
        ...preset.patch,
      });
      setElementsWithHistory((prev) => [...prev, el]);
      setSelectedId(el.id);
      if (preset.patch.fontFamily) loadGoogleFont(preset.patch.fontFamily);
    }
  };

  if (!started) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div className="card" style={{ padding: 20 }}>
          <p style={{ fontSize: 14, color: 'var(--body)', marginBottom: 16, lineHeight: 1.7 }}>
            Design click-worthy thumbnails with text, stickers, shapes, and templates.
            All editing happens in your browser — no signup required.
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
            {PLATFORMS.map((p) => (
              <button
                key={p.id}
                type="button"
                className={`pill ${platformId === p.id ? 'pill-active' : ''}`}
                onClick={() => { setPlatformId(p.id); setCanvasW(p.w); setCanvasH(p.h); }}
                style={{ fontSize: 12 }}
              >
                {p.label}
                <span style={{ opacity: 0.7, marginLeft: 4 }}>{p.w}×{p.h}</span>
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          <button type="button" onClick={startBlank} className="card" style={{ cursor: 'pointer', textAlign: 'left', border: '2px dashed var(--hairline)' }}>
            <LayoutTemplate size={28} color="var(--primary)" style={{ marginBottom: 12 }} />
            <strong style={{ display: 'block', color: 'var(--ink)', marginBottom: 6 }}>Start from blank</strong>
            <span style={{ fontSize: 13, color: 'var(--muted)' }}>Empty canvas with a title text layer</span>
          </button>
          {TEMPLATES.slice(0, 5).map((tpl) => (
            <button
              key={tpl.id}
              type="button"
              onClick={() => applyTemplate(tpl)}
              className="card"
              style={{ cursor: 'pointer', textAlign: 'left' }}
            >
              <div style={{
                height: 72, borderRadius: 10, marginBottom: 12,
                background: `linear-gradient(135deg, ${tpl.background.colors?.join(', ') || '#333'})`,
              }} />
              <strong style={{ display: 'block', color: 'var(--ink)', fontSize: 14 }}>{tpl.name}</strong>
            </button>
          ))}
        </div>

        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 10 }}>Or upload a background photo</p>
          <FileUploader onFilesSelected={onBgImageSelected} label="Drop image to start designing" />
        </div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Toolbar */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 4 }}>
          <button type="button" onClick={undo} disabled={historyIndex <= 0} className="btn-secondary" style={{ padding: '8px 12px' }} title="Undo">
            <Undo2 size={16} />
          </button>
          <button type="button" onClick={redo} disabled={historyIndex >= history.length - 1} className="btn-secondary" style={{ padding: '8px 12px' }} title="Redo">
            <Redo2 size={16} />
          </button>
        </div>
        <select
          className="input"
          style={{ width: 'auto', fontSize: 13 }}
          value={platformId}
          onChange={(e) => changePlatform(PLATFORMS.find((p) => p.id === e.target.value))}
        >
          {PLATFORMS.map((p) => (
            <option key={p.id} value={p.id}>{p.label} ({p.w}×{p.h})</option>
          ))}
        </select>
        <span style={{ fontSize: 12, color: 'var(--muted)', marginLeft: 'auto' }}>
          {canvasW} × {canvasH}px
        </span>
        <select className="input" style={{ width: 72, fontSize: 13 }} value={exportFormat} onChange={(e) => setExportFormat(e.target.value)}>
          <option value="png">PNG</option>
          <option value="jpg">JPG</option>
        </select>
        <button type="button" onClick={handleExport} disabled={exporting} className="btn-primary" style={{ padding: '10px 18px' }}>
          {exporting ? <Loader2 size={16} style={{ animation: 'spin 0.6s linear infinite' }} /> : <Download size={16} />}
          Export
        </button>
        <button type="button" onClick={reset} className="btn-secondary" style={{ padding: '10px 14px' }} title="Start over">
          <RotateCcw size={16} />
        </button>
        <span style={{ fontSize: 11, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
          <Save size={12} /> Auto-saved
        </span>
      </div>

      <div className="thumbnail-editor-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 320px', gap: 20, alignItems: 'start' }}>

        {/* Canvas */}
        <div ref={wrapRef} className="card" style={{ padding: 16, overflow: 'hidden' }}>
          <div
            style={{
              width: canvasW * displayScale,
              height: canvasH * displayScale,
              margin: '0 auto',
              position: 'relative',
              boxShadow: 'var(--shadow-lg)',
              borderRadius: 8,
              overflow: 'hidden',
            }}
          >
            <canvas
              ref={canvasRef}
              width={canvasW}
              height={canvasH}
              onMouseDown={handleCanvasPointerDown}
              onMouseMove={handleCanvasPointerMove}
              onMouseUp={handleCanvasPointerUp}
              onMouseLeave={handleCanvasPointerUp}
              style={{
                width: '100%',
                height: '100%',
                display: 'block',
                cursor: dragRef.current ? 'grabbing' : 'grab',
                touchAction: 'none',
              }}
            />
          </div>
          <p style={{ fontSize: 11, color: 'var(--muted)', textAlign: 'center', marginTop: 10 }}>
            Click and drag elements to reposition
          </p>
        </div>

        {/* Side panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`pill ${activeTab === tab.id ? 'pill-active' : ''}`}
                style={{ fontSize: 11, padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 4 }}
              >
                <tab.icon size={12} />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="card" style={{ padding: 16, maxHeight: 520, overflowY: 'auto' }}>

            {activeTab === 'templates' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <p style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>One-click layouts</p>
                {TEMPLATES.map((tpl) => (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => applyTemplate(tpl)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12, padding: 10,
                      borderRadius: 10, border: '1px solid var(--hairline)',
                      background: 'var(--surface)', cursor: 'pointer', textAlign: 'left',
                    }}
                  >
                    <div style={{
                      width: 56, height: 32, borderRadius: 6, flexShrink: 0,
                      background: `linear-gradient(135deg, ${tpl.background.colors?.join(', ') || '#333'})`,
                    }} />
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{tpl.name}</span>
                  </button>
                ))}
              </div>
            )}

            {activeTab === 'background' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {['gradient', 'color', 'image'].map((t) => (
                    <button key={t} type="button" onClick={() => setBgType(t)}
                      className={`pill ${bgType === t ? 'pill-active' : ''}`} style={{ fontSize: 12, textTransform: 'capitalize' }}>
                      {t}
                    </button>
                  ))}
                </div>

                {bgType === 'gradient' && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {BG_GRADIENTS.map((g) => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setBgGradient(g.colors)}
                        title={g.name}
                        style={{
                          height: 40, borderRadius: 8, border: `2px solid ${JSON.stringify(bgGradient) === JSON.stringify(g.colors) ? 'var(--primary)' : 'transparent'}`,
                          background: `linear-gradient(135deg, ${g.colors.join(', ')})`,
                          cursor: 'pointer',
                        }}
                      />
                    ))}
                  </div>
                )}

                {bgType === 'color' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <label style={{ fontSize: 13, color: 'var(--muted)' }}>Color</label>
                    <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
                  </div>
                )}

                {bgType === 'image' && (
                  <>
                    {!bgImage ? (
                      <FileUploader onFilesSelected={onBgImageSelected} label="Upload background" />
                    ) : (
                      <>
                        <p style={{ fontSize: 12, color: 'var(--muted)' }}>{bgFile?.name}</p>
                        <label style={{ fontSize: 12, color: 'var(--muted)' }}>Zoom {Math.round(bgScale * 100)}%</label>
                        <input type="range" min="0.3" max="3" step="0.05" value={bgScale}
                          onChange={(e) => setBgScale(Number(e.target.value))} />
                        <label style={{ fontSize: 12, color: 'var(--muted)' }}>Position X</label>
                        <input type="range" min={-canvasW} max={canvasW} value={bgX}
                          onChange={(e) => setBgX(Number(e.target.value))} />
                        <label style={{ fontSize: 12, color: 'var(--muted)' }}>Position Y</label>
                        <input type="range" min={-canvasH} max={canvasH} value={bgY}
                          onChange={(e) => setBgY(Number(e.target.value))} />
                        <label style={{ fontSize: 12, color: 'var(--muted)' }}>Brightness {bgBrightness}%</label>
                        <input type="range" min="40" max="160" value={bgBrightness}
                          onChange={(e) => setBgBrightness(Number(e.target.value))} />
                        <label style={{ fontSize: 12, color: 'var(--muted)' }}>Contrast {bgContrast}%</label>
                        <input type="range" min="40" max="160" value={bgContrast}
                          onChange={(e) => setBgContrast(Number(e.target.value))} />
                        <label style={{ fontSize: 12, color: 'var(--muted)' }}>Dark overlay (readability)</label>
                        <input type="range" min="0" max="80" value={bgOverlayOpacity}
                          onChange={(e) => setBgOverlayOpacity(Number(e.target.value))} />
                        <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>Fit mode</p>
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                          {[
                            { id: 'cover', label: 'Cover' },
                            { id: 'blur-fill', label: 'Blur fill' },
                          ].map((f) => (
                            <button key={f.id} type="button" onClick={() => setBgFit(f.id)}
                              className={`pill ${bgFit === f.id ? 'pill-active' : ''}`} style={{ fontSize: 11 }}>
                              {f.label}
                            </button>
                          ))}
                        </div>
                        <button type="button" className="btn-secondary" style={{ fontSize: 12 }}
                          onClick={() => { setBgImage(null); setBgFile(null); setBgType('gradient'); }}>
                          Remove image
                        </button>
                      </>
                    )}
                  </>
                )}

                <div style={{ borderTop: '1px solid var(--hairline)', paddingTop: 14, marginTop: 6 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 8 }}>Subject photo (person / product)</p>
                  <p style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 10, lineHeight: 1.5 }}>
                    Add a cutout on top of your background — great for reaction thumbnails.
                  </p>
                  {!subjectSource ? (
                    <FileUploader onFilesSelected={onSubjectSelected} label="Upload subject photo" />
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 12, color: 'var(--muted)' }}>Remove bg color</span>
                        <input type="color" value={removeBgColor} onChange={(e) => setRemoveBgColor(e.target.value)} />
                      </div>
                      <label style={{ fontSize: 12, color: 'var(--muted)' }}>Tolerance {removeBgTolerance}</label>
                      <input type="range" min="5" max="120" value={removeBgTolerance}
                        onChange={(e) => setRemoveBgTolerance(Number(e.target.value))} />
                      <button type="button" className="btn-primary" style={{ fontSize: 12 }}
                        disabled={processingSubject} onClick={() => addSubjectLayer(true)}>
                        {processingSubject ? <Loader2 size={14} style={{ animation: 'spin 0.6s linear infinite' }} /> : <Eraser size={14} />}
                        Add cutout layer
                      </button>
                      <button type="button" className="btn-secondary" style={{ fontSize: 12 }}
                        disabled={processingSubject} onClick={() => addSubjectLayer(false)}>
                        Add without cutout
                      </button>
                      <button type="button" className="btn-secondary" style={{ fontSize: 11 }}
                        onClick={() => setSubjectSource(null)}>
                        Clear subject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'text' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <button
                  type="button"
                  className="btn-secondary"
                  style={{ fontSize: 13 }}
                  onClick={() => {
                    const el = createTextLayer({ y: Math.round(canvasH * 0.5) });
                    setElementsWithHistory((prev) => [...prev, el]);
                    setSelectedId(el.id);
                  }}
                >
                  <Plus size={14} /> Add text layer
                </button>

                <div>
                  <p style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 8 }}>Quick styles</p>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {TEXT_PRESETS.map((p) => (
                      <button key={p.id} type="button" className="pill" style={{ fontSize: 11 }}
                        onClick={() => applyTextPreset(p)}>
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>

                {selected?.type === 'text' ? (
                  <>
                    <textarea
                      className="input"
                      rows={3}
                      value={selected.text}
                      onChange={(e) => updateElement(selected.id, { text: e.target.value })}
                      style={{ fontWeight: 700, resize: 'vertical' }}
                    />
                    <select className="input" value={selected.fontFamily}
                      onChange={(e) => { loadGoogleFont(e.target.value); updateElement(selected.id, { fontFamily: e.target.value }); }}>
                      {THUMBNAIL_FONTS.map((f) => <option key={f} value={f}>{f}</option>)}
                    </select>
                    <label style={{ fontSize: 12, color: 'var(--muted)' }}>Size {selected.fontSize}px</label>
                    <input type="range" min="16" max="160" value={selected.fontSize}
                      onChange={(e) => updateElement(selected.id, { fontSize: Number(e.target.value) })} />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                      <div>
                        <label style={{ fontSize: 11, color: 'var(--muted)' }}>Fill</label>
                        <input type="color" value={selected.color} onChange={(e) => updateElement(selected.id, { color: e.target.value })} style={{ width: '100%' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: 11, color: 'var(--muted)' }}>Outline</label>
                        <input type="color" value={selected.strokeColor} onChange={(e) => updateElement(selected.id, { strokeColor: e.target.value })} style={{ width: '100%' }} />
                      </div>
                    </div>
                    <label style={{ fontSize: 12, color: 'var(--muted)' }}>Outline {selected.strokeWidth}px</label>
                    <input type="range" min="0" max="12" value={selected.strokeWidth}
                      onChange={(e) => updateElement(selected.id, { strokeWidth: Number(e.target.value) })} />
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {['left', 'center', 'right'].map((a) => (
                        <button key={a} type="button" className={`pill ${selected.align === a ? 'pill-active' : ''}`}
                          onClick={() => updateElement(selected.id, { align: a })} style={{ fontSize: 11 }}>{a}</button>
                      ))}
                      <button type="button" className={`pill ${selected.shadow ? 'pill-active' : ''}`}
                        onClick={() => updateElement(selected.id, { shadow: !selected.shadow })} style={{ fontSize: 11 }}>Shadow</button>
                      <button type="button" className={`pill ${selected.bgBox ? 'pill-active' : ''}`}
                        onClick={() => updateElement(selected.id, { bgBox: selected.bgBox ? null : 'rgba(0,0,0,0.65)' })} style={{ fontSize: 11 }}>BG box</button>
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button type="button" className="btn-secondary" style={{ flex: 1, fontSize: 11 }} onClick={() => moveLayer('up')}><ArrowUp size={14} /></button>
                      <button type="button" className="btn-secondary" style={{ flex: 1, fontSize: 11 }} onClick={() => moveLayer('down')}><ArrowDown size={14} /></button>
                      <button type="button" className="btn-secondary" style={{ flex: 1, fontSize: 11, color: 'var(--error)' }} onClick={deleteSelected}><Trash2 size={14} /></button>
                    </div>
                  </>
                ) : selected?.type === 'image' ? (
                  <>
                    <p style={{ fontSize: 12, color: 'var(--muted)' }}>Subject / photo layer</p>
                    <label style={{ fontSize: 12, color: 'var(--muted)' }}>Scale {Math.round((selected.scale ?? 1) * 100)}%</label>
                    <input type="range" min="0.1" max="2" step="0.05" value={selected.scale ?? 1}
                      onChange={(e) => updateElement(selected.id, { scale: Number(e.target.value) })} />
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button type="button" className="btn-secondary" style={{ flex: 1, fontSize: 11 }} onClick={() => moveLayer('up')}><ArrowUp size={14} /></button>
                      <button type="button" className="btn-secondary" style={{ flex: 1, fontSize: 11 }} onClick={() => moveLayer('down')}><ArrowDown size={14} /></button>
                      <button type="button" className="btn-secondary" style={{ flex: 1, fontSize: 11, color: 'var(--error)' }} onClick={deleteSelected}><Trash2 size={14} /></button>
                    </div>
                  </>
                ) : (
                  <p style={{ fontSize: 12, color: 'var(--muted)' }}>Select a layer on the canvas or add one above.</p>
                )}
              </div>
            )}

            {activeTab === 'stickers' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <p style={{ fontSize: 12, color: 'var(--muted)' }}>Emoji stickers</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {STICKERS.map((s) => (
                    <button
                      key={s.emoji}
                      type="button"
                      onClick={() => {
                        const el = createSticker(s.emoji, canvasW - 120, canvasH - 120);
                        setElementsWithHistory((prev) => [...prev, el]);
                        setSelectedId(el.id);
                      }}
                      style={{ fontSize: 28, padding: 8, borderRadius: 8, border: '1px solid var(--hairline)', background: 'var(--surface)', cursor: 'pointer' }}
                      title={s.label}
                    >
                      {s.emoji}
                    </button>
                  ))}
                </div>
                <p style={{ fontSize: 12, color: 'var(--muted)' }}>Badges</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {BADGES.map((b) => (
                    <button
                      key={b.text}
                      type="button"
                      onClick={() => {
                        const el = createBadge(b.text, b.color, 80, 50);
                        setElementsWithHistory((prev) => [...prev, el]);
                        setSelectedId(el.id);
                      }}
                      style={{
                        padding: '6px 14px', borderRadius: 6, border: 'none',
                        background: b.color, color: '#fff', fontWeight: 800, fontSize: 13, cursor: 'pointer',
                      }}
                    >
                      {b.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'shapes' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { shape: 'rect', label: 'Rectangle' },
                  { shape: 'circle', label: 'Circle' },
                  { shape: 'arrow', label: 'Arrow' },
                ].map(({ shape, label }) => (
                  <button
                    key={shape}
                    type="button"
                    className="btn-secondary"
                    style={{ fontSize: 13, justifyContent: 'flex-start' }}
                    onClick={() => {
                      const el = createShape(shape, { x: canvasW / 2 - 60, y: canvasH / 2 - 40 });
                      setElementsWithHistory((prev) => [...prev, el]);
                      setSelectedId(el.id);
                    }}
                  >
                    <Plus size={14} /> {label}
                  </button>
                ))}
                {selected?.type === 'shape' && (
                  <>
                    <label style={{ fontSize: 12, color: 'var(--muted)' }}>Color</label>
                    <input type="color" value={selected.color} onChange={(e) => updateElement(selected.id, { color: e.target.value })} />
                    <label style={{ fontSize: 12, color: 'var(--muted)' }}>Opacity {Math.round((selected.opacity ?? 1) * 100)}%</label>
                    <input type="range" min="0.1" max="1" step="0.05" value={selected.opacity ?? 1}
                      onChange={(e) => updateElement(selected.id, { opacity: Number(e.target.value) })} />
                    <button type="button" className="btn-secondary" style={{ color: 'var(--error)', fontSize: 12 }} onClick={deleteSelected}>
                      <Trash2 size={14} /> Delete shape
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Layers list */}
          <div className="card" style={{ padding: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <Layers size={14} color="var(--muted)" />
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink)' }}>Layers ({elements.length})</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxHeight: 120, overflowY: 'auto' }}>
              {[...elements].sort((a, b) => b.zIndex - a.zIndex).map((el) => (
                <button
                  key={el.id}
                  type="button"
                  onClick={() => setSelectedId(el.id)}
                  style={{
                    padding: '6px 10px', borderRadius: 6, fontSize: 11, textAlign: 'left',
                    border: `1px solid ${selectedId === el.id ? 'var(--primary)' : 'var(--hairline)'}`,
                    background: selectedId === el.id ? 'var(--primary-light)' : 'var(--surface)',
                    color: 'var(--ink)', cursor: 'pointer',
                  }}
                >
                  {el.type === 'text' ? `T: ${(el.text || '').slice(0, 24)}`
                    : el.type === 'image' ? '📷 Subject photo'
                    : el.type === 'sticker' ? (el.badge ? `Badge: ${el.text}` : el.emoji)
                    : `Shape: ${el.shape}`}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
