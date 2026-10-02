import React, { useEffect, useState } from 'react';
import { Activity, ShieldCheck } from 'lucide-react';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Fast, crisp, smooth counter animation (~850ms total)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = Math.floor(Math.random() * 18) + 14;
        return Math.min(prev + step, 100);
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const fadeTimer = setTimeout(() => {
        setIsFadingOut(true);
      }, 180);

      const hideTimer = setTimeout(() => {
        setIsHidden(true);
        if (onComplete) onComplete();
      }, 550);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [progress, onComplete]);

  if (isHidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#06316F] text-white transition-all duration-500 ease-out ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Ambient glowing radial backdrop */}
      <div className="pointer-events-none absolute h-80 w-80 rounded-full bg-[#339719]/25 blur-[90px] animate-pulse" />
      <div className="pointer-events-none absolute h-60 w-60 rounded-full bg-[#339719]/15 blur-[60px]" />

      <div className="relative z-10 flex flex-col items-center px-6 max-w-sm w-full text-center">
        
        {/* Unique Animated Medical Insignia & Logo Card */}
        <div className="relative mb-6">
          {/* Animated concentric pulse ring */}
          <div className="absolute -inset-2.5 rounded-3xl bg-gradient-to-r from-[#339719]/30 to-[#4ADE80]/30 blur-sm animate-pulse" />
          
          <div className="relative flex items-center justify-center bg-white px-5 py-3.5 rounded-2xl shadow-2xl border border-white/40">
            <img
              src="https://ik.imagekit.io/sn0ctq5wd/Nafisa%20Trader.jpg"
              alt="Nafisa Traders"
              className="h-12 sm:h-14 w-auto object-contain"
            />
          </div>

          {/* Floating Verified Medical Badge */}
          <div className="absolute -bottom-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#339719] text-white shadow-md ring-4 ring-[#06316F]">
            <Activity className="h-4 w-4 animate-bounce" />
          </div>
        </div>

        {/* Brand Text */}
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <span>NAFISA TRADERS</span>
        </h2>
        
        <p className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-[#4ADE80] flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Premium Healthcare Distribution</span>
        </p>

        {/* Minimalist Progress Meter */}
        <div className="mt-7 w-full max-w-[240px]">
          {/* Progress Bar Track */}
          <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/15">
            <div
              className="h-full bg-gradient-to-r from-[#339719] via-[#4ADE80] to-[#339719] rounded-full transition-all duration-150 ease-out shadow-[0_0_12px_rgba(74,222,128,0.7)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Counter Status */}
          <div className="mt-2.5 flex items-center justify-between text-[11px] font-medium text-slate-300">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80] animate-ping" />
              {progress < 100 ? 'Securing clinical supply...' : 'Welcome'}
            </span>
            <span className="font-mono text-white font-bold">{progress}%</span>
          </div>
        </div>

      </div>
    </div>
  );
};

