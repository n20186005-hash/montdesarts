import copy from './nearby.json';

export const GUIDE_SLUGS = ['kbr-museum', 'bozar', 'magritte-museum', 'musical-instruments-museum'] as const;
export type GuideSlug = typeof GUIDE_SLUGS[number];
export type Guide = { title: string; description: string; intro: string; sections: { title: string; body: string; source: number }[] };
export type NearbyCopy = { heading: string; intro: string; read: string; sources: string; checked: string; related: string; back: string; notice: string; guides: Record<GuideSlug, Guide> };
export function nearbyCopy(locale: string): NearbyCopy { return copy[locale as keyof typeof copy] ?? copy.en; }
export const GUIDE_SOURCES: Record<GuideSlug, { label: string; url: string }[]> = {
  'kbr-museum': [
    { label: 'Visit Brussels · Museum Mile', url: 'https://visit.brussels/en/visitors/plan-your-trip/brussels-museum-mile' },
    { label: 'KBR · Plan your visit', url: 'https://www.kbr.be/en/plan-your-visit/' },
    { label: 'KBR · Museum visitor information', url: 'https://www.kbr.be/en/kbr-museum-good-to-know/' },
  ],
  bozar: [
    { label: 'Visit Brussels · Museum Mile', url: 'https://visit.brussels/en/visitors/plan-your-trip/brussels-museum-mile' },
    { label: 'Bozar · Opening hours and addresses', url: 'https://www.bozar.be/en/opening-hours' },
    { label: 'Bozar · Your visit', url: 'https://www.bozar.be/en/your-visit' },
  ],
  'magritte-museum': [
    { label: 'Visit Brussels · Museum Mile', url: 'https://visit.brussels/en/visitors/plan-your-trip/brussels-museum-mile' },
    { label: 'Royal Museums · Opening hours and entrances', url: 'https://fine-arts-museum.be/en/visit/planning-my-visit/opening-hours' },
    { label: 'Royal Museums · Musée Magritte Museum', url: 'https://fine-arts-museum.be/en/museums/musee-magritte-museum' },
  ],
  'musical-instruments-museum': [
    { label: 'MIM · The building', url: 'https://www.mim.be/en/building' },
    { label: 'MIM · Opening hours', url: 'https://www.mim.be/en/opening-hours' },
    { label: 'MIM · Accessibility and location', url: 'https://www.mim.be/en/accessibility-and-location' },
    { label: 'Visit Brussels · Museum Mile', url: 'https://visit.brussels/en/visitors/plan-your-trip/brussels-museum-mile' },
  ],
};
