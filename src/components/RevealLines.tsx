import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Extra room below the baseline so descenders ("g", "y", "p") are never clipped
 * by the mask once the line has settled.
 */
const DESCENDER = "0.14em";

/**
 * How far each line starts below its mask.
 *
 * This must clear the *mask* height, not the text height. The mask is the line
 * box plus DESCENDER, so its height is roughly 1.14em against a ~1.02em line
 * box — about 112% of the moving element. The previous 108% therefore left the
 * tops of the glyphs poking out below the mask before the reveal fired, which
 * read as a rendering glitch rather than an animation. 118% clears it with room
 * to spare across the line-heights used on the site.
 */
const HIDDEN_Y = "118%";

type RevealLinesProps = {
  /** One entry per visual line. Line breaks are intentional, not automatic. */
  lines: readonly string[];
  className?: string;
  style?: React.CSSProperties;
  /** Applied to the first line's mask only — used for the opening indent. */
  firstLineClassName?: string;
  /** Pins one visual line per entry from lg up. */
  nowrapFromLg?: boolean;
  duration?: number;
  /** Delay between consecutive lines. */
  stagger?: number;
  baseDelay?: number;
};

/**
 * Reveals copy one line at a time, each line wiping upward from behind a mask.
 *
 * The viewport is observed on the untransformed wrapper and the movement runs on
 * children through variants. Observing the moving elements directly is
 * unreliable: they start translated out of an `overflow-hidden` box, so their
 * observed rect can be clipped to nothing and the reveal never fires, leaving
 * the copy permanently invisible.
 */
export const RevealLines = ({
  lines,
  className,
  style,
  firstLineClassName = "",
  nowrapFromLg = false,
  duration = 0.9,
  stagger = 0.09,
  baseDelay = 0.08,
}: RevealLinesProps) => (
  <motion.span
    className={className}
    style={style}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.25 }}
  >
    {/* The visual lines are split across elements, so they are hidden from
        assistive tech and the full sentence is exposed once, here. */}
    <span className="sr-only">{lines.join(" ")}</span>

    {lines.map((line, i) => (
      <span
        key={line}
        aria-hidden="true"
        className={
          "block overflow-hidden" +
          (nowrapFromLg ? " lg:whitespace-nowrap" : "") +
          (i === 0 && firstLineClassName ? ` ${firstLineClassName}` : "")
        }
        style={{
          paddingBottom: DESCENDER,
          // Collapse the descender room between lines so the visual leading
          // stays exactly what line-height asks for.
          marginBottom: i === lines.length - 1 ? 0 : `-${DESCENDER}`,
        }}
      >
        <motion.span
          className="inline-block max-w-full"
          variants={{ hidden: { y: HIDDEN_Y }, show: { y: "0%" } }}
          transition={{ duration, ease: EASE, delay: baseDelay + i * stagger }}
          style={{ willChange: "transform" }}
        >
          {line}
        </motion.span>
      </span>
    ))}
  </motion.span>
);
