'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Download, RotateCcw, Loader2, FileText, Copy, CheckCircle } from 'lucide-react';
import FileUploader from '@/components/FileUploader';
import { toast } from 'sonner';

const LANGS = [
  { value: 'eng', label: 'English' },
  { value: 'chi_sim', label: 'Chinese (Simplified)' },
  { value: 'chi_tra', label: 'Chinese (Traditional)' },
  { value: 'fra', label: 'French' },
  { value: 'deu', label: 'German' },
  { value: 'spa', label: 'Spanish' },
  { value: 'por', label: 'Portuguese' },
  { value: 'ara', label: 'Arabic' },
  { value: 'hin', label: 'Hindi' },
  { value: 'jpn', label: 'Japanese' },
  { value: 'kor', label: 'Korean' },
  { value: 'rus', label: 'Russian' },
];

export default function OcrTool({ tool }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState('');
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMsg, setStatusMsg] = useState('');
  const [copied, setCopied] = useState(false);
  const [lang, setLang] = useState('eng');

  const onFilesSelected = useCallback((f0) => {
    const f = f0[0];
    setFile(f);
    setResult('');
    setProgress(0);
    setStatusMsg('');
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(f));
  }, [preview]);

  const process = useCallback(async () => {
    if (!file) return;
    setProcessing(true);
    setProgress(0);
    setStatusMsg('Loading OCR engine...');

    try {
      // Tesseract.js v7 API — simple createWorker(lang)
      const { createWorker } = await import('tesseract.js');

      setProgress(10);
      setStatusMsg('Initializing...');

      const worker = await createWorker(lang, 1, {
        // v7 logger
        logger: (m) => {
          if (m.status === 'loading tesseract core') setStatusMsg('Loading engine...');
          else if (m.status === 'loading language traineddata') setStatusMsg('Loading language data...');
          else if (m.status === 'initializing tesseract') setStatusMsg('Initializing...');
          else if (m.status === 'recognizing text') {
            setStatusMsg('Recognizing text...');
            setProgress(30 + Math.round(m.progress * 65));
          }
        },
      });

      setProgress(30);
      setStatusMsg('Recognizing text...');

      const { data: { text } } = await worker.recognize(file);
      await worker.terminate();

      const cleaned = text.trim();
      setResult(cleaned || '(No text found in image)');
      setProgress(100);
      setStatusMsg('Done!');

      if (cleaned) {
        toast.success('Text extracted successfully!');
      } else {
        toast.warning('No readable text found in this image.');
      }
    } catch (err) {
      console.error('OCR error:', err);
      toast.error('OCR failed: ' + err.message);
      setStatusMsg('Failed');
      setProgress(0);
    } finally {
      setProcessing(false);
    }
  }, [file, lang, preview]);

  const copyText = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success('Copied to clipboard!');
  };

  const downloadTxt = () => {
    const blob = new Blob([result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'extracted-text.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    if (preview) URL.revokeObjectURL(preview);
    setFile(null);
    setPreview(null);
    setResult('');
    setProgress(0);
    setStatusMsg('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {!file ? (
        <FileUploader
          onFilesSelected={onFilesSelected}
          label="Drop image to extract text"
          sublabel="Supports JPG, PNG, WebP, BMP — works best on clear, high-res images"
        />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Preview */}
          <div className="preview-box" style={{ maxWidth: 440, margin: 0 }}>
            <img src={preview} alt="Preview" style={{ maxHeight: 260 }} />
          </div>

          {/* Language selector */}
          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', whiteSpace: 'nowrap' }}>
              Language:
            </label>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="input"
              style={{ maxWidth: 200 }}>
              {LANGS.map(l => (
                <option key={l.value} value={l.value}>{l.label}</option>
              ))}
            </select>
          </div>

          {/* Progress bar */}
          {processing && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)' }}>
                <span>{statusMsg}</span>
                <span style={{ fontWeight: 600, color: 'var(--primary)' }}>{progress}%</span>
              </div>
              <div style={{ height: 6, background: 'var(--hairline)', borderRadius: 99, overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, var(--primary), #818cf8)',
                  width: `${progress}%`,
                  transition: 'width 300ms ease',
                  borderRadius: 99,
                }} />
              </div>
            </div>
          )}

          {/* Extracted text */}
          {result && (
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>
                  Extracted Text
                </span>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button onClick={copyText} className="btn-secondary"
                    style={{ padding: '5px 12px', fontSize: 12, gap: 5 }}>
                    {copied ? <CheckCircle size={13} /> : <Copy size={13} />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                  <button onClick={downloadTxt} className="btn-secondary"
                    style={{ padding: '5px 12px', fontSize: 12, gap: 5 }}>
                    <Download size={13} /> TXT
                  </button>
                </div>
              </div>
              <textarea
                readOnly
                value={result}
                className="input"
                style={{
                  minHeight: 200,
                  resize: 'vertical',
                  fontFamily: 'ui-monospace, monospace',
                  fontSize: 13,
                  lineHeight: 1.6,
                }}
              />
              <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 8 }}>
                {result.split(/\s+/).filter(Boolean).length} words · {result.length} characters
              </p>
            </div>
          )}

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {!result && !processing && (
              <button onClick={process} className="btn-primary">
                <FileText size={16} />
                Extract Text
              </button>
            )}
            {processing && (
              <button disabled className="btn-primary">
                <Loader2 size={16} style={{ animation: 'spin 0.6s linear infinite' }} />
                Extracting... {progress}%
              </button>
            )}
            {result && !processing && (
              <button onClick={() => { setResult(''); setProgress(0); }} className="btn-secondary">
                <FileText size={16} /> Extract Again
              </button>
            )}
            <button onClick={reset} className="btn-secondary">
              <RotateCcw size={16} /> New Image
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
