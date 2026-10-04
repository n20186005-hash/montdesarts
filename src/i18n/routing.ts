import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'fr', 'nl', 'zh'],
  defaultLocale: 'en',
  // Every locale lives under an explicit prefix: /en /fr /nl /zh.
  // The bare `/` is permanently redirected to /en by src/middleware.ts.
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/history': '/history',
    '/privacy-policy': '/privacy-policy',
    '/terms-of-service': '/terms-of-service',
    '/cookie-settings': '/cookie-settings',
  },
});

export type Locale = (typeof routing.locales)[number];

export const SITE_URL = 'https://montdesarts.org';

/** Canonical, non-www, locale-prefixed URL for a given path. */
export function absoluteUrl(locale: string, path: string = ''): string {
  const clean = path === '' || path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}/${locale}${clean}`;
}

/** hreflang map (including x-default) for a given path. */
export function languageAlternates(path: string = ''): Record<string, string> {
  const alternates: Record<string, string> = {};
  for (const locale of routing.locales) {
    alternates[locale] = absoluteUrl(locale, path);
  }
  alternates['x-default'] = absoluteUrl(routing.defaultLocale, path);
  return alternates;
}
