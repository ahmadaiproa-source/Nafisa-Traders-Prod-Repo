import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, MessageCircle, Package, ArrowRight, Pill } from 'lucide-react';
import { ALL_PRODUCTS, searchCatalog, ProductItem } from '../data/productCatalog';

interface HeaderSearchProps {
  // Optional callback if needed
  className?: string;
}

export const HeaderSearch: React.FC<HeaderSearchProps> = ({ className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDesktopOpen, setIsDesktopOpen] = useState(false);
  const [isMobileSearchActive, setIsMobileSearchActive] = useState(false);

  const desktopContainerRef = useRef<HTMLDivElement>(null);
  const desktopInputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Close desktop dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        desktopContainerRef.current &&
        !desktopContainerRef.current.contains(event.target as Node)
      ) {
        setIsDesktopOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        desktopInputRef.current?.focus();
        setIsDesktopOpen(true);
      } else if (e.key === 'Escape') {
        setIsDesktopOpen(false);
        setIsMobileSearchActive(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto focus mobile input when mobile search is activated
  useEffect(() => {
    if (isMobileSearchActive) {
      setTimeout(() => {
        mobileInputRef.current?.focus();
      }, 150);
    }
  }, [isMobileSearchActive]);

  // Live filter results using searchCatalog (handles "medicine", brands, formulas, codes)
  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim();
    if (!query) return [];
    return searchCatalog(query);
  }, [searchTerm]);

  // Quick suggestion chips with Panadol prominent
  const quickSuggestions = [
    { label: 'Panadol', query: 'panadol' },
    { label: 'Paracetamol', query: 'paracetamol' },
    { label: 'Augmentin', query: 'augmentin' },
    { label: 'Brufen', query: 'brufen' },
    { label: 'Ponstan', query: 'ponstan' },
    { label: 'Risek', query: 'risek' },
    { label: 'OTSUKA', query: 'OTSUKA' },
    { label: 'FDL', query: 'FDL' },
    { label: 'Injections', query: 'INJ' },
    { label: 'Surgical', query: 'SURGICAL' },
  ];

  const handleSelectProduct = (product: ProductItem) => {
    setIsDesktopOpen(false);
    setIsMobileSearchActive(false);
    navigate(`/products?tab=catalog&search=${encodeURIComponent(product.name)}`);
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = searchTerm.trim();
    if (!query) return;
    setIsDesktopOpen(false);
    setIsMobileSearchActive(false);
    navigate(`/products?tab=catalog&search=${encodeURIComponent(query)}`);
  };

  const handleWhatsAppInquiry = (e: React.MouseEvent, product: ProductItem) => {
    e.stopPropagation();
    const message = `Hello Nafisa Traders,\nI am inquiring about institutional availability & quote for:\n\n*Product:* ${product.name}\n*Item Code:* ${product.code}\n*Company:* ${product.company}\n*Unit:* ${product.unit}\n\nPlease share institutional quotation.`;
    const url = `https://wa.me/923002433552?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className={`relative flex items-center ${className}`}>
      {/* ========================================================= */}
      {/* 1. DESKTOP SEARCH BAR (visible on screens >= lg)          */}
      {/* ========================================================= */}
      <div ref={desktopContainerRef} className="hidden lg:block relative">
        <form onSubmit={handleSearchSubmit} className="relative flex items-center">
          <div className="relative">
            <input
              ref={desktopInputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                if (!isDesktopOpen) setIsDesktopOpen(true);
              }}
              onFocus={() => setIsDesktopOpen(true)}
              placeholder="Search Panadol, medicines, brands..."
              className="w-48 xl:w-64 2xl:w-72 pl-9 pr-8 py-2 text-xs font-medium text-[#1F2937] placeholder-slate-400 bg-[#F4FAF2] border border-[#E5E7EB] rounded-full focus:outline-none focus:border-[#339719] focus:bg-white focus:w-72 xl:focus:w-80 transition-all duration-300 shadow-2xs focus:ring-2 focus:ring-[#339719]/15"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#339719]" />
            {searchTerm ? (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5"
                title="Clear search"
              >
                <X className="h-3 w-3" />
              </button>
            ) : (
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 hidden 2xl:inline-block text-[9px] font-mono font-bold text-gray-400 bg-white border border-gray-200 px-1.5 py-0.5 rounded pointer-events-none">
                ⌘K
              </span>
            )}
          </div>
        </form>

        {/* Desktop Autocomplete Dropdown */}
        {isDesktopOpen && (
          <div className="absolute top-full right-0 mt-2 w-[440px] 2xl:w-[500px] bg-white rounded-2xl shadow-2xl border border-[#E5E7EB] z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
            {/* Header info */}
            <div className="px-4 py-2.5 bg-[#F8F9FA] border-b border-[#EAEAEA] flex items-center justify-between text-xs">
              <span className="font-bold text-[#06316F] flex items-center gap-1.5">
                <Search className="h-3.5 w-3.5 text-[#339719]" />
                {searchTerm ? `Results for "${searchTerm}"` : 'Institutional Medicine Search'}
              </span>
              <span className="text-[10px] text-gray-500 font-medium">
                {searchTerm ? `${filteredProducts.length} items found` : `${ALL_PRODUCTS.length}+ products indexed`}
              </span>
            </div>

            {/* Quick popular tags */}
            <div className="p-3 border-b border-gray-100 bg-white">
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                Quick Filters:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {quickSuggestions.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      setSearchTerm(item.query);
                      desktopInputRef.current?.focus();
                    }}
                    className={`text-[10.5px] font-semibold px-2.5 py-0.5 rounded-md transition-colors ${
                      searchTerm.toLowerCase() === item.query.toLowerCase()
                        ? 'bg-[#06316F] text-white'
                        : 'bg-[#F4FAF2] text-[#339719] hover:bg-[#339719] hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Results list */}
            <div className="max-h-[360px] overflow-y-auto divide-y divide-gray-100">
              {searchTerm && filteredProducts.length === 0 ? (
                <div className="py-8 text-center px-4">
                  <Package className="h-8 w-8 text-gray-300 mx-auto mb-1.5" />
                  <p className="text-xs font-bold text-[#06316F]">
                    No medicines found matching &ldquo;{searchTerm}&rdquo;
                  </p>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Try searching by generic formula, brand name (e.g. Otsuka, GSK, FDL), or item code.
                  </p>
                </div>
              ) : (
                (searchTerm ? filteredProducts.slice(0, 8) : ALL_PRODUCTS.slice(0, 6)).map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product)}
                    className="p-3 hover:bg-[#F4FAF2]/70 cursor-pointer transition-colors flex items-center justify-between gap-3 group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="font-mono text-[9px] font-bold text-[#06316F] bg-blue-50 px-1.5 py-0.2 rounded border border-blue-100">
                          {product.code || `ID-${product.id}`}
                        </span>
                        <span className="text-[9px] font-bold text-[#339719] bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-100">
                          {product.company}
                        </span>
                        {product.unit && (
                          <span className="text-[9px] text-gray-500 bg-gray-100 px-1.5 py-0.2 rounded">
                            {product.unit}
                          </span>
                        )}
                        {product.isMedicine && (
                          <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-100">
                            Medicine
                          </span>
                        )}
                      </div>
                      <h4 className="text-xs font-bold text-[#06316F] group-hover:text-[#339719] transition-colors truncate">
                        {product.name}
                      </h4>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => handleWhatsAppInquiry(e, product)}
                        className="p-1.5 rounded-lg bg-[#339719]/10 hover:bg-[#339719] text-[#339719] hover:text-white transition-colors"
                        title="Instant WhatsApp Inquiry"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Dropdown footer CTA */}
            {searchTerm && filteredProducts.length > 0 && (
              <div className="p-2.5 bg-gray-50 border-t border-gray-100 text-center">
                <button
                  type="button"
                  onClick={() => handleSearchSubmit()}
                  className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-bold text-[#06316F] hover:text-[#339719] transition-colors py-1"
                >
                  <span>View all {filteredProducts.length} results in Catalog</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* 2. MOBILE SEARCH TRIGGER BUTTON (visible below lg)        */}
      {/* ========================================================= */}
      <button
        type="button"
        onClick={() => setIsMobileSearchActive(true)}
        className="lg:hidden flex items-center justify-center h-10 w-10 rounded-xl bg-[#F4FAF2] border border-[#E5E7EB] text-[#339719] hover:bg-[#339719] hover:text-white transition-colors focus:outline-none"
        aria-label="Open medicine search"
        title="Search medicines and products"
      >
        <Search className="h-5 w-5" />
      </button>

      {/* ========================================================= */}
      {/* 3. MOBILE FULL-SCREEN / EXPANDED SEARCH OVERLAY           */}
      {/* ========================================================= */}
      {isMobileSearchActive && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col p-3 sm:p-4">
          <div className="w-full max-w-lg mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150">
            {/* Search Input Bar */}
            <div className="p-3 sm:p-4 border-b border-gray-100 bg-[#F8F9FA] flex items-center gap-2">
              <form
                onSubmit={handleSearchSubmit}
                className="relative flex-1"
              >
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#339719]" />
                <input
                  ref={mobileInputRef}
                  type="search"
                  enterKeyHint="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search medicines (e.g. panadol, otsuka)..."
                  className="w-full pl-9 pr-8 py-2.5 bg-white border border-gray-300 rounded-xl text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#339719] focus:ring-2 focus:ring-[#339719]/20"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                    title="Clear"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </form>
              <button
                type="button"
                onClick={() => setIsMobileSearchActive(false)}
                className="h-11 w-11 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 active:bg-gray-300 shrink-0 touch-manipulation"
                aria-label="Close search"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Quick Suggestion Chips */}
            <div className="p-2.5 bg-white border-b border-gray-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-xs font-bold text-gray-400 shrink-0">Quick:</span>
              {quickSuggestions.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setSearchTerm(item.query)}
                  className={`text-xs font-semibold px-3 py-1.5 min-h-[38px] rounded-xl shrink-0 transition-colors touch-manipulation flex items-center justify-center ${
                    searchTerm.toLowerCase() === item.query.toLowerCase()
                      ? 'bg-[#06316F] text-white'
                      : 'bg-[#F4FAF2] text-[#339719] hover:bg-[#339719] hover:text-white active:bg-[#e4f3e0]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Live Search Results Header */}
            <div className="px-4 py-2.5 bg-slate-50 border-b border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <span>
                {searchTerm ? (
                  <>Found <strong className="text-[#06316F]">{filteredProducts.length}</strong> medicines & supplies</>
                ) : (
                  <>Showing featured hospital medicines</>
                )}
              </span>
              {searchTerm && (
                <button
                  type="button"
                  onClick={handleSearchSubmit}
                  className="font-bold text-[#339719] hover:underline min-h-[40px] flex items-center px-1 touch-manipulation"
                >
                  Open in Catalog →
                </button>
              )}
            </div>

            {/* Scrollable Results List */}
            <div className="flex-1 overflow-y-auto p-2.5 space-y-2 divide-y divide-gray-50">
              {searchTerm && filteredProducts.length === 0 ? (
                <div className="py-12 text-center px-4">
                  <Package className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm font-bold text-[#06316F]">No products found</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Try searching by generic name, brand (e.g. Otsuka, GSK, FDL), or pack size.
                  </p>
                </div>
              ) : (
                (searchTerm ? filteredProducts.slice(0, 20) : ALL_PRODUCTS.slice(0, 10)).map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product)}
                    className="p-3.5 min-h-[64px] rounded-2xl border border-gray-100 hover:border-[#339719]/30 bg-white hover:bg-[#F4FAF2] active:bg-[#EAF5E8] cursor-pointer transition-colors flex items-center justify-between gap-3 touch-manipulation shadow-2xs"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 mb-1">
                        <span className="font-mono text-[10px] font-bold text-[#06316F] bg-blue-50 px-2 py-0.5 rounded">
                          {product.code || `ID-${product.id}`}
                        </span>
                        <span className="text-[10px] font-bold text-[#339719] bg-emerald-50 px-2 py-0.5 rounded">
                          {product.company}
                        </span>
                        {product.unit && (
                          <span className="text-[10px] text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                            {product.unit}
                          </span>
                        )}
                        {product.isMedicine && (
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                            Medicine
                          </span>
                        )}
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#06316F] line-clamp-2">
                        {product.name}
                      </h4>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleWhatsAppInquiry(e, product)}
                      className="h-11 w-11 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-[#339719]/10 text-[#339719] hover:bg-[#339719] hover:text-white active:bg-[#206310] transition-colors shrink-0 touch-manipulation"
                      title="WhatsApp Inquiry"
                      aria-label={`WhatsApp Inquiry for ${product.name}`}
                    >
                      <MessageCircle className="h-5 w-5" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Bottom Button */}
            {searchTerm && filteredProducts.length > 0 && (
              <div className="p-3 bg-gray-50 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => handleSearchSubmit()}
                  className="w-full min-h-[48px] py-3.5 px-4 rounded-xl bg-[#339719] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm hover:bg-[#2b7d15] active:bg-[#226311] transition-colors touch-manipulation"
                >
                  <Pill className="h-4 w-4" />
                  <span>View All {filteredProducts.length} Results in Catalog</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
