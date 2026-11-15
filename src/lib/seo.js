// Central SEO helpers. The site uses `localePrefix: 'always'`, so every real page lives
// under /en or /az. Canonical, hreflang, sitemap and structured-data URLs must point at
// those final URLs (never at a path that redirects).

export const SITE_URL = "https://area36.az";
export const LOCALES = ["en", "az"];
export const DEFAULT_LOCALE = "en";

export const CONTACT = {
  phone: "+994552904045",
  email: "gabaladeluxe@gmail.com",
};

// hero.webp is 1600x900
export const OG_IMAGE = {
  url: `${SITE_URL}/images/ui/hero.webp`,
  width: 1600,
  height: 900,
};

/** Absolute URL of a page: localizedUrl("az", "/about") -> https://area36.az/az/about */
export function localizedUrl(locale, path = "") {
  const clean = !path || path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}/${locale}${clean}`;
}

/** `alternates` object for Next metadata: canonical + hreflang (incl. x-default). */
export function buildAlternates(locale, path = "") {
  return {
    canonical: localizedUrl(locale, path),
    languages: {
      en: localizedUrl("en", path),
      az: localizedUrl("az", path),
      "x-default": localizedUrl(DEFAULT_LOCALE, path),
    },
  };
}

export function ogLocale(locale) {
  return locale === "az" ? "az_AZ" : "en_US";
}
