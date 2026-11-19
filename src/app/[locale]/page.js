import homes from "../../components/data/homes";
import { SITE_URL, OG_IMAGE, buildAlternates, localizedUrl, ogLocale } from "@/lib/seo";
import { Suspense } from "react";
import Cards from "../../components/Cards/Cards";
import HeroSection from "../../components/HeroSection/HeroSection";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isAz = locale === "az";

  const title = isAz
    ? "Qəbələdə Villa və Chalet Kirayəsi | Area36"
    : "Villa & Chalet Rentals in Gabala, Azerbaijan | Area36";

  const description = isAz
    ? "Qəbələdə hovuzlu, dağ mənzərəli villa və chalet-lərin günlük kirayəsi. Area36 ilə Royal Chalet, Family Chalet, Golden Loft və digər evləri seçin, WhatsApp ilə rezerv edin."
    : "Book heated-pool villas and mountain-view chalets for rent in Gabala, Azerbaijan. Choose Royal Chalet, Family Chalet, Golden Loft and more with Area36.";

  return {
    title: { absolute: title },
    description,
    alternates: buildAlternates(locale),
    openGraph: {
      type: "website",
      siteName: "Area36",
      title,
      description,
      url: localizedUrl(locale),
      locale: ogLocale(locale),
      images: [
        {
          ...OG_IMAGE,
          alt: isAz ? "Area36 lüks dağ evləri və villalar" : "Area36 luxury chalets and villas in Azerbaijan",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

function getListingPageSchema(locale) {
  const isAz = locale === "az";
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${localizedUrl(locale)}#listings`,
    name: isAz ? "Area36 tərəfindən Lüks Dağ Evləri və Villalar" : "Luxury Chalets & Villas by Area36",
    description: isAz
      ? "Qəbələdə günlük və həftəlik kirayə verilən premium dağ evləri və villaların seçilmiş kolleksiyası."
      : "Curated collection of luxury chalets, cabins and villas available for rent in Azerbaijan.",
    url: localizedUrl(locale),
    publisher: { "@id": `${SITE_URL}/#organization` },
    numberOfItems: homes.length,
    itemListElement: homes.map((home, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: localizedUrl(locale, `/${home.slug}`),
      name: home.title,
    })),
  };
}

export default async function Home({ params }) {
  const { locale } = await params;
  const isAz = locale === "az";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getListingPageSchema(locale)),
        }}
      />

      <div className="flex flex-col">
        <HeroSection />

        <section
          aria-label={isAz ? "Lüks Dağ Evləri və Villalar Kolleksiyası" : "Luxury Chalets and Villas Collection"}
          className="max-w-7xl mx-auto"
        >
          <h2 className="sr-only">
            {isAz ? "Qəbələdə lüks dağ evləri və villalar" : "Luxury Chalets, Cabins and Villas in Azerbaijan"}
          </h2>
          <Suspense fallback={null}>
            <Cards />
          </Suspense>
        </section>
      </div>
    </>
  );
}