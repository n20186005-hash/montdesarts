import { ATTRACTION } from '@/lib/site';
import { nearbyCopy } from '@/content/nearby';

export default function Sources({ locale }: { locale: string }) {
  const copy = nearbyCopy(locale);
  return <section className="section-padding"><div className="max-w-4xl mx-auto">
    <h2 className="font-display text-xl font-semibold mb-4">{copy.sources}</h2>
    <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>{copy.checked}</p>
    <ul className="space-y-3">{ATTRACTION.officialSources.map(source => <li key={source.url}>
      <a href={source.url} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: 'var(--accent)' }}>{source.label} ↗</a>
    </li>)}<li><a href={ATTRACTION.mapsUrl} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: 'var(--accent)' }}>Google Maps · Mont des Arts</a></li>
    <li><a href="https://www.google.com/maps/search/?api=1&query=Jardin+du+Mont+des+Arts+Brussels" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: 'var(--accent)' }}>Google Maps · Jardin du Mont des Arts</a></li></ul>
  </div></section>;
}
