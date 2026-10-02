import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { OurBrandsSlider } from '../components/OurBrandsSlider';
import { ArrowRight, ShieldCheck, CheckCircle2, Search, X, MessageCircle, Package, Sparkles } from 'lucide-react';
import { searchCatalog, ALL_PRODUCTS, ProductItem } from '../data/productCatalog';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [liveQuery, setLiveQuery] = useState('');

  const liveResults = useMemo(() => {
    const q = liveQuery.trim();
    if (!q) return [];
    return searchCatalog(q);
  }, [liveQuery]);

  const handleLiveSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const q = liveQuery.trim();
    if (!q) return;
    navigate(`/products?tab=catalog&search=${encodeURIComponent(q)}`);
  };

  const handleWhatsApp = (e: React.MouseEvent, item: ProductItem) => {
    e.stopPropagation();
    const msg = `Hello Nafisa Traders,\nI am inquiring about availability & institutional quote for:\n\n*Product:* ${item.name}\n*Item Code:* ${item.code}\n*Company:* ${item.company}\n*Unit:* ${item.unit}\n\nPlease share price quotation.`;
    window.open(`https://wa.me/923002433552?text=${encodeURIComponent(msg)}`, '_blank');
  };
  return (
    <div className="w-full bg-white text-[#222222] font-sans antialiased overflow-x-hidden">
      
      {/* =========================================================================
          1. HERO BANNER SECTION
          Background image with black overlay for optimal legibility, responsive text
         ========================================================================= */}
      <section className="relative w-full min-h-[420px] sm:min-h-[480px] lg:min-h-[540px] flex items-center justify-start overflow-hidden bg-black">
        {/* Background Image with Black Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://ik.imagekit.io/sn0ctq5wd/banner.jpeg"
            alt="Healthcare and Medical Solutions Banner"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          {/* Gradient overlay: Deep dark on left for text legibility, transparent/light on right to show the image */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:hidden" />
        </div>

        {/* Content Container (Full width with 15px edge padding) */}
        <div className="relative z-10 w-full px-[15px] sm:px-8 lg:px-16 py-14 sm:py-20 md:py-24">
          <div className="max-w-xl sm:max-w-2xl lg:max-w-3xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[44px] font-bold text-white leading-snug sm:leading-tight md:leading-[1.25] tracking-tight drop-shadow-sm">
              Comprehensive Medical Solutions for Hospitals Clinics Pharmacies and Healthcare Providers
            </h1>
            <div className="mt-6 sm:mt-8">
              <Link
                to="/products"
                className="inline-flex items-center gap-2.5 rounded-xl bg-[#339719] px-6 py-3.5 text-sm font-bold text-white shadow-md hover:bg-[#2b7d15] hover:shadow-lg transition-all duration-200 group"
              >
                <span>Our Products</span>
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          1.5. INSTANT AJAX MEDICINE & INVENTORY SEARCH BAR
          Real-time interactive lookup across 1,900+ products, Panadol, & brands
         ========================================================================= */}
      <section className="relative z-20 -mt-8 sm:-mt-10 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200/80 p-5 sm:p-7">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#339719] uppercase tracking-wider mb-1">
                <Sparkles className="h-3.5 w-3.5" />
                Instant Live Medicine Directory
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-[#06316F]">
                Quick Product & Formula Search
              </h3>
            </div>
            <span className="text-xs font-medium text-gray-500">
              {ALL_PRODUCTS.length}+ Verified Products Indexed
            </span>
          </div>

          {/* Main Input */}
          <form onSubmit={handleLiveSubmit} className="relative mb-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#339719]" />
              <input
                type="text"
                value={liveQuery}
                onChange={(e) => setLiveQuery(e.target.value)}
                placeholder="Type to search Panadol, Augmentin, OTSUKA, item code, or formula..."
                className="w-full pl-12 pr-28 py-3.5 bg-[#F8FAFD] border border-[#E5E7EB] rounded-xl text-sm sm:text-base text-[#1F2937] placeholder-slate-400 focus:outline-none focus:border-[#339719] focus:bg-white focus:ring-2 focus:ring-[#339719]/20 transition-all font-medium"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {liveQuery ? (
                  <>
                    <span className="hidden sm:inline-flex text-[11px] font-mono font-bold bg-[#EBF5EA] text-[#339719] px-2 py-0.5 rounded-full border border-[#339719]/20">
                      {liveResults.length} found
                    </span>
                    <button
                      type="button"
                      onClick={() => setLiveQuery('')}
                      className="text-gray-400 hover:text-gray-600 p-1"
                      title="Clear search"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </>
                ) : (
                  <span className="hidden sm:inline-flex text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                    Live AJAX Active
                  </span>
                )}
              </div>
            </div>
          </form>

          {/* Real-time popular search shortcuts */}
          <div className="flex items-center gap-2 flex-wrap text-xs text-gray-600">
            <span className="font-semibold text-gray-400 text-xs">Popular:</span>
            {['Panadol', 'Paracetamol', 'Calpol', 'Augmentin', 'Brufen', 'Ponstan', 'Risek', 'Flagyl', 'OTSUKA', 'Ceftriaxone', 'Surgical'].map((keyword) => {
              const isActive = liveQuery.toLowerCase() === keyword.toLowerCase();
              return (
                <button
                  key={keyword}
                  type="button"
                  onClick={() => setLiveQuery(isActive ? '' : keyword)}
                  className={`min-h-[38px] px-3.5 py-1.5 rounded-full text-xs font-medium transition-all touch-manipulation flex items-center justify-center ${
                    isActive
                      ? 'bg-[#339719] text-white shadow-xs font-bold'
                      : 'bg-gray-100 hover:bg-[#EBF5EA] hover:text-[#339719] active:bg-[#dbebd8] text-gray-700'
                  }`}
                >
                  {keyword}
                </button>
              );
            })}
          </div>

          {/* Instant AJAX Live Results Dropdown Container */}
          {liveQuery && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between mb-2.5 text-xs">
                <span className="font-bold text-[#06316F]">
                  Instant Results for &ldquo;{liveQuery}&rdquo; ({liveResults.length} matches)
                </span>
                <button
                  type="button"
                  onClick={() => handleLiveSubmit()}
                  className="font-bold text-[#339719] hover:underline min-h-[44px] flex items-center gap-1.5 px-2 touch-manipulation"
                >
                  View full catalog table
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {liveResults.length === 0 ? (
                <div className="py-6 text-center text-gray-500 text-xs">
                  <Package className="h-7 w-7 text-gray-300 mx-auto mb-1.5" />
                  <p className="font-semibold text-[#06316F]">No medicine found matching &ldquo;{liveQuery}&rdquo;</p>
                  <p className="text-gray-400 mt-0.5">Try searching by generic formula, brand name, or code.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 max-h-96 overflow-y-auto pr-1">
                  {liveResults.slice(0, 8).map((product) => (
                    <div
                      key={product.id}
                      onClick={() => navigate(`/products?tab=catalog&search=${encodeURIComponent(product.name)}`)}
                      className="p-3.5 min-h-[64px] rounded-2xl border border-gray-200/70 hover:border-[#339719]/40 bg-[#FAFCFA] hover:bg-white active:bg-emerald-50/30 hover:shadow-xs transition-all cursor-pointer flex items-center justify-between gap-3 touch-manipulation"
                    >
                      <div className="min-w-0 flex-1 py-0.5">
                        <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                          <span className="font-mono text-[10px] font-bold text-[#06316F] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                            {product.code || `ID-${product.id}`}
                          </span>
                          <span className="text-[10px] font-bold text-[#339719] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 truncate max-w-[130px]">
                            {product.company}
                          </span>
                          {product.unit && (
                            <span className="text-[10px] text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                              {product.unit}
                            </span>
                          )}
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-[#06316F] hover:text-[#339719] transition-colors truncate">
                          {product.name}
                        </h4>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handleWhatsApp(e, product)}
                        className="h-11 w-11 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-[#339719]/10 hover:bg-[#339719] active:bg-[#206310] text-[#339719] hover:text-white transition-colors shrink-0 touch-manipulation"
                        title="Send WhatsApp Inquiry"
                        aria-label={`Send WhatsApp Inquiry for ${product.name}`}
                      >
                        <MessageCircle className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {liveResults.length > 8 && (
                <div className="mt-3 text-center">
                  <button
                    type="button"
                    onClick={() => handleLiveSubmit()}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#06316F] hover:text-[#339719] transition-colors py-1 px-3 rounded-lg bg-gray-50 hover:bg-gray-100"
                  >
                    <span>See all {liveResults.length} results in Catalog Directory</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>


      {/* =========================================================================
          2. THREE CORE CATEGORIES GRID SECTION (Infusion, Medicine, Surgical)
          Equal height boxes with image, badges, features and action buttons
         ========================================================================= */}
      <section className="w-full bg-[#F8FAFD] py-16 sm:py-20 lg:py-24 border-b border-[#E5E7EB]">
        <div className="w-full px-[15px]">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#339719]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#339719] mb-3">
              <ShieldCheck className="h-4 w-4" />
              Our Core Categories
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#06316F] tracking-tight leading-tight">
              Essential Healthcare Divisions
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#4B5563] leading-relaxed">
              We specialize in importing, manufacturing, and distributing three core medical pillars with certified clinical quality and unbroken cold-chain logistics.
            </p>
          </div>

          {/* 3 Columns Equal Height Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            
            {/* BOX 1: INFUSION */}
            <div className="group relative flex flex-col justify-between rounded-2xl bg-white border border-[#E5E7EB] overflow-hidden shadow-xs hover:border-[#339719]/50 hover:shadow-xl transition-all duration-300 h-full">
              <div>
                {/* Image Link */}
                <Link to="/products/infusion-catheters" className="block relative h-52 sm:h-56 w-full overflow-hidden bg-slate-100 cursor-pointer">
                  <img
                    src="https://ik.imagekit.io/sn0ctq5wd/750d9211-40ed-4839-a9e4-1112d5cf2065.jpg"
                    alt="Infusion therapy and IV sets supply"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Division Tag */}
                  <div className="absolute top-4 right-4 rounded-lg bg-[#339719] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
                    Clinical Care
                  </div>
                </Link>

                {/* Content Body */}
                <div className="p-6 sm:p-7">
                  {/* Category Header (Below Image) */}
                  <div className="mb-4">
                    <Link to="/products/infusion-catheters" className="block group/title">
                      <h3 className="text-xl sm:text-2xl font-bold text-[#06316F] group-hover/title:text-[#339719] transition-colors tracking-tight">
                        1. Infusion
                      </h3>
                    </Link>
                    <p className="text-xs font-semibold text-[#339719] mt-0.5">
                      IV Therapy & Fluid Management
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-4">
                    High precision infusions helping quick IV therapies by use of different electrolytes solutions. Key infusion brands we distribute as follows:
                  </p>

                  {/* Brands List */}
                  <div className="pt-2 border-t border-gray-100 mb-6">
                    <ul className="grid grid-cols-2 gap-2 text-xs font-semibold text-[#06316F]">
                      <li className="flex items-center gap-2">
                        <span className="h-5 w-5 rounded-full bg-[#EBF7E9] text-[#339719] font-bold text-[10px] flex items-center justify-center shrink-0">1</span>
                        <span>OTSUKA</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-5 w-5 rounded-full bg-[#EBF7E9] text-[#339719] font-bold text-[10px] flex items-center justify-center shrink-0">2</span>
                        <span>FDL</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-5 w-5 rounded-full bg-[#EBF7E9] text-[#339719] font-bold text-[10px] flex items-center justify-center shrink-0">3</span>
                        <span>ASPIL</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-5 w-5 rounded-full bg-[#EBF7E9] text-[#339719] font-bold text-[10px] flex items-center justify-center shrink-0">4</span>
                        <span>MEDISOL</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-5 w-5 rounded-full bg-[#EBF7E9] text-[#339719] font-bold text-[10px] flex items-center justify-center shrink-0">5</span>
                        <span>UNISOL</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-5 w-5 rounded-full bg-[#EBF7E9] text-[#339719] font-bold text-[10px] flex items-center justify-center shrink-0">6</span>
                        <span>ENZOL</span>
                      </li>
                      <li className="flex items-center gap-2 col-span-2 pt-0.5">
                        <span className="h-5 w-5 rounded-full bg-gray-100 text-gray-500 font-bold text-[10px] flex items-center justify-center shrink-0">7</span>
                        <span className="text-gray-500 font-medium">ETC</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="p-6 sm:p-7 pt-0">
                <Link
                  to="/products/infusion-catheters"
                  className="inline-flex items-center justify-between w-full rounded-xl bg-[#F4FAF2] px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#339719] group-hover:bg-[#339719] group-hover:text-white transition-all shadow-xs"
                >
                  <span>Read More</span>
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>


            {/* BOX 2: MEDICINE */}
            <div className="group relative flex flex-col justify-between rounded-2xl bg-white border border-[#E5E7EB] overflow-hidden shadow-xs hover:border-[#339719]/50 hover:shadow-xl transition-all duration-300 h-full">
              <div>
                {/* Image Link */}
                <Link to="/products/medicine" className="block relative h-52 sm:h-56 w-full overflow-hidden bg-slate-100 cursor-pointer">
                  <img
                    src="https://ik.imagekit.io/sn0ctq5wd/5bcbe991-3017-4b59-8463-1e8bc22c4e1d.png"
                    alt="Pharmaceuticals and critical care medicine supply"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Division Tag */}
                  <div className="absolute top-4 right-4 rounded-lg bg-[#06316F] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
                    Pharma Division
                  </div>
                </Link>

                {/* Content Body */}
                <div className="p-6 sm:p-7">
                  {/* Category Header (Below Image) */}
                  <div className="mb-4">
                    <Link to="/products/medicine" className="block group/title">
                      <h3 className="text-xl sm:text-2xl font-bold text-[#06316F] group-hover/title:text-[#339719] transition-colors tracking-tight">
                        2. Medicine
                      </h3>
                    </Link>
                    <p className="text-xs font-semibold text-[#06316F] mt-0.5">
                      Pharmaceuticals & Critical Care
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-5">
                    Authorized distributor of DRAP-compliant specialty pharmaceuticals, ICU emergency injectables, cardiology medicines, antibiotics, and strict cold-chain biologics.
                  </p>

                  {/* Features List */}
                  <div className="space-y-2.5 pt-2 border-t border-gray-100 mb-6">
                    <div className="flex items-center gap-2 text-xs font-medium text-[#06316F]">
                      <CheckCircle2 className="h-4 w-4 text-[#339719] shrink-0" />
                      <span>Specialty Oncology & ICU Injections</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-[#06316F]">
                      <CheckCircle2 className="h-4 w-4 text-[#339719] shrink-0" />
                      <span>Cardiovascular & Emergency Therapeutics</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-[#06316F]">
                      <CheckCircle2 className="h-4 w-4 text-[#339719] shrink-0" />
                      <span>Cold-Chain Monitored Storage (2°C – 8°C)</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-[#06316F]">
                      <CheckCircle2 className="h-4 w-4 text-[#339719] shrink-0" />
                      <span>100% Genuine DRAP Approved Stock</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="p-6 sm:p-7 pt-0">
                <Link
                  to="/products/medicine"
                  className="inline-flex items-center justify-between w-full rounded-xl bg-[#F4FAF2] px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#339719] group-hover:bg-[#339719] group-hover:text-white transition-all shadow-xs"
                >
                  <span>Read More</span>
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>


            {/* BOX 3: SURGICAL */}
            <div className="group relative flex flex-col justify-between rounded-2xl bg-white border border-[#E5E7EB] overflow-hidden shadow-xs hover:border-[#339719]/50 hover:shadow-xl transition-all duration-300 h-full">
              <div>
                {/* Image Link */}
                <Link to="/products/surgical-disposables" className="block relative h-52 sm:h-56 w-full overflow-hidden bg-slate-100 cursor-pointer">
                  <img
                    src="https://ik.imagekit.io/sn0ctq5wd/0e4322f1-3cc7-4454-a6d4-423dd82c98cf.png"
                    alt="Sterile surgical instruments and operating theater equipment"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Division Tag */}
                  <div className="absolute top-4 right-4 rounded-lg bg-[#339719] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
                    Operating Theater
                  </div>
                </Link>

                {/* Content Body */}
                <div className="p-6 sm:p-7">
                  {/* Category Header (Below Image) */}
                  <div className="mb-4">
                    <Link to="/products/surgical-disposables" className="block group/title">
                      <h3 className="text-xl sm:text-2xl font-bold text-[#06316F] group-hover/title:text-[#339719] transition-colors tracking-tight">
                        3. Surgical
                      </h3>
                    </Link>
                    <p className="text-xs font-semibold text-[#339719] mt-0.5">
                      Instruments & Sterile Disposables
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-5">
                    Hospital-grade surgical disposables, sterile sutures, surgical blades, surgical gloves, patient drapes, and specialized procedural packs for modern operating theaters.
                  </p>

                  {/* Features List */}
                  <div className="space-y-2.5 pt-2 border-t border-gray-100 mb-6">
                    <div className="flex items-center gap-2 text-xs font-medium text-[#06316F]">
                      <CheckCircle2 className="h-4 w-4 text-[#339719] shrink-0" />
                      <span>Surgical Blades, Scalpels & Sutures</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-[#06316F]">
                      <CheckCircle2 className="h-4 w-4 text-[#339719] shrink-0" />
                      <span>Latex & Nitrile Sterile Surgical Gloves</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-[#06316F]">
                      <CheckCircle2 className="h-4 w-4 text-[#339719] shrink-0" />
                      <span>Sterile Drapes, Gowns & OT Barrier Packs</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-[#06316F]">
                      <CheckCircle2 className="h-4 w-4 text-[#339719] shrink-0" />
                      <span>ISO 13485 & CE Certified Instruments</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="p-6 sm:p-7 pt-0">
                <Link
                  to="/products/surgical-disposables"
                  className="inline-flex items-center justify-between w-full rounded-xl bg-[#F4FAF2] px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#339719] group-hover:bg-[#339719] group-hover:text-white transition-all shadow-xs"
                >
                  <span>Read More</span>
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          3. CHECKERBOARD 2x2 ALTERNATING SPLIT SECTION (Exact Match to Reference Image)
          Row 1: [Text: Responding to Covid-19] | [Image: Virus Red Spikes 3D]
          Row 2: [Image: Female Pharmacist Shelves] | [Text: Who we are?]
         ========================================================================= */}
      <section className="w-full bg-white">
        
        {/* ROW 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full items-stretch">
          
          {/* Row 1 Left: Text Block */}
          <div className="flex flex-col justify-center px-[15px] sm:px-12 md:px-16 lg:px-20 xl:px-24 py-16 md:py-24 bg-white">
            <div className="max-w-xl">
              <h2 className="text-2xl sm:text-3xl md:text-[34px] font-normal text-[#06316F] leading-tight mb-5 tracking-tight">
                Responding to Covid-19:
              </h2>
              <div className="space-y-4 text-sm sm:text-[15px] text-[#555555] leading-relaxed">
                <p>
                  We have played an essential role in making supplies and equipment available to our customers. We remain devoted to supplying essential items in this time of need.
                </p>
                <p>
                  From certified personal protective equipment (PPE), sterilizing agents, and respiratory care accessories to life-saving emergency pharmaceuticals, our teams maintain unbroken cold chains and rapid dispatch protocols nationwide.
                </p>
              </div>
              <div className="mt-7">
                <Link
                  to="/products/wound-care-infection"
                  className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-[#339719] hover:underline gap-1.5"
                >
                  View Infection Control & PPE
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Row 1 Right: Image (Coronavirus Red Spikes) */}
          <div className="relative min-h-[320px] sm:min-h-[380px] lg:min-h-[460px] w-full overflow-hidden bg-[#06316F]">
            <img
              src="https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=1400&q=85"
              alt="Coronavirus microscopic cellular model with red spikes"
              className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
            />
          </div>

        </div>

        {/* ROW 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full items-stretch border-t border-[#F0F0F0]">
          
          {/* Row 2 Left: Image (Who we are) - On mobile, displayed first */}
          <div className="relative min-h-[320px] sm:min-h-[380px] lg:min-h-[460px] w-full overflow-hidden bg-gray-100 order-2 lg:order-1">
            <img
              src="https://cshpharmacy.com.pk/cdn/shop/files/csh-pharmacy-cerostech.jpg?v=1720340509&width=1500"
              alt="Medical equipment, pharmaceuticals, and surgical solutions distribution"
              className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Row 2 Right: Text Block (Who we are?) */}
          <div className="flex flex-col justify-center px-[15px] sm:px-12 md:px-16 lg:px-20 xl:px-24 py-16 md:py-24 bg-white order-1 lg:order-2">
            <div className="max-w-xl">
              <h2 className="text-2xl sm:text-3xl md:text-[34px] font-normal text-[#06316F] leading-tight mb-5 tracking-tight">
                Who we are?
              </h2>
              <div className="space-y-4 text-sm sm:text-[15px] text-[#555555] leading-relaxed">
                <p>
                  Nafisa Traders founded in 2010, is one of the leading companies that markets and distributes high technology medical equipment, specialty pharmaceuticals, and surgical supplies in Pakistan.
                </p>
                <p>
                  Over the last couple of decades, we have partnered with suppliers from over 15 countries and connected them to customers all over Pakistan. Headquartered in Karachi at Densohall Wholesale Market, our network spans government institutions, tertiary care hospitals, and independent pharmacies.
                </p>
              </div>
              <div className="mt-7">
                <Link
                  to="/about"
                  className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-[#339719] hover:underline gap-1.5"
                >
                  Read Our Full Story & Milestones
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* ROW 3: WHY CHOOSE US (Left Content, Right Image) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full items-stretch border-t border-[#F0F0F0]">
          
          {/* Row 3 Left: Text Block (Why Choose Nafisa Traders?) */}
          <div className="flex flex-col justify-center px-[15px] sm:px-12 md:px-16 lg:px-20 xl:px-24 py-16 md:py-24 bg-white">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#339719]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#339719] mb-4">
                <ShieldCheck className="h-3.5 w-3.5" />
                Why Choose Us
              </span>
              
              <h2 className="text-2xl sm:text-3xl md:text-[34px] font-normal text-[#06316F] leading-tight mb-5 tracking-tight">
                Why Choose Nafisa Traders?
              </h2>
              
              <p className="text-sm sm:text-[15px] text-[#555555] leading-relaxed mb-6">
                As an established leader in Karachi's Medicine Market, we provide hospitals, clinics, and pharmacies across Pakistan with dependable procurement, uncompromised quality, and fast institutional dispatch.
              </p>

              {/* Key Features List */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#339719]/10 text-[#339719] mt-0.5">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#06316F]">
                      100% DRAP-Compliant & Verified Supply
                    </h4>
                    <p className="text-xs text-[#666666] leading-relaxed mt-0.5">
                      Batch-tested pharmaceuticals and certified surgical disposables with full regulatory compliance.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#339719]/10 text-[#339719] mt-0.5">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#06316F]">
                      Direct Global Sourcing Network
                    </h4>
                    <p className="text-xs text-[#666666] leading-relaxed mt-0.5">
                      Partnerships with trusted international and local manufacturers across 15+ countries.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#339719]/10 text-[#339719] mt-0.5">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#06316F]">
                      Cold-Chain & Climate-Controlled Storage
                    </h4>
                    <p className="text-xs text-[#666666] leading-relaxed mt-0.5">
                      Strict temperature-managed warehousing preserving drug potency, sterility, and efficacy.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#339719]/10 text-[#339719] mt-0.5">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#06316F]">
                      Rapid Nationwide Institutional Dispatch
                    </h4>
                    <p className="text-xs text-[#666666] leading-relaxed mt-0.5">
                      Dedicated hospital procurement desk ensuring same-day dispatch and emergency fulfillment.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#339719] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#2b7d15] transition-all shadow-xs"
                >
                  Explore Specialties
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  to="/quality-compliance"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#06316F] hover:text-[#339719] transition-colors"
                >
                  View Quality Standards
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Row 3 Right: Image (Healthcare Specialist & High Quality Medicine Supplies) */}
          <div className="relative min-h-[360px] sm:min-h-[420px] lg:min-h-[520px] w-full overflow-hidden bg-[#06316F]">
            <img
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1400&q=85"
              alt="Medical professional reviewing healthcare supplies and diagnostics"
              className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
            />
            {/* Subtle Overlay Tag for Credibility */}
            <div className="absolute bottom-6 left-6 right-6 sm:left-8 sm:right-auto bg-[#06316F]/90 backdrop-blur-md text-white p-4 rounded-xl border border-white/20 shadow-lg max-w-sm">
              <div className="flex items-center gap-2 text-[#339719] font-bold text-xs uppercase tracking-wider mb-1">
                <ShieldCheck className="h-4 w-4" /> Trusted Healthcare Distributor
              </div>
              <p className="text-xs text-slate-200">
                Supplying 85+ healthcare institutions & 350+ pharmacies across 18+ cities in Pakistan.
              </p>
            </div>
          </div>

        </div>

      </section>


      {/* =========================================================================
          3. FACTS AND FIGURES SECTION (Full width with 15px padding)
          White background, centered text, 4 green highlighted stats
         ========================================================================= */}
      <section className="w-full py-16 md:py-24 bg-[#FFFFFF] border-t border-[#EAEAEA]">
        <div className="w-full px-[15px]">
          
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-3xl md:text-4xl font-normal text-[#06316F] tracking-tight mb-4">
              Facts and Figures
            </h2>
            <p className="text-sm md:text-[15px] text-[#555555] leading-relaxed">
              Our dedicated distribution teams in centers throughout the country ensure a constant supply to pharmacies, dispensing doctors and hospital-supply pharmacies, helping vital provisions flow into our healthcare system.
            </p>
          </div>

          {/* 4 Stats Grid spanning full width */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 text-center w-full">
            
            {/* Stat 1 */}
            <div className="space-y-2 p-2 sm:p-4">
              <div className="text-4xl sm:text-5xl md:text-6xl font-black text-[#339719] tracking-tight font-sans">
                +350
              </div>
              <div className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#06316F]">
                Pharmacies
              </div>
              <p className="text-[11px] text-gray-500 max-w-xs mx-auto">
                Retail & community chemist partners
              </p>
            </div>

            {/* Stat 2 */}
            <div className="space-y-2 p-2 sm:p-4">
              <div className="text-4xl sm:text-5xl md:text-6xl font-black text-[#339719] tracking-tight font-sans">
                85
              </div>
              <div className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#06316F]">
                Medical Institutions
              </div>
              <p className="text-[11px] text-gray-500 max-w-xs mx-auto">
                Tertiary hospitals, clinics & labs
              </p>
            </div>

            {/* Stat 3 */}
            <div className="space-y-2 p-2 sm:p-4">
              <div className="text-4xl sm:text-5xl md:text-6xl font-black text-[#339719] tracking-tight font-sans">
                12,500
              </div>
              <div className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#06316F]">
                Customers
              </div>
              <p className="text-[11px] text-gray-500 max-w-xs mx-auto">
                Served with certified medical solutions
              </p>
            </div>

            {/* Stat 4 */}
            <div className="space-y-2 p-2 sm:p-4">
              <div className="text-4xl sm:text-5xl md:text-6xl font-black text-[#339719] tracking-tight font-sans">
                18
              </div>
              <div className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#06316F]">
                Cities Across Pakistan
              </div>
              <p className="text-[11px] text-gray-500 max-w-xs mx-auto">
                Fast logistic reach & temperature-controlled transit
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          4. OUR BRANDS SECTION (Exact Match to Reference Image)
          Carousel with Left/Right navigation and brand cards
         ========================================================================= */}
      <OurBrandsSlider />

    </div>
  );
};

export default HomePage;
