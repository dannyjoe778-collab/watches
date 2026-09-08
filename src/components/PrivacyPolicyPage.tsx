import React, { useState } from 'react';
import { ShieldCheck, Lock, Eye, Database, Globe, UserCheck, ChevronRight, FileCheck, Key } from 'lucide-react';
import { ActiveTab } from '../types';

interface PrivacyPolicyPageProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ setActiveTab }) => {
  const [activeSection, setActiveSection] = useState('data-controller');

  const sections = [
    { id: 'data-controller', title: '1. Data Controller & European Scope' },
    { id: 'data-collection', title: '2. Information We Collect' },
    { id: 'legal-basis', title: '3. Legal Basis for Processing (GDPR)' },
    { id: 'client-confidentiality', title: '4. Collector Privacy & Discretion' },
    { id: 'payment-security', title: '5. Financial Data & Escrow Encryption' },
    { id: 'data-sharing', title: '6. Third-Party Disclosures & Couriers' },
    { id: 'retention', title: '7. Data Retention & Archival Registers' },
    { id: 'user-rights', title: '8. Your Rights Under GDPR' },
    { id: 'cookies', title: '9. Cookie Policy & Preferences' },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-12 sm:py-20 text-[#16181A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumb & Tag */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#16181A] text-[#FAF8F5] text-[10px] uppercase tracking-[0.25em] font-medium">
            <Lock className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>GDPR & Privacy Protocol</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#16181A] font-light tracking-[-0.015em]">
            PRIVACY POLICY
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 font-light max-w-xl mx-auto leading-relaxed">
            Last Updated: Autumn 2026. How AURELIA & CROWN protects, processes, and respects the private data of our global clientele in strict compliance with the General Data Protection Regulation (EU) 2016/679.
          </p>
          <div className="w-12 h-[1px] bg-[#8C6D37]/40 mx-auto mt-4" />
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Index */}
          <div className="lg:col-span-4 sticky top-28 bg-white border border-[#EBE7DE] p-6 shadow-sm">
            <div className="flex items-center gap-2 pb-4 border-b border-[#EBE7DE] mb-4 text-[#8C6D37]">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#16181A]">
                Privacy Sections
              </span>
            </div>

            <nav className="space-y-1.5">
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={`w-full text-left px-3 py-2 text-xs transition-colors flex items-center justify-between ${
                    activeSection === sec.id
                      ? 'bg-[#16181A] text-[#FAF8F5] font-medium'
                      : 'text-neutral-600 hover:bg-[#FAF8F5] hover:text-[#16181A]'
                  }`}
                >
                  <span className="truncate">{sec.title}</span>
                  <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 ${activeSection === sec.id ? 'text-[#C5A880]' : 'text-neutral-300'}`} />
                </button>
              ))}
            </nav>

            <div className="mt-8 pt-6 border-t border-[#EBE7DE] space-y-3">
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 block font-light">
                Data Protection Officer
              </span>
              <p className="text-[11px] text-neutral-500 font-light">
                Direct inquiry: <span className="font-mono text-neutral-800">dpo@aureliacrown.com</span>
              </p>
              <button
                onClick={() => setActiveTab('contact')}
                className="w-full py-2.5 bg-[#FAF8F5] hover:bg-[#16181A] text-[#16181A] hover:text-[#FAF8F5] border border-[#EBE7DE] text-[10px] uppercase tracking-[0.2em] font-semibold transition-colors"
              >
                Inquire With Privacy Officer
              </button>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-8 bg-white border border-[#EBE7DE] p-8 sm:p-12 shadow-sm space-y-12 leading-relaxed">
            
            {/* Section 1 */}
            <section id="data-controller" className="space-y-4 scroll-mt-28">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D37] font-semibold">
                Section 01
              </span>
              <h2 className="text-2xl font-serif text-[#16181A] font-normal">
                1. Data Controller & European Scope
              </h2>
              <div className="text-sm text-neutral-600 font-light space-y-3">
                <p>
                  <strong>AURELIA & CROWN European Advisory S.A.S.</strong>, with offices at Place Vendôme, Paris, France and Rue du Rhône, Geneva, Switzerland, operates as the Data Controller under Regulation (EU) 2016/679 (GDPR) and the Swiss Federal Act on Data Protection (FADP).
                </p>
                <p>
                  We are committed to maintaining the highest level of confidentiality and discretion expected by high-net-worth collectors, private family offices, and connoisseurs.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section id="data-collection" className="space-y-4 pt-8 border-t border-[#EBE7DE] scroll-mt-28">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D37] font-semibold">
                Section 02
              </span>
              <h2 className="text-2xl font-serif text-[#16181A] font-normal flex items-center gap-2">
                <Database className="w-5 h-5 text-[#8C6D37]" />
                2. Information We Collect
              </h2>
              <div className="text-sm text-neutral-600 font-light space-y-3">
                <p>
                  We only collect data strictly necessary to facilitate verified acquisitions, authentication provenance files, and secure logistics:
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs text-neutral-700">
                  <li><strong>Identification Data:</strong> Full legal name, billing and physical delivery address, email, telephone number.</li>
                  <li><strong>KYC & AML Verification Data:</strong> For high-value transactions exceeding statutory European thresholds (€10,000), government photo ID and proof of funds as required by EU Anti-Money Laundering Directives (AMLD5/AMLD6).</li>
                  <li><strong>Private Sourcing Requests:</strong> Timepiece or jewel preferences, budget boundaries, and private salon booking preferences.</li>
                  <li><strong>Technical Transaction Records:</strong> Encrypted order tokens, delivery status logs, and serial registration records.</li>
                </ul>
              </div>
            </section>

            {/* Section 3 */}
            <section id="legal-basis" className="space-y-4 pt-8 border-t border-[#EBE7DE] scroll-mt-28">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D37] font-semibold">
                Section 03
              </span>
              <h2 className="text-2xl font-serif text-[#16181A] font-normal">
                3. Legal Basis for Processing
              </h2>
              <div className="text-sm text-neutral-600 font-light space-y-3">
                <p>
                  We process personal data based on Article 6(1) of the GDPR under the following legal bases:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-[#FAF8F5] border border-[#EBE7DE]">
                    <span className="font-semibold text-[#16181A] block">Contract Performance</span>
                    <span className="text-neutral-500 font-light">Processing purchases, arranging secure courier transit, issuing invoices and authenticity guarantee certificates.</span>
                  </div>
                  <div className="p-3.5 bg-[#FAF8F5] border border-[#EBE7DE]">
                    <span className="font-semibold text-[#16181A] block">Legal Compliance</span>
                    <span className="text-neutral-500 font-light">Fulfilling European tax records, customs declarations, and anti-money laundering registries.</span>
                  </div>
                  <div className="p-3.5 bg-[#FAF8F5] border border-[#EBE7DE]">
                    <span className="font-semibold text-[#16181A] block">Legitimate Interests</span>
                    <span className="text-neutral-500 font-light">Preventing payment fraud, maintaining registry anti-theft serial checks, and salon security.</span>
                  </div>
                  <div className="p-3.5 bg-[#FAF8F5] border border-[#EBE7DE]">
                    <span className="font-semibold text-[#16181A] block">Explicit Consent</span>
                    <span className="text-neutral-500 font-light">Subscription to The Private List newsletter and bespoke allocation notifications.</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section id="client-confidentiality" className="space-y-4 pt-8 border-t border-[#EBE7DE] scroll-mt-28">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D37] font-semibold">
                Section 04
              </span>
              <h2 className="text-2xl font-serif text-[#16181A] font-normal flex items-center gap-2">
                <Key className="w-5 h-5 text-[#8C6D37]" />
                4. Collector Privacy & Total Discretion
              </h2>
              <div className="text-sm text-neutral-600 font-light space-y-3">
                <p>
                  We never monetize, rent, trade, or publicly display collector identity or purchase histories. When displaying catalogued pieces, serial numbers are obscured to safeguard subsequent owners from unauthorized database scraping.
                </p>
                <p className="bg-[#FAF8F5] p-4 border-l-2 border-[#8C6D37] text-xs text-neutral-700">
                  <strong>Private Treaty Confidentiality:</strong> Off-market acquisitions and consignment sales are managed through isolated, firewalled custody records accessible exclusively by assigned Senior Horology Partners.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section id="payment-security" className="space-y-4 pt-8 border-t border-[#EBE7DE] scroll-mt-28">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D37] font-semibold">
                Section 05
              </span>
              <h2 className="text-2xl font-serif text-[#16181A] font-normal">
                5. Financial Data & Escrow Encryption
              </h2>
              <div className="text-sm text-neutral-600 font-light space-y-3">
                <p>
                  AURELIA & CROWN does not store complete debit or credit card credentials on our servers. All digital payment transactions are tokenized and processed via tier-1 PCI-DSS Level 1 certified banking partners and European SEPA clearing facilities with 256-bit TLS encryption.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section id="data-sharing" className="space-y-4 pt-8 border-t border-[#EBE7DE] scroll-mt-28">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D37] font-semibold">
                Section 06
              </span>
              <h2 className="text-2xl font-serif text-[#16181A] font-normal">
                6. Third-Party Disclosures & Couriers
              </h2>
              <div className="text-sm text-neutral-600 font-light space-y-3">
                <p>
                  Client address data is shared solely with accredited high-value logistics partners (e.g. Malca-Amit, Brink's, Ferrari Logistics) strictly to execute insured handovers and customs verification.
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section id="retention" className="space-y-4 pt-8 border-t border-[#EBE7DE] scroll-mt-28">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D37] font-semibold">
                Section 07
              </span>
              <h2 className="text-2xl font-serif text-[#16181A] font-normal">
                7. Data Retention & Archival Registers
              </h2>
              <div className="text-sm text-neutral-600 font-light space-y-3">
                <p>
                  Transaction accounting data is retained for the mandatory statutory period mandated by French and Swiss commercial codes (10 years). Marketing subscriptions may be rescinded at any instant with a single click.
                </p>
              </div>
            </section>

            {/* Section 8 */}
            <section id="user-rights" className="space-y-4 pt-8 border-t border-[#EBE7DE] scroll-mt-28">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D37] font-semibold">
                Section 08
              </span>
              <h2 className="text-2xl font-serif text-[#16181A] font-normal flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-[#8C6D37]" />
                8. Your Rights Under GDPR
              </h2>
              <div className="text-sm text-neutral-600 font-light space-y-3">
                <p>
                  Under the GDPR, you possess the right to:
                </p>
                <ul className="list-disc list-inside space-y-1 text-xs text-neutral-700 pl-2">
                  <li>Request access to the personal data we hold about you</li>
                  <li>Request correction of inaccurate or incomplete records</li>
                  <li>Request erasure of your data (“right to be forgotten”), subject to statutory accounting retention laws</li>
                  <li>Object to or restrict data processing</li>
                  <li>Data portability to another custodian</li>
                  <li>Lodge a complaint with a European supervisory authority (CNIL in France, FDPIC in Switzerland, or ICO in the UK)</li>
                </ul>
              </div>
            </section>

            {/* Section 9 */}
            <section id="cookies" className="space-y-4 pt-8 border-t border-[#EBE7DE] scroll-mt-28">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D37] font-semibold">
                Section 09
              </span>
              <h2 className="text-2xl font-serif text-[#16181A] font-normal">
                9. Cookie Policy & Preferences
              </h2>
              <div className="text-sm text-neutral-600 font-light space-y-3">
                <p>
                  Our site utilizes essential cookies required for session integrity, currency selection, shopping bag management, and security token protection. Analytical tracking is strictly anonymized.
                </p>
              </div>
            </section>

          </div>

        </div>

      </div>
    </div>
  );
};
