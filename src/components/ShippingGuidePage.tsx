import React from 'react';
import { Truck, ShieldCheck, Lock, Globe2, CheckCircle2, PackageCheck } from 'lucide-react';
import { ActiveTab } from '../types';

interface ShippingGuidePageProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const ShippingGuidePage: React.FC<ShippingGuidePageProps> = ({ setActiveTab }) => {
  const pillars = [
    {
      title: 'Secure High-Security Packaging',
      icon: PackageCheck,
      desc: 'All items are housed in discreet, unmarked exterior packaging with specialized shock-absorbing internal bracing and tamper-evident serialized numbered holographic seals applied inside our vault.'
    },
    {
      title: '100% Comprehensive Insurance Coverage',
      icon: ShieldCheck,
      desc: 'Every consignment is insured to its full replacement value from the moment it leaves our secure vault until safe handover to the verified recipient.'
    },
    {
      title: 'Real-Time Telemetry & Tracking',
      icon: Lock,
      desc: 'Clients receive dedicated private tracking portals with milestone notification updates at dispatch, transit checkpoints, and arrival in destination territories.'
    },
    {
      title: 'Direct Adult Signature & Photo ID',
      icon: CheckCircle2,
      desc: 'Packages are never left unattended or redirected without identity validation. Government-issued photo ID and recipient physical signature are strictly mandatory.'
    }
  ];

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#16181A] text-[#E5D3B3] text-[10px] uppercase tracking-[0.25em] font-medium mb-4">
            <Truck className="w-3.5 h-3.5 text-[#8C6D37]" />
            <span>High-Value European Logistics</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#16181A] font-light mb-6 tracking-tight">
            INSURED LOGISTICS & DELIVERY
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
            Delivering rare horological masterpieces and fine jewellery requires specialized custody protocols. We partner exclusively with world-leading high-value secure carriers.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div key={idx} className="bg-white p-6 border border-[#EBE7DE] flex flex-col justify-between shadow-xs">
                <div>
                  <div className="w-10 h-10 bg-[#FAF8F5] border border-[#EBE7DE] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#8C6D37]" />
                  </div>
                  <h3 className="text-base font-serif text-[#16181A] mb-2 font-medium">
                    {p.title}
                  </h3>
                  <p className="text-xs text-neutral-600 font-light leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Delivery Destinations & Transit Times Table */}
        <div className="bg-white border border-[#EBE7DE] p-8 mb-16 shadow-xs">
          <h3 className="text-xl font-serif text-[#16181A] mb-6">
            Transit Timeframes & Regional Coverage
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#EBE7DE] text-[10px] uppercase tracking-wider text-neutral-500 bg-[#FAF8F5]">
                  <th className="py-3 px-4">Region / Country</th>
                  <th className="py-3 px-4">Carrier Service</th>
                  <th className="py-3 px-4">Estimated Transit</th>
                  <th className="py-3 px-4">Insurance Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EBE7DE] text-neutral-700">
                <tr>
                  <td className="py-3 px-4 font-semibold text-neutral-900">France & Monaco</td>
                  <td className="py-3 px-4">Ferrari Logistics / DHL Express Insured</td>
                  <td className="py-3 px-4">24 – 48 Hours</td>
                  <td className="py-3 px-4 text-emerald-800 font-medium">100% Fully Insured</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-neutral-900">Germany, Austria, Switzerland, Benelux</td>
                  <td className="py-3 px-4">Ferrari Logistics / Malca-Amit Priority</td>
                  <td className="py-3 px-4">24 – 48 Hours</td>
                  <td className="py-3 px-4 text-emerald-800 font-medium">100% Fully Insured</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-neutral-900">Italy, Spain, Portugal, Scandinavia</td>
                  <td className="py-3 px-4">DHL Express Dedicated High-Value Courier</td>
                  <td className="py-3 px-4">48 – 72 Hours</td>
                  <td className="py-3 px-4 text-emerald-800 font-medium">100% Fully Insured</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-neutral-900">United Kingdom</td>
                  <td className="py-3 px-4">DHL Express Insured / Dedicated Courier</td>
                  <td className="py-3 px-4">48 Hours (Customs Handled)</td>
                  <td className="py-3 px-4 text-emerald-800 font-medium">100% Fully Insured</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-neutral-900">International (USA, UAE, Singapore, Japan)</td>
                  <td className="py-3 px-4">Malca-Amit / Brinks Armoured Global</td>
                  <td className="py-3 px-4">3 – 5 Business Days</td>
                  <td className="py-3 px-4 text-emerald-800 font-medium">100% Fully Insured</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Private Salon Pickup Option */}
        <div className="bg-[#16181A] text-[#FAF8F5] p-8 sm:p-10 border border-[#2A2D32] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C6D37] font-semibold block">
              In-Person Handover
            </span>
            <h3 className="text-xl font-serif text-[#FAF8F5]">
              Complimentary Private Salon Collection (Paris & Geneva)
            </h3>
            <p className="text-xs text-neutral-400 max-w-xl font-light">
              Clients are welcome to schedule a private appointment at our partner viewing salons for personal presentation and handover with our senior curators.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('contact')}
            className="whitespace-nowrap bg-[#8C6D37] hover:bg-[#FAF8F5] text-[#111315] px-6 py-3 text-xs uppercase tracking-widest font-semibold transition-colors"
          >
            Schedule Salon Pickup
          </button>
        </div>

      </div>
    </div>
  );
};
