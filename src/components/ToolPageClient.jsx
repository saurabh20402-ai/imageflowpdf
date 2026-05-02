'use client';

import * as Icons from 'lucide-react';
import { getToolBySlug, TOOLS } from '@/lib/tools-registry';
import Link from 'next/link';

// Import all tool components
import FormatConverter from '@/components/tools/FormatConverter';
import CompressTool from '@/components/tools/CompressTool';
import ResizeTool from '@/components/tools/ResizeTool';
import CropPdfTool from '@/components/tools/CropPdfTool';
import TransformTool from '@/components/tools/TransformTool';
import CollageTool from '@/components/tools/CollageTool';
import MergeTool from '@/components/tools/MergeTool';
import MetadataRemover from '@/components/tools/MetadataRemover';
import ImageToPdf from '@/components/tools/ImageToPdf';
import HeicConverter from '@/components/tools/HeicConverter';
import BulkCompressTool from '@/components/tools/BulkCompressTool';
import BatchResizeTool from '@/components/tools/BatchResizeTool';

const COMPONENT_MAP = {
  FormatConverter,
  CompressTool,
  ResizeTool,
  CropPdfTool,
  TransformTool,
  CollageTool,
  MergeTool,
  MetadataRemover,
  ImageToPdf,
  HeicConverter,
  BulkCompressTool,
  BatchResizeTool,
};

export default function ToolPageClient({ slug }) {
  const tool = getToolBySlug(slug);

  if (!tool) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Icons.AlertCircle size={48} className="text-[var(--muted)] mb-4" />
        <h1 className="text-2xl font-bold text-[var(--ink)] mb-2">Tool Not Found</h1>
        <p className="text-[var(--muted)] mb-6">The tool you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/" className="px-6 py-2.5 bg-[var(--primary)] text-white rounded-xl font-medium hover:bg-[var(--primary-hover)] transition-colors">
          Back to Home
        </Link>
      </div>
    );
  }

  const ToolComponent = COMPONENT_MAP[tool.component];
  const IconComponent = Icons[tool.icon] || Icons.FileImage;
  const relatedTools = TOOLS.filter(t => t.category === tool.category && t.slug !== tool.slug).slice(0, 4);

  return (
    <div className="animate-fade-in">
      {/* Tool Header */}
      <section className="pt-8 pb-6 border-b border-[var(--hairline-soft)]">
        <div className="container">
          <div className="flex items-center gap-2 text-xs text-[var(--muted)] mb-4">
            <Link href="/" className="hover:text-[var(--primary)] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/#all-tools" className="hover:text-[var(--primary)] transition-colors">Tools</Link>
            <span>/</span>
            <span className="text-[var(--ink)] font-medium">{tool.name}</span>
          </div>
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${tool.color}15`, color: tool.color }}
            >
              <IconComponent size={24} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[var(--ink)]">{tool.name}</h1>
              <p className="text-sm text-[var(--muted)] mt-0.5">{tool.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tool Component */}
      <section className="py-8 md:py-12">
        <div className="container max-w-4xl">
          {ToolComponent ? (
            <ToolComponent tool={tool} config={tool.config} />
          ) : (
            <div className="text-center py-16">
              <p className="text-[var(--muted)]">Tool component not found.</p>
            </div>
          )}
        </div>
      </section>

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <section className="py-12 bg-[var(--surface-soft)] border-t border-[var(--hairline-soft)]">
          <div className="container">
            <h3 className="text-lg font-semibold text-[var(--ink)] mb-6">Related Tools</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedTools.map(rt => {
                const RtIcon = Icons[rt.icon] || Icons.FileImage;
                return (
                  <Link key={rt.slug} href={`/tools/${rt.slug}`}
                    className="flex items-center gap-3 p-4 bg-[var(--surface-card)] border border-[var(--hairline-soft)] rounded-xl hover:shadow-md hover:border-transparent transition-all">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${rt.color}12`, color: rt.color }}>
                      <RtIcon size={18} />
                    </div>
                    <span className="text-sm font-medium text-[var(--ink)] truncate">{rt.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
