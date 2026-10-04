import { useTranslations, useMessages } from 'next-intl';

export default function Tickets() {
  const t = useTranslations('tickets');
  const messages = useMessages() as any;
  const bullets: string[] = messages?.tickets?.bullets || [];

  return (
    <section
      id="tickets"
      className="section-padding"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        <p className="text-lg sm:text-xl leading-relaxed mb-6" style={{ color: 'var(--text-primary)' }}>
          {t('answer')}
        </p>

        <ul className="space-y-3 mb-6">
          {bullets.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                style={{ background: 'var(--accent)' }}
              />
              <span style={{ color: 'var(--text-secondary)' }}>{item}</span>
            </li>
          ))}
        </ul>

        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {t('note')}
        </p>
      </div>
    </section>
  );
}
