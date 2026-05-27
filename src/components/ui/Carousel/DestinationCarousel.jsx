"use client";
import React from 'react';
import { Carousel } from 'antd';
import Image from 'next/image';
import { useRouter } from '@/i18n/routing';
import homes from '../../data/homes';
import { useTranslations } from 'next-intl';

const DestinationCarousel = ({ images }) => {
    const router = useRouter();
    const t = useTranslations('Carousel');

    return (
        <section className="rounded-2xl" aria-label={t('featuredDestinationsAria')}>
            {/* Beautiful Carousel Container */}
            <div>
                <div className="relative rounded-3xl overflow-hidden">
                    {/* Decorative Background Pattern */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-y-16 translate-x-16 opacity-30" aria-hidden="true"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-100 to-yellow-100 rounded-full translate-y-12 -translate-x-12 opacity-30" aria-hidden="true"></div>
                    <Carousel
                        autoplay
                        autoplaySpeed={4000}
                        speed={800}
                        effect="fade"
                        accessibility={true}
                        aria-label={t('travelDestinationsAria')}
                    >
                        {images.map((item, index) => {
                            const title = item.key ? t(`items.${item.key}.title`) : item.title;
                            const description = item.key ? t(`items.${item.key}.description`) : item.description;
                            const badge = item.key ? t(`items.${item.key}.badge`) : item.badge;
                            const alt = item.key ? t(`items.${item.key}.alt`) : item.alt;
                            const location = item.key ? t(`items.${item.key}.location`) : item.location;

                            return (
                                <div key={index}>
                                    <article className="relative w-full rounded-xl overflow-hidden group shadow-lg">
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={item.src}
                                                alt={alt}
                                                className="object-cover sm:h-[35rem] transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                quality={100}
                                            />
                                        </div>

                                        {/* Image Overlays */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" aria-hidden="true"></div>
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10" aria-hidden="true"></div>

                                        {/* Top Badges */}
                                        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                                            {/* Category Badge */}
                                            <div className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-800 shadow-lg">
                                                <span aria-label={t('categoryAria', { badge })}>{badge}</span>
                                            </div>

                                            {/* Location Badge */}
                                            <div className="px-3 py-1 bg-black/40 backdrop-blur-sm rounded-full text-xs font-medium text-white shadow-lg">
                                                📌 {location}
                                            </div>
                                        </div>

                                        {/* Content Overlay */}
                                        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6 text-white">
                                            <div className="space-y-1">
                                                <h3 className="text-lg sm:text-3xl font-bold drop-shadow-lg leading-tight">
                                                    {title}
                                                </h3>
                                                <p className="text-xs sm:text-base opacity-90 drop-shadow-md line-clamp-2">
                                                    {description}
                                                </p>
                                                <button
                                                    onClick={() => {
                                                        const home = homes.find(h => (item.slug && h.slug === item.slug) || h.title === item.title);
                                                        if (home) router.push(`/${home.slug}`);
                                                    }}
                                                    className="sm:mt-4 mt-1 px-3 sm:px-6 py-1 sm:py-2.5 cursor-pointer bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white text-xs sm:text-sm font-medium transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                                                    aria-label={t('exploreAria', { title })}
                                                    type="button"
                                                >
                                                    {t('exploreNow')}
                                                </button>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            );
                        })}
                    </Carousel>
                </div>
            </div>
            <style jsx>{`
                :global(.custom-dots) {
                    bottom: -40px !important;
                }
                
                :global(.custom-dots li button) {
                    width: 14px !important;
                    height: 14px !important;
                    border-radius: 50% !important;
                    background: rgba(255, 255, 255, 0.4) !important;
                    border: 2px solid transparent !important;
                    transition: all 0.3s ease !important;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
                }
                
                :global(.custom-dots li.slick-active button) {
                    background: linear-gradient(45deg, #3b82f6, #8b5cf6) !important;
                    border-color: #ffffff !important;
                    transform: scale(1.3) !important;
                    box-shadow: 0 4px 8px rgba(59, 130, 246, 0.4) !important;
                }
                
                :global(.custom-dots li:hover button) {
                    background: rgba(255, 255, 255, 0.7) !important;
                    transform: scale(1.15) !important;
                    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15) !important;
                }
            `}
            </style>
        </section>
    );
};

export default DestinationCarousel;