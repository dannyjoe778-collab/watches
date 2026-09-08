import React, { useState, useEffect } from 'react';
import { 
  Product, 
  CurrencyCode, 
  ActiveTab, 
  CartItem, 
  ConsultationRequest, 
  Order 
} from './types';
import { INITIAL_PRODUCTS as PRODUCTS } from './data/products';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustSection } from './components/TrustSection';
import { EditorialIntro } from './components/EditorialIntro';
import { FeaturedWatchesSection } from './components/FeaturedWatchesSection';
import { WatchEditorialBanner } from './components/WatchEditorialBanner';
import { JewelleryShowcaseSection } from './components/JewelleryShowcaseSection';
import { SignatureCollectionSection } from './components/SignatureCollectionSection';
import { BrandVaultShowcaseSection } from './components/BrandVaultShowcaseSection';
import { PrivateClientHomepageSection } from './components/PrivateClientHomepageSection';
import { AuthenticityProcessSection } from './components/AuthenticityProcessSection';
import { NewArrivalsCarousel } from './components/NewArrivalsCarousel';
import { CollectorsJournalSection } from './components/CollectorsJournalSection';
import { PrivateListNewsletter } from './components/PrivateListNewsletter';
import { FAQSection } from './components/FAQSection';
import { NewArrivalsSection } from './components/NewArrivalsSection';
import { WatchesCatalogue } from './components/WatchesCatalogue';
import { JewelleryCatalogue } from './components/JewelleryCatalogue';
import { ShopCatalogue } from './components/ShopCatalogue';
import { CollectionsView } from './components/CollectionsView';
import { AuthenticationPage } from './components/AuthenticationPage';
import { PrivateClientServices } from './components/PrivateClientServices';
import { AboutUsPage } from './components/AboutUsPage';
import { ShippingGuidePage } from './components/ShippingGuidePage';
import { ContactPage } from './components/ContactPage';
import { TermsAndConditionsPage } from './components/TermsAndConditionsPage';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { ProductDetailView } from './components/ProductDetailView';
import { CartPage } from './components/CartPage';
import { WishlistDrawer } from './components/WishlistDrawer';
import { LiveSearchModal } from './components/LiveSearchModal';
import { CheckoutPage } from './components/CheckoutPage';
import { ConsultationModal } from './components/ConsultationModal';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { Check, ShieldCheck, Sparkles } from 'lucide-react';

export default function App() {
  // Navigation & View States
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [currency, setCurrency] = useState<CurrencyCode>('EUR');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null);
  const [brandFilter, setBrandFilter] = useState<string>('all');
  const [jewelleryCategoryFilter, setJewelleryCategoryFilter] = useState<string>('all');

  const CURRENT_CATALOG_VERSION = 'ac_v9_rebrand_catalog';

  // Products state (loads the full authenticated Aurelia & Crown catalog)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const storedVersion = localStorage.getItem('ac_catalog_version');
      const saved = localStorage.getItem('ac_products');
      if (saved && storedVersion === CURRENT_CATALOG_VERSION) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= PRODUCTS.length) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error reading stored products', e);
    }
    // Always fallback to latest PRODUCTS array containing all newly scraped products
    try {
      localStorage.setItem('ac_catalog_version', CURRENT_CATALOG_VERSION);
      localStorage.setItem('ac_products', JSON.stringify(PRODUCTS));
    } catch (e) {
      // ignore
    }
    return PRODUCTS;
  });

  // Shopping Bag State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('ac_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // Wishlist State
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('ac_wishlist');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0 && PRODUCTS.some(p => parsed.includes(p.id))) {
          return parsed;
        }
      } catch (e) {
        // fallback
      }
    }
    return [PRODUCTS[0]?.id || 'ac-w-01', PRODUCTS[1]?.id || 'ac-w-02'];
  });

  // Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('ac_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [
      {
        id: 'AC-782194',
        items: [
          {
            product: PRODUCTS[0],
            quantity: 1,
            selectedOption: '18K White Gold'
          }
        ],
        totalAmountEUR: 32500,
        currency: 'EUR',
        status: 'Insured In Transit',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        customer: {
          fullName: 'Baron Henri de Montmirail',
          email: 'h.montmirail@chateau.fr',
          phone: '+33 6 44 22 11 00',
          address: '8 Place Vendôme',
          city: 'Paris',
          country: 'France',
          postalCode: '75001'
        },
        paymentMethod: 'SEPA Escrow Wire Transfer'
      }
    ];
  });

  // Consultation Requests State
  const [consultations, setConsultations] = useState<ConsultationRequest[]>(() => {
    const saved = localStorage.getItem('ac_consultations');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [
      {
        id: 'CR-9041',
        productName: 'Patek Philippe Nautilus 5711/1A-010',
        fullName: 'Alexander von Berg',
        email: 'a.vonberg@munich-holdings.de',
        phone: '+49 89 210200',
        country: 'Germany',
        interestedCategory: 'Private Rare Watch Sourcing',
        budget: '€100,000 – €250,000+',
        message: 'Interested in acquiring an unpolished 2018–2020 single-owner 5711/1A with archive papers.',
        status: 'In Progress',
        createdAt: new Date(Date.now() - 86400000 * 1).toISOString()
      }
    ];
  });

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [consultationProduct, setConsultationProduct] = useState<Product | null>(null);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);

  // Luxury Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Ensure returning users get latest imported Aurelia & Crown catalog automatically
  useEffect(() => {
    try {
      const storedVersion = localStorage.getItem('ac_catalog_version');
      const saved = localStorage.getItem('ac_products');
      if (storedVersion !== CURRENT_CATALOG_VERSION || !saved || JSON.parse(saved).length < PRODUCTS.length) {
        localStorage.setItem('ac_catalog_version', CURRENT_CATALOG_VERSION);
        localStorage.setItem('ac_products', JSON.stringify(PRODUCTS));
        setProducts(PRODUCTS);
      }
    } catch (e) {
      setProducts(PRODUCTS);
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('ac_products', JSON.stringify(products));
    localStorage.setItem('ac_catalog_version', CURRENT_CATALOG_VERSION);
  }, [products]);

  useEffect(() => {
    localStorage.setItem('ac_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('ac_wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  useEffect(() => {
    localStorage.setItem('ac_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('ac_consultations', JSON.stringify(consultations));
  }, [consultations]);

  // Scroll to top on view change
  const handleTabChange = (tab: ActiveTab, opt?: { collectionId?: string; brand?: string; category?: string }) => {
    setSelectedProduct(null);
    if (opt?.collectionId) setSelectedCollectionId(opt.collectionId);
    if (opt?.brand) {
      setBrandFilter(opt.brand);
    } else if (tab === 'watches' || tab === 'shop') {
      setBrandFilter('all');
    }
    if (opt?.category) setJewelleryCategoryFilter(opt.category);
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Select Product for Detail View
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add to Bag
  const handleAddToBag = (product: Product, selectedOption?: string) => {
    setCartItems(prev => {
      const existing = prev.find(
        i => i.product.id === product.id && i.selectedOption === selectedOption
      );
      if (existing) {
        return prev.map(i => 
          i.product.id === product.id && i.selectedOption === selectedOption
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { product, quantity: 1, selectedOption }];
    });

    showToast(`Added "${product.brand} ${product.name}" to your shopping bag.`);
  };

  // Buy Now (Immediate Checkout)
  const handleBuyNow = (product: Product, selectedOption?: string) => {
    handleAddToBag(product, selectedOption);
    setSelectedProduct(null);
    setActiveTab('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Update Cart Item Quantity
  const handleUpdateQuantity = (productId: string, quantity: number, selectedOption?: string) => {
    if (quantity <= 0) {
      handleRemoveFromBag(productId, selectedOption);
      return;
    }
    setCartItems(prev => prev.map(i => 
      i.product.id === productId && i.selectedOption === selectedOption
        ? { ...i, quantity }
        : i
    ));
  };

  // Remove from Bag
  const handleRemoveFromBag = (productId: string, selectedOption?: string) => {
    setCartItems(prev => prev.filter(i => 
      !(i.product.id === productId && i.selectedOption === selectedOption)
    ));
  };

  // Toggle Wishlist
  const handleToggleWishlist = (productId: string) => {
    setWishlistIds(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed piece from your saved collection.');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved piece to your private portfolio.');
        return [...prev, productId];
      }
    });
  };

  // Request Consultation
  const handleOpenConsultationModal = (product?: Product) => {
    setConsultationProduct(product || null);
    setIsConsultationModalOpen(true);
  };

  // Submit Consultation Request
  const handleSubmitConsultation = (requestData: Omit<ConsultationRequest, 'id' | 'createdAt' | 'status'>) => {
    const newRequest: ConsultationRequest = {
      ...requestData,
      id: `CR-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'New',
      createdAt: new Date().toISOString()
    };
    setConsultations(prev => [newRequest, ...prev]);
    showToast('Consultation request transmitted confidentially to our European desk.');
  };

  // Complete Order from Checkout
  const handleOrderComplete = (order: Order) => {
    setOrders(prev => [order, ...prev]);
    setCartItems([]);
    showToast(`Order #${order.id} registered successfully.`);
  };

  // Admin Actions
  const handleUpdateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
    showToast(`Inventory updated for ${updated.name}`);
  };

  const handleAddProduct = (newProd: Product) => {
    setProducts(prev => [newProd, ...prev]);
    showToast(`Published ${newProd.name} to catalogue.`);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    showToast('Item removed from catalogue.');
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    showToast(`Order #${orderId} status updated to: ${status}`);
  };

  const handleUpdateConsultationStatus = (id: string, status: ConsultationRequest['status']) => {
    setConsultations(prev => prev.map(c => c.id === id ? { ...c, status } : c));
    showToast(`Consultation inquiry marked as: ${status}`);
  };

  // Wishlisted Products objects
  const wishlistProducts = products.filter(p => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#16181A] flex flex-col justify-between selection:bg-[#8C6D37]/20 selection:text-[#111315] font-sans antialiased">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#16181A] text-[#FAF8F5] px-5 py-3.5 border border-[#8C6D37] shadow-2xl flex items-center gap-3 text-xs animate-slide-up">
          <Sparkles className="w-4 h-4 text-[#8C6D37]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        currency={currency}
        setCurrency={setCurrency}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => handleTabChange('cart')}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {selectedProduct ? (
          /* Product Detail View */
          <ProductDetailView
            product={selectedProduct}
            currency={currency}
            onBack={() => setSelectedProduct(null)}
            onAddToBag={handleAddToBag}
            onBuyNow={handleBuyNow}
            onRequestConsultation={(prod) => handleOpenConsultationModal(prod)}
            isWishlisted={wishlistIds.includes(selectedProduct.id)}
            onToggleWishlist={handleToggleWishlist}
          />
        ) : activeTab === 'cart' ? (
          /* Shopping Cart Page */
          <CartPage
            items={cartItems}
            currency={currency}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveFromBag}
            setActiveTab={handleTabChange}
          />
        ) : activeTab === 'home' ? (
          /* Ultra-Luxury Homepage Layout */
          <div>
            {/* 1. Hero Section */}
            <Hero 
              currency={currency}
              setActiveTab={handleTabChange}
              onSelectProduct={handleSelectProduct}
            />

            {/* 2. Trust Strip */}
            <TrustSection setActiveTab={handleTabChange} />

            {/* 3. Editorial Introduction Spread */}
            <EditorialIntro setActiveTab={handleTabChange} />

            {/* 4. The Watch Collection (Featured Watches) */}
            <FeaturedWatchesSection
              products={products}
              currency={currency}
              onSelectProduct={handleSelectProduct}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              setActiveTab={handleTabChange}
            />

            {/* 5. Watch Editorial Banner (The Art of Mechanical Time) */}
            <WatchEditorialBanner setActiveTab={handleTabChange} />

            {/* 6. The Signature Collection (Rare Watches / High Jewellery / Gemstones) */}
            <SignatureCollectionSection setActiveTab={handleTabChange} />

            {/* 7. Private Client Section (Beyond The Collection) */}
            <PrivateClientHomepageSection
              onOpenConsultation={() => handleOpenConsultationModal()}
              setActiveTab={handleTabChange}
            />

            {/* 8. Authenticity Section (Authenticity is Everything) */}
            <AuthenticityProcessSection setActiveTab={handleTabChange} />

            {/* 9. The Collector's Journal Editorial Section */}
            <CollectorsJournalSection />

            {/* 10. Frequently Asked Questions */}
            <FAQSection />

            {/* 11. The Private List Newsletter Section */}
            <PrivateListNewsletter />
          </div>
        ) : activeTab === 'shop' ? (
          /* Aurelia & Crown Complete Shop Catalogue (Watches & Fine Jewellery) */
          <ShopCatalogue
            products={products}
            currency={currency}
            onSelectProduct={handleSelectProduct}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onQuickAddToBag={handleAddToBag}
            onRequestConsultation={handleOpenConsultationModal}
            initialBrandFilter={brandFilter !== 'all' ? brandFilter : undefined}
          />
        ) : activeTab === 'watches' ? (
          /* Watches Catalogue */
          <WatchesCatalogue
            products={products}
            currency={currency}
            onSelectProduct={handleSelectProduct}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onQuickAddToBag={handleAddToBag}
            onRequestConsultation={handleOpenConsultationModal}
            initialBrandFilter={brandFilter !== 'all' ? brandFilter : undefined}
          />
        ) : activeTab === 'jewellery' ? (
          /* Jewellery Catalogue */
          <JewelleryCatalogue
            products={products}
            currency={currency}
            onSelectProduct={handleSelectProduct}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onQuickAddToBag={handleAddToBag}
            onRequestConsultation={handleOpenConsultationModal}
            initialCategoryFilter={jewelleryCategoryFilter !== 'all' ? jewelleryCategoryFilter : undefined}
          />
        ) : activeTab === 'collections' ? (
          /* Curated Collections Hub */
          <CollectionsView
            products={products}
            currency={currency}
            onSelectProduct={handleSelectProduct}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onQuickAddToBag={handleAddToBag}
            onRequestConsultation={handleOpenConsultationModal}
            selectedCollectionId={selectedCollectionId}
            onClearCollectionFilter={() => setSelectedCollectionId(null)}
          />
        ) : activeTab === 'new-arrivals' ? (
          /* Standalone New Arrivals Page */
          <NewArrivalsSection
            products={products}
            currency={currency}
            onSelectProduct={handleSelectProduct}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onQuickAddToBag={handleAddToBag}
            onRequestConsultation={handleOpenConsultationModal}
            isStandalonePage={true}
          />
        ) : activeTab === 'authentication' ? (
          /* Authentication Page */
          <AuthenticationPage setActiveTab={handleTabChange} />
        ) : activeTab === 'private-clients' ? (
          /* Private Client Services Page */
          <PrivateClientServices onSubmitConsultation={handleSubmitConsultation} />
        ) : activeTab === 'about' ? (
          /* About Us Page */
          <AboutUsPage setActiveTab={handleTabChange} />
        ) : activeTab === 'shipping' ? (
          /* Insured Shipping Guide Page */
          <ShippingGuidePage setActiveTab={handleTabChange} />
        ) : activeTab === 'contact' ? (
          /* Contact & Private Salons Page */
          <ContactPage onSubmitConsultation={handleSubmitConsultation} />
        ) : activeTab === 'terms' ? (
          /* Terms & Conditions Page */
          <TermsAndConditionsPage setActiveTab={handleTabChange} />
        ) : activeTab === 'privacy' ? (
          /* Privacy Policy Page */
          <PrivacyPolicyPage setActiveTab={handleTabChange} />
        ) : activeTab === 'checkout' ? (
          /* Secure Luxury Checkout Page */
          <CheckoutPage
            items={cartItems}
            currency={currency}
            onBackToCatalogue={() => handleTabChange('watches')}
            onOrderComplete={handleOrderComplete}
          />
        ) : activeTab === 'admin' ? (
          /* Admin / Store Owner Dashboard */
          <AdminDashboard
            products={products}
            orders={orders}
            consultations={consultations}
            currency={currency}
            onUpdateProduct={handleUpdateProduct}
            onAddProduct={handleAddProduct}
            onDeleteProduct={handleDeleteProduct}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onUpdateConsultationStatus={handleUpdateConsultationStatus}
            onClose={() => handleTabChange('home')}
          />
        ) : null}
      </main>

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        currency={currency}
        onToggleWishlist={handleToggleWishlist}
        onSelectProduct={handleSelectProduct}
        onMoveToBag={handleAddToBag}
      />

      {/* Live Predictive Search Modal */}
      <LiveSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        currency={currency}
        onSelectProduct={handleSelectProduct}
      />

      {/* Confidential Consultation Modal */}
      <ConsultationModal
        product={consultationProduct}
        currency={currency}
        isOpen={isConsultationModalOpen}
        onClose={() => {
          setIsConsultationModalOpen(false);
          setConsultationProduct(null);
        }}
        onSubmitConsultation={handleSubmitConsultation}
      />

      {/* Footer */}
      <Footer setActiveTab={handleTabChange} />

    </div>
  );
}
