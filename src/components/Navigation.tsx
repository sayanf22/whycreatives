import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

/* `badge` is kept optional so a link can opt into a pill later. The Services
   link carried a hard-coded "13" that did not correspond to anything. */
type NavLink = { label: string; href: string; badge?: string };

const navLinks: NavLink[] = [
  { label: "Services", href: "/what-we-do" },
  { label: "Work", href: "/our-work" },
  { label: "About", href: "/about-us" },
  { label: "Blog", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { pathname } = useLocation();

  /**
   * Directional nav: scrolling down tucks the bar away, any upward scroll
   * brings it straight back. Reads are batched into a rAF so we don't force
   * layout on every scroll event, and small deltas are ignored so trackpad
   * jitter and iOS rubber-banding don't flicker it.
   */
  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = Math.max(0, window.scrollY);
      const delta = y - lastY;

      setScrolled(y > 12);

      if (y < 96) {
        setHidden(false); // never hide near the top
      } else if (delta > 6) {
        setHidden(true);
      } else if (delta < -6) {
        setHidden(false);
      }

      lastY = y;
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // keep the bar on screen whenever the mobile menu is open
  const tucked = hidden && !isOpen;

  return (
    <>
      {/* At rest the nav is flush and full-bleed. On scroll it detaches into a
          floating capsule — light in light mode, dark in dark mode — and tucks
          out of view while scrolling down. */}
      {/* The header itself only ever animates `transform`. Both the settle-down
          offset and the scroll-away tuck are folded into one translateY, so
          they can't fight each other — animating `top` alongside a transform
          was what made this stutter. The capsule look is a separate, purely
          visual transition on the inner element. */}
      <header
        data-floating={scrolled ? "true" : "false"}
        className="group/nav fixed left-0 right-0 top-0 z-[60] px-3 font-['Schibsted_Grotesk',sans-serif] sm:px-4"
        style={{
          transform: `translate3d(0, ${tucked ? "-135%" : scrolled ? "14px" : "0px"}, 0)`,
          transition: "transform 520ms cubic-bezier(0.16, 1, 0.3, 1)",
          willChange: "transform",
        }}
      >
        <div
          /* Opaque on small screens: a translucent blurred capsule sitting over
             body copy read as ghosted, half-visible text on phones. Blur only
             kicks in from sm up, where there's room for it to look intentional. */
          className={`mx-auto flex items-center justify-between border ${
            scrolled
              ? "max-w-[1120px] rounded-full border-black/[0.07] bg-[#f2f2ef] shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-[#1c1d1b] dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)] sm:bg-[#f2f2ef]/90 sm:backdrop-blur-md sm:dark:bg-[#1c1d1b]/90"
              : "max-w-full rounded-none border-transparent bg-transparent shadow-none"
          }`}
          style={{
            // one explicit property list — `transition-all` was also tweening
            // things that can't animate cleanly
            transition:
              "max-width 520ms cubic-bezier(0.16,1,0.3,1), padding 520ms cubic-bezier(0.16,1,0.3,1), border-radius 380ms ease, background-color 380ms ease, border-color 380ms ease, box-shadow 380ms ease",
            paddingTop: scrolled ? 10 : 24,
            paddingBottom: scrolled ? 10 : 24,
            paddingLeft: scrolled ? 26 : "clamp(18px, 3.2vw, 80px)",
            paddingRight: scrolled ? 10 : "clamp(18px, 3.2vw, 80px)",
          }}
        >
          
          {/* ── LEFT LOGO ────────────────────────────────────────── */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <span className="text-2xl md:text-3xl font-black tracking-tighter text-black transition-colors duration-300 dark:text-white">
              WhyCreatives.
            </span>
          </Link>

          {/* ── CENTER DESKTOP NAV LINKS ───────────────────────────── */}
          <nav className="hidden lg:flex items-center gap-10 text-[13px] font-bold text-black/80 transition-colors duration-300 dark:text-white/80">
            {navLinks.map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  aria-current={active ? "page" : undefined}
                  className="relative py-1 group hover:text-black dark:hover:text-white transition-colors"
                >
                  {link.label}
                  {/* hover / active underline — wipes in from the left */}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute -bottom-0.5 left-0 h-[1.5px] w-full origin-left rounded-full bg-current transition-transform duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                  {link.badge && (
                    <span className="absolute -top-2 -right-4 bg-[#d4ff33] text-black text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full leading-none">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ── RIGHT ACTION AREA ────────────────────────────────── */}
          <div className="flex items-center gap-4">
            
            <ThemeToggle />
            
            {/* Start a project Button */}
            <Link
              to="/contact"
              className="hidden sm:inline-flex items-center gap-2 bg-[#d4ff33] text-black text-[13px] font-bold px-6 py-2.5 rounded-full hover:bg-[#c4f020] transition-colors group select-none"
            >
              Start a project
              <span className="text-[10px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                ↗
              </span>
            </Link>

            {/* Mobile Hamburger Toggle Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10 h-10 w-10 rounded-full flex flex-col items-center justify-center gap-1.5 z-[60] relative"
              aria-label="Toggle menu"
            >
              <span className={`h-[2px] w-5 rounded-full bg-current transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`h-[2px] w-5 rounded-full bg-current transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
              <span className={`h-[2px] w-5 rounded-full bg-current transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </Button>
          </div>
        </div>
      </header>

      {/* ── MOBILE MENU OVERLAY ──────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-white dark:bg-[#111] pt-28 px-6 font-['Schibsted_Grotesk',sans-serif] flex flex-col justify-between pb-10"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-2xl sm:text-3xl font-bold text-black dark:text-white hover:text-[#d4ff33] dark:hover:text-[#d4ff33] transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <div className="pt-8 border-t border-black/10 dark:border-white/10">
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#d4ff33] text-black text-sm font-bold py-4 rounded-full"
              >
                Start a project ↗
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

