import { NextResponse, type NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const CANONICAL_HOST = 'montdesarts.org';
const LEGACY_HOSTS = [`www.${CANONICAL_HOST}`];

const intlMiddleware = createIntlMiddleware(routing);

export default function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const host = (request.headers.get('host') || '').toLowerCase().split(':')[0];
  const proto = (request.headers.get('x-forwarded-proto') || url.protocol.replace(':', '')).toLowerCase();

  // 1) Force the canonical host: www -> apex (308, permanent)
  if (LEGACY_HOSTS.includes(host)) {
    const target = new URL(`https://${CANONICAL_HOST}${url.pathname}${url.search}`);
    return NextResponse.redirect(target, 308);
  }

  // 2) Force HTTPS (308, permanent). Cloudflare sends x-forwarded-proto.
  if (host === CANONICAL_HOST && proto === 'http') {
    const target = new URL(`https://${CANONICAL_HOST}${url.pathname}${url.search}`);
    return NextResponse.redirect(target, 308);
  }

  // 3) The homepage has exactly one canonical URL: /en
  if (url.pathname === '/') {
    const target = new URL(`/en${url.search}`, request.url);
    return NextResponse.redirect(target, 308);
  }

  return intlMiddleware(request);
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
