'use client';

import { useCallback, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, RotateCcw, Loader2, IdCard } from 'lucide-react';
import FileUploader from '@/components/FileUploader';
import { loadImage, createCanvas, canvasToBlob } from '@/lib/image-processor';
import { downloadBlob } from '@/lib/download';
import { generateOutputFilename } from '@/lib/utils';
import { toast } from 'sonner';

const PRESETS = [
  { id: 'in-35x45', name: 'India (35×45mm)', wMm: 35, hMm: 45, dpi: 300 },
  { id: 'eu-35x45', name: 'EU (35×45mm)', wMm: 35, hMm: 45, dpi: 300 },
  { id: 'us-2x2', name: 'US (2×2 in)', wMm: 50.8, hMm: 50.8, dpi: 300 },
];

function mmToPx(mm, dpi) {
  return Math.round((mm / 25.4) * dpi);
}

export default function PassportPhotoTool() {
  const [file, setFile] = useState(null);
  const [imgEl, setImgEl] = useState(null);
  const [preview, setPreview] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null); // { url, blob, w, h }

  const [presetId, setPresetId] = useState(PRESETS[0].id);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [zoom, setZoom] = useState(1.1);
  const [xShift, setXShift] = useState(0); // -1..1 relative
  const [yShift, setYShift] = useState(-0.05);

  const preset = useMemo(() => PRESETS.find(p => p.id === presetId) || PRESETS[0], [presetId]);

  const onFilesSelected = useCallback(async (selected) => {
    const f = selected[0];
    if (!f) return;
    setFile(f);
    setResult(null);
    try {
      const img = await loadImage(f);
      setImgEl(img);
      if (preview) URL.revokeObjectURL(preview);
      setPreview(URL.createObjectURL(f));
      setZoom(1.1);
      setXShift(0);
      setYShift(-0.05);
    } catch {
      toast.error('Failed to load image.');
    }
  }, [preview]);

  const generate = useCallback(async () => {
    if (!imgEl || !file) return;
    setProcessing(true);
    try {
      const outW = mmToPx(preset.wMm, preset.dpi);
      const outH = mmToPx(preset.hMm, preset.dpi);

      // target aspect ratio
      const ar = outW / outH;

      // compute crop on source image
      const srcW = imgEl.naturalWidth;
      const srcH = imgEl.naturalHeight;
      const srcAR = srcW / srcH;

      // base crop that matches aspect ratio
      let cropW = srcW;
      let cropH = Math.round(cropW / ar);
      if (cropH > srcH) {
        cropH = srcH;
        cropW = Math.round(cropH * ar);
      }

      // apply zoom (larger zoom = tighter crop)
      cropW = Math.round(cropW / zoom);
      cropH = Math.round(cropH / zoom);

      const cx = srcW / 2 + xShift * (srcW * 0.15);
      const cy = srcH / 2 + yShift * (srcH * 0.15);
      let x = Math.round(cx - cropW / 2);
      let y = Math.round(cy - cropH / 2);

      // clamp
      x = Math.max(0, Math.min(srcW - cropW, x));
      y = Math.max(0, Math.min(srcH - cropH, y));

      const { canvas, ctx } = createCanvas(outW, outH);
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, outW, outH);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(imgEl, x, y, cropW, cropH, 0, 0, outW, outH);

      const blob = await canvasToBlob(canvas, 'image/jpeg', 0.92);
      const url = URL.createObjectURL(blob);
      if (result?.url) URL.revokeObjectURL(result.url);
      setResult({ url, blob, w: outW, h: outH });
      toast.success('✅ Passport photo generated!');
    } catch (err) {
      console.error(err);
      toast.error('Failed: ' + (err?.message || 'Unknown error'));
    } finally {
      setProcessing(false);
    }
  }, [imgEl, file, preset, bgColor, zoom, xShift, yShift, result?.url]);

  const reset = () => {
    if (preview) URL.revokeObjectURL(preview);
    if (result?.url) URL.revokeObjectURL(result.url);
    setFile(null);
    setImgEl(null);
    setPreview(null);
    setResult(null);
  };

  const canGenerate = useMemo(() => !!imgEl && !!file && !processing, [imgEl, file, processing]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {!file ? (
        <FileUploader
          onFilesSelected={onFilesSelected}
          label="Drop a photo to make passport size"
          sublabel="Choose a preset and export a correctly sized photo"
        />
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="preview-grid">
            <div>
              <div className="preview-label">Original</div>
              <div className="preview-box">
                <img src={preview} alt="Original" />
              </div>
            </div>
            <div>
              <div className="preview-label">Output</div>
              <div className="preview-box">
                {result ? <img src={result.url} alt="Passport output" /> : <div style={{ color: 'var(--muted-soft)', fontSize: 13 }}>Click Generate</div>}
              </div>
              {result && (
                <p style={{ fontSize: 12, color: 'var(--success)', marginTop: 8, fontWeight: 600 }}>
                  {preset.wMm}×{preset.hMm}mm @ {preset.dpi}dpi · {result.w}×{result.h}px
                </p>
              )}
            </div>
          </div>

          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: 'var(--primary-light)', color: 'var(--primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <IdCard size={18} />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--ink)' }}>Passport Photo Maker</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>Quick crop + exact export size</div>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>Preset</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {PRESETS.map(p => (
                  <button key={p.id} className={`pill ${presetId === p.id ? 'pill-active' : ''}`} onClick={() => { setPresetId(p.id); setResult(null); }}>
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>Background</label>
              <input type="color" value={bgColor} onChange={(e) => { setBgColor(e.target.value); setResult(null); }} />
              <span style={{ fontSize: 12, color: 'var(--muted)' }}>{bgColor}</span>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>
                <span>Zoom</span><strong style={{ color: 'var(--ink)' }}>{zoom.toFixed(2)}×</strong>
              </div>
              <input type="range" min="1" max="2" step="0.01" value={zoom} onChange={(e) => { setZoom(Number(e.target.value)); setResult(null); }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>
                  <span>Left / right</span><strong style={{ color: 'var(--ink)' }}>{xShift.toFixed(2)}</strong>
                </div>
                <input type="range" min="-1" max="1" step="0.01" value={xShift} onChange={(e) => { setXShift(Number(e.target.value)); setResult(null); }} />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>
                  <span>Up / down</span><strong style={{ color: 'var(--ink)' }}>{yShift.toFixed(2)}</strong>
                </div>
                <input type="range" min="-1" max="1" step="0.01" value={yShift} onChange={(e) => { setYShift(Number(e.target.value)); setResult(null); }} />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {!result ? (
              <button className="btn-primary" onClick={generate} disabled={!canGenerate} style={{ flex: 1 }}>
                {processing ? <Loader2 size={16} className="animate-spin" /> : null}
                {processing ? 'Generating...' : 'Generate passport photo'}
              </button>
            ) : (
              <button
                className="btn-success"
                onClick={() => downloadBlob(result.blob, generateOutputFilename(file.name, `passport-${preset.id}`, 'jpg'))}
                style={{ flex: 1 }}
              >
                <Download size={16} /> Download JPG
              </button>
            )}
            <button className="btn-secondary" onClick={reset}>
              <RotateCcw size={16} /> Start Over
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

