import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { Shield, ArrowRight, CheckCircle2, Instagram, Facebook, Lock } from 'lucide-react';
import siteIcon from '../assets/images/site_icon.jpg';
import { PaymentMethodBadges } from './PaymentMethodBadges';

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
    <footer className="bg-[#111315] text-[#FAF8F5] pt-8 sm:pt-10 pb-6 sm:pb-8 border-t border-[#2A2D32]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact Top Bar: Brand & Quick Dispatch */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#2A2D32]">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-[#C5A880]/60 bg-[#16181A] flex-shrink-0 shadow-md">
              <img src={siteIcon} alt="Aurelia & Crown Crest" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-serif tracking-[0.18em] uppercase text-[#FAF8F5] block leading-none">
                AURELIA & CROWN
              </span>
              <p className="text-[#8C6D37] text-[10px] tracking-[0.24em] uppercase font-medium mt-1">
                Exceptional Time. Timeless Luxury.
              </p>
            </div>
          </div>

          {/* Sleek inline dispatch signup */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {subscribed ? (
              <div className="flex items-center gap-2 text-xs text-[#C5A880] bg-[#C5A880]/10 px-3 py-2 border border-[#C5A880]/30">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Subscribed to Private Dispatch</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center w-full sm:w-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Join Private Dispatch (email)"
                  className="bg-[#16181A] border border-[#2A2D32] px-3.5 py-2 text-xs text-[#FAF8F5] placeholder-neutral-500 focus:outline-none focus:border-[#C5A880] transition-colors w-full sm:w-64"
                />
                <button
                  type="submit"
                  className="bg-[#C5A880] text-[#111315] hover:bg-[#FAF8F5] px-4 py-2 text-[11px] uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-1.5 flex-shrink-0"
                >
                  <span>Join</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </form>
            )}

            <div className="flex items-center gap-2 text-neutral-400 pl-1">
              <a href="#instagram" onClick={(e) => e.preventDefault()} aria-label="Instagram" className="hover:text-[#C5A880] transition-colors p-1.5 border border-[#2A2D32] hover:border-[#C5A880]">
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a href="#facebook" onClick={(e) => e.preventDefault()} aria-label="Facebook" className="hover:text-[#C5A880] transition-colors p-1.5 border border-[#2A2D32] hover:border-[#C5A880]">
                <Facebook className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Compact 4 Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 py-6 border-b border-[#2A2D32] text-xs">
          {/* Column 1: Navigation */}
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#8C6D37] font-semibold mb-2.5">
              Navigation
            </h3>
            <ul className="space-y-1.5 text-neutral-400 text-[11px]">
              <li><button onClick={() => setActiveTab('home')} className="hover:text-[#FAF8F5] transition-colors">Home</button></li>
              <li><button onClick={() => setActiveTab('shop')} className="hover:text-[#FAF8F5] transition-colors text-neutral-300 font-medium">Shop All Inventory</button></li>
              <li><button onClick={() => setActiveTab('watches')} className="hover:text-[#FAF8F5] transition-colors">Watches Catalogue</button></li>
              <li><button onClick={() => setActiveTab('jewellery')} className="hover:text-[#FAF8F5] transition-colors">Fine Jewellery</button></li>
              <li><button onClick={() => setActiveTab('new-arrivals')} className="hover:text-[#FAF8F5] transition-colors">New Arrivals</button></li>
              <li><button onClick={() => setActiveTab('collections')} className="hover:text-[#FAF8F5] transition-colors">Curated Collections</button></li>
            </ul>
          </div>

          {/* Column 2: Maisons */}
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#8C6D37] font-semibold mb-2.5">
              Maisons
            </h3>
            <ul className="space-y-1.5 text-neutral-400 text-[11px]">
              <li><button onClick={() => { if (onSelectCollection) onSelectCollection('rolex'); setActiveTab('collections'); }} className="hover:text-[#FAF8F5] transition-colors">Rolex</button></li>
              <li><button onClick={() => { if (onSelectCollection) onSelectCollection('patek-philippe'); setActiveTab('collections'); }} className="hover:text-[#FAF8F5] transition-colors">Patek Philippe</button></li>
              <li><button onClick={() => { if (onSelectCollection) onSelectCollection('audemars-piguet'); setActiveTab('collections'); }} className="hover:text-[#FAF8F5] transition-colors">Audemars Piguet</button></li>
              <li><button onClick={() => { if (onSelectCollection) onSelectCollection('cartier'); setActiveTab('collections'); }} className="hover:text-[#FAF8F5] transition-colors">Cartier</button></li>
              <li><button onClick={() => { if (onSelectCollection) onSelectCollection('van-cleef-arpels'); setActiveTab('collections'); }} className="hover:text-[#FAF8F5] transition-colors">Van Cleef & Arpels</button></li>
              <li><button onClick={() => { if (onSelectCollection) onSelectCollection('bulgari'); setActiveTab('collections'); }} className="hover:text-[#FAF8F5] transition-colors">Bulgari</button></li>
            </ul>
          </div>

          {/* Column 3: Protection & Service */}
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#8C6D37] font-semibold mb-2.5">
              Client Protection
            </h3>
            <ul className="space-y-1.5 text-neutral-400 text-[11px]">
              <li><button onClick={() => setActiveTab('authentication')} className="hover:text-[#FAF8F5] transition-colors">8-Point Verification Guarantee</button></li>
              <li><button onClick={() => setActiveTab('shipping')} className="hover:text-[#FAF8F5] transition-colors">Insured Armoured Shipping</button></li>
              <li><button onClick={() => setActiveTab('order-tracking')} className="hover:text-[#FAF8F5] transition-colors">Consignment Tracking</button></li>
              <li><button onClick={() => setActiveTab('private-clients')} className="hover:text-[#FAF8F5] transition-colors">Private Client Services</button></li>
              <li><button onClick={() => setActiveTab('terms')} className="hover:text-[#FAF8F5] transition-colors">Terms of Sale</button></li>
              <li><button onClick={() => setActiveTab('privacy')} className="hover:text-[#FAF8F5] transition-colors">Privacy Policy (GDPR)</button></li>
            </ul>
          </div>

          {/* Column 4: European Salons */}
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#8C6D37] font-semibold mb-2.5">
              European Salons
            </h3>
            <div className="space-y-1 text-neutral-400 text-[11px] leading-relaxed">
              <p><strong className="text-neutral-200">Paris:</strong> Place Vendôme</p>
              <p><strong className="text-neutral-200">Geneva:</strong> Rue du Rhône</p>
              <p><strong className="text-neutral-200">London:</strong> Mayfair</p>
              <p><strong className="text-neutral-200">Munich:</strong> Maximilianstraße</p>
              <p className="text-[#C5A880] pt-1 text-[10px]">concierge@aureliaandcrown.com</p>
            </div>
          </div>
        </div>

        {/* Payment Methods Row */}
        <div className="py-4 border-b border-[#2A2D32] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <Lock className="w-3.5 h-3.5 text-[#C5A880]" />
            <span className="text-[11px] uppercase tracking-wider text-neutral-300 font-medium">
              Accepted Settlement Methods:
            </span>
          </div>
          <PaymentMethodBadges variant="dark" size="sm" />
        </div>

        {/* Streamlined Legal Disclaimer & Bottom Copyright Row */}
        <div className="pt-4 text-[10px] sm:text-[11px] text-neutral-500 leading-normal space-y-2">
          <p>
            <strong className="text-neutral-400">Independent Specialist:</strong> AURELIA & CROWN (aureliaandcrown.com) is an independent European specialist dealer in authenticated pre-owned luxury timepieces and fine jewellery. We are not an authorized agent, distributor, or affiliate of Rolex SA, Patek Philippe, Audemars Piguet, Cartier, Van Cleef & Arpels, or other respective trademark holders. All brand names are descriptive.
          </p>

          <div className="flex flex-col sm:flex-row justify-between items-center pt-2 text-neutral-400 gap-2">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px]">
              <span>© {new Date().getFullYear()} AURELIA & CROWN. All Rights Reserved.</span>
              <span className="hidden sm:inline text-neutral-700">|</span>
              <button onClick={() => setActiveTab('home')} className="hover:text-[#C5A880] transition-colors">Home</button>
              <span className="text-neutral-700">•</span>
              <button onClick={() => setActiveTab('terms')} className="hover:text-[#C5A880] transition-colors">Terms</button>
              <span className="text-neutral-700">•</span>
              <button onClick={() => setActiveTab('privacy')} className="hover:text-[#C5A880] transition-colors">Privacy</button>
              <span className="text-neutral-700">•</span>
              <button onClick={() => setActiveTab('contact')} className="hover:text-[#C5A880] transition-colors">Contact</button>
            </div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-neutral-500 font-mono">
              <span>EUR</span>
              <span>•</span>
              <span>CHF</span>
              <span>•</span>
              <span>GBP</span>
              <span>•</span>
              <span>USD</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

