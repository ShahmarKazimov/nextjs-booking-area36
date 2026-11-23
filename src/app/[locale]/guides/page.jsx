import { Link } from "@/i18n/routing";
import guides from "@/components/data/guides";
import { buildAlternates, localizedUrl, ogLocale, OG_IMAGE } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isAz = locale === "az";
  const title = isAz ? "Qəbələ Bələdçisi | Area36" : "Gabala Travel Guides | Area36";
  const description = isAz
    ? "Qəbələdə nə etməli, villa necə seçilir və Bakıdan Qəbələyə necə getmək olar: Area36 səyahət bələdçiləri."
    : "What to do in Gabala, how to choose a villa and how to get from Baku to Gabala: Area36 travel guides.";
  return {
    title: { absolute: title },
    description,
    alternates: buildAlternates(locale, "/guides"),
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE.url] },
    openGraph: {
      type: "website",
      siteName: "Area36",
      title,
      description,
      url: localizedUrl(locale, "/guides"),
      locale: ogLocale(locale),
      images: [OG_IMAGE],
    },
  };
}

export default async function GuidesPage({ params }) {
  const { locale } = await params;
  const isAz = locale === "az";

  return (
    <div className="min-h-screen pt-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-[#1c1a17] px-8 py-12 text-white text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            {isAz ? "Qəbələ bələdçisi" : "Gabala travel guides"}
          </h1>
        </div>
        <ul className="p-8 md:p-12 space-y-6">
          {guides.map((g) => {
            const c = g[locale] || g.en;
            return (
              <li key={g.slug}>
                <Link href={`/guides/${g.slug}`} className="block group">
                  <h2 className="text-xl font-bold text-gray-900 group-hover:underline">{c.title}</h2>
                  <p className="text-gray-700 mt-1 leading-relaxed">{c.description}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
