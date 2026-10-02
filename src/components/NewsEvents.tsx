import React from 'react';
import { EVENTS_NEWS } from '../data/healthcareData';
import { SectionHeading } from './SectionHeading';
import { Calendar, MapPin, ArrowRight, FileCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NewsEvents: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <SectionHeading
            eyebrow="TENDERS & ANNOUNCEMENTS"
            heading="News & Supply Updates"
            description="Latest updates regarding DRAP compliance, warehouse expansions, and institutional tender supplies."
            align="left"
            className="mb-0"
          />

          <Link
            to="/quality-compliance"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#339719] hover:text-[#06316F] transition-colors shrink-0"
          >
            Compliance & Certifications
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EVENTS_NEWS.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col justify-between rounded-2xl bg-[#F8FAFD] p-6 border border-[#E5E7EB] shadow-xs hover:border-[#339719]/40 hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#4B5563] mb-3">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-[#339719]">
                    <Calendar className="h-3.5 w-3.5" />
                    {item.date}
                  </span>
                  <span className="inline-flex items-center gap-1 font-medium text-slate-400">
                    <MapPin className="h-3.5 w-3.5" />
                    {item.location}
                  </span>
                </div>

                <span className="text-[10px] font-bold uppercase tracking-widest text-[#339719] bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block mb-2">
                  {item.category}
                </span>

                <h3 className="font-heading text-base font-bold text-[#06316F] group-hover:text-[#339719] transition-colors">
                  {item.title}
                </h3>

                <p className="mt-2 text-xs text-[#4B5563] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#E5E7EB] flex items-center justify-between text-xs font-semibold text-[#06316F]">
                <span className="inline-flex items-center gap-1 text-[11px] text-[#339719]">
                  <FileCheck className="h-3.5 w-3.5" /> Verified Update
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
