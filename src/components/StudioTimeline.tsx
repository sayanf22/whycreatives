import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TIMELINE } from "@/data/timeline";
import { SERVICE_CARD_COLOURS } from "@/lib/brand";

/**
 * The run of years, read left to right while the page scrolls down.
 *
 * ── How the sideways motion works ──
 *
 * The same shape as the services pile, turned ninety degrees. The section is a tall plain
 * box whose only job is to give the scroll somewhere to go; inside it a single sticky stage
 * pins to the top of the viewport, and the row of years is one wide track inside that stage
 * translated on `x` by scroll progress.
 *
 * One element moves. `translateX` is a compositor property, so the track is rasterised once
 * and then shifted — there is no per-frame layout, no paint, and nothing that scales, which
 * is the thing that forces a re-raster.
 *
 * ── Why the distance is measured rather than declared ──
 *
 * The track has to travel its own width minus one viewport, and its width comes from
 * however many years there are times a panel width set in `vw` — which changes at every
 * breakpoint. Writing that as a percentage would mean re-deriving it by hand for each one
 * and getting it wrong the first time the panel width changed. Measuring `scrollWidth`
 * gives the true number at any size, and a `ResizeObserver` keeps it true through a rotate
 * or a window drag.
 *
 * The section's height is then that same distance plus one screen, which is what makes the
 * mapping one-to-one: a pixel of vertical scroll moves the track one pixel sideways. Faster
 * than that reads as a runaway carousel; slower and the section overstays.
 */
export const StudioTimeline = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () =>
      setTravel(Math.max(0, track.scrollWidth - window.innerWidth));

    measure();
    /* Catches the panels reflowing — a breakpoint change, a font finally loading, an
       orientation change — not just the window resizing. */
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  /* `start start` to `end end`: progress runs from the moment the stage pins to the moment
     the section's bottom reaches the bottom of the viewport. */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="timeline-heading"
      className="relative"
      /* One screen to hold the stage, plus exactly the distance the track has to cover. */
      style={{ height: `calc(100svh + ${travel}px)` }}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="px-4 md:px-[clamp(20px,2.6vw,52px)]">
          <p
            id="timeline-heading"
            className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:text-[11px]"
          >
            Since 2020 — how the studio grew
          </p>
        </div>

        <motion.div
          ref={trackRef}
          className="mt-8 flex w-max items-start gap-6 px-4 sm:gap-10 md:mt-12 md:px-[clamp(20px,2.6vw,52px)] lg:gap-16"
          style={{ x }}
        >
          {TIMELINE.map((entry, index) => (
            <article
              key={entry.year}
              className="w-[84vw] shrink-0 sm:w-[58vw] md:w-[42vw] lg:w-[30vw] xl:w-[26vw]"
            >
              {/* ── The year, with its label riding over it ──
                  `inline-block` on the wrapper so the label can be positioned against the
                  numerals rather than against the column, which is what keeps it sitting on
                  the year at every width instead of drifting off it. */}
              <div className="relative inline-block">
                <h3 className="text-[clamp(3.5rem,9vw,7rem)] font-bold leading-[0.85] tracking-[-0.055em] text-foreground">
                  {entry.year}
                </h3>
                <span
                  className="absolute left-[14%] top-[38%] -rotate-[7deg] whitespace-nowrap rounded-[3px] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-black shadow-[0_2px_10px_-2px_rgba(0,0,0,0.3)] sm:px-3 sm:py-1.5 sm:text-[11px]"
                  style={{
                    backgroundColor:
                      SERVICE_CARD_COLOURS[index % SERVICE_CARD_COLOURS.length],
                  }}
                >
                  {entry.tag}
                </span>
              </div>

              {/* The dash the reference runs between years, as a rule that spans the rest of
                  the column. It reads as the connection between one year and the next. */}
              <div className="mt-6 h-px w-full bg-foreground/20 md:mt-8" />

              <p className="mt-5 text-sm leading-[1.6] text-muted-foreground md:mt-6 md:text-base">
                {entry.body}
              </p>

              {/*
                A tile, not a photograph. The reference has an abstract render per year; the
                studio has no dated imagery, and putting an existing photo under a year would
                be claiming it was taken then. A gradient built from the year's own label
                colour carries the same rhythm and claims nothing.
              */}
              {/*
                Its height is a share of the viewport, not an aspect ratio of its own width.
                A fixed 4:3 was 230px tall on a 1024-wide screen regardless of how short
                that screen was, which put the panel 54px past the bottom of a 640px stage —
                and the stage clips, so it was cut off rather than reachable. Sized against
                the stage it cannot outgrow it.
              */}
              <div
                aria-hidden="true"
                className="mt-6 h-[24svh] max-h-[280px] w-full rounded-xl md:mt-8 md:rounded-2xl"
                style={{
                  background: `linear-gradient(145deg, ${
                    SERVICE_CARD_COLOURS[index % SERVICE_CARD_COLOURS.length]
                  } 0%, ${
                    SERVICE_CARD_COLOURS[(index + 1) % SERVICE_CARD_COLOURS.length]
                  }66 55%, rgba(0,0,0,0.06) 100%)`,
                }}
              />
            </article>
          ))}
        </motion.div>

        {/* Progress, because a pinned section takes the scrollbar away as a cue: with the
            page held still there is otherwise nothing to say how far through you are.
            `scaleX` rather than width, so it does not lay out on every frame. */}
        <div className="mt-10 px-4 md:mt-14 md:px-[clamp(20px,2.6vw,52px)]">
          <div className="h-px w-full bg-foreground/12">
            <motion.div
              className="h-px origin-left bg-foreground"
              style={{ scaleX: scrollYProgress }}
            />
          </div>
          <div className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            <span>{TIMELINE[0].year}</span>
            <span>{TIMELINE[TIMELINE.length - 1].year}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
