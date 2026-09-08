import React, { useState } from 'react';
import { Product, CurrencyCode, ActiveTab } from '../types';
import { formatPrice } from '../utils/currency';
import { ArrowRight, Heart, Sparkles, ShieldCheck, Crown } from 'lucide-react';
import { WatermarkedProductImage } from './WatermarkedProductImage';

interface BrandVaultShowcaseSectionProps {
  products: Product[];
  currency: CurrencyCode;
  onSelectProduct: (product: Product) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  setActiveTab: (tab: ActiveTab, opt?: { collectionId?: string; brand?: string; category?: string }) => void;
}

export const BrandVaultShowcaseSection: React.FC<BrandVaultShowcaseSectionProps> = ({
  products,
  currency,
  onSelectProduct,
  wishlistIds,
  onToggleWishlist,
  setActiveTab,
}) => {
  const [selectedBrand, setSelectedBrand] = useState('Rolex');

  const brandOptions = [
    { name: 'Rolex', subtitle: 'Geneva Horology', count: products.filter(p => p.brand === 'Rolex').length },
    { name: 'Patek Philippe', subtitle: 'Grand Complications', count: products.filter(p => p.brand === 'Patek Philippe').length },
    { name: 'Audemars Piguet', subtitle: 'Le Brassus Royal Oak', count: products.filter(p => p.brand === 'Audemars Piguet').length },
    { name: 'Cartier', subtitle: 'Paris Atelier & Icons', count: products.filter(p => p.brand === 'Cartier').length },
    { name: 'Omega', subtitle: 'Speedmaster & Seamaster', count: products.filter(p => p.brand === 'Omega').length },
    { name: 'Breitling', subtitle: 'Navitimer & Chronomat', count: products.filter(p => p.brand === 'Breitling').length },
  ];

  const brandProducts = products.filter(p => p.brand === selectedBrand);

  return (
    <section className="bg-white py-20 sm:py-28 lg:py-36 border-b border-[#EBE7DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#16181A] text-[#FAF8F5] text-[10px] uppercase tracking-[0.25em] font-medium">
            <Crown className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Maison Portfolios</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#16181A] font-light tracking-[-0.015em]">
            EXPLORE BY MAISON
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 font-light max-w-xl mx-auto leading-relaxed">
            Select a prestigious European house to inspect authenticated references in our custody.
          </p>
          <div className="w-12 h-[1px] bg-[#8C6D37]/40 mx-auto mt-4" />
        </div>

        {/* Brand Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
          {brandOptions.map((brand) => {
            const isSelected = selectedBrand === brand.name;
            return (
              <button
                key={brand.name}
                onClick={() => setSelectedBrand(brand.name)}
                className={`p-4 text-left border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#16181A] text-[#FAF8F5] border-[#16181A] shadow-md'
                    : 'bg-[#FAF8F5] text-neutral-700 border-[#EBE7DE] hover:border-[#8C6D37]/60 hover:bg-white'
                }`}
              >
                <div>
                  <span className={`text-[9px] uppercase tracking-wider block mb-1 ${isSelected ? 'text-[#C5A880]' : 'text-neutral-400'}`}>
                    {brand.count} In Vault
                  </span>
                  <h3 className="font-serif text-sm sm:text-base font-normal truncate">
                    {brand.name}
                  </h3>
                </div>
                <span className={`text-[10px] tracking-wide block mt-2 font-light truncate ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                  {brand.subtitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* Brand Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {brandProducts.map((item) => {
            const isWishlisted = wishlistIds.includes(item.id);
            return (
              <div
                key={item.id}
                className="group relative bg-[#FAF8F5] border border-[#EBE7DE] hover:border-[#8C6D37]/70 transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-xl"
              >
                {/* Image */}
                <div 
                  className="relative aspect-square overflow-hidden bg-white cursor-pointer"
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

                  {/* Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-[#111315]/90 backdrop-blur-sm text-[#FAF8F5] text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 font-medium border border-[#2A2D32]">
                      {item.type === 'watch' ? 'Horology' : 'Jewellery'}
                    </span>
                  </div>

                  {/* Wishlist */}
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

                  {/* Hover Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#111315]/90 via-[#111315]/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct(item);
                      }}
                      className="w-full py-2.5 bg-[#FAF8F5] text-[#111315] hover:bg-[#8C6D37] hover:text-[#FAF8F5] text-[10px] uppercase tracking-[0.22em] font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <span>VIEW {item.brand.toUpperCase()}</span>
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
                      {item.type === 'watch' ? `Ref. ${item.watchSpecs?.reference || ''}` : item.category}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#EBE7DE]/80 flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#16181A] tracking-tight">
                      {formatPrice(item.priceEUR, currency)}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-emerald-700 font-medium">
                      In Vault
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Brand Footer Link */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setActiveTab(
              brandProducts.some(p => p.type === 'watch') && !brandProducts.some(p => p.type === 'jewellery')
                ? 'watches'
                : 'jewellery',
              { brand: selectedBrand }
            )}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#16181A] hover:text-[#8C6D37] transition-colors pb-1 border-b border-[#16181A] hover:border-[#8C6D37]"
          >
            <span>VIEW ALL {selectedBrand.toUpperCase()} PIECES IN ARCHIVE</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
