import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Lock, Send, CheckCircle2, Building2, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';
import { ConsultationRequest } from '../types';

interface ContactPageProps {
  onSubmitConsultation: (request: Omit<ConsultationRequest, 'id' | 'createdAt' | 'status'>) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onSubmitConsultation }) => {
  const [inquiryType, setInquiryType] = useState<'appointment' | 'inquiry' | 'consignment'>('appointment');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [salon, setSalon] = useState('Paris (Place Vendôme)');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [referenceCode, setReferenceCode] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedRef = `AC-${Math.floor(100000 + Math.random() * 900000)}`;
    setReferenceCode(generatedRef);
    
    onSubmitConsultation({
      fullName,
      email,
      phone,
      country: salon.includes('Paris') 
        ? 'France' 
        : salon.includes('Geneva') 
        ? 'Switzerland' 
        : salon.includes('London')
        ? 'United Kingdom'
        : salon.includes('Munich')
        ? 'Germany'
        : 'Italy',
      interestedCategory: `${inquiryType === 'appointment' ? 'Private Salon Appointment' : inquiryType === 'consignment' ? 'Consignment & Valuation' : 'Collector Inquiry'} (${salon})`,
      message: `[Ref: ${generatedRef}] Type: ${inquiryType}. Date/Time: ${date || 'Flexible'}. Notes: ${message}`,
    });
    setIsSubmitted(true);
  };

  const salons = [
    {
      city: 'Paris',
      country: 'France',
      address: 'Place Vendôme, 75001 Paris',
      note: 'By private appointment only',
      phone: '+33 (0)1 42 68 00 24',
      hours: 'Mon – Sat, 10:00 – 19:00 CET',
    },
    {
      city: 'Geneva',
      country: 'Switzerland',
      address: 'Rue du Rhône, 1204 Genève',
      note: 'Horology Vault & Atelier',
      phone: '+41 (0)22 819 40 10',
      hours: 'Mon – Fri, 09:30 – 18:30 CET',
    },
    {
      city: 'London',
      country: 'United Kingdom',
      address: 'Old Bond Street, Mayfair, London W1S',
      note: 'By private appointment only',
      phone: '+44 (0)20 7499 1840',
      hours: 'Mon – Sat, 10:00 – 18:30 GMT',
    },
    {
      city: 'Munich',
      country: 'Germany',
      address: 'Maximilianstraße, 80539 München',
      note: 'Central European Desk',
      phone: '+49 (0)89 2102 990',
      hours: 'Mon – Fri, 10:00 – 19:00 CET',
    },
    {
      city: 'Milan',
      country: 'Italy',
      address: 'Via Montenapoleone, 20121 Milano',
      note: 'High Jewellery Salon',
      phone: '+39 02 7600 3410',
      hours: 'Mon – Sat, 10:00 – 19:30 CET',
    },
  ];

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-12 sm:py-20 text-[#16181A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#16181A] text-[#FAF8F5] text-[10px] uppercase tracking-[0.25em] font-medium">
            <Building2 className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Private Salons & Advisory Concierge</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#16181A] font-light tracking-[-0.015em]">
            CONTACT & SALONS
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 font-light max-w-xl mx-auto leading-relaxed">
            Our Senior Advisory team is at your disposal across Europe for discreet private viewings, collection appraisals, authentication dossiers, or bespoke off-market acquisitions.
          </p>
          <div className="w-12 h-[1px] bg-[#8C6D37]/40 mx-auto mt-4" />
        </div>

        {/* 5 European Salons Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between pb-4 border-b border-[#EBE7DE] mb-6">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C6D37]">
              European Physical Salons & Vaults
            </span>
            <span className="text-[11px] text-neutral-500 font-light">
              5 Key European Hubs
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {salons.map((s) => (
              <div key={s.city} className="bg-white p-5 border border-[#EBE7DE] flex flex-col justify-between space-y-4 hover:border-[#8C6D37]/50 transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C6D37] font-semibold">
                      {s.country}
                    </span>
                    <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                  </div>
                  <h3 className="text-lg font-serif text-[#16181A] mb-1">{s.city} Salon</h3>
                  <p className="text-xs text-neutral-600 font-light leading-relaxed">
                    {s.address}
                  </p>
                  <p className="text-[11px] text-neutral-400 italic mt-1">{s.note}</p>
                </div>
                
                <div className="pt-3 border-t border-[#EBE7DE] text-[11px] space-y-1">
                  <div className="font-mono text-neutral-800">{s.phone}</div>
                  <div className="text-neutral-500 text-[10px]">{s.hours}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Booking & Inquiry Form */}
        <div className="bg-white border border-[#EBE7DE] p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase tracking-[0.2em] text-[#8C6D37] font-semibold block">
                Direct Communication
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#16181A] font-normal leading-tight">
                Private Advisory & Viewing Requests
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                Experience exceptional timepieces and high jewellery in an intimate, secure environment. A dedicated curator will prepare your requested references in advance.
              </p>

              {/* Direct Channels */}
              <div className="space-y-4 pt-4 border-t border-[#EBE7DE] text-xs text-neutral-700">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#8C6D37] mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="block text-[#16181A]">Client Concierge Email</strong>
                    <span className="text-neutral-500 font-light">concierge@aureliacrown.com</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#8C6D37] mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="block text-[#16181A]">Advisory Hours</strong>
                    <span className="text-neutral-500 font-light">Monday – Saturday: 09:30 – 19:30 CET</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Lock className="w-4 h-4 text-[#8C6D37] mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="block text-[#16181A]">Encrypted Client Communications</strong>
                    <span className="text-neutral-500 font-light">All inquiries processed under strict non-disclosure protocol.</span>
                  </div>
                </div>
              </div>

              {/* Emergency / Fast Callback note */}
              <div className="bg-[#FAF8F5] p-4 border border-[#EBE7DE] text-xs space-y-1">
                <div className="font-semibold text-[#16181A] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#8C6D37]" />
                  <span>Immediate Collector Hotline</span>
                </div>
                <p className="text-neutral-500 font-light text-[11px]">
                  For active acquisitions or urgent vault consultations: <strong className="text-neutral-800 font-mono">+33 (0)1 42 68 00 24</strong>
                </p>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-7">
              {isSubmitted ? (
                <div className="bg-[#FAF8F5] p-10 border border-[#EBE7DE] text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-[#8C6D37] mx-auto" />
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D37] font-semibold block">
                    Request Logged • Ref #{referenceCode}
                  </span>
                  <h3 className="text-2xl font-serif text-[#16181A]">
                    Inquiry Confirmed
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto leading-relaxed font-light">
                    Thank you, {fullName}. Our European luxury desk has received your request. A senior advisor will contact you within 2 business hours via {email}.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setMessage('');
                        setDate('');
                      }}
                      className="bg-[#16181A] text-[#FAF8F5] hover:bg-[#8C6D37] px-8 py-3 text-xs uppercase tracking-widest transition-colors font-medium"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  {/* Type Selector Tabs */}
                  <div className="flex border-b border-[#EBE7DE] mb-6 text-xs uppercase tracking-wider font-medium">
                    <button
                      type="button"
                      onClick={() => setInquiryType('appointment')}
                      className={`pb-3 px-3 transition-colors ${
                        inquiryType === 'appointment'
                          ? 'text-[#8C6D37] border-b-2 border-[#8C6D37] font-semibold'
                          : 'text-neutral-500 hover:text-[#16181A]'
                      }`}
                    >
                      Salon Appointment
                    </button>
                    <button
                      type="button"
                      onClick={() => setInquiryType('inquiry')}
                      className={`pb-3 px-3 transition-colors ${
                        inquiryType === 'inquiry'
                          ? 'text-[#8C6D37] border-b-2 border-[#8C6D37] font-semibold'
                          : 'text-neutral-500 hover:text-[#16181A]'
                      }`}
                    >
                      Piece Inquiry
                    </button>
                    <button
                      type="button"
                      onClick={() => setInquiryType('consignment')}
                      className={`pb-3 px-3 transition-colors ${
                        inquiryType === 'consignment'
                          ? 'text-[#8C6D37] border-b-2 border-[#8C6D37] font-semibold'
                          : 'text-neutral-500 hover:text-[#16181A]'
                      }`}
                    >
                      Consignment & Valuation
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-neutral-700 font-medium mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Lord Alexander V."
                          className="w-full bg-[#FAF8F5] border border-[#EBE7DE] p-3 text-xs text-[#16181A] focus:outline-none focus:border-[#8C6D37]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-neutral-700 font-medium mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="client@private.com"
                          className="w-full bg-[#FAF8F5] border border-[#EBE7DE] p-3 text-xs text-[#16181A] focus:outline-none focus:border-[#8C6D37]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-neutral-700 font-medium mb-1">
                          Phone Number (with country code) *
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+33 6 12 34 56 78"
                          className="w-full bg-[#FAF8F5] border border-[#EBE7DE] p-3 text-xs text-[#16181A] focus:outline-none focus:border-[#8C6D37]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-neutral-700 font-medium mb-1">
                          Preferred Salon Location *
                        </label>
                        <select
                          value={salon}
                          onChange={(e) => setSalon(e.target.value)}
                          className="w-full bg-[#FAF8F5] border border-[#EBE7DE] p-3 text-xs text-[#16181A] focus:outline-none focus:border-[#8C6D37]"
                        >
                          <option value="Paris (Place Vendôme)">Paris (Place Vendôme)</option>
                          <option value="Geneva (Rue du Rhône)">Geneva (Rue du Rhône)</option>
                          <option value="London (Mayfair Old Bond St)">London (Mayfair Old Bond St)</option>
                          <option value="Munich (Maximilianstraße)">Munich (Maximilianstraße)</option>
                          <option value="Milan (Via Montenapoleone)">Milan (Via Montenapoleone)</option>
                          <option value="Virtual Video Consultation">Virtual Video Consultation</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-neutral-700 font-medium mb-1">
                        Preferred Date / Time Window
                      </label>
                      <input
                        type="text"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        placeholder="e.g. Next Tuesday at 15:00 CET or flexible morning"
                        className="w-full bg-[#FAF8F5] border border-[#EBE7DE] p-3 text-xs text-[#16181A] focus:outline-none focus:border-[#8C6D37]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-neutral-700 font-medium mb-1">
                        Specific References, Requirements, or Collection Details
                      </label>
                      <textarea
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Detail the watch reference or jewellery piece, trade-in interest, or specific provenance questions..."
                        className="w-full bg-[#FAF8F5] border border-[#EBE7DE] p-3 text-xs text-[#16181A] focus:outline-none focus:border-[#8C6D37]"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full bg-[#16181A] hover:bg-[#8C6D37] text-[#FAF8F5] py-4 px-6 text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>TRANSMIT DISCREET INQUIRY</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
