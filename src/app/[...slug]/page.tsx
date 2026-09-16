import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { contentPages } from '@/lib/pages-data';
import { industries, insights, projects, services } from '@/lib/site-data';
import { WorkGrid } from '@/components/interactive';
import { CTASection, PageHero } from '@/components/ui';
import { AboutPage, AgencyPartnerPage, ArticlePage, AudiencePage, CaseStudyPage, ContactPage, ContentTemplate, IndustriesPage, IndustryDetail, ProcessPage, ServiceDetail, ServicesPage } from '@/components/page-templates';

const primaryTitles: Record<string, string> = { work: 'Selected Work', services: 'Our Services', process: 'How We Work', agencies: 'For Agencies', brands: 'For Brands', industries: 'Industries', about: 'About VYRA', contact: 'Contact', 'agencies/partner': 'Become a Production Partner' };
const knownPaths = [...Object.keys(primaryTitles), ...Object.keys(contentPages), ...projects.map(p => `work/${p.slug}`), ...services.map(s => `services/${s.slug}`), ...industries.map(i => `industries/${i.slug}`), ...insights.map(i => `insights/${i.slug}`)];
export function generateStaticParams() { return knownPaths.map(path => ({ slug: path.split('/') })); }

type Props = { params: Promise<{ slug: string[] }>; searchParams: Promise<{ filter?: string; subject?: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const path = slug.join('/');
  const content = contentPages[path];
  const project = slug[0] === 'work' ? projects.find(p => p.slug === slug[1]) : undefined;
  const insight = slug[0] === 'insights' ? insights.find(i => i.slug === slug[1]) : undefined;
  const service = slug[0] === 'services' ? services.find(s => s.slug === slug[1]) : undefined;
  const industry = slug[0] === 'industries' ? industries.find(i => i.slug === slug[1]) : undefined;
  const title = primaryTitles[path] || content?.title.replace('\n', ' ') || project?.title || insight?.title || service?.title || industry?.title || 'Page Not Found';
  const description = content?.description || project?.description || insight?.excerpt || service?.description || industry?.description;
  if (insight && slug.length === 2) return {
    title, description,
    alternates: { canonical: `/insights/${insight.slug}` },
    openGraph: {
      title: insight.title, description: insight.excerpt, type: 'article',
      url: `/insights/${insight.slug}`, publishedTime: new Date(insight.date).toISOString(), authors: ['VYRA Studio'],
      images: [{ url: insight.image, alt: insight.imageAlt || insight.title }],
    },
  };
  return { title, ...(description ? { description } : {}) };
}
export default async function SitemapPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const path = slug.join('/');
  if (path === 'work') { const query = await searchParams; return <><PageHero eyebrow="A FEW WORLDS WE’VE IMAGINED" title={'Seeing is believing.'} description="Big ideas, brought into focus. Explore a selection of our self-initiated films, product worlds, and campaign concepts." /><WorkGrid initialFilter={query.filter} /><CTASection title={'Your brand.\nOur next great story.'} /></>; }
  if (path === 'services') return <ServicesPage />;
  if (path === 'process') return <ProcessPage />;
  if (path === 'agencies') return <AudiencePage audience="agencies" />;
  if (path === 'brands') return <AudiencePage audience="brands" />;
  if (path === 'about') return <AboutPage />;
  if (path === 'industries') return <IndustriesPage />;
  if (path === 'contact') { const query = await searchParams; return <ContactPage subject={query.subject} />; }
  if (path === 'agencies/partner') return <AgencyPartnerPage />;
  if (contentPages[path]) return <ContentTemplate page={contentPages[path]} legal={path.startsWith('legal/')} />;
  if (slug.length === 2 && slug[0] === 'work') { const project = projects.find(p => p.slug === slug[1]); if (project) return <CaseStudyPage project={project} />; }
  if (slug.length === 2 && slug[0] === 'services') { const service = services.find(s => s.slug === slug[1]); if (service) return <ServiceDetail service={service} />; }
  if (slug.length === 2 && slug[0] === 'industries') { const industry = industries.find(i => i.slug === slug[1]); if (industry) return <IndustryDetail industry={industry} />; }
  if (slug.length === 2 && slug[0] === 'insights') { const insight = insights.find(i => i.slug === slug[1]); if (insight) return <ArticlePage insight={insight} />; }
  notFound();
}
