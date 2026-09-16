import { insightCategories, insights, type Insight } from './insight-articles';

export type JournalSort = 'newest' | 'oldest' | 'shortest';
export type JournalFilters = { category: string; query: string; sort: JournalSort; limit: number };
export const JOURNAL_PAGE_SIZE = 6;
export const defaultJournalFilters: JournalFilters = { category: 'All insights', query: '', sort: 'newest', limit: JOURNAL_PAGE_SIZE };

export function readJournalFilters(params: Pick<URLSearchParams, 'get'>): JournalFilters {
  const category = params.get('category') || 'All insights';
  const sort = params.get('sort');
  const limit = Number(params.get('limit'));
  return {
    category: insightCategories.includes(category) ? category : 'All insights',
    query: (params.get('q') || '').slice(0, 200),
    sort: sort === 'oldest' || sort === 'shortest' ? sort : 'newest',
    limit: Number.isSafeInteger(limit) && limit >= JOURNAL_PAGE_SIZE ? Math.min(limit, 60) : JOURNAL_PAGE_SIZE,
  };
}

export function journalUrl(filters: JournalFilters) {
  const params = new URLSearchParams();
  if (filters.category !== 'All insights') params.set('category', filters.category);
  if (filters.query.trim()) params.set('q', filters.query);
  if (filters.sort !== 'newest') params.set('sort', filters.sort);
  if (filters.limit > JOURNAL_PAGE_SIZE) params.set('limit', String(filters.limit));
  const query = params.toString();
  return `/insights${query ? `?${query}` : ''}`;
}

function searchable(value: string) {
  return value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

export function getJournalArticles(filters: JournalFilters, articles: Insight[] = insights) {
  const words = searchable(filters.query.trim()).split(/\s+/).filter(Boolean);
  const isFiltered = words.length > 0 || filters.category !== 'All insights';
  const filtered = articles.filter(article => {
    // The lead story is already featured above the unfiltered library.
    if (!isFiltered && article.slug === insights[0].slug) return false;
    if (filters.category !== 'All insights' && article.category !== filters.category) return false;
    const text = searchable(`${article.title} ${article.excerpt} ${article.category}`);
    return words.every(word => text.includes(word));
  });
  return filtered.sort((a, b) => {
    const dateDifference = Date.parse(b.date) - Date.parse(a.date);
    if (filters.sort === 'oldest') return -dateDifference;
    if (filters.sort === 'shortest') return parseInt(a.readTime, 10) - parseInt(b.readTime, 10) || dateDifference;
    return dateDifference;
  });
}

export function journalDate(date: string) {
  return new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' });
}
