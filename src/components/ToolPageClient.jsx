'use client';

import { useState } from 'react';
import * as Icons from 'lucide-react';
import { getToolBySlug, TOOLS } from '@/lib/tools-registry';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { TOOL_SEO_CONTENT } from '@/data/tool-seo-content';

const COMPONENT_MAP = {
  // dynamic import keeps browser-only libs from breaking prerender/build
  FormatConverter: dynamic(() => import('@/components/tools/FormatConverter'), { ssr: false }),
  CompressTool: dynamic(() => import('@/components/tools/CompressTool'), { ssr: false }),
  ResizeTool: dynamic(() => import('@/components/tools/ResizeTool'), { ssr: false }),
  TransformTool: dynamic(() => import('@/components/tools/TransformTool'), { ssr: false }),
  PhotoEditorTool: dynamic(() => import('@/components/tools/PhotoEditorTool'), { ssr: false }),
  CollageTool: dynamic(() => import('@/components/tools/CollageTool'), { ssr: false }),
  MergeTool: dynamic(() => import('@/components/tools/MergeTool'), { ssr: false }),
  MetadataRemover: dynamic(() => import('@/components/tools/MetadataRemover'), { ssr: false }),
  ImageToPdf: dynamic(() => import('@/components/tools/ImageToPdf'), { ssr: false }),
  HeicConverter: dynamic(() => import('@/components/tools/HeicConverter'), { ssr: false }),
  BulkCompressTool: dynamic(() => import('@/components/tools/BulkCompressTool'), { ssr: false }),
  BatchResizeTool: dynamic(() => import('@/components/tools/BatchResizeTool'), { ssr: false }),
  CropPdfTool: dynamic(() => import('@/components/tools/CropPdfTool'), { ssr: false }),
  MergePdfTool: dynamic(() => import('@/components/tools/MergePdfTool'), { ssr: false }),
  SplitPdfTool: dynamic(() => import('@/components/tools/SplitPdfTool'), { ssr: false }),
  CompressPdfTool: dynamic(() => import('@/components/tools/CompressPdfTool'), { ssr: false }),
  RotatePdfTool: dynamic(() => import('@/components/tools/RotatePdfTool'), { ssr: false }),
  WatermarkPdfTool: dynamic(() => import('@/components/tools/WatermarkPdfTool'), { ssr: false }),
  SignPdfTool: dynamic(() => import('@/components/tools/SignPdfTool'), { ssr: false }),
  RemoveBackgroundTool: dynamic(() => import('@/components/tools/RemoveBackgroundTool'), { ssr: false }),
  UpscaleTool: dynamic(() => import('@/components/tools/UpscaleTool'), { ssr: false }),
  BulkFormatConvertTool: dynamic(() => import('@/components/tools/BulkFormatConvertTool'), { ssr: false }),
  PassportPhotoTool: dynamic(() => import('@/components/tools/PassportPhotoTool'), { ssr: false }),
  ThumbnailCreatorTool: dynamic(() => import('@/components/tools/ThumbnailCreatorTool'), { ssr: false }),
};

const NEXT_STEP_MAP = {
  'merge-pdf': {
    text: 'Need to shrink your combined PDF file size for email attachment limits?',
    toolSlug: 'compress-pdf',
    actionText: 'Compress PDF',
  },
  'split-pdf': {
    text: 'Need to combine some of your split PDF pages back together?',
    toolSlug: 'merge-pdf',
    actionText: 'Merge PDF',
  },
  'compress-pdf': {
    text: 'Need to sign your compressed PDF document?',
    toolSlug: 'sign-pdf',
    actionText: 'Sign PDF',
  },
  'rotate-pdf': {
    text: 'Need to combine your rotated pages with other documents?',
    toolSlug: 'merge-pdf',
    actionText: 'Merge PDF',
  },
  'crop-pdf': {
    text: 'Need to shrink your cropped PDF file size?',
    toolSlug: 'compress-pdf',
    actionText: 'Compress PDF',
  },
  'watermark-pdf': {
    text: 'Need to compress your watermarked PDF for email?',
    toolSlug: 'compress-pdf',
    actionText: 'Compress PDF',
  },
  'sign-pdf': {
    text: 'Need to compress your signed PDF to fit upload limits?',
    toolSlug: 'compress-pdf',
    actionText: 'Compress PDF',
  },
  'jpg-to-png': {
    text: 'Need to remove the background of your new PNG image?',
    toolSlug: 'remove-background',
    actionText: 'Remove Background',
  },
  'png-to-jpg': {
    text: 'Need to compress your new JPG photo under 50KB?',
    toolSlug: 'compress-image',
    actionText: 'Compress Image',
  },
  'webp-converter': {
    text: 'Want to compress your WebP images even further?',
    toolSlug: 'compress-image',
    actionText: 'Compress Image',
  },
  'webp-to-png': {
    text: 'Need to edit or add text to your PNG image?',
    toolSlug: 'photo-editor',
    actionText: 'Photo Editor',
  },
  'webp-to-jpg': {
    text: 'Need to shrink the file size of your new JPG photo?',
    toolSlug: 'compress-image',
    actionText: 'Compress Image',
  },
  'svg-to-png': {
    text: 'Need to make the background of your PNG cutout transparent?',
    toolSlug: 'remove-background',
    actionText: 'Remove Background',
  },
  'heic-converter': {
    text: 'Want to reduce the file size of your newly converted JPG photo?',
    toolSlug: 'compress-image',
    actionText: 'Compress Image',
  },
  'image-to-pdf': {
    text: 'Need to shrink your new PDF file size under 2MB?',
    toolSlug: 'compress-pdf',
    actionText: 'Compress PDF',
  },
  'convert-format': {
    text: 'Want to compress your converted images for faster loading?',
    toolSlug: 'compress-image',
    actionText: 'Compress Image',
  },
  'resize-image': {
    text: 'Need to make sure your resized photo fits strict upload size limits?',
    toolSlug: 'compress-image',
    actionText: 'Compress Image',
  },
  'photo-editor': {
    text: 'Want to compress your edited photo before sharing?',
    toolSlug: 'compress-image',
    actionText: 'Compress Image',
  },
  'rotate-image': {
    text: 'Need to resize your rotated image to fit profile picture dimensions?',
    toolSlug: 'resize-image',
    actionText: 'Resize Image',
  },
  'remove-background': {
    text: 'Need to resize your transparent cutout for a profile picture?',
    toolSlug: 'resize-image',
    actionText: 'Resize Image',
  },
  'image-upscaler': {
    text: 'Need to optimize your high-resolution upscaled image for the web?',
    toolSlug: 'compress-image',
    actionText: 'Compress Image',
  },
  'passport-photo-maker': {
    text: 'Need to shrink your passport photo under 50KB or 20KB for an online exam or job application?',
    toolSlug: 'compress-image',
    actionText: 'Compress Image',
  },
  'thumbnail-creator': {
    text: 'Need to compress your YouTube thumbnail under the 2MB limit?',
    toolSlug: 'compress-image',
    actionText: 'Compress Image',
  },
  'compress-image': {
    text: 'Need to adjust the exact pixel width and height of your compressed photo?',
    toolSlug: 'resize-image',
    actionText: 'Resize Image',
  },
  'bulk-compress': {
    text: 'Want to convert all your compressed images to WebP?',
    toolSlug: 'bulk-format-convert',
    actionText: 'Bulk Convert',
  },
  'metadata-remover': {
    text: 'Want to compress your privacy-cleaned photos before uploading?',
    toolSlug: 'compress-image',
    actionText: 'Compress Image',
  },
  'batch-resize': {
    text: 'Need to compress your batch-resized images to save space?',
    toolSlug: 'bulk-compress',
    actionText: 'Bulk Compress',
  },
  'collage-maker': {
    text: 'Need to compress your new collage photo for social media?',
    toolSlug: 'compress-image',
    actionText: 'Compress Image',
  },
  'bulk-format-convert': {
    text: 'Want to batch-compress your newly converted images?',
    toolSlug: 'bulk-compress',
    actionText: 'Bulk Compress',
  },
  'merge-images': {
    text: 'Need to shrink the file size of your merged image?',
    toolSlug: 'compress-image',
    actionText: 'Compress Image',
  },
};

function parseBoldText(text) {
  if (typeof text !== 'string') return text;
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-extrabold text-[var(--ink)]">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

function renderBlockContent(content) {
  if (!content) return null;
  
  const lines = content.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  const elements = [];
  let currentList = [];
  let currentListType = null; // 'bullet' or 'number'

  const flushList = (key) => {
    if (currentList.length === 0) return;
    if (currentListType === 'bullet') {
      elements.push(
        <ul key={key} className="space-y-4 my-6 pl-1">
          {currentList.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3.5 text-sm md:text-base text-[var(--body)] leading-relaxed">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--success-bg)] text-[var(--success)] flex items-center justify-center mt-1">
                <Icons.Check size={12} className="stroke-[3]" />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    } else if (currentListType === 'number') {
      elements.push(
        <div key={key} className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6">
          {currentList.map((item, idx) => (
            <div key={idx} className="relative p-6 rounded-2xl bg-[var(--canvas)] border border-[var(--hairline)] shadow-sm hover:shadow-md hover:border-[var(--primary-muted)] transition-all duration-300 flex flex-col gap-3 group overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--primary)] tracking-wider uppercase">Step {item.num}</span>
                <span className="w-8 h-8 rounded-full bg-[var(--primary-light)] text-[var(--primary)] text-sm font-extrabold flex items-center justify-center shadow-xs">
                  {item.num}
                </span>
              </div>
              <span className="text-sm md:text-base text-[var(--body)] leading-relaxed mt-1">{item.text}</span>
            </div>
          ))}
        </div>
      );
    }
    currentList = [];
    currentListType = null;
  };

  lines.forEach((line, index) => {
    const key = `line-${index}`;
    
    // Check if bullet point
    if (line.startsWith('•') || line.startsWith('-') || line.startsWith('*')) {
      if (currentListType !== 'bullet') {
        flushList(key + '-pre');
        currentListType = 'bullet';
      }
      const textOnly = line.replace(/^[•\-*]\s*/, '');
      currentList.push(parseBoldText(textOnly));
    }
    // Check if numbered list (e.g. "1. ")
    else if (/^\d+\.\s/.test(line)) {
      if (currentListType !== 'number') {
        flushList(key + '-pre');
        currentListType = 'number';
      }
      const match = line.match(/^(\d+)\.\s*(.*)/);
      const num = match[1];
      const textOnly = match[2];
      currentList.push({ num, text: parseBoldText(textOnly) });
    }
    // Otherwise, normal paragraph
    else {
      flushList(key + '-pre');
      elements.push(
        <p key={key} className="text-sm md:text-base text-[var(--body)] leading-relaxed mb-5">
          {parseBoldText(line)}
        </p>
      );
    }
  });

  flushList('final');
  return elements;
}

function SeoContentSection({ slug }) {
  const content = TOOL_SEO_CONTENT[slug];
  const [openFaq, setOpenFaq] = useState(null);

  if (!content) return null;

  return (
    <section className="py-20 border-t border-[var(--hairline-soft)] bg-gradient-to-b from-[var(--surface-card)] to-[var(--surface-soft)]">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--primary-light)] text-[var(--primary)] text-xs font-bold mb-4 tracking-wider uppercase shadow-xs">
            <Icons.Sparkles size={14} className="text-[var(--primary)] animate-pulse" />
            <span>Product Guide & Help</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--ink)] tracking-tight mb-4 leading-tight">
            {content.title}
          </h2>
          <p className="text-base md:text-lg text-[var(--muted)] leading-relaxed max-w-2xl mx-auto font-normal">
            {content.subtitle}
          </p>
        </div>

        {/* Introduction */}
        <div className="max-w-none text-base md:text-lg leading-relaxed text-[var(--body)] mb-12 border-l-4 border-[var(--primary)] p-6 bg-[var(--primary-light)]/20 rounded-r-2xl shadow-xs">
          <p className="font-medium text-[var(--ink)] opacity-95">{parseBoldText(content.introduction)}</p>
        </div>

        {/* Sections */}
        <div className="grid grid-cols-1 gap-10 mb-16">
          {content.sections.map((sec, idx) => (
            <div key={idx} className="p-6 md:p-8 bg-[var(--surface-card)] rounded-2xl border border-[var(--hairline)] shadow-sm hover:shadow-md hover:border-[var(--primary-muted)] transition-all duration-300">
              <h3 className="text-lg md:text-xl font-bold text-[var(--ink)] mb-6 flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-gradient-to-b from-[var(--primary)] to-[var(--primary-muted)] rounded-full inline-block"></span>
                {sec.heading}
              </h3>
              <div className="text-sm md:text-base text-[var(--body)] leading-relaxed">
                {renderBlockContent(sec.content)}
              </div>
            </div>
          ))}
        </div>

        {/* FAQs */}
        {content.faqs && content.faqs.length > 0 && (
          <div className="mt-20 border-t border-[var(--hairline-soft)] pt-16">
            <h3 className="text-2xl md:text-3xl font-extrabold text-[var(--ink)] mb-10 text-center tracking-tight">
              Frequently Asked Questions
            </h3>
            <div className="flex flex-col gap-5 max-w-3xl mx-auto">
              {content.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="border border-[var(--hairline)] rounded-2xl overflow-hidden bg-[var(--surface-card)] hover:border-[var(--primary-muted)]/60 shadow-sm transition-all duration-200">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-6 text-left font-bold text-base md:text-lg text-[var(--ink)] hover:bg-[var(--surface)] transition-colors duration-150"
                    >
                      <span>{faq.q}</span>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-xs ${isOpen ? 'bg-[var(--primary)] text-white rotate-180' : 'bg-[var(--surface)] text-[var(--muted)] hover:bg-[var(--primary-light)] hover:text-[var(--primary)]'}`}>
                        {isOpen ? <Icons.ChevronUp size={16} /> : <Icons.ChevronDown size={16} />}
                      </div>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                        >
                          <div className="p-6 pt-0 text-sm md:text-base text-[var(--body)] leading-relaxed border-t border-[var(--hairline-soft)] bg-[var(--surface)]/30">
                            {parseBoldText(faq.a)}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}


export default function ToolPageClient({ slug }) {
  const tool = getToolBySlug(slug);

  if (!tool) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Icons.AlertCircle size={48} className="text-[var(--muted)] mb-4" />
        <h1 className="text-2xl font-bold text-[var(--ink)] mb-2">Tool Not Found</h1>
        <p className="text-[var(--muted)] mb-6">The tool you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/" title="ImageFlow Home" className="px-6 py-2.5 bg-[var(--primary)] text-white rounded-xl font-medium hover:bg-[var(--primary-hover)] transition-colors">
          Back to Home
        </Link>
      </div>
    );
  }

  const ToolComponent = COMPONENT_MAP[tool.component];
  const IconComponent = Icons[tool.icon] || Icons.FileImage;
  const relatedTools = TOOLS.filter(t => t.category === tool.category && t.slug !== tool.slug).slice(0, 4);
  const nextStep = NEXT_STEP_MAP[slug];

  return (
    <div className="animate-fade-in">
      {/* Tool Header */}
      <section className="pt-8 pb-6 border-b border-[var(--hairline-soft)]">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-xs text-[var(--muted)] mb-4">
            <Link href="/" title="ImageFlow Home" className="hover:text-[var(--primary)] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/#all-tools" title="All ImageFlow Tools" className="hover:text-[var(--primary)] transition-colors">Tools</Link>
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
        <div className={`container mx-auto px-4 ${slug === 'thumbnail-creator' ? 'max-w-6xl' : 'max-w-4xl'}`}>
          {ToolComponent ? (
            <ToolComponent tool={tool} config={tool.config} />
          ) : (
            <div className="text-center py-16">
              <p className="text-[var(--muted)]">Tool component not found.</p>
            </div>
          )}
        </div>
      </section>

      {/* Recommended Next Step Callout */}
      {nextStep && (
        <section className="py-6 bg-[var(--surface-soft)] border-t border-b border-[var(--hairline-soft)]">
          <div className="container max-w-4xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-[var(--surface-card)] rounded-xl border border-[var(--hairline-soft)] shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center flex-shrink-0">
                  <Icons.ArrowRight size={18} />
                </div>
                <p className="text-sm text-[var(--ink)] font-medium text-center md:text-left leading-relaxed">
                  {nextStep.text}
                </p>
              </div>
              <Link
                href={`/tools/${nextStep.toolSlug}/`}
                title={`${nextStep.actionText} — Free Online Tool`}
                className="px-5 py-2 bg-[var(--primary)] text-white text-xs font-bold rounded-lg hover:bg-[var(--primary-hover)] transition-all duration-200 shadow-sm hover:shadow-md whitespace-nowrap"
              >
                {nextStep.actionText} →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Rich SEO Content & FAQs Section */}
      <SeoContentSection slug={slug} />

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <section className="py-12 bg-[var(--surface-soft)] border-t border-[var(--hairline-soft)]">
          <div className="container mx-auto px-4">
            <h3 className="text-lg font-semibold text-[var(--ink)] mb-6">Related Tools</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedTools.map(rt => {
                const RtIcon = Icons[rt.icon] || Icons.FileImage;
                return (
                  <Link key={rt.slug} href={`/tools/${rt.slug}/`}
                    title={`${rt.name} — Free Online Tool`}
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
