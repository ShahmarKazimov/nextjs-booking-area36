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
        url: "https://yourdomain.com/", // TODO: After deployment, update this URL
        siteName: "Area36",
        images: [
            {
                url: "http://localhost:3000/images/blog/Qafqaz%20Falcon%20Chalet/Qafqaz%20Falcon%20Chalet.jpg",
                alt: "Qafqaz Falcon Chalet"
            },
            {
                url: "http://localhost:3000/images/blog/Qafqaz%20Family%20Chalet/Qafqaz%20Family%20Chalet-1.jpg",
                alt: "Qafqaz Family Chalet"
            },
            {
                url: "http://localhost:3000/images/blog/Qafqaz%20Luxury%20Chalet/Qafqaz%20Luxury%20Chalet.jpg",
                alt: "Qafqaz Luxury Chalet"
            },
            {
                url: "http://localhost:3000/images/blog/Qafqaz%20Milano%20Deluxe/Qafqaz%20Milano%20Deluxe.jpg",
                alt: "Qafqaz Milano Deluxe"
            },
            {
                url: "http://localhost:3000/images/blog/Qafqaz%20Modern%20Harmony/Qafqaz%20Modern%20Harmony.jpg",
                alt: "Qafqaz Modern Harmony"
            },
            {
                url: "http://localhost:3000/images/blog/Qafqaz%20Rolling%20Bungalow/Qafqaz%20Rolling%20Bungalow.jpg",
                alt: "Qafqaz Rolling Bungalow"
            },
            {
                url: "http://localhost:3000/images/blog/Qafqaz%20Royal%20Chalet/Qafqaz%20Royal%20Chalet.jpg",
                alt: "Qafqaz Royal Chalet"
            },
            {
                url: "http://localhost:3000/images/blog/Qafqaz%20Wooden%20Chalet/Qafqaz%20Wooden%20Chalet.jpg",
                alt: "Qafqaz Wooden Chalet"
            }
        ],
        type: "website"
    }
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
                        Featured Properties
                    </h1>
                    <p className="text-gray-600 text-base max-w-2xl mx-auto mt-4">
                        Explore a curated list of premium homes with top-notch amenities, modern interiors,
                        and prime locations. Your dream home is just a click away.
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
    )
}
