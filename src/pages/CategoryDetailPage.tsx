import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { PRODUCT_CATEGORIES } from '../data/healthcareData';
import { ArrowLeft, CheckCircle2, ShieldCheck, FileText, Package, ArrowRight } from 'lucide-react';

export const CategoryDetailPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();

  const category = PRODUCT_CATEGORIES.find(c => 
    c.slug === categorySlug ||
    (categorySlug === 'infusion' && c.slug === 'infusion-catheters') ||
    (categorySlug === 'surgical' && c.slug === 'surgical-disposables') ||
    (categorySlug === 'medicine' && c.slug === 'medicine')
  ) || PRODUCT_CATEGORIES[0];

  const isInfusion = category.slug === 'infusion-catheters' || categorySlug === 'infusion';
  const isSurgical = category.slug === 'surgical-disposables' || categorySlug === 'surgical';
  const isMedicine = category.slug === 'medicine' || categorySlug === 'medicine';

  const pageTitle = isInfusion ? 'Infusion' : isSurgical ? 'Surgical' : isMedicine ? 'Medicine' : category.title;

  useEffect(() => {
    document.title = `${pageTitle} - Nafisa Traders`;
  }, [pageTitle]);

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <PageHero
        eyebrow={`SPECIALTY CODE: ${category.departmentCode}`}
        title={pageTitle}
        description={isInfusion ? undefined : (category.description || undefined)}
        breadcrumbItems={[
          { label: 'Products', path: '/products' },
          { label: pageTitle }
        ]}
        badge="Verified Institutional Supply Category"
      />

      <div className="w-full px-[15px] py-10">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#339719] hover:underline mb-6"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to All Product Categories
        </Link>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          
          {/* Left Column: Category Info & Brands */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl bg-white p-6 sm:p-7 border border-[#E5E7EB] shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#339719] bg-[#339719]/10 px-3 py-1 rounded-full">
                  DEPARTMENT OVERVIEW
                </span>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#06316F] mt-3">
                  {pageTitle} Solutions
                </h2>
                <p className="text-sm text-[#4B5563] mt-3 leading-relaxed">
                  {category.detailedDescription || category.description}
                </p>
              </div>

              {/* Key Areas / Brands */}
              <div>
                <h3 className="font-heading text-sm font-bold text-[#1F2937] uppercase tracking-wider mb-3">
                  {isInfusion ? "Key brands we distribute" : "Key Product Categories & Scope"}
                </h3>
                <div className="space-y-2.5">
                  {(isInfusion ? ["FDL", "OTSUKA", "ASPIL", "UNISOL", "MEDISOL"] : category.keyProducts)?.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 rounded-xl bg-[#F8F9FA] p-3 border border-[#E5E7EB]">
                      <CheckCircle2 className="h-4 w-4 text-[#339719] shrink-0" />
                      <span className="text-xs font-bold text-[#06316F] tracking-wide">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compliance Note */}
              <div className="pt-4 border-t border-[#E5E7EB] flex items-center gap-3 text-xs text-[#4B5563]">
                <ShieldCheck className="h-5 w-5 text-[#339719] shrink-0" />
                <span>
                  All products under <strong>{pageTitle}</strong> adhere to strict quality assurance protocols, batch tracking, and verified cold-chain / sterile storage standards.
                </span>
              </div>
            </div>

            {/* Architecture Scalability Box */}
            <div className="rounded-2xl bg-[#F4FAF2] p-5 sm:p-6 border border-[#E5E7EB]">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#06316F] mb-2">
                <FileText className="h-4 w-4 text-[#339719]" />
                Institutional Supply Guarantee
              </div>
              <p className="text-xs text-[#4B5563] leading-relaxed">
                Hospital supplies, tender contracts, and bulk clinical shipments are dispatched directly with verified DRAP batch documentation and manufacturer certificates of analysis.
              </p>
            </div>
          </div>

          {/* Right Column: Redirect to Product List Page */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl bg-white p-6 sm:p-8 border border-[#E5E7EB] shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#339719] bg-emerald-50 px-3 py-1 rounded-full">
                  PRODUCT CATALOG
                </span>
                <h3 className="font-heading text-xl font-bold text-[#06316F] mt-3">
                  Explore {pageTitle} & Medicines List
                </h3>
                <p className="text-xs sm:text-sm text-[#4B5563] mt-2 leading-relaxed">
                  Browse our verified database of 1,800+ pharmaceutical medicines, hospital infusions, and surgical disposables.
                </p>
              </div>

              <div>
                <Link
                  to="/products?tab=catalog"
                  className="inline-flex items-center justify-center gap-2.5 w-full rounded-xl bg-[#339719] px-6 py-3.5 text-sm font-bold text-white hover:bg-[#2b7d15] hover:shadow-lg transition-all shadow-xs group"
                >
                  <Package className="h-4 w-4" />
                  <span>View Product List</span>
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="pt-4 border-t border-[#E5E7EB] space-y-2.5 text-xs text-[#4B5563]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#339719] shrink-0" />
                  <span>Over 1,800 institutional items listed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#339719] shrink-0" />
                  <span>Item codes, manufacturer & pack units</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#339719] shrink-0" />
                  <span>Direct WhatsApp inquiry for tenders</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

