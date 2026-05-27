import Carousel from "../../components/ui/Carousel/Carousel";
import Cards from "../../components/Cards/Cards";
import HeroSection from "../../components/HeroSection/HeroSection";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isAz = locale === "az";

  const title = isAz
    ? "Area36 | Qafqaz Villaları  "
    : "Area36 | Villas in Caucasus";

  const description = isAz
    ? "Qəbələdə hovuz, sauna, kamin və möhtəşəm dağ mənzərələri ilə təchiz olunmuş premium dağ evləri və villaların ən böyük kolleksiyası."
    : "Area36 offers premium chalets, mountain cabins, and luxury villas in Azerbaijan. Browse our curated collection and book your perfect stay in the Qafqaz region.";

  const canonicalUrl = isAz ? "https://area36.az/az" : "https://area36.az";

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: "https://area36.az",
        az: "https://area36.az/az",
      },
    },
    openGraph: {
      title: `${title} | Area36`,
      description,
      url: canonicalUrl,
      images: [
        {
          url: "https://area36.az/images/ui/area-image-hero.webp",
          width: 1200,
          height: 630,
          alt: isAz ? "Area36 lüks dağ evləri və villalar" : "Area36 luxury chalets and villas in Azerbaijan",
        },
      ],
    },
  };
}

function getListingPageSchema(locale) {
  const isAz = locale === "az";
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": "https://area36.az/#listings",
    name: isAz ? "Area36 tərəfindən Lüks Dağ Evləri və Villalar" : "Luxury Chalets & Villas by Area36",
    description: isAz
      ? "Qəbələdə günlük və həftəlik kirayə verilən premium dağ evləri və villaların seçilmiş kolleksiyası."
      : "Curated collection of luxury chalets, cabins and villas available for rent in Azerbaijan.",
    url: isAz ? "https://area36.az/az" : "https://area36.az",
    publisher: {
      "@id": "https://area36.az/#organization",
    },
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

        <section aria-label="Featured Luxury Destinations">
          <Carousel />
        </section>

        <section
          aria-label="Luxury Chalets and Villas Collection"
          className="max-w-7xl mx-auto"
        >
          <h2 className="sr-only">
            {isAz ? "Qəbələdə lüks dağ evləri və villalar" : "Luxury Chalets, Cabins and Villas in Azerbaijan"}
          </h2>
          <Cards />
        </section>
      </div>
    </>
  );
}