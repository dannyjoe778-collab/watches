import React from 'react';
import { ActiveTab } from '../types';
import { ArrowRight, Search, Landmark, ShieldCheck } from 'lucide-react';
import architecturalTexture from '../assets/images/architectural_texture_1788822109509.jpg';

interface PrivateClientHomepageSectionProps {
  onOpenConsultation: () => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const PrivateClientHomepageSection: React.FC<PrivateClientHomepageSectionProps> = ({
  onOpenConsultation,
  setActiveTab
}) => {
  const services = [
    {
      id: 'private-sourcing',
      icon: Search,
      title: 'PRIVATE SOURCING',
      description: 'Discreet acquisition of rare, discontinued, or off-market timepieces and high jewellery through our private European collector network.'
    },
    {
      id: 'collection-acquisition',
      icon: Landmark,
      title: 'COLLECTION ACQUISITION',
      description: 'Valuation, consignment, and direct purchase of entire collections, single heirloom pieces, and significant family estates.'
    },
    {
      id: 'discreet-sales',
      icon: ShieldCheck,
      title: 'DISCREET SALES',
      description: 'Confidential private treaties conducted outside public auctions with total buyer and seller privacy guaranteed.'
    }
  ];

  return (
    <section className="relative bg-[#111315] text-[#FAF8F5] py-24 sm:py-32 lg:py-40 border-b border-[#2A2D32] overflow-hidden">
      {/* Background Architectural Luxury Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <img
          src={architecturalTexture}
          alt="Luxury European Salon interior architecture"
          className="w-full h-full object-cover object-center filter grayscale contrast-150"
        />
        <div className="absolute inset-0 bg-[#111315]/90" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#C5A880] font-semibold block">
            PRIVATE CLIENT SERVICES
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#FAF8F5] font-light tracking-[-0.015em]">
            BEYOND THE COLLECTION
          </h2>
          <p className="text-sm sm:text-base text-[#C5A880] font-serif italic">
            Private sourcing for exceptional collectors.
          </p>
          <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed max-w-2xl mx-auto pt-2">
            Our private client service provides discreet access to sought-after watches, fine jewellery and exceptional pieces that may not appear in our public collection.
          </p>
          <div className="w-12 h-[1px] bg-[#C5A880]/60 mx-auto mt-4" />
        </div>

        {/* 3 Distinct Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.id}
                className="bg-[#16181A] p-8 sm:p-10 border border-[#2A2D32] hover:border-[#C5A880]/60 transition-all duration-300 flex flex-col justify-between group shadow-xl"
              >
                <div className="space-y-6">
                  <div className="w-12 h-12 bg-[#111315] border border-[#2A2D32] group-hover:border-[#C5A880] transition-colors flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#C5A880]" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm sm:text-base uppercase tracking-[0.2em] font-medium text-[#FAF8F5] font-sans">
                      {svc.title}
                    </h3>
                    <p className="text-xs text-neutral-400 font-light leading-relaxed">
                      {svc.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#2A2D32]/80">
                  <span className="text-[10px] uppercase tracking-wider text-[#C5A880] font-light">
                    Confidential Consultation
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button & Sub-link */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-center">
          <button
            id="private-client-specialist-btn"
            onClick={onOpenConsultation}
            className="w-full sm:w-auto px-10 py-4 bg-[#C5A880] hover:bg-[#FAF8F5] text-[#111315] text-xs font-semibold uppercase tracking-[0.24em] transition-all duration-300 shadow-2xl flex items-center justify-center gap-3"
          >
            <span>SPEAK WITH A SPECIALIST</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setActiveTab('private-clients')}
            className="text-xs uppercase tracking-[0.2em] text-neutral-400 hover:text-[#FAF8F5] transition-colors pb-1 border-b border-neutral-700 hover:border-[#FAF8F5]"
          >
            DISCOVER ALL PRIVATE SERVICES →
          </button>
        </div>

      </div>
    </section>
  );
};
