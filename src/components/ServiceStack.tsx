import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/data/services";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Order the panel's parts arrive in, in seconds from the panel reaching the front.
 *
 * One trigger per panel, with the sequence expressed as delays off it. The parts used
 * to observe the viewport individually, which on a panel taller than the screen means
 * they fire in an order that changes with scroll speed.
 */
const STEP = {
  meta: 0,
  title: 0.06,
  lead: 0.16,
  listLabel: 0.2,
  outcomes: 0.24,
  /** Gap between consecutive list items, used by both lists. */
  item: 0.05,
  cta: 0.46,
} as const;

/**
 * How much of each panel's scroll window the slide itself takes. The rest is dwell,
 * with the card held still and fully readable.
 *
 * ── The problem this solves ──
 *
 * Consecutive sticky panels slide at exactly the scroll rate, which means the incoming
 * card is mid-transition for the *entire* window — there is no point at which one card
 * is alone on the screen. You are always looking at part of two of them, and the whole
 * section feels like one long continuous slide.
 *
 * At 0.4, a card arrives over the first 40% of its window and then holds for the other
 * 60%. Same total scroll, roughly a third as much motion, and every card gets a stretch
 * where it is the only thing on screen.
 */
const SLIDE = 0.4;

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
 * The gap between the card and the edge of the screen.
 *
 * This is padding on the positioning shell, not margin on the card, because the shell is
 * what sticky pins and what the dwell transform moves. Keeping the card as a plain
 * stretched child means its size is a consequence of the shell's box rather than a second
 * set of numbers to keep in step.
 *
 * The top value is larger than the others: it has to clear the navigation, which floats
 * as a capsule from about 14px to 72px down the viewport once the page has scrolled.
 */
const INSET = "px-3 pb-3 pt-[84px] md:px-5 md:pb-5 md:pt-[92px] lg:px-6 lg:pb-6";

/**
 * The card itself.
 *
 * A border as well as a shadow. The shadow alone reads on a tinted backdrop but not in
 * every theme, and the border is what guarantees the card's edge is legible — the whole
 * point of insetting it is that you can see where it stops.
 */
const CARD =
  "flex flex-1 flex-col rounded-[20px] border border-foreground/[0.09] bg-background px-5 py-7 shadow-[0_16px_44px_-14px_rgba(0,0,0,0.16)] md:rounded-[30px] md:px-9 md:py-9 lg:px-12 lg:py-10 dark:shadow-[0_16px_50px_-12px_rgba(0,0,0,0.7)]";

/**
 * Whether panel `index` is the one at the front of the stack, given how many panel
 * heights have been scrolled past the top of the stack.
 *
 * ── Why this is not `useInView` ──
 *
 * It was, and it could not do what is being asked here. Every pinned panel keeps
 * intersecting the viewport: panel 2 stays parked at the top while 3, 4 and 5 slide
 * over it, so an IntersectionObserver reports all of them as visible at once. Scrolling
 * back up therefore *uncovers* a panel that never left view, and its text was already
 * on screen — nothing to replay.
 *
 * Position in the stack is the thing that actually changes, so that is what is measured.
 * At `position === index` the panel's top edge sits at the top of the viewport.
 *
 *   `>= index - SLIDE * 0.75`  the panel covers a quarter of the screen from below.
 *                      Early enough that the text stages in while the panel is still
 *                      sliding up, rather than snapping in once it has arrived. Scaled
 *                      by `SLIDE` because the panel now spends most of its window held
 *                      out of sight: a fixed 0.75 would start the sequence before the
 *                      card had appeared at all, and it would be over before you saw it.
 *   `<  index + 1`     the next panel has not yet covered it completely. Resetting any
 *                      earlier would fade out copy that is still visible; at exactly
 *                      this point the panel is hidden, so the reset is never seen — and
 *                      it is what allows the sequence to replay on the way back up.
 */
const isAtFront = (position: number, index: number) =>
  position >= index - SLIDE * 0.75 && position < index + 1;

/**
 * How far to hold panel `index` below where sticky alone would put it, in `svh`.
 *
 * This is the dwell. Sticky gives the panel a visual top of `distance` screens, falling
 * to 0 at the moment it pins. Pushing it back down to a full screen for as long as
 * `distance` exceeds `SLIDE` keeps it off screen through the dwell, then letting the
 * offset fall away over the remaining `SLIDE` of the window slides it in over the same
 * distance in less scroll.
 *
 * It is layered over the sticky pinning rather than replacing it, which is the reason
 * it is safe: if this never runs the offset is zero, and zero is exactly the CSS-only
 * stack that already worked.
 *
 * Panel 0 is exempt. Every other panel vacates space that the panel behind it is already
 * filling; panel 0 has nothing behind it but bare backdrop, so holding it down leaves a
 * band of empty tint under the orange header. It slides in at the scroll rate, directly
 * beneath the header, as before.
 */
const dwellOffset = (position: number, index: number) => {
  if (index === 0) return 0;
  const distance = index - position;
  if (distance <= 0 || distance >= 1) return 0;
  return distance >= SLIDE ? 1 - distance : distance * (1 / SLIDE - 1);
};

/**
 * One pinned panel.
 *
 * ── The layout ──
 *
 * Two bands: a meta rule at the top and the substance below it. The substance takes
 * `flex-1` and centres itself, which is what removed the void — an earlier version used
 * `justify-between` on two short blocks, so on a wide screen the panel was a header, a
 * footer, and half a screen of nothing between them.
 *
 * There was a third band, a rule listing the service's toolkit. It is gone. A card whose
 * job is to say what a service is does not also need to name the software, and the
 * detail page already has a section for exactly that — with the full list rather than
 * the five that fitted here.
 *
 * The middle band is a 12-column grid. Row one is the headline, lead and — where there
 * is height for it — the outcomes on the left (cols 1–6), against the deliverables on
 * the right (cols 7–12). Row two is the link to the full service page, under the
 * headline. Two columns of real content side by side fill the width at the same time as
 * the type fills the height.
 *
 * The link is a grid item rather than part of the footer rule for two reasons. Sat in
 * the footer it was a lone pill in the bottom-right corner, the farthest point on the
 * panel from the copy it refers to. And as the third grid child it needs no responsive
 * duplication: in one column it falls after the deliverables, which is the right
 * reading order on a phone; at `lg` it takes row two of the left column.
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
  position,
}: {
  service: Service;
  index: number;
  total: number;
  /** Panel heights scrolled past the top of the stack. See `isAtFront`. */
  position: MotionValue<number>;
}) => {
  const [atFront, setAtFront] = useState(false);

  /*
    `useMotionValueEvent` only fires on change, so a panel that is already at the front
    when the component mounts — a reload part-way down the page, or a back navigation
    that restores scroll — would sit invisible until the next scroll event. Seed it.
  */
  useEffect(() => {
    setAtFront(isAtFront(position.get(), index));
  }, [index, position]);

  useMotionValueEvent(position, "change", (value) => {
    setAtFront(isAtFront(value, index));
  });

  /*
    The dwell, as a plain derived value. No React state and no re-render — Framer writes
    the transform straight to the node, and `translateY` is a compositor property, so
    this stays off the layout and paint path.
  */
  const y = useTransform(
    position,
    (value) => `${(dwellOffset(value, index) * 100).toFixed(2)}svh`,
  );

  /*
    Staged on the way in, and dropped in one quick beat on the way out.

    The exit deliberately does not inherit `delay`. A panel resets while it is hidden
    behind the next one, and running the stagger in reverse there means the parts are
    still settling when it comes back to the front, which reads as a stutter.
  */
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: atFront ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
    transition: atFront
      ? { duration: 0.5, ease: EASE, delay }
      : { duration: 0.2, ease: EASE, delay: 0 },
  });

  return (
    /*
      The shell. Transparent, a full screen tall, and the only thing that moves: sticky
      pins it and the dwell transform shifts it. The card is a stretched child, so it is
      whatever is left after `INSET`.

      Splitting the two is what lets the card be smaller than the screen without
      touching the mechanism. The shell still occupies exactly one screen of flow, so the
      scroll length, the pinning and the dwell maths are all unchanged — the card just
      no longer fills what the shell reserves. A shorter *shell* would have broken the
      stack, because the next panel would start scrolling into view before this one had
      finished being read.

      `top` is staggered by index, so each previous card's top edge stays visible above
      the current one. That now shows through the shell's own transparent padding, which
      is why the pile reads more clearly inset than it did full bleed.
    */
    <motion.section
      className={`sticky flex min-h-[100svh] ${INSET}`}
      style={{ top: `calc(${index} * var(--stack-step))`, y }}
    >
      <div className={CARD}>
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
      <div className={`flex flex-1 flex-col justify-center py-7 md:py-10 ${MEASURE}`}>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-10">
          {/* Left: headline, lead, outcomes */}
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
              The link at the foot of the copy goes to the full detail.
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

          {/* Row two of the left column at `lg`; last in the single column below it. */}
          <motion.div {...rise(STEP.cta)} className="lg:col-span-6 lg:col-start-1">
            <Link
              to={`/services/${service.slug}`}
              /* `py-3` and not `py-2.5`: with the 14px label this clears 44px, which is
                 the smallest comfortable touch target. */
              className="group inline-flex items-center gap-2.5 rounded-full bg-foreground px-6 py-3 text-sm font-bold text-background transition-opacity duration-300 ease-out hover:opacity-85"
            >
              View more details
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-background/15 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none">
                <ArrowUpRight className="h-3 w-3" strokeWidth={3} />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
      </div>
    </motion.section>
  );
};

/**
 * The services as a stack of pinned panels: the section holds still while the next
 * panel slides up over it, so scrolling swaps the service rather than moving the page
 * past it.
 *
 * ── The pinning is CSS; the timing is layered on top ──
 *
 * Consecutive `position: sticky` siblings each pin at the same offset, so panel N holds
 * while panel N+1 scrolls up and covers it. That is the stack, and it needs no
 * JavaScript at all.
 *
 * What it cannot do is dwell. Sticky slides the incoming panel at exactly the scroll
 * rate, so the transition fills the entire window and no card is ever alone on screen.
 * So one scroll subscription reports how far through the stack the page is, as a panel
 * count, and the panels use it for two things: whether they are at the front, and how
 * far to hold themselves below their sticky position (`dwellOffset`).
 *
 * The offset is a `translateY` written straight to the node by Framer — no React render,
 * and a compositor property, so it stays off layout and paint. And because it is layered
 * over the sticky positioning rather than replacing it, a zero offset is exactly the
 * CSS-only stack: if the subscription never runs, the section still works.
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
 * panel is taller than the screen and its lower band sits under the address bar.
 */
export const ServiceStack = ({ services }: { services: Service[] }) => {
  const ref = useRef<HTMLElement>(null);
  const total = services.length;

  /*
    `start end` to `end end` runs the range from the stack's top edge entering at the
    bottom of the viewport to its bottom edge reaching there — so the range spans the
    stack's full height rather than its scrollable height. That is what makes the
    conversion below a plain panel count: at progress `p` the page has scrolled
    `p * total - 1` panel heights past the top of the stack, which is 0 exactly when the
    first panel's top edge reaches the top of the viewport.
  */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const position = useTransform(scrollYProgress, (p) => p * total - 1);

  return (
    /*
      `--stack-step` is the per-panel offset that leaves a sliver of the previous card
      showing. Declared here so every panel derives its `top` from one value. Zero on
      phones, where the vertical space is worth more than the depth cue.

      `bg-muted` is the backdrop the cards are inset against, and it is what makes them
      read as cards at all. The panels used to alternate `bg-background` / `bg-muted`
      between themselves, which is how you tell two full-bleed surfaces apart. Inset,
      that alternation stopped working: every other card was the same colour as the page
      behind it, so half of them showed no inset. One tint behind, one surface on top,
      and every card sits visibly on something.
    */
    <article
      ref={ref}
      className="bg-muted [--stack-step:0px] md:[--stack-step:10px] lg:[--stack-step:12px]"
    >
      {services.map((service, index) => (
        <Panel
          key={service.slug}
          service={service}
          index={index}
          total={total}
          position={position}
        />
      ))}
    </article>
  );
};
