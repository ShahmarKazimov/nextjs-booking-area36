import homes from "../../components/data/homes";
import { notFound } from "next/navigation";
import HomeDetails from "../../components/HomeDetails/HomeDetails";
import { MapPin, Home, UserRound } from "lucide-react";
import TransferSelect from "../../components/TransferSelect/TransferSelect";

export function generateStaticParams() {
  return homes.map((home) => ({
    slug: home.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const home = homes.find((h) => h.slug === slug);

  if (!home) {
    return {
      title: "Property Not Found",
      robots: { index: false, follow: false },
    };
  }

  const title = `${home.title} | Luxury ${home.type || "Chalet"} in ${home.location}`;

  const description =
    home.description?.length > 155
      ? `${home.description.slice(0, 152)}...`
      : home.description;

  const image = home.images?.[0]
    ? `https://area36.az${home.images[0]}`
    : "https://area36.az/images/ui/area-image-hero.webp";

  return {
    title,
    description,

    // Keyword siyahısı qısa və məqsədli olmalıdır — keyword stuffing zərərlidir
    keywords: [
      `${home.title}`,
      `${home.location} luxury chalet`,
      `${home.location} villa rental`,
      `luxury accommodation ${home.location} Azerbaijan`,
      "Area36 chalet booking",
    ],

    alternates: {
      canonical: `https://area36.az/${slug}`,
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    openGraph: {
      title: `${title} | Area36`,
      description,
      url: `https://area36.az/${slug}`,
      siteName: "Area36",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${home.title} - Area36`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${title} | Area36`,
      description,
      images: [image],
    },
  };
}

export default async function HomeDetailPage({ params }) {
  const { slug } = await params;
  const home = homes.find((h) => h.slug === slug);

  if (!home) return notFound();

  // Google VacationRental rich results üçün tam schema
  // Mənbə: https://developers.google.com/search/docs/appearance/structured-data/vacation-rental
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "VacationRental",
    "@id": `https://area36.az/${slug}#property`,

    // Required fields
    name: home.title,
    description: home.description,
    url: `https://area36.az/${slug}`,
    image: home.images?.map((img) => `https://area36.az${img}`),

    // identifier — Google tərəfindən tələb olunur
    identifier: slug,

    // address
    address: {
      "@type": "PostalAddress",
      addressLocality: home.location,
      addressRegion: "Qafqaz",
      addressCountry: "AZ",
    },

    // containsPlace — Google rich results üçün vacibdir
    containsPlace: {
      "@type": "Accommodation",
      additionalType: home.type || "Chalet",
      amenityFeature:
        home.features?.map((feature) => ({
          "@type": "LocationFeatureSpecification",
          name: feature,
          value: true,
        })) || [],
    },

    // Şirkətin özü
    brand: {
      "@type": "Brand",
      name: "Area36",
    },

    // publisher bağlantısı — Organization schema ilə əlaqəli
    publisher: {
      "@id": "https://area36.az/#organization",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto p-4">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Home size={24} aria-hidden="true" />
              {home.title}
            </h1>

            <p className="text-lg text-gray-600 flex items-center gap-2">
              <MapPin size={18} aria-hidden="true" />
              <span>
                {home.type && `${home.type} in `}
                {home.location}, Azerbaijan
              </span>
            </p>
          </header>

          {/* HomeDetails komponentinin ilk şəklinə priority əlavə et */}
          <HomeDetails images={home.images} title={home.title} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <section className="lg:col-span-2">
              <article className="rounded-2xl shadow-sm p-8 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  About {home.title}
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {home.description}
                </p>
              </article>

              {home.features && (
                <section className="rounded-2xl shadow-sm p-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Property Features & Amenities
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {home.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <div
                          className="w-2 h-2 bg-blue-500 rounded-full"
                          aria-hidden="true"
                        />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </section>

            <aside className="lg:col-span-1" aria-label="Property Details">
              <div className="bg-white rounded-2xl shadow-sm px-5 py-4 sticky top-8">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Property Details
                </h2>

                <div className="mb-[0.6rem]">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <div className="flex items-center gap-1 text-gray-600">
                      <MapPin size={18} aria-hidden="true" />
                      <span>Location</span>
                    </div>
                    <span className="font-medium text-gray-900">
                      {home.location}, Azerbaijan
                    </span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <div className="flex items-center gap-1 text-gray-600">
                      <UserRound size={18} aria-hidden="true" />
                      <span>Owner</span>
                    </div>
                    <span className="font-medium text-gray-900">
                      {home.owner}
                    </span>
                  </div>
                </div>

                <TransferSelect homeTitle={home.title} />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}