'use client';

import { useCallback, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, RotateCcw, Loader2, Maximize2 } from 'lucide-react';
import FileUploader from '@/components/FileUploader';
import { loadImage, createCanvas, canvasToBlob } from '@/lib/image-processor';
import { downloadBlob } from '@/lib/download';
import { formatBytes, generateOutputFilename } from '@/lib/utils';
import { toast } from 'sonner';

export default function UpscaleTool() {
  const [file, setFile] = useState(null);
  const [imgEl, setImgEl] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null); // { url, blob, w, h }
  const [processing, setProcessing] = useState(false);
  const [scale, setScale] = useState(2); // 2 or 4
  const [format, setFormat] = useState('image/png');
  const [quality, setQuality] = useState(92);

  const onFilesSelected = useCallback(async (selected) => {
    const f = selected[0];
    if (!f) return;
    setFile(f);
    setResult(null);
    try {
      const img = await loadImage(f);
      setImgEl(img);
      if (preview) URL.revokeObjectURL(preview);
      setPreview(URL.createObjectURL(f));
    } catch {
      toast.error('Failed to load image.');
    }
  }, [preview]);

  const canUpscale = useMemo(() => !!imgEl && !!file && !processing, [imgEl, file, processing]);

  const upscale = useCallback(async () => {
    if (!imgEl || !file) return;
    setProcessing(true);
    try {
      const w = imgEl.naturalWidth * scale;
      const h = imgEl.naturalHeight * scale;
      const { canvas, ctx } = createCanvas(w, h);

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      if (format === 'image/jpeg') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, w, h);
      } else {
        ctx.clearRect(0, 0, w, h);
      }
      ctx.drawImage(imgEl, 0, 0, w, h);

      const blob = await canvasToBlob(canvas, format, quality / 100);
      if (result?.url) URL.revokeObjectURL(result.url);
      setResult({ url: URL.createObjectURL(blob), blob, w, h });
      toast.success('✅ Upscale complete!');
    } catch (err) {
      console.error(err);
      toast.error('Upscale failed: ' + (err?.message || 'Unknown error'));
    } finally {
      setProcessing(false);
    }
  }, [imgEl, file, scale, format, quality, result?.url]);

  const reset = () => {
    if (preview) URL.revokeObjectURL(preview);
    if (result?.url) URL.revokeObjectURL(result.url);
    setFile(null);
    setImgEl(null);
    setPreview(null);
    setResult(null);
  };

  const ext = format === 'image/jpeg' ? 'jpg' : format === 'image/webp' ? 'webp' : 'png';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {!file ? (
        <FileUploader onFilesSelected={onFilesSelected} label="Drop image to upscale" sublabel="2× or 4× (non-AI) smart enlarge in your browser" />
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="preview-grid">
            <div>
              <div className="preview-label">Original</div>
              <div className="preview-box checkerboard">
                <img src={preview} alt="Original" />
              </div>
              <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 8 }}>
                {imgEl?.naturalWidth} × {imgEl?.naturalHeight} · {formatBytes(file.size)}
              </p>
            </div>
            <div>
              <div className="preview-label">Upscaled</div>
              <div className="preview-box checkerboard">
                {result ? <img src={result.url} alt="Upscaled" /> : <img src={preview} alt="Preview" style={{ opacity: 0.55 }} />}
              </div>
              {result && (
                <p style={{ fontSize: 12, color: 'var(--success)', marginTop: 8, fontWeight: 600 }}>
                  {result.w} × {result.h} · {formatBytes(result.blob.size)}
                </p>
              )}
            </div>
          </div>

          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>Scale</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {[2, 4].map((s) => (
                  <button key={s} className={`pill ${scale === s ? 'pill-active' : ''}`} onClick={() => { setScale(s); setResult(null); }}>
                    {s}×
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>Output format</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {[
                  ['image/png', 'PNG'],
                  ['image/webp', 'WebP'],
                  ['image/jpeg', 'JPG'],
                ].map(([m, label]) => (
                  <button key={m} className={`pill ${format === m ? 'pill-active' : ''}`} onClick={() => { setFormat(m); setResult(null); }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {(format === 'image/jpeg' || format === 'image/webp') && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>
                  <span>Quality</span><strong style={{ color: 'var(--ink)' }}>{quality}%</strong>
                </div>
                <input type="range" min="30" max="100" value={quality} onChange={(e) => { setQuality(Number(e.target.value)); setResult(null); }} />
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {!result ? (
              <button className="btn-primary" onClick={upscale} disabled={!canUpscale} style={{ flex: 1 }}>
                {processing ? <Loader2 size={16} className="animate-spin" /> : <Maximize2 size={16} />}
                {processing ? 'Upscaling...' : 'Upscale'}
              </button>
            ) : (
              <button className="btn-success" onClick={() => downloadBlob(result.blob, generateOutputFilename(file.name, `upscaled-${scale}x`, ext))} style={{ flex: 1 }}>
                <Download size={16} /> Download {ext.toUpperCase()}
              </button>
            )}
            <button className="btn-secondary" onClick={reset}>
              <RotateCcw size={16} /> Start Over
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

