import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="w-full bg-background pt-24 sm:pt-28 pb-10 sm:pb-16 px-4 sm:px-6 md:px-8 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-[1700px] mx-auto">
        
        {/* ── ROUNDED SHOWCASE HERO CONTAINER ────────────────────────── */}
        <div className="relative w-full h-[560px] sm:h-[640px] lg:h-[720px] xl:h-[780px] rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] overflow-hidden bg-[#e6e2d8] dark:bg-[#121214] border border-border/30 shadow-sm">
          
          {/* Background Showcase Image with Soft Lighting */}
          <div className="absolute inset-0 z-0">
            <img
              src="/whycreatives-app.webp"
              alt="WhyCreatives Agency Showcase"
              className="w-full h-full object-cover opacity-90 dark:opacity-40 transition-transform duration-1000 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
          </div>

          {/* ── TOP-LEFT OVERLAPPING CARD CUTOUT (MadeByShape Signature Design) ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 left-0 z-20 max-w-[92%] sm:max-w-[580px] lg:max-w-[660px] p-6 sm:p-8 lg:p-10 bg-white dark:bg-[#0A0A0C] rounded-br-[28px] sm:rounded-br-[36px] shadow-2xl"
          >
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-[0.2em] font-medium mb-4"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#b5ff2b]" />
              Hiya, we're WhyCreatives 👋
            </motion.div>

            {/* Slide & Stagger Animated Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-5xl lg:text-6xl xl:text-[3.6rem] font-normal text-foreground leading-[1.12] tracking-[-0.03em] mb-6 sm:mb-8"
            >
              A video editing, web design and branding agency in India
            </motion.h1>

            {/* Action Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-3.5"
            >
              <Link
                to="/our-work"
                className="inline-flex items-center gap-2 bg-black dark:bg-[#b5ff2b] text-white dark:text-black text-xs font-bold px-5 sm:px-6 py-2.5 sm:py-3 rounded-full hover:scale-105 transition-all shadow-sm group"
              >
                View our work
                <span className="w-4 h-4 rounded-full bg-white/20 dark:bg-black/20 flex items-center justify-center text-[10px] group-hover:translate-x-0.5 transition-transform">
                  ↗
                </span>
              </Link>

              <Link
                to="/people"
                className="inline-flex items-center gap-2 border border-foreground/20 text-foreground text-xs font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-full hover:bg-secondary transition-all"
              >
                Meet the team ↗
              </Link>
            </motion.div>
          </motion.div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
