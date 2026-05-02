'use client';

import { useCallback, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Download, RotateCcw, RotateCw } from 'lucide-react';
import FileUploader from '@/components/FileUploader';
import { PDFDocument, degrees } from 'pdf-lib';
import { toast } from 'sonner';

export default function RotatePdfTool() {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null); // { url, blob }
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [applyMode, setApplyMode] = useState('all'); // 'all' | 'current'
  const [angle, setAngle] = useState(90);

  const onFilesSelected = useCallback(async (selected) => {
    const f = selected[0];
    if (!f || !(f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf'))) {
      toast.error('Please upload a PDF file.');
      return;
    }
    setFile(f);
    setResult(null);
    setPageNumber(1);
    setApplyMode('all');
    setAngle(90);

    try {
      const bytes = await f.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      setNumPages(doc.getPageCount());
    } catch (err) {
      console.error(err);
      toast.error('Failed to read PDF: ' + (err?.message || 'Unknown error'));
    }
  }, []);

  const canRotate = useMemo(() => !!file && !processing, [file, processing]);

  const rotate = useCallback(async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const bytes = await file.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      const pages = doc.getPages();
      const targets = applyMode === 'current'
        ? [pages[pageNumber - 1]].filter(Boolean)
        : pages;

      targets.forEach((p) => {
        const current = p.getRotation?.()?.angle || 0;
        const next = (current + angle) % 360;
        p.setRotation(degrees(next));
      });

      const outBytes = await doc.save();
      const blob = new Blob([outBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      if (result?.url) URL.revokeObjectURL(result.url);
      setResult({ url, blob });
      toast.success('✅ PDF rotated!');
    } catch (err) {
      console.error(err);
      toast.error('Rotate failed: ' + (err?.message || 'Unknown error'));
    } finally {
      setProcessing(false);
    }
  }, [file, angle, applyMode, pageNumber, result?.url]);

  const reset = () => {
    if (result?.url) URL.revokeObjectURL(result.url);
    setFile(null);
    setResult(null);
    setNumPages(null);
    setPageNumber(1);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {!file ? (
        <FileUploader
          onFilesSelected={onFilesSelected}
          accept={{ 'application/pdf': ['.pdf'] }}
          label="Drop PDF to rotate"
          sublabel="Rotate pages by 90°, 180°, or 270°"
        />
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--ink)' }}>Rotate PDF</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                  {file.name} · {numPages ? `${numPages} page${numPages > 1 ? 's' : ''}` : '...'}
                </div>
              </div>
              {numPages > 1 && (
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 12, color: 'var(--muted)' }}>Page</span>
                  <input
                    className="input"
                    style={{ width: 90 }}
                    type="number"
                    min={1}
                    max={numPages}
                    value={pageNumber}
                    onChange={(e) => setPageNumber(Math.max(1, Math.min(numPages, Number(e.target.value) || 1)))}
                    disabled={applyMode !== 'current'}
                  />
                </div>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: 8 }}>
                  Apply to
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--ink)' }}>
                    <input type="radio" name="applyMode" checked={applyMode === 'all'} onChange={() => setApplyMode('all')} />
                    All pages
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--ink)' }}>
                    <input type="radio" name="applyMode" checked={applyMode === 'current'} onChange={() => setApplyMode('current')} />
                    Current page
                  </label>
                </div>
              </div>

              <div>
                <div style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: 8 }}>
                  Rotation
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {[90, 180, 270].map((deg) => (
                    <button key={deg} className={`pill ${angle === deg ? 'pill-active' : ''}`} onClick={() => setAngle(deg)}>
                      {deg}°
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {!result ? (
              <button className="btn-primary" onClick={rotate} disabled={!canRotate} style={{ flex: 1 }}>
                {processing ? <Loader2 size={16} className="animate-spin" /> : <RotateCw size={16} />}
                {processing ? 'Rotating...' : 'Rotate PDF'}
              </button>
            ) : (
              <a
                href={result.url}
                download={file.name.replace(/\.pdf$/i, '') + '-rotated.pdf'}
                className="btn-success"
                style={{ textDecoration: 'none', flex: 1, justifyContent: 'center' }}
              >
                <Download size={16} /> Download rotated PDF
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

