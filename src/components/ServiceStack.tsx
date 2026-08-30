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
import { SERVICE_CARD_COLOURS } from "@/lib/brand";

const EASE = [0.16, 1, 0.3, 1] as const;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

/**
 * Order the card's parts arrive in, in seconds from the card reaching the front.
 *
 * One trigger per card, with the sequence expressed as delays off it. The parts used to
 * observe the viewport individually, which on a card taller than the screen means they
 * fire in an order that changes with scroll speed.
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
 * The pile
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Cards sit in a physical stack. The front one is whole; the two behind it are pushed
 * down and narrowed so their bottom edges show under it, the way a deck of cards fans.
 * Scrolling tips the front card back and lifts it clear, and the card that was behind it
 * rises into its place.
 *
 * ── The card that leaves stays opaque ──
 *
 * This is the whole of what was wrong before. The leaving card faded out, and a card at
 * 50% opacity sitting on top of the next one shows both at once: two headlines and two
 * deliverable lists superimposed, drifting apart as it went. It read as a rendering
 * fault, because it was one.
 *
 * Nothing fades now. The card lifts a full screen — far enough to clear the viewport
 * entirely — and it is solid the whole way, so there is never a frame with two cards
 * legible at the same time. Which is also what the reference does: opaque, tilted,
 * sliding off the top.
 *
 * ── Why the numbers relate to each other ──
 *
 * A card behind the front one is both pushed down and scaled down, and those fight: with
 * the origin at the centre, scaling down lifts the bottom edge by half the height it
 * loses. So the push has to beat the lift or the card behind never actually shows.
 */

/** Share of a card's scroll window spent leaving. The rest is spent still, at the front. */
const EXIT = 0.5;
/**
 * How far each card behind the front one is pushed down, in px.
 *
 * 28 rather than the 22 it looks like it needs, because the scale takes some of it back.
 * On a 700px card, one step of `SCALE_STEP` removes 20px of height and the centre origin
 * splits that between the two edges, so the bottom rises 10px against a 28px push and the
 * visible strip is 18px. Measured across three viewports it lands between 18 and 20px.
 */
const PEEK_STEP = 28;
/** How much smaller each card behind the front one is drawn. */
const SCALE_STEP = 0.028;
/** How many cards deep the pile is visible. Beyond this they are exactly covered. */
const MAX_DEPTH = 2;
/** How far the front card tips away as it leaves, in degrees about the horizontal axis. */
const EXIT_TILT = 10;
/** How much the front card shrinks as it leaves, on top of the tilt. */
const EXIT_SHRINK = 0.05;
/** Perspective for the tilt. Set on the card's own transform, not on an ancestor. */
const PERSPECTIVE = 1100;

/**
 * How far card `index` is through leaving: 0 while it is at the front, 1 once clear.
 *
 * Positive `rotateX` tips the top edge away from the viewer and brings the bottom towards
 * it, which is the direction a card falls when it is lifted off a pile.
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
 * depth for the rest. One card rising as another leaves, then stillness.
 */
const deckDepth = (position: number, index: number) => {
  const distance = index - Math.max(position, 0);
  if (distance <= 0) return 0;
  const step = Math.floor(distance);
  const withinStep = distance - step;
  return Math.min(step + clamp((withinStep - (1 - EXIT)) / EXIT, 0, 1), MAX_DEPTH);
};

/**
 * Shell heights to lift card `index` by, so it joins the pile instead of waiting a screen
 * below, and then so it clears the screen on the way out.
 *
 * Two jobs in one number because they are both measured in shell heights and a single
 * `translateY` can only hold one value. The pile term cancels the offset sticky leaves
 * between consecutive cards; the exit term is a full shell height, which is what takes a
 * leaving card past the top of the viewport rather than parking it there.
 *
 * The `Math.max(0, -position)` term keeps it honest before the stack is reached: while
 * `position` is negative the front card is still sliding up over the orange header, and
 * the cards behind it have to travel with it rather than jump to the top of the viewport.
 */
const shellLift = (position: number, index: number) => {
  const pile = Math.max(0, index - position - Math.max(0, -position));
  return pile + exitProgress(position, index);
};

/**
 * Card `index` is opaque unless it is buried deeper than the pile shows.
 *
 * This is the only thing opacity is used for — a leaving card never fades, for the reason
 * at the top of this block. The cut stops the browser compositing six full-screen cards
 * on every frame, and it happens while the card is exactly behind the deepest visible one,
 * so it cannot be seen happening.
 */
const deckOpacity = (position: number, index: number) =>
  clamp(MAX_DEPTH + 1 - (index - Math.max(position, 0)), 0, 1);

/**
 * When a card's copy is on screen.
 *
 * Starts while the card in front is still lifting away, so the text is arriving as this
 * card is uncovered rather than snapping in once it has settled. Ends when this card has
 * begun its own exit — by which point it is on its way off the top, so the reset is not
 * seen, and scrolling back up runs the sequence again.
 */
const isRevealed = (position: number, index: number) =>
  position >= index - 0.7 && position < index + EXIT * 0.5;

/**
 * When a card's links can be clicked.
 *
 * Cards that have left are still stacked in front of the current one — `z-index` runs
 * backwards so the front card can lift off and reveal the next. One that has travelled
 * off screen but stayed clickable would swallow every click meant for the card behind it.
 *
 * The windows tile exactly: this one ends at `index + EXIT`, where the next one begins.
 * No two cards are ever interactive at once, and none of them is ever dead.
 */
const isInteractive = (position: number, index: number) =>
  position >= index - (1 - EXIT) && position < index + EXIT;

/**
 * A modular type scale, so the card's sizes relate to each other instead of being picked
 * one at a time. Roughly a perfect fourth (1.333) between steps, each a `clamp` so it
 * stays fluid rather than jumping at breakpoints.
 *
 * The ceilings came down when the card stopped filling the screen. A 88px headline was
 * sized for a full-bleed panel; on a card that is about 70% of the viewport it was the
 * main reason the thing read as oversized.
 */
const TYPE = {
  micro: "text-[10px] tracking-[0.18em] uppercase sm:text-[11px]",
  title:
    "text-[clamp(1.75rem,3.4vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.04em]",
  lead: "text-[clamp(0.9375rem,1.05vw,1.25rem)] leading-[1.45] tracking-[-0.01em]",
  item: "text-[clamp(0.875rem,0.85vw,0.9375rem)] leading-[1.35]",
} as const;

/**
 * The shell: a full screen of flow, pinned by sticky, holding one card.
 *
 * Its padding is what makes the card smaller than the screen, and `items-center` is what
 * stopped the card being oversized. The card used to be `flex-1`, so it stretched to fill
 * whatever the shell reserved and its content sat in the middle of a tall empty box.
 * Centred instead, the card is as tall as its content and no taller.
 *
 * The vertical padding still has to clear the navigation, which floats as a capsule from
 * about 14px to 72px down the viewport once the page has scrolled, and to leave room
 * under the card for the two edges of the pile.
 */
const SHELL =
  "sticky top-0 flex min-h-[100svh] items-center px-4 py-[86px] sm:px-8 md:py-[92px] lg:px-12";

/**
 * The card. Its colour comes from the service's position in the pile.
 *
 * Type is black in both themes rather than `text-foreground`, for the same reason the
 * page header's is: the card is a light colour either way, so a token that flipped to
 * white in dark mode would be invisible on it.
 */
const CARD =
  "mx-auto flex w-full max-w-[1280px] flex-col rounded-[18px] px-5 py-6 text-black shadow-[0_12px_32px_-12px_rgba(0,0,0,0.28)] min-h-[56svh] md:rounded-[26px] md:px-8 md:py-8 lg:px-10";

/**
 * One card in the pile.
 *
 * ── The layout ──
 *
 * Two bands: a meta rule at the top and the substance below it. The substance takes
 * `flex-1` and centres itself within the card.
 *
 * The middle band is a 12-column grid. Row one is the headline, lead and — where there is
 * height for it — the outcomes on the left (cols 1–6), against the deliverables on the
 * right (cols 7–12). Row two is the link to the full service page, under the headline.
 *
 * ── Why parts of it are height-gated ──
 *
 * The card is sized by its content, so the content is what decides whether the card is
 * balanced or overwhelming — and the width breakpoints cannot see the height it has to
 * fit in. The outcomes block is 175px of it, which is right on a 1080-tall screen and too
 * much on a 900-tall one, so it is gated on a height query rather than tuned for one
 * screen and left to bloat the card on the others.
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
    re-renders on about ten of them across the whole section.
  */
  const [revealed, setRevealed] = useState(false);
  const [interactive, setInteractive] = useState(false);

  /*
    `useMotionValueEvent` only fires on change, so a card already at the front when the
    component mounts — a reload part-way down the page, or a back navigation that restores
    scroll — would sit blank until the next scroll event. Seed it.
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
    properties, so the pile stays off the layout and paint path.

    The lift is split across the two elements because its halves are in different units
    and one `translateY` can only hold one. The shell carries the part measured in shell
    heights (the pile spacing and the exit); the card carries the pixels.
  */
  const shellY = useTransform(
    position,
    (value) => `${(-shellLift(value, index) * 100).toFixed(3)}%`,
  );
  const cardY = useTransform(position, (value) => deckDepth(value, index) * PEEK_STEP);
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

    The exit deliberately does not inherit `delay`. A card resets while it is on its way
    off the top, and running the stagger in reverse there means the parts are still
    settling when it comes back to the front, which reads as a stutter.
  */
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 12 },
    animate: revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
    transition: revealed
      ? { duration: 0.5, ease: EASE, delay }
      : { duration: 0.2, ease: EASE, delay: 0 },
  });

  return (
    /*
      `zIndex` runs backwards, and it has to: the front card lifts off to reveal the one
      behind it, so it must be painted in front of it, while document order puts later
      cards on top. It is a static value, not a scroll-driven one, so there is no frame
      where the order is wrong.
    */
    <motion.section className={SHELL} style={{ y: shellY, zIndex: total - index }}>
      <motion.div
        className={CARD}
        style={{
          backgroundColor: SERVICE_CARD_COLOURS[index % SERVICE_CARD_COLOURS.length],
          y: cardY,
          scale: cardScale,
          rotateX: cardRotateX,
          opacity: cardOpacity,
          transformPerspective: PERSPECTIVE,
          /*
            Promote each card to its own compositor layer up front. Without it the browser
            decides per frame whether a transform is worth a layer, and three large cards
            changing together is exactly the case it gets wrong — it repaints instead,
            which is what stutter on this section looks like.
          */
          willChange: "transform",
          /* See `isInteractive`. A card that has left is off screen but still in front. */
          pointerEvents: interactive ? "auto" : "none",
        }}
      >
        {/* ── Band 1: meta rule ── */}
        <motion.div
          {...rise(STEP.meta)}
          className="flex items-baseline justify-between gap-4 border-b border-black/15 pb-3"
        >
          <span className={`font-mono text-black/55 ${TYPE.micro}`}>
            {String(index + 1).padStart(2, "0")} / {service.display}
          </span>
          {/* Position in the pile. Genuinely useful here, where the scrollbar tells you
              nothing about how many cards are left. */}
          <span className={`font-mono text-black/40 ${TYPE.micro}`} aria-hidden="true">
            {String(index + 1).padStart(2, "0")} — {String(total).padStart(2, "0")}
          </span>
        </motion.div>

        {/* ── Band 2: the substance ── */}
        <div className="flex flex-1 flex-col justify-center py-6 md:py-8">
          <div className="grid gap-7 lg:grid-cols-12 lg:gap-x-10">
            {/* Left: headline, lead, outcomes */}
            <div className="lg:col-span-6">
              <motion.h3 {...rise(STEP.title)} className={TYPE.title}>
                {service.title}
              </motion.h3>

              <motion.p
                {...rise(STEP.lead)}
                className={`mt-4 max-w-[42ch] text-black/70 lg:mt-5 ${TYPE.lead}`}
              >
                {service.subtitle}
              </motion.p>

              {/*
                The outcomes, on tall screens only. Real copy from the service record
                rather than filler — the same three lines the detail page shows. On a
                shorter screen this is the 175px that turns a balanced card into an
                overwhelming one, and the link below goes to the full detail anyway.
              */}
              <div className="mt-7 hidden lg:tall:block">
                <motion.p
                  {...rise(STEP.outcomes)}
                  className={`font-mono text-black/55 ${TYPE.micro}`}
                >
                  What changes
                </motion.p>

                <ul className="mt-3 space-y-2">
                  {service.outcomes.map((item, i) => (
                    <motion.li
                      key={item}
                      {...rise(STEP.outcomes + 0.08 + i * STEP.item)}
                      className={`flex items-start gap-3 text-black/70 ${TYPE.item}`}
                    >
                      {/* A short rule as the marker, matching the hairlines the rest of
                          the card is built from. A bullet or icon would introduce a third
                          visual language for no gain. */}
                      <span
                        className="mt-[0.66em] h-px w-3 shrink-0 bg-black/35"
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
                actually has two columns, and only from `xl`, where the 40px it takes from
                the column is width the deliverables do not need. */}
            <div className="lg:col-span-6 lg:col-start-7 xl:border-l xl:border-black/12 xl:pl-10">
              <motion.p
                {...rise(STEP.listLabel)}
                className={`font-mono text-black/55 ${TYPE.micro}`}
              >
                What you get
              </motion.p>

              <ul className="mt-3 lg:mt-4">
                {service.deliverables.map((item, i) => (
                  <motion.li
                    key={item}
                    {...rise(STEP.listLabel + 0.08 + i * STEP.item)}
                    className={`flex items-baseline gap-3.5 border-b border-black/12 py-2.5 text-black/80 ${TYPE.item}`}
                  >
                    <span
                      className="font-mono text-[10px] tabular-nums text-black/40"
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
                /* `py-3` and not `py-2.5`: with the 13px label this clears 44px, which is
                   the smallest comfortable touch target. */
                className="group inline-flex items-center gap-2.5 rounded-full bg-black px-5 py-3 text-[13px] font-bold text-white transition-opacity duration-300 ease-out hover:opacity-80"
              >
                View more details
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none">
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
 * The services as a pile of cards. The front one is whole, the next two show their bottom
 * edges under it, and scrolling tips the front card back and lifts it clear so the one
 * behind rises into place.
 *
 * ── Sticky does the pinning; one subscription does the pile ──
 *
 * Consecutive `position: sticky` siblings all pin at the same offset, which is what parks
 * every card at the top of the viewport and costs no JavaScript. What sticky cannot
 * express is a pile: it leaves each card a full screen below the last, sliding at exactly
 * the scroll rate, so nothing is ever behind anything and no card is ever alone on screen.
 *
 * So one scroll subscription reports how far through the stack the page is, as a card
 * count, and every card reads it for the five things it needs: how far to lift, how deep
 * in the pile it sits, how far through leaving it is, whether its copy is showing, and
 * whether it can be clicked. All of it is transform and opacity, written straight to the
 * node — no React render per frame, and nothing that touches layout.
 *
 * ── Three things that will silently break it ──
 *
 * 1. `overflow` on any ancestor. That ancestor becomes the scroll container and the cards
 *    pin to it instead of the viewport, which does nothing at all. A global
 *    `html, body { overflow-x: hidden }` was doing exactly this and is why the stack
 *    appeared not to work; `index.css` now uses `overflow-x: clip`, which does not
 *    establish a scroll container.
 * 2. `height` instead of `min-height` on a shell. A pinned card that clips its own
 *    content gives no way to reach it.
 * 3. Document-order stacking. `zIndex` has to run backwards for the front card to lift
 *    off and reveal the next. Remove it and the pile inverts: the last card sits on top
 *    of all of them and nothing else is ever visible.
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

  /* The cards carry the colour now, so the backdrop is the page's own surface — the pile
     floats on it rather than sitting in a tinted well. */
  return (
    <article ref={ref} className="bg-background">
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
