// Central SEO helpers. The site uses `localePrefix: 'always'`, so every real page lives
// under /en or /az. Canonical, hreflang, sitemap and structured-data URLs must point at
// those final URLs (never at a path that redirects).

export const SITE_URL = "https://area36.az";
export const LOCALES = ["en", "az", "ru"];
export const DEFAULT_LOCALE = "en";

export const SOCIAL_LINKS = [
  "https://instagram.com/area36stay",
  "https://tiktok.com/@area36stay",
];

export const CONTACT = {
  phone: "+994552904045",
  email: "info@area36.az",
};

// Google requires a full address for VacationRental rich results.
// Fill these in (e.g. "Nic küçəsi 12", "AZ3600"); empty values are left out of the JSON-LD.
export const ADDRESS = {
  streetAddress: "",
  postalCode: "",
};

export function addressExtras() {
  return Object.fromEntries(Object.entries(ADDRESS).filter(([, v]) => v));
}

// area36-winter-hero.webp is 1600x900
export const OG_IMAGE = {
  url: `${SITE_URL}/images/ui/area36-winter-hero.webp`,
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
      ru: localizedUrl("ru", path),
      "x-default": localizedUrl(DEFAULT_LOCALE, path),
    },
  };
}

/** Pick the text for a locale: pick(locale, { en, az, ru }). Falls back to English. */
export function pick(locale, texts) {
  return texts[locale] ?? texts.en;
}

export function ogLocale(locale) {
  return { az: "az_AZ", ru: "ru_RU" }[locale] || "en_US";
}
