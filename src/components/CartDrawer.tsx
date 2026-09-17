import React from 'react';
import { CartItem, CurrencyCode, ActiveTab } from '../types';
import { formatPrice } from '../utils/currency';
import { calculatePaymentPlan } from '../utils/paymentPlan';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, Lock, CreditCard, Sparkles } from 'lucide-react';
import { WatermarkedProductImage } from './WatermarkedProductImage';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: CurrencyCode;
  onUpdateQuantity: (productId: string, quantity: number, selectedOption?: string) => void;
  onRemoveItem: (productId: string, selectedOption?: string) => void;
  onProceedToCheckout: () => void;
  onViewFullCart: () => void;
  onOpenPaymentPlanModal?: (totalEUR: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onViewFullCart,
  onOpenPaymentPlanModal,
}) => {
  if (!isOpen) return null;

  const totalEUR = items.reduce((acc, item) => acc + item.product.priceEUR * item.quantity, 0);
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const plan12 = calculatePaymentPlan(totalEUR, currency, 12);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#111315]/75 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#EBE7DE] shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 sm:p-6 bg-white border-b border-[#EBE7DE] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="font-serif text-lg tracking-wider uppercase text-[#16181A]">
                Shopping Bag
              </span>
              <span className="text-xs bg-[#16181A] text-[#FAF8F5] px-2 py-0.5 rounded-full font-mono">
                {itemCount}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-[#16181A] transition-colors rounded hover:bg-neutral-100"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body: Items or Empty State */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#EBE7DE]/50 flex items-center justify-center mx-auto text-[#8C6D37]">
                  <Lock className="w-7 h-7 stroke-[1.5]" />
                </div>
                <h4 className="text-lg font-serif text-[#16181A]">Your Bag is Empty</h4>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed">
                  Discover rare certified timepieces and fine jewellery pieces in our private vault.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 bg-[#16181A] hover:bg-[#8C6D37] text-white px-6 py-2.5 text-xs uppercase tracking-widest font-semibold transition-colors"
                >
                  Explore Catalogue
                </button>
              </div>
            ) : (
              <>
                {/* Armoured transit announcement */}
                <div className="flex items-center gap-2 p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-900 text-[11px] font-medium">
                  <Truck className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                  <span>Complimentary Insured Courier Transit Included</span>
                </div>

                {/* Items List */}
                <div className="divide-y divide-[#EBE7DE] border-y border-[#EBE7DE]">
                  {items.map((item, idx) => (
                    <div 
                      key={`${item.product.id}-${item.selectedOption || idx}`} 
                      className="py-4 flex gap-3.5 items-start"
                    >
                      {/* Image */}
                      <div className="w-20 h-20 border border-[#EBE7DE] overflow-hidden flex-shrink-0 bg-[#F5F2EB]">
                        <WatermarkedProductImage
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                          watermarkSize="xs"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-[#8C6D37] block">
                          {item.product.brand}
                        </span>
                        <h5 className="text-xs font-serif font-medium text-[#16181A] truncate">
                          {item.product.name}
                        </h5>
                        {item.selectedOption && (
                          <span className="text-[10px] text-neutral-500 block">
                            Option: {item.selectedOption}
                          </span>
                        )}
                        <div className="text-xs font-semibold text-[#16181A]">
                          {formatPrice(item.product.priceEUR * item.quantity, currency)}
                        </div>

                        {/* Controls */}
                        <div className="pt-2 flex items-center justify-between">
                          <div className="flex items-center border border-[#EBE7DE] bg-white">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1, item.selectedOption)}
                              className="p-1 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-mono font-medium text-neutral-900">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1, item.selectedOption)}
                              className="p-1 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.product.id, item.selectedOption)}
                            className="text-neutral-400 hover:text-red-700 text-xs transition-colors p-1"
                            title="Remove piece"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Maison 0% Payment Plan Teaser Box */}
                {totalEUR > 0 && (
                  <div className="p-3.5 bg-[#8C6D37]/10 border border-[#8C6D37]/40 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#16181A]">
                      <span className="flex items-center gap-1.5 uppercase tracking-wider text-[10px] text-[#8C6D37]">
                        <Sparkles className="w-3.5 h-3.5" />
                        Maison 0% Payment Plan
                      </span>
                      <span className="text-[10px] text-emerald-800 bg-emerald-100 px-1.5 py-0.5 font-bold">
                        0% APR
                      </span>
                    </div>
                    <div className="text-xs text-neutral-800 font-medium">
                      Or pay {plan12.formattedMonthly}/month in 12 interest-free installments.
                    </div>
                    {onOpenPaymentPlanModal && (
                      <button
                        type="button"
                        onClick={() => onOpenPaymentPlanModal(totalEUR)}
                        className="text-[10px] text-[#8C6D37] hover:underline uppercase tracking-wider font-semibold block pt-0.5"
                      >
                        View 3, 6, 12 & 24 Month Schedules →
                      </button>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer Subtotal & Action Buttons */}
          {items.length > 0 && (
            <div className="p-5 sm:p-6 bg-white border-t border-[#EBE7DE] space-y-3.5">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-neutral-900">{formatPrice(totalEUR, currency)}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Armoured Insured Delivery</span>
                  <span className="text-emerald-800 font-medium">Complimentary</span>
                </div>
                <div className="pt-2 border-t border-[#EBE7DE] flex justify-between text-sm font-serif font-medium text-[#16181A]">
                  <span>Estimated Total</span>
                  <span className="text-[#8C6D37] font-sans font-semibold text-base">
                    {formatPrice(totalEUR, currency)}
                  </span>
                </div>
              </div>

              {/* 1-Click Fast Express Checkout */}
              <button
                id="drawer-express-checkout-btn"
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full bg-[#16181A] hover:bg-[#8C6D37] text-[#FAF8F5] py-4 px-6 text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <Lock className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>EXPRESS CHECKOUT</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              {/* View Full Cart */}
              <button
                onClick={() => {
                  onClose();
                  onViewFullCart();
                }}
                className="w-full py-2.5 bg-transparent border border-[#EBE7DE] hover:border-neutral-400 text-neutral-800 text-[11px] uppercase tracking-wider font-medium transition-colors text-center"
              >
                View Full Shopping Bag
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-400 font-light">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8C6D37]" />
                <span>Protected by European Escrow & Authentication Dossier</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
