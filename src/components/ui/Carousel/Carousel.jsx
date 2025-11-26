import React from 'react';
import DestinationCarousel from './DestinationCarousel';
import { carouselImages } from '../../data/carouselImages';
import '../../../../src/app/globals.css';
import areaCover2 from "../../../../public/images/ui/transport-first.webp";
import areaCover from "../../../../public/images/ui/transport-second.webp";
import Image from 'next/image';

const Carousel = () => {
  return (
    <div className="flex flex-col">
      {/* Main Content */}
      <main className="relative px-4 lg:px-0" role="main">
        <header className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-black relative">
            Discover Our Top Destinations
          </h2>
        </header>

        <div className="max-w-7xl mx-auto">
          {/* Page Title for Screen Readers */}
          <h1 className="sr-only">Destination Gallery and Featured Areas</h1>

          {/* Destinations Gallery Section */}
          <section
            className="grid grid-cols-2 gap-6 md:gap-4 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 sm:h-auto lg:h-[35rem]"
            aria-label="Destination gallery"
          >
            {/* Main Carousel */}
            <article className="col-span-2 lg:col-span-3 lg:row-span-2 md:col-span-2">
              <h2 className="sr-only">Destination Carousel</h2>
              <DestinationCarousel
                images={carouselImages}
                aria-label="Destination photo carousel"
                className="h-full"
              />
            </article>

            {/* Featured Area 1 */}
            <article className="col-span-1 lg:col-span-2 lg:row-span-1 lg:col-start-4 md:col-span-1">
              <h3 className="sr-only">Area36 Featured Image</h3>
              <figure className="h-full">
                <Image
                  src={areaCover2}
                  alt="Area36 destination - luxury resort view with stunning landscape"
                  className="rounded-xl object-cover w-full h-full"
                  priority={true}
                  placeholder="blur"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 33vw"
                  quality={90}
                />
              </figure>
            </article>

            {/* Featured Area 2 */}
            <article className="col-span-1 lg:col-span-2 lg:row-span-1 lg:col-start-4 md:col-span-1">
              <h3 className="sr-only">Area36 Featured Image</h3>
              <figure className="h-full">
                <Image
                  src={areaCover}
                  alt="Area36 section - exclusive moon suite with romantic atmosphere"
                  className="rounded-xl object-cover w-full h-full"
                  priority={true}
                  placeholder="blur"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 33vw"
                  quality={90}
                />
              </figure>
            </article>
          </section>

        </div>
      </main>
    </div>
  );
};

export default Carousel;