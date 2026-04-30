'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Download, RotateCcw, Loader2, Layers, Trash2, CheckCircle } from 'lucide-react';
import { loadImage, resizeImage, canvasToBlob } from '@/lib/image-processor';
import { downloadAsZip } from '@/lib/download';
import { formatBytes, generateOutputFilename } from '@/lib/utils';
import { toast } from 'sonner';

const PRESETS = [
  { label: 'HD 1080p', w: 1920, h: 1080 },
  { label: 'HD 720p', w: 1280, h: 720 },
  { label: 'Instagram', w: 1080, h: 1080 },
  { label: 'Twitter', w: 1200, h: 675 },
  { label: 'Facebook', w: 1200, h: 630 },
];

export default function BatchResizeTool({ tool, config }) {
  const [files, setFiles] = useState([]);
  const [results, setResults] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mode, setMode] = useState('pixels'); // 'pixels' | 'percentage'
  const [width, setWidth] = useState(1280);
  const [height, setHeight] = useState(720);
  const [percentage, setPercentage] = useState(50);
  const [keepAspect, setKeepAspect] = useState(true);

  const addFiles = useCallback((e) => {
    const newFiles = Array.from(e.target.files || []);
    if (!newFiles.length) return;
    setFiles(prev => {
      const existing = new Set(prev.map(f => f.name + f.size));
      return [...prev, ...newFiles.filter(f => !existing.has(f.name + f.size))];
    });
    setResults([]);
    e.target.value = '';
  }, []);

  const removeFile = (i) => {
    setFiles(prev => prev.filter((_, j) => j !== i));
    setResults([]);
  };

  const applyPreset = (p) => {
    setMode('pixels');
    setWidth(p.w);
    setHeight(p.h);
    setResults([]);
  };

  const processAll = useCallback(async () => {
    if (files.length === 0) { toast.error('Add at least one image'); return; }
    setProcessing(true);
    setProgress(0);
    const out = [];
    try {
      for (let i = 0; i < files.length; i++) {
        const f = files[i];
        try {
          const img = await loadImage(f);
          let tw, th;
          if (mode === 'percentage') {
            tw = Math.round(img.naturalWidth * percentage / 100);
            th = Math.round(img.naturalHeight * percentage / 100);
          } else if (keepAspect) {
            const ratio = img.naturalWidth / img.naturalHeight;
            tw = width;
            th = Math.round(width / ratio);
          } else {
            tw = width; th = height;
          }
          const { canvas } = resizeImage(img, tw, th);
          const blob = await canvasToBlob(canvas, 'image/jpeg', 0.9);
          out.push({
            blob,
            filename: generateOutputFilename(f.name, `${tw}x${th}`, 'jpg'),
            name: f.name,
            originalSize: f.size,
            compressedSize: blob.size,
            width: tw, height: th,
          });
        } catch {
          out.push({ error: true, name: f.name });
        }
        setProgress(Math.round(((i + 1) / files.length) * 100));
      }
      setResults(out);
      toast.success(`Resized ${out.filter(r => !r.error).length} images!`);
    } catch (err) {
      toast.error('Batch resize failed: ' + err.message);
    } finally {
      setProcessing(false);
    }
  }, [files, mode, width, height, percentage, keepAspect]);

  const downloadAll = async () => {
    const toZip = results.filter(r => !r.error).map(r => ({ blob: r.blob, filename: r.filename }));
    await downloadAsZip(toZip, 'imageflow-resized.zip');
    toast.success('ZIP downloaded!');
  };

  const reset = () => { setFiles([]); setResults([]); setProgress(0); };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* File drop zone */}
      <label htmlFor="batch-resize-input" style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 10, padding: '28px 20px', borderRadius: 'var(--radius-lg)',
        border: '2px dashed var(--hairline)', cursor: 'pointer',
        background: 'var(--surface)', transition: 'all 200ms',
      }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const dropped = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
          if (dropped.length) { setFiles(prev => [...prev, ...dropped]); setResults([]); }
        }}>
        <input id="batch-resize-input" type="file" multiple
          accept="image/jpeg,image/png,image/webp,image/bmp"
          style={{ display: 'none' }} onChange={addFiles} />
        <Layers size={28} style={{ color: 'var(--primary)' }} />
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>
            {files.length > 0 ? 'Drop more images or click to add' : 'Drop images here or click to browse'}
          </p>
          <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>
            Select multiple files at once
          </p>
        </div>
      </label>

      {files.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* File list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 240, overflowY: 'auto' }}>
            {files.map((f, i) => {
              const r = results[i];
              return (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px',
                  borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--hairline)',
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 6, background: 'var(--primary-light)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    fontSize: 11, fontWeight: 700, color: 'var(--primary)',
                  }}>{i + 1}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</p>
                    <p style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
                      {formatBytes(f.size)}
                      {r && !r.error && <span style={{ color: 'var(--success)', marginLeft: 8 }}>→ {r.width}×{r.height}</span>}
                      {r?.error && <span style={{ color: 'var(--error)', marginLeft: 8 }}>Failed</span>}
                    </p>
                  </div>
                  {r && !r.error && <CheckCircle size={16} style={{ color: 'var(--success)', flexShrink: 0 }} />}
                  <button onClick={() => removeFile(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', padding: 4 }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Controls */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 10 }}>Resize Mode</label>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => setMode('pixels')} className={`pill ${mode === 'pixels' ? 'pill-active' : ''}`}>By Pixels</button>
                <button onClick={() => setMode('percentage')} className={`pill ${mode === 'percentage' ? 'pill-active' : ''}`}>By Percentage</button>
              </div>
            </div>

            {mode === 'pixels' ? (
              <>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--muted)', marginBottom: 8 }}>Quick Presets</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {PRESETS.map(p => (
                      <button key={p.label} onClick={() => applyPreset(p)}
                        className="pill" style={{ fontSize: 11 }}>{p.label}</button>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ fontSize: 12, color: 'var(--muted)' }}>Width (px)</label>
                    <input type="number" value={width} min="1" max="8000"
                      onChange={(e) => { setWidth(Number(e.target.value)); setResults([]); }}
                      className="input" style={{ marginTop: 6 }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, color: 'var(--muted)' }}>Height (px)</label>
                    <input type="number" value={height} min="1" max="8000"
                      disabled={keepAspect}
                      onChange={(e) => { setHeight(Number(e.target.value)); setResults([]); }}
                      className="input" style={{ marginTop: 6, opacity: keepAspect ? 0.5 : 1 }} />
                  </div>
                </div>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, color: 'var(--muted)' }}>
                  <input type="checkbox" checked={keepAspect} onChange={(e) => setKeepAspect(e.target.checked)} />
                  Keep aspect ratio
                </label>
              </>
            ) : (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                  <span style={{ color: 'var(--muted)' }}>Scale</span>
                  <span style={{ fontWeight: 700, color: 'var(--ink)' }}>{percentage}%</span>
                </div>
                <input type="range" min="5" max="400" value={percentage}
                  onChange={(e) => { setPercentage(Number(e.target.value)); setResults([]); }} />
              </div>
            )}
          </div>

          {processing && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)' }}>
                <span>Resizing...</span><span style={{ fontWeight: 600 }}>{progress}%</span>
              </div>
              <div style={{ height: 6, background: 'var(--hairline)', borderRadius: 99, overflow: 'hidden' }}>
                <div style={{ height: '100%', background: 'var(--primary)', width: `${progress}%`, transition: 'width 200ms', borderRadius: 99 }} />
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {results.length === 0 ? (
              <button onClick={processAll} disabled={processing} className="btn-primary">
                {processing ? <Loader2 size={16} style={{ animation: 'spin 0.6s linear infinite' }} /> : <Layers size={16} />}
                {processing ? `${progress}%` : `Resize All (${files.length})`}
              </button>
            ) : (
              <button onClick={downloadAll} className="btn-success">
                <Download size={16} /> Download ZIP ({results.filter(r => !r.error).length} files)
              </button>
            )}
            <button onClick={reset} className="btn-secondary"><RotateCcw size={16} /> Clear All</button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
