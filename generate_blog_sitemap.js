// Script to generate blog sitemap from Supabase insights table
// Run: node generate_blog_sitemap.js

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const SUPABASE_URL = 'https://renskjrttadhptrwnobz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlbnNranJ0dGFkaHB0cndub2J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5MzE2MTgsImV4cCI6MjA3ODUwNzYxOH0.w1njTYtB3x9QVErGQJJLsCWA3jv2LAsQQdt-2ZW0NoU';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function generateBlogSitemap() {
  console.log('Fetching insights from Supabase...');
  
  const { data: insights, error } = await supabase
    .from('insights')
    .select('slug, published_at, updated_at')
    .eq('is_published', true)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching insights:', error);
    process.exit(1);
  }

  console.log(`Found ${insights.length} published insights`);

  const today = new Date().toISOString().split('T')[0];
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- 
    WhyCreatives - Blog/Insights Sitemap
    Auto-generated from Supabase
    Updated: ${today}
  -->
  
  <!-- Blog Hub Page -->
  <url>
    <loc>https://whycreatives.in/insights</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
`;

  for (const insight of insights) {
    const lastmod = insight.updated_at 
      ? insight.updated_at.split('T')[0] 
      : insight.published_at?.split('T')[0] || today;
    
    xml += `
  <url>
    <loc>https://whycreatives.in/insights/${insight.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  }

  xml += '\n</urlset>\n';

  fs.writeFileSync('public/sitemap-blog.xml', xml);
  console.log('✓ Generated public/sitemap-blog.xml');
  
  // Also update the main sitemap index
  const mainSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- WhyCreatives - Sitemap Index - Updated: ${today} -->
  <sitemap>
    <loc>https://whycreatives.in/sitemap-pages.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://whycreatives.in/sitemap-services.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://whycreatives.in/sitemap-locations.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://whycreatives.in/sitemap-blog.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>
`;

  fs.writeFileSync('public/sitemap.xml', mainSitemap);
  console.log('✓ Updated public/sitemap.xml');
}

generateBlogSitemap().catch(console.error);
