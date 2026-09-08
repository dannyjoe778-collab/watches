import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Are all your watches and jewellery authenticated?",
      answer: "Yes. Every piece in our collection undergoes a rigorous multi-point inspection by our master horologists and gemmologists. We verify provenance, mechanical integrity, and material authenticity. All items are sold with our comprehensive 12-month warranty and a certificate of authenticity."
    },
    {
      question: "How does the insured courier delivery work?",
      answer: "We use specialized, fully-insured armoured courier services for all luxury deliveries across Europe. Your acquisition is trackable in real-time and requires direct signature upon receipt. For certain high-value pieces, we can also arrange secure hand-delivery via a private specialist."
    },
    {
      question: "Can I view a piece in person before purchasing?",
      answer: "Absolutely. We offer private viewings by appointment at our discrete London, Paris, Geneva, and Milan salons. Please contact our advisory team or use the 'Request Consultation' feature to arrange a private viewing of your selected pieces."
    },
    {
      question: "Do you purchase or accept trade-ins for luxury timepieces?",
      answer: "We do. Our valuation experts provide competitive, market-reflective offers for rare, discontinued, and highly collectible timepieces or fine jewellery. You may trade-in against a new acquisition or sell directly to us through a confidential private treaty."
    }
  ];

  return (
    <section className="bg-[#111315] text-[#FAF8F5] py-20 sm:py-28 lg:py-36 border-b border-[#2A2D32]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20 space-y-4">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#C5A880] font-semibold block">
            CLIENT SERVICES
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#FAF8F5] font-light tracking-[-0.015em]">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <div className="w-12 h-[1px] bg-[#C5A880]/50 mx-auto mt-4" />
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border border-[#2A2D32] bg-[#16181A] overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#1C1F22] transition-colors"
              >
                <span className="font-serif text-lg text-[#FAF8F5]">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-[#C5A880] flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-neutral-500 flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-6 pt-2 border-t border-[#2A2D32]">
                  <p className="text-neutral-400 font-light leading-relaxed text-sm">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
