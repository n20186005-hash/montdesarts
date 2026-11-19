import type { MetadataRoute } from 'next';
import { routing, absoluteUrl } from '@/i18n/routing';
import { GUIDE_SLUGS } from '@/content/nearby';

// Only canonical URLs: https + non-www + locale prefix.
const PATHS = ['', '/history', ...GUIDE_SLUGS.map(slug => `/${slug}`)];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of PATHS) {
    for (const locale of routing.locales) {
      entries.push({
        url: absoluteUrl(locale, path),
        lastModified: new Date(path === '/mont-des-arts-garden' || path === '/mont-des-arts-viewpoint' ? '2026-11-19' : '2026-11-10'),
        changeFrequency: 'monthly',
        priority: path === '' ? (locale === routing.defaultLocale ? 1 : 0.8) : 0.6,
        alternates: {
          languages: Object.fromEntries(routing.locales.map((l) => [l, absoluteUrl(l, path)])),
        },
      });
    }
  }

  return entries;
}
