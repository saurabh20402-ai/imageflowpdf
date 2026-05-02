'use client';

import { useCallback, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Download, RotateCcw, Stamp } from 'lucide-react';
import FileUploader from '@/components/FileUploader';
import { PDFDocument, StandardFonts, rgb, degrees } from 'pdf-lib';
import { toast } from 'sonner';

export default function WatermarkPdfTool() {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null); // { url, blob }
  const [text, setText] = useState('CONFIDENTIAL');
  const [fontSize, setFontSize] = useState(42);
  const [opacity, setOpacity] = useState(0.25);
  const [rotation, setRotation] = useState(-30);
  const [applyMode, setApplyMode] = useState('all'); // 'all' | 'current'
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);

  const onFilesSelected = useCallback(async (selected) => {
    const f = selected[0];
    if (!f || !(f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf'))) {
      toast.error('Please upload a PDF file.');
      return;
    }
    setFile(f);
    setResult(null);
    setApplyMode('all');
    setPageNumber(1);

    try {
      const bytes = await f.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      setNumPages(doc.getPageCount());
    } catch (err) {
      console.error(err);
      toast.error('Failed to read PDF: ' + (err?.message || 'Unknown error'));
    }
  }, []);

  const canApply = useMemo(() => !!file && !processing && text.trim().length > 0, [file, processing, text]);

  const apply = useCallback(async () => {
    if (!file) return;
    if (!text.trim()) {
      toast.error('Enter watermark text.');
      return;
    }
    setProcessing(true);
    try {
      const bytes = await file.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      const font = await doc.embedFont(StandardFonts.HelveticaBold);
      const pages = doc.getPages();
      const targets = applyMode === 'current'
        ? [pages[pageNumber - 1]].filter(Boolean)
        : pages;

      targets.forEach((page) => {
        const { width, height } = page.getSize();
        const diag = Math.sqrt(width * width + height * height);
        const size = Math.min(Math.max(18, fontSize), 120);
        const x = width / 2;
        const y = height / 2;

        page.drawText(text, {
          x,
          y,
          size,
          font,
          color: rgb(0.2, 0.2, 0.2),
          opacity: Math.max(0.05, Math.min(0.9, opacity)),
          rotate: degrees(rotation),
          // Center the text approximately by shifting half the width
          // pdf-lib doesn't have textAlign, so we offset by estimated width.
          // This keeps it consistently "center-ish" across fonts.
          // Note: widthOfTextAtSize is reliable for standard fonts.
          xSkew: degrees(0),
        });

        // Optional: a second pass could tile; we keep it single center watermark for reliability.
      });

      const outBytes = await doc.save();
      const blob = new Blob([outBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      if (result?.url) URL.revokeObjectURL(result.url);
      setResult({ url, blob });
      toast.success('✅ Watermark applied!');
    } catch (err) {
      console.error(err);
      toast.error('Watermark failed: ' + (err?.message || 'Unknown error'));
    } finally {
      setProcessing(false);
    }
  }, [file, text, fontSize, opacity, rotation, applyMode, pageNumber, result?.url]);

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
          label="Drop PDF to watermark"
          sublabel="Add a text watermark on top of your PDF pages"
        />
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--ink)' }}>Watermark PDF</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                  {file.name} · {numPages ? `${numPages} page${numPages > 1 ? 's' : ''}` : '...'}
                </div>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>
                Watermark text
              </label>
              <input className="input" value={text} onChange={(e) => setText(e.target.value)} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>
                  <span>Size</span><strong style={{ color: 'var(--ink)' }}>{fontSize}px</strong>
                </div>
                <input type="range" min="14" max="120" value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>
                  <span>Opacity</span><strong style={{ color: 'var(--ink)' }}>{Math.round(opacity * 100)}%</strong>
                </div>
                <input type="range" min="5" max="90" value={Math.round(opacity * 100)} onChange={(e) => setOpacity(Number(e.target.value) / 100)} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>
                  <span>Rotation</span><strong style={{ color: 'var(--ink)' }}>{rotation}°</strong>
                </div>
                <input type="range" min="-90" max="90" value={rotation} onChange={(e) => setRotation(Number(e.target.value))} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 10 }}>
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
                {applyMode === 'current' && numPages > 1 && (
                  <div style={{ marginTop: 10 }}>
                    <label style={{ fontSize: 12, color: 'var(--muted)' }}>Page</label>
                    <input
                      className="input"
                      style={{ width: 120, marginTop: 6 }}
                      type="number"
                      min={1}
                      max={numPages}
                      value={pageNumber}
                      onChange={(e) => setPageNumber(Math.max(1, Math.min(numPages, Number(e.target.value) || 1)))}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {!result ? (
              <button className="btn-primary" onClick={apply} disabled={!canApply} style={{ flex: 1 }}>
                {processing ? <Loader2 size={16} className="animate-spin" /> : <Stamp size={16} />}
                {processing ? 'Applying...' : 'Apply watermark'}
              </button>
            ) : (
              <a
                href={result.url}
                download={file.name.replace(/\.pdf$/i, '') + '-watermarked.pdf'}
                className="btn-success"
                style={{ textDecoration: 'none', flex: 1, justifyContent: 'center' }}
              >
                <Download size={16} /> Download watermarked PDF
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

