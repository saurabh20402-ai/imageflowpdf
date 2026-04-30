'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, RotateCcw, Loader2, Crop } from 'lucide-react';
import FileUploader from '@/components/FileUploader';
import { loadImage, cropImage, canvasToBlob } from '@/lib/image-processor';
import { downloadBlob } from '@/lib/download';
import { formatBytes, generateOutputFilename } from '@/lib/utils';
import { toast } from 'sonner';

const ASPECT_RATIOS = [
  { label: 'Free', value: null },
  { label: '1:1', value: 1 },
  { label: '4:3', value: 4 / 3 },
  { label: '16:9', value: 16 / 9 },
  { label: '9:16', value: 9 / 16 },
  { label: '3:4', value: 3 / 4 },
];

const MIN_SIZE = 20; // px on screen

export default function CropTool({ tool }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [imgEl, setImgEl] = useState(null);
  const [aspectRatio, setAspectRatio] = useState(null);

  // crop box in SCREEN pixels relative to the image
  const [box, setBox] = useState({ x: 0, y: 0, w: 100, h: 100 });
  const [imgSize, setImgSize] = useState({ w: 0, h: 0 }); // rendered image size

  const imgRef = useRef(null);
  const dragRef = useRef(null); // { type, startX, startY, startBox }

  // ─── File load ───────────────────────────────────────────────
  const onFilesSelected = useCallback(async (f0) => {
    const f = f0[0];
    setFile(f);
    setResult(null);
    try {
      const img = await loadImage(f);
      setImgEl(img);
      setPreview(URL.createObjectURL(f));
    } catch {
      toast.error('Failed to load image');
    }
  }, []);

  // Set initial crop box once image renders
  const onImgLoad = useCallback(() => {
    if (!imgRef.current) return;
    const { offsetWidth: w, offsetHeight: h } = imgRef.current;
    setImgSize({ w, h });
    // Default: 80% of image, centered
    const bw = Math.round(w * 0.8);
    const bh = Math.round(h * 0.8);
    setBox({
      x: Math.round((w - bw) / 2),
      y: Math.round((h - bh) / 2),
      w: bw,
      h: bh,
    });
  }, []);

  // ─── Mouse drag handlers on the container ─────────────────────
  const handleMouseDown = useCallback((e, type) => {
    e.preventDefault();
    e.stopPropagation();
    dragRef.current = {
      type,
      startX: e.clientX,
      startY: e.clientY,
      startBox: { ...box },
    };
  }, [box]);

  const handleMouseMove = useCallback((e) => {
    if (!dragRef.current) return;
    const { type, startX, startY, startBox } = dragRef.current;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    const { w: imgW, h: imgH } = imgSize;

    setBox(prev => {
      let { x, y, w, h } = startBox;

      if (type === 'move') {
        x = Math.max(0, Math.min(imgW - w, startBox.x + dx));
        y = Math.max(0, Math.min(imgH - h, startBox.y + dy));
      }

      else if (type === 'se') {
        w = Math.max(MIN_SIZE, Math.min(imgW - startBox.x, startBox.w + dx));
        if (aspectRatio) {
          h = Math.round(w / aspectRatio);
        } else {
          h = Math.max(MIN_SIZE, Math.min(imgH - startBox.y, startBox.h + dy));
        }
        // Clamp
        w = Math.min(w, imgW - x);
        h = Math.min(h, imgH - y);
      }

      else if (type === 'sw') {
        const newX = Math.max(0, Math.min(startBox.x + startBox.w - MIN_SIZE, startBox.x + dx));
        w = startBox.x + startBox.w - newX;
        x = newX;
        if (aspectRatio) {
          h = Math.round(w / aspectRatio);
        } else {
          h = Math.max(MIN_SIZE, Math.min(imgH - startBox.y, startBox.h + dy));
        }
        h = Math.min(h, imgH - y);
      }

      else if (type === 'nw') {
        const newX = Math.max(0, Math.min(startBox.x + startBox.w - MIN_SIZE, startBox.x + dx));
        const newY = Math.max(0, Math.min(startBox.y + startBox.h - MIN_SIZE, startBox.y + dy));
        w = startBox.x + startBox.w - newX;
        h = startBox.y + startBox.h - newY;
        x = newX; y = newY;
        if (aspectRatio) h = Math.round(w / aspectRatio);
        h = Math.min(h, imgH - y);
      }

      else if (type === 'ne') {
        const newY = Math.max(0, Math.min(startBox.y + startBox.h - MIN_SIZE, startBox.y + dy));
        w = Math.max(MIN_SIZE, Math.min(imgW - startBox.x, startBox.w + dx));
        h = startBox.y + startBox.h - newY;
        y = newY;
        if (aspectRatio) h = Math.round(w / aspectRatio);
        h = Math.min(h, imgH - y);
      }

      return { x, y, w: Math.max(MIN_SIZE, w), h: Math.max(MIN_SIZE, h) };
    });
  }, [imgSize, aspectRatio]);

  const handleMouseUp = useCallback(() => {
    dragRef.current = null;
  }, []);

  // ─── Process crop ─────────────────────────────────────────────
  const processCrop = useCallback(async () => {
    if (!imgEl || !file || !imgRef.current) return;
    setProcessing(true);
    try {
      // Scale from screen pixels to actual image pixels
      const scaleX = imgEl.naturalWidth / imgSize.w;
      const scaleY = imgEl.naturalHeight / imgSize.h;
      const cx = Math.round(box.x * scaleX);
      const cy = Math.round(box.y * scaleY);
      const cw = Math.round(box.w * scaleX);
      const ch = Math.round(box.h * scaleY);

      const { canvas } = cropImage(imgEl, cx, cy, cw, ch);
      const blob = await canvasToBlob(canvas, 'image/png', 0.95);
      setResult({ blob, size: blob.size, url: URL.createObjectURL(blob), width: cw, height: ch });
      toast.success(`Cropped to ${cw} × ${ch}!`);
    } catch (err) {
      toast.error('Crop failed: ' + err.message);
    } finally {
      setProcessing(false);
    }
  }, [imgEl, file, box, imgSize]);

  const handleDownload = () => {
    if (!result) return;
    downloadBlob(result.blob, generateOutputFilename(file.name, 'cropped', 'png'));
  };

  const reset = () => {
    if (preview) URL.revokeObjectURL(preview);
    if (result?.url) URL.revokeObjectURL(result.url);
    setFile(null); setPreview(null); setResult(null); setImgEl(null);
  };

  // ─── Handle window resize → re-measure image ─────────────────
  useEffect(() => {
    const handleResize = () => {
      if (imgRef.current) {
        const { offsetWidth: w, offsetHeight: h } = imgRef.current;
        if (w !== imgSize.w || h !== imgSize.h) {
          setImgSize({ w, h });
        }
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [imgSize]);

  // ─── Render ───────────────────────────────────────────────────
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {!file ? (
        <FileUploader onFilesSelected={onFilesSelected} label="Drop image to crop" />
      ) : result ? (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="preview-grid">
            <div>
              <div className="preview-label">Original</div>
              <div className="preview-box"><img src={preview} alt="Original" /></div>
              <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 8 }}>
                {imgEl?.naturalWidth} × {imgEl?.naturalHeight}
              </p>
            </div>
            <div>
              <div className="preview-label">Cropped</div>
              <div className="preview-box"><img src={result.url} alt="Cropped" /></div>
              <p style={{ fontSize: 12, color: 'var(--success)', marginTop: 8, fontWeight: 600 }}>
                {result.width} × {result.height} · {formatBytes(result.size)}
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={handleDownload} className="btn-success"><Download size={16} /> Download</button>
            <button onClick={() => setResult(null)} className="btn-secondary">
              <Crop size={16} /> Crop Again
            </button>
            <button onClick={reset} className="btn-secondary"><RotateCcw size={16} /> New Image</button>
          </div>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Aspect ratio selector */}
          <div className="card">
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 10 }}>
              Aspect Ratio
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {ASPECT_RATIOS.map(ar => (
                <button key={ar.label}
                  onClick={() => setAspectRatio(ar.value)}
                  className={`pill ${aspectRatio === ar.value ? 'pill-active' : ''}`}>
                  {ar.label}
                </button>
              ))}
            </div>
          </div>

          {/* Crop canvas area */}
          <div className="card" style={{ padding: 12 }}>
            <p style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 10 }}>
              Drag the <strong>box</strong> to move · Drag <strong>corners</strong> to resize
            </p>

            {/* Container that listens to mouse moves */}
            <div
              style={{ position: 'relative', display: 'inline-block', userSelect: 'none', cursor: 'crosshair', maxWidth: '100%' }}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}>

              <img
                ref={imgRef}
                src={preview}
                alt="Crop"
                onLoad={onImgLoad}
                draggable={false}
                style={{ display: 'block', maxWidth: '100%', maxHeight: 400, pointerEvents: 'none' }}
              />

              {imgSize.w > 0 && (
                <>
                  {/* Dark overlay — 4 sides */}
                  <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                    {/* top */}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: box.y, background: 'rgba(0,0,0,0.5)' }} />
                    {/* bottom */}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, top: box.y + box.h, background: 'rgba(0,0,0,0.5)' }} />
                    {/* left */}
                    <div style={{ position: 'absolute', top: box.y, left: 0, width: box.x, height: box.h, background: 'rgba(0,0,0,0.5)' }} />
                    {/* right */}
                    <div style={{ position: 'absolute', top: box.y, left: box.x + box.w, right: 0, height: box.h, background: 'rgba(0,0,0,0.5)' }} />
                  </div>

                  {/* Crop box */}
                  <div
                    style={{
                      position: 'absolute',
                      left: box.x, top: box.y,
                      width: box.w, height: box.h,
                      border: '2px solid #fff',
                      boxSizing: 'border-box',
                      cursor: 'move',
                    }}
                    onMouseDown={(e) => handleMouseDown(e, 'move')}>

                    {/* Rule-of-thirds grid lines */}
                    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                      <div style={{ position: 'absolute', left: '33.3%', top: 0, bottom: 0, width: 1, background: 'rgba(255,255,255,0.3)' }} />
                      <div style={{ position: 'absolute', left: '66.6%', top: 0, bottom: 0, width: 1, background: 'rgba(255,255,255,0.3)' }} />
                      <div style={{ position: 'absolute', top: '33.3%', left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.3)' }} />
                      <div style={{ position: 'absolute', top: '66.6%', left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.3)' }} />
                    </div>

                    {/* Corner handles */}
                    {[
                      { pos: 'nw', style: { top: -6, left: -6, cursor: 'nw-resize' } },
                      { pos: 'ne', style: { top: -6, right: -6, cursor: 'ne-resize' } },
                      { pos: 'sw', style: { bottom: -6, left: -6, cursor: 'sw-resize' } },
                      { pos: 'se', style: { bottom: -6, right: -6, cursor: 'se-resize' } },
                    ].map(({ pos, style }) => (
                      <div key={pos}
                        style={{
                          position: 'absolute', width: 12, height: 12,
                          background: 'white', borderRadius: 2,
                          border: '2px solid var(--primary)',
                          ...style,
                        }}
                        onMouseDown={(e) => handleMouseDown(e, pos)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {imgSize.w > 0 && (
              <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 8 }}>
                Selection: {Math.round(box.w * (imgEl?.naturalWidth || 1) / imgSize.w)} ×{' '}
                {Math.round(box.h * (imgEl?.naturalHeight || 1) / imgSize.h)} px
              </p>
            )}
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={processCrop} disabled={processing} className="btn-primary">
              {processing
                ? <Loader2 size={16} style={{ animation: 'spin 0.6s linear infinite' }} />
                : <Crop size={16} />}
              {processing ? 'Cropping...' : 'Crop Image'}
            </button>
            <button onClick={reset} className="btn-secondary">
              <RotateCcw size={16} /> Start Over
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
