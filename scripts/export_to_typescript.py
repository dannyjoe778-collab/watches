import json
import re

with open('scripts/scraped_watches.json') as f:
    watches = json.load(f)

with open('scripts/scraped_jewellery.json') as f:
    jewellery = json.load(f)

# Deduplicate images so every single product has a completely unique primary image
seen_hero_imgs = set()
unique_watches = []
for w in watches:
    if w['images']:
        hero = w['images'][0]
        if hero in seen_hero_imgs:
            if len(w['images']) > 1 and w['images'][1] not in seen_hero_imgs:
                w['images'][0], w['images'][1] = w['images'][1], w['images'][0]
                hero = w['images'][0]
            else:
                continue
        seen_hero_imgs.add(hero)
        unique_watches.append(w)

unique_jewellery = []
for j in jewellery:
    if j['images']:
        hero = j['images'][0]
        if hero in seen_hero_imgs:
            if len(j['images']) > 1 and j['images'][1] not in seen_hero_imgs:
                j['images'][0], j['images'][1] = j['images'][1], j['images'][0]
                hero = j['images'][0]
            else:
                continue
        seen_hero_imgs.add(hero)
        unique_jewellery.append(j)

print(f"Final unique watches: {len(unique_watches)}, unique jewellery: {len(unique_jewellery)}")

# Format as TypeScript
def escape_str(s):
    if s is None:
        return ""
    return s.replace('\\', '\\\\').replace('"', '\\"').replace('\n', ' ').replace('\r', '')

def format_watch(p):
    images_str = json.dumps(p['images'], indent=6)
    desc = escape_str(p['description'])
    name = escape_str(p['name'])
    brand = escape_str(p['brand'])
    model = escape_str(p['model'])
    category = escape_str(p['category'])
    collection = escape_str(p['collection'])
    ref = escape_str(p.get('ref', 'Certified'))
    year = escape_str(p.get('year', '2023'))
    movement = escape_str(p.get('movement', 'Automatic Calibre'))
    case_size = escape_str(p.get('caseSize', '40 mm'))
    box = 'true' if p.get('box') else 'false'
    papers = 'true' if p.get('papers') else 'false'
    is_featured = 'true' if p.get('isFeaturedHomepage') else 'false'
    is_new = 'true' if p.get('isNewArrival') else 'false'

    return f"""  {{
    id: "{p['id']}",
    type: "watch",
    brand: "{brand}",
    name: "{name}",
    model: "{model}",
    category: "{category}" as WatchCategory,
    collection: "{collection}",
    priceEUR: {p['priceEUR']},
    status: "Available",
    badge: "AUTHENTICATED",
    description: "{desc}",
    images: {images_str},
    watchSpecs: {{
      reference: "{ref}",
      condition: "Exceptional",
      year: "{year}",
      movement: "{movement}",
      caseMaterial: "Precious Metal / Steel",
      bracelet: "Integrated Bracelet / Strap",
      caseSize: "{case_size}",
      box: {box},
      papers: {papers},
      serialNumberStatus: "Verified against registry"
    }},
    seoTitle: "{name} | The Luxury Hut London",
    seoDescription: "Authentic pre-owned {name} available at The Luxury Hut. Inspected and verified in London showroom.",
    isFeaturedHomepage: {is_featured},
    isNewArrival: {is_new},
    createdAt: "2025-01-15T00:00:00Z"
  }}"""

def format_jewellery(p):
    images_str = json.dumps(p['images'], indent=6)
    desc = escape_str(p['description'])
    name = escape_str(p['name'])
    brand = escape_str(p['brand'])
    model = escape_str(p['model'])
    category = escape_str(p['category'])
    collection = escape_str(p['collection'])
    box = 'true' if p.get('box') else 'false'
    papers = 'true' if p.get('papers') else 'false'
    is_featured = 'true' if p.get('isFeaturedHomepage') else 'false'
    is_new = 'true' if p.get('isNewArrival') else 'false'

    return f"""  {{
    id: "{p['id']}",
    type: "jewellery",
    brand: "{brand}",
    name: "{name}",
    model: "{model}",
    category: "{category}" as JewelleryCategory,
    collection: "{collection}",
    priceEUR: {p['priceEUR']},
    status: "Available",
    badge: "AUTHENTICATED",
    description: "{desc}",
    images: {images_str},
    jewellerySpecs: {{
      material: "18K Gold / Platinum",
      box: {box},
      papers: {papers}
    }},
    seoTitle: "{name} | The Luxury Hut London",
    seoDescription: "Authentic pre-owned {name} available at The Luxury Hut. Inspected and certified in London showroom.",
    isFeaturedHomepage: {is_featured},
    isNewArrival: {is_new},
    createdAt: "2025-01-15T00:00:00Z"
  }}"""

# Write src/data/jewelleryProducts.ts
jewellery_items_ts = ",\n".join([format_jewellery(j) for j in unique_jewellery])
jewellery_ts_content = f"""import {{ Product, JewelleryCategory }} from '../types';

export const JEWELLERY_PRODUCTS: Product[] = [
{jewellery_items_ts}
];
"""

with open('src/data/jewelleryProducts.ts', 'w') as f:
    f.write(jewellery_ts_content)

print("Wrote src/data/jewelleryProducts.ts")

# Write src/data/products.ts
watch_items_ts = ",\n".join([format_watch(w) for w in unique_watches])
products_ts_content = f"""import {{ Product, WatchCategory }} from '../types';
import {{ JEWELLERY_PRODUCTS }} from './jewelleryProducts';

export const INITIAL_PRODUCTS: Product[] = [
{watch_items_ts},

  // The Luxury Hut Certified Fine Jewellery
  ...JEWELLERY_PRODUCTS
];

export const BRAND_COLLECTIONS = [
  {{
    id: 'rolex',
    name: 'Rolex Collection',
    brand: 'Rolex',
    headline: 'The Benchmark of Precision & Prestige',
    description: 'Explore verified iconic Rolex references including the Submariner, Cosmograph Daytona, GMT-Master II, Datejust 41, Day-Date 40, and Sky-Dweller.',
    heroImage: 'https://assets.theluxuryhut.com/2026/03/f73a8f91-48d1-474a-a026-4ff299d326d6Rolex_Cosmograph_Daytona_40mm_Bi-Metal_Black_Dial_52656-a.jpg.webp',
    totalCount: {len([w for w in unique_watches if w['brand'] == 'Rolex'])}
  }},
  {{
    id: 'cartier',
    name: 'Cartier Collection',
    brand: 'Cartier',
    headline: 'The Jeweller of Kings and the King of Jewellers',
    description: 'From Santos de Cartier, Tank Française, and Ballon Bleu timepieces to iconic Love, Juste un Clou, and Trinity jewellery creations.',
    heroImage: 'https://assets.theluxuryhut.com/2025/10/Cartier_Yellow_Gold_Juste_Un_Clou_Bracelet_Small_52232-a.jpg',
    totalCount: {len([w for w in unique_watches if w['brand'] == 'Cartier'] + [j for j in unique_jewellery if j['brand'] == 'Cartier'])}
  }},
  {{
    id: 'patek-philippe',
    name: 'Patek Philippe Collection',
    brand: 'Patek Philippe',
    headline: 'You Never Actually Own a Patek Philippe',
    description: 'Discover rare Nautilus, Aquanaut, Golden Ellipse, and Calatrava references complete with Certificates of Origin.',
    heroImage: 'https://assets.theluxuryhut.com/2025/07/Patek_Philippe_Golden_Ellipse_Gold_Sunburst_51959-a.jpg',
    totalCount: {len([w for w in unique_watches if w['brand'] == 'Patek Philippe'])}
  }},
  {{
    id: 'audemars-piguet',
    name: 'Audemars Piguet Collection',
    brand: 'Audemars Piguet',
    headline: 'To Break the Rules, You Must First Master Them',
    description: 'Iconic Royal Oak, Royal Oak Offshore, and Royal Oak Chronograph timepieces with signature Tapisserie dials.',
    heroImage: 'https://assets.theluxuryhut.com/2025/11/658fc195-ea57-4185-b13c-dcf6b8f36f01Audemars_Piguet_Royal_Oak_Offshore_42mm_Steel_Black_Dial_52288-a.jpg',
    totalCount: {len([w for w in unique_watches if w['brand'] == 'Audemars Piguet'])}
  }},
  {{
    id: 'omega',
    name: 'Omega Collection',
    brand: 'Omega',
    headline: 'Pioneering Spirit & Co-Axial Precision',
    description: 'Iconic Speedmaster Moonwatch, Seamaster Diver 300M, Planet Ocean, and Aqua Terra Master Chronometer models.',
    heroImage: 'https://assets.theluxuryhut.com/2025/10/9cf95589-9a74-4bba-952a-9e1208a8a4baOmega_Speedmaster_Moonwatch_Professional_Hesalite_52281-a.jpg',
    totalCount: {len([w for w in unique_watches if w['brand'] == 'Omega'])}
  }},
  {{
    id: 'fine-jewellery',
    name: 'Fine Jewellery & Certified Diamonds',
    brand: 'Fine Jewellery',
    headline: 'London Hatton Garden Diamond Solitaires & Tennis Bracelets',
    description: 'Certified diamond engagement rings, trilogy diamond rings, full eternity bands, and diamond tennis bracelets.',
    heroImage: 'https://assets.theluxuryhut.com/2023/04/16009-c.jpg',
    totalCount: {len([j for j in unique_jewellery if j['brand'] == 'Fine Jewellery'])}
  }}
];
"""

with open('src/data/products.ts', 'w') as f:
    f.write(products_ts_content)

print(f"Wrote src/data/products.ts with {len(unique_watches)} watches and {len(unique_jewellery)} jewellery items!")
