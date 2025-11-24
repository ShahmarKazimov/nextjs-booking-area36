import Carousel from "../components/ui/Carousel/Carousel";
import Cards from "../components/Cards/Cards";
import HeroSection from "../components/HeroSection/HeroSection";

// Homepage specific metadata
export const metadata = {
  title: 'Area36 – Luxury Chalets',
  description: 'Book luxury cabins, exclusive chalets, and premium villas worldwide with Area36. Discover handpicked accommodations with stunning views and world-class amenities for your perfect getaway.',
  keywords: [
    'Area36',
    'Area 36',
    'area 36',
    'area36',
    'Area36 luxury resorts',
    'Area36 villa rental',
    'luxury resorts',
    'vacation rentals',
    'premium cabins',
    'exclusive chalets',
    'luxury villas',
    'luxury travel',
    'premium getaways',
    'luxury stays'
  ],
  openGraph: {
    title: 'Area36 – Book Luxury Resorts & Premium Vacation Rentals',
    description: 'Area36 offers handpicked luxury accommodations worldwide. From mountain chalets to lakeside cabins, find your perfect premium getaway.',
    url: 'https://area36.az',
    images: [
      {
        url: 'https://area36.az/images/ui/area-image-hero.webp',
        width: 1200,
        height: 630,
        alt: 'Area36 luxury chalet',
      },
    ],
  },
};


export default function Home() {
  return (
    <main className="flex flex-col">
      <header>
        <HeroSection />
      </header>

      <section aria-label="Featured Luxury Destinations">
        <Carousel />
      </section>

      <section aria-label="Premium Accommodation Collection" className="max-w-7xl mx-auto">
        <Cards />
      </section>
    </main>
  );
}