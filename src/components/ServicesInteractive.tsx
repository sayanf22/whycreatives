import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SPRING = { type: "spring", stiffness: 180, damping: 26, mass: 0.8 } as const;

const services = [
  {
    title: "Video Production",
    subtext: "Professional video editing with color grading, transitions, and effects that captivate your audience.",
    image: "/video-gear.png",
    href: "/what-we-do",
    number: "01",
  },
  {
    title: "Web Development",
    subtext: "Modern, responsive websites built with latest technologies that drive results and convert visitors.",
    image: "/creative-office.png",
    href: "/what-we-do",
    number: "02",
  },
  {
    title: "Brand Presence",
    subtext: "Complete visual identity and digital presence strategy to make your brand unforgettable.",
    image: "/team-collab.png",
    href: "/what-we-do",
    number: "03",
  },
  {
    title: "Performance Marketing",
    subtext: "Data-driven ad campaigns across Google, Meta & more that maximize ROI and scale fast.",
    image: "/creative-office.png",
    href: "/what-we-do",
    number: "04",
  },
  {
    title: "UGC & Collabs",
    subtext: "High-impact UGC, scriptwriting, and joint collaboration reels to elevate your brand presence.",
    image: "/team-collab.png",
    href: "/what-we-do",
    number: "05",
  },
];

export const ServicesInteractive = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      className="w-full bg-[#0A0A0C] rounded-t-[28px] md:rounded-t-[40px]"
      aria-label="Our Services"
    >
      <div className="w-full px-6 sm:px-10 md:px-14 lg:px-20 xl:px-28 py-20 sm:py-28 lg:py-36">

        {/* ── HEADER ───────────────────────────────────────────────
             3-column: badge left | heading center | copy+CTA right
             Heading is NOT italic — weight 400 normal, matching
             MadeByShape's Oldschool Grotesk Regular.
        ─────────────────────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-8 mb-20 lg:mb-28">

          {/* Far-left badge */}
          <div className="flex items-center gap-2.5 text-neutral-500 text-[11px] tracking-[0.2em] uppercase font-medium flex-shrink-0 pt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-500" />
            Our Expertise
          </div>

          {/* Centre heading — normal weight, not italic */}
          <div className="text-center flex-shrink-0">
            <h2 className="text-[1.7rem] sm:text-[2rem] lg:text-[2.4rem] xl:text-[2.8rem] font-normal text-white leading-[1.2] tracking-[-0.01em]">
              How we take your business<br className="hidden sm:block" /> to the next level
            </h2>
          </div>

          {/* Far-right sub-copy + CTA */}
          <div className="flex flex-col gap-5 items-start lg:items-end text-left lg:text-right flex-shrink-0">
            <p className="text-neutral-400 text-[13px] leading-relaxed max-w-[240px] font-light">
              We are a creative agency with expertise, and we're on a mission to help you take the next step in your business.
            </p>
            <Link
              to="/what-we-do"
              className="inline-flex items-center gap-2 bg-[#b5ff2b] text-black text-[11px] font-bold px-5 py-2.5 rounded-full hover:bg-[#a8f020] transition-colors group"
            >
              See all services
              <span className="w-4 h-4 rounded-full bg-black/15 flex items-center justify-center text-[10px] group-hover:translate-x-0.5 transition-transform">
                ↗
              </span>
            </Link>
          </div>
        </div>

        {/* ── SERVICE LIST ─────────────────────────────────────────
             Left-aligned titles. On hover:
             1. Thumbnail reveals on the left
             2. Green CTA pill pops in next to title
             3. All siblings dim to ~0.15 opacity
             Fixed-height rows prevent any layout shift.
        ─────────────────────────────────────────────────────────── */}
        <div
          onMouseLeave={() => setHoveredIndex(null)}
          className="flex flex-col"
        >
          {services.map((service, i) => {
            const isHovered = hoveredIndex === i;
            const isDimmed = hoveredIndex !== null && !isHovered;

            return (
              <motion.div
                key={service.title}
                onMouseEnter={() => setHoveredIndex(i)}
                animate={{ opacity: isDimmed ? 0.15 : 1 }}
                transition={SPRING}
                className="relative"
              >
                {/* Top separator */}
                <div className="w-full h-px bg-white/[0.08]" />

                <Link
                  to={service.href}
                  tabIndex={0}
                  aria-label={service.title}
                  className="block w-full"
                >
                  {/* ── DESKTOP (lg+): fixed-height, left-aligned ─── */}
                  <div className="hidden lg:flex items-center w-full h-[130px] xl:h-[150px] overflow-hidden">

                    {/* Thumbnail — expands from left */}
                    <motion.div
                      animate={{
                        width: isHovered ? 100 : 0,
                        marginRight: isHovered ? 20 : 0,
                      }}
                      transition={SPRING}
                      className="flex-shrink-0 h-[72px] rounded-2xl overflow-hidden"
                    >
                      <motion.img
                        src={service.image}
                        alt=""
                        animate={{
                          opacity: isHovered ? 1 : 0,
                          scale: isHovered ? 1 : 0.85,
                        }}
                        transition={SPRING}
                        className="w-[100px] h-full object-cover"
                        loading="lazy"
                      />
                    </motion.div>

                    {/* Title — left-aligned, massive */}
                    <h3 className="text-[3.5rem] lg:text-[4.5rem] xl:text-[5.5rem] 2xl:text-[6.5rem] font-bold text-white tracking-[-0.03em] leading-none whitespace-nowrap flex-1 min-w-0">
                      {service.title}
                    </h3>

                    {/* CTA pill — pops in to the right of the title */}
                    <motion.div
                      animate={{
                        scale: isHovered ? 1 : 0,
                        opacity: isHovered ? 1 : 0,
                        width: isHovered ? 48 : 0,
                        marginLeft: isHovered ? 20 : 0,
                      }}
                      transition={SPRING}
                      className="flex-shrink-0 h-12 rounded-full bg-[#b5ff2b] flex items-center justify-center overflow-hidden"
                    >
                      <span className="text-black font-black text-lg leading-none">↗</span>
                    </motion.div>
                  </div>

                  {/* ── MOBILE (below lg) ─── */}
                  <div className="flex lg:hidden items-center gap-4 w-full py-6 sm:py-7">
                    <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-[-0.02em] leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-neutral-500 text-xs sm:text-[13px] mt-1 line-clamp-2 font-light">
                        {service.subtext}
                      </p>
                    </div>
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#b5ff2b] flex items-center justify-center ml-2">
                      <span className="text-black font-bold text-sm">↗</span>
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}

          {/* Final bottom border */}
          <div className="w-full h-px bg-white/[0.08]" />
        </div>

      </div>
    </section>
  );
};
