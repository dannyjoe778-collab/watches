import React, { useState, useMemo } from 'react';
import { Product, CurrencyCode, JewelleryCategory } from '../types';
import { ProductCard } from './ProductCard';
import { 
  Filter, 
  RotateCcw, 
  Sparkles, 
  Gem, 
  Award,
  ShieldCheck
} from 'lucide-react';

interface JewelleryCatalogueProps {
  products: Product[];
  currency: CurrencyCode;
  onSelectProduct: (product: Product) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onQuickAddToBag: (product: Product) => void;
  onRequestConsultation: (product: Product) => void;
  initialCategoryFilter?: string;
  initialBrandFilter?: string;
}

export const JewelleryCatalogue: React.FC<JewelleryCatalogueProps> = ({
  products,
  currency,
  onSelectProduct,
  wishlistIds,
  onToggleWishlist,
  onQuickAddToBag,
  onRequestConsultation,
  initialCategoryFilter,
  initialBrandFilter
}) => {
  // Jewellery only
  const allJewellery = useMemo(() => products.filter(p => p.type === 'jewellery'), [products]);

  // Filters State
  const [selectedBrand, setSelectedBrand] = useState<string>(initialBrandFilter || 'all');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategoryFilter || 'all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');
  const [selectedGemstone, setSelectedGemstone] = useState<string>('all');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Extract unique brands & materials
  const brands = useMemo(() => {
    const set = new Set(allJewellery.map(j => j.brand));
    return Array.from(set);
  }, [allJewellery]);

  const categories: JewelleryCategory[] = [
    'Bracelets',
    'Necklaces',
    'Rings',
    'Earrings',
    'High Jewellery',
    'Exceptional Gemstone'
  ];

  const handleResetFilters = () => {
    setSelectedBrand('all');
    setSelectedCategory('all');
    setSelectedPriceRange('all');
    setSelectedMaterial('all');
    setSelectedGemstone('all');
    setSelectedAvailability('all');
    setSortBy('featured');
  };

  const filteredJewellery = useMemo(() => {
    return allJewellery
      .filter((j) => {
        // Brand filter
        if (selectedBrand !== 'all' && j.brand !== selectedBrand) return false;

        // Category filter
        if (selectedCategory !== 'all' && j.category !== selectedCategory) return false;

        // Material filter
        if (selectedMaterial !== 'all') {
          const mat = j.jewellerySpecs?.material.toLowerCase() || '';
          if (!mat.includes(selectedMaterial.toLowerCase())) return false;
        }

        // Gemstone filter
        if (selectedGemstone !== 'all') {
          const gem = (j.jewellerySpecs?.gemstone || '').toLowerCase();
          if (selectedGemstone === 'Diamond' && !gem.includes('diamond')) return false;
          if (selectedGemstone === 'Mother of Pearl' && !gem.includes('mother-of-pearl') && !gem.includes('pearl')) return false;
          if (selectedGemstone === 'Emerald' && !gem.includes('emerald')) return false;
          if (selectedGemstone === 'Yellow Diamond' && !j.name.toLowerCase().includes('yellow diamond')) return false;
        }

        // Availability
        if (selectedAvailability !== 'all') {
          if (selectedAvailability === 'Available' && j.status !== 'Available' && j.status !== 'New') return false;
          if (selectedAvailability === 'Sold' && j.status !== 'Sold') return false;
          if (selectedAvailability === 'Reserved' && j.status !== 'Reserved') return false;
        }

        // Price range
        if (selectedPriceRange !== 'all') {
          if (selectedPriceRange === 'under-5k' && j.priceEUR >= 5000) return false;
          if (selectedPriceRange === '5k-15k' && (j.priceEUR < 5000 || j.priceEUR > 15000)) return false;
          if (selectedPriceRange === '15k-40k' && (j.priceEUR < 15000 || j.priceEUR > 40000)) return false;
          if (selectedPriceRange === 'over-40k' && j.priceEUR <= 40000) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.priceEUR - b.priceEUR;
        if (sortBy === 'price-desc') return b.priceEUR - a.priceEUR;
        if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        return 0;
      });
  }, [allJewellery, selectedBrand, selectedCategory, selectedMaterial, selectedGemstone, selectedAvailability, selectedPriceRange, sortBy]);

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#16181A] text-[#E5D3B3] text-[10px] uppercase tracking-[0.25em] font-medium mb-3">
            <Gem className="w-3 h-3 text-[#8C6D37]" />
            <span>Authenticated Haute Joaillerie</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#16181A] font-light mb-4">
            Fine Jewellery & Rare Gemstones
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
            Iconic creations from Cartier, Van Cleef & Arpels, Bulgari, and Tiffany & Co., alongside certified unenhanced Colombian emeralds and GIA natural fancy coloured diamonds.
          </p>
        </div>

        {/* Categories Pill Navigation */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 text-xs font-medium uppercase tracking-wider">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 whitespace-nowrap border transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#16181A] text-[#FAF8F5] border-[#16181A]'
                : 'bg-white text-neutral-700 border-[#EBE7DE] hover:border-[#8C6D37]'
            }`}
          >
            All Categories ({allJewellery.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 whitespace-nowrap border transition-all ${
                selectedCategory === cat
                  ? 'bg-[#16181A] text-[#FAF8F5] border-[#16181A]'
                  : 'bg-white text-neutral-700 border-[#EBE7DE] hover:border-[#8C6D37]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Controls Bar */}
        <div className="bg-white border border-[#EBE7DE] p-4 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center justify-between md:justify-start gap-4">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="md:hidden flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#16181A] py-2 px-3 border border-[#EBE7DE]"
            >
              <Filter className="w-3.5 h-3.5 text-[#8C6D37]" />
              <span>Filters ({filteredJewellery.length})</span>
            </button>

            <span className="text-xs text-neutral-500 font-light">
              Showing <strong className="text-neutral-900 font-semibold">{filteredJewellery.length}</strong> fine jewellery pieces
            </span>

            {(selectedBrand !== 'all' || selectedCategory !== 'all' || selectedPriceRange !== 'all' || selectedMaterial !== 'all' || selectedGemstone !== 'all') && (
              <button
                onClick={handleResetFilters}
                className="text-[11px] text-[#8C6D37] hover:text-[#16181A] flex items-center gap-1 font-medium underline"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 self-end md:self-auto text-xs">
            <span className="text-neutral-500 uppercase tracking-wider text-[11px]">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#FAF8F5] border border-[#EBE7DE] py-2 px-3 text-xs text-[#16181A] focus:outline-none focus:border-[#8C6D37] cursor-pointer"
            >
              <option value="featured">Featured Curations</option>
              <option value="newest">Newest Acquisitions</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Grid & Filter layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Filter Sidebar */}
          <div className={`lg:col-span-3 space-y-6 ${mobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white p-5 border border-[#EBE7DE] space-y-5">
              
              <div className="flex items-center justify-between pb-3 border-b border-[#EBE7DE]">
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#16181A]">
                  Filter Jewellery
                </span>
                <button
                  onClick={handleResetFilters}
                  className="text-[10px] uppercase text-[#8C6D37] hover:underline"
                >
                  Clear
                </button>
              </div>

              {/* Maison */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-800 mb-2">
                  Jewellery Maison
                </label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#EBE7DE] py-2 px-3 text-xs text-[#16181A] focus:outline-none focus:border-[#8C6D37]"
                >
                  <option value="all">All Maisons ({allJewellery.length})</option>
                  {brands.map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              {/* Material */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-800 mb-2">
                  Precious Metal
                </label>
                <select
                  value={selectedMaterial}
                  onChange={(e) => setSelectedMaterial(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#EBE7DE] py-2 px-3 text-xs text-[#16181A] focus:outline-none focus:border-[#8C6D37]"
                >
                  <option value="all">All Metals</option>
                  <option value="Yellow Gold">18K Yellow Gold</option>
                  <option value="White Gold">18K White Gold</option>
                  <option value="Rose Gold">18K Rose Gold</option>
                  <option value="Platinum">Platinum 950</option>
                  <option value="Three-Gold">Three-Gold (Cartier Trinity)</option>
                </select>
              </div>

              {/* Gemstone */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-800 mb-2">
                  Gemstone & Mineral
                </label>
                <select
                  value={selectedGemstone}
                  onChange={(e) => setSelectedGemstone(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#EBE7DE] py-2 px-3 text-xs text-[#16181A] focus:outline-none focus:border-[#8C6D37]"
                >
                  <option value="all">All Gemstones</option>
                  <option value="Diamond">Natural Diamonds (Pavé / Solitaire)</option>
                  <option value="Mother of Pearl">Mother-of-Pearl (Alhambra)</option>
                  <option value="Emerald">Colombian Emerald (High Joaillerie)</option>
                  <option value="Yellow Diamond">Fancy Vivid Yellow Diamond</option>
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-800 mb-2">
                  Price Range
                </label>
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#EBE7DE] py-2 px-3 text-xs text-[#16181A] focus:outline-none focus:border-[#8C6D37]"
                >
                  <option value="all">All Prices</option>
                  <option value="under-5k">Under €5,000</option>
                  <option value="5k-15k">€5,000 – €15,000</option>
                  <option value="15k-40k">€15,000 – €40,000</option>
                  <option value="over-40k">€40,000+ (High Joaillerie)</option>
                </select>
              </div>

              {/* Gemological transparency callout */}
              <div className="p-3.5 bg-[#FAF8F5] border border-[#EBE7DE] text-[11px] text-neutral-600 space-y-1">
                <span className="font-semibold text-neutral-800 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-[#8C6D37]" />
                  Gemmological Transparency
                </span>
                <p className="font-light leading-relaxed">
                  Laboratory reports (GIA, SSEF, Gübelin) are presented without modification. No gemstone characteristics are estimated or fabricated.
                </p>
              </div>

            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-9">
            {filteredJewellery.length === 0 ? (
              <div className="bg-white border border-[#EBE7DE] p-12 text-center space-y-4">
                <h3 className="text-xl font-serif text-[#16181A]">No Matching Jewellery Found</h3>
                <p className="text-xs text-neutral-600 max-w-md mx-auto leading-relaxed">
                  Try adjusting the gemstone, category, or metal filters, or contact our private client jewellery concierge.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="bg-[#16181A] text-[#FAF8F5] px-6 py-2.5 text-xs uppercase tracking-widest font-semibold"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJewellery.map((jewel) => (
                  <ProductCard
                    key={jewel.id}
                    product={jewel}
                    currency={currency}
                    onSelectProduct={onSelectProduct}
                    isWishlisted={wishlistIds.includes(jewel.id)}
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
    </div>
  );
};
