import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { Shield, ArrowRight, CheckCircle2, Instagram, Facebook } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  onSelectCollection?: (collectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onSelectCollection }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#111315] text-[#FAF8F5] pt-16 pb-12 border-t border-[#2A2D32]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter & Brand Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b border-[#2A2D32]">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-2xl sm:text-3xl font-serif tracking-[0.2em] uppercase text-[#FAF8F5] block">
              AURELIA & CROWN
            </span>
            <p className="text-[#8C6D37] text-xs tracking-[0.25em] uppercase font-medium">
              Exceptional Time. Timeless Luxury.
            </p>
            <p className="text-neutral-400 text-sm max-w-md leading-relaxed font-light pt-2">
              An independent European specialist in authenticated pre-owned luxury timepieces and fine jewellery. Curated with rigorous provenance verification for discerning collectors across France, Germany, Italy, Switzerland, the UK, and international markets.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="bg-[#1A1D20] p-6 sm:p-8 border border-[#2A2D32]">
              <span className="text-xs uppercase tracking-[0.25em] text-[#8C6D37] font-semibold block mb-2">
                JOIN THE PRIVATE LIST
              </span>
              <h3 className="text-lg sm:text-xl font-serif text-[#FAF8F5] mb-2 font-normal">
                Curated Acquisitions & Private Allocations
              </h3>
              <p className="text-xs text-neutral-400 mb-5 leading-relaxed font-light">
                Receive new arrivals, rare acquisitions and private collection announcements before public release.
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2.5 text-xs text-[#8C6D37] bg-[#8C6D37]/10 p-3 border border-[#8C6D37]/30">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>You have been registered with the AURELIA & CROWN Private Dispatch.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 bg-[#111315] border border-[#2A2D32] px-4 py-3 text-xs text-[#FAF8F5] placeholder-neutral-500 focus:outline-none focus:border-[#8C6D37] transition-colors"
                  />
                  <button
                    type="submit"
                    className="bg-[#8C6D37] text-[#111315] hover:bg-[#FAF8F5] px-6 py-3 text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* 4 Main Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-[#2A2D32] text-xs">
          {/* Column 1: Navigation */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#8C6D37] font-semibold mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-neutral-400">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-[#FAF8F5] transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('shop')} className="hover:text-[#FAF8F5] transition-colors font-medium text-neutral-300">
                  Shop All Inventory
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('watches')} className="hover:text-[#FAF8F5] transition-colors">
                  Watches Catalogue
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('jewellery')} className="hover:text-[#FAF8F5] transition-colors">
                  Fine Jewellery
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('new-arrivals')} className="hover:text-[#FAF8F5] transition-colors">
                  New Arrivals
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('collections')} className="hover:text-[#FAF8F5] transition-colors">
                  Curated Collections
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('authentication')} className="hover:text-[#FAF8F5] transition-colors">
                  8-Point Authentication
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('private-clients')} className="hover:text-[#FAF8F5] transition-colors">
                  Private Client Services
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-[#FAF8F5] transition-colors">
                  About Aurelia & Crown
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('contact')} className="hover:text-[#FAF8F5] transition-colors">
                  Contact Concierge
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Maisons */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#8C6D37] font-semibold mb-4">
              Maisons & Collections
            </h3>
            <ul className="space-y-2.5 text-neutral-400">
              <li>
                <button 
                  onClick={() => {
                    if (onSelectCollection) onSelectCollection('rolex');
                    setActiveTab('collections');
                  }} 
                  className="hover:text-[#FAF8F5] transition-colors"
                >
                  Rolex Collection
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    if (onSelectCollection) onSelectCollection('patek-philippe');
                    setActiveTab('collections');
                  }} 
                  className="hover:text-[#FAF8F5] transition-colors"
                >
                  Patek Philippe
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    if (onSelectCollection) onSelectCollection('audemars-piguet');
                    setActiveTab('collections');
                  }} 
                  className="hover:text-[#FAF8F5] transition-colors"
                >
                  Audemars Piguet
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    if (onSelectCollection) onSelectCollection('cartier');
                    setActiveTab('collections');
                  }} 
                  className="hover:text-[#FAF8F5] transition-colors"
                >
                  Cartier Timepieces & Joaillerie
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    if (onSelectCollection) onSelectCollection('van-cleef-arpels');
                    setActiveTab('collections');
                  }} 
                  className="hover:text-[#FAF8F5] transition-colors"
                >
                  Van Cleef & Arpels
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    if (onSelectCollection) onSelectCollection('bulgari');
                    setActiveTab('collections');
                  }} 
                  className="hover:text-[#FAF8F5] transition-colors"
                >
                  Bulgari Serpenti
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    if (onSelectCollection) onSelectCollection('rare-exceptional');
                    setActiveTab('collections');
                  }} 
                  className="hover:text-[#FAF8F5] transition-colors"
                >
                  Rare & Exceptional
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Service & Security */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#8C6D37] font-semibold mb-4">
              Client Protection
            </h3>
            <ul className="space-y-2.5 text-neutral-400">
              <li>
                <button onClick={() => setActiveTab('shipping')} className="hover:text-[#FAF8F5] transition-colors">
                  Insured Armoured Shipping
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('order-tracking')} className="hover:text-[#FAF8F5] transition-colors">
                  Live Consignment Tracking
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('authentication')} className="hover:text-[#FAF8F5] transition-colors">
                  Workshop Inspection Guarantee
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('contact')} className="hover:text-[#FAF8F5] transition-colors">
                  Private Salon Appointments
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('terms')} className="hover:text-[#FAF8F5] transition-colors">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('privacy')} className="hover:text-[#FAF8F5] transition-colors">
                  Privacy Policy & GDPR
                </button>
              </li>
              <li>
                <span className="text-neutral-500">Escrow & Segregated Custody</span>
              </li>
              <li>
                <span className="text-neutral-500">14-Day Inspection Period</span>
              </li>
            </ul>
          </div>

          {/* Column 4: European Hubs & Social */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#8C6D37] font-semibold mb-4">
              European Salons
            </h3>
            <div className="space-y-2 text-neutral-400 text-[11px] leading-relaxed mb-6">
              <p><strong className="text-neutral-200">Paris Salon:</strong> By Appointment — Place Vendôme district</p>
              <p><strong className="text-neutral-200">Geneva Vault:</strong> By Appointment — Rue du Rhône</p>
              <p><strong className="text-neutral-200">Munich Hub:</strong> By Appointment — Maximilianstraße</p>
              <p className="text-neutral-500 pt-1">Direct inquiries: concierge@aureliacrown.com</p>
            </div>

            <div className="pt-2">
              <h4 className="text-[11px] uppercase tracking-wider text-[#8C6D37] mb-2 font-medium">
                Connect With Us
              </h4>
              <div className="flex items-center gap-3 text-neutral-400">
                <a href="#instagram" onClick={(e) => e.preventDefault()} className="hover:text-[#8C6D37] transition-colors p-1.5 border border-[#2A2D32] hover:border-[#8C6D37]">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#facebook" onClick={(e) => e.preventDefault()} className="hover:text-[#8C6D37] transition-colors p-1.5 border border-[#2A2D32] hover:border-[#8C6D37]">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#pinterest" onClick={(e) => e.preventDefault()} className="hover:text-[#8C6D37] transition-colors p-1.5 border border-[#2A2D32] hover:border-[#8C6D37] text-xs font-serif italic px-2">
                  P
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Brand Transparency Disclaimers */}
        <div className="pt-8 text-[11px] text-neutral-500 leading-relaxed space-y-3">
          <p>
            <strong className="text-neutral-400">Independent Dealer Disclaimer:</strong> AURELIA & CROWN is an independent European specialist dealer of certified pre-owned luxury timepieces and fine jewellery. We are not an authorized distributor, partner, or official representative of Rolex SA, Patek Philippe SA, Audemars Piguet, Cartier International SNC, Van Cleef & Arpels, Bulgari S.p.A., Tiffany & Co., or any other respective trademark owners. All brand trademarks, logos, and reference designations belong exclusively to their respective registered proprietors and are utilized strictly for descriptive and identification purposes.
          </p>
          <p>
            Every physical timepiece and jewellery item in our collection is independently verified by our master horologists and gemmologists according to our 8-point authentication protocol. Where original boxes, papers, or third-party laboratory certificates (e.g. GIA, SSEF, Gübelin) are present, full unredacted provenance dossiers are supplied with the item.
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-[#2A2D32] text-neutral-500 gap-3">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px]">
              <span>© {new Date().getFullYear()} AURELIA & CROWN. European Luxury Registry.</span>
              <span className="hidden sm:inline text-neutral-700">|</span>
              <button onClick={() => setActiveTab('home')} className="hover:text-[#C5A880] transition-colors">Home</button>
              <span className="text-neutral-700">•</span>
              <button onClick={() => setActiveTab('terms')} className="hover:text-[#C5A880] transition-colors">Terms & Conditions</button>
              <span className="text-neutral-700">•</span>
              <button onClick={() => setActiveTab('privacy')} className="hover:text-[#C5A880] transition-colors">Privacy Policy</button>
              <span className="text-neutral-700">•</span>
              <button onClick={() => setActiveTab('contact')} className="hover:text-[#C5A880] transition-colors">Contact Us</button>
            </div>
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-wider text-neutral-500">
              <span>France</span>
              <span>•</span>
              <span>Germany</span>
              <span>•</span>
              <span>Switzerland</span>
              <span>•</span>
              <span>Italy</span>
              <span>•</span>
              <span>Benelux</span>
              <span>•</span>
              <span>United Kingdom</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
