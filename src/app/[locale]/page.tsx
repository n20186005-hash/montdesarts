import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import WhatIs from '@/components/WhatIs';
import Intro from '@/components/Intro';
import Tickets from '@/components/Tickets';
import GardensViewpoint from '@/components/GardensViewpoint';
import InfoSection from '@/components/InfoSection';
import Essentials from '@/components/Essentials';
import Gallery from '@/components/Gallery';
import Accommodation from '@/components/Accommodation';
import Reviews from '@/components/Reviews';
import MapEmbed from '@/components/MapEmbed';
import Faq from '@/components/Faq';
import Footer from '@/components/Footer';
import { routing, absoluteUrl } from '@/i18n/routing';
import { buildTouristAttraction, buildFaqPage } from '@/lib/site';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = (await import(`@/messages/${locale}.json`)).default;
  const faqItems = (messages?.faq?.items || []) as Array<{ q: string; a: string }>;
  const url = absoluteUrl(locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [buildTouristAttraction(locale, url), buildFaqPage(faqItems)],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <Hero />
        <WhatIs />
        <Intro />
        <Tickets />
        <GardensViewpoint />
        <InfoSection />
        <Essentials />
        <Gallery />
        <Accommodation />
        <Reviews />
        <MapEmbed />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
