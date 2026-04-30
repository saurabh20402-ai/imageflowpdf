'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Download, RotateCcw, Loader2, RotateCw, FlipHorizontal2, FlipVertical2 } from 'lucide-react';
import FileUploader from '@/components/FileUploader';
import { loadImage, rotateImage, flipImage, canvasToBlob } from '@/lib/image-processor';
import { downloadBlob } from '@/lib/download';
import { generateOutputFilename } from '@/lib/utils';
import { toast } from 'sonner';

export default function TransformTool({ tool, config }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [imgEl, setImgEl] = useState(null);
  const [angle, setAngle] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);

  const isRotateMode = config?.mode === 'rotate' || tool?.slug?.includes('rotate');

  const onFilesSelected = useCallback(async (selectedFiles) => {
    const f = selectedFiles[0]; setFile(f); setResult(null);
    setAngle(0); setFlipH(false); setFlipV(false);
    try { const img = await loadImage(f); setImgEl(img); setPreview(URL.createObjectURL(f)); }
    catch { toast.error('Failed to load image'); }
  }, []);

  const processTransform = useCallback(async () => {
    if (!imgEl) return; setProcessing(true);
    try {
      let canvas;
      if (isRotateMode) {
        ({ canvas } = rotateImage(imgEl, angle));
      } else {
        if (flipH) {
          const r = flipImage(imgEl, true);
          const blob = await canvasToBlob(r.canvas, 'image/png');
          const url = URL.createObjectURL(blob);
          const tempImg = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = url; });
          if (flipV) {
            ({ canvas } = flipImage(tempImg, false));
          } else {
            canvas = r.canvas;
          }
        } else if (flipV) {
          ({ canvas } = flipImage(imgEl, false));
        } else {
          const { createCanvas: cc, ctx: cx } = { createCanvas: () => { const c = document.createElement('canvas'); c.width = imgEl.naturalWidth; c.height = imgEl.naturalHeight; return c; } };
          canvas = cc();
          canvas.getContext('2d').drawImage(imgEl, 0, 0);
        }
      }
      const blob = await canvasToBlob(canvas, 'image/png', 0.95);
      setResult({ blob, url: URL.createObjectURL(blob) });
      toast.success('Transform applied!');
    } catch (err) { toast.error('Failed: ' + err.message); }
    finally { setProcessing(false); }
  }, [imgEl, angle, flipH, flipV, isRotateMode]);

  const handleDownload = () => {
    if (!result) return;
    downloadBlob(result.blob, generateOutputFilename(file.name, isRotateMode ? `rotated-${angle}` : 'flipped', 'png'));
  };

  const reset = () => {
    if (preview) URL.revokeObjectURL(preview);
    if (result?.url) URL.revokeObjectURL(result.url);
    setFile(null); setPreview(null); setResult(null); setImgEl(null);
    setAngle(0); setFlipH(false); setFlipV(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {!file ? (
        <FileUploader onFilesSelected={onFilesSelected} label={isRotateMode ? 'Drop image to rotate' : 'Drop image to flip'} />
      ) : (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Live Preview */}
          <div className="preview-grid">
            <div>
              <div className="preview-label">Original</div>
              <div className="preview-box"><img src={preview} alt="Original" /></div>
            </div>
            <div>
              <div className="preview-label">{result ? 'Result' : 'Live Preview'}</div>
              <div className="preview-box">
                <img src={result?.url || preview} alt="Preview"
                  style={{
                    transform: !result ? `rotate(${angle}deg) scaleX(${flipH ? -1 : 1}) scaleY(${flipV ? -1 : 1})` : 'none',
                    transition: 'transform 300ms ease',
                  }} />
              </div>
            </div>
          </div>

          <div className="card">
            {isRotateMode ? (
              <>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 10 }}>Rotate</label>
                <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                  {[90, 180, 270].map(deg => (
                    <button key={deg} onClick={() => setAngle(deg)}
                      className={`pill ${angle === deg ? 'pill-active' : ''}`}>
                      {deg}°
                    </button>
                  ))}
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                    <span style={{ color: 'var(--muted)' }}>Custom Angle</span>
                    <span style={{ fontWeight: 600, color: 'var(--ink)' }}>{angle}°</span>
                  </div>
                  <input type="range" min="0" max="360" value={angle} onChange={(e) => setAngle(Number(e.target.value))} />
                </div>
              </>
            ) : (
              <>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 10 }}>Flip Direction</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => setFlipH(!flipH)}
                    className={`pill ${flipH ? 'pill-active' : ''}`}
                    style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <FlipHorizontal2 size={14} /> Horizontal
                  </button>
                  <button onClick={() => setFlipV(!flipV)}
                    className={`pill ${flipV ? 'pill-active' : ''}`}
                    style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <FlipVertical2 size={14} /> Vertical
                  </button>
                </div>
              </>
            )}
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={processTransform} disabled={processing} className="btn-primary">
              {processing ? <Loader2 size={16} className="animate-spin" /> : <RotateCw size={16} />}
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
