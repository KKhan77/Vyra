'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { insightCategories, insights, type Insight } from '@/lib/insight-articles';
import { defaultJournalFilters, getJournalArticles, journalDate, journalUrl, JOURNAL_PAGE_SIZE, readJournalFilters, type JournalFilters, type JournalSort } from '@/lib/insights-query';
import { ArrowRight, ArrowUpRight, Close, Plus, Spark } from './icons';
import { SectionLabel } from './ui';

function SearchIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4.5 4.5" /></svg>;
}

function JournalCard({ article }: { article: Insight }) {
  return <article className="journal-article">
    <Link href={`/insights/${article.slug}`} className="journal-card insight-card" id={`journal-${article.slug}`} aria-labelledby={`journal-title-${article.slug}`}>
      <div className="journal-card-image">
        <Image src={article.image} alt={article.imageAlt || `Illustrative placeholder for ${article.title}`} fill sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw" />
        <span className="journal-image-arrow"><ArrowUpRight size={21} /></span>
      </div>
      <div className="journal-card-content">
        <div className="journal-card-meta"><span>{article.category}</span><span>{article.readTime}</span></div>
        <h3 id={`journal-title-${article.slug}`}>{article.title}</h3>
        <p>{article.excerpt}</p>
        <div className="journal-card-bottom"><time dateTime={new Date(article.date).toISOString().slice(0, 10)}>{journalDate(article.date)}</time><span>Read the story <ArrowUpRight size={16} /></span></div>
      </div>
    </Link>
  </article>;
}

export function InsightsLibrary({ initialFilters = defaultJournalFilters }: { initialFilters?: JournalFilters }) {
  const [filters, setFilters] = useState<JournalFilters>(initialFilters);
  const searchRef = useRef<HTMLInputElement>(null);
  const articles = getJournalArticles(filters);
  const displayed = articles.slice(0, filters.limit);
  const isFiltered = filters.category !== 'All insights' || filters.query.trim().length > 0;
  const remaining = articles.length - displayed.length;

  useEffect(() => {
    const restore = () => setFilters(readJournalFilters(new URLSearchParams(window.location.search)));
    window.addEventListener('popstate', restore);
    return () => window.removeEventListener('popstate', restore);
  }, []);

  function changeFilters(patch: Partial<JournalFilters>, history: 'push' | 'replace' = 'replace', resetLimit = true) {
    const next = { ...filters, ...patch, ...(resetLimit ? { limit: JOURNAL_PAGE_SIZE } : {}) };
    setFilters(next);
    if (history === 'push') window.history.pushState(null, '', journalUrl(next));
    else window.history.replaceState(null, '', journalUrl(next));
  }

  function resetFilters() {
    setFilters(defaultJournalFilters);
    window.history.pushState(null, '', '/insights');
  }

  function loadMore() {
    const nextArticle = articles[displayed.length];
    changeFilters({ limit: filters.limit + JOURNAL_PAGE_SIZE }, 'replace', false);
    if (nextArticle) requestAnimationFrame(() => document.getElementById(`journal-${nextArticle.slug}`)?.focus({ preventScroll: true }));
  }

  return <section className="journal-library content-width" id="latest-insights" aria-labelledby="journal-library-title">
    <div className="journal-library-heading">
      <div><SectionLabel>THE LATEST THINKING</SectionLabel><h2 id="journal-library-title">Stay curious.</h2></div>
      <div className="journal-search" role="search">
        <SearchIcon />
        <input ref={searchRef} type="search" aria-label="Search insights" placeholder="Search insights…" value={filters.query} maxLength={200} onChange={event => changeFilters({ query: event.target.value })} />
        {filters.query && <button type="button" aria-label="Clear search" onClick={() => { changeFilters({ query: '' }); searchRef.current?.focus(); }}><Close size={16} /></button>}
      </div>
    </div>

    <div className="journal-filters" role="group" aria-label="Filter insights by category">
      {insightCategories.map(category => <button type="button" className={`journal-filter ${filters.category === category ? 'selected' : ''}`} key={category} aria-label={category} aria-pressed={filters.category === category} aria-controls="journal-results" onClick={() => changeFilters({ category }, 'push')}>
        {category}{category === 'All insights' && <sup aria-hidden="true">{insights.length.toString().padStart(2, '0')}</sup>}
      </button>)}
    </div>

    <div className="journal-toolbar">
      <div className="journal-result-count" aria-live="polite" aria-atomic="true"><span className="journal-small-square" /><span>{articles.length.toString().padStart(2, '0')} {isFiltered ? 'MATCHING' : 'LATEST'} {articles.length === 1 ? 'ARTICLE' : 'ARTICLES'}</span>{filters.query.trim() && <span className="journal-search-term">for “{filters.query.trim()}”</span>}</div>
      <label className="journal-sort">Sort by <select aria-label="Sort insights" value={filters.sort} onChange={event => changeFilters({ sort: event.target.value as JournalSort })}><option value="newest">Newest first</option><option value="oldest">Oldest first</option><option value="shortest">Quickest reads</option></select></label>
    </div>

    <div id="journal-results" className="journal-results">
      {displayed.length > 0 ? <div className="journal-grid">{displayed.map(article => <JournalCard key={article.slug} article={article} />)}</div> : <div className="journal-empty" role="status"><Spark size={58} /><SectionLabel>A LITTLE ROOM FOR DISCOVERY</SectionLabel><h3>Nothing in this frame. Yet.</h3><p>We couldn’t find an article matching your {filters.query.trim() ? 'search' : 'selected category'}. Try another subject, or explore all our studio perspectives.</p><button type="button" className="button button-dark" onClick={resetFilters}>Explore all insights <ArrowRight size={18} /></button></div>}
    </div>

    {displayed.length > 0 && <div className="journal-pagination">
      <div className="journal-pagination-progress"><span>Showing {displayed.length.toString().padStart(2, '0')} of {articles.length.toString().padStart(2, '0')} articles</span><div aria-hidden="true"><span style={{ width: `${displayed.length / articles.length * 100}%` }} /></div></div>
      {remaining > 0 ? <button className="button button-outline journal-load-more" type="button" onClick={loadMore}>More perspectives <Plus size={18} /></button> : <span className="journal-caught-up"><Spark size={13} /> You’re all caught up.</span>}
      {isFiltered && <button className="journal-reset" type="button" onClick={resetFilters}>Reset filters <Close size={13} /></button>}
    </div>}
    <div className="journal-library-note"><span>HUMAN THINKING. A DIFFERENT PERSPECTIVE.</span><span>Imagery is illustrative and used as a placeholder.</span></div>
  </section>;
}
