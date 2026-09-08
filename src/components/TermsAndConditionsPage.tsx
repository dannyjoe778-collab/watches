import React, { useState } from 'react';
import { Shield, FileText, CheckCircle2, AlertCircle, Scale, Lock, Truck, RefreshCw, ChevronRight } from 'lucide-react';
import { ActiveTab } from '../types';

interface TermsAndConditionsPageProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const TermsAndConditionsPage: React.FC<TermsAndConditionsPageProps> = ({ setActiveTab }) => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', title: '1. General Provisions & Scope' },
    { id: 'authenticity', title: '2. Authenticity & Provenance Guarantee' },
    { id: 'independent-dealer', title: '3. Independent Dealer Status' },
    { id: 'pricing-payment', title: '4. Pricing, Escrow & Payment Methods' },
    { id: 'shipping-delivery', title: '5. Insured Transport & Vault Handover' },
    { id: 'inspection-returns', title: '6. 14-Day Inspection Period & Returns' },
    { id: 'condition-grades', title: '7. Pre-Owned Condition Classifications' },
    { id: 'private-sourcing', title: '8. Private Client Sourcing Agreements' },
    { id: 'governing-law', title: '9. Jurisdiction & Applicable European Law' },
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
            <Scale className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Legal & Client Protections</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#16181A] font-light tracking-[-0.015em]">
            TERMS & CONDITIONS
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 font-light max-w-xl mx-auto leading-relaxed">
            Effective Date: Autumn 2026. Standard terms of sale, provenance certification, insured courier logistics, and client covenants governing all transactions with AURELIA & CROWN.
          </p>
          <div className="w-12 h-[1px] bg-[#8C6D37]/40 mx-auto mt-4" />
        </div>

        {/* 2-Column Layout: Sticky Sidebar Index + Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Table of Contents */}
          <div className="lg:col-span-4 sticky top-28 bg-white border border-[#EBE7DE] p-6 shadow-sm">
            <div className="flex items-center gap-2 pb-4 border-b border-[#EBE7DE] mb-4 text-[#8C6D37]">
              <FileText className="w-4 h-4" />
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#16181A]">
                Document Index
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
                Need Advisory Assistance?
              </span>
              <button
                onClick={() => setActiveTab('contact')}
                className="w-full py-2.5 bg-[#FAF8F5] hover:bg-[#16181A] text-[#16181A] hover:text-[#FAF8F5] border border-[#EBE7DE] text-[10px] uppercase tracking-[0.2em] font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <span>Contact Legal Concierge</span>
              </button>
            </div>
          </div>

          {/* Right Column: Clauses Content */}
          <div className="lg:col-span-8 bg-white border border-[#EBE7DE] p-8 sm:p-12 shadow-sm space-y-12 leading-relaxed">
            
            {/* Section 1 */}
            <section id="overview" className="space-y-4 scroll-mt-28">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D37] font-semibold">
                Clause 01
              </span>
              <h2 className="text-2xl font-serif text-[#16181A] font-normal">
                1. General Provisions & Scope
              </h2>
              <div className="text-sm text-neutral-600 font-light space-y-3">
                <p>
                  These Terms and Conditions (“Terms”) govern the purchase, sale, consignment, and private acquisition of certified pre-owned luxury timepieces and high jewellery through <strong>AURELIA & CROWN</strong> (“the Maison”, “we”, “our”, or “us”), operated across our European salons in Paris, Geneva, London, and Munich, as well as via our digital catalogue.
                </p>
                <p>
                  By submitting an order, reserving a timepiece, initiating an escrow transaction, or executing a private sourcing mandate, the client (“Buyer” or “Collector”) irrevocably agrees to be bound by these Terms in full.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section id="authenticity" className="space-y-4 pt-8 border-t border-[#EBE7DE] scroll-mt-28">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D37] font-semibold">
                Clause 02
              </span>
              <h2 className="text-2xl font-serif text-[#16181A] font-normal flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#8C6D37]" />
                2. Authenticity & Provenance Guarantee
              </h2>
              <div className="text-sm text-neutral-600 font-light space-y-3">
                <p>
                  Every timepiece and jewellery piece offered in our collection undergoes our mandatory <strong>8-Point Workshop Authentication Protocol</strong> performed by certified Swiss-trained master watchmakers and graduate gemmologists (GIA / SSEF credentials).
                </p>
                <p>
                  We guarantee that every eligible object catalogued on our platform is 100% genuine and authentic. Where indicated, timepieces are accompanied by manufacturer warranty papers, service records, and third-party laboratory reports (e.g. Gübelin, SSEF, GIA).
                </p>
                <p className="bg-[#FAF8F5] p-4 border-l-2 border-[#8C6D37] text-xs text-neutral-700">
                  <strong>Lifetime Authenticity Warranty:</strong> In the extraordinary event that an item sold by AURELIA & CROWN is demonstrated to be non-authentic by an accredited manufacturer atelier, we provide an immediate 100% refund of the purchase price, including all insurance and transportation costs.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section id="independent-dealer" className="space-y-4 pt-8 border-t border-[#EBE7DE] scroll-mt-28">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D37] font-semibold">
                Clause 03
              </span>
              <h2 className="text-2xl font-serif text-[#16181A] font-normal">
                3. Independent Dealer Status & Trademarks
              </h2>
              <div className="text-sm text-neutral-600 font-light space-y-3">
                <p>
                  AURELIA & CROWN is an independent pre-owned specialist dealer. We are not affiliated with, sponsored by, or an authorized retail agent for Rolex SA, Patek Philippe SA, Audemars Piguet, Cartier International, Van Cleef & Arpels, Bulgari S.p.A., or any other respective brand.
                </p>
                <p>
                  All brand names, model names, and registered trademarks belong exclusively to their respective owners and are utilized strictly for descriptive and item-identification purposes in accordance with European trademark doctrines on secondary goods.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section id="pricing-payment" className="space-y-4 pt-8 border-t border-[#EBE7DE] scroll-mt-28">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D37] font-semibold">
                Clause 04
              </span>
              <h2 className="text-2xl font-serif text-[#16181A] font-normal flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#8C6D37]" />
                4. Pricing, Escrow & Payment Methods
              </h2>
              <div className="text-sm text-neutral-600 font-light space-y-3">
                <p>
                  Prices are listed in Euros (EUR) with live reference conversions provided in British Pounds (GBP), Swiss Francs (CHF), and US Dollars (USD). Under European Margin Scheme legislation (Council Directive 2006/112/EC), VAT on pre-owned collector items is included where applicable without deductible input VAT.
                </p>
                <p>
                  To ensure maximum client security, payments may be completed via:
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs text-neutral-700">
                  <li>Direct SEPA Instant / SWIFT Wire Transfer to our segregated European custody account</li>
                  <li>Secure Escrow arrangement via accredited notary or European escrow partner</li>
                  <li>In-person settlement at our Paris, Geneva, or London Private Salons</li>
                  <li>High-limit 3D Secure verified credit cards for purchases up to €25,000</li>
                </ul>
              </div>
            </section>

            {/* Section 5 */}
            <section id="shipping-delivery" className="space-y-4 pt-8 border-t border-[#EBE7DE] scroll-mt-28">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D37] font-semibold">
                Clause 05
              </span>
              <h2 className="text-2xl font-serif text-[#16181A] font-normal flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#8C6D37]" />
                5. Insured Transport & Vault Handover
              </h2>
              <div className="text-sm text-neutral-600 font-light space-y-3">
                <p>
                  Every order is dispatched in tamper-evident security packaging with 100% full declared-value transit insurance via Malca-Amit, Brink's Global Services, or Ferrari Logistics. Handover requires a government-issued photo ID match and signature by the registered buyer.
                </p>
                <p>
                  Alternatively, clients may elect for complimentary personal handover at our Private Salons in Place Vendôme (Paris), Rue du Rhône (Geneva), or Mayfair (London).
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section id="inspection-returns" className="space-y-4 pt-8 border-t border-[#EBE7DE] scroll-mt-28">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D37] font-semibold">
                Clause 06
              </span>
              <h2 className="text-2xl font-serif text-[#16181A] font-normal flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-[#8C6D37]" />
                6. 14-Day Inspection Period & Returns
              </h2>
              <div className="text-sm text-neutral-600 font-light space-y-3">
                <p>
                  In compliance with European distance selling consumer regulations, distance purchasers enjoy a <strong>14-day discretionary inspection window</strong> starting upon confirmed delivery.
                </p>
                <p>
                  To be eligible for a full refund, the item must be returned in the exact unaltered condition received, with all security tags, tamper seals, boxes, paperwork, and certificates intact. Special bespoke sourcing commissions are subject to individual treaty agreements.
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section id="condition-grades" className="space-y-4 pt-8 border-t border-[#EBE7DE] scroll-mt-28">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D37] font-semibold">
                Clause 07
              </span>
              <h2 className="text-2xl font-serif text-[#16181A] font-normal">
                7. Pre-Owned Condition Classifications
              </h2>
              <div className="text-sm text-neutral-600 font-light space-y-3">
                <p>
                  Our workshop grades items into rigorous condition standards:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-[#FAF8F5] border border-[#EBE7DE]">
                    <span className="font-semibold text-[#16181A] block">Unworn / Mint</span>
                    <span className="text-neutral-500 font-light">Zero signs of wear, factory seals intact where applicable.</span>
                  </div>
                  <div className="p-3 bg-[#FAF8F5] border border-[#EBE7DE]">
                    <span className="font-semibold text-[#16181A] block">Exceptional</span>
                    <span className="text-neutral-500 font-light">Crisp original bevels, unpolished or lightly detailed by Maison atelier.</span>
                  </div>
                  <div className="p-3 bg-[#FAF8F5] border border-[#EBE7DE]">
                    <span className="font-semibold text-[#16181A] block">Very Good</span>
                    <span className="text-neutral-500 font-light">Superficial microscopic micro-abrasions commensurate with gentle ownership.</span>
                  </div>
                  <div className="p-3 bg-[#FAF8F5] border border-[#EBE7DE]">
                    <span className="font-semibold text-[#16181A] block">Collector Vintage</span>
                    <span className="text-neutral-500 font-light">Unmodified historical patina, unpolished case preserving reference purity.</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 8 */}
            <section id="private-sourcing" className="space-y-4 pt-8 border-t border-[#EBE7DE] scroll-mt-28">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D37] font-semibold">
                Clause 08
              </span>
              <h2 className="text-2xl font-serif text-[#16181A] font-normal">
                8. Private Client Sourcing Agreements
              </h2>
              <div className="text-sm text-neutral-600 font-light space-y-3">
                <p>
                  Private sourcing mandates for off-market grand complications, museum-grade gemstones, and rare historical jewels are conducted under strict non-disclosure terms. Sourcing retainers, when applicable, are credited directly towards the final acquisition price.
                </p>
              </div>
            </section>

            {/* Section 9 */}
            <section id="governing-law" className="space-y-4 pt-8 border-t border-[#EBE7DE] scroll-mt-28">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D37] font-semibold">
                Clause 09
              </span>
              <h2 className="text-2xl font-serif text-[#16181A] font-normal">
                9. Jurisdiction & Applicable European Law
              </h2>
              <div className="text-sm text-neutral-600 font-light space-y-3">
                <p>
                  These Terms and all related contracts are governed by and construed in accordance with the substantive laws of the European Union, with primary jurisdiction held in the Commercial Courts of Paris, France or the Canton of Geneva, Switzerland, without regard to conflict of law principles.
                </p>
              </div>
            </section>

          </div>

        </div>

      </div>
    </div>
  );
};
