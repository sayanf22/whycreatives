import { motion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Descender room so "g", "y" and "p" are never clipped by the reveal mask. */
const DESCENDER = "0.16em";

/**
 * One masked display line that wipes up from behind its own mask while its blur
 * clears — the hero's reveal language with the blur from BlurReveal folded in.
 *
 * The viewport is observed on the *parent* (see `BlurLines`), which is never
 * transformed, and the movement runs here through variants. Observing an element
 * that starts translated out of an `overflow-hidden` box is unreliable: its
 * observed rect can be clipped to nothing and the line then never reveals.
 */
export const BlurLine = ({
  children,
  delay = 0,
  last = false,
}: {
  children: ReactNode;
  delay?: number;
  last?: boolean;
}) => (
  <span
    className="block overflow-hidden"
    style={{
      paddingBottom: DESCENDER,
      // Collapse the descender room between stacked lines so the visual leading
      // stays exactly what line-height asks for.
      marginBottom: last ? 0 : `-${DESCENDER}`,
    }}
  >
    <motion.span
      className="block"
      variants={{
        hidden: { y: "115%", filter: "blur(14px)", opacity: 0 },
        show: { y: "0%", filter: "blur(0px)", opacity: 1 },
      }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      style={{ willChange: "transform, filter, opacity" }}
    >
      {children}
    </motion.span>
  </span>
);

/**
 * Wrapper that drives a group of `BlurLine`s. Kept separate so the observed
 * element is always the untransformed parent.
 */
export const BlurLines = ({
  children,
  className,
  style,
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  amount?: number;
}) => (
  <motion.span
    className={className}
    style={style}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount }}
  >
    {children}
  </motion.span>
);
