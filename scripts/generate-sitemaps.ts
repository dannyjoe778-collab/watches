import fs from 'fs';
import path from 'path';
import { INITIAL_PRODUCTS, BRAND_COLLECTIONS } from '../src/data/products.ts';

const DOMAIN = 'https://aureliaandcrown.com';
const TODAY = new Date().toISOString().split('T')[0];

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

export function generateSitemaps() {
  const publicDir = path.resolve(process.cwd(), 'public');

  // 1. Pages Sitemap
  const staticPages = [
    { path: '/', priority: '1.0', changefreq: 'daily' },
    { path: '/shop', priority: '0.9', changefreq: 'daily' },
    { path: '/watches', priority: '0.9', changefreq: 'daily' },
    { path: '/jewellery', priority: '0.9', changefreq: 'daily' },
    { path: '/new-arrivals', priority: '0.8', changefreq: 'daily' },
    { path: '/collections', priority: '0.8', changefreq: 'weekly' },
    { path: '/private-clients', priority: '0.7', changefreq: 'monthly' },
    { path: '/authentication', priority: '0.8', changefreq: 'monthly' },
    { path: '/about', priority: '0.6', changefreq: 'monthly' },
    { path: '/contact', priority: '0.7', changefreq: 'monthly' },
    { path: '/shipping', priority: '0.6', changefreq: 'monthly' },
    { path: '/terms', priority: '0.5', changefreq: 'monthly' },
    { path: '/privacy', priority: '0.5', changefreq: 'monthly' },
    { path: '/order-tracking', priority: '0.5', changefreq: 'monthly' },
  ];

  let pagesXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  pagesXml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  for (const page of staticPages) {
    pagesXml += `  <url>\n`;
    pagesXml += `    <loc>${DOMAIN}${page.path}</loc>\n`;
    pagesXml += `    <lastmod>${TODAY}</lastmod>\n`;
    pagesXml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    pagesXml += `    <priority>${page.priority}</priority>\n`;
    pagesXml += `  </url>\n`;
  }
  pagesXml += `</urlset>\n`;
  fs.writeFileSync(path.join(publicDir, 'sitemap-pages.xml'), pagesXml, 'utf-8');

  // 2. Categories & Collections Sitemap
  const categories = [
    ...BRAND_COLLECTIONS.map(b => ({
      path: `/collections/${b.id}`,
      name: b.name,
      priority: '0.8',
      changefreq: 'weekly'
    })),
    { path: '/jewellery/rings', name: 'Fine Diamond Rings & Bands', priority: '0.7', changefreq: 'weekly' },
    { path: '/jewellery/bracelets', name: 'Bracelets & Tennis Bangles', priority: '0.7', changefreq: 'weekly' },
    { path: '/jewellery/necklaces', name: 'Necklaces & Pendants', priority: '0.7', changefreq: 'weekly' },
    { path: '/jewellery/earrings', name: 'Diamond & Gemstone Earrings', priority: '0.7', changefreq: 'weekly' },
    { path: '/watches/rolex', name: 'Rolex Certified Pre-Owned', priority: '0.8', changefreq: 'daily' },
    { path: '/watches/patek-philippe', name: 'Patek Philippe Complications', priority: '0.8', changefreq: 'daily' },
    { path: '/watches/audemars-piguet', name: 'Audemars Piguet Royal Oak', priority: '0.8', changefreq: 'daily' },
    { path: '/watches/cartier', name: 'Cartier Horlogerie', priority: '0.8', changefreq: 'daily' },
    { path: '/watches/omega', name: 'Omega Speedmaster & Seamaster', priority: '0.8', changefreq: 'daily' },
  ];

  let catXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  catXml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  for (const cat of categories) {
    catXml += `  <url>\n`;
    catXml += `    <loc>${DOMAIN}${cat.path}</loc>\n`;
    catXml += `    <lastmod>${TODAY}</lastmod>\n`;
    catXml += `    <changefreq>${cat.changefreq}</changefreq>\n`;
    catXml += `    <priority>${cat.priority}</priority>\n`;
    catXml += `  </url>\n`;
  }
  catXml += `</urlset>\n`;
  fs.writeFileSync(path.join(publicDir, 'sitemap-categories.xml'), catXml, 'utf-8');

  // 3. Products Sitemap (with Google Image Sitemaps extension)
  let prodXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  prodXml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;
  
  for (const product of INITIAL_PRODUCTS) {
    const slug = product.slug || product.id;
    const productUrl = `${DOMAIN}/product/${slug}`;
    prodXml += `  <url>\n`;
    prodXml += `    <loc>${productUrl}</loc>\n`;
    prodXml += `    <lastmod>${TODAY}</lastmod>\n`;
    prodXml += `    <changefreq>daily</changefreq>\n`;
    prodXml += `    <priority>0.8</priority>\n`;
    
    if (product.images && product.images.length > 0) {
      for (const imgUrl of product.images) {
        prodXml += `    <image:image>\n`;
        prodXml += `      <image:loc>${escapeXml(imgUrl)}</image:loc>\n`;
        prodXml += `      <image:title>${escapeXml(product.name)}</image:title>\n`;
        prodXml += `      <image:caption>${escapeXml(`${product.brand} - ${product.description.slice(0, 160)}`)}</image:caption>\n`;
        prodXml += `    </image:image>\n`;
      }
    }
    prodXml += `  </url>\n`;
  }
  prodXml += `</urlset>\n`;
  fs.writeFileSync(path.join(publicDir, 'sitemap-products.xml'), prodXml, 'utf-8');

  // 4. Master Sitemap Index
  let indexXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  indexXml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  indexXml += `  <sitemap>\n`;
  indexXml += `    <loc>${DOMAIN}/sitemap-pages.xml</loc>\n`;
  indexXml += `    <lastmod>${TODAY}</lastmod>\n`;
  indexXml += `  </sitemap>\n`;
  indexXml += `  <sitemap>\n`;
  indexXml += `    <loc>${DOMAIN}/sitemap-categories.xml</loc>\n`;
  indexXml += `    <lastmod>${TODAY}</lastmod>\n`;
  indexXml += `  </sitemap>\n`;
  indexXml += `  <sitemap>\n`;
  indexXml += `    <loc>${DOMAIN}/sitemap-products.xml</loc>\n`;
  indexXml += `    <lastmod>${TODAY}</lastmod>\n`;
  indexXml += `  </sitemap>\n`;
  indexXml += `</sitemapindex>\n`;
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), indexXml, 'utf-8');

  console.log(`Successfully generated sitemaps for ${INITIAL_PRODUCTS.length} products, ${categories.length} categories, and ${staticPages.length} pages.`);
}

generateSitemaps();
