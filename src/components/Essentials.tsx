import { useTranslations, useMessages } from 'next-intl';

export default function Essentials() {
  const t = useTranslations('info');
  const messages = useMessages() as any;
  const sections = (messages?.info?.sections || []) as Array<{ id: string; title: string; content: string }>;

  if (sections.length === 0) return null;

  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6 text-center"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-12 mx-auto" style={{ background: 'var(--accent)' }} />

        <div className="space-y-10">
          {sections.map((section) => (
            <div key={section.id} id={section.id}>
              <h3
                className="font-display text-xl sm:text-2xl font-semibold mb-3"
                style={{ color: 'var(--text-primary)' }}
              >
                {section.title}
              </h3>
              <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
