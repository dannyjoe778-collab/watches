import React, { useState } from 'react';

interface WatermarkedProductImageProps {
  src: string;
  secondarySrc?: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  watermarkSize?: 'xs' | 'sm' | 'md' | 'lg';
  watermarkPosition?: 'bottom-right' | 'bottom-left' | 'center';
  isHovered?: boolean;
  priority?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  showWatermark?: boolean;
}

/**
 * WatermarkedProductImage Component
 *
 * 1. Cleanly masks off any legacy/third-party watermarks in the bottom region
 *    by blending a studio-white backdrop patch that merges seamlessly with the photo.
 * 2. Overlays the official AURELIA & CROWN luxury watermark emblem:
 *    - Royal 5-point crown crest in brushed champagne gold (#C5A880)
 *    - Serif brand typography 'AURELIA & CROWN'
 *    - Certified Provenance hallmark 'CERTIFIED LUXURY • LONDON'
 */
export const WatermarkedProductImage: React.FC<WatermarkedProductImageProps> = ({
  src,
  secondarySrc,
  alt,
  className = 'w-full h-full object-cover object-center',
  containerClassName = 'relative w-full h-full overflow-hidden bg-white',
  watermarkSize = 'md',
  watermarkPosition = 'bottom-right',
  isHovered = false,
  priority = false,
  onClick,
  showWatermark = true,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div 
      className={`${containerClassName} select-none`}
      onClick={onClick}
    >
      {/* Primary Image */}
      <img
        src={src}
        alt={alt}
        className={`${className} transition-all duration-700 ${
          isHovered && secondarySrc ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
        }`}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setImageLoaded(true)}
        onError={() => setHasError(true)}
      />

      {/* Optional Secondary Image (e.g. for dual hover flip) */}
      {secondarySrc && (
        <img
          src={secondarySrc}
          alt={`${alt} alternate view`}
          className={`absolute inset-0 ${className} transition-all duration-700 ${
            isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
          }`}
          loading="lazy"
        />
      )}

      {/* Legacy Watermark Mask: Cleans off any imported third-party watermark in the bottom corner */}
      {showWatermark && imageLoaded && !hasError && (
        <>
          {/* Studio White Seamless Mask: Erases any background watermark in the bottom right corner */}
          <div 
            className="absolute bottom-0 right-0 w-[50%] h-[18%] bg-white pointer-events-none select-none z-10"
            style={{
              // Subtle radial feathering from the corner to blend seamlessly into the studio background
              maskImage: 'radial-gradient(farthest-side at 100% 100%, black 70%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(farthest-side at 100% 100%, black 70%, transparent 100%)',
            }}
          />

          {/* Official AURELIA & CROWN Luxury Watermark Overlay */}
          <div 
            className={`absolute z-20 pointer-events-none select-none flex items-center transition-all duration-300 ${
              watermarkPosition === 'bottom-right' 
                ? 'bottom-2 right-2 sm:bottom-3 sm:right-3' 
                : watermarkPosition === 'bottom-left'
                ? 'bottom-2 left-2 sm:bottom-3 sm:left-3'
                : 'bottom-4 left-1/2 -translate-x-1/2'
            }`}
          >
            {/* XS size: Compact monogram for small thumbnails (e.g. Cart, Wishlist) */}
            {watermarkSize === 'xs' && (
              <div className="flex items-center gap-1 bg-white/95 px-1.5 py-0.5 border border-[#C5A880]/40 shadow-2xs">
                <svg className="w-2.5 h-2 text-[#C5A880]" viewBox="0 0 24 16" fill="currentColor">
                  <path d="M2 14h20v2H2zM3 12l-1-8 5 4 5-8 5 8 5-4-1 8z" />
                </svg>
                <span className="text-[7px] font-serif font-bold tracking-wider text-[#16181A]">A&amp;C</span>
              </div>
            )}

            {/* SM size: Minimalist emblem badge for compact cards */}
            {watermarkSize === 'sm' && (
              <div className="flex flex-col items-end bg-white/90 backdrop-blur-[1px] px-2 py-0.5 border border-[#C5A880]/30 shadow-2xs">
                <div className="flex items-center gap-1">
                  <svg className="w-2.5 h-2 text-[#C5A880]" viewBox="0 0 24 16" fill="currentColor">
                    <path d="M2 14h20v2H2zM3 12l-1-8 5 4 5-8 5 8 5-4-1 8z" />
                  </svg>
                  <span className="text-[8px] font-serif font-bold tracking-[0.15em] text-[#16181A]">
                    AURELIA &amp; CROWN
                  </span>
                </div>
                <span className="text-[6px] font-sans uppercase tracking-[0.2em] text-[#8C6D37] font-semibold">
                  LONDON
                </span>
              </div>
            )}

            {/* MD size: Standard Product Card Watermark */}
            {watermarkSize === 'md' && (
              <div className="group/wm flex flex-col items-center justify-center bg-white/95 backdrop-blur-[2px] px-2.5 py-1 border border-[#EBE7DE] hover:border-[#C5A880] shadow-xs transition-colors">
                <div className="flex items-center gap-1.5">
                  <svg className="w-3 h-2.5 text-[#C5A880]" viewBox="0 0 24 16" fill="currentColor">
                    <path d="M2 14h20v2H2zM3 12l-1-8 5 4 5-8 5 8 5-4-1 8z" />
                  </svg>
                  <span className="text-[9px] font-serif font-semibold tracking-[0.2em] text-[#16181A]">
                    AURELIA &amp; CROWN
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="w-3 h-[0.5px] bg-[#C5A880]/80"></span>
                  <span className="text-[6.5px] font-sans uppercase tracking-[0.22em] text-[#8C6D37] font-semibold">
                    CERTIFIED LUXURY
                  </span>
                  <span className="w-3 h-[0.5px] bg-[#C5A880]/80"></span>
                </div>
              </div>
            )}

            {/* LG size: Detailed Product Viewport Watermark */}
            {watermarkSize === 'lg' && (
              <div className="flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm px-3.5 py-1.5 border border-[#EBE7DE] shadow-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-3 text-[#C5A880]" viewBox="0 0 24 16" fill="currentColor">
                    <path d="M2 14h20v2H2zM3 12l-1-8 5 4 5-8 5 8 5-4-1 8z" />
                  </svg>
                  <span className="text-xs font-serif font-semibold tracking-[0.25em] text-[#16181A]">
                    AURELIA &amp; CROWN
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-5 h-[0.5px] bg-[#C5A880]"></span>
                  <span className="text-[7.5px] font-sans uppercase tracking-[0.25em] text-[#8C6D37] font-semibold">
                    CERTIFIED PRE-OWNED • LONDON
                  </span>
                  <span className="w-5 h-[0.5px] bg-[#C5A880]"></span>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
