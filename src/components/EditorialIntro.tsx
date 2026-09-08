import React from 'react';
import { ActiveTab } from '../types';
import { ArrowRight } from 'lucide-react';

interface EditorialIntroProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const EditorialIntro: React.FC<EditorialIntroProps> = ({ setActiveTab }) => {
  return (
    <section className="bg-[#FAF8F5] py-24 sm:py-32 lg:py-40 border-b border-[#EBE7DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Large Architectural Statement */}
          <div className="lg:col-span-7">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.28em] text-[#8C6D37] font-semibold block mb-4">
              EDITORIAL PROSPECTUS
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#16181A] font-light leading-[1.08] tracking-[-0.015em]">
              NOT SIMPLY OWNED.<br />
              <span className="italic text-[#8C6D37]">CAREFULLY</span> COLLECTED.
            </h2>
          </div>

          {/* Right Column: Statement, Context & Philosophy CTA */}
          <div className="lg:col-span-5 space-y-6 lg:pt-4">
            <p className="text-base sm:text-lg text-neutral-700 font-light leading-relaxed">
              AURELIA & CROWN brings together exceptional watches and fine jewellery selected for craftsmanship, rarity and enduring desirability.
            </p>
            
            <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed">
              Rooted in the timeless horological traditions of Geneva and the historic joaillerie salons of Paris, we curate certified pre-owned treasures for collectors across Europe and the globe.
            </p>

            <div className="pt-2">
              <button
                id="intro-our-philosophy-btn"
                onClick={() => setActiveTab('about')}
                className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] font-semibold text-[#16181A] hover:text-[#8C6D37] transition-colors pb-1 border-b border-[#16181A] hover:border-[#8C6D37] group"
              >
                <span>OUR PHILOSOPHY</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
