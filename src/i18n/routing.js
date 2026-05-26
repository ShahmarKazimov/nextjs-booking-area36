import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'az'],
  defaultLocale: 'en',
  localePrefix: 'always' // Always include locale prefix, e.g., /en and /az
});

export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
