import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const SPRING = { type: "spring", stiffness: 200, damping: 25, mass: 0.8 } as const;

const services = [
  {
    title: "Video Editing & Motion Design",
    subtext: "Professional video editing with color grading, transitions, and effects that captivate your audience.",
    image: "/video-gear.webp",
    href: "/what-we-do",
    number: "01",
  },
  {
    title: "Web & App Development",
    subtext: "Modern, responsive websites built with latest technologies that drive results and convert visitors.",
    image: "/creative-office.webp",
    href: "/what-we-do",
    number: "02",
  },
  {
    title: "Brand Presence",
    subtext: "Complete visual identity and digital presence strategy to make your brand unforgettable.",
    image: "/team-collab.webp",
    href: "/what-we-do",
    number: "03",
  },
  {
    title: "Performance Marketing",
    subtext: "Data-driven ad campaigns across Google, Meta & more that maximize ROI and scale fast.",
    image: "/creative-office.webp",
    href: "/what-we-do",
    number: "04",
  },
  {
    title: "UGC & Collabs",
    subtext: "High-impact UGC, scriptwriting, and joint collaboration reels to elevate your brand presence.",
    image: "/team-collab.webp",
    href: "/what-we-do",
    number: "05",
  },
];

export const ServicesInteractive = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isFinePointer, setIsFinePointer] = useState(false);

  // ── Physics-based Mouse Tracking ──────────────────────────────
  const rawMouseX = useMotionValue(-100);
  const rawMouseY = useMotionValue(-100);

  const cursorX = useSpring(rawMouseX, { stiffness: 500, damping: 28, mass: 0.5 });
  const cursorY = useSpring(rawMouseY, { stiffness: 500, damping: 28, mass: 0.5 });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsFinePointer(mediaQuery.matches);

    const handlePointerChange = (e: MediaQueryListEvent) => {
      setIsFinePointer(e.matches);
    };

    mediaQuery.addEventListener("change", handlePointerChange);

    const handleMouseMove = (e: MouseEvent) => {
      rawMouseX.set(e.clientX);
      rawMouseY.set(e.clientY);
    };

    if (mediaQuery.matches) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      mediaQuery.removeEventListener("change", handlePointerChange);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [rawMouseX, rawMouseY]);

  return (
    <section
      className="w-full bg-[#0A0A0C] rounded-t-[28px] md:rounded-t-[40px] overflow-hidden font-['Schibsted_Grotesk',sans-serif] relative"
      aria-label="Our Services"
    >
      {/* ── CUSTOM PHYSICS CURSOR BADGE (Shown ONLY when hovering a service option) ── */}
      {isFinePointer && (
        <motion.div
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: hoveredIndex !== null ? 1 : 0,
            opacity: hoveredIndex !== null ? 1 : 0,
            width: 60,
            height: 60,
            backgroundColor: "#b5ff2b",
          }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="fixed top-0 left-0 pointer-events-none z-[100] rounded-full flex items-center justify-center select-none shadow-lg"
        >
          <AnimatePresence>
            {hoveredIndex !== null && (
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.15 }}
                className="text-2xl font-black text-black leading-none select-none"
              >
                ↗
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      <div className="w-full px-6 sm:px-10 lg:px-16 pt-16 pb-24 lg:pt-24 lg:pb-36">

        {/* ── TOP HEADER (3-Column Layout) ────────────────────────── */}
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-20 lg:mb-28 items-start">
          
          {/* Left Column: Badge */}
          <div className="lg:col-span-3 flex items-center gap-2.5 text-neutral-400 text-xs tracking-[0.2em] uppercase font-medium pt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
            Our Expertise
          </div>

          {/* Center Column: Clean 2-Line Headline */}
          <div className="lg:col-span-6 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.75rem] font-semibold text-white tracking-[-0.02em] leading-[1.15] max-w-2xl mx-auto">
              How we take your business<br />to the next level
            </h2>
          </div>

          {/* Right Column: Sub-copy & CTA Button */}
          <div className="lg:col-span-3 flex flex-col gap-4 items-start lg:items-end text-left lg:text-right">
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-[260px] font-normal">
              WhyCreatives is a creative & tech agency on a mission to help you scale your business with modern web, mobile apps, & video editing.
            </p>
            <Link
              to="/what-we-do"
              className="inline-flex items-center gap-2 bg-[#b5ff2b] text-black text-xs font-bold px-5 py-2.5 rounded-full hover:bg-[#a8f020] transition-colors group"
            >
              See all services
              <span className="w-4 h-4 rounded-full bg-black/15 flex items-center justify-center text-[10px] group-hover:translate-x-0.5 transition-transform">
                ↗
              </span>
            </Link>
          </div>
        </div>

        {/* ── CENTERED SERVICE OPTIONS CONTAINER ───────────────────── */}
        <div
          onMouseLeave={() => setHoveredIndex(null)}
          className="max-w-5xl xl:max-w-6xl mx-auto w-full flex flex-col"
        >
          {services.map((service, i) => {
            const isHovered = hoveredIndex === i;
            const isDimmed = hoveredIndex !== null && !isHovered;

            return (
              <motion.div
                key={service.title}
                onMouseEnter={() => setHoveredIndex(i)}
                animate={{ opacity: isDimmed ? 0.22 : 1 }}
                transition={SPRING}
                className="relative"
              >
                {/* Top Divider Line */}
                <div className="w-full h-px bg-white/[0.08]" />

                <Link
                  to={service.href}
                  tabIndex={0}
                  aria-label={service.title}
                  className="block w-full lg:cursor-none"
                >
                  {/* ── DESKTOP ROW (Centered, Equal Margins) ── */}
                  <div className="hidden lg:flex items-center w-full h-[125px] xl:h-[150px] overflow-hidden px-2">

                    {/* Thumbnail: reveals smoothly on left of title */}
                    <motion.div
                      animate={{
                        width: isHovered ? 105 : 0,
                        marginRight: isHovered ? 22 : 0,
                        opacity: isHovered ? 1 : 0,
                      }}
                      transition={SPRING}
                      className="flex-shrink-0 h-[72px] xl:h-[84px] rounded-2xl overflow-hidden"
                    >
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-[105px] h-full object-cover"
                        loading="lazy"
                      />
                    </motion.div>

                    {/* Service Title */}
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-[4.75rem] font-bold text-white tracking-[-0.03em] leading-none whitespace-nowrap">
                      {service.title}
                    </h3>

                    {/* Number on far right */}
                    <span className="ml-auto text-white/20 text-xs sm:text-sm font-medium tabular-nums flex-shrink-0 pl-6">
                      {service.number}
                    </span>
                  </div>

                  {/* ── MOBILE ROW ── */}
                  <div className="flex lg:hidden items-center gap-4 w-full py-6 sm:py-7">
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-neutral-400 text-xs mt-1 line-clamp-2">
                        {service.subtext}
                      </p>
                    </div>
                    <span className="flex-shrink-0 w-9 h-9 rounded-full bg-[#b5ff2b] flex items-center justify-center ml-2">
                      <span className="text-black font-bold text-sm">↗</span>
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}

          {/* Bottom Divider Line */}
          <div className="w-full h-px bg-white/[0.08]" />
        </div>

      </div>
    </section>
  );
};
