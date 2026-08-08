import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const LINE = "Let's make something worth watching.";

/**
 * Oversized scrolling line that sits just above the footer.
 *
 * Two identical tracks sit side by side and the pair translates by exactly
 * -50%, so copy 2 lands precisely where copy 1 started — the loop is seamless
 * with no snap. Rows run in opposite directions for a bit of counter-motion.
 *
 * Driven by CSS keyframes rather than Framer Motion, for two reasons:
 *
 *  - A CSS transform animation runs on the compositor and keeps running even
 *    while the main thread is busy. The Framer version was ticking two infinite
 *    animations through JS on every frame, which on a phone competes directly
 *    with the scroll it sits inside.
 *  - `animation-play-state` gives a real pause. There is no way to suspend a
 *    Framer keyframe loop without losing its position, so this section used to
 *    animate continuously for the whole visit, including the entire time it was
 *    far off screen.
 */
const Row = ({ reverse, duration, running }: { reverse?: boolean; duration: number; running: boolean }) => (
  <div className="flex w-max">
    {[0, 1].map((copy) => (
      <div
        key={copy}
        className={`flex w-max shrink-0 ${
          reverse
            ? "animate-[marquee-right_linear_infinite]"
            : "animate-[marquee-left_linear_infinite]"
        }`}
        style={{
          animationDuration: `${duration}s`,
          animationPlayState: running ? "running" : "paused",
        }}
      >
        {[0, 1].map((dup) => (
          <span
            key={dup}
            className="whitespace-nowrap pr-[0.35em] text-foreground"
            style={{
              fontSize: "clamp(2.75rem, 11vw, 13rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
              fontWeight: 500,
            }}
          >
            {LINE}
          </span>
        ))}
      </div>
    ))}
  </div>
);

export const MarqueeLine = () => {
  const ref = useRef<HTMLElement>(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    /* A generous root margin so the loop is already at speed by the time the
       section is actually in view — starting it on the exact boundary reads as
       the text lurching into motion. */
    const io = new IntersectionObserver(
      ([entry]) => setRunning(entry.isIntersecting),
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="w-full overflow-hidden bg-background font-['Schibsted_Grotesk',sans-serif]"
      style={{
        paddingTop: "clamp(56px, 7vw, 120px)",
        paddingBottom: "clamp(56px, 7vw, 120px)",
      }}
      aria-label="Let's work together"
    >
      <Link
        to="/contact"
        className="group block select-none opacity-90 transition-opacity duration-500 hover:opacity-100"
      >
        <div className="overflow-hidden" aria-hidden="true">
          <Row duration={26} running={running} />
        </div>
        <div className="mt-1 overflow-hidden lg:mt-2" aria-hidden="true">
          <Row reverse duration={32} running={running} />
        </div>
      </Link>
    </section>
  );
};
