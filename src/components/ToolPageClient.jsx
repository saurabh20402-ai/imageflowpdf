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
      return <strong key={i} className="font-bold text-[var(--ink)]">{part.slice(2, -2)}</strong>;
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
        <ul key={key} className="space-y-3 my-4 pl-1">
          {currentList.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-sm md:text-base text-[var(--muted)] leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] mt-2.5 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    } else if (currentListType === 'number') {
      elements.push(
        <div key={key} className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5">
          {currentList.map((item, idx) => (
            <div key={idx} className="p-5 rounded-xl bg-[var(--surface-card)] border border-[var(--hairline-soft)] shadow-sm hover:border-[var(--primary-soft)] transition-colors duration-200 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[var(--primary-light)] text-[var(--primary)] text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {item.num}
                </span>
              </div>
              <span className="text-sm md:text-base text-[var(--muted)] leading-relaxed">{item.text}</span>
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
        <p key={key} className="text-sm md:text-base text-[var(--muted)] leading-relaxed mb-4">
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
    <section className="py-16 border-t border-[var(--hairline-soft)] bg-gradient-to-b from-[var(--surface-card)] to-[var(--surface-soft)]">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--primary-light)] text-[var(--primary)] text-xs font-semibold mb-4 tracking-wider uppercase">
            <Icons.Sparkles size={12} className="text-[var(--primary)]" />
            <span>Guide & FAQ</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--ink)] tracking-tight mb-4">
            {content.title}
          </h2>
          <p className="text-base md:text-lg text-[var(--muted)] leading-relaxed font-medium">
            {content.subtitle}
          </p>
        </div>

        {/* Introduction */}
        <div className="prose max-w-none text-[var(--muted)] text-sm md:text-base leading-relaxed mb-10 border-l-2 border-[var(--primary)] pl-4 italic bg-[var(--surface-soft)]/40 py-2 rounded-r-xl">
          <p>{parseBoldText(content.introduction)}</p>
        </div>

        {/* Sections */}
        <div className="grid grid-cols-1 gap-8 mb-12">
          {content.sections.map((sec, idx) => (
            <div key={idx} className="p-6 md:p-8 bg-[var(--surface-card)] rounded-2xl border border-[var(--hairline-soft)] shadow-sm hover:shadow-md hover:border-[var(--primary-soft)] transition-all duration-300">
              <h3 className="text-lg md:text-xl font-bold text-[var(--ink)] mb-5 flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-[var(--primary)] rounded-full inline-block"></span>
                {sec.heading}
              </h3>
              <div className="text-sm md:text-base text-[var(--muted)] leading-relaxed">
                {renderBlockContent(sec.content)}
              </div>
            </div>
          ))}
        </div>

        {/* FAQs */}
        {content.faqs && content.faqs.length > 0 && (
          <div className="mt-16 border-t border-[var(--hairline-soft)] pt-12">
            <h3 className="text-xl md:text-2xl font-extrabold text-[var(--ink)] mb-8 text-center">
              Frequently Asked Questions
            </h3>
            <div className="flex flex-col gap-4 max-w-3xl mx-auto">
              {content.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="border border-[var(--hairline-soft)] rounded-xl overflow-hidden bg-[var(--surface-card)] hover:border-[var(--primary-soft)]/40 transition-colors duration-200">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-5 text-left font-semibold text-sm md:text-base text-[var(--ink)] hover:bg-[var(--surface-soft)] transition-colors duration-150"
                    >
                      <span>{faq.q}</span>
                      <div className={`w-6 h-6 rounded-md flex items-center justify-center transition-all duration-200 ${isOpen ? 'bg-[var(--primary-light)] text-[var(--primary)]' : 'bg-[var(--surface-soft)] text-[var(--muted)]'}`}>
                        {isOpen ? <Icons.Minus size={14} /> : <Icons.Plus size={14} />}
                      </div>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="p-5 pt-0 text-xs md:text-sm text-[var(--muted)] leading-relaxed border-t border-[var(--hairline-soft)] bg-[var(--surface-soft)]/30">
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
        <Link href="/" className="px-6 py-2.5 bg-[var(--primary)] text-white rounded-xl font-medium hover:bg-[var(--primary-hover)] transition-colors">
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
