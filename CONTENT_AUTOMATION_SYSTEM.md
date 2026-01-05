# WhyCreatives - Automated Content Generation System

## Overview
This document contains the system prompt and setup instructions for automated daily blog content generation for https://whycreatives.in/insights

## CURRENT STATUS: ✅ DEPLOYED

### Edge Function
- **Name**: `generate-daily-insight`
- **URL**: `https://renskjrttadhptrwnobz.supabase.co/functions/v1/generate-daily-insight`
- **Status**: ACTIVE
- **JWT Verification**: Disabled (for cron access)

### Cron Schedule
- **Job Name**: `daily-insight-generation`
- **Schedule**: `30 3 * * *` (3:30 AM UTC = 9:00 AM IST)
- **Status**: ACTIVE

### Required Secret (MUST ADD)
You need to add the GROQ_API_KEY to Supabase Edge Function secrets:

1. Go to: https://supabase.com/dashboard/project/renskjrttadhptrwnobz/settings/functions
2. Click on "Edge Function Secrets"
3. Add: `GROQ_API_KEY` = your Groq API key from https://console.groq.com/keys

### Manual Trigger
```bash
curl -X POST 'https://renskjrttadhptrwnobz.supabase.co/functions/v1/generate-daily-insight'
```

---

## SYSTEM PROMPT FOR DAILY CONTENT GENERATION

The system prompt has been enhanced to generate professional, well-formatted articles with:

### Content Features:
- **Proper Markdown Structure**: Headers, bold text, lists, tables, blockquotes
- **Internal Links**: Natural links to /what-we-do, /contact, /our-work
- **Statistics & Data**: Relevant metrics and industry data
- **FAQ Section**: Schema-friendly Q&A format
- **Tables**: Comparison data and metrics
- **Pro Tips**: Highlighted actionable insights in blockquotes
- **Image Suggestions**: 3 Unsplash search terms per article

### Article Structure:
1. Hook paragraph with compelling stat/question
2. Context paragraph for Indian businesses
3. 4-6 H2 sections with actionable content
4. Bullet points and numbered lists
5. Data tables where relevant
6. FAQ section (3 questions)
7. Conclusion with soft CTA
8. Footer link to contact page

```
You are an expert SEO content writer for WhyCreatives (https://whycreatives.in), a creative agency based in Guwahati, Assam, India.

ROLE: Generate one high-quality, SEO-optimized insight article daily for the agency's blog section.

BRAND CONTEXT:
- WhyCreatives is India's most affordable creative agency
- Services: Video Production, Web Development, Digital Marketing, Branding, Motion Graphics, Logo Design
- Target audience: Indian businesses, startups, SMEs, entrepreneurs
- Tone: Professional, knowledgeable, helpful, not salesy
- Location focus: Pan-India with Northeast India expertise

CONTENT TOPICS (rotate daily):
1. Digital Marketing Strategies
2. Video Marketing & Production Tips
3. Web Design & Development Trends
4. Branding & Brand Identity
5. SEO & Content Marketing
6. Social Media Marketing
7. Business Growth & Startup Tips
8. Creative Industry Insights
9. Marketing Technology & Tools
10. Case Study Frameworks (without specific client names)

CONTENT REQUIREMENTS:
- Word count: 800-1,100 words
- Original, unique content (never duplicate previous articles)
- India-focused examples and context
- Actionable, practical advice
- Evergreen framing (avoid date-specific references)
- Professional agency tone
- No emojis
- No fluff or filler content
- No first-person unless editorially required

MANDATORY STRUCTURE:
1. SEO Title (55-65 characters, include primary keyword)
2. Meta Description (140-160 characters, compelling, include keyword)
3. URL Slug (kebab-case, 3-6 words, keyword-rich)
4. H1 (same as title)
5. Introduction (2-3 paragraphs, hook + context)
6. 4-6 H2 Sections (logical flow, keyword variations)
7. Bullet lists where helpful (3-7 items per list)
8. FAQ Section (2-3 questions with schema-friendly answers)
9. Soft CTA (agency-context, non-promotional)

SEO RULES:
- Primary keyword in: title, H1, first paragraph, one H2, meta description
- Secondary keywords naturally distributed
- No keyword stuffing (max 2% density)
- Internal-link friendly phrasing (mention "services", "portfolio", "contact")
- E-E-A-T aligned (expertise, experience, authority, trust)
- Mobile-friendly paragraph length (2-4 sentences)

OUTPUT FORMAT (JSON only):
{
  "title": "string (55-65 chars)",
  "meta_description": "string (140-160 chars)",
  "slug": "string (kebab-case)",
  "content_markdown": "string (full article in markdown)",
  "tags": ["string", "string", "string", "string", "string"],
  "category": "Insights",
  "author": "WhyCreatives Team",
  "read_time": number (estimated minutes),
  "is_published": true,
  "is_featured": false
}

HARD RULES:
- Output ONLY valid JSON, no explanations
- Never mention AI, GPT, LLMs, or automation
- Never reference sources like Reddit, Google News, etc.
- Never duplicate topics from recent articles
- Always generate fresh, unique perspectives
- Ensure content passes plagiarism checks
```

---

## SUPABASE EDGE FUNCTION SETUP

### 1. Create Edge Function
Create file: `supabase/functions/generate-daily-insight/index.ts`

### 2. Edge Function Code

```typescript
// supabase/functions/generate-daily-insight/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const SYSTEM_PROMPT = `You are an autonomous SEO content engine for WhyCreatives...` // Full prompt above

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get recent articles to avoid duplication
    const { data: recentArticles } = await supabaseClient
      .from('insights')
      .select('title, slug')
      .order('published_at', { ascending: false })
      .limit(10)

    const recentTopics = recentArticles?.map(a => a.title).join(', ') || ''

    // Call your preferred LLM API (OpenAI, Groq, Claude, etc.)
    const llmResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('GROQ_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: `Generate a new insight article. Avoid these recent topics: ${recentTopics}` }
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    })

    const llmData = await llmResponse.json()
    const articleJson = JSON.parse(llmData.choices[0].message.content)

    // Insert into database
    const { data, error } = await supabaseClient
      .from('insights')
      .insert({
        title: articleJson.title,
        slug: articleJson.slug,
        meta_description: articleJson.meta_description,
        content_markdown: articleJson.content_markdown,
        tags: articleJson.tags,
        category: articleJson.category || 'Insights',
        author: articleJson.author || 'WhyCreatives Team',
        read_time: articleJson.read_time || 7,
        is_published: true,
        is_featured: false,
        published_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw error

    return new Response(JSON.stringify({ success: true, article: data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
```

---

## CRON JOB SETUP (Daily at 9 AM IST)

### Option 1: Supabase pg_cron (Recommended)

```sql
-- Enable pg_cron extension
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule daily content generation at 9 AM IST (3:30 AM UTC)
SELECT cron.schedule(
  'daily-insight-generation',
  '30 3 * * *',  -- 3:30 AM UTC = 9:00 AM IST
  $$
  SELECT net.http_post(
    url := 'https://renskjrttadhptrwnobz.supabase.co/functions/v1/generate-daily-insight',
    headers := '{"Authorization": "Bearer YOUR_ANON_KEY"}'::jsonb
  );
  $$
);
```

### Option 2: External Cron Service (cron-job.org, EasyCron)

1. Create account at cron-job.org (free tier available)
2. Set up job:
   - URL: `https://renskjrttadhptrwnobz.supabase.co/functions/v1/generate-daily-insight`
   - Method: POST
   - Schedule: Daily at 9:00 AM IST
   - Headers: `Authorization: Bearer YOUR_ANON_KEY`

### Option 3: GitHub Actions

```yaml
# .github/workflows/daily-content.yml
name: Daily Content Generation

on:
  schedule:
    - cron: '30 3 * * *'  # 9 AM IST
  workflow_dispatch:  # Manual trigger

jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - name: Generate Daily Insight
        run: |
          curl -X POST \
            'https://renskjrttadhptrwnobz.supabase.co/functions/v1/generate-daily-insight' \
            -H 'Authorization: Bearer ${{ secrets.SUPABASE_ANON_KEY }}'
```

---

## ENVIRONMENT VARIABLES NEEDED

Add these to your Supabase Edge Function secrets:

```
SUPABASE_URL=https://renskjrttadhptrwnobz.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
GROQ_API_KEY=your_groq_api_key  # Or OpenAI/Claude key
```

---

## TOPIC ROTATION SCHEDULE

| Day | Topic Category |
|-----|----------------|
| Monday | Digital Marketing Strategies |
| Tuesday | Video Marketing & Production |
| Wednesday | Web Design & Development |
| Thursday | Branding & Identity |
| Friday | SEO & Content Marketing |
| Saturday | Social Media Marketing |
| Sunday | Business Growth Tips |

---

## MONITORING & QUALITY CHECKS

1. **Daily Check**: Verify new article published
2. **Weekly Review**: Check for duplicate content
3. **Monthly Audit**: Review SEO performance in GSC
4. **Quarterly**: Update system prompt based on performance

---

## MANUAL TRIGGER

To manually generate an article, call the Edge Function:

```bash
curl -X POST \
  'https://renskjrttadhptrwnobz.supabase.co/functions/v1/generate-daily-insight' \
  -H 'Authorization: Bearer YOUR_ANON_KEY' \
  -H 'Content-Type: application/json'
```

---

## SITEMAP AUTO-UPDATE ✅ FULLY AUTOMATED

The blog sitemap is now **100% automatic** - no manual work needed!

### How It Works

1. **Dynamic Sitemap Edge Function**: `sitemap-blog` 
   - URL: `https://renskjrttadhptrwnobz.supabase.co/functions/v1/sitemap-blog`
   - Generates XML sitemap on-the-fly from database
   - Always returns current articles
   - Cached for 1 hour for performance

2. **Netlify Redirect**: `/api/sitemap-blog` → Supabase Edge Function
   - Clean URL for Google Search Console

3. **Main Sitemap Index**: Points to dynamic blog sitemap
   - `https://whycreatives.in/sitemap.xml` includes all sitemaps
   - Blog sitemap URL: `https://whycreatives.in/api/sitemap-blog`

### Workflow

```
New Article Published → Database Updated → Sitemap Auto-Updates
                                              ↓
                              Google crawls /api/sitemap-blog
                                              ↓
                              New article indexed automatically
```

### Test the Dynamic Sitemap

```bash
curl https://renskjrttadhptrwnobz.supabase.co/functions/v1/sitemap-blog
```

### No Manual Steps Required!

- ✅ New articles automatically appear in sitemap
- ✅ No build/deploy needed for sitemap updates
- ✅ Google will crawl and find new content
- ✅ Sitemap always reflects current database state
