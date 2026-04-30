'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, X, FileImage } from 'lucide-react';
import { formatBytes } from '@/lib/utils';

export default function FileUploader({
  onFilesSelected,
  multiple = false,
  maxFiles = 10,
  accept = { 'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp', '.tiff', '.svg', '.heic', '.heif'] },
  label = 'Drop your image here',
  sublabel = 'or click to browse',
}) {
  const { getRootProps, getInputProps, isDragActive, acceptedFiles, fileRejections } = useDropzone({
    onDrop: (files) => files.length > 0 && onFilesSelected(files),
    accept,
    multiple,
    maxFiles,
    maxSize: 100 * 1024 * 1024,
  });

  return (
    <div>
      <div {...getRootProps()} style={{
        border: `2px dashed ${isDragActive ? 'var(--primary)' : 'var(--hairline)'}`,
        borderRadius: 'var(--radius-lg)',
        padding: '48px 24px',
        textAlign: 'center',
        cursor: 'pointer',
        background: isDragActive ? 'var(--primary-light)' : 'var(--surface)',
        transition: 'all 200ms',
      }}>
        <input {...getInputProps()} />
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
        <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>
          {isDragActive ? 'Drop it here!' : label}
        </p>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 8 }}>{sublabel}</p>
        <p style={{ fontSize: 11, color: 'var(--muted-soft)' }}>Max 100 MB per file</p>
      </div>

      {fileRejections.length > 0 && (
        <p style={{ color: 'var(--error)', fontSize: 13, marginTop: 8 }}>
          Some files were rejected. Please check the format or size.
        </p>
      )}
    </div>
  );
}
