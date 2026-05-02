'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Download, RotateCcw, Loader2, RotateCw } from 'lucide-react';
import FileUploader from '@/components/FileUploader';
import { loadImage, rotateImage, canvasToBlob } from '@/lib/image-processor';
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
  const isRotateMode = true;

  const onFilesSelected = useCallback(async (selectedFiles) => {
    const f = selectedFiles[0]; setFile(f); setResult(null);
    setAngle(0);
    try { const img = await loadImage(f); setImgEl(img); setPreview(URL.createObjectURL(f)); }
    catch { toast.error('Failed to load image'); }
  }, []);

  const processTransform = useCallback(async () => {
    if (!imgEl) return; setProcessing(true);
    try {
      const { canvas } = rotateImage(imgEl, angle);
      const blob = await canvasToBlob(canvas, 'image/png', 0.95);
      setResult({ blob, url: URL.createObjectURL(blob) });
      toast.success('Transform applied!');
    } catch (err) { toast.error('Failed: ' + err.message); }
    finally { setProcessing(false); }
  }, [imgEl, angle]);

  const handleDownload = () => {
    if (!result) return;
    downloadBlob(result.blob, generateOutputFilename(file.name, isRotateMode ? `rotated-${angle}` : 'flipped', 'png'));
  };

  const reset = () => {
    if (preview) URL.revokeObjectURL(preview);
    if (result?.url) URL.revokeObjectURL(result.url);
    setFile(null); setPreview(null); setResult(null); setImgEl(null);
    setAngle(0);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {!file ? (
        <FileUploader onFilesSelected={onFilesSelected} label="Drop image to rotate" />
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
                    transform: !result ? `rotate(${angle}deg)` : 'none',
                    transition: 'transform 300ms ease',
                  }} />
              </div>
            </div>
          </div>

          <div className="card">
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
