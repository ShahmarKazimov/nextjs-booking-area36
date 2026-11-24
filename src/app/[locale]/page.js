import homes from "../../components/data/homes";
import { SITE_URL, OG_IMAGE, buildAlternates, localizedUrl, ogLocale, pick } from "@/lib/seo";
import { Suspense } from "react";
import Cards from "../../components/Cards/Cards";
import HeroSection from "../../components/HeroSection/HeroSection";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isAz = locale === "az";

  const title = pick(locale, {
    en: "Villa & Chalet Rentals in Gabala, Azerbaijan | Area36",
    az: "Qəbələdə Villa və Chalet Kirayəsi | Area36",
    ru: "Аренда вилл и шале в Габале, Азербайджан | Area36",
  });

  const description = pick(locale, {
    en: "Book heated-pool villas and mountain-view chalets for rent in Gabala, Azerbaijan. Choose Royal Chalet, Family Chalet, Golden Loft and more with Area36.",
    az: "Qəbələdə hovuzlu, dağ mənzərəli villa və chalet-lərin günlük kirayəsi. Area36 ilə Royal Chalet, Family Chalet, Golden Loft və digər evləri seçin, WhatsApp ilə rezerv edin.",
    ru: "Аренда вилл с подогреваемым бассейном и шале с видом на горы в Габале, Азербайджан. Royal Chalet, Family Chalet, Golden Loft и другие дома Area36. Бронирование онлайн и через WhatsApp.",
  });

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
          alt: pick(locale, {
            en: "Area36 luxury chalets and villas in Azerbaijan",
            az: "Area36 lüks dağ evləri və villalar",
            ru: "Роскошные шале и виллы Area36 в Азербайджане",
          }),
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
    name: pick(locale, {
      en: "Luxury Chalets & Villas by Area36",
      az: "Area36 tərəfindən Lüks Dağ Evləri və Villalar",
      ru: "Роскошные шале и виллы Area36",
    }),
    description: pick(locale, {
      en: "Curated collection of luxury chalets, cabins and villas available for rent in Azerbaijan.",
      az: "Qəbələdə günlük və həftəlik kirayə verilən premium dağ evləri və villaların seçilmiş kolleksiyası.",
      ru: "Подборка роскошных шале, горных домов и вилл в аренду в Габале, Азербайджан.",
    }),
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
          aria-label={pick(locale, { en: "Luxury Chalets and Villas Collection", az: "Lüks Dağ Evləri və Villalar Kolleksiyası", ru: "Коллекция роскошных шале и вилл" })}
          className="max-w-7xl mx-auto w-full"
        >
          <h2 className="sr-only">
            {pick(locale, { en: "Luxury Chalets, Cabins and Villas in Azerbaijan", az: "Qəbələdə lüks dağ evləri və villalar", ru: "Роскошные шале, горные дома и виллы в Габале" })}
          </h2>
          <Suspense fallback={null}>
            <Cards />
          </Suspense>
        </section>
      </div>
    </>
  );
}