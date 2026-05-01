'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, RotateCcw, Loader2, Smile, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import FileUploader from '@/components/FileUploader';
import { loadImage, canvasToBlob, drawImageToCanvas } from '@/lib/image-processor';
import { downloadBlob } from '@/lib/download';
import { generateOutputFilename } from '@/lib/utils';
import { toast } from 'sonner';

// 9-position meme text placement
const POSITIONS = [
  { label: '↖ Top Left',     value: 'top-left' },
  { label: '↑ Top Center',   value: 'top-center' },
  { label: '↗ Top Right',    value: 'top-right' },
  { label: '← Mid Left',     value: 'middle-left' },
  { label: '· Mid Center',   value: 'middle-center' },
  { label: '→ Mid Right',    value: 'middle-right' },
  { label: '↙ Bot Left',     value: 'bottom-left' },
  { label: '↓ Bot Center',   value: 'bottom-center' },
  { label: '↘ Bot Right',    value: 'bottom-right' },
];

const DEFAULT_TEXT = {
  text: '',
  position: 'top-center',
  color: '#ffffff',
  strokeColor: '#000000',
  fontSize: null,
  bold: true,
  italic: false,
};

export default function MemeTool({ tool }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);
  const [resultBlob, setResultBlob] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [imgEl, setImgEl] = useState(null);
  const [liveCanvas, setLiveCanvas] = useState(null);

  // Support multiple text layers
  const [textLayers, setTextLayers] = useState([
    { ...DEFAULT_TEXT, text: '', position: 'top-center' },
    { ...DEFAULT_TEXT, text: '', position: 'bottom-center' },
  ]);

  const onFilesSelected = useCallback(async (f0) => {
    const f = f0[0];
    setFile(f);
    setResultUrl(null);
    setResultBlob(null);
    setLiveCanvas(null);
    try {
      const img = await loadImage(f);
      setImgEl(img);
      setPreview(URL.createObjectURL(f));
    } catch {
      toast.error('Failed to load image');
    }
  }, []);

  // Draw live preview to canvas
  const drawLivePreview = useCallback(async (img, layers) => {
    if (!img) return null;
    const { canvas, ctx } = drawImageToCanvas(img);
    const w = canvas.width, h = canvas.height;

    layers.forEach(({ text, position = 'top-center', color = '#ffffff', strokeColor = '#000000', fontSize, bold, italic }) => {
      if (!text.trim()) return;
      const sz = fontSize || Math.max(24, Math.floor(w / 12));
      ctx.font = `${italic ? 'italic ' : ''}${bold ? 'bold ' : ''}${sz}px Impact, 'Arial Black', sans-serif`;
      ctx.lineWidth = Math.max(2, sz / 10);
      ctx.lineJoin = 'round';
      ctx.strokeStyle = strokeColor;
      ctx.fillStyle = color;
      ctx.textBaseline = 'middle';

      const pad = sz * 0.6;
      const [vert, horiz] = position.split('-');
      let x = w / 2, y = h / 2;

      if (vert === 'top') y = pad;
      else if (vert === 'bottom') y = h - pad;

      if (horiz === 'left') { x = pad; ctx.textAlign = 'left'; }
      else if (horiz === 'right') { x = w - pad; ctx.textAlign = 'right'; }
      else { x = w / 2; ctx.textAlign = 'center'; }

      const lines = text.toUpperCase().split('\n');
      const lineH = sz * 1.2;
      lines.forEach((line, i) => {
        const ly = vert === 'top'
          ? y + i * lineH
          : vert === 'bottom'
            ? y - (lines.length - 1 - i) * lineH
            : y + (i - (lines.length - 1) / 2) * lineH;
        ctx.strokeText(line, x, ly);
        ctx.fillText(line, x, ly);
      });
    });

    return canvas;
  }, []);

  // Regenerate live canvas whenever text changes
  const updateLivePreview = useCallback(async (layers) => {
    if (!imgEl) return;
    const canvas = await drawLivePreview(imgEl, layers);
    if (canvas) {
      setLiveCanvas(canvas.toDataURL('image/png'));
    }
  }, [imgEl, drawLivePreview]);

  const updateLayer = useCallback((idx, field, value) => {
    setTextLayers(prev => {
      const updated = prev.map((l, i) => i === idx ? { ...l, [field]: value } : l);
      updateLivePreview(updated);
      return updated;
    });
    setResultUrl(null);
  }, [updateLivePreview]);

  const addLayer = () => {
    setTextLayers(prev => [...prev, { ...DEFAULT_TEXT, position: 'middle-center' }]);
  };

  const removeLayer = (idx) => {
    setTextLayers(prev => {
      const updated = prev.filter((_, i) => i !== idx);
      updateLivePreview(updated);
      return updated;
    });
  };

  const process = useCallback(async () => {
    if (!imgEl) return;
    setProcessing(true);
    try {
      const canvas = await drawLivePreview(imgEl, textLayers);
      const blob = await canvasToBlob(canvas, 'image/png', 0.95);
      setResultBlob(blob);
      setResultUrl(URL.createObjectURL(blob));
      toast.success('Meme created! 🎉');
    } catch (err) {
      toast.error('Failed: ' + err.message);
    } finally {
      setProcessing(false);
    }
  }, [imgEl, textLayers, drawLivePreview]);

  const handleDownload = () => {
    if (!resultBlob) return;
    downloadBlob(resultBlob, generateOutputFilename(file?.name || 'meme', 'meme', 'png'));
  };

  const reset = () => {
    setFile(null); setPreview(null); setResultUrl(null); setResultBlob(null);
    setImgEl(null); setLiveCanvas(null);
    setTextLayers([
      { ...DEFAULT_TEXT, position: 'top-center' },
      { ...DEFAULT_TEXT, position: 'bottom-center' },
    ]);
  };

  const displaySrc = resultUrl || liveCanvas || preview;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {!file ? (
        <FileUploader onFilesSelected={onFilesSelected} label="Drop an image to create a meme" />
      ) : (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Live Preview */}
          <div style={{ textAlign: 'center' }}>
            <div className="preview-label" style={{ marginBottom: 8 }}>
              {resultUrl ? '✅ Final Result' : liveCanvas ? '👀 Live Preview' : 'Original Image'}
            </div>
            <div className="preview-box" style={{ maxWidth: 560, margin: '0 auto' }}>
              {displaySrc && (
                <img src={displaySrc} alt="Meme preview" style={{ maxHeight: 400, maxWidth: '100%' }} />
              )}
            </div>
          </div>

          {/* Text Layers */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>Text Layers</span>
              <button onClick={addLayer} className="btn-secondary"
                style={{ padding: '6px 14px', fontSize: 12 }}>
                + Add Text
              </button>
            </div>

            {textLayers.map((layer, idx) => (
              <div key={idx} style={{
                padding: 16, borderRadius: 12,
                background: 'var(--surface)',
                border: '1px solid var(--hairline)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted)' }}>Text #{idx + 1}</span>
                  {textLayers.length > 1 && (
                    <button onClick={() => removeLayer(idx)}
                      style={{ fontSize: 11, color: 'var(--error)', background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
                      × Remove
                    </button>
                  )}
                </div>

                {/* Text input */}
                <textarea
                  value={layer.text}
                  onChange={e => updateLayer(idx, 'text', e.target.value)}
                  className="input"
                  placeholder="Enter meme text (Shift+Enter for new line)"
                  rows={2}
                  style={{ textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.04em', marginBottom: 12, resize: 'vertical' }}
                />

                {/* Position grid */}
                <div style={{ marginBottom: 12 }}>
                  <label style={{ display: 'block', fontSize: 12, color: 'var(--muted)', marginBottom: 8 }}>
                    Position
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
                    {POSITIONS.map(pos => (
                      <button
                        key={pos.value}
                        onClick={() => updateLayer(idx, 'position', pos.value)}
                        className={`pill ${layer.position === pos.value ? 'pill-active' : ''}`}
                        style={{ fontSize: 11, padding: '6px 4px', textAlign: 'center' }}>
                        {pos.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Style row */}
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <label style={{ fontSize: 12, color: 'var(--muted)' }}>Text</label>
                    <input type="color" value={layer.color}
                      onChange={e => updateLayer(idx, 'color', e.target.value)}
                      style={{ width: 32, height: 32 }} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <label style={{ fontSize: 12, color: 'var(--muted)' }}>Outline</label>
                    <input type="color" value={layer.strokeColor}
                      onChange={e => updateLayer(idx, 'strokeColor', e.target.value)}
                      style={{ width: 32, height: 32 }} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <label style={{ fontSize: 12, color: 'var(--muted)' }}>Size</label>
                    <input type="number" min={12} max={300}
                      placeholder="Auto"
                      value={layer.fontSize || ''}
                      onChange={e => updateLayer(idx, 'fontSize', e.target.value ? Number(e.target.value) : null)}
                      className="input"
                      style={{ width: 72 }} />
                  </div>
                  <button
                    onClick={() => updateLayer(idx, 'bold', !layer.bold)}
                    className={`pill ${layer.bold ? 'pill-active' : ''}`}
                    style={{ fontSize: 13, fontWeight: 700 }}>B</button>
                  <button
                    onClick={() => updateLayer(idx, 'italic', !layer.italic)}
                    className={`pill ${layer.italic ? 'pill-active' : ''}`}
                    style={{ fontSize: 13, fontStyle: 'italic' }}>I</button>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button
              onClick={process}
              disabled={processing || textLayers.every(l => !l.text.trim())}
              className="btn-primary">
              {processing ? <Loader2 size={16} style={{ animation: 'spin 0.6s linear infinite' }} /> : <Smile size={16} />}
              {processing ? 'Generating...' : 'Generate Meme'}
            </button>
            {resultUrl && (
              <button onClick={handleDownload} className="btn-success">
                <Download size={16} /> Download PNG
              </button>
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
