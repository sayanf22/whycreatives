import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInWhenVisibleProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  /**
   * Drives the reveal from outside instead of from the viewport.
   *
   * For content that has to wait on something other than being scrolled to — a page
   * opening behind an intro curtain, where anything above the fold would otherwise
   * fire on mount and finish before the curtain cleared.
   *
   * Left undefined this behaves exactly as before and reveals on scroll, so the
   * existing callers are untouched.
   */
  active?: boolean;
}

export const FadeInWhenVisible = ({ 
  children, 
  delay = 0, 
  duration = 0.5,
  className = "",
  active
}: FadeInWhenVisibleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      {...(active === undefined
        ? {
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, margin: "-50px" },
          }
        : { animate: active ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 } })}
      transition={{
        duration,
        delay,
        ease: "easeOut"
      }}
      className={className}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
};
