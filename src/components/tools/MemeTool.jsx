'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Download, RotateCcw, Loader2, Smile } from 'lucide-react';
import FileUploader from '@/components/FileUploader';
import { loadImage, addMemeText, canvasToBlob } from '@/lib/image-processor';
import { downloadBlob } from '@/lib/download';
import { generateOutputFilename } from '@/lib/utils';
import { toast } from 'sonner';

export default function MemeTool({ tool }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [imgEl, setImgEl] = useState(null);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');

  const onFilesSelected = useCallback(async (f0) => {
    const f = f0[0]; setFile(f); setResult(null);
    try { const img = await loadImage(f); setImgEl(img); setPreview(URL.createObjectURL(f)); }
    catch { toast.error('Failed to load image'); }
  }, []);

  const process = useCallback(async () => {
    if (!imgEl) return; setProcessing(true);
    try {
      const { canvas } = addMemeText(imgEl, topText, bottomText);
      const blob = await canvasToBlob(canvas, 'image/png', 0.95);
      setResult({ blob, url: URL.createObjectURL(blob) });
      toast.success('Meme created! 🎉');
    } catch (err) { toast.error('Failed: ' + err.message); }
    finally { setProcessing(false); }
  }, [imgEl, topText, bottomText]);

  const handleDownload = () => downloadBlob(result.blob, generateOutputFilename(file.name, 'meme', 'png'));
  const reset = () => { setFile(null); setPreview(null); setResult(null); setImgEl(null); setTopText(''); setBottomText(''); };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {!file ? <FileUploader onFilesSelected={onFilesSelected} label="Drop an image to create a meme" /> : (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ textAlign: 'center' }}>
            <div className="preview-box" style={{ maxWidth: 500, margin: '0 auto' }}>
              <img src={result?.url || preview} alt="Meme preview" style={{ maxHeight: 400 }} />
            </div>
          </div>

          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: 'var(--muted)', marginBottom: 6 }}>Top Text</label>
              <input type="text" value={topText} onChange={(e) => setTopText(e.target.value)}
                className="input" placeholder="TOP TEXT" style={{ textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: 'var(--muted)', marginBottom: 6 }}>Bottom Text</label>
              <input type="text" value={bottomText} onChange={(e) => setBottomText(e.target.value)}
                className="input" placeholder="BOTTOM TEXT" style={{ textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={process} disabled={processing || (!topText.trim() && !bottomText.trim())} className="btn-primary">
              {processing ? <Loader2 size={16} className="animate-spin" /> : <Smile size={16} />}
              {processing ? 'Creating...' : 'Generate Meme'}
            </button>
            {result && <button onClick={handleDownload} className="btn-success"><Download size={16} /> Download</button>}
            <button onClick={reset} className="btn-secondary"><RotateCcw size={16} /> Start Over</button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
