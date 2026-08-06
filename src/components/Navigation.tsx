import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Services", href: "/what-we-do", badge: "5" },
  { label: "Work", href: "/our-work" },
  { label: "About", href: "/about-us" },
  { label: "Blog", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

const menuItems = [
  { label: "What We Do", href: "/what-we-do" },
  { label: "Our Work", href: "/our-work" },
  { label: "Pricing Comparison", href: "/pricing-comparison" },
  { label: "Insights", href: "/insights" },
  { label: "About Us", href: "/about-us" },
  { label: "People", href: "/people" },
  { label: "Join Us", href: "/join-us" },
  { label: "Contact Us", href: "/contact" },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 font-['Plus_Jakarta_Sans',sans-serif] ${
          scrolled
            ? "bg-background/85 backdrop-blur-md border-b border-border/40 py-3 sm:py-4 shadow-sm"
            : "bg-transparent py-5 sm:py-6"
        }`}
      >
        <div className="w-full max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 flex items-center justify-between">
          
          {/* ── LEFT LOGO ────────────────────────────────────────── */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src="/logo.png"
              alt="WhyCreatives Logo"
              className="w-7 h-7 md:w-8 md:h-8 dark:invert object-contain transition-transform group-hover:scale-105"
            />
            <span className="text-xl md:text-2xl font-extrabold tracking-tight text-foreground">
              WhyCreatives<span className="text-[#b5ff2b]">.</span>
            </span>
          </Link>

          {/* ── CENTER DESKTOP NAV LINKS (MadeByShape exact design) ── */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold text-foreground/80">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="relative hover:text-foreground transition-colors py-1 group"
              >
                {link.label}
                {link.badge && (
                  <span className="absolute -top-2 -right-3 bg-[#b5ff2b] text-black text-[9px] font-black px-1.5 py-0.5 rounded-full leading-none shadow-xs">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* ── RIGHT ACTION AREA ────────────────────────────────── */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            
            {/* MadeByShape 'Start a project ↗' Neon Pill Button */}
            <Link
              to="/contact"
              className="hidden sm:inline-flex items-center gap-2 bg-[#b5ff2b] text-black text-xs font-bold px-5 py-2.5 rounded-full hover:bg-[#a8f020] transition-colors group select-none shadow-sm"
            >
              Start a project
              <span className="w-4 h-4 rounded-full bg-black/15 flex items-center justify-center text-[10px] group-hover:translate-x-0.5 transition-transform">
                ↗
              </span>
            </Link>

            {/* Mobile Hamburger Toggle Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-foreground hover:bg-secondary/80 h-10 w-10 rounded-full flex flex-col items-center justify-center gap-1.5 z-[60] relative"
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
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl pt-28 px-6 font-['Plus_Jakarta_Sans',sans-serif] flex flex-col justify-between pb-10"
          >
            <div className="flex flex-col gap-6">
              {menuItems.map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-2xl sm:text-3xl font-semibold text-foreground hover:text-muted-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="pt-8 border-t border-border/40 flex items-center justify-between">
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#b5ff2b] text-black text-sm font-bold py-3.5 rounded-full"
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
