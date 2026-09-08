import React, { useState } from 'react';
import { ArrowRight, BookOpen, Clock, X, Sparkles } from 'lucide-react';

interface Article {
  id: string;
  category: string;
  title: string;
  readTime: string;
  date: string;
  image: string;
  excerpt: string;
  content: string[];
}

export const CollectorsJournalSection: React.FC = () => {
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  const articles: Article[] = [
    {
      id: 'article-1',
      category: 'HOROLOGY GUIDES',
      title: 'How to Choose a Collectible Luxury Watch',
      readTime: '6 min read',
      date: 'Autumn 2026',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85',
      excerpt: 'Navigating reference lineages, production anomalies, and movement calibre innovations to build an enduring timepiece portfolio.',
      content: [
        'Collecting haute horlogerie is an intellectual pursuit where historical rarity, mechanical integrity, and aesthetic proportion converge.',
        'When evaluating a potential acquisition, seasoned collectors prioritize three fundamental pillars: condition originality, documentation completeness, and iconic reference pedigree.',
        'An unpolished case with crisp factory chamfers and bevels will always command a superior premium over an over-restored timepiece. In mechanical watchmaking, preservation of original metal geometry is irreplaceable.',
        'Ensure that serial registers, stamped warranty certificates from authorized European boutiques, and service histories are fully catalogued. At AURELIA & CROWN, every timepiece is subjected to our 8-point physical workshop verification.'
      ]
    },
    {
      id: 'article-2',
      category: 'PROVENANCE & HERITAGE',
      title: 'Understanding Jewellery Provenance',
      readTime: '5 min read',
      date: 'Autumn 2026',
      image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1200&q=85',
      excerpt: 'Why historic hallmarks, Maison archive extracts, and certified gemmological reports establish true long-term value in fine jewellery.',
      content: [
        'In the world of high jewellery (haute joaillerie), provenance is the unbroken bridge between the master artisan who crafted the jewel and its contemporary custodian.',
        'French eagle head hallmarks (poinçons de garantie), maker marks (poinçons de maître), and original signed certificates from historic houses such as Cartier Paris or Van Cleef & Arpels verify authentic workshop origins.',
        'For exceptional colored gemstones—such as Colombian emeralds or Burmese sapphires—origin determination and absence of thermal treatment documented by premier Swiss laboratories (SSEF, Gübelin) are the ultimate markers of pedigree.',
        'Preserving original presentation coffrets and archival paperwork safeguards both the monetary worth and cultural legacy of these wearable sculptures.'
      ]
    },
    {
      id: 'article-3',
      category: 'COLLECTOR PERSPECTIVES',
      title: 'What Makes a Watch Truly Collectible?',
      readTime: '7 min read',
      date: 'Summer 2026',
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=85',
      excerpt: 'From transitional dial variations to discontinued manufacture calibres—the subtle nuances separating ordinary watches from horological milestones.',
      content: [
        'Collectibility in watchmaking is never accidental. It is born at the intersection of limited manufacturing numbers, engineering breakthroughs, and cultural resonance.',
        'Consider transitional references: short production windows where a manufacture tested new dial coatings or ceramic technologies produce exceptionally scarce specimens.',
        'Similarly, complications crafted entirely by hand in the Vallée de Joux or Glashütte represent disappearing manual arts. When a master watchmaker spends hundreds of hours hand-bevelling steel anglage, the object ceases to be merely a clock and becomes kinetic sculpture.',
        'Our private advisors assist collectors in identifying these undervalued historical milestones before broad market appreciation occurs.'
      ]
    },
    {
      id: 'article-4',
      category: 'HOROLOGY GUIDES',
      title: 'The Art of the Tourbillon',
      readTime: '8 min read',
      date: 'Spring 2026',
      image: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&w=1200&q=85',
      excerpt: 'Exploring the history and mechanical genius behind the most fascinating of all horological complications.',
      content: [
        'Invented in 1801 by Abraham-Louis Breguet, the tourbillon was designed to counter the effects of gravity on a pocket watch.',
        'Today, it stands as a testament to the highest echelons of watchmaking skill. The cage, which houses the escapement and balance wheel, rotates continuously—usually once per minute.',
        'This mesmerizing dance requires tolerances measured in microns and is often assembled by a single master watchmaker over several weeks.',
        'Whether a traditional flying tourbillon or a multi-axis contemporary iteration, it remains the ultimate expression of mechanical art.'
      ]
    }
  ];

  return (
    <section className="bg-[#FAF8F5] py-20 sm:py-28 lg:py-36 border-b border-[#EBE7DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#8C6D37] font-semibold block">
            EDITORIAL PERSPECTIVES
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#16181A] font-light tracking-[-0.015em]">
            THE COLLECTOR'S JOURNAL
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed max-w-2xl mx-auto">
            Insights on horology, provenance, and the art of curation from our European specialists.
          </p>
          <div className="w-12 h-[1px] bg-[#8C6D37]/50 mx-auto mt-4" />
        </div>

        {/* 4 Editorial Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {articles.map((article) => (
            <article
              key={article.id}
              onClick={() => setActiveArticle(article)}
              className="bg-white border border-[#EBE7DE] hover:border-[#8C6D37]/70 transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl group cursor-pointer"
            >
              {/* Photo Inset */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#F5F2EB]">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-95"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-[#111315]/90 text-[#FAF8F5] text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 font-medium border border-[#2A2D32]">
                  {article.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-[10px] text-neutral-400 font-light">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#8C6D37]" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif text-[#16181A] font-normal leading-snug group-hover:text-[#8C6D37] transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-xs text-neutral-600 font-light leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EBE7DE]/70 flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#16181A] group-hover:text-[#8C6D37] transition-colors">
                  <span>Read article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-fade-in">
          <div className="bg-[#FAF8F5] border border-[#EBE7DE] max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-10 relative">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-6 right-6 p-2 text-neutral-500 hover:text-[#16181A] transition-colors"
              aria-label="Close Journal Article"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D37] font-semibold block">
                  {activeArticle.category} • {activeArticle.readTime}
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif text-[#16181A] font-light leading-tight">
                  {activeArticle.title}
                </h2>
              </div>

              <div className="aspect-[21/9] overflow-hidden bg-[#16181A] border border-[#EBE7DE]">
                <img
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div className="space-y-4 text-sm sm:text-base text-neutral-700 font-light leading-relaxed">
                {activeArticle.content.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="pt-6 border-t border-[#EBE7DE] flex items-center justify-between">
                <span className="text-xs font-serif italic text-neutral-500">
                  Published by AURELIA & CROWN European Advisory
                </span>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-6 py-2.5 bg-[#16181A] text-[#FAF8F5] hover:bg-[#8C6D37] text-xs uppercase tracking-widest transition-colors font-medium"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
