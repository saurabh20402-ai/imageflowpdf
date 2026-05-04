'use client';

import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { IdCard, Loader2, Download, RotateCcw } from 'lucide-react';
import FileUploader from '@/components/FileUploader';
import { loadImage, createCanvas, canvasToBlob } from '@/lib/image-processor';
import { downloadBlob } from '@/lib/download';
import { generateOutputFilename } from '@/lib/utils';
import { toast } from 'sonner';

const PRESETS = [
  { id: 'in', name: 'India 35×45mm', w: 35, h: 45, dpi: 300 },
  { id: 'eu', name: 'EU 35×45mm', w: 35, h: 45, dpi: 300 },
  { id: 'us', name: 'US 2×2in', w: 50.8, h: 50.8, dpi: 300 },
];
const mmToPx = (mm, dpi) => Math.round((mm / 25.4) * dpi);

export default function PassportPhotoTool() {
  const [file, setFile] = useState(null);
  const [imgEl, setImgEl] = useState(null);
  const [preset, setPreset] = useState(PRESETS[0]);
  const [zoom, setZoom] = useState(1.1);
  const [xShift, setXShift] = useState(0);
  const [yShift, setYShift] = useState(-0.05);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);

  const onFilesSelected = useCallback(async (picked) => {
    const f = picked[0];
    setFile(f);
    setResult(null);
    setImgEl(await loadImage(f));
  }, []);

  const generate = useCallback(async () => {
    if (!imgEl || !file) return;
    setProcessing(true);
    try {
      const outW = mmToPx(preset.w, preset.dpi);
      const outH = mmToPx(preset.h, preset.dpi);
      const ar = outW / outH;
      let cw = imgEl.naturalWidth;
      let ch = Math.round(cw / ar);
      if (ch > imgEl.naturalHeight) {
        ch = imgEl.naturalHeight;
        cw = Math.round(ch * ar);
      }
      cw = Math.round(cw / zoom);
      ch = Math.round(ch / zoom);
      const cx = imgEl.naturalWidth / 2 + xShift * (imgEl.naturalWidth * 0.15);
      const cy = imgEl.naturalHeight / 2 + yShift * (imgEl.naturalHeight * 0.15);
      let sx = Math.round(cx - cw / 2);
      let sy = Math.round(cy - ch / 2);
      sx = Math.max(0, Math.min(imgEl.naturalWidth - cw, sx));
      sy = Math.max(0, Math.min(imgEl.naturalHeight - ch, sy));

      const { canvas, ctx } = createCanvas(outW, outH);
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, outW, outH);
      ctx.drawImage(imgEl, sx, sy, cw, ch, 0, 0, outW, outH);
      const blob = await canvasToBlob(canvas, 'image/jpeg', 0.92);
      if (result?.url) URL.revokeObjectURL(result.url);
      setResult({ blob, url: URL.createObjectURL(blob) });
      toast.success('Passport photo generated.');
    } catch (e) {
      toast.error(`Failed: ${e.message}`);
    } finally {
      setProcessing(false);
    }
  }, [imgEl, file, preset, zoom, xShift, yShift, bgColor, result?.url]);

  const reset = () => {
    if (result?.url) URL.revokeObjectURL(result.url);
    setFile(null); setImgEl(null); setResult(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {!file ? (
        <FileUploader onFilesSelected={onFilesSelected} label="Drop photo for passport size" />
      ) : (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {PRESETS.map(p => <button key={p.id} className={`pill ${preset.id === p.id ? 'pill-active' : ''}`} onClick={() => setPreset(p)}>{p.name}</button>)}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div><div style={{ fontSize: 12 }}>Zoom {zoom.toFixed(2)}x</div><input type="range" min="1" max="2" step="0.01" value={zoom} onChange={(e) => setZoom(Number(e.target.value))} /></div>
              <div><div style={{ fontSize: 12 }}>Background</div><input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} /></div>
              <div><div style={{ fontSize: 12 }}>Left/Right {xShift.toFixed(2)}</div><input type="range" min="-1" max="1" step="0.01" value={xShift} onChange={(e) => setXShift(Number(e.target.value))} /></div>
              <div><div style={{ fontSize: 12 }}>Up/Down {yShift.toFixed(2)}</div><input type="range" min="-1" max="1" step="0.01" value={yShift} onChange={(e) => setYShift(Number(e.target.value))} /></div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {!result ? (
              <button className="btn-primary" onClick={generate} disabled={processing} style={{ flex: 1 }}>
                {processing ? <Loader2 size={16} className="animate-spin" /> : <IdCard size={16} />}
                {processing ? 'Generating...' : 'Generate passport photo'}
              </button>
            ) : (
              <button className="btn-success" onClick={() => downloadBlob(result.blob, generateOutputFilename(file.name, `passport-${preset.id}`, 'jpg'))} style={{ flex: 1 }}>
                <Download size={16} /> Download JPG
              </button>
            )}
            <button className="btn-secondary" onClick={reset}><RotateCcw size={16} /> Start Over</button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

