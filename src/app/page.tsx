import { permanentRedirect } from 'next/navigation';

// `/` has one canonical URL: /en. src/middleware.ts handles this in production;
// this file is the fallback for static builds where no middleware runs.
export default function RootPage() {
  permanentRedirect('/en');
}
