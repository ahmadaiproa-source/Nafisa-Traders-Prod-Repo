import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  X, 
  Filter, 
  Building2, 
  Package, 
  Tag, 
  MessageSquare, 
  MessageCircle,
  Copy, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight,
  SlidersHorizontal,
  RefreshCw,
  FileText,
  AlertCircle
} from 'lucide-react';
import { ALL_PRODUCTS, UNIQUE_COMPANIES, UNIQUE_UNITS, UNIQUE_CATEGORIES, ProductItem, getProductRelevanceScore, searchCatalog } from '../data/productCatalog';

interface ProductDirectoryProps {
  initialSearch?: string;
}

export const ProductDirectory: React.FC<ProductDirectoryProps> = ({ initialSearch = '' }) => {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedCompany, setSelectedCompany] = useState<string>('ALL');
  const [selectedUnit, setSelectedUnit] = useState<string>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Inquire Modal state
  const [activeInquiryProduct, setActiveInquiryProduct] = useState<ProductItem | null>(null);
  const [inquiryQuantity, setInquiryQuantity] = useState('1');
  const [clientInstitution, setClientInstitution] = useState('');

  // Update searchTerm if initialSearch changes
  useEffect(() => {
    setSearchTerm(initialSearch || '');
  }, [initialSearch]);

  // Reset to page 1 whenever search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedCompany, selectedUnit, itemsPerPage]);

  // Filter products with relevance ranking and searchCatalog
  const { filteredProducts, filterOverriddenNotice } = useMemo(() => {
    const term = searchTerm.trim();

    // 1. Get base search results if search term exists, or all products
    const baseList = term ? searchCatalog(term) : ALL_PRODUCTS;

    // 2. Apply active filters
    const hasCategoryFilter = selectedCategory !== 'ALL';
    const hasCompanyFilter = selectedCompany !== 'ALL';
    const hasUnitFilter = selectedUnit !== 'ALL';

    const filtered = baseList.filter((item) => {
      // Category filter
      if (hasCategoryFilter && item.categoryTag !== selectedCategory) {
        return false;
      }
      // Company filter
      if (hasCompanyFilter && item.company.toLowerCase() !== selectedCompany.toLowerCase()) {
        return false;
      }
      // Unit filter
      if (hasUnitFilter && item.unit.toLowerCase() !== selectedUnit.toLowerCase()) {
        return false;
      }
      return true;
    });

    // 3. Fallback: If user searched a term, but strict category/company filtered out all items
    // while baseList has matches, show baseList so the user is never given a false 0-results screen!
    if (term && filtered.length === 0 && baseList.length > 0 && (hasCategoryFilter || hasCompanyFilter || hasUnitFilter)) {
      return {
        filteredProducts: baseList,
        filterOverriddenNotice: `Showing ${baseList.length} matching items across all categories & manufacturers (no items matched within your active filters).`
      };
    }

    return {
      filteredProducts: filtered,
      filterOverriddenNotice: null
    };
  }, [searchTerm, selectedCategory, selectedCompany, selectedUnit]);

  // Pagination calculation
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, startIndex, itemsPerPage]);

  // Handle copy code
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('ALL');
    setSelectedCompany('ALL');
    setSelectedUnit('ALL');
    setCurrentPage(1);
  };

  // Send WhatsApp Inquiry
  const handleWhatsAppInquiry = (product: ProductItem, customQty?: string, institution?: string) => {
    const qty = customQty || inquiryQuantity || '1';
    const inst = institution !== undefined ? institution : clientInstitution;
    const text = `Hello Nafisa Traders, I am inquiring about institutional pricing & supply for:\n\n*Product:* ${product.name}\n*Item Code:* ${product.code}\n*Manufacturer:* ${product.company}\n*Packaging:* ${product.unit}\n*Quantity Requested:* ${qty}\n${inst ? `*Institution:* ${inst}\n` : ''}\nPlease confirm current batch availability and institutional price quote.`;
    const whatsappUrl = `https://wa.me/923002433552?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div id="product-directory" className="w-full">
      {/* Top Controls Card */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-xs p-5 md:p-6 mb-8">
        
        {/* Main Search Bar with Real-time AJAX-style live query indicator */}
        <div className="relative mb-3">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#339719]">
            <Search className="h-5 w-5" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type any medicine name, code (e.g. A01520), or company to instantly filter..."
            className="w-full pl-12 pr-28 py-3.5 bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl text-base text-[#1F2937] placeholder-slate-400 focus:outline-none focus:border-[#339719] focus:bg-white focus:ring-2 focus:ring-[#339719]/20 transition-all font-medium"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-1.5">
            {searchTerm ? (
              <>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono font-bold bg-[#EBF5EA] text-[#339719] px-2 py-0.5 rounded-full border border-[#339719]/20">
                  {totalItems} results
                </span>
                <button
                  onClick={() => setSearchTerm('')}
                  className="flex items-center justify-center p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  title="Clear search"
                >
                  <X className="h-5 w-5" />
                </button>
              </>
            ) : (
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium text-gray-400 bg-gray-100/80 border border-gray-200 px-2 py-0.5 rounded-md">
                Live Filter
              </span>
            )}
          </div>
        </div>

        {/* Real-time popular search shortcuts */}
        <div className="flex items-center gap-1.5 flex-wrap mb-5 text-xs text-gray-500">
          <span className="font-semibold text-gray-400 text-[11px]">Quick Search:</span>
          {['Panadol', 'Paracetamol', 'Calpol', 'Augmentin', 'Brufen', 'Ponstan', 'Risek', 'Flagyl', 'OTSUKA', 'Ceftriaxone', 'Surgical'].map((keyword) => {
            const isActive = searchTerm.toLowerCase() === keyword.toLowerCase();
            return (
              <button
                key={keyword}
                onClick={() => setSearchTerm(isActive ? '' : keyword)}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-all ${
                  isActive
                    ? 'bg-[#339719] text-white shadow-xs'
                    : 'bg-gray-100 hover:bg-[#EBF5EA] hover:text-[#339719] text-gray-700'
                }`}
              >
                {keyword}
              </button>
            );
          })}
        </div>

        {/* Category Quick Tags */}
        <div className="mb-5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5">
            <Tag className="h-3.5 w-3.5 text-[#339719]" />
            <span>Category Filters</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('ALL')}
              className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-semibold transition-all touch-manipulation flex items-center justify-center ${
                selectedCategory === 'ALL'
                  ? 'bg-[#06316F] text-white shadow-xs'
                  : 'bg-[#F8F9FA] text-[#4B5563] hover:bg-[#E5E7EB] border border-gray-200/60'
              }`}
            >
              All Items ({ALL_PRODUCTS.length})
            </button>
            {UNIQUE_CATEGORIES.map((cat) => {
              const count = ALL_PRODUCTS.filter((p) => p.categoryTag === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-semibold transition-all touch-manipulation flex items-center justify-center ${
                    selectedCategory === cat
                      ? 'bg-[#339719] text-white shadow-xs'
                      : 'bg-[#F8F9FA] text-[#4B5563] hover:bg-[#E5E7EB] border border-gray-200/60'
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Secondary Filters Bar */}
        <div className="pt-4 border-t border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>Filter By:</span>
            </div>

            {/* Manufacturer Dropdown */}
            <div className="relative">
              <select
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                aria-label="Filter by Manufacturer or Brand"
                className="text-xs sm:text-sm bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 min-h-[44px] text-[#1F2937] font-medium focus:outline-none focus:border-[#339719] focus:bg-white touch-manipulation"
              >
                <option value="ALL">All Manufacturers ({UNIQUE_COMPANIES.length})</option>
                {UNIQUE_COMPANIES.map((company) => (
                  <option key={company} value={company}>
                    {company}
                  </option>
                ))}
              </select>
            </div>

            {/* Packaging Unit Dropdown */}
            <div className="relative">
              <select
                value={selectedUnit}
                onChange={(e) => setSelectedUnit(e.target.value)}
                aria-label="Filter by Packaging Unit"
                className="text-xs sm:text-sm bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 min-h-[44px] text-[#1F2937] font-medium focus:outline-none focus:border-[#339719] focus:bg-white touch-manipulation"
              >
                <option value="ALL">All Units / Packaging ({UNIQUE_UNITS.length})</option>
                {UNIQUE_UNITS.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset Filters button if any active */}
            {(searchTerm || selectedCategory !== 'ALL' || selectedCompany !== 'ALL' || selectedUnit !== 'ALL') && (
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-800 font-medium px-3 py-2 hover:bg-rose-50 rounded-xl min-h-[44px] transition-colors touch-manipulation"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* Rows per page selector */}
          <div className="flex items-center gap-2 text-xs text-gray-500 font-medium ml-auto md:ml-0">
            <span>Show:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              aria-label="Items per page"
              className="text-xs bg-[#F8F9FA] border border-[#E5E7EB] rounded-lg px-2.5 py-1.5 text-[#1F2937] font-semibold focus:outline-none focus:border-[#339719]"
            >
              <option value={25}>25 items</option>
              <option value={50}>50 items</option>
              <option value={100}>100 items</option>
              <option value={200}>200 items</option>
            </select>
          </div>
        </div>

      </div>

      {/* Results Header Info Bar */}
      {filterOverriddenNotice && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0" />
            <span>{filterOverriddenNotice}</span>
          </div>
          <button
            onClick={handleResetFilters}
            className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg text-xs whitespace-nowrap transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 px-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-[#06316F]">
            Product Catalogue
          </span>
          <span className="bg-[#EBF5EA] text-[#339719] font-mono text-xs font-bold px-2.5 py-0.5 rounded-full">
            {totalItems.toLocaleString()} {totalItems === 1 ? 'item' : 'items'} found
          </span>
          {searchTerm && (
            <span className="text-xs text-gray-400">
              for &ldquo;<span className="text-[#06316F] font-semibold">{searchTerm}</span>&rdquo;
            </span>
          )}
        </div>

        <div className="text-xs text-gray-500">
          Showing <span className="font-semibold text-gray-800">{totalItems === 0 ? 0 : startIndex + 1}</span> - <span className="font-semibold text-gray-800">{Math.min(startIndex + itemsPerPage, totalItems)}</span> of <span className="font-semibold text-gray-800">{totalItems}</span>
        </div>
      </div>

      {/* No Results State */}
      {totalItems === 0 && (
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-12 text-center my-6">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 mb-4">
            <AlertCircle className="h-7 w-7" />
          </div>
          <h3 className="text-lg font-bold text-[#06316F] mb-1">No medicines or items found</h3>
          <p className="text-sm text-gray-500 max-w-md mx-auto mb-5">
            We could not find any matching products for &ldquo;{searchTerm}&rdquo;. Try checking the spelling, or search by generic item name, brand, or code.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 bg-[#339719] text-white text-xs font-semibold rounded-xl hover:bg-[#2b7d15] transition-colors"
            >
              Reset All Filters
            </button>
            <button
              onClick={() => setSearchTerm('INFUSION')}
              className="px-3.5 py-2 bg-gray-100 text-gray-700 text-xs font-semibold rounded-xl hover:bg-gray-200 transition-colors"
            >
              Search &ldquo;Infusion&rdquo;
            </button>
            <button
              onClick={() => setSearchTerm('PARACETAMOL')}
              className="px-3.5 py-2 bg-gray-100 text-gray-700 text-xs font-semibold rounded-xl hover:bg-gray-200 transition-colors"
            >
              Search &ldquo;Paracetamol&rdquo;
            </button>
          </div>
        </div>
      )}

      {/* DESKTOP TABLE VIEW */}
      {totalItems > 0 && (
        <div className="hidden lg:block bg-white rounded-2xl border border-[#E5E7EB] shadow-xs overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8F9FA] border-b border-[#E5E7EB] text-[11px] font-bold uppercase tracking-wider text-gray-500">
                  <th className="py-3.5 px-4 w-16 text-center">#</th>
                  <th className="py-3.5 px-4 w-28">Item Code</th>
                  <th className="py-3.5 px-4">Medicine / Product Description</th>
                  <th className="py-3.5 px-4 w-44">Manufacturer</th>
                  <th className="py-3.5 px-4 w-32">Packaging</th>
                  <th className="py-3.5 px-4 w-40">Classification</th>
                  <th className="py-3.5 px-4 w-32 text-right">Pricing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F3F5] text-xs">
                {displayedProducts.map((item) => (
                  <tr 
                    key={`${item.id}-${item.code}`} 
                    className="hover:bg-[#F9FBFC] transition-colors group"
                  >
                    {/* ID */}
                    <td className="py-3.5 px-4 text-center font-mono text-gray-400 font-medium">
                      {item.id}
                    </td>

                    {/* Code */}
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleCopyCode(item.code)}
                        className="inline-flex items-center gap-1.5 font-mono font-bold text-[#06316F] bg-gray-100/90 hover:bg-gray-200/80 px-2.5 py-1.5 min-h-[36px] rounded-lg transition-colors text-[11px] touch-manipulation"
                        title="Click to copy item code"
                      >
                        <span>{item.code}</span>
                        {copiedCode === item.code ? (
                          <Check className="h-3.5 w-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="h-3.5 w-3.5 text-gray-400 group-hover:text-gray-600" />
                        )}
                      </button>
                    </td>

                    {/* Name */}
                    <td 
                      className="py-3.5 px-4 cursor-pointer"
                      onClick={() => {
                        setActiveInquiryProduct(item);
                        setInquiryQuantity('1');
                      }}
                      title="Click to view details & inquire"
                    >
                      <div className="font-bold text-[#1F2937] group-hover:text-[#339719] transition-colors flex items-center gap-1.5">
                        <span>{item.name}</span>
                        <span className="opacity-0 group-hover:opacity-100 text-[10px] text-[#339719] font-medium transition-opacity">
                          &bull; Inquire
                        </span>
                      </div>
                    </td>

                    {/* Company */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 text-gray-700 font-medium">
                        <Building2 className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                        <span className="truncate">{item.company}</span>
                      </div>
                    </td>

                    {/* Unit */}
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700">
                        <Package className="h-3.5 w-3.5 text-slate-400" />
                        {item.unit}
                      </span>
                    </td>

                    {/* Category Tag */}
                    <td className="py-3.5 px-4">
                      <span className="text-[11px] text-gray-500 bg-gray-50 px-2.5 py-1 rounded border border-gray-200/50">
                        {item.categoryTag}
                      </span>
                    </td>

                    {/* Action Button */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleWhatsAppInquiry(item)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] rounded-lg text-xs font-bold text-white bg-[#339719] hover:bg-[#2b7d15] transition-all shadow-2xs group/btn touch-manipulation"
                        title="Get instant price quote on WhatsApp"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>Get Price</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MOBILE / TABLET CARD VIEW */}
      {totalItems > 0 && (
        <div className="block lg:hidden space-y-3.5 mb-6">
          {displayedProducts.map((item) => (
            <div
              key={`mob-${item.id}-${item.code}`}
              className="bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-5 shadow-xs space-y-3.5 hover:border-[#339719]/40 transition-all"
            >
              {/* Header info & Code */}
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopyCode(item.code)}
                      className="inline-flex items-center gap-1.5 font-mono font-bold text-[#06316F] bg-[#EEF4FC] hover:bg-[#dbe7f9] active:bg-[#c9dbf5] px-3 py-1.5 min-h-[40px] rounded-xl text-xs transition-colors touch-manipulation"
                      title="Tap to copy item code"
                      aria-label={`Copy item code ${item.code}`}
                    >
                      <span>{item.code}</span>
                      {copiedCode === item.code ? (
                        <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      ) : (
                        <Copy className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                      )}
                    </button>
                    <span className="text-[11px] font-mono text-gray-400 font-medium">
                      #{item.id}
                    </span>
                  </div>

                  {/* Accessible touch-target for product title */}
                  <button
                    type="button"
                    onClick={() => {
                      setActiveInquiryProduct(item);
                      setInquiryQuantity('1');
                    }}
                    className="text-left w-full min-h-[44px] py-1 flex items-center font-bold text-sm sm:text-base text-[#1F2937] hover:text-[#339719] active:text-[#257313] transition-colors cursor-pointer touch-manipulation group"
                    title="Tap to view specifications & institutional RFQ"
                  >
                    <span className="group-hover:underline decoration-2 underline-offset-2 leading-snug">
                      {item.name}
                    </span>
                  </button>
                </div>

                <span className="shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                  {item.unit}
                </span>
              </div>

              {/* Manufacturer & Category Details */}
              <div className="flex items-center justify-between text-xs pt-2.5 border-t border-gray-100">
                <div className="text-gray-500 font-medium flex items-center gap-1.5 truncate mr-2">
                  <Building2 className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                  <span className="text-gray-400">Mfg: </span>
                  <span className="font-semibold text-gray-800 truncate">{item.company}</span>
                </div>
                <div className="text-[11px] text-gray-600 bg-gray-50 px-2 py-0.5 rounded border border-gray-100 shrink-0">
                  {item.categoryTag}
                </div>
              </div>

              {/* Touch-Accessible Dual Action Buttons */}
              <div className="pt-1.5 grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setActiveInquiryProduct(item);
                    setInquiryQuantity('1');
                  }}
                  className="min-h-[46px] px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-[#06316F] bg-[#EEF4FC] hover:bg-[#dbe7f9] active:bg-[#c9dbf5] border border-blue-100/80 flex items-center justify-center gap-1.5 transition-all touch-manipulation"
                  title="View specifications & institutional RFQ"
                >
                  <FileText className="h-4 w-4 shrink-0 text-[#06316F]" />
                  <span>RFQ & Specs</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleWhatsAppInquiry(item)}
                  className="min-h-[46px] px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#339719] hover:bg-[#2b7d15] active:bg-[#206310] flex items-center justify-center gap-2 shadow-xs transition-all touch-manipulation"
                  title="Get instant price quote on WhatsApp"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" />
                  <span>Get Price</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PAGINATION CONTROLS */}
      {totalPages > 1 && (
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs sm:text-sm text-gray-500 font-medium">
            Page <span className="font-bold text-gray-800">{currentPage}</span> of <span className="font-bold text-gray-800">{totalPages}</span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* First Page */}
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="h-11 w-11 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 active:bg-gray-100 disabled:opacity-30 disabled:pointer-events-none transition-colors touch-manipulation"
              title="First Page"
              aria-label="First Page"
            >
              <ChevronsLeft className="h-4 w-4" />
            </button>

            {/* Prev Page */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="h-11 w-11 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 active:bg-gray-100 disabled:opacity-30 disabled:pointer-events-none transition-colors touch-manipulation"
              title="Previous Page"
              aria-label="Previous Page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Page indicator pills */}
            <div className="flex items-center gap-1.5 px-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum = currentPage;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`h-11 min-w-[44px] px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center transition-all touch-manipulation ${
                      currentPage === pageNum
                        ? 'bg-[#06316F] text-white shadow-xs'
                        : 'text-gray-700 bg-gray-50 hover:bg-gray-100 active:bg-gray-200'
                    }`}
                    aria-label={`Page ${pageNum}`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            {/* Next Page */}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="h-11 w-11 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 active:bg-gray-100 disabled:opacity-30 disabled:pointer-events-none transition-colors touch-manipulation"
              title="Next Page"
              aria-label="Next Page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            {/* Last Page */}
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="h-11 w-11 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 active:bg-gray-100 disabled:opacity-30 disabled:pointer-events-none transition-colors touch-manipulation"
              title="Last Page"
              aria-label="Last Page"
            >
              <ChevronsRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* QUICK INQUIRY MODAL */}
      {activeInquiryProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div 
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveInquiryProduct(null)}
              className="absolute top-4 right-4 h-11 w-11 min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 mb-4 pr-12">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EBF5EA] text-[#339719]">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-[#06316F]">Product Price & Supply Inquiry</h3>
                <p className="text-xs text-gray-500">Fast quote for hospitals, clinics & pharmacies</p>
              </div>
            </div>

            {/* Product Summary Box */}
            <div className="bg-[#F8F9FA] rounded-xl p-4 border border-gray-200/80 mb-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#06316F] bg-white px-2 py-0.5 rounded border border-gray-200">
                  {activeInquiryProduct.code}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-slate-800">
                  {activeInquiryProduct.unit}
                </span>
              </div>
              <div className="font-bold text-sm text-[#1F2937]">
                {activeInquiryProduct.name}
              </div>
              <div className="text-xs text-gray-500 flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 text-gray-400" />
                <span>Manufacturer / Brand: <strong className="text-gray-700">{activeInquiryProduct.company}</strong></span>
              </div>
            </div>

            {/* Inquiry Form Fields */}
            <div className="space-y-3.5 mb-6">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Estimated Quantity ({activeInquiryProduct.unit})
                </label>
                <input
                  type="text"
                  value={inquiryQuantity}
                  onChange={(e) => setInquiryQuantity(e.target.value)}
                  placeholder="e.g. 50, 100, 500 units"
                  className="w-full px-4 py-3 min-h-[46px] bg-[#F8F9FA] border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#339719] focus:bg-white touch-manipulation"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Hospital / Pharmacy / Organization Name (Optional)
                </label>
                <input
                  type="text"
                  value={clientInstitution}
                  onChange={(e) => setClientInstitution(e.target.value)}
                  placeholder="e.g. Shifa International, Civil Hospital, MediCare Pharmacy"
                  className="w-full px-4 py-3 min-h-[46px] bg-[#F8F9FA] border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#339719] focus:bg-white touch-manipulation"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => handleWhatsAppInquiry(activeInquiryProduct, inquiryQuantity, clientInstitution)}
                className="w-full sm:flex-1 min-h-[48px] py-3.5 px-4 bg-[#339719] hover:bg-[#2b7d15] active:bg-[#206310] text-white text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs touch-manipulation"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Get Price on WhatsApp</span>
              </button>
              <button
                onClick={() => setActiveInquiryProduct(null)}
                className="w-full sm:w-auto min-h-[48px] py-3.5 px-5 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 text-sm font-bold rounded-xl transition-colors touch-manipulation"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
