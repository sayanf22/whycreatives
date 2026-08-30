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

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

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
 * ─────────────────────────────────────────────────────────────────────────────
 * The deck
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Cards sit in a physical pile. The front one is whole; the two behind it are pushed
 * down and narrowed so their bottom edges show under it, the way a deck of cards fans.
 * Scrolling tips the front card back and lifts it off, and the card that was behind it
 * rises into its place.
 *
 * ── What this replaced, and why ──
 *
 * Cards used to arrive from below and cover the one in front. That reads as a sequence
 * of surfaces sliding past, not as a stack — nothing is ever behind anything, so there is
 * no depth to see and no sense of how many are left. The pile shows both: you can see
 * that two more are coming, and the front card leaving is a distinct movement rather than
 * a slide that never resolves.
 *
 * ── Why the numbers relate to each other ──
 *
 * A card behind the front one is both pushed down and scaled down, and those fight: with
 * the origin at the centre, scaling down lifts the bottom edge by half the height it
 * loses. So the push has to beat the lift or the card behind never actually shows. At
 * these values, on a 900px card, each step down nets about 19px of visible edge — the
 * push contributes 26 and the scale takes back 7.
 */

/** Share of a card's scroll window spent on its exit. The rest is dwell, held still. */
const EXIT = 0.45;
/** How far each card behind the front one is pushed down, in px. */
const PEEK_STEP = 26;
/** How much smaller each card behind the front one is drawn. */
const SCALE_STEP = 0.015;
/** How many cards deep the pile is visible. Beyond this they are exactly covered. */
const MAX_DEPTH = 2;
/** How far the front card lifts as it leaves, in px. */
const EXIT_LIFT = 160;
/** How far the front card tips away as it leaves, in degrees about the horizontal axis. */
const EXIT_TILT = 11;
/** How much the front card shrinks as it leaves, on top of the tilt. */
const EXIT_SHRINK = 0.06;
/** Perspective for the tilt. Set on the card's own transform, not on an ancestor. */
const PERSPECTIVE = 1400;

/**
 * How far card `index` is through leaving: 0 while it is at the front, 1 once gone.
 *
 * Positive `rotateX` tips the top edge away from the viewer and brings the bottom
 * towards it, which is the direction a card falls when it is lifted off a pile.
 */
const exitProgress = (position: number, index: number) =>
  clamp((position - index) / EXIT, 0, 1);

/**
 * Where card `index` sits in the pile: 0 at the front, 1 for the one behind it, and so on.
 *
 * Measured from the front card rather than from the top of the stack, so the pile stays
 * correct before the section has been reached — at which point the front card is card 0
 * and `position` is still negative.
 *
 * ── Why this is not just the distance ──
 *
 * Taken literally, a card's depth would fall smoothly from 1 to 0 across its whole
 * window, so it would be creeping forward the entire time and would reach full size only
 * at the instant it started to leave. There would be no moment where a card is simply
 * sitting there being read.
 *
 * So each step forward is compressed into the first `EXIT` of the window — the same
 * stretch the card in front spends lifting away — and the card then holds at its new
 * depth for the remaining `1 - EXIT`. One card rising as another leaves, then stillness.
 */
const deckDepth = (position: number, index: number) => {
  const distance = index - Math.max(position, 0);
  if (distance <= 0) return 0;
  const step = Math.floor(distance);
  const withinStep = distance - step;
  return Math.min(
    step + clamp((withinStep - (1 - EXIT)) / EXIT, 0, 1),
    MAX_DEPTH,
  );
};

/**
 * Screens to lift card `index` by so it joins the pile instead of waiting a screen below.
 *
 * Sticky leaves each card at `index - position` screens down and pins it at zero. For a
 * pile they all have to be in the same place, so this cancels that offset. The second
 * term is what keeps it honest before the stack is reached: while `position` is negative
 * the front card is still sliding up over the orange header, and the cards behind it have
 * to travel with it rather than jump to the top of the viewport.
 *
 * Cards past `MAX_DEPTH` are lifted too. They land exactly behind the deepest visible
 * card, so they cost nothing to place and there is no jump when one of them becomes
 * visible.
 */
const deckPull = (position: number, index: number) =>
  Math.max(0, index - position - Math.max(0, -position));

/**
 * Card `index` is opaque unless it is buried deeper than the pile shows.
 *
 * The cut is what stops the browser painting six full-screen cards on every frame. It
 * happens while the card is exactly behind the deepest visible one, so it cannot be seen
 * happening.
 */
const deckOpacity = (position: number, index: number) =>
  (1 - exitProgress(position, index)) *
  clamp(MAX_DEPTH + 1 - (index - Math.max(position, 0)), 0, 1);

/**
 * When a card's copy is on screen.
 *
 * Starts while the card in front is still lifting away, so the text is arriving as the
 * card is uncovered rather than snapping in once it has settled. Ends when this card has
 * finished its own exit — at which point it is transparent, so the reset cannot be seen,
 * and scrolling back up runs the sequence again.
 */
const isRevealed = (position: number, index: number) =>
  position >= index - 0.75 && position < index + EXIT;

/**
 * When a card's links can be clicked.
 *
 * Cards that have left are transparent but still stacked in front of the current one —
 * `z-index` runs backwards so the front card can lift off and reveal the next. An
 * invisible card left clickable would swallow every click meant for the card behind it.
 *
 * The windows tile exactly: this one ends at `index + EXIT`, where the next one begins.
 * No two cards are ever interactive at once, and none of them is ever dead.
 */
const isInteractive = (position: number, index: number) =>
  position >= index - (1 - EXIT) && position < index + EXIT;

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
 * The card's horizontal padding is a `vw` clamp, which on a 2560px display leaves a
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
 * what sticky pins. Keeping the card as a plain stretched child means its size is a
 * consequence of the shell's box rather than a second set of numbers to keep in step.
 *
 * Two of the four values are doing a specific job. The top has to clear the navigation,
 * which floats as a capsule from about 14px to 72px down the viewport once the page has
 * scrolled. The bottom has to leave room for the pile: two cards behind the front one,
 * each showing about 19px of edge, plus air under the last of them.
 */
const INSET = "px-3 pb-14 pt-[84px] md:px-5 md:pb-16 md:pt-[92px] lg:px-6";

/**
 * The card itself.
 *
 * A border as well as a shadow. On a monochrome site the border is what separates one
 * card in the pile from the next — the reference this is modelled on uses a different
 * colour per card, which is not available here, so the edge has to carry it. Every card
 * casts a shadow onto the one behind it, which is the other half of the depth.
 */
const CARD =
  "flex flex-1 flex-col rounded-[20px] border border-foreground/[0.09] bg-background px-5 py-7 shadow-[0_18px_46px_-14px_rgba(0,0,0,0.18)] md:rounded-[30px] md:px-9 md:py-9 lg:px-12 lg:py-10 dark:shadow-[0_18px_52px_-12px_rgba(0,0,0,0.72)]";

/**
 * One card in the pile.
 *
 * ── The layout ──
 *
 * Two bands: a meta rule at the top and the substance below it. The substance takes
 * `flex-1` and centres itself, which is what removed the void — an earlier version used
 * `justify-between` on two short blocks, so on a wide screen the panel was a header, a
 * footer, and half a screen of nothing between them.
 *
 * The middle band is a 12-column grid. Row one is the headline, lead and — where there
 * is height for it — the outcomes on the left (cols 1–6), against the deliverables on
 * the right (cols 7–12). Row two is the link to the full service page, under the
 * headline. Two columns of real content side by side fill the width at the same time as
 * the type fills the height.
 *
 * ── Why parts of it are height-gated ──
 *
 * A card that has to fill most of a screen has two constraints, and the width
 * breakpoints only see one of them. The same `lg` layout has to work in a 1920x1080
 * window and a 1024x524 one, where the space it has to fill differs by more than 500px.
 * So the amount of content and the size of the gaps are gated on `tall:` and `taller:` —
 * height queries — rather than being tuned for one screen and left to fail on the others.
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
  /** Cards scrolled past the top of the stack. See `deckDepth`. */
  position: MotionValue<number>;
}) => {
  /*
    Two booleans rather than one object: React bails out of a re-render when a `useState`
    setter is handed the value it already holds, and an object literal is never equal to
    the last one. With two of these the handler below runs on every scroll frame and
    re-renders on about ten of them in the whole section.
  */
  const [revealed, setRevealed] = useState(false);
  const [interactive, setInteractive] = useState(false);

  /*
    `useMotionValueEvent` only fires on change, so a card that is already at the front
    when the component mounts — a reload part-way down the page, or a back navigation
    that restores scroll — would sit invisible until the next scroll event. Seed it.
  */
  useEffect(() => {
    const value = position.get();
    setRevealed(isRevealed(value, index));
    setInteractive(isInteractive(value, index));
  }, [index, position]);

  useMotionValueEvent(position, "change", (value) => {
    setRevealed(isRevealed(value, index));
    setInteractive(isInteractive(value, index));
  });

  /*
    Everything below is a plain derived value. No React state and no re-render — Framer
    writes each one straight to the node, and transform and opacity are both compositor
    properties, so the whole pile stays off the layout and paint path.

    The lift is split across the two elements because the two halves are in different
    units and a single `translateY` can only hold one. The shell carries the part measured
    in screens (`svh`, cancelling sticky's offset); the card carries the part measured in
    pixels (the pile's spacing and the exit).
  */
  const shellY = useTransform(
    position,
    (value) => `${(-deckPull(value, index) * 100).toFixed(3)}svh`,
  );
  const cardY = useTransform(
    position,
    (value) =>
      deckDepth(value, index) * PEEK_STEP - exitProgress(value, index) * EXIT_LIFT,
  );
  const cardScale = useTransform(
    position,
    (value) =>
      1 -
      deckDepth(value, index) * SCALE_STEP -
      exitProgress(value, index) * EXIT_SHRINK,
  );
  const cardRotateX = useTransform(
    position,
    (value) => exitProgress(value, index) * EXIT_TILT,
  );
  const cardOpacity = useTransform(position, (value) => deckOpacity(value, index));

  /*
    Staged on the way in, and dropped in one quick beat on the way out.

    The exit deliberately does not inherit `delay`. A card resets while it is transparent,
    and running the stagger in reverse there means the parts are still settling when it
    comes back to the front, which reads as a stutter.
  */
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
    transition: revealed
      ? { duration: 0.5, ease: EASE, delay }
      : { duration: 0.2, ease: EASE, delay: 0 },
  });

  return (
    /*
      The shell. Transparent, a full screen tall, and pinned by sticky. The card is a
      stretched child, so it is whatever is left after `INSET`.

      Splitting the two is what lets the card be smaller than the screen without touching
      the scroll length. The shell still occupies exactly one screen of flow, so each card
      still gets one screen of scroll — 45% of it spent leaving, the rest held still.

      `zIndex` runs backwards, and it has to: the front card lifts off to reveal the one
      behind it, so it must be painted in front of it, while document order puts later
      cards on top. It is a static value, not a scroll-driven one, so there is no frame
      where the order is wrong.
    */
    <motion.section
      className={`sticky top-0 flex min-h-[100svh] ${INSET}`}
      style={{ y: shellY, zIndex: total - index }}
    >
      <motion.div
        className={CARD}
        style={{
          y: cardY,
          scale: cardScale,
          rotateX: cardRotateX,
          opacity: cardOpacity,
          transformPerspective: PERSPECTIVE,
          /* See `isInteractive`. A card that has left is transparent but still in front. */
          pointerEvents: interactive ? "auto" : "none",
        }}
      >
        {/* ── Band 1: meta rule ── */}
        <motion.div
          {...rise(STEP.meta)}
          className={`flex items-baseline justify-between gap-4 border-b border-foreground/12 pb-4 ${MEASURE}`}
        >
          <span className={`font-mono text-muted-foreground ${TYPE.micro}`}>
            {String(index + 1).padStart(2, "0")} / {service.display}
          </span>
          {/* Position in the pile. Genuinely useful here, where the scrollbar tells you
              nothing about how many cards are left. */}
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
              <motion.h3
                {...rise(STEP.title)}
                className={`text-foreground ${TYPE.title}`}
              >
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

                Real copy from the service record rather than filler — the same three
                lines the detail page shows. Hidden below `lg:tall` on purpose: the card
                is one screen per service, and on a short window the extra 175px turns
                that into nearly two screens of scrolling per service. The link at the
                foot of the copy goes to the full detail.
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
                          the card is built from. A bullet or icon would introduce a
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

            {/* Right: what you get. The list is the card's densest block, so it sits
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
      </motion.div>
    </motion.section>
  );
};

/**
 * The services as a pile of cards. The front one is whole, the next two show their
 * bottom edges under it, and scrolling tips the front card back and lifts it off so the
 * one behind rises into place.
 *
 * ── Sticky does the pinning; one subscription does the pile ──
 *
 * Consecutive `position: sticky` siblings all pin at the same offset, which is what
 * parks every card at the top of the viewport and costs no JavaScript. What sticky cannot
 * express is a pile: it leaves each card a full screen below the last, sliding at exactly
 * the scroll rate, so nothing is ever behind anything and no card is ever alone on the
 * screen.
 *
 * So one scroll subscription reports how far through the stack the page is, as a card
 * count, and every card reads it for the five things it needs: how far to lift to join
 * the pile, how deep in the pile it sits, how far through leaving it is, whether its copy
 * is showing, and whether it can be clicked. All of it is transform and opacity, written
 * directly to the node — no React render per frame, and nothing that touches layout.
 *
 * ── Three things that will silently break it ──
 *
 * 1. `overflow` on any ancestor. That ancestor becomes the scroll container and the cards
 *    pin to it instead of the viewport, which does nothing at all. A global
 *    `html, body { overflow-x: hidden }` was doing exactly this and is why the stack
 *    appeared not to work; `index.css` now uses `overflow-x: clip`, which does not
 *    establish a scroll container.
 * 2. `height` instead of `min-height` on a shell. A pinned card that clips its own
 *    content gives no way to reach it. `min-h` lets a long card grow and pin later.
 *  3. Document-order stacking. `zIndex` has to run backwards for the front card to lift
 *    off and reveal the next one. Remove it and the pile inverts: the last card sits on
 *    top of all of them and nothing else is ever visible.
 *
 * `svh`, not `vh`: on a phone `vh` resolves against the largest viewport, so a `100vh`
 * shell is taller than the screen and the bottom of the pile sits under the address bar.
 */
export const ServiceStack = ({ services }: { services: Service[] }) => {
  const ref = useRef<HTMLElement>(null);
  const total = services.length;

  /*
    `start end` to `end end` runs the range from the stack's top edge entering at the
    bottom of the viewport to its bottom edge reaching there — so the range spans the
    stack's full height rather than its scrollable height. That is what makes the
    conversion below a plain card count: at progress `p` the page has scrolled
    `p * total - 1` cards past the top of the stack, which is 0 exactly when the first
    card's shell reaches the top of the viewport.
  */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const position = useTransform(scrollYProgress, (p) => p * total - 1);

  return (
    /*
      `bg-muted` is the backdrop the cards are inset against, and it is what makes them
      read as cards at all. The panels used to alternate `bg-background` / `bg-muted`
      between themselves, which is how you tell two full-bleed surfaces apart. Inset,
      that alternation stopped working: every other card was the same colour as the page
      behind it, so half of them showed no inset. One tint behind, one surface on top,
      and every card sits visibly on something.
    */
    <article ref={ref} className="bg-muted">
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
