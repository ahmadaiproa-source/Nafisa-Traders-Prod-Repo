import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { HeaderSearch } from './HeaderSearch';
import { PRODUCT_CATEGORIES } from '../data/healthcareData';
import { Menu, ChevronDown } from 'lucide-react';

interface HeaderProps {
  onOpenMobileNav: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileNav }) => {
  const location = useLocation();
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#EAEAEA] shadow-xs">
      <div className="w-full px-[15px] sm:px-8 lg:px-12">
        <div className="flex min-h-[80px] sm:min-h-[88px] py-2 items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center w-auto max-w-[240px] sm:max-w-[300px] md:max-w-[360px]">
            <Logo asLink={true} fullWidth={true} />
          </div>

          {/* Desktop Navigation Links - Exact match to reference layout */}
          <nav className="hidden xl:flex items-center gap-6 2xl:gap-8">
            <Link
              to="/"
              className={`text-[11.5px] font-bold tracking-wider uppercase transition-colors ${
                isActive('/') ? 'text-[#339719]' : 'text-[#06316F] hover:text-[#339719]'
              }`}
            >
              Home
            </Link>

            <Link
              to="/about"
              className={`text-[11.5px] font-bold tracking-wider uppercase transition-colors ${
                isActive('/about') ? 'text-[#339719]' : 'text-[#06316F] hover:text-[#339719]'
              }`}
            >
              About Us
            </Link>

            <Link
              to="/brands"
              className={`text-[11.5px] font-bold tracking-wider uppercase transition-colors ${
                isActive('/brands') ? 'text-[#339719]' : 'text-[#06316F] hover:text-[#339719]'
              }`}
            >
              Brands
            </Link>

            {/* Our Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProductsDropdownOpen(true)}
              onMouseLeave={() => setProductsDropdownOpen(false)}
            >
              <Link
                to="/products"
                onClick={() => setProductsDropdownOpen(false)}
                className={`text-[11.5px] font-bold tracking-wider uppercase inline-flex items-center gap-1 transition-colors cursor-pointer py-1 ${
                  location.pathname.startsWith('/products') ? 'text-[#339719]' : 'text-[#06316F] hover:text-[#339719]'
                }`}
              >
                <span>Our Products</span>
                <ChevronDown 
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    productsDropdownOpen ? 'rotate-180 text-[#339719]' : 'text-gray-400'
                  }`} 
                />
              </Link>

              {/* Dropdown Menu */}
              {productsDropdownOpen && (
                <div className="absolute top-full left-0 w-80 rounded-2xl bg-white p-3 shadow-xl border border-[#E5E7EB] animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  <div className="flex items-center justify-between px-3 py-1.5 border-b border-[#EAEAEA] mb-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#339719]">
                      Core Product Divisions
                    </span>
                    <Link
                      to="/products"
                      onClick={() => setProductsDropdownOpen(false)}
                      className="text-[10px] font-semibold text-[#06316F] hover:underline"
                    >
                      View All &rarr;
                    </Link>
                  </div>
                  <div className="space-y-1">
                    <Link
                      to="/products/infusion-catheters"
                      onClick={() => setProductsDropdownOpen(false)}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold text-[#06316F] hover:bg-[#F4FAF2] hover:text-[#339719] transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#339719]/10 text-[#339719] text-[11px] font-mono group-hover:bg-[#339719] group-hover:text-white transition-colors">
                          01
                        </span>
                        <div>
                          <div className="font-bold">1. Infusion</div>
                          <div className="text-[10px] text-gray-400 font-normal">IV sets, cannulas & catheters</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-[#339719] bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                        Clinical
                      </span>
                    </Link>

                    <Link
                      to="/products/medicine"
                      onClick={() => setProductsDropdownOpen(false)}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold text-[#06316F] hover:bg-[#F4FAF2] hover:text-[#339719] transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#339719]/10 text-[#339719] text-[11px] font-mono group-hover:bg-[#339719] group-hover:text-white transition-colors">
                          02
                        </span>
                        <div>
                          <div className="font-bold">2. Medicine</div>
                          <div className="text-[10px] text-gray-400 font-normal">Critical care & pharmaceuticals</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-[#339719] bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                        Pharma
                      </span>
                    </Link>

                    <Link
                      to="/products/surgical-disposables"
                      onClick={() => setProductsDropdownOpen(false)}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold text-[#06316F] hover:bg-[#F4FAF2] hover:text-[#339719] transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#339719]/10 text-[#339719] text-[11px] font-mono group-hover:bg-[#339719] group-hover:text-white transition-colors">
                          03
                        </span>
                        <div>
                          <div className="font-bold">3. Surgical</div>
                          <div className="text-[10px] text-gray-400 font-normal">Instruments, gloves & sutures</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-[#339719] bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                        Surgical
                      </span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/clientele"
              className={`text-[11.5px] font-bold tracking-wider uppercase transition-colors ${
                isActive('/clientele') ? 'text-[#339719]' : 'text-[#06316F] hover:text-[#339719]'
              }`}
            >
              Events
            </Link>

            <Link
              to="/contact"
              className={`text-[11.5px] font-bold tracking-wider uppercase transition-colors ${
                isActive('/contact') ? 'text-[#339719]' : 'text-[#06316F] hover:text-[#339719]'
              }`}
            >
              Contact Us
            </Link>
          </nav>

          {/* Header Right Area: Search & Mobile Navigation Trigger */}
          <div className="flex items-center gap-2 sm:gap-3">
            <HeaderSearch />

            {/* Mobile Menu Trigger */}
            <div className="flex items-center xl:hidden">
              <button
                onClick={onOpenMobileNav}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 border border-gray-200 text-gray-800 hover:bg-gray-100 transition-colors"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

