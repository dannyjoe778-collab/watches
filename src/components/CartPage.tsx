import React from 'react';
import { CartItem, CurrencyCode, ActiveTab } from '../types';
import { formatPrice } from '../utils/currency';
import { Trash2, ShieldCheck, ArrowRight, Truck, Plus, Minus } from 'lucide-react';
import { WatermarkedProductImage } from './WatermarkedProductImage';

interface CartPageProps {
  items: CartItem[];
  currency: CurrencyCode;
  onUpdateQuantity: (productId: string, quantity: number, selectedOption?: string) => void;
  onRemoveItem: (productId: string, selectedOption?: string) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  items,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  setActiveTab
}) => {
  const totalEUR = items.reduce((acc, item) => acc + item.product.priceEUR * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="bg-[#FAF8F5] min-h-screen py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-serif text-[#16181A] mb-6">Your Cart is Empty</h1>
          <p className="text-neutral-500 mb-10">Explore our curated selection of authenticated watches and rare fine jewellery.</p>
          <button
            onClick={() => setActiveTab('shop')}
            className="bg-[#16181A] hover:bg-[#8C6D37] text-white px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] transition-colors inline-block"
          >
            Return to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 border-b border-[#EBE7DE] pb-6">
          <h1 className="text-3xl sm:text-4xl font-serif text-[#16181A] tracking-tight">Shopping Cart</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Cart Items List */}
          <div className="lg:col-span-8">
            <div className="bg-white border border-[#EBE7DE] shadow-xs">
              {/* Desktop Header */}
              <div className="hidden sm:grid grid-cols-12 gap-4 p-5 border-b border-[#EBE7DE] text-[10px] uppercase tracking-widest font-semibold text-neutral-500">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Subtotal</div>
              </div>
              
              {/* Items */}
              <div className="divide-y divide-[#EBE7DE]">
                {items.map((item, idx) => (
                  <div key={`${item.product.id}-${item.selectedOption || idx}`} className="p-5 flex flex-col sm:grid sm:grid-cols-12 sm:items-center gap-4 sm:gap-4 relative group">
                    
                    {/* Mobile Remove Button */}
                    <button
                      onClick={() => onRemoveItem(item.product.id, item.selectedOption)}
                      className="absolute top-5 right-5 p-1 text-neutral-400 hover:text-red-700 sm:hidden"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="col-span-6 flex gap-4">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 border border-[#EBE7DE] overflow-hidden flex-shrink-0">
                        <WatermarkedProductImage
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                          watermarkSize="sm"
                        />
                      </div>
                      <div className="flex flex-col justify-center pr-8 sm:pr-0">
                        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#8C6D37] mb-1">
                          {item.product.brand}
                        </span>
                        <h5 className="text-sm font-serif font-medium text-[#16181A] leading-snug mb-1 cursor-pointer hover:text-[#8C6D37] transition-colors"
                            onClick={() => { /* Option to view product could be added here */ }}
                        >
                          {item.product.name}
                        </h5>
                        {item.selectedOption && (
                          <span className="text-xs text-neutral-500">
                            Material: {item.selectedOption}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="col-span-2 sm:text-center text-sm font-medium text-neutral-900 hidden sm:block">
                      {formatPrice(item.product.priceEUR, currency)}
                    </div>
                    
                    <div className="col-span-2 flex items-center justify-between sm:justify-center">
                      <span className="text-xs text-neutral-500 sm:hidden">Quantity:</span>
                      <div className="flex items-center border border-[#EBE7DE]">
                        <button 
                          onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1), item.selectedOption)}
                          className="px-2.5 py-1.5 text-neutral-500 hover:text-[#16181A] hover:bg-[#FAF8F5] transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-medium text-[#16181A] w-8 text-center">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1, item.selectedOption)}
                          className="px-2.5 py-1.5 text-neutral-500 hover:text-[#16181A] hover:bg-[#FAF8F5] transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="col-span-2 flex items-center justify-between sm:justify-end">
                      <span className="text-xs text-neutral-500 sm:hidden">Subtotal:</span>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-semibold text-[#16181A]">
                          {formatPrice(item.product.priceEUR * item.quantity, currency)}
                        </span>
                        <button
                          onClick={() => onRemoveItem(item.product.id, item.selectedOption)}
                          className="text-neutral-300 hover:text-red-700 transition-colors hidden sm:block p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-neutral-500 font-light">
              <ShieldCheck className="w-4 h-4 text-[#8C6D37]" />
              <span>Protected by European Escrow & Insured Dispatch. Authentication dossier included.</span>
            </div>
          </div>
          
          {/* Cart Totals */}
          <div className="lg:col-span-4">
            <div className="bg-white border border-[#EBE7DE] shadow-xs p-6">
              <h2 className="text-lg font-serif text-[#16181A] border-b border-[#EBE7DE] pb-4 mb-6">
                Cart totals
              </h2>
              
              <div className="space-y-4 text-sm mb-6">
                <div className="flex justify-between text-neutral-600 border-b border-[#EBE7DE] pb-4">
                  <span>Subtotal</span>
                  <span className="font-medium text-neutral-900">{formatPrice(totalEUR, currency)}</span>
                </div>
                
                <div className="flex justify-between text-neutral-600 border-b border-[#EBE7DE] pb-4">
                  <span>Shipping</span>
                  <div className="text-right">
                    <span className="text-emerald-800 font-medium flex items-center justify-end gap-1 mb-1">
                      <Truck className="w-3.5 h-3.5 text-[#8C6D37]" />
                      Free shipping
                    </span>
                    <span className="text-[10px] text-neutral-500">Fully insured European express</span>
                  </div>
                </div>
                
                <div className="flex justify-between text-[#16181A] font-semibold text-lg pt-2">
                  <span>Total</span>
                  <span className="text-[#8C6D37]">{formatPrice(totalEUR, currency)}</span>
                </div>
              </div>
              
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setActiveTab('checkout');
                }}
                className="w-full bg-[#16181A] hover:bg-[#8C6D37] text-white py-4 px-6 text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <span>Proceed to checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
