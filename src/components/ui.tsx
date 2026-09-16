import Link from 'next/link';
import Image from 'next/image';
import type { ReactNode } from 'react';
import type { Project, Insight } from '@/lib/site-data';
import { ArrowUpRight, Spark } from './icons';

export function SectionLabel({ children, number, light = false }: { children: ReactNode; number?: string; light?: boolean }) {
  return <div className={`section-label ${light ? 'label-light' : ''}`}><span className="label-mark" />{number && <span className="label-number">{number} /</span>}{children}</div>;
}
export function ButtonLink({ children, href, variant = 'dark', className = '' }: { children: ReactNode; href: string; variant?: 'dark' | 'yellow' | 'outline' | 'text'; className?: string }) {
  return <Link href={href} className={`button button-${variant} ${className}`}>{children}<ArrowUpRight size={18} /></Link>;
}
export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return <Link className="project-card" href={`/work/${project.slug}`}><div className="project-image"><Image src={project.image} alt={`${project.client}: ${project.description}`} fill sizes="(max-width: 700px) 100vw, 50vw" priority={index < 2} /><span className="project-spec">CONCEPT FILM</span><span className="project-view"><ArrowUpRight size={24} /></span><span className={`project-wordmark wordmark-${project.client.toLowerCase()}`}>{project.client}</span></div><div className="project-card-info"><div><h3>{project.title}</h3><p>{project.industry} <span>/</span> {project.category}</p></div><span className="project-year">2026 <ArrowUpRight size={18} /></span></div></Link>;
}
export function InsightCard({ insight }: { insight: Insight }) {
  return <Link href={`/insights/${insight.slug}`} className="insight-card"><div className="insight-image"><Image src={insight.image} alt={insight.imageAlt || insight.title} fill sizes="(max-width: 700px) 100vw, 33vw" /><span className="insight-image-arrow"><ArrowUpRight /></span></div><div className="insight-meta"><span>{insight.category}</span><span>{insight.readTime}</span></div><h3>{insight.title}</h3><span className="insight-read">Read the story <ArrowUpRight size={15} /></span></Link>;
}
export function CTASection({ title = 'Got a big idea?\nLet’s make it real.', description = 'A first thought. A full brief. An impossible-sounding ambition.\nWhatever you have in mind, we’d love to hear it.' }: { title?: string; description?: string }) {
  return <section className="cta-section"><div className="content-width cta-inner"><div><SectionLabel>YOUR NEXT CHAPTER STARTS HERE</SectionLabel><h2>{title}</h2><p>{description}</p><ButtonLink href="/start-a-project">Let’s make something extraordinary</ButtonLink></div><Spark className="cta-spark" size={225} /><span className="cta-side-note">A DIFFERENT KIND OF POSSIBLE.</span></div></section>;
}
export function PageHero({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children?: ReactNode }) {
  return <section className="page-hero content-width"><SectionLabel>{eyebrow}</SectionLabel><div className="page-hero-main"><h1>{title}</h1><div><p>{description}</p>{children}</div></div></section>;
}
