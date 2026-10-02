import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 inline-flex items-center space-x-2 text-xs font-medium text-[#5F6368]">
      <Link to="/" className="inline-flex items-center gap-1 hover:text-[#1A73E8] transition-colors">
        <Home className="h-3.5 w-3.5" />
        <span>Home</span>
      </Link>

      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="h-3 w-3 text-slate-400 shrink-0" />
          {item.path && index < items.length - 1 ? (
            <Link to={item.path} className="hover:text-[#1A73E8] transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-[#0B3D78] font-semibold">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
