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
          className="mb-7 flex items-center gap-2.5 text-xs text-muted-foreground lg:absolute lg:left-0 lg:top-2 lg:mb-0"
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
          <h2
            className="text-left text-foreground"
            style={{
              fontSize: "clamp(2.3rem, 5vw, 6.25rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.045em",
              fontWeight: 500,
            }}
          >
            <RevealLines
              lines={STATEMENT_LINES}
              className="block"
              nowrapFromLg
              alignFirstLineRightEdge
            />
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
            className="mt-10 flex flex-wrap items-center gap-3 lg:mt-12"
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
            <Link
              to="/people"
              className="group inline-flex items-center gap-2.5 rounded-full border border-foreground/25 px-6 py-3 text-sm font-semibold text-foreground transition-[background-color,border-color,color,transform] duration-300 ease-out hover:border-foreground hover:bg-foreground hover:text-background active:scale-[0.98] motion-reduce:transform-none"
            >
              Meet the team
              <ArrowSwap />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ── CAPABILITY STRIP ── monochrome, logo-wall spacing ── */}
      <div className="mt-20 py-4 lg:mt-28 lg:py-8">
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
            <motion.div
              key={copy}
              className="flex shrink-0 items-center"
              animate={{ x: ["0%", "-100%"] }}
              transition={{ duration: 48, ease: "linear", repeat: Infinity }}
            >
              {/* Full-strength foreground rather than /70, heavier weight and a
                  thicker icon stroke: at 70% opacity on a black background the
                  strip read as disabled text rather than as a capability list. */}
              {CAPABILITIES.map(({ label, Icon }) => (
                <span
                  key={label}
                  className="flex shrink-0 items-center gap-3 pr-12 text-foreground sm:gap-4 sm:pr-20 lg:pr-24"
                >
                  <Icon
                    className="h-5 w-5 shrink-0 sm:h-6 sm:w-6"
                    strokeWidth={2.25}
                  />
                  <span className="whitespace-nowrap text-xl font-bold tracking-[-0.03em] sm:text-2xl lg:text-[30px]">
                    {label}
                  </span>
                </span>
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      {/* The "What we do" list that used to sit here was removed — the
          Expertise section covers the same ground far better. */}
    </section>
  );
};
