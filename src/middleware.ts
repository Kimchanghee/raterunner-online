import { NextRequest, NextResponse } from 'next/server';

const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect only the bare root. Locale routes carry their language into the root layout;
  // static /about/ and /blog/ paths pass through unchanged.
  if (pathname !== '/') {
    const locale = /^\/(en|ko)(?:\/|$)/.exec(pathname)?.[1];
    if (!locale) return NextResponse.next();
    const headers = new Headers(request.headers);
    headers.set('x-raterunner-locale', locale);
    return NextResponse.next({ request: { headers } });
  }

  // Detect locale
  const acceptLang = request.headers.get('accept-language') || '';
  let locale = defaultLocale;
  if (acceptLang.toLowerCase().includes('ko')) locale = 'ko';
  else if (acceptLang.toLowerCase().includes('en')) locale = 'en';

  return NextResponse.redirect(new URL('/' + locale, request.url));
}

export const config = {
  matcher: ['/', '/en/:path*', '/ko/:path*'],
};