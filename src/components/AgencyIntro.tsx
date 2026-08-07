import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const STATEMENT =
  "An independent studio in India covering video editing, motion design, web and app development, and branding, built for founders who want work that looks expensive and still costs less than an in-house hire.";

/* Core disciplines only — the full list lives on /what-we-do */
const DISCIPLINES = [
  {
    n: "01",
    title: "Video Editing & Motion Design",
    copy: "Cuts, motion graphics and short-form built to hold attention.",
  },
  {
    n: "02",
    title: "Web Design & Development",
    copy: "Fast, responsive sites that turn visitors into real enquiries.",
  },
  {
    n: "03",
    title: "App Development",
    copy: "iOS, Android and web apps shipped on a modern stack.",
  },
  {
    n: "04",
    title: "Branding & Identity",
    copy: "Logos, systems and guidelines that still work at every size.",
  },
  {
    n: "05",
    title: "Social & Performance",
    copy: "Content and paid campaigns that earn reach, then leads.",
  },
];

/* Our own capability strip in place of borrowed client logos */
const MARQUEE = [
  "Video Editing",
  "Motion Design",
  "Web Development",
  "App Development",
  "Brand Identity",
  "UGC & Creators",
  "Logo Design",
  "Performance Ads",
  "SEO",
];

/** Reveals a block of copy word by word, each word masked so it wipes upward. */
const RevealText = ({ text, className, style }: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <span className={className} style={style}>
    {text.split(" ").map((word, i) => (
      <span
        key={`${word}-${i}`}
        className="inline-block overflow-hidden align-bottom"
        style={{ paddingBottom: "0.14em", marginBottom: "-0.14em" }}
      >
        <motion.span
          className="inline-block"
          initial={{ y: "110%" }}
          whileInView={{ y: "0%" }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ duration: 0.8, ease: EASE, delay: i * 0.02 }}
        >
          {word}
        </motion.span>
        {"\u00A0"}
      </span>
    ))}
  </span>
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

      {/* ── CAPABILITY MARQUEE ─────────────────────────────────────── */}
      <div
        className="relative mt-16 flex select-none overflow-hidden lg:mt-24"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
        aria-hidden="true"
      >
        {[0, 1].map((copy) => (
          <motion.div
            key={copy}
            className="flex shrink-0 items-center gap-10 pr-10 sm:gap-16 sm:pr-16"
            animate={{ x: ["0%", "-100%"] }}
            transition={{ duration: 32, ease: "linear", repeat: Infinity }}
          >
            {MARQUEE.map((item) => (
              <span
                key={item}
                className="flex shrink-0 items-center gap-10 whitespace-nowrap text-sm font-semibold uppercase tracking-[0.16em] text-foreground/35 sm:gap-16 sm:text-base"
              >
                {item}
                <span className="h-1.5 w-1.5 rounded-full bg-foreground/20" />
              </span>
            ))}
          </motion.div>
        ))}
      </div>

      {/* ── WHAT WE DO ─────────────────────────────────────────────── */}
      <div className="mt-16 grid grid-cols-1 gap-6 px-4 md:px-[clamp(32px,6vw,160px)] lg:mt-24 lg:grid-cols-12 lg:gap-10">
        <div className="flex items-center gap-2.5 text-xs text-muted-foreground lg:col-span-3 lg:pt-7">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
          What we do
        </div>

        <div className="lg:col-span-9">
          <ul className="flex flex-col border-t border-border/60">
            {DISCIPLINES.map((item, i) => (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-6%" }}
                transition={{ duration: 0.55, ease: EASE, delay: i * 0.07 }}
                className="border-b border-border/60"
              >
                <Link
                  to="/what-we-do"
                  className="group flex flex-col gap-2 py-5 sm:flex-row sm:items-baseline sm:gap-8 sm:py-6"
                >
                  <span className="text-[11px] font-semibold tabular-nums tracking-[0.18em] text-muted-foreground sm:w-10 sm:shrink-0">
                    {item.n}
                  </span>
                  <span className="relative w-fit text-lg font-medium tracking-[-0.02em] text-foreground sm:w-[40%] sm:shrink-0 lg:text-2xl">
                    {item.title}
                    <span className="pointer-events-none absolute -bottom-1 left-0 h-[1.5px] w-full origin-left scale-x-0 rounded-full bg-current transition-transform duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                  </span>
                  <span className="max-w-md text-sm leading-relaxed text-muted-foreground">
                    {item.copy}
                  </span>
                  <span className="ml-auto hidden shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-foreground sm:block">
                    ↗
                  </span>
                </Link>
              </motion.li>
            ))}
          </ul>

          <Link
            to="/what-we-do"
            className="group mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-foreground"
          >
            See every service
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};
