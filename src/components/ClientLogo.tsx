import React from 'react';
import { Building2, ShieldCheck } from 'lucide-react';
import { InstitutionalClient } from '../types';

interface ClientLogoProps {
  client: InstitutionalClient;
  variant?: 'compact' | 'full';
}

export const ClientLogo: React.FC<ClientLogoProps> = ({ client, variant = 'full' }) => {
  return (
    <div className={`group relative h-full w-full flex flex-col justify-between rounded-2xl bg-white p-4 sm:p-5 border border-[#E5E7EB] shadow-xs transition-all duration-300 hover:border-[#339719]/40 hover:shadow-md ${variant === 'compact' ? 'items-center text-left' : 'items-start'}`}>
      <div className="flex items-center gap-3 w-full h-full my-auto">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F4FAF2] text-[#339719] group-hover:bg-[#339719] group-hover:text-white transition-colors duration-200">
          <Building2 className="h-5 w-5" />
        </div>
        
        <div className="flex flex-col min-w-0 flex-1 justify-center">
          <span className="font-heading text-[10px] font-bold text-slate-400 uppercase tracking-wider block truncate">
            {client.category}
          </span>
          <h4 className="font-heading text-xs sm:text-sm font-bold text-[#06316F] group-hover:text-[#339719] transition-colors leading-tight line-clamp-2 mt-0.5">
            {client.name}
          </h4>
        </div>
      </div>

      {variant === 'full' && (
        <div className="mt-3.5 pt-2.5 border-t border-[#E5E7EB]/60 w-full flex items-center justify-between text-[11px] text-[#4B5563]">
          <span className="inline-flex items-center gap-1 text-[#339719] font-semibold">
            <ShieldCheck className="h-3.5 w-3.5" /> Partner Hospital
          </span>
          {client.location && <span className="font-mono text-slate-400 text-[10px]">{client.location}</span>}
        </div>
      )}
    </div>
  );
};
