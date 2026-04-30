'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, RotateCcw, Loader2, Maximize2, Lock, Unlock } from 'lucide-react';
import FileUploader from '@/components/FileUploader';
import { loadImage, resizeImage, canvasToBlob } from '@/lib/image-processor';
import { downloadBlob } from '@/lib/download';
import { formatBytes, generateOutputFilename } from '@/lib/utils';
import { toast } from 'sonner';

const PRESETS = [
  { label: 'Instagram Post', w: 1080, h: 1080 },
  { label: 'Instagram Story', w: 1080, h: 1920 },
  { label: 'Facebook Cover', w: 820, h: 312 },
  { label: 'Twitter Header', w: 1500, h: 500 },
  { label: 'YouTube Thumb', w: 1280, h: 720 },
  { label: 'LinkedIn Banner', w: 1584, h: 396 },
  { label: 'HD 1080p', w: 1920, h: 1080 },
  { label: '4K', w: 3840, h: 2160 },
];

export default function ResizeTool({ tool, config }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [imgEl, setImgEl] = useState(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [origW, setOrigW] = useState(0);
  const [origH, setOrigH] = useState(0);
  const [lockRatio, setLockRatio] = useState(true);
  const [livePreview, setLivePreview] = useState(null);

  const onFilesSelected = useCallback(async (selectedFiles) => {
    const f = selectedFiles[0]; setFile(f); setResult(null); setLivePreview(null);
    try {
      const img = await loadImage(f);
      setImgEl(img);
      setPreview(URL.createObjectURL(f));
      setWidth(img.naturalWidth); setHeight(img.naturalHeight);
      setOrigW(img.naturalWidth); setOrigH(img.naturalHeight);
    } catch { toast.error('Failed to load image'); }
  }, []);

  const updateWidth = (val) => {
    const w = Math.max(1, Number(val) || 0);
    setWidth(w);
    if (lockRatio && origW > 0) setHeight(Math.round((w / origW) * origH));
  };

  const updateHeight = (val) => {
    const h = Math.max(1, Number(val) || 0);
    setHeight(h);
    if (lockRatio && origH > 0) setWidth(Math.round((h / origH) * origW));
  };

  const applyPreset = (preset) => {
    setWidth(preset.w); setHeight(preset.h); setLockRatio(false);
  };

  // Live preview generation
  useEffect(() => {
    if (!imgEl || width <= 0 || height <= 0) return;
    if (width === origW && height === origH) { setLivePreview(null); return; }

    const timer = setTimeout(async () => {
      try {
        const previewScale = 0.5;
        const pw = Math.round(width * previewScale);
        const ph = Math.round(height * previewScale);
        const { canvas } = resizeImage(imgEl, Math.min(pw, 600), Math.min(ph, 600));
        const blob = await canvasToBlob(canvas, 'image/jpeg', 0.6);
        if (livePreview) URL.revokeObjectURL(livePreview);
        setLivePreview(URL.createObjectURL(blob));
      } catch { /* ignore preview errors */ }
    }, 300);

    return () => clearTimeout(timer);
  }, [imgEl, width, height, origW, origH]);

  const processResize = useCallback(async () => {
    if (!imgEl || width <= 0 || height <= 0) return;
    setProcessing(true);
    try {
      const { canvas } = resizeImage(imgEl, width, height);
      const blob = await canvasToBlob(canvas, 'image/png', 0.95);
      setResult({ blob, url: URL.createObjectURL(blob), size: blob.size, width, height });
      toast.success(`Resized to ${width} × ${height}!`);
    } catch (err) { toast.error('Resize failed: ' + err.message); }
    finally { setProcessing(false); }
  }, [imgEl, width, height]);

  const handleDownload = () => {
    if (!result) return;
    downloadBlob(result.blob, generateOutputFilename(file.name, `${width}x${height}`, 'png'));
  };

  const reset = () => {
    if (preview) URL.revokeObjectURL(preview);
    if (result?.url) URL.revokeObjectURL(result.url);
    if (livePreview) URL.revokeObjectURL(livePreview);
    setFile(null); setPreview(null); setResult(null); setImgEl(null); setLivePreview(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {!file ? (
        <FileUploader onFilesSelected={onFilesSelected} label="Drop image to resize" />
      ) : (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Before / After Preview */}
          <div className="preview-grid">
            <div>
              <div className="preview-label">Original</div>
              <div className="preview-box">
                <img src={preview} alt="Original" />
              </div>
              <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 8 }}>
                {origW} × {origH} · {formatBytes(file.size)}
              </p>
            </div>
            <div>
              <div className="preview-label">
                {result ? 'Resized' : `Preview (${width} × ${height})`}
              </div>
              <div className="preview-box">
                {result ? (
                  <img src={result.url} alt="Resized" />
                ) : livePreview ? (
                  <img src={livePreview} alt="Preview" style={{ opacity: 0.9 }} />
                ) : (
                  <img src={preview} alt="Preview" style={{ opacity: 0.6 }} />
                )}
              </div>
              {result && (
                <p style={{ fontSize: 12, color: 'var(--success)', marginTop: 8, fontWeight: 500 }}>
                  {result.width} × {result.height} · {formatBytes(result.size)}
                </p>
              )}
            </div>
          </div>

          {/* Dimension Controls */}
          <div className="card">
            <div style={{ display: 'flex', gap: 12, alignItems: 'end', flexWrap: 'wrap', marginBottom: 16 }}>
              <div style={{ flex: '1 1 120px' }}>
                <label style={{ display: 'block', fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>Width (px)</label>
                <input type="number" value={width} onChange={(e) => updateWidth(e.target.value)}
                  className="input" style={{ fontWeight: 600 }} min="1" />
              </div>
              <button onClick={() => setLockRatio(!lockRatio)}
                style={{
                  width: 36, height: 36, borderRadius: 8, marginBottom: 2,
                  background: lockRatio ? 'var(--primary-light)' : 'var(--surface)',
                  border: '1px solid var(--hairline)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: lockRatio ? 'var(--primary)' : 'var(--muted)',
                }}>
                {lockRatio ? <Lock size={14} /> : <Unlock size={14} />}
              </button>
              <div style={{ flex: '1 1 120px' }}>
                <label style={{ display: 'block', fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>Height (px)</label>
                <input type="number" value={height} onChange={(e) => updateHeight(e.target.value)}
                  className="input" style={{ fontWeight: 600 }} min="1" />
              </div>
            </div>

            {/* Presets */}
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 10 }}>Quick Presets</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {PRESETS.map(p => (
                  <button key={p.label} onClick={() => applyPreset(p)} className="pill" style={{ fontSize: 12 }}>
                    {p.label}
                    <span style={{ color: 'var(--muted-soft)', marginLeft: 4, fontSize: 11 }}>{p.w}×{p.h}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {!result ? (
              <button onClick={processResize} disabled={processing} className="btn-primary">
                {processing ? <Loader2 size={16} className="animate-spin" /> : <Maximize2 size={16} />}
                {processing ? 'Resizing...' : 'Resize Image'}
              </button>
            ) : (
              <button onClick={handleDownload} className="btn-success">
                <Download size={16} /> Download
              </button>
            )}
            <button onClick={reset} className="btn-secondary">
              <RotateCcw size={16} /> Start Over
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
