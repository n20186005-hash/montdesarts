import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen flex items-end pb-16 sm:pb-24 overflow-hidden">
      {/* Background image - Mont des Arts */}
      <div className="absolute inset-0">
        <img
          src="/gallery/mont-des-arts-brussels-panorama.jpg"
          alt="Mont des Arts panoramic viewpoint over Brussels"
          className="w-full h-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0" style={{ background: 'var(--hero-overlay)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="max-w-3xl">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-2 animate-fade-in-up">
            {t('title')}
          </h1>
          <p className="text-base sm:text-lg text-white/90 mb-2 animate-fade-in-up animation-delay-100 font-medium">
            {t('location')}
          </p>
          <p className="text-base sm:text-xl text-white/75 mb-6 animate-fade-in-up animation-delay-100 font-light">
            {t('subtitle')}
          </p>

          {/* Meta row — the practical facts a mobile visitor needs first */}
          <div className="flex flex-wrap items-center gap-3 mb-4 animate-fade-in-up animation-delay-200">
            <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#f0b429" stroke="none">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span className="text-white text-sm font-medium">{t('rating')}</span>
              <span className="text-white/60 text-xs">{t('reviewCount')}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="text-white text-sm">{t('hours')}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M20 12v9H4v-9" />
                <path d="M2 7h20v5H2z" />
                <path d="M12 7v14" />
              </svg>
              <span className="text-white text-sm">{t('freeEntry')}</span>
            </div>
          </div>

          <p className="text-white/80 text-sm sm:text-base mb-6 animate-fade-in-up animation-delay-200">
            {t('tags')}
          </p>

          <div className="flex flex-wrap items-center gap-3 animate-fade-in-up animation-delay-200">
            <a
              href="https://maps.app.goo.gl/cCCbQsPnaB1Vrnqp9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-white/90 transition-colors"
              style={{ color: 'var(--accent)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {t('openMaps')}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" opacity="0.5">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}
