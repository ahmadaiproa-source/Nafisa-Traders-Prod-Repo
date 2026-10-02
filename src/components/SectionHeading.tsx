import React from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  heading: string;
  highlightText?: string;
  description?: string;
  align?: 'left' | 'center';
  darkBg?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  heading,
  highlightText,
  description,
  align = 'left',
  darkBg = false,
  className = ''
}) => {
  // Process highlight inside heading if passed separately
  const renderHeading = () => {
    if (!highlightText) return heading;
    const parts = heading.split(highlightText);
    if (parts.length < 2) return heading;

    return (
      <>
        {parts[0]}
        <span className={darkBg ? 'text-[#4ADE80]' : 'text-[#339719]'}>
          {highlightText}
        </span>
        {parts[1]}
      </>
    );
  };

  return (
    <div className={`flex flex-col ${align === 'center' ? 'items-center text-center' : 'items-start text-left'} ${className}`}>
      {eyebrow && (
        <span className="mb-2.5 inline-flex items-center gap-1.5 rounded-full bg-[#339719]/10 px-3 py-1 text-[11px] font-bold tracking-widest uppercase text-[#339719]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#339719]"></span>
          {eyebrow}
        </span>
      )}
      
      <h2 className={`font-heading text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl leading-[1.15] ${darkBg ? 'text-white' : 'text-[#06316F]'}`}>
        {renderHeading()}
      </h2>

      {description && (
        <p className={`mt-3.5 max-w-2xl text-base sm:text-lg leading-relaxed ${darkBg ? 'text-white/80' : 'text-[#4B5563]'}`}>
          {description}
        </p>
      )}
    </div>
  );
};
