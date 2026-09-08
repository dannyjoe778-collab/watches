import React, { useState } from 'react';
import { ConsultationRequest } from '../types';
import { 
  Sparkles, 
  Search, 
  Shield, 
  Lock, 
  Send, 
  CheckCircle2, 
  Globe2, 
  Compass,
  Briefcase,
  Building2
} from 'lucide-react';

interface PrivateClientServicesProps {
  onSubmitConsultation: (request: Omit<ConsultationRequest, 'id' | 'createdAt' | 'status'>) => void;
}

export const PrivateClientServices: React.FC<PrivateClientServicesProps> = ({ onSubmitConsultation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('France');
  const [interestedCategory, setInterestedCategory] = useState('Private Rare Watch Sourcing');
  const [budget, setBudget] = useState('€50,000 – €100,000');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const services = [
    {
      title: 'Private Sourcing & Rare Allocations',
      icon: Search,
      desc: 'Direct access to discontinued references, low-production Patek Philippe Grand Complications, and off-market Rolex Daytona configurations.'
    },
    {
      title: 'Fine Jewellery & Exceptional Gemstones',
      icon: Sparkles,
      desc: 'Bespoke procurement of signed high joaillerie pieces (Cartier, Graff, Van Cleef & Arpels) and unheated certified colored stones.'
    },
    {
      title: 'Estate & Collection Acquisition',
      icon: Briefcase,
      desc: 'Complete portfolio valuation, discrete single-lot or entire estate acquisitions with immediate European liquidity.'
    },
    {
      title: 'Discreet Private Sales (Consignment)',
      icon: Lock,
      desc: 'Confidential brokering to pre-qualified European and international collectors without public listing exposure.'
    },
    {
      title: 'Private Salon Consultations',
      icon: Building2,
      desc: 'Dedicated private viewing appointments at our discreet partner salons in Paris (Place Vendôme) and Geneva (Rue du Rhône).'
    },
    {
      title: 'International Customs & Armoured Transit',
      icon: Globe2,
      desc: 'White-glove cross-border logistics, ATA carnet handling, and vault-to-vault secure delivery.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitConsultation({
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

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#16181A] text-[#E5D3B3] text-[10px] uppercase tracking-[0.25em] font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#8C6D37]" />
            <span>Dedicated European Concierge</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#16181A] font-light mb-6 tracking-tight">
            PRIVATE CLIENT SERVICES
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
            Designed exclusively for private collectors, family offices, and institutions seeking rare horological acquisitions with absolute confidentiality.
          </p>
        </div>

        {/* 6 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="bg-white p-8 border border-[#EBE7DE] hover:border-[#8C6D37] transition-all duration-300 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 bg-[#FAF8F5] border border-[#EBE7DE] flex items-center justify-center mb-6">
                    <Icon className="w-5 h-5 text-[#8C6D37]" />
                  </div>
                  <h3 className="text-lg font-serif text-[#16181A] mb-2 font-normal">
                    {s.title}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed font-light">
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Form Section: "SPEAK WITH A LUXURY SPECIALIST" */}
        <div id="private-form" className="bg-[#16181A] text-[#FAF8F5] border border-[#2A2D32] p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Narrative */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C6D37] font-semibold block">
                Discretion Guaranteed
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#FAF8F5] font-light leading-tight">
                Speak With a Luxury Specialist
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                Whether you are searching for a specific historical reference or seeking to privately divest significant horological assets, our senior European curators provide bespoke guidance.
              </p>

              <div className="space-y-4 pt-4 border-t border-[#2A2D32] text-xs text-neutral-400">
                <div className="flex items-center gap-3">
                  <Lock className="w-4 h-4 text-[#8C6D37]" />
                  <span>Strict Non-Disclosure Agreements (NDA) available</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-[#8C6D37]" />
                  <span>Institutional European escrow protection</span>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-7 bg-[#1A1D20] p-6 sm:p-8 border border-[#2A2D32]">
              {isSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 bg-[#8C6D37]/20 border border-[#8C6D37] mx-auto flex items-center justify-center text-[#8C6D37]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-serif text-[#FAF8F5]">
                    Inquiry Confirmed
                  </h3>
                  <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{fullName}</strong>. A dedicated specialist will contact you discreetly within 4 business hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="bg-[#8C6D37] text-[#111315] px-6 py-2.5 text-xs uppercase tracking-widest font-semibold mt-4"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-neutral-300 font-medium mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Marc Aurel"
                        className="w-full bg-[#111315] border border-[#2A2D32] px-3.5 py-2.5 text-xs text-[#FAF8F5] focus:outline-none focus:border-[#8C6D37]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-neutral-300 font-medium mb-1">
                        Direct Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="client@domain.com"
                        className="w-full bg-[#111315] border border-[#2A2D32] px-3.5 py-2.5 text-xs text-[#FAF8F5] focus:outline-none focus:border-[#8C6D37]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-neutral-300 font-medium mb-1">
                        Phone (with International Prefix) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+33 6 00 00 00 00"
                        className="w-full bg-[#111315] border border-[#2A2D32] px-3.5 py-2.5 text-xs text-[#FAF8F5] focus:outline-none focus:border-[#8C6D37]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-neutral-300 font-medium mb-1">
                        Country *
                      </label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full bg-[#111315] border border-[#2A2D32] px-3.5 py-2.5 text-xs text-[#FAF8F5] focus:outline-none focus:border-[#8C6D37]"
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
                        <option value="International / Other">International / Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-neutral-300 font-medium mb-1">
                        Interested Category *
                      </label>
                      <select
                        value={interestedCategory}
                        onChange={(e) => setInterestedCategory(e.target.value)}
                        className="w-full bg-[#111315] border border-[#2A2D32] px-3.5 py-2.5 text-xs text-[#FAF8F5] focus:outline-none focus:border-[#8C6D37]"
                      >
                        <option value="Private Rare Watch Sourcing">Private Rare Watch Sourcing</option>
                        <option value="Fine Jewellery Sourcing">Fine Jewellery Sourcing</option>
                        <option value="Collection Acquisition">Collection Acquisition</option>
                        <option value="Estate Collection Consultation">Estate Collection Consultation</option>
                        <option value="Discreet Sales & Consignment">Discreet Sales & Consignment</option>
                        <option value="International Shipping Assistance">International Shipping Assistance</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-neutral-300 font-medium mb-1">
                        Estimated Budget *
                      </label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full bg-[#111315] border border-[#2A2D32] px-3.5 py-2.5 text-xs text-[#FAF8F5] focus:outline-none focus:border-[#8C6D37]"
                      >
                        <option value="€15,000 – €30,000">€15,000 – €30,000</option>
                        <option value="€30,000 – €60,000">€30,000 – €60,000</option>
                        <option value="€60,000 – €150,000">€60,000 – €150,000</option>
                        <option value="€150,000+ (High Horology / Portfolio)">€150,000+ (High Horology / Portfolio)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-neutral-300 font-medium mb-1">
                      Message & Target Reference Details *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Specify reference, desired condition (e.g. Unworn / Complete Set), or timeline..."
                      className="w-full bg-[#111315] border border-[#2A2D32] p-3 text-xs text-[#FAF8F5] focus:outline-none focus:border-[#8C6D37]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#8C6D37] hover:bg-[#FAF8F5] text-[#111315] py-3.5 px-6 text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2 mt-4"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>SPEAK WITH A LUXURY SPECIALIST</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
