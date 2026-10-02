import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  ArrowRight, 
  TableProperties, 
  Layers, 
  FileSpreadsheet,
  CheckCircle2,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { ProductCategoryCard } from '../components/ProductCategoryCard';
import { ProductDirectory } from '../components/ProductDirectory';
import { CTA } from '../components/CTA';
import { PRODUCT_CATEGORIES } from '../data/healthcareData';
import { ALL_PRODUCTS } from '../data/productCatalog';

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  // Active view: 'catalog' (CSV items directory) or 'divisions' (specialty cards)
  const tabParam = searchParams.get('tab');
  const searchQuery = searchParams.get('search') || searchParams.get('q') || '';
  const [activeTab, setActiveTab] = useState<'catalog' | 'divisions'>(
    tabParam === 'divisions' && !searchQuery ? 'divisions' : 'catalog'
  );

  useEffect(() => {
    if (searchQuery) {
      setActiveTab('catalog');
    } else if (tabParam === 'divisions') {
      setActiveTab('divisions');
    } else if (tabParam === 'catalog' || tabParam === 'list') {
      setActiveTab('catalog');
    }
  }, [tabParam, searchQuery]);

  // Handle tab switch
  const handleTabChange = (tab: 'catalog' | 'divisions') => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  // State for the specialty divisions tab search
  const [divisionSearch, setDivisionSearch] = useState('');
  const [divisionFilter, setDivisionFilter] = useState('ALL');

  const filteredCategories = PRODUCT_CATEGORIES.filter((cat) => {
    const matchesSearch =
      cat.title.toLowerCase().includes(divisionSearch.toLowerCase()) ||
      cat.description.toLowerCase().includes(divisionSearch.toLowerCase());
    if (divisionFilter === 'ALL') return matchesSearch;
    if (divisionFilter === 'PHARMA') return matchesSearch && cat.id !== 'surgical-disposables';
    if (divisionFilter === 'DISPOSABLES') return matchesSearch && cat.id === 'surgical-disposables';
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <PageHero
        eyebrow="MEDICAL & PHARMACEUTICAL CATALOGUE"
        title="Products for modern healthcare."
        description="Comprehensive inventory of pharmaceutical formulations, surgical disposables, infusions, and specialized institutional medical items supplied across Pakistan."
        breadcrumbItems={[{ label: 'Our Products' }]}
        badge="DRAP Quality Compliant Supply Chain"
      />

      {/* PRIMARY VIEW NAVIGATION TABS */}
      <section className="bg-white border-b border-[#E5E7EB] sticky top-[72px] z-30 shadow-2xs">
        <div className="w-full px-[15px] py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Tab switchers */}
            <div className="flex items-center p-1 bg-[#F1F3F5] rounded-xl w-full sm:w-auto">
              <button
                onClick={() => handleTabChange('catalog')}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'catalog'
                    ? 'bg-[#06316F] text-white shadow-xs'
                    : 'text-[#4B5563] hover:text-[#06316F]'
                }`}
              >
                <TableProperties className="h-4 w-4" />
                <span>Medicine & Product Directory</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                  activeTab === 'catalog' ? 'bg-[#339719] text-white' : 'bg-white text-gray-700'
                }`}>
                  {ALL_PRODUCTS.length.toLocaleString()}+
                </span>
              </button>

              <button
                onClick={() => handleTabChange('divisions')}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'divisions'
                    ? 'bg-[#06316F] text-white shadow-xs'
                    : 'text-[#4B5563] hover:text-[#06316F]'
                }`}
              >
                <Layers className="h-4 w-4" />
                <span>Specialty Divisions</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                  activeTab === 'divisions' ? 'bg-[#339719] text-white' : 'bg-white text-gray-700'
                }`}>
                  {PRODUCT_CATEGORIES.length}
                </span>
              </button>
            </div>

            {/* Quick stats / Institutional notice */}
            <div className="hidden lg:flex items-center gap-4 text-xs text-gray-500 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#339719]" />
                <span>Live Institutional Inventory</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 text-[#06316F]" />
                <span>Direct Hospital Supply</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TAB CONTENT 1: MEDICINE CATALOG WITH LIVE SEARCH & FILTER */}
      {activeTab === 'catalog' && (
        <section className="py-10 bg-[#F8F9FA]">
          <div className="w-full px-[15px]">
            <ProductDirectory initialSearch={searchQuery} />
          </div>
        </section>
      )}

      {/* TAB CONTENT 2: SPECIALTY DIVISIONS */}
      {activeTab === 'divisions' && (
        <>
          {/* DIVISION SEARCH & FILTER */}
          <section className="py-6 bg-white border-b border-[#E5E7EB]">
            <div className="w-full px-[15px]">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Search Input */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search specialties (e.g. Oncology, Cardiology, Disposables)..."
                    value={divisionSearch}
                    onChange={(e) => setDivisionSearch(e.target.value)}
                    className="w-full rounded-xl border border-[#E5E7EB] bg-[#F8F9FA] pl-10 pr-4 py-2.5 text-sm text-[#1F2937] placeholder-slate-400 focus:border-[#339719] focus:bg-white focus:outline-none transition-all"
                  />
                </div>

                {/* Filter Pills */}
                <div className="flex items-center space-x-2 text-xs font-semibold overflow-x-auto pb-1 md:pb-0">
                  <span className="text-slate-400 flex items-center gap-1 mr-1">
                    <Filter className="h-3.5 w-3.5" /> Filter:
                  </span>
                  <button
                    onClick={() => setDivisionFilter('ALL')}
                    className={`rounded-lg px-3.5 py-2 transition-colors ${
                      divisionFilter === 'ALL'
                        ? 'bg-[#06316F] text-white'
                        : 'bg-[#F8F9FA] text-[#4B5563] hover:bg-[#E5E7EB]'
                    }`}
                  >
                    All Specialties ({PRODUCT_CATEGORIES.length})
                  </button>
                  <button
                    onClick={() => setDivisionFilter('PHARMA')}
                    className={`rounded-lg px-3.5 py-2 transition-colors ${
                      divisionFilter === 'PHARMA'
                        ? 'bg-[#06316F] text-white'
                        : 'bg-[#F8F9FA] text-[#4B5563] hover:bg-[#E5E7EB]'
                    }`}
                  >
                    Pharmaceuticals
                  </button>
                  <button
                    onClick={() => setDivisionFilter('DISPOSABLES')}
                    className={`rounded-lg px-3.5 py-2 transition-colors ${
                      divisionFilter === 'DISPOSABLES'
                        ? 'bg-[#06316F] text-white'
                        : 'bg-[#F8F9FA] text-[#4B5563] hover:bg-[#E5E7EB]'
                    }`}
                  >
                    Surgical Disposables
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* CATEGORIES GRID */}
          <section className="py-12 bg-[#F8F9FA]">
            <div className="w-full px-[15px]">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredCategories.map((cat, idx) => (
                  <ProductCategoryCard key={cat.id} category={cat} index={idx} />
                ))}
              </div>

              {filteredCategories.length === 0 && (
                <div className="py-16 text-center rounded-2xl bg-white border border-[#E5E7EB] p-8">
                  <p className="text-sm text-[#4B5563]">No specialties matched &ldquo;{divisionSearch}&rdquo;.</p>
                  <button
                    onClick={() => {
                      setDivisionSearch('');
                      setDivisionFilter('ALL');
                    }}
                    className="mt-4 text-xs font-semibold text-[#339719] underline"
                  >
                    Reset Search Filters
                  </button>
                </div>
              )}
            </div>
          </section>
        </>
      )}

      {/* INSTITUTIONAL PROCUREMENT NOTICE */}
      <section className="py-8 bg-white border-t border-[#E5E7EB]">
        <div className="w-full px-[15px]">
          <div className="rounded-2xl bg-[#F8F9FA] p-6 sm:p-8 border border-[#E5E7EB] shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F4FAF2] text-[#339719]">
                <FileSpreadsheet className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-heading text-base font-bold text-[#06316F]">
                  Institutional Procurement & Bulk Tender Supply
                </h4>
                <p className="text-xs text-[#4B5563] mt-1 leading-relaxed max-w-2xl">
                  Need a comprehensive hospital rate contract sheet, specific DRAP registered batch numbers, or an urgent institutional quote? Contact our dedicated distribution desk.
                </p>
              </div>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-[#339719] px-5 py-2.5 text-xs font-semibold text-white shrink-0 hover:bg-[#2b7d15] transition-colors"
            >
              <span>Request Hospital Tender Quote</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
};

