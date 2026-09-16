'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { navigation } from '@/lib/site-data';
import { ArrowUpRight, Close, Spark } from './icons';

export function Logo({ light = false }: { light?: boolean }) {
  return <Link href="/" className={`logo ${light ? 'logo-light' : ''}`} aria-label="VYRA home"><span>VYRA</span><sup>®</sup></Link>;
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const keydown = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', keydown);
    return () => document.removeEventListener('keydown', keydown);
  }, [open]);
  return <header className="site-header">
    <div className="header-inner">
      <Logo />
      <nav aria-label="Main navigation" className="desktop-nav">{navigation.map(item => <Link key={item.href} href={item.href} className={pathname.startsWith(item.href) ? 'active' : ''}>{item.label}</Link>)}</nav>
      <Link href="/start-a-project" className="header-cta">Start a project <ArrowUpRight size={17} /></Link>
      <button type="button" className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? <Close /> : <span><i /><i /></span>}</button>
    </div>
    {open && <nav id="mobile-menu" className="mobile-nav" aria-label="Mobile navigation"><Link href="/">Home</Link>{navigation.map(item => <Link key={item.href} href={item.href}>{item.label}<ArrowUpRight /></Link>)}<Link href="/brands">For Brands<ArrowUpRight /></Link><Link href="/start-a-project" className="mobile-project">Start a project<ArrowUpRight /></Link></nav>}
  </header>;
}

export function Footer() {
  return <footer className="site-footer">
    <div className="footer-top content-width">
      <div className="footer-intro"><Logo light /><p>A new kind of production company.<br />For a new world of possibilities.</p><div className="availability"><span /> Open to extraordinary ideas.</div></div>
      <div className="footer-links"><span className="eyebrow">EXPLORE</span><Link href="/work">Our work</Link><Link href="/services">What we do</Link><Link href="/process">How we work</Link><Link href="/insights">Insights</Link></div>
      <div className="footer-links"><span className="eyebrow">THE STUDIO</span><Link href="/about">About VYRA</Link><Link href="/agencies">For agencies</Link><Link href="/brands">For brands</Link><Link href="/industries">Industries</Link><Link href="/careers">Careers</Link></div>
      <div className="footer-links footer-contact"><span className="eyebrow">LET’S MAKE SOMETHING MATTER.</span><Link href="/start-a-project" className="footer-big-link">Start a conversation <ArrowUpRight size={23} /></Link><Link href="/contact">Contact the studio <ArrowUpRight size={14} /></Link><div className="footer-stamp"><Spark size={38} /><span>HUMAN IMAGINATION.<br />NEXT-GENERATION PRODUCTION.</span></div></div>
    </div>
    <div className="footer-bottom content-width"><span>© {new Date().getFullYear()} VYRA. A different kind of possible.</span><div><Link href="/legal/privacy">Privacy</Link><Link href="/legal/terms">Terms</Link><Link href="/legal/cookies">Cookies</Link><Link href="/legal/ai-content-policy">AI & content policy</Link></div><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">Back to top <ArrowUpRight size={14} /></button></div>
  </footer>;
}
