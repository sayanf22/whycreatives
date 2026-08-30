import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { RevealLines } from "@/components/RevealLines";
import {
  ArrowUpRight,
  Clapperboard,
  Film,
  Globe,
  Palette,
  PenTool,
  Search,
  Smartphone,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Arrow micro-interaction: on hover the visible arrow travels out through the
 * top-right while an identical copy enters from the bottom-left. The fixed-size
 * wrapper masks both, so the icon reads as a continuous loop rather than a
 * nudge. Driven by the parent's `group` class, so it costs no state or JS.
 */
const ArrowSwap = () => (
  <span
    className="relative block h-[18px] w-[18px] overflow-hidden"
    aria-hidden="true"
  >
    <ArrowUpRight
      className="absolute inset-0 h-full w-full transition-transform duration-300 ease-out group-hover:translate-x-full group-hover:-translate-y-full"
      strokeWidth={2.5}
    />
    <ArrowUpRight
      className="absolute inset-0 h-full w-full -translate-x-full translate-y-full transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0"
      strokeWidth={2.5}
    />
  </span>
);

/* Four deliberate desktop lines.
   
   The second line is the widest on purpose, and the first is clearly shorter:
   `alignFirstLineRightEdge` measures both and indents line one so it ends
   exactly where line two ends. The previous break had lines one and two at
   almost identical widths, so any indent pushed line one past line two and
   broke the block's right edge.

   The closing line is the shortest, which is what makes the paragraph read as
   finished rather than truncated. */
const STATEMENT_LINES = [
  "An independent studio",
  "in India crafting video, motion",
  "design, websites, apps and",
  "brands built to grow.",
] as const;

/**
 * Size of the opening line on phones. The rest of the block is a fixed fraction
 * of it, so the whole statement tracks the viewport off this one clamp.
 *
 * 12vw is the largest value every line survives, measured against the faces this
 * actually renders in — the family stack names three webfonts, none of which are
 * loaded, so every device falls through to its system sans. At 320px, the
 * tightest viewport worth supporting, the measure is 288px and the widest line
 * lands at 91% of it.
 *
 * Setting the opening line bold costs less width than it looks like it should:
 * bold runs wider, but it also wants tighter tracking, and -0.05em against the
 * -0.045em it had at 500 gives most of that back. Net is about 3%, so it did not
 * force the size down.
 *
 * The 2rem floor is a guard for widths under 267px. The 4.5rem ceiling engages
 * from 600px up and stops the display line growing to fill a near-tablet measure
 * it was never cut for.
 */
const PHONE_STATEMENT_BASE = "clamp(2rem, 12vw, 4.5rem)";

/**
 * How much smaller the body of the statement is set than its opening line.
 *
 * Far enough down that the two tiers are unmistakably different sizes rather
 * than looking like a failed attempt at one size, and no further — the body is
 * still the same sentence, so it has to stay display type, not caption type.
 */
const PHONE_STATEMENT_BODY_RATIO = 0.52;

/**
 * The body of the statement on phones: three lines, one size, one tracking.
 *
 * Breaks are set, not left to wrap, and they land on the sentence's own commas
 * so no phrase is cut in half — "motion design" and "crafting video" each stay
 * whole, which is what the desktop break-set could not do in a narrow measure.
 *
 * They are also chosen so the three lines come out close to the same width, so
 * the block reads as a set paragraph with a short last line. At 390px they fill
 * 81%, 83% and 70% of the measure. Verified against the system-sans fallbacks
 * from 320px to 767px: nothing wraps, so all three hold their single size rather
 * than one of them silently spilling onto a fourth line.
 */
const PHONE_STATEMENT_BODY = [
  "studio in India crafting video,",
  "motion design, websites, apps",
  "and brands built to grow.",
] as const;

/**
 * The statement, re-broken and re-set for phones.
 *
 * Running the desktop four-line set down here failed twice over. The breaks are
 * cut to a wide measure, so in a narrow column they land mid-phrase — "crafting
 * video, motion / design, websites" splits "motion design", and "apps and /
 * brands" splits again — and type broken against its own phrases reads as
 * accidental wrapping rather than as set copy. And four lines at one flat size
 * filling the whole screen gave the eye nothing to enter on.
 *
 * So: two tiers. The opening two words carry the size, then the sentence drops
 * once to a single smaller size and stays there, every line flush to the same
 * left edge. One step, not a ramp — a per-line ramp was the previous attempt at
 * this and it just produced five mismatched lines.
 *
 * Tracking is set per tier. -0.045em is what keeps the display line from
 * looking loose; the same value at 24px closes the counters up and makes the
 * line muddy, so the body runs looser.
 */
const PHONE_STATEMENT_LINES: { text: string; style: React.CSSProperties }[] = [
  {
    text: "An independent",
    style: {
      fontSize: PHONE_STATEMENT_BASE,
      /* 700 against the body's 500. None of the fallback faces this actually
         renders in ship a 500, so 500 resolves to regular and 700 to bold — the
         two tiers separate on weight as well as size rather than the weight
         difference quietly collapsing. */
      fontWeight: 700,
      lineHeight: 1.02,
      /* Bold sets wider and needs pulling in harder than the same face at
         regular, so this is tighter than it would be at 500. */
      letterSpacing: "-0.05em",
    },
  },
  ...PHONE_STATEMENT_BODY.map((text, i) => ({
    text,
    style: {
      /* One expression, shared by all three lines, so the body cannot drift out
         of a single size. */
      fontSize: `calc(${PHONE_STATEMENT_BASE} * ${PHONE_STATEMENT_BODY_RATIO})`,
      fontWeight: 500,
      /* Looser than the display line: three lines read as a paragraph and need
         the leading of one. */
      lineHeight: 1.3,
      letterSpacing: "-0.022em",
      /* Only the first body line carries the tier gap. Without it the display
         line's descenders sit ~4px off this line's cap height, which reads as a
         collision rather than as two tiers. */
      marginTop: i === 0 ? "0.4em" : undefined,
    } as React.CSSProperties,
  })),
];

/* Capability strip standing in for a client-logo wall: monochrome lockups,
   wide even spacing, no separators and no accent colour — the reference strip
   reads as restrained wordmarks, and anything coloured breaks that. */
const CAPABILITIES = [
  { label: "Video Editing", Icon: Clapperboard },
  { label: "Motion Design", Icon: Sparkles },
  { label: "Colour Grading", Icon: Palette },
  { label: "Short-Form Reels", Icon: Film },
  { label: "Web Development", Icon: Globe },
  { label: "App Development", Icon: Smartphone },
  { label: "Brand Identity", Icon: PenTool },
  { label: "Performance Ads", Icon: TrendingUp },
  { label: "SEO", Icon: Search },
];

export const AgencyIntro = () => {
  const stripRef = useRef<HTMLDivElement>(null);
  const [stripRunning, setStripRunning] = useState(false);

  /* Only run the strip while it is near the viewport. The margin gets it up to
     speed before it arrives, so it never appears to lurch into motion. */
  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setStripRunning(entry.isIntersecting),
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      className="w-full overflow-hidden bg-background font-['Schibsted_Grotesk',sans-serif]"
      style={{
        paddingTop: "clamp(64px, 8vw, 140px)",
        paddingBottom: "clamp(56px, 7vw, 120px)",
      }}
    >
      {/* ── WHO ARE WE ─────────────────────────────────────────────── */}
      {/* The label is lifted out of the flow at lg so it no longer pushes the
          statement into a right-hand column — that offset is what made the
          block sit left of centre. It now keeps its far-left position while the
          statement centres against the full content width. */}
      <div className="relative px-4 md:px-[clamp(32px,6vw,160px)]">
        {/* The label leads the statement in, so the whole block animates as one
            gesture rather than the heading appearing beside static text. */}
        <motion.div
          /*
            Eyebrow styling matches the rest of the site — Selected work, Our
            Expertise, Don't believe the hype? are all uppercase, weighted and
            tracked out. This one was plain `text-xs` with none of that, so on a
            desktop it read as a stray line of small body copy dropped in the
            corner rather than as a section label, which is what "too small"
            actually was: 12px regular sentence case next to 72px display type.

            `lg:left-6` rather than `left-0`. Absolute offsets resolve against
            the padding box, so `left-0` put the label hard against the viewport
            edge, not against the gutter. It cannot go all the way out to the
            content gutter either: at 1024px that leaves only ~11px before the
            centred statement, so 24px is the compromise that keeps it clear of
            both the edge and the type.
          */
          className="mb-7 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground lg:absolute lg:left-6 lg:top-2 lg:mb-0 lg:text-sm"
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
          Who are we?
        </motion.div>

        {/* w-fit shrinks the block to its widest line so mx-auto can centre the
            type itself rather than a full-width column. max-w-full keeps it
            inside the gutters if the clamp ever outgrows the viewport. */}
        <div className="lg:mx-auto lg:w-fit lg:max-w-full">
          {/*
            Two break-sets, one per measure, rather than one set left to wrap.

            Only one is ever in the layout — the other is `display: none`, which
            also takes it out of the accessibility tree, so the sentence is still
            announced exactly once. The size and tracking live on each branch
            because they are the difference between them; the weight is shared.
          */}
          <h2 className="text-left text-foreground" style={{ fontWeight: 500 }}>
            {/* Phone: one display line, then the body at one size. Size,
                leading and tracking are all per line here, so this branch sets
                none of its own. */}
            <span className="block md:hidden">
              <RevealLines lines={PHONE_STATEMENT_LINES} className="block" />
            </span>

            {/* md and up: the original four-line block, with the measured
                first-line indent that squares its right edge. */}
            <span
              className="hidden md:block"
              style={{
                fontSize: "clamp(2.3rem, 5vw, 6.25rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.045em",
              }}
            >
              <RevealLines
                lines={STATEMENT_LINES}
                className="block"
                nowrapFromLg
                alignFirstLineRightEdge
              />
            </span>
          </h2>

          {/*
            Neither CTA moves on hover. A hover lift shifts the button out from
            under the pointer, so near the edge the hover state toggles on and
            off and the button visibly shakes. The feedback instead comes from
            things that leave the hit area untouched: colour, a shadow, and the
            arrow swap. Scale is kept for `active` only, where the pointer is
            already held down and cannot oscillate.
          */}
          <motion.div
            /* Pulled in on phones: the statement now ends on its smallest line,
               so a 40px gap there read as a hole between the copy and the CTAs
               rather than as a break. */
            className="mt-8 flex flex-wrap items-center gap-3 md:mt-10 lg:mt-12"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
          >
            <Link
              to="/about-us"
              className="group inline-flex items-center gap-2.5 rounded-full bg-foreground px-6 py-3 text-sm font-bold text-background transition-[opacity,transform] duration-300 ease-out hover:opacity-85 active:scale-[0.98] motion-reduce:transform-none"
            >
              About WhyCreatives
              {/* The badge scales inside the button, so the button's own box
                  never changes size. */}
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-background/15 transition-[background-color,transform] duration-300 ease-out group-hover:scale-110 group-hover:bg-background/25 motion-reduce:transform-none">
                <ArrowSwap />
              </span>
            </Link>
            {/*
              Contact, replacing the previous "Meet the team" link to /people.

              The label is "Start a project" rather than "Contact" or "Get in
              touch" on purpose — the nav's primary button already says exactly
              that, and the phrasing tells a visitor what happens next instead of
              naming a page. Reusing the same words means the two buttons read as
              one action rather than two.
            */}
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2.5 rounded-full border border-foreground/25 px-6 py-3 text-sm font-semibold text-foreground transition-[background-color,border-color,color,transform] duration-300 ease-out hover:border-foreground hover:bg-foreground hover:text-background active:scale-[0.98] motion-reduce:transform-none"
            >
              Start a project
              <ArrowSwap />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ── CAPABILITY STRIP ── monochrome, logo-wall spacing ──
          Moved off Framer Motion onto a CSS keyframe, for the same two reasons
          as the footer marquee: a CSS transform animation runs on the compositor
          and survives a busy main thread, and `animation-play-state` gives a
          real pause. This was a second infinite JS loop ticking for the entire
          visit, including the whole time the strip was off screen. */}
      {/* `mt-20 py-4` was 96px of empty band above the strip on a phone, on top
          of the section's own bottom padding — which is why the screen between
          the CTAs and the next section read as blank. The desktop values are
          unchanged; there the extra air is doing work. */}
      <div ref={stripRef} className="mt-12 md:mt-20 md:py-4 lg:mt-28 lg:py-8">
        <div
          className="relative flex select-none overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          }}
          aria-hidden="true"
        >
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex shrink-0 items-center animate-[marquee-strip_48s_linear_infinite]"
              style={{ animationPlayState: stripRunning ? "running" : "paused" }}
            >
              {/* Full-strength foreground rather than /70, heavier weight and a
                  thicker icon stroke: at 70% opacity on a black background the
                  strip read as disabled text rather than as a capability list. */}
              {CAPABILITIES.map(({ label, Icon }) => (
                <span
                  key={label}
                  /* Smaller type and tighter spacing on phones. At `text-xl`
                     with a 48px gap only two lockups fitted the screen, so the
                     strip read as two stranded words rather than as a moving
                     list. Around four now sit in view at once. */
                  className="flex shrink-0 items-center gap-2.5 pr-8 text-foreground sm:gap-4 sm:pr-20 lg:pr-24"
                >
                  <Icon
                    className="h-[18px] w-[18px] shrink-0 sm:h-6 sm:w-6"
                    strokeWidth={2.25}
                  />
                  <span className="whitespace-nowrap text-[17px] font-bold tracking-[-0.03em] sm:text-2xl lg:text-[30px]">
                    {label}
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* The "What we do" list that used to sit here was removed — the
          Expertise section covers the same ground far better. */}
    </section>
  );
};
