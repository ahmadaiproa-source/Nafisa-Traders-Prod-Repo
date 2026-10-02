import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HERO_SLIDES } from '../data/healthcareData';
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, Truck, Award, FileText, PhoneCall } from 'lucide-react';

export const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative bg-[#051833] text-white overflow-hidden min-h-[580px] sm:min-h-[640px] flex flex-col justify-between">
      {/* Background Images with smooth fade and subtle ease animation */}
      {HERO_SLIDES.map((s, idx) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          }`}
        >
          <img
            src={s.bgImage}
            alt={s.title}
            className="h-full w-full object-cover object-center"
          />
        </div>
      ))}

      {/* Rich Black Overlay for high-contrast legibility as requested */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/55 backdrop-brightness-90 transition-opacity duration-700 ease-in-out" />
      <div className="absolute inset-0 bg-[radial-gradient(#1A73E8_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

      {/* Main Content Area */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 py-12 sm:py-20 flex-1 flex flex-col justify-center">
        <div className="max-w-3xl space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-md border border-white/15 text-xs font-bold tracking-widest uppercase text-blue-200">
            <ShieldCheck className="h-4 w-4 text-[#269653]" />
            {slide.badge}
          </div>

          {/* Title */}
          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight sm:leading-none tracking-tight">
            {slide.title}{' '}
            <span className="bg-gradient-to-r from-[#64B5F6] to-[#269653] bg-clip-text text-transparent">
              {slide.highlightText}
            </span>
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-lg text-blue-100/90 leading-relaxed max-w-2xl">
            {slide.description}
          </p>

          {/* CTA Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              to={slide.primaryCtaLink}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1A73E8] px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-blue-600/30 hover:bg-[#1565C0] transition-all transform hover:-translate-y-0.5"
            >
              {slide.primaryCtaText}
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/10 px-6 py-3.5 text-xs sm:text-sm font-bold text-white border border-white/20 hover:bg-white/20 transition-all backdrop-blur-md"
            >
              <PhoneCall className="h-4 w-4 text-[#269653]" />
              Contact Us
            </Link>
          </div>

        </div>
      </div>

      {/* Bottom Bar Controls & Quick Stats Bar */}
      <div className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-md py-4">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Quick Key Highlights (A. Feroz style) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full md:w-auto text-xs font-semibold text-blue-100">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-[#1A73E8]" />
              <span>Nationwide Express Logistics</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#269653]" />
              <span>DRAP Verification Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-amber-400" />
              <span>Densohall Karachi HQ</span>
            </div>
            <div className="flex items-center gap-2">
              <PhoneCall className="h-4 w-4 text-[#64B5F6]" />
              <span>24/7 Hospital Desk</span>
            </div>
          </div>

          {/* Slider Pagination Controls */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2.5 transition-all rounded-full ${
                    idx === currentSlide ? 'w-8 bg-[#1A73E8]' : 'w-2.5 bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-1 ml-2 border-l border-white/20 pl-3">
              <button
                onClick={prevSlide}
                className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={nextSlide}
                className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
