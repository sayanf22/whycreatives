import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInWhenVisibleProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export const FadeInWhenVisible = ({ 
  children, 
  delay = 0, 
  duration = 0.5,
  className = ""
}: FadeInWhenVisibleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
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
