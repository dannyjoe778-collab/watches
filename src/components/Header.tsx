import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  Menu, 
  X, 
  ChevronDown, 
  ShieldCheck, 
  SlidersHorizontal,
  Clock,
  Sparkles
} from 'lucide-react';
import { ActiveTab, CurrencyCode } from '../types';
import { EXCHANGE_RATES } from '../utils/currency';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab, opt?: { collectionId?: string; brand?: string; category?: string }) => void;
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenAdmin: () => void;
  onSelectCollection?: (collectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  currency,
  setCurrency,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenAdmin,
  onSelectCollection
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [collectionsDropdownOpen, setCollectionsDropdownOpen] = useState(false);

  const [legalDropdownOpen, setLegalDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: ActiveTab; label: string }[] = [
    { id: 'home', label: 'HOME' },
    { id: 'shop', label: 'SHOP' },
    { id: 'watches', label: 'WATCHES' },
    { id: 'jewellery', label: 'JEWELLERY' },
    { id: 'new-arrivals', label: 'NEW ARRIVALS' },
    { id: 'collections', label: 'COLLECTIONS' },
    { id: 'private-clients', label: 'PRIVATE CLIENTS' },
    { id: 'authentication', label: 'AUTHENTICATION' },
    { id: 'about', label: 'ABOUT' },
    { id: 'contact', label: 'CONTACT US' },
  ];

  const legalLinks: { id: ActiveTab; label: string; desc: string }[] = [
    { id: 'terms', label: 'Terms & Conditions', desc: 'Provenance, Escrow & Purchase Policies' },
    { id: 'privacy', label: 'Privacy Policy', desc: 'GDPR Compliance & Collector Discretion' },
    { id: 'shipping', label: 'Shipping & Delivery', desc: 'Insured Armoured Courier Handover' },
  ];

  const brandCollections = [
    { id: 'rolex', name: 'Rolex Collection' },
    { id: 'patek-philippe', name: 'Patek Philippe' },
    { id: 'audemars-piguet', name: 'Audemars Piguet' },
    { id: 'cartier', name: 'Cartier' },
    { id: 'van-cleef-arpels', name: 'Van Cleef & Arpels' },
    { id: 'bulgari', name: 'Bulgari' },
    { id: 'tiffany-co', name: 'Tiffany & Co.' },
    { id: 'rare-exceptional', name: 'Rare & Exceptional' },
  ];

  return (
    <>
      {/* Top Banner: European Authenticity & Private Services */}
      <div className="bg-[#111315] text-[#FAF8F5] text-xs py-2 px-4 border-b border-[#2A2D32]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
          <div className="flex items-center justify-center gap-3 text-[#A8895E] font-medium tracking-wide">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
              ESTABLISHED EUROPEAN LUXURY SPECIALIST
            </span>
            <span className="hidden md:inline text-neutral-600">•</span>
            <span className="hidden md:inline text-[#E5D3B3]/80">
              FULLY INSURED COURIER DISPATCH ACROSS EUROPE
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button 
              onClick={() => { setActiveTab('private-clients'); }}
              className="text-[#FAF8F5]/80 hover:text-[#C5A880] transition-colors uppercase tracking-wider font-light"
            >
              Private Client Services
            </button>
            <span className="text-neutral-700">|</span>
            <button 
              onClick={() => { setActiveTab('terms'); }}
              className="hidden lg:inline text-[#FAF8F5]/80 hover:text-[#C5A880] transition-colors uppercase tracking-wider font-light"
            >
              Terms & Conditions
            </button>
            <span className="hidden lg:inline text-neutral-700">|</span>
            <button 
              onClick={() => { setActiveTab('privacy'); }}
              className="hidden lg:inline text-[#FAF8F5]/80 hover:text-[#C5A880] transition-colors uppercase tracking-wider font-light"
            >
              Privacy Policy
            </button>
            <span className="hidden lg:inline text-neutral-700">|</span>
            <button 
              onClick={() => { setActiveTab('order-tracking'); }}
              className="text-[#FAF8F5]/80 hover:text-[#C5A880] transition-colors uppercase tracking-wider font-light flex items-center gap-1"
            >
              <Clock className="w-3 h-3" /> Track Order
            </button>
            <span className="text-neutral-700">|</span>
            <button 
              onClick={onOpenAdmin}
              className="text-[#C5A880]/90 hover:text-[#FAF8F5] transition-colors uppercase tracking-wider font-medium flex items-center gap-1 text-[11px]"
              title="Store Owner Admin Panel"
            >
              <SlidersHorizontal className="w-3 h-3" /> Admin
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header 
        id="main-header"
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-sm border-b border-[#EBE7DE]' 
            : 'bg-[#FAF8F5] border-b border-[#EBE7DE]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Brand & Action Row */}
          <div className="flex items-center justify-between h-20 sm:h-24">
            {/* Left: Mobile Menu Toggle & Quick Links */}
            <div className="flex items-center gap-4 lg:w-1/4">
              <button
                id="mobile-menu-button"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 text-[#16181A] hover:text-[#C5A880] transition-colors"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              <button
                id="search-trigger-button"
                onClick={onOpenSearch}
                className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#16181A]/80 hover:text-[#16181A] transition-colors py-1.5 px-2 rounded hover:bg-[#EBE7DE]/50"
                aria-label="Search Catalogue"
              >
                <Search className="w-4 h-4 text-[#C5A880]" />
                <span className="hidden sm:inline font-medium">Search</span>
              </button>
            </div>

            {/* Center: Brand Name & Tagline */}
            <div className="flex flex-col items-center justify-center text-center cursor-pointer group lg:w-2/4"
              onClick={() => setActiveTab('home')}
            >
              <span className="text-2xl sm:text-3xl md:text-4xl font-serif tracking-[0.18em] uppercase text-[#16181A] font-light group-hover:text-[#8C6D37] transition-colors">
                AURELIA & CROWN
              </span>
              <span className="text-[10px] sm:text-xs tracking-[0.28em] uppercase text-[#8C6D37] font-medium mt-1">
                Exceptional Time. Timeless Luxury.
              </span>
            </div>

            {/* Right: Currency Selector, Wishlist, Shopping Bag */}
            <div className="flex items-center justify-end gap-3 sm:gap-5 lg:w-1/4">
              {/* Currency Selector */}
              <div className="relative">
                <button
                  id="currency-selector-button"
                  onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                  className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#16181A] hover:text-[#8C6D37] py-1.5 px-2.5 rounded border border-[#EBE7DE] hover:border-[#C5A880] transition-colors bg-[#FAF8F5]"
                  aria-label="Select Currency"
                >
                  <span>{currency}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#8C6D37]" />
                </button>

                {currencyDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setCurrencyDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-36 bg-[#FAF8F5] border border-[#EBE7DE] shadow-lg rounded-none py-1.5 z-20">
                      {(Object.keys(EXCHANGE_RATES) as CurrencyCode[]).map((code) => (
                        <button
                          key={code}
                          onClick={() => {
                            setCurrency(code);
                            setCurrencyDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3.5 py-1.5 text-xs flex items-center justify-between tracking-wide transition-colors ${
                            currency === code 
                              ? 'bg-[#EBE7DE] text-[#16181A] font-semibold' 
                              : 'text-neutral-700 hover:bg-[#FAF8F5]/60 hover:text-[#16181A]'
                          }`}
                        >
                          <span>{EXCHANGE_RATES[code].label}</span>
                          {currency === code && <span className="text-[#8C6D37] text-[10px]">●</span>}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Wishlist Icon */}
              <button
                id="wishlist-trigger-button"
                onClick={onOpenWishlist}
                className="relative p-2 text-[#16181A] hover:text-[#8C6D37] transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5 stroke-[1.5]" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#8C6D37] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Shopping Bag Icon */}
              <button
                id="shopping-bag-button"
                onClick={onOpenCart}
                className="relative p-2 text-[#16181A] hover:text-[#8C6D37] transition-colors flex items-center gap-2"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#16181A] text-[#FAF8F5] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center justify-center gap-7 py-3.5 border-t border-[#EBE7DE]/80 text-xs font-medium tracking-[0.14em] uppercase">
            {navLinks.map((link) => {
              if (link.id === 'collections') {
                return (
                  <div 
                    key={link.id} 
                    className="relative group"
                    onMouseEnter={() => setCollectionsDropdownOpen(true)}
                    onMouseLeave={() => setCollectionsDropdownOpen(false)}
                  >
                    <button
                      onClick={() => setActiveTab('collections')}
                      className={`flex items-center gap-1 py-1 transition-colors ${
                        activeTab === 'collections'
                          ? 'text-[#8C6D37] font-semibold border-b border-[#8C6D37]'
                          : 'text-[#16181A]/85 hover:text-[#8C6D37]'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
                    </button>

                    {collectionsDropdownOpen && (
                      <div className="absolute top-full -left-6 w-60 bg-[#FAF8F5] border border-[#EBE7DE] shadow-xl py-3 z-30 animate-in fade-in slide-in-from-top-1 duration-150">
                        <div className="px-4 py-1 text-[10px] tracking-widest text-[#8C6D37] font-semibold border-b border-[#EBE7DE] mb-2 uppercase">
                          Featured Maisons
                        </div>
                        {brandCollections.map((col) => (
                          <button
                            key={col.id}
                            onClick={() => {
                              if (onSelectCollection) onSelectCollection(col.id);
                              setActiveTab('collections');
                              setCollectionsDropdownOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 text-xs text-neutral-700 hover:text-[#16181A] hover:bg-[#EBE7DE]/60 transition-colors flex items-center justify-between"
                          >
                            <span>{col.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={link.id}
                  id={`nav-${link.id}`}
                  onClick={() => setActiveTab(link.id)}
                  className={`py-1 transition-colors relative whitespace-nowrap ${
                    activeTab === link.id
                      ? 'text-[#8C6D37] font-semibold border-b border-[#8C6D37]'
                      : 'text-[#16181A]/85 hover:text-[#8C6D37]'
                  }`}
                >
                  {link.label}
                  {link.id === 'shop' && (
                    <span className="ml-1 text-[9px] bg-[#16181A] text-[#FAF8F5] px-1.5 py-0.5 rounded-sm font-bold tracking-normal shadow-xs">
                      130+
                    </span>
                  )}
                  {link.id === 'new-arrivals' && (
                    <span className="ml-1 text-[9px] bg-[#C5A880]/20 text-[#8C6D37] px-1.5 py-0.5 rounded-sm font-semibold tracking-normal">
                      NEW
                    </span>
                  )}
                </button>
              );
            })}

            {/* Desktop Legal & Policies Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setLegalDropdownOpen(true)}
              onMouseLeave={() => setLegalDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1 py-1 transition-colors whitespace-nowrap ${
                  activeTab === 'terms' || activeTab === 'privacy'
                    ? 'text-[#8C6D37] font-semibold border-b border-[#8C6D37]'
                    : 'text-[#16181A]/85 hover:text-[#8C6D37]'
                }`}
              >
                <span>LEGAL & POLICIES</span>
                <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
              </button>

              {legalDropdownOpen && (
                <div className="absolute top-full right-0 w-64 bg-[#FAF8F5] border border-[#EBE7DE] shadow-xl py-3 z-30 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-4 py-1 text-[10px] tracking-widest text-[#8C6D37] font-semibold border-b border-[#EBE7DE] mb-2 uppercase">
                    Client Protections
                  </div>
                  {legalLinks.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setLegalDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-neutral-700 hover:text-[#16181A] hover:bg-[#EBE7DE]/60 transition-colors flex flex-col"
                    >
                      <span className="font-medium text-[#16181A]">{item.label}</span>
                      <span className="text-[10px] text-neutral-500 font-light">{item.desc}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#FAF8F5] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#EBE7DE]">
                <div>
                  <div className="text-lg font-serif tracking-widest text-[#16181A] uppercase">
                    AURELIA & CROWN
                  </div>
                  <div className="text-[9px] tracking-wider text-[#8C6D37] uppercase">
                    European Luxury Specialist
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-neutral-500 hover:text-[#16181A]"
                  aria-label="Close Navigation"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="py-6 space-y-4">
                <div className="text-[10px] tracking-widest text-[#8C6D37] uppercase font-semibold">
                  Main Navigation
                </div>
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => {
                      setActiveTab(link.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left py-2 text-sm tracking-widest uppercase transition-colors ${
                      activeTab === link.id 
                        ? 'text-[#8C6D37] font-semibold pl-2 border-l-2 border-[#8C6D37]' 
                        : 'text-neutral-800 hover:text-[#8C6D37]'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
                
                <div className="pt-4 border-t border-[#EBE7DE] space-y-3">
                  <div className="text-[10px] tracking-widest text-[#8C6D37] uppercase font-semibold">
                    Legal & Policies
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('terms');
                      setMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left py-1 text-xs tracking-wider uppercase transition-colors ${
                      activeTab === 'terms' ? 'text-[#8C6D37] font-semibold' : 'text-neutral-600 hover:text-[#8C6D37]'
                    }`}
                  >
                    Terms & Conditions
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('privacy');
                      setMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left py-1 text-xs tracking-wider uppercase transition-colors ${
                      activeTab === 'privacy' ? 'text-[#8C6D37] font-semibold' : 'text-neutral-600 hover:text-[#8C6D37]'
                    }`}
                  >
                    Privacy Policy (GDPR)
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('shipping');
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left py-1 text-xs tracking-wider uppercase text-neutral-600 hover:text-[#8C6D37]"
                  >
                    European Shipping & Vault Security
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('order-tracking');
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left py-1 text-xs tracking-wider uppercase text-neutral-600 hover:text-[#8C6D37]"
                  >
                    Track Insured Order
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#EBE7DE]">
              <div className="text-[11px] text-neutral-500 mb-3 tracking-wide">
                Primary Currency: <span className="font-semibold text-neutral-800">{currency}</span>
              </div>
              <button
                onClick={() => {
                  onOpenAdmin();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 bg-[#16181A] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-[#8C6D37] transition-colors flex items-center justify-center gap-2"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Store Owner Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
