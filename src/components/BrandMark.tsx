/**
 * Which mark, or which monogram, stands for a given tool or account name.
 *
 * Keyed on the exact strings used in `@/data/services` and the footer's account list, so
 * a tool renamed there without a matching entry here falls through to the generated
 * monogram rather than to a blank square.
 *
 * ── Why some of these are monograms ──
 *
 * Adobe and LinkedIn are not in Simple Icons; both asked to be removed, and Frame.io and
 * CapCut were never in it. There is no path data we can license, so those get two
 * letters instead. For the Adobe apps that is not a compromise: "Pr", "Ae", "Ps", "Ai"
 * and "Au" are the abbreviations Adobe's own product icons use, so the row reads
 * correctly to anyone who has opened them.
 *
 * ── Why several names share a mark ──
 *
 * A company mark is the honest glyph for a product that has no mark of its own. "GA4" is
 * Google Analytics. "D1 / KV / R2" are three Cloudflare storage products. "Instagram
 * Reels" is a feature of Instagram, not a separate brand. Inventing per-product glyphs
 * would be inventing brand marks.
 */
const MARK: Record<string, { slug?: string; monogram?: string }> = {
  /* Video */
  "Adobe Premiere Pro": { monogram: "Pr" },
  "Premiere Pro": { monogram: "Pr" },
  "After Effects": { monogram: "Ae" },
  "Adobe Audition": { monogram: "Au" },
  "DaVinci Resolve": { slug: "davinciresolve" },
  "Frame.io": { monogram: "Fr" },

  /* Build */
  "Next.js": { slug: "nextdotjs" },
  React: { slug: "react" },
  TypeScript: { slug: "typescript" },
  Vite: { slug: "vite" },
  Flutter: { slug: "flutter" },
  /* The dataset registers React Native as an alias of React, so this is upstream's
     own answer rather than a substitution of ours. */
  "React Native": { slug: "react" },
  Swift: { slug: "swift" },
  Kotlin: { slug: "kotlin" },
  "Node.js": { slug: "nodedotjs" },
  Supabase: { slug: "supabase" },
  "Cloudflare Workers": { slug: "cloudflareworkers" },
  "D1 / KV / R2": { slug: "cloudflare" },
  PostgreSQL: { slug: "postgresql" },
  "REST / GraphQL": { slug: "graphql" },

  /* Brand and design */
  Figma: { slug: "figma" },
  "Adobe Illustrator": { monogram: "Ai" },
  Photoshop: { monogram: "Ps" },
  Notion: { slug: "notion" },
  "Google Fonts": { slug: "googlefonts" },

  /* Channels and growth */
  "Meta Business Suite": { slug: "meta" },
  "Meta Ads": { slug: "meta" },
  LinkedIn: { monogram: "in" },
  "LinkedIn Campaign Manager": { monogram: "in" },
  "YouTube Studio": { slug: "youtubestudio" },
  "YouTube Shorts": { slug: "youtubeshorts" },
  "Instagram Reels": { slug: "instagram" },
  CapCut: { monogram: "Cc" },
  "Google Ads": { slug: "googleads" },
  GA4: { slug: "googleanalytics" },
  "Google Tag Manager": { slug: "googletagmanager" },
  "Search Console": { slug: "googlesearchconsole" },
  "Looker Studio": { slug: "looker" },

  /* Footer accounts */
  Instagram: { slug: "instagram" },
  WhatsApp: { slug: "whatsapp" },
  X: { slug: "x" },
};

/** Initials, for a name with neither a mark nor an entry above. */
const initials = (name: string) =>
  name
    .replace(/[^A-Za-z0-9 ]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("");

/**
 * A brand mark for `name`, drawn in `currentColor`.
 *
 * Always renders something. A name with a vendored mark gets the mark; anything else
 * gets a monogram in the mono face, which on a monochrome site sits in the same visual
 * language rather than reading as a failed image.
 *
 * `currentColor` and not the brand hex on purpose — the site is monochrome, and 25 brand
 * colours in one grid is the loudest thing that could go on a page whose whole argument
 * is restraint. The mark carries the recognition; the colour would only carry noise.
 *
 * ── Why the caller supplies `marks` ──
 *
 * The path data is the heavy part, and this component is used in two places with very
 * different budgets: the footer is on every page, the service detail page is lazy. If
 * this module imported the full set, the footer would pull all 25 tool logos into the
 * entry chunk to draw three buttons — measured at +28KB. Taking the record as a prop
 * means each caller's import decides what ships, and the choice is visible at the
 * import rather than buried in here.
 */
export const BrandMark = ({
  name,
  marks,
  className = "h-4 w-4",
}: {
  name: string;
  /** Slug → path data. `SOCIAL_MARKS` for the footer, `BRAND_MARKS` for tool lists. */
  marks: Record<string, string>;
  className?: string;
}) => {
  const entry = MARK[name];
  const path = entry?.slug ? marks[entry.slug] : undefined;

  if (path) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`shrink-0 ${className}`}
        aria-hidden="true"
        focusable="false"
      >
        <path d={path} />
      </svg>
    );
  }

  return (
    <span
      /* Sized in `em` so the monogram tracks whatever type size the mark sits in,
         instead of needing a second class alongside every `className` above. */
      className={`shrink-0 select-none font-mono text-[0.72em] font-bold leading-none tracking-tight ${className} grid place-content-center`}
      aria-hidden="true"
    >
      {entry?.monogram ?? initials(name)}
    </span>
  );
};
