import React from 'react';
import { BRAND_PARTNERS } from '../data/healthcareData';
import { SectionHeading } from './SectionHeading';
import { Globe2, ShieldCheck, Award } from 'lucide-react';

export const BrandPartners: React.FC = () => {
  return (
    <section className="py-16 bg-[#F8FAFD] border-y border-[#E4E8EE]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="GLOBAL IMPORTS & BRANDS"
          heading="Accredited Brand & Supply Partners"
          description="Nafisa Traders collaborates with internationally accredited manufacturers and authorized import channels to ensure reliable hospital supply."
          align="center"
          className="mb-12"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {BRAND_PARTNERS.map((brand) => (
            <div
              key={brand.id}
              className="group flex flex-col justify-between items-center rounded-2xl bg-white p-5 text-center border border-[#E4E8EE] shadow-xs hover:border-[#1A73E8]/40 hover:shadow-md transition-all"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F5F9FF] text-[#1A73E8] group-hover:bg-[#1A73E8] group-hover:text-white transition-colors mb-3">
                <Globe2 className="h-6 w-6" />
              </div>

              <div>
                <span className="font-heading text-xs font-extrabold text-[#0B3D78] uppercase tracking-wider block">
                  {brand.logoText}
                </span>
                <span className="text-[10px] font-semibold text-slate-400 block mt-0.5">
                  {brand.country}
                </span>
                <span className="text-[10px] text-[#269653] font-medium block mt-1">
                  {brand.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
