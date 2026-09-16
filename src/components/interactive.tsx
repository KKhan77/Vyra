'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import { projects, services, workFilters } from '@/lib/site-data';
import { ArrowLeft, ArrowRight, ArrowUpRight, Close, Play, Plus } from './icons';
import { ButtonLink, ProjectCard, SectionLabel } from './ui';

function ReelModal({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    dialog.current?.showModal();
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = oldOverflow; };
  }, []);
  return <dialog ref={dialog} className="reel-dialog" aria-labelledby={titleId} onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="reel-panel"><div className="reel-modal-header"><div><span className="eyebrow">VYRA / CONCEPT SHOWREEL</span><h2 id={titleId}>A different kind of possible.</h2></div><button className="circle-button" aria-label="Close showreel" onClick={onClose} autoFocus><Close /></button></div>
      <video src="/videos/vyra-concept-reel.mp4" poster="/images/vyra-hero.jpg" controls autoPlay muted playsInline preload="metadata" onError={() => setFailed(true)} aria-label="VYRA concept showreel: animated cinematic visual studies" />
      {failed && <p className="video-error">The film couldn’t load. Please try again, or <Link href="/work" onClick={onClose}>explore the visual studies</Link>.</p>}
      <div className="reel-caption"><span>HUMAN IMAGINATION. NEXT-GENERATION PRODUCTION.</span><span>00:18 / AI-generated visual studies / No audio</span></div><p className="reel-disclaimer">Self-initiated concept work. An animated presentation of our studio’s visual explorations—not commissioned campaigns.</p>
    </div>
  </dialog>;
}
export function ReelButton({ className = '', label = 'Play showreel' }: { className?: string; label?: string }) {
  const [open, setOpen] = useState(false);
  return <><button type="button" className={`reel-button ${className}`} onClick={() => setOpen(true)}><span className="play-circle"><Play size={18} /></span>{label}<span className="reel-duration">00:18</span></button>{open && <ReelModal onClose={() => setOpen(false)} />}</>;
}

const heroSlides = [
  { image: '/images/vyra-hero.jpg', alt: 'A graphite sports car in an extraordinary desert beneath a monumental golden sun', label: 'NOMAD / AUTOMOTIVE EXPLORATION' },
  { image: '/images/form-fashion.jpg', alt: 'Sculptural ivory fashion in a windswept volcanic landscape', label: 'FORM / FASHION EXPLORATION' },
  { image: '/images/pulse-technology.jpg', alt: 'Sculptural silver headphones over dark reflective water', label: 'PULSE / PRODUCT EXPLORATION' },
];
export function Hero() {
  const [active, setActive] = useState(0);
  return <section className="hero" aria-label="VYRA creative production studio">
    <div className="hero-images">{heroSlides.map((slide, index) => <Image key={slide.image} src={slide.image} alt={slide.alt} fill priority={index === 0} sizes="100vw" className={`hero-image ${index === active ? 'is-active' : ''}`} />)}</div><div className="hero-shade" />
    <div className="hero-content"><SectionLabel light>AI-NATIVE. HUMAN-DIRECTED.</SectionLabel><h1>Big ideas.<br />No boundaries<span className="hero-period">.</span></h1><p>We turn ambitious ideas into extraordinary films.<br />{' '}A new kind of production company. A different kind of possible.</p><div className="hero-actions"><ButtonLink href="/work" variant="yellow">Explore our work</ButtonLink><ReelButton /></div></div>
    <div className="hero-bottom"><div className="hero-film-label"><span className="film-cross">+</span><span aria-live="polite">{heroSlides[active].label}</span><span className="hero-concept">CONCEPT STUDY — 2026</span></div><div className="hero-controls"><span className="hero-count">0{active + 1}<i> / 03</i></span><div className="hero-dots">{heroSlides.map((slide, index) => <button key={slide.image} className={index === active ? 'active' : ''} onClick={() => setActive(index)} aria-label={`View ${slide.label.toLowerCase()}`} aria-pressed={active === index} />)}</div><button className="hero-arrow" aria-label="Previous visual study" onClick={() => setActive((active + 2) % 3)}><ArrowLeft size={18} /></button><button className="hero-arrow" aria-label="Next visual study" onClick={() => setActive((active + 1) % 3)}><ArrowRight size={18} /></button></div></div>
  </section>;
}

export function ServicesAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  return <div className="services-accordion">{services.map((service, index) => <div className={`service-accordion-item ${open === index ? 'is-open' : ''}`} key={service.slug}><h3><button onClick={() => setOpen(open === index ? null : index)} aria-expanded={open === index} aria-controls={`service-panel-${service.slug}`}><span className="service-number">{service.number}</span><span>{service.title}</span><Plus className="service-plus" size={23} /></button></h3><div id={`service-panel-${service.slug}`} className="service-accordion-panel" hidden={open !== index}><p>{service.description}</p><div className="service-tags">{service.items.slice(0, 3).map(item => <span key={item}>{item}</span>)}</div><Link href={`/services/${service.slug}`} className="text-link">Explore the service <ArrowUpRight size={16} /></Link></div></div>)}</div>;
}

export function WorkGrid({ initialFilter = 'All work' }: { initialFilter?: string }) {
  const [filter, setFilter] = useState(workFilters.includes(initialFilter) ? initialFilter : 'All work');
  const [sort, setSort] = useState('featured');
  const filtered = projects.filter(project => filter === 'All work' || project.tags.includes(filter));
  const displayed = sort === 'title' ? [...filtered].sort((a, b) => a.title.localeCompare(b.title)) : filtered;
  return <div className="portfolio-area content-width"><div className="filter-bar" aria-label="Filter projects">{workFilters.map(item => <button key={item} className={`filter-chip ${filter === item ? 'selected' : ''}`} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}{item === 'All work' && <sup>{projects.length.toString().padStart(2, '0')}</sup>}</button>)}</div><div className="work-toolbar"><span aria-live="polite">{displayed.length.toString().padStart(2, '0')} SELECTED {displayed.length === 1 ? 'PROJECT' : 'PROJECTS'}</span><label>View <select value={sort} onChange={e => setSort(e.target.value)} aria-label="Sort projects"><option value="featured">Curated selection</option><option value="title">Title: A–Z</option></select></label></div><div className="work-grid">{displayed.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</div><p className="portfolio-note">A collection of self-initiated concept studies. Imagined by VYRA, not commissioned by clients.</p></div>;
}

export function BeforeAfter({ image, title }: { image: string; title: string }) {
  const [position, setPosition] = useState(50);
  return <div className="comparison-wrap"><div className="comparison"><Image className="comparison-before" src={image} alt={`${title}: monochrome lighting study`} fill sizes="100vw" /><div className="comparison-after" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}><Image src={image} alt={`${title}: final color direction`} fill sizes="100vw" /></div><div className="comparison-line" style={{ left: `${position}%` }}><span><ArrowLeft size={15} /><ArrowRight size={15} /></span></div><span className="comparison-label left">FINAL COLOR DIRECTION</span><span className="comparison-label right">LIGHTING STUDY</span><input type="range" min="0" max="100" value={position} onChange={e => setPosition(Number(e.target.value))} aria-label="Compare the final color direction with a monochrome lighting study" aria-valuetext={`${position}% final color direction`} /></div><p className="small-note">Drag to explore the color direction. An illustrative grading study, not a raw-generation before-and-after.</p></div>;
}
