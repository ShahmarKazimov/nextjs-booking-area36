import Carousel from "../components/ui/Carousel/Carousel";
import Cards from "../components/Cards/Cards";
import HeroSection from "../components/HeroSection/HeroSection";

export const metadata = {
  title: "Luxury Chalets, Cabins & Villas for Rent in Azerbaijan",
  description:
    "Area36 offers premium chalets, mountain cabins, and luxury villas in Azerbaijan. Browse our curated collection and book your perfect stay in the Qafqaz region.",
  alternates: {
    canonical: "https://area36.az",
  },
  openGraph: {
    title: "Area36 | Luxury Chalets & Villas in Azerbaijan",
    description:
      "Browse and book luxury chalets, mountain cabins, and villas in Azerbaijan. Area36 — premium stays in the Qafqaz region.",
    url: "https://area36.az",
    images: [
      {
        url: "https://area36.az/images/ui/area-image-hero.webp",
        width: 1200,
        height: 630,
        alt: "Area36 luxury chalets and villas in Azerbaijan",
      },
    ],
  },
};

// RealEstateAgent və ya LodgingBusiness — platform üçün daha uyğundur
const listingPageSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": "https://area36.az/#listings",
  name: "Luxury Chalets & Villas by Area36",
  description:
    "Curated collection of luxury chalets, cabins and villas available for rent in Azerbaijan.",
  url: "https://area36.az",
  publisher: {
    "@id": "https://area36.az/#organization",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(listingPageSchema),
        }}
      />

      <div className="flex flex-col">
        {/* HeroSection vizual h1 ehtiva etməlidi — HeroSection komponentini yoxla */}
        <HeroSection />

        <section aria-label="Featured Luxury Destinations">
          <Carousel />
        </section>

        <section
          aria-label="Luxury Chalets and Villas Collection"
          className="max-w-7xl mx-auto"
        >
          {/* sr-only h2 saxla — screen reader + SEO üçün faydalıdır */}
          <h2 className="sr-only">
            Luxury Chalets, Cabins and Villas in Azerbaijan
          </h2>
          <Cards />
        </section>
      </div>
    </>
  );
}