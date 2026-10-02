import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { COMPANY_INFO } from '../data/healthcareData';
import { Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#06316F] border-t-4 border-[#339719] pt-16 pb-12 text-slate-200 relative overflow-hidden">
      {/* Subtle background glow effect */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#339719]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#339719]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full px-[15px] sm:px-8 lg:px-16 max-w-7xl mx-auto relative z-10">
        
        {/* Top Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/10">
          
          {/* Column 1: Logo & Company Motto (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white p-3 sm:p-4 rounded-2xl flex items-center justify-center w-full shadow-md border border-white/20">
              <Logo asLink={true} fullWidth={true} imageClassName="w-full max-w-full h-auto max-h-20 object-contain" />
            </div>
            <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed max-w-sm pt-2">
              For over 15 years, Nafisa Traders & Co. has been devoted to improving lives by providing the finest medical goods, sterile surgical disposables, and pharmaceuticals across Pakistan.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#4ADE80] pt-1">
              <ShieldCheck className="h-4 w-4" />
              <span>Certified Healthcare Distributor Since 2010</span>
            </div>
          </div>

          {/* Column 2: Contact (3 cols on lg) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#339719]"></span>
              Head Office Contact
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-[#4ADE80] shrink-0 mt-0.5" />
                <p className="text-[12px] leading-relaxed text-slate-300">
                  {COMPANY_INFO.address}
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 text-[#4ADE80] shrink-0 mt-0.5" />
                <div className="flex flex-wrap gap-x-2 gap-y-1 font-mono text-slate-300">
                  <a href="tel:+922132473014" className="hover:text-[#4ADE80] transition-colors">
                    +92 21 32473014
                  </a>
                  <span className="text-slate-500">/</span>
                  <a href="tel:+922132435292" className="hover:text-[#4ADE80] transition-colors">
                    +92 21 32435292
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-[#4ADE80] shrink-0" />
                <a href={`mailto:${COMPANY_INFO.emailPlaceholder}`} className="hover:text-[#4ADE80] transition-colors font-mono">
                  {COMPANY_INFO.emailPlaceholder}
                </a>
              </div>
              <div className="pt-2 border-t border-white/10">
                <span className="font-bold text-white block text-xs mb-0.5">Tenders & Hospital Supplies:</span>
                <a href={`mailto:${COMPANY_INFO.emailPlaceholder}`} className="hover:text-[#4ADE80] transition-colors font-mono text-slate-300">
                  {COMPANY_INFO.emailPlaceholder}
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: Our Products (3 cols on lg) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#339719]"></span>
              <Link to="/products" className="hover:text-[#4ADE80] transition-colors">
                Our Products
              </Link>
            </h4>
            <ul className="space-y-3 text-xs text-slate-300">
              <li>
                <Link
                  to="/products/infusion-catheters"
                  className="group flex items-start gap-2.5 hover:text-[#4ADE80] transition-colors"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-white/10 text-[10px] font-bold text-[#4ADE80] group-hover:bg-[#339719] group-hover:text-white transition-colors">
                    1
                  </span>
                  <div>
                    <span className="font-bold text-white block group-hover:text-[#4ADE80] transition-colors">
                      Infusion
                    </span>
                    <span className="text-[11px] text-slate-400">
                      IV Therapy, Catheters & Cannulas
                    </span>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  to="/products/medicine"
                  className="group flex items-start gap-2.5 hover:text-[#4ADE80] transition-colors"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-white/10 text-[10px] font-bold text-[#4ADE80] group-hover:bg-[#339719] group-hover:text-white transition-colors">
                    2
                  </span>
                  <div>
                    <span className="font-bold text-white block group-hover:text-[#4ADE80] transition-colors">
                      Medicine
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Pharmaceuticals & Critical Care
                    </span>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  to="/products/surgical-disposables"
                  className="group flex items-start gap-2.5 hover:text-[#4ADE80] transition-colors"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-white/10 text-[10px] font-bold text-[#4ADE80] group-hover:bg-[#339719] group-hover:text-white transition-colors">
                    3
                  </span>
                  <div>
                    <span className="font-bold text-white block group-hover:text-[#4ADE80] transition-colors">
                      Surgical
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Instruments & Sterile Disposables
                    </span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Links (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#339719]"></span>
              Company
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link to="/about" className="hover:text-[#4ADE80] transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/brands" className="hover:text-[#4ADE80] transition-colors">Partner Brands</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#4ADE80] transition-colors">All Products</Link>
              </li>
              <li>
                <Link to="/clientele" className="hover:text-[#4ADE80] transition-colors">Clientele & Tenders</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#4ADE80] transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex items-center justify-center text-center text-xs text-slate-400">
          <p>
            All Rights Reserved © {new Date().getFullYear()} Nafisa Traders Karachi.
          </p>
        </div>

      </div>
    </footer>
  );
};

