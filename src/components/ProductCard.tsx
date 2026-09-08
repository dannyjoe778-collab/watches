import React, { useState } from 'react';
import { Product, CurrencyCode } from '../types';
import { formatPrice } from '../utils/currency';
import { Heart, ShieldCheck, Award, Eye, MessageSquare, ShoppingBag } from 'lucide-react';
import { WatermarkedProductImage } from './WatermarkedProductImage';

interface ProductCardProps {
  product: Product;
  currency: CurrencyCode;
  onSelectProduct: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onQuickAddToBag?: (product: Product) => void;
  onRequestConsultation?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  onSelectProduct,
  isWishlisted,
  onToggleWishlist,
  onQuickAddToBag,
  onRequestConsultation
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const primaryImage = product.images[0] || 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80';
  const secondaryImage = product.images[1] || primaryImage;

  const getBadgeStyle = () => {
    switch (product.badge) {
      case 'CERTIFIED':
        return 'bg-[#16181A] text-[#E5D3B3] border border-[#8C6D37]/50';
      case 'PRIVATE SALE':
        return 'bg-[#2A2D32] text-[#FAF8F5] border border-neutral-600';
      case 'SAMPLE LISTING':
        return 'bg-[#EBE7DE] text-[#6A6C70] border border-neutral-300';
      case 'NEW':
        return 'bg-[#8C6D37] text-[#111315] font-semibold';
      case 'AUTHENTICATED':
      default:
        return 'bg-[#FAF8F5]/90 text-[#16181A] border border-[#EBE7DE] backdrop-blur-xs';
    }
  };

  const getStatusBadge = () => {
    switch (product.status) {
      case 'Sold':
        return <span className="text-[10px] uppercase tracking-wider text-red-700 font-semibold">● Sold</span>;
      case 'Reserved':
        return <span className="text-[10px] uppercase tracking-wider text-amber-700 font-semibold">● Reserved</span>;
      case 'Coming Soon':
        return <span className="text-[10px] uppercase tracking-wider text-blue-700 font-medium">● Coming Soon</span>;
      case 'New':
        return <span className="text-[10px] uppercase tracking-wider text-emerald-800 font-semibold">● Available (New)</span>;
      case 'Available':
      default:
        return <span className="text-[10px] uppercase tracking-wider text-emerald-800 font-medium">● Available</span>;
    }
  };

  const isSoldOrReserved = product.status === 'Sold' || product.status === 'Reserved';

  return (
    <div 
      className="group relative bg-white border border-[#EBE7DE] hover:border-[#8C6D37] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Media Area with Dual Image Hover Transition & Aurelia & Crown Watermark */}
      <div className="relative aspect-square w-full bg-[#F5F2EB] overflow-hidden cursor-pointer"
        onClick={() => onSelectProduct(product)}
      >
        <WatermarkedProductImage
          src={primaryImage}
          secondarySrc={secondaryImage}
          alt={`${product.brand} ${product.name}`}
          isHovered={isHovered}
          watermarkSize="md"
          watermarkPosition="bottom-right"
        />

        {/* Top Badges & Wishlist Button */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between pointer-events-none z-10">
          <div className="flex flex-col gap-1.5 items-start">
            <span className={`text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 font-medium ${getBadgeStyle()}`}>
              {product.badge}
            </span>
            {product.isSampleListing && (
              <span className="text-[8px] uppercase tracking-wider px-2 py-0.5 bg-amber-100/90 text-amber-900 border border-amber-300">
                SAMPLE LISTING
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            className={`p-2 rounded-full pointer-events-auto transition-all ${
              isWishlisted 
                ? 'bg-[#8C6D37] text-white shadow-sm' 
                : 'bg-white/80 backdrop-blur-xs text-[#16181A] hover:bg-white hover:text-[#8C6D37]'
            }`}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Hover Quick Action Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#111315]/80 via-[#111315]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 pointer-events-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(product);
            }}
            className="flex-1 bg-[#FAF8F5] hover:bg-[#8C6D37] text-[#111315] hover:text-white py-2 px-3 text-[10px] uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>VIEW DETAILS</span>
          </button>

          {!product.isHighValuePrivateConsultationOnly && !isSoldOrReserved && onQuickAddToBag && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickAddToBag(product);
              }}
              className="bg-[#111315] hover:bg-[#8C6D37] text-[#FAF8F5] p-2 transition-colors"
              title="Add to Bag"
              aria-label="Add to Bag"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
            </button>
          )}

          {product.isHighValuePrivateConsultationOnly && onRequestConsultation && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRequestConsultation(product);
              }}
              className="bg-[#111315] hover:bg-[#8C6D37] text-[#FAF8F5] p-2 transition-colors"
              title="Request Private Consultation"
              aria-label="Request Private Consultation"
            >
              <MessageSquare className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 space-y-3">
        <div>
          {/* Brand & Reference */}
          <div className="flex items-center justify-between text-[11px] text-neutral-500 mb-1">
            <span className="uppercase tracking-[0.18em] font-semibold text-[#8C6D37]">
              {product.brand}
            </span>
            {product.watchSpecs?.reference && (
              <span className="font-mono text-[10px] text-neutral-400">
                Ref. {product.watchSpecs.reference}
              </span>
            )}
          </div>

          {/* Product Name */}
          <h4 
            onClick={() => onSelectProduct(product)}
            className="text-base sm:text-lg font-serif text-[#16181A] font-normal leading-snug group-hover:text-[#8C6D37] transition-colors cursor-pointer line-clamp-2"
          >
            {product.name}
          </h4>

          {/* Condition / Specs Snippet */}
          <div className="mt-1 text-[11px] text-neutral-600 font-light flex items-center gap-2">
            <span>
              {product.type === 'watch' 
                ? product.watchSpecs?.condition || 'Inspected Condition' 
                : product.jewellerySpecs?.material || 'Fine Precious Metal'}
            </span>
            {product.watchSpecs?.year && (
              <>
                <span className="text-neutral-300">•</span>
                <span>{product.watchSpecs.year}</span>
              </>
            )}
          </div>
        </div>

        {/* Pricing & Status Footer */}
        <div className="pt-3 border-t border-[#EBE7DE] flex items-center justify-between">
          <div>
            <div className="text-base sm:text-lg font-medium text-[#16181A] tracking-tight">
              {formatPrice(product.priceEUR, currency)}
            </div>
            <div className="text-[9px] text-neutral-500 uppercase tracking-wider">
              {product.isHighValuePrivateConsultationOnly ? 'Private Allocation' : 'Tax Inc. / Insured'}
            </div>
          </div>

          <div className="text-right">
            {getStatusBadge()}
          </div>
        </div>

        {/* Explicit View Details Action on Mobile / Default */}
        <div className="pt-1">
          <button
            onClick={() => onSelectProduct(product)}
            className="w-full py-2 bg-transparent hover:bg-[#FAF8F5] text-[#16181A] border border-[#EBE7DE] hover:border-[#8C6D37] text-[10px] uppercase tracking-[0.2em] font-semibold transition-colors flex items-center justify-center gap-1"
          >
            <span>VIEW DETAILS</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};
