import React from 'react';
import { Truck, ShieldCheck, Award, Headphones, Building2, CheckCircle2 } from 'lucide-react';
import { ValueCard } from '../types';

interface FeatureCardProps {
  item: ValueCard;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ item }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Truck': return <Truck className="h-6 w-6" />;
      case 'ShieldCheck': return <ShieldCheck className="h-6 w-6" />;
      case 'Award': return <Award className="h-6 w-6" />;
      case 'Headphones': return <Headphones className="h-6 w-6" />;
      case 'Building2': return <Building2 className="h-6 w-6" />;
      default: return <CheckCircle2 className="h-6 w-6" />;
    }
  };

  return (
    <div className="group h-full w-full flex flex-col justify-between rounded-2xl bg-white p-6 sm:p-8 border border-[#E5E7EB] shadow-xs transition-all duration-300 hover:border-[#339719]/40 hover:shadow-md">
      <div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F4FAF2] text-[#339719] group-hover:bg-[#339719] group-hover:text-white transition-colors duration-300">
          {getIcon(item.iconName)}
        </div>

        <h3 className="font-heading text-lg font-bold text-[#06316F] mt-5">
          {item.title}
        </h3>

        <p className="mt-2.5 text-sm text-[#4B5563] leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  );
};
