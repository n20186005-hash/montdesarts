'use client';

import { useTranslations, useMessages } from 'next-intl';

export default function Accommodation() {
  const t = useTranslations('accommodation');
  const messages = useMessages() as any;
  const places = (messages?.accommodation?.places || []) as Array<{
    name: string;
    description: string;
  }>;

  if (places.length === 0) return null;

  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {places.map((place, i) => (
            <div
              key={i}
              className="rounded-xl p-6 transition-shadow hover:shadow-md"
              style={{
                background: 'var(--card-bg)',
                boxShadow: 'var(--card-shadow)',
                border: '1px solid var(--border-color)',
              }}
            >
              <h3
                className="font-display text-lg font-semibold mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                {place.name}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                {place.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
