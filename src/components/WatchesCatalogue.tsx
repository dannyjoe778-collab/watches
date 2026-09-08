import React, { useState, useMemo } from 'react';
import { Product, CurrencyCode } from '../types';
import { ProductCard } from './ProductCard';
import { 
  Filter, 
  ChevronDown, 
  RotateCcw, 
  Check, 
  SlidersHorizontal, 
  Clock,
  Sparkles,
  ShieldCheck,
  LayoutGrid
} from 'lucide-react';

interface WatchesCatalogueProps {
  products: Product[];
  currency: CurrencyCode;
  onSelectProduct: (product: Product) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onQuickAddToBag: (product: Product) => void;
  onRequestConsultation: (product: Product) => void;
  initialBrandFilter?: string;
  initialCollectionFilter?: string;
}

export const WatchesCatalogue: React.FC<WatchesCatalogueProps> = ({
  products,
  currency,
  onSelectProduct,
  wishlistIds,
  onToggleWishlist,
  onQuickAddToBag,
  onRequestConsultation,
  initialBrandFilter,
  initialCollectionFilter
}) => {
  // Watches only
  const allWatches = useMemo(() => products.filter(p => p.type === 'watch'), [products]);

  // Filters State
  const [selectedBrand, setSelectedBrand] = useState<string>(initialBrandFilter || 'all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [selectedCondition, setSelectedCondition] = useState<string>('all');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');
  const [selectedMovement, setSelectedMovement] = useState<string>('all');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('all');
  const [selectedCollection, setSelectedCollection] = useState<string>(initialCollectionFilter || 'all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Datejust 41 interactive configurator modal state
  const [datejustConfigOpen, setDatejustConfigOpen] = useState(false);
  const [djDial, setDjDial] = useState('Slate "Wimbledon" (Roman)');
  const [djBezel, setDjBezel] = useState('18K White Gold Fluted');
  const [djBracelet, setDjBracelet] = useState('Jubilee (Oystersteel)');
  const [djYear, setDjYear] = useState('2024');
  const [djCondition, setDjCondition] = useState<'Unworn / Mint' | 'Exceptional'>('Unworn / Mint');

  // Extract unique filter options
  const brands = useMemo(() => {
    const set = new Set(allWatches.map(w => w.brand));
    return Array.from(set);
  }, [allWatches]);

  const materials = useMemo(() => {
    const set = new Set(allWatches.map(w => w.watchSpecs?.caseMaterial || '').filter(Boolean));
    return Array.from(set);
  }, [allWatches]);

  // Reset Filters
  const handleResetFilters = () => {
    setSelectedBrand('all');
    setSelectedPriceRange('all');
    setSelectedCondition('all');
    setSelectedMaterial('all');
    setSelectedMovement('all');
    setSelectedAvailability('all');
    setSelectedCollection('all');
    setSortBy('featured');
  };

  // Filter & Sort Logic
  const filteredWatches = useMemo(() => {
    return allWatches
      .filter((w) => {
        // Brand filter
        if (selectedBrand !== 'all' && w.brand !== selectedBrand) return false;

        // Collection filter
        if (selectedCollection !== 'all' && !w.collection.toLowerCase().includes(selectedCollection.toLowerCase())) return false;

        // Availability
        if (selectedAvailability !== 'all') {
          if (selectedAvailability === 'Available' && w.status !== 'Available' && w.status !== 'New') return false;
          if (selectedAvailability === 'Sold' && w.status !== 'Sold') return false;
          if (selectedAvailability === 'Reserved' && w.status !== 'Reserved') return false;
        }

        // Condition
        if (selectedCondition !== 'all' && w.watchSpecs?.condition !== selectedCondition) return false;

        // Material
        if (selectedMaterial !== 'all' && !w.watchSpecs?.caseMaterial.toLowerCase().includes(selectedMaterial.toLowerCase())) return false;

        // Movement
        if (selectedMovement !== 'all' && !w.watchSpecs?.movement.toLowerCase().includes(selectedMovement.toLowerCase())) return false;

        // Price range
        if (selectedPriceRange !== 'all') {
          if (selectedPriceRange === 'under-10k' && w.priceEUR >= 10000) return false;
          if (selectedPriceRange === '10k-20k' && (w.priceEUR < 10000 || w.priceEUR > 20000)) return false;
          if (selectedPriceRange === '20k-50k' && (w.priceEUR < 20000 || w.priceEUR > 50000)) return false;
          if (selectedPriceRange === 'over-50k' && w.priceEUR <= 50000) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.priceEUR - b.priceEUR;
        if (sortBy === 'price-desc') return b.priceEUR - a.priceEUR;
        if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        if (sortBy === 'popular') return (b.priceEUR % 7) - (a.priceEUR % 7);
        return 0; // featured default
      });
  }, [allWatches, selectedBrand, selectedCollection, selectedAvailability, selectedCondition, selectedMaterial, selectedMovement, selectedPriceRange, sortBy]);

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#16181A] text-[#E5D3B3] text-[10px] uppercase tracking-[0.25em] font-medium mb-3">
            <Clock className="w-3 h-3 text-[#8C6D37]" />
            <span>Authenticated European Inventory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#16181A] font-light mb-4">
            Curated Luxury Watches
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
            Every timepiece in our collection has undergone rigorous 8-point physical inspection, timing analysis, and register verification by certified master horologists.
          </p>
        </div>

        {/* Datejust 41 Custom Configurator Banner */}
        <div className="mb-10 bg-white border border-[#8C6D37]/40 p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#8C6D37]" />
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C6D37]">
                Custom Configuration Available
              </span>
            </div>
            <h3 className="text-xl font-serif text-[#16181A]">
              Rolex Datejust 41 — Bespoke Specification
            </h3>
            <p className="text-xs text-neutral-600 max-w-xl font-light">
              Customize dial (Wimbledon / Bright Blue / Silver / Black), bezel (Fluted 18K WG / Smooth), and bracelet (Jubilee / Oyster) for prioritized sourcing.
            </p>
          </div>

          <button
            onClick={() => setDatejustConfigOpen(true)}
            className="whitespace-nowrap bg-[#16181A] hover:bg-[#8C6D37] text-[#FAF8F5] px-6 py-3 text-xs uppercase tracking-widest font-semibold transition-colors flex items-center gap-2"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Configure Datejust 41</span>
          </button>
        </div>

        {/* Luxury Maisons Filter Bar */}
        <div className="mb-8 bg-white border border-[#EBE7DE] rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
            <span className="text-[#8C6D37] text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap mr-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Maisons:</span>
            </span>

            <button
              onClick={() => setSelectedBrand('all')}
              className={`px-3.5 py-1.5 rounded-full whitespace-nowrap font-medium text-xs transition-colors ${
                selectedBrand === 'all'
                  ? 'bg-[#16181A] text-[#FAF8F5]'
                  : 'bg-[#FAF8F5] border border-[#EBE7DE] text-neutral-700 hover:border-[#8C6D37]'
              }`}
            >
              All Watches ({allWatches.length})
            </button>

            {brands.map(brandName => {
              const count = allWatches.filter(w => w.brand === brandName).length;
              const isSelected = selectedBrand === brandName;
              return (
                <button
                  key={brandName}
                  onClick={() => setSelectedBrand(isSelected ? 'all' : brandName)}
                  className={`px-3.5 py-1.5 rounded-full whitespace-nowrap font-medium text-xs transition-colors flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#16181A] text-[#FAF8F5] shadow-xs'
                      : 'bg-[#FAF8F5] border border-[#EBE7DE] text-neutral-700 hover:border-[#8C6D37]'
                  }`}
                >
                  <span>{brandName}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected ? 'bg-[#2A2D32] text-[#FAF8F5]' : 'bg-neutral-200/70 text-neutral-600'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Controls Bar: Filters & Sorting */}
        <div className="bg-white border border-[#EBE7DE] p-4 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Left: Summary and Mobile Filter Toggle */}
          <div className="flex items-center justify-between md:justify-start gap-4">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="md:hidden flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#16181A] py-2 px-3 border border-[#EBE7DE]"
            >
              <Filter className="w-3.5 h-3.5 text-[#8C6D37]" />
              <span>Filters ({filteredWatches.length})</span>
            </button>

            <span className="text-xs text-neutral-500 font-light">
              Showing <strong className="text-neutral-900 font-semibold">{filteredWatches.length}</strong> authenticated timepieces
            </span>

            {(selectedBrand !== 'all' || selectedPriceRange !== 'all' || selectedCondition !== 'all' || selectedMaterial !== 'all' || selectedAvailability !== 'all') && (
              <button
                onClick={handleResetFilters}
                className="text-[11px] text-[#8C6D37] hover:text-[#16181A] flex items-center gap-1 font-medium underline"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* Right: Sorting Selector */}
          <div className="flex items-center gap-2 self-end md:self-auto text-xs">
            <span className="text-neutral-500 uppercase tracking-wider text-[11px]">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#FAF8F5] border border-[#EBE7DE] py-2 px-3 text-xs text-[#16181A] focus:outline-none focus:border-[#8C6D37] cursor-pointer"
            >
              <option value="featured">Featured Selection</option>
              <option value="newest">Newest Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>

        {/* Main Grid + Filter Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Desktop Filter Sidebar */}
          <div className={`lg:col-span-3 space-y-6 ${mobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white p-5 border border-[#EBE7DE] space-y-5">
              
              <div className="flex items-center justify-between pb-3 border-b border-[#EBE7DE]">
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#16181A]">
                  Filter By
                </span>
                <button
                  onClick={handleResetFilters}
                  className="text-[10px] uppercase text-[#8C6D37] hover:underline"
                >
                  Clear All
                </button>
              </div>

              {/* Brand Filter */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-800 mb-2">
                  Maison / Brand
                </label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#EBE7DE] py-2 px-3 text-xs text-[#16181A] focus:outline-none focus:border-[#8C6D37]"
                >
                  <option value="all">All Maisons ({allWatches.length})</option>
                  {brands.map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-800 mb-2">
                  Price Range (EUR)
                </label>
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#EBE7DE] py-2 px-3 text-xs text-[#16181A] focus:outline-none focus:border-[#8C6D37]"
                >
                  <option value="all">All Prices</option>
                  <option value="under-10k">Under €10,000</option>
                  <option value="10k-20k">€10,000 – €20,000</option>
                  <option value="20k-50k">€20,000 – €50,000</option>
                  <option value="over-50k">€50,000+ (High Horology)</option>
                </select>
              </div>

              {/* Condition */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-800 mb-2">
                  Condition
                </label>
                <select
                  value={selectedCondition}
                  onChange={(e) => setSelectedCondition(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#EBE7DE] py-2 px-3 text-xs text-[#16181A] focus:outline-none focus:border-[#8C6D37]"
                >
                  <option value="all">All Conditions</option>
                  <option value="Unworn / Mint">Unworn / Mint</option>
                  <option value="Exceptional">Exceptional Condition</option>
                  <option value="Very Good">Very Good</option>
                </select>
              </div>

              {/* Material */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-800 mb-2">
                  Case Material
                </label>
                <select
                  value={selectedMaterial}
                  onChange={(e) => setSelectedMaterial(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#EBE7DE] py-2 px-3 text-xs text-[#16181A] focus:outline-none focus:border-[#8C6D37]"
                >
                  <option value="all">All Materials</option>
                  <option value="Steel">Oystersteel / Stainless Steel</option>
                  <option value="Yellow Gold">18K Yellow Gold</option>
                  <option value="Pink Gold">18K Pink / Rose Gold</option>
                  <option value="Rolesor">White / Yellow Rolesor</option>
                </select>
              </div>

              {/* Movement */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-800 mb-2">
                  Calibre / Movement
                </label>
                <select
                  value={selectedMovement}
                  onChange={(e) => setSelectedMovement(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#EBE7DE] py-2 px-3 text-xs text-[#16181A] focus:outline-none focus:border-[#8C6D37]"
                >
                  <option value="all">All Movements</option>
                  <option value="Automatic">Automatic Self-Winding</option>
                  <option value="Manual">Manual Winding</option>
                  <option value="Chronometer">Superlative / Master Chronometer</option>
                </select>
              </div>

              {/* Availability */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-800 mb-2">
                  Availability
                </label>
                <select
                  value={selectedAvailability}
                  onChange={(e) => setSelectedAvailability(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#EBE7DE] py-2 px-3 text-xs text-[#16181A] focus:outline-none focus:border-[#8C6D37]"
                >
                  <option value="all">All Pieces</option>
                  <option value="Available">Available Now</option>
                  <option value="Reserved">Reserved</option>
                  <option value="Sold">Archive / Sold</option>
                </select>
              </div>

              {/* Guarantee badge info */}
              <div className="p-3.5 bg-[#FAF8F5] border border-[#EBE7DE] text-[11px] text-neutral-600 space-y-1">
                <span className="font-semibold text-neutral-800 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8C6D37]" />
                  Workshop Certified
                </span>
                <p className="font-light leading-relaxed">
                  Every watch is verified for serial validity against the manufacturer register and lost-watch databases.
                </p>
              </div>

            </div>
          </div>

          {/* Product View: Subfolders or Flat Grid (9-col on desktop) */}
          <div className="lg:col-span-9">
            {filteredWatches.length === 0 ? (
              <div className="bg-white border border-[#EBE7DE] p-12 text-center space-y-4">
                <h3 className="text-xl font-serif text-[#16181A]">No Matching Timepieces Found</h3>
                <p className="text-xs text-neutral-600 max-w-md mx-auto leading-relaxed">
                  No current inventory matches all selected filter criteria. You may reset the filters or submit a private sourcing request to our European concierge.
                </p>
                <div className="flex justify-center gap-3 pt-2">
                  <button
                    onClick={handleResetFilters}
                    className="bg-[#16181A] text-[#FAF8F5] px-6 py-2.5 text-xs uppercase tracking-widest font-semibold"
                  >
                    Reset Filters
                  </button>
                  <button
                    onClick={() => onRequestConsultation(allWatches[0])}
                    className="border border-[#16181A] text-[#16181A] px-6 py-2.5 text-xs uppercase tracking-widest font-semibold"
                  >
                    Private Sourcing
                  </button>
                </div>
              </div>
            ) : (
              /* Flat Grid View */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWatches.map((watch) => (
                  <ProductCard
                    key={watch.id}
                    product={watch}
                    currency={currency}
                    onSelectProduct={onSelectProduct}
                    isWishlisted={wishlistIds.includes(watch.id)}
                    onToggleWishlist={onToggleWishlist}
                    onQuickAddToBag={onQuickAddToBag}
                    onRequestConsultation={onRequestConsultation}
                  />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Datejust 41 Interactive Configurator Modal */}
      {datejustConfigOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-[#111315]/80 backdrop-blur-sm" onClick={() => setDatejustConfigOpen(false)} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-[#FAF8F5] border border-[#EBE7DE] max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6">
              
              <div className="border-b border-[#EBE7DE] pb-4">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D37] font-semibold block">
                  Rolex Configuration Studio
                </span>
                <h3 className="text-2xl font-serif text-[#16181A]">
                  Configure Your Rolex Datejust 41
                </h3>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-neutral-800 mb-1">
                    Dial Configuration
                  </label>
                  <select
                    value={djDial}
                    onChange={(e) => setDjDial(e.target.value)}
                    className="w-full bg-white border border-[#EBE7DE] p-2.5 text-xs"
                  >
                    <option value='Slate "Wimbledon" (Roman)'>Slate "Wimbledon" (Green Roman Numerals)</option>
                    <option value='Bright Blue Sunburst'>Bright Blue Sunburst (Baton Index)</option>
                    <option value='Silver Sunburst'>Silver Sunburst (Baton Index)</option>
                    <option value='Bright Black Sunburst'>Bright Black Sunburst (Baton Index)</option>
                    <option value='Mint Green Motif'>Mint Green Fluted Motif</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-neutral-800 mb-1">
                    Bezel Style
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['18K White Gold Fluted', 'Smooth Domed Steel'].map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setDjBezel(b)}
                        className={`p-2.5 border text-center transition-all ${
                          djBezel === b ? 'border-[#8C6D37] bg-[#8C6D37]/10 font-semibold' : 'border-[#EBE7DE] bg-white'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-neutral-800 mb-1">
                    Bracelet Style
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Jubilee (Oystersteel)', 'Oyster (Oystersteel)'].map((br) => (
                      <button
                        key={br}
                        type="button"
                        onClick={() => setDjBracelet(br)}
                        className={`p-2.5 border text-center transition-all ${
                          djBracelet === br ? 'border-[#8C6D37] bg-[#8C6D37]/10 font-semibold' : 'border-[#EBE7DE] bg-white'
                        }`}
                      >
                        {br}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-neutral-800 mb-1">
                      Preferred Year
                    </label>
                    <select
                      value={djYear}
                      onChange={(e) => setDjYear(e.target.value)}
                      className="w-full bg-white border border-[#EBE7DE] p-2 text-xs"
                    >
                      <option value="2024">2024 (Latest Reference)</option>
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                      <option value="2021">2021</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-neutral-800 mb-1">
                      Condition
                    </label>
                    <select
                      value={djCondition}
                      onChange={(e) => setDjCondition(e.target.value as any)}
                      className="w-full bg-white border border-[#EBE7DE] p-2 text-xs"
                    >
                      <option value="Unworn / Mint">Unworn / Mint</option>
                      <option value="Exceptional">Exceptional</option>
                    </select>
                  </div>
                </div>

                {/* Summary Box */}
                <div className="bg-[#EBE7DE]/70 p-3.5 border border-[#EBE7DE] space-y-1">
                  <span className="font-semibold text-neutral-900 block">
                    Calculated Reference: Ref. {djBezel.includes('Fluted') ? '126334' : '126300'}
                  </span>
                  <div className="text-[11px] text-neutral-600">
                    Configuration: {djDial} • {djBezel} • {djBracelet} ({djYear})
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setDatejustConfigOpen(false)}
                  className="px-4 py-2.5 text-xs text-neutral-600 hover:text-neutral-900 uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setDatejustConfigOpen(false);
                    const djProduct = allWatches.find(w => w.name.includes('Datejust 41')) || allWatches[3];
                    onRequestConsultation({
                      ...djProduct,
                      name: `Rolex Datejust 41 (${djDial} / ${djBezel} / ${djBracelet})`
                    });
                  }}
                  className="bg-[#16181A] hover:bg-[#8C6D37] text-[#FAF8F5] px-6 py-2.5 text-xs uppercase tracking-widest font-semibold transition-colors"
                >
                  Request Configured Piece
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};
