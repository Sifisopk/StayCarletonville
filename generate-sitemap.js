// =========================================================
// generate-sitemap.js
//
// Regenerates sitemap.xml from the live "approved" listings
// in Supabase, so the sitemap always matches what's actually
// on the site (not just the data.js fallback).
//
// Usage:
//   1. npm install @supabase/supabase-js
//   2. Fill in SUPABASE_URL and SUPABASE_KEY below (use the
//      anon key — it can only read what your RLS policies allow,
//      which for "approved" listings should be public anyway).
//   3. Run:  node generate-sitemap.js
//
// Run this any time listings change, or wire it into a
// deploy step / scheduled job (e.g. daily) so the sitemap
// never goes stale.
// =========================================================

const { createClient } = require('@supabase/supabase-js');
const ws = require('ws');
const fs = require('fs');

const SUPABASE_URL = 'https://uadexruohhddnidigcqo.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhZGV4cnVvaGhkZG5pZGlnY3FvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0ODM4MjQsImV4cCI6MjA5ODA1OTgyNH0.vZEK7yenO9erPVDDL2lIl-um6hRUgpvZEs6hWEclYPU';

const SITE_URL = 'https://overnightstays.co.za';

// Static pages that should always be in the sitemap
const staticPages = [
  { loc: '/index.html', changefreq: 'weekly', priority: '1.0' },
  { loc: '/listings.html', changefreq: 'daily', priority: '0.9' },
  { loc: '/guide.html', changefreq: 'weekly', priority: '0.7' },
  { loc: '/about.html', changefreq: 'monthly', priority: '0.6' },
  { loc: '/list-bnb-page.html', changefreq: 'monthly', priority: '0.6' },
  { loc: '/faq.html', changefreq: 'monthly', priority: '0.5' },
  { loc: '/privacy-policy.html', changefreq: 'yearly', priority: '0.2' },
  { loc: '/terms.html', changefreq: 'yearly', priority: '0.2' },
];

async function generateSitemap() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
    realtime: { transport: ws }
  });

  const { data: listings, error } = await supabase
    .from('listings')
    .select('id, updated_at, created_at')
    .eq('status', 'approved');

  if (error) {
    console.error('Failed to fetch listings:', error.message);
    process.exit(1);
  }

  const today = new Date().toISOString().split('T')[0];

  const urlEntries = staticPages.map(page => `
  <url>
    <loc>${SITE_URL}${page.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`);

  listings.forEach(listing => {
    const lastmod = (listing.updated_at || listing.created_at || today).split('T')[0];
    urlEntries.push(`
  <url>
    <loc>${SITE_URL}/details.html?id=${listing.id}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries.join('\n')}
</urlset>
`;

  fs.writeFileSync('sitemap.xml', xml);
  console.log(`✅ sitemap.xml generated with ${staticPages.length} static pages + ${listings.length} listings.`);
}

generateSitemap();
