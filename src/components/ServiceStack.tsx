import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/data/services";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Order the panel's parts arrive in, in seconds from the panel entering view.
 *
 * One trigger per panel, with the sequence expressed as delays off it. The parts used
 * to observe the viewport individually, which on a panel taller than the screen means
 * they fire in an order that changes with scroll speed.
 */
const STEP = {
  meta: 0,
  title: 0.08,
  lead: 0.24,
  listLabel: 0.3,
  outcomes: 0.34,
  /** Gap between consecutive list items, used by both lists. */
  item: 0.07,
  footer: 0.7,
} as const;

/**
 * A modular type scale, so the panel's sizes relate to each other instead of being
 * picked one at a time.
 *
 * Roughly a perfect fourth (1.333) between steps, each expressed as a `clamp` so it
 * stays fluid rather than jumping at breakpoints.
 *
 * `lead` is the size that actually fixed the "looks empty" problem. It was 13px — body
 * copy on a full-viewport panel, which left the middle of the card reading as blank
 * space with a caption in it. At 17–30px it holds the middle of the layout.
 *
 * The ceilings are set for the largest common desktop rather than the smallest one that
 * looked acceptable: a 68px headline that fills a 1440x900 panel leaves a 1920x1080
 * panel half empty, because the band it has to fill grew by 180px while the type did
 * not. The `vw` term only reaches these ceilings past ~1900px, so nothing below that
 * changes size.
 */
const TYPE = {
  micro: "text-[11px] tracking-[0.18em] uppercase",
  title:
    "text-[clamp(2rem,4.6vw,5.5rem)] font-bold leading-[0.98] tracking-[-0.045em]",
  lead: "text-[clamp(1.0625rem,1.5vw,1.875rem)] leading-[1.42] tracking-[-0.015em]",
  item: "text-[clamp(0.9375rem,1.05vw,1.0625rem)] leading-[1.35]",
} as const;

/**
 * The measure each band is laid out against.
 *
 * The panel's horizontal padding is a `vw` clamp, which on a 2560px display leaves a
 * 2320px content box — two 1140px columns. That is roughly 130 characters per line,
 * about double a comfortable measure, and the headline stops wrapping entirely so the
 * panel gets shorter as the screen gets taller. Capping the content keeps the columns
 * at the width they have on a 1920px display and lets the extra room become margin.
 */
const MEASURE = "mx-auto w-full max-w-[1600px]";

/**
 * One pinned panel.
 *
 * ── The layout ──
 *
 * Three bands: a meta rule at the top, the substance in the middle, a tools-and-CTA
 * rule at the foot. The middle band takes `flex-1` and centres itself, which is what
 * removed the void — the previous version used `justify-between` on two short blocks,
 * so on a wide screen the panel was a header, a footer, and half a screen of nothing
 * between them.
 *
 * The middle band is a 12-column grid: the headline, the lead paragraph and — where
 * there is height for it — the outcomes on the left (cols 1–6), the deliverables on the
 * right (cols 7–12). Two columns of real content side by side fill the width at the same
 * time as the type fills the height.
 *
 * ── Why parts of it are height-gated ──
 *
 * A panel that must fill one screen has two constraints, and the width breakpoints only
 * see one of them. The same `lg` layout has to work in a 1920x1080 window and a
 * 1024x524 one, where the band it has to fill differs by more than 500px. So the amount
 * of content and the size of the gaps are gated on `tall:` and `taller:` — height
 * queries — rather than being tuned for one screen and left to fail on the others.
 */
const Panel = ({
  service,
  index,
  total,
}: {
  service: Service;
  index: number;
  total: number;
}) => {
  const ref = useRef<HTMLElement>(null);
  /*
    `amount: 0.25` — a quarter of the panel visible. These panels are a full screen
    tall, so a larger share can never be satisfied on a short viewport and the content
    would never reveal at all.
  */
  const inView = useInView(ref, { once: true, amount: 0.25 });

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
    transition: { duration: 0.55, ease: EASE, delay },
  });

  return (
    <section
      ref={ref}
      /*
        Every panel after the first carries a rounded top edge and a shadow above it,
        so an incoming panel reads as a card sliding over the last rather than the page
        changing colour. Both are static, so they cost one paint, not one per frame.

        `top` is staggered by index so a few pixels of each previous panel's edge stay
        visible above the current one — the stack then reads as a physical pile rather
        than a single replacing surface. Zero on phones, where the vertical space is
        worth more than the depth cue.
      */
      className={`sticky flex min-h-[100svh] flex-col px-5 pb-8 pt-24 sm:px-8 sm:pb-10 sm:pt-28 lg:px-[clamp(32px,6vw,120px)] lg:pb-12 lg:pt-32 ${
        index % 2 === 0 ? "bg-background" : "bg-muted"
      } ${
        index === 0
          ? ""
          : "rounded-t-[24px] shadow-[0_-20px_44px_-16px_rgba(0,0,0,0.2)] md:rounded-t-[36px] dark:shadow-[0_-20px_44px_-16px_rgba(0,0,0,0.65)]"
      }`}
      style={{ top: `calc(${index} * var(--stack-step))` }}
    >
      {/* ── Band 1: meta rule ── */}
      <motion.div
        {...rise(STEP.meta)}
        className={`flex items-baseline justify-between gap-4 border-b border-foreground/12 pb-4 ${MEASURE}`}
      >
        <span className={`font-mono text-muted-foreground ${TYPE.micro}`}>
          {String(index + 1).padStart(2, "0")} / {service.display}
        </span>
        {/* Position in the stack. Genuinely useful on a pinned sequence, where the
            scrollbar tells you nothing about how many panels are left. */}
        <span
          className={`font-mono text-muted-foreground/70 ${TYPE.micro}`}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")} — {String(total).padStart(2, "0")}
        </span>
      </motion.div>

      {/* ── Band 2: the substance ── */}
      <div className={`flex flex-1 flex-col justify-center py-8 lg:py-10 ${MEASURE}`}>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-10">
          {/* Left: headline + lead */}
          <div className="lg:col-span-6">
            <motion.h3 {...rise(STEP.title)} className={`text-foreground ${TYPE.title}`}>
              {service.title}
            </motion.h3>

            <motion.p
              {...rise(STEP.lead)}
              className={`mt-5 max-w-[38ch] text-foreground/70 lg:mt-7 taller:mt-8 ${TYPE.lead}`}
            >
              {service.subtitle}
            </motion.p>

            {/*
              The outcomes, on the tall-desktop layout only.

              This is the block that closes the remaining gap on a 1080px-plus screen,
              and it is real copy from the service record rather than filler — the same
              three lines the detail page shows. It is hidden below `lg:tall` on
              purpose: the panel is one screen per service, and on a short window the
              extra 175px turns that into nearly two screens of scrolling per service.
              The CTA at the foot goes to the page that carries the full detail.
            */}
            <div className="mt-9 hidden taller:mt-12 lg:tall:block">
              <motion.p
                {...rise(STEP.outcomes)}
                className={`font-mono text-muted-foreground ${TYPE.micro}`}
              >
                What changes
              </motion.p>

              <ul className="mt-4 space-y-2.5 taller:space-y-4">
                {service.outcomes.map((item, i) => (
                  <motion.li
                    key={item}
                    {...rise(STEP.outcomes + 0.08 + i * STEP.item)}
                    className={`flex items-start gap-3.5 text-foreground/75 ${TYPE.item}`}
                  >
                    {/* A short rule as the marker, matching the hairlines the rest of
                        the panel is built from. A bullet or icon would introduce a
                        third visual language for no gain. */}
                    <span
                      className="mt-[0.66em] h-px w-3.5 shrink-0 bg-foreground/30"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: what you get. The list is the panel's densest block, so it sits
              opposite the headline rather than under it — that is what balances the
              width. The hairline is the column boundary; it only exists once the grid
              actually has two columns — and only from `xl`, where the 40px it takes
              from the column is width the deliverables do not need. At `lg` that same
              40px pushes the longest deliverable onto a second line. */}
          <div className="lg:col-span-6 lg:col-start-7 xl:border-l xl:border-foreground/10 xl:pl-10">
            <motion.p
              {...rise(STEP.listLabel)}
              className={`font-mono text-muted-foreground ${TYPE.micro}`}
            >
              What you get
            </motion.p>

            <ul className="mt-4 lg:mt-5">
              {service.deliverables.map((item, i) => (
                <motion.li
                  key={item}
                  {...rise(STEP.listLabel + 0.08 + i * STEP.item)}
                  className={`flex items-baseline gap-4 border-b border-foreground/10 py-3 text-foreground/90 taller:py-4 ${TYPE.item}`}
                >
                  <span
                    className="font-mono text-[10px] tabular-nums text-muted-foreground/70"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Band 3: tools + CTA ── */}
      <motion.div
        {...rise(STEP.footer)}
        className={`flex flex-col gap-5 border-t border-foreground/12 pt-5 sm:flex-row sm:items-center sm:justify-between ${MEASURE}`}
      >
        {/* The stack, as plain tracked text rather than pills. Pills would add six to
            twelve boxes per panel and turn a quiet footer into the busiest thing on
            the card. Capped at five with a count, because Build alone lists twelve. */}
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/80">
          {service.tools.slice(0, 5).join("  ·  ")}
          {service.tools.length > 5 && (
            <span className="text-muted-foreground/50">
              {"  ·  +"}
              {service.tools.length - 5}
            </span>
          )}
        </p>

        <Link
          to={`/services/${service.slug}`}
          className="group inline-flex shrink-0 items-center gap-2.5 rounded-full bg-foreground px-5 py-2.5 text-[13px] font-bold text-background transition-opacity duration-300 ease-out hover:opacity-85"
        >
          Explore {service.display}
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-background/15 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none">
            <ArrowUpRight className="h-3 w-3" strokeWidth={3} />
          </span>
        </Link>
      </motion.div>
    </section>
  );
};

/**
 * The services as a stack of pinned panels: the section holds still while the next
 * panel slides up over it, so scrolling swaps the service rather than moving the page
 * past it.
 *
 * ── Why the pinning is pure CSS ──
 *
 * Consecutive `position: sticky` siblings each pin at the same offset, so panel N holds
 * while panel N+1 scrolls up and covers it. That is the whole effect and it costs
 * nothing — no scroll listener, no per-frame transform, nothing to fall out of sync
 * when a frame is dropped. Only the text reveal uses JS, once per panel.
 *
 * ── Two things that will silently break it ──
 *
 * 1. `overflow` on any ancestor. That ancestor becomes the scroll container and the
 *    panels pin to it instead of the viewport, which does nothing at all. A global
 *    `html, body { overflow-x: hidden }` was doing exactly this and is why the stack
 *    appeared not to work; `index.css` now uses `overflow-x: clip`, which does not
 *    establish a scroll container.
 * 2. `height` instead of `min-height`. A pinned panel that clips its own content gives
 *    no way to reach it. `min-h` lets a long panel grow and pin slightly later.
 *
 * `svh`, not `vh`: on a phone `vh` resolves against the largest viewport, so a `100vh`
 * panel is taller than the screen while the browser chrome shows and the footer band
 * sits under the address bar.
 */
export const ServiceStack = ({ services }: { services: Service[] }) => (
  /* `--stack-step` is the per-panel offset that leaves a sliver of the previous panel
     showing. Declared here so every panel derives its `top` from one value. */
  <article className="[--stack-step:0px] md:[--stack-step:8px]">
    {services.map((service, index) => (
      <Panel
        key={service.slug}
        service={service}
        index={index}
        total={services.length}
      />
    ))}
  </article>
);
