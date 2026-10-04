import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig = {
  // Required by @opennextjs/cloudflare when deploying to Cloudflare Workers;
  // harmless for `next start` and other targets.
  output: 'standalone' as const,
  images: {
    remotePatterns: [{ protocol: 'https' as const, hostname: 'images.unsplash.com' }],
  },
};

export default withNextIntl(nextConfig);
