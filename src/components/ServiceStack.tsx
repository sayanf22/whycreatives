import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export type StackService = {
  /** Short category word, used for the eyebrow and the list label. */
  display: string;
  /** Full service name — the card's headline. */
  title: string;
  tagline: string;
  body: string;
  points: string[];
  href: string;
};

/**
 * The services as a stack of pinned panels: the section holds still while the next
 * card slides up over it, so scrolling swaps the service rather than moving the page
 * past it.
 *
 * ── Why this is pure CSS ──
 *
 * Consecutive `position: sticky` siblings each pin at the same offset, so panel N
 * holds at the top while panel N+1 scrolls up and covers it. That is the whole
 * effect, and it costs nothing: no scroll listener, no `useScroll`, no per-frame
 * transform, nothing to fall out of sync when a frame is dropped.
 *
 * The first version of this did it with Framer — `useScroll` on a container `N`
 * screens tall, driving a `translateY` per card off a slice of the progress. It
 * worked, but it was a scroll handler plus N interpolations rebuilding transforms
 * every frame to reproduce something the browser does natively on the compositor.
 * One of those versions also had a real bug the maths hid: the last card's
 * interpolation domain collapsed to `[1, 1]`. None of that can happen here, because
 * there is no maths.
 *
 * ── Two things that will silently break it ──
 *
 * 1. `overflow: hidden` on any ancestor. That makes the ancestor the scroll
 *    container, and the panels then pin to it rather than the viewport — they stop
 *    stacking and just scroll. This is why `WhatWeDo` deliberately does not clip.
 * 2. `height` instead of `min-height`. Content taller than the panel would be cut
 *    off with no way to reach it, since the panel is pinned. `min-h` lets a long
 *    card grow and simply pin a little later.
 *
 * ── Units ──
 *
 * `svh`, not `vh`. On a phone `vh` resolves against the largest viewport, so a
 * `100vh` panel is taller than the screen while the browser chrome is showing and the
 * bottom of every card sits under the address bar.
 */
export const ServiceStack = ({ services }: { services: StackService[] }) => (
  <article>
    {services.map((service, index) => (
      <section
        key={service.title}
        /*
          Alternating opaque surfaces — they must be fully opaque or the panel beneath
          shows through the stack. Both are theme tokens, so this works in light and
          dark without a second set of colours.

          Every panel after the first gets a rounded top edge and a shadow above it,
          which is what makes an incoming card read as a card rather than as the page
          changing colour. The shadow is static, so it costs one paint, not one per
          frame.
        */
        className={`sticky top-0 flex min-h-[100svh] flex-col justify-between px-5 pb-12 pt-24 sm:px-8 sm:pb-16 sm:pt-28 lg:px-[clamp(32px,6vw,120px)] lg:pb-20 lg:pt-32 ${
          index % 2 === 0 ? "bg-background" : "bg-muted"
        } ${
          index === 0
            ? ""
            : "rounded-t-[24px] shadow-[0_-18px_40px_-12px_rgba(0,0,0,0.18)] md:rounded-t-[36px] dark:shadow-[0_-18px_40px_-12px_rgba(0,0,0,0.6)]"
        }`}
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
        <div className="mt-10 grid gap-8 lg:mt-0 lg:grid-cols-2 lg:gap-10">
          <div>
            <p className="text-sm font-bold text-foreground sm:text-base">
              {service.tagline}
            </p>
            {/* A share of the foreground rather than the muted token: on the tinted
                panel in dark mode the muted token sits close enough to the surface
                that body copy reads as disabled. */}
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
      </section>
    ))}
  </article>
);
