import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import guides, { GUIDE_HOMES } from "@/components/data/guides";
import homes from "@/components/data/homes";
import { SITE_URL, OG_IMAGE, buildAlternates, localizedUrl, ogLocale } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return ["en", "az"].flatMap((locale) => guides.map((g) => ({ locale, slug: g.slug })));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) return { title: "Not found", robots: { index: false, follow: false } };
  const c = guide[locale] || guide.en;
  return {
    title: { absolute: c.metaTitle },
    description: c.description,
    alternates: buildAlternates(locale, `/guides/${slug}`),
    twitter: { card: "summary_large_image", title: c.metaTitle, description: c.description, images: [OG_IMAGE.url] },
    openGraph: {
      type: "article",
      siteName: "Area36",
      title: c.metaTitle,
      description: c.description,
      url: localizedUrl(locale, `/guides/${slug}`),
      locale: ogLocale(locale),
      images: [OG_IMAGE],
    },
  };
}

export default async function GuidePage({ params }) {
  const { locale, slug } = await params;
  const isAz = locale === "az";
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) return notFound();
  const c = guide[locale] || guide.en;
  const url = localizedUrl(locale, `/guides/${slug}`);

  const featured = GUIDE_HOMES.map((s) => homes.find((h) => h.slug === s)).filter(Boolean);
  const titles = {};
  for (const h of featured) {
    const tHome = await getTranslations({ locale, namespace: `Homes.${h.slug}` });
    titles[h.slug] = tHome("title");
  }

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${url}#article`,
      headline: c.title,
      description: c.description,
      inLanguage: locale,
      mainEntityOfPage: url,
      image: OG_IMAGE.url,
      author: { "@id": `${SITE_URL}/#organization` },
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: isAz ? "Ana səhifə" : "Home", item: localizedUrl(locale) },
        { "@type": "ListItem", position: 2, name: isAz ? "Bələdçi" : "Guides", item: localizedUrl(locale, "/guides") },
        { "@type": "ListItem", position: 3, name: c.title, item: url },
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-12 px-4 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-[#1c1a17] px-8 py-12 text-white text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{c.title}</h1>
        </div>

        <div className="p-8 md:p-12 space-y-8 text-gray-700 leading-relaxed text-lg">
          <p>{c.intro}</p>
          {c.sections.map((s) => (
            <section key={s.h}>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{s.h}</h2>
              <div className="space-y-4">
                {s.p.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </section>
          ))}

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{c.cta}</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {featured.map((h) => (
                <li key={h.slug}>
                  <Link href={`/${h.slug}`} className="block group">
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                      <Image
                        src={h.images[0]}
                        alt={titles[h.slug]}
                        fill
                        sizes="(max-width: 640px) 100vw, 300px"
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <span className="block mt-2 text-base font-semibold text-gray-900 group-hover:underline">
                      {titles[h.slug]}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-base">
              <Link href="/tours-transfers" className="underline">
                {isAz ? "Tur və transferlər" : "Tours & transfers"}
              </Link>
              {" · "}
              <Link href="/guides" className="underline">
                {isAz ? "Bütün bələdçilər" : "All guides"}
              </Link>
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
