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
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-20 pt-16 pb-24 lg:pt-24 lg:pb-36 max-w-[1600px] mx-auto">

        {/* ── TOP HEADER (12-Column Grid Layout) ──────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 lg:mb-24 items-start">
          
          {/* Col 1-3: Left Badge */}
          <div className="lg:col-span-3 flex items-center gap-2.5 text-neutral-400 text-xs tracking-[0.2em] uppercase font-medium pt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
            Our Expertise
          </div>

          {/* Col 4-9: Center Headline */}
          <div className="lg:col-span-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.6rem] font-semibold text-white tracking-tight leading-[1.2]">
              How we take your business<br className="hidden sm:block" /> to the next level
            </h2>
          </div>

          {/* Col 10-12: Right Sub-copy & CTA Button */}
          <div className="lg:col-span-3 flex flex-col gap-4 items-start lg:items-end text-left lg:text-right">
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

        {/* ── SERVICE OPTIONS (Flawlessly Aligned 9-Col Span) ─────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left empty space (Col 1-3) matching MadeByShape layout */}
          <div className="hidden lg:block lg:col-span-3" />

          {/* Service Items (Col 4-12) */}
          <div
            onMouseLeave={() => setHoveredIndex(null)}
            className="col-span-1 lg:col-span-9 flex flex-col"
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
                    className="block w-full"
                  >
                    {/* ── DESKTOP ROW (Proportional Display Typography) ── */}
                    <div className="hidden lg:flex items-center w-full h-[120px] xl:h-[145px] 2xl:h-[160px] overflow-hidden pr-4">

                      {/* Thumbnail: reveals smoothly on left of title */}
                      <motion.div
                        animate={{
                          width: isHovered ? 100 : 0,
                          marginRight: isHovered ? 20 : 0,
                          opacity: isHovered ? 1 : 0,
                        }}
                        transition={SPRING}
                        className="flex-shrink-0 h-[70px] xl:h-[82px] rounded-2xl overflow-hidden"
                      >
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-[100px] h-full object-cover"
                          loading="lazy"
                        />
                      </motion.div>

                      {/* Service Title - Cleanly scaled display text */}
                      <h3 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-[5.25rem] font-bold text-white tracking-[-0.03em] leading-none whitespace-nowrap">
                        {service.title}
                      </h3>

                      {/* Green CTA Pill: pops in on right of title */}
                      <motion.div
                        animate={{
                          scale: isHovered ? 1 : 0,
                          opacity: isHovered ? 1 : 0,
                          width: isHovered ? 48 : 0,
                          marginLeft: isHovered ? 20 : 0,
                        }}
                        transition={SPRING}
                        className="flex-shrink-0 h-12 xl:h-13 rounded-full bg-[#b5ff2b] flex items-center justify-center overflow-hidden"
                      >
                        <span className="text-black font-black text-xl leading-none">↗</span>
                      </motion.div>

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

      </div>
    </section>
  );
};
