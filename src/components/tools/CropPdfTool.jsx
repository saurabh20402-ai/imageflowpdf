'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Crop, Loader2, Download, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import FileUploader from '@/components/FileUploader';
import { Document, Page, pdfjs } from 'react-pdf';
import { PDFDocument } from 'pdf-lib';
import { toast } from 'sonner';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
const MIN = 36;

export default function CropPdfTool() {
  const [file, setFile] = useState(null);
  const [pdfBytes, setPdfBytes] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [applyMode, setApplyMode] = useState('all');
  const [box, setBox] = useState({ x: 40, y: 40, w: 320, h: 420 });
  const [pageSize, setPageSize] = useState({ w: 0, h: 0 });
  const [renderWidth, setRenderWidth] = useState(760);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const wrapRef = useRef(null);
  const containerRef = useRef(null);
  const dragRef = useRef(null);

  const initBox = useCallback((w, h) => {
    const mx = w * 0.1;
    const my = h * 0.1;
    setBox({ x: mx, y: my, w: w - mx * 2, h: h - my * 2 });
  }, []);

  const onFilesSelected = useCallback(async (picked) => {
    const f = picked[0];
    if (!f) return;
    setFile(f);
    setResult(null);
    setPageNumber(1);
    setApplyMode('all');
    const bytes = new Uint8Array(await f.arrayBuffer());
    setPdfBytes(bytes);
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => {
      const w = Math.max(280, Math.min(800, Math.floor(el.getBoundingClientRect().width - 12)));
      setRenderWidth(w);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    let tries = 0;
    let raf = 0;
    const measure = () => {
      const canvas = root.querySelector('canvas');
      if (!canvas) {
        if (tries++ < 120) raf = requestAnimationFrame(measure);
        return;
      }
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) {
        if (tries++ < 120) raf = requestAnimationFrame(measure);
        return;
      }
      setPageSize(prev => {
        if (!prev.w || !prev.h) {
          initBox(rect.width, rect.height);
          return { w: rect.width, h: rect.height };
        }
        if (prev.w !== rect.width || prev.h !== rect.height) {
          const sx = rect.width / prev.w;
          const sy = rect.height / prev.h;
          setBox(b => ({ x: b.x * sx, y: b.y * sy, w: b.w * sx, h: b.h * sy }));
          return { w: rect.width, h: rect.height };
        }
        return prev;
      });
    };
    raf = requestAnimationFrame(measure);
    const ro = new ResizeObserver(() => requestAnimationFrame(measure));
    ro.observe(root);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [pageNumber, file, initBox]);

  useEffect(() => {
    const handleMove = (e) => onMove(e);
    const handleUp = (e) => stopDrag(e);
    document.addEventListener('pointermove', handleMove, true);
    document.addEventListener('pointerup', handleUp, true);
    document.addEventListener('pointercancel', handleUp, true);
    return () => {
      document.removeEventListener('pointermove', handleMove, true);
      document.removeEventListener('pointerup', handleUp, true);
      document.removeEventListener('pointercancel', handleUp, true);
    };
  }, [onMove, stopDrag]);

  const startDrag = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget?.setPointerCapture) {
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    dragRef.current = { type, startX: e.clientX, startY: e.clientY, startBox: { ...box }, pointerId: e.pointerId };
  };

  const onMove = useCallback((e) => {
    if (!dragRef.current) return;
    const { type, startX, startY, startBox } = dragRef.current;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    const W = pageSize.w;
    const H = pageSize.h;
    let { x, y, w, h } = startBox;
    if (type === 'move') {
      x = Math.max(0, Math.min(W - w, x + dx));
      y = Math.max(0, Math.min(H - h, y + dy));
    } else if (type === 'se') {
      w = Math.max(MIN, Math.min(W - x, w + dx));
      h = Math.max(MIN, Math.min(H - y, h + dy));
    } else if (type === 'sw') {
      const nx = Math.max(0, Math.min(x + w - MIN, x + dx));
      w = x + w - nx; x = nx;
      h = Math.max(MIN, Math.min(H - y, h + dy));
    } else if (type === 'ne') {
      const ny = Math.max(0, Math.min(y + h - MIN, y + dy));
      h = y + h - ny; y = ny;
      w = Math.max(MIN, Math.min(W - x, w + dx));
    } else if (type === 'nw') {
      const nx = Math.max(0, Math.min(x + w - MIN, x + dx));
      const ny = Math.max(0, Math.min(y + h - MIN, y + dy));
      w = x + w - nx; x = nx;
      h = y + h - ny; y = ny;
    } else if (type === 'n') {
      const ny = Math.max(0, Math.min(y + h - MIN, y + dy));
      h = y + h - ny; y = ny;
    } else if (type === 's') {
      h = Math.max(MIN, Math.min(H - y, h + dy));
    } else if (type === 'e') {
      w = Math.max(MIN, Math.min(W - x, w + dx));
    } else if (type === 'w') {
      const nx = Math.max(0, Math.min(x + w - MIN, x + dx));
      w = x + w - nx; x = nx;
    }
    setBox({ x, y, w, h });
  }, [pageSize.w, pageSize.h]);

  const stopDrag = useCallback((e) => {
    if (dragRef.current?.pointerId && e.currentTarget?.hasPointerCapture?.(dragRef.current.pointerId)) {
      e.currentTarget.releasePointerCapture(dragRef.current.pointerId);
    }
    dragRef.current = null;
  }, []);

  const processCrop = useCallback(async () => {
    if (!pdfBytes) return;
    setProcessing(true);
    try {
      const doc = await PDFDocument.load(pdfBytes);
      const pages = doc.getPages();
      const pX = box.x / pageSize.w;
      const pY = box.y / pageSize.h;
      const pW = box.w / pageSize.w;
      const pH = box.h / pageSize.h;
      const targetPages = applyMode === 'current' ? [pages[pageNumber - 1]].filter(Boolean) : pages;
      targetPages.forEach((p) => {
        const { width, height } = p.getSize();
        const x = width * pX;
        const w = width * pW;
        const h = height * pH;
        const y = height - (height * pY) - h;
        p.setCropBox(x, y, w, h);
        p.setMediaBox(x, y, w, h);
        if (p.setTrimBox) p.setTrimBox(x, y, w, h);
      });
      const blob = new Blob([await doc.save()], { type: 'application/pdf' });
      if (result?.url) URL.revokeObjectURL(result.url);
      setResult({ blob, url: URL.createObjectURL(blob) });
      toast.success('PDF cropped successfully.');
    } catch (e) {
      toast.error(`Crop failed: ${e.message}`);
    } finally {
      setProcessing(false);
    }
  }, [pdfBytes, box, pageSize, applyMode, pageNumber, result?.url]);

  const reset = () => {
    if (result?.url) URL.revokeObjectURL(result.url);
    setFile(null);
    setPdfBytes(null);
    setResult(null);
    setPageSize({ w: 0, h: 0 });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {!file ? (
        <FileUploader onFilesSelected={onFilesSelected} accept={{ 'application/pdf': ['.pdf'] }} label="Drop PDF to crop" />
      ) : (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="card" style={{ padding: 12 }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'stretch', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 520px', minWidth: 280 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <strong style={{ fontSize: 13 }}>Adjust Crop Area</strong>
                  {numPages > 1 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <button className="btn-secondary" onClick={() => setPageNumber(p => Math.max(1, p - 1))} disabled={pageNumber <= 1}><ChevronLeft size={16} /></button>
                      <span style={{ fontSize: 12 }}>Page {pageNumber} / {numPages}</span>
                      <button className="btn-secondary" onClick={() => setPageNumber(p => Math.min(numPages, p + 1))} disabled={pageNumber >= numPages}><ChevronRight size={16} /></button>
                    </div>
                  )}
                </div>
                <div ref={wrapRef} style={{ width: '100%' }}>
                  <div ref={containerRef} style={{ position: 'relative', width: 'fit-content', maxWidth: '100%', margin: '0 auto', borderRadius: 10, overflow: 'hidden', boxShadow: 'var(--shadow-md)', touchAction: 'none', userSelect: 'none' }}>
                    <Document file={file} onLoadSuccess={({ numPages: n }) => setNumPages(n)} loading={<div style={{ padding: 30 }}><Loader2 className="animate-spin" /></div>}>
                      <Page pageNumber={pageNumber} width={renderWidth} renderAnnotationLayer={false} renderTextLayer={false} />
                    </Document>
                    {pageSize.w > 0 && (
                      <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
                        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                          <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: box.y, background: 'rgba(0,0,0,0.55)' }} />
                          <div style={{ position: 'absolute', left: 0, right: 0, top: box.y + box.h, bottom: 0, background: 'rgba(0,0,0,0.55)' }} />
                          <div style={{ position: 'absolute', left: 0, top: box.y, width: box.x, height: box.h, background: 'rgba(0,0,0,0.55)' }} />
                          <div style={{ position: 'absolute', right: 0, top: box.y, left: box.x + box.w, height: box.h, background: 'rgba(0,0,0,0.55)' }} />
                        </div>
                        <div
                          style={{ position: 'absolute', left: box.x, top: box.y, width: box.w, height: box.h, border: '2px solid var(--primary)', borderRadius: 8, cursor: 'move', background: 'rgba(99,102,241,0.06)', touchAction: 'none', userSelect: 'none' }}
                          onPointerDown={(e) => startDrag(e, 'move')}
                        >
                          {[
                            ['nw', { top: -9, left: -9, cursor: 'nw-resize' }],
                            ['ne', { top: -9, right: -9, cursor: 'ne-resize' }],
                            ['sw', { bottom: -9, left: -9, cursor: 'sw-resize' }],
                            ['se', { bottom: -9, right: -9, cursor: 'se-resize' }],
                            ['n', { top: -8, left: '50%', transform: 'translateX(-50%)', width: 30, height: 16, cursor: 'n-resize' }],
                            ['s', { bottom: -8, left: '50%', transform: 'translateX(-50%)', width: 30, height: 16, cursor: 's-resize' }],
                            ['e', { right: -8, top: '50%', transform: 'translateY(-50%)', width: 16, height: 30, cursor: 'e-resize' }],
                            ['w', { left: -8, top: '50%', transform: 'translateY(-50%)', width: 16, height: 30, cursor: 'w-resize' }],
                          ].map(([type, style]) => (
                            <div
                              key={type}
                              style={{ position: 'absolute', width: 22, height: 22, borderRadius: 999, background: '#fff', border: '2px solid var(--primary)', touchAction: 'none', userSelect: 'none', ...style }}
                              onPointerDown={(e) => startDrag(e, type)}
                              onPointerMove={onMove}
                              onPointerUp={stopDrag}
                              onPointerCancel={stopDrag}
                            
                    )}
                  </div>
                </div>
              </div>
              <aside style={{ flex: '0 0 280px', width: 280, maxWidth: '100%', borderLeft: '1px solid var(--hairline-soft)', paddingLeft: 12 }}>
                <p style={{ fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Crop Settings</p>
                <label style={{ display: 'block', fontSize: 13, marginBottom: 8 }}><input type="radio" checked={applyMode === 'all'} onChange={() => setApplyMode('all')} /> All pages</label>
                <label style={{ display: 'block', fontSize: 13, marginBottom: 12 }}><input type="radio" checked={applyMode === 'current'} onChange={() => setApplyMode('current')} /> Current page</label>
                <button className="btn-secondary" onClick={() => initBox(pageSize.w, pageSize.h)} style={{ width: '100%', marginBottom: 10 }}>Reset selection</button>
                {!result ? (
                  <button className="btn-primary" style={{ width: '100%' }} onClick={processCrop} disabled={processing}>
                    {processing ? <Loader2 size={16} className="animate-spin" /> : <Crop size={16} />}
                    {processing ? 'Cropping...' : 'Crop PDF'}
                  </button>
                ) : (
                  <a href={result.url} download={file.name.replace(/\.pdf$/i, '') + '-cropped.pdf'} className="btn-success" style={{ width: '100%', textDecoration: 'none', justifyContent: 'center' }}>
                    <Download size={16} /> Download PDF
                  </a>
                )}
                <button className="btn-secondary" onClick={reset} style={{ width: '100%', marginTop: 10 }}><RotateCcw size={16} /> Cancel</button>
              </aside>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

