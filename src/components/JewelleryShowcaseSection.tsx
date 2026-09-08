import React, { useState } from 'react';
import { Product, CurrencyCode, ActiveTab } from '../types';
import { formatPrice } from '../utils/currency';
import { ArrowRight, Heart, Sparkles, ChevronDown, ChevronUp, Gem, CheckCircle2 } from 'lucide-react';
import { WatermarkedProductImage } from './WatermarkedProductImage';

interface JewelleryShowcaseSectionProps {
  products: Product[];
  currency: CurrencyCode;
  onSelectProduct: (product: Product) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  setActiveTab: (tab: ActiveTab, opt?: { collectionId?: string; brand?: string; category?: string }) => void;
}

export const JewelleryShowcaseSection: React.FC<JewelleryShowcaseSectionProps> = ({
  products,
  currency,
  onSelectProduct,
  wishlistIds,
  onToggleWishlist,
  setActiveTab
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'bracelets' | 'necklaces' | 'rings'>('all');
  const [isExpanded, setIsExpanded] = useState(false);

  const allJewellery = products.filter(p => p.type === 'jewellery');

  const filteredJewellery = allJewellery.filter(j => {
    const cat = j.category.toLowerCase();
    const name = j.name.toLowerCase();
    if (selectedFilter === 'bracelets') {
      return cat.includes('bracelet') || name.includes('bracelet') || name.includes('clou') || name.includes('serpenti');
    }
    if (selectedFilter === 'necklaces') {
      return cat.includes('necklace') || cat.includes('pendant') || name.includes('necklace') || name.includes('pendant');
    }
    if (selectedFilter === 'rings') {
      return cat.includes('ring') || name.includes('ring') || cat.includes('earrings');
    }
    return true;
  });

  const displayedJewellery = (selectedFilter === 'all' && !isExpanded)
    ? filteredJewellery.slice(0, 8)
    : filteredJewellery;

  return (
    <section className="bg-[#FAF8F5] py-20 sm:py-28 lg:py-36 border-b border-[#EBE7DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.28em] text-[#8C6D37] font-semibold">
                HAUTE JOAILLERIE
              </span>
              <span className="text-neutral-300">•</span>
              <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-light">
                {allJewellery.length} Signed Creations in Vault
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#16181A] font-light tracking-[-0.015em]">
              FINE JEWELLERY & ATELIER
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 font-light max-w-xl">
              Signed iconic collections from Cartier, Van Cleef & Arpels, and Bulgari chosen for their exceptional craftsmanship and timeless provenance.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('jewellery')}
            className="hidden md:inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#16181A] hover:text-[#8C6D37] transition-colors pb-1 border-b border-[#16181A] hover:border-[#8C6D37] group whitespace-nowrap"
          >
            <span>VIEW COMPLETE JEWELLERY ARCHIVE ({allJewellery.length})</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Category Tabs Bar */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-10 pb-4 border-b border-[#EBE7DE]">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-all ${
              selectedFilter === 'all'
                ? 'bg-[#16181A] text-[#FAF8F5]'
                : 'bg-white text-neutral-600 hover:text-[#16181A] border border-[#EBE7DE]'
            }`}
          >
            All Haute Creations ({allJewellery.length})
          </button>
          <button
            onClick={() => setSelectedFilter('bracelets')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-all ${
              selectedFilter === 'bracelets'
                ? 'bg-[#16181A] text-[#FAF8F5]'
                : 'bg-white text-neutral-600 hover:text-[#16181A] border border-[#EBE7DE]'
            }`}
          >
            Signed Bracelets & Bangles ({allJewellery.filter(j => j.category.toLowerCase().includes('bracelet') || j.name.toLowerCase().includes('bracelet')).length})
          </button>
          <button
            onClick={() => setSelectedFilter('necklaces')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-all ${
              selectedFilter === 'necklaces'
                ? 'bg-[#16181A] text-[#FAF8F5]'
                : 'bg-white text-neutral-600 hover:text-[#16181A] border border-[#EBE7DE]'
            }`}
          >
            Necklaces & Pendants ({allJewellery.filter(j => j.category.toLowerCase().includes('necklace') || j.category.toLowerCase().includes('pendant') || j.name.toLowerCase().includes('necklace') || j.name.toLowerCase().includes('pendant')).length})
          </button>
          <button
            onClick={() => setSelectedFilter('rings')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-all ${
              selectedFilter === 'rings'
                ? 'bg-[#16181A] text-[#FAF8F5]'
                : 'bg-white text-neutral-600 hover:text-[#16181A] border border-[#EBE7DE]'
            }`}
          >
            Iconic Rings & Gemstones ({allJewellery.filter(j => j.category.toLowerCase().includes('ring') || j.category.toLowerCase().includes('earring')).length})
          </button>
        </div>

        {/* Rich Responsive Product Grid (8 to 15 Jewellery Pieces) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-8">
          {displayedJewellery.map((jewel) => {
            const isWishlisted = wishlistIds.includes(jewel.id);
            return (
              <div
                key={jewel.id}
                className="group relative bg-white border border-[#EBE7DE] hover:border-[#8C6D37]/70 transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl"
              >
                {/* Image Container with Zoom */}
                <div 
                  className="relative aspect-square overflow-hidden bg-[#F5F2EB] cursor-pointer"
                  onClick={() => onSelectProduct(jewel)}
                >
                  <WatermarkedProductImage
                    src={jewel.images[0]}
                    secondarySrc={jewel.images[1]}
                    alt={`${jewel.brand} ${jewel.name}`}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    watermarkSize="md"
                    watermarkPosition="bottom-right"
                  />

                  {/* Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                    <span className="bg-[#111315]/90 backdrop-blur-sm text-[#FAF8F5] text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 font-medium border border-[#2A2D32]">
                      {jewel.brand}
                    </span>
                    {jewel.jewellerySpecs?.hallmarks && (
                      <span className="bg-white/95 text-[#8C6D37] text-[8px] uppercase tracking-[0.15em] px-2 py-0.5 font-semibold border border-[#EBE7DE]">
                        Signed & Hallmarked
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(jewel.id);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all z-10 ${
                      isWishlisted
                        ? 'bg-[#8C6D37] text-white'
                        : 'bg-white/80 text-[#16181A] hover:bg-white hover:text-[#8C6D37]'
                    }`}
                    aria-label="Save to Wishlist"
                  >
                    <Heart className="w-3.5 h-3.5 fill-current" />
                  </button>

                  {/* Hover Overlay CTA */}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#111315]/90 via-[#111315]/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct(jewel);
                      }}
                      className="w-full py-2.5 bg-[#FAF8F5] text-[#111315] hover:bg-[#8C6D37] hover:text-[#FAF8F5] text-[10px] uppercase tracking-[0.22em] font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <span>INSPECT CREATION</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Product Meta Description */}
                <div 
                  className="p-5 flex flex-col flex-grow justify-between cursor-pointer space-y-3"
                  onClick={() => onSelectProduct(jewel)}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-[0.24em] text-[#8C6D37] font-semibold block">
                        {jewel.brand}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-light">
                        {jewel.category}
                      </span>
                    </div>

                    <h3 className="text-sm font-serif text-[#16181A] font-normal leading-snug line-clamp-1 group-hover:text-[#8C6D37] transition-colors">
                      {jewel.name}
                    </h3>

                    {jewel.jewellerySpecs?.material && (
                      <p className="text-[11px] text-neutral-500 font-light tracking-wide truncate">
                        {jewel.jewellerySpecs.material}
                      </p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-[#EBE7DE]/70 flex items-center justify-between">
                    <div>
                      <span className="text-sm font-semibold text-[#16181A] tracking-tight">
                        {formatPrice(jewel.priceEUR, currency)}
                      </span>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium">
                      Box & Papers
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Load More / Expand Jewellery Trigger for 'all' filter */}
        {selectedFilter === 'all' && allJewellery.length > 8 && (
          <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-8 py-3.5 bg-white hover:bg-[#16181A] text-[#16181A] hover:text-[#FAF8F5] border border-[#16181A] text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 flex items-center gap-2 shadow-sm"
            >
              {isExpanded ? (
                <>
                  <span>COLLAPSE TO HIGHLIGHTS (8)</span>
                  <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>EXPAND ALL {allJewellery.length} JEWELLERY PIECES ON HOME PAGE</span>
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>

            <button
              onClick={() => setActiveTab('jewellery')}
              className="px-6 py-3.5 bg-[#FAF8F5] hover:bg-[#EBE7DE] text-neutral-700 text-xs uppercase tracking-[0.2em] font-medium border border-[#EBE7DE] transition-colors flex items-center gap-2"
            >
              <span>VIEW FULL FINE JEWELLERY CATALOGUE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
