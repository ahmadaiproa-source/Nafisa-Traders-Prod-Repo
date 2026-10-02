import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BrandCardItem {
  id: string;
  name: string;
  logoUrl: string;
}

export const OurBrandsSlider: React.FC = () => {
  const brands: BrandCardItem[] = [
    {
      id: 'eprahm',
      name: 'Eprahm Laboratories',
      logoUrl: 'https://ik.imagekit.io/sn0ctq5wd/Logos/EPRAHM%20LABORATORIES%20LOGO-01.png'
    },
    {
      id: 'otsuka',
      name: 'Otsuka',
      logoUrl: 'https://ik.imagekit.io/sn0ctq5wd/Logos/OTSKA%20LOGO-01.png'
    },
    {
      id: 'lisko',
      name: 'Lisko',
      logoUrl: 'https://ik.imagekit.io/sn0ctq5wd/Logos/LISKO%20LOGO-01.png'
    },
    {
      id: 'safety',
      name: 'Safety',
      logoUrl: 'https://ik.imagekit.io/sn0ctq5wd/Logos/safety%20llogo-01.png'
    },
    {
      id: 'star',
      name: 'Star',
      logoUrl: 'https://ik.imagekit.io/sn0ctq5wd/Logos/star%20logo-01.png'
    },
    {
      id: 'axis',
      name: 'Axis Pharmaceuticals',
      logoUrl: 'https://ik.imagekit.io/sn0ctq5wd/Logos/AXIS%20PHARMACEUTICALS%20LOGO-01.png'
    },
    {
      id: 'and',
      name: 'A&D',
      logoUrl: 'https://ik.imagekit.io/sn0ctq5wd/Logos/A&D%20logo-01.png'
    },
    {
      id: 'amros',
      name: 'Amros',
      logoUrl: 'https://ik.imagekit.io/sn0ctq5wd/Logos/AMROS%20LOGO-01.png'
    },
    {
      id: 'pigeon',
      name: 'Pigeon',
      logoUrl: 'https://ik.imagekit.io/sn0ctq5wd/Logos/pigeon%20logo%20-01.png'
    },
    {
      id: 'fdl',
      name: 'FDL',
      logoUrl: 'https://ik.imagekit.io/sn0ctq5wd/Logos/FDL%20LOGO-01.png'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const itemsPerPage = 4;
  const totalBrands = brands.length;

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? totalBrands - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= totalBrands - 1 ? 0 : prev + 1));
  };

  // Auto-slide effect with smooth continuous transition (pauses when user hovers)
  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 2800);

    return () => clearInterval(timer);
  }, [isHovered, totalBrands]);

  // Generate 4 visible brands taking wrap-around into account
  const visibleBrands = Array.from({ length: itemsPerPage }).map((_, i) => {
    const idx = (currentIndex + i) % totalBrands;
    return { brand: brands[idx], indexKey: `${brands[idx].id}-${idx}-${i}` };
  });

  return (
    <section id="brands" className="w-full py-16 sm:py-20 md:py-24 bg-white border-t border-[#EAEAEA]">
      {/* Full width container with exact 15px left/right padding */}
      <div className="w-full px-[15px]">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl md:text-4xl font-normal text-[#06316F] tracking-tight mb-4">
            Our Brands
          </h2>
          <p className="text-sm md:text-base text-[#555555] leading-relaxed">
            People are becoming more health aware and health conscious. In response, we are expanding our range of products to better accommodate for the growing and ever evolving needs.
          </p>
        </div>

        {/* Carousel Container with 1:1 Aspect Ratio Cards and perfectly centered logos */}
        <div
          className="relative flex items-center justify-between gap-2 sm:gap-4 md:gap-6 w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
        >
          
          {/* Previous Arrow Button */}
          <button
            onClick={prevSlide}
            aria-label="Previous Brands"
            className="flex-shrink-0 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 shadow-sm hover:border-[#339719] hover:text-[#339719] hover:shadow-md transition-all active:scale-95 z-10"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {/* 4 Cards Grid - 1:1 Aspect Ratio (aspect-square), equal height, perfectly centered */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 flex-1 w-full overflow-hidden">
            {visibleBrands.map(({ brand, indexKey }) => (
              <div
                key={indexKey}
                className="group relative flex aspect-square w-full items-center justify-center rounded-2xl border border-[#EAEAEA] bg-white p-4 sm:p-6 lg:p-8 text-center shadow-2xs hover:border-[#339719]/50 hover:shadow-lg transition-all duration-500 ease-in-out"
              >
                {/* Logo Perfectly Centered */}
                <div className="w-full h-full flex items-center justify-center p-2 sm:p-4">
                  <img
                    src={brand.logoUrl}
                    alt={brand.name}
                    className="max-h-full max-w-full object-contain select-none transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Next Arrow Button */}
          <button
            onClick={nextSlide}
            aria-label="Next Brands"
            className="flex-shrink-0 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 shadow-sm hover:border-[#339719] hover:text-[#339719] hover:shadow-md transition-all active:scale-95 z-10"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-8">
          {brands.map((_, dotIdx) => (
            <button
              key={`dot-${dotIdx}`}
              onClick={() => setCurrentIndex(dotIdx)}
              aria-label={`Go to brand slide ${dotIdx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === dotIdx
                  ? 'w-6 bg-[#339719]'
                  : 'w-1.5 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default OurBrandsSlider;
