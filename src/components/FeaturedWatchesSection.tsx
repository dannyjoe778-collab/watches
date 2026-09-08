import React, { useState } from 'react';
import { Product, CurrencyCode, ActiveTab } from '../types';
import { formatPrice } from '../utils/currency';
import { ArrowRight, Heart, ShieldCheck, Clock, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { WatermarkedProductImage } from './WatermarkedProductImage';

interface FeaturedWatchesSectionProps {
  products: Product[];
  currency: CurrencyCode;
  onSelectProduct: (product: Product) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  setActiveTab: (tab: ActiveTab, opt?: { collectionId?: string; brand?: string; category?: string }) => void;
}

export const FeaturedWatchesSection: React.FC<FeaturedWatchesSectionProps> = ({
  products,
  currency,
  onSelectProduct,
  wishlistIds,
  onToggleWishlist,
  setActiveTab
}) => {
  const allWatches = products.filter(p => p.type === 'watch');
  const displayedWatches = allWatches.slice(0, 8);

  return (
    <section className="bg-[#FAF8F5] py-20 sm:py-28 lg:py-36 border-b border-[#EBE7DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Category Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.28em] text-[#8C6D37] font-semibold">
                CURATED HOROLOGY
              </span>
              <span className="text-neutral-300">•</span>
              <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-light">
                {allWatches.length} Certified Pieces in Vault
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#16181A] font-light tracking-[-0.015em]">
              THE WATCH COLLECTION
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 font-light max-w-xl">
              Icons of horology, perpetual calendars, and certified chronometers selected for the discerning collector.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('shop')}
            className="hidden md:inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#16181A] hover:text-[#8C6D37] transition-colors pb-1 border-b border-[#16181A] hover:border-[#8C6D37] group whitespace-nowrap"
          >
            <span>VIEW COMPLETE CATALOGUE</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Rich Product Grid (8 Watches) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-8">
          {displayedWatches.map((watch) => {
            const isWishlisted = wishlistIds.includes(watch.id);
            return (
              <div
                key={watch.id}
                className="group relative bg-white border border-[#EBE7DE] hover:border-[#8C6D37]/70 transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl"
              >
                {/* Product Image Container with Subtle Zoom */}
                <div 
                  className="relative aspect-square overflow-hidden bg-[#F5F2EB] cursor-pointer"
                  onClick={() => onSelectProduct(watch)}
                >
                  <WatermarkedProductImage
                    src={watch.images[0]}
                    secondarySrc={watch.images[1]}
                    alt={`${watch.brand} ${watch.name}`}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    watermarkSize="md"
                    watermarkPosition="bottom-right"
                  />
                  
                  {/* Subtle Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Availability / Authenticated Badge */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                    <span className="bg-[#111315]/90 backdrop-blur-sm text-[#FAF8F5] text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 font-medium border border-[#2A2D32]">
                      {watch.status === 'Available' ? 'AUTHENTICATED' : watch.status}
                    </span>
                    {watch.watchSpecs?.box && watch.watchSpecs?.papers && (
                      <span className="bg-white/95 text-[#8C6D37] text-[8px] uppercase tracking-[0.15em] px-2 py-0.5 font-semibold border border-[#EBE7DE] shadow-xs">
                        Full Set
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(watch.id);
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
                        onSelectProduct(watch);
                      }}
                      className="w-full py-2.5 bg-[#FAF8F5] text-[#111315] hover:bg-[#8C6D37] hover:text-[#FAF8F5] text-[10px] uppercase tracking-[0.22em] font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <span>INSPECT TIMEPIECE</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Product Meta Details */}
                <div 
                  className="p-5 flex flex-col flex-grow justify-between cursor-pointer space-y-3"
                  onClick={() => onSelectProduct(watch)}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-[0.24em] text-[#8C6D37] font-semibold block">
                        {watch.brand}
                      </span>
                      {watch.watchSpecs?.year && (
                        <span className="text-[10px] text-neutral-400 font-mono">
                          {watch.watchSpecs.year}
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-serif text-[#16181A] font-normal leading-snug line-clamp-1 group-hover:text-[#8C6D37] transition-colors">
                      {watch.name}
                    </h3>
                    {watch.watchSpecs?.reference && (
                      <p className="text-[11px] text-neutral-500 font-light tracking-wide">
                        Ref. {watch.watchSpecs.reference} • {watch.watchSpecs.caseSize || '40mm'}
                      </p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-[#EBE7DE]/70 flex items-center justify-between">
                    <div>
                      <span className="text-sm font-semibold text-[#16181A] tracking-tight">
                        {formatPrice(watch.priceEUR, currency)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-emerald-700 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                      <span>In Vault</span>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
