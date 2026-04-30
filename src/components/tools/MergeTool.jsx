'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Download, RotateCcw, Loader2, GitMerge, Plus, Trash2 } from 'lucide-react';
import FileUploader from '@/components/FileUploader';
import { loadImage, createCanvas, canvasToBlob } from '@/lib/image-processor';
import { downloadBlob } from '@/lib/download';
import { toast } from 'sonner';

export default function MergeTool({ tool }) {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [result, setResult] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [direction, setDirection] = useState('horizontal');

  const onFilesSelected = useCallback(async (selectedFiles) => {
    const newPreviews = selectedFiles.map(f => URL.createObjectURL(f));
    setFiles(prev => [...prev, ...selectedFiles].slice(0, 10));
    setPreviews(prev => [...prev, ...newPreviews].slice(0, 10));
    setResult(null);
  }, []);

  const removeFile = (i) => {
    URL.revokeObjectURL(previews[i]);
    setFiles(prev => prev.filter((_, j) => j !== i));
    setPreviews(prev => prev.filter((_, j) => j !== i));
    setResult(null);
  };

  const process = useCallback(async () => {
    if (files.length < 2) { toast.error('Please add at least 2 images'); return; }
    setProcessing(true);
    try {
      const imgs = await Promise.all(files.map(loadImage));
      let totalW = 0, totalH = 0, maxW = 0, maxH = 0;
      imgs.forEach(img => {
        totalW += img.naturalWidth; totalH += img.naturalHeight;
        maxW = Math.max(maxW, img.naturalWidth); maxH = Math.max(maxH, img.naturalHeight);
      });

      let cw, ch;
      if (direction === 'horizontal') { cw = totalW; ch = maxH; }
      else { cw = maxW; ch = totalH; }

      const { canvas, ctx } = createCanvas(cw, ch);
      ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, cw, ch);

      let offset = 0;
      imgs.forEach(img => {
        if (direction === 'horizontal') {
          ctx.drawImage(img, offset, 0, img.naturalWidth, img.naturalHeight);
          offset += img.naturalWidth;
        } else {
          ctx.drawImage(img, 0, offset, img.naturalWidth, img.naturalHeight);
          offset += img.naturalHeight;
        }
      });

      const blob = await canvasToBlob(canvas, 'image/png', 0.95);
      setResult({ blob, url: URL.createObjectURL(blob) });
      toast.success('Images merged!');
    } catch (err) { toast.error('Failed: ' + err.message); }
    finally { setProcessing(false); }
  }, [files, direction]);

  const reset = () => {
    previews.forEach(p => URL.revokeObjectURL(p));
    if (result?.url) URL.revokeObjectURL(result.url);
    setFiles([]); setPreviews([]); setResult(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <FileUploader onFilesSelected={onFilesSelected} multiple={true} maxFiles={10} label="Drop images to merge" sublabel="Add 2 or more images" />

      {files.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Image list */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {previews.map((p, i) => (
              <div key={i} style={{ position: 'relative', width: 80 }}>
                <img src={p} alt="" style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 8, border: '1px solid var(--hairline)' }} />
                <button onClick={() => removeFile(i)} style={{
                  position: 'absolute', top: -6, right: -6, width: 18, height: 18, borderRadius: '50%',
                  background: 'var(--error)', color: '#fff', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Trash2 size={10} />
                </button>
              </div>
            ))}
          </div>

          <div className="card">
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 10 }}>Merge Direction</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setDirection('horizontal')} className={`pill ${direction === 'horizontal' ? 'pill-active' : ''}`}>Horizontal</button>
              <button onClick={() => setDirection('vertical')} className={`pill ${direction === 'vertical' ? 'pill-active' : ''}`}>Vertical</button>
            </div>
          </div>

          {result && (
            <div>
              <div className="preview-label">Result</div>
              <div className="preview-box"><img src={result.url} alt="Merged" style={{ maxHeight: 300 }} /></div>
            </div>
          )}

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={process} disabled={processing || files.length < 2} className="btn-primary">
              {processing ? <Loader2 size={16} className="animate-spin" /> : <GitMerge size={16} />}
              {processing ? 'Merging...' : 'Merge Images'}
            </button>
            {result && <button onClick={() => downloadBlob(result.blob, 'merged.png')} className="btn-success"><Download size={16} /> Download</button>}
            <button onClick={reset} className="btn-secondary"><RotateCcw size={16} /> Clear All</button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
