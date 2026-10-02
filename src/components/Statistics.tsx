import React from 'react';
import { GET_STATS } from '../data/healthcareData';

export const Statistics: React.FC = () => {
  const stats = GET_STATS();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#041E44] via-[#06316F] to-[#0A479D] py-16 sm:py-20 text-white">
      {/* Decorative background grid and soft glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="pointer-events-none absolute top-0 right-1/4 h-80 w-80 rounded-full bg-[#339719]/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-[#339719]/15 blur-3xl" />

      <div className="w-full px-[15px] relative z-10">
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col justify-between rounded-2xl bg-white/5 p-4 sm:p-7 backdrop-blur-sm border border-white/10 transition-transform duration-300 hover:-translate-y-1">
              <div>
                <span className="font-heading text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight break-words block">
                  {stat.value}
                </span>
                <span className="mt-1.5 text-xs sm:text-sm font-semibold text-white/90 block leading-snug">
                  {stat.label}
                </span>
                {stat.sublabel && (
                  <span className="mt-1 text-[11px] sm:text-xs text-white/70 block leading-tight">
                    {stat.sublabel}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
