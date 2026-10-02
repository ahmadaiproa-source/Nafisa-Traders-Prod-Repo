import React from 'react';
import { MapPin, ExternalLink, Navigation } from 'lucide-react';

export const MapPlaceholder: React.FC = () => {
  const address = "Shop 4, 5 & 6, Kutchi Gali 2, Medicine Market, Densohall, Karachi, Pakistan";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Densohall Medicine Market Karachi Pakistan")}`;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-[#F4FAF2] p-6 sm:p-8 shadow-sm">
      {/* Visual map background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#06316f0a_1px,transparent_1px),linear-gradient(to_bottom,#06316f0a_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="relative z-10 flex flex-col justify-between h-full min-h-[260px]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#06316F] shadow-xs border border-[#E5E7EB]">
            <MapPin className="h-3.5 w-3.5 text-[#339719]" />
            <span>Medicine Market Headquarters</span>
          </div>

          <h3 className="mt-4 font-heading text-xl font-bold text-[#06316F]">
            Densohall, Karachi Location
          </h3>

          <p className="mt-2 text-sm text-[#4B5563] max-w-md leading-relaxed">
            {address}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-[#E5E7EB] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-medium text-[#339719]">
            <span className="h-2 w-2 rounded-full bg-[#339719] animate-pulse" />
            Commercial & Wholesale Desk Open
          </div>

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-[#339719] border border-[#E5E7EB] shadow-xs transition-all hover:bg-[#339719] hover:text-white hover:border-[#339719]"
          >
            <Navigation className="h-3.5 w-3.5" />
            <span>Open in Google Maps</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
