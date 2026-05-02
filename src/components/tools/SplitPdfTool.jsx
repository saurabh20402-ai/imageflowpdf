'use client';

import { useCallback, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Download, RotateCcw, Scissors } from 'lucide-react';
import FileUploader from '@/components/FileUploader';
import { PDFDocument } from 'pdf-lib';
import { toast } from 'sonner';

function parsePageSpec(spec, maxPages) {
  const cleaned = String(spec || '').trim();
  if (!cleaned) return [];

  const parts = cleaned.split(',').map(s => s.trim()).filter(Boolean);
  const pages = new Set();

  for (const part of parts) {
    const m = part.match(/^(\d+)\s*-\s*(\d+)$/);
    if (m) {
      let a = Number(m[1]);
      let b = Number(m[2]);
      if (!Number.isFinite(a) || !Number.isFinite(b)) continue;
      if (a > b) [a, b] = [b, a];
      for (let p = a; p <= b; p++) {
        if (p >= 1 && p <= maxPages) pages.add(p);
      }
      continue;
    }
    const n = Number(part);
    if (Number.isFinite(n) && n >= 1 && n <= maxPages) pages.add(n);
  }

  return Array.from(pages).sort((a, b) => a - b);
}

export default function SplitPdfTool() {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageSpec, setPageSpec] = useState('1-1');
  const [result, setResult] = useState(null); // { url, blob }

  const onFilesSelected = useCallback(async (selected) => {
    const f = selected[0];
    if (!f || !(f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf'))) {
      toast.error('Please upload a PDF file.');
      return;
    }
    setFile(f);
    setResult(null);
    setNumPages(null);
    setPageSpec('1-1');

    try {
      const bytes = await f.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      const n = doc.getPageCount();
      setNumPages(n);
      setPageSpec(n >= 2 ? '1-2' : '1');
    } catch (err) {
      console.error(err);
      toast.error('Failed to read PDF: ' + (err?.message || 'Unknown error'));
    }
  }, []);

  const pagesToExtract = useMemo(() => {
    if (!numPages) return [];
    return parsePageSpec(pageSpec, numPages);
  }, [pageSpec, numPages]);

  const split = useCallback(async () => {
    if (!file || !numPages) return;
    if (pagesToExtract.length === 0) {
      toast.error('Enter valid pages. Example: 1-3,5,7');
      return;
    }

    setProcessing(true);
    try {
      const srcBytes = await file.arrayBuffer();
      const src = await PDFDocument.load(srcBytes);
      const out = await PDFDocument.create();
      const indices = pagesToExtract.map(p => p - 1);
      const copied = await out.copyPages(src, indices);
      copied.forEach(p => out.addPage(p));

      const outBytes = await out.save();
      const blob = new Blob([outBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      if (result?.url) URL.revokeObjectURL(result.url);
      setResult({ url, blob });
      toast.success('✅ Pages extracted!');
    } catch (err) {
      console.error(err);
      toast.error('Split failed: ' + (err?.message || 'Unknown error'));
    } finally {
      setProcessing(false);
    }
  }, [file, numPages, pagesToExtract, result?.url]);

  const reset = () => {
    if (result?.url) URL.revokeObjectURL(result.url);
    setFile(null);
    setResult(null);
    setNumPages(null);
    setPageSpec('1-1');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {!file ? (
        <FileUploader
          onFilesSelected={onFilesSelected}
          accept={{ 'application/pdf': ['.pdf'] }}
          label="Drop PDF to split"
          sublabel="Extract selected pages into a new PDF"
        />
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: 'var(--primary-light)', color: 'var(--primary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Scissors size={18} />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--ink)' }}>Split PDF</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                    {file.name} · {numPages ? `${numPages} page${numPages > 1 ? 's' : ''}` : '...'}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>
                Pages to extract
              </label>
              <input
                className="input"
                value={pageSpec}
                onChange={(e) => setPageSpec(e.target.value)}
                placeholder="e.g. 1-3,5,7-9"
              />
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>
                Example: <strong>1-3,5,7</strong>
                {pagesToExtract.length > 0 && (
                  <span> · Selected: <strong>{pagesToExtract.join(', ')}</strong></span>
                )}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {!result ? (
              <button className="btn-primary" onClick={split} disabled={processing} style={{ flex: 1 }}>
                {processing ? <Loader2 size={16} className="animate-spin" /> : <Scissors size={16} />}
                {processing ? 'Splitting...' : 'Extract pages'}
              </button>
            ) : (
              <a
                href={result.url}
                download={file.name.replace(/\.pdf$/i, '') + '-split.pdf'}
                className="btn-success"
                style={{ textDecoration: 'none', flex: 1, justifyContent: 'center' }}
              >
                <Download size={16} /> Download split PDF
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

