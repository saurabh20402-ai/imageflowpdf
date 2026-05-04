'use client';

import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCw, Loader2, Download, RotateCcw } from 'lucide-react';
import FileUploader from '@/components/FileUploader';
import { PDFDocument, degrees } from 'pdf-lib';
import { toast } from 'sonner';

export default function RotatePdfTool() {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [applyMode, setApplyMode] = useState('all');
  const [pageNumber, setPageNumber] = useState(1);
  const [angle, setAngle] = useState(90);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);

  const onFilesSelected = useCallback(async (picked) => {
    const f = picked[0];
    setFile(f);
    setResult(null);
    const doc = await PDFDocument.load(await f.arrayBuffer());
    setNumPages(doc.getPageCount());
    setPageNumber(1);
    setApplyMode('all');
  }, []);

  const rotate = useCallback(async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const doc = await PDFDocument.load(await file.arrayBuffer());
      const pages = doc.getPages();
      const targets = applyMode === 'current' ? [pages[pageNumber - 1]].filter(Boolean) : pages;
      targets.forEach((p) => {
        const cur = p.getRotation()?.angle || 0;
        p.setRotation(degrees((cur + angle) % 360));
      });
      const blob = new Blob([await doc.save()], { type: 'application/pdf' });
      if (result?.url) URL.revokeObjectURL(result.url);
      setResult({ blob, url: URL.createObjectURL(blob) });
      toast.success('Rotation applied.');
    } catch (e) {
      toast.error(`Rotate failed: ${e.message}`);
    } finally {
      setProcessing(false);
    }
  }, [file, applyMode, pageNumber, angle, result?.url]);

  const reset = () => {
    if (result?.url) URL.revokeObjectURL(result.url);
    setFile(null);
    setResult(null);
    setNumPages(0);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {!file ? (
        <FileUploader onFilesSelected={onFilesSelected} accept={{ 'application/pdf': ['.pdf'] }} label="Drop PDF to rotate" />
      ) : (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[90, 180, 270].map(d => (
                <button key={d} className={`pill ${angle === d ? 'pill-active' : ''}`} onClick={() => setAngle(d)}>{d}°</button>
              ))}
            </div>
            <label style={{ fontSize: 13 }}><input type="radio" checked={applyMode === 'all'} onChange={() => setApplyMode('all')} /> All pages</label>
            <label style={{ fontSize: 13 }}><input type="radio" checked={applyMode === 'current'} onChange={() => setApplyMode('current')} /> Current page</label>
            {applyMode === 'current' && (
              <input className="input" style={{ maxWidth: 120 }} type="number" min={1} max={numPages} value={pageNumber} onChange={(e) => setPageNumber(Math.max(1, Math.min(numPages, Number(e.target.value) || 1)))} />
            )}
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {!result ? (
              <button className="btn-primary" onClick={rotate} disabled={processing} style={{ flex: 1 }}>
                {processing ? <Loader2 size={16} className="animate-spin" /> : <RotateCw size={16} />}
                {processing ? 'Rotating...' : 'Rotate PDF'}
              </button>
            ) : (
              <a href={result.url} download={file.name.replace(/\.pdf$/i, '') + '-rotated.pdf'} className="btn-success" style={{ textDecoration: 'none', flex: 1, justifyContent: 'center' }}>
                <Download size={16} /> Download rotated PDF
              </a>
            )}
            <button className="btn-secondary" onClick={reset}><RotateCcw size={16} /> Start Over</button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

