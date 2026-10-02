import React from 'react';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { CTA } from '../components/CTA';
import { ShieldCheck, Award, Package, Thermometer, Headphones, FileCheck, CheckCircle2 } from 'lucide-react';

export const QualityPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <PageHero
        eyebrow="STANDARDS & ASSURANCE"
        title="Quality at every stage."
        description="Nafisa Traders upholds rigorous quality control, responsible procurement, and compliant distribution protocols for all medical products."
        breadcrumbItems={[{ label: 'Quality & Compliance' }]}
        badge="Quality & Compliance Focused"
      />

      {/* QUALITY PILLARS */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="w-full px-[15px]">
          <SectionHeading
            eyebrow="OUR FRAMEWORK"
            heading="Five Pillars of Quality Assurance"
            description="Maintaining institutional trust through systematic quality measures from source to delivery."
            align="center"
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            
            {/* 1. Product Quality */}
            <div className="h-full w-full flex flex-col justify-between rounded-2xl bg-white p-6 sm:p-8 border border-[#E5E7EB] shadow-xs">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F4FAF2] text-[#339719]">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-[#06316F] mt-4">
                  1. Product Quality
                </h3>
                <p className="text-sm text-[#4B5563] leading-relaxed mt-2">
                  All medicines and surgical disposables undergo rigorous batch inspections and supplier verification before inclusion in our distribution catalog.
                </p>
              </div>
            </div>

            {/* 2. Reliable Procurement */}
            <div className="h-full w-full flex flex-col justify-between rounded-2xl bg-white p-6 sm:p-8 border border-[#E5E7EB] shadow-xs">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF4FC] text-[#06316F]">
                  <Package className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-[#06316F] mt-4">
                  2. Reliable Procurement
                </h3>
                <p className="text-sm text-[#4B5563] leading-relaxed mt-2">
                  Partnering exclusively with authentic manufacturers and accredited importers to maintain complete supply chain transparency and traceability.
                </p>
              </div>
            </div>

            {/* 3. Responsible Distribution */}
            <div className="h-full w-full flex flex-col justify-between rounded-2xl bg-white p-6 sm:p-8 border border-[#E5E7EB] shadow-xs">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-[#339719]">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-[#06316F] mt-4">
                  3. Responsible Distribution
                </h3>
                <p className="text-sm text-[#4B5563] leading-relaxed mt-2">
                  Logistics procedures configured to maintain sterile packaging integrity, damage-free handling, and prompt hospital delivery across Pakistan.
                </p>
              </div>
            </div>

            {/* 4. Storage & Handling */}
            <div className="h-full w-full flex flex-col justify-between rounded-2xl bg-white p-6 sm:p-8 border border-[#E5E7EB] shadow-xs">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F4FAF2] text-[#339719]">
                  <Thermometer className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-[#06316F] mt-4">
                  4. Storage & Handling
                </h3>
                <p className="text-sm text-[#4B5563] leading-relaxed mt-2">
                  Climate-controlled warehousing facilities at Densohall Medicine Market, Karachi, enforcing FIFO inventory turnover and temperature management.
                </p>
              </div>
            </div>

            {/* 5. Customer Support */}
            <div className="h-full w-full flex flex-col justify-between rounded-2xl bg-white p-6 sm:p-8 border border-[#E5E7EB] shadow-xs lg:col-span-2">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-[#339719]">
                  <Headphones className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-[#06316F] mt-4">
                  5. Responsive Customer & Institutional Support
                </h3>
                <p className="text-sm text-[#4B5563] leading-relaxed mt-2">
                  Dedicated desk for processing hospital inquiries, tender compliance verification, documentation requests, and swift post-delivery communication.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* VERIFIED REGULATORY & CERTIFICATION PLACEHOLDER ZONE */}
      <section className="py-16 bg-[#F8FAFD] border-y border-[#E5E7EB]">
        <div className="w-full px-[15px]">
          <div className="rounded-3xl bg-white p-8 sm:p-12 border border-[#E5E7EB] shadow-sm">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#339719]/10 px-3.5 py-1 text-xs font-bold tracking-widest uppercase text-[#339719]">
                <FileCheck className="h-3.5 w-3.5 text-[#339719]" />
                REGULATORY DOCUMENTATION ZONE
              </span>

              <h3 className="font-heading text-2xl font-bold text-[#06316F] mt-3">
                Verified Regulatory Compliance Area
              </h3>

              <p className="text-sm text-[#4B5563] mt-2 leading-relaxed">
                Nafisa Traders operates strictly in accordance with local drug regulation guidelines. To ensure total authenticity, official DRAP registration credentials, manufacturing licenses, and batch test reports are made available directly to hospital tender committees upon official inquiry.
              </p>

              <div className="mt-6 rounded-2xl bg-[#F8F9FA] p-5 border border-[#E5E7EB] space-y-2 text-xs text-[#4B5563]">
                <div className="flex items-center gap-2 font-semibold text-[#06316F]">
                  <CheckCircle2 className="h-4 w-4 text-[#339719]" /> DRAP & Institutional Tender Documentation Area
                </div>
                <p>
                  Official drug registration numbers and license copies are verified per batch and supplied directly to procurement officers upon request.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
};
