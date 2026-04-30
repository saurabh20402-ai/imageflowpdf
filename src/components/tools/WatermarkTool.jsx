'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Download, RotateCcw, Loader2, BadgeCheck } from 'lucide-react';
import FileUploader from '@/components/FileUploader';
import { loadImage, addWatermark, canvasToBlob } from '@/lib/image-processor';
import { downloadBlob } from '@/lib/download';
import { generateOutputFilename } from '@/lib/utils';
import { toast } from 'sonner';

const POSITIONS = ['center', 'top-left', 'top-right', 'bottom-left', 'bottom-right'];

export default function WatermarkTool({ tool }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [imgEl, setImgEl] = useState(null);
  const [text, setText] = useState('ImageFlow');
  const [fontSize, setFontSize] = useState(48);
  const [color, setColor] = useState('#ffffff');
  const [opacity, setOpacity] = useState(50);
  const [position, setPosition] = useState('center');
  const [rotation, setRotation] = useState(-30);
  const [tiled, setTiled] = useState(false);

  const onFilesSelected = useCallback(async (f0) => {
    const f = f0[0]; setFile(f); setResult(null);
    try { const img = await loadImage(f); setImgEl(img); setPreview(URL.createObjectURL(f)); }
    catch { toast.error('Failed to load image'); }
  }, []);

  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  };

  const process = useCallback(async () => {
    if (!imgEl || !text.trim()) return; setProcessing(true);
    try {
      const { canvas } = addWatermark(imgEl, text, {
        fontSize, color: hexToRgba(color, opacity / 100), position, rotation, tiled,
      });
      const blob = await canvasToBlob(canvas, 'image/png', 0.95);
      setResult({ blob, url: URL.createObjectURL(blob) });
      toast.success('Watermark added!');
    } catch (err) { toast.error('Failed: ' + err.message); }
    finally { setProcessing(false); }
  }, [imgEl, text, fontSize, color, opacity, position, rotation, tiled]);

  const handleDownload = () => downloadBlob(result.blob, generateOutputFilename(file.name, 'watermarked', 'png'));
  const reset = () => { setFile(null); setPreview(null); setResult(null); setImgEl(null); };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {!file ? <FileUploader onFilesSelected={onFilesSelected} label="Drop image to add watermark" /> : (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="preview-grid">
            <div>
              <div className="preview-label">Original</div>
              <div className="preview-box"><img src={preview} alt="Original" /></div>
            </div>
            <div>
              <div className="preview-label">{result ? 'With Watermark' : 'Preview'}</div>
              <div className="preview-box"><img src={result?.url || preview} alt="Preview" /></div>
            </div>
          </div>

          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: 'var(--muted)', marginBottom: 6 }}>Watermark Text</label>
              <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="input" placeholder="Your watermark text" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>
                  <span>Font Size</span><span style={{ fontWeight: 600, color: 'var(--ink)' }}>{fontSize}px</span>
                </div>
                <input type="range" min="12" max="120" value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>
                  <span>Opacity</span><span style={{ fontWeight: 600, color: 'var(--ink)' }}>{opacity}%</span>
                </div>
                <input type="range" min="5" max="100" value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <label style={{ fontSize: 13, color: 'var(--muted)' }}>Color</label>
              <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>
                <span>Rotation</span><span style={{ fontWeight: 600, color: 'var(--ink)' }}>{rotation}°</span>
              </div>
              <input type="range" min="-90" max="90" value={rotation} onChange={(e) => setRotation(Number(e.target.value))} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--ink)', marginBottom: 8 }}>Position</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {POSITIONS.map(p => (
                  <button key={p} onClick={() => { setPosition(p); setTiled(false); }}
                    className={`pill ${position === p && !tiled ? 'pill-active' : ''}`} style={{ fontSize: 12 }}>
                    {p.replace('-', ' ')}
                  </button>
                ))}
                <button onClick={() => setTiled(!tiled)} className={`pill ${tiled ? 'pill-active' : ''}`} style={{ fontSize: 12 }}>Tiled</button>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={process} disabled={processing || !text.trim()} className="btn-primary">
              {processing ? <Loader2 size={16} className="animate-spin" /> : <BadgeCheck size={16} />}
              {processing ? 'Adding...' : 'Add Watermark'}
            </button>
            {result && <button onClick={handleDownload} className="btn-success"><Download size={16} /> Download</button>}
            <button onClick={reset} className="btn-secondary"><RotateCcw size={16} /> Start Over</button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
