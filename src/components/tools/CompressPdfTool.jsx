'use client';

import { useCallback, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Download, RotateCcw, Zap } from 'lucide-react';
import FileUploader from '@/components/FileUploader';
import { PDFDocument } from 'pdf-lib';
import { toast } from 'sonner';

// NOTE:
// True "lossless" PDF compression is complex in pure browser JS.
// This implementation is reliable and predictable: it rasterizes each page
// and rebuilds a new PDF with JPEG images at chosen quality.
// This reduces file size dramatically for scanned/image PDFs.
export default function CompressPdfTool() {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null); // { url, blob }
  const [quality, setQuality] = useState(70); // jpeg quality %
  const [scale, setScale] = useState(1.2); // render scale

  const onFilesSelected = useCallback((selected) => {
    const f = selected[0];
    if (!f || !(f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf'))) {
      toast.error('Please upload a PDF file.');
      return;
    }
    setFile(f);
    setResult(null);
  }, []);

  const canCompress = useMemo(() => !!file && !processing, [file, processing]);

  const compress = useCallback(async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const srcBytes = new Uint8Array(arrayBuffer);

      // Use pdfjs via dynamic import from react-pdf dependency (bundled).
      const pdfjs = await import('pdfjs-dist/build/pdf');
      // Worker: use same CDN approach as other tool for consistency.
      // eslint-disable-next-line no-undef
      pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

      const loadingTask = pdfjs.getDocument({ data: srcBytes });
      const pdf = await loadingTask.promise;

      const out = await PDFDocument.create();

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', { alpha: false });
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);

        // White background (JPEG doesn't support alpha)
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        await page.render({ canvasContext: ctx, viewport }).promise;

        const blob = await new Promise((resolve, reject) =>
          canvas.toBlob(
            (b) => (b ? resolve(b) : reject(new Error('toBlob returned null'))),
            'image/jpeg',
            Math.max(0.1, Math.min(0.95, quality / 100))
          )
        );

        const imgBytes = new Uint8Array(await blob.arrayBuffer());
        const jpg = await out.embedJpg(imgBytes);

        // Convert pixels to PDF points (1px ~= 0.75pt at 96dpi). We keep a 1:1
        // mapping in PDF units for consistency; visual size remains correct.
        const pdfPage = out.addPage([viewport.width, viewport.height]);
        pdfPage.drawImage(jpg, { x: 0, y: 0, width: viewport.width, height: viewport.height });
      }

      const outBytes = await out.save();
      const outBlob = new Blob([outBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(outBlob);
      if (result?.url) URL.revokeObjectURL(result.url);
      setResult({ url, blob: outBlob });
      toast.success('✅ PDF compressed!');
    } catch (err) {
      console.error(err);
      toast.error('Compress failed: ' + (err?.message || 'Unknown error'));
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {!file ? (
        <FileUploader
          onFilesSelected={onFilesSelected}
          accept={{ 'application/pdf': ['.pdf'] }}
          label="Drop PDF to compress"
          sublabel="Best for scanned PDFs · Works fully in your browser"
        />
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--ink)' }}>Compress PDF</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>{file.name}</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>
                  <span>Quality</span><strong style={{ color: 'var(--ink)' }}>{quality}%</strong>
                </div>
                <input type="range" min="20" max="95" value={quality} onChange={(e) => setQuality(Number(e.target.value))} />
                <div style={{ fontSize: 11, color: 'var(--muted-soft)', marginTop: 4 }}>
                  Lower = smaller file · Higher = better clarity
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>
                  <span>Render scale</span><strong style={{ color: 'var(--ink)' }}>{scale.toFixed(1)}×</strong>
                </div>
                <input type="range" min="0.8" max="2.0" step="0.1" value={scale} onChange={(e) => setScale(Number(e.target.value))} />
                <div style={{ fontSize: 11, color: 'var(--muted-soft)', marginTop: 4 }}>
                  Higher scale improves text sharpness but increases size.
                </div>
              </div>

              <div className="notice-box notice-warning">
                This compression rebuilds the PDF using images. It’s ideal for scanned PDFs, but selectable text may be lost.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {!result ? (
              <button className="btn-primary" onClick={compress} disabled={!canCompress} style={{ flex: 1 }}>
                {processing ? <Loader2 size={16} className="animate-spin" /> : <Zap size={16} />}
                {processing ? 'Compressing...' : 'Compress PDF'}
              </button>
            ) : (
              <a
                href={result.url}
                download={file.name.replace(/\.pdf$/i, '') + '-compressed.pdf'}
                className="btn-success"
                style={{ textDecoration: 'none', flex: 1, justifyContent: 'center' }}
              >
                <Download size={16} /> Download compressed PDF
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

