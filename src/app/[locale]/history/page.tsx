import { setRequestLocale } from 'next-intl/server';
import { useTranslations, useMessages, useLocale } from 'next-intl';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { routing, absoluteUrl, languageAlternates } from '@/i18n/routing';
import { buildArticle, buildBreadcrumb } from '@/lib/site';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const selfUrl = absoluteUrl(locale, '/history');

  return {
    title: messages.history.metaTitle,
    description: messages.history.metaDescription,
    alternates: {
      canonical: selfUrl,
      languages: languageAlternates('/history'),
    },
    openGraph: {
      title: messages.history.metaTitle,
      description: messages.history.metaDescription,
      url: selfUrl,
      siteName: 'Mont des Arts',
      type: 'article',
    },
  };
}

function HistoryContent() {
  const t = useTranslations('history');
  const ht = useTranslations('header');
  const locale = useLocale();
  const messages = useMessages() as any;
  const sections = (messages?.history?.sections || []) as Array<{ heading: string; content: string }>;
  const url = absoluteUrl(locale, '/history');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      buildArticle(locale, url, t('metaTitle'), t('metaDescription')),
      buildBreadcrumb(locale, t('title'), '/history'),
    ],
  };

  return (
    <div className="min-h-screen pt-24" style={{ background: 'var(--bg-primary)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
        <nav className="mb-8 text-sm" style={{ color: 'var(--text-muted)' }}>
          <a href={`/${locale}`} className="hover:underline" style={{ color: 'var(--accent)' }}>
            {ht('home')}
          </a>
          <span className="mx-2">/</span>
          <span>{t('title')}</span>
        </nav>

        <h1
          className="font-display text-3xl sm:text-4xl font-bold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h1>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />
        <p className="text-lg leading-relaxed mb-12" style={{ color: 'var(--text-secondary)' }}>
          {t('intro')}
        </p>

        <div className="space-y-10">
          {sections.map((section, i) => (
            <section key={i}>
              <h2
                className="font-display text-xl sm:text-2xl font-semibold mb-3"
                style={{ color: 'var(--text-primary)' }}
              >
                {section.heading}
              </h2>
              <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {section.content}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-14 pt-8" style={{ borderTop: '1px solid var(--border-color)' }}>
          <h2
            className="font-display text-lg font-semibold mb-3"
            style={{ color: 'var(--text-primary)' }}
          >
            {t('sourcesTitle')}
          </h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
            {t('sourcesIntro')}
          </p>
          <ul className="space-y-2">
            {[
              { label: 'Visit Brussels', url: 'https://visit.brussels/en' },
              { label: 'City of Brussels', url: 'https://www.brussels.be/' },
              { label: 'KBR', url: 'https://www.kbr.be/en' },
              { label: 'Belgium.be', url: 'https://www.belgium.be/en' },
            ].map((source) => (
              <li key={source.url}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:underline"
                  style={{ color: 'var(--accent)' }}
                >
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12">
          <a
            href={`/${locale}/#history`}
            className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
            style={{ color: 'var(--accent)' }}
          >
            ← {ht('backToHome')}
          </a>
        </div>
      </div>
    </div>
  );
}

export default async function HistoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main>
        <HistoryContent />
      </main>
      <Footer />
    </>
  );
}
