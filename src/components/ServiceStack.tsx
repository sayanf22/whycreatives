import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export type StackService = {
  /** Short category word, used for the eyebrow and the section labels. */
  display: string;
  /** Full service name — the card's headline. */
  title: string;
  tagline: string;
  body: string;
  points: string[];
  href: string;
};

/** How far a card shrinks as the next one covers it. */
const SETTLE_SCALE = 0.94;

/**
 * One card in the stack.
 *
 * Its own component because each card needs its own `useTransform` over a different
 * slice of the section's scroll progress, and hooks cannot be called in a loop body
 * conditionally.
 */
const StackCard = ({
  service,
  index,
  total,
  progress,
}: {
  service: StackService;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) => {
  /*
    The scrollable distance is one screen less than the container's height: the first
    card is already in place when pinning starts, so `total - 1` transitions happen
    across the whole range. Dividing by `total` instead would leave the last card
    still arriving as the section unpins.
  */
  const steps = Math.max(1, total - 1);
  const enterFrom = (index - 1) / steps;
  const enterTo = index / steps;

  /* Card 0 starts in place. The rest slide up from below across their own slice. */
  const y = useTransform(
    progress,
    index === 0 ? [0, 1] : [enterFrom, enterTo],
    index === 0 ? ["0%", "0%"] : ["100%", "0%"],
    { clamp: true },
  );

  /* Once a card is covered it settles back slightly, which is what gives the stack
     depth rather than looking like flat slides. Transform only — no layout. */
  const scale = useTransform(
    progress,
    [enterTo, Math.min(1, enterTo + 1 / steps)],
    [1, index === total - 1 ? 1 : SETTLE_SCALE],
    { clamp: true },
  );

  return (
    <motion.article
      /*
        Alternating opaque surfaces. They have to be fully opaque or the card beneath
        shows through the stack, and both tokens are theme-aware so this works in
        light and dark without a second set of colours.
      */
      className={`absolute inset-0 flex h-full flex-col justify-between overflow-hidden px-5 pb-10 pt-24 sm:px-8 sm:pb-14 sm:pt-28 lg:px-[clamp(32px,6vw,120px)] lg:pb-20 lg:pt-32 ${
        index % 2 === 0 ? "bg-background" : "bg-muted"
      }`}
      style={{ y, scale, zIndex: index, transformOrigin: "50% 0%" }}
    >
      {/* ── Eyebrow + headline ── */}
      <div className="grid gap-4 lg:grid-cols-2 lg:gap-10">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground sm:text-[11px]">
          {String(index + 1).padStart(2, "0")} / {service.display}
        </span>

        <h3
          className="text-foreground"
          style={{
            fontSize: "clamp(1.9rem, 5.2vw, 4.75rem)",
            lineHeight: 0.98,
            letterSpacing: "-0.045em",
            fontWeight: 700,
          }}
        >
          {service.title}
        </h3>
      </div>

      {/* ── Detail ── */}
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        <div>
          <p className="text-sm font-bold text-foreground sm:text-base">
            {service.tagline}
          </p>
          {/* A share of the foreground rather than the muted token: on the tinted
              card in dark mode the muted token sits close enough to the surface that
              body copy reads as disabled. */}
          <p className="mt-3 max-w-[42ch] text-[13px] leading-relaxed text-foreground/65 sm:text-sm">
            {service.body}
          </p>
        </div>

        <div>
          <p className="text-sm font-bold text-foreground sm:text-base">
            {service.display} services
          </p>
          <ul className="mt-3">
            {service.points.map((point, i) => (
              <li
                key={point}
                className="flex items-baseline justify-between gap-4 border-b border-foreground/10 py-2.5 text-[13px] text-foreground/85 sm:text-sm"
              >
                <span>{point}</span>
                <span className="font-mono text-[10px] tabular-nums text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </li>
            ))}
          </ul>

          <Link
            to={service.href}
            className="group mt-6 inline-flex items-center gap-2.5 rounded-full bg-foreground px-5 py-2.5 text-[13px] font-bold text-background transition-opacity duration-300 ease-out hover:opacity-85"
          >
            Explore the service
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-background/15 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none">
              <ArrowUpRight className="h-3 w-3" strokeWidth={3} />
            </span>
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

/**
 * The services, as a pinned stack: the section holds still while each card slides up
 * over the last, so scrolling swaps the service rather than moving the page past it.
 *
 * ── How the pinning works ──
 *
 * The outer element is `total` screens tall, which is the only thing that creates the
 * scroll distance. Inside it a single `sticky top-0` box one screen tall does the
 * pinning — CSS, not JS, so there is no scroll handler repositioning anything and
 * nothing to fall out of sync if a frame is dropped. The cards are absolutely
 * positioned inside that box and move on `transform` only.
 *
 * ── Units ──
 *
 * `svh` throughout, not `vh`. On a phone `vh` resolves against the largest viewport,
 * so a `100vh` pinned box is taller than the screen while the browser chrome is
 * showing — the bottom of every card would sit under the address bar.
 *
 * ── Reduced motion ──
 *
 * Pinning is the effect, so there is nothing to soften: the whole mechanism is
 * dropped and the cards render as a plain document-flow list.
 */
export const ServiceStack = ({ services }: { services: StackService[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  /*
    `start start` to `end end`: progress is 0 when the section's top reaches the top of
    the viewport — the moment pinning begins — and 1 when its bottom reaches the
    bottom, the moment pinning ends. So the range maps exactly onto the pinned
    interval, with nothing spent before or after.
  */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  if (reduceMotion) {
    return (
      <div>
        {services.map((service, i) => (
          <article
            key={service.title}
            className={`px-5 py-14 sm:px-8 lg:px-[clamp(32px,6vw,120px)] ${
              i % 2 === 0 ? "bg-background" : "bg-muted"
            }`}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              {String(i + 1).padStart(2, "0")} / {service.display}
            </span>
            <h3
              className="mt-3 text-foreground"
              style={{
                fontSize: "clamp(1.9rem, 5.2vw, 4.75rem)",
                lineHeight: 0.98,
                letterSpacing: "-0.045em",
                fontWeight: 700,
              }}
            >
              {service.title}
            </h3>
            <p className="mt-6 text-sm font-bold text-foreground">
              {service.tagline}
            </p>
            <p className="mt-2 max-w-[42ch] text-[13px] leading-relaxed text-foreground/65">
              {service.body}
            </p>
            <ul className="mt-5 max-w-lg">
              {service.points.map((point) => (
                <li
                  key={point}
                  className="border-b border-foreground/10 py-2.5 text-[13px] text-foreground/85"
                >
                  {point}
                </li>
              ))}
            </ul>
            <Link
              to={service.href}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-[13px] font-bold text-background"
            >
              Explore the service
              <ArrowUpRight className="h-3 w-3" strokeWidth={3} />
            </Link>
          </article>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} style={{ height: `${services.length * 100}svh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {services.map((service, i) => (
          <StackCard
            key={service.title}
            service={service}
            index={i}
            total={services.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
};
