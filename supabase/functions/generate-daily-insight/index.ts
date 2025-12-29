// @ts-nocheck
// Supabase Edge Function - Runs in Deno runtime
// TypeScript errors in VS Code are expected as this uses Deno APIs

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are an autonomous SEO content engine for WhyCreatives (https://whycreatives.in), a creative agency based in Agartala, Tripura, India.

ROLE: Generate one high-quality, SEO-optimized insight article daily.

BRAND CONTEXT:
- WhyCreatives is India's most affordable creative agency
- Services: Video Production, Web Development, Digital Marketing, Branding, Motion Graphics, Logo Design
- Target audience: Indian businesses, startups, SMEs, entrepreneurs
- Tone: Professional, knowledgeable, helpful, not salesy

CONTENT REQUIREMENTS:
- Word count: 800-1,100 words
- Original, unique content
- India-focused examples
- Actionable, practical advice
- Professional agency tone
- No emojis, no fluff

MANDATORY STRUCTURE:
1. SEO Title (55-65 characters)
2. Meta Description (140-160 characters)
3. URL Slug (kebab-case, 3-6 words)
4. Introduction (2-3 paragraphs)
5. 4-6 H2 Sections
6. Bullet lists where helpful
7. FAQ Section (2-3 questions)
8. Soft CTA

OUTPUT FORMAT (JSON only):
{
  "title": "string",
  "meta_description": "string",
  "slug": "string",
  "content_markdown": "string",
  "tags": ["string"],
  "category": "Insights",
  "author": "WhyCreatives Team",
  "read_time": number
}

HARD RULES:
- Output ONLY valid JSON
- Never mention AI, GPT, LLMs
- Never duplicate recent topics`;

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const groqApiKey = Deno.env.get("GROQ_API_KEY") ?? "";

    if (!groqApiKey) {
      throw new Error("GROQ_API_KEY is not configured");
    }

    const supabaseClient = createClient(supabaseUrl, supabaseServiceKey);

    const { data: recentArticles } = await supabaseClient
      .from("insights")
      .select("title, slug, category")
      .order("published_at", { ascending: false })
      .limit(10);

    const recentTopics =
      recentArticles?.map((a: any) => `${a.title}`).join("; ") || "None";

    const dayOfWeek = new Date().getDay();
    const topicRotation = [
      "Business Growth Tips",
      "Digital Marketing Strategies",
      "Video Marketing Tips",
      "Web Design Trends",
      "Branding & Identity",
      "SEO & Content Marketing",
      "Social Media Marketing",
    ];
    const todaysTopic = topicRotation[dayOfWeek];

    const llmResponse = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${groqApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            {
              role: "user",
              content: `Generate a new insight article about "${todaysTopic}". AVOID these recent topics: ${recentTopics}. Output ONLY JSON.`,
            },
          ],
          temperature: 0.8,
          max_tokens: 4000,
        }),
      }
    );

    if (!llmResponse.ok) {
      const errorText = await llmResponse.text();
      throw new Error(`Groq API error: ${llmResponse.status} - ${errorText}`);
    }

    const llmData = await llmResponse.json();
    let rawContent = llmData.choices[0].message.content.trim();

    if (rawContent.startsWith("```json")) {
      rawContent = rawContent.slice(7);
    } else if (rawContent.startsWith("```")) {
      rawContent = rawContent.slice(3);
    }
    if (rawContent.endsWith("```")) {
      rawContent = rawContent.slice(0, -3);
    }

    const articleJson = JSON.parse(rawContent.trim());

    if (
      !articleJson.title ||
      !articleJson.slug ||
      !articleJson.content_markdown
    ) {
      throw new Error("Generated article missing required fields");
    }

    const { data, error } = await supabaseClient
      .from("insights")
      .insert({
        title: articleJson.title,
        slug: articleJson.slug,
        meta_description: articleJson.meta_description,
        content_markdown: articleJson.content_markdown,
        tags: articleJson.tags || ["Marketing", "Business", "India"],
        category: articleJson.category || "Insights",
        author: articleJson.author || "WhyCreatives Team",
        read_time: articleJson.read_time || 7,
        is_published: true,
        is_featured: false,
        published_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Database insert error: ${error.message}`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Article generated successfully",
        article: {
          id: data.id,
          title: data.title,
          slug: data.slug,
        },
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error generating insight:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
