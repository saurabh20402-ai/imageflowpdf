'use client';

import { useCallback, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, RotateCcw, Loader2, Package } from 'lucide-react';
import FileUploader from '@/components/FileUploader';
import { loadImage, createCanvas, canvasToBlob } from '@/lib/image-processor';
import { toast } from 'sonner';

export default function BulkFormatConvertTool() {
  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [output, setOutput] = useState('image/webp'); // jpeg/png/webp
  const [quality, setQuality] = useState(80);
  const [zipUrl, setZipUrl] = useState(null);

  const onFilesSelected = useCallback((selected) => {
    if (!selected?.length) return;
    setZipUrl(null);
    setFiles(prev => [...prev, ...selected].slice(0, 100));
  }, []);

  const ext = output === 'image/jpeg' ? 'jpg' : output === 'image/png' ? 'png' : 'webp';
  const canConvert = useMemo(() => files.length > 0 && !processing, [files.length, processing]);

  const convert = useCallback(async () => {
    if (!files.length) return;
    setProcessing(true);
    try {
      const JSZip = (await import('jszip')).default;
      const zip = new JSZip();

      for (let i = 0; i < files.length; i++) {
        const f = files[i];
        const img = await loadImage(f);
        const { canvas, ctx } = createCanvas(img.naturalWidth, img.naturalHeight);
        if (output === 'image/jpeg') {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        ctx.drawImage(img, 0, 0);

        const blob = await canvasToBlob(canvas, output, quality / 100);
        const bytes = new Uint8Array(await blob.arrayBuffer());
        const base = f.name.replace(/\.[^.]+$/, '');
        zip.file(`${base}.${ext}`, bytes);
      }

      const outBlob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(outBlob);
      if (zipUrl) URL.revokeObjectURL(zipUrl);
      setZipUrl(url);
      toast.success('✅ Batch converted! Download ZIP.');
    } catch (err) {
      console.error(err);
      toast.error('Failed: ' + (err?.message || 'Unknown error'));
    } finally {
      setProcessing(false);
    }
  }, [files, output, quality, zipUrl, ext]);

  const reset = () => {
    if (zipUrl) URL.revokeObjectURL(zipUrl);
    setFiles([]);
    setZipUrl(null);
    setProcessing(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <FileUploader
        onFilesSelected={onFilesSelected}
        multiple
        maxFiles={100}
        accept={{ 'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.bmp', '.gif'] }}
        label="Drop images for bulk format convert"
        sublabel="Convert many images at once and download a ZIP"
      />

      {files.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--ink)' }}>Bulk Format Convert</div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>{files.length} file(s)</div>

            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>Output format</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {[
                  ['image/webp', 'WebP'],
                  ['image/jpeg', 'JPG'],
                  ['image/png', 'PNG'],
                ].map(([m, label]) => (
                  <button key={m} className={`pill ${output === m ? 'pill-active' : ''}`} onClick={() => { setOutput(m); setZipUrl(null); }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {(output === 'image/jpeg' || output === 'image/webp') && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>
                  <span>Quality</span><strong style={{ color: 'var(--ink)' }}>{quality}%</strong>
                </div>
                <input type="range" min="20" max="100" value={quality} onChange={(e) => { setQuality(Number(e.target.value)); setZipUrl(null); }} />
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {!zipUrl ? (
              <button className="btn-primary" onClick={convert} disabled={!canConvert} style={{ flex: 1 }}>
                {processing ? <Loader2 size={16} className="animate-spin" /> : <Package size={16} />}
                {processing ? 'Converting...' : 'Convert & build ZIP'}
              </button>
            ) : (
              <a href={zipUrl} download={`imageflow-bulk-convert.${ext}.zip`} className="btn-success" style={{ textDecoration: 'none', flex: 1, justifyContent: 'center' }}>
                <Download size={16} /> Download ZIP
              </a>
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

