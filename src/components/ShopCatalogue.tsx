import React, { useState, useMemo } from 'react';
import { Product, CurrencyCode } from '../types';
import { ProductCard } from './ProductCard';
import { 
  Filter, 
  RotateCcw, 
  Sparkles, 
  ShieldCheck, 
  Watch, 
  Gem, 
  Search, 
  SlidersHorizontal,
  ChevronDown,
  LayoutGrid,
  Grid3X3,
  Check,
  Building2,
  Lock,
  PackageCheck
} from 'lucide-react';

interface ShopCatalogueProps {
  products: Product[];
  currency: CurrencyCode;
  onSelectProduct: (product: Product) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onQuickAddToBag: (product: Product) => void;
  onRequestConsultation: (product: Product) => void;
  initialTypeFilter?: 'all' | 'watch' | 'jewellery';
  initialBrandFilter?: string;
}

export const ShopCatalogue: React.FC<ShopCatalogueProps> = ({
  products,
  currency,
  onSelectProduct,
  wishlistIds,
  onToggleWishlist,
  onQuickAddToBag,
  onRequestConsultation,
  initialTypeFilter = 'all',
  initialBrandFilter = 'all'
}) => {
  // Filter States
  const [selectedType, setSelectedType] = useState<'all' | 'watch' | 'jewellery'>(initialTypeFilter);
  const [selectedBrand, setSelectedBrand] = useState<string>(initialBrandFilter);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [selectedBoxPapers, setSelectedBoxPapers] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);
  const [gridCols, setGridCols] = useState<3 | 4>(4);

  // Available brands across entire inventory
  const allBrands = useMemo(() => {
    const brandSet = new Set(products.map(p => p.brand));
    return Array.from(brandSet).sort();
  }, [products]);

  // Categories available based on type
  const availableCategories = useMemo(() => {
    const catSet = new Set<string>();
    products.forEach(p => {
      if (selectedType === 'all' || p.type === selectedType) {
        if (p.category) catSet.add(p.category);
      }
    });
    return Array.from(catSet).sort();
  }, [products, selectedType]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Type filter
      if (selectedType !== 'all' && p.type !== selectedType) return false;

      // Brand filter
      if (selectedBrand !== 'all' && p.brand !== selectedBrand) return false;

      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;

      // Box & Papers filter
      if (selectedBoxPapers === 'box-papers') {
        const hasBox = p.type === 'watch' ? p.watchSpecs?.box : p.jewellerySpecs?.box;
        const hasPapers = p.type === 'watch' ? p.watchSpecs?.papers : p.jewellerySpecs?.papers;
        if (!hasBox || !hasPapers) return false;
      } else if (selectedBoxPapers === 'papers-only') {
        const hasPapers = p.type === 'watch' ? p.watchSpecs?.papers : p.jewellerySpecs?.papers;
        if (!hasPapers) return false;
      }

      // Search Query filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchBrand = p.brand.toLowerCase().includes(q);
        const matchModel = p.model.toLowerCase().includes(q);
        const matchRef = p.type === 'watch' && p.watchSpecs?.reference?.toLowerCase().includes(q);
        const matchMaterial = p.type === 'watch' 
          ? p.watchSpecs?.caseMaterial.toLowerCase().includes(q)
          : p.jewellerySpecs?.material.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);

        if (!matchName && !matchBrand && !matchModel && !matchRef && !matchMaterial && !matchDesc) {
          return false;
        }
      }

      // Price Range filter
      if (selectedPriceRange !== 'all') {
        const price = p.priceEUR;
        if (selectedPriceRange === 'under-5000' && price >= 5000) return false;
        if (selectedPriceRange === '5000-15000' && (price < 5000 || price > 15000)) return false;
        if (selectedPriceRange === '15000-30000' && (price < 15000 || price > 30000)) return false;
        if (selectedPriceRange === '30000-60000' && (price < 30000 || price > 60000)) return false;
        if (selectedPriceRange === 'above-60000' && price <= 60000) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceEUR - b.priceEUR;
      if (sortBy === 'price-desc') return b.priceEUR - a.priceEUR;
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      // 'featured' default: keep featured first then date
      if (a.isFeaturedHomepage && !b.isFeaturedHomepage) return -1;
      if (!a.isFeaturedHomepage && b.isFeaturedHomepage) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [products, selectedType, selectedBrand, selectedCategory, selectedBoxPapers, searchQuery, selectedPriceRange, sortBy]);

  const handleResetFilters = () => {
    setSelectedType('all');
    setSelectedBrand('all');
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedPriceRange('all');
    setSelectedBoxPapers('all');
    setSortBy('featured');
  };

  const hasActiveFilters = 
    selectedType !== 'all' ||
    selectedBrand !== 'all' ||
    searchQuery.trim() !== '' ||
    selectedCategory !== 'all' ||
    selectedPriceRange !== 'all' ||
    selectedBoxPapers !== 'all' ||
    sortBy !== 'featured';

  const watchCount = products.filter(p => p.type === 'watch').length;
  const jewelleryCount = products.filter(p => p.type === 'jewellery').length;

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#16181A]">
      {/* 1. Header Banner */}
      <div className="bg-[#111315] text-[#FAF8F5] py-12 md:py-16 border-b border-[#2A2D32] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#C5A880_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#C5A880]">
                <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                <span>Aurelia & Crown Curated Shop • London</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif tracking-tight text-[#FAF8F5] font-light">
                Shop All Authenticated Luxury
              </h1>
              <p className="text-neutral-400 text-sm max-w-2xl font-light leading-relaxed">
                Explore our full catalog of pre-owned luxury watches and certified fine jewellery. 
                Every item is authenticated by master horologists and gemmologists in London, 
                accompanied by our 12-Month Comprehensive Warranty and insured courier delivery.
              </p>
            </div>

            {/* Live Counts & Trust Pills */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <div className="px-3.5 py-2 rounded bg-[#1C1F22] border border-[#2A2D32] text-neutral-300 flex items-center gap-2">
                <Watch className="w-4 h-4 text-[#C5A880]" />
                <span><strong>{watchCount}</strong> Watches</span>
              </div>
              <div className="px-3.5 py-2 rounded bg-[#1C1F22] border border-[#2A2D32] text-neutral-300 flex items-center gap-2">
                <Gem className="w-4 h-4 text-[#C5A880]" />
                <span><strong>{jewelleryCount}</strong> Fine Jewellery</span>
              </div>
              <div className="px-3.5 py-2 rounded bg-[#1C1F22] border border-[#2A2D32] text-[#C5A880] flex items-center gap-1.5 font-medium">
                <PackageCheck className="w-4 h-4" />
                <span>12-Month London Warranty</span>
              </div>
            </div>
          </div>

          {/* Department Tabs Bar */}
          <div className="flex items-center gap-2 mt-8 pt-6 border-t border-[#2A2D32]/80 overflow-x-auto pb-2 sm:pb-0">
            <button
              onClick={() => {
                setSelectedType('all');
                setSelectedCategory('all');
              }}
              className={`px-5 py-2.5 rounded text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 ${
                selectedType === 'all'
                  ? 'bg-[#C5A880] text-[#111315] shadow-md'
                  : 'bg-[#1C1F22] text-neutral-300 hover:text-white hover:bg-[#25292E] border border-[#2A2D32]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>All Pieces ({products.length})</span>
            </button>

            <button
              onClick={() => {
                setSelectedType('watch');
                setSelectedCategory('all');
              }}
              className={`px-5 py-2.5 rounded text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 ${
                selectedType === 'watch'
                  ? 'bg-[#C5A880] text-[#111315] shadow-md'
                  : 'bg-[#1C1F22] text-neutral-300 hover:text-white hover:bg-[#25292E] border border-[#2A2D32]'
              }`}
            >
              <Watch className="w-3.5 h-3.5" />
              <span>Watches ({watchCount})</span>
            </button>

            <button
              onClick={() => {
                setSelectedType('jewellery');
                setSelectedCategory('all');
              }}
              className={`px-5 py-2.5 rounded text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 ${
                selectedType === 'jewellery'
                  ? 'bg-[#C5A880] text-[#111315] shadow-md'
                  : 'bg-[#1C1F22] text-neutral-300 hover:text-white hover:bg-[#25292E] border border-[#2A2D32]'
              }`}
            >
              <Gem className="w-3.5 h-3.5" />
              <span>Fine Jewellery & Diamonds ({jewelleryCount})</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Search, Sort, & Control Toolbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white border border-[#EBE7DE] p-4 rounded shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#8C6D37] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by reference, model name, gold, diamond carat..."
              className="w-full pl-10 pr-4 py-2 text-xs bg-[#FAF8F5] border border-[#EBE7DE] rounded focus:outline-none focus:border-[#8C6D37] placeholder:text-neutral-400 text-[#16181A]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Desktop Filter Selectors */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Category Dropdown */}
            {availableCategories.length > 0 && (
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="py-2 px-3 bg-[#FAF8F5] border border-[#EBE7DE] rounded text-neutral-700 focus:outline-none focus:border-[#8C6D37]"
              >
                <option value="all">All Categories</option>
                {availableCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            )}

            {/* Price Range Dropdown */}
            <select
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
              className="py-2 px-3 bg-[#FAF8F5] border border-[#EBE7DE] rounded text-neutral-700 focus:outline-none focus:border-[#8C6D37]"
            >
              <option value="all">All Prices</option>
              <option value="under-5000">Under €5,000</option>
              <option value="5000-15000">€5,000 - €15,000</option>
              <option value="15000-30000">€15,000 - €30,000</option>
              <option value="30000-60000">€30,000 - €60,000</option>
              <option value="above-60000">€60,000+</option>
            </select>

            {/* Box & Papers */}
            <select
              value={selectedBoxPapers}
              onChange={(e) => setSelectedBoxPapers(e.target.value)}
              className="py-2 px-3 bg-[#FAF8F5] border border-[#EBE7DE] rounded text-neutral-700 focus:outline-none focus:border-[#8C6D37]"
            >
              <option value="all">Box & Papers: Any</option>
              <option value="box-papers">Complete Set (Box & Papers)</option>
              <option value="papers-only">Papers / Certificate Included</option>
            </select>

            {/* Sort Select */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-2 px-3 bg-[#FAF8F5] border border-[#EBE7DE] rounded text-neutral-800 font-medium focus:outline-none focus:border-[#8C6D37]"
            >
              <option value="featured">Sort: Curated Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
              <option value="name-asc">Model: A to Z</option>
            </select>

            {/* Grid layout toggle (desktop) */}
            <div className="hidden xl:flex items-center border border-[#EBE7DE] rounded overflow-hidden">
              <button
                onClick={() => setGridCols(3)}
                className={`p-2 transition-colors ${gridCols === 3 ? 'bg-[#16181A] text-white' : 'bg-[#FAF8F5] text-neutral-600 hover:text-black'}`}
                title="3 Columns"
              >
                <Grid3X3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`p-2 transition-colors ${gridCols === 4 ? 'bg-[#16181A] text-white' : 'bg-[#FAF8F5] text-neutral-600 hover:text-black'}`}
                title="4 Columns"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="md:hidden flex items-center gap-1.5 py-2 px-3 bg-[#16181A] text-[#FAF8F5] rounded font-medium"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Active Filters Bar */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center justify-between gap-2 mt-4 pt-3 border-t border-[#EBE7DE]/70 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-neutral-500 font-medium">Active Filters:</span>
              
              {selectedType !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#EBE7DE] text-[#16181A]">
                  Type: {selectedType === 'watch' ? 'Watches' : 'Fine Jewellery'}
                  <button onClick={() => setSelectedType('all')} className="ml-1 hover:text-red-700">✕</button>
                </span>
              )}

              {selectedBrand !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#EBE7DE] text-[#16181A]">
                  Brand: {selectedBrand}
                  <button onClick={() => setSelectedBrand('all')} className="ml-1 hover:text-red-700">✕</button>
                </span>
              )}

              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#EBE7DE] text-[#16181A]">
                  Category: {selectedCategory}
                  <button onClick={() => setSelectedCategory('all')} className="ml-1 hover:text-red-700">✕</button>
                </span>
              )}

              {selectedPriceRange !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#EBE7DE] text-[#16181A]">
                  Price: {selectedPriceRange}
                  <button onClick={() => setSelectedPriceRange('all')} className="ml-1 hover:text-red-700">✕</button>
                </span>
              )}

              {selectedBoxPapers !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#EBE7DE] text-[#16181A]">
                  Status: {selectedBoxPapers}
                  <button onClick={() => setSelectedBoxPapers('all')} className="ml-1 hover:text-red-700">✕</button>
                </span>
              )}

              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#EBE7DE] text-[#16181A]">
                  Search: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="ml-1 hover:text-red-700">✕</button>
                </span>
              )}
            </div>

            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1 text-[#8C6D37] hover:text-[#16181A] font-semibold transition-colors uppercase tracking-wider text-[11px]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset All Filters
            </button>
          </div>
        )}

        {/* Results Counter & Showing Count */}
        <div className="flex items-center justify-between text-xs text-neutral-500 mt-4 mb-6">
          <div>
            Showing <strong className="text-[#16181A]">{filteredProducts.length}</strong> authenticated items
            {selectedType !== 'all' && ` in ${selectedType === 'watch' ? 'Luxury Watches' : 'Fine Jewellery'}`}
          </div>
          <div className="text-[11px] text-neutral-400 hidden sm:block">
            Every piece includes London Authenticity Certificate & 12-Month Guarantee
          </div>
        </div>

        {/* 4. Products View: Unified Grid */}
        {filteredProducts.length > 0 ? (
          <div 
            className={`grid gap-6 ${
              gridCols === 3 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            }`}
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currency={currency}
                onSelectProduct={onSelectProduct}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
                onQuickAddToBag={onQuickAddToBag}
                onRequestConsultation={onRequestConsultation}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-[#EBE7DE] p-12 text-center rounded max-w-lg mx-auto my-12">
            <div className="w-12 h-12 bg-[#FAF8F5] rounded-full flex items-center justify-center mx-auto mb-4 text-[#8C6D37]">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg text-[#16181A] mb-2 font-medium">No Products Found</h3>
            <p className="text-neutral-500 text-xs mb-6 leading-relaxed">
              We could not find any authenticated pieces matching your current filter criteria.
              Try adjusting your search terms, price range, or maison selection.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-2.5 bg-[#16181A] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-[#8C6D37] transition-colors rounded"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* 5. Provenance & Service Footnote Strip */}
        <div className="mt-16 bg-[#16181A] text-[#FAF8F5] p-8 rounded border border-[#2A2D32]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="space-y-2">
              <div className="flex items-center justify-center md:justify-start gap-2 text-[#C5A880] text-xs font-semibold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Dual-Tier Verification</span>
              </div>
              <p className="text-neutral-400 text-xs leading-relaxed">
                All watches undergo pressure-testing, diagnostic amplitude verification, 
                and laser examination against manufacturer registries prior to sale.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-center md:justify-start gap-2 text-[#C5A880] text-xs font-semibold uppercase tracking-wider">
                <Lock className="w-4 h-4" />
                <span>12-Month Comprehensive Warranty</span>
              </div>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Every pre-owned timepiece and fine jewellery item includes our complimentary 
                12-Month Aurelia & Crown London mechanical and structural warranty.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-center md:justify-start gap-2 text-[#C5A880] text-xs font-semibold uppercase tracking-wider">
                <Building2 className="w-4 h-4" />
                <span>Private Showroom Salons</span>
              </div>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Personal viewings available by private appointment at our London Hatton Garden 
                salon and discreet private courier services worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
