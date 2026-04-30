'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, RotateCcw, Loader2, Type } from 'lucide-react';
import FileUploader from '@/components/FileUploader';
import { loadImage, createCanvas, canvasToBlob } from '@/lib/image-processor';
import { downloadBlob } from '@/lib/download';
import { generateOutputFilename } from '@/lib/utils';
import { toast } from 'sonner';

// 35 trending Google Fonts
const GOOGLE_FONTS = [
  'Inter', 'Roboto', 'Open Sans', 'Poppins', 'Montserrat', 'Lato', 'Raleway', 'Nunito',
  'Playfair Display', 'Merriweather', 'Ubuntu', 'Oswald', 'Source Sans 3', 'Mukta', 'Rubik',
  'Work Sans', 'Quicksand', 'Fira Sans', 'Noto Sans', 'DM Sans', 'Outfit', 'Space Grotesk',
  'Plus Jakarta Sans', 'Sora', 'Figtree', 'Lexend', 'Be Vietnam Pro', 'Manrope',
  'Pacifico', 'Lobster', 'Dancing Script', 'Righteous', 'Fredoka', 'Comfortaa',
  'Permanent Marker',
];

// System-safe fallbacks for canvas rendering
const FONT_STACK = {
  'Inter': 'Inter, system-ui, sans-serif',
  'Roboto': 'Roboto, Arial, sans-serif',
  'Open Sans': '"Open Sans", Arial, sans-serif',
  'Poppins': 'Poppins, system-ui, sans-serif',
  'Montserrat': 'Montserrat, Arial, sans-serif',
  'Lato': 'Lato, Arial, sans-serif',
  'Raleway': 'Raleway, Arial, sans-serif',
  'Nunito': 'Nunito, Arial, rounded, sans-serif',
  'Playfair Display': '"Playfair Display", Georgia, serif',
  'Merriweather': 'Merriweather, Georgia, serif',
  'Ubuntu': 'Ubuntu, Arial, sans-serif',
  'Oswald': 'Oswald, Arial Narrow, sans-serif',
  'Source Sans 3': '"Source Sans 3", Arial, sans-serif',
  'Mukta': 'Mukta, Arial, sans-serif',
  'Rubik': 'Rubik, Arial, sans-serif',
  'Work Sans': '"Work Sans", Arial, sans-serif',
  'Quicksand': 'Quicksand, Arial Rounded MT Bold, sans-serif',
  'Fira Sans': '"Fira Sans", Arial, sans-serif',
  'Noto Sans': '"Noto Sans", Arial, sans-serif',
  'DM Sans': '"DM Sans", system-ui, sans-serif',
  'Outfit': 'Outfit, system-ui, sans-serif',
  'Space Grotesk': '"Space Grotesk", monospace',
  'Plus Jakarta Sans': '"Plus Jakarta Sans", Arial, sans-serif',
  'Sora': 'Sora, system-ui, sans-serif',
  'Figtree': 'Figtree, system-ui, sans-serif',
  'Lexend': 'Lexend, system-ui, sans-serif',
  'Be Vietnam Pro': '"Be Vietnam Pro", Arial, sans-serif',
  'Manrope': 'Manrope, system-ui, sans-serif',
  'Pacifico': 'Pacifico, cursive',
  'Lobster': 'Lobster, cursive',
  'Dancing Script': '"Dancing Script", cursive',
  'Righteous': 'Righteous, cursive',
  'Fredoka': 'Fredoka, rounded, sans-serif',
  'Comfortaa': 'Comfortaa, rounded, sans-serif',
  'Permanent Marker': '"Permanent Marker", cursive',
};

function loadGoogleFont(family) {
  if (typeof document === 'undefined') return Promise.resolve();
  const encoded = encodeURIComponent(family);
  const href = `https://fonts.googleapis.com/css2?family=${encoded}&display=swap`;
  if (document.querySelector(`link[href="${href}"]`)) return Promise.resolve();
  return new Promise((resolve) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.onload = resolve;
    link.onerror = resolve; // don't block on error
    document.head.appendChild(link);
  });
}

export default function TextTool({ tool }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [imgEl, setImgEl] = useState(null);
  const [text, setText] = useState('Your Text Here');
  const [fontSize, setFontSize] = useState(48);
  const [fontFamily, setFontFamily] = useState('Poppins');
  const [color, setColor] = useState('#ffffff');
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [shadow, setShadow] = useState(true);
  const [strokeWidth, setStrokeWidth] = useState(0);
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [posX, setPosX] = useState(50);
  const [posY, setPosY] = useState(50);
  const [align, setAlign] = useState('center');
  const [fontSearchQuery, setFontSearchQuery] = useState('');

  // Load all Google Fonts upfront so font picker previews look correct
  useEffect(() => {
    GOOGLE_FONTS.forEach(f => loadGoogleFont(f));
  }, []);

  const onFilesSelected = useCallback(async (f0) => {
    const f = f0[0];
    setFile(f);
    setResult(null);
    try {
      const img = await loadImage(f);
      setImgEl(img);
      if (preview) URL.revokeObjectURL(preview);
      setPreview(URL.createObjectURL(f));
    } catch {
      toast.error('Failed to load image');
    }
  }, [preview]);

  const process = useCallback(async () => {
    if (!imgEl || !text.trim()) return;
    setProcessing(true);
    try {
      await loadGoogleFont(fontFamily);
      // Give browser time to register the font
      await new Promise(r => setTimeout(r, 300));

      const w = imgEl.naturalWidth, h = imgEl.naturalHeight;
      const { canvas, ctx } = createCanvas(w, h);
      ctx.drawImage(imgEl, 0, 0);

      const weight = bold ? 'bold' : 'normal';
      const style = italic ? 'italic' : 'normal';
      const stack = FONT_STACK[fontFamily] || `"${fontFamily}", sans-serif`;
      ctx.font = `${style} ${weight} ${fontSize}px ${stack}`;
      ctx.textAlign = align;
      ctx.textBaseline = 'middle';

      const x = (posX / 100) * w;
      const y = (posY / 100) * h;

      if (shadow) {
        ctx.shadowColor = 'rgba(0,0,0,0.7)';
        ctx.shadowBlur = Math.round(fontSize * 0.15);
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
      }

      if (strokeWidth > 0) {
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = strokeWidth;
        ctx.lineJoin = 'round';
        ctx.strokeText(text, x, y);
      }

      ctx.fillStyle = color;
      ctx.fillText(text, x, y);

      const blob = await canvasToBlob(canvas, 'image/png', 0.95);
      if (result?.url) URL.revokeObjectURL(result.url);
      setResult({ blob, url: URL.createObjectURL(blob) });
      toast.success('Text added!');
    } catch (err) {
      toast.error('Failed: ' + err.message);
    } finally {
      setProcessing(false);
    }
  }, [imgEl, text, fontSize, fontFamily, color, bold, italic, shadow, strokeWidth, strokeColor, posX, posY, align, result]);

  const handleDownload = () => downloadBlob(result.blob, generateOutputFilename(file.name, 'text', 'png'));
  const reset = () => {
    if (preview) URL.revokeObjectURL(preview);
    if (result?.url) URL.revokeObjectURL(result.url);
    setFile(null); setPreview(null); setResult(null); setImgEl(null);
  };

  const filteredFonts = fontSearchQuery
    ? GOOGLE_FONTS.filter(f => f.toLowerCase().includes(fontSearchQuery.toLowerCase()))
    : GOOGLE_FONTS;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {!file ? (
        <FileUploader onFilesSelected={onFilesSelected} label="Drop image to add text" />
      ) : (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Preview */}
          <div className="preview-grid">
            <div>
              <div className="preview-label">Original</div>
              <div className="preview-box"><img src={preview} alt="Original" /></div>
            </div>
            <div>
              <div className="preview-label">{result ? 'Result' : 'Preview'}</div>
              <div className="preview-box"><img src={result?.url || preview} alt="Result" /></div>
            </div>
          </div>

          {/* Controls */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Text input */}
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>Text</label>
              <input type="text" value={text} onChange={(e) => setText(e.target.value)}
                className="input" placeholder="Your text here..." />
            </div>

            {/* Font picker */}
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 8 }}>
                Font ({filteredFonts.length} available)
              </label>
              <input
                type="text"
                placeholder="Search fonts..."
                value={fontSearchQuery}
                onChange={(e) => setFontSearchQuery(e.target.value)}
                className="input"
                style={{ marginBottom: 8, fontSize: 13 }}
              />
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                gap: 6, maxHeight: 200, overflowY: 'auto', paddingRight: 4,
              }}>
                {filteredFonts.map(f => (
                  <button
                    key={f}
                    onClick={() => { setFontFamily(f); loadGoogleFont(f); }}
                    style={{
                      padding: '8px 10px',
                      borderRadius: 8,
                      border: `1.5px solid ${fontFamily === f ? 'var(--primary)' : 'var(--hairline)'}`,
                      background: fontFamily === f ? 'var(--primary-light)' : 'var(--surface)',
                      cursor: 'pointer',
                      fontSize: 13,
                      fontFamily: FONT_STACK[f] || f,
                      color: fontFamily === f ? 'var(--primary)' : 'var(--ink)',
                      textAlign: 'left',
                      transition: 'all 150ms',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Size + Color */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>
                  <span>Font Size</span>
                  <span style={{ fontWeight: 700, color: 'var(--ink)' }}>{fontSize}px</span>
                </div>
                <input type="range" min="12" max="300" value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <label style={{ fontSize: 12, color: 'var(--muted)', flex: 1 }}>Fill Color</label>
                  <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <label style={{ fontSize: 12, color: 'var(--muted)', flex: 1 }}>Stroke Color</label>
                  <input type="color" value={strokeColor} onChange={(e) => setStrokeColor(e.target.value)} />
                </div>
              </div>
            </div>

            {/* Stroke width */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>
                <span>Stroke Width</span>
                <span style={{ fontWeight: 700, color: 'var(--ink)' }}>{strokeWidth}px</span>
              </div>
              <input type="range" min="0" max="20" value={strokeWidth}
                onChange={(e) => setStrokeWidth(Number(e.target.value))} />
            </div>

            {/* Style toggles */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: 'var(--muted)', marginRight: 4 }}>Style:</span>
              <button onClick={() => setBold(!bold)} className={`pill ${bold ? 'pill-active' : ''}`} style={{ fontWeight: 700 }}>B</button>
              <button onClick={() => setItalic(!italic)} className={`pill ${italic ? 'pill-active' : ''}`} style={{ fontStyle: 'italic' }}>I</button>
              <button onClick={() => setShadow(!shadow)} className={`pill ${shadow ? 'pill-active' : ''}`} style={{ fontSize: 12 }}>Shadow</button>
              <span style={{ fontSize: 12, color: 'var(--muted)', marginLeft: 8 }}>Align:</span>
              {['left', 'center', 'right'].map(a => (
                <button key={a} onClick={() => setAlign(a)} className={`pill ${align === a ? 'pill-active' : ''}`} style={{ fontSize: 11, textTransform: 'capitalize' }}>{a}</button>
              ))}
            </div>

            {/* Position */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>
                  <span>X Position</span>
                  <span style={{ fontWeight: 600, color: 'var(--ink)' }}>{posX}%</span>
                </div>
                <input type="range" min="0" max="100" value={posX} onChange={(e) => setPosX(Number(e.target.value))} />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>
                  <span>Y Position</span>
                  <span style={{ fontWeight: 600, color: 'var(--ink)' }}>{posY}%</span>
                </div>
                <input type="range" min="0" max="100" value={posY} onChange={(e) => setPosY(Number(e.target.value))} />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={process} disabled={processing || !text.trim()} className="btn-primary">
              {processing ? <Loader2 size={16} style={{ animation: 'spin 0.6s linear infinite' }} /> : <Type size={16} />}
              {processing ? 'Adding...' : 'Add Text'}
            </button>
            {result && <button onClick={handleDownload} className="btn-success"><Download size={16} /> Download</button>}
            <button onClick={reset} className="btn-secondary"><RotateCcw size={16} /> Start Over</button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
