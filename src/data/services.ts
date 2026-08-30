/**
 * The six services, in one place.
 *
 * This copy previously existed twice: once in `ServiceDetails` (title, subtitle,
 * description, outcomes, deliverables, process, tools) and again in `WhatWeDo` as a
 * separate, shorter list with its own `tagline`, `body` and three-item `points`. Two
 * hand-maintained descriptions of the same six services is a drift hazard — and it had
 * already drifted: the two files disagreed on whether the third service is called
 * "Brand Presence" or "Brand Presence & Social Systems".
 *
 * One record now, read by both. The services page shows a subset of the fields; the
 * detail page shows all of them.
 *
 * `slug` doubles as the detail-page key and the route, so a service cannot be listed
 * with a link that goes nowhere.
 */
export type Service = {
  slug: string;
  /**
   * One-word category, used for the panel eyebrow and the deliverables heading.
   * Deliberately short — it sits in a tracked-out mono label where a long word wraps.
   */
  display: string;
  title: string;
  /** One-line positioning statement. */
  subtitle: string;
  /** The full paragraph. */
  description: string;
  outcomes: string[];
  deliverables: string[];
  process: string[];
  tools: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "video-production",
    display: "Video",
    title: "Video Editing & Motion Design",
    subtitle:
      "Post-production for campaigns, launches and everyday content — you supply the footage, we deliver the cut.",
    /* Post-production studio: the footage arrives from the client. Nothing here
       promises a crew, a camera or a shoot day. */
    description:
      "We shape the footage you already have into clear, watchable stories—planning the hook, edit rhythm, sound, colour and motion as one system. The result is content designed for the platform it will live on, not a generic cut resized at the end.",
    outcomes: [
      "Stronger first-three-second hooks",
      "A repeatable visual language",
      "Platform-ready masters and cut-downs",
    ],
    deliverables: [
      "Edit direction, structure and pacing",
      "Short-form reels, ads and social edits",
      "Brand films, explainers and launch videos",
      "Motion graphics, captions, sound design and colour",
    ],
    process: [
      "Align on audience, channel and objective",
      "Review the footage and set the edit direction",
      "Edit, review and refine in clear rounds",
      "Export, quality-check and hand over masters",
    ],
    tools: [
      "Adobe Premiere Pro",
      "After Effects",
      "DaVinci Resolve",
      "Adobe Audition",
      "Frame.io",
    ],
  },
  {
    slug: "web-development",
    display: "Build",
    title: "Web & App Development",
    subtitle:
      "Fast, maintainable digital products designed around real business workflows.",
    description:
      "We design and engineer marketing sites, web applications, SaaS products, dashboards, e-commerce experiences and mobile apps. Mobile work is built cross-platform in Flutter or React Native where one codebase serves both stores, and fully native in Swift or Kotlin where the app depends on platform features that a shared layer cannot reach. Every build is scoped around users, content, integrations, security and measurable performance—not a pre-selected template.",
    outcomes: [
      "A product people can use confidently",
      "Fast pages and resilient infrastructure",
      "A codebase your team can extend",
    ],
    deliverables: [
      "Product discovery, UX flows and UI systems",
      "Responsive websites and progressive web apps",
      "Flutter and React Native apps, or fully native iOS and Android",
      "APIs, authentication, databases, CMS and payments",
    ],
    process: [
      "Map goals, users, data and integrations",
      "Prototype the critical journeys",
      "Build in testable milestones",
      "Launch, monitor and document the handover",
    ],
    tools: [
      "Next.js",
      "React",
      "TypeScript",
      "Vite",
      "Flutter",
      "React Native",
      "Swift",
      "Kotlin",
      "Node.js",
      "Tailwind CSS",
      "Supabase",
      "Cloudflare Workers",
      "D1 / KV / R2",
      "Neon",
      "PostgreSQL",
      "REST / GraphQL",
    ],
  },
  {
    slug: "brand-presence",
    display: "Brand",
    title: "Brand Presence & Social Systems",
    subtitle:
      "A recognisable brand voice and content system across every active channel.",
    description:
      "We turn positioning into a practical publishing system: clear themes, repeatable formats, consistent art direction and reporting that helps the next month improve on the last.",
    outcomes: [
      "A consistent public identity",
      "Faster, easier content decisions",
      "Useful audience and content insights",
    ],
    deliverables: [
      "Channel and competitor audit",
      "Content pillars and monthly planning",
      "Design templates, copy and publishing support",
      "Community workflows and performance reports",
    ],
    process: [
      "Audit the brand and audience",
      "Define themes, voice and formats",
      "Produce and approve the content cycle",
      "Publish, learn and iterate",
    ],
    tools: [
      "Figma",
      "Adobe Illustrator",
      "Photoshop",
      "Notion",
      "Meta Business Suite",
      "LinkedIn",
      "YouTube Studio",
    ],
  },
  {
    slug: "performance-marketing",
    display: "Growth",
    title: "Performance Marketing",
    subtitle:
      "Measured acquisition systems built around qualified actions, not vanity metrics.",
    description:
      "We connect campaign strategy, creative testing, landing-page experience and measurement. Decisions are documented against the signals that matter to the business: leads, purchases, acquisition cost and conversion quality.",
    outcomes: [
      "Reliable campaign measurement",
      "Clear creative and audience learnings",
      "A practical path to scale",
    ],
    deliverables: [
      "Account, funnel and tracking audit",
      "Search, social and retargeting campaigns",
      "Creative testing and landing-page recommendations",
      "Dashboards, reporting and optimisation notes",
    ],
    process: [
      "Agree on the commercial conversion",
      "Validate tracking and the offer",
      "Launch controlled tests",
      "Optimise from evidence and report clearly",
    ],
    tools: [
      "Google Ads",
      "Meta Ads",
      "LinkedIn Campaign Manager",
      "GA4",
      "Google Tag Manager",
      "Search Console",
      "Looker Studio",
    ],
  },
  {
    slug: "ugc-collaborations",
    display: "Content",
    title: "UGC Reels & Creator Collaborations",
    subtitle:
      "Natural, platform-native creative that demonstrates the product without feeling scripted.",
    description:
      "We develop the angle, hook, script and shot plan around how real customers discover and evaluate a product. Content can be delivered for the brand's own channels, paid campaigns or an agreed creator collaboration.",
    outcomes: [
      "More believable product stories",
      "Multiple hooks for creative testing",
      "Ready-to-publish vertical assets",
    ],
    deliverables: [
      "Concepts, hooks and conversational scripts",
      "Shot lists and product demonstration plans",
      "UGC reels, cut-downs and caption options",
      "Usage-rights and collaboration scope documented per brief",
    ],
    process: [
      "Understand the product and audience objection",
      "Approve concepts and usage channels",
      "Produce and edit the selected directions",
      "Review, deliver and archive approved masters",
    ],
    tools: [
      "Instagram Reels",
      "YouTube Shorts",
      "Premiere Pro",
      "CapCut",
      "After Effects",
      "Frame.io",
    ],
  },
  {
    slug: "logo-design",
    display: "Design",
    title: "Logo & Brand Identity",
    subtitle:
      "Distinct visual identities designed to work from an app icon to a storefront.",
    description:
      "We begin with context—category, audience, competition and ambition—then build a coherent identity rather than an isolated logo. Every decision is tested for legibility, flexibility and real-world use.",
    outcomes: [
      "A distinctive, ownable identity",
      "Consistent application across channels",
      "Practical files your team can use",
    ],
    deliverables: [
      "Research and visual direction",
      "Logo system and responsive variations",
      "Colour, typography and supporting graphic language",
      "Usage guidelines and production-ready assets",
    ],
    process: [
      "Discover the brand and market",
      "Agree on creative territories",
      "Develop and test the identity system",
      "Refine, document and hand over",
    ],
    tools: [
      "Figma",
      "Adobe Illustrator",
      "Photoshop",
      "After Effects",
      "Google Fonts",
    ],
  },
];

/** Slug lookup for the detail route. */
export const SERVICES_BY_SLUG: Record<string, Service> = Object.fromEntries(
  SERVICES.map((service) => [service.slug, service]),
);
