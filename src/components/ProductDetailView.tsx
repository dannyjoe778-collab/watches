import React, { useState } from 'react';
import { Product, CurrencyCode } from '../types';
import { formatPrice, getCurrencyDisclaimer } from '../utils/currency';
import { WatermarkedProductImage } from './WatermarkedProductImage';
import { 
  ShieldCheck, 
  Award, 
  Truck, 
  Lock, 
  Heart, 
  ArrowLeft, 
  MessageSquare, 
  ShoppingBag, 
  CheckCircle, 
  AlertCircle,
  HelpCircle,
  FileText,
  Clock,
  Sparkles,
  Share2
} from 'lucide-react';

interface ProductDetailViewProps {
  product: Product;
  currency: CurrencyCode;
  onBack: () => void;
  onAddToBag: (product: Product, selectedOption?: string) => void;
  onBuyNow: (product: Product, selectedOption?: string) => void;
  onRequestConsultation: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  currency,
  onBack,
  onAddToBag,
  onBuyNow,
  onRequestConsultation,
  isWishlisted,
  onToggleWishlist
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState<string>(
    product.jewellerySpecs?.materialOptions?.[0] || product.jewellerySpecs?.material || ''
  );
  const [activeTab, setActiveTab] = useState<'specs' | 'provenance' | 'authentication' | 'shipping'>('specs');
  const [copiedLink, setCopiedLink] = useState(false);

  const images = product.images.length > 0 ? product.images : ['https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85'];
  const isSoldOrReserved = product.status === 'Sold' || product.status === 'Reserved';
  const isHighValue = product.isHighValuePrivateConsultationOnly || product.priceEUR >= 40000;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between pb-6 border-b border-[#EBE7DE] mb-8 text-xs">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-neutral-600 hover:text-[#8C6D37] transition-colors font-medium uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Catalogue</span>
          </button>

          <div className="flex items-center gap-4 text-neutral-500">
            <span className="hidden sm:inline font-mono text-[11px]">
              Item #{product.id.toUpperCase()}
            </span>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 hover:text-[#16181A] transition-colors"
              title="Copy link"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'Link Copied' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Sample Listing Disclaimer Banner if applicable */}
        {product.isSampleListing && (
          <div className="bg-amber-50 border border-amber-300 p-4 mb-8 flex items-start gap-3 text-xs text-amber-900">
            <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
            <div>
              <strong>SAMPLE LISTING — VERIFY AVAILABILITY:</strong> This reference is maintained as a catalogue reference piece. Specific serial, provenance documents, and exact delivery timeframe will be confirmed upon private specialist inquiry prior to contract finalisation.
            </div>
          </div>
        )}

        {/* Main 2-Column Product Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Main Viewport */}
            <div className="relative aspect-[4/3] bg-[#F5F2EB] border border-[#EBE7DE] overflow-hidden group">
              <WatermarkedProductImage
                src={images[selectedImageIndex]}
                alt={`${product.brand} ${product.name} large view`}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                watermarkSize="lg"
                watermarkPosition="bottom-right"
                priority={true}
              />

              {/* Badges on image */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="bg-[#16181A] text-[#E5D3B3] text-[10px] uppercase tracking-[0.2em] px-3 py-1 font-semibold border border-[#8C6D37]/40 shadow-sm">
                  {product.badge}
                </span>
                {product.status !== 'Available' && (
                  <span className="bg-white text-[#16181A] text-[10px] uppercase tracking-wider px-2.5 py-1 font-bold border border-neutral-300 shadow-sm">
                    Status: {product.status}
                  </span>
                )}
              </div>

              {/* Wishlist toggle */}
              <button
                onClick={() => onToggleWishlist(product.id)}
                className={`absolute top-4 right-4 p-3 rounded-full transition-all shadow-md ${
                  isWishlisted 
                    ? 'bg-[#8C6D37] text-white' 
                    : 'bg-white/90 text-[#16181A] hover:text-[#8C6D37]'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Thumbnails Gallery */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative aspect-square border overflow-hidden transition-all ${
                      selectedImageIndex === idx 
                        ? 'border-[#8C6D37] ring-1 ring-[#8C6D37]' 
                        : 'border-[#EBE7DE] hover:border-neutral-400 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <WatermarkedProductImage
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                      watermarkSize="xs"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Guarantee Cards */}
            <div className="grid grid-cols-3 gap-3 pt-6 text-center text-xs">
              <div className="bg-white p-3.5 border border-[#EBE7DE]">
                <ShieldCheck className="w-5 h-5 text-[#8C6D37] mx-auto mb-1.5" />
                <span className="font-semibold text-[11px] block uppercase tracking-wider text-[#16181A]">
                  Verified Authenticity
                </span>
                <span className="text-[10px] text-neutral-500 font-light">
                  8-Point Workshop Review
                </span>
              </div>

              <div className="bg-white p-3.5 border border-[#EBE7DE]">
                <Truck className="w-5 h-5 text-[#8C6D37] mx-auto mb-1.5" />
                <span className="font-semibold text-[11px] block uppercase tracking-wider text-[#16181A]">
                  Insured Armoured Courier
                </span>
                <span className="text-[10px] text-neutral-500 font-light">
                  Direct European Dispatch
                </span>
              </div>

              <div className="bg-white p-3.5 border border-[#EBE7DE]">
                <Lock className="w-5 h-5 text-[#8C6D37] mx-auto mb-1.5" />
                <span className="font-semibold text-[11px] block uppercase tracking-wider text-[#16181A]">
                  Escrow Protection
                </span>
                <span className="text-[10px] text-neutral-500 font-light">
                  SEPA / Wire Security
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Information & Interactive Ordering */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              {/* Maison & Collection Tag */}
              <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8C6D37]">
                  {product.brand}
                </span>
                <span className="text-neutral-500 uppercase tracking-wider text-[11px]">
                  {product.collection}
                </span>
              </div>

              {/* Title & Model */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#16181A] font-light leading-tight mb-2">
                {product.name}
              </h1>

              {product.watchSpecs?.reference && (
                <div className="inline-block bg-[#EBE7DE]/70 px-2.5 py-1 text-[11px] font-mono text-neutral-700 mb-4 border border-[#EBE7DE]">
                  Reference: <strong>{product.watchSpecs.reference}</strong>
                </div>
              )}

              {/* Price & Currency */}
              <div className="bg-white p-5 border border-[#EBE7DE] mb-6">
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl sm:text-3xl font-medium text-[#16181A] tracking-tight">
                    {formatPrice(product.priceEUR, currency)}
                  </span>
                  <span className="text-xs text-emerald-800 font-semibold uppercase tracking-wider">
                    ● {product.status}
                  </span>
                </div>
                <p className="text-[11px] text-neutral-500 mt-1 font-light leading-relaxed">
                  {getCurrencyDisclaimer(currency)}
                </p>
              </div>

              {/* Material Selector for Jewellery with Options (e.g. Cartier Love Bracelet) */}
              {product.jewellerySpecs?.materialOptions && product.jewellerySpecs.materialOptions.length > 1 && (
                <div className="mb-6">
                  <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-800 mb-2">
                    Select Precious Gold Alloy:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {product.jewellerySpecs.materialOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setSelectedMaterial(opt)}
                        className={`py-2 px-3 text-xs border text-center transition-all ${
                          selectedMaterial === opt 
                            ? 'border-[#8C6D37] bg-[#8C6D37]/10 font-semibold text-[#16181A] ring-1 ring-[#8C6D37]' 
                            : 'border-[#EBE7DE] bg-white text-neutral-700 hover:border-neutral-400'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="text-xs text-neutral-700 leading-relaxed font-light mb-6 space-y-2">
                <p>{product.description}</p>
              </div>

              {/* CTAs Section: Priority logic based on value & state */}
              <div className="space-y-3 pt-2">
                {isHighValue ? (
                  // For High-Value / Private Sale pieces (€40,000+ or designated)
                  <div className="space-y-3">
                    <button
                      id="cta-private-consultation-primary"
                      onClick={() => onRequestConsultation(product)}
                      className="w-full bg-[#16181A] hover:bg-[#8C6D37] text-[#FAF8F5] py-4 px-6 text-xs uppercase tracking-[0.2em] font-semibold transition-all flex items-center justify-center gap-3 shadow-lg"
                    >
                      <Sparkles className="w-4 h-4 text-[#8C6D37]" />
                      <span>REQUEST PRIVATE CONSULTATION</span>
                    </button>

                    <div className="text-center text-[11px] text-neutral-500 italic">
                      High horology & bespoke high jewellery acquisitions are accompanied by confidential specialist dossier and private viewing options.
                    </div>
                  </div>
                ) : (
                  // Standard Purchase Flow with Buy Now and Add to Bag
                  <div className="space-y-3">
                    {!isSoldOrReserved ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          id="cta-buy-now"
                          onClick={() => onBuyNow(product, selectedMaterial)}
                          className="bg-[#16181A] hover:bg-[#8C6D37] text-[#FAF8F5] py-4 px-4 text-xs uppercase tracking-[0.18em] font-semibold transition-colors flex items-center justify-center gap-2"
                        >
                          <span>BUY NOW</span>
                          <span>→</span>
                        </button>

                        <button
                          id="cta-add-to-bag"
                          onClick={() => onAddToBag(product, selectedMaterial)}
                          className="border border-[#16181A] hover:bg-[#16181A] hover:text-[#FAF8F5] text-[#16181A] py-4 px-4 text-xs uppercase tracking-[0.18em] font-semibold transition-colors flex items-center justify-center gap-2 bg-transparent"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          <span>ADD TO BAG</span>
                        </button>
                      </div>
                    ) : (
                      <div className="p-3.5 bg-neutral-100 text-neutral-600 text-xs text-center border border-neutral-300">
                        This piece is currently {product.status}. You may submit a sourcing request for an equivalent reference.
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => onRequestConsultation(product)}
                        className="py-2.5 px-3 text-[11px] uppercase tracking-wider text-neutral-700 hover:text-[#8C6D37] border border-[#EBE7DE] hover:border-[#8C6D37] bg-white transition-colors flex items-center justify-center gap-1.5"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Private Consultation</span>
                      </button>

                      <button
                        onClick={() => onRequestConsultation(product)}
                        className="py-2.5 px-3 text-[11px] uppercase tracking-wider text-neutral-700 hover:text-[#8C6D37] border border-[#EBE7DE] hover:border-[#8C6D37] bg-white transition-colors flex items-center justify-center gap-1.5"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>Request More Info</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Structured Specifications & Provenance Tabs */}
            <div className="pt-8 border-t border-[#EBE7DE]">
              <div className="flex border-b border-[#EBE7DE] text-xs font-semibold uppercase tracking-wider">
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-3 pr-4 transition-colors ${
                    activeTab === 'specs' 
                      ? 'text-[#8C6D37] border-b-2 border-[#8C6D37]' 
                      : 'text-neutral-500 hover:text-[#16181A]'
                  }`}
                >
                  Technical Specifications
                </button>
                <button
                  onClick={() => setActiveTab('provenance')}
                  className={`pb-3 px-4 transition-colors ${
                    activeTab === 'provenance' 
                      ? 'text-[#8C6D37] border-b-2 border-[#8C6D37]' 
                      : 'text-neutral-500 hover:text-[#16181A]'
                  }`}
                >
                  Provenance & Box/Papers
                </button>
                <button
                  onClick={() => setActiveTab('shipping')}
                  className={`pb-3 pl-4 transition-colors ${
                    activeTab === 'shipping' 
                      ? 'text-[#8C6D37] border-b-2 border-[#8C6D37]' 
                      : 'text-neutral-500 hover:text-[#16181A]'
                  }`}
                >
                  Insured Transit
                </button>
              </div>

              {/* Tab 1: Specifications */}
              {activeTab === 'specs' && (
                <div className="py-4 text-xs space-y-2.5">
                  <div className="grid grid-cols-2 py-1.5 border-b border-[#EBE7DE]/60">
                    <span className="text-neutral-500">Maison / Brand</span>
                    <span className="font-semibold text-neutral-900">{product.brand}</span>
                  </div>
                  <div className="grid grid-cols-2 py-1.5 border-b border-[#EBE7DE]/60">
                    <span className="text-neutral-500">Model / Designation</span>
                    <span className="font-semibold text-neutral-900">{product.model}</span>
                  </div>

                  {product.watchSpecs && (
                    <>
                      <div className="grid grid-cols-2 py-1.5 border-b border-[#EBE7DE]/60">
                        <span className="text-neutral-500">Reference Number</span>
                        <span className="font-mono text-neutral-900 font-medium">{product.watchSpecs.reference}</span>
                      </div>
                      <div className="grid grid-cols-2 py-1.5 border-b border-[#EBE7DE]/60">
                        <span className="text-neutral-500">Condition Rating</span>
                        <span className="text-neutral-900 font-medium">{product.watchSpecs.condition}</span>
                      </div>
                      <div className="grid grid-cols-2 py-1.5 border-b border-[#EBE7DE]/60">
                        <span className="text-neutral-500">Production Year</span>
                        <span className="text-neutral-900">{product.watchSpecs.year}</span>
                      </div>
                      <div className="grid grid-cols-2 py-1.5 border-b border-[#EBE7DE]/60">
                        <span className="text-neutral-500">Movement Calibre</span>
                        <span className="text-neutral-900">{product.watchSpecs.movement}</span>
                      </div>
                      <div className="grid grid-cols-2 py-1.5 border-b border-[#EBE7DE]/60">
                        <span className="text-neutral-500">Case Material</span>
                        <span className="text-neutral-900">{product.watchSpecs.caseMaterial}</span>
                      </div>
                      <div className="grid grid-cols-2 py-1.5 border-b border-[#EBE7DE]/60">
                        <span className="text-neutral-500">Case Dimensions</span>
                        <span className="text-neutral-900">{product.watchSpecs.caseSize}</span>
                      </div>
                      {product.watchSpecs.dial && (
                        <div className="grid grid-cols-2 py-1.5 border-b border-[#EBE7DE]/60">
                          <span className="text-neutral-500">Dial Specification</span>
                          <span className="text-neutral-900">{product.watchSpecs.dial}</span>
                        </div>
                      )}
                      <div className="grid grid-cols-2 py-1.5 border-b border-[#EBE7DE]/60">
                        <span className="text-neutral-500">Bracelet & Clasp</span>
                        <span className="text-neutral-900">{product.watchSpecs.bracelet}</span>
                      </div>
                    </>
                  )}

                  {product.jewellerySpecs && (
                    <>
                      <div className="grid grid-cols-2 py-1.5 border-b border-[#EBE7DE]/60">
                        <span className="text-neutral-500">Precious Metal Alloy</span>
                        <span className="font-semibold text-neutral-900">{product.jewellerySpecs.material}</span>
                      </div>
                      {product.jewellerySpecs.dimensions && (
                        <div className="grid grid-cols-2 py-1.5 border-b border-[#EBE7DE]/60">
                          <span className="text-neutral-500">Dimensions / Sizing</span>
                          <span className="text-neutral-900">{product.jewellerySpecs.dimensions}</span>
                        </div>
                      )}

                      {/* 4Cs & Gemstone Disclosures */}
                      {product.jewellerySpecs.gemstoneSpecs && (
                        <>
                          <div className="grid grid-cols-2 py-1.5 border-b border-[#EBE7DE]/60">
                            <span className="text-neutral-500">Gemstone Carat Weight</span>
                            <span className="font-semibold text-neutral-900">{product.jewellerySpecs.gemstoneSpecs.carat || 'Documented'}</span>
                          </div>
                          {product.jewellerySpecs.gemstoneSpecs.cut && (
                            <div className="grid grid-cols-2 py-1.5 border-b border-[#EBE7DE]/60">
                              <span className="text-neutral-500">Cut & Shape</span>
                              <span className="text-neutral-900">{product.jewellerySpecs.gemstoneSpecs.cut}</span>
                            </div>
                          )}
                          {product.jewellerySpecs.gemstoneSpecs.colour && (
                            <div className="grid grid-cols-2 py-1.5 border-b border-[#EBE7DE]/60">
                              <span className="text-neutral-500">Colour Grade</span>
                              <span className="text-neutral-900">{product.jewellerySpecs.gemstoneSpecs.colour}</span>
                            </div>
                          )}
                          {product.jewellerySpecs.gemstoneSpecs.clarity && (
                            <div className="grid grid-cols-2 py-1.5 border-b border-[#EBE7DE]/60">
                              <span className="text-neutral-500">Clarity Grade</span>
                              <span className="text-neutral-900">{product.jewellerySpecs.gemstoneSpecs.clarity}</span>
                            </div>
                          )}
                          {product.jewellerySpecs.gemstoneSpecs.origin && (
                            <div className="grid grid-cols-2 py-1.5 border-b border-[#EBE7DE]/60">
                              <span className="text-neutral-500">Documented Origin</span>
                              <span className="text-neutral-900">{product.jewellerySpecs.gemstoneSpecs.origin}</span>
                            </div>
                          )}
                          {product.jewellerySpecs.gemstoneSpecs.certificateLab && (
                            <div className="grid grid-cols-2 py-1.5 border-b border-[#EBE7DE]/60">
                              <span className="text-neutral-500">Laboratory Report</span>
                              <span className="text-[#8C6D37] font-semibold">{product.jewellerySpecs.gemstoneSpecs.certificateLab}</span>
                            </div>
                          )}
                          {product.jewellerySpecs.gemstoneSpecs.treatment && (
                            <div className="grid grid-cols-2 py-1.5 border-b border-[#EBE7DE]/60">
                              <span className="text-neutral-500">Treatment Assessment</span>
                              <span className="text-neutral-900">{product.jewellerySpecs.gemstoneSpecs.treatment}</span>
                            </div>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* Tab 2: Provenance & Box/Papers */}
              {activeTab === 'provenance' && (
                <div className="py-4 text-xs space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white p-3 border border-[#EBE7DE] flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#8C6D37]" />
                      <div>
                        <span className="block text-[10px] text-neutral-500 uppercase">Original Box</span>
                        <span className="font-semibold text-neutral-900">
                          {product.watchSpecs?.box || product.jewellerySpecs?.box ? 'Included & Inspected' : 'Specification varies by piece'}
                        </span>
                      </div>
                    </div>

                    <div className="bg-white p-3 border border-[#EBE7DE] flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#8C6D37]" />
                      <div>
                        <span className="block text-[10px] text-neutral-500 uppercase">Original Papers / Card</span>
                        <span className="font-semibold text-neutral-900">
                          {product.watchSpecs?.papers || product.jewellerySpecs?.papers ? 'Present & Verified' : 'Specification varies by piece'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 border border-[#EBE7DE] space-y-2">
                    <h5 className="font-semibold uppercase tracking-wider text-[11px] text-[#8C6D37]">
                      Provenance Record
                    </h5>
                    <p className="text-neutral-700 leading-relaxed font-light">
                      {product.watchSpecs?.provenanceNotes || product.jewellerySpecs?.provenanceNotes || 'Independently sourced through vetted European collector estates.'}
                    </p>
                    {product.watchSpecs?.certificate && (
                      <div className="text-[11px] text-neutral-600 pt-2 border-t border-[#EBE7DE]">
                        <strong>Documentation:</strong> {product.watchSpecs.certificate}
                      </div>
                    )}
                  </div>

                  <div className="text-[11px] text-neutral-500 italic">
                    Serial numbers are checked against manufacturer databases and police lost-and-stolen registers prior to cataloguing. Serial numbers are concealed in public listings for buyer privacy.
                  </div>
                </div>
              )}

              {/* Tab 3: Insured Shipping */}
              {activeTab === 'shipping' && (
                <div className="py-4 text-xs space-y-3 text-neutral-700 leading-relaxed font-light">
                  <p>
                    <strong>European Express Armoured Transit:</strong> High-value items are dispatched using specialized insured couriers (Ferrari Logistics, Malca-Amit, Brinks, or dedicated DHL Express Insured).
                  </p>
                  <ul className="list-disc pl-4 space-y-1 text-[11px]">
                    <li>Tamper-evident tamper seals applied in vault</li>
                    <li>Full replacement value insurance active throughout transit</li>
                    <li>Adult signature and photo ID required upon delivery</li>
                    <li>Complimentary insured delivery within France, Germany, Italy, Switzerland, UK & EU</li>
                  </ul>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
