'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, RotateCcw, Loader2, Crop, ChevronLeft, ChevronRight } from 'lucide-react';
import FileUploader from '@/components/FileUploader';
import { downloadBlob } from '@/lib/download';
import { toast } from 'sonner';

// react-pdf for rendering
import { Document, Page, pdfjs } from 'react-pdf';
// pdf-lib for modifying the actual PDF
import { PDFDocument } from 'pdf-lib';

// Set up the worker for pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const MIN_SCREEN_SIZE = 40;

export default function CropPdfTool() {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  
  // PDF state
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfBytes, setPdfBytes] = useState(null);
  const [applyMode, setApplyMode] = useState('all'); // 'all' | 'current'
  
  // Crop state
  const [resultUrl, setResultUrl] = useState(null);
  
  // Crop box in SCREEN pixels, relative to the rendered PDF page container
  const [box, setBox] = useState({ x: 20, y: 20, w: 300, h: 400 });
  const [pageSize, setPageSize] = useState({ w: 0, h: 0 });

  const containerRef = useRef(null);
  const pageWrapRef = useRef(null);
  const dragRef = useRef(null);
  const [renderWidth, setRenderWidth] = useState(800);

  // Load PDF file
  const onFilesSelected = useCallback(async (f0) => {
    const f = f0[0];
    if (f.type !== 'application/pdf') {
      toast.error('Please upload a PDF file');
      return;
    }
    setFile(f);
    setResultUrl(null);
    setPageNumber(1);
    setApplyMode('all');
    
    try {
      const arrayBuffer = await f.arrayBuffer();
      setPdfBytes(new Uint8Array(arrayBuffer));
    } catch (err) {
      toast.error('Failed to read PDF file');
    }
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  // Called by react-pdf when the Page is rendered
  const onPageLoadSuccess = (pageInfo) => {
    // pageInfo contains the original viewport
    const viewport = pageInfo.getViewport({ scale: 1 });
    // We'll update the page size to match the rendered canvas later
  };

  // Re-measure when the rendered page resizes
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    
    const handleResize = () => {
      // Find the react-pdf canvas
      const canvas = el.querySelector('canvas');
      if (!canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      if (rect.width > 0 && pageSize.w > 0 && (rect.width !== pageSize.w || rect.height !== pageSize.h)) {
        const scaleX = rect.width / pageSize.w;
        const scaleY = rect.height / pageSize.h;
        setPageSize({ w: rect.width, h: rect.height });
        setBox(prev => ({
          x: prev.x * scaleX, y: prev.y * scaleY,
          w: prev.w * scaleX, h: prev.h * scaleY,
        }));
      } else if (pageSize.w === 0) {
        setPageSize({ w: rect.width, h: rect.height });
        // Initial box size (leave 10% margin)
        const marginX = rect.width * 0.1;
        const marginY = rect.height * 0.1;
        setBox({
          x: marginX,
          y: marginY,
          w: rect.width - (marginX * 2),
          h: rect.height - (marginY * 2),
        });
      }
    };
    
    // Initial measure
    setTimeout(handleResize, 100);
    
    const ro = new ResizeObserver(handleResize);
    ro.observe(el);
    return () => ro.disconnect();
  }, [pageSize, pageNumber]);

  // Compute responsive render width based on available space (prevents overflow on mobile)
  useEffect(() => {
    const el = pageWrapRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      if (!rect.width) return;
      // Keep a little padding so the shadow doesn't cause horizontal scroll
      const w = Math.max(280, Math.min(800, Math.floor(rect.width - 16)));
      setRenderWidth(w);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  // ─── Shared pointer handler ──────────────────────────────────────
  const startDrag = useCallback((e, type) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = { type, startX: e.clientX, startY: e.clientY, startBox: { ...box } };
  }, [box]);

  const onPointerMove = useCallback((e) => {
    if (!dragRef.current || !containerRef.current) return;
    e.preventDefault();

    const canvas = containerRef.current.querySelector('canvas');
    if (!canvas) return;
    
    const imgW = canvas.getBoundingClientRect().width;
    const imgH = canvas.getBoundingClientRect().height;

    const { type, startX, startY, startBox } = dragRef.current;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    setBox(prev => {
      let { x, y, w, h } = startBox;

      if (type === 'move') {
        x = Math.max(0, Math.min(imgW - w, x + dx));
        y = Math.max(0, Math.min(imgH - h, y + dy));
      }
      else if (type === 'se') {
        w = Math.max(MIN_SCREEN_SIZE, Math.min(imgW - x, startBox.w + dx));
        h = Math.max(MIN_SCREEN_SIZE, Math.min(imgH - y, startBox.h + dy));
      }
      else if (type === 'sw') {
        const nx = Math.max(0, Math.min(startBox.x + startBox.w - MIN_SCREEN_SIZE, startBox.x + dx));
        w = startBox.x + startBox.w - nx; x = nx;
        h = Math.max(MIN_SCREEN_SIZE, Math.min(imgH - y, startBox.h + dy));
      }
      else if (type === 'nw') {
        const nx = Math.max(0, Math.min(startBox.x + startBox.w - MIN_SCREEN_SIZE, startBox.x + dx));
        const ny = Math.max(0, Math.min(startBox.y + startBox.h - MIN_SCREEN_SIZE, startBox.y + dy));
        w = startBox.x + startBox.w - nx; x = nx;
        h = startBox.y + startBox.h - ny; y = ny;
      }
      else if (type === 'ne') {
        const ny = Math.max(0, Math.min(startBox.y + startBox.h - MIN_SCREEN_SIZE, startBox.y + dy));
        w = Math.max(MIN_SCREEN_SIZE, Math.min(imgW - x, startBox.w + dx));
        h = startBox.y + startBox.h - ny; y = ny;
      }
      else if (type === 'n') {
        const ny = Math.max(0, Math.min(startBox.y + startBox.h - MIN_SCREEN_SIZE, startBox.y + dy));
        h = startBox.y + startBox.h - ny; y = ny;
      }
      else if (type === 's') {
        h = Math.max(MIN_SCREEN_SIZE, Math.min(imgH - y, startBox.h + dy));
      }
      else if (type === 'e') {
        w = Math.max(MIN_SCREEN_SIZE, Math.min(imgW - x, startBox.w + dx));
      }
      else if (type === 'w') {
        const nx = Math.max(0, Math.min(startBox.x + startBox.w - MIN_SCREEN_SIZE, startBox.x + dx));
        w = startBox.x + startBox.w - nx; x = nx;
      }

      return { x, y, w: Math.max(MIN_SCREEN_SIZE, w), h: Math.max(MIN_SCREEN_SIZE, h) };
    });
  }, []);

  const stopDrag = useCallback((e) => {
    if (dragRef.current && e.target.hasPointerCapture && e.target.hasPointerCapture(e.pointerId)) {
      e.target.releasePointerCapture(e.pointerId);
    }
    dragRef.current = null;
  }, []);

  // ─── Process crop ─────────────────────────────────────────────
  const processCrop = async () => {
    if (!pdfBytes || !containerRef.current) return;
    setProcessing(true);
    
    try {
      // 1. Load PDF Document using pdf-lib
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const pages = pdfDoc.getPages();
      
      // 2. Get original rendered canvas size to calculate ratios
      const canvas = containerRef.current.querySelector('canvas');
      if (!canvas) throw new Error("Could not find rendered PDF page");
      
      const renderW = canvas.getBoundingClientRect().width;
      const renderH = canvas.getBoundingClientRect().height;
      
      // Calculate percentages of crop box relative to the rendered canvas
      const pX = box.x / renderW;
      const pY = box.y / renderH;
      const pW = box.w / renderW;
      const pH = box.h / renderH;
      
      const applyToPages = applyMode === 'current'
        ? [pages[pageNumber - 1]].filter(Boolean)
        : pages;

      // 3. Apply crop to selected pages
      applyToPages.forEach(page => {
        const { width: origW, height: origH } = page.getSize();
        // The Y coordinate in pdf-lib is from bottom-up, unlike DOM which is top-down
        
        const cropX = origW * pX;
        const cropW = origW * pW;
        
        // Since Y is bottom up: bottom = totalHeight - (DOM_Y + DOM_H)
        const cropH = origH * pH;
        const cropY = origH - (origH * pY) - cropH;
        
        // Set boxes (CropBox + MediaBox) so most viewers respect the crop.
        // Some viewers ignore CropBox unless MediaBox/TrimBox are aligned.
        page.setCropBox(cropX, cropY, cropW, cropH);
        if (page.setTrimBox) page.setTrimBox(cropX, cropY, cropW, cropH);
        if (page.setBleedBox) page.setBleedBox(cropX, cropY, cropW, cropH);
        if (page.setArtBox) page.setArtBox(cropX, cropY, cropW, cropH);
        if (page.setMediaBox) page.setMediaBox(cropX, cropY, cropW, cropH);
      });
      
      // 4. Save and export
      const modifiedPdfBytes = await pdfDoc.save();
      const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      
      toast.success(`✅ PDF cropped successfully!`);
    } catch (err) {
      console.error(err);
      toast.error('Failed to crop PDF: ' + err.message);
    } finally {
      setProcessing(false);
    }
  };

  const reset = () => {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setFile(null);
    setResultUrl(null);
    setPdfBytes(null);
    setPageSize({ w: 0, h: 0 });
  };

  const resetSelection = () => {
    const w = pageSize.w || 0;
    const h = pageSize.h || 0;
    if (!w || !h) return;
    const marginX = w * 0.1;
    const marginY = h * 0.1;
    setBox({
      x: marginX,
      y: marginY,
      w: w - marginX * 2,
      h: h - marginY * 2,
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, touchAction: 'pan-y' }}>
      {!file ? (
        <FileUploader 
          onFilesSelected={onFilesSelected} 
          label="Drop PDF to crop" 
          sublabel="Select a PDF to trim margins and extract content"
          accept={{ 'application/pdf': ['.pdf'] }} 
        />
      ) : resultUrl ? (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="card" style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ width: 64, height: 64, background: 'var(--success-bg)', color: 'var(--success)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Crop size={32} />
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>PDF Cropped Successfully!</h3>
            <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 24 }}>
              Your file is ready to download. The crop box has been applied to all pages.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={resultUrl} download={file.name.replace('.pdf', '-cropped.pdf')} className="btn-success" style={{ textDecoration: 'none' }}>
                <Download size={16} /> Download PDF
              </a>
              <button onClick={() => setResultUrl(null)} className="btn-secondary">
                <RotateCcw size={16} /> Adjust Crop
              </button>
              <button onClick={reset} className="btn-secondary">
                New PDF
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="card" style={{ padding: 12, overflow: 'hidden' }}>
            <div
              style={{
                display: 'flex',
                gap: 16,
                alignItems: 'stretch',
                flexWrap: 'wrap',
              }}
            >
              {/* Preview */}
              <div style={{ flex: '1 1 520px', minWidth: 280 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'var(--surface)', borderRadius: 10, marginBottom: 12 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>Crop PDF</span>
                  {numPages > 1 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <button
                        disabled={pageNumber <= 1}
                        onClick={() => setPageNumber(p => Math.max(1, p - 1))}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', opacity: pageNumber <= 1 ? 0.4 : 1 }}
                        aria-label="Previous page"
                      ><ChevronLeft size={18} /></button>
                      <span style={{ fontSize: 12, color: 'var(--muted)' }}>Page <strong style={{ color: 'var(--ink)' }}>{pageNumber}</strong> of {numPages}</span>
                      <button
                        disabled={pageNumber >= numPages}
                        onClick={() => setPageNumber(p => Math.min(numPages, p + 1))}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', opacity: pageNumber >= numPages ? 0.4 : 1 }}
                        aria-label="Next page"
                      ><ChevronRight size={18} /></button>
                    </div>
                  )}
                </div>

                <p style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 10, textAlign: 'center' }}>
                  Drag the rectangle or handles to select the area you want to keep.
                </p>

                <div ref={pageWrapRef} style={{ width: '100%' }}>
                  <div
                    ref={containerRef}
                    style={{
                      position: 'relative',
                      display: 'block',
                      margin: '0 auto',
                      userSelect: 'none',
                      width: 'fit-content',
                      maxWidth: '100%',
                      touchAction: 'none',
                      boxShadow: 'var(--shadow-md)',
                      borderRadius: 12,
                      overflow: 'hidden',
                      background: 'var(--surface-card)',
                    }}
                  >
                    <Document
                      file={file}
                      onLoadSuccess={onDocumentLoadSuccess}
                      loading={<div style={{ padding: 40, textAlign: 'center', color: 'var(--muted)' }}><Loader2 className="animate-spin" style={{ margin: '0 auto' }} /></div>}
                    >
                      <Page
                        pageNumber={pageNumber}
                        onLoadSuccess={onPageLoadSuccess}
                        width={renderWidth}
                        renderAnnotationLayer={false}
                        renderTextLayer={false}
                        className="pdf-page-render"
                      />
                    </Document>

                    {pageSize.w > 0 && (
                      <div style={{ position: 'absolute', top: 0, left: 0, width: pageSize.w, height: pageSize.h, overflow: 'hidden' }}>
                        {/* Dark overlay — 4 sides */}
                        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: box.y, background: 'rgba(0,0,0,0.55)' }} />
                          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, top: box.y + box.h, background: 'rgba(0,0,0,0.55)' }} />
                          <div style={{ position: 'absolute', top: box.y, left: 0, width: box.x, height: box.h, background: 'rgba(0,0,0,0.55)' }} />
                          <div style={{ position: 'absolute', top: box.y, left: box.x + box.w, right: 0, height: box.h, background: 'rgba(0,0,0,0.55)' }} />
                        </div>

                        {/* Crop box */}
                        <div
                          style={{
                            position: 'absolute',
                            left: box.x, top: box.y,
                            width: box.w, height: box.h,
                            border: '2px solid var(--primary)',
                            boxSizing: 'border-box',
                            cursor: 'move',
                            touchAction: 'none',
                            borderRadius: 10,
                            background: 'rgba(99,102,241,0.06)',
                          }}
                          onPointerDown={(e) => startDrag(e, 'move')}
                          onPointerMove={onPointerMove}
                          onPointerUp={stopDrag}
                          onPointerCancel={stopDrag}
                        >
                          {/* Rule-of-thirds grid */}
                          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                            <div style={{ position: 'absolute', left: '33.3%', top: 0, bottom: 0, width: 1, background: 'rgba(99,102,241,0.25)' }} />
                            <div style={{ position: 'absolute', left: '66.6%', top: 0, bottom: 0, width: 1, background: 'rgba(99,102,241,0.25)' }} />
                            <div style={{ position: 'absolute', top: '33.3%', left: 0, right: 0, height: 1, background: 'rgba(99,102,241,0.25)' }} />
                            <div style={{ position: 'absolute', top: '66.6%', left: 0, right: 0, height: 1, background: 'rgba(99,102,241,0.25)' }} />
                          </div>

                          {/* Corner handles */}
                          {[
                            { pos: 'nw', style: { top: -10, left: -10, cursor: 'nw-resize' } },
                            { pos: 'ne', style: { top: -10, right: -10, cursor: 'ne-resize' } },
                            { pos: 'sw', style: { bottom: -10, left: -10, cursor: 'sw-resize' } },
                            { pos: 'se', style: { bottom: -10, right: -10, cursor: 'se-resize' } },
                          ].map(({ pos, style }) => (
                            <div key={pos}
                              style={{
                                position: 'absolute', width: 24, height: 24,
                                background: 'white', borderRadius: '50%',
                                border: '2px solid var(--primary)',
                                touchAction: 'none',
                                ...style,
                              }}
                              onPointerDown={(e) => startDrag(e, pos)}
                              onPointerMove={onPointerMove}
                              onPointerUp={stopDrag}
                              onPointerCancel={stopDrag}
                            />
                          ))}

                          {/* Edge handles */}
                          {[
                            { pos: 'n', style: { top: -8, left: '50%', transform: 'translateX(-50%)', cursor: 'n-resize', width: 34, height: 16 } },
                            { pos: 's', style: { bottom: -8, left: '50%', transform: 'translateX(-50%)', cursor: 's-resize', width: 34, height: 16 } },
                            { pos: 'e', style: { right: -8, top: '50%', transform: 'translateY(-50%)', cursor: 'e-resize', width: 16, height: 34 } },
                            { pos: 'w', style: { left: -8, top: '50%', transform: 'translateY(-50%)', cursor: 'w-resize', width: 16, height: 34 } },
                          ].map(({ pos, style }) => (
                            <div key={pos}
                              style={{
                                position: 'absolute',
                                background: 'rgba(255,255,255,0.85)',
                                borderRadius: 8,
                                border: '1px solid var(--primary)',
                                touchAction: 'none',
                                ...style,
                              }}
                              onPointerDown={(e) => startDrag(e, pos)}
                              onPointerMove={onPointerMove}
                              onPointerUp={stopDrag}
                              onPointerCancel={stopDrag}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <aside style={{
                flex: '0 0 320px',
                width: 320,
                maxWidth: '100%',
                borderLeft: '1px solid var(--hairline-soft)',
                paddingLeft: 16,
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: 10 }}>
                      Crop Settings
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--ink)' }}>
                        <input type="radio" name="applyMode" checked={applyMode === 'all'} onChange={() => setApplyMode('all')} />
                        Apply to <strong>All pages</strong>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--ink)' }}>
                        <input type="radio" name="applyMode" checked={applyMode === 'current'} onChange={() => setApplyMode('current')} />
                        Apply to <strong>Current page</strong>
                      </label>
                    </div>
                  </div>

                  <div className="divider" style={{ margin: '8px 0' }} />

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <button onClick={resetSelection} className="btn-secondary">
                      Reset selection
                    </button>
                    <button onClick={processCrop} disabled={processing} className="btn-primary">
                      {processing ? <Loader2 size={16} style={{ animation: 'spin 0.6s linear infinite' }} /> : <Crop size={16} />}
                      {processing ? 'Processing...' : 'Crop PDF'}
                    </button>
                    <button onClick={reset} className="btn-secondary">
                      <RotateCcw size={16} /> Cancel
                    </button>
                    <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>
                      Tip: zoom your browser if you need more precise control. On mobile, drag slowly for best accuracy.
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
