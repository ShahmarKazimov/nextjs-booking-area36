import homes from "../components/data/homes";
import { LOCALES, DEFAULT_LOCALE, localizedUrl } from "@/lib/seo";

// Every entry points at the final /en or /az URL (never a redirecting path) and
// carries hreflang alternates, including x-default.
function entry(path, priority) {
  const languages = Object.fromEntries(LOCALES.map((l) => [l, localizedUrl(l, path)]));
  languages["x-default"] = localizedUrl(DEFAULT_LOCALE, path);
  return LOCALES.map((locale) => ({
    url: localizedUrl(locale, path),
    lastModified: BUILD_DATE,
    changeFrequency: priority >= 0.8 ? "weekly" : "monthly",
    priority,
    alternates: { languages },
  }));
}

const BUILD_DATE = new Date();

export default function sitemap() {
  return [
    ...entry("", 1),
    ...homes.flatMap((home) => entry(`/${home.slug}`, 0.8)),
    ...entry("/tours-transfers", 0.6),
    ...entry("/about", 0.3),
    ...entry("/privacy-policy", 0.3),
  ];
}
