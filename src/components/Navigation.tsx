import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

const navLinks = [
  { label: "Services", href: "/what-we-do", badge: "13" },
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
      <header
        data-floating={scrolled ? "true" : "false"}
        className={`group/nav fixed left-0 right-0 z-[60] font-['Schibsted_Grotesk',sans-serif] transition-[transform,top,padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
          scrolled ? "top-3 px-3 sm:top-4 sm:px-4" : "top-0 px-0 py-6"
        } ${tucked ? "-translate-y-[150%]" : "translate-y-0"}`}
      >
        <div
          className={`flex w-full items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            scrolled
              ? "mx-auto max-w-[1400px] rounded-full border border-black/[0.06] bg-[#f2f2ef]/90 py-3 pl-6 pr-3 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-[#1c1d1b]/95 dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)] sm:pl-8"
              : "bg-transparent"
          }`}
          style={
            scrolled
              ? undefined
              : {
                  // full-bleed at rest: the logo sits outboard of the hero
                  // panel edge, which is what gives the layout its wide feel
                  paddingLeft: "clamp(20px, 3.2vw, 84px)",
                  paddingRight: "clamp(20px, 3.2vw, 84px)",
                }
          }
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

