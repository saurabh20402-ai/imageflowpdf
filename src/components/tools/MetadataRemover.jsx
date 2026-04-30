'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Download, RotateCcw, Loader2, ShieldOff, CheckCircle } from 'lucide-react';
import FileUploader from '@/components/FileUploader';
import { loadImage, drawImageToCanvas, canvasToBlob } from '@/lib/image-processor';
import { downloadBlob } from '@/lib/download';
import { formatBytes, generateOutputFilename } from '@/lib/utils';
import { toast } from 'sonner';

const REMOVED_ITEMS = ['EXIF data', 'GPS location', 'Camera model', 'Date/time taken', 'Lens info', 'Software info', 'Thumbnail data', 'Copyright info'];

export default function MetadataRemover({ tool }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [imgEl, setImgEl] = useState(null);

  const onFilesSelected = useCallback(async (f0) => {
    const f = f0[0]; setFile(f); setResult(null);
    try { const img = await loadImage(f); setImgEl(img); setPreview(URL.createObjectURL(f)); }
    catch { toast.error('Failed to load image'); }
  }, []);

  const process = useCallback(async () => {
    if (!file) return; setProcessing(true);
    try {
      const img = await loadImage(file);
      const { canvas } = drawImageToCanvas(img);
      const mime = file.type === 'image/jpeg' ? 'image/jpeg' : 'image/png';
      const blob = await canvasToBlob(canvas, mime, 0.95);
      setResult({ blob, url: URL.createObjectURL(blob), size: blob.size });
      toast.success('All metadata removed!');
    } catch (err) { toast.error('Failed: ' + err.message); }
    finally { setProcessing(false); }
  }, [file]);

  const handleDownload = () => {
    const ext = file.type === 'image/jpeg' ? 'jpg' : 'png';
    downloadBlob(result.blob, generateOutputFilename(file.name, 'clean', ext));
  };
  const reset = () => { setFile(null); setPreview(null); setResult(null); setImgEl(null); };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {!file ? <FileUploader onFilesSelected={onFilesSelected} label="Drop image to strip metadata" sublabel="Removes EXIF, GPS, and all hidden data" /> : (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="preview-box" style={{ maxWidth: 400, margin: '0 auto' }}>
            <img src={preview} alt="Preview" style={{ maxHeight: 240 }} />
          </div>

          {/* What gets removed */}
          <div className="card" style={{ background: '#fffbeb', borderColor: '#fcd34d' }}>
            <h4 style={{ fontSize: 13, fontWeight: 600, color: '#92400e', marginBottom: 10 }}>What gets removed:</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
              {REMOVED_ITEMS.map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#92400e' }}>
                  <ShieldOff size={10} /> {item}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', fontSize: 13 }}>
            <span style={{ color: 'var(--muted)' }}>Original: <strong>{formatBytes(file.size)}</strong></span>
            {result && <span style={{ color: 'var(--success)', fontWeight: 600 }}>Clean: {formatBytes(result.size)}</span>}
          </div>

          {result && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', background: 'var(--success-bg)', borderRadius: 'var(--radius-md)', color: 'var(--success)' }}>
              <CheckCircle size={16} />
              <span style={{ fontSize: 14, fontWeight: 500 }}>All metadata removed successfully!</span>
            </div>
          )}

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {!result ? (
              <button onClick={process} disabled={processing} className="btn-primary">
                {processing ? <Loader2 size={16} className="animate-spin" /> : <ShieldOff size={16} />}
                {processing ? 'Removing...' : 'Remove Metadata'}
              </button>
            ) : (
              <button onClick={handleDownload} className="btn-success"><Download size={16} /> Download Clean Image</button>
            )}
            <button onClick={reset} className="btn-secondary"><RotateCcw size={16} /> Start Over</button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
