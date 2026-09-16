import type { MetadataRoute } from 'next';
import { contentPages } from '@/lib/pages-data';
import { industries, insights, projects, services } from '@/lib/site-data';
export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || 'https://vyra.studio').replace(/\/$/, '');
  const paths = ['', 'work', 'services', 'process', 'agencies', 'agencies/partner', 'brands', 'about', 'industries', 'insights', 'start-a-project', 'contact', ...Object.keys(contentPages), ...projects.map(p => `work/${p.slug}`), ...services.map(s => `services/${s.slug}`), ...industries.map(i => `industries/${i.slug}`), ...insights.map(i => `insights/${i.slug}`)];
  return [...new Set(paths)].map(path => ({ url: `${base}/${path}`, changeFrequency: path.startsWith('legal/') ? 'yearly' : 'monthly', priority: path === '' ? 1 : path.includes('/') ? 0.6 : 0.8 }));
}
