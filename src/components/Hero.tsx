import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="w-full bg-background pt-20 sm:pt-28 pb-8 sm:pb-16 px-3 sm:px-6 md:px-8 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-[1700px] mx-auto">
        
        {/* ── MADEBYSHAPE WARM BEIGE HERO CONTAINER ──────────────────── */}
        <div className="relative w-full rounded-[24px] sm:rounded-[36px] lg:rounded-[44px] bg-[#EBE7DE] dark:bg-[#141416] border border-border/40 p-4 sm:p-8 lg:p-14 overflow-hidden shadow-xs">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start relative z-10">
            
            {/* ── LEFT COLUMN: WHITE/DARK CUT-OUT STATEMENT CARD ─────── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 bg-white dark:bg-[#0A0A0C] p-5 sm:p-8 md:p-12 rounded-[20px] sm:rounded-[32px] shadow-xl border border-border/20 flex flex-col justify-between"
            >
              <div>
                {/* Top Badge */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex items-center gap-2 text-[11px] sm:text-xs text-muted-foreground uppercase tracking-[0.2em] font-medium mb-3 sm:mb-4"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#b5ff2b]" />
                  Hiya, we're WhyCreatives 👋
                </motion.div>

                {/* Staggered Text Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[1.75rem] sm:text-4xl lg:text-5xl xl:text-[3.8rem] font-normal text-foreground leading-[1.15] tracking-[-0.03em] mb-6 sm:mb-8"
                >
                  A video editing, web design and branding agency in India
                </motion.h1>
              </div>

              {/* Action Pill Group */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2"
              >
                <Link
                  to="/our-work"
                  className="inline-flex items-center justify-center gap-2 bg-black dark:bg-[#b5ff2b] text-white dark:text-black text-xs font-bold px-6 py-3.5 sm:py-3 rounded-full hover:scale-[1.02] active:scale-95 transition-all shadow-sm group"
                >
                  View our work
                  <span className="w-4 h-4 rounded-full bg-white/20 dark:bg-black/20 flex items-center justify-center text-[10px] group-hover:translate-x-0.5 transition-transform">
                    ↗
                  </span>
                </Link>

                <Link
                  to="/people"
                  className="inline-flex items-center justify-center gap-2 border border-foreground/20 text-foreground text-xs font-semibold px-6 py-3.5 sm:py-3 rounded-full hover:bg-secondary active:scale-95 transition-all"
                >
                  Meet the team ↗
                </Link>
              </motion.div>
            </motion.div>

            {/* ── RIGHT COLUMN: FEATURED SHOWCASE CARDS ────────────────── */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 items-end self-stretch pt-2 lg:pt-0">
              
              {/* Card 1: Main Project Preview (Col 1-8) */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="sm:col-span-8 group cursor-pointer"
              >
                <Link to="/our-work" className="block">
                  <div className="w-full aspect-[16/10] sm:aspect-[4/3] rounded-xl sm:rounded-3xl overflow-hidden bg-white/60 dark:bg-black/40 mb-2.5 sm:mb-3 relative shadow-sm border border-black/5 dark:border-white/5">
                    <img
                      src="/whycreatives-app.webp"
                      alt="Next.js & Convex Web Application"
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-foreground/80 font-semibold px-1">
                    <span>Web & App Platforms</span>
                    <span className="text-muted-foreground text-[11px]">2024</span>
                  </div>
                </Link>
              </motion.div>

              {/* Card 2: Secondary Project Preview (Col 9-12) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="sm:col-span-4 group cursor-pointer"
              >
                <Link to="/our-work" className="block">
                  <div className="w-full aspect-[16/10] sm:aspect-[3/4] rounded-xl sm:rounded-3xl overflow-hidden bg-white/60 dark:bg-black/40 mb-2.5 sm:mb-3 relative shadow-sm border border-black/5 dark:border-white/5">
                    <img
                      src="/whycreatives-brand.webp"
                      alt="Brand Identity Showcase"
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-foreground/80 font-semibold px-1">
                    <span>Branding</span>
                    <span className="text-muted-foreground text-[11px]">2024</span>
                  </div>
                </Link>
              </motion.div>

            </div>

          </div>

          {/* Bottom Center Indicator Bar */}
          <div className="flex justify-center pt-6 sm:pt-8">
            <span className="w-8 sm:w-10 h-1 rounded-full bg-foreground/20" />
          </div>

        </div>

      </div>
    </section>
  );
};
