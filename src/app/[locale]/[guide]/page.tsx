import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { routing, absoluteUrl, languageAlternates } from '@/i18n/routing';
import { nearbyCopy, GUIDE_SLUGS, GUIDE_SOURCES, type GuideSlug } from '@/content/nearby';
import { buildBreadcrumb } from '@/lib/site';

export function generateStaticParams() {
  return routing.locales.flatMap(locale => GUIDE_SLUGS.map(guide => ({ locale, guide })));
}
type Params = Promise<{ locale: string; guide: string }>;
function resolve(locale: string, guide: string) {
  if (!routing.locales.includes(locale as typeof routing.locales[number]) || !GUIDE_SLUGS.includes(guide as GuideSlug)) notFound();
  const slug = guide as GuideSlug;
  const copy = nearbyCopy(locale);
  return { slug, copy, article: copy.guides[slug], url: absoluteUrl(locale, `/${slug}`) };
}
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, guide } = await params;
  const { article, url } = resolve(locale, guide);
  return {
    title: article.title, description: article.description,
    alternates: { canonical: url, languages: languageAlternates(`/${guide}`) },
    openGraph: { title: article.title, description: article.description, url, type: 'article' },
    twitter: { card: 'summary', title: article.title, description: article.description },
  };
}
export default async function GuidePage({ params }: { params: Params }) {
  const { locale, guide } = await params;
  const { slug, copy, article, url } = resolve(locale, guide);
  setRequestLocale(locale);
  const sources = GUIDE_SOURCES[slug];
  const jsonLd = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'Article', headline: article.title, description: article.description, inLanguage: locale, url,
      dateModified: '2026-11-10', author: { '@type': 'Organization', name: 'Mont des Arts Travel Guide', url: absoluteUrl(locale) },
      citation: sources.map(source => source.url) },
    buildBreadcrumb(locale, article.title, `/${slug}`),
  ] };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
    <Header />
    <main className="pt-28 pb-20 px-4 sm:px-6">
      <article className="max-w-3xl mx-auto">
        <a href={`/${locale}`} className="text-sm underline" style={{ color: 'var(--accent)' }}>← {copy.back}</a>
        <h1 className="font-display text-3xl sm:text-5xl font-bold leading-tight mt-8 mb-5">{article.title}</h1>
        <p className="text-sm mb-7" style={{ color: 'var(--text-muted)' }}>{copy.checked}</p>
        <p className="text-lg leading-relaxed mb-10" style={{ color: 'var(--text-secondary)' }}>{article.intro}</p>
        <div className="space-y-10">{article.sections.map((section, index) => <section key={index}>
          <h2 className="font-display text-2xl font-semibold mb-3">{section.title}</h2>
          <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{section.body}</p>
          <a href={sources[section.source].url} target="_blank" rel="noopener noreferrer" className="inline-block text-sm underline mt-3" style={{ color: 'var(--accent)' }}>{sources[section.source].label} ↗</a>
        </section>)}</div>
        <aside className="rounded-xl p-5 mt-10 text-sm" style={{ background: 'var(--bg-secondary)' }}>{copy.notice}</aside>
        <section className="mt-12"><h2 className="font-display text-xl font-semibold mb-4">{copy.sources}</h2>
          <ul className="space-y-3">{sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: 'var(--accent)' }}>{source.label} ↗</a></li>)}</ul>
        </section>
        <nav className="mt-12 pt-8" style={{ borderTop: '1px solid var(--border-color)' }} aria-label={copy.related}>
          <h2 className="font-display text-xl font-semibold mb-4">{copy.related}</h2>
          <ul className="space-y-3">{GUIDE_SLUGS.filter(other => other !== slug).map(other => <li key={other}><a href={`/${locale}/${other}`} className="underline" style={{ color: 'var(--accent)' }}>{copy.guides[other].title}</a></li>)}</ul>
        </nav>
      </article>
    </main>
    <Footer />
  </>;
}
