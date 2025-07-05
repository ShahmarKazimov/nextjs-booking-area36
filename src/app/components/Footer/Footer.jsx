import Link from "next/link";
import { socialLinks } from "@/app/data/socialLinks";
import Image from "next/image";

function getCurrentYear() {
    return new Date().getFullYear();
}

export default async function Footer() {
    const currentYear = getCurrentYear();

    // Structured data for SEO
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Area36",
        "description": "Premium travel destinations and adventure experiences worldwide",
        "url": "https://area36.az/",
        "logo": "https://area36.az/images/ui/logo-area.svg",
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+994552904045",
            "contactType": "customer support",
            "email": "info@area36.az"
        },
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Gabala",
            "addressRegion": "Azerbaijan",
            "addressCountry": "AZ"
        },
        "sameAs": [
            "https://facebook.com/area36",
            "https://instagram.com/area36",
            "https://twitter.com/area36",
            "https://youtube.com/area36"
        ]
    }



    return (
        <footer
            className="bg-black text-white border-t border-gray-800 mt-10"
            role="contentinfo"
            aria-label="Site Footer"
        >
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    <div className="lg:col-span-1">
                        <Link
                            href="/"
                            className="flex items-center mb-6 -ml-1.5  group gap-x-2"
                            aria-label="Area36 Home Page"
                            title="Area36 - Premium Travel Destinations"
                        >
                            <Image
                                src="/images/ui/area-logo.svg"
                                alt="Area36 Logo"
                                width={65}
                                height={65}
                                priority
                                className="block"
                            />
                            <div className="text-[2rem] font-bold text-white">
                                A<span className="font-normal">rea<span className="font-medium text-blue-500">36</span></span>
                            </div>
                        </Link>

                        <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                            Find your ideal rental home with Area36. We offer comfortable properties and a smooth renting experience.
                        </p>
                    </div>

                    {/* Contact Us Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
                        <div className="space-y-3 text-sm text-gray-400">
                            <div className="flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                                <Link
                                    href="mailto:info@area36.com"
                                    className="hover:text-blue-400 transition-colors"
                                    aria-label="Email us at info@area36.com"
                                >
                                    info@area36.com
                                </Link>
                            </div>
                            <div className="flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                                <Link
                                    href="tel:+994504271987"
                                    className="hover:text-blue-400 transition-colors"
                                    aria-label="Call us at +994 50 427 19 87"
                                >
                                    +994 (50) 427-19-87
                                </Link>
                            </div>
                            <div className="flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                <span>Gabala, Azerbaijan</span>
                            </div>
                        </div>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Follow Us</h3>
                        <div className="flex space-x-3">
                            {socialLinks.map((social, index) => (
                                <Link
                                    key={index}
                                    href={social.href}
                                    className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    aria-label={`Visit our ${social.name} page`}
                                    title={`Follow us on ${social.name}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {social.icon}
                                </Link>
                            ))}
                        </div>

                        {/* Copyright moved here for better layout */}
                        <div className="text-sm text-gray-400 mt-8">
                            <span>© {currentYear} Area36. All rights reserved.</span>
                        </div>
                    </div>
                </div>
            </div>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData)
                }}
            />
        </footer>
    );
}