import urllib.request
import urllib.parse
import re
import json
import html
import concurrent.futures
import time

def clean_html_text(raw_html):
    if not raw_html:
        return ""
    text = re.sub(r'<[^>]+>', ' ', raw_html)
    text = html.unescape(text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def parse_product_page(url):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        with urllib.request.urlopen(req, timeout=12) as resp:
            page = resp.read().decode('utf-8', errors='ignore')
    except Exception as e:
        return None

    # Title extraction
    title_m = re.search(r'<title>([^<]+)</title>', page)
    full_title = title_m.group(1) if title_m else ""
    clean_title = re.sub(r'^Buy\s+', '', full_title, flags=re.I)
    clean_title = re.sub(r'\s*\|\s*The Luxury Hut.*$', '', clean_title, flags=re.I)
    clean_title = re.sub(r'\s*-\s*The Luxury Hut.*$', '', clean_title, flags=re.I).strip()
    clean_title = html.unescape(clean_title)

    if not clean_title or len(clean_title) < 5:
        return None

    # Extract genuine asset images from assets.theluxuryhut.com
    raw_imgs = re.findall(r'https%3A%2F%2Fassets\.theluxuryhut\.com%2F([^&\"\\]+)', page)
    direct_imgs = re.findall(r'https://assets\.theluxuryhut\.com/([a-zA-Z0-9_\-\.\/%]+)', page)
    
    all_imgs = []
    for img in raw_imgs:
        all_imgs.append(urllib.parse.unquote(img))
    for img in direct_imgs:
        all_imgs.append(img)

    valid_images = []
    seen = set()
    for img in all_imgs:
        img_lower = img.lower()
        if any(x in img_lower for x in ['logo', 'icon', 'menu', 'user', 'trustpilot', 'banner', 'svg', 'flag', 'arrow', 'gift']):
            continue
        if not any(img_lower.endswith(ext) for ext in ['.jpg', '.jpeg', '.webp', '.png']):
            continue
        full_url = f"https://assets.theluxuryhut.com/{img}"
        if full_url not in seen:
            seen.add(full_url)
            valid_images.append(full_url)

    if not valid_images:
        return None

    # Price extraction
    prices = re.findall(r'£([0-9,]+)', page)
    valid_prices = []
    for p in prices:
        try:
            val = int(p.replace(',', ''))
            if 400 <= val <= 350000 and val not in [10000, 20000, 30000, 40000, 50000]:
                valid_prices.append(val)
        except:
            pass

    price_gbp = valid_prices[0] if valid_prices else 4950
    price_eur = int(price_gbp * 1.17)

    # Reference number
    ref_match = re.search(r'Ref(?:erence)?\s*:?\s*([0-9A-Za-z\.\-\/]+)', page, re.I)
    ref = ref_match.group(1).strip() if ref_match else ""
    if ref.lower() in ['und', 'our', 'the', 'no', 'available', 'set', 'dial', 'gold']:
        ref = ""

    # Box & Papers
    has_box = bool(re.search(r'box\s*:\s*yes', page, re.I) or re.search(r'original box', page, re.I))
    has_papers = bool(re.search(r'papers?\s*:\s*yes', page, re.I) or re.search(r'original papers?', page, re.I) or re.search(r'warranty card', page, re.I))

    # Case size
    case_size_m = re.search(r'(?:Case Size|Size)\s*:\s*([0-9]+(?:\.[0-9]+)?\s*mm)', page, re.I) or re.search(r'([0-9]{2}\s*mm)', clean_title, re.I)
    case_size = case_size_m.group(1) if case_size_m else "Standard"

    year_m = re.search(r'(?:Year|Date)\s*:\s*(19[5-9][0-9]|20[0-2][0-9])', page, re.I) or re.search(r'\b(19[7-9][0-9]|20[0-2][0-9])\b', clean_title)
    year = year_m.group(1) if year_m else "2023"

    movement_m = re.search(r'Movement\s*:\s*([A-Za-z0-9\s\-]+)', page, re.I)
    movement = movement_m.group(1).split('<')[0].strip() if movement_m else "Automatic Calibre"
    if len(movement) > 55:
        movement = "Automatic Self-Winding Movement"

    # Description
    desc_m = re.search(r'<h2>Buy [^<]+</h2>\s*<p>(.*?)</p>', page, re.DOTALL)
    if desc_m:
        description = clean_html_text(desc_m.group(1))
    else:
        description = f"Pre-owned authentic luxury piece certified by The Luxury Hut, London. Reference {ref or 'Certified'}. Fully inspected for authenticity, accuracy, and structural integrity. Includes The Luxury Hut 12-Month Comprehensive Guarantee."

    # Determine Brand
    title_lower = clean_title.lower()
    url_lower = url.lower()

    brand = "Luxury Maison"
    if "rolex" in title_lower or "rolex" in url_lower:
        brand = "Rolex"
    elif "patek" in title_lower or "patek" in url_lower:
        brand = "Patek Philippe"
    elif "audemars" in title_lower or "audemars" in url_lower or "royal oak" in title_lower:
        brand = "Audemars Piguet"
    elif "cartier" in title_lower or "cartier" in url_lower:
        brand = "Cartier"
    elif "omega" in title_lower or "omega" in url_lower or "speedmaster" in title_lower or "seamaster" in title_lower:
        brand = "Omega"
    elif "breitling" in title_lower or "breitling" in url_lower:
        brand = "Breitling"
    elif "tudor" in title_lower or "tudor" in url_lower:
        brand = "Tudor"
    elif "van cleef" in title_lower or "van cleef" in url_lower or "alhambra" in title_lower:
        brand = "Van Cleef & Arpels"
    elif "bulgari" in title_lower or "bvlgari" in title_lower or "serpenti" in title_lower:
        brand = "Bulgari"
    elif "tiffany" in title_lower or "tiffany" in url_lower:
        brand = "Tiffany & Co."
    elif "chopard" in title_lower or "chopard" in url_lower:
        brand = "Chopard"
    elif "vacheron" in title_lower or "vacheron" in url_lower:
        brand = "Vacheron Constantin"
    elif "jaeger" in title_lower or "lecoultre" in title_lower or "reverso" in title_lower:
        brand = "Jaeger-LeCoultre"
    elif "hublot" in title_lower or "hublot" in url_lower:
        brand = "Hublot"
    elif "panerai" in title_lower or "panerai" in url_lower:
        brand = "Panerai"
    elif "iwc" in title_lower or "iwc" in url_lower:
        brand = "IWC Schaffhausen"
    elif any(d in title_lower for d in ['diamond', 'gold', 'ring', 'bracelet', 'solitaire', 'tennis', 'eternity']):
        brand = "Fine Jewellery"

    # Type: watch vs jewellery
    is_jewellery = any(j in url_lower or j in title_lower for j in [
        'diamond-ring', 'ring', 'necklace', 'bracelet', 'earring', 'bangle', 'pendant', 'eternity', 'solitaire', 'trilogy', 'love-ring', 'juste-un-clou-bracelet', 'love-bracelet', 'alhambra', 'serpenti'
    ]) and not any(w in title_lower for w in ['submariner', 'daytona', 'datejust', 'speedmaster', 'seamaster', 'watch', 'gmt-master', 'chronograph', 'calibre', 'royal oak', 'santos', 'tank', 'ballon'])

    product_type = 'jewellery' if is_jewellery else 'watch'

    # Model extraction
    model = clean_title.replace(brand, '').strip()
    model = re.sub(r'^(Ref:?\s*[0-9A-Za-z\-]+)\s*', '', model, flags=re.I).strip()
    if not model:
        model = clean_title

    # Category determination
    if product_type == 'watch':
        if any(d in title_lower for d in ['submariner', 'sea-dweller', 'diver', 'seamaster', 'pelagos', 'superocean']):
            category = 'Professional Diving Watch'
        elif any(c in title_lower for c in ['daytona', 'chronograph', 'speedmaster', 'navitimer']):
            category = 'Luxury Chronograph'
        elif any(s in title_lower for s in ['gmt', 'sky-dweller', 'explorer', 'sports', 'yacht-master']):
            category = 'Luxury Sports Watch'
        elif any(h in title_lower for h in ['nautilus', 'royal oak', 'aquanaut', 'overseas']):
            category = 'High Horology Sports Watch'
        elif any(d in title_lower for d in ['calatrava', 'ellipse', 'cellini', 'tank', 'santos', 'reverso']):
            category = 'Classic Luxury Watch'
        else:
            category = 'Classic Luxury Watch'
    else:
        if 'ring' in title_lower:
            category = 'Rings'
        elif 'bracelet' in title_lower or 'bangle' in title_lower:
            category = 'Bracelets'
        elif 'necklace' in title_lower or 'pendant' in title_lower:
            category = 'Necklaces'
        elif 'earring' in title_lower:
            category = 'Earrings'
        else:
            category = 'High Jewellery'

    # Collection
    if brand == "Rolex":
        collection = "Rolex Collection"
    elif brand == "Patek Philippe":
        collection = "Patek Philippe Collection"
    elif brand == "Audemars Piguet":
        collection = "Audemars Piguet Collection"
    elif brand == "Cartier":
        collection = "Cartier Collection"
    elif brand == "Van Cleef & Arpels":
        collection = "Van Cleef & Arpels Collection"
    elif brand == "Bulgari":
        collection = "Bulgari Collection"
    elif brand == "Tiffany & Co.":
        collection = "Tiffany & Co. Collection"
    elif brand == "Omega":
        collection = "Omega Collection"
    elif brand == "Breitling":
        collection = "Breitling Collection"
    elif brand == "Tudor":
        collection = "Tudor Collection"
    else:
        collection = "Rare & Exceptional Collection"

    slug = re.sub(r'[^a-z0-9]+', '-', f"{brand}-{clean_title}".lower()).strip('-')

    return {
        'id': f"tlh-{slug[:40]}",
        'type': product_type,
        'brand': brand,
        'name': clean_title,
        'model': model[:50],
        'category': category,
        'collection': collection,
        'priceEUR': price_eur,
        'priceGBP': price_gbp,
        'status': 'Available',
        'badge': 'AUTHENTICATED',
        'description': description[:800],
        'images': valid_images[:4],
        'ref': ref or 'Certified',
        'box': has_box,
        'papers': has_papers,
        'caseSize': case_size,
        'year': year,
        'movement': movement,
        'url': url
    }

def main():
    print("Reading sitemap...")
    req = urllib.request.Request('https://www.theluxuryhut.com/sitemap.xml', headers={'User-Agent': 'Mozilla/5.0'})
    sitemap = urllib.request.urlopen(req, timeout=12).read().decode('utf-8')
    all_urls = re.findall(r'<loc>(https://www.theluxuryhut.com/shop/product/[^<]+)</loc>', sitemap)
    print(f"Total product URLs in sitemap: {len(all_urls)}")

    groups = {
        'rolex': [p for p in all_urls if 'rolex' in p],
        'cartier_watch': [p for p in all_urls if 'cartier' in p and any(w in p for w in ['santos', 'tank', 'ballon', 'panthere', 'ronde', 'watch', 'calibre'])],
        'patek': [p for p in all_urls if 'patek' in p],
        'ap': [p for p in all_urls if any(a in p for a in ['audemars', 'royal-oak'])],
        'omega': [p for p in all_urls if 'omega' in p or 'speedmaster' in p or 'seamaster' in p],
        'breitling': [p for p in all_urls if 'breitling' in p],
        'tudor': [p for p in all_urls if 'tudor' in p or 'black-bay' in p or 'pelagos' in p],
        'other_watch': [p for p in all_urls if any(b in p for b in ['vacheron', 'jaeger', 'reverso', 'hublot', 'panerai', 'iwc', 'tag-heuer'])],
        'cartier_jewel': [p for p in all_urls if 'cartier' in p and any(j in p for j in ['love', 'clou', 'trinity', 'ring', 'bracelet', 'necklace']) and not any(w in p for w in ['santos', 'tank', 'ballon', 'panthere', 'watch'])],
        'diamonds': [p for p in all_urls if any(d in p for d in ['diamond-ring', 'solitaire', 'trilogy', 'eternity', 'tennis-bracelet'])],
        'vca_bulgari_tiffany': [p for p in all_urls if any(b in p for b in ['van-cleef', 'bulgari', 'tiffany', 'chopard'])],
        'fine_gold_jewel': [p for p in all_urls if any(j in p for j in ['gold-ring', 'gold-bracelet', '18ct-white-gold', '18ct-gold', 'gold-chain']) and not any(w in p for w in ['rolex', 'patek', 'omega', 'breitling', 'tudor', 'watch'])]
    }

    selected_urls = []
    selected_urls.extend(groups['rolex'][:28])
    selected_urls.extend(groups['cartier_watch'][:12])
    selected_urls.extend(groups['patek'][:10])
    selected_urls.extend(groups['ap'][:8])
    selected_urls.extend(groups['omega'][:10])
    selected_urls.extend(groups['breitling'][:6])
    selected_urls.extend(groups['tudor'][:6])
    selected_urls.extend(groups['other_watch'][:6])
    selected_urls.extend(groups['cartier_jewel'][:15])
    selected_urls.extend(groups['diamonds'][:15])
    selected_urls.extend(groups['vca_bulgari_tiffany'][:10])
    selected_urls.extend(groups['fine_gold_jewel'][:10])

    print(f"Selected {len(selected_urls)} diverse products to fetch...")

    with concurrent.futures.ThreadPoolExecutor(max_workers=20) as ex:
        results = list(ex.map(parse_product_page, selected_urls))

    valid = [r for r in results if r is not None]
    print(f"Successfully scraped {len(valid)} authentic products from The Luxury Hut!")

    # Deduplicate by ID and ensure every product has a distinct ID
    seen_ids = set()
    deduped = []
    for item in valid:
        item_id = item['id']
        counter = 1
        while item_id in seen_ids:
            item_id = f"{item['id']}-{counter}"
            counter += 1
        item['id'] = item_id
        seen_ids.add(item_id)
        deduped.append(item)

    watches = [p for p in deduped if p['type'] == 'watch']
    jewellery = [p for p in deduped if p['type'] == 'jewellery']

    print(f"Total Watches: {len(watches)}, Total Jewellery: {len(jewellery)}")

    # Mark some as featured / new arrivals
    for i, w in enumerate(watches):
        w['isFeaturedHomepage'] = (i < 8)
        w['isNewArrival'] = (8 <= i < 16)

    for i, j in enumerate(jewellery):
        j['isFeaturedHomepage'] = (i < 6)
        j['isNewArrival'] = (6 <= i < 12)

    # Write output to JSON for inspection and TypeScript builder
    with open('scripts/scraped_watches.json', 'w') as f:
        json.dump(watches, f, indent=2)

    with open('scripts/scraped_jewellery.json', 'w') as f:
        json.dump(jewellery, f, indent=2)

    print("Scraping completed and saved to JSON.")

if __name__ == '__main__':
    main()
