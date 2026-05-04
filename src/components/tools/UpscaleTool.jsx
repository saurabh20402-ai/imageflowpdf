'use client';

import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Maximize2, Loader2, Download, RotateCcw } from 'lucide-react';
import FileUploader from '@/components/FileUploader';
import { loadImage, createCanvas, canvasToBlob } from '@/lib/image-processor';
import { downloadBlob } from '@/lib/download';
import { generateOutputFilename } from '@/lib/utils';
import { toast } from 'sonner';

export default function UpscaleTool() {
  const [file, setFile] = useState(null);
  const [imgEl, setImgEl] = useState(null);
  const [preview, setPreview] = useState(null);
  const [factor, setFactor] = useState(2);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);

  const onFilesSelected = useCallback(async (picked) => {
    const f = picked[0];
    setFile(f);
    setResult(null);
    const img = await loadImage(f);
    setImgEl(img);
    setPreview(URL.createObjectURL(f));
  }, []);

  const upscale = useCallback(async () => {
    if (!imgEl || !file) return;
    setProcessing(true);
    try {
      const w = imgEl.naturalWidth * factor;
      const h = imgEl.naturalHeight * factor;
      const { canvas, ctx } = createCanvas(w, h);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(imgEl, 0, 0, w, h);
      const blob = await canvasToBlob(canvas, 'image/png');
      if (result?.url) URL.revokeObjectURL(result.url);
      setResult({ blob, url: URL.createObjectURL(blob) });
      toast.success('Upscale complete.');
    } catch (e) {
      toast.error(`Upscale failed: ${e.message}`);
    } finally {
      setProcessing(false);
    }
  }, [imgEl, file, factor, result?.url]);

  const reset = () => {
    if (preview) URL.revokeObjectURL(preview);
    if (result?.url) URL.revokeObjectURL(result.url);
    setFile(null); setImgEl(null); setPreview(null); setResult(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {!file ? (
        <FileUploader onFilesSelected={onFilesSelected} label="Drop image to upscale" sublabel="2x/4x high-quality enlargement" />
      ) : (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="card">
            <div style={{ display: 'flex', gap: 8 }}>{[2, 4].map(v => <button key={v} className={`pill ${factor === v ? 'pill-active' : ''}`} onClick={() => setFactor(v)}>{v}x</button>)}</div>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {!result ? (
              <button className="btn-primary" onClick={upscale} disabled={processing} style={{ flex: 1 }}>
                {processing ? <Loader2 size={16} className="animate-spin" /> : <Maximize2 size={16} />}
                {processing ? 'Upscaling...' : 'Upscale'}
              </button>
            ) : (
              <button className="btn-success" onClick={() => downloadBlob(result.blob, generateOutputFilename(file.name, `upscaled-${factor}x`, 'png'))} style={{ flex: 1 }}>
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

