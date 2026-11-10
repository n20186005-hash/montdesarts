'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';

export default function CookieSettingsClient() {
  const t = useTranslations('cookieSettings');
  const ht = useTranslations('header');
  const locale = useLocale();
  const [result, setResult] = useState<'cleared' | 'failed' | null>(null);
  function clearPreferences() {
    try {
      localStorage.removeItem('cookiePrefs');
      localStorage.removeItem('theme');
      if (localStorage.getItem('cookiePrefs') !== null || localStorage.getItem('theme') !== null) throw new Error('Removal not confirmed');
      document.documentElement.removeAttribute('data-theme');
      setResult('cleared');
    } catch { setResult('failed'); }
  }
  return <main className="min-h-screen px-4 py-20"><div className="max-w-3xl mx-auto">
    <a href={`/${locale}`} className="underline" style={{ color: 'var(--accent)' }}>← {ht('backToHome')}</a>
    <h1 className="font-display text-3xl sm:text-4xl font-bold mt-10 mb-5">{t('title')}</h1>
    <p className="leading-relaxed mb-8">{t('description')}</p>
    <button type="button" onClick={clearPreferences} className="rounded-full px-5 py-3 text-white" style={{ background: 'var(--accent)' }}>{t('clear')}</button>
    <p role="status" className="mt-5">{result ? t(result) : ''}</p>
  </div></main>;
}
