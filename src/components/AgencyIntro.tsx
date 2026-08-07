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

const STATEMENT =
  "An independent studio in India covering video editing, motion design, web and app development, and branding, built for founders who want work that looks expensive and still costs less than an in-house hire.";

/* Our own capability strip in place of borrowed client logos — a single
   scrolling line. Icons carry meaning here (they aid scanning), so they stay. */
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
 * Reveals a block of copy word by word, each word masked so it wipes upward.
 *
 * The viewport is observed on the untransformed wrapper and the movement runs
 * on children via variants. Observing each word directly was unreliable: they
 * start translated 110% out of an overflow-hidden box, so the observed rect can
 * be clipped away and the reveal never fires — leaving the text invisible.
 */
const RevealText = ({ text, className, style }: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <motion.span
    className={className}
    style={style}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.2 }}
  >
    {text.split(" ").map((word, i) => (
      <span
        key={`${word}-${i}`}
        className="inline-block overflow-hidden align-bottom"
        style={{ paddingBottom: "0.14em", marginBottom: "-0.14em" }}
      >
        <motion.span
          className="inline-block"
          variants={{ hidden: { y: "110%" }, show: { y: "0%" } }}
          transition={{ duration: 0.8, ease: EASE, delay: i * 0.02 }}
        >
          {word}
        </motion.span>
        {"\u00A0"}
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
      <div className="grid grid-cols-1 items-start gap-6 px-4 md:px-[clamp(32px,6vw,160px)] lg:grid-cols-12 lg:gap-10">
        <div className="flex items-center gap-2.5 pt-2 text-xs text-muted-foreground lg:col-span-3">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
          Who are we?
        </div>

        <div className="lg:col-span-9 lg:pr-[6%]">
          <h2
            className="text-foreground lg:text-center"
            style={{
              fontSize: "clamp(1.5rem, 2.9vw, 3.15rem)",
              lineHeight: 1.16,
              letterSpacing: "-0.03em",
              fontWeight: 500,
            }}
          >
            <RevealText text={STATEMENT} />
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

      {/* ── CAPABILITY STRIP ── one scrolling line, mono type ── */}
      <div className="mt-20 border-y border-border/60 py-7 lg:mt-28 lg:py-10">
        <div
          className="relative flex select-none overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 7%, black 93%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 7%, black 93%, transparent)",
          }}
          aria-hidden="true"
        >
          {[0, 1].map((copy) => (
            <motion.div
              key={copy}
              className="flex shrink-0 items-center"
              animate={{ x: ["0%", "-100%"] }}
              transition={{ duration: 44, ease: "linear", repeat: Infinity }}
            >
              {CAPABILITIES.map(({ label, Icon }) => (
                <span
                  key={label}
                  className="flex shrink-0 items-center gap-4 pr-8 sm:gap-6 sm:pr-14"
                >
                  <Icon
                    className="h-4 w-4 shrink-0 text-[#93b81f] sm:h-5 sm:w-5 dark:text-[#d4ff33]"
                    strokeWidth={1.75}
                  />
                  <span className="whitespace-nowrap font-mono text-base font-bold uppercase tracking-[0.1em] text-foreground/70 sm:text-xl lg:text-[26px]">
                    {label}
                  </span>
                  <span className="h-1 w-1 shrink-0 rounded-full bg-foreground/25" />
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
