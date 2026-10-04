import { useTranslations, useMessages } from 'next-intl';

function Block({ id, title, text, bullets }: { id: string; title: string; text: string; bullets: string[] }) {
  return (
    <section id={id} className="section-padding">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
          {title}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />
        <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
          {text}
        </p>
        <ul className="space-y-3">
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
      </div>
    </section>
  );
}

export default function GardensViewpoint() {
  const tg = useTranslations('gardens');
  const tv = useTranslations('viewpoint');
  const messages = useMessages() as any;

  return (
    <>
      <Block
        id="gardens"
        title={tg('title')}
        text={tg('text')}
        bullets={messages?.gardens?.bullets || []}
      />
      <Block
        id="viewpoint"
        title={tv('title')}
        text={tv('text')}
        bullets={messages?.viewpoint?.bullets || []}
      />
    </>
  );
}
