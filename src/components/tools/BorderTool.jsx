'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Download, RotateCcw, Loader2, Square, Circle } from 'lucide-react';
import FileUploader from '@/components/FileUploader';
import { loadImage, addBorder, roundCorners, canvasToBlob } from '@/lib/image-processor';
import { downloadBlob } from '@/lib/download';
import { generateOutputFilename } from '@/lib/utils';
import { toast } from 'sonner';

export default function BorderTool({ tool, config }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [imgEl, setImgEl] = useState(null);
  const [borderWidth, setBorderWidth] = useState(20);
  const [borderColor, setBorderColor] = useState('#ffffff');
  const [radius, setRadius] = useState(30);
  const [isCircle, setIsCircle] = useState(false);

  const isBorderMode = config?.mode === 'border';

  const onFilesSelected = useCallback(async (f0) => {
    const f = f0[0]; setFile(f); setResult(null);
    try { const img = await loadImage(f); setImgEl(img); setPreview(URL.createObjectURL(f)); }
    catch { toast.error('Failed to load image'); }
  }, []);

  const process = useCallback(async () => {
    if (!imgEl) return; setProcessing(true);
    try {
      let canvas;
      if (isBorderMode) {
        ({ canvas } = addBorder(imgEl, borderWidth, borderColor));
      } else {
        const r = isCircle ? Math.min(imgEl.naturalWidth, imgEl.naturalHeight) / 2 : radius;
        ({ canvas } = roundCorners(imgEl, r));
      }
      const blob = await canvasToBlob(canvas, 'image/png', 0.95);
      setResult({ blob, url: URL.createObjectURL(blob) });
      toast.success(isBorderMode ? 'Border added!' : 'Corners rounded!');
    } catch (err) { toast.error('Failed: ' + err.message); }
    finally { setProcessing(false); }
  }, [imgEl, borderWidth, borderColor, radius, isCircle, isBorderMode]);

  const handleDownload = () => downloadBlob(result.blob, generateOutputFilename(file.name, tool.slug, 'png'));
  const reset = () => { setFile(null); setPreview(null); setResult(null); setImgEl(null); };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {!file ? <FileUploader onFilesSelected={onFilesSelected} label={isBorderMode ? 'Drop image to add border' : 'Drop image to round corners'} /> : (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="preview-grid">
            <div>
              <div className="preview-label">Original</div>
              <div className="preview-box checkerboard"><img src={preview} alt="Original" /></div>
            </div>
            <div>
              <div className="preview-label">{result ? 'Result' : 'Preview'}</div>
              <div className="preview-box checkerboard"><img src={result?.url || preview} alt="Result" /></div>
            </div>
          </div>

          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {isBorderMode ? (
              <>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--muted)', marginBottom: 4 }}>
                    <span>Border Width</span><span style={{ fontWeight: 600, color: 'var(--ink)' }}>{borderWidth}px</span>
                  </div>
                  <input type="range" min="1" max="100" value={borderWidth} onChange={(e) => setBorderWidth(Number(e.target.value))} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <label style={{ fontSize: 13, color: 'var(--muted)' }}>Color</label>
                  <input type="color" value={borderColor} onChange={(e) => setBorderColor(e.target.value)} />
                  <div style={{ display: 'flex', gap: 6 }}>
                    {['#ffffff', '#000000', '#6366f1', '#ef4444', '#f59e0b'].map(c => (
                      <button key={c} onClick={() => setBorderColor(c)}
                        style={{
                          width: 24, height: 24, borderRadius: '50%', background: c, cursor: 'pointer',
                          border: borderColor === c ? '2px solid var(--primary)' : '2px solid var(--hairline)',
                          transition: 'all 150ms',
                        }} />
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <button onClick={() => setIsCircle(false)} className={`pill ${!isCircle ? 'pill-active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Square size={14} /> Rounded
                  </button>
                  <button onClick={() => setIsCircle(true)} className={`pill ${isCircle ? 'pill-active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Circle size={14} /> Circle
                  </button>
                </div>
                {!isCircle && (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--muted)', marginBottom: 4 }}>
                      <span>Corner Radius</span><span style={{ fontWeight: 600, color: 'var(--ink)' }}>{radius}px</span>
                    </div>
                    <input type="range" min="1" max="200" value={radius} onChange={(e) => setRadius(Number(e.target.value))} />
                  </div>
                )}
              </>
            )}
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={process} disabled={processing} className="btn-primary">
              {processing ? <Loader2 size={16} className="animate-spin" /> : isBorderMode ? <Square size={16} /> : <Circle size={16} />}
              {processing ? 'Processing...' : 'Apply'}
            </button>
            {result && <button onClick={handleDownload} className="btn-success"><Download size={16} /> Download</button>}
            <button onClick={reset} className="btn-secondary"><RotateCcw size={16} /> Start Over</button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
