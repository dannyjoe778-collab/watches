import React from 'react';
import { 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  Eye, 
  Cpu, 
  Sparkles, 
  FileCheck, 
  Award, 
  PackageCheck,
  AlertCircle
} from 'lucide-react';
import { ActiveTab } from '../types';

interface AuthenticationPageProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const AuthenticationPage: React.FC<AuthenticationPageProps> = ({ setActiveTab }) => {
  const steps = [
    {
      number: '01',
      title: 'Initial Physical Inspection',
      icon: Eye,
      summary: 'Aesthetic integrity, macroscopic examination, and case geometry verification.',
      details: 'Our specialists examine case lines, bevels, satin-brushing, polishing history, dial typography under high-magnification stereomicroscopes, and confirm hallmark stamps on precious metals.'
    },
    {
      number: '02',
      title: 'Reference & Registry Verification',
      icon: Search,
      summary: 'Database cross-referencing against manufacturer archives and watch theft registries.',
      details: 'Every serial number and reference code is checked against active stolen watch registries, insurance records, and historical manufacturer catalog reference parameters to verify legitimate provenance.'
    },
    {
      number: '03',
      title: 'Condition & Wear Assessment',
      icon: CheckCircle2,
      summary: 'Objective grading of physical components, crystal, bezel, and bracelet stretch.',
      details: 'Timepieces and jewellery are graded against standardized luxury criteria (Unworn/Mint, Exceptional, Very Good, Collector Vintage). Any service replacements (e.g. service hands, replacement bezel inserts) are explicitly disclosed.'
    },
    {
      number: '04',
      title: 'Horological Movement Examination',
      icon: Cpu,
      summary: 'Complete internal calibre inspection, timing analysis, and amplitude testing on Witschi timegraphers.',
      details: 'Casebacks are opened by certified watchmakers to verify authentic in-house calibres, balance wheel architecture, Geneva stripes, perlage finishing, amplitude (260°–310°), beat error (<0.3ms), and daily rate deviation within chronometer tolerances.'
    },
    {
      number: '05',
      title: 'Material & Gemstone Gemmological Assessment',
      icon: Sparkles,
      summary: 'Precious metal spectrometer testing and optical/gemmological evaluation.',
      details: 'Using XRF precious metal testing (18K yellow/rose/white gold 750‰, platinum 950‰) and gemmological refractometry, diamonds and colored gemstones are verified for authenticity, cut proportions, color grade, clarity, and treatment disclosures.'
    },
    {
      number: '06',
      title: 'Documentation & Provenance Review',
      icon: FileCheck,
      summary: 'Validation of original guarantee cards, certificates of origin, service receipts, and third-party laboratory reports.',
      details: 'Serial numbers on warranty cards, punch-papers, and GIA/SSEF/Gübelin reports are matched under UV luminescence and optical forensics to ensure all accompanying documents are original and un-tampered.'
    },
    {
      number: '07',
      title: 'Final Master Horologist Sign-Off',
      icon: Award,
      summary: 'Issuance of the AURELIA & CROWN Certificate of Authenticity and Condition Dossier.',
      details: 'The item is catalogued with a detailed condition report. The inspection findings are signed off by our master horological curator before the piece is authorized for client presentation or dispatch.'
    },
    {
      number: '08',
      title: 'Vault Packaging & Armoured Dispatch',
      icon: PackageCheck,
      summary: 'Tamper-evident sealed packaging and fully insured courier collection.',
      details: 'Each piece is placed in high-security packaging with serialised tamper-evident seals inside our Paris or Geneva vault and handed directly to authorized armoured transport couriers for insured European delivery.'
    }
  ];

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#16181A] text-[#E5D3B3] text-[10px] uppercase tracking-[0.25em] font-medium mb-4">
            <ShieldCheck className="w-4 h-4 text-[#8C6D37]" />
            <span>Independent Verification Standards</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#16181A] font-light mb-6 tracking-tight">
            AUTHENTICITY WITHOUT COMPROMISE
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
            In the world of collectible watches and fine jewellery, trust is earned through uncompromising technical discipline. Explore our comprehensive 8-step authentication and workshop inspection protocol.
          </p>
        </div>

        {/* 8-Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.number}
                className="bg-white p-6 sm:p-8 border border-[#EBE7DE] hover:border-[#8C6D37] transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-serif font-light text-[#8C6D37]">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 bg-[#FAF8F5] border border-[#EBE7DE] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#16181A]" />
                    </div>
                  </div>

                  <h3 className="text-lg font-serif text-[#16181A] mb-2 font-normal">
                    {step.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#8C6D37] uppercase tracking-wider mb-3">
                    {step.summary}
                  </p>
                  <p className="text-xs text-neutral-600 leading-relaxed font-light">
                    {step.details}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Essential Legal & Item-Specific Clarity Card */}
        <div className="bg-[#16181A] text-[#FAF8F5] p-8 sm:p-12 border border-[#2A2D32] space-y-6">
          <div className="flex items-center gap-3 text-[#8C6D37]">
            <AlertCircle className="w-5 h-5" />
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold">
              Item-Specific Transparency & Legal Disclaimers
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-neutral-300 font-light leading-relaxed">
            <div className="space-y-3">
              <h5 className="text-sm font-serif text-[#FAF8F5] font-normal">
                Individual Item Variance
              </h5>
              <p>
                Authentication details and documentation scope depend strictly on the individual physical piece. For vintage timepieces, minor service-correct modifications or vintage patina are explicitly identified in the individual condition dossier before purchase.
              </p>
            </div>

            <div className="space-y-3">
              <h5 className="text-sm font-serif text-[#FAF8F5] font-normal">
                Independent Dealer Status
              </h5>
              <p>
                AURELIA & CROWN operates as an independent specialist dealer in authenticated pre-owned luxury items. We do not claim official affiliation, sponsorship, or authorized distributor status with Rolex SA, Patek Philippe, Audemars Piguet, Cartier, Van Cleef & Arpels, Bulgari, Tiffany & Co., or any other luxury maison.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#2A2D32] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-neutral-400">
              Have specific questions regarding a reference's provenance or timing report?
            </span>
            <button
              onClick={() => setActiveTab('contact')}
              className="bg-[#8C6D37] hover:bg-[#FAF8F5] text-[#111315] px-6 py-2.5 text-xs uppercase tracking-widest font-semibold transition-colors whitespace-nowrap"
            >
              Consult Our Master Horologists
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
