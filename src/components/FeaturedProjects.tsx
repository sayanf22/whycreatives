import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const projects = [
  {
    id: 1,
    title: "Minimalist brand identity, positioning & creative direction",
    category: "WhyCreatives Branding",
    year: "2024",
    image: "/whycreatives-brand.webp",
    tags: ["Branding", "Strategy"],
    href: "/our-work",
  },
  {
    id: 2,
    title: "Custom web & mobile apps with Next.js, Node.js, Supabase & Convex",
    category: "Web & Mobile Apps",
    year: "2024",
    image: "/whycreatives-app.webp",
    tags: ["Next.js + Convex", "iOS & Android"],
    href: "/our-work",
  },
  {
    id: 3,
    title: "@AreyParo UGC reels, viral scriptwriting & creator marketing",
    category: "WhyCreatives UGC",
    year: "2024",
    image: "/whycreatives-ugc.webp",
    tags: ["UGC Reels", "Social Growth"],
    href: "/our-work",
  },
];

export const FeaturedProjects = () => {
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);
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
      className="relative w-full bg-background px-4 font-['Schibsted_Grotesk',sans-serif] md:px-[clamp(32px,6vw,160px)]"
      style={{
        paddingTop: "clamp(56px, 7vw, 120px)",
        paddingBottom: "clamp(56px, 7vw, 120px)",
      }}
    >
      
      {/* ── CUSTOM GREEN ARROW CURSOR (Shown ONLY when hovering project cards) ── */}
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
            scale: hoveredCardId !== null ? 1 : 0,
            opacity: hoveredCardId !== null ? 1 : 0,
            width: 60,
            height: 60,
            backgroundColor: "#b5ff2b",
          }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="fixed top-0 left-0 pointer-events-none z-[100] rounded-full flex items-center justify-center select-none shadow-xl"
        >
          <AnimatePresence>
            {hoveredCardId !== null && (
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

      <div className="w-full">
        {/* ── STAGGERED 2-COLUMN PROJECT GRID ───────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Project 1 & Project 3 */}
          <div className="flex flex-col gap-12 lg:gap-20">
            {/* Project 1 */}
            <Link
              to={projects[0].href}
              onMouseEnter={() => setHoveredCardId(projects[0].id)}
              onMouseLeave={() => setHoveredCardId(null)}
              className="group block lg:cursor-none"
            >
              <div className="w-full aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden relative mb-4 bg-secondary">
                <img
                  src={projects[0].image}
                  alt={projects[0].title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1.5">
                <span>{projects[0].year}</span>
                <span>•</span>
                <span>{projects[0].category}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-foreground leading-tight tracking-tight group-hover:text-muted-foreground transition-colors">
                {projects[0].title}
              </h3>
            </Link>

            {/* Project 3 */}
            <Link
              to={projects[2].href}
              onMouseEnter={() => setHoveredCardId(projects[2].id)}
              onMouseLeave={() => setHoveredCardId(null)}
              className="group block lg:cursor-none"
            >
              <div className="w-full aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden relative mb-4 bg-secondary">
                {/* Tag Pills */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                  {projects[2].tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-background/80 backdrop-blur-md text-foreground text-[10px] font-bold px-3 py-1.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <img
                  src={projects[2].image}
                  alt={projects[2].title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1.5">
                <span>{projects[2].year}</span>
                <span>•</span>
                <span>{projects[2].category}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-foreground leading-tight tracking-tight group-hover:text-muted-foreground transition-colors">
                {projects[2].title}
              </h3>
            </Link>
          </div>

          {/* RIGHT COLUMN: Header + Project 2 */}
          <div className="flex flex-col gap-12 lg:gap-16 pt-0 lg:pt-8">
            {/* Header Block with Link to /our-work */}
            <div className="mb-4 lg:mb-8">
              <div className="flex items-center gap-2.5 text-muted-foreground text-xs tracking-[0.2em] uppercase font-medium mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                Our Work
              </div>
              <Link to="/our-work" className="group inline-block">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight leading-[1.15] group-hover:text-muted-foreground transition-colors">
                  Take a look at<br />our projects ↗
                </h2>
              </Link>
            </div>

            {/* Project 2 */}
            <Link
              to={projects[1].href}
              onMouseEnter={() => setHoveredCardId(projects[1].id)}
              onMouseLeave={() => setHoveredCardId(null)}
              className="group block lg:cursor-none"
            >
              <div className="w-full aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden relative mb-4 bg-secondary">
                {/* Tag Pills */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                  {projects[1].tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-background/80 backdrop-blur-md text-foreground text-[10px] font-bold px-3 py-1.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <img
                  src={projects[1].image}
                  alt={projects[1].title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1.5">
                <span>{projects[1].year}</span>
                <span>•</span>
                <span>{projects[1].category}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-foreground leading-tight tracking-tight group-hover:text-muted-foreground transition-colors">
                {projects[1].title}
              </h3>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};
