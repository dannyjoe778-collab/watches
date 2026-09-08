import React, { useRef, useState } from 'react';
import { Product, CurrencyCode, ActiveTab } from '../types';
import { formatPrice } from '../utils/currency';
import { ArrowRight, ChevronLeft, ChevronRight, Heart, Sparkles, LayoutGrid, SlidersHorizontal } from 'lucide-react';
import { WatermarkedProductImage } from './WatermarkedProductImage';

interface NewArrivalsCarouselProps {
  products: Product[];
  currency: CurrencyCode;
  onSelectProduct: (product: Product) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const NewArrivalsCarousel: React.FC<NewArrivalsCarouselProps> = ({
  products,
  currency,
  onSelectProduct,
  wishlistIds,
  onToggleWishlist,
  setActiveTab
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [filterType, setFilterType] = useState<'all' | 'watch' | 'jewellery'>('all');
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');

  // Filter new arrivals based on selected tab, prioritizing new arrivals and avoiding duplicates from the featured section
  const newArrivals = products
    .filter(p => {
      if (filterType === 'watch') return p.type === 'watch';
      if (filterType === 'jewellery') return p.type === 'jewellery';
      return true;
    })
    .filter(p => p.isNewArrival || !p.isFeaturedHomepage);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-[#FAF8F5] py-20 sm:py-28 lg:py-36 border-b border-[#EBE7DE] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Navigation & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.28em] text-[#8C6D37] font-semibold">
                NEW ACQUISITIONS
              </span>
              <span className="text-neutral-300">•</span>
              <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-light">
                Direct From European Salons
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#16181A] font-light tracking-[-0.015em]">
              RECENT VAULT ADDITIONS
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 font-light max-w-xl">
              Freshly authenticated horological complications and signed fine jewellery available for immediate acquisition.
            </p>
          </div>

          {/* Controls: Type Filter + View Mode + Scroll Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center border border-[#EBE7DE] bg-white p-1">
              <button
                onClick={() => setViewMode('carousel')}
                className={`px-3 py-1.5 text-[11px] uppercase tracking-wider font-medium transition-colors ${
                  viewMode === 'carousel' ? 'bg-[#16181A] text-[#FAF8F5]' : 'text-neutral-600 hover:text-[#16181A]'
                }`}
              >
                Carousel
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 text-[11px] uppercase tracking-wider font-medium transition-colors ${
                  viewMode === 'grid' ? 'bg-[#16181A] text-[#FAF8F5]' : 'text-neutral-600 hover:text-[#16181A]'
                }`}
              >
                Grid View
              </button>
            </div>

            {/* Scroll Navigation */}
            {viewMode === 'carousel' && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => scroll('left')}
                  className="w-10 h-10 border border-[#EBE7DE] hover:border-[#8C6D37] bg-white text-[#16181A] hover:text-[#8C6D37] flex items-center justify-center transition-colors shadow-xs"
                  aria-label="Previous Acquisitions"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scroll('right')}
                  className="w-10 h-10 border border-[#EBE7DE] hover:border-[#8C6D37] bg-white text-[#16181A] hover:text-[#8C6D37] flex items-center justify-center transition-colors shadow-xs"
                  aria-label="Next Acquisitions"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-2 mb-8 pb-3 border-b border-[#EBE7DE]">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3.5 py-1.5 text-xs uppercase tracking-wider transition-colors ${
              filterType === 'all'
                ? 'bg-[#16181A] text-[#FAF8F5] font-semibold'
                : 'bg-white text-neutral-600 hover:text-[#16181A] border border-[#EBE7DE]'
            }`}
          >
            All Recent Additions ({products.length})
          </button>
          <button
            onClick={() => setFilterType('watch')}
            className={`px-3.5 py-1.5 text-xs uppercase tracking-wider transition-colors ${
              filterType === 'watch'
                ? 'bg-[#16181A] text-[#FAF8F5] font-semibold'
                : 'bg-white text-neutral-600 hover:text-[#16181A] border border-[#EBE7DE]'
            }`}
          >
            Recent Watches ({products.filter(p => p.type === 'watch').length})
          </button>
          <button
            onClick={() => setFilterType('jewellery')}
            className={`px-3.5 py-1.5 text-xs uppercase tracking-wider transition-colors ${
              filterType === 'jewellery'
                ? 'bg-[#16181A] text-[#FAF8F5] font-semibold'
                : 'bg-white text-neutral-600 hover:text-[#16181A] border border-[#EBE7DE]'
            }`}
          >
            Recent Jewellery ({products.filter(p => p.type === 'jewellery').length})
          </button>
        </div>

        {/* Render Carousel or Grid */}
        {viewMode === 'carousel' ? (
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {newArrivals.map((item) => {
              const isWishlisted = wishlistIds.includes(item.id);
              const condition = item.type === 'watch' ? item.watchSpecs?.condition : 'Mint / Polished';

              return (
                <div
                  key={item.id}
                  className="snap-start flex-shrink-0 w-[280px] sm:w-[320px] bg-white border border-[#EBE7DE] hover:border-[#8C6D37]/70 transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl group"
                >
                  {/* Image Container */}
                  <div 
                    className="relative aspect-square overflow-hidden bg-[#F5F2EB] cursor-pointer"
                    onClick={() => onSelectProduct(item)}
                  >
                    <WatermarkedProductImage
                      src={item.images[0]}
                      secondarySrc={item.images[1]}
                      alt={`${item.brand} ${item.name}`}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      watermarkSize="md"
                      watermarkPosition="bottom-right"
                    />

                    {/* NEW Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                      <span className="bg-[#8C6D37] text-white text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 font-semibold shadow-md">
                        NEW IN VAULT
                      </span>
                    </div>

                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(item.id);
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

                    {/* Hover Button */}
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#111315]/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProduct(item);
                        }}
                        className="w-full py-2 bg-[#FAF8F5] text-[#111315] hover:bg-[#8C6D37] hover:text-[#FAF8F5] text-[10px] uppercase tracking-[0.2em] font-semibold transition-colors flex items-center justify-center gap-1.5"
                      >
                        <span>VIEW DETAILS</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Details */}
                  <div 
                    className="p-5 flex flex-col justify-between flex-grow cursor-pointer space-y-3"
                    onClick={() => onSelectProduct(item)}
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-[0.24em] text-[#8C6D37] font-semibold block">
                        {item.brand}
                      </span>
                      <h3 className="text-sm font-serif text-[#16181A] font-normal leading-snug line-clamp-1 group-hover:text-[#8C6D37] transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-[11px] text-neutral-500 font-light truncate">
                        {condition || 'Exceptional Condition'}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#EBE7DE]/70 flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#16181A] tracking-tight">
                        {formatPrice(item.priceEUR, currency)}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-emerald-700 font-medium">
                        Available
                      </span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-8">
            {newArrivals.slice(0, 8).map((item) => {
              const isWishlisted = wishlistIds.includes(item.id);
              const condition = item.type === 'watch' ? item.watchSpecs?.condition : 'Mint / Polished';

              return (
                <div
                  key={item.id}
                  className="bg-white border border-[#EBE7DE] hover:border-[#8C6D37]/70 transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl group"
                >
                  <div 
                    className="relative aspect-square overflow-hidden bg-[#F5F2EB] cursor-pointer"
                    onClick={() => onSelectProduct(item)}
                  >
                    <WatermarkedProductImage
                      src={item.images[0]}
                      secondarySrc={item.images[1]}
                      alt={`${item.brand} ${item.name}`}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      watermarkSize="md"
                      watermarkPosition="bottom-right"
                    />

                    <div className="absolute top-3 left-3 z-10">
                      <span className="bg-[#8C6D37] text-white text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 font-semibold shadow-md">
                        NEW IN VAULT
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(item.id);
                      }}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all z-10 ${
                        isWishlisted
                          ? 'bg-[#8C6D37] text-white'
                          : 'bg-white/80 text-[#16181A] hover:bg-white hover:text-[#8C6D37]'
                      }`}
                    >
                      <Heart className="w-3.5 h-3.5 fill-current" />
                    </button>
                  </div>

                  <div 
                    className="p-5 flex flex-col justify-between flex-grow cursor-pointer space-y-3"
                    onClick={() => onSelectProduct(item)}
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-[0.24em] text-[#8C6D37] font-semibold block">
                        {item.brand}
                      </span>
                      <h3 className="text-sm font-serif text-[#16181A] font-normal leading-snug line-clamp-1 group-hover:text-[#8C6D37] transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-[11px] text-neutral-500 font-light truncate">
                        {condition || 'Exceptional Condition'}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#EBE7DE]/70 flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#16181A] tracking-tight">
                        {formatPrice(item.priceEUR, currency)}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-emerald-700 font-medium">
                        Available
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* View All New Arrivals Link */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setActiveTab('new-arrivals')}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#16181A] hover:bg-[#8C6D37] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-semibold transition-colors shadow-sm"
          >
            <span>DISCOVER ALL NEW VAULT ARRIVALS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
