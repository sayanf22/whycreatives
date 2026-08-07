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
    className="relative block h-3.5 w-3.5 overflow-hidden"
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

/* Four deliberate desktop lines. The first is the shortest on purpose: it
   carries the indent below, so the block opens with a typographic step instead
   of a flat left edge.

   Keep every line at roughly 24 characters or fewer. They render with
   `lg:whitespace-nowrap`, so a longer line cannot reflow and would instead
   overflow the column at the 1024px breakpoint, where the type is widest
   relative to its container. Short lines are what buy the large font size. */
const STATEMENT_LINES = [
  "An independent studio",
  "in India crafting video,",
  "motion, websites, apps",
  "and brands that grow.",
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
      {/* lg:gap-6 rather than gap-10, and no right padding on the statement
          column: the forced single-line rows need every pixel of width they can
          get at 1024px, which is where the type is closest to overflowing. */}
      <div className="grid grid-cols-1 items-start gap-7 px-4 md:px-[clamp(32px,6vw,160px)] lg:grid-cols-12 lg:gap-6">
        {/* The label leads the statement in, so the whole block animates as one
            gesture rather than the heading appearing beside static text. */}
        <motion.div
          className="flex items-center gap-2.5 pt-2 text-xs text-muted-foreground lg:col-span-2"
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
          Who are we?
        </motion.div>

        <div className="lg:col-span-10">
          <h2
            className="text-left text-foreground"
            style={{
              fontSize: "clamp(2.3rem, 5vw, 6.25rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.045em",
              fontWeight: 500,
            }}
          >
            {/* The opening line is inset by an em-based amount, so the step
                scales with the type instead of drifting as the font-size clamp
                changes. Desktop only: below lg the lines wrap, and indenting a
                wrapped block shifts all of its rows, which reads as a mistake
                rather than as intent. */}
            <RevealLines
              lines={STATEMENT_LINES}
              className="block"
              firstLineClassName="lg:pl-[1.7em]"
              nowrapFromLg
            />
          </h2>

          {/* Both CTAs share one interaction language: a small lift on hover,
              the arrow swap above, and a settle-back on press. The outline
              button also inverts to solid so the pair reads as one system.
              `motion-reduce` drops the movement but keeps the colour feedback. */}
          <motion.div
            className="mt-10 flex flex-wrap items-center gap-3 lg:mt-12"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
          >
            <Link
              to="/about-us"
              className="group inline-flex items-center gap-2.5 rounded-full bg-[#d4ff33] px-6 py-3 text-sm font-bold text-black transition-[transform,background-color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#c4f020] hover:shadow-[0_12px_30px_-12px_rgba(212,255,51,0.95)] active:translate-y-0 active:scale-[0.98] motion-reduce:transform-none"
            >
              About WhyCreatives
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black/15 transition-colors duration-300 group-hover:bg-black/25">
                <ArrowSwap />
              </span>
            </Link>
            <Link
              to="/people"
              className="group inline-flex items-center gap-2.5 rounded-full border border-foreground/25 px-6 py-3 text-sm font-semibold text-foreground transition-[transform,background-color,border-color,color] duration-300 ease-out hover:-translate-y-0.5 hover:border-foreground hover:bg-foreground hover:text-background active:translate-y-0 active:scale-[0.98] motion-reduce:transform-none"
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
              {CAPABILITIES.map(({ label, Icon }) => (
                <span
                  key={label}
                  className="group flex shrink-0 items-center gap-3 pr-14 text-foreground/70 transition-opacity duration-500 hover:text-foreground sm:gap-4 sm:pr-24 lg:pr-28"
                >
                  <Icon
                    className="h-5 w-5 shrink-0 sm:h-[22px] sm:w-[22px]"
                    strokeWidth={1.5}
                  />
                  <span className="whitespace-nowrap text-lg font-semibold tracking-[-0.02em] sm:text-xl lg:text-[26px]">
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
