import React from 'react';
import { MILESTONES } from '../data/healthcareData';
import { SectionHeading } from './SectionHeading';
import { Calendar, CheckCircle2, Award, Building2, TrendingUp } from 'lucide-react';

export const Milestones: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="w-full px-[15px]">
        <SectionHeading
          eyebrow="JOURNEY & LEGACY"
          heading="Our Growth & Milestones"
          description="From our inception at Densohall Wholesale Medicine Market in 2010 to becoming a nationwide pharmaceutical and surgical supply partner."
          align="center"
          className="mb-14"
        />

        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#E5E7EB] -translate-x-1/2" />

          <div className="space-y-8 sm:space-y-12">
            {MILESTONES.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={item.year}
                  className={`relative flex flex-col lg:flex-row items-center ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content Card */}
                  <div className="w-full lg:w-1/2 px-0 lg:px-8">
                    <div className="rounded-2xl bg-[#F8FAFD] p-6 sm:p-8 border border-[#E5E7EB] shadow-xs hover:border-[#339719]/40 transition-all">
                      <div className="flex items-center justify-between mb-3">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#339719]/10 px-3 py-1 text-xs font-bold text-[#339719]">
                          <Calendar className="h-3.5 w-3.5" />
                          {item.year}
                        </span>

                        {item.badge && (
                          <span className="text-[11px] font-semibold text-[#339719] bg-emerald-50 px-2.5 py-0.5 rounded-md">
                            {item.badge}
                          </span>
                        )}
                      </div>

                      <h3 className="font-heading text-lg sm:text-xl font-bold text-[#06316F]">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Node Icon */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 h-10 w-10 items-center justify-center rounded-full bg-[#06316F] text-white ring-4 ring-white shadow-md z-10">
                    <CheckCircle2 className="h-5 w-5 text-[#339719]" />
                  </div>

                  {/* Empty Spacer for Layout Balance */}
                  <div className="hidden lg:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
