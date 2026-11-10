import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import CookieSettingsClient from './CookieSettingsClient';
import { routing, absoluteUrl, languageAlternates } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!routing.locales.includes(locale as typeof routing.locales[number])) notFound();
  const messages = (await import(`@/messages/${locale}.json`)).default;

  return {
    title: messages.cookieSettings.title + ' · Mont des Arts',
    description: messages.cookieSettings.title + ' · Mont des Arts Travel Guide',
    openGraph: { title: messages.cookieSettings.title + ' · Mont des Arts', description: messages.cookieSettings.title + ' · Mont des Arts Travel Guide' },
    twitter: { title: messages.cookieSettings.title + ' · Mont des Arts', description: messages.cookieSettings.title + ' · Mont des Arts Travel Guide' },
    robots: { index: false, follow: true },
    alternates: {
      canonical: absoluteUrl(locale, '/cookie-settings'),
      languages: languageAlternates('/cookie-settings'),
    },
  };
}

export default async function CookiePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as typeof routing.locales[number])) notFound();
  setRequestLocale(locale);
  return <CookieSettingsClient />;
}
