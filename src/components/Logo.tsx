import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'footer' | 'default';
  showTagline?: boolean;
  asLink?: boolean;
  fullWidth?: boolean;
  imageClassName?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  variant = 'default',
  showTagline = false,
  asLink = true,
  fullWidth = true,
  imageClassName = ''
}) => {
  const [imageError, setImageError] = useState(false);
  const isDark = variant === 'dark';
  const logoUrl = 'https://ik.imagekit.io/sn0ctq5wd/Nafisa%20Trader.jpg';

  const content = (
    <div className={`inline-flex items-center group select-none ${fullWidth ? 'w-full' : ''} ${className}`}>
      {!imageError ? (
        <img
          src={logoUrl}
          alt="Nafisa Traders Logo"
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
          className={`w-full max-w-[260px] sm:max-w-[320px] md:max-w-[380px] h-auto max-h-16 md:max-h-20 object-contain rounded-md transition-transform duration-300 group-hover:scale-[1.02] ${imageClassName}`}
        />
      ) : (
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#06316F] text-[#339719] font-black text-lg shadow-sm border border-[#339719]/30">
            NT
          </div>
          <div className="flex flex-col">
            <span className={`font-sans text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#06316F]'} flex items-center gap-1`}>
              <span>Nafisa</span>
              <span className="text-[#339719] font-light">Traders</span>
            </span>
            {showTagline && (
              <span className="text-[9px] font-medium tracking-wider text-gray-500 uppercase">
                Healthcare Solutions
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );

  if (asLink) {
    return (
      <Link to="/" className={`inline-flex items-center hover:opacity-95 transition-opacity ${fullWidth ? 'w-full' : ''}`}>
        {content}
      </Link>
    );
  }

  return content;
};

export default Logo;

