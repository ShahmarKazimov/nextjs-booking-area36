import homes from '../../components/data/homes';
import { notFound } from 'next/navigation';
import HomeDetails from '../../components/HomeDetails/HomeDetails';
import { MapPin, Home, UserRound } from 'lucide-react';
import Link from 'next/link';

export function generateStaticParams() {
    return homes.map(home => ({
        slug: home.slug
    }));
}

// Dynamic metadata for each home
export async function generateMetadata({ params }) {
    const { slug } = params;
    const home = homes.find(h => h.slug === slug);

    if (!home) {
        return {
            title: 'Home Not Found | Area36',
            description: 'The requested property could not be found on Area36.'
        };
    }

    return {
        title: `${home.title} - Luxury ${home.type || 'Property'} in ${home.location} | Area36`,
        description: `Book ${home.title} with Area36. ${home.description?.slice(0, 120)}... Located in ${home.location}. Premium accommodation with exceptional amenities.`,
        keywords: [
            'Area36',
            home.title,
            `${home.type || 'luxury property'} ${home.location}`,
            `${home.location} vacation rental`,
            `luxury accommodation ${home.location}`,
            'Area36 booking',
            home.owner && `${home.owner} property`
        ].filter(Boolean),
        openGraph: {
            title: `${home.title} - Premium ${home.type || 'Property'} | Area36`,
            description: `Experience luxury at ${home.title} in ${home.location}. Book this exceptional property with Area36 for an unforgettable stay.`,
            url: `https://area36.az/${slug}`,
            images: home.images?.length > 0 ? [
                {
                    url: home.images[0],
                    width: 1200,
                    height: 630,
                    alt: `${home.title} - luxury property in ${home.location}`,
                }
            ] : [
                {
                    url: '/default-property.jpg',
                    width: 1200,
                    height: 630,
                    alt: `${home.title} - Area36 luxury property`,
                }
            ],
        },
        alternates: {
            canonical: `https://area36.az/${slug}`,
        },
    };
}

export default function HomeDetailPage({ params }) {
    const { slug } = params;
    const home = homes.find(h => h.slug === slug);

    if (!home) return notFound();

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto p-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Home size={24} />
                        {home.title}
                    </h1>
                    <p className="text-lg text-gray-600 flex items-center gap-2">
                        <MapPin size={18} />
                        {home.type && `${home.type} in `}{home.location}
                    </p>
                </div>

                <HomeDetails images={home.images} title={home.title} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="rounded-2xl shadow-sm p-8 mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                About {home.title}
                            </h2>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                {home.description}
                            </p>
                        </div>

                        {home.features && (
                            <div className="rounded-2xl shadow-sm p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">
                                    Property Features
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {home.features.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                            <span className="text-gray-700">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm px-5 py-4 sticky top-8">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Property Details</h3>
                            <div className="mb-[0.6rem]">
                                <div className="flex justify-between py-2 border-b border-gray-100">
                                    <div className="flex items-center gap-1 text-gray-600">
                                        <MapPin size={18} />
                                        <span className="text-gray-600">Location</span>
                                    </div>
                                    <span className="font-medium text-gray-900">{home.location}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-100">
                                    <div className="flex items-center gap-1 text-gray-600">
                                        <UserRound size={18} />
                                        <span className="text-gray-600">Owner</span>
                                    </div>
                                    <span className="font-medium text-gray-900">{home.owner}</span>
                                </div>
                            </div>
                            <Link
                                href="https://wa.me/994552904045?text=Hello, I would like to get more information about this house."
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <button className="cursor-pointer w-full rounded-lg bg-gray-900 py-3.5 px-7 text-sm font-bold uppercase text-white shadow-md hover:shadow-lg transition-all">
                                    Contact
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
