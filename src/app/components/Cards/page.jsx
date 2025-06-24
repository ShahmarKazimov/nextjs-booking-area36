// app/cards/page.jsx
import React from "react";
import Cards from "./allCards/page  ";

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

export default function CardsPage() {
    return <Cards />;
}
