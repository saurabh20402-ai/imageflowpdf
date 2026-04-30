'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, RotateCcw, Loader2, FileDown } from 'lucide-react';
import FileUploader from '@/components/FileUploader';
import { loadImage, drawImageToCanvas, canvasToBlob } from '@/lib/image-processor';
import { downloadBlob } from '@/lib/download';
import { formatBytes, generateOutputFilename } from '@/lib/utils';
import { toast } from 'sonner';

export default function CompressTool({ tool, config }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [imgEl, setImgEl] = useState(null);
  const [quality, setQuality] = useState(75);
  const [format, setFormat] = useState('image/jpeg');
  const [liveSize, setLiveSize] = useState(null);

  const onFilesSelected = useCallback(async (selectedFiles) => {
    const f = selectedFiles[0]; setFile(f); setResult(null); setLiveSize(null);
    try {
      const img = await loadImage(f);
      setImgEl(img); setPreview(URL.createObjectURL(f));
    } catch { toast.error('Failed to load image'); }
  }, []);

  // Live size estimation
  useEffect(() => {
    if (!imgEl) return;
    const timer = setTimeout(async () => {
      try {
        const { canvas } = drawImageToCanvas(imgEl);
        const blob = await canvasToBlob(canvas, format, quality / 100);
        setLiveSize(blob.size);
      } catch { /* ignore */ }
    }, 200);
    return () => clearTimeout(timer);
  }, [imgEl, quality, format]);

  const processCompress = useCallback(async () => {
    if (!imgEl) return;
    setProcessing(true);
    try {
      const { canvas } = drawImageToCanvas(imgEl);
      const blob = await canvasToBlob(canvas, format, quality / 100);
      setResult({ blob, url: URL.createObjectURL(blob), size: blob.size });
      const reduction = ((1 - blob.size / file.size) * 100).toFixed(1);
      toast.success(`Compressed! ${reduction}% smaller`);
    } catch (err) { toast.error('Compression failed: ' + err.message); }
    finally { setProcessing(false); }
  }, [imgEl, file, quality, format]);

  const handleDownload = () => {
    if (!result) return;
    const ext = format === 'image/jpeg' ? 'jpg' : format === 'image/webp' ? 'webp' : 'png';
    downloadBlob(result.blob, generateOutputFilename(file.name, 'compressed', ext));
  };

  const reset = () => {
    if (preview) URL.revokeObjectURL(preview);
    if (result?.url) URL.revokeObjectURL(result.url);
    setFile(null); setPreview(null); setResult(null); setImgEl(null); setLiveSize(null);
  };

  const reduction = (liveSize && file) ? ((1 - liveSize / file.size) * 100).toFixed(1) : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {!file ? (
        <FileUploader onFilesSelected={onFilesSelected} label="Drop image to compress" />
      ) : (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Before / After */}
          <div className="preview-grid">
            <div>
              <div className="preview-label">Original</div>
              <div className="preview-box"><img src={preview} alt="Original" /></div>
              <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 8 }}>{formatBytes(file.size)}</p>
            </div>
            <div>
              <div className="preview-label">{result ? 'Compressed' : 'Estimated Result'}</div>
              <div className="preview-box">
                {result ? <img src={result.url} alt="Compressed" /> : <img src={preview} alt="Preview" style={{ opacity: 0.7 }} />}
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: result ? 'var(--success)' : 'var(--muted)', fontWeight: result ? 600 : 400 }}>
                  {result ? formatBytes(result.size) : liveSize ? `~${formatBytes(liveSize)}` : '...'}
                </p>
                {reduction && Number(reduction) > 0 && (
                  <span style={{
                    fontSize: 11, fontWeight: 600, padding: '2px 8px',
                    borderRadius: 99, background: 'var(--success-bg)', color: 'var(--success)',
                  }}>
                    -{reduction}%
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="card">
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                <span style={{ color: 'var(--muted)' }}>Quality</span>
                <span style={{ fontWeight: 600, color: 'var(--ink)' }}>{quality}%</span>
              </div>
              <input type="range" min="5" max="100" value={quality} onChange={(e) => setQuality(Number(e.target.value))} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--muted-soft)', marginTop: 4 }}>
                <span>Smaller file</span><span>Better quality</span>
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--ink)', marginBottom: 8 }}>Format</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {[['image/jpeg', 'JPEG'], ['image/webp', 'WebP'], ['image/png', 'PNG']].map(([m, l]) => (
                  <button key={m} onClick={() => setFormat(m)}
                    className={`pill ${format === m ? 'pill-active' : ''}`} style={{ fontSize: 12 }}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {!result ? (
              <button onClick={processCompress} disabled={processing} className="btn-primary">
                {processing ? <Loader2 size={16} className="animate-spin" /> : <FileDown size={16} />}
                {processing ? 'Compressing...' : 'Compress'}
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
