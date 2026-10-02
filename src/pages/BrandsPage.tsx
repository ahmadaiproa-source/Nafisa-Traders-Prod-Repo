import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export interface BrandItem {
  id: string;
  name: string;
  logoUrl: string;
}

export const BRANDS_LIST: BrandItem[] = [
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

export function BrandsPage() {
  return (
    <div className="w-full bg-white min-h-screen">
      
      {/* 1. TOP HERO / INTRODUCTION SECTION */}
      <section className="w-full bg-white pt-12 pb-16 sm:pt-16 sm:pb-20 border-b border-[#E5E7EB]">
        <div className="w-full px-[15px] sm:px-8 lg:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left Column: Heading and Description */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#339719]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#339719] mb-4">
                  <ShieldCheck className="h-4 w-4" />
                  Official Distribution Partners
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-[#06316F] tracking-tight leading-[1.1]">
                  Our Brands
                </h1>
              </div>

              <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed font-light">
                People are becoming more health aware and health conscious. In response, we are expanding our range of products to better accommodate the growing and ever evolving needs.
              </p>

              <div className="pt-2 space-y-3">
                <div className="flex items-center gap-3 text-sm text-[#06316F] font-medium">
                  <CheckCircle2 className="h-5 w-5 text-[#339719] shrink-0" />
                  <span>100% Authorized & DRAP-Compliant Distribution</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#06316F] font-medium">
                  <CheckCircle2 className="h-5 w-5 text-[#339719] shrink-0" />
                  <span>Direct International Manufacturer Agreements</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#06316F] font-medium">
                  <CheckCircle2 className="h-5 w-5 text-[#339719] shrink-0" />
                  <span>Nationwide Sterile Supply & Cold-Chain Logistics</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Brand Showcase Image */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden shadow-xl bg-slate-100 border border-gray-100">
                <img
                  src="https://ik.imagekit.io/sn0ctq5wd/WhatsApp%20Image%202026-09-11%20at%209.11.21%20PM.jpeg"
                  alt="Our Partner Brands"
                  className="w-full h-[320px] sm:h-[400px] lg:h-[440px] object-cover object-center"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. BRANDS GRID SECTION - 5 LOGOS IN A ROW (grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5) */}
      <section className="w-full bg-[#FFFFFF] py-16 sm:py-24">
        <div className="w-full px-[15px] sm:px-8 lg:px-12 max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#06316F]">
              Trusted Global Medical Manufacturers
            </h2>
            <p className="mt-2 text-sm text-[#4B5563]">
              Partnering with internationally accredited healthcare brands to bring world-class clinical products to Pakistani hospitals and clinics.
            </p>
          </div>

          {/* 5 in a Row Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {BRANDS_LIST.map((brand) => (
              <div
                key={brand.id}
                className="group relative flex aspect-square w-full items-center justify-center rounded-2xl border border-[#EAEAEA] bg-white p-4 sm:p-6 text-center shadow-2xs hover:border-[#339719]/50 hover:shadow-lg transition-all duration-300"
              >
                {/* Brand Visual Logo Centered */}
                <div className="w-full h-full flex items-center justify-center p-2">
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

        </div>
      </section>

    </div>
  );
}
