import React from 'react';
import { ShieldCheck, Award, Eye, Lock, Globe, Sparkles } from 'lucide-react';
import { ActiveTab } from '../types';
import aboutUsImage from '../assets/images/about_us_atelier_1788823534846.jpg';

interface AboutUsPageProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ setActiveTab }) => {
  const values = [
    {
      title: 'Authenticity First',
      icon: ShieldCheck,
      description: 'We do not rely on assumptions or third-party claims. Every physical piece is inspected by our certified European horologists and gemmologists with internal movement analysis and spectrometer testing.'
    },
    {
      title: 'Genuine Rarity',
      icon: Sparkles,
      description: 'Our focus is on collectible, discontinued, and low-allocation pieces that represent significant milestones in high horology and signed joaillerie.'
    },
    {
      title: 'Documented Provenance',
      icon: Eye,
      description: 'We prioritize original boxes, warranty punch-papers, and independent gemmological reports, presenting complete dossiers to our clients transparently.'
    },
    {
      title: 'Absolute Discretion',
      icon: Lock,
      description: 'Operating with European banking-grade confidentiality, we protect our clients’ privacy throughout consultations, transactions, and private consignments.'
    }
  ];

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#16181A] text-[#E5D3B3] text-[10px] uppercase tracking-[0.25em] font-medium mb-4">
            <Globe className="w-3.5 h-3.5 text-[#8C6D37]" />
            <span>The Maison Story</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#16181A] font-light mb-6 tracking-tight">
            AURELIA & CROWN
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
            Founded with a singular European vision: to bring institutional transparency, rigorous technical verification, and private client discretion to the secondary market for fine watches and high jewellery.
          </p>
        </div>

        {/* Editorial Story Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 relative aspect-[4/3] bg-[#16181A] border border-[#EBE7DE] overflow-hidden">
            <img
              src={aboutUsImage}
              alt="Horological atelier inspection"
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111315]/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white text-xs">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C6D37] block font-semibold">
                Workshop Excellence
              </span>
              <p className="text-neutral-200 font-light mt-1">
                Micromechanical precision and gemmological evaluation in Paris & Geneva.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6 text-neutral-700 text-xs sm:text-sm font-light leading-relaxed">
            <h2 className="text-2xl sm:text-3xl font-serif text-[#16181A] font-normal leading-snug">
              A Modern Specialist Built on Traditional European Standards
            </h2>
            <p>
              In an era crowded with generic online marketplaces, <strong>AURELIA & CROWN</strong> was created as a curated European destination for collectors who demand certitude. We operate not as an anonymous aggregate platform, but as specialized private curators with hands-on technical responsibility for every item presented.
            </p>
            <p>
              From our consultation desks in Paris and partner networks across Geneva, Milan, London, and Munich, we source directly from vetted private collections, estate liquidations, and long-standing European collector relationships.
            </p>
            <div className="pt-2">
              <div className="p-4 bg-white border border-[#EBE7DE] text-xs text-neutral-800 italic">
                "Our philosophy is simple: complete technical transparency, zero simulated claims, and absolute protection for both buyer and seller."
              </div>
            </div>
          </div>
        </div>

        {/* Core Brand Values */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl sm:text-3xl font-serif text-[#16181A]">
              Our Operating Principles
            </h3>
            <p className="text-xs text-neutral-600 font-light mt-2">
              The four commitments that guide every horological evaluation and private client interaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={i} className="bg-white p-6 border border-[#EBE7DE] flex flex-col justify-between shadow-xs">
                  <div>
                    <div className="w-10 h-10 bg-[#FAF8F5] border border-[#EBE7DE] flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-[#8C6D37]" />
                    </div>
                    <h4 className="text-base font-serif text-[#16181A] mb-2 font-medium">
                      {v.title}
                    </h4>
                    <p className="text-xs text-neutral-600 font-light leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#16181A] text-[#FAF8F5] p-8 sm:p-12 text-center max-w-3xl mx-auto border border-[#2A2D32]">
          <h3 className="text-2xl sm:text-3xl font-serif text-[#FAF8F5] mb-3 font-light">
            Experience Aurelia & Crown
          </h3>
          <p className="text-xs text-neutral-400 max-w-lg mx-auto mb-6 font-light leading-relaxed">
            Browse our authenticated timepiece and jewellery catalogues, or request a confidential consultation with one of our European luxury specialists.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setActiveTab('watches')}
              className="bg-[#8C6D37] hover:bg-[#FAF8F5] text-[#111315] px-6 py-2.5 text-xs uppercase tracking-widest font-semibold transition-colors"
            >
              Explore Watches
            </button>
            <button
              onClick={() => setActiveTab('jewellery')}
              className="border border-[#FAF8F5] hover:bg-[#FAF8F5] hover:text-[#111315] text-[#FAF8F5] px-6 py-2.5 text-xs uppercase tracking-widest font-semibold transition-colors"
            >
              Explore Fine Jewellery
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
