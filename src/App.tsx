import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { MobileNavigation } from './components/MobileNavigation';
import { Footer } from './components/Footer';
import { Preloader } from './components/Preloader';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

// Lazy load pages for fast initial bundle loading & speed optimization
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ProductsPage = lazy(() => import('./pages/ProductsPage').then(m => ({ default: m.ProductsPage })));
const CategoryDetailPage = lazy(() => import('./pages/CategoryDetailPage').then(m => ({ default: m.CategoryDetailPage })));
const ClientelePage = lazy(() => import('./pages/ClientelePage').then(m => ({ default: m.ClientelePage })));
const BrandsPage = lazy(() => import('./pages/BrandsPage').then(m => ({ default: m.BrandsPage })));
const QualityPage = lazy(() => import('./pages/QualityPage').then(m => ({ default: m.QualityPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
}

// Fallback loader during route transitions
const PageLoader = () => (
  <div className="flex min-h-[60vh] w-full items-center justify-center p-8">
    <div className="flex flex-col items-center gap-3">
      <div className="h-10 w-10 animate-spin rounded-full border-3 border-[#339719]/20 border-t-[#339719]" />
      <span className="text-xs font-semibold uppercase tracking-wider text-[#06316F]">
        Loading Page...
      </span>
    </div>
  </div>
);

export default function App() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileNavOpen]);

  return (
    <>
      <Preloader />

      <Router>
        <ScrollToTop />
        <div className="flex min-h-screen flex-col bg-[#F8F9FA] text-[#202124] antialiased">
          <Header
            onOpenMobileNav={() => setMobileNavOpen(true)}
          />
          
          <MobileNavigation 
            isOpen={mobileNavOpen} 
            onClose={() => setMobileNavOpen(false)}
          />

          <main className="flex-1">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route
                  path="/"
                  element={<HomePage />}
                />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:categorySlug" element={<CategoryDetailPage />} />
                <Route path="/brands" element={<BrandsPage />} />
                <Route path="/clientele" element={<ClientelePage />} />
                <Route path="/quality-compliance" element={<QualityPage />} />
                <Route path="/contact" element={<ContactPage />} />
                {/* Fallback route redirecting to home */}
                <Route
                  path="*"
                  element={<HomePage />}
                />
              </Routes>
            </Suspense>
          </main>

          <Footer />
        </div>
        <FloatingWhatsApp />
      </Router>
    </>
  );
}
