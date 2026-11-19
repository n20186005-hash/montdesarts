import { nearbyCopy, GUIDE_SLUGS } from '@/content/nearby';
import { PLACE_DETAILS } from '@/content/guide-details';

export default function NearbyGuides({ locale }: { locale: string }) {
  const copy = nearbyCopy(locale);
  return <section id="nearby" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
    <div className="max-w-5xl mx-auto">
      <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-4">{copy.heading}</h2>
      <p className="max-w-3xl mb-8" style={{ color: 'var(--text-secondary)' }}>{copy.intro}</p>
      <div className="grid sm:grid-cols-2 gap-6">
        {GUIDE_SLUGS.map(slug => <article key={slug} className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border-color)', background: 'var(--card-bg)' }}>
          {PLACE_DETAILS[slug].image && <a href={`/${locale}/${slug}`}><img src={PLACE_DETAILS[slug].image} alt={copy.guides[slug].title} className="w-full h-44 object-cover" loading="lazy" /></a>}
          <div className="p-6">
          <h3 className="font-display text-xl font-semibold mb-3"><a href={`/${locale}/${slug}`} style={{ color: 'var(--accent)' }}>{copy.guides[slug].title}</a></h3>
          <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>{copy.guides[slug].description}</p>
          <a className="text-sm underline" href={`/${locale}/${slug}`} style={{ color: 'var(--accent)' }}>{copy.read} →</a>
          </div>
        </article>)}
      </div>
    </div>
  </section>;
}
