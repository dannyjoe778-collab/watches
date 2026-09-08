import React, { useState } from 'react';
import { Product, ConsultationRequest, CurrencyCode } from '../types';
import { formatPrice } from '../utils/currency';
import { X, ShieldCheck, CheckCircle2, Lock, Send, Sparkles } from 'lucide-react';
import { WatermarkedProductImage } from './WatermarkedProductImage';

interface ConsultationModalProps {
  product: Product | null;
  currency: CurrencyCode;
  isOpen: boolean;
  onClose: () => void;
  onSubmitConsultation: (request: Omit<ConsultationRequest, 'id' | 'createdAt' | 'status'>) => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  product,
  currency,
  isOpen,
  onClose,
  onSubmitConsultation
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('France');
  const [interestedCategory, setInterestedCategory] = useState(
    product ? (product.type === 'watch' ? 'Luxury Horology' : 'Fine Jewellery') : 'Private Watch Sourcing'
  );
  const [budget, setBudget] = useState('€20,000 – €50,000');
  const [message, setMessage] = useState(
    product 
      ? `I would like to request private allocation details, condition dossier, and appointment availability for the ${product.brand} ${product.name} (Ref: ${product.watchSpecs?.reference || 'N/A'}).`
      : ''
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitConsultation({
      productId: product?.id,
      productName: product ? `${product.brand} ${product.name}` : undefined,
      fullName,
      email,
      phone,
      country,
      interestedCategory,
      budget,
      message,
    });
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-[#111315]/80 backdrop-blur-sm transition-opacity" 
        onClick={handleResetAndClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden bg-[#FAF8F5] text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl border border-[#EBE7DE]">
          
          {/* Header */}
          <div className="bg-[#16181A] text-[#FAF8F5] p-6 border-b border-[#2A2D32] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FAF8F5]/10 border border-[#8C6D37]/40 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#8C6D37]" />
              </div>
              <div>
                <h3 className="text-lg font-serif tracking-wider uppercase text-[#FAF8F5]">
                  Private Client Concierge
                </h3>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#8C6D37]">
                  Discreet Advisory & Acquisition Consultation
                </p>
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="text-neutral-400 hover:text-[#FAF8F5] p-1.5 transition-colors"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8">
            {isSubmitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-[#8C6D37]/15 border border-[#8C6D37] mx-auto flex items-center justify-center text-[#8C6D37]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-serif text-[#16181A]">
                  Consultation Request Received
                </h4>
                <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed font-light">
                  Thank you, <strong>{fullName}</strong>. A senior European luxury specialist has been assigned to your inquiry. We will contact you confidentially within 4 business hours via encrypted communication.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleResetAndClose}
                    className="bg-[#16181A] hover:bg-[#8C6D37] text-[#FAF8F5] px-8 py-3 text-xs uppercase tracking-widest font-semibold transition-colors"
                  >
                    Return to Catalogue
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Highlighted Piece context */}
                {product && (
                  <div className="bg-[#EBE7DE]/60 p-4 border border-[#EBE7DE] flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 border border-neutral-300 overflow-hidden flex-shrink-0">
                        <WatermarkedProductImage
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          watermarkSize="xs"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#8C6D37] block font-semibold">
                          Inquiry Subject Piece
                        </span>
                        <span className="text-sm font-serif font-medium text-[#16181A] block">
                          {product.brand} {product.name}
                        </span>
                        {product.watchSpecs?.reference && (
                          <span className="text-[11px] text-neutral-500 font-mono">
                            Ref: {product.watchSpecs.reference}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-semibold text-[#16181A] block">
                        {formatPrice(product.priceEUR, currency)}
                      </span>
                      <span className="text-[9px] uppercase tracking-wider text-neutral-500">
                        Indicative Price
                      </span>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-neutral-700 font-medium mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Laurent de Montmirail"
                      className="w-full bg-white border border-[#EBE7DE] px-3.5 py-2.5 text-xs text-[#16181A] focus:outline-none focus:border-[#8C6D37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-neutral-700 font-medium mb-1">
                      Confidential Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. client@domain.com"
                      className="w-full bg-white border border-[#EBE7DE] px-3.5 py-2.5 text-xs text-[#16181A] focus:outline-none focus:border-[#8C6D37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-neutral-700 font-medium mb-1">
                      Direct Telephone (with Country Code) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+33 6 12 34 56 78"
                      className="w-full bg-white border border-[#EBE7DE] px-3.5 py-2.5 text-xs text-[#16181A] focus:outline-none focus:border-[#8C6D37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-neutral-700 font-medium mb-1">
                      Country of Residence *
                    </label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full bg-white border border-[#EBE7DE] px-3.5 py-2.5 text-xs text-[#16181A] focus:outline-none focus:border-[#8C6D37]"
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
                      <option value="United States">United States</option>
                      <option value="Other International">Other International</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-neutral-700 font-medium mb-1">
                      Interested Category
                    </label>
                    <select
                      value={interestedCategory}
                      onChange={(e) => setInterestedCategory(e.target.value)}
                      className="w-full bg-white border border-[#EBE7DE] px-3.5 py-2.5 text-xs text-[#16181A] focus:outline-none focus:border-[#8C6D37]"
                    >
                      <option value="Specific Timepiece Inquiry">Specific Timepiece Inquiry</option>
                      <option value="Fine Jewellery Acquisition">Fine Jewellery Acquisition</option>
                      <option value="Private Rare Watch Sourcing">Private Rare Watch Sourcing</option>
                      <option value="High Jewellery & Gemstone Sourcing">High Jewellery & Gemstone Sourcing</option>
                      <option value="Estate / Collection Liquidation">Estate / Collection Liquidation</option>
                      <option value="Private Salon Viewing">Private Salon Viewing (Paris/Geneva)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-neutral-700 font-medium mb-1">
                      Target Acquisition Budget
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full bg-white border border-[#EBE7DE] px-3.5 py-2.5 text-xs text-[#16181A] focus:outline-none focus:border-[#8C6D37]"
                    >
                      <option value="€10,000 – €25,000">€10,000 – €25,000</option>
                      <option value="€25,000 – €50,000">€25,000 – €50,000</option>
                      <option value="€50,000 – €100,000">€50,000 – €100,000</option>
                      <option value="€100,000 – €250,000+">€100,000 – €250,000+</option>
                      <option value="Institutional / Collector Portfolio">Institutional / Collector Portfolio</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-700 font-medium mb-1">
                    Confidential Message or Specific Inquiries *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-white border border-[#EBE7DE] p-3 text-xs text-[#16181A] focus:outline-none focus:border-[#8C6D37]"
                    placeholder="Provide any specific requirements, timing, or private viewing preferences..."
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#EBE7DE]">
                  <div className="flex items-center gap-2 text-[11px] text-neutral-500">
                    <Lock className="w-3.5 h-3.5 text-[#8C6D37]" />
                    <span>Protected by European Banking-Grade Discretion & GDPR</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-[#16181A] hover:bg-[#8C6D37] text-[#FAF8F5] px-8 py-3 text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>SUBMIT CONFIDENTIAL REQUEST</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
