import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";

const EASE = [0.16, 1, 0.3, 1] as const;

/** How long each phrase holds before the next one blurs in. */
const PHRASE_MS = 1350;

export type Phrase = {
  /** Two or three words only — anything longer stops reading as a statement. */
  words: string[];
  /** Per-phrase text colour. The panel stays one flat colour; the type carries it. */
  color: string;
};

/**
 * A flat single-colour panel that cycles short phrases, one word at a time,
 * each blurring into focus. Replaces the photograph inside a project card.
 *
 * Typography deliberately matches the services page: same family, weight 500,
 * tight negative tracking — so the cards and that page read as one system.
 */
export const ProjectTextStage = ({
  phrases,
  tone,
  seed = 0,
}: {
  phrases: Phrase[];
  /** `light` is an off-white screen, `dark` is near-black. Cards alternate. */
  tone: "light" | "dark";
  /**
   * Card position in the grid. Offsets both the starting phrase and the cycle
   * itself, so the panels never change in lockstep — four cards flipping on the
   * same frame reads as a glitch rather than as four separate screens.
   */
  seed?: number;
}) => {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(seed % phrases.length);
  const [onScreen, setOnScreen] = useState(false);

  /*
    Blur radius is the expensive part of this effect, and its cost scales with
    the radius — every frame of an animated blur is a full repaint plus a GPU
    blur pass over the text. Four of these panels cycling on a phone was the
    heaviest thing on the home page and it showed in the scroll.

    Phones get a much smaller radius instead of losing the effect: at 6px the
    words still resolve into focus, but the pass is a fraction of the work.
  */
  const roomy = useMediaQuery("(min-width: 768px)");
  const blurIn = roomy ? 18 : 6;
  const blurOut = roomy ? 16 : 5;

  /* Only animate while the card is actually on screen. Four of these looping
     behind the fold would burn frames for nothing. */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!onScreen || reduced || phrases.length < 2) return;

    let interval: number | undefined;
    const kickoff = window.setTimeout(() => {
      interval = window.setInterval(
        () => setIndex((i) => (i + 1) % phrases.length),
        PHRASE_MS,
      );
    }, (seed % 4) * 340);

    return () => {
      window.clearTimeout(kickoff);
      if (interval) window.clearInterval(interval);
    };
  }, [onScreen, reduced, phrases.length, seed]);

  const phrase = phrases[index];
  const isLight = tone === "light";

  return (
    <div
      ref={rootRef}
      /*
        Tones are deliberately offset from the page colours rather than pure
        #fff / #000. A white panel on the white page (or a black one in dark
        mode) makes the card's staircase notch vanish, which is what made this
        look broken — the tag pills appeared to float with no cut behind them.

        There is also no inner frame here. A rounded rectangle drawn inside the
        clip-path fights the notch it sits in: the border followed a plain rect
        while the panel edge stepped around the tags.
      */
      className={`absolute inset-0 flex items-center justify-center overflow-hidden px-4 sm:px-6 ${
        isLight ? "bg-[#f1f1ef]" : "bg-[#151515]"
      }`}
    >

      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          className="relative max-w-[9ch] text-balance text-center"
          style={{
            color: phrase.color,
            fontSize: "clamp(2.75rem, 9vw, 7rem)",
            lineHeight: 0.86,
            letterSpacing: "-0.055em",
            fontWeight: 800,
          }}
          initial="hidden"
          animate="show"
          exit="out"
          /* Word-level stagger, so the phrase assembles rather than appearing. */
          variants={{
            show: { transition: { staggerChildren: 0.055 } },
            out: { transition: { staggerChildren: 0.025, staggerDirection: -1 } },
          }}
        >
          {phrase.words.map((word) => (
            <motion.span
              key={word}
              className="mr-[0.28em] inline-block last:mr-0"
              variants={{
                hidden: { opacity: 0, y: "0.32em", filter: `blur(${blurIn}px)` },
                show: {
                  opacity: 1,
                  y: "0em",
                  filter: "blur(0px)",
                  transition: { duration: 0.36, ease: EASE },
                },
                out: {
                  opacity: 0,
                  y: "-0.24em",
                  filter: `blur(${blurOut}px)`,
                  transition: { duration: 0.2, ease: EASE },
                },
              }}
              /* No `will-change` here on purpose. It was pinned on permanently,
                 which holds a compositor layer per word for the life of the page
                 — twelve of them across the four cards. Framer Motion sets
                 will-change itself for the duration of each animation, which is
                 what the property is actually for. */
            >
              {word}
            </motion.span>
          ))}
        </motion.p>
      </AnimatePresence>

      {/* Progress ticks — one per phrase, the only chrome on the panel. */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5 sm:bottom-6">
        {phrases.map((p, i) => (
          <span
            key={p.words.join("-")}
            className="h-[3px] w-4 rounded-full transition-colors duration-200 sm:w-5"
            style={{
              backgroundColor:
                i === index
                  ? phrase.color
                  : isLight
                    ? "rgba(0,0,0,0.14)"
                    : "rgba(255,255,255,0.18)",
            }}
          />
        ))}
      </div>

      {/* Screen readers get the full statement once, not a cycling fragment. */}
      <span className="sr-only">
        {phrases.map((p) => p.words.join(" ")).join(". ")}
      </span>
    </div>
  );
};
