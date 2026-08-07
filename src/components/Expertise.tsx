import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const HEADING = ["How we take your", "business to the next level"] as const;

const SERVICES = [
  { name: "Video Editing", href: "/services/video-production" },
  { name: "Motion Design", href: "/services/video-production" },
  { name: "Websites", href: "/services/web-development" },
  { name: "App Development", href: "/services/web-development" },
  { name: "Brand Identity", href: "/services/logo-design" },
  { name: "Performance Ads", href: "/services/performance-marketing" },
  { name: "SEO", href: "/services/brand-presence" },
];

/**
 * Inverted "Our Expertise" band: label left, centred heading, supporting copy
 * right, then the service list as oversized type with hairline dividers.
 *
 * Stays dark in both themes on purpose — it's an intentional inverted section,
 * which is also what keeps the huge type legible either way.
 */
export const Expertise = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [finePointer, setFinePointer] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // raw pointer position, then a soft spring for a trailing cursor
  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);
  const x = useSpring(rawX, { stiffness: 160, damping: 22, mass: 0.55 });
  const y = useSpring(rawY, { stiffness: 160, damping: 22, mass: 0.55 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setFinePointer(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setFinePointer(e.matches);
    mq.addEventListener("change", onChange);

    const onMove = (e: PointerEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      mq.removeEventListener("change", onChange);
      window.removeEventListener("pointermove", onMove);
    };
  }, [rawX, rawY]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#0a0a0a] font-['Schibsted_Grotesk',sans-serif] text-white"
      style={{
        paddingTop: "clamp(64px, 8vw, 132px)",
        paddingBottom: "clamp(64px, 8vw, 132px)",
      }}
    >
      {/* ── trailing cursor ── */}
      {finePointer && (
        <motion.div
          aria-hidden="true"
          style={{ x, y, translateX: "-50%", translateY: "-50%" }}
          className="pointer-events-none fixed left-0 top-0 z-[70]"
        >
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.32, ease: EASE }}
                className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#d4ff33] shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
              >
                <ArrowUpRight className="h-6 w-6 text-black" strokeWidth={2.5} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      <div className="grid grid-cols-1 gap-y-10 px-4 md:px-[clamp(32px,6vw,160px)] lg:grid-cols-12 lg:gap-x-10">
        {/* ── label ── */}
        <div className="flex items-start gap-2.5 text-xs text-white/55 lg:col-span-3 lg:pt-2">
          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/55" />
          Our Expertise
        </div>

        {/* ── centred heading ── */}
        <h2
          className="lg:col-span-6 lg:text-center"
          style={{
            fontSize: "clamp(1.75rem, 3vw, 3.1rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
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

        {/* ── supporting copy + CTA ── */}
        <motion.div
          className="lg:col-span-3 lg:pt-1"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
        >
          <p className="max-w-xs text-[13px] leading-relaxed text-white/60">
            We're a creative studio with in-house expertise across video, web and
            brand, on a mission to take your next step with you.
          </p>
          <Link
            to="/what-we-do"
            className="group mt-5 inline-flex items-center gap-2 rounded-full bg-[#d4ff33] py-2 pl-4 pr-2 text-[11px] font-bold text-black transition-colors hover:bg-[#c4f020]"
          >
            See all services
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black/15 transition-transform group-hover:translate-x-0.5">
              <ArrowUpRight className="h-3 w-3" strokeWidth={3} />
            </span>
          </Link>
        </motion.div>
      </div>

      {/* ── service list, aligned to the heading column ── */}
      <div
        className="mt-14 px-4 md:px-[clamp(32px,6vw,160px)] lg:mt-24"
        onPointerLeave={() => setHovered(null)}
      >
        <ul className="lg:ml-[25%] lg:w-[75%]">
          {SERVICES.map((service, i) => (
            <motion.li
              key={service.name}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6%" }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.06 }}
              className="border-t border-white/15 last:border-b"
            >
              <Link
                to={service.href}
                onPointerEnter={() => setHovered(service.name)}
                onFocus={() => setHovered(service.name)}
                onBlur={() => setHovered(null)}
                className="group flex items-center justify-between gap-6 py-4 outline-none sm:py-6 lg:cursor-none"
              >
                <span
                  className="block transition-[transform,color,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 group-focus-visible:translate-x-3"
                  style={{
                    fontSize: "clamp(2rem, 6vw, 5.5rem)",
                    lineHeight: 1.06,
                    letterSpacing: "-0.035em",
                    fontWeight: 500,
                    // everything dims while one row is hovered
                    opacity: hovered && hovered !== service.name ? 0.35 : 1,
                  }}
                >
                  {service.name}
                </span>
                <ArrowUpRight
                  className="h-6 w-6 shrink-0 -translate-x-2 text-white/40 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:text-white group-hover:opacity-100 lg:hidden"
                  strokeWidth={2}
                />
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};
