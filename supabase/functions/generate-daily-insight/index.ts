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

const SYSTEM_PROMPT = `You are an expert SEO content writer for WhyCreatives (https://whycreatives.in), a creative agency based in Agartala, Tripura, India.

BRAND CONTEXT:
- India's most affordable creative agency
- Services: Video Production, Web Development, Digital Marketing, Branding, Motion Graphics, Logo Design
- Target: Indian businesses, startups, SMEs, entrepreneurs
- Tone: Professional, knowledgeable, helpful, actionable

CONTENT REQUIREMENTS:
- Word count: 900-1,200 words
- Original, unique, plagiarism-free content
- India-focused examples and statistics
- Actionable tips and practical advice
- Professional tone, no emojis, no fluff
- Include relevant data points and statistics

MANDATORY MARKDOWN STRUCTURE:

# {Title}

{Opening paragraph - hook the reader with a compelling stat or question}

{Second paragraph - context and why this matters for Indian businesses}

## {Section 1 Title}

{2-3 paragraphs with actionable content}

**Key Takeaway:** {One sentence summary}

## {Section 2 Title}

{Content with bullet points where appropriate}

- **Point 1:** Description
- **Point 2:** Description
- **Point 3:** Description

## {Section 3 Title}

{Include a numbered list or step-by-step guide}

1. **Step One** - Description
2. **Step Two** - Description
3. **Step Three** - Description

## {Section 4 Title}

{Real-world application or case study framework}

> **Pro Tip:** {Actionable insight in blockquote}

## Key Statistics to Remember

| Metric | Value | Source |
|--------|-------|--------|
| {Stat 1} | {Value} | Industry Report |
| {Stat 2} | {Value} | Research Study |

## Frequently Asked Questions

### {Question 1}?

{Detailed answer in 2-3 sentences}

### {Question 2}?

{Detailed answer in 2-3 sentences}

### {Question 3}?

{Detailed answer in 2-3 sentences}

## Conclusion

{Summary paragraph with call-to-action}

---

*Looking for professional {service} services? [Contact WhyCreatives](/contact) for a free consultation.*

INTERNAL LINKING RULES:
- Include 2-3 internal links naturally in the content
- Use these link formats:
  - [video production services](/what-we-do)
  - [our portfolio](/our-work)
  - [contact us](/contact)
  - [web development](/what-we-do)
  - [digital marketing](/what-we-do)
  - [branding services](/what-we-do)

IMAGE SUGGESTIONS:
- Suggest 3 relevant Unsplash image search terms
- Images should be professional, business-focused
- Include suggested alt text for each image

OUTPUT FORMAT (JSON only):
{
  "title": "string (55-65 chars, include primary keyword)",
  "meta_description": "string (140-160 chars, compelling, include keyword)",
  "slug": "string (kebab-case, 3-6 words)",
  "content_markdown": "string (full article with proper markdown formatting)",
  "tags": ["Primary Tag", "Secondary Tag", "Tertiary Tag", "India", "Business"],
  "category": "Insights",
  "author": "WhyCreatives Team",
  "read_time": number,
  "featured_image_suggestions": [
    {"search_term": "string", "alt_text": "string"},
    {"search_term": "string", "alt_text": "string"},
    {"search_term": "string", "alt_text": "string"}
  ]
}

HARD RULES:
- Output ONLY valid JSON, no markdown code blocks around it
- Never mention AI, GPT, LLMs, or automation
- Never duplicate recent topics
- Use proper markdown: headers, bold, lists, tables, blockquotes
- Include internal links naturally
- Make content scannable with clear hierarchy`;

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
      .select("title, slug, category, tags")
      .order("published_at", { ascending: false })
      .limit(15);

    const recentTopics = recentArticles?.map((a: any) => a.title).join("; ") || "None";
    const recentTags = [...new Set(recentArticles?.flatMap((a: any) => a.tags || []))].join(", ");

    const dayOfWeek = new Date().getDay();
    const topicRotation = [
      "Business Growth Strategies for Indian Startups",
      "Digital Marketing Trends and Best Practices",
      "Video Marketing and Content Creation Tips",
      "Web Design and User Experience Optimization",
      "Brand Building and Identity Development",
      "SEO and Content Marketing Strategies",
      "Social Media Marketing for Indian Businesses",
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
              content: `Generate a comprehensive insight article about "${todaysTopic}".

AVOID these recent topics (create something unique): ${recentTopics}

Recent tags used (vary your tags): ${recentTags}

Requirements:
1. Make it highly relevant to Indian businesses
2. Include actionable tips they can implement today
3. Use proper markdown formatting throughout
4. Include 2-3 internal links to WhyCreatives pages
5. Suggest 3 professional stock image search terms

Output ONLY the JSON object, no explanation.`,
            },
          ],
          temperature: 0.85,
          max_tokens: 5000,
        }),
      }
    );

    if (!llmResponse.ok) {
      const errorText = await llmResponse.text();
      throw new Error(`Groq API error: ${llmResponse.status} - ${errorText}`);
    }

    const llmData = await llmResponse.json();
    let rawContent = llmData.choices[0].message.content.trim();

    // Clean JSON response
    if (rawContent.startsWith("```json")) {
      rawContent = rawContent.slice(7);
    } else if (rawContent.startsWith("```")) {
      rawContent = rawContent.slice(3);
    }
    if (rawContent.endsWith("```")) {
      rawContent = rawContent.slice(0, -3);
    }

    const articleJson = JSON.parse(rawContent.trim());

    if (!articleJson.title || !articleJson.slug || !articleJson.content_markdown) {
      throw new Error("Generated article missing required fields");
    }

    // Store image suggestions in a JSON field or separate
    const imageData = articleJson.featured_image_suggestions 
      ? JSON.stringify(articleJson.featured_image_suggestions)
      : null;

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
        read_time: articleJson.read_time || 8,
        is_published: true,
        is_featured: false,
        published_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Database insert error: ${error.message}`);
    }

    console.log(`Successfully generated: ${data.title}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Article generated successfully",
        article: {
          id: data.id,
          title: data.title,
          slug: data.slug,
          read_time: data.read_time,
        },
        image_suggestions: articleJson.featured_image_suggestions,
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
