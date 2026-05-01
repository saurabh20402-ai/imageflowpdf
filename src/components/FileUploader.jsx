'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud } from 'lucide-react';
import { formatBytes } from '@/lib/utils';

export default function FileUploader({
  onFilesSelected,
  multiple = false,
  maxFiles = 10,
  accept = { 'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp', '.tiff', '.svg', '.heic', '.heif'] },
  label = 'Drop your image here',
  sublabel = 'or click to browse',
}) {
  const [rejectedMsg, setRejectedMsg] = useState('');

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop: (files, rejections) => {
      setRejectedMsg('');
      if (rejections.length > 0) {
        setRejectedMsg(`${rejections.length} file(s) rejected — check format or size (max 100MB).`);
      }
      if (files.length > 0) onFilesSelected(files);
    },
    accept,
    multiple,
    maxFiles,
    maxSize: 100 * 1024 * 1024,
    // CRITICAL: noClick=false ensures mobile gallery opens on tap
    noClick: false,
    noKeyboard: false,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        id="file-uploader-dropzone"
        role="button"
        aria-label="Upload image — click or drag and drop"
        style={{
          border: `2px dashed ${isDragActive ? 'var(--primary)' : 'var(--hairline)'}`,
          borderRadius: 'var(--radius-lg)',
          padding: 'clamp(32px, 5vw, 56px) 24px',
          textAlign: 'center',
          cursor: 'pointer',
          background: isDragActive ? 'var(--primary-light)' : 'var(--surface)',
          transition: 'all 200ms',
          WebkitTapHighlightColor: 'transparent',
          // Ensure mobile tap works
          userSelect: 'none',
          touchAction: 'manipulation',
        }}>
        {/* IMPORTANT: The <input> must be rendered for mobile to work */}
        <input {...getInputProps()} id="file-uploader-input" capture={false} />

        <div style={{
          width: 56, height: 56, borderRadius: 'var(--radius-md)',
          background: isDragActive ? 'var(--primary)' : 'var(--surface-elevated)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 16px',
          color: isDragActive ? '#fff' : 'var(--primary)',
          transition: 'all 200ms',
        }}>
          <UploadCloud size={26} />
        </div>

        <p style={{ fontSize: 'clamp(14px, 2.5vw, 16px)', fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>
          {isDragActive ? 'Drop it here!' : label}
        </p>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 8 }}>{sublabel}</p>
        <p style={{ fontSize: 11, color: 'var(--muted-soft)' }}>Max 100 MB · JPG, PNG, WebP, SVG, HEIC and more</p>

        {/* Mobile gallery hint */}
        <p style={{ fontSize: 11, color: 'var(--primary)', marginTop: 8, fontWeight: 500 }}>
          📱 Tap to open your gallery or camera
        </p>
      </div>

      {(rejectedMsg || fileRejections.length > 0) && (
        <p style={{ color: 'var(--error)', fontSize: 13, marginTop: 8 }}>
          ⚠️ {rejectedMsg || 'Some files were rejected. Please check format (max 100MB).'}
        </p>
      )}
    </div>
  );
}
