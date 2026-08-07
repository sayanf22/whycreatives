import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
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
 * box — about 112% of the moving element. A flat 108% therefore left the tops
 * of the glyphs poking out below the mask before the reveal fired, which read
 * as a rendering glitch rather than an animation. 118% clears it with room to
 * spare across the line-heights used on the site.
 */
const HIDDEN_Y = "118%";

/** useLayoutEffect warns during any server render; fall back cleanly. */
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type RevealLinesProps = {
  /** One entry per visual line. Line breaks are intentional, not automatic. */
  lines: readonly string[];
  className?: string;
  style?: React.CSSProperties;
  /** Pins one visual line per entry from lg up. */
  nowrapFromLg?: boolean;
  /**
   * Indents the first line so its right edge lands on the widest line's right
   * edge, producing an opening step with the block still reading as aligned.
   * The amount is measured rather than guessed — see `measure` below.
   */
  alignFirstLineRightEdge?: boolean;
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
  nowrapFromLg = false,
  alignFirstLineRightEdge = false,
  duration = 0.9,
  stagger = 0.09,
  baseDelay = 0.08,
}: RevealLinesProps) => {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const innerRefs = useRef<(HTMLSpanElement | null)[]>([]);

  /* Stored in em, not px: every line width scales linearly with font-size, so
     the ratio is viewport-independent and survives the font-size clamp without
     needing to re-measure on every resize. */
  const [indentEm, setIndentEm] = useState(0);
  /* Only meaningful where the lines are pinned to one row each. Once they wrap,
     measured widths are container-limited and the indent is dropped. */
  const [isWide, setIsWide] = useState(false);

  useEffect(() => {
    if (!alignFirstLineRightEdge) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsWide(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsWide(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [alignFirstLineRightEdge]);

  const measure = useCallback(() => {
    if (!alignFirstLineRightEdge) return;
    const wrap = wrapRef.current;
    const els = innerRefs.current.slice(0, lines.length);
    if (!wrap || els.length !== lines.length || els.some((el) => !el)) return;

    const fontSize = parseFloat(window.getComputedStyle(wrap).fontSize);
    if (!fontSize) return;

    // Widths are read off the text elements themselves, which are sized by
    // their content. The vertical reveal transform does not affect width, so
    // this is stable whether or not the animation has played.
    const widths = els.map((el) => el!.getBoundingClientRect().width);
    const widest = Math.max(...widths);
    setIndentEm(Math.max(0, (widest - widths[0]) / fontSize));
  }, [alignFirstLineRightEdge, lines.length]);

  useIsoLayoutEffect(() => {
    if (!alignFirstLineRightEdge || !isWide) return;
    measure();

    const wrap = wrapRef.current;
    if (!wrap) return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [alignFirstLineRightEdge, isWide, measure]);

  // Webfonts change text metrics, so re-measure once they land.
  useEffect(() => {
    if (!alignFirstLineRightEdge || !isWide) return;
    if (typeof document === "undefined" || !("fonts" in document)) return;
    let alive = true;
    document.fonts.ready.then(() => {
      if (alive) measure();
    });
    return () => {
      alive = false;
    };
  }, [alignFirstLineRightEdge, isWide, measure]);

  const indent = alignFirstLineRightEdge && isWide ? `${indentEm}em` : undefined;

  return (
    <motion.span
      ref={wrapRef}
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
            "block overflow-hidden" + (nowrapFromLg ? " lg:whitespace-nowrap" : "")
          }
          style={{
            paddingBottom: DESCENDER,
            // Collapse the descender room between lines so the visual leading
            // stays exactly what line-height asks for.
            marginBottom: i === lines.length - 1 ? 0 : `-${DESCENDER}`,
            paddingLeft: i === 0 ? indent : undefined,
          }}
        >
          <motion.span
            ref={(el) => {
              innerRefs.current[i] = el;
            }}
            className="inline-block"
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
};
