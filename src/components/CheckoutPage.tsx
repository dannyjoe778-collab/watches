import React, { useState } from 'react';
import { CartItem, CurrencyCode, Order } from '../types';
import { formatPrice, getCurrencyDisclaimer } from '../utils/currency';
import { calculatePaymentPlan, PAYMENT_PLAN_TENURES, PaymentPlanTenure } from '../utils/paymentPlan';
import { WatermarkedProductImage } from './WatermarkedProductImage';
import { PaymentMethodBadges } from './PaymentMethodBadges';
import { 
  ShieldCheck, 
  Lock, 
  Truck, 
  CreditCard, 
  Building, 
  CheckCircle2, 
  ArrowLeft, 
  FileText,
  Building2,
  Sparkles,
  Smartphone,
  Zap,
  Calendar,
  Clock
} from 'lucide-react';

interface CheckoutPageProps {
  items: CartItem[];
  currency: CurrencyCode;
  onBackToCatalogue: () => void;
  onOrderComplete: (order: Order) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  items,
  currency,
  onBackToCatalogue,
  onOrderComplete
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('France');
  const [shippingMethod, setShippingMethod] = useState<'armoured' | 'paris-salon' | 'geneva-salon'>('armoured');
  const [paymentMethod, setPaymentMethod] = useState<'sepa_wire' | 'credit_card' | 'apple_google_pay' | 'private_invoice' | 'payment_plan'>('sepa_wire');
  const [planTenure, setPlanTenure] = useState<PaymentPlanTenure>(12);
  const [notes, setNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const totalEUR = items.reduce((acc, i) => acc + i.product.priceEUR * i.quantity, 0);
  const plan = calculatePaymentPlan(totalEUR, currency, planTenure);

  // Fast 1-click demo autofill for testing and express checkout
  const handleExpressFill = () => {
    setFullName('Baron Jean-Philippe de Montmirail');
    setEmail('jp.montmirail@haute-horlogerie.fr');
    setPhone('+33 6 12 34 56 78');
    setAddress('14 Place Vendôme');
    setCity('Paris');
    setPostalCode('75001');
    setCountry('France');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const orderId = `AC-${Math.floor(100000 + Math.random() * 900000)}`;
      const getPaymentLabel = () => {
        switch (paymentMethod) {
          case 'payment_plan': return `Maison 0% Flexible Payment Plan (${planTenure} Months)`;
          case 'sepa_wire': return 'SEPA Instant Escrow Wire Transfer';
          case 'credit_card': return '3D-Secure Card (Visa / Mastercard / Amex / UnionPay)';
          case 'apple_google_pay': return 'Apple Pay / Google Pay Instant Settlement';
          case 'private_invoice': return 'Private Client Invoiced Protocol';
        }
      };

      const newOrder: Order = {
        id: orderId,
        items: [...items],
        totalAmountEUR: totalEUR,
        currency,
        status: 'Pending Verification',
        createdAt: new Date().toISOString(),
        customer: {
          fullName,
          email,
          phone,
          address: shippingMethod === 'armoured' ? address : `Salon Handover: ${shippingMethod}`,
          city: shippingMethod === 'armoured' ? city : 'Paris/Geneva',
          country,
          postalCode: shippingMethod === 'armoured' ? postalCode : '00000',
        },
        paymentMethod: getPaymentLabel(),
        paymentPlan: paymentMethod === 'payment_plan' ? {
          tenureMonths: planTenure,
          monthlyAmountEUR: plan.monthlyEUR,
          dueTodayEUR: plan.dueTodayEUR,
          interestRate: 0,
        } : undefined,
        notes
      };

      setCompletedOrder(newOrder);
      setIsProcessing(false);
      onOrderComplete(newOrder);
    }, 1000);
  };

  if (completedOrder) {
    return (
      <div className="bg-[#FAF8F5] min-h-screen py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white border border-[#EBE7DE] p-8 sm:p-12 shadow-md space-y-8">
            
            {/* Confirmation Header */}
            <div className="text-center space-y-3 pb-6 border-b border-[#EBE7DE]">
              <div className="w-16 h-16 bg-[#8C6D37]/15 border border-[#8C6D37] mx-auto flex items-center justify-center text-[#8C6D37]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D37] font-semibold block">
                Acquisition Dossier Initiated
              </span>
              <h1 className="text-3xl font-serif text-[#16181A]">
                Order Confirmed — Reference #{completedOrder.id}
              </h1>
              <p className="text-xs text-neutral-600 font-light max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{completedOrder.customer.fullName}</strong>. Your acquisition order has been registered in our European vault dispatch system.
              </p>
            </div>

            {/* Order Summary Details */}
            <div className="space-y-4 text-xs">
              <div className="bg-[#FAF8F5] p-4 border border-[#EBE7DE] space-y-2">
                <div className="flex justify-between text-neutral-600">
                  <span>Order Reference:</span>
                  <span className="font-mono font-semibold text-neutral-900">{completedOrder.id}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Acquisition Value:</span>
                  <span className="font-semibold text-neutral-900">{formatPrice(completedOrder.totalAmountEUR, completedOrder.currency)}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Selected Payment Protocol:</span>
                  <span className="font-medium text-neutral-900">{completedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Delivery Custody:</span>
                  <span className="font-medium text-neutral-900">{completedOrder.customer.address}, {completedOrder.customer.country}</span>
                </div>
              </div>

              {/* Items List */}
              <div className="divide-y divide-[#EBE7DE] border border-[#EBE7DE]">
                {completedOrder.items.map((item, idx) => (
                  <div key={idx} className="p-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 border border-[#EBE7DE] overflow-hidden flex-shrink-0">
                        <WatermarkedProductImage
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                          watermarkSize="xs"
                        />
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-wider font-semibold text-[#8C6D37] block">
                          {item.product.brand}
                        </span>
                        <span className="font-serif text-xs font-medium text-neutral-900 block">
                          {item.product.name}
                        </span>
                        {item.product.watchSpecs?.reference && (
                          <span className="text-[10px] text-neutral-400 font-mono">
                            Ref: {item.product.watchSpecs.reference}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="font-semibold text-neutral-900">
                      {formatPrice(item.product.priceEUR * item.quantity, completedOrder.currency)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Payment Plan Details if chosen */}
              {paymentMethod === 'payment_plan' && completedOrder.paymentPlan && (
                <div className="bg-[#16181A] text-[#FAF8F5] p-5 border border-[#8C6D37]/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-semibold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Maison 0% Flexible Installment Protocol Confirmed
                    </span>
                    <span className="text-[9px] bg-emerald-900/80 text-emerald-200 border border-emerald-500/50 px-2 py-0.5 font-mono uppercase">
                      0% APR Guaranteed
                    </span>
                  </div>

                  <p className="text-[11px] text-neutral-300 font-light leading-relaxed">
                    Your allocation deposit of <strong>{formatPrice(completedOrder.paymentPlan.dueTodayEUR, completedOrder.currency)}</strong> is confirmed. The remaining {completedOrder.paymentPlan.tenureMonths - 1} installments of <strong>{formatPrice(completedOrder.paymentPlan.monthlyAmountEUR, completedOrder.currency)}</strong> will be automatically handled with zero finance charges.
                  </p>

                  <div className="pt-2 border-t border-[#2A2D32]">
                    <span className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-2 font-medium">
                      Vault Allocation Schedule
                    </span>
                    <div className="space-y-1 text-xs">
                      {plan.schedule.slice(0, 4).map((s) => (
                        <div key={s.installmentNumber} className="flex justify-between py-0.5 text-[11px] text-neutral-300">
                          <span>Installment #{s.installmentNumber} ({s.dueDateLabel}):</span>
                          <span className="font-mono text-[#C5A880]">{s.formattedAmount}</span>
                        </div>
                      ))}
                      {plan.schedule.length > 4 && (
                        <div className="text-[10px] text-neutral-400 italic pt-1">
                          + {plan.schedule.length - 4} additional monthly installments (Full dossier dispatched via email).
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Bank Wire Details if SEPA */}
              {paymentMethod === 'sepa_wire' && (
                <div className="bg-[#16181A] text-[#FAF8F5] p-5 border border-[#2A2D32] space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C6D37] font-semibold block">
                    SEPA European Escrow Settlement Instructions
                  </span>
                  <p className="text-[11px] text-neutral-300 font-light leading-relaxed">
                    Please transmit settlement from your EU/Swiss bank account quoting reference <strong>{completedOrder.id}</strong>. Settlement verification triggers immediate workshop dispatch.
                  </p>
                  <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] font-mono text-neutral-300">
                    <div>Beneficiary: <strong>AURELIA & CROWN LUXURY SAS</strong></div>
                    <div>IBAN: <strong>FR76 3000 4012 3456 7890 1234 567</strong></div>
                    <div>BIC / SWIFT: <strong>BNPAFRPPXXX</strong></div>
                    <div>Bank: <strong>BNP Paribas Paris Vendôme</strong></div>
                  </div>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 border-t border-[#EBE7DE]">
              <button
                onClick={onBackToCatalogue}
                className="bg-[#16181A] hover:bg-[#8C6D37] text-[#FAF8F5] px-8 py-3 text-xs uppercase tracking-widest font-semibold transition-colors"
              >
                Return to Catalogue
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Back Nav */}
        <div className="mb-8">
          <button
            onClick={onBackToCatalogue}
            className="flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-600 hover:text-[#8C6D37] transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Shopping Bag / Catalogue</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 border border-[#EBE7DE] shadow-xs space-y-6">
              
              <div className="border-b border-[#EBE7DE] pb-4">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D37] font-semibold block">
                  Encrypted European Checkout
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#16181A]">
                  Client Details & Custody Options
                </h2>
              </div>

              {/* Express 1-Click Checkout & Fast Autofill Banner */}
              <div className="p-4 bg-[#16181A] text-[#FAF8F5] border border-[#2A2D32] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#C5A880] flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    Express Fast Checkout
                  </span>
                  <span className="text-[9px] text-neutral-400">Zero-Friction Ordering</span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      handleExpressFill();
                      setPaymentMethod('apple_google_pay');
                    }}
                    className="flex-1 min-h-[40px] py-2 px-3 bg-[#FAF8F5] hover:bg-white text-[#16181A] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Apple / Google Pay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      handleExpressFill();
                      setPaymentMethod('payment_plan');
                    }}
                    className="flex-1 min-h-[40px] py-2 px-3 bg-[#8C6D37] hover:bg-[#A38042] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>0% Payment Plan</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleExpressFill}
                    className="w-full sm:w-auto min-h-[40px] py-2 px-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-[10px] uppercase tracking-wider font-mono transition-colors text-center"
                    title="Populates sample collector information in 1 click"
                  >
                    1-Click Auto-fill
                  </button>
                </div>
              </div>

              <form onSubmit={handlePlaceOrder} className="space-y-6 text-xs">
                
                {/* 1. Client Identity */}
                <div className="space-y-4">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-900">
                    1. Private Client Identification
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-neutral-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Philippe de Valois"
                        className="w-full bg-[#FAF8F5] border border-[#EBE7DE] p-2.5 text-xs text-[#16181A] focus:outline-none focus:border-[#8C6D37]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-neutral-700 mb-1">
                        Direct Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="client@domain.com"
                        className="w-full bg-[#FAF8F5] border border-[#EBE7DE] p-2.5 text-xs text-[#16181A] focus:outline-none focus:border-[#8C6D37]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-neutral-700 mb-1">
                      Direct Telephone (for Courier Verification) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+33 6 12 34 56 78"
                      className="w-full bg-[#FAF8F5] border border-[#EBE7DE] p-2.5 text-xs text-[#16181A] focus:outline-none focus:border-[#8C6D37]"
                    />
                  </div>
                </div>

                {/* 2. Delivery & Custody Options */}
                <div className="space-y-4 pt-4 border-t border-[#EBE7DE]">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-900">
                    2. Delivery & Custody Method
                  </h4>

                  <div className="grid grid-cols-1 gap-3">
                    <label 
                      onClick={() => setShippingMethod('armoured')}
                      className={`p-3.5 border flex items-start gap-3 cursor-pointer transition-all ${
                        shippingMethod === 'armoured' 
                          ? 'border-[#8C6D37] bg-[#8C6D37]/5 ring-1 ring-[#8C6D37]' 
                          : 'border-[#EBE7DE] hover:border-neutral-400'
                      }`}
                    >
                      <input
                        type="radio"
                        name="shippingMethod"
                        checked={shippingMethod === 'armoured'}
                        onChange={() => setShippingMethod('armoured')}
                        className="mt-0.5 text-[#8C6D37]"
                      />
                      <div>
                        <span className="font-semibold text-neutral-900 block">
                          Ferrari Logistics / Armoured Insured Express (Direct to Address)
                        </span>
                        <span className="text-[11px] text-neutral-500 font-light block">
                          Complimentary fully-insured European transit with tamper seals & photo ID verification.
                        </span>
                      </div>
                    </label>

                    <label 
                      onClick={() => setShippingMethod('paris-salon')}
                      className={`p-3.5 border flex items-start gap-3 cursor-pointer transition-all ${
                        shippingMethod === 'paris-salon' 
                          ? 'border-[#8C6D37] bg-[#8C6D37]/5 ring-1 ring-[#8C6D37]' 
                          : 'border-[#EBE7DE] hover:border-neutral-400'
                      }`}
                    >
                      <input
                        type="radio"
                        name="shippingMethod"
                        checked={shippingMethod === 'paris-salon'}
                        onChange={() => setShippingMethod('paris-salon')}
                        className="mt-0.5 text-[#8C6D37]"
                      />
                      <div>
                        <span className="font-semibold text-neutral-900 block">
                          Private Salon Collection — Paris (Place Vendôme)
                        </span>
                        <span className="text-[11px] text-neutral-500 font-light block">
                          Personal handover and private examination in our secure Paris viewing suite.
                        </span>
                      </div>
                    </label>

                    <label 
                      onClick={() => setShippingMethod('geneva-salon')}
                      className={`p-3.5 border flex items-start gap-3 cursor-pointer transition-all ${
                        shippingMethod === 'geneva-salon' 
                          ? 'border-[#8C6D37] bg-[#8C6D37]/5 ring-1 ring-[#8C6D37]' 
                          : 'border-[#EBE7DE] hover:border-neutral-400'
                      }`}
                    >
                      <input
                        type="radio"
                        name="shippingMethod"
                        checked={shippingMethod === 'geneva-salon'}
                        onChange={() => setShippingMethod('geneva-salon')}
                        className="mt-0.5 text-[#8C6D37]"
                      />
                      <div>
                        <span className="font-semibold text-neutral-900 block">
                          Private Salon Collection — Geneva (Rue du Rhône)
                        </span>
                        <span className="text-[11px] text-neutral-500 font-light block">
                          Personal handover with master horologist timing review in Geneva.
                        </span>
                      </div>
                    </label>
                  </div>

                  {shippingMethod === 'armoured' && (
                    <div className="space-y-4 pt-2">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-neutral-700 mb-1">
                          Destination Country *
                        </label>
                        <select
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="w-full bg-[#FAF8F5] border border-[#EBE7DE] p-2.5 text-xs text-[#16181A] focus:outline-none focus:border-[#8C6D37]"
                        >
                          <option value="France">France</option>
                          <option value="Germany">Germany</option>
                          <option value="Switzerland">Switzerland</option>
                          <option value="Italy">Italy</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Monaco">Monaco</option>
                          <option value="Belgium">Belgium</option>
                          <option value="Netherlands">Netherlands</option>
                          <option value="Austria">Austria</option>
                          <option value="Spain">Spain</option>
                          <option value="International">Other International Destination</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-neutral-700 mb-1">
                          Delivery Street Address *
                        </label>
                        <input
                          type="text"
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="e.g. 14 Avenue Montaigne"
                          className="w-full bg-[#FAF8F5] border border-[#EBE7DE] p-2.5 text-xs text-[#16181A] focus:outline-none focus:border-[#8C6D37]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-neutral-700 mb-1">
                            City *
                          </label>
                          <input
                            type="text"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="e.g. Paris"
                            className="w-full bg-[#FAF8F5] border border-[#EBE7DE] p-2.5 text-xs text-[#16181A] focus:outline-none focus:border-[#8C6D37]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-neutral-700 mb-1">
                            Postal Code *
                          </label>
                          <input
                            type="text"
                            required
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            placeholder="e.g. 75008"
                            className="w-full bg-[#FAF8F5] border border-[#EBE7DE] p-2.5 text-xs text-[#16181A] focus:outline-none focus:border-[#8C6D37]"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Payment Protocol */}
                <div className="space-y-4 pt-4 border-t border-[#EBE7DE]">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-900">
                    3. Payment & Settlement Protocol
                  </h4>

                  <div className="space-y-3">
                    {/* Maison 0% Payment Plan (Featured) */}
                    <div 
                      onClick={() => setPaymentMethod('payment_plan')}
                      className={`p-4 border transition-all cursor-pointer ${
                        paymentMethod === 'payment_plan' 
                          ? 'border-[#8C6D37] bg-[#8C6D37]/10 ring-2 ring-[#8C6D37]/60' 
                          : 'border-[#EBE7DE] bg-[#FAF8F5]/60 hover:border-neutral-400'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === 'payment_plan'}
                          onChange={() => setPaymentMethod('payment_plan')}
                          className="mt-1 text-[#8C6D37]"
                        />
                        <div className="flex-1 space-y-2">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="font-semibold text-neutral-900 flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-[#8C6D37]" />
                              Maison 0% Flexible Payment Plan
                            </span>
                            <span className="text-[9px] bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 font-bold uppercase tracking-wider">
                              0% APR • €0 Fees
                            </span>
                          </div>

                          <p className="text-[11px] text-neutral-600 font-light leading-relaxed">
                            Acquire directly from our vault today with a modest deposit. Split the remainder across equal, interest-free monthly installments.
                          </p>

                          {/* Interactive Horizon Switcher */}
                          {paymentMethod === 'payment_plan' && (
                            <div className="pt-2 space-y-2.5">
                              <label className="block text-[10px] uppercase tracking-wider font-semibold text-neutral-800">
                                Select Horizon:
                              </label>
                              <div className="grid grid-cols-4 gap-1.5">
                                {PAYMENT_PLAN_TENURES.map((t) => {
                                  const tPlan = calculatePaymentPlan(totalEUR, currency, t);
                                  return (
                                    <button
                                      key={t}
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setPlanTenure(t);
                                      }}
                                      className={`py-2 px-1 text-center border transition-all ${
                                        planTenure === t
                                          ? 'border-[#8C6D37] bg-white text-[#16181A] font-bold shadow-xs'
                                          : 'border-[#EBE7DE] bg-neutral-100/60 text-neutral-600 hover:bg-white'
                                      }`}
                                    >
                                      <span className="block text-[11px] uppercase">{t} Mo</span>
                                      <span className="block text-[10px] text-[#8C6D37] font-semibold mt-0.5">
                                        {tPlan.formattedMonthly}/mo
                                      </span>
                                    </button>
                                  );
                                })}
                              </div>

                              {/* Breakdown Box */}
                              <div className="bg-white p-3 border border-[#8C6D37]/30 text-xs space-y-1.5 mt-2">
                                <div className="flex justify-between text-neutral-700">
                                  <span>Initial Down Payment (Due Today):</span>
                                  <strong className="text-[#16181A]">{plan.formattedDueToday}</strong>
                                </div>
                                <div className="flex justify-between text-neutral-700">
                                  <span>Remaining ({planTenure - 1} monthly installments):</span>
                                  <strong className="text-[#8C6D37]">{plan.formattedMonthly} / month</strong>
                                </div>
                                <div className="flex justify-between text-[11px] text-neutral-500 border-t border-[#EBE7DE] pt-1 mt-1">
                                  <span>Finance Rate & Surcharges:</span>
                                  <span className="text-emerald-700 font-semibold">0.00% APR (€0.00)</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* SEPA Wire */}
                    <label 
                      onClick={() => setPaymentMethod('sepa_wire')}
                      className={`p-3.5 border flex items-start gap-3 cursor-pointer transition-all ${
                        paymentMethod === 'sepa_wire' 
                          ? 'border-[#8C6D37] bg-[#8C6D37]/5 ring-1 ring-[#8C6D37]' 
                          : 'border-[#EBE7DE] hover:border-neutral-400'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'sepa_wire'}
                        onChange={() => setPaymentMethod('sepa_wire')}
                        className="mt-0.5 text-[#8C6D37]"
                      />
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-neutral-900">
                              SEPA Bank Wire / European Escrow Settlement
                            </span>
                            <span className="text-[9px] bg-[#8C6D37]/15 text-[#8C6D37] px-2 py-0.5 font-bold uppercase">
                              Recommended
                            </span>
                          </div>
                        </div>
                        <span className="text-[11px] text-neutral-500 font-light block">
                          Direct European interbank settlement to BNP Paribas Escrow account. Zero card processing surcharges.
                        </span>
                      </div>
                    </label>

                    {/* Credit & Debit Cards with Badges */}
                    <label 
                      onClick={() => setPaymentMethod('credit_card')}
                      className={`p-3.5 border flex items-start gap-3 cursor-pointer transition-all ${
                        paymentMethod === 'credit_card' 
                          ? 'border-[#8C6D37] bg-[#8C6D37]/5 ring-1 ring-[#8C6D37]' 
                          : 'border-[#EBE7DE] hover:border-neutral-400'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'credit_card'}
                        onChange={() => setPaymentMethod('credit_card')}
                        className="mt-0.5 text-[#8C6D37]"
                      />
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <span className="font-semibold text-neutral-900 block">
                            3D-Secure Encrypted Card (Visa / Mastercard / Amex / UnionPay)
                          </span>
                        </div>
                        <span className="text-[11px] text-neutral-500 font-light block">
                          256-bit encrypted European luxury merchant gateway with fraud protection.
                        </span>
                        <div className="pt-1">
                          <PaymentMethodBadges variant="light" size="sm" />
                        </div>
                      </div>
                    </label>

                    {/* Digital Wallets: Apple Pay / Google Pay */}
                    <label 
                      onClick={() => setPaymentMethod('apple_google_pay')}
                      className={`p-3.5 border flex items-start gap-3 cursor-pointer transition-all ${
                        paymentMethod === 'apple_google_pay' 
                          ? 'border-[#8C6D37] bg-[#8C6D37]/5 ring-1 ring-[#8C6D37]' 
                          : 'border-[#EBE7DE] hover:border-neutral-400'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'apple_google_pay'}
                        onChange={() => setPaymentMethod('apple_google_pay')}
                        className="mt-0.5 text-[#8C6D37]"
                      />
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-neutral-900">
                            Apple Pay / Google Pay (Digital Wallet 1-Click Settlement)
                          </span>
                          <span className="text-[9px] bg-neutral-200 text-neutral-800 px-2 py-0.5 font-bold uppercase">
                            Instant
                          </span>
                        </div>
                        <span className="text-[11px] text-neutral-500 font-light block">
                          Biometric authentication with client tokenization. No card details shared with merchant.
                        </span>
                      </div>
                    </label>

                    {/* Private Client Invoice */}
                    <label 
                      onClick={() => setPaymentMethod('private_invoice')}
                      className={`p-3.5 border flex items-start gap-3 cursor-pointer transition-all ${
                        paymentMethod === 'private_invoice' 
                          ? 'border-[#8C6D37] bg-[#8C6D37]/5 ring-1 ring-[#8C6D37]' 
                          : 'border-[#EBE7DE] hover:border-neutral-400'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'private_invoice'}
                        onChange={() => setPaymentMethod('private_invoice')}
                        className="mt-0.5 text-[#8C6D37]"
                      />
                      <div className="space-y-1 flex-1">
                        <span className="font-semibold text-neutral-900 block">
                          Private Client Invoiced Protocol (Family Office / Corporate)
                        </span>
                        <span className="text-[11px] text-neutral-500 font-light block">
                          Proforma invoice issued with European VAT breakdown and VAT exemption validation where applicable.
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-700 mb-1">
                    Special Delivery Instructions or Security Notes
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Specific delivery time window, concierge contact, or appointment requirements..."
                    className="w-full bg-[#FAF8F5] border border-[#EBE7DE] p-2.5 text-xs text-[#16181A] focus:outline-none focus:border-[#8C6D37]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full min-h-[48px] bg-[#16181A] hover:bg-[#8C6D37] disabled:bg-neutral-400 text-[#FAF8F5] py-4 px-6 text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <Lock className="w-3.5 h-3.5 animate-spin" />
                      <span>INITIALIZING VAULT ALLOCATION...</span>
                    </span>
                  ) : paymentMethod === 'payment_plan' ? (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>CONFIRM & PAY FIRST INSTALLMENT ({plan.formattedDueToday})</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>CONFIRM ACQUISITION ({formatPrice(totalEUR, currency)})</span>
                    </>
                  )}
                </button>

                <div className="text-[10px] text-neutral-500 text-center font-light leading-relaxed">
                  By clicking Confirm, you initiate a binding European commercial order subject to identity verification and authentication dossier review.
                </div>
              </form>

            </div>
          </div>

          {/* Right Summary (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 border border-[#EBE7DE] shadow-xs space-y-4">
              <h3 className="text-sm font-serif tracking-wider uppercase text-[#16181A] pb-3 border-b border-[#EBE7DE]">
                Order Summary ({items.length} {items.length === 1 ? 'Piece' : 'Pieces'})
              </h3>

              <div className="divide-y divide-[#EBE7DE] max-h-80 overflow-y-auto pr-1">
                {items.map((item, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 border border-[#EBE7DE] overflow-hidden flex-shrink-0">
                        <WatermarkedProductImage
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                          watermarkSize="xs"
                        />
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-wider font-semibold text-[#8C6D37] block">
                          {item.product.brand}
                        </span>
                        <span className="font-serif font-medium text-neutral-900 block truncate max-w-[180px]">
                          {item.product.name}
                        </span>
                        {item.selectedOption && (
                          <span className="text-[10px] text-neutral-500 block">
                            Option: {item.selectedOption}
                          </span>
                        )}
                        <span className="text-[10px] text-neutral-400 block">
                          Qty: {item.quantity}
                        </span>
                      </div>
                    </div>

                    <span className="font-semibold text-neutral-900 whitespace-nowrap">
                      {formatPrice(item.product.priceEUR * item.quantity, currency)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total Calculation */}
              <div className="pt-4 border-t border-[#EBE7DE] space-y-2 text-xs">
                <div className="flex justify-between text-neutral-600 font-light">
                  <span>Subtotal</span>
                  <span className="font-semibold text-neutral-900">{formatPrice(totalEUR, currency)}</span>
                </div>
                <div className="flex justify-between text-neutral-600 font-light">
                  <span>Armoured Insured Transit</span>
                  <span className="text-emerald-800 font-medium">Complimentary (€0.00)</span>
                </div>
                <div className="flex justify-between text-neutral-600 font-light">
                  <span>Certificate & Vault Hologram Seal</span>
                  <span className="text-emerald-800 font-medium">Included</span>
                </div>

                {paymentMethod === 'payment_plan' ? (
                  <div className="pt-3 border-t border-[#8C6D37]/30 bg-[#8C6D37]/5 p-3 space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold text-[#16181A]">
                      <span>Due Today (Deposit):</span>
                      <span className="text-[#8C6D37] text-sm">{plan.formattedDueToday}</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-neutral-600">
                      <span>Monthly ({planTenure - 1} installments):</span>
                      <span className="font-medium text-neutral-900">{plan.formattedMonthly}/mo</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-emerald-800 font-medium">
                      <span>Maison 0% APR Guarantee:</span>
                      <span>Active</span>
                    </div>
                  </div>
                ) : (
                  <div className="pt-2 border-t border-[#EBE7DE] flex justify-between text-base font-semibold text-[#16181A]">
                    <span>Total Due</span>
                    <span className="text-[#8C6D37]">{formatPrice(totalEUR, currency)}</span>
                  </div>
                )}

                <p className="text-[10px] text-neutral-500 font-light pt-1">
                  {getCurrencyDisclaimer(currency)}
                </p>
              </div>
            </div>

            {/* Security Callout */}
            <div className="bg-[#FAF8F5] p-5 border border-[#EBE7DE] space-y-3 text-xs text-neutral-600">
              <div className="flex items-center gap-2 text-neutral-900 font-semibold uppercase tracking-wider text-[11px]">
                <ShieldCheck className="w-4 h-4 text-[#8C6D37]" />
                <span>The Aurelia & Crown Guarantee</span>
              </div>
              <ul className="space-y-1.5 text-[11px] font-light list-disc pl-4">
                <li>Physical authentication dossier included in presentation box</li>
                <li>14-day European return period for pre-owned authenticated items</li>
                <li>Comprehensive insurance active until signed in person</li>
              </ul>

              <div className="pt-3 border-t border-[#EBE7DE]">
                <span className="text-[10px] uppercase tracking-wider text-neutral-500 block mb-2 font-medium">
                  Accepted Settlement Protocols
                </span>
                <PaymentMethodBadges variant="light" size="sm" />
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
