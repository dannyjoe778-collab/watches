import React from 'react';
import { ActiveTab } from '../types';
import { ArrowRight } from 'lucide-react';
import watchMovement from '../assets/images/watch_movement_1788822054417.jpg';

interface WatchEditorialBannerProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const WatchEditorialBanner: React.FC<WatchEditorialBannerProps> = ({ setActiveTab }) => {
  return (
    <section className="relative bg-[#111315] text-[#FAF8F5] py-28 sm:py-36 lg:py-48 overflow-hidden border-b border-[#2A2D32]">
      {/* Cinematic Full-Width Movement Background */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={watchMovement}
          alt="High horology mechanical movement close-up with shallow depth of field"
          className="w-full h-full object-cover object-center opacity-35 filter contrast-125 brightness-90"
        />
        {/* Cinematic dark gradients for maximum legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#111315] via-[#111315]/80 to-[#111315]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111315] via-transparent to-[#111315]/80" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-6">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#C5A880] font-semibold block">
            THE ATELIER PERSPECTIVE
          </span>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#FAF8F5] font-light leading-[1.08] tracking-[-0.015em]">
            THE ART OF<br />
            <span className="italic text-[#C5A880]">MECHANICAL</span> TIME.
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed max-w-xl">
            Precision measured in seconds. Craftsmanship designed to endure generations.
          </p>

          <div className="pt-4">
            <button
              id="editorial-explore-horology-btn"
              onClick={() => setActiveTab('watches')}
              className="bg-[#16181A] hover:bg-[#FAF8F5] text-[#FAF8F5] hover:text-[#111315] border border-[#C5A880]/60 hover:border-[#FAF8F5] px-8 sm:px-10 py-4 text-xs font-semibold uppercase tracking-[0.24em] transition-all duration-300 flex items-center gap-3 group shadow-2xl"
            >
              <span>EXPLORE HOROLOGY</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C5A880] group-hover:text-[#111315] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
