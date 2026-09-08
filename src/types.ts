export type CurrencyCode = 'EUR' | 'GBP' | 'CHF' | 'USD';

export type ProductType = 'watch' | 'jewellery';

export type ProductStatus = 'Available' | 'Reserved' | 'Sold' | 'New' | 'Coming Soon';

export type ProductBadge = 'AUTHENTICATED' | 'CERTIFIED' | 'SAMPLE LISTING' | 'NEW' | 'PRIVATE SALE';

export type WatchCategory = 
  | 'Luxury Sports Watch' 
  | 'Professional Diving Watch' 
  | 'Classic Luxury Watch' 
  | 'Luxury Chronograph' 
  | 'High Horology Sports Watch' 
  | 'Luxury Iconic Watch' 
  | 'Luxury Dress Watch' 
  | 'Haute Horlogerie';

export type JewelleryCategory = 
  | 'Bracelets' 
  | 'Necklaces' 
  | 'Rings' 
  | 'Earrings' 
  | 'High Jewellery' 
  | 'Exceptional Gemstone';

export interface WatchSpecifications {
  reference: string;
  condition: 'Unworn / Mint' | 'Exceptional' | 'Very Good' | 'Collector Vintage' | 'Specification varies by individual piece';
  year: string; // e.g. "2023", "2021", "Circa 1998", "Specification varies by individual piece"
  movement: string; // e.g. "Automatic Calibre 3285", "Manual Wind Calibre 1861"
  caseMaterial: string; // e.g. "Oystersteel", "18K Yellow Gold", "Platinum"
  bracelet: string; // e.g. "Jubilee (Oystersteel)", "Oysterflex", "Alligator Leather"
  caseSize: string; // e.g. "40 mm", "41 mm", "38.5 mm"
  dial?: string;
  bezel?: string;
  box: boolean;
  papers: boolean;
  certificate?: string;
  provenanceNotes?: string;
  serialNumberStatus: 'Verified against registry' | 'Concealed for buyer privacy' | 'Specification varies';
}

export interface GemstoneSpecifications {
  carat?: string;
  cut?: string;
  colour?: string;
  clarity?: string;
  origin?: string; // Only when documented
  certificateLab?: string; // e.g. "GIA #22149812", "HRD Antwerp", "Gübelin Gem Lab" (only when actually available)
  treatment?: string; // e.g. "No indication of thermal treatment", "Standard oiling"
}

export interface JewellerySpecifications {
  material: string; // e.g. "18K Yellow Gold", "Platinum 950", "18K Rose Gold"
  materialOptions?: string[]; // e.g. ["18K Yellow Gold", "18K White Gold", "18K Rose Gold"]
  dimensions?: string; // e.g. "Size 17 (17 cm)", "Chain 42 cm"
  gemstone?: string;
  gemstoneSpecs?: GemstoneSpecifications;
  box: boolean;
  papers: boolean;
  certificate?: string;
  provenanceNotes?: string;
}

export interface Product {
  id: string;
  type: ProductType;
  brand: string;
  name: string;
  model: string;
  category: WatchCategory | JewelleryCategory;
  collection: string; // e.g. "Rolex Collection", "Cartier Collection", "Rare & Exceptional"
  priceEUR: number;
  status: ProductStatus;
  badge: ProductBadge;
  isHighValuePrivateConsultationOnly?: boolean; // >€40k or private sale CTA
  isSampleListing?: boolean;
  description: string;
  images: string[];
  watchSpecs?: WatchSpecifications;
  jewellerySpecs?: JewellerySpecifications;
  seoTitle?: string;
  seoDescription?: string;
  isFeaturedHomepage?: boolean;
  isNewArrival?: boolean;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  selectedOption?: string;
  selectedMaterial?: string;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface ConsultationRequest {
  id: string;
  productId?: string;
  productName?: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  interestedCategory: string;
  budget: string;
  message: string;
  status: 'Pending' | 'Specialist Assigned' | 'Contacted' | 'Completed' | 'New' | 'In Progress';
  createdAt: string;
}

export interface OrderCustomer {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

export interface Order {
  id: string;
  orderNumber?: string;
  customer: OrderCustomer;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  currency: CurrencyCode;
  totalAmountEUR: number;
  totalEUR?: number;
  totalConverted?: number;
  paymentMethod: string;
  status: 'Pending Verification' | 'Payment Confirmed' | 'Insured In Transit' | 'Delivered' | 'Payment Pending' | 'Under Authenticator Review' | 'In Secure Vault';
  trackingNumber?: string;
  items: CartItem[];
  createdAt: string;
  notes?: string;
}

export type ActiveTab = 
  | 'home'
  | 'shop'
  | 'watches'
  | 'jewellery'
  | 'new-arrivals'
  | 'collections'
  | 'authentication'
  | 'private-clients'
  | 'shipping'
  | 'about'
  | 'contact'
  | 'terms'
  | 'privacy'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'order-tracking'
  | 'admin';
