import React, { useState } from 'react';
import { Product, CurrencyCode } from '../types';
import { BRAND_COLLECTIONS } from '../data/products';
import { ProductCard } from './ProductCard';
import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';

interface CollectionsViewProps {
  products: Product[];
  currency: CurrencyCode;
  onSelectProduct: (product: Product) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onQuickAddToBag: (product: Product) => void;
  onRequestConsultation: (product: Product) => void;
  selectedCollectionId?: string | null;
  onClearCollectionFilter?: () => void;
}

export const CollectionsView: React.FC<CollectionsViewProps> = ({
  products,
  currency,
  onSelectProduct,
  wishlistIds,
  onToggleWishlist,
  onQuickAddToBag,
  onRequestConsultation,
  selectedCollectionId: initialCollectionId,
}) => {
  const [activeCollectionId, setActiveCollectionId] = useState<string | null>(initialCollectionId || null);

  const activeCollection = activeCollectionId 
    ? BRAND_COLLECTIONS.find(c => c.id === activeCollectionId) 
    : null;

  // Filter products for the active collection
  const collectionProducts = activeCollection
    ? products.filter(p => {
        if (activeCollection.id === 'rolex') return p.brand === 'Rolex';
        if (activeCollection.id === 'patek-philippe') return p.brand === 'Patek Philippe';
        if (activeCollection.id === 'audemars-piguet') return p.brand === 'Audemars Piguet';
        if (activeCollection.id === 'cartier') return p.brand === 'Cartier';
        if (activeCollection.id === 'omega') return p.brand === 'Omega';
        if (activeCollection.id === 'breitling') return p.brand === 'Breitling';
        if (activeCollection.id === 'tudor') return p.brand === 'Tudor';
        if (activeCollection.id === 'van-cleef-arpels') return p.brand === 'Van Cleef & Arpels';
        if (activeCollection.id === 'bulgari') return p.brand === 'Bulgari';
        if (activeCollection.id === 'tiffany-co') return p.brand === 'Tiffany & Co.';
        if (activeCollection.id === 'rare-exceptional') return p.collection.includes('Rare & Exceptional') || p.priceEUR >= 10000;
        return p.collection.toLowerCase().includes(activeCollection.name.toLowerCase());
      })
    : [];

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* If viewing a specific collection */}
        {activeCollection ? (
          <div>
            {/* Header for Single Collection */}
            <div className="mb-10">
              <button
                onClick={() => setActiveCollectionId(null)}
                className="flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-600 hover:text-[#8C6D37] mb-6 font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>All Curated Collections</span>
              </button>

              <div className="relative bg-[#16181A] text-[#FAF8F5] p-8 sm:p-12 border border-[#2A2D32] overflow-hidden">
                <div className="absolute inset-0 opacity-20 mix-blend-luminosity">
                  <img
                    src={activeCollection.heroImage}
                    alt={activeCollection.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="relative z-10 max-w-2xl space-y-4">
                  <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C6D37] font-semibold block">
                    Curated Maison Focus
                  </span>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#FAF8F5] font-light">
                    {activeCollection.name}
                  </h1>
                  <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                    {activeCollection.description}
                  </p>
                  <div className="pt-2 text-xs text-neutral-400">
                    Showing {collectionProducts.length} authenticated reference pieces
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid for this collection */}
            {collectionProducts.length === 0 ? (
              <div className="bg-white p-12 text-center border border-[#EBE7DE]">
                <p className="text-sm text-neutral-600">No active pieces currently listed under this collection.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {collectionProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    currency={currency}
                    onSelectProduct={onSelectProduct}
                    isWishlisted={wishlistIds.includes(product.id)}
                    onToggleWishlist={onToggleWishlist}
                    onQuickAddToBag={onQuickAddToBag}
                    onRequestConsultation={onRequestConsultation}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Collections Overview Hub */
          <div>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#16181A] text-[#E5D3B3] text-[10px] uppercase tracking-[0.25em] font-medium mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#8C6D37]" />
                <span>The Grand Maisons</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#16181A] font-light mb-4">
                Curated Collections
              </h1>
              <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                Explore authenticated horological icons and master jewellery signatures by legendary European and Swiss Maisons.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {BRAND_COLLECTIONS.map((col) => {
                const count = products.filter(p => {
                  if (col.id === 'rolex') return p.brand === 'Rolex';
                  if (col.id === 'patek-philippe') return p.brand === 'Patek Philippe';
                  if (col.id === 'audemars-piguet') return p.brand === 'Audemars Piguet';
                  if (col.id === 'cartier') return p.brand === 'Cartier';
                  if (col.id === 'van-cleef-arpels') return p.brand === 'Van Cleef & Arpels';
                  if (col.id === 'bulgari') return p.brand === 'Bulgari';
                  if (col.id === 'tiffany-co') return p.brand === 'Tiffany & Co.';
                  return p.priceEUR >= 30000;
                }).length;

                return (
                  <div
                    key={col.id}
                    onClick={() => setActiveCollectionId(col.id)}
                    className="group bg-white border border-[#EBE7DE] hover:border-[#8C6D37] overflow-hidden cursor-pointer transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-lg"
                  >
                    <div className="relative aspect-[4/3] bg-[#16181A] overflow-hidden">
                      <img
                        src={col.heroImage}
                        alt={col.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-85 group-hover:opacity-95"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111315]/90 via-[#111315]/20 to-transparent" />
                      
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C6D37] block font-semibold">
                          {col.brand}
                        </span>
                        <h3 className="text-lg font-serif text-[#FAF8F5] leading-tight">
                          {col.name}
                        </h3>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                      <p className="text-xs text-neutral-600 line-clamp-2 font-light leading-relaxed">
                        {col.description}
                      </p>

                      <div className="pt-3 border-t border-[#EBE7DE] flex items-center justify-between text-xs">
                        <span className="text-neutral-500 font-mono text-[11px]">
                          {count} Pieces Available
                        </span>
                        <span className="text-[#8C6D37] group-hover:text-[#16181A] font-semibold flex items-center gap-1 uppercase tracking-wider text-[10px]">
                          <span>Explore</span>
                          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
