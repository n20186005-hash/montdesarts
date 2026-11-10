'use client';

import { useTranslations, useMessages } from 'next-intl';
import { useState, useEffect, useRef } from 'react';

const photoFiles = [
  'mont-des-arts-brussels-panorama.jpg',
  'mont-des-arts-terraced-gardens.jpg',
  'mont-des-arts-central-fountain.jpg',
  'mont-des-arts-upper-plaza-viewpoint.jpg',
  'mont-des-arts-golden-hour.jpg',
  'mont-des-arts-neoclassical-architecture.jpg',
  'mont-des-arts-kbr-royal-library.jpg',
  'mont-des-arts-bozar-brussels.jpg',
  'mont-des-arts-brussels-skyline.jpg',
  'mont-des-arts-gardens-rooftops.jpg',
  'mont-des-arts-square-at-night.jpg',
];

const fallbackAlts = [
  "Formal garden beds and clipped hedges beside a central path, with city buildings in the distance.",
  "An equestrian statue on a pedestal in a paved plaza beside large buildings.",
  "A long formal garden seen at sunset, with patterned flowerbeds and buildings along both sides.",
  "People walk beneath a leafy arch between buildings, with rooftops visible beyond.",
  "A vaulted covered passage with colorful graffiti along both walls.",
  "Round fountain basins beside a tree-lined path and trimmed hedges.",
  "A paved plaza with a low stone monument, trees, and a light-colored building.",
  "A stone structure on a paved terrace, with rooftops and buildings in the distance.",
  "Leafy trees above trimmed hedges and flowerbeds, with round fountain basins below.",
  "An illuminated clock, sculpted figures, and bells on a building facade at night.",
  "A formal garden path and flowerbeds illuminated at night, with buildings beyond."
];

export default function Gallery() {
  const t = useTranslations('gallery');
  const messages = useMessages() as { gallery?: { alts?: string[] } };
  const photos = photoFiles.map((file, index) => ({ src: `/gallery/${file}`, alt: messages.gallery?.alts?.[index] || fallbackAlts[index] }));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const change = (amount: number) => setCurrentIndex(index => (index + amount + photos.length) % photos.length);

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (open) {
      element.showModal();
      closeButton.current?.focus();
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = previousOverflow; };
    }
    if (element.open) element.close();
    trigger.current?.focus();
  }, [open]);

  return <>
    <section id="gallery" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-3">{t('title')}</h2>
        <p className="mb-8" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {photos.map((photo, index) => <button type="button" key={photo.src}
            className="gallery-item rounded-lg overflow-hidden text-left focus-visible:outline-4 focus-visible:outline-offset-4"
            aria-label={`${t('open')}: ${photo.alt}`} aria-haspopup="dialog"
            onClick={event => { trigger.current = event.currentTarget; setCurrentIndex(index); setOpen(true); }}>
            <img src={photo.src} alt={photo.alt} className="w-full h-44 sm:h-56 object-cover" loading="lazy" />
            <span className="block text-xs p-3" style={{ color: 'var(--text-secondary)' }}>{photo.alt}</span>
          </button>)}
        </div>
        <p className="text-center mt-6"><a href="https://maps.app.goo.gl/cCCbQsPnaB1Vrnqp9" target="_blank" rel="noopener noreferrer" className="text-sm underline" style={{ color: 'var(--accent)' }}>{t('viewAll')}</a></p>
      </div>
    </section>
    <dialog ref={dialog} aria-label={t('title')} className="photo-dialog rounded-xl p-0 bg-black text-white backdrop:bg-black/85"
      onCancel={event => { event.preventDefault(); setOpen(false); }}
      onClick={event => { if (event.target === event.currentTarget) setOpen(false); }}
      onKeyDown={event => { if (event.key === 'ArrowLeft') { event.preventDefault(); change(-1); } if (event.key === 'ArrowRight') { event.preventDefault(); change(1); } }}>
      <div className="p-3 sm:p-5">
        <div className="flex justify-between items-center gap-3 mb-3">
          <p aria-live="polite" className="text-sm">{currentIndex + 1} / {photos.length}</p>
          <button ref={closeButton} type="button" className="px-4 py-3 rounded bg-white/20" onClick={() => setOpen(false)}>{t('close')}</button>
        </div>
        <img src={photos[currentIndex].src} alt={photos[currentIndex].alt} className="max-w-full max-h-[65vh] object-contain mx-auto" />
        <p className="text-sm text-center mt-3">{photos[currentIndex].alt}</p>
        <div className="flex justify-between gap-3 mt-4">
          <button type="button" onClick={() => change(-1)} className="rounded px-4 py-3 bg-white/20">← {t('previous')}</button>
          <button type="button" onClick={() => change(1)} className="rounded px-4 py-3 bg-white/20">{t('next')} →</button>
        </div>
      </div>
    </dialog>
  </>;
}
