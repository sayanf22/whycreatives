import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
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

const STATEMENT_LINES = [
  "An independent creative studio in India,",
  "bringing video, motion, web, apps and",
  "branding together under one roof for",
  "ambitious businesses built to grow.",
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

/**
 * Reveals intentional copy lines through a clipped mask, matching the hero's
 * upward line reveal. The four rows stay fixed on desktop and can wrap
 * naturally on smaller screens without overflowing the viewport.
 */
const RevealLines = ({ lines, className, style }: {
  lines: readonly string[];
  className?: string;
  style?: React.CSSProperties;
}) => (
  <motion.span
    className={className}
    style={style}
    aria-label={lines.join(" ")}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.25 }}
  >
    {lines.map((line, i) => (
      <span
        key={line}
        aria-hidden="true"
        className="block overflow-hidden lg:whitespace-nowrap"
        style={{
          paddingBottom: "0.14em",
          marginBottom: i === lines.length - 1 ? 0 : "-0.14em",
        }}
      >
        <motion.span
          className="inline-block max-w-full"
          variants={{ hidden: { y: "108%" }, show: { y: "0%" } }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.08 + i * 0.09 }}
          style={{ willChange: "transform" }}
        >
          {line}
        </motion.span>
      </span>
    ))}
  </motion.span>
);

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
      <div className="grid grid-cols-1 items-start gap-7 px-4 md:px-[clamp(32px,6vw,160px)] lg:grid-cols-12 lg:gap-10">
        <div className="flex items-center gap-2.5 pt-2 text-xs text-muted-foreground lg:col-span-2">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
          Who are we?
        </div>

        <div className="lg:col-span-10 lg:pr-[2%]">
          <h2
            className="text-left text-foreground"
            style={{
              fontSize: "clamp(2rem, 3.55vw, 4.6rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.042em",
              fontWeight: 500,
            }}
          >
            <RevealLines lines={STATEMENT_LINES} className="block" />
          </h2>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
          >
            <Link
              to="/about-us"
              className="group inline-flex items-center gap-2 rounded-full bg-[#d4ff33] px-5 py-2.5 text-xs font-bold text-black transition-colors hover:bg-[#c4f020]"
            >
              About WhyCreatives
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-black/15 text-[10px] transition-transform group-hover:translate-x-0.5">
                ↗
              </span>
            </Link>
            <Link
              to="/people"
              className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-5 py-2.5 text-xs font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              Meet the team ↗
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
