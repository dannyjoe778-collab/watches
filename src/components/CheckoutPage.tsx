import React, { useState } from 'react';
import { CartItem, CurrencyCode, Order } from '../types';
import { formatPrice, getCurrencyDisclaimer } from '../utils/currency';
import { WatermarkedProductImage } from './WatermarkedProductImage';
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
  Sparkles
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
  const [paymentMethod, setPaymentMethod] = useState<'sepa_wire' | 'credit_card' | 'private_invoice'>('sepa_wire');
  const [notes, setNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const totalEUR = items.reduce((acc, i) => acc + i.product.priceEUR * i.quantity, 0);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const orderId = `AC-${Math.floor(100000 + Math.random() * 900000)}`;
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
        paymentMethod: paymentMethod === 'sepa_wire' 
          ? 'SEPA Escrow Wire Transfer' 
          : paymentMethod === 'credit_card' 
          ? 'Encrypted Luxury Card Processing' 
          : 'Private Client Invoiced Protocol',
        notes
      };

      setCompletedOrder(newOrder);
      setIsProcessing(false);
      onOrderComplete(newOrder);
    }, 1200);
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
                    <label 
                      onClick={() => setPaymentMethod('sepa_wire')}
                      className={`p-3.5 border flex items-start gap-3 cursor-pointer transition-all ${
                        paymentMethod === 'sepa_wire' 
                          ? 'border-[#8C6D37] bg-[#8C6D37]/5 ring-1 ring-[#8C6D37]' 
                          : 'border-[#EBE7DE]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'sepa_wire'}
                        onChange={() => setPaymentMethod('sepa_wire')}
                        className="mt-0.5 text-[#8C6D37]"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-neutral-900">
                            SEPA Bank Wire / European Escrow Settlement
                          </span>
                          <span className="text-[9px] bg-[#8C6D37]/15 text-[#8C6D37] px-2 py-0.5 font-bold uppercase">
                            Recommended
                          </span>
                        </div>
                        <span className="text-[11px] text-neutral-500 font-light block mt-0.5">
                          Direct European interbank settlement to BNP Paribas Escrow account. Zero card processing surcharges.
                        </span>
                      </div>
                    </label>

                    <label 
                      onClick={() => setPaymentMethod('credit_card')}
                      className={`p-3.5 border flex items-start gap-3 cursor-pointer transition-all ${
                        paymentMethod === 'credit_card' 
                          ? 'border-[#8C6D37] bg-[#8C6D37]/5 ring-1 ring-[#8C6D37]' 
                          : 'border-[#EBE7DE]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'credit_card'}
                        onChange={() => setPaymentMethod('credit_card')}
                        className="mt-0.5 text-[#8C6D37]"
                      />
                      <div>
                        <span className="font-semibold text-neutral-900 block">
                          3D-Secure Encrypted Card (Visa / Mastercard / Amex)
                        </span>
                        <span className="text-[11px] text-neutral-500 font-light block mt-0.5">
                          256-bit encrypted European luxury merchant gateway with fraud protection.
                        </span>
                      </div>
                    </label>

                    <label 
                      onClick={() => setPaymentMethod('private_invoice')}
                      className={`p-3.5 border flex items-start gap-3 cursor-pointer transition-all ${
                        paymentMethod === 'private_invoice' 
                          ? 'border-[#8C6D37] bg-[#8C6D37]/5 ring-1 ring-[#8C6D37]' 
                          : 'border-[#EBE7DE]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'private_invoice'}
                        onChange={() => setPaymentMethod('private_invoice')}
                        className="mt-0.5 text-[#8C6D37]"
                      />
                      <div>
                        <span className="font-semibold text-neutral-900 block">
                          Private Client Invoiced Protocol (Family Office / Corporate)
                        </span>
                        <span className="text-[11px] text-neutral-500 font-light block mt-0.5">
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
                  className="w-full bg-[#16181A] hover:bg-[#8C6D37] disabled:bg-neutral-400 text-[#FAF8F5] py-4 px-6 text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <span>INITIALIZING VAULT ALLOCATION...</span>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>CONFIRM ACQUISITION ({formatPrice(totalEUR, currency)})</span>
                    </>
                  )}
                </button>

                <div className="text-[10px] text-neutral-500 text-center font-light leading-relaxed">
                  By clicking Confirm Acquisition, you initiate a binding European commercial order subject to identity verification and authentication dossier review.
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
                <div className="pt-2 border-t border-[#EBE7DE] flex justify-between text-base font-semibold text-[#16181A]">
                  <span>Total Due</span>
                  <span className="text-[#8C6D37]">{formatPrice(totalEUR, currency)}</span>
                </div>
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
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
