// @ts-nocheck
// Supabase Edge Function - Generates sitemaps dynamically
// Called after new article creation or on-demand

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SITE_URL = "https://whycreatives.in";

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const today = new Date().toISOString().split("T")[0];

    // Fetch all published insights
    const { data: insights, error: insightsError } = await supabase
      .from("insights")
      .select("slug, published_at, updated_at")
      .eq("is_published", true)
      .order("published_at", { ascending: false });

    if (insightsError) {
      throw new Error(`Failed to fetch insights: ${insightsError.message}`);
    }

    // Generate blog sitemap XML
    let blogSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- WhyCreatives Blog Sitemap - Auto-generated: ${today} -->
  
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
      blogSitemap += `
  <url>
    <loc>${SITE_URL}/insights/${insight.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    }

    blogSitemap += "\n</urlset>";

    // Generate main sitemap index
    const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- WhyCreatives Sitemap Index - Auto-generated: ${today} -->
  <sitemap>
    <loc>${SITE_URL}/sitemap-pages.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-services.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-locations.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/api/sitemap-blog</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>`;

    // Store sitemaps in database for caching
    const { error: upsertError } = await supabase
      .from("site_config")
      .upsert([
        { key: "sitemap_blog", value: blogSitemap, updated_at: new Date().toISOString() },
        { key: "sitemap_index", value: sitemapIndex, updated_at: new Date().toISOString() },
      ], { onConflict: "key" });

    if (upsertError) {
      console.log("Note: site_config table may not exist, sitemaps generated but not cached");
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Sitemaps generated successfully",
        articles_count: insights?.length || 0,
        generated_at: today,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: any) {
    console.error("Sitemap generation error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
