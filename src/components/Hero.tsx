import { motion, useMotionValue, useSpring, useTransform, animate } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const services = [
  "Video Production",
  "Web Development",
  "Brand Identity",
  "Performance Marketing",
  "UGC & Collabs",
  "Logo Design",
];

// Animated counter using framer-motion's animate utility
function useAnimatedCounter(target: number, duration = 2) {
  const [value, setValue] = useState(0);
  const [triggered, setTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);
          const controls = animate(0, target, {
            duration,
            onUpdate: (v) => setValue(Math.floor(v)),
          });
          return () => controls.stop();
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration, triggered]);

  return { value, ref };
}

export const Hero = () => {
  const [serviceIndex, setServiceIndex] = useState(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const gridX = useTransform(springX, [-1, 1], [-6, 6]);
  const gridY = useTransform(springY, [-1, 1], [-4, 4]);

  const { value: projectsCount, ref: projectsRef } = useAnimatedCounter(500);
  const { value: clientsCount, ref: clientsRef } = useAnimatedCounter(120);
  const { value: satisfactionCount, ref: satisfactionRef } = useAnimatedCounter(100, 1.5);

  useEffect(() => {
    const id = setInterval(() => {
      setServiceIndex((i) => (i + 1) % services.length);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      className="relative w-full min-h-screen bg-[#f8f8f5] dark:bg-[#0a0a0c] overflow-hidden pt-24 sm:pt-28 pb-12 px-4 sm:px-8 lg:px-12 font-['Plus_Jakarta_Sans',sans-serif]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[5%] left-[15%] w-[700px] h-[700px] rounded-full bg-[#b5ff2b]/[0.07] dark:bg-[#b5ff2b]/[0.04] blur-[160px]" />
        <div className="absolute bottom-[-5%] right-[5%] w-[500px] h-[500px] rounded-full bg-purple-500/[0.05] dark:bg-purple-500/[0.03] blur-[140px]" />
      </div>

      <div className="relative max-w-[1600px] mx-auto">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-10 xl:gap-16 items-center min-h-[calc(100vh-7rem)]">

          {/* ─── LEFT COLUMN ─────────────────────────────────── */}
          <div className="flex flex-col justify-center gap-7 py-8 lg:py-0">

            {/* Live badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
              className="flex items-center gap-2.5"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b5ff2b] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#b5ff2b]" />
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-muted-foreground tracking-widest uppercase">
                Hiya, we're WhyCreatives 👋
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE_OUT }}
              className="text-[2.6rem] sm:text-[3.4rem] lg:text-[4rem] xl:text-[4.8rem] font-bold text-foreground leading-[1.06] tracking-[-0.04em]"
            >
              A video editing,{" "}
              <span className="relative inline-block">
                <span className="relative z-10">web design</span>
                <motion.span
                  className="absolute bottom-1 left-0 h-[6px] w-full rounded-full bg-[#b5ff2b] z-0"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.75, delay: 0.95, ease: EASE_OUT }}
                  style={{ originX: 0 }}
                />
              </span>{" "}
              and branding agency in India
            </motion.h1>

            {/* Cycling service pill */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: EASE_OUT }}
              className="flex items-center gap-3 flex-wrap"
            >
              <span className="text-sm text-muted-foreground font-medium">We do →</span>
              <div className="relative h-8 overflow-hidden min-w-[160px]">
                <motion.span
                  key={serviceIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: EASE_OUT }}
                  className="absolute inset-0 inline-flex items-center gap-1.5 bg-foreground text-background text-xs font-bold px-3.5 py-1.5 rounded-full whitespace-nowrap w-fit"
                >
                  {services[serviceIndex]}
                </motion.span>
              </div>
            </motion.div>

            {/* Sub-copy */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: EASE_OUT }}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-[480px]"
            >
              WhyCreatives is an independent creative & digital agency building
              high-impact brand identities, web experiences, and video production
              — based in Guwahati, India.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: EASE_OUT }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link
                to="/our-work"
                className="group inline-flex items-center justify-center gap-2 bg-black dark:bg-white text-white dark:text-black text-sm font-bold px-7 py-3.5 rounded-full hover:bg-neutral-800 dark:hover:bg-neutral-200 active:scale-95 transition-all shadow-lg shadow-black/10"
              >
                View our work
                <span className="w-5 h-5 rounded-full bg-white/15 dark:bg-black/15 flex items-center justify-center text-[11px] group-hover:translate-x-0.5 transition-transform">
                  ↗
                </span>
              </Link>
              <Link
                to="/people"
                className="inline-flex items-center justify-center gap-1.5 border border-foreground/20 text-foreground text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-foreground/5 active:scale-95 transition-all"
              >
                Meet the team →
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55, ease: EASE_OUT }}
              className="flex items-center gap-8 pt-2 border-t border-border/40"
            >
              <div className="flex flex-col" ref={projectsRef}>
                <span className="text-xl sm:text-2xl font-black text-foreground tracking-tight">{projectsCount}+</span>
                <span className="text-[11px] text-muted-foreground font-medium">Projects</span>
              </div>
              <div className="w-px h-8 bg-border/60" />
              <div className="flex flex-col" ref={clientsRef}>
                <span className="text-xl sm:text-2xl font-black text-foreground tracking-tight">{clientsCount}+</span>
                <span className="text-[11px] text-muted-foreground font-medium">Clients</span>
              </div>
              <div className="w-px h-8 bg-border/60" />
              <div className="flex flex-col" ref={satisfactionRef}>
                <span className="text-xl sm:text-2xl font-black text-foreground tracking-tight">{satisfactionCount}%</span>
                <span className="text-[11px] text-muted-foreground font-medium">Satisfaction</span>
              </div>
            </motion.div>
          </div>

          {/* ─── RIGHT COLUMN: BENTO GRID ─────────────────────── */}
          <motion.div
            style={{ x: gridX, y: gridY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative hidden lg:grid grid-cols-6 grid-rows-12 gap-3 h-[680px] xl:h-[740px]"
          >

            {/* Cell 1: Brand card – dark */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE_OUT }}
              className="col-span-2 row-span-4 bg-[#0d0d0d] dark:bg-[#161616] rounded-2xl p-5 flex flex-col justify-between overflow-hidden"
            >
              <FloatWrap delay={0}>
                <div className="w-8 h-8 rounded-full bg-[#b5ff2b] flex items-center justify-center">
                  <img src="/logo.png" alt="WhyCreatives" className="w-4 h-4 dark:invert" style={{ filter: "invert(1)" }} />
                </div>
                <div className="mt-auto">
                  <p className="text-[#b5ff2b] text-[10px] font-bold tracking-widest uppercase mb-1">Since 2020</p>
                  <h3 className="text-white text-xl font-black leading-tight">Why<br />Creatives<span className="text-[#b5ff2b]">.</span></h3>
                </div>
                <p className="text-white/35 text-[10px] mt-2">Guwahati, Assam 🇮🇳</p>
              </FloatWrap>
            </motion.div>

            {/* Cell 2: Hero image – creative office */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.35, ease: EASE_OUT }}
              className="col-span-4 row-span-5 rounded-2xl overflow-hidden relative group"
            >
              <img
                src="/creative-office.webp"
                alt="WhyCreatives office"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="bg-[#b5ff2b] text-black text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wide">
                  Creative Agency
                </span>
              </div>
              {/* Floating stat card */}
              <FloatWrap delay={1} className="absolute top-4 right-4">
                <div className="bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl px-3 py-2 shadow-xl">
                  <p className="text-[9px] text-muted-foreground font-medium">Client satisfaction</p>
                  <p className="text-xl font-black text-foreground leading-none mt-0.5">100%</p>
                </div>
              </FloatWrap>
            </motion.div>

            {/* Cell 3: Team collab */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.4, ease: EASE_OUT }}
              className="col-span-3 row-span-4 rounded-2xl overflow-hidden relative group"
            >
              <img
                src="/team-collab.webp"
                alt="Team collaboration"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
              <span className="absolute bottom-3 left-3 text-white/90 text-xs font-semibold">Team Collaboration</span>
            </motion.div>

            {/* Cell 4: Video gear */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.45, ease: EASE_OUT }}
              className="col-span-3 row-span-4 rounded-2xl overflow-hidden relative group"
            >
              <img
                src="/video-gear.webp"
                alt="Video production gear"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
              <FloatWrap delay={1.5} className="absolute top-3 left-3">
                <div className="bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl px-3 py-2 shadow-lg">
                  <p className="text-[9px] text-muted-foreground font-medium">Video Production</p>
                  <p className="text-sm font-black text-foreground">Cinema Grade</p>
                </div>
              </FloatWrap>
            </motion.div>

            {/* Cell 5: Services list */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: EASE_OUT }}
              className="col-span-2 row-span-3 bg-white dark:bg-[#111] rounded-2xl p-4 flex flex-col justify-between border border-border/30 shadow-sm"
            >
              <FloatWrap delay={0.4}>
                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Our Services</p>
                <div className="flex flex-col gap-1.5">
                  {["Video", "Web", "Branding", "Marketing"].map((s) => (
                    <span key={s} className="text-[11px] font-semibold bg-foreground/5 rounded-lg px-2.5 py-1.5 text-foreground">
                      {s}
                    </span>
                  ))}
                </div>
              </FloatWrap>
            </motion.div>

            {/* Cell 6: UGC project */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.55, ease: EASE_OUT }}
              className="col-span-2 row-span-3 rounded-2xl overflow-hidden relative group"
            >
              <img
                src="/project-ugc.webp"
                alt="UGC project"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
              <span className="absolute bottom-3 left-3 text-white text-[10px] font-bold">UGC & Collabs</span>
            </motion.div>

            {/* Cell 7: CTA card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: EASE_OUT }}
              className="col-span-2 row-span-3 bg-[#b5ff2b] rounded-2xl p-4 flex flex-col justify-between cursor-pointer hover:bg-[#a8f020] active:scale-95 transition-all"
              onClick={() => (window.location.href = "/contact")}
            >
              <FloatWrap delay={0.6}>
                <div className="w-7 h-7 rounded-full bg-black/10 flex items-center justify-center text-sm font-bold">↗</div>
                <div className="mt-auto">
                  <p className="text-black text-sm font-black leading-tight">Start a<br />project</p>
                  <p className="text-black/45 text-[10px] mt-1">hello@whycreatives.in</p>
                </div>
              </FloatWrap>
            </motion.div>

          </motion.div>

          {/* ─── MOBILE GRID (small screens) ─────────────── */}
          <div className="grid grid-cols-2 gap-3 lg:hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5, ease: EASE_OUT }}
              className="col-span-2 rounded-2xl overflow-hidden h-48 relative"
            >
              <img src="/creative-office.webp" alt="Creative work" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <span className="absolute bottom-3 left-3 bg-[#b5ff2b] text-black text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide">
                WhyCreatives
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.55, ease: EASE_OUT }}
              className="rounded-2xl overflow-hidden h-32 relative"
            >
              <img src="/team-collab.webp" alt="Team" className="w-full h-full object-cover" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6, ease: EASE_OUT }}
              className="bg-[#b5ff2b] rounded-2xl p-4 flex flex-col justify-between h-32 cursor-pointer active:scale-95 transition-transform"
              onClick={() => (window.location.href = "/contact")}
            >
              <span className="text-base">↗</span>
              <p className="text-black text-sm font-black">Start a project</p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

// ─── Floating wrapper (gentle infinite bob) ───────────────
function FloatWrap({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      animate={{ y: [0, -7, 0] }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
