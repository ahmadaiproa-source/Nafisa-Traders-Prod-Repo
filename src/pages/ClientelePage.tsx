import React from 'react';
import { PageHero } from '../components/PageHero';
import { ClientLogo } from '../components/ClientLogo';
import { SectionHeading } from '../components/SectionHeading';
import { CTA } from '../components/CTA';
import { INSTITUTIONAL_CLIENTS } from '../data/healthcareData';
import { ShieldCheck, Building2, Truck, CheckCircle2 } from 'lucide-react';

export const ClientelePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <PageHero
        eyebrow="OUR PARTNERS & CLIENTS"
        title="Trusted by healthcare institutions."
        description="Nafisa Traders supplies medicines, surgical disposables and medical solutions to prominent hospitals, specialized institutes and healthcare networks across Pakistan."
        breadcrumbItems={[{ label: 'Clientele' }]}
        badge="Institutional Healthcare Distribution"
      />

      {/* CLIENT GRID */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="w-full px-[15px]">
          <SectionHeading
            eyebrow="CLIENT NETWORK"
            heading="Respected hospital networks and medical centers."
            description="Our distribution channels support tertiary care centers, philanthropic foundations, and specialized healthcare trusts."
            align="center"
            className="mb-12"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {INSTITUTIONAL_CLIENTS.map((client) => (
              <ClientLogo key={client.id} client={client} variant="full" />
            ))}
          </div>
        </div>
      </section>

      {/* INSTITUTIONAL APPROACH */}
      <section className="py-16 sm:py-24 bg-[#F8FAFD] border-y border-[#E5E7EB]">
        <div className="w-full px-[15px]">
          <SectionHeading
            eyebrow="SUPPLY METHODOLOGY"
            heading="Our commitment to institutional procurement."
            description="Delivering seamless logistics, transparent communication, and strict product verification."
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-white p-6 sm:p-8 border border-[#E5E7EB] shadow-xs space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4FAF2] text-[#339719]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-lg font-bold text-[#06316F]">
                Batch Consistency
              </h3>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                Ensuring uniform quality and batch documentation across recurring institutional shipments and tenders.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 sm:p-8 border border-[#E5E7EB] shadow-xs space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF4FC] text-[#06316F]">
                <Truck className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-lg font-bold text-[#06316F]">
                Timely Delivery
              </h3>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                Dedicated dispatch coordination tailored to hospital operational schedules and critical stock requirements.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 sm:p-8 border border-[#E5E7EB] shadow-xs space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-[#339719]">
                <Building2 className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-lg font-bold text-[#06316F]">
                Procurement Desk Support
              </h3>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                Direct point of contact for hospital procurement officers, tender evaluations, and quotation inquiries.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
};
