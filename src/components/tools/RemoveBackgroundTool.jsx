'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, RotateCcw, Loader2, Pipette } from 'lucide-react';
import FileUploader from '@/components/FileUploader';
import { loadImage, canvasToBlob, createCanvas } from '@/lib/image-processor';
import { downloadBlob } from '@/lib/download';
import { generateOutputFilename } from '@/lib/utils';
import { toast } from 'sonner';

function hexToRgb(hex) {
  const h = hex.replace('#', '').trim();
  const v = h.length === 3
    ? h.split('').map(c => c + c).join('')
    : h.padEnd(6, '0').slice(0, 6);
  const n = parseInt(v, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function colorDistance(a, b) {
  const dr = a.r - b.r;
  const dg = a.g - b.g;
  const db = a.b - b.b;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

export default function RemoveBackgroundTool() {
  const [file, setFile] = useState(null);
  const [imgEl, setImgEl] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null); // { url, blob }
  const [processing, setProcessing] = useState(false);

  const [bgColor, setBgColor] = useState('#ffffff');
  const [tolerance, setTolerance] = useState(30); // 0-120
  const [feather, setFeather] = useState(8); // 0-30

  const canvasRef = useRef(null);

  const onFilesSelected = useCallback(async (selected) => {
    const f = selected[0];
    if (!f) return;
    setFile(f);
    setResult(null);
    setProcessing(false);
    try {
      const img = await loadImage(f);
      setImgEl(img);
      if (preview) URL.revokeObjectURL(preview);
      setPreview(URL.createObjectURL(f));
      // default bg sample: top-left pixel
      const { canvas, ctx } = createCanvas(img.naturalWidth, img.naturalHeight);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      const px = ctx.getImageData(0, 0, 1, 1).data;
      const toHex = (n) => n.toString(16).padStart(2, '0');
      setBgColor(`#${toHex(px[0])}${toHex(px[1])}${toHex(px[2])}`);
    } catch {
      toast.error('Failed to load image.');
    }
  }, [preview]);

  const renderPreview = useCallback(() => {
    if (!imgEl || !canvasRef.current) return;
    const { canvas, ctx } = createCanvas(imgEl.naturalWidth, imgEl.naturalHeight);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imgEl, 0, 0);
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    const target = hexToRgb(bgColor);
    const tol = Math.max(0, Math.min(180, tolerance));
    const f = Math.max(0, Math.min(60, feather));
    const maxD = tol + f;

    for (let i = 0; i < data.length; i += 4) {
      const c = { r: data[i], g: data[i + 1], b: data[i + 2] };
      const d = colorDistance(c, target);
      if (d <= tol) {
        data[i + 3] = 0;
      } else if (f > 0 && d < maxD) {
        // soft edge: fade alpha from 0..255
        const t = (d - tol) / f;
        data[i + 3] = Math.max(0, Math.min(255, Math.round(255 * t)));
      }
    }

    ctx.putImageData(imgData, 0, 0);

    // draw into visible canvas (scaled)
    const out = canvasRef.current;
    const maxW = Math.min(520, out.parentElement?.getBoundingClientRect?.().width || 520);
    const scale = maxW / imgEl.naturalWidth;
    out.width = Math.floor(imgEl.naturalWidth * scale);
    out.height = Math.floor(imgEl.naturalHeight * scale);
    const octx = out.getContext('2d');
    // checkerboard
    const tile = 14;
    for (let y = 0; y < out.height; y += tile) {
      for (let x = 0; x < out.width; x += tile) {
        octx.fillStyle = ((x / tile + y / tile) % 2 === 0) ? '#f1f5f9' : '#e2e8f0';
        octx.fillRect(x, y, tile, tile);
      }
    }
    octx.drawImage(canvas, 0, 0, out.width, out.height);
  }, [imgEl, bgColor, tolerance, feather]);

  const removeBg = useCallback(async () => {
    if (!imgEl || !file) return;
    setProcessing(true);
    try {
      // re-render at full resolution
      const { canvas, ctx } = createCanvas(imgEl.naturalWidth, imgEl.naturalHeight);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(imgEl, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      const target = hexToRgb(bgColor);
      const tol = Math.max(0, Math.min(180, tolerance));
      const f = Math.max(0, Math.min(60, feather));
      const maxD = tol + f;

      for (let i = 0; i < data.length; i += 4) {
        const c = { r: data[i], g: data[i + 1], b: data[i + 2] };
        const d = colorDistance(c, target);
        if (d <= tol) data[i + 3] = 0;
        else if (f > 0 && d < maxD) {
          const t = (d - tol) / f;
          data[i + 3] = Math.max(0, Math.min(255, Math.round(255 * t)));
        }
      }

      ctx.putImageData(imgData, 0, 0);
      const blob = await canvasToBlob(canvas, 'image/png');
      if (result?.url) URL.revokeObjectURL(result.url);
      setResult({ blob, url: URL.createObjectURL(blob) });
      toast.success('✅ Background removed (best for solid backgrounds).');
    } catch (err) {
      console.error(err);
      toast.error('Failed: ' + (err?.message || 'Unknown error'));
    } finally {
      setProcessing(false);
    }
  }, [imgEl, file, bgColor, tolerance, feather, result?.url]);

  const pickFromClick = useCallback(async (e) => {
    if (!imgEl || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) * (imgEl.naturalWidth / rect.width));
    const y = Math.floor((e.clientY - rect.top) * (imgEl.naturalHeight / rect.height));
    const { canvas, ctx } = createCanvas(imgEl.naturalWidth, imgEl.naturalHeight);
    ctx.drawImage(imgEl, 0, 0);
    const px = ctx.getImageData(Math.max(0, Math.min(imgEl.naturalWidth - 1, x)), Math.max(0, Math.min(imgEl.naturalHeight - 1, y)), 1, 1).data;
    const toHex = (n) => n.toString(16).padStart(2, '0');
    setBgColor(`#${toHex(px[0])}${toHex(px[1])}${toHex(px[2])}`);
  }, [imgEl]);

  const reset = () => {
    if (preview) URL.revokeObjectURL(preview);
    if (result?.url) URL.revokeObjectURL(result.url);
    setFile(null);
    setImgEl(null);
    setPreview(null);
    setResult(null);
    setProcessing(false);
  };

  const canProcess = useMemo(() => !!imgEl && !!file && !processing, [imgEl, file, processing]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {!file ? (
        <FileUploader
          onFilesSelected={onFilesSelected}
          label="Drop image to remove background"
          sublabel="Works best for solid/flat backgrounds (studio shots, product photos)"
        />
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--ink)' }}>Remove Background</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{file.name}</div>
              </div>
              <button className="btn-secondary" onClick={() => { renderPreview(); toast.message('Tap on the image to pick background color.'); }}>
                <Pipette size={16} /> Pick from image
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>Background color</label>
                <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
                <span style={{ fontSize: 12, color: 'var(--muted)' }}>{bgColor}</span>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>
                  <span>Tolerance</span><strong style={{ color: 'var(--ink)' }}>{tolerance}</strong>
                </div>
                <input type="range" min="0" max="120" value={tolerance} onChange={(e) => setTolerance(Number(e.target.value))} />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>
                  <span>Feather</span><strong style={{ color: 'var(--ink)' }}>{feather}px</strong>
                </div>
                <input type="range" min="0" max="30" value={feather} onChange={(e) => setFeather(Number(e.target.value))} />
              </div>

              <div>
                <button className="btn-secondary" onClick={renderPreview}>Preview</button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <canvas
                  ref={canvasRef}
                  onClick={pickFromClick}
                  style={{
                    width: '100%',
                    maxWidth: 520,
                    borderRadius: 14,
                    border: '1px solid var(--hairline-soft)',
                    cursor: 'crosshair',
                  }}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {!result ? (
              <button className="btn-primary" onClick={removeBg} disabled={!canProcess} style={{ flex: 1 }}>
                {processing ? <Loader2 size={16} className="animate-spin" /> : null}
                {processing ? 'Processing...' : 'Remove background'}
              </button>
            ) : (
              <button
                className="btn-success"
                onClick={() => downloadBlob(result.blob, generateOutputFilename(file.name, 'no-bg', 'png'))}
                style={{ flex: 1 }}
              >
                <Download size={16} /> Download PNG
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

