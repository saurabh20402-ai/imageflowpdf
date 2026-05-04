'use client';

import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Stamp, Loader2, Download, RotateCcw } from 'lucide-react';
import FileUploader from '@/components/FileUploader';
import { PDFDocument, StandardFonts, rgb, degrees } from 'pdf-lib';
import { toast } from 'sonner';

export default function WatermarkPdfTool() {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [applyMode, setApplyMode] = useState('all');
  const [pageNumber, setPageNumber] = useState(1);
  const [text, setText] = useState('CONFIDENTIAL');
  const [size, setSize] = useState(42);
  const [opacity, setOpacity] = useState(0.25);
  const [rotation, setRotation] = useState(-30);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);

  const onFilesSelected = useCallback(async (picked) => {
    const f = picked[0];
    setFile(f);
    setResult(null);
    const doc = await PDFDocument.load(await f.arrayBuffer());
    setNumPages(doc.getPageCount());
    setPageNumber(1);
  }, []);

  const applyWatermark = useCallback(async () => {
    if (!file || !text.trim()) return toast.error('Enter watermark text.');
    setProcessing(true);
    try {
      const doc = await PDFDocument.load(await file.arrayBuffer());
      const font = await doc.embedFont(StandardFonts.HelveticaBold);
      const pages = doc.getPages();
      const targets = applyMode === 'current' ? [pages[pageNumber - 1]].filter(Boolean) : pages;
      targets.forEach((page) => {
        const { width, height } = page.getSize();
        const textWidth = font.widthOfTextAtSize(text, size);
        page.drawText(text, {
          x: (width - textWidth) / 2,
          y: height / 2,
          size,
          font,
          color: rgb(0.2, 0.2, 0.2),
          opacity,
          rotate: degrees(rotation),
        });
      });
      const blob = new Blob([await doc.save()], { type: 'application/pdf' });
      if (result?.url) URL.revokeObjectURL(result.url);
      setResult({ blob, url: URL.createObjectURL(blob) });
      toast.success('Watermark applied.');
    } catch (e) {
      toast.error(`Watermark failed: ${e.message}`);
    } finally {
      setProcessing(false);
    }
  }, [file, text, size, opacity, rotation, applyMode, pageNumber, result?.url]);

  const reset = () => {
    if (result?.url) URL.revokeObjectURL(result.url);
    setFile(null);
    setResult(null);
    setNumPages(0);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {!file ? (
        <FileUploader onFilesSelected={onFilesSelected} accept={{ 'application/pdf': ['.pdf'] }} label="Drop PDF to watermark" />
      ) : (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <input className="input" value={text} onChange={(e) => setText(e.target.value)} placeholder="Watermark text" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div><div style={{ fontSize: 12 }}>Size: {size}px</div><input type="range" min="14" max="120" value={size} onChange={(e) => setSize(Number(e.target.value))} /></div>
              <div><div style={{ fontSize: 12 }}>Opacity: {Math.round(opacity * 100)}%</div><input type="range" min="5" max="90" value={Math.round(opacity * 100)} onChange={(e) => setOpacity(Number(e.target.value) / 100)} /></div>
              <div style={{ gridColumn: '1 / -1' }}><div style={{ fontSize: 12 }}>Rotation: {rotation}°</div><input type="range" min="-90" max="90" value={rotation} onChange={(e) => setRotation(Number(e.target.value))} /></div>
            </div>
            <label style={{ fontSize: 13 }}><input type="radio" checked={applyMode === 'all'} onChange={() => setApplyMode('all')} /> All pages</label>
            <label style={{ fontSize: 13 }}><input type="radio" checked={applyMode === 'current'} onChange={() => setApplyMode('current')} /> Current page</label>
            {applyMode === 'current' && <input className="input" style={{ maxWidth: 120 }} type="number" min={1} max={numPages} value={pageNumber} onChange={(e) => setPageNumber(Math.max(1, Math.min(numPages, Number(e.target.value) || 1)))} />}
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {!result ? (
              <button className="btn-primary" onClick={applyWatermark} disabled={processing || !text.trim()} style={{ flex: 1 }}>
                {processing ? <Loader2 size={16} className="animate-spin" /> : <Stamp size={16} />}
                {processing ? 'Applying...' : 'Apply watermark'}
              </button>
            ) : (
              <a href={result.url} download={file.name.replace(/\.pdf$/i, '') + '-watermarked.pdf'} className="btn-success" style={{ textDecoration: 'none', flex: 1, justifyContent: 'center' }}>
                <Download size={16} /> Download watermarked PDF
              </a>
            )}
            <button className="btn-secondary" onClick={reset}><RotateCcw size={16} /> Start Over</button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

