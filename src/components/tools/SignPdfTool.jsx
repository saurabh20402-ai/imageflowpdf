'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Download, RotateCcw, PenTool, Upload } from 'lucide-react';
import FileUploader from '@/components/FileUploader';
import { PDFDocument } from 'pdf-lib';
import { toast } from 'sonner';

function dataUrlToUint8(dataUrl) {
  const base64 = dataUrl.split(',')[1] || '';
  const bin = atob(base64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

export default function SignPdfTool() {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null); // { url, blob }
  const [numPages, setNumPages] = useState(null);
  const [applyMode, setApplyMode] = useState('current'); // default like signing
  const [pageNumber, setPageNumber] = useState(1);

  // signature
  const [sigMode, setSigMode] = useState('draw'); // 'draw' | 'upload'
  const [sigDataUrl, setSigDataUrl] = useState(null); // png data url
  const canvasRef = useRef(null);
  const drawingRef = useRef({ drawing: false, lastX: 0, lastY: 0 });

  // placement
  const [scalePct, setScalePct] = useState(25);
  const [marginPct, setMarginPct] = useState(6);
  const [position, setPosition] = useState('bottom-right'); // bottom-right etc

  const onFilesSelected = useCallback(async (selected) => {
    const f = selected[0];
    if (!f || !(f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf'))) {
      toast.error('Please upload a PDF file.');
      return;
    }
    setFile(f);
    setResult(null);
    setApplyMode('current');
    setPageNumber(1);
    try {
      const bytes = await f.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      setNumPages(doc.getPageCount());
    } catch (err) {
      console.error(err);
      toast.error('Failed to read PDF: ' + (err?.message || 'Unknown error'));
    }
  }, []);

  const initCanvas = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const cssW = 520;
    const cssH = 180;
    c.style.width = '100%';
    c.style.maxWidth = `${cssW}px`;
    c.style.height = `${cssH}px`;
    c.width = Math.floor(cssW * dpr);
    c.height = Math.floor(cssH * dpr);
    const ctx = c.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#111827';
    ctx.lineWidth = 3;
  }, []);

  const clearSignature = useCallback(() => {
    setSigDataUrl(null);
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    ctx.clearRect(0, 0, c.width, c.height);
  }, []);

  const saveSignature = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    setSigDataUrl(c.toDataURL('image/png'));
    toast.success('Signature saved.');
  }, []);

  const onPointerDown = (e) => {
    if (sigMode !== 'draw') return;
    const c = canvasRef.current;
    if (!c) return;
    const rect = c.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    drawingRef.current = { drawing: true, lastX: x, lastY: y };
    c.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (sigMode !== 'draw') return;
    const c = canvasRef.current;
    if (!c) return;
    const st = drawingRef.current;
    if (!st.drawing) return;
    const rect = c.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ctx = c.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(st.lastX, st.lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    drawingRef.current.lastX = x;
    drawingRef.current.lastY = y;
  };

  const onPointerUp = (e) => {
    const c = canvasRef.current;
    if (c?.hasPointerCapture?.(e.pointerId)) c.releasePointerCapture(e.pointerId);
    drawingRef.current.drawing = false;
  };

  const canSign = useMemo(() => !!file && !processing && !!sigDataUrl, [file, processing, sigDataUrl]);

  const sign = useCallback(async () => {
    if (!file) return;
    if (!sigDataUrl) {
      toast.error('Add a signature first.');
      return;
    }
    setProcessing(true);
    try {
      const bytes = await file.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      const pages = doc.getPages();
      const targets = applyMode === 'all'
        ? pages
        : [pages[pageNumber - 1]].filter(Boolean);

      const sigBytes = dataUrlToUint8(sigDataUrl);
      const sigImg = await doc.embedPng(sigBytes);

      targets.forEach((page) => {
        const { width, height } = page.getSize();
        const margin = (Math.max(width, height) * (marginPct / 100));
        const desiredW = width * (scalePct / 100);
        const scale = desiredW / sigImg.width;
        const w = sigImg.width * scale;
        const h = sigImg.height * scale;

        let x = margin;
        let y = margin;
        if (position.includes('right')) x = width - margin - w;
        if (position.includes('top')) y = height - margin - h;
        if (position.includes('center')) {
          x = (width - w) / 2;
          y = (height - h) / 2;
        }

        page.drawImage(sigImg, { x, y, width: w, height: h, opacity: 1 });
      });

      const outBytes = await doc.save();
      const blob = new Blob([outBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      if (result?.url) URL.revokeObjectURL(result.url);
      setResult({ url, blob });
      toast.success('✅ Signature added!');
    } catch (err) {
      console.error(err);
      toast.error('Sign failed: ' + (err?.message || 'Unknown error'));
    } finally {
      setProcessing(false);
    }
  }, [file, sigDataUrl, applyMode, pageNumber, scalePct, marginPct, position, result?.url]);

  const reset = () => {
    if (result?.url) URL.revokeObjectURL(result.url);
    setFile(null);
    setResult(null);
    setNumPages(null);
    setPageNumber(1);
    setSigDataUrl(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {!file ? (
        <FileUploader
          onFilesSelected={onFilesSelected}
          accept={{ 'application/pdf': ['.pdf'] }}
          label="Drop PDF to sign"
          sublabel="Draw or upload a signature, then apply it to your PDF"
        />
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--ink)' }}>Sign PDF</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                  {file.name} · {numPages ? `${numPages} page${numPages > 1 ? 's' : ''}` : '...'}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button className={`pill ${sigMode === 'draw' ? 'pill-active' : ''}`} onClick={() => { setSigMode('draw'); setTimeout(initCanvas, 0); }}>
                <PenTool size={14} style={{ marginRight: 6 }} /> Draw
              </button>
              <button className={`pill ${sigMode === 'upload' ? 'pill-active' : ''}`} onClick={() => setSigMode('upload')}>
                <Upload size={14} style={{ marginRight: 6 }} /> Upload PNG
              </button>
              <button className="pill" onClick={clearSignature}>Clear</button>
              {sigMode === 'draw' && <button className="pill pill-active" onClick={saveSignature}>Save signature</button>}
            </div>

            {sigMode === 'draw' ? (
              <div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 8 }}>Draw your signature below.</div>
                <canvas
                  ref={canvasRef}
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={onPointerUp}
                  onPointerCancel={onPointerUp}
                  style={{
                    width: '100%',
                    height: 180,
                    borderRadius: 12,
                    border: '1px solid var(--hairline)',
                    background: '#fff',
                    touchAction: 'none',
                  }}
                />
                <button className="btn-secondary" onClick={initCanvas} style={{ marginTop: 10 }}>Reset canvas</button>
              </div>
            ) : (
              <FileUploader
                onFilesSelected={async (selected) => {
                  const img = selected[0];
                  if (!img) return;
                  if (!img.type.startsWith('image/')) { toast.error('Upload an image (PNG recommended).'); return; }
                  const url = URL.createObjectURL(img);
                  const i = new Image();
                  i.onload = () => {
                    const c = document.createElement('canvas');
                    const w = 900;
                    const scale = w / i.naturalWidth;
                    c.width = w;
                    c.height = Math.max(1, Math.round(i.naturalHeight * scale));
                    const ctx = c.getContext('2d');
                    ctx.clearRect(0, 0, c.width, c.height);
                    ctx.drawImage(i, 0, 0, c.width, c.height);
                    setSigDataUrl(c.toDataURL('image/png'));
                    URL.revokeObjectURL(url);
                    toast.success('Signature uploaded.');
                  };
                  i.onerror = () => {
                    URL.revokeObjectURL(url);
                    toast.error('Failed to load image.');
                  };
                  i.src = url;
                }}
                label="Upload signature image"
                sublabel="Transparent PNG works best"
                accept={{ 'image/png': ['.png'], 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] }}
              />
            )}

            {sigDataUrl && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>Preview:</div>
                <img src={sigDataUrl} alt="Signature preview" style={{ maxHeight: 56, background: '#fff', border: '1px solid var(--hairline)', borderRadius: 10, padding: 8 }} />
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: 8 }}>Apply to</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--ink)' }}>
                    <input type="radio" name="applyMode" checked={applyMode === 'current'} onChange={() => setApplyMode('current')} />
                    Current page
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--ink)' }}>
                    <input type="radio" name="applyMode" checked={applyMode === 'all'} onChange={() => setApplyMode('all')} />
                    All pages
                  </label>
                </div>
                {applyMode === 'current' && numPages > 1 && (
                  <div style={{ marginTop: 10 }}>
                    <label style={{ fontSize: 12, color: 'var(--muted)' }}>Page</label>
                    <input
                      className="input"
                      style={{ width: 120, marginTop: 6 }}
                      type="number"
                      min={1}
                      max={numPages}
                      value={pageNumber}
                      onChange={(e) => setPageNumber(Math.max(1, Math.min(numPages, Number(e.target.value) || 1)))}
                    />
                  </div>
                )}
              </div>

              <div>
                <div style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: 8 }}>Placement</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {[
                    ['bottom-right', 'Bottom right'],
                    ['bottom-left', 'Bottom left'],
                    ['top-right', 'Top right'],
                    ['top-left', 'Top left'],
                    ['center', 'Center'],
                  ].map(([id, label]) => (
                    <button key={id} className={`pill ${position === id ? 'pill-active' : ''}`} onClick={() => setPosition(id)}>
                      {label}
                    </button>
                  ))}
                </div>
                <div style={{ marginTop: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>
                    <span>Signature size</span><strong style={{ color: 'var(--ink)' }}>{scalePct}%</strong>
                  </div>
                  <input type="range" min="10" max="60" value={scalePct} onChange={(e) => setScalePct(Number(e.target.value))} />
                </div>
                <div style={{ marginTop: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>
                    <span>Margin</span><strong style={{ color: 'var(--ink)' }}>{marginPct}%</strong>
                  </div>
                  <input type="range" min="0" max="20" value={marginPct} onChange={(e) => setMarginPct(Number(e.target.value))} />
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {!result ? (
              <button className="btn-primary" onClick={sign} disabled={!canSign} style={{ flex: 1 }}>
                {processing ? <Loader2 size={16} className="animate-spin" /> : <PenTool size={16} />}
                {processing ? 'Signing...' : 'Apply signature'}
              </button>
            ) : (
              <a
                href={result.url}
                download={file.name.replace(/\.pdf$/i, '') + '-signed.pdf'}
                className="btn-success"
                style={{ textDecoration: 'none', flex: 1, justifyContent: 'center' }}
              >
                <Download size={16} /> Download signed PDF
              </a>
            )}
            <button className="btn-secondary" onClick={reset}>
              <RotateCcw size={16} /> Start Over
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

