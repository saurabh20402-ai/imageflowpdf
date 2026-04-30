'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Download, RotateCcw, Loader2, Grid3X3, Trash2 } from 'lucide-react';
import FileUploader from '@/components/FileUploader';
import { loadImage, createCanvas, canvasToBlob } from '@/lib/image-processor';
import { downloadBlob } from '@/lib/download';
import { toast } from 'sonner';

const LAYOUTS = [
  { label: '2×1', cols: 2, rows: 1 },
  { label: '1×2', cols: 1, rows: 2 },
  { label: '2×2', cols: 2, rows: 2 },
  { label: '3×1', cols: 3, rows: 1 },
  { label: '3×2', cols: 3, rows: 2 },
  { label: '3×3', cols: 3, rows: 3 },
];

export default function CollageTool({ tool }) {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [result, setResult] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [layout, setLayout] = useState(LAYOUTS[2]);
  const [cellSize, setCellSize] = useState(400);
  const [gap, setGap] = useState(8);
  const [bgColor, setBgColor] = useState('#ffffff');

  const onFilesSelected = useCallback((selectedFiles) => {
    const newPreviews = selectedFiles.map(f => URL.createObjectURL(f));
    setFiles(prev => [...prev, ...selectedFiles].slice(0, 9));
    setPreviews(prev => [...prev, ...newPreviews].slice(0, 9));
    setResult(null);
  }, []);

  const removeFile = (i) => {
    URL.revokeObjectURL(previews[i]);
    setFiles(prev => prev.filter((_, j) => j !== i));
    setPreviews(prev => prev.filter((_, j) => j !== i));
    setResult(null);
  };

  const needed = layout.cols * layout.rows;

  const process = useCallback(async () => {
    if (files.length < 1) { toast.error('Add at least one image'); return; }
    setProcessing(true);
    try {
      const imgs = await Promise.all(files.slice(0, needed).map(loadImage));
      const cw = layout.cols * cellSize + (layout.cols + 1) * gap;
      const ch = layout.rows * cellSize + (layout.rows + 1) * gap;
      const { canvas, ctx } = createCanvas(cw, ch);
      ctx.fillStyle = bgColor; ctx.fillRect(0, 0, cw, ch);

      imgs.forEach((img, i) => {
        const col = i % layout.cols, row = Math.floor(i / layout.cols);
        const x = gap + col * (cellSize + gap), y = gap + row * (cellSize + gap);
        const scale = Math.min(cellSize / img.naturalWidth, cellSize / img.naturalHeight);
        const dw = img.naturalWidth * scale, dh = img.naturalHeight * scale;
        const ox = x + (cellSize - dw) / 2, oy = y + (cellSize - dh) / 2;
        ctx.drawImage(img, ox, oy, dw, dh);
      });

      const blob = await canvasToBlob(canvas, 'image/png', 0.95);
      setResult({ blob, url: URL.createObjectURL(blob) });
      toast.success('Collage created!');
    } catch (err) { toast.error('Failed: ' + err.message); }
    finally { setProcessing(false); }
  }, [files, layout, cellSize, gap, bgColor, needed]);

  const reset = () => {
    previews.forEach(p => URL.revokeObjectURL(p));
    if (result?.url) URL.revokeObjectURL(result.url);
    setFiles([]); setPreviews([]); setResult(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <FileUploader onFilesSelected={onFilesSelected} multiple={true} maxFiles={9} label="Drop images for collage" sublabel={`Need ${needed} images for ${layout.label} layout`} />

      {(files.length > 0 || result) && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {previews.map((p, i) => (
              <div key={i} style={{ position: 'relative' }}>
                <img src={p} alt="" style={{ width: 72, height: 54, objectFit: 'cover', borderRadius: 6, border: '1px solid var(--hairline)' }} />
                <button onClick={() => removeFile(i)} style={{
                  position: 'absolute', top: -5, right: -5, width: 16, height: 16, borderRadius: '50%',
                  background: 'var(--error)', color: '#fff', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}><Trash2 size={8} /></button>
              </div>
            ))}
          </div>

          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 10 }}>Layout</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {LAYOUTS.map(l => (
                  <button key={l.label} onClick={() => setLayout(l)} className={`pill ${layout.label === l.label ? 'pill-active' : ''}`}>{l.label}</button>
                ))}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>
                  <span>Cell Size</span><span style={{ fontWeight: 600, color: 'var(--ink)' }}>{cellSize}px</span>
                </div>
                <input type="range" min="100" max="800" step="50" value={cellSize} onChange={(e) => setCellSize(Number(e.target.value))} />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>
                  <span>Gap</span><span style={{ fontWeight: 600, color: 'var(--ink)' }}>{gap}px</span>
                </div>
                <input type="range" min="0" max="40" value={gap} onChange={(e) => setGap(Number(e.target.value))} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <label style={{ fontSize: 13, color: 'var(--muted)' }}>Background</label>
              <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
            </div>
          </div>

          {result && (
            <div>
              <div className="preview-label">Collage Result</div>
              <div className="preview-box"><img src={result.url} alt="Collage" style={{ maxHeight: 300 }} /></div>
            </div>
          )}

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={process} disabled={processing || files.length === 0} className="btn-primary">
              {processing ? <Loader2 size={16} className="animate-spin" /> : <Grid3X3 size={16} />}
              {processing ? 'Creating...' : 'Create Collage'}
            </button>
            {result && <button onClick={() => downloadBlob(result.blob, 'collage.png')} className="btn-success"><Download size={16} /> Download</button>}
            <button onClick={reset} className="btn-secondary"><RotateCcw size={16} /> Clear All</button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
