'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Download, RotateCcw, Loader2, Sparkles } from 'lucide-react';
import FileUploader from '@/components/FileUploader';
import { loadImage, applyFilter, sharpenImage, canvasToBlob, createCanvas } from '@/lib/image-processor';
import { downloadBlob } from '@/lib/download';
import { generateOutputFilename } from '@/lib/utils';
import { toast } from 'sonner';

const FILTER_PRESETS = [
  { label: 'Original', css: 'none' },
  { label: 'Grayscale', css: 'grayscale(100%)' },
  { label: 'Sepia', css: 'sepia(80%)' },
  { label: 'Vintage', css: 'sepia(40%) contrast(110%) brightness(95%)' },
  { label: 'Warm', css: 'sepia(25%) saturate(130%) brightness(105%)' },
  { label: 'Cool', css: 'saturate(80%) hue-rotate(20deg) brightness(105%)' },
  { label: 'Dramatic', css: 'contrast(140%) saturate(120%) brightness(90%)' },
  { label: 'Fade', css: 'contrast(85%) brightness(110%) saturate(80%)' },
  { label: 'Vivid', css: 'saturate(160%) contrast(110%)' },
  { label: 'Noir', css: 'grayscale(100%) contrast(130%) brightness(90%)' },
  { label: 'Invert', css: 'invert(100%)' },
  { label: 'High Contrast', css: 'contrast(160%)' },
];

export default function FilterTool({ tool, config }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [imgEl, setImgEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('none');
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [blur, setBlur] = useState(0);
  const [sharpen, setSharpen] = useState(0);

  const mode = config.mode;

  const onFilesSelected = useCallback(async (selectedFiles) => {
    const f = selectedFiles[0]; setFile(f); setResult(null);
    try { const img = await loadImage(f); setImgEl(img); setPreview(URL.createObjectURL(f)); }
    catch { toast.error('Failed to load image'); }
  }, []);

  const buildFilterString = () => {
    if (mode === 'presets' && selectedFilter !== 'none') return selectedFilter;
    if (mode === 'grayscale') return 'grayscale(100%)';
    if (mode === 'blur') return `blur(${blur}px)`;
    const parts = [];
    if (brightness !== 100) parts.push(`brightness(${brightness}%)`);
    if (contrast !== 100) parts.push(`contrast(${contrast}%)`);
    if (saturation !== 100) parts.push(`saturate(${saturation}%)`);
    if (blur > 0 && mode === 'sliders') parts.push(`blur(${blur}px)`);
    return parts.length > 0 ? parts.join(' ') : 'none';
  };

  const processFilter = useCallback(async () => {
    if (!imgEl) return; setProcessing(true);
    try {
      let resultCanvas;
      if (mode === 'sharpen' || sharpen > 0) {
        ({ canvas: resultCanvas } = sharpenImage(imgEl, sharpen || 1));
      } else {
        const filterStr = buildFilterString();
        if (filterStr === 'none') {
          const { canvas, ctx } = createCanvas(imgEl.naturalWidth, imgEl.naturalHeight);
          ctx.drawImage(imgEl, 0, 0); resultCanvas = canvas;
        } else {
          ({ canvas: resultCanvas } = applyFilter(imgEl, filterStr));
        }
      }
      const blob = await canvasToBlob(resultCanvas, 'image/png', 0.95);
      setResult({ blob, url: URL.createObjectURL(blob) });
      toast.success('Filter applied!');
    } catch (err) { toast.error('Filter failed: ' + err.message); }
    finally { setProcessing(false); }
  }, [imgEl, selectedFilter, brightness, contrast, saturation, blur, sharpen, mode]);

  const handleDownload = () => {
    if (!result) return;
    downloadBlob(result.blob, generateOutputFilename(file.name, tool.slug, 'png'));
  };

  const fullReset = () => {
    if (preview) URL.revokeObjectURL(preview);
    if (result?.url) URL.revokeObjectURL(result.url);
    setFile(null); setPreview(null); setResult(null); setImgEl(null);
    setBrightness(100); setContrast(100); setSaturation(100); setBlur(0); setSharpen(0); setSelectedFilter('none');
  };

  const currentFilter = buildFilterString();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {!file ? (
        <FileUploader onFilesSelected={onFilesSelected} label={`Drop image to apply ${tool.name.toLowerCase()}`} />
      ) : (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Live Before/After */}
          <div className="preview-grid">
            <div>
              <div className="preview-label">Original</div>
              <div className="preview-box"><img src={preview} alt="Original" /></div>
            </div>
            <div>
              <div className="preview-label">{result ? 'Result' : 'Live Preview'}</div>
              <div className="preview-box">
                <img src={result?.url || preview} alt="Preview"
                  style={{ filter: !result ? currentFilter : 'none', transition: 'filter 200ms' }} />
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="card">
            {mode === 'presets' && (
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 10 }}>Choose a Filter</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: 8 }}>
                  {FILTER_PRESETS.map(f => (
                    <button key={f.label} onClick={() => setSelectedFilter(f.css)}
                      style={{
                        padding: 6, borderRadius: 'var(--radius-md)', cursor: 'pointer', textAlign: 'center',
                        border: selectedFilter === f.css ? '2px solid var(--primary)' : '2px solid var(--hairline-soft)',
                        background: 'var(--surface)', transition: 'all 200ms',
                      }}>
                      <div style={{ width: '100%', height: 48, borderRadius: 6, overflow: 'hidden', marginBottom: 4, background: 'var(--hairline-soft)' }}>
                        {preview && <img src={preview} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: f.css }} />}
                      </div>
                      <span style={{ fontSize: 10, fontWeight: 500, color: 'var(--ink)' }}>{f.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {mode === 'sliders' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { label: 'Brightness', value: brightness, set: setBrightness, min: 0, max: 200, suffix: '%' },
                  { label: 'Contrast', value: contrast, set: setContrast, min: 0, max: 200, suffix: '%' },
                  { label: 'Saturation', value: saturation, set: setSaturation, min: 0, max: 200, suffix: '%' },
                ].map(s => (
                  <div key={s.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                      <span style={{ color: 'var(--muted)' }}>{s.label}</span>
                      <span style={{ fontWeight: 600, color: 'var(--ink)' }}>{s.value}{s.suffix}</span>
                    </div>
                    <input type="range" min={s.min} max={s.max} value={s.value} onChange={(e) => s.set(Number(e.target.value))} />
                  </div>
                ))}
              </div>
            )}

            {mode === 'blur' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                  <span style={{ color: 'var(--muted)' }}>Blur</span>
                  <span style={{ fontWeight: 600, color: 'var(--ink)' }}>{blur}px</span>
                </div>
                <input type="range" min="0" max="20" step="0.5" value={blur} onChange={(e) => setBlur(Number(e.target.value))} />
              </div>
            )}

            {mode === 'sharpen' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                  <span style={{ color: 'var(--muted)' }}>Sharpen</span>
                  <span style={{ fontWeight: 600, color: 'var(--ink)' }}>{sharpen}</span>
                </div>
                <input type="range" min="0.1" max="5" step="0.1" value={sharpen} onChange={(e) => setSharpen(Number(e.target.value))} />
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={processFilter} disabled={processing} className="btn-primary">
              {processing ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
              {processing ? 'Applying...' : 'Apply Filter'}
            </button>
            {result && <button onClick={handleDownload} className="btn-success"><Download size={16} /> Download</button>}
            <button onClick={fullReset} className="btn-secondary"><RotateCcw size={16} /> Start Over</button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
