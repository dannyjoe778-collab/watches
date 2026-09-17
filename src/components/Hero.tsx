import React, { useState, useEffect, useRef } from 'react';
import { ActiveTab, CurrencyCode, Product } from '../types';
import { ArrowRight, ChevronLeft, ChevronRight, Shield, Compass, Sparkles, CheckCircle2 } from 'lucide-react';
import heroLuxuryShowcase from '../assets/images/hero_luxury_showcase_1789680783050.jpg';
import heroWatches from '../assets/images/hero_watches_1788822011415.jpg';
import heroComplication from '../assets/images/hero_complication_1788822025450.jpg';
import heroJewellery from '../assets/images/hero_jewellery_1788822039427.jpg';
import siteIcon from '../assets/images/site_icon.jpg';

interface HeroProps {
  setActiveTab: (tab: ActiveTab) => void;
  currency?: CurrencyCode;
  onSelectProduct?: (product: Product) => void;
}

interface HeroSlide {
  id: string;
  imageUrl: string;
  alt: string;
  badge: string;
  headlinePart1: string;
  headlinePart2: string;
  subtext: string;
  caption: string;
  category: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    imageUrl: heroLuxuryShowcase,
    alt: 'Aurelia & Crown Masterpiece Watches and High Jewellery Showcase',
    badge: 'GENEVA • PARIS • LONDON • MILAN',
    headlinePart1: 'EXCEPTIONAL TIME.',
    headlinePart2: 'TIMELESS LUXURY.',
    subtext: 'Curated certified pre-owned Swiss timepieces and signed fine jewellery for discerning European collectors.',
    caption: 'Haute Horlogerie & High Jewellery Atelier',
    category: 'Vault Highlight No. 01',
  },
  {
    id: 'slide-2',
    imageUrl: heroWatches,
    alt: 'Curated Rolex, Patek Philippe, Audemars Piguet horology',
    badge: 'PRIVATE COLLECTOR VAULT',
    headlinePart1: 'LEGENDARY HERITAGE.',
    headlinePart2: 'MASTERFUL CRAFT.',
    subtext: 'Historic references and certified chronometers preserved in pristine provenance condition.',
    caption: 'Curated Complications & Rare Signatures',
    category: 'Vault Highlight No. 02',
  },
  {
    id: 'slide-3',
    imageUrl: heroJewellery,
    alt: 'Place Vendôme and Montenapoleone signed high jewellery',
    badge: 'SALONS & PRIVATE ADVISORY',
    headlinePart1: 'UNRIVALLED BEAUTY.',
    headlinePart2: 'DISTINGUISHED GRACE.',
    subtext: 'Iconic creations from Place Vendôme and Via Montenapoleone available for private acquisition.',
    caption: 'European Prestige & Rare Provenance',
    category: 'Vault Highlight No. 03',
  },
  {
    id: 'slide-4',
    imageUrl: heroComplication,
    alt: 'Masterpiece horological complication and hand-finished movement',
    badge: 'WORKSHOP AUTHENTICATED',
    headlinePart1: 'MECHANICAL ART.',
    headlinePart2: 'INDEPENDENT MASTERY.',
    subtext: 'Each reference undergoes rigorous 8-point physical verification and timing calibration.',
    caption: 'Complications & Hand-Finished Calibres',
    category: 'Vault Highlight No. 04',
  },
];

export const Hero: React.FC<HeroProps> = ({ setActiveTab }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  // Auto-slide effect every 6 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Subtle mouse parallax effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentSlideIndex(index);
  };

  const currentSlide = HERO_SLIDES[currentSlideIndex];

  return (
    <section 
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-[85vh] min-h-[640px] max-h-[880px] w-full bg-[#111315] text-[#FAF8F5] overflow-hidden flex items-center border-b border-[#2B2E33]"
    >
      {/* Full-Length Main Hero Images with Uniform Height, High-Clarity Resolution & Smooth Parallax */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none transition-transform duration-1000 ease-out"
        style={{
          transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) scale(1.02)`
        }}
      >
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              idx === currentSlideIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.imageUrl}
              alt={slide.alt}
              className="w-full h-full object-cover object-center filter brightness-[1.03] contrast-[1.06] saturate-[1.04]"
              loading={idx === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}

        {/* Directional lighting: Preserves text legibility on the left while keeping the luxury timepieces crystal clear and luminous across the full length */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#111315]/95 via-[#111315]/70 to-transparent max-w-4xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111315] via-transparent to-[#111315]/30" />
      </div>

      {/* Atmospheric Horizon Light Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C5A880]/40 to-transparent" />

      {/* Main Hero Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 w-full z-10">
        <div className="max-w-2xl lg:max-w-3xl space-y-6 sm:space-y-7 animate-fade-in">
          
          {/* Tagline / Maison Badge with Crest */}
          <div className="inline-flex items-center gap-3 px-3.5 py-1.5 bg-[#16181A]/90 border border-[#C5A880]/40 backdrop-blur-md shadow-md">
            <div className="w-4 h-4 rounded-full overflow-hidden border border-[#C5A880]/70 flex-shrink-0">
              <img src={siteIcon} alt="Aurelia & Crown Crest" className="w-full h-full object-cover" />
            </div>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#C5A880] font-medium transition-all duration-500">
              {currentSlide.badge}
            </span>
          </div>

          {/* Main Headline with Dynamic Transitions & Stabilized Height */}
          <div className="space-y-2 min-h-[160px] sm:min-h-[180px] md:min-h-[210px] flex flex-col justify-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-[#FAF8F5] font-light leading-[1.04] tracking-[-0.02em]">
              <span className="block transition-all duration-700">{currentSlide.headlinePart1}</span>
              <span className="block text-[#FAF8F5]/90 transition-all duration-700">{currentSlide.headlinePart2}</span>
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg text-[#EBE7DE]/90 font-light max-w-xl leading-relaxed pt-2">
              {currentSlide.subtext}
            </p>
          </div>

          {/* CTAs & Navigation Controls */}
          <div className="space-y-6 pt-1">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Shop All Primary CTA */}
              <button
                id="hero-shop-all-btn"
                onClick={() => setActiveTab('shop')}
                className="bg-[#C5A880] hover:bg-[#FAF8F5] text-[#111315] px-7 sm:px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] transition-all duration-300 flex items-center justify-center gap-2 shadow-2xl group"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#111315]" />
                <span>SHOP ALL PIECES (130+)</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-all duration-300" />
              </button>

              {/* Watches CTA */}
              <button
                id="hero-explore-watches-btn"
                onClick={() => setActiveTab('watches')}
                className="bg-[#16181A]/95 hover:bg-[#FAF8F5] text-[#FAF8F5] hover:text-[#111315] border border-[#C5A880]/60 hover:border-[#FAF8F5] px-6 sm:px-7 py-4 text-xs font-semibold uppercase tracking-[0.20em] transition-all duration-300 flex items-center justify-center gap-2.5 shadow-xl group backdrop-blur-xs"
              >
                <span>WATCHES (88)</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C5A880] group-hover:text-[#111315] group-hover:translate-x-1 transition-all duration-300" />
              </button>

              {/* Jewellery CTA */}
              <button
                id="hero-discover-jewellery-btn"
                onClick={() => setActiveTab('jewellery')}
                className="bg-transparent hover:bg-[#FAF8F5]/10 text-[#FAF8F5] border border-[#EBE7DE]/40 hover:border-[#FAF8F5] px-6 sm:px-7 py-4 text-xs font-semibold uppercase tracking-[0.20em] transition-all duration-300 flex items-center justify-center gap-2.5 group backdrop-blur-xs"
              >
                <span>JEWELLERY (48)</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#EBE7DE]/60 group-hover:text-[#FAF8F5] group-hover:translate-x-1 transition-all duration-300" />
              </button>
            </div>

            {/* Slide Selector Indicators & Controls */}
            <div className="flex items-center gap-6 pt-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  className="w-8 h-8 rounded-full border border-[#2B2E33] hover:border-[#C5A880] text-neutral-400 hover:text-[#FAF8F5] flex items-center justify-center transition-colors bg-[#111315]/80"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-8 h-8 rounded-full border border-[#2B2E33] hover:border-[#C5A880] text-neutral-400 hover:text-[#FAF8F5] flex items-center justify-center transition-colors bg-[#111315]/80"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Slide Number Indicators */}
              <div className="flex items-center gap-3">
                {HERO_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => goToSlide(idx)}
                    className={`group flex items-center gap-2 text-xs uppercase tracking-widest transition-all ${
                      idx === currentSlideIndex 
                        ? 'text-[#C5A880] font-semibold' 
                        : 'text-neutral-500 hover:text-neutral-300'
                    }`}
                  >
                    <span className="font-mono text-[11px]">0{idx + 1}</span>
                    <span 
                      className={`h-[1px] transition-all duration-500 ${
                        idx === currentSlideIndex 
                          ? 'w-8 bg-[#C5A880]' 
                          : 'w-3 bg-neutral-600 group-hover:w-5'
                      }`} 
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Discreet Assurance Bar */}
          <div className="pt-6 border-t border-[#2B2E33]/70 flex flex-wrap items-center gap-6 sm:gap-10 text-xs text-[#EBE7DE]/70 font-light">
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-[#C5A880]" />
              <span className="tracking-wide">Every Piece Workshop Authenticated</span>
            </div>
            <div className="flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-[#C5A880]" />
              <span className="tracking-wide">Private European Salons & Sourcing</span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom-Right Minimalist Slide Hallmark (Typography and Curatorial Metadata, NO sub-images) */}
      <div className="absolute bottom-10 right-6 sm:right-10 lg:right-16 hidden sm:flex items-center gap-4 bg-[#16181A]/85 backdrop-blur-md px-4 py-3 border border-[#C5A880]/40 shadow-2xl z-10">
        <div className="text-left flex items-start gap-2.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880] mt-0.5 flex-shrink-0" />
          <div>
            <span className="text-[10px] uppercase tracking-[0.24em] text-[#C5A880] block font-semibold">
              {currentSlide.category}
            </span>
            <span className="text-xs font-serif text-[#FAF8F5] block font-light">
              {currentSlide.caption}
            </span>
          </div>
        </div>
        <div className="border-l border-[#2B2E33] pl-3 ml-1 text-right font-mono">
          <span className="text-xs text-[#C5A880] font-bold">
            0{currentSlideIndex + 1}
          </span>
          <span className="text-[10px] text-neutral-400">
            /0{HERO_SLIDES.length}
          </span>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity cursor-pointer z-10"
        onClick={() => {
          const target = document.getElementById('trust-strip');
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-[#C5A880]">SCROLL</span>
        <div className="w-[1px] h-6 bg-gradient-to-b from-[#C5A880] to-transparent animate-pulse" />
      </div>
    </section>
  );
};
