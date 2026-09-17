import React, { useState } from 'react';
import { Product, CurrencyCode } from '../types';
import { formatPrice } from '../utils/currency';
import { calculatePaymentPlan, PAYMENT_PLAN_TENURES, PaymentPlanTenure } from '../utils/paymentPlan';
import { X, ShieldCheck, CheckCircle2, Calendar, CreditCard, Lock, Sparkles, ArrowRight } from 'lucide-react';
import { WatermarkedProductImage } from './WatermarkedProductImage';

interface PaymentPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
  totalEUR?: number;
  currency: CurrencyCode;
  onSelectPlan?: (tenure: PaymentPlanTenure) => void;
}

export const PaymentPlanModal: React.FC<PaymentPlanModalProps> = ({
  isOpen,
  onClose,
  product,
  totalEUR,
  currency,
  onSelectPlan,
}) => {
  const [selectedTenure, setSelectedTenure] = useState<PaymentPlanTenure>(12);

  if (!isOpen) return null;

  const basePrice = totalEUR ?? (product ? product.priceEUR : 0);
  const plan = calculatePaymentPlan(basePrice, currency, selectedTenure);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#111315]/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden bg-[#FAF8F5] text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl border border-[#C5A880]/60">
          
          {/* Header Bar */}
          <div className="bg-[#111315] px-6 py-4 flex items-center justify-between border-b border-[#2A2D32]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C5A880]" />
              <span className="text-xs uppercase tracking-[0.25em] font-serif text-[#FAF8F5]">
                Maison 0% Flexible Payment Plan
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-[#FAF8F5] transition-colors p-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Product Summary if provided */}
            {product && (
              <div className="flex items-center gap-4 p-4 bg-white border border-[#EBE7DE]">
                <div className="w-16 h-16 border border-[#EBE7DE] overflow-hidden flex-shrink-0 bg-[#F5F2EB]">
                  <WatermarkedProductImage
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    watermarkSize="xs"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#8C6D37] block">
                    {product.brand}
                  </span>
                  <h4 className="text-sm font-serif text-[#16181A] truncate">
                    {product.name}
                  </h4>
                  <div className="text-xs font-semibold text-neutral-900 mt-0.5">
                    Full Valuation: {formatPrice(product.priceEUR, currency)}
                  </div>
                </div>
              </div>
            )}

            {/* Tenure Selector */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-800 mb-2.5">
                Select Installment Horizon (All with 0% APR):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {PAYMENT_PLAN_TENURES.map((t) => {
                  const tPlan = calculatePaymentPlan(basePrice, currency, t);
                  const isSelected = selectedTenure === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedTenure(t)}
                      className={`p-3 border text-center transition-all flex flex-col items-center justify-center ${
                        isSelected
                          ? 'border-[#8C6D37] bg-[#8C6D37]/10 ring-1 ring-[#8C6D37] text-[#16181A]'
                          : 'border-[#EBE7DE] bg-white text-neutral-700 hover:border-neutral-400'
                      }`}
                    >
                      <span className="text-xs uppercase tracking-widest font-semibold block">
                        {t} Months
                      </span>
                      <span className="text-sm font-medium text-[#8C6D37] mt-1 block">
                        {tPlan.formattedMonthly}/mo
                      </span>
                      <span className="text-[9px] text-emerald-800 font-medium block mt-0.5">
                        0% APR
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Plan Calculation Spotlight */}
            <div className="bg-white p-5 border border-[#EBE7DE] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#EBE7DE] pb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-neutral-500 block">
                    Monthly Commitment ({selectedTenure} installments)
                  </span>
                  <div className="text-2xl sm:text-3xl font-serif text-[#16181A] font-normal">
                    {plan.formattedMonthly} <span className="text-xs text-neutral-500 font-sans">/ month</span>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-500 block">
                    Due Today to Secure Piece
                  </span>
                  <div className="text-base font-semibold text-[#8C6D37]">
                    {plan.formattedDueToday}
                  </div>
                </div>
              </div>

              {/* Schedule Preview */}
              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-neutral-700 block mb-2">
                  Anticipated Settlement Schedule
                </span>
                <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1 text-xs">
                  {plan.schedule.map((item) => (
                    <div 
                      key={item.installmentNumber}
                      className="flex items-center justify-between py-1 px-2.5 bg-[#FAF8F5] border border-[#EBE7DE]/70 text-[11px]"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 text-center font-mono text-[10px] text-neutral-400">
                          #{item.installmentNumber}
                        </span>
                        <span className="text-neutral-700">{item.dueDateLabel}</span>
                      </div>
                      <span className="font-medium text-neutral-900">{item.formattedAmount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Benefits & Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
              <div className="p-3 bg-white border border-[#EBE7DE]">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 mb-1.5" />
                <span className="text-[11px] font-semibold text-neutral-900 block uppercase tracking-wider">
                  0% APR Guaranteed
                </span>
                <p className="text-[10px] text-neutral-500 font-light mt-0.5">
                  Direct Maison facility. No third-party finance fees or hidden markups.
                </p>
              </div>

              <div className="p-3 bg-white border border-[#EBE7DE]">
                <Lock className="w-4 h-4 text-[#8C6D37] mb-1.5" />
                <span className="text-[11px] font-semibold text-neutral-900 block uppercase tracking-wider">
                  Instant Vault Hold
                </span>
                <p className="text-[10px] text-neutral-500 font-light mt-0.5">
                  Piece is immediately marked reserved and allocated exclusively to your portfolio.
                </p>
              </div>

              <div className="p-3 bg-white border border-[#EBE7DE]">
                <ShieldCheck className="w-4 h-4 text-[#8C6D37] mb-1.5" />
                <span className="text-[11px] font-semibold text-neutral-900 block uppercase tracking-wider">
                  Discreet Verification
                </span>
                <p className="text-[10px] text-neutral-500 font-light mt-0.5">
                  Seamless approval with zero impact on traditional credit bureaus.
                </p>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              {onSelectPlan ? (
                <button
                  type="button"
                  onClick={() => {
                    onSelectPlan(selectedTenure);
                    onClose();
                  }}
                  className="flex-1 bg-[#16181A] hover:bg-[#8C6D37] text-[#FAF8F5] py-3.5 px-6 text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <span>Select {selectedTenure}-Month Plan & Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-[#16181A] hover:bg-[#8C6D37] text-[#FAF8F5] py-3.5 px-6 text-xs uppercase tracking-widest font-semibold transition-colors text-center"
                >
                  Understood — Return to Piece
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
