import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? "bg-background/95 backdrop-blur-sm border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 lg:px-16 py-5 md:py-6 flex justify-between items-center">
          <Link to="/" className="flex items-center transition-transform hover:scale-105 duration-300">
            <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              WhyCreatives
            </span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(true)}
            className="text-foreground hover:bg-secondary/80 h-14 w-14 md:h-16 md:w-16 flex-shrink-0"
          >
            <Menu className="h-8 w-8 md:h-9 md:w-9" />
          </Button>
        </div>
      </nav>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-50 bg-background"
          >
            <div className="h-full flex flex-col overflow-hidden">
              {/* Header with Logo - Fixed at top */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="flex-shrink-0 bg-background z-10 border-b border-border/50"
              >
                <div className="container mx-auto px-6 lg:px-12 py-5 md:py-6 flex justify-between items-center">
                  <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                    WhyCreatives
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-foreground hover:bg-secondary h-12 w-12 md:h-14 md:w-14 flex-shrink-0"
                  >
                    <X className="h-7 w-7 md:h-9 md:w-9" />
                  </Button>
                </div>
              </motion.div>

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
                          x: -50,
                          filter: "blur(10px)"
                        }}
                        animate={{ 
                          opacity: 1, 
                          x: 0,
                          filter: "blur(0px)"
                        }}
                        transition={{
                          delay: 0.3 + index * 0.1,
                          duration: 0.6,
                          ease: [0.22, 1, 0.36, 1]
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
                transition={{ delay: 0.5, duration: 0.4 }}
                className="flex-shrink-0 bg-background border-t border-border/50"
              >
                <div className="container mx-auto px-6 lg:px-12 py-4 md:py-5">
                  <p className="text-xs md:text-sm text-muted-foreground">Tripura, Agartala 🇮🇳</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
