'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Download, RotateCcw, Files } from 'lucide-react';
import FileUploader from '@/components/FileUploader';
import { PDFDocument } from 'pdf-lib';
import { toast } from 'sonner';

function moveItem(arr, from, to) {
  const next = arr.slice();
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

export default function MergePdfTool() {
  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null); // { url, blob }
  const fileInputRef = useRef(null);

  const onFilesSelected = useCallback((selected) => {
    const pdfs = selected.filter(f => f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf'));
    if (pdfs.length === 0) {
      toast.error('Please select PDF files.');
      return;
    }
    setResult(null);
    setFiles(prev => [...prev, ...pdfs].slice(0, 50));
  }, []);

  const canMerge = files.length >= 2 && !processing;

  const totalSize = useMemo(() => files.reduce((acc, f) => acc + (f.size || 0), 0), [files]);

  const merge = useCallback(async () => {
    if (files.length < 2) return;
    setProcessing(true);
    try {
      const out = await PDFDocument.create();

      for (const f of files) {
        const bytes = await f.arrayBuffer();
        const doc = await PDFDocument.load(bytes);
        const pages = await out.copyPages(doc, doc.getPageIndices());
        pages.forEach(p => out.addPage(p));
      }

      const mergedBytes = await out.save();
      const blob = new Blob([mergedBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      if (result?.url) URL.revokeObjectURL(result.url);
      setResult({ url, blob });
      toast.success('✅ PDFs merged successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to merge PDFs: ' + (err?.message || 'Unknown error'));
    } finally {
      setProcessing(false);
    }
  }, [files, result?.url]);

  const reset = () => {
    if (result?.url) URL.revokeObjectURL(result.url);
    setFiles([]);
    setResult(null);
    setProcessing(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {!files.length ? (
        <FileUploader
          onFilesSelected={onFilesSelected}
          multiple
          maxFiles={50}
          accept={{ 'application/pdf': ['.pdf'] }}
          label="Drop PDFs to merge"
          sublabel="Select 2 or more PDF files — we’ll combine them in order"
        />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
        >
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: 'var(--primary-light)', color: 'var(--primary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Files size={18} />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--ink)' }}>Merge PDFs</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                    {files.length} file(s) · {(totalSize / (1024 * 1024)).toFixed(2)} MB
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <input
                  ref={fileInputRef}
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
                <button
                  className="btn-secondary"
                  disabled={processing}
                  onClick={() => fileInputRef.current?.click()}
                >
                  Add more PDFs
                </button>
              </div>
            </div>

            <div className="divider" style={{ margin: '14px 0' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {files.map((f, idx) => (
                <div key={`${f.name}-${idx}`} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  gap: 12, padding: '10px 12px',
                  border: '1px solid var(--hairline-soft)', borderRadius: 12,
                  background: 'var(--surface-card)',
                }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {idx + 1}. {f.name}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--muted)' }}>{(f.size / 1024).toFixed(0)} KB</div>
                  </div>

                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                    <button className="btn-secondary" disabled={idx === 0 || processing} onClick={() => setFiles(prev => moveItem(prev, idx, idx - 1))}>
                      Up
                    </button>
                    <button className="btn-secondary" disabled={idx === files.length - 1 || processing} onClick={() => setFiles(prev => moveItem(prev, idx, idx + 1))}>
                      Down
                    </button>
                    <button className="btn-secondary" disabled={processing} onClick={() => setFiles(prev => prev.filter((_, i) => i !== idx))}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {!result ? (
              <button onClick={merge} disabled={!canMerge} className="btn-primary" style={{ flex: 1 }}>
                {processing ? <Loader2 size={16} className="animate-spin" /> : <Files size={16} />}
                {processing ? 'Merging...' : 'Merge PDFs'}
              </button>
            ) : (
              <a
                href={result.url}
                download="merged.pdf"
                className="btn-success"
                style={{ textDecoration: 'none', flex: 1, justifyContent: 'center' }}
              >
                <Download size={16} /> Download merged PDF
              </a>
            )}
            <button onClick={reset} className="btn-secondary">
              <RotateCcw size={16} /> Start Over
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

