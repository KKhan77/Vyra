import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { InsightsLibrary } from '@/components/insights-journal';
import { ArrowRight, ArrowUpRight, Spark } from '@/components/icons';
import { ButtonLink, CTASection, SectionLabel } from '@/components/ui';
import { insights } from '@/lib/insight-articles';
import { journalDate, readJournalFilters } from '@/lib/insights-query';
import './insights.css';

export const metadata: Metadata = {
  title: 'Insights — Ideas for the Next Frame',
  description: 'Perspectives on AI filmmaking, commercial production, creative technology, and the ideas shaping what comes next. From the VYRA studio.',
  alternates: { canonical: '/insights' },
  openGraph: {
    title: 'VYRA Insights — Ahead of the Next Frame',
    description: 'Human thinking. A different perspective. Explore ideas from the VYRA studio.',
    url: '/insights', type: 'website',
    images: [{ url: '/images/insights/filmmaking.jpg', width: 1200, height: 627, alt: 'Illustrative cinema-camera photography for the VYRA journal' }],
  },
};

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };
export default async function InsightsPage({ searchParams }: Props) {
  const query = await searchParams;
  const params = new URLSearchParams();
  for (const key of ['category', 'q', 'sort', 'limit']) {
    const value = query[key];
    if (typeof value === 'string') params.set(key, value);
  }
  const initialFilters = readJournalFilters(params);
  const featured = insights[0];
  const [firstThought, secondThought] = featured.title.split('. ');

  return <div className="journal-page">
    <section className="journal-intro content-width" aria-labelledby="journal-heading">
      <div className="journal-topline"><SectionLabel>INSIGHTS / THE VYRA JOURNAL</SectionLabel><span>CREATIVITY. TECHNOLOGY. WHAT’S NEXT.</span></div>
      <div className="journal-masthead"><h1 id="journal-heading">Ahead of<br />the next frame<span>.</span></h1><div className="journal-intro-copy"><p>Ideas, observations, and fresh perspectives from the intersection of creativity and technology.</p><p>A look at what’s changing.<br />And what will always matter.</p><a className="journal-explore" href="#latest-insights">Follow your curiosity <ArrowRight size={17} /></a></div><Spark className="journal-masthead-spark" size={67} /></div>
    </section>

    <section className="journal-feature-section content-width" aria-label="Featured insight">
      <Link href={`/insights/${featured.slug}`} className="journal-featured" aria-labelledby="journal-featured-title">
        <div className="journal-featured-copy"><SectionLabel light>FEATURED PERSPECTIVE</SectionLabel><span className="journal-feature-category">{featured.category} <span>/</span> {featured.readTime}</span><h2 id="journal-featured-title">{firstThought}.<span>{secondThought}</span></h2><p>The tools are evolving. The need for a genuinely good idea isn’t going anywhere.</p><div className="journal-feature-footer"><span>Read the perspective <ArrowUpRight size={17} /></span><time dateTime="2026-03-18">{journalDate(featured.date)}</time></div></div>
        <div className="journal-featured-image"><Image src={featured.image} alt={featured.imageAlt || featured.title} fill priority sizes="(max-width: 700px) 100vw, 60vw" /><span className="journal-image-label">ILLUSTRATIVE IMAGE</span><span className="journal-featured-arrow"><ArrowUpRight size={32} /></span><span className="journal-photo-caption"><i /> A NEW LENS ON WHAT’S POSSIBLE.</span></div>
      </Link>
      <div className="journal-feature-caption"><span>01 / IN FOCUS</span><span>HUMAN IMAGINATION. NEXT-GENERATION THINKING.</span></div>
    </section>

    <InsightsLibrary key={JSON.stringify(initialFilters)} initialFilters={initialFilters} />

    <section className="journal-studio-section content-width" aria-labelledby="journal-studio-title"><div className="journal-studio-image"><Image src="/images/insights/editing.jpg" alt="Illustrative placeholder: an editor reviewing footage in a creative studio." fill sizes="(max-width: 700px) 100vw, 45vw" /><span className="journal-studio-image-note">STUDIO NOTES / THE MAKING OF POSSIBLE</span></div><div className="journal-studio-copy"><SectionLabel>BEYOND THE JOURNAL</SectionLabel><h2 id="journal-studio-title">The process behind<br />the perspective.</h2><p>Good ideas deserve more than a conversation. See how human imagination and an AI-native workflow come together, from the first brief to the final frame.</p><ButtonLink href="/process" variant="outline">Inside our production process</ButtonLink><Spark className="journal-studio-spark" size={72} /></div></section>

    <CTASection title={'Good thinking.\nEven better making.'} description={'Inspired by something you’ve read?\nLet’s turn a fresh perspective into your next campaign.'} />
  </div>;
}
