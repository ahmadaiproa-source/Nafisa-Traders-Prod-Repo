import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { X, ChevronRight, Phone, Mail, Package, Search } from 'lucide-react';
import { COMPANY_INFO, PRODUCT_CATEGORIES } from '../data/healthcareData';
import { Logo } from './Logo';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen,
  onClose
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileSearch, setMobileSearch] = useState('');

  if (!isOpen) return null;

  const handleMobileSearch = (query: string) => {
    if (!query.trim()) return;
    onClose();
    navigate(`/products?tab=catalog&search=${encodeURIComponent(query.trim())}`);
  };

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl flex flex-col justify-between overflow-y-auto">
        
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#EAEAEA] gap-3">
            <div className="w-full max-w-[220px]">
              <Logo asLink={false} fullWidth={true} />
            </div>
            <button
              onClick={onClose}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Medicine Search in Mobile Drawer */}
          <div className="px-5 pt-4 space-y-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleMobileSearch(mobileSearch);
              }}
              className="relative"
            >
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#339719]" />
              <input
                type="search"
                enterKeyHint="search"
                value={mobileSearch}
                onChange={(e) => setMobileSearch(e.target.value)}
                placeholder="Search medicines, brands, codes..."
                className="w-full pl-9 pr-4 py-2.5 bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl text-xs font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#339719] focus:bg-white transition-colors"
              />
            </form>
            <div className="flex flex-wrap gap-1">
              {['Medicines', 'OTSUKA', 'FDL', 'Injections', 'Surgical'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleMobileSearch(tag)}
                  className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#F4FAF2] text-[#339719] hover:bg-[#339719] hover:text-white transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Product List CTA Button in Mobile Drawer */}
          <div className="px-5 pt-2">
            <Link
              to="/products?tab=catalog"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#339719] px-4 py-3 text-xs font-bold text-white hover:bg-[#2b7d15] transition-all shadow-xs"
            >
              <Package className="h-4 w-4" />
              <span>View Full 1,800+ Catalog</span>
            </Link>
          </div>

          {/* Nav Links matching reference */}
          <div className="p-5 space-y-1">
            <Link
              to="/"
              onClick={onClose}
              className={`flex items-center justify-between p-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
                isActive('/') ? 'bg-[#F4FAF2] text-[#339719]' : 'text-[#06316F] hover:bg-gray-50'
              }`}
            >
              <span>Home</span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </Link>

            <Link
              to="/about"
              onClick={onClose}
              className={`flex items-center justify-between p-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
                isActive('/about') ? 'bg-[#F4FAF2] text-[#339719]' : 'text-[#06316F] hover:bg-gray-50'
              }`}
            >
              <span>About Us</span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </Link>

            <Link
              to="/brands"
              onClick={onClose}
              className={`flex items-center justify-between p-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
                isActive('/brands') ? 'bg-[#F4FAF2] text-[#339719]' : 'text-[#06316F] hover:bg-gray-50'
              }`}
            >
              <span>Brands</span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </Link>

            {/* Our Products with sub-divisions and Product List */}
            <div className="pt-1">
              <Link
                to="/products"
                onClick={onClose}
                className={`flex items-center justify-between p-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
                  isActive('/products') ? 'bg-[#F4FAF2] text-[#339719]' : 'text-[#06316F] bg-gray-50/90 hover:bg-[#F4FAF2] hover:text-[#339719]'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#339719]"></span>
                  <span>Our Products</span>
                </span>
                <span className="text-[10px] font-bold text-[#339719] bg-white px-2 py-0.5 rounded shadow-2xs flex items-center gap-1">
                  <span>View All</span>
                  <ChevronRight className="h-3 w-3" />
                </span>
              </Link>

              {/* Sub categories */}
              <div className="pl-3 pr-1 py-1 space-y-1 my-1">
                <Link
                  to="/products/infusion-catheters"
                  onClick={onClose}
                  className="flex items-center justify-between p-2.5 rounded-lg text-xs font-semibold text-[#06316F] hover:bg-[#F4FAF2] hover:text-[#339719] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="h-5 w-5 flex items-center justify-center rounded bg-[#339719]/10 text-[#339719] text-[10px] font-bold">1</span>
                    Infusion Therapy
                  </span>
                  <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
                </Link>

                <Link
                  to="/products/medicine"
                  onClick={onClose}
                  className="flex items-center justify-between p-2.5 rounded-lg text-xs font-semibold text-[#06316F] hover:bg-[#F4FAF2] hover:text-[#339719] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="h-5 w-5 flex items-center justify-center rounded bg-[#339719]/10 text-[#339719] text-[10px] font-bold">2</span>
                    Medicine & Pharma
                  </span>
                  <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
                </Link>

                <Link
                  to="/products/surgical-disposables"
                  onClick={onClose}
                  className="flex items-center justify-between p-2.5 rounded-lg text-xs font-semibold text-[#06316F] hover:bg-[#F4FAF2] hover:text-[#339719] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="h-5 w-5 flex items-center justify-center rounded bg-[#339719]/10 text-[#339719] text-[10px] font-bold">3</span>
                    Surgical Supplies
                  </span>
                  <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
                </Link>
              </div>
            </div>

            <Link
              to="/clientele"
              onClick={onClose}
              className={`flex items-center justify-between p-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
                isActive('/clientele') ? 'bg-[#F4FAF2] text-[#339719]' : 'text-[#06316F] hover:bg-gray-50'
              }`}
            >
              <span>Events & Clientele</span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </Link>

            <Link
              to="/contact"
              onClick={onClose}
              className={`flex items-center justify-between p-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
                isActive('/contact') ? 'bg-[#F4FAF2] text-[#339719]' : 'text-[#06316F] hover:bg-gray-50'
              }`}
            >
              <span>Contact Us</span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </Link>
          </div>
        </div>

        {/* Footer contact in mobile nav */}
        <div className="p-5 bg-gray-50 border-t border-gray-200 text-xs text-gray-600 space-y-2">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-[#339719]" />
            <span className="font-mono">{COMPANY_INFO.phonePlaceholder}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-[#06316F]" />
            <span>{COMPANY_INFO.emailPlaceholder}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

