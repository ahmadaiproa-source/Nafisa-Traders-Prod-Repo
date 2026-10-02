import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, HeartPulse, Stethoscope, Package, Brain, Pill, ArrowRight } from 'lucide-react';
import { ProductCategory } from '../types';

interface ProductCategoryCardProps {
  category: ProductCategory;
  index: number;
}

export const ProductCategoryCard: React.FC<ProductCategoryCardProps> = ({ category, index }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity': return <Activity className="h-6 w-6" />;
      case 'HeartPulse': return <HeartPulse className="h-6 w-6" />;
      case 'Stethoscope': return <Stethoscope className="h-6 w-6" />;
      case 'Package': return <Package className="h-6 w-6" />;
      case 'Brain': return <Brain className="h-6 w-6" />;
      case 'Pill': return <Pill className="h-6 w-6" />;
      default: return <Activity className="h-6 w-6" />;
    }
  };

  const indexFormatted = String(index + 1).padStart(2, '0');

  return (
    <Link
      to={`/products/${category.slug}`}
      className="group relative h-full w-full flex flex-col justify-between rounded-2xl bg-white p-6 sm:p-7 border border-[#E5E7EB] shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#339719]/40 hover:shadow-md active:scale-[0.98] active:border-[#339719] touch-manipulation"
    >
      <div>
        <div className="flex items-center justify-between mb-5">
          {/* Icon with light emerald background shift on hover */}
          <div className="flex h-12 w-12 min-h-[48px] min-w-[48px] items-center justify-center rounded-xl bg-[#F4FAF2] text-[#339719] transition-colors duration-300 group-hover:bg-[#339719] group-hover:text-white">
            {getIcon(category.iconName)}
          </div>
          
          <span className="font-mono text-xs font-bold text-slate-400 group-hover:text-[#339719]">
            {indexFormatted}
          </span>
        </div>

        <h3 className="font-heading text-lg font-bold text-[#06316F] group-hover:text-[#339719] transition-colors">
          {category.title}
        </h3>

        <p className="mt-2.5 text-sm text-[#4B5563] leading-relaxed line-clamp-3">
          {category.description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-[#E5E7EB] flex items-center justify-between text-sm font-bold text-[#339719] min-h-[44px]">
        <span>Explore Specialty</span>
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </Link>
  );
};
