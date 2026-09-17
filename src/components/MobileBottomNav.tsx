import React from 'react';
import { ShoppingBag, Heart, Search, Compass, MessageSquare } from 'lucide-react';
import { ActiveTab } from '../types';

interface MobileBottomNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenConsultation: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenConsultation,
}) => {
  return (
    <nav 
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-0 inset-x-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-t border-[#EBE7DE] lg:hidden shadow-[0_-4px_16px_rgba(0,0,0,0.06)]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="grid grid-cols-5 h-16 max-w-md mx-auto">
        
        {/* 1. Explore / Shop */}
        <button
          type="button"
          onClick={() => setActiveTab('shop')}
          className={`flex flex-col items-center justify-center gap-1 transition-colors min-h-[44px] ${
            activeTab === 'shop' || activeTab === 'watches' || activeTab === 'jewellery'
              ? 'text-[#8C6D37] font-semibold'
              : 'text-neutral-600 hover:text-[#16181A]'
          }`}
          aria-label="Browse Catalogue"
        >
          <Compass className="w-5 h-5 stroke-[1.75]" />
          <span className="text-[10px] uppercase tracking-wider">Catalogue</span>
        </button>

        {/* 2. Search */}
        <button
          type="button"
          onClick={onOpenSearch}
          className="flex flex-col items-center justify-center gap-1 text-neutral-600 hover:text-[#16181A] transition-colors min-h-[44px]"
          aria-label="Search Collection"
        >
          <Search className="w-5 h-5 stroke-[1.75]" />
          <span className="text-[10px] uppercase tracking-wider">Search</span>
        </button>

        {/* 3. Wishlist */}
        <button
          type="button"
          onClick={onOpenWishlist}
          className="relative flex flex-col items-center justify-center gap-1 text-neutral-600 hover:text-[#16181A] transition-colors min-h-[44px]"
          aria-label="Saved Vault Items"
        >
          <div className="relative">
            <Heart className="w-5 h-5 stroke-[1.75]" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#8C6D37] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-xs">
                {wishlistCount}
              </span>
            )}
          </div>
          <span className="text-[10px] uppercase tracking-wider">Saved</span>
        </button>

        {/* 4. Cart / Bag */}
        <button
          type="button"
          onClick={onOpenCart}
          className={`relative flex flex-col items-center justify-center gap-1 transition-colors min-h-[44px] ${
            activeTab === 'cart' || activeTab === 'checkout'
              ? 'text-[#8C6D37] font-semibold'
              : 'text-neutral-600 hover:text-[#16181A]'
          }`}
          aria-label="Shopping Bag"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#16181A] text-[#FAF8F5] text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-xs">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] uppercase tracking-wider">Bag</span>
        </button>

        {/* 5. Private Concierge */}
        <button
          type="button"
          onClick={onOpenConsultation}
          className="flex flex-col items-center justify-center gap-1 text-neutral-600 hover:text-[#8C6D37] transition-colors min-h-[44px]"
          aria-label="Contact Concierge"
        >
          <MessageSquare className="w-5 h-5 stroke-[1.75]" />
          <span className="text-[10px] uppercase tracking-wider">Concierge</span>
        </button>

      </div>
    </nav>
  );
};
