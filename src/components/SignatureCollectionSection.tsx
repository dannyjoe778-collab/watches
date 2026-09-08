import React from 'react';
import { ActiveTab } from '../types';
import { ArrowRight, Sparkles, Gem, Clock } from 'lucide-react';
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
      description: 'Historical Patek Philippe perpetual calendars, vintage Rolex Daytonas, and limited Audemars Piguet Royal Oaks from private estates.',
      image: rareWatches,
      icon: Clock,
      action: () => setActiveTab('watches')
    },
    {
      id: 'high-jewellery',
      title: 'HIGH JEWELLERY',
      subtitle: 'Haute Joaillerie & Signed Historical Pieces',
      description: 'One-of-a-kind creations from Cartier Paris, Van Cleef & Arpels, and Bulgari High Jewellery workshops.',
      image: highJewellery,
      icon: Sparkles,
      action: () => setActiveTab('jewellery')
    },
    {
      id: 'exceptional-gemstones',
      title: 'EXCEPTIONAL GEMSTONES',
      subtitle: 'Certified Unheated Sapphires & Colombian Emeralds',
      description: 'Museum-grade natural stones accompanied by SSEF, Gübelin, and GIA laboratory certification dossiers.',
      image: exceptionalGemstones,
      icon: Gem,
      action: () => setActiveTab('collections', { collectionId: 'rare-exceptional' })
    }
  ];

  return (
    <section className="bg-[#111315] text-[#FAF8F5] py-24 sm:py-32 lg:py-40 border-b border-[#2A2D32]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#C5A880] font-semibold block">
            PRIVATE ARCHIVES & RARITIES
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#FAF8F5] font-light tracking-[-0.015em]">
            THE SIGNATURE COLLECTION
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
            For collectors who seek the exceptional.
          </p>
          <div className="w-12 h-[1px] bg-[#C5A880]/60 mx-auto mt-4" />
        </div>

        {/* 3 Dramatic Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={item.action}
                className="group relative bg-[#16181A] border border-[#2A2D32] hover:border-[#C5A880]/60 transition-all duration-700 overflow-hidden cursor-pointer flex flex-col justify-between min-h-[520px] shadow-2xl"
              >
                {/* Background Image with Dark Vignette */}
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 opacity-40 group-hover:opacity-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111315] via-[#111315]/80 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#111315]/60 via-transparent to-[#111315]" />
                </div>

                {/* Top Badge */}
                <div className="relative p-6 sm:p-8 z-10 flex items-center justify-between">
                  <div className="w-10 h-10 border border-[#C5A880]/30 bg-[#111315]/80 backdrop-blur-sm flex items-center justify-center">
                    <Icon className="w-4 h-4 text-[#C5A880]" />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-medium">
                    Curated
                  </span>
                </div>

                {/* Bottom Content Area */}
                <div className="relative p-6 sm:p-8 z-10 space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] block font-light">
                      {item.subtitle}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif text-[#FAF8F5] font-normal tracking-wide group-hover:text-[#C5A880] transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs text-neutral-300 font-light leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-3 border-t border-[#2A2D32] flex items-center justify-between text-xs text-[#FAF8F5] font-medium uppercase tracking-[0.2em] group-hover:text-[#C5A880] transition-colors">
                    <span>DISCOVER CATEGORY</span>
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
