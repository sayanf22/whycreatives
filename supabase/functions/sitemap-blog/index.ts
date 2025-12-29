// @ts-nocheck
// Supabase Edge Function - Serves dynamic blog sitemap
// This generates sitemap XML on-the-fly from the database

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SITE_URL = "https://whycreatives.in";

serve(async (req: Request) => {
  // Allow CORS for sitemap access
  const headers = {
    "Content-Type": "application/xml",
    "Cache-Control": "public, max-age=3600", // Cache for 1 hour
    "Access-Control-Allow-Origin": "*",
  };

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const today = new Date().toISOString().split("T")[0];

    // Fetch all published insights
    const { data: insights, error } = await supabase
      .from("insights")
      .select("slug, published_at, updated_at")
      .eq("is_published", true)
      .order("published_at", { ascending: false });

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    // Generate sitemap XML
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- WhyCreatives Blog Sitemap -->
  <!-- Auto-generated from database: ${today} -->
  <!-- Total articles: ${insights?.length || 0} -->
  
  <url>
    <loc>${SITE_URL}/insights</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`;

    for (const insight of insights || []) {
      const lastmod = insight.updated_at?.split("T")[0] || 
                      insight.published_at?.split("T")[0] || 
                      today;
      xml += `
  <url>
    <loc>${SITE_URL}/insights/${insight.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    }

    xml += "\n</urlset>";

    return new Response(xml, { headers });

  } catch (error: any) {
    console.error("Sitemap error:", error);
    
    // Return a minimal valid sitemap on error
    const fallbackXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/insights</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;
    
    return new Response(fallbackXml, { headers });
  }
});
