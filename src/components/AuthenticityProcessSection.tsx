import React from 'react';
import { ActiveTab } from '../types';
import { ArrowRight, ShieldCheck, Microscope, FileText, PackageCheck } from 'lucide-react';

interface AuthenticityProcessSectionProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const AuthenticityProcessSection: React.FC<AuthenticityProcessSectionProps> = ({
  setActiveTab
}) => {
  const steps = [
    {
      step: '01',
      title: 'INSPECTION',
      icon: Microscope,
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=85',
      heading: 'Movement & Metal Analysis',
      description: 'Disassembly and microscopic analysis of mechanical escapements, amplitude calibration on Swiss Witschi timegraphers, and X-ray fluorescence metallurgical testing.'
    },
    {
      step: '02',
      title: 'VERIFICATION',
      icon: ShieldCheck,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=85',
      heading: 'Gemmology & Hallmarks',
      description: 'Inspection of gemstone settings, natural color grading, fluorescence tests, and European historical hallmark stamps under 40x stereomicroscopy.'
    },
    {
      step: '03',
      title: 'DOCUMENTATION',
      icon: FileText,
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=85',
      heading: 'Provenance & Archival Match',
      description: 'Cross-referencing manufacturer serial registers, guarantee papers, watch registries, and extracting official archive extracts directly from Swiss Maisons.'
    },
    {
      step: '04',
      title: 'SECURE DELIVERY',
      icon: PackageCheck,
      image: 'https://images.unsplash.com/photo-1547996160-71dfabb1a9b1?auto=format&fit=crop&w=800&q=85',
      heading: 'Tamper-Sealed Armoured Courier',
      description: 'Climate-controlled micro-vault packaging, double-serialized tamper seals, and high-value armoured courier transport with 100% full insurance coverage across Europe.'
    }
  ];

  return (
    <section className="bg-[#FAF8F5] py-24 sm:py-32 lg:py-40 border-b border-[#EBE7DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#8C6D37] font-semibold block">
            UNCOMPROMISING STANDARDS
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#16181A] font-light tracking-[-0.015em]">
            AUTHENTICITY IS EVERYTHING.
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed max-w-2xl mx-auto">
            Every timepiece and jewel in our collection passes our rigorous multi-stage verification protocol before entering our vaults.
          </p>
          <div className="w-12 h-[1px] bg-[#8C6D37]/50 mx-auto mt-4" />
        </div>

        {/* 4-Step Sequence Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="bg-white border border-[#EBE7DE] hover:border-[#8C6D37] transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl group"
              >
                {/* Photo Inset */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#F5F2EB]">
                  <img
                    src={step.image}
                    alt={step.heading}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-95"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-[#111315]/90 text-[#FAF8F5] text-[10px] font-mono font-medium px-2.5 py-1 tracking-widest border border-[#2A2D32]">
                    PHASE {step.step}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col justify-between flex-grow space-y-3">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-4 h-4 text-[#8C6D37]" />
                      <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#8C6D37]">
                        {step.title}
                      </span>
                    </div>
                    <h3 className="text-base font-serif text-[#16181A] font-medium leading-snug mb-2">
                      {step.heading}
                    </h3>
                    <p className="text-xs text-neutral-600 font-light leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#FAF8F5] flex items-center gap-1 text-[11px] text-[#8C6D37] font-medium uppercase tracking-wider">
                    <span>Verified Protocol</span>
                    <span>✓</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <button
            id="authenticity-process-btn"
            onClick={() => setActiveTab('authentication')}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#16181A] hover:bg-[#8C6D37] text-[#FAF8F5] text-xs uppercase tracking-[0.22em] font-semibold transition-all duration-300 shadow-md group"
          >
            <span>OUR AUTHENTICATION PROCESS</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
