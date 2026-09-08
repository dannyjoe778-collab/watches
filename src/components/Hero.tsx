import React, { useState, useEffect, useRef } from 'react';
import { ActiveTab, CurrencyCode, Product } from '../types';
import { ArrowRight, ChevronLeft, ChevronRight, Shield, Compass, Sparkles } from 'lucide-react';
import heroWatches from '../assets/images/hero_watches_1788822011415.jpg';
import heroComplication from '../assets/images/hero_complication_1788822025450.jpg';
import heroJewellery from '../assets/images/hero_jewellery_1788822039427.jpg';

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
    imageUrl: heroWatches,
    alt: 'Exceptional luxury horology and fine jewellery collection',
    badge: 'GENEVA • PARIS • LONDON • MILAN',
    headlinePart1: 'EXCEPTIONAL TIME.',
    headlinePart2: 'TIMELESS LUXURY.',
    subtext: 'Authenticated watches and signed fine jewellery selected for discerning European collectors.',
    caption: 'Haute Horlogerie & High Jewellery Atelier',
    category: 'Vault Highlights No. 01',
  },
  {
    id: 'slide-2',
    imageUrl: heroComplication,
    alt: 'Masterpiece horological complication and signed precious jewels',
    badge: 'PRIVATE COLLECTOR VAULT',
    headlinePart1: 'LEGENDARY HERITAGE.',
    headlinePart2: 'MASTERFUL CRAFT.',
    subtext: 'Historic references and certified chronometers preserved in pristine provenance condition.',
    caption: 'Curated Complications & Rare Signatures',
    category: 'Vault Highlights No. 02',
  },
  {
    id: 'slide-3',
    imageUrl: heroJewellery,
    alt: 'Haute joaillerie and iconic luxury timepieces on architectural setting',
    badge: 'SALONS & PRIVATE ADVISORY',
    headlinePart1: 'UNRIVALLED BEAUTY.',
    headlinePart2: 'DISTINGUISHED GRACE.',
    subtext: 'Iconic creations from Place Vendôme and Via Montenapoleone available for private acquisition.',
    caption: 'European Prestige & Rare Provenance',
    category: 'Vault Highlights No. 03',
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
      className="relative min-h-[92vh] lg:min-h-screen bg-[#111315] text-[#FAF8F5] overflow-hidden flex items-center justify-center border-b border-[#2B2E33]"
    >
      {/* Background Slides with Smooth Crossfade & Parallax */}
      <div 
        className="absolute inset-0 pointer-events-none transition-transform duration-1000 ease-out"
        style={{
          transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) scale(1.04)`
        }}
      >
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlideIndex ? 'opacity-45' : 'opacity-0'
            }`}
          >
            <img
              src={slide.imageUrl}
              alt={slide.alt}
              className="w-full h-full object-cover object-center filter brightness-95 contrast-125"
              loading={idx === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}

        {/* Multi-layered directional lighting & soft vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#111315] via-[#111315]/85 to-[#111315]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111315] via-transparent to-[#111315]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(197,168,128,0.12),transparent_70%)]" />
      </div>

      {/* Atmospheric Horizon Light Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C5A880]/30 to-transparent" />

      {/* Main Hero Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-36 lg:py-44 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-8 space-y-8 animate-fade-in">
            
            {/* Tagline / Maison Badge */}
            <div className="inline-flex items-center gap-3 px-3.5 py-1.5 bg-[#16181A]/90 border border-[#C5A880]/30 backdrop-blur-sm shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#C5A880] font-medium transition-all duration-500">
                {currentSlide.badge}
              </span>
            </div>

            {/* Main Headline with Dynamic Transitions */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-[#FAF8F5] font-light leading-[1.02] tracking-[-0.02em] min-h-[1.8em]">
                <span className="block transition-all duration-700">{currentSlide.headlinePart1}</span>
                <span className="block text-[#FAF8F5]/90 transition-all duration-700">{currentSlide.headlinePart2}</span>
              </h1>
              
              <p className="text-sm sm:text-base md:text-lg text-[#EBE7DE]/85 font-light max-w-xl leading-relaxed pt-3 min-h-[3em]">
                {currentSlide.subtext}
              </p>
            </div>

            {/* CTAs & Navigation Controls */}
            <div className="space-y-6 pt-2">
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
                  className="bg-[#16181A] hover:bg-[#FAF8F5] text-[#FAF8F5] hover:text-[#111315] border border-[#C5A880]/60 hover:border-[#FAF8F5] px-6 sm:px-7 py-4 text-xs font-semibold uppercase tracking-[0.20em] transition-all duration-300 flex items-center justify-center gap-2.5 shadow-xl group"
                >
                  <span>WATCHES (88)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C5A880] group-hover:text-[#111315] group-hover:translate-x-1 transition-all duration-300" />
                </button>

                {/* Jewellery CTA */}
                <button
                  id="hero-discover-jewellery-btn"
                  onClick={() => setActiveTab('jewellery')}
                  className="bg-transparent hover:bg-[#FAF8F5]/10 text-[#FAF8F5] border border-[#EBE7DE]/40 hover:border-[#FAF8F5] px-6 sm:px-7 py-4 text-xs font-semibold uppercase tracking-[0.20em] transition-all duration-300 flex items-center justify-center gap-2.5 group"
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
                    className="w-8 h-8 rounded-full border border-[#2B2E33] hover:border-[#C5A880] text-neutral-400 hover:text-[#FAF8F5] flex items-center justify-center transition-colors"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="w-8 h-8 rounded-full border border-[#2B2E33] hover:border-[#C5A880] text-neutral-400 hover:text-[#FAF8F5] flex items-center justify-center transition-colors"
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
            <div className="pt-6 border-t border-[#2B2E33]/70 flex flex-wrap items-center gap-6 sm:gap-10 text-xs text-[#EBE7DE]/60 font-light">
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-[#C5A880]" />
                <span className="tracking-wide">Every Piece Workshop Authenticated</span>
              </div>
              <div className="flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-[#C5A880]" />
                <span className="tracking-wide">Private Sourcing Available</span>
              </div>
            </div>

          </div>

          {/* Right Column: High-Resolution Featured Visual Card & Gallery Thumbnails */}
          <div className="lg:col-span-4 hidden lg:block relative">
            <div className="relative p-3 bg-[#16181A]/85 border border-[#2B2E33] backdrop-blur-md shadow-2xl group">
              <div className="overflow-hidden aspect-[4/5] relative bg-[#111315]">
                <img
                  src={currentSlide.imageUrl}
                  alt={currentSlide.alt}
                  className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105 opacity-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111315] via-transparent to-transparent opacity-85" />
                
                {/* Floating caption */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-[#111315]/95 border border-[#C5A880]/30 backdrop-blur-md">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#C5A880] mb-1">
                    <span>{currentSlide.category}</span>
                    <span>0{currentSlideIndex + 1} / 0{HERO_SLIDES.length}</span>
                  </div>
                  <p className="text-xs font-serif text-[#FAF8F5] font-light truncate">
                    {currentSlide.caption}
                  </p>
                </div>
              </div>

              {/* 3 Interactive Thumbnail Switches */}
              <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-[#2B2E33]/80">
                {HERO_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => goToSlide(idx)}
                    className={`relative aspect-square overflow-hidden border transition-all ${
                      idx === currentSlideIndex
                        ? 'border-[#C5A880] ring-1 ring-[#C5A880]/50 scale-[1.02]'
                        : 'border-neutral-800 opacity-60 hover:opacity-100 hover:border-neutral-600'
                    }`}
                  >
                    <img
                      src={slide.imageUrl}
                      alt={slide.caption}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    <span className="absolute bottom-1 right-1 text-[8px] font-mono text-[#FAF8F5] bg-black/60 px-1 py-0.2 rounded-xs">
                      0{idx + 1}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

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
