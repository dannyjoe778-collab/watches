import { Product } from '../types';
import { INITIAL_PRODUCTS } from '../data/products';

export interface BrandSubfolderInfo {
  brand: string;
  subfolderPath: string;
  origin: string;
  tagline: string;
  description: string;
  iconName: string;
  count: number;
  watches: Product[];
  startingPriceEUR: number;
  sampleImages: string[];
}

export const WATCH_BRAND_NAMES = [
  "Rolex",
  "Cartier",
  "Patek Philippe",
  "Audemars Piguet",
  "Omega",
  "Breitling",
  "Tudor",
  "IWC Schaffhausen",
  "Panerai",
  "Hublot",
  "Luxury Maison"
] as const;

const BRAND_METADATA_MAP: Record<string, {
  origin: string;
  tagline: string;
  description: string;
  iconName: string;
}> = {
  "Rolex": {
    origin: "Geneva, Switzerland • Est. 1905",
    tagline: "The Pinnacle of Precision, Prestige & Enduring Horological Value",
    description: "Founded by Hans Wilsdorf in 1905, Rolex redefined horology with the Oyster waterproof case and Perpetual self-winding rotor. Each timepiece has been inspected for reference fidelity, chronometric precision, and authentic provenance.",
    iconName: "Crown"
  },
  "Cartier": {
    origin: "Paris, France • Est. 1847",
    tagline: "The Master of Shapes and Jeweller of Kings",
    description: "From the iconic Santos and Tank to the Ballon Bleu and Panthère, Cartier marries high Parisian elegance with Swiss horological precision.",
    iconName: "Gem"
  },
  "Patek Philippe": {
    origin: "Geneva, Switzerland • Est. 1839",
    tagline: "You Never Actually Own a Patek Philippe",
    description: "Unrivalled Geneva craftsmanship, Geneva Seal finishing, and timeless complications including the Nautilus, Aquanaut, and Grand Complications.",
    iconName: "ShieldCheck"
  },
  "Audemars Piguet": {
    origin: "Le Brassus, Switzerland • Est. 1875",
    tagline: "To Break the Rules, You Must First Master Them",
    description: "Celebrated for the octagonal Royal Oak designed by Gérald Genta, Royal Oak Offshore, and avant-garde complications from the Vallée de Joux.",
    iconName: "Sparkles"
  },
  "Omega": {
    origin: "Biel/Bienne, Switzerland • Est. 1848",
    tagline: "Master Chronometer Precision, Ocean Depths & Space Exploration",
    description: "From the Moonwatch Speedmaster to the Seamaster Planet Ocean, Omega represents certified Master Chronometer anti-magnetic engineering.",
    iconName: "Clock"
  },
  "Breitling": {
    origin: "Saint-Imier / Grenchen, Switzerland • Est. 1884",
    tagline: "Instruments for Professionals & Aviation Pioneers",
    description: "Famed for the Navitimer slide-rule bezel, Chronomat, and Superocean heritage, Breitling remains the aviator's quintessential chronograph.",
    iconName: "Clock"
  },
  "Tudor": {
    origin: "Geneva, Switzerland • Est. 1926",
    tagline: "Born to Dare • Robust Tool Watches with In-House Calibres",
    description: "Created by Rolex founder Hans Wilsdorf, Tudor combines robust tool watch aesthetics with COSC-certified manufacture movements.",
    iconName: "ShieldCheck"
  },
  "IWC Schaffhausen": {
    origin: "Schaffhausen, Switzerland • Est. 1868",
    tagline: "Engineering Timepieces in Eastern Switzerland",
    description: "Renowned for the Big Pilot, Portugieser, and Portofino, IWC merges American industrial spirit with Swiss horological craftsmanship.",
    iconName: "Clock"
  },
  "Panerai": {
    origin: "Florence, Italy / Neuchâtel, Switzerland • Est. 1860",
    tagline: "Italian Naval Heritage & Bold Cushion-Cased Horology",
    description: "Luminor crown-protecting bridges and historic Radiomir cushion cases, developed originally for the Royal Italian Navy commandos.",
    iconName: "Compass"
  },
  "Hublot": {
    origin: "Nyon, Switzerland • Est. 1980",
    tagline: "The Art of Fusion • High-Tech Materials & Unapologetic Design",
    description: "Pioneered fusing precious metals with natural rubber, high-tech ceramic, sapphire crystal, and manufacture Unico chronograph calibres.",
    iconName: "Sparkles"
  },
  "Luxury Maison": {
    origin: "Switzerland & Europe",
    tagline: "Rare, Independent & Historic Fine Watchmaking",
    description: "Curated selection of prestigious independent and grand complication watchmakers, including Vacheron Constantin, Jaeger-LeCoultre, and Zenith.",
    iconName: "Crown"
  }
};

const allWatches = INITIAL_PRODUCTS.filter(p => p.type === 'watch');

export const BRAND_SUBFOLDERS: Record<string, BrandSubfolderInfo> = WATCH_BRAND_NAMES.reduce((acc, brand) => {
  const meta = BRAND_METADATA_MAP[brand] || {
    origin: "Switzerland",
    tagline: `${brand} Horology`,
    description: `Authenticated pre-owned timepieces from ${brand}.`,
    iconName: "Clock"
  };
  const brandWatches = allWatches.filter(w => {
    if (brand === "Luxury Maison") {
      return !["Rolex","Cartier","Patek Philippe","Audemars Piguet","Omega","Breitling","Tudor","IWC Schaffhausen","Panerai","Hublot"].includes(w.brand);
    }
    return w.brand === brand;
  });

  acc[brand] = {
    brand,
    subfolderPath: `/watch/${brand}`,
    origin: meta.origin,
    tagline: meta.tagline,
    description: meta.description,
    iconName: meta.iconName,
    count: brandWatches.length,
    watches: brandWatches,
    startingPriceEUR: brandWatches.length > 0 ? brandWatches.reduce((min, w) => Math.min(min, w.priceEUR), Infinity) : 0,
    sampleImages: brandWatches.slice(0, 4).map(w => w.images[0]).filter(Boolean)
  };
  return acc;
}, {} as Record<string, BrandSubfolderInfo>);

export const ALL_BRAND_SUBFOLDERS_LIST: BrandSubfolderInfo[] = Object.values(BRAND_SUBFOLDERS);

export const ALL_WATCHES_FROM_SUBFOLDERS: Product[] = allWatches;

export function getWatchesForSubfolder(brand: string): Product[] {
  return BRAND_SUBFOLDERS[brand]?.watches || [];
}

export function getSubfolderInfo(brand: string): BrandSubfolderInfo | undefined {
  return BRAND_SUBFOLDERS[brand];
}
