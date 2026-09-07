import React from 'react';

interface BilvoLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  textColor?: string;
  badge?: boolean;
}

export default function BilvoLogo({
  className = '',
  size = 'md',
  showText = false,
  textColor,
  badge = false,
}: BilvoLogoProps) {
  const sizeClasses = {
    sm: 'h-7 w-7',
    md: 'h-8 w-8',
    lg: 'h-9 w-9',
    xl: 'h-12 w-12',
  };

  const imgClass = className || sizeClasses[size];

  return (
    <div className="inline-flex items-center gap-2.5 select-none" id="bilvo-ai-brand-mark">
      <img
        src="/logo.png"
        alt="Bilvo Ai"
        className={`${imgClass} aspect-square rounded-lg object-contain shadow-xs transition-transform duration-300 group-hover:scale-105`}
        referrerPolicy="no-referrer"
        loading="eager"
        decoding="async"
        width={64}
        height={64}
      />
      {showText && (
        <div className="flex items-center">
          <span
            className={`font-display font-bold tracking-tight ${
              textColor || 'text-theme-primary'
            } ${size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base'}`}
          >
            Bilvo Ai
          </span>
          {badge && (
            <span className="ml-1.5 rounded-md bg-[#2563EB]/10 px-1 py-0.5 font-mono text-[8px] tracking-wider text-[#2563EB] uppercase font-bold border border-[#2563EB]/20">
              AI
            </span>
          )}
        </div>
      )}
    </div>
  );
}
