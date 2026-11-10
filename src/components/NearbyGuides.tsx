import { nearbyCopy, GUIDE_SLUGS } from '@/content/nearby';

export default function NearbyGuides({ locale }: { locale: string }) {
  const copy = nearbyCopy(locale);
  return <section id="nearby" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
    <div className="max-w-5xl mx-auto">
      <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-4">{copy.heading}</h2>
      <p className="max-w-3xl mb-8" style={{ color: 'var(--text-secondary)' }}>{copy.intro}</p>
      <div className="grid sm:grid-cols-2 gap-6">
        {GUIDE_SLUGS.map(slug => <article key={slug} className="rounded-xl p-6" style={{ border: '1px solid var(--border-color)', background: 'var(--card-bg)' }}>
          <h3 className="font-display text-xl font-semibold mb-3"><a href={`/${locale}/${slug}`} style={{ color: 'var(--accent)' }}>{copy.guides[slug].title}</a></h3>
          <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>{copy.guides[slug].description}</p>
          <a className="text-sm underline" href={`/${locale}/${slug}`} style={{ color: 'var(--accent)' }}>{copy.read} →</a>
        </article>)}
      </div>
    </div>
  </section>;
}
