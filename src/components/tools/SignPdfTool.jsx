'use client';

import { useCallback, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { PenTool, Loader2, Download, RotateCcw } from 'lucide-react';
import FileUploader from '@/components/FileUploader';
import { PDFDocument } from 'pdf-lib';
import { toast } from 'sonner';

function dataUrlToBytes(dataUrl) {
  const b64 = dataUrl.split(',')[1] || '';
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

export default function SignPdfTool() {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [applyMode, setApplyMode] = useState('current');
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [sigData, setSigData] = useState(null);
  const [position, setPosition] = useState('bottom-right');
  const [scalePct, setScalePct] = useState(22);
  const canvasRef = useRef(null);
  const drawRef = useRef({ drawing: false, x: 0, y: 0 });

  const setupCanvas = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    c.width = 640;
    c.height = 200;
    const ctx = c.getContext('2d');
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#111827';
  }, []);

  const onFilesSelected = useCallback(async (picked) => {
    const f = picked[0];
    setFile(f);
    setResult(null);
    const doc = await PDFDocument.load(await f.arrayBuffer());
    setNumPages(doc.getPageCount());
    setPageNumber(1);
    setApplyMode('current');
    setTimeout(setupCanvas, 0);
  }, [setupCanvas]);

  const onDown = (e) => {
    const c = canvasRef.current;
    if (!c) return;
    const rect = c.getBoundingClientRect();
    drawRef.current = { drawing: true, x: e.clientX - rect.left, y: e.clientY - rect.top };
    c.setPointerCapture(e.pointerId);
  };
  const onMove = (e) => {
    if (!drawRef.current.drawing) return;
    const c = canvasRef.current;
    const ctx = c?.getContext('2d');
    if (!c || !ctx) return;
    const rect = c.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(drawRef.current.x, drawRef.current.y);
    ctx.lineTo(x, y);
    ctx.stroke();
    drawRef.current.x = x;
    drawRef.current.y = y;
  };
  const onUp = (e) => {
    const c = canvasRef.current;
    if (c?.hasPointerCapture?.(e.pointerId)) c.releasePointerCapture(e.pointerId);
    drawRef.current.drawing = false;
  };

  const saveSignature = () => {
    const c = canvasRef.current;
    if (!c) return;
    setSigData(c.toDataURL('image/png'));
    toast.success('Signature saved.');
  };

  const signPdf = useCallback(async () => {
    if (!file || !sigData) return toast.error('Draw signature first.');
    setProcessing(true);
    try {
      const doc = await PDFDocument.load(await file.arrayBuffer());
      const png = await doc.embedPng(dataUrlToBytes(sigData));
      const pages = doc.getPages();
      const targets = applyMode === 'all' ? pages : [pages[pageNumber - 1]].filter(Boolean);
      targets.forEach((p) => {
        const { width, height } = p.getSize();
        const w = width * (scalePct / 100);
        const h = (png.height / png.width) * w;
        const margin = 24;
        let x = margin;
        let y = margin;
        if (position.includes('right')) x = width - w - margin;
        if (position.includes('top')) y = height - h - margin;
        p.drawImage(png, { x, y, width: w, height: h });
      });
      const blob = new Blob([await doc.save()], { type: 'application/pdf' });
      if (result?.url) URL.revokeObjectURL(result.url);
      setResult({ blob, url: URL.createObjectURL(blob) });
      toast.success('Signature applied.');
    } catch (e) {
      toast.error(`Sign failed: ${e.message}`);
    } finally {
      setProcessing(false);
    }
  }, [file, sigData, applyMode, pageNumber, position, scalePct, result?.url]);

  const reset = () => {
    if (result?.url) URL.revokeObjectURL(result.url);
    setFile(null);
    setResult(null);
    setSigData(null);
    setNumPages(0);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {!file ? (
        <FileUploader onFilesSelected={onFilesSelected} accept={{ 'application/pdf': ['.pdf'] }} label="Drop PDF to sign" />
      ) : (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <canvas
              ref={canvasRef}
              onPointerDown={onDown}
              onPointerMove={onMove}
              onPointerUp={onUp}
              onPointerCancel={onUp}
              style={{ width: '100%', height: 170, border: '1px solid var(--hairline)', borderRadius: 10, background: '#fff', touchAction: 'none' }}
            />
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button className="btn-secondary" onClick={setupCanvas}>Clear</button>
              <button className="btn-secondary" onClick={saveSignature}>Save signature</button>
            </div>
            <label style={{ fontSize: 13 }}><input type="radio" checked={applyMode === 'current'} onChange={() => setApplyMode('current')} /> Current page</label>
            <label style={{ fontSize: 13 }}><input type="radio" checked={applyMode === 'all'} onChange={() => setApplyMode('all')} /> All pages</label>
            {applyMode === 'current' && <input className="input" style={{ maxWidth: 120 }} type="number" min={1} max={numPages} value={pageNumber} onChange={(e) => setPageNumber(Math.max(1, Math.min(numPages, Number(e.target.value) || 1)))} />}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['bottom-right', 'bottom-left', 'top-right', 'top-left'].map(p => (
                <button key={p} className={`pill ${position === p ? 'pill-active' : ''}`} onClick={() => setPosition(p)}>{p}</button>
              ))}
            </div>
            <div><div style={{ fontSize: 12 }}>Size: {scalePct}%</div><input type="range" min="10" max="50" value={scalePct} onChange={(e) => setScalePct(Number(e.target.value))} /></div>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {!result ? (
              <button className="btn-primary" onClick={signPdf} disabled={processing || !sigData} style={{ flex: 1 }}>
                {processing ? <Loader2 size={16} className="animate-spin" /> : <PenTool size={16} />}
                {processing ? 'Signing...' : 'Apply signature'}
              </button>
            ) : (
              <a href={result.url} download={file.name.replace(/\.pdf$/i, '') + '-signed.pdf'} className="btn-success" style={{ textDecoration: 'none', flex: 1, justifyContent: 'center' }}>
                <Download size={16} /> Download signed PDF
              </a>
            )}
            <button className="btn-secondary" onClick={reset}><RotateCcw size={16} /> Start Over</button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

