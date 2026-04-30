import { TOOLS } from '@/lib/tools-registry';
import ToolPageClient from '@/components/ToolPageClient';

// Generate static paths for all tools (required for output: 'export')
export function generateStaticParams() {
  return TOOLS.map((tool) => ({
    slug: tool.slug,
  }));
}

// Generate metadata for each tool page (SEO)
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tool = TOOLS.find(t => t.slug === slug);
  if (!tool) {
    return { title: 'Tool Not Found — ImageFlow' };
  }
  return {
    title: `${tool.name} — ImageFlow`,
    description: tool.description,
    keywords: `${tool.name}, ${tool.category}, image tool, free online tool, ImageFlow`,
  };
}

export default async function ToolPage({ params }) {
  const { slug } = await params;
  return <ToolPageClient slug={slug} />;
}
