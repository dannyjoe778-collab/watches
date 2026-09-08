import React, { useState, useMemo } from 'react';
import { Product, CurrencyCode } from '../types';
import { formatPrice } from '../utils/currency';
import { Search, X, ArrowRight, Clock, Gem } from 'lucide-react';
import { WatermarkedProductImage } from './WatermarkedProductImage';

interface LiveSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  currency: CurrencyCode;
  onSelectProduct: (product: Product) => void;
}

export const LiveSearchModal: React.FC<LiveSearchModalProps> = ({
  isOpen,
  onClose,
  products,
  currency,
  onSelectProduct
}) => {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();

    return products.filter((p) => {
      const matchName = p.name.toLowerCase().includes(q);
      const matchBrand = p.brand.toLowerCase().includes(q);
      const matchModel = p.model.toLowerCase().includes(q);
      const matchCollection = p.collection.toLowerCase().includes(q);
      const matchRef = p.watchSpecs?.reference?.toLowerCase().includes(q);
      const matchMaterial = (p.watchSpecs?.caseMaterial || p.jewellerySpecs?.material || '').toLowerCase().includes(q);
      const matchGem = (p.jewellerySpecs?.gemstone || '').toLowerCase().includes(q);
      
      return matchName || matchBrand || matchModel || matchCollection || matchRef || matchMaterial || matchGem;
    });
  }, [query, products]);

  if (!isOpen) return null;

  const popularSearches = [
    'Rolex Daytona',
    'Datejust 41',
    'Cartier Love',
    'Patek Philippe Nautilus',
    'Van Cleef Alhambra',
    'Royal Oak 15500ST',
    'Bulgari Serpenti',
    'Yellow Diamond'
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-[#111315]/80 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="min-h-full flex items-start justify-center p-4 pt-16 sm:pt-24">
        <div className="relative bg-[#FAF8F5] border border-[#EBE7DE] max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-6">
          
          {/* Search Input Bar */}
          <div className="relative flex items-center border-b-2 border-[#16181A] pb-3">
            <Search className="w-6 h-6 text-[#8C6D37] mr-3" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by Maison, model, reference (e.g. 116500LN), gemstone..."
              className="w-full bg-transparent text-lg sm:text-xl font-serif text-[#16181A] placeholder:text-neutral-400 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-neutral-400 hover:text-[#16181A] p-1 mr-2"
              >
                <X className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="text-xs uppercase tracking-wider text-neutral-500 hover:text-[#16181A] ml-2 font-medium"
            >
              Close
            </button>
          </div>

          {/* Quick suggestions if query is empty */}
          {!query && (
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C6D37] font-semibold block">
                Popular Collector Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="bg-white border border-[#EBE7DE] hover:border-[#8C6D37] px-3 py-1.5 text-xs text-neutral-700 hover:text-[#16181A] transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          {query && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-neutral-500 border-b border-[#EBE7DE] pb-2">
                <span>{searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} found</span>
                <span>Search results for "{query}"</span>
              </div>

              {searchResults.length === 0 ? (
                <div className="py-12 text-center space-y-2">
                  <p className="text-sm font-serif text-[#16181A]">No direct catalog matches found.</p>
                  <p className="text-xs text-neutral-500 font-light">
                    Our European sourcing desk can procure off-market references. Submit a private inquiry.
                  </p>
                </div>
              ) : (
                <div className="max-h-96 overflow-y-auto space-y-3 pr-2">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        onClose();
                        onSelectProduct(product);
                      }}
                      className="bg-white p-3.5 border border-[#EBE7DE] hover:border-[#8C6D37] cursor-pointer flex items-center justify-between gap-4 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 border border-[#EBE7DE] overflow-hidden flex-shrink-0">
                          <WatermarkedProductImage
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            watermarkSize="xs"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] uppercase tracking-wider font-semibold text-[#8C6D37]">
                              {product.brand}
                            </span>
                            {product.type === 'watch' ? (
                              <span className="text-[8px] bg-neutral-100 text-neutral-600 px-1.5 py-0.5">Timepiece</span>
                            ) : (
                              <span className="text-[8px] bg-neutral-100 text-neutral-600 px-1.5 py-0.5">Fine Jewellery</span>
                            )}
                          </div>
                          <h5 className="text-xs font-serif text-[#16181A] group-hover:text-[#8C6D37] transition-colors">
                            {product.name}
                          </h5>
                          {product.watchSpecs?.reference && (
                            <span className="text-[10px] text-neutral-400 font-mono">
                              Ref: {product.watchSpecs.reference}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-right flex items-center gap-3">
                        <div>
                          <span className="text-xs font-semibold text-[#16181A] block">
                            {formatPrice(product.priceEUR, currency)}
                          </span>
                          <span className="text-[9px] text-neutral-500 uppercase">
                            {product.status}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-[#8C6D37] transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
