import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ACCENT_ORANGE } from "@/lib/brand";

/*
  Timings, trimmed from the originals now that this runs on every navigation rather
  than once a visit. A second and a half is fine as a one-off arrival; in front of
  every link on the site it needs to be brisk.
*/
/** Entrance of the small box. */
const BOX_IN = 0.34;
/** Box growing out to fill the viewport. */
const EXPAND = 0.5;
/** Curtain clearing once it has filled. */
const CLEAR = 0.38;
/** Beat between the box landing and it starting to grow. */
const BEAT = 0.05;

const T_EXPAND_START = (BOX_IN + BEAT) * 1000;
const T_HANDOFF = T_EXPAND_START + EXPAND * 1000;
const T_END = T_HANDOFF + CLEAR * 1000;

type PageIntroProps = {
  /**
   * `theme` — the box is the page's own colour on an inverted backdrop, so the
   * page colour is what floods the screen. White box on near-black in light mode,
   * black box on near-white in dark mode.
   *
   * `accent` — the box is the brand orange on the page's own colour. For the
   * services page, whose header panel is orange, so the curtain resolves into it.
   */
  variant?: "theme" | "accent";
  /** Fired as the curtain starts clearing, for the page to begin its own reveal. */
  onHandoff: () => void;
};

type Stage = "box" | "expand" | "clear" | "gone";

/**
 * Opening curtain: a small box appears, grows out to fill the screen, then clears
 * to leave the page behind it.
 *
 * ── Why the backdrop is inverted on the `theme` variant ──
 *
 * The box is the page's own colour, so on the page's own background it would be
 * invisible — there would be nothing to see until it had already filled the screen.
 * Inverting the backdrop is what gives the box something to appear against, and it
 * also makes the expansion read as the page colour taking over.
 *
 * It is not a *pure* inverse. A full-screen pure white on a dark theme is
 * genuinely unpleasant, so a thin veil of the page colour sits over the inverse to
 * take the edge off. Two stacked solid layers rather than `color-mix()`: if
 * `color-mix` is unsupported the declaration is dropped, the backdrop renders
 * transparent, and the box becomes invisible against the page — the exact failure
 * the inversion exists to prevent.
 *
 * ── Why the box grows by width and height, not by scale ──
 *
 * `scale` would be cheaper, but a scaled rounded rectangle scales its corner radius
 * too. Growing a 22px radius to full-screen size renders corners hundreds of pixels
 * across, so the box arrives as a lozenge rather than a screen. Animating the box
 * model keeps the radius in real pixels so it can be taken to zero independently.
 * This is one fixed element with no children, so that layout cost is confined to it.
 */
export const PageIntro = ({
  variant = "theme",
  onHandoff,
}: PageIntroProps) => {
  const reduceMotion = useReducedMotion();
  const [stage, setStage] = useState<Stage>("box");

  /*
    Measured rather than animated to `100vw` / `100vh`: framer interpolates between
    numbers, and a px start with a viewport-unit end gives it two incompatible units
    to cross. Read during the initial render, not in an effect — measuring in an
    effect leaves the first painted frame with no curtain, and the page would flash
    through before it mounted.
  */
  const [vp, setVp] = useState(() =>
    typeof window === "undefined"
      ? { w: 0, h: 0 }
      : { w: window.innerWidth, h: window.innerHeight },
  );
  /*
    Only tracked while the box is still small. Once it is growing, a resize would
    retarget the animation mid-flight — and on a phone the browser hiding its own
    chrome fires exactly that, so the box would visibly stutter partway through the
    expansion. The generous height overshoot below covers the difference instead.
  */
  const growing = stage !== "box";
  useEffect(() => {
    if (growing) return;
    const sync = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [growing]);

  /*
    Runs on every mount, which means every navigation — each route is its own
    component, so arriving at a page mounts a fresh curtain.

    There was a once-per-visit guard here, held in module scope so it survived route
    changes. That was the bug: the first page you landed on consumed it and every
    link after that went straight to content with no transition. Removed.

    A curtain with nothing to reveal is just a delay, so reduced motion still hands
    over on the first frame and renders nothing.
  */
  const skip = reduceMotion;

  useEffect(() => {
    if (skip) {
      setStage("gone");
      onHandoff();
      return;
    }

    const timers = [
      window.setTimeout(() => setStage("expand"), T_EXPAND_START),
      /* Handed off as the curtain *starts* clearing, not after. The page's copy then
         arrives while the colour is still settling, so the two read as one gesture
         rather than the page pausing between them. */
      window.setTimeout(() => {
        setStage("clear");
        onHandoff();
      }, T_HANDOFF),
      window.setTimeout(() => setStage("gone"), T_END),
    ];
    return () => timers.forEach(clearTimeout);
  }, [skip, onHandoff]);

  if (stage === "gone" || vp.w === 0) return null;

  const box = Math.round(Math.min(132, Math.max(76, vp.w * 0.14)));
  const themed = variant === "theme";

  return (
    <motion.div
      /* Above the navigation, which sits at z-60, and above the route-level loading
         skeleton — otherwise a lazily loaded page shows skeleton, then curtain, then
         content, which reads as three separate events. */
      className={`fixed inset-0 z-[90] flex items-center justify-center ${
        themed ? "bg-foreground" : "bg-background"
      }`}
      initial={{ opacity: 1 }}
      animate={{ opacity: stage === "clear" ? 0 : 1 }}
      transition={{ duration: CLEAR, ease: [0.4, 0, 0.2, 1] }}
      /* Decorative, and it must never swallow a tap or a scroll on the page beneath
         — the curtain is a visual, not a modal. */
      aria-hidden="true"
      style={{ pointerEvents: "none" }}
    >
      {/* Takes the harshness off the inverse. Only on the themed variant; the accent
          variant's backdrop is already the page's own colour. */}
      {themed && (
        <div className="absolute inset-0 bg-background opacity-[0.08]" />
      )}

      <motion.div
        className={themed ? "relative bg-background" : "relative"}
        initial={{
          width: box,
          height: box,
          borderRadius: 22,
          opacity: 0,
          scale: 0.45,
        }}
        animate={
          stage === "box"
            ? { width: box, height: box, borderRadius: 22, opacity: 1, scale: 1 }
            : {
                /*
                  Overshoot, so no sub-pixel seam shows down the edges — and far more
                  generously on the height. On a phone `innerHeight` changes as the
                  browser's own chrome hides on scroll, so a height measured at mount
                  can be short by the height of the URL bar by the time the box has
                  finished growing, leaving a strip of backdrop along the bottom.
                */
                width: vp.w * 1.06,
                height: vp.h * 1.2,
                borderRadius: 0,
                opacity: 1,
                scale: 1,
              }
        }
        transition={
          stage === "box"
            ? {
                /* Spring in, so it arrives with a little weight rather than easing
                   to a stop. */
                type: "spring",
                stiffness: 420,
                damping: 26,
                mass: 0.7,
                duration: BOX_IN,
              }
            : { duration: EXPAND, ease: [0.65, 0, 0.35, 1] }
        }
        style={themed ? undefined : { backgroundColor: ACCENT_ORANGE }}
      />
    </motion.div>
  );
};
