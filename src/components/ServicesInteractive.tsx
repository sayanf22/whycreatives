import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SPRING = { type: "spring", stiffness: 220, damping: 26, mass: 0.8 } as const;

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
      className="w-full bg-[#0A0A0C] rounded-t-[28px] md:rounded-t-[40px] overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]"
      aria-label="Our Services"
    >
      <div className="w-full px-6 sm:px-10 lg:px-16 pt-16 pb-24 lg:pt-24 lg:pb-32">

        {/* ── TOP HEADER (3-Column Layout Across Page) ──────────────── */}
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-20 lg:mb-28 items-start">
          
          {/* Left Column: Badge */}
          <div className="flex items-center gap-2.5 text-neutral-400 text-xs tracking-[0.2em] uppercase font-semibold pt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
            Our Expertise
          </div>

          {/* Center Column: Clean 2-Line Headline */}
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.6rem] font-semibold text-white tracking-tight leading-[1.2]">
              How we take your business<br className="hidden sm:block" /> to the next level
            </h2>
          </div>

          {/* Right Column: Subtext & CTA */}
          <div className="flex flex-col gap-4 items-start lg:items-end text-left lg:text-right">
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-[260px] font-normal">
              We are a digital marketing agency with expertise, and we're on a mission to help you take the next step in your business.
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

        {/* ── CENTERED SERVICE OPTIONS LIST (Matching Reference UI) ── */}
        <div
          onMouseLeave={() => setHoveredIndex(null)}
          className="max-w-4xl lg:max-w-5xl mx-auto w-full flex flex-col"
        >
          {services.map((service, i) => {
            const isHovered = hoveredIndex === i;
            const isDimmed = hoveredIndex !== null && !isHovered;

            return (
              <motion.div
                key={service.title}
                onMouseEnter={() => setHoveredIndex(i)}
                animate={{ opacity: isDimmed ? 0.25 : 1 }}
                transition={SPRING}
                className="relative"
              >
                {/* Top Border Divider */}
                <div className="w-full h-px bg-white/[0.08]" />

                <Link
                  to={service.href}
                  tabIndex={0}
                  aria-label={service.title}
                  className="block w-full"
                >
                  {/* ── DESKTOP ROW (Fixed-Height, Centered Block) ── */}
                  <div className="hidden lg:flex items-center w-full h-[110px] xl:h-[130px] overflow-hidden">

                    {/* Thumbnail: reveals smoothly on left of title */}
                    <motion.div
                      animate={{
                        width: isHovered ? 90 : 0,
                        marginRight: isHovered ? 20 : 0,
                        opacity: isHovered ? 1 : 0,
                      }}
                      transition={SPRING}
                      className="flex-shrink-0 h-[65px] rounded-xl overflow-hidden"
                    >
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-[90px] h-full object-cover"
                        loading="lazy"
                      />
                    </motion.div>

                    {/* Service Title */}
                    <h3 className="text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white tracking-tight leading-none whitespace-nowrap">
                      {service.title}
                    </h3>

                    {/* Green CTA Pill: pops in on right of title */}
                    <motion.div
                      animate={{
                        scale: isHovered ? 1 : 0,
                        opacity: isHovered ? 1 : 0,
                        width: isHovered ? 44 : 0,
                        marginLeft: isHovered ? 18 : 0,
                      }}
                      transition={SPRING}
                      className="flex-shrink-0 h-11 rounded-full bg-[#b5ff2b] flex items-center justify-center overflow-hidden"
                    >
                      <span className="text-black font-black text-lg leading-none">↗</span>
                    </motion.div>

                    {/* Number on far right */}
                    <span className="ml-auto text-white/20 text-xs font-semibold tabular-nums flex-shrink-0">
                      {service.number}
                    </span>
                  </div>

                  {/* ── MOBILE ROW ── */}
                  <div className="flex lg:hidden items-center gap-4 w-full py-5 sm:py-6">
                    <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-neutral-400 text-xs mt-1 line-clamp-2">
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

          {/* Bottom Border Divider */}
          <div className="w-full h-px bg-white/[0.08]" />
        </div>

      </div>
    </section>
  );
};
