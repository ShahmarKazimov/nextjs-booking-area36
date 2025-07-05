import SingleCard from "../Cards/SingleCard/SingleCard";
import homes from "../../data/homes";

export const metadata = {
    title: "Area36",
    description:
        "Discover top-rated properties including Qafqaz Falcon Chalet, Qafqaz Family Chalet, Qafqaz Luxury Chalet and more. Book your dream stay today.",
    keywords:
        "Qafqaz Falcon Chalet, Qafqaz Family Chalet, Qafqaz Luxury Chalet, Qafqaz Milano Deluxe, Qafqaz Modern Harmony, Qafqaz Rolling Bungalow, Qafqaz Royal Chalet, Qafqaz Wooden Chalet, real estate, villas, cabins, rentals, vacation homes",
    openGraph: {
        title: "Area36",
        description:
            "Explore stunning vacation homes like Qafqaz Falcon Chalet, Qafqaz Family Chalet, Qafqaz Luxury Chalet, Qafqaz Milano Deluxe, Qafqaz Modern Harmony, Qafqaz Rolling Bungalow, Qafqaz Royal Chalet, Qafqaz Wooden Chalet in Gabala, Azerbaijan.",
        url: "https://area36.az/",
        siteName: "Area36",
        images: [
            {
                url: "https://area36.az/images/blog/Qafqaz%20Falcon%20Chalet/Qafqaz%20Falcon%20Chalet.jpg",
                alt: "Qafqaz Falcon Chalet",
                width: 1200,
                height: 630,
            },
            {
                url: "https://area36.az/images/blog/Qafqaz%20Family%20Chalet/Qafqaz%20Family%20Chalet-1.jpg",
                alt: "Qafqaz Family Chalet",
                width: 1200,
                height: 630,
            },
            {
                url: "https://area36.az/images/blog/Qafqaz%20Luxury%20Chalet/Qafqaz%20Luxury%20Chalet.jpg",
                alt: "Qafqaz Luxury Chalet",
                width: 1200,
                height: 630,
            },
            {
                url: "https://area36.az/images/blog/Qafqaz%20Milano%20Deluxe/Qafqaz%20Milano%20Deluxe.jpg",
                alt: "Qafqaz Milano Deluxe",
                width: 1200,
                height: 630,
            },
            {
                url: "https://area36.az/images/blog/Qafqaz%20Modern%20Harmony/Qafqaz%20Modern%20Harmony.jpg",
                alt: "Qafqaz Modern Harmony",
                width: 1200,
                height: 630,
            },
            {
                url: "https://area36.az/images/blog/Qafqaz%20Rolling%20Bungalow/Qafqaz%20Rolling%20Bungalow.jpg",
                alt: "Qafqaz Rolling Bungalow",
                width: 1200,
                height: 630,
            },
            {
                url: "https://area36.az/images/blog/Qafqaz%20Royal%20Chalet/Qafqaz%20Royal%20Chalet.jpg",
                alt: "Qafqaz Royal Chalet",
                width: 1200,
                height: 630,
            },
            {
                url: "https://area36.az/images/blog/Qafqaz%20Wooden%20Chalet/Qafqaz%20Wooden%20Chalet.jpg",
                alt: "Qafqaz Wooden Chalet",
                width: 1200,
                height: 630,
            },
        ],
        type: "website",
    },
};

export default function Cards() {
    return (
        <section
            aria-labelledby="featured-properties-title"
            className="px-4 lg:px-0 flex justify-end items-start min-h-screen py-10"
        >
            <div className="max-w-7xl mx-auto w-full">
                <header className="text-center mb-6">
                    <h1
                        id="featured-properties-title"
                        className="text-2xl md:text-3xl font-bold text-black relative"
                    >
                        Our Favorite Homes
                    </h1>
                    <p className="text-gray-600 text-base max-w-2xl mx-auto mt-4">
                        Explore a curated list of premium homes with top-notch amenities,
                        modern interiors, and prime locations. Your dream home is just a
                        click away.
                    </p>
                </header>

                <main>
                    <ul
                        role="list"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {homes.map((property) => (
                            <li key={property.id}>
                                <SingleCard property={property} />
                            </li>
                        ))}
                    </ul>
                </main>
            </div>
        </section>
    );
}
