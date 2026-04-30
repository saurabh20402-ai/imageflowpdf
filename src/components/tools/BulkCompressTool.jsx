'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Download, RotateCcw, Loader2, Package, Trash2, Plus, CheckCircle } from 'lucide-react';
import { loadImage, drawImageToCanvas, canvasToBlob } from '@/lib/image-processor';
import { downloadAsZip } from '@/lib/download';
import { formatBytes, generateOutputFilename, compressionPercent } from '@/lib/utils';
import { toast } from 'sonner';

export default function BulkCompressTool({ tool, config }) {
  const [files, setFiles] = useState([]);
  const [results, setResults] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [quality, setQuality] = useState(75);
  const [format, setFormat] = useState('image/jpeg');

  const addFiles = useCallback((e) => {
    const newFiles = Array.from(e.target.files || []);
    if (newFiles.length === 0) return;
    setFiles(prev => {
      const existing = new Set(prev.map(f => f.name + f.size));
      const unique = newFiles.filter(f => !existing.has(f.name + f.size));
      return [...prev, ...unique];
    });
    setResults([]);
    e.target.value = '';
  }, []);

  const removeFile = (i) => {
    setFiles(prev => prev.filter((_, j) => j !== i));
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
          const { canvas } = drawImageToCanvas(img);
          const blob = await canvasToBlob(canvas, format, quality / 100);
          const ext = format === 'image/jpeg' ? 'jpg' : format === 'image/webp' ? 'webp' : 'png';
          out.push({
            blob,
            filename: generateOutputFilename(f.name, 'compressed', ext),
            originalSize: f.size,
            compressedSize: blob.size,
            name: f.name,
          });
        } catch {
          out.push({ error: true, name: f.name });
        }
        setProgress(Math.round(((i + 1) / files.length) * 100));
      }
      setResults(out);
      const ok = out.filter(r => !r.error);
      toast.success(`Compressed ${ok.length} of ${files.length} images!`);
    } catch (err) {
      toast.error('Batch compression failed: ' + err.message);
    } finally {
      setProcessing(false);
    }
  }, [files, quality, format]);

  const downloadAll = async () => {
    const toZip = results.filter(r => !r.error).map(r => ({ blob: r.blob, filename: r.filename }));
    if (toZip.length === 0) return;
    await downloadAsZip(toZip, 'imageflow-compressed.zip');
    toast.success('ZIP downloaded!');
  };

  const reset = () => { setFiles([]); setResults([]); setProgress(0); };

  const totalOriginal = files.reduce((s, f) => s + f.size, 0);
  const totalCompressed = results.filter(r => !r.error).reduce((s, r) => s + r.compressedSize, 0);
  const totalSaved = totalOriginal > 0 && totalCompressed > 0
    ? compressionPercent(totalOriginal, totalCompressed)
    : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Drop zone / Add more */}
      <label htmlFor="bulk-file-input" style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 10, padding: '28px 20px', borderRadius: 'var(--radius-lg)',
        border: '2px dashed var(--hairline)', cursor: 'pointer',
        background: 'var(--surface)', transition: 'all 200ms',
      }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const dropped = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
          if (dropped.length) {
            setFiles(prev => {
              const existing = new Set(prev.map(f => f.name + f.size));
              return [...prev, ...dropped.filter(f => !existing.has(f.name + f.size))];
            });
            setResults([]);
          }
        }}>
        <input
          id="bulk-file-input"
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,image/bmp,image/gif"
          style={{ display: 'none' }}
          onChange={addFiles}
        />
        <Package size={28} style={{ color: 'var(--primary)' }} />
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>
            {files.length > 0 ? 'Drop more images or click to add' : 'Drop images here or click to browse'}
          </p>
          <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>
            Select multiple files at once · JPG, PNG, WebP, BMP
          </p>
        </div>
        {files.length > 0 && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '6px 14px', borderRadius: 99,
            background: 'var(--primary-light)', color: 'var(--primary)',
            fontSize: 13, fontWeight: 600,
          }}>
            <Plus size={14} /> Add More
          </div>
        )}
      </label>

      {files.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Summary bar */}
          <div style={{
            display: 'flex', gap: 20, padding: '12px 16px',
            background: 'var(--surface)', borderRadius: 'var(--radius-md)',
            border: '1px solid var(--hairline)', flexWrap: 'wrap',
          }}>
            <span style={{ fontSize: 13, color: 'var(--muted)' }}>
              <strong style={{ color: 'var(--ink)' }}>{files.length}</strong> images selected
            </span>
            <span style={{ fontSize: 13, color: 'var(--muted)' }}>
              Total: <strong style={{ color: 'var(--ink)' }}>{formatBytes(totalOriginal)}</strong>
            </span>
            {totalSaved !== null && (
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--success)' }}>
                ↓ Saved {totalSaved}% ({formatBytes(totalOriginal - totalCompressed)})
              </span>
            )}
          </div>

          {/* File list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 280, overflowY: 'auto', paddingRight: 4 }}>
            {files.map((f, i) => {
              const r = results[i];
              return (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 14px', borderRadius: 10,
                  background: 'var(--surface)', border: '1px solid var(--hairline)',
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 6,
                    background: 'var(--primary-light)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    fontSize: 11, fontWeight: 700, color: 'var(--primary)',
                  }}>{i + 1}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {f.name}
                    </p>
                    <p style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
                      {formatBytes(f.size)}
                      {r && !r.error && (
                        <span style={{ color: 'var(--success)', marginLeft: 8 }}>
                          → {formatBytes(r.compressedSize)} (−{compressionPercent(f.size, r.compressedSize)}%)
                        </span>
                      )}
                      {r?.error && <span style={{ color: 'var(--error)', marginLeft: 8 }}>Failed</span>}
                    </p>
                  </div>
                  {r && !r.error && <CheckCircle size={16} style={{ color: 'var(--success)', flexShrink: 0 }} />}
                  <button onClick={() => removeFile(i)} style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'var(--muted)', padding: 4, flexShrink: 0,
                  }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Controls */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                <span style={{ color: 'var(--muted)' }}>Quality</span>
                <span style={{ fontWeight: 700, color: 'var(--ink)' }}>{quality}%</span>
              </div>
              <input type="range" min="5" max="100" value={quality}
                onChange={(e) => { setQuality(Number(e.target.value)); setResults([]); }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--muted-soft)', marginTop: 4 }}>
                <span>Smaller file</span><span>Better quality</span>
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--muted)', marginBottom: 8 }}>Output Format</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {[['image/jpeg', 'JPEG'], ['image/webp', 'WebP'], ['image/png', 'PNG']].map(([m, l]) => (
                  <button key={m} onClick={() => { setFormat(m); setResults([]); }}
                    className={`pill ${format === m ? 'pill-active' : ''}`} style={{ fontSize: 12 }}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Progress */}
          {processing && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)' }}>
                <span>Compressing...</span><span style={{ fontWeight: 600 }}>{progress}%</span>
              </div>
              <div style={{ height: 6, background: 'var(--hairline)', borderRadius: 99, overflow: 'hidden' }}>
                <div style={{ height: '100%', background: 'var(--success)', width: `${progress}%`, transition: 'width 200ms', borderRadius: 99 }} />
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {results.length === 0 ? (
              <button onClick={processAll} disabled={processing} className="btn-primary">
                {processing ? <Loader2 size={16} style={{ animation: 'spin 0.6s linear infinite' }} /> : <Package size={16} />}
                {processing ? `${progress}%` : `Compress All (${files.length})`}
              </button>
            ) : (
              <button onClick={downloadAll} className="btn-success">
                <Download size={16} /> Download ZIP ({results.filter(r => !r.error).length} files)
              </button>
            )}
            <button onClick={reset} className="btn-secondary">
              <RotateCcw size={16} /> Clear All
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
