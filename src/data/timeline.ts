/**
 * The studio's run of years, for the About page.
 *
 * ── Read this before changing the copy ──
 *
 * The only date this repository can actually evidence is the footer's "Crafting since
 * 2020". There is no milestone record anywhere in the project — no history in the About
 * page, nothing in the content hooks, nothing in `public/`. So the *chronology* below is
 * not sourced: which service arrived in which year is a reasonable reading of how a studio
 * like this grows, and it needs the studio's sign-off before it can be called accurate.
 *
 * What the copy does do is stay out of trouble while that happens. Each entry describes one
 * of the six services in `@/data/services` — real, already-published capability — and
 * every line is deliberately free of anything checkable: no client counts, no countries, no
 * headcount, no awards, no offices, no revenue.
 *
 * `tag` is the short rotated label that overlaps the year. `body` is two or three sentences
 * at most — the panel is a beat in a sequence, not a page.
 *
 * `lead` + `loop` is the tile: a short sentence whose last words cycle, so it always reads
 * as one line of meaning ("Now building — web apps") rather than a word floating on its
 * own. Every `loop` item must finish `lead` grammatically, and every one must be something
 * the year's `body` already says. Keep them to 14 characters or fewer so each fits one line.
 */
export type TimelineYear = {
  year: string;
  tag: string;
  body: string;
  lead: string;
  loop: string[];
};

export const TIMELINE: TimelineYear[] = [
  {
    year: "2021",
    tag: "Edit room",
    lead: "Every edit built around",
    loop: ["the hook", "rhythm", "sound", "colour"],
    body: "Post-production as the core of the studio. Hook, structure, rhythm, sound and colour treated as one system rather than as separate passes, and cut for the platform a piece would live on instead of resized at the end.",
  },
  {
    year: "2022",
    tag: "Build",
    lead: "The studio starts building",
    loop: ["websites", "web apps", "mobile apps", "integrations"],
    body: "Engineering alongside the edit. Marketing sites, web apps and mobile builds scoped around users, content and integrations rather than started from a template.",
  },
  {
    year: "2023",
    tag: "Brand",
    lead: "Brand work shaped around",
    loop: ["positioning", "pillars", "formats", "art direction"],
    body: "Positioning turned into something publishable. Content pillars, repeatable formats and art direction a team can actually hold to once the launch is over.",
  },
  {
    year: "2024",
    tag: "Measure",
    lead: "Growth work judged on",
    loop: ["real actions", "clean tracking", "tested spend", "clear signal"],
    body: "Acquisition work joined the studio, judged on qualified actions rather than reach. Tracking validated before spend, and every decision documented against the signal it was made on.",
  },
  {
    year: "2025",
    tag: "Creator work",
    lead: "Content made with",
    loop: ["creators", "real scripts", "native formats", "live demos"],
    body: "Platform-native content and creator collaborations, written around how people actually find a product and weigh it up — the objection first, the demonstration second.",
  },
  {
    year: "2026",
    tag: "One team",
    lead: "One team for",
    loop: ["video", "web", "brand", "growth", "all of it"],
    body: "Six services under one roof, scoped honestly. A brief no longer has to be split across three agencies and stitched back together at the end.",
  },
];
