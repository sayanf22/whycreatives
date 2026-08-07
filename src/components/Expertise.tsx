import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Organic, never linear — drives the row displacement and reveal. */
const SPRING = { type: "spring", stiffness: 200, damping: 25, mass: 0.8 } as const;
/** Buttery trailing follow for the custom cursor. */
const CURSOR_SPRING = { stiffness: 500, damping: 28, mass: 0.5 } as const;

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
    blurb: "Animated graphics, titles and explainers that make a brand feel alive.",
    href: "/services/video-production",
    image: "/project-ugc-reel.webp",
  },
  {
    title: "Websites",
    blurb: "Modern, responsive sites built on current tech that drive real results.",
    href: "/services/web-development",
    image: "/project-nth.webp",
  },
  {
    title: "App Development",
    blurb: "iOS, Android and web apps shipped on a modern, maintainable stack.",
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
];
/* SEO was listed here as a seventh discipline, which overstated it: we sell it
   as part of a website build, not as a standalone engagement. It is covered by
   the Websites entry's technical SEO work and by the capability strip. */

/** Thumbnail size tracks the viewport so it stays proportional to the type. */
const thumbFor = (w: number) => Math.round(Math.min(Math.max(w * 0.07, 72), 148));
const GAP = 28;

/* Masked line reveal. The viewport is observed on the *untransformed* wrapper
   and the movement runs on a child via variants — observing an element that is
   itself translated out of an overflow-hidden box is unreliable, which is what
   left the heading stuck off-screen. */
const RevealLines = ({ lines, className, style }: {
  lines: readonly string[];
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
    {lines.map((line, i) => (
      <span
        key={line}
        className="block overflow-hidden"
        style={{ paddingBottom: "0.1em", marginBottom: "-0.1em" }}
      >
        <motion.span
          className="inline-block"
          variants={{ hidden: { y: "110%" }, show: { y: "0%" } }}
          transition={{ duration: 0.85, ease: EASE, delay: i * 0.09 }}
        >
          {line}
        </motion.span>
      </span>
    ))}
  </motion.span>
);

export const Expertise = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [thumb, setThumb] = useState(120);
  const [cursorInside, setCursorInside] = useState(false);

  // raw pointer position -> spring, for the micro-delayed trailing follow
  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);
  const cursorX = useSpring(rawX, CURSOR_SPRING);
  const cursorY = useSpring(rawY, CURSOR_SPRING);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const sync = () => {
      setIsDesktop(mq.matches);
      setThumb(thumbFor(window.innerWidth));
      if (!mq.matches) {
        setHoveredIndex(null);
        setCursorInside(false);
      }
    };
    sync();
    mq.addEventListener("change", sync);
    window.addEventListener("resize", sync);

    const onMove = (e: PointerEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      mq.removeEventListener("change", sync);
      window.removeEventListener("resize", sync);
      window.removeEventListener("pointermove", onMove);
    };
  }, [rawX, rawY]);

  const active = hoveredIndex !== null;
  const shift = thumb + GAP;

  return (
    /* inset wrapper so the dark card floats with rounded sides */
    <div className="w-full bg-background px-3 sm:px-5 md:px-6">
      <section className="w-full overflow-hidden rounded-[24px] bg-[#0A0A0C] font-['Schibsted_Grotesk',sans-serif] text-white md:rounded-[36px]">
        {/* ── CUSTOM CURSOR ── idle dot, morphs to a green arrow puck ── */}
        {isDesktop && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full"
            style={{
              x: cursorX,
              y: cursorY,
              translateX: "-50%",
              translateY: "-50%",
              // blend keeps the idle dot readable over dark and light alike,
              // but it muddies the accent green, so drop it while expanded
              mixBlendMode: active ? "normal" : "difference",
            }}
            initial={false}
            animate={{
              width: active ? 80 : 16,
              height: active ? 80 : 16,
              backgroundColor: active ? "#d4ff33" : "#ffffff",
              opacity: cursorInside ? 1 : 0,
            }}
            transition={{ type: "spring", stiffness: 320, damping: 26, mass: 0.6 }}
          >
            {/* Arrow rather than a "View" label: it reads instantly at any size
                and matches the arrow used on the project cards. It scales up
                with the puck so the morph feels like one gesture. */}
            <motion.span
              className="flex items-center justify-center text-black"
              initial={false}
              animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.4 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              <ArrowUpRight className="h-8 w-8" strokeWidth={2.5} />
            </motion.span>
          </motion.div>
        )}

        <div
          style={{
            paddingTop: "clamp(64px, 7vw, 132px)",
            paddingBottom: "clamp(64px, 7vw, 132px)",
          }}
        >
          {/* ── HEADER ── */}
          <div className="grid grid-cols-1 gap-y-8 px-5 md:px-[clamp(28px,5vw,120px)] lg:grid-cols-12 lg:gap-x-10">
            <div className="flex items-start gap-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-white/45 lg:col-span-3 lg:pt-3">
              <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-[#d4ff33]" />
              Our Expertise
            </div>

            <RevealLines
              lines={HEADING}
              className="block lg:col-span-6 lg:text-center"
              style={{
                fontSize: "clamp(1.8rem, 3vw, 5rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.035em",
                fontWeight: 500,
              }}
            />

            <motion.div
              className="lg:col-span-3 lg:pt-2"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
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

          {/* ── BODY ── explanatory column + the list ── */}
          <div
            className="mt-14 grid grid-cols-1 gap-y-10 px-5 md:px-[clamp(28px,5vw,120px)] lg:mt-24 lg:cursor-none lg:grid-cols-12 lg:gap-x-10"
            onPointerEnter={() => isDesktop && setCursorInside(true)}
            onPointerLeave={() => {
              setHoveredIndex(null);
              setCursorInside(false);
            }}
          >
            {/* fills what was dead space beside the list, and says what we do */}
            <div className="lg:col-span-3 lg:sticky lg:top-28 lg:self-start">
              <h3
                className="text-white"
                style={{
                  fontSize: "clamp(1.35rem, 1.6vw, 2rem)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.03em",
                  fontWeight: 500,
                }}
              >
                Six disciplines,
                <br />
                one team.
              </h3>
              <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-white/50">
                From the first cut to launch day we keep video, web, apps and brand
                under one roof, so nothing gets lost in a handover and nothing gets
                billed twice.
              </p>
              <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
                01 &mdash; {String(SERVICES.length).padStart(2, "0")}
              </div>
            </div>

            <ul className="lg:col-span-9">
              {SERVICES.map((service, i) => {
                const isOn = isDesktop && hoveredIndex === i;
                const dimmed = isDesktop && active && hoveredIndex !== i;

                return (
                  <motion.li
                    key={service.title}
                    initial={{ opacity: 0, y: 26 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: EASE, delay: i * 0.05 }}
                    className="border-b border-zinc-800"
                  >
                    <motion.div
                      animate={{ opacity: dimmed ? 0.28 : 1 }}
                      transition={{ duration: 0.45, ease: EASE }}
                    >
                      <Link
                        to={service.href}
                        onPointerEnter={() => isDesktop && setHoveredIndex(i)}
                        onFocus={() => isDesktop && setHoveredIndex(i)}
                        onBlur={() => setHoveredIndex(null)}
                        className="relative flex items-center gap-4 py-5 outline-none lg:block lg:cursor-none lg:py-[0.12em]"
                        style={{
                          fontSize: "clamp(2.1rem, 7vw, 10.5rem)",
                          lineHeight: 1.04,
                          letterSpacing: "-0.04em",
                          fontWeight: 500,
                        }}
                      >
                        {isDesktop ? (
                          <>
                            {/* Taken out of flow on purpose. Animating its width
                                inside the flex row reflowed the whole line every
                                frame, which is where the jitter came from — now
                                only transforms and opacity change. */}
                            <motion.span
                              aria-hidden="true"
                              className="absolute left-0 top-1/2 block overflow-hidden rounded-2xl bg-white/5"
                              style={{
                                width: thumb,
                                height: thumb,
                                originX: 0,
                                originY: 0.5,
                              }}
                              initial={false}
                              animate={{
                                scale: isOn ? 1 : 0.8,
                                opacity: isOn ? 1 : 0,
                                y: "-50%",
                              }}
                              transition={SPRING}
                            >
                              <img
                                src={service.image}
                                alt=""
                                loading="lazy"
                                decoding="async"
                                className="h-full w-full object-cover"
                              />
                            </motion.span>

                            {/* transform-only displacement: no layout, no jitter */}
                            <motion.span
                              className="block whitespace-nowrap"
                              initial={false}
                              animate={{ x: isOn ? shift : 0 }}
                              transition={SPRING}
                            >
                              {service.title}
                            </motion.span>
                          </>
                        ) : (
                          <>
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
                            <span className="min-w-0 flex-1">
                              <span className="block">{service.title}</span>
                              <span className="mt-1.5 block text-[13px] font-normal leading-relaxed tracking-normal text-white/50">
                                {service.blurb}
                              </span>
                            </span>
                            <span className="ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d4ff33]">
                              <ArrowUpRight
                                className="h-4 w-4 text-black"
                                strokeWidth={2.5}
                              />
                            </span>
                          </>
                        )}
                      </Link>
                    </motion.div>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
