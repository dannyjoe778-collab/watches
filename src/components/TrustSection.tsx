import React from 'react';
import { ShieldCheck, FileCheck, Truck, Sparkles } from 'lucide-react';
import { ActiveTab } from '../types';

interface TrustSectionProps {
  setActiveTab?: (tab: ActiveTab) => void;
}

export const TrustSection: React.FC<TrustSectionProps> = ({ setActiveTab }) => {
  const items = [
    {
      id: 'trust-auth',
      icon: ShieldCheck,
      title: 'AUTHENTICATED',
      desc: 'Professional verification of every eligible piece.',
      tab: 'authentication' as ActiveTab
    },
    {
      id: 'trust-prov',
      icon: FileCheck,
      title: 'PROVENANCE',
      desc: 'Documentation provided where available.',
      tab: 'authentication' as ActiveTab
    },
    {
      id: 'trust-delv',
      icon: Truck,
      title: 'INSURED DELIVERY',
      desc: 'Secure handling and insured shipping options.',
      tab: 'shipping' as ActiveTab
    },
    {
      id: 'trust-priv',
      icon: Sparkles,
      title: 'PRIVATE CLIENT SERVICE',
      desc: 'Discreet sourcing and acquisition assistance.',
      tab: 'private-clients' as ActiveTab
    }
  ];

  return (
    <section id="trust-strip" className="bg-[#FAF8F5] border-b border-[#EBE7DE] py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 divide-y sm:divide-y-0 lg:divide-x divide-[#EBE7DE]/80">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id} 
                className={`pt-6 sm:pt-0 ${idx > 0 ? 'lg:pl-6' : ''} flex flex-col justify-start space-y-2.5 group cursor-pointer`}
                onClick={() => setActiveTab && setActiveTab(item.tab)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-none border border-[#EBE7DE] bg-white flex items-center justify-center group-hover:border-[#8C6D37] transition-colors">
                    <Icon className="w-4 h-4 text-[#8C6D37]" />
                  </div>
                  <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#16181A] font-sans group-hover:text-[#8C6D37] transition-colors">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs text-neutral-600 font-light leading-relaxed pl-11">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
