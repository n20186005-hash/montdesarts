import { useTranslations } from 'next-intl';

export default function WhatIs() {
  const t = useTranslations('whatIs');

  return (
    <section id="what-is-mont-des-arts" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />
        <p className="text-lg sm:text-xl leading-relaxed mb-4" style={{ color: 'var(--text-primary)' }}>
          {t('text')}
        </p>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {t('alsoKnown')}
        </p>
      </div>
    </section>
  );
}
