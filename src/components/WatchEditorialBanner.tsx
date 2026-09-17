import React from 'react';
import { ActiveTab } from '../types';
import { ArrowRight, CheckCircle2, Award, Clock } from 'lucide-react';
import watchMovement from '../assets/images/watch_movement_1788822054417.jpg';

interface WatchEditorialBannerProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const WatchEditorialBanner: React.FC<WatchEditorialBannerProps> = ({ setActiveTab }) => {
  return (
    <section className="relative bg-[#111315] text-[#FAF8F5] py-16 sm:py-24 lg:py-28 overflow-hidden border-b border-[#2A2D32]">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C5A880]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#C5A880]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Typography & Atelier Credentials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-[#16181A] border border-[#C5A880]/40 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
              <Clock className="w-3.5 h-3.5" />
              <span>THE ATELIER PERSPECTIVE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-[#FAF8F5] font-light leading-[1.06] tracking-[-0.015em]">
              THE ART OF<br />
              <span className="italic text-[#C5A880] font-normal">MECHANICAL</span> TIME.
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              Precision measured in fractions of a second. Craftsmanship sculpted to endure across centuries. Every balance wheel, column wheel, and hand-bevelled bridge in our vault has been physically inspected by European master horologists.
            </p>

            {/* Atelier Horological Specs */}
            <div className="grid grid-cols-3 gap-3 pt-2 border-t border-[#2A2D32]">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[#C5A880] block font-mono">
                  28,800 VPH
                </span>
                <span className="text-[11px] text-neutral-400 font-light block leading-tight">
                  High-beat escapement rate
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[#C5A880] block font-mono">
                  ANGLAGE
                </span>
                <span className="text-[11px] text-neutral-400 font-light block leading-tight">
                  Hand-polished bevels & stripes
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[#C5A880] block font-mono">
                  ±2 SEC/DAY
                </span>
                <span className="text-[11px] text-neutral-400 font-light block leading-tight">
                  Witschi timing verification
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                id="editorial-explore-horology-btn"
                onClick={() => setActiveTab('watches')}
                className="bg-[#C5A880] hover:bg-[#FAF8F5] text-[#111315] border border-[#C5A880] hover:border-[#FAF8F5] px-7 sm:px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] transition-all duration-300 flex items-center gap-2.5 group shadow-xl"
              >
                <span>EXPLORE HOROLOGY</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: High-Clarity Featured Movement Showcase (Crystal Clear Image) */}
          <div className="lg:col-span-7">
            <div className="relative p-2.5 sm:p-3.5 bg-[#16181A] border border-[#C5A880]/40 shadow-2xl group overflow-hidden">
              
              {/* Main Image Frame - 100% Opacity, Vibrant, Crystal Clear */}
              <div className="relative aspect-[16/10] sm:aspect-[16/10] overflow-hidden bg-[#0D0F11]">
                <img
                  src={watchMovement}
                  alt="High horology mechanical movement close-up showing balance wheel, rubies, and Côtes de Genève"
                  className="w-full h-full object-cover object-center filter brightness-105 contrast-110 saturate-105 transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />

                {/* Top Hallmark Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-[#111315]/90 backdrop-blur-md px-2.5 py-1 border border-[#C5A880]/50 text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold shadow-lg">
                  <Award className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>HAUTE HORLOGERIE CALIBRE</span>
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-[#111315]/90 backdrop-blur-md px-2.5 py-1 border border-[#2A2D32] text-[10px] uppercase tracking-wider text-neutral-300 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>8-POINT BENCH TESTED</span>
                </div>

                {/* Bottom Spec Strip */}
                <div className="absolute bottom-3 left-3 right-3 bg-[#111315]/92 backdrop-blur-md px-3.5 py-2.5 border border-[#C5A880]/30 flex items-center justify-between">
                  <div className="text-[11px] text-neutral-300 font-light">
                    <strong className="text-[#FAF8F5] font-medium font-serif">Calibre Finishing:</strong> Côtes de Genève, Perlage, Mirror-Polished Screw Heads & Synthetic Ruby Jewels
                  </div>
                  <span className="hidden sm:inline-block text-[9px] uppercase tracking-widest text-[#C5A880] font-mono border-l border-[#2A2D32] pl-3">
                    GENEVA VAULT
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

