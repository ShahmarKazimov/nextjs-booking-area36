import homes from "../components/data/homes";
import guides from "../components/data/guides";
import { SITE_URL, LOCALES, DEFAULT_LOCALE, localizedUrl } from "@/lib/seo";

// Every entry points at the final /en or /az URL (never a redirecting path) and
// carries hreflang alternates, including x-default.
function entry(path, priority, images) {
  const languages = Object.fromEntries(LOCALES.map((l) => [l, localizedUrl(l, path)]));
  languages["x-default"] = localizedUrl(DEFAULT_LOCALE, path);
  return LOCALES.map((locale) => ({
    url: localizedUrl(locale, path),
    changeFrequency: priority >= 0.8 ? "weekly" : "monthly",
    priority,
    alternates: { languages },
    ...(images?.length && { images }),
  }));
}

export default function sitemap() {
  return [
    ...entry("", 1),
    ...homes.flatMap((home) =>
      entry(
        `/${home.slug}`,
        0.8,
        (home.images || []).slice(0, 8).map((img) => `${SITE_URL}${img.split("?")[0]}`)
      )
    ),
    ...entry("/tours-transfers", 0.6),
    ...entry("/guides", 0.6),
    ...guides.flatMap((g) => entry(`/guides/${g.slug}`, 0.6)),
    ...entry("/about", 0.3),
    ...entry("/privacy-policy", 0.3),
  ];
}
