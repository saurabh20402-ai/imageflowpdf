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

function SeoContentSection({ slug, relatedTools }) {
  const content = TOOL_SEO_CONTENT[slug];
  const tool = getToolBySlug(slug);
  const [openFaq, setOpenFaq] = useState(null);

  if (!content) return null;
  const ToolIcon = Icons[tool?.icon] || Icons.FileImage;
  const toolColor = tool?.color || '#3b82f6';

  const STEP_FALLBACK_ICONS = slug === 'merge-pdf'
    ? [Icons.UploadCloud, Icons.ListFilter, Icons.GitMerge, Icons.Download]
    : [
        Icons.UploadCloud || Icons.Upload,
        Icons.ListOrdered || Icons.Sliders,
        Icons.Zap || Icons.Play,
        Icons.Download || Icons.CheckCircle,
      ];

  const UC_STYLES = [
    { bg: 'bg-[#eff6ff] dark:bg-blue-950/40', text: 'text-[#2563eb] dark:text-blue-400', border: 'border-[#dbeafe] dark:border-blue-900/40' },
    { bg: 'bg-[#ecfdf5] dark:bg-emerald-950/40', text: 'text-[#059669] dark:text-emerald-400', border: 'border-[#a7f3d0] dark:border-emerald-900/40' },
    { bg: 'bg-[#fffbeb] dark:bg-amber-950/40', text: 'text-[#d97706] dark:text-amber-400', border: 'border-[#fde68a] dark:border-amber-900/40' },
  ];

  const MERGE_PDF_RELATED = [
    { name: 'Edit PDF', slug: 'sign-pdf', icon: 'Scissors', color: '#ea580c', bg: 'bg-[#fff7ed] dark:bg-orange-950/40', text: 'text-[#ea580c] dark:text-orange-400', border: 'border-[#fed7aa] dark:border-orange-900/40' },
    { name: 'Compress PDF', slug: 'compress-pdf', icon: 'Zap', color: '#ca8a04', bg: 'bg-[#fefce8] dark:bg-amber-950/40', text: 'text-[#ca8a04] dark:text-amber-400', border: 'border-[#fef08a] dark:border-amber-900/40' },
    { name: 'Rotate PDF', slug: 'rotate-pdf', icon: 'RotateCw', color: '#e11d48', bg: 'bg-[#fff1f2] dark:bg-rose-950/40', text: 'text-[#e11d48] dark:text-rose-400', border: 'border-[#fecdd3] dark:border-rose-900/40' },
    { name: 'Crop PDF', slug: 'crop-pdf', icon: 'Crop', color: '#0d9488', bg: 'bg-[#f0fdfa] dark:bg-teal-950/40', text: 'text-[#0d9488] dark:text-teal-400', border: 'border-[#99f6e4] dark:border-teal-900/40' },
    { name: 'Split PDF', slug: 'split-pdf', icon: 'Columns', color: '#2563eb', bg: 'bg-[#eff6ff] dark:bg-blue-950/40', text: 'text-[#2563eb] dark:text-blue-400', border: 'border-[#bfdbfe] dark:border-blue-900/40' },
  ];

  const displayRelatedTools = (slug === 'merge-pdf') ? MERGE_PDF_RELATED : (relatedTools || []);

  return (
    <section className="py-8 md:py-12">
      <div className="container max-w-5xl mx-auto px-4">
        {/* Main Unified SEO Card Container */}
        <div className="p-6 md:p-8 rounded-3xl bg-[var(--surface-card)] border border-[var(--hairline)] shadow-sm space-y-8">
          
          {/* 1. Header / Intro Block */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {slug === 'merge-pdf' ? (
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-[#edf2fe] dark:bg-indigo-950/40 relative flex items-center justify-center flex-shrink-0 border border-[#dbeafe] dark:border-indigo-900/50 shadow-xs select-none">
                {/* Back document sheet */}
                <div className="absolute w-12 h-14 bg-white/90 dark:bg-gray-800/90 rounded-lg border border-[#c7d2fe] dark:border-indigo-900/60 transform -translate-x-1.5 -translate-y-1 shadow-2xs" />
                {/* Front document sheet */}
                <div className="relative w-12 h-14 bg-white dark:bg-gray-800 rounded-lg border border-[#c7d2fe] dark:border-indigo-900/80 shadow-xs flex flex-col justify-start p-2 gap-1.5">
                  <div className="w-6 h-1 bg-blue-300 dark:bg-blue-700 rounded-full" />
                  <div className="w-4 h-1 bg-blue-200 dark:bg-blue-800 rounded-full" />
                  <div className="w-5 h-1 bg-blue-200 dark:bg-blue-800 rounded-full" />
                </div>
                {/* Floating merge badge */}
                <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-md flex items-center justify-center text-white">
                  <Icons.GitMerge size={16} strokeWidth={2.2} />
                </div>
              </div>
            ) : (
              <div
                className="w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm"
                style={{
                  background: `linear-gradient(135deg, ${toolColor}18 0%, ${toolColor}08 100%)`,
                  color: toolColor,
                  border: `1px solid ${toolColor}25`,
                }}
              >
                <ToolIcon size={44} strokeWidth={1.75} />
              </div>
            )}
            <div className="flex-1">
              <h2 className="text-xl md:text-2xl font-bold text-[var(--ink)] tracking-tight mb-1.5">
                {content.title}
              </h2>
              <p className="text-sm font-medium text-[var(--muted)] mb-3 leading-relaxed">
                {parseBoldText(content.subtitle)}
              </p>
              <p className="text-xs md:text-sm text-[var(--body)] leading-relaxed">
                {parseBoldText(content.introduction)}
              </p>
            </div>
          </div>

          {/* 2. Common Use Cases */}
          {content.useCases && (
            <div className="p-6 bg-[var(--surface)] border border-[var(--hairline)] rounded-2xl">
              <h3 className="text-sm md:text-base font-bold text-[var(--ink)] mb-4 tracking-tight">
                {content.useCases.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {content.useCases.items.map((uc, i) => {
                  const UcIcon = Icons[uc.icon] || Icons.CheckCircle;
                  const theme = UC_STYLES[i % UC_STYLES.length];
                  return (
                    <div key={i} className="flex items-start gap-3.5">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${theme.bg} ${theme.text} border ${theme.border}`}>
                        <UcIcon size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-[var(--ink)] mb-1">{uc.title}</h4>
                        <p className="text-xs text-[var(--muted)] leading-relaxed">{uc.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. How-to Steps */}
          {content.steps && (
            <div>
              <h3 className="text-sm md:text-base font-bold text-[var(--ink)] mb-4 tracking-tight">
                {content.steps.title}
              </h3>
              <div className="flex flex-col md:flex-row items-center gap-2.5 md:gap-3">
                {content.steps.items.map((step, i) => {
                  const StepIcon = STEP_FALLBACK_ICONS[i % STEP_FALLBACK_ICONS.length];
                  return (
                    <div key={i} className="flex-1 w-full flex items-center gap-2.5 md:gap-3">
                      <div className="flex-1 p-4 rounded-xl bg-[var(--surface)] border border-[var(--hairline)] flex items-center justify-between gap-3 shadow-2xs hover:border-[var(--primary-muted)] transition-colors min-h-[96px]">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="w-5 h-5 rounded bg-[var(--primary)] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                              {i + 1}
                            </span>
                            <span className="font-bold text-xs md:text-sm text-[var(--ink)]">
                              {step.title}
                            </span>
                          </div>
                          <p className="text-xs text-[var(--muted)] leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-[#eff6ff] dark:bg-blue-950/50 text-[#2563eb] dark:text-blue-400 border border-[#dbeafe] dark:border-blue-900/40 flex items-center justify-center flex-shrink-0 self-center">
                          <StepIcon size={18} />
                        </div>
                      </div>
                      {i < content.steps.items.length - 1 && (
                        <div className="hidden md:flex text-[var(--muted-soft)] flex-shrink-0">
                          <Icons.ArrowRight size={16} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Fallback for legacy sections if any */}
          {content.sections && !content.useCases && !content.steps && (
            <div className="grid grid-cols-1 gap-6">
              {content.sections.map((sec, idx) => (
                <div key={idx} className="p-6 bg-[var(--surface)] rounded-2xl border border-[var(--hairline)] shadow-2xs">
                  <h3 className="text-base font-bold text-[var(--ink)] mb-4">{sec.heading}</h3>
                  <div className="text-sm text-[var(--body)] leading-relaxed">
                    {renderBlockContent(sec.content)}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 4. Frequently Asked Questions */}
          {content.faqs && content.faqs.length > 0 && (
            <div>
              <h3 className="text-sm md:text-base font-bold text-[var(--ink)] mb-3.5 tracking-tight">
                Frequently Asked Questions
              </h3>
              <div className="space-y-2.5">
                {content.faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-[var(--hairline)] rounded-xl overflow-hidden bg-[var(--surface)] transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between p-3.5 md:p-4 text-left text-xs md:text-sm font-semibold text-[var(--ink)] hover:bg-[var(--surface-elevated)] transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-[#eff6ff] dark:bg-blue-950/50 text-[#2563eb] dark:text-blue-400 border border-[#dbeafe] dark:border-blue-900/40 text-xs font-bold flex items-center justify-center flex-shrink-0">
                            ?
                          </div>
                          <span>{faq.q}</span>
                        </div>
                        <Icons.ChevronDown
                          size={16}
                          className={`text-[var(--muted-soft)] flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: 'easeInOut' }}
                          >
                            <div className="px-4 pb-4 pt-1 pl-11 text-xs md:text-sm text-[var(--body)] leading-relaxed border-t border-[var(--hairline-soft)]">
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

          {/* 5. Related Tools (Integrated into Card) */}
          {displayRelatedTools && displayRelatedTools.length > 0 && (
            <div className="pt-1">
              <h3 className="text-sm md:text-base font-bold text-[var(--ink)] mb-3.5 tracking-tight">
                Related Tools
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {displayRelatedTools.map((rt) => {
                  const RtIcon = Icons[rt.icon] || Icons.FileImage;
                  return (
                    <Link
                      key={rt.name + rt.slug}
                      href={`/tools/${rt.slug}/`}
                      title={`${rt.name} — Free Online Tool`}
                      className="flex items-center gap-2.5 p-3 bg-[var(--surface)] border border-[var(--hairline)] rounded-xl hover:border-[var(--primary-muted)] hover:shadow-xs transition-all group"
                    >
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 ${rt.bg || ''} ${rt.text || ''} ${rt.border ? `border ${rt.border}` : ''}`}
                        style={!rt.bg ? { backgroundColor: `${rt.color}14`, color: rt.color } : {}}
                      >
                        <RtIcon size={16} />
                      </div>
                      <span className="text-xs font-semibold text-[var(--ink)] truncate">
                        {rt.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

        </div>
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
  const relatedTools = TOOLS.filter(t => t.category === tool.category && t.slug !== tool.slug).slice(0, 5);
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
        <section className="py-4 bg-[var(--surface-soft)]/50 border-t border-b border-[var(--hairline-soft)]">
          <div className="container max-w-5xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-[var(--surface-card)] rounded-2xl border border-[var(--hairline-soft)] shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center flex-shrink-0">
                  <Icons.ArrowRight size={16} />
                </div>
                <p className="text-xs md:text-sm text-[var(--ink)] font-medium text-center md:text-left leading-relaxed">
                  {nextStep.text}
                </p>
              </div>
              <Link
                href={`/tools/${nextStep.toolSlug}/`}
                title={`${nextStep.actionText} — Free Online Tool`}
                className="px-4 py-2 bg-[var(--primary)] text-white text-xs font-bold rounded-xl hover:bg-[var(--primary-hover)] transition-all duration-200 shadow-2xs whitespace-nowrap"
              >
                {nextStep.actionText} →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Rich SEO Content, FAQs, and Related Tools Card */}
      <SeoContentSection slug={slug} relatedTools={relatedTools} />
    </div>
  );
}

