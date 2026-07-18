import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";

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
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      // Restore body scroll
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${
          isOpen
            ? "bg-transparent border-b border-transparent py-5 md:py-6"
            : scrolled
            ? "bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-border/40 shadow-sm py-3 md:py-4"
            : "bg-transparent py-5 md:py-6 border-b border-transparent"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2.5 transition-transform hover:scale-[1.02] duration-300">
            <img
              src="/logo.png"
              alt="WhyCreatives Logo"
              width="32"
              height="32"
              className="w-7 h-7 md:w-8 md:h-8 dark:invert object-contain"
            />
            <span className="text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight text-foreground">
              WhyCreatives
            </span>
          </Link>
          <div className="flex items-center gap-1.5 ml-auto">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:bg-secondary/80 h-10 w-10 md:h-11 md:w-11 rounded-full flex-shrink-0 flex flex-col items-center justify-center gap-1.5 z-[60] relative transition-colors animate-fade-in"
              aria-label="Toggle menu"
            >
              <span className={`h-[2px] w-5 rounded-full bg-current transition-all duration-300 ease-out ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`h-[2px] w-5 rounded-full bg-current transition-all duration-300 ease-out ${isOpen ? "opacity-0" : ""}`} />
              <span className={`h-[2px] w-5 rounded-full bg-current transition-all duration-300 ease-out ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </Button>
          </div>
        </div>
      </nav>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-white/95 dark:bg-black/95 backdrop-blur-xl pt-28 md:pt-32"
          >
            <div className="h-full flex flex-col overflow-hidden relative">
              {/* Menu Items - Scrollable content */}
              <div
                className="flex-1 overflow-y-auto overflow-x-hidden"
                style={{
                  WebkitOverflowScrolling: 'touch',
                  overscrollBehavior: 'contain',
                  touchAction: 'pan-y'
                }}
              >
                <nav className="container mx-auto px-6 lg:px-12 py-8 md:py-12 pb-20">
                  <div className="flex flex-col space-y-4 md:space-y-6 lg:space-y-8">
                    {menuItems.map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{
                          opacity: 0,
                          x: -30
                        }}
                        animate={{
                          opacity: 1,
                          x: 0
                        }}
                        transition={{
                          delay: 0.15 + index * 0.05,
                          duration: 0.5,
                          ease: [0.16, 1, 0.3, 1]
                        }}
                      >
                        <Link
                          to={item.href}
                          onClick={handleLinkClick}
                          className="block text-left text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground hover:text-muted-foreground transition-colors duration-300 py-2 active:scale-95"
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </nav>
              </div>

              {/* Footer - Fixed at bottom */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="flex-shrink-0 bg-background border-t border-border/50"
              >
                <div className="container mx-auto px-6 lg:px-12 py-4 md:py-5">
                  <p className="text-xs md:text-sm text-muted-foreground">Guwahati, Assam 🇮🇳</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
