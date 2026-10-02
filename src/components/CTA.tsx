import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PhoneCall, ShieldCheck, Truck } from 'lucide-react';

export const CTA: React.FC = () => {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="relative overflow-hidden rounded-3xl border border-[#E5E7EB] p-8 sm:p-12 lg:p-16 shadow-sm"
             style={{
               background: 'linear-gradient(135deg, #F4FAF2 0%, #EBF7E7 60%, #EEF4FC 100%)'
             }}>
          
          {/* Subtle medical distribution geometric illustration elements */}
          <div className="pointer-events-none absolute -right-12 -bottom-12 hidden lg:block opacity-10">
            <svg width="340" height="340" viewBox="0 0 200 200" fill="none">
              <circle cx="100" cy="100" r="80" stroke="#06316F" strokeWidth="4" />
              <path d="M100 20V180M20 100H180" stroke="#06316F" strokeWidth="4" />
              <circle cx="100" cy="100" r="40" stroke="#339719" strokeWidth="3" />
            </svg>
          </div>

          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#339719]/10 px-3.5 py-1 text-xs font-bold tracking-wider uppercase text-[#339719]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#339719]" />
              INSTITUTIONAL HEALTHCARE SUPPLY
            </span>

            <h2 className="mt-4 font-heading text-2xl font-extrabold tracking-tight text-[#06316F] sm:text-3xl lg:text-4xl leading-tight">
              Looking for a reliable healthcare supply partner?
            </h2>

            <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#4B5563]">
              Talk to Nafisa Traders about your pharmaceutical, surgical disposable and healthcare supply requirements. Serving hospitals, clinics and institutions nationwide.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#339719] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#2b7d15] hover:shadow-md active:scale-95"
              >
                <span>Get in Touch</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#06316F] border border-[#E5E7EB] shadow-xs transition-all duration-200 hover:bg-[#F4FAF2] hover:border-[#339719]/40 active:scale-95"
              >
                <span>View Our Products</span>
              </Link>
            </div>

            {/* Quick feature indicators */}
            <div className="mt-8 pt-6 border-t border-[#E5E7EB] flex flex-wrap items-center gap-6 text-xs font-medium text-[#4B5563]">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-[#339719]" /> Tested & Verified Batches
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Truck className="h-4 w-4 text-[#06316F]" /> Fast Institutional Dispatch
              </span>
              <span className="inline-flex items-center gap-1.5">
                <PhoneCall className="h-4 w-4 text-[#339719]" /> Direct Procurement Desk
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
