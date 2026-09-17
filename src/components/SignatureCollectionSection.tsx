import React from 'react';
import { ActiveTab } from '../types';
import { ArrowRight, Sparkles, Gem, Clock, ShieldCheck } from 'lucide-react';
import rareWatches from '../assets/images/rare_watches_1788822067999.jpg';
import highJewellery from '../assets/images/high_jewellery_1788822080972.jpg';
import exceptionalGemstones from '../assets/images/exceptional_gemstones_1788822094366.jpg';

interface SignatureCollectionSectionProps {
  setActiveTab: (tab: ActiveTab, opt?: { collectionId?: string; brand?: string; category?: string }) => void;
}

export const SignatureCollectionSection: React.FC<SignatureCollectionSectionProps> = ({
  setActiveTab
}) => {
  const pillars = [
    {
      id: 'rare-watches',
      title: 'RARE WATCHES',
      subtitle: 'Grand Complications & Discontinued References',
      badge: 'HAUTE HORLOGERIE',
      provenance: 'Geneva Vault Checked',
      description: 'Historical Patek Philippe perpetual calendars, vintage Rolex Daytonas, and limited Audemars Piguet Royal Oaks from private European estates.',
      image: rareWatches,
      icon: Clock,
      action: () => setActiveTab('watches')
    },
    {
      id: 'high-jewellery',
      title: 'HIGH JEWELLERY',
      subtitle: 'Haute Joaillerie & Signed Historical Pieces',
      badge: 'HAUTE JOAILLERIE',
      provenance: 'Place Vendôme Signed',
      description: 'One-of-a-kind diamond and precious stone creations from Cartier Paris, Van Cleef & Arpels, and Bulgari High Jewellery workshops.',
      image: highJewellery,
      icon: Sparkles,
      action: () => setActiveTab('jewellery')
    },
    {
      id: 'exceptional-gemstones',
      title: 'EXCEPTIONAL GEMSTONES',
      subtitle: 'Certified Unheated Sapphires & Colombian Emeralds',
      badge: 'NATURAL GEMSTONES',
      provenance: 'SSEF / Gübelin / GIA Certified',
      description: 'Museum-grade unheated natural stones with comprehensive Swiss and international gemmological dossiers and origin authentication.',
      image: exceptionalGemstones,
      icon: Gem,
      action: () => setActiveTab('collections', { collectionId: 'rare-exceptional' })
    }
  ];

  return (
    <section className="bg-[#111315] text-[#FAF8F5] py-16 sm:py-24 lg:py-28 border-b border-[#2A2D32]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#C5A880] font-semibold block">
            PRIVATE ARCHIVES & RARITIES
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#FAF8F5] font-light tracking-[-0.015em]">
            THE SIGNATURE COLLECTION
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed max-w-xl mx-auto">
            Singular masterpieces curated for collectors who seek historical importance and verified provenance.
          </p>
          <div className="w-12 h-[1px] bg-[#C5A880]/60 mx-auto mt-3" />
        </div>

        {/* 3 Prominent High-Visibility Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={item.action}
                className="group bg-[#16181A] border border-[#2A2D32] hover:border-[#C5A880] transition-all duration-500 overflow-hidden cursor-pointer flex flex-col justify-between shadow-2xl"
              >
                {/* 100% VISIBLE Dedicated Image Showcase */}
                <div className="relative aspect-[16/11] overflow-hidden bg-[#0D0F11]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center filter brightness-105 contrast-105 saturate-105 group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  
                  {/* Subtle lower gradient only behind badges for contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111315]/80 via-transparent to-[#111315]/40 pointer-events-none" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-[#111315]/90 backdrop-blur-md px-2.5 py-1 border border-[#C5A880]/50 text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold shadow-lg">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.badge}</span>
                  </div>

                  {/* Top Right Provenance */}
                  <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-[#111315]/90 backdrop-blur-md px-2 py-1 border border-[#2A2D32] text-[9px] uppercase tracking-wider text-neutral-300 font-medium shadow-md">
                    <ShieldCheck className="w-3 h-3 text-[#C5A880]" />
                    <span>{item.provenance}</span>
                  </div>
                </div>

                {/* Content Area Directly Below the Image */}
                <div className="p-6 sm:p-7 space-y-3.5 flex-1 flex flex-col justify-between bg-[#16181A]">
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] block font-light">
                      {item.subtitle}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif text-[#FAF8F5] font-normal tracking-wide group-hover:text-[#C5A880] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-300 font-light leading-relaxed pt-1">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#2A2D32] flex items-center justify-between text-xs text-[#FAF8F5] font-medium uppercase tracking-[0.2em] group-hover:text-[#C5A880] transition-colors">
                    <span>EXPLORE PIECES</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

