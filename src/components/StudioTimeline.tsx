import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TIMELINE } from "@/data/timeline";
import { SERVICE_CARD_COLOURS } from "@/lib/brand";
import { LoopingWords } from "@/components/LoopingWords";

/**
 * Page gutter, matching `main`'s padding and its `max-w-[1920px]` well.
 *
 * The section runs edge to edge so the track can slide off both sides of the screen, but
 * its heading, first panel and progress rule still line up with the rest of the page. On
 * screens wider than the well, the page's content starts at `(100% - 1920px) / 2`, so the
 * gutter takes whichever is larger. Padding percentages resolve against the stage, which
 * is full viewport width here.
 */
const GUTTER = "max(clamp(16px, 2.6vw, 52px), calc((100% - 1920px) / 2))";

const FIRST = TIMELINE[0].year;
const LAST = TIMELINE[TIMELINE.length - 1].year;

/**
 * The run of years, read left to right while the page scrolls down.
 *
 * ── How the sideways motion works ──
 *
 * The section is a tall plain box whose only job is to give the scroll somewhere to go.
 * Inside it a sticky stage pins to the top of the viewport, and the row of years is one
 * wide track translated on `x` by scroll progress — a compositor property, so the track is
 * rasterised once and then shifted.
 *
 * The distance is the track's width minus the stage's width, measured rather than
 * declared, and kept current by a `ResizeObserver` on both. The section's height is that
 * distance plus one screen, so a pixel of vertical scroll moves the track one pixel
 * sideways.
 *
 * ── Sizing ──
 *
 * Panels are wide — roughly two and a half on screen on a desktop, one and a bit on a
 * phone — so each year reads as a beat rather than as a row of thumbnails. Panels stretch
 * to the tallest and the tile is pushed to the bottom with `mt-auto`, so every tile is the
 * same size and sits on the same line.
 *
 * Everything vertical is tied to viewport *height* as well as width, in three tiers:
 * - roomy (> 760px tall): full copy, tall tiles;
 * - laptop / tall phone (561–760px): copy clamped a little, tiles shorter, less padding;
 * - short landscape phone (≤ 560px): two lines of copy and a compact tile.
 * The tiers are ranges rather than overlapping maximums so no two ever compete.
 */
export const StudioTimeline = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;

    const measure = () =>
      setTravel(Math.max(0, Math.ceil(track.scrollWidth - stage.clientWidth)));

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    observer.observe(stage);
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

  /*
    The section's height depends on `travel`, which is only known after the effect above
    has measured it, so the scroll range changes once after mount. `useScroll` re-measures
    on resize, so one synthetic resize after the new height is committed brings it up to
    date. Guarded on a real measurement, so it fires only when the value changes.
  */
  useEffect(() => {
    if (travel > 0) window.dispatchEvent(new Event("resize"));
  }, [travel]);

  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="timeline-heading"
      className="relative"
      style={{ height: `calc(100svh + ${travel}px)` }}
    >
      <div
        ref={stageRef}
        className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden py-[max(64px,7svh)] [@media(min-height:561px)_and_(max-height:760px)]:py-12 [@media(max-height:560px)]:py-8"
      >
        {/* ── Heading ── a real section title, like every other block on the page, with
            the span of years it covers set against it. */}
        <div
          className="flex items-end justify-between gap-6"
          style={{ paddingInline: GUTTER }}
        >
          <h2
            id="timeline-heading"
            className="font-bold leading-[0.95] tracking-[-0.045em] text-foreground"
            style={{ fontSize: "clamp(1.75rem, min(4vw, 6svh), 4rem)" }}
          >
            How the studio grew
          </h2>
          <p className="shrink-0 pb-[0.3em] font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:text-[11px]">
            {FIRST} — {LAST}
          </p>
        </div>

        {/* ── Track ── */}
        <motion.div
          ref={trackRef}
          className="mt-[clamp(16px,4svh,44px)] flex w-max items-stretch gap-5 sm:gap-8 lg:gap-14 xl:gap-20"
          style={{ x, paddingInline: GUTTER }}
        >
          {TIMELINE.map((entry, index) => {
            const colour = SERVICE_CARD_COLOURS[index % SERVICE_CARD_COLOURS.length];
            const next = SERVICE_CARD_COLOURS[(index + 1) % SERVICE_CARD_COLOURS.length];

            return (
              <article
                key={entry.year}
                className="flex w-[86vw] shrink-0 flex-col sm:w-[70vw] md:w-[56vw] lg:w-[44vw] xl:w-[38vw] 2xl:w-[34vw] [@media(min-width:1920px)]:w-[660px]"
              >
                {/* The year, with its label riding over it. `inline-block` on the wrapper
                    so the label is positioned against the numerals, not the column. */}
                <div className="relative inline-block self-start">
                  <h3
                    className="font-bold leading-[0.85] tracking-[-0.055em] text-foreground"
                    style={{ fontSize: "clamp(3rem, min(10vw, 14svh), 9rem)" }}
                  >
                    {entry.year}
                  </h3>
                  <span
                    className="absolute left-[14%] top-[38%] -rotate-[7deg] whitespace-nowrap rounded-[4px] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-black shadow-[0_2px_10px_-2px_rgba(0,0,0,0.3)] sm:px-3 sm:py-1.5 sm:text-xs xl:text-sm"
                    style={{ backgroundColor: colour }}
                  >
                    {entry.tag}
                  </span>
                </div>

                <div className="mt-[clamp(12px,2.5svh,32px)] h-px w-full bg-foreground/20" />

                {/* Type scales with the viewport's height as well as its width, so a short
                    laptop gets smaller copy instead of a stage that overflows. */}
                <p
                  className="mb-[clamp(16px,3svh,32px)] mt-[clamp(12px,2svh,24px)] leading-[1.6] text-muted-foreground [@media(min-height:561px)_and_(max-height:700px)_and_(max-width:767px)]:line-clamp-4 [@media(min-height:561px)_and_(max-height:760px)_and_(min-width:768px)]:line-clamp-3 [@media(max-height:560px)]:line-clamp-2"
                  style={{ fontSize: "clamp(0.875rem, min(1.1vw, 2svh), 1.125rem)" }}
                >
                  {entry.body}
                </p>

                {/* One fixed size for every tile, pinned to the bottom of the panel so the
                    row stays level. The looping sentence inside measures the tile and
                    sizes its own type to fit. */}
                <div
                  className="relative mt-auto h-[clamp(170px,30svh,420px)] w-full overflow-hidden rounded-2xl p-5 md:rounded-3xl md:p-7 xl:p-8 [@media(min-height:561px)_and_(max-height:760px)]:h-[clamp(140px,27svh,420px)] [@media(max-height:560px)]:h-[clamp(96px,30svh,170px)] [@media(max-height:560px)]:p-4"
                  style={{
                    background: `linear-gradient(145deg, ${colour} 0%, ${next}66 55%, rgba(0,0,0,0.06) 100%)`,
                  }}
                >
                  <LoopingWords lead={entry.lead} words={entry.loop} />
                </div>
              </article>
            );
          })}
        </motion.div>

        {/* Progress, because a pinned section takes the scrollbar away as a cue.
            `scaleX` rather than width, so it does not lay out on every frame. */}
        <div className="mt-[clamp(16px,4svh,48px)]" style={{ paddingInline: GUTTER }}>
          <div className="h-px w-full bg-foreground/12">
            <motion.div
              className="h-px origin-left bg-foreground"
              style={{ scaleX: scrollYProgress }}
            />
          </div>
          <div className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            <span>{FIRST}</span>
            <span>{LAST}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
