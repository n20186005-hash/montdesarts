'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState, useEffect, useRef } from 'react';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const t = useTranslations('header');
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const prefix = `/${locale}`;
  const links = [
    ['gallery', `${prefix}#gallery`], ['nearby', `${prefix}#nearby`],
    ['reviews', `${prefix}#reviews`], ['map', `${prefix}#map`], ['history', `${prefix}/history`],
  ];
  useEffect(() => {
    function escape(event: KeyboardEvent) { if (event.key === 'Escape' && open) { setOpen(false); button.current?.focus(); } }
    document.addEventListener('keydown', escape);
    return () => document.removeEventListener('keydown', escape);
  }, [open]);
  return <header className="fixed top-0 left-0 right-0 z-40" style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
    <div className="max-w-6xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2">
      <a href={prefix} className="font-display text-base sm:text-lg font-semibold">Mont des Arts</a>
      <nav className="hidden lg:flex items-center gap-5" aria-label={t('menu')}>
        {links.map(([key, href]) => <a key={key} href={href} className="text-sm hover:underline">{t(key)}</a>)}
      </nav>
      <div className="flex items-center gap-1">
        <ThemeToggle /><LanguageToggle />
        <button ref={button} type="button" className="lg:hidden text-sm p-2 rounded" style={{ background: 'var(--tag-bg)' }} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{t('menu')}</button>
      </div>
    </div>
    {open && <nav id="mobile-navigation" className="lg:hidden px-4 pb-5 grid gap-1" aria-label={t('menu')}>
      {links.map(([key, href]) => <a key={key} href={href} onClick={() => setOpen(false)} className="py-3 border-b" style={{ borderColor: 'var(--border-color)' }}>{t(key)}</a>)}
    </nav>}
  </header>;
}
