import React from 'react';
import { Product, CurrencyCode } from '../types';
import { formatPrice } from '../utils/currency';
import { X, Heart, Trash2, ArrowRight, ShoppingBag, Eye } from 'lucide-react';
import { WatermarkedProductImage } from './WatermarkedProductImage';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  currency: CurrencyCode;
  onToggleWishlist: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  onMoveToBag: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  currency,
  onToggleWishlist,
  onSelectProduct,
  onMoveToBag
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="fixed inset-0 bg-[#111315]/70 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#EBE7DE] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 bg-white border-b border-[#EBE7DE] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Heart className="w-5 h-5 text-[#8C6D37] fill-current" />
              <h3 className="text-base font-serif tracking-wider uppercase text-[#16181A]">
                Saved Collector Pieces ({wishlistProducts.length})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-neutral-400 hover:text-[#16181A] transition-colors"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-12 h-12 bg-[#FAF8F5] border border-[#EBE7DE] mx-auto flex items-center justify-center text-neutral-400">
                  <Heart className="w-6 h-6" />
                </div>
                <h4 className="text-base font-serif text-neutral-800">Your wishlist is empty</h4>
                <p className="text-xs text-neutral-500 font-light max-w-xs mx-auto">
                  Click the heart icon on any timepiece or jewellery creation to save it to your private portfolio.
                </p>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div 
                  key={product.id}
                  className="bg-white p-4 border border-[#EBE7DE] flex gap-4 relative group"
                >
                  <div 
                    className="w-20 h-20 border border-[#EBE7DE] overflow-hidden flex-shrink-0 cursor-pointer"
                    onClick={() => {
                      onClose();
                      onSelectProduct(product);
                    }}
                  >
                    <WatermarkedProductImage
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      watermarkSize="xs"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-[#8C6D37] block">
                        {product.brand}
                      </span>
                      <h5 
                        onClick={() => {
                          onClose();
                          onSelectProduct(product);
                        }}
                        className="text-xs font-serif font-medium text-[#16181A] truncate cursor-pointer hover:text-[#8C6D37]"
                      >
                        {product.name}
                      </h5>
                      <span className="text-xs font-semibold text-[#16181A] block mt-1">
                        {formatPrice(product.priceEUR, currency)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#FAF8F5]">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            onClose();
                            onSelectProduct(product);
                          }}
                          className="text-[10px] uppercase tracking-wider text-[#16181A] hover:text-[#8C6D37] flex items-center gap-1 font-medium"
                        >
                          <Eye className="w-3 h-3" />
                          <span>View</span>
                        </button>
                        
                        {!product.isHighValuePrivateConsultationOnly && (
                          <button
                            onClick={() => {
                              onMoveToBag(product);
                              onToggleWishlist(product.id);
                            }}
                            className="text-[10px] uppercase tracking-wider text-[#8C6D37] hover:text-[#16181A] flex items-center gap-1 font-semibold ml-2"
                          >
                            <ShoppingBag className="w-3 h-3" />
                            <span>Add to Bag</span>
                          </button>
                        )}
                      </div>

                      <button
                        onClick={() => onToggleWishlist(product.id)}
                        className="text-neutral-400 hover:text-red-700 transition-colors p-1"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-6 bg-white border-t border-[#EBE7DE]">
            <button
              onClick={onClose}
              className="w-full bg-[#16181A] hover:bg-[#8C6D37] text-[#FAF8F5] py-3 px-6 text-xs uppercase tracking-widest font-semibold transition-colors"
            >
              Continue Exploring
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
