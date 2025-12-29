import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BlurRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export const BlurReveal = ({ 
  children, 
  delay = 0, 
  duration = 0.6,
  className = ""
}: BlurRevealProps) => {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: 20,
        filter: "blur(10px)"
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        filter: "blur(0px)"
      }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1] // Smooth cubic bezier
      }}
      className={className}
      style={{ willChange: "opacity, transform, filter" }}
    >
      {children}
    </motion.div>
  );
};

// For individual text/link items with stagger effect
export const BlurRevealItem = ({ 
  children, 
  delay = 0,
  className = ""
}: BlurRevealProps) => {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        x: -10,
        filter: "blur(4px)"
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0,
        filter: "blur(0px)"
      }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{
        duration: 0.4,
        delay,
        ease: "easeOut"
      }}
      className={className}
      style={{ willChange: "opacity, transform, filter" }}
    >
      {children}
    </motion.div>
  );
};
