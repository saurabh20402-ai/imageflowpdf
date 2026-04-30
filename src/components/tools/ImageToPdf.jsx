'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Loader2, FileOutput, Trash2 } from 'lucide-react';
import FileUploader from '@/components/FileUploader';
import { loadImage } from '@/lib/image-processor';
import { toast } from 'sonner';

export default function ImageToPdf({ tool }) {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [pageSize, setPageSize] = useState('a4');
  const [done, setDone] = useState(false);

  const onFilesSelected = useCallback((selectedFiles) => {
    const newPreviews = selectedFiles.map(f => URL.createObjectURL(f));
    setFiles(prev => [...prev, ...selectedFiles]);
    setPreviews(prev => [...prev, ...newPreviews]);
    setDone(false);
  }, []);

  const removeFile = (i) => {
    URL.revokeObjectURL(previews[i]);
    setFiles(prev => prev.filter((_, j) => j !== i));
    setPreviews(prev => prev.filter((_, j) => j !== i));
    setDone(false);
  };

  const process = useCallback(async () => {
    if (files.length === 0) { toast.error('Please add at least one image'); return; }
    setProcessing(true);
    setDone(false);
    try {
      // Dynamically import jsPDF
      const { jsPDF } = await import('jspdf');

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: pageSize,
      });

      // Get page dimensions in mm
      const pgW = pdf.internal.pageSize.getWidth();
      const pgH = pdf.internal.pageSize.getHeight();
      const margin = 10; // 10mm margin
      const maxW = pgW - margin * 2;
      const maxH = pgH - margin * 2;

      for (let i = 0; i < files.length; i++) {
        if (i > 0) pdf.addPage();

        const img = await loadImage(files[i]);
        const iw = img.naturalWidth;
        const ih = img.naturalHeight;

        // Draw on a canvas to get dataURL
        const canvas = document.createElement('canvas');
        canvas.width = iw;
        canvas.height = ih;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        // Use JPEG for smaller file size
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);

        // Scale image to fit within page with margin
        const imgRatio = iw / ih;
        const pageRatio = maxW / maxH;
        let drawW, drawH;
        if (imgRatio > pageRatio) {
          drawW = maxW;
          drawH = maxW / imgRatio;
        } else {
          drawH = maxH;
          drawW = maxH * imgRatio;
        }

        // Center on page
        const x = margin + (maxW - drawW) / 2;
        const y = margin + (maxH - drawH) / 2;

        pdf.addImage(dataUrl, 'JPEG', x, y, drawW, drawH);
      }

      // Use jsPDF's built-in save — this gives the correct filename
      pdf.save('imageflow-output.pdf');
      setDone(true);
      toast.success(`PDF created with ${files.length} page${files.length > 1 ? 's' : ''}!`);
    } catch (err) {
      console.error(err);
      toast.error('PDF creation failed: ' + err.message);
    } finally {
      setProcessing(false);
    }
  }, [files, pageSize]);

  const reset = () => {
    previews.forEach(p => URL.revokeObjectURL(p));
    setFiles([]);
    setPreviews([]);
    setDone(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <FileUploader
        onFilesSelected={onFilesSelected}
        multiple={true}
        label="Drop images to convert to PDF"
        sublabel="Each image becomes one PDF page · Supports JPG, PNG, WebP"
      />

      {files.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Image thumbnails */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {previews.map((p, i) => (
              <div key={i} style={{ position: 'relative' }}>
                <img src={p} alt={`Page ${i + 1}`}
                  style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 8, border: '1px solid var(--hairline)', display: 'block' }} />
                <div style={{
                  position: 'absolute', top: -4, left: -4, width: 18, height: 18,
                  borderRadius: '50%', background: 'var(--primary)', color: '#fff',
                  fontSize: 10, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {i + 1}
                </div>
                <button onClick={() => removeFile(i)} style={{
                  position: 'absolute', top: -6, right: -6, width: 18, height: 18,
                  borderRadius: '50%', background: 'var(--error)', color: '#fff',
                  border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Trash2 size={9} />
                </button>
              </div>
            ))}
          </div>

          {/* Page size selector */}
          <div className="card">
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 10 }}>Page Size</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { value: 'a4', label: 'A4' },
                { value: 'letter', label: 'Letter' },
                { value: 'a3', label: 'A3' },
              ].map(s => (
                <button key={s.value} onClick={() => setPageSize(s.value)}
                  className={`pill ${pageSize === s.value ? 'pill-active' : ''}`}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Success state */}
          {done && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '12px 16px', borderRadius: 'var(--radius-md)',
              background: 'var(--success-bg)', color: 'var(--success)',
              fontSize: 14, fontWeight: 500,
            }}>
              ✅ PDF downloaded as <strong>imageflow-output.pdf</strong>
            </div>
          )}

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={process} disabled={processing} className="btn-primary">
              {processing
                ? <Loader2 size={16} style={{ animation: 'spin 0.6s linear infinite' }} />
                : <FileOutput size={16} />}
              {processing
                ? 'Creating PDF...'
                : `Create PDF (${files.length} page${files.length > 1 ? 's' : ''})`}
            </button>
            <button onClick={reset} className="btn-secondary">
              <RotateCcw size={16} /> Clear All
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
