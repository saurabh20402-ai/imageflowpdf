'use client';

import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Eraser, Loader2, Download, RotateCcw } from 'lucide-react';
import FileUploader from '@/components/FileUploader';
import { loadImage, createCanvas, canvasToBlob } from '@/lib/image-processor';
import { downloadBlob } from '@/lib/download';
import { generateOutputFilename } from '@/lib/utils';
import { toast } from 'sonner';

function hexToRgb(hex) {
  const n = parseInt(hex.replace('#', ''), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

export default function RemoveBackgroundTool() {
  const [file, setFile] = useState(null);
  const [imgEl, setImgEl] = useState(null);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [tolerance, setTolerance] = useState(30);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);

  const onFilesSelected = useCallback(async (picked) => {
    const f = picked[0];
    setFile(f);
    setResult(null);
    const img = await loadImage(f);
    setImgEl(img);
  }, []);

  const process = useCallback(async () => {
    if (!imgEl || !file) return;
    setProcessing(true);
    try {
      const { canvas, ctx } = createCanvas(imgEl.naturalWidth, imgEl.naturalHeight);
      ctx.drawImage(imgEl, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const d = imageData.data;
      const c = hexToRgb(bgColor);
      for (let i = 0; i < d.length; i += 4) {
        const dr = d[i] - c.r;
        const dg = d[i + 1] - c.g;
        const db = d[i + 2] - c.b;
        const dist = Math.sqrt(dr * dr + dg * dg + db * db);
        if (dist <= tolerance) d[i + 3] = 0;
      }
      ctx.putImageData(imageData, 0, 0);
      const blob = await canvasToBlob(canvas, 'image/png');
      if (result?.url) URL.revokeObjectURL(result.url);
      setResult({ blob, url: URL.createObjectURL(blob) });
      toast.success('Background removed (solid-color mode).');
    } catch (e) {
      toast.error(`Failed: ${e.message}`);
    } finally {
      setProcessing(false);
    }
  }, [imgEl, file, bgColor, tolerance, result?.url]);

  const reset = () => {
    if (result?.url) URL.revokeObjectURL(result.url);
    setFile(null); setImgEl(null); setResult(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {!file ? (
        <FileUploader onFilesSelected={onFilesSelected} label="Drop image to remove background" sublabel="Best for solid-color backgrounds" />
      ) : (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 13 }}>Background color:</span>
              <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
              <span style={{ fontSize: 12, color: 'var(--muted)' }}>{bgColor}</span>
            </div>
            <div><div style={{ fontSize: 12 }}>Tolerance: {tolerance}</div><input type="range" min="0" max="120" value={tolerance} onChange={(e) => setTolerance(Number(e.target.value))} /></div>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {!result ? (
              <button className="btn-primary" onClick={process} disabled={processing} style={{ flex: 1 }}>
                {processing ? <Loader2 size={16} className="animate-spin" /> : <Eraser size={16} />}
                {processing ? 'Processing...' : 'Remove background'}
              </button>
            ) : (
              <button className="btn-success" onClick={() => downloadBlob(result.blob, generateOutputFilename(file.name, 'no-bg', 'png'))} style={{ flex: 1 }}>
                <Download size={16} /> Download PNG
              </button>
            )}
            <button className="btn-secondary" onClick={reset}><RotateCcw size={16} /> Start Over</button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

