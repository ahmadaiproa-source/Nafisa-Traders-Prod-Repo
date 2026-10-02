import React from 'react';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { Milestones } from '../components/Milestones';
import { BrandPartners } from '../components/BrandPartners';
import { CTA } from '../components/CTA';
import { ShieldCheck, Award, HeartPulse, Building2, Truck, Users, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO, getYearsOfExperience } from '../data/healthcareData';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <PageHero
        eyebrow="ABOUT NAFISA TRADERS"
        title="Supporting healthcare. Building trust."
        description="A dedicated Pakistan-based importer, manufacturer and distributor of medicines, surgical disposables and healthcare solutions since 2010."
        breadcrumbItems={[{ label: 'About Us' }]}
        badge={`${getYearsOfExperience()}+ Years Serving Pakistan`}
      />

      {/* COMPANY STORY & OVERVIEW */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="w-full px-[15px]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1A73E8]/10 px-3.5 py-1 text-xs font-bold tracking-widest uppercase text-[#1A73E8]">
                OUR STORY & MISSION
              </span>

              <h2 className="font-heading text-3xl font-extrabold text-[#0B3D78] sm:text-4xl leading-tight">
                Empowering medical institutions with dependable healthcare products.
              </h2>

              <p className="text-base text-[#5F6368] leading-relaxed">
                Nafisa Traders is a prominent importer, manufacturer and distributor of medicines and surgical disposables serving healthcare institutions across Pakistan.
              </p>

              <p className="text-base text-[#5F6368] leading-relaxed">
                Established in 2010 at the Densohall Wholesale Medicine Market in Karachi, the company remains dedicated to ensuring the continuous availability of high-quality medical products and supporting hospitals in delivering better patient care.
              </p>

              <div className="pt-2 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-[#F5F9FF] p-4 border border-[#E4E8EE]">
                  <span className="font-heading text-2xl font-extrabold text-[#0B3D78]">2010</span>
                  <span className="block text-xs text-[#5F6368] mt-0.5">Year Established</span>
                </div>
                <div className="rounded-xl bg-[#F5F9FF] p-4 border border-[#E4E8EE]">
                  <span className="font-heading text-2xl font-extrabold text-[#1A73E8]">Nationwide</span>
                  <span className="block text-xs text-[#5F6368] mt-0.5">Distribution Scope</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden border border-[#E4E8EE] shadow-md bg-white p-3">
                <img
                  src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80"
                  alt="Medical logistics and supply care"
                  className="h-[380px] sm:h-[440px] w-full object-cover rounded-2xl"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TIMELINE & HISTORY MILESTONES (A. Feroz Group Style) */}
      <Milestones />

      {/* BRAND PARTNERS SHOWCASE */}
      <BrandPartners />

      {/* MISSION & VISION */}
      <section id="mission" className="py-16 sm:py-24 bg-white">
        <div className="w-full px-[15px]">
          <SectionHeading
            eyebrow="FOUNDATIONAL PURPOSE"
            heading="Guided by clarity and responsibility."
            align="center"
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-2xl bg-[#F4FAF2] p-8 border border-[#E5E7EB]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#339719]">
                VISION
              </span>
              <h3 className="font-heading text-xl font-bold text-[#06316F] mt-2">
                Pakistan’s Most Trusted Healthcare Partner
              </h3>
              <p className="text-sm text-[#4B5563] mt-3 leading-relaxed">
                To be Pakistan’s most trusted partner in healthcare distribution — setting benchmarks in quality, DRAP compliance, and institutional service.
              </p>
            </div>

            <div className="rounded-2xl bg-emerald-50/50 p-8 border border-emerald-100">
              <span className="text-xs font-bold uppercase tracking-wider text-[#339719]">
                MISSION
              </span>
              <h3 className="font-heading text-xl font-bold text-[#06316F] mt-2">
                Continuous Product Availability
              </h3>
              <p className="text-sm text-[#4B5563] mt-3 leading-relaxed">
                To ensure the continuous availability of high-quality and affordable healthcare products, supporting medical institutions in delivering better patient care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE STRENGTHS & APPROACH */}
      <section className="py-16 sm:py-24 bg-[#F8F9FA]">
        <div className="w-full px-[15px]">
          <SectionHeading
            eyebrow="CORE STRENGTHS"
            heading="Our operational approach to institutional supply."
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-white p-6 border border-[#E5E7EB] shadow-xs">
              <Award className="h-8 w-8 text-[#339719] mb-4" />
              <h3 className="font-heading text-lg font-bold text-[#06316F]">
                Strict Quality Emphasis
              </h3>
              <p className="text-sm text-[#4B5563] mt-2 leading-relaxed">
                Prioritizing product origin, batch consistency, and verified cold-chain storage conditions at every stage of distribution.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 border border-[#E5E7EB] shadow-xs">
              <Truck className="h-8 w-8 text-[#06316F] mb-4" />
              <h3 className="font-heading text-lg font-bold text-[#06316F]">
                Dependable Logistics
              </h3>
              <p className="text-sm text-[#4B5563] mt-2 leading-relaxed">
                Responsive dispatch mechanisms designed to meet hospital procurement deadlines and critical emergency restocking.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 border border-[#E5E7EB] shadow-xs">
              <Users className="h-8 w-8 text-[#339719] mb-4" />
              <h3 className="font-heading text-lg font-bold text-[#06316F]">
                Long-Term Relationships
              </h3>
              <p className="text-sm text-[#4B5563] mt-2 leading-relaxed">
                Working closely with hospital procurement committees and institutional buyers to fulfill specialized demand accurately.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
};
