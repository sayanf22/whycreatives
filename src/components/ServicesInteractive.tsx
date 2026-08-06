import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SPRING = { type: "spring", stiffness: 200, damping: 25, mass: 0.8 } as const;

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
    title: "@AreyParo UGC & Collabs",
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
      className="w-full bg-[#0A0A0C] py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-10 font-['Plus_Jakarta_Sans',sans-serif]"
      aria-label="Our Services"
    >
      <div className="max-w-[1200px] mx-auto">

        {/* ── HEADER ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 mb-16 lg:mb-24 items-start">
          <div className="flex items-start gap-2 text-neutral-500 text-xs tracking-[0.2em] uppercase font-semibold pt-1">
            <span className="mt-[3px] w-1 h-1 rounded-full bg-neutral-500 flex-shrink-0" />
            Our Expertise
          </div>
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] xl:text-5xl font-bold text-white leading-tight tracking-tight">
              How we take your<br />business to the next level
            </h2>
          </div>
          <div className="flex flex-col gap-5 items-start lg:items-end text-left lg:text-right">
            <p className="text-neutral-400 text-sm leading-relaxed max-w-[260px] lg:ml-auto">
              We are a creative agency with expertise, and we're on a mission to help you take the next step in your business.
            </p>
            <Link
              to="/what-we-do"
              className="inline-flex items-center gap-2 bg-[#b5ff2b] text-black text-xs font-extrabold px-5 py-2.5 rounded-full hover:bg-[#9ee024] transition-colors group"
            >
              See all services
              <span className="w-4 h-4 rounded-full bg-black/15 flex items-center justify-center text-[10px] group-hover:translate-x-0.5 transition-transform">
                ↗
              </span>
            </Link>
          </div>
        </div>

        {/* ── INTERACTIVE SERVICE LIST ─────────────────────────────── */}
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
                animate={{ opacity: isDimmed ? 0.22 : 1 }}
                transition={SPRING}
                className="relative"
              >
                {/* Top border */}
                <div className="w-full h-px bg-zinc-800" />

                <Link
                  to={service.href}
                  tabIndex={0}
                  aria-label={service.title}
                  className="block w-full"
                >
                  {/* ── DESKTOP (lg+): Fixed-height row, no layout shift ─── */}
                  <div className="hidden lg:flex items-center w-full h-[100px] overflow-hidden">

                    {/* Thumbnail container — fixed slot, width animates via transform */}
                    <motion.div
                      animate={{
                        width: isHovered ? 110 : 0,
                        marginRight: isHovered ? 20 : 0,
                      }}
                      transition={SPRING}
                      className="flex-shrink-0 h-[72px] rounded-xl overflow-hidden"
                    >
                      <motion.img
                        src={service.image}
                        alt=""
                        animate={{
                          opacity: isHovered ? 1 : 0,
                          scale: isHovered ? 1 : 0.85,
                        }}
                        transition={SPRING}
                        className="w-[110px] h-full object-cover"
                        loading="lazy"
                      />
                    </motion.div>

                    {/* CTA pill — always in DOM, animate scale/opacity only (no mount/unmount) */}
                    <motion.div
                      animate={{
                        scale: isHovered ? 1 : 0,
                        opacity: isHovered ? 1 : 0,
                        width: isHovered ? 40 : 0,
                        marginRight: isHovered ? 16 : 0,
                      }}
                      transition={SPRING}
                      className="flex-shrink-0 h-10 rounded-full bg-[#b5ff2b] flex items-center justify-center overflow-hidden"
                    >
                      <span className="text-black font-black text-base leading-none">↗</span>
                    </motion.div>

                    {/* Title + subtext — subtext always rendered, opacity-only animation */}
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <h3 className="text-5xl xl:text-6xl font-black text-white tracking-tight leading-none whitespace-nowrap">
                        {service.title}
                      </h3>
                      <motion.p
                        animate={{
                          opacity: isHovered ? 1 : 0,
                          y: isHovered ? 0 : 4,
                        }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="text-neutral-400 text-sm mt-1.5 max-w-xl pointer-events-none"
                        aria-hidden={!isHovered}
                      >
                        {service.subtext}
                      </motion.p>
                    </div>

                    {/* Number */}
                    <span className="ml-auto pl-8 text-neutral-700 text-sm font-semibold tabular-nums flex-shrink-0">
                      {service.number}
                    </span>
                  </div>

                  {/* ── MOBILE (below lg) — static layout ─── */}
                  <div className="flex lg:hidden items-center gap-4 w-full py-5 sm:py-6">
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-neutral-400 text-xs sm:text-sm mt-1 line-clamp-2">
                        {service.subtext}
                      </p>
                    </div>
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#b5ff2b] flex items-center justify-center ml-2">
                      <span className="text-black font-black text-sm">↗</span>
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}

          {/* Final bottom border */}
          <div className="w-full h-px bg-zinc-800" />
        </div>

      </div>
    </section>
  );
};
