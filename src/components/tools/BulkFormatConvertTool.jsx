'use client';

import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Loader2, Download, RotateCcw } from 'lucide-react';
import FileUploader from '@/components/FileUploader';
import { loadImage, createCanvas, canvasToBlob } from '@/lib/image-processor';
import { toast } from 'sonner';

export default function BulkFormatConvertTool() {
  const [files, setFiles] = useState([]);
  const [output, setOutput] = useState('image/webp');
  const [quality, setQuality] = useState(80);
  const [processing, setProcessing] = useState(false);
  const [zipUrl, setZipUrl] = useState(null);

  const onFilesSelected = useCallback((picked) => {
    setZipUrl(null);
    setFiles(prev => [...prev, ...picked].slice(0, 100));
  }, []);

  const ext = output === 'image/jpeg' ? 'jpg' : output === 'image/png' ? 'png' : 'webp';

  const convert = useCallback(async () => {
    if (!files.length) return;
    setProcessing(true);
    try {
      const JSZip = (await import('jszip')).default;
      const zip = new JSZip();
      for (const f of files) {
        const img = await loadImage(f);
        const { canvas, ctx } = createCanvas(img.naturalWidth, img.naturalHeight);
        if (output === 'image/jpeg') {
          ctx.fillStyle = '#fff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        ctx.drawImage(img, 0, 0);
        const blob = await canvasToBlob(canvas, output, quality / 100);
        zip.file(`${f.name.replace(/\.[^.]+$/, '')}.${ext}`, new Uint8Array(await blob.arrayBuffer()));
      }
      const outBlob = await zip.generateAsync({ type: 'blob' });
      if (zipUrl) URL.revokeObjectURL(zipUrl);
      setZipUrl(URL.createObjectURL(outBlob));
      toast.success('Batch conversion complete.');
    } catch (e) {
      toast.error(`Failed: ${e.message}`);
    } finally {
      setProcessing(false);
    }
  }, [files, output, quality, ext, zipUrl]);

  const reset = () => {
    if (zipUrl) URL.revokeObjectURL(zipUrl);
    setFiles([]);
    setZipUrl(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <FileUploader onFilesSelected={onFilesSelected} multiple maxFiles={100} label="Drop images for bulk convert" sublabel="Convert all files and download ZIP" />
      {files.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <p style={{ fontSize: 13 }}>{files.length} files selected</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[
                ['image/webp', 'WebP'],
                ['image/jpeg', 'JPG'],
                ['image/png', 'PNG'],
              ].map(([m, l]) => <button key={m} className={`pill ${output === m ? 'pill-active' : ''}`} onClick={() => setOutput(m)}>{l}</button>)}
            </div>
            {(output === 'image/webp' || output === 'image/jpeg') && <div><div style={{ fontSize: 12 }}>Quality: {quality}%</div><input type="range" min="20" max="100" value={quality} onChange={(e) => setQuality(Number(e.target.value))} /></div>}
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {!zipUrl ? (
              <button className="btn-primary" onClick={convert} disabled={processing} style={{ flex: 1 }}>
                {processing ? <Loader2 size={16} className="animate-spin" /> : <Package size={16} />}
                {processing ? 'Converting...' : 'Convert & build ZIP'}
              </button>
            ) : (
              <a href={zipUrl} download={`bulk-convert-${ext}.zip`} className="btn-success" style={{ textDecoration: 'none', flex: 1, justifyContent: 'center' }}>
                <Download size={16} /> Download ZIP
              </a>
            )}
            <button className="btn-secondary" onClick={reset}><RotateCcw size={16} /> Start Over</button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

