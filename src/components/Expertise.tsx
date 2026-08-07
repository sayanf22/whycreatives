import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Organic, never linear — shared by the row displacement and reveal. */
const SPRING = { type: "spring", stiffness: 200, damping: 25, mass: 0.8 } as const;
/** Slightly under-damped so the CTA pill pops in. */
const POP = { type: "spring", stiffness: 320, damping: 18, mass: 0.7 } as const;

const HEADING = ["How we take your", "business to the next level"] as const;

type Service = {
  title: string;
  blurb: string;
  href: string;
  image: string;
};

const SERVICES: Service[] = [
  {
    title: "Video Editing",
    blurb:
      "Professional editing with colour grading, transitions and effects that hold attention.",
    href: "/services/video-production",
    image: "/video-gear.webp",
  },
  {
    title: "Motion Design",
    blurb:
      "Animated graphics, titles and explainers that make a brand feel alive.",
    href: "/services/video-production",
    image: "/project-ugc-reel.webp",
  },
  {
    title: "Websites",
    blurb:
      "Modern, responsive sites built on current tech that drive real results.",
    href: "/services/web-development",
    image: "/project-nth.webp",
  },
  {
    title: "App Development",
    blurb:
      "iOS, Android and web apps shipped on a modern, maintainable stack.",
    href: "/services/web-development",
    image: "/whycreatives-app.webp",
  },
  {
    title: "Brand Identity",
    blurb: "Complete visual identity and digital presence strategy.",
    href: "/services/logo-design",
    image: "/whycreatives-brand.webp",
  },
  {
    title: "Performance Ads",
    blurb: "Paid campaigns tuned to turn spend into measurable revenue.",
    href: "/services/performance-marketing",
    image: "/creative-office.webp",
  },
  {
    title: "SEO",
    blurb: "Technical and content SEO that compounds into organic reach.",
    href: "/services/brand-presence",
    image: "/team-collab.webp",
  },
];

/** Thumbnail size tracks the viewport so it stays proportional to the type. */
const thumbFor = (w: number) => Math.round(Math.min(Math.max(w * 0.072, 76), 150));

export const Expertise = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [thumb, setThumb] = useState(120);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const sync = () => {
      setIsDesktop(mq.matches);
      setThumb(thumbFor(window.innerWidth));
      if (!mq.matches) setHoveredIndex(null);
    };
    sync();
    mq.addEventListener("change", sync);
    window.addEventListener("resize", sync);
    return () => {
      mq.removeEventListener("change", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  return (
    <section
      className="w-full overflow-hidden bg-[#0A0A0C] font-['Schibsted_Grotesk',sans-serif] text-white"
      style={{
        paddingTop: "clamp(72px, 8vw, 150px)",
        paddingBottom: "clamp(72px, 8vw, 150px)",
      }}
    >
      {/* ── HEADER ── label left, heading centred, copy + CTA right ── */}
      <div className="grid grid-cols-1 gap-y-8 px-4 md:px-[clamp(32px,6vw,160px)] lg:grid-cols-12 lg:gap-x-10">
        <div className="flex items-start gap-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-white/45 lg:col-span-3 lg:pt-3">
          <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-[#d4ff33]" />
          Our Expertise
        </div>

        <h2
          className="lg:col-span-6 lg:text-center"
          style={{
            fontSize: "clamp(1.8rem, 3vw, 5rem)",
            lineHeight: 1.08,
            letterSpacing: "-0.035em",
            fontWeight: 500,
          }}
        >
          {HEADING.map((line, i) => (
            <span
              key={line}
              className="block overflow-hidden"
              style={{ paddingBottom: "0.1em", marginBottom: "-0.1em" }}
            >
              <motion.span
                className="inline-block"
                initial={{ y: "110%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true, margin: "-12%" }}
                transition={{ duration: 0.85, ease: EASE, delay: i * 0.09 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h2>

        <motion.div
          className="lg:col-span-3 lg:pt-2"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
        >
          <p className="max-w-sm text-[13px] leading-relaxed text-white/55 lg:text-sm">
            Professional creative services to elevate your brand and grow your
            business.
          </p>
          <Link
            to="/what-we-do"
            className="group mt-5 inline-flex items-center gap-2 rounded-full bg-[#d4ff33] py-2 pl-4 pr-2 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-black transition-colors hover:bg-[#c4f020]"
          >
            See all services
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black/15 transition-transform duration-300 group-hover:translate-x-0.5">
              <ArrowUpRight className="h-3 w-3" strokeWidth={3} />
            </span>
          </Link>
        </motion.div>
      </div>

      {/* ── SERVICE LIST ── */}
      <div
        className="mt-14 px-4 md:px-[clamp(32px,6vw,160px)] lg:mt-24"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <ul className="lg:ml-[22%] lg:w-[78%]">
          {SERVICES.map((service, i) => {
            const active = isDesktop && hoveredIndex === i;
            const dimmed = isDesktop && hoveredIndex !== null && hoveredIndex !== i;

            return (
              <motion.li
                key={service.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-6%" }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.05 }}
                className="border-b border-zinc-800"
              >
                <motion.div
                  animate={{ opacity: dimmed ? 0.28 : 1 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <Link
                    to={service.href}
                    onMouseEnter={() => isDesktop && setHoveredIndex(i)}
                    onFocus={() => isDesktop && setHoveredIndex(i)}
                    onBlur={() => setHoveredIndex(null)}
                    className="flex items-center gap-4 py-5 outline-none lg:gap-0 lg:py-[0.12em]"
                    style={{
                      fontSize: "clamp(2.1rem, 7vw, 10.5rem)",
                      lineHeight: 1.04,
                      letterSpacing: "-0.04em",
                      fontWeight: 500,
                    }}
                  >
                    {/* Thumbnail. Below lg it's always visible at a fixed size;
                        on desktop it expands from 0 and physically pushes the
                        title across, so there's no overlap to correct for. */}
                    {isDesktop ? (
                      <motion.span
                        aria-hidden="true"
                        className="relative block shrink-0 overflow-hidden rounded-2xl bg-white/5"
                        style={{ height: thumb }}
                        initial={false}
                        animate={{
                          width: active ? thumb : 0,
                          marginRight: active ? 28 : 0,
                          opacity: active ? 1 : 0,
                        }}
                        transition={SPRING}
                      >
                        <motion.img
                          src={service.image}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="h-full max-w-none object-cover"
                          style={{ width: thumb }}
                          initial={false}
                          animate={{ scale: active ? 1 : 0.8 }}
                          transition={SPRING}
                        />
                      </motion.span>
                    ) : (
                      <span
                        aria-hidden="true"
                        className="block h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white/5 sm:h-20 sm:w-20"
                      >
                        <img
                          src={service.image}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover"
                        />
                      </span>
                    )}

                    <span className="min-w-0 flex-1 lg:flex lg:items-baseline lg:gap-6">
                      <span className="block truncate">{service.title}</span>

                      {/* blurb: inline on desktop, revealed with the row */}
                      <AnimatePresence initial={false}>
                        {active && (
                          <motion.span
                            className="hidden shrink-0 font-mono text-[11px] font-normal uppercase leading-relaxed tracking-[0.1em] text-white/45 xl:block xl:max-w-[15rem]"
                            style={{ letterSpacing: "0.1em" }}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -8 }}
                            transition={{ duration: 0.35, ease: EASE }}
                          >
                            {service.blurb}
                          </motion.span>
                        )}
                      </AnimatePresence>

                      {/* blurb on smaller screens, always visible */}
                      <span className="mt-1.5 block text-[13px] font-normal leading-relaxed tracking-normal text-white/50 lg:hidden">
                        {service.blurb}
                      </span>
                    </span>

                    {/* CTA pill — pops in on hover, always present on mobile */}
                    {isDesktop ? (
                      <motion.span
                        className="ml-auto flex shrink-0 items-center justify-center rounded-full bg-[#d4ff33]"
                        style={{ width: 56, height: 56 }}
                        initial={false}
                        animate={{ scale: active ? 1 : 0, opacity: active ? 1 : 0 }}
                        transition={POP}
                      >
                        <ArrowUpRight className="h-5 w-5 text-black" strokeWidth={2.5} />
                      </motion.span>
                    ) : (
                      <span className="ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d4ff33]">
                        <ArrowUpRight className="h-4 w-4 text-black" strokeWidth={2.5} />
                      </span>
                    )}
                  </Link>
                </motion.div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
