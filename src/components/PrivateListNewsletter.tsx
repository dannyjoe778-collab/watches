import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export const PrivateListNewsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="bg-[#111315] text-[#FAF8F5] py-20 sm:py-28 border-b border-[#2A2D32]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        <div className="space-y-3">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#C5A880] font-semibold block">
            PRIVATE SUBSCRIPTION
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#FAF8F5] font-light tracking-[-0.015em]">
            THE PRIVATE LIST
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-light max-w-xl mx-auto leading-relaxed">
            Be the first to discover rare acquisitions, new arrivals and private collection releases.
          </p>
        </div>

        {subscribed ? (
          <div className="inline-flex items-center gap-3 bg-[#1A1D20] border border-[#C5A880]/40 px-6 py-4 text-xs text-[#C5A880] max-w-md mx-auto animate-fade-in">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span className="font-light">
              You are now enrolled in the private dispatch. You will receive discreet priority updates.
            </span>
          </div>
        ) : (
          <form 
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-stretch justify-center max-w-lg mx-auto gap-3"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 bg-[#16181A] border border-[#2A2D32] px-5 py-3.5 text-xs text-[#FAF8F5] placeholder-neutral-500 focus:outline-none focus:border-[#C5A880] transition-colors rounded-none"
            />
            <button
              type="submit"
              className="bg-[#C5A880] hover:bg-[#FAF8F5] text-[#111315] px-7 py-3.5 text-xs uppercase tracking-[0.22em] font-semibold transition-all duration-300 flex items-center justify-center gap-2 group whitespace-nowrap"
            >
              <span>JOIN THE PRIVATE LIST</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        )}

        <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500 font-light">
          <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>Strict discretion observed. Zero spam. Unsubscribe at any time.</span>
        </div>

      </div>
    </section>
  );
};
