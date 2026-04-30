'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Download, RotateCcw, Loader2, Smartphone } from 'lucide-react';
import FileUploader from '@/components/FileUploader';
import { canvasToBlob } from '@/lib/image-processor';
import { downloadBlob } from '@/lib/download';
import { formatBytes, generateOutputFilename } from '@/lib/utils';
import { toast } from 'sonner';

export default function HeicConverter({ tool }) {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [outputFormat, setOutputFormat] = useState('jpeg');

  const onFilesSelected = useCallback((f0) => {
    setFile(f0[0]); setResult(null);
  }, []);

  const process = useCallback(async () => {
    if (!file) return; setProcessing(true);
    try {
      const heic2any = (await import('heic2any')).default;
      const toType = outputFormat === 'jpeg' ? 'image/jpeg' : 'image/png';
      const result = await heic2any({ blob: file, toType, quality: 0.9 });
      const blob = Array.isArray(result) ? result[0] : result;
      setResult({ blob, url: URL.createObjectURL(blob), size: blob.size });
      toast.success('HEIC converted!');
    } catch (err) { toast.error('Conversion failed: ' + err.message); }
    finally { setProcessing(false); }
  }, [file, outputFormat]);

  const handleDownload = () => {
    if (!result) return;
    downloadBlob(result.blob, generateOutputFilename(file.name, 'converted', outputFormat === 'jpeg' ? 'jpg' : 'png'));
  };

  const reset = () => {
    if (result?.url) URL.revokeObjectURL(result.url);
    setFile(null); setResult(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {!file ? (
        <FileUploader
          onFilesSelected={onFilesSelected}
          label="Drop your HEIC/HEIF file here"
          sublabel="iPhone photos usually use this format"
          accept={{ 'image/heic': ['.heic'], 'image/heif': ['.heif'] }}
        />
      ) : (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{
            display: 'flex', gap: 16, alignItems: 'center', padding: '16px 20px',
            background: 'var(--primary-light)', borderRadius: 'var(--radius-md)', border: '1px solid var(--primary-muted)',
          }}>
            <Smartphone size={24} style={{ color: 'var(--primary)', flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{file.name}</p>
              <p style={{ fontSize: 12, color: 'var(--muted)' }}>{formatBytes(file.size)} · HEIC/HEIF</p>
            </div>
          </div>

          <div className="card">
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 10 }}>Convert to</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setOutputFormat('jpeg')} className={`pill ${outputFormat === 'jpeg' ? 'pill-active' : ''}`}>JPEG</button>
              <button onClick={() => setOutputFormat('png')} className={`pill ${outputFormat === 'png' ? 'pill-active' : ''}`}>PNG</button>
            </div>
          </div>

          {result && (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: 'var(--success)', fontWeight: 500 }}>
              ✅ Converted! Size: {formatBytes(result.size)}
            </div>
          )}

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {!result ? (
              <button onClick={process} disabled={processing} className="btn-primary">
                {processing ? <Loader2 size={16} className="animate-spin" /> : <Smartphone size={16} />}
                {processing ? 'Converting...' : `Convert to ${outputFormat.toUpperCase()}`}
              </button>
            ) : (
              <button onClick={handleDownload} className="btn-success"><Download size={16} /> Download</button>
            )}
            <button onClick={reset} className="btn-secondary"><RotateCcw size={16} /> Start Over</button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
