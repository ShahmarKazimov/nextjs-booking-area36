import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default async function middleware(request) {
  const { pathname } = request.nextUrl;
  if (pathname === '/' || pathname === '') {
    const url = request.nextUrl.clone();
    url.pathname = '/en';
    return Response.redirect(url);
  }
  return createMiddleware(routing)(request);
}

export const config = {
  // Match only internationalized pathnames and files
  matcher: ['/', '/(az|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
