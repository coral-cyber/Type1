import React from "react";
import HeroAvif from "../../assets/her.avif";
import HeroWebp from "../../assets/her.webp";

function Hero() {
  return (
    <section className="relative h-[30vh] md:h-screen overflow-hidden">
      {/* HERO IMAGE (LCP ELEMENT) */}
      <picture>
        {/* AVIF first */}
        <source type="image/avif" srcSet={HeroAvif} />

        {/* WebP fallback */}
        <source type="image/webp" srcSet={HeroWebp} />

        {/* Required fallback img */}
        <img
          src={HeroWebp}
          alt="Fresh bakery items"
          fetchPriority="high"
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </picture>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 h-full pt-24 md:pt-0 px-4 md:px-16">
        <div className="absolute top-1/2 left-4 md:left-16 -translate-y-1/2 max-w-xs md:max-w-lg text-left space-y-2 md:space-y-6">
          <h1 className="text-lg sm:text-xl pt-10 md:text-6xl font-bold text-white leading-tight">
            Freshly Baked Happiness, Every Single Day
          </h1>

          <p className="text-xs sm:text-sm md:text-xl text-white/90 leading-snug">
            From golden croissants to soft, buttery breads — we bake everything
            fresh using quality ingredients and timeless recipes.
          </p>

          <div className="flex gap-2 md:gap-4 flex-wrap">
            <button className="bg-yellow-500 text-white px-3 py-1 md:px-6 md:py-3 rounded-lg hover:bg-yellow-600 transition">
              View Our Menu
            </button>
            <button className="bg-white text-yellow-500 px-3 py-1 md:px-6 md:py-3 rounded-lg hover:bg-gray-200 transition">
              Find Our Bakery
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
