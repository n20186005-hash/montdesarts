import type { MetadataRoute } from 'next';
import { routing, absoluteUrl } from '@/i18n/routing';

// Only canonical URLs: https + non-www + locale prefix.
const PATHS = ['', '/history'];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-10-01');
  const entries: MetadataRoute.Sitemap = [];

  for (const path of PATHS) {
    for (const locale of routing.locales) {
      entries.push({
        url: absoluteUrl(locale, path),
        lastModified,
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
