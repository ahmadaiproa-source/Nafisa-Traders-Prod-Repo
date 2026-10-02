import React from 'react';
import { Breadcrumb, BreadcrumbItem } from './Breadcrumb';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbItems: BreadcrumbItem[];
  badge?: string;
}

export const PageHero: React.FC<PageHeroProps> = ({
  eyebrow,
  title,
  description,
  breadcrumbItems,
  badge
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#F4FAF2] via-[#F8F9FA] to-white pt-28 pb-12 sm:pt-36 sm:pb-16 border-b border-[#E5E7EB]">
      {/* Abstract subtle background accents */}
      <div className="pointer-events-none absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 h-96 w-96 rounded-full bg-emerald-100/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 h-80 w-80 rounded-full bg-blue-50/50 blur-3xl" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 relative z-10">
        <Breadcrumb items={breadcrumbItems} />

        <div className="mt-2 max-w-3xl">
          {eyebrow && (
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#339719]/10 px-3.5 py-1 text-xs font-bold tracking-widest uppercase text-[#339719]">
              <span className="h-2 w-2 rounded-full bg-[#339719]" />
              {eyebrow}
            </span>
          )}

          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-[#06316F] sm:text-4xl lg:text-5xl leading-tight">
            {title}
          </h1>

          {description && (
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#4B5563]">
              {description}
            </p>
          )}

          {badge && (
            <div className="mt-5 inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-[#339719] border border-emerald-200/60">
              <span className="h-2 w-2 rounded-full bg-[#339719] animate-pulse" />
              {badge}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
