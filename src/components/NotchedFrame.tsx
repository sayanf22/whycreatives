import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const n = (v: number) => Math.round(v * 100) / 100;
const arc = (r: number, sweep: 0 | 1, x: number, y: number) =>
  `A ${n(r)} ${n(r)} 0 0 ${sweep} ${n(x)} ${n(y)}`;

type Notch = { w: number; h: number };

/**
 * Outline of a `W` x `H` media box with a notch removed from the top-right
 * corner and a matching one from the bottom-left, so the page shows through
 * behind the tag strip and the caption.
 *
 * `R` rounds the card's own corners, `r` fillets each notch. Traversed clockwise
 * with the interior on the right, so each notch's two 90-degree corners take
 * sweep 1 while its reflex inner elbow takes sweep 0 to curve the opposite way.
 */
function buildNotchedPath(
  W: number,
  H: number,
  top: Notch,
  bottom: Notch,
  R: number,
  r: number,
): string {
  return [
    `M ${n(R)} 0`,
    // ── top-right notch ──
    `H ${n(W - top.w - r)}`,
    arc(r, 1, W - top.w, r),
    `V ${n(top.h - r)}`,
    arc(r, 0, W - top.w + r, top.h),
    `H ${n(W - r)}`,
    arc(r, 1, W, top.h + r),
    `V ${n(H - R)}`,
    arc(R, 1, W - R, H),
    // ── bottom-left notch ──
    `H ${n(bottom.w + r)}`,
    arc(r, 1, bottom.w, H - r),
    `V ${n(H - bottom.h + r)}`,
    arc(r, 0, bottom.w - r, H - bottom.h),
    `H ${n(r)}`,
    arc(r, 1, 0, H - bottom.h - r),
    `V ${n(R)}`,
    arc(R, 1, R, 0),
    "Z",
  ].join(" ");
}

/**
 * A media box clipped to a notched outline, with a tag strip stepped into the
 * top-right corner and a caption stepped into the bottom-left.
 *
 * The notch is measured from the real boxes of those two strips, so the cut
 * always hugs their content at any font size or breakpoint. If a strip outgrows
 * the card the clip is dropped and the box falls back to plain rounded corners,
 * with the strips taking a solid backing so they stay legible over the media.
 *
 * Extracted so the homepage grid and the portfolio gallery share one
 * implementation of this shape rather than each carrying its own path maths.
 */
export const NotchedFrame = ({
  tags,
  meta,
  children,
  overlay,
  className = "",
  radiusClassName = "rounded-2xl md:rounded-[28px]",
  surfaceClassName = "bg-secondary",
  tagsClassName = "gap-2",
  tagsPaddedClassName = "pb-4 pl-5",
  metaClassName = "gap-2",
  metaPaddedClassName = "pr-5 pt-4",
  shadowClassName = "",
  onMouseEnter,
  onMouseMove,
  onMouseLeave,
  frameRef: externalFrameRef,
}: {
  /** Pill labels stepped into the top-right corner. */
  tags: ReactNode[];
  /** Caption stepped into the bottom-left corner. */
  meta: ReactNode;
  /** Media, clipped to the notched outline. */
  children: ReactNode;
  /** Rendered outside the clip, e.g. a tracking cursor that must stay whole. */
  overlay?: ReactNode;
  className?: string;
  radiusClassName?: string;
  surfaceClassName?: string;
  /** Always applied to the tag strip — gap, text styling. */
  tagsClassName?: string;
  /** Applied to the tag strip only while the notch is active; this padding is
   *  what sets the size of the step, so callers can tune the cut. */
  tagsPaddedClassName?: string;
  metaClassName?: string;
  metaPaddedClassName?: string;
  /** `drop-shadow(...)` utilities. Must be a filter, not a box-shadow — see the
   *  note on the wrapper below. */
  shadowClassName?: string;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseMove?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
  frameRef?: React.RefObject<HTMLDivElement>;
}) => {
  const localFrameRef = useRef<HTMLDivElement>(null);
  const frameRef = externalFrameRef ?? localFrameRef;
  const tagsRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const [clip, setClip] = useState<string | null>(null);

  const measure = useCallback(() => {
    const frame = frameRef.current;
    const tagStrip = tagsRef.current;
    const metaStrip = metaRef.current;
    if (!frame || !tagStrip || !metaStrip) return;

    const W = frame.clientWidth;
    const H = frame.clientHeight;
    const top = { w: tagStrip.offsetWidth, h: tagStrip.offsetHeight };
    const bottom = { w: metaStrip.offsetWidth, h: metaStrip.offsetHeight };

    // Radius is read back from CSS rather than hard-coded, so the clipped shape
    // always agrees with whatever `rounded-*` utility is in play here.
    const R = parseFloat(window.getComputedStyle(frame).borderTopLeftRadius) || 16;

    if (W < 2 || H < 2) return setClip(null);
    if (top.w < 2 || top.h < 2 || bottom.w < 2 || bottom.h < 2)
      return setClip(null);

    // The fillet cannot exceed half of either notch in either direction: past
    // that the straight run between two arcs inverts and the path folds back on
    // itself instead of drawing a corner.
    const r = Math.max(
      4,
      Math.min(R, 24, top.w / 2, top.h / 2, bottom.w / 2, bottom.h / 2),
    );

    const fits =
      top.w + r + R <= W &&
      bottom.w + r + R <= W &&
      top.h + r + R <= H &&
      bottom.h + r + R <= H &&
      top.h + bottom.h + 2 * r < H;
    if (!fits) return setClip(null);

    setClip(buildNotchedPath(W, H, top, bottom, R, r));
  }, [frameRef]);

  useLayoutEffect(() => {
    measure();
    const frame = frameRef.current;
    const tagStrip = tagsRef.current;
    const metaStrip = metaRef.current;
    if (!frame || !tagStrip || !metaStrip) return;
    // Each strip resizes with its own text metrics, which the card's resize does
    // not capture, so all three are observed.
    const ro = new ResizeObserver(() => measure());
    ro.observe(frame);
    ro.observe(tagStrip);
    ro.observe(metaStrip);
    return () => ro.disconnect();
  }, [measure, frameRef]);

  useEffect(() => {
    if (typeof document === "undefined" || !("fonts" in document)) return;
    let alive = true;
    document.fonts.ready.then(() => {
      if (alive) measure();
    });
    return () => {
      alive = false;
    };
  }, [measure]);

  return (
    <div
      ref={frameRef}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`relative w-full ${radiusClassName} ${className}`}
    >
      {/* Tag strip, stepped into the top-right notch and sitting on the page
          rather than on the media. Padding is what sets the size of the step. */}
      {/* When the notch cannot fit (very narrow screens) the strips end up
          sitting directly on the media, so they take a solid backing there to
          stay legible. Adding padding only ever grows them, so this cannot flip
          the fit test back and forth. */}
      <div
        ref={tagsRef}
        className={`absolute right-0 top-0 z-20 flex items-center ${tagsClassName} ${
          clip ? tagsPaddedClassName : "rounded-bl-2xl bg-background/95 p-3"
        }`}
      >
        {tags}
      </div>

      {/* Caption in the opposite step, which is what gives the card its
          staircase on both diagonals. */}
      <div
        ref={metaRef}
        className={`absolute bottom-0 left-0 z-20 flex items-center ${metaClassName} ${
          clip ? metaPaddedClassName : "rounded-tr-2xl bg-background/95 p-3"
        }`}
      >
        {meta}
      </div>

      {/*
        ── SHADOW CASTER ──
        An empty layer clipped to the same outline and filled with the surface
        colour, whose only job is to cast the shadow.

        Two constraints produce this arrangement:

        1. The shadow cannot sit on the clipped element. Per CSS Masking,
           `clip-path` is applied *after* `filter`, so a `drop-shadow` declared
           beside the clip is clipped away with it and never renders. It also
           cannot be a `box-shadow`, which would trace the element's rectangle
           and ignore the notches entirely.
        2. It cannot wrap the media either, which is what this used to do. Some
           of these cards hold continuously animating content — the homepage
           text panels cycle a blur every frame — and a filter on an ancestor of
           moving content is re-run on every one of those frames. The silhouette
           never changes, but the browser cannot know that.

        So the filter goes on a layer with nothing moving inside it: computed
        once, cached, and still transitionable for the hover state.
      */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 transition-[filter] duration-500 ease-out ${shadowClassName}`}
      >
        <div
          className={`h-full w-full ${radiusClassName} ${surfaceClassName}`}
          style={{
            clipPath: clip ? `path("${clip}")` : undefined,
            WebkitClipPath: clip ? `path("${clip}")` : undefined,
          }}
        />
      </div>

      {/* The media itself, on the same outline but with no filter above it. */}
      <div className="absolute inset-0">
        <div
          className={`h-full w-full overflow-hidden ${radiusClassName} ${surfaceClassName}`}
          style={{
            clipPath: clip ? `path("${clip}")` : undefined,
            WebkitClipPath: clip ? `path("${clip}")` : undefined,
          }}
        >
          {children}
        </div>
      </div>

      {overlay}
    </div>
  );
};
