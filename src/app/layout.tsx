import type { Metadata } from 'next';
import localFont from 'next/font/local';
import type { ReactNode } from 'react';
import { Header, Footer } from '@/components/site-shell';
import './globals.css';

const manrope = localFont({
  src: [
    { path: '../../public/fonts/manrope-regular.ttf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/manrope-medium.ttf', weight: '500', style: 'normal' },
    { path: '../../public/fonts/manrope-bold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-manrope', display: 'swap',
});
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://vyra.studio'),
  title: { default: 'VYRA — Big Ideas. No Boundaries.', template: '%s — VYRA' },
  description: 'VYRA is an AI-native, human-directed production company. Extraordinary commercials, product films, brand stories, and campaign content. A different kind of possible.',
  openGraph: { title: 'VYRA — A Different Kind of Possible', description: 'Human imagination. Next-generation production.', images: [{ url: '/images/vyra-hero.jpg', width: 1376, height: 768 }], type: 'website' },
  icons: { icon: '/icon.svg' },
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en" className={manrope.variable}><body><a className="skip-link" href="#main-content">Skip to content</a><Header /><main id="main-content">{children}</main><Footer /></body></html>;
}
