import Image from 'next/image';
import { heroBackgroundImage } from '../data/carouselImages';
import { Suspense } from 'react';
import { useTranslations } from 'next-intl';
import HeroSearch from './HeroSearch';
import HeroGarland from '../Winter/HeroGarland';
import { isWinter } from '@/config/winterEffects';

const HeroSection = () => {
    const t = useTranslations('Hero');

    return (
        <section
            className="relative sm:-mt-[5.1rem] max-sm:-mt-[9rem] left-0 w-full h-[660px] sm:h-[737px] z-20 bg-black"
            aria-label="Luxury villas and chalets in Gabala"        >
            <div
                className="relative w-full h-full sm:h-[735px] bg-black"
                style={{ backgroundColor: '#000000' }}
            >
                <Image
                    src={heroBackgroundImage}
                    alt="Luxury chalets and villas in Gabala, Azerbaijan — Area36"
                    fill
                    priority
                    className="object-cover max-sm:object-[10%_50%] brightness-50"
                    sizes="100vw"
                    quality={85}
                    style={{ backgroundColor: '#000000' }}
                />
            </div>

            {/* Multi-layer Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" aria-hidden="true" />

            {/* Winter accent: soft warm-white glow along the bottom edge */}
            {isWinter('accents') && (
                <div
                    className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse 60% 100% at 50% 100%, rgba(255,236,200,0.14), transparent 70%)' }}
                    aria-hidden="true"
                />
            )}

            <HeroGarland />

            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-float-slow" />
                <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/30 rounded-full animate-float-medium" />
                <div className="absolute bottom-1/4 left-1/5 w-1.5 h-1.5 bg-white/25 rounded-full animate-float-fast" />
            </div>

            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10">
                <div className="text-center sm:mt-20 space-y-4 sm:space-y-6 max-w-4xl w-full px-4">
                    <h1 className="text-3xl sm:text-6xl font-bold mb-2 sm:mb-6 drop-shadow-2xl animate-fade-in-up">
                        {/* SEO üçün açar söz-yönümlü mətn — vizual olaraq görünmür, Google və screen reader oxuyur */}
                        <span className="sr-only">{t('seoTitle')}</span>

                        {/* Vizual brendinq mətni — dizaynı qoruyur */}
                        <span
                            className="text-white"
                            aria-hidden="true"
                        >
                            {t('welcome')}
                        </span>
                    </h1>

                    <p className="text-base max-w-2xl mx-auto sm:text-2xl drop-shadow-lg opacity-90 animate-fade-in-up animation-delay-300">
                        {t('subtitle')}
                    </p>

                    <div className="sm:pt-4 max-sm:absolute max-sm:inset-x-4 max-sm:bottom-12 animate-fade-in-up animation-delay-300">
                        <Suspense fallback={null}>
                            <HeroSearch />
                        </Suspense>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HeroSection;