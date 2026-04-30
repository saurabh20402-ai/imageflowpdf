'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Download, RotateCcw, Loader2, ArrowRight } from 'lucide-react';
import FileUploader from '@/components/FileUploader';
import { loadImage, resizeImage } from '@/lib/image-processor';
import { formatBytes, generateOutputFilename } from '@/lib/utils';
import { toast } from 'sonner';

const FORMAT_OPTIONS = [
  { label: 'JPEG', mime: 'image/jpeg', ext: 'jpg' },
  { label: 'PNG',  mime: 'image/png',  ext: 'png' },
  { label: 'WebP', mime: 'image/webp', ext: 'webp' },
  { label: 'BMP',  mime: 'image/bmp',  ext: 'bmp' },
];

export default function FormatConverter({ tool, config }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [imgEl, setImgEl] = useState(null);
  const [quality, setQuality] = useState(92);
  const [scale, setScale] = useState(100);

  // For 'Convert Format' tool (hasFormatSelect), user picks output format
  const [selectedFormat, setSelectedFormat] = useState(FORMAT_OPTIONS[1]); // default PNG

  const onFilesSelected = useCallback(async (selectedFiles) => {
    const f = selectedFiles[0];
    setFile(f);
    setResult(null);
    try {
      const img = await loadImage(f);
      setImgEl(img);
      if (preview) URL.revokeObjectURL(preview);
      setPreview(URL.createObjectURL(f));
    } catch {
      toast.error('Failed to load image');
    }
  }, [preview]);

  // Determine actual output format
  const getOutputMime = () => config?.hasFormatSelect ? selectedFormat.mime : (config?.toMime || 'image/png');
  const getOutputExt  = () => config?.hasFormatSelect ? selectedFormat.ext  : (config?.toExt  || 'png');
  const getOutputLabel = () => config?.hasFormatSelect ? selectedFormat.label : (config?.toLabel || 'Image');

  const processConversion = useCallback(async () => {
    if (!imgEl || !file) return;
    setProcessing(true);
    try {
      const s = scale / 100;
      const targetW = Math.max(1, Math.round(imgEl.naturalWidth * s));
      const targetH = Math.max(1, Math.round(imgEl.naturalHeight * s));

      // For SVG: draw on canvas directly
      let canvas;
      if (config?.isSvg) {
        canvas = document.createElement('canvas');
        canvas.width  = targetW;
        canvas.height = targetH;
        canvas.getContext('2d').drawImage(imgEl, 0, 0, targetW, targetH);
      } else {
        const r = resizeImage(imgEl, targetW, targetH);
        canvas = r.canvas;
      }

      const mime = getOutputMime();
      const isPng = mime === 'image/png' || mime === 'image/bmp';

      const blob = await new Promise((resolve, reject) => {
        if (isPng) {
          canvas.toBlob((b) => b ? resolve(b) : reject(new Error('toBlob returned null')), mime);
        } else {
          canvas.toBlob((b) => b ? resolve(b) : reject(new Error('toBlob returned null')), mime, quality / 100);
        }
      });

      if (result?.url) URL.revokeObjectURL(result.url);
      setResult({ blob, url: URL.createObjectURL(blob), size: blob.size, width: targetW, height: targetH });

      const pct = file.size > 0 ? ((1 - blob.size / file.size) * 100).toFixed(1) : 0;
      toast.success(`Converted to ${getOutputLabel()}!${pct > 0 ? ` (${pct}% smaller)` : ''}`);
    } catch (err) {
      console.error(err);
      toast.error('Conversion failed: ' + err.message);
    } finally {
      setProcessing(false);
    }
  }, [imgEl, file, config, quality, scale, selectedFormat]);

  const handleDownload = () => {
    if (!result) return;
    const ext = getOutputExt();
    const filename = generateOutputFilename(file.name, 'converted', ext);
    const a = document.createElement('a');
    a.href = result.url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const reset = () => {
    if (preview) URL.revokeObjectURL(preview);
    if (result?.url) URL.revokeObjectURL(result.url);
    setFile(null); setPreview(null); setResult(null); setImgEl(null);
    setQuality(92); setScale(100);
  };

  const isPng = getOutputMime() === 'image/png';
  const outputLabel = getOutputLabel();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {!file ? (
        <FileUploader
          onFilesSelected={onFilesSelected}
          accept={config?.accept || { 'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.bmp', '.gif', '.svg'] }}
          label={`Drop your ${config?.fromLabel || 'image'} file here`}
          sublabel={config?.hasFormatSelect ? 'Upload any image and choose output format below' : `Converts to ${config?.toLabel || 'image'}`}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Before / After */}
          <div className="preview-grid">
            <div>
              <div className="preview-label">Original ({config?.fromLabel || 'Image'})</div>
              <div className="preview-box checkerboard">
                <img src={preview} alt="Original" />
              </div>
              <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 8 }}>
                {imgEl?.naturalWidth} × {imgEl?.naturalHeight} · {formatBytes(file.size)}
              </p>
            </div>
            <div>
              <div className="preview-label">
                {result ? `Converted (${outputLabel})` : `→ ${outputLabel}`}
              </div>
              <div className="preview-box checkerboard">
                {result ? (
                  <img src={result.url} alt="Converted" />
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, color: 'var(--muted-soft)' }}>
                    <ArrowRight size={28} />
                    <span style={{ fontSize: 13 }}>Click Convert</span>
                  </div>
                )}
              </div>
              {result && (
                <p style={{ fontSize: 12, color: 'var(--success)', marginTop: 8, fontWeight: 600 }}>
                  {result.width} × {result.height} · {formatBytes(result.size)}
                </p>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Format selector — only for "Convert Format" tool */}
            {config?.hasFormatSelect && (
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 10 }}>
                  Convert to
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {FORMAT_OPTIONS.map(fmt => (
                    <button
                      key={fmt.ext}
                      onClick={() => { setSelectedFormat(fmt); setResult(null); }}
                      className={`pill ${selectedFormat.ext === fmt.ext ? 'pill-active' : ''}`}>
                      {fmt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quality — for lossy formats */}
            {!isPng && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                  <span style={{ color: 'var(--muted)' }}>Quality</span>
                  <span style={{ fontWeight: 700, color: 'var(--ink)' }}>{quality}%</span>
                </div>
                <input type="range" min="10" max="100" value={quality}
                  onChange={(e) => { setQuality(Number(e.target.value)); setResult(null); }} />
              </div>
            )}

            {isPng && (
              <div style={{ fontSize: 13, color: 'var(--muted)', padding: '10px 14px', background: 'var(--primary-light)', borderRadius: 10 }}>
                💡 PNG is lossless — no quality loss during conversion.
              </div>
            )}

            {/* Scale */}
            {config?.hasScale && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                  <span style={{ color: 'var(--muted)' }}>Scale</span>
                  <span style={{ fontWeight: 700, color: 'var(--ink)' }}>{scale}%</span>
                </div>
                <input type="range" min="10" max="400" value={scale}
                  onChange={(e) => { setScale(Number(e.target.value)); setResult(null); }} />
              </div>
            )}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {!result ? (
              <button onClick={processConversion} disabled={processing} className="btn-primary">
                {processing
                  ? <Loader2 size={16} style={{ animation: 'spin 0.6s linear infinite' }} />
                  : null}
                {processing ? 'Converting...' : `Convert to ${outputLabel}`}
              </button>
            ) : (
              <button onClick={handleDownload} className="btn-success">
                <Download size={16} />
                Download {outputLabel}
              </button>
            )}
            {result && (
              <button onClick={() => setResult(null)} className="btn-secondary">
                Convert Again
              </button>
            )}
            <button onClick={reset} className="btn-secondary">
              <RotateCcw size={16} /> New File
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
