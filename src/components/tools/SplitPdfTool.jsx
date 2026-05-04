'use client';

import { useCallback, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Scissors, Loader2, Download, RotateCcw } from 'lucide-react';
import FileUploader from '@/components/FileUploader';
import { PDFDocument } from 'pdf-lib';
import { toast } from 'sonner';

function parseRanges(input, total) {
  const out = new Set();
  for (const part of String(input).split(',').map(s => s.trim()).filter(Boolean)) {
    const m = part.match(/^(\d+)-(\d+)$/);
    if (m) {
      let a = Number(m[1]);
      let b = Number(m[2]);
      if (a > b) [a, b] = [b, a];
      for (let i = a; i <= b; i++) if (i >= 1 && i <= total) out.add(i);
    } else {
      const n = Number(part);
      if (n >= 1 && n <= total) out.add(n);
    }
  }
  return [...out].sort((a, b) => a - b);
}

export default function SplitPdfTool() {
  const [file, setFile] = useState(null);
  const [pages, setPages] = useState(0);
  const [range, setRange] = useState('1');
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);

  const onFilesSelected = useCallback(async (picked) => {
    const f = picked[0];
    if (!f) return;
    setFile(f);
    setResult(null);
    const doc = await PDFDocument.load(await f.arrayBuffer());
    const count = doc.getPageCount();
    setPages(count);
    setRange(count > 1 ? '1-2' : '1');
  }, []);

  const selected = useMemo(() => parseRanges(range, pages), [range, pages]);

  const handleSplit = useCallback(async () => {
    if (!file) return;
    if (!selected.length) return toast.error('Enter valid pages.');
    setProcessing(true);
    try {
      const src = await PDFDocument.load(await file.arrayBuffer());
      const out = await PDFDocument.create();
      const copied = await out.copyPages(src, selected.map(p => p - 1));
      copied.forEach(p => out.addPage(p));
      const bytes = await out.save();
      const blob = new Blob([bytes], { type: 'application/pdf' });
      if (result?.url) URL.revokeObjectURL(result.url);
      setResult({ blob, url: URL.createObjectURL(blob) });
      toast.success('Split PDF ready.');
    } catch (e) {
      toast.error(`Split failed: ${e.message}`);
    } finally {
      setProcessing(false);
    }
  }, [file, selected, result?.url]);

  const reset = () => {
    if (result?.url) URL.revokeObjectURL(result.url);
    setFile(null);
    setResult(null);
    setPages(0);
    setRange('1');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {!file ? (
        <FileUploader onFilesSelected={onFilesSelected} accept={{ 'application/pdf': ['.pdf'] }} label="Drop PDF to split" sublabel="Example: 1-3,5,8-10" />
      ) : (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <p style={{ fontSize: 13, color: 'var(--muted)' }}>{file.name} · {pages} pages</p>
            <input className="input" value={range} onChange={(e) => setRange(e.target.value)} placeholder="1-3,5,8-10" />
            <p style={{ fontSize: 12, color: 'var(--muted)' }}>Selected: {selected.join(', ') || 'none'}</p>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {!result ? (
              <button className="btn-primary" onClick={handleSplit} disabled={processing || !selected.length} style={{ flex: 1 }}>
                {processing ? <Loader2 size={16} className="animate-spin" /> : <Scissors size={16} />}
                {processing ? 'Splitting...' : 'Extract pages'}
              </button>
            ) : (
              <a href={result.url} download={file.name.replace(/\.pdf$/i, '') + '-split.pdf'} className="btn-success" style={{ textDecoration: 'none', flex: 1, justifyContent: 'center' }}>
                <Download size={16} /> Download split PDF
              </a>
            )}
            <button className="btn-secondary" onClick={reset}><RotateCcw size={16} /> Start Over</button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

