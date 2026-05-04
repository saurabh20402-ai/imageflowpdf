'use client';

import { useCallback, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Files, Loader2, Download, RotateCcw } from 'lucide-react';
import FileUploader from '@/components/FileUploader';
import { PDFDocument } from 'pdf-lib';
import { toast } from 'sonner';

function move(arr, from, to) {
  const copy = [...arr];
  const [item] = copy.splice(from, 1);
  copy.splice(to, 0, item);
  return copy;
}

export default function MergePdfTool() {
  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const inputRef = useRef(null);

  const onFilesSelected = useCallback((picked) => {
    const pdfs = picked.filter(f => f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf'));
    if (!pdfs.length) return toast.error('Please select PDF files.');
    setResult(null);
    setFiles(prev => [...prev, ...pdfs].slice(0, 50));
  }, []);

  const handleMerge = useCallback(async () => {
    if (files.length < 2) return toast.error('Add at least 2 PDFs.');
    setProcessing(true);
    try {
      const out = await PDFDocument.create();
      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const src = await PDFDocument.load(bytes);
        const pages = await out.copyPages(src, src.getPageIndices());
        pages.forEach(p => out.addPage(p));
      }
      const merged = await out.save();
      const blob = new Blob([merged], { type: 'application/pdf' });
      if (result?.url) URL.revokeObjectURL(result.url);
      setResult({ blob, url: URL.createObjectURL(blob) });
      toast.success('PDFs merged successfully.');
    } catch (e) {
      toast.error(`Merge failed: ${e.message}`);
    } finally {
      setProcessing(false);
    }
  }, [files, result?.url]);

  const reset = () => {
    if (result?.url) URL.revokeObjectURL(result.url);
    setFiles([]);
    setResult(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {!files.length ? (
        <FileUploader
          onFilesSelected={onFilesSelected}
          multiple
          maxFiles={50}
          accept={{ 'application/pdf': ['.pdf'] }}
          label="Drop PDFs to merge"
          sublabel="Upload 2 or more PDF files"
        />
      ) : (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {files.map((f, i) => (
              <div key={`${f.name}-${i}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, padding: '10px 12px', border: '1px solid var(--hairline-soft)', borderRadius: 10 }}>
                <span style={{ fontSize: 13, color: 'var(--ink)' }}>{i + 1}. {f.name}</span>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button className="btn-secondary" disabled={i === 0 || processing} onClick={() => setFiles(prev => move(prev, i, i - 1))}>Up</button>
                  <button className="btn-secondary" disabled={i === files.length - 1 || processing} onClick={() => setFiles(prev => move(prev, i, i + 1))}>Down</button>
                  <button className="btn-secondary" disabled={processing} onClick={() => setFiles(prev => prev.filter((_, idx) => idx !== i))}>Remove</button>
                </div>
              </div>
            ))}
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,application/pdf"
              multiple
              style={{ display: 'none' }}
              onChange={(e) => {
                const list = Array.from(e.target.files || []);
                if (list.length) onFilesSelected(list);
                e.target.value = '';
              }}
            />
            <button className="btn-secondary" onClick={() => inputRef.current?.click()} disabled={processing}>Add more PDFs</button>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {!result ? (
              <button className="btn-primary" onClick={handleMerge} disabled={processing || files.length < 2} style={{ flex: 1 }}>
                {processing ? <Loader2 size={16} className="animate-spin" /> : <Files size={16} />}
                {processing ? 'Merging...' : 'Merge PDFs'}
              </button>
            ) : (
              <a href={result.url} download="merged.pdf" className="btn-success" style={{ textDecoration: 'none', flex: 1, justifyContent: 'center' }}>
                <Download size={16} /> Download merged PDF
              </a>
            )}
            <button className="btn-secondary" onClick={reset}><RotateCcw size={16} /> Start Over</button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

