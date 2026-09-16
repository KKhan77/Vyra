import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BriefForm } from '@/components/brief-form';
import { PageHero, SectionLabel } from '@/components/ui';
import { ArrowUpRight, Check } from '@/components/icons';

export const metadata: Metadata = { title: 'Start a Project', description: 'Tell VYRA about your next commercial, brand film, or campaign. Share your brief or request a creative consultation.' };
export default async function StartProjectPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await searchParams;
  const consultation = type === 'consultation';
  return <><PageHero eyebrow={consultation ? 'A CREATIVE CONVERSATION' : 'LET’S MAKE SOMETHING EXTRAORDINARY'} title={consultation ? 'A fresh perspective.\nStarts here.' : 'Every big idea\nstarts somewhere.'} description={consultation ? 'Not sure where to start? Share a little context and request a creative consultation. We’ll shape the next step together.' : 'A first thought. A full brief. An impossible-sounding ambition. Tell us what you have in mind.'} /><div className="brief-layout content-width"><aside className="brief-aside"><div className="brief-aside-image"><Image src="/images/aura-beauty.jpg" alt="A golden skincare product concept surrounded by luminous silk" fill sizes="(max-width: 700px) 100vw, 35vw" /><span>A DIFFERENT KIND OF POSSIBLE.</span></div><SectionLabel>GOOD TO KNOW</SectionLabel><h2>Big ambition.<br />A human conversation.</h2><ul className="check-list"><li><Check size={17} /> Reviewed by a real creative team</li><li><Check size={17} /> Confidential by default</li><li><Check size={17} /> Clear scope before any commitment</li></ul><div className="brief-alternative"><h3>{consultation ? 'Already have a brief?' : 'Prefer to talk it through?'}</h3><p>{consultation ? 'Give us the details and we’ll get into the possibilities.' : 'You don’t need to have it all figured out.'}</p><Link href={consultation ? '/start-a-project' : '/start-a-project?type=consultation'} className="text-link">{consultation ? 'Submit a project brief' : 'Request a creative consultation'}<ArrowUpRight size={17} /></Link></div></aside><BriefForm key={consultation ? 'consultation' : 'project'} kind={consultation ? 'consultation' : 'project'} /></div></>;
}
