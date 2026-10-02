import React from 'react';
import { PageHero } from '../components/PageHero';
import { MapPlaceholder } from '../components/MapPlaceholder';
import { COMPANY_INFO } from '../data/healthcareData';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  MessageCircle, 
  Building2, 
  CheckCircle2, 
  Truck,
  ExternalLink
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <PageHero
        eyebrow="GET IN TOUCH"
        title="Contact Nafisa Traders"
        description="Our institutional procurement desk is ready to assist hospitals, clinics, pharmacies, and healthcare distributors across Pakistan."
        breadcrumbItems={[{ label: 'Contact' }]}
        badge="Densohall Karachi Headquarters"
      />

      <section className="py-16 sm:py-20">
        <div className="w-full px-[15px] max-w-7xl mx-auto space-y-10">
          
          {/* TOP THREE DIRECT CONTACT CHANNELS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 1. Phone Desk */}
            <div className="rounded-2xl bg-white p-6 sm:p-7 border border-[#E5E7EB] shadow-xs flex flex-col justify-between hover:border-[#339719]/40 transition-all">
              <div className="space-y-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF4FC] text-[#06316F]">
                  <Phone className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-lg font-bold text-[#06316F]">
                  Telephone & Desk
                </h3>
                <p className="text-xs text-[#555555] leading-relaxed">
                  Call our wholesale procurement desk directly for urgent hospital orders and product availability.
                </p>
                <div className="pt-2 text-xs font-mono font-bold text-[#06316F] space-y-1.5">
                  <div>
                    <a href="tel:+922132473014" className="hover:text-[#339719] transition-colors flex items-center gap-1.5">
                      <Phone className="h-3 w-3 text-[#339719]" />
                      +92 21 32473014
                    </a>
                  </div>
                  <div>
                    <a href="tel:+922132435292" className="hover:text-[#339719] transition-colors flex items-center gap-1.5">
                      <Phone className="h-3 w-3 text-[#339719]" />
                      +92 21 32435292
                    </a>
                  </div>
                </div>
              </div>
              <div className="pt-5 border-t border-gray-100 mt-5 grid grid-cols-2 gap-2">
                <a
                  href="tel:+922132473014"
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#EEF4FC] hover:bg-[#06316F] hover:text-white text-[#06316F] py-2.5 px-2 text-xs font-bold transition-colors text-center"
                >
                  <Phone className="h-3.5 w-3.5 shrink-0" />
                  <span>Call Line 1</span>
                </a>
                <a
                  href="tel:+922132435292"
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#EEF4FC] hover:bg-[#06316F] hover:text-white text-[#06316F] py-2.5 px-2 text-xs font-bold transition-colors text-center"
                >
                  <Phone className="h-3.5 w-3.5 shrink-0" />
                  <span>Call Line 2</span>
                </a>
              </div>
            </div>

            {/* 2. WhatsApp Instant Desk */}
            <div className="rounded-2xl bg-white p-6 sm:p-7 border-2 border-[#25D366]/40 shadow-xs flex flex-col justify-between hover:border-[#25D366] transition-all relative overflow-hidden">
              <div className="absolute top-3 right-3">
                <span className="inline-flex items-center gap-1 rounded-full bg-[#EBF5EA] text-[#339719] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                  Fastest Response
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#25D366]/10 text-[#25D366]">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-lg font-bold text-[#06316F]">
                  WhatsApp Procurement
                </h3>
                <p className="text-xs text-[#555555] leading-relaxed">
                  Chat instantly with our institutional sales team for pricing, stock confirmation, and tender quotes.
                </p>
                <div className="pt-2 text-xs font-mono font-bold text-[#339719]">
                  +92 300 2433552
                </div>
              </div>
              <div className="pt-5 border-t border-gray-100 mt-5">
                <a
                  href="https://wa.me/923002433552?text=Hello%20Nafisa%20Traders%2C%20I%20am%20requesting%20an%20institutional%20quotation%20for%20medicines%20and%20surgical%20supplies."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white py-2.5 px-4 text-xs font-bold transition-all shadow-xs"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* 3. Email Inquiries */}
            <div className="rounded-2xl bg-white p-6 sm:p-7 border border-[#E5E7EB] shadow-xs flex flex-col justify-between hover:border-[#339719]/40 transition-all">
              <div className="space-y-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-[#339719]">
                  <Mail className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-lg font-bold text-[#06316F]">
                  Official Email Desk
                </h3>
                <p className="text-xs text-[#555555] leading-relaxed">
                  Send institutional RFQs, tender documents, institutional authorizations, and supplier verification requests.
                </p>
                <div className="pt-2 text-xs font-mono font-bold text-[#06316F]">
                  {COMPANY_INFO.emailPlaceholder}
                </div>
              </div>
              <div className="pt-5 border-t border-gray-100 mt-5">
                <a
                  href={`mailto:${COMPANY_INFO.emailPlaceholder}`}
                  className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-gray-100 hover:bg-[#06316F] hover:text-white text-[#06316F] py-2.5 px-4 text-xs font-bold transition-colors"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>Send Email</span>
                </a>
              </div>
            </div>

          </div>

          {/* MAIN TWO-COLUMN DETAILS SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT COLUMN: Head Office Information & Logistics */}
            <div className="lg:col-span-7 space-y-6">
              <div className="rounded-2xl bg-white p-6 sm:p-8 border border-[#E5E7EB] shadow-xs space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#339719] bg-[#339719]/10 px-3 py-1 rounded-full">
                    COMMERCIAL & WHOLESALE HEADQUARTERS
                  </span>
                  <h2 className="font-heading text-2xl font-bold text-[#06316F] mt-3">
                    Nafisa Traders Karachi
                  </h2>
                  <p className="text-xs sm:text-sm text-[#555555] mt-1 leading-relaxed">
                    Centrally located in Karachi's renowned wholesale medicine market at Densohall, serving hospitals and institutions across Pakistan with authentic pharmaceuticals and sterile surgical disposables.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-gray-100 text-sm">
                  
                  {/* Physical Address */}
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F4FAF2] text-[#339719]">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-[#06316F] uppercase tracking-wider mb-0.5">
                        Physical Address
                      </span>
                      <p className="text-xs text-[#555555] leading-relaxed">
                        {COMPANY_INFO.address}
                      </p>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EEF4FC] text-[#06316F]">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-[#06316F] uppercase tracking-wider mb-0.5">
                        Operating Hours
                      </span>
                      <p className="text-xs text-[#555555]">
                        {COMPANY_INFO.businessHoursPlaceholder}
                      </p>
                      <span className="inline-block mt-1 text-[11px] text-[#339719] font-medium">
                        Emergency hospital dispatch available
                      </span>
                    </div>
                  </div>

                </div>

                {/* Institutional Capabilities */}
                <div className="pt-6 border-t border-gray-100">
                  <h4 className="text-xs font-bold text-[#06316F] uppercase tracking-wider mb-3">
                    Institutional Distribution Highlights
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#555555]">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#339719] shrink-0" />
                      <span>DRAP-compliant pharmaceutical inventory</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#339719] shrink-0" />
                      <span>Monitored cold-chain (2°C – 8°C) storage</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#339719] shrink-0" />
                      <span>Certified sterile surgical disposables</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#339719] shrink-0" />
                      <span>Nationwide express freight & delivery</span>
                    </div>
                  </div>
                </div>

                {/* Trust Footer */}
                <div className="pt-4 border-t border-[#E5E7EB] flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-[#339719] font-semibold">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Serving Healthcare Institutions Since 2010</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#06316F] font-semibold">
                    <Truck className="h-4 w-4" />
                    <span>Same-day dispatch for Karachi hospitals</span>
                  </div>
                </div>

              </div>
            </div>

            {/* RIGHT COLUMN: Interactive Location Map */}
            <div className="lg:col-span-5 flex flex-col">
              <MapPlaceholder />
            </div>

          </div>

        </div>
      </section>
    </div>
  );
};
