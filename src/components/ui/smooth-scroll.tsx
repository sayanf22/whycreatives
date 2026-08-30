import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

/**
 * Site-wide smooth scrolling.
 *
 * ── Why this is safe to put at the root ──
 *
 * Lenis does not fake the scroll with a transform on a wrapper. It keeps the real
 * document scroll position and eases it toward the target, so everything that reads
 * scroll still works untouched: `position: sticky`, `IntersectionObserver`, Framer's
 * `useScroll`, and anchor links. A transform-based smooth-scroll library would break
 * all four, which is why this one is worth using and others are not.
 *
 * ── Why touch is left alone ──
 *
 * `smoothWheel` only. Phones already scroll smoothly at the compositor level, and
 * intercepting touch moves that onto the main thread — it fights the browser's own
 * momentum and is the usual reason "smooth scroll" libraries feel worse on mobile
 * than no library at all.
 *
 * ── Reduced motion ──
 *
 * Lenis honours `prefers-reduced-motion` internally by disabling the easing, so
 * there is nothing to branch on here.
 */
export const SmoothScroll = ({ children }: { children: ReactNode }) => (
  <ReactLenis
    root
    options={{
      /* Just short of half a second of catch-up. Longer reads as the page lagging
         behind the wheel rather than gliding with it. */
      duration: 0.9,
      smoothWheel: true,
      /* See above — native momentum is better than anything done in JS here. */
      syncTouch: false,
      /* Standard exponential ease-out. Fast to respond, long tail to settle. */
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    }}
  >
    {children}
  </ReactLenis>
);

export default SmoothScroll;
