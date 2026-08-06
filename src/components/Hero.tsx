import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="w-full bg-background pt-20 sm:pt-28 pb-8 sm:pb-16 px-3 sm:px-6 md:px-8 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-[1700px] mx-auto">
        
        {/* ── MADEBYSHAPE WARM BEIGE HERO CONTAINER ──────────────────── */}
        <div className="relative w-full rounded-[24px] sm:rounded-[36px] lg:rounded-[44px] bg-[#EBE7DE] dark:bg-[#141416] border border-border/40 p-4 sm:p-8 lg:p-14 overflow-hidden shadow-xs">
          
          <div className="max-w-5xl mx-auto py-4 sm:py-8">
            
            {/* ── WHITE/DARK CUT-OUT STATEMENT CARD ─────── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white dark:bg-[#0A0A0C] p-6 sm:p-10 md:p-14 rounded-[20px] sm:rounded-[32px] shadow-xl border border-border/20 flex flex-col justify-between"
            >
              <div>
                {/* Top Badge */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex items-center gap-2 text-[11px] sm:text-xs text-muted-foreground uppercase tracking-[0.2em] font-medium mb-4 sm:mb-6"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#b5ff2b]" />
                  Hiya, we're WhyCreatives 👋
                </motion.div>

                {/* Staggered Text Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="text-3xl sm:text-5xl lg:text-6xl xl:text-[4rem] font-normal text-foreground leading-[1.12] tracking-[-0.03em] mb-8 sm:mb-10 max-w-4xl"
                >
                  A video editing, web design and branding agency in India
                </motion.h1>
              </div>

              {/* Action Pill Group */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2"
              >
                <Link
                  to="/our-work"
                  className="inline-flex items-center justify-center gap-2 bg-black dark:bg-[#b5ff2b] text-white dark:text-black text-xs sm:text-sm font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-full hover:scale-[1.02] active:scale-95 transition-all shadow-sm group"
                >
                  View our work
                  <span className="w-4 h-4 rounded-full bg-white/20 dark:bg-black/20 flex items-center justify-center text-[10px] group-hover:translate-x-0.5 transition-transform">
                    ↗
                  </span>
                </Link>

                <Link
                  to="/people"
                  className="inline-flex items-center justify-center gap-2 border border-foreground/20 text-foreground text-xs sm:text-sm font-semibold px-6 sm:px-8 py-3.5 sm:py-4 rounded-full hover:bg-secondary active:scale-95 transition-all"
                >
                  Meet the team ↗
                </Link>
              </motion.div>
            </motion.div>

          </div>

          {/* Bottom Center Indicator Bar */}
          <div className="flex justify-center pt-4 sm:pt-6">
            <span className="w-8 sm:w-10 h-1 rounded-full bg-foreground/20" />
          </div>

        </div>

      </div>
    </section>
  );
};
