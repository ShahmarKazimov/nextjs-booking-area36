import React from "react";
import Card from "../singleCard/page";
import homes from "../../../data/homes";

const Cards = () => {
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
                <Card property={property} />
              </li>
            ))}
          </ul>
        </main>
      </div>
    </section>
  );
};

export default Cards;
