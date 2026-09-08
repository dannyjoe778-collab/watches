import React from 'react';
import { Product, CurrencyCode, ActiveTab } from '../types';
import { ProductCard } from './ProductCard';
import { Sparkles, ArrowRight } from 'lucide-react';

interface NewArrivalsSectionProps {
  products: Product[];
  currency: CurrencyCode;
  onSelectProduct: (product: Product) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onQuickAddToBag: (product: Product) => void;
  onRequestConsultation: (product: Product) => void;
  setActiveTab?: (tab: ActiveTab) => void;
  isStandalonePage?: boolean;
}

export const NewArrivalsSection: React.FC<NewArrivalsSectionProps> = ({
  products,
  currency,
  onSelectProduct,
  wishlistIds,
  onToggleWishlist,
  onQuickAddToBag,
  onRequestConsultation,
  setActiveTab,
  isStandalonePage = false
}) => {
  // Filter new arrivals or recent 6 products
  const newArrivals = products
    .filter(p => p.isNewArrival || p.badge === 'NEW' || p.status === 'New')
    .slice(0, isStandalonePage ? 12 : 6);

  return (
    <section className={`bg-[#FAF8F5] ${isStandalonePage ? 'py-16 sm:py-24' : 'py-20 border-b border-[#EBE7DE]'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#8C6D37]/15 border border-[#8C6D37]/30 text-[#8C6D37] text-[10px] uppercase tracking-[0.25em] font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Recent European Acquisitions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#16181A] font-light">
              New Arrivals & Vault Additions
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 font-light mt-2 max-w-xl">
              Freshly authenticated horological references and fine joaillerie allocations available for private acquisition.
            </p>
          </div>

          {!isStandalonePage && setActiveTab && (
            <button
              onClick={() => setActiveTab('new-arrivals')}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#16181A] hover:text-[#8C6D37] border-b border-[#16181A] hover:border-[#8C6D37] pb-1 transition-colors self-start md:self-auto"
            >
              <span>View All New Arrivals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* 6 Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {newArrivals.map((product) => (
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

      </div>
    </section>
  );
};
