import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/** How long a phrase sits fully assembled before it leaves, in ms. */
const HOLD_MS = 1600;
/** Per-letter stagger, in seconds. */
const STAGGER = 0.03;
const ENTER_S = 0.6;
const EXIT_S = 0.35;

type LoopingWordsProps = {
  /** The fixed start of the sentence, e.g. "The studio starts building". */
  lead: string;
  /** Endings for `lead`, cycled forever. */
  words: string[];
};

/**
 * A sentence whose ending plays on repeat, like a kinetic-type title card.
 *
 * `lead` stays put; the ending assembles letter by letter from under a mask, holds, lifts
 * out through the top, and the next one comes in. A row of step marks along the bottom
 * says which ending this is and fills while it holds, so the loop reads as a sequence
 * rather than as text flickering.
 *
 * ── Sizing ──
 * The ending's font size is measured from the tile, not set per breakpoint: the widest
 * ending is fitted to the tile's width (see the layout effect below). An earlier version
 * used `cqi` container units, which silently fall back to viewport units if the container
 * is missing, and a viewport-sized word on a tile a third of the viewport wide ran
 * straight off the edge. Measuring cannot fail that way.
 *
 * ── Cost ──
 * Letters move on `transform` and `opacity` only, so the motion stays on the compositor,
 * and the loop only runs while the tile is on screen.
 *
 * ── Reduced motion ──
 * The endings still change, but as a plain crossfade with no travel.
 *
 * Decorative: the sentence repeats what the panel's copy already says, so it is hidden
 * from assistive tech rather than announced on every change.
 */
export const LoopingWords = ({ lead, words }: LoopingWordsProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  /* Null until measured; the first paint uses a conservative CSS size instead. */
  const [fontPx, setFontPx] = useState<number | null>(null);

  /*
    Fit the endings to the tile, measured rather than guessed.

    Every ending is rendered once, invisibly, at a 100px reference size. The widest one
    gives the ratio of width to font size, and the font size is then whatever makes that
    widest ending fill the tile's width, capped by the tile's height and a maximum. All
    endings in a tile share that one size, so the type does not jump between words, and no
    ending can run past the edge whatever its length, the font, or the breakpoint.
    Re-measured whenever the tile resizes and once web fonts have finished loading.
  */
  useLayoutEffect(() => {
    const root = ref.current;
    const probe = measureRef.current;
    if (!root || !probe) return;

    const fit = () => {
      const widest = Math.max(
        ...Array.from(probe.children).map((el) => (el as HTMLElement).offsetWidth),
      );
      if (!widest || !root.clientWidth) return;
      const byWidth = (root.clientWidth / widest) * 100 * 0.94; // 6% breathing room
      const byHeight = root.clientHeight * 0.42;
      setFontPx(Math.floor(Math.max(18, Math.min(byWidth, byHeight, 88))));
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(root);
    document.fonts?.ready.then(fit).catch(() => {});
    return () => observer.disconnect();
  }, [words]);

  const current = index % words.length;
  const word = words[current] ?? "";
  const enterS = reduce ? 0.4 : ENTER_S + STAGGER * word.length;

  useEffect(() => {
    if (!inView || words.length < 2) return;
    const id = window.setTimeout(
      () => setIndex((i) => (i + 1) % words.length),
      enterS * 1000 + HOLD_MS,
    );
    return () => window.clearTimeout(id);
  }, [inView, index, enterS, words.length]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="relative flex h-full w-full flex-col justify-between"
    >
      {/* Invisible reference row: every ending at 100px, in the same face, weight and
          tracking as the real one, so its measured width is exactly proportional. */}
      <div
        ref={measureRef}
        className="pointer-events-none invisible absolute left-0 top-0 flex flex-col items-start"
        style={{ fontSize: "100px" }}
      >
        {words.map((w) => (
          <span
            key={w}
            className="whitespace-nowrap font-bold leading-[0.95] tracking-[-0.05em]"
          >
            {w}
          </span>
        ))}
      </div>

      <p
        className="max-w-[26ch] font-medium leading-[1.25] tracking-[-0.01em] text-black/70"
        style={{
          fontSize: fontPx
            ? `${Math.min(19, Math.max(12, fontPx * 0.28))}px`
            : "0.875rem",
        }}
      >
        {lead}
      </p>

      {/* The mask: letters rise from under the bottom edge and leave through the top.
          `min-w-0` + `overflow-hidden` is a last line of defence; the measured size
          means nothing should ever reach it. */}
      <div className="min-w-0 overflow-hidden pb-[0.1em] pt-[0.04em]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={`${index}-${word}`}
            className="block whitespace-nowrap font-bold leading-[0.95] tracking-[-0.05em] text-black"
            style={{ fontSize: fontPx ? `${fontPx}px` : "1.5rem" }}
            initial="hidden"
            animate="show"
            exit="leave"
          >
            {Array.from(word).map((char, i) => (
              <motion.span
                key={i}
                className="inline-block will-change-transform"
                variants={
                  reduce
                    ? {
                        hidden: { opacity: 0 },
                        show: { opacity: 1, transition: { duration: 0.4 } },
                        leave: { opacity: 0, transition: { duration: 0.25 } },
                      }
                    : {
                        hidden: { y: "110%", opacity: 0 },
                        show: {
                          y: "0%",
                          opacity: 1,
                          transition: { duration: ENTER_S, ease: EASE, delay: i * STAGGER },
                        },
                        leave: {
                          y: "-110%",
                          opacity: 0,
                          transition: {
                            duration: EXIT_S,
                            ease: [0.7, 0, 0.84, 0],
                            delay: i * (STAGGER * 0.6),
                          },
                        },
                      }
                }
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* One mark per ending. Past ones are filled, the current one fills across its hold
          (`scaleX`, so it never lays out), later ones are empty. */}
      <div className="flex gap-1.5">
        {words.map((w, i) => (
          <div key={w} className="h-[3px] flex-1 overflow-hidden rounded-full bg-black/15">
            {i < current && <div className="h-full w-full bg-black/70" />}
            {i === current && (
              <motion.div
                key={`${index}-fill`}
                className="h-full origin-left bg-black/70"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: inView ? 1 : 0 }}
                transition={{
                  duration: inView ? enterS + HOLD_MS / 1000 : 0,
                  ease: "linear",
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
