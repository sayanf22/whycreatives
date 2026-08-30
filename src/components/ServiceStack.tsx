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
 * Scrolling slides the front card up and off, and the card that was behind it rises into
 * its place.
 *
 * ── One sticky element, not six ──
 *
 * This is what fixed the shaking, and it is worth being precise about why.
 *
 * Each card used to be its own `sticky` shell, and because sticky leaves consecutive
 * shells a full screen apart, every card needed a transform that cancelled that gap to
 * bring it into the pile. Arithmetically the two agree. In the rendering pipeline they do
 * not: sticky offsets are resolved on the main thread as the scroll is processed, and
 * transforms are applied by the compositor. Two large opposing offsets computed in
 * different places, one frame apart, is a card that visibly trembles as you scroll — and
 * the faster the scroll, the further apart they get.
 *
 * There is one sticky element now: a stage the size of the viewport, which pins once and
 * then never moves relative to the screen. The cards are absolutely positioned inside it,
 * all in the same place, and every bit of their movement is transform. Nothing cancels
 * anything, and nothing about a card's position is computed on the main thread.
 *
 * ── No 3D tilt ──
 *
 * The card used to tip back on `rotateX` with a perspective, which is what the reference
 * does. It is gone, because a 3D transform puts the element in a 3D rendering context and
 * browsers drop subpixel antialiasing for text there — permanently, on every card, tilted
 * or not. Slightly fuzzy type on all six cards is a bad trade for a flourish on the one
 * that is leaving. The exit is a slide and a shrink, both 2D.
 *
 * ── Why the peek numbers relate to each other ──
 *
 * A card behind the front one is both pushed down and scaled down, and those fight: with
 * the origin at the centre, scaling down lifts the bottom edge by half the height it
 * loses. The push has to beat the lift or the card behind never shows. Both are now
 * percentages of the card's own height, so the visible strip stays proportional instead of
 * shrinking to nothing on a short card.
 */

/** Share of a card's scroll window spent leaving. The rest is spent still, at the front. */
const EXIT = 0.5;
/** How far each card behind the front one is pushed down, as a share of its own height. */
const PEEK_STEP = 0.05;
/** How much smaller each card behind the front one is drawn. */
const SCALE_STEP = 0.028;
/** How many cards deep the pile is visible. Beyond this they are exactly covered. */
const MAX_DEPTH = 2;
/**
 * How far a leaving card travels up, as a share of its own height.
 *
 * It has to clear the top of the stage completely, and the card that needs the most is the
 * shortest one — a card at its `min-h` floor of 56svh sits in a 100svh stage, so it must
 * travel half the leftover plus its own height: (100 + 56) / (2 x 56), about 139%. 145
 * covers that with room, and covers every taller card by more.
 */
const EXIT_TRAVEL = 1.45;
/** How much a leaving card shrinks as it goes. */
const EXIT_SHRINK = 0.05;

/** How far card `index` is through leaving: 0 while it is at the front, 1 once clear. */
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
 * Taken literally, a card's depth would fall smoothly from 1 to 0 across its whole window,
 * so it would be creeping forward the entire time and would reach full size only at the
 * instant it started to leave. There would be no moment where a card is simply sitting
 * there being read.
 *
 * So each step forward is compressed into the first `EXIT` of the window — the same
 * stretch the card in front spends leaving — and the card then holds at its new depth for
 * the rest. One card rising as another goes, then stillness.
 */
const deckDepth = (position: number, index: number) => {
  const distance = index - Math.max(position, 0);
  if (distance <= 0) return 0;
  const step = Math.floor(distance);
  const withinStep = distance - step;
  return Math.min(step + clamp((withinStep - (1 - EXIT)) / EXIT, 0, 1), MAX_DEPTH);
};

/**
 * Card `index` is opaque unless it is buried deeper than the pile shows.
 *
 * A leaving card never fades — it slides off solid, which is the only way two cards are
 * never legible through each other. This is the one job opacity has: retiring the cards
 * too deep in the pile to see, at a point where they sit exactly behind the deepest
 * visible one, so it cannot be seen happening.
 */
const deckOpacity = (position: number, index: number) =>
  clamp(MAX_DEPTH + 1 - (index - Math.max(position, 0)), 0, 1);

/**
 * When a card's copy is on screen.
 *
 * Both ends of this window were wrong, and both showed up as copy missing from a card you
 * could see.
 *
 * The end was `index + EXIT / 2`. A card leaves over `index` to `index + EXIT`, so its
 * text was reset half way through the exit, while the card was still square in the middle
 * of the screen — you watched it go blank and then slide away empty. It now ends exactly
 * where the card finishes clearing the stage.
 *
 * The start was `index - 0.7`, which looks early but is not: a card begins to be uncovered
 * the instant the one in front of it starts to leave, which is `index - 1`. Between those
 * two there was a stretch where a couple of hundred pixels of the next card were exposed
 * and still empty. It now starts at `index - 1`, so the copy is building while the card in
 * front slides away and is settled by the time the card is at the front on its own.
 *
 * Both resets therefore land on a card that is either off screen or fully covered, and
 * scrolling back up runs the sequence again.
 */
const isRevealed = (position: number, index: number) =>
  position >= index - 1 && position < index + EXIT;

/**
 * When a card's links can be clicked.
 *
 * Cards that have left are still stacked in front of the current one — `z-index` runs
 * backwards so the front card can slide off and reveal the next. One that has travelled
 * off screen but stayed clickable would swallow every click meant for the card behind it.
 *
 * The windows tile exactly: this one ends at `index + EXIT`, where the next one begins.
 * No two cards are ever interactive at once, and none of them is ever dead.
 */
const isInteractive = (position: number, index: number) =>
  position >= index - (1 - EXIT) && position < index + EXIT;

/**
 * Whether card `index` is worth drawing at all.
 *
 * Everything outside this is either buried deeper in the pile than can be seen or already
 * gone, and gets `visibility: hidden` — which takes it out of compositing entirely rather
 * than leaving a transparent full-screen layer behind. Three or four cards are live at any
 * moment instead of six.
 */
const isRendered = (position: number, index: number) =>
  position >= index - (MAX_DEPTH + 1) && position < index + EXIT + 0.15;

/**
 * A modular type scale, so the card's sizes relate to each other instead of being picked
 * one at a time. Roughly a perfect fourth (1.333) between steps, each a `clamp` so it
 * stays fluid rather than jumping at breakpoints.
 *
 * The ceilings came down when the card stopped filling the screen — an 88px headline was
 * sized for a full-bleed panel and was the main reason the card read as oversized. The
 * body sizes then came back up slightly, because on a coloured card they were doing the
 * legibility no favours.
 */
const TYPE = {
  micro: "text-[10px] tracking-[0.16em] uppercase sm:text-[11px]",
  title:
    "text-[clamp(1.75rem,3.4vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.04em]",
  lead: "text-[clamp(1rem,1.15vw,1.375rem)] leading-[1.45] tracking-[-0.01em]",
  item: "text-[clamp(0.9375rem,0.9vw,1rem)] leading-[1.35]",
} as const;

/**
 * The stage: one viewport-sized sticky box that every card is positioned inside.
 *
 * Deliberately not `overflow-hidden`. Clipping here would look tidier but it would also
 * clip a card whose content is taller than the stage, and a pinned card that clips its own
 * copy gives no way to reach it. A leaving card needs no clipping anyway — the stage is
 * pinned to the top of the viewport, so travelling above it is travelling off screen.
 */
const STAGE = "sticky top-0 h-[100svh]";

/**
 * One card's slot inside the stage. The padding is what makes the card smaller than the
 * screen, and it has to clear the navigation, which floats as a capsule from about 14px to
 * 72px down the viewport once the page has scrolled.
 *
 * `items-center` is what stopped the card being oversized. It used to stretch to fill the
 * space reserved for it, so its content sat in the middle of a tall empty box. Centred, the
 * card is as tall as its content and no taller.
 */
const SLOT = "absolute inset-0 flex items-center px-4 py-[76px] sm:px-8 md:py-[92px] lg:px-12";

/**
 * The card. Its colour comes from the service's position in the pile.
 *
 * Type is black in both themes rather than `text-foreground`, for the same reason the page
 * header's is: the card is a light colour either way, so a token that flipped to white in
 * dark mode would be invisible on it.
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
 * ── Contrast ──
 *
 * The greys are heavier than they look like they should be. On a mid-tone card the old
 * values were genuinely too faint: black at 55% over the violet works out around 3.5:1,
 * under the 4.5:1 that body copy needs. Everything moved up a band.
 *
 * ── Why parts of it are height-gated ──
 *
 * The card is sized by its content, so the content is what decides whether the card is
 * balanced or overwhelming — and the width breakpoints cannot see the height it has to fit
 * in. The outcomes block is 175px of it, which is right on a 1080-tall screen and too much
 * on a 900-tall one, so it is gated on a height query rather than tuned for one screen and
 * left to bloat the card on the others.
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
    Separate booleans rather than one object: React bails out of a re-render when a
    `useState` setter is handed the value it already holds, and an object literal is never
    equal to the last one. With these the handler below runs on every scroll frame and
    re-renders on a dozen or so across the whole section.
  */
  const [revealed, setRevealed] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [rendered, setRendered] = useState(false);

  /*
    `useMotionValueEvent` only fires on change, so a card already at the front when the
    component mounts — a reload part-way down the page, or a back navigation that restores
    scroll — would sit blank until the next scroll event. Seed it.
  */
  useEffect(() => {
    const value = position.get();
    setRevealed(isRevealed(value, index));
    setInteractive(isInteractive(value, index));
    setRendered(isRendered(value, index));
  }, [index, position]);

  useMotionValueEvent(position, "change", (value) => {
    setRevealed(isRevealed(value, index));
    setInteractive(isInteractive(value, index));
    setRendered(isRendered(value, index));
  });

  /*
    Everything below is a plain derived value. No React state and no re-render — Framer
    writes each one straight to the node, and transform and opacity are both compositor
    properties, so the pile stays off the layout and paint path.

    Both parts of the vertical movement are shares of the card's own height, so they live
    in one `translateY` and there is no second element to split them across.
  */
  const cardY = useTransform(
    position,
    (value) =>
      `${(
        (deckDepth(value, index) * PEEK_STEP -
          exitProgress(value, index) * EXIT_TRAVEL) *
        100
      ).toFixed(3)}%`,
  );
  const cardScale = useTransform(
    position,
    (value) =>
      1 -
      deckDepth(value, index) * SCALE_STEP -
      exitProgress(value, index) * EXIT_SHRINK,
  );
  const cardOpacity = useTransform(position, (value) => deckOpacity(value, index));

  /*
    Staged on the way in, and dropped in one quick beat on the way out.

    The exit deliberately does not inherit `delay`. A card resets once it is off the top,
    and running the stagger in reverse there means the parts are still settling when it
    comes back to the front, which reads as a stutter.
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
      `zIndex` runs backwards, and it has to: the front card slides off to reveal the one
      behind it, so it must be painted in front of it, while document order puts later
      cards on top. It is a static value, not a scroll-driven one, so there is no frame
      where the order is wrong.
    */
    <div className={SLOT} style={{ zIndex: total - index }}>
      <motion.div
        className={CARD}
        style={{
          backgroundColor: SERVICE_CARD_COLOURS[index % SERVICE_CARD_COLOURS.length],
          y: cardY,
          scale: cardScale,
          opacity: cardOpacity,
          /* See `isRendered` — out of the compositor, not just transparent. */
          visibility: rendered ? "visible" : "hidden",
          /* See `isInteractive`. A card that has left is off screen but still in front. */
          pointerEvents: interactive ? "auto" : "none",
        }}
      >
        {/* ── Band 1: meta rule ── */}
        <motion.div
          {...rise(STEP.meta)}
          className="flex items-baseline justify-between gap-4 border-b border-black/20 pb-3"
        >
          <span className={`font-mono text-black/70 ${TYPE.micro}`}>
            {String(index + 1).padStart(2, "0")} / {service.display}
          </span>
          {/* Position in the pile. Genuinely useful here, where the scrollbar tells you
              nothing about how many cards are left. */}
          {/* Same weight as the label opposite it rather than a step lighter: at 50% this
              measured 3.03:1 on the orange card, well under the 4.5:1 small text needs. */}
          <span className={`font-mono text-black/70 ${TYPE.micro}`} aria-hidden="true">
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
                className={`mt-4 max-w-[42ch] text-black/80 lg:mt-5 ${TYPE.lead}`}
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
                  className={`font-mono text-black/70 ${TYPE.micro}`}
                >
                  What changes
                </motion.p>

                <ul className="mt-3 space-y-2">
                  {service.outcomes.map((item, i) => (
                    <motion.li
                      key={item}
                      {...rise(STEP.outcomes + 0.08 + i * STEP.item)}
                      className={`flex items-start gap-3 text-black/80 ${TYPE.item}`}
                    >
                      {/* A short rule as the marker, matching the hairlines the rest of
                          the card is built from. A bullet or icon would introduce a third
                          visual language for no gain. */}
                      <span
                        className="mt-[0.66em] h-px w-3 shrink-0 bg-black/45"
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
            <div className="lg:col-span-6 lg:col-start-7 xl:border-l xl:border-black/15 xl:pl-10">
              <motion.p
                {...rise(STEP.listLabel)}
                className={`font-mono text-black/70 ${TYPE.micro}`}
              >
                What you get
              </motion.p>

              <ul className="mt-3 lg:mt-4">
                {service.deliverables.map((item, i) => (
                  <motion.li
                    key={item}
                    {...rise(STEP.listLabel + 0.08 + i * STEP.item)}
                    className={`flex items-baseline gap-3.5 border-b border-black/15 py-2.5 text-black/90 ${TYPE.item}`}
                  >
                    <span
                      className="font-mono text-[10px] tabular-nums text-black/70"
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
    </div>
  );
};

/**
 * The services as a pile of cards. The front one is whole, the next two show their bottom
 * edges under it, and scrolling slides the front card up and off so the one behind rises
 * into place.
 *
 * ── How the scroll drives it ──
 *
 * The article is a plain tall box — one viewport per card — and its only job is to be long
 * enough to scroll through. Inside it, a single sticky stage pins to the top of the
 * viewport for the whole section, and all six cards are absolutely positioned in that
 * stage, in the same place.
 *
 * One scroll subscription reports how far through the article the page is, as a card count.
 * Every card reads it for the five things it needs: how far down the pile to sit, how far
 * through leaving it is, whether it is worth drawing, whether its copy is showing, and
 * whether it can be clicked. The first two are transform and opacity written straight to
 * the node — no React render per frame and nothing that touches layout. The last three are
 * booleans that change a handful of times across the whole section.
 *
 * ── Two things that will silently break it ──
 *
 * 1. `overflow` on any ancestor. That ancestor becomes the scroll container and the stage
 *    pins to it instead of the viewport, which does nothing at all. A global
 *    `html, body { overflow-x: hidden }` was doing exactly this and is why the stack
 *    appeared not to work; `index.css` now uses `overflow-x: clip`, which does not
 *    establish a scroll container.
 * 2. Document-order stacking. `zIndex` has to run backwards for the front card to slide
 *    off and reveal the next. Remove it and the pile inverts: the last card sits on top of
 *    all of them and nothing else is ever visible.
 *
 * `svh`, not `vh`: on a phone `vh` resolves against the largest viewport, so a `100vh`
 * stage is taller than the screen and the bottom of the pile sits under the address bar.
 */
export const ServiceStack = ({ services }: { services: Service[] }) => {
  const ref = useRef<HTMLElement>(null);
  const total = services.length;

  /*
    `start end` to `end end` runs the range from the article's top edge entering at the
    bottom of the viewport to its bottom edge reaching there — so the range spans the
    article's full height rather than its scrollable height. That is what makes the
    conversion below a plain card count: at progress `p` the page has scrolled
    `p * total - 1` cards past the top of the article, which is 0 exactly when the stage
    reaches the top of the viewport and pins.
  */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const position = useTransform(scrollYProgress, (p) => p * total - 1);

  /* The cards carry the colour now, so the backdrop is the page's own surface — the pile
     floats on it rather than sitting in a tinted well. */
  return (
    <article
      ref={ref}
      className="relative bg-background"
      style={{ height: `${total * 100}svh` }}
    >
      <div className={STAGE}>
        {services.map((service, index) => (
          <Panel
            key={service.slug}
            service={service}
            index={index}
            total={total}
            position={position}
          />
        ))}
      </div>
    </article>
  );
};
