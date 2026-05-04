'use client';

import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Loader2, Download, RotateCcw } from 'lucide-react';
import FileUploader from '@/components/FileUploader';
import { PDFDocument } from 'pdf-lib';
import { toast } from 'sonner';

export default function CompressPdfTool() {
  const [file, setFile] = useState(null);
  const [quality, setQuality] = useState(70);
  const [scale, setScale] = useState(1.2);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);

  const onFilesSelected = useCallback((picked) => {
    setFile(picked[0]);
    setResult(null);
  }, []);

  const compress = useCallback(async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const pdfjs = await import('pdfjs-dist/build/pdf.mjs');
      pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
      const task = pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) });
      const src = await task.promise;
      const out = await PDFDocument.create();

      for (let i = 1; i <= src.numPages; i++) {
        const page = await src.getPage(i);
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement('canvas');
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        const ctx = canvas.getContext('2d', { alpha: false });
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvasContext: ctx, viewport }).promise;
        const jpgBlob = await new Promise((resolve, reject) =>
          canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('toBlob failed'))), 'image/jpeg', quality / 100)
        );
        const jpgBytes = new Uint8Array(await jpgBlob.arrayBuffer());
        const jpg = await out.embedJpg(jpgBytes);
        const p = out.addPage([viewport.width, viewport.height]);
        p.drawImage(jpg, { x: 0, y: 0, width: viewport.width, height: viewport.height });
      }

      const blob = new Blob([await out.save()], { type: 'application/pdf' });
      if (result?.url) URL.revokeObjectURL(result.url);
      setResult({ blob, url: URL.createObjectURL(blob) });
      toast.success('Compressed PDF ready.');
    } catch (e) {
      toast.error(`Compress failed: ${e.message}`);
    } finally {
      setProcessing(false);
    }
  }, [file, quality, scale, result?.url]);

  const reset = () => {
    if (result?.url) URL.revokeObjectURL(result.url);
    setFile(null);
    setResult(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {!file ? (
        <FileUploader onFilesSelected={onFilesSelected} accept={{ 'application/pdf': ['.pdf'] }} label="Drop PDF to compress" sublabel="Best for scanned/image-based PDFs" />
      ) : (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div><div style={{ fontSize: 12 }}>Quality: {quality}%</div><input type="range" min="20" max="95" value={quality} onChange={(e) => setQuality(Number(e.target.value))} /></div>
            <div><div style={{ fontSize: 12 }}>Render scale: {scale.toFixed(1)}x</div><input type="range" min="0.8" max="2" step="0.1" value={scale} onChange={(e) => setScale(Number(e.target.value))} /></div>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {!result ? (
              <button className="btn-primary" onClick={compress} disabled={processing} style={{ flex: 1 }}>
                {processing ? <Loader2 size={16} className="animate-spin" /> : <Zap size={16} />}
                {processing ? 'Compressing...' : 'Compress PDF'}
              </button>
            ) : (
              <a href={result.url} download={file.name.replace(/\.pdf$/i, '') + '-compressed.pdf'} className="btn-success" style={{ textDecoration: 'none', flex: 1, justifyContent: 'center' }}>
                <Download size={16} /> Download compressed PDF
              </a>
            )}
            <button className="btn-secondary" onClick={reset}><RotateCcw size={16} /> Start Over</button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

