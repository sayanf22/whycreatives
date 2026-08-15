import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/*
  HERO — dark media panel with a white "staircase" notch cut out of its top-left.

  How it works:
  - One dark rounded panel fills the hero. It is the media slot (drop an <img>/<video>
    inside `panelRef`'s child and it fills the whole shape).
  - The white text card is NOT a stack of white boxes. Instead the panel is clipped with
    a `clip-path: path()` that removes a staircase-shaped notch, so the page background
    shows through behind the type. That means no seams, no colour matching, and the
    inverted (concave) corners are geometrically exact.
  - The notch is generated from the real measured boxes of the eyebrow, each headline
    line and the button row, so it always hugs the text at any viewport / font size.
*/

const HEADLINE = ["A one stop solution", "for video, web, apps", "and branding"] as const;
const EASE = [0.16, 1, 0.3, 1] as const;

type Row = { right: number; bottom: number };

const n = (v: number) => Math.round(v * 100) / 100;
const arc = (r: number, sweep: 0 | 1, x: number, y: number) =>
  `A ${n(r)} ${n(r)} 0 0 ${sweep} ${n(x)} ${n(y)}`;

/**
 * Builds the dark panel outline (clockwise) for a `W` x `H` box with a staircase
 * notch removed from the top-left corner.
 *
 * `rows` are ordered top to bottom; each row's `right`/`bottom` are panel-local px.
 * `leftInset` is how far the notch sits in from the panel's left edge, and `stripTop`
 * is where the panel's left edge re-appears above that inset (the thin dark strip
 * running down the left of the text card).
 */
function buildPanelPath(
  W: number,
  H: number,
  rows: Row[],
  leftInset: number,
  stripTop: number,
  R: number,
  r: number
): string {
  const bottomY = rows[rows.length - 1].bottom;
  const hasStrip =
    leftInset >= R + r &&
    stripTop >= R + r &&
    stripTop <= bottomY - (R + r);

  const d: string[] = [];

  // ── outer rectangle: start on the top edge at the notch, run clockwise ──
  d.push(`M ${n(rows[0].right)} 0`);
  d.push(`H ${n(W - R)}`);
  d.push(arc(R, 1, W, R));
  d.push(`V ${n(H - R)}`);
  d.push(arc(R, 1, W - R, H));
  d.push(`H ${n(R)}`);
  d.push(arc(R, 1, 0, H - R));

  if (hasStrip) {
    // left edge stops at `stripTop`, then a thin dark strip runs down beside the card
    d.push(`V ${n(stripTop + R)}`);
    d.push(arc(R, 1, R, stripTop));
    d.push(`H ${n(leftInset - r)}`);
    d.push(arc(r, 1, leftInset, stripTop + r));
    d.push(`V ${n(bottomY - r)}`);
    d.push(arc(r, 0, leftInset + r, bottomY));
  } else {
    // no strip: the panel's top-left corner sits directly under the card
    d.push(`V ${n(bottomY + R)}`);
    d.push(arc(R, 1, R, bottomY));
  }

  // ── staircase: walk the notch's right edge from the bottom row up to the top ──
  for (let i = rows.length - 1; i >= 0; i--) {
    const cur = rows[i].right;
    const yTop = i === 0 ? 0 : rows[i - 1].bottom;

    if (i === rows.length - 1) {
      // along the bottom of the card, then turn up (concave corner)
      const br = Math.min(r, (rows[i].bottom - yTop) / 2);
      d.push(`H ${n(cur - br)}`);
      d.push(arc(br, 0, cur, rows[i].bottom - br));
    }

    if (i === 0) {
      d.push("V 0");
      break;
    }

    const next = rows[i - 1].right;
    const above = yTop - (i - 2 >= 0 ? rows[i - 2].bottom : 0);
    const below = rows[i].bottom - yTop;
    const sr = Math.max(
      3,
      Math.min(r, Math.abs(next - cur) / 2, above / 2, below / 2)
    );

    if (next > cur) {
      // the row above is wider: step out (convex, then concave)
      d.push(`V ${n(yTop + sr)}`);
      d.push(arc(sr, 1, cur + sr, yTop));
      d.push(`H ${n(next - sr)}`);
      d.push(arc(sr, 0, next, yTop - sr));
    } else {
      // the row above is narrower: step in (concave, then convex)
      d.push(`V ${n(yTop + sr)}`);
      d.push(arc(sr, 0, cur - sr, yTop));
      d.push(`H ${n(next + sr)}`);
      d.push(arc(sr, 1, next, yTop - sr));
    }
  }

  d.push("Z");
  return d.join(" ");
}

export const Hero = () => {
  const panelRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const actionsRef = useRef<HTMLDivElement>(null);

  const [clipPath, setClipPath] = useState<string | null>(null);
  /**
   * Phone-only panel height, in px, or `null` on desktop where CSS owns it.
   *
   * This has to be measured rather than written as a CSS expression. The panel
   * needs to be exactly "text card + 16:9 video band" so the video sits directly
   * under the button with no dead space, and the text card's height is not
   * something CSS can report — it depends on the headline's clamped font size,
   * its line count and the button row. A hand-derived `calc()` can approximate
   * it, but it goes silently wrong the moment any of those change, and the
   * failure mode is the type overlapping the video.
   */
  const [phonePanelH, setPhonePanelH] = useState<number | null>(null);

  const measure = useCallback(() => {
    const panel = panelRef.current;
    const card = cardRef.current;
    const eyebrow = eyebrowRef.current;
    const actions = actionsRef.current;
    const lines = lineRefs.current.filter(Boolean) as HTMLSpanElement[];
    if (!panel || !card || !eyebrow || !actions || lines.length !== HEADLINE.length)
      return;

    /*
      The notch runs at every width, phones included.

      It was briefly disabled below `md` because the panel there was a 16:9 box
      about 206px tall while the text card alone needs ~200px — no panel left to
      cut a staircase from, so the fit test failed and the layout collapsed. The
      answer was not to drop the notch but to stop forcing a *landscape* panel
      onto a portrait screen. The phone panel is measured tall below, which leaves
      plenty of room for the cut.
    */
    const box = panel.getBoundingClientRect();
    const W = box.width;
    const H = box.height;
    if (W < 2 || H < 2) return;

    const R = Math.max(14, Math.min(34, W * 0.026));
    // Read the card's real offset rather than computing it. Deriving it here and
    // then writing it to state would measure the text at the *old* offset, which
    // left the notch behind whenever the breakpoint changed (mobile -> desktop).
    const leftInset = Math.max(0, card.getBoundingClientRect().left - box.left);
    const rel = (el: Element): Row => {
      const b = el.getBoundingClientRect();
      return { right: b.right - box.left, bottom: b.bottom - box.top };
    };

    const eb = rel(eyebrow);
    const measured = lines.map(rel);
    const ab = rel(actions);

    /*
      ── PHONE PANEL HEIGHT ──

      A portrait panel that the video covers, which is what the reference does.
      The previous version sized the panel to "text card + a 16:9 band", so the
      video was a strip across the bottom with dark above it. Covering instead
      means the video is the panel's whole surface and the type sits on top of it
      in the notch.

      Two terms:
        - `ab.bottom + 24` is the floor: the panel must always clear the button
          row, whatever the clamped headline does to the card's height. Measured
          rather than approximated with a `calc()`, because the card's height
          depends on the font clamp, the line count and the button row, and a
          hand-derived guess fails silently — the failure mode is type overlapping
          the video.
        - `62vh` is the target, so it reads as a tall portrait surface.

      Capped at 600px, and deliberately not taller: on a portrait panel every
      extra pixel of height is more horizontal crop out of a 16:9 source. Taller
      panel, narrower slice of video.

      This converges rather than looping. Changing the height re-runs the
      ResizeObserver, but `ab.bottom` is measured from the panel's top and the
      card is pinned there, so it does not move when the height changes — the
      second pass computes the same number and React bails out.
    */
    if (!window.matchMedia("(min-width: 768px)").matches) {
      const floor = ab.bottom + 24;
      const target = window.innerHeight * 0.62;
      setPhonePanelH(Math.round(Math.min(Math.max(floor, target), 600)));
    } else {
      setPhonePanelH(null);
    }

    // the eyebrow shares the first headline line's edge (matches the reference:
    // the white card is full width from the very top, no step at the eyebrow)
    const raw: Row[] = [
      { right: Math.max(eb.right, measured[0].right), bottom: measured[0].bottom },
      ...measured.slice(1),
      ab,
    ];

    // keep every row inside the panel, and keep bottoms strictly increasing
    const maxRight = W - R - 4;
    const rows: Row[] = [];
    for (const row of raw) {
      const right = Math.min(row.right, maxRight);
      const bottom = Math.min(row.bottom, H - R - 4);
      const prev = rows[rows.length - 1];
      // collapse rows whose right edges are too close to round cleanly
      if (prev && Math.abs(right - prev.right) < R * 1.4) {
        prev.right = Math.max(prev.right, right);
        prev.bottom = Math.max(prev.bottom, bottom);
        continue;
      }
      if (prev && bottom <= prev.bottom + 8) {
        prev.right = Math.max(prev.right, right);
        prev.bottom = Math.max(prev.bottom, bottom);
        continue;
      }
      rows.push({ right, bottom });
    }
    if (!rows.length) return;

    // the dark strip beside the card starts level with the first headline line
    const stripTop = measured[0].bottom;

    setClipPath(buildPanelPath(W, H, rows, leftInset, stripTop, R, R));
  }, []);

  useLayoutEffect(() => {
    measure();
    const panel = panelRef.current;
    const card = cardRef.current;
    if (!panel || !card) return;
    // watch the card too: its width changes with the font-size clamp, and its
    // offset changes at the breakpoint, neither of which resizes the panel
    const ro = new ResizeObserver(() => measure());
    ro.observe(panel);
    ro.observe(card);
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, [measure]);

  // webfonts change the text metrics, so re-measure once they land
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

  // driven by CSS vars on the card so the values differ per breakpoint without
  // JS: on phones the type sits flush to the panel edge, matching the reference
  const padL = "var(--pad-l)";
  const padR = "var(--pad-r)";

  return (
    <section className="relative w-full bg-white dark:bg-[#111] transition-colors duration-300">
      {/* No max-width: the panel stays ~88% of the viewport on desktop.
          On phones the gutter drops to 8px so the panel is near full-bleed,
          like the reference — a 6vw gutter left far too much dead margin. */}
      {/* `px-3` rather than `px-2` on phones: a soft shadow needs somewhere to
          land, and 8px was not enough for any of it to be visible. 12px still
          reads as near full-bleed. */}
      {/* Gutter caps at 120px rather than 160px. In the reference the panel is
          about 88% of the viewport at every size; at 160px a side it was dropping
          below that on wide monitors, which reads as the panel getting smaller as
          the screen gets bigger — the opposite of what you want. */}
      <div
        className="w-full px-3 md:px-[clamp(28px,4.5vw,120px)]"
        style={{
          // must clear the mobile nav, which is 88px tall (py-6 + a 40px row)
          paddingTop: "clamp(100px, 11vw, 112px)",
          /* Was `clamp(10px, 2.4vw, 34px)`. The shadow is offset 26px down and
             spreads up to 90px, so at 34px nearly all of it was crushed against
             the section below and there was nothing left to see. */
          paddingBottom: "clamp(30px, 4vw, 76px)",
        }}
      >
        {/*
          ── PANEL ──

          Desktop: `md:aspect-video` and nothing else. That is 16/9 exactly, at
          whatever width the panel happens to be, which is the only way the video
          fills it with no bars. Every previous attempt failed for the same
          reason — a `vw` height expression or a `max-h` cap. Both silently break
          the ratio:

            - `h-[49.5vw]` assumed the gutter is always 6vw, but the gutter
              clamps at 160px, so past ~2667px the panel gets proportionally
              wider than the height rule allows.
            - `max-h-[820px]` is worse: on a 2560px screen the panel is 2240px
              wide, so 16:9 needs 1260px of height. Capped at 820 it became
              2.7:1 — a letterbox slot with the video floating in the middle.
              That is exactly the black band you were seeing.

          And no `max-width` either. That was the last thing keeping this small:
          capping the panel at 1500px on a 2560px monitor left it filling barely
          58% of the width, floating in the middle of the page, while the gutters
          ballooned to 500px a side. The panel is meant to be ~88vw at every
          width — the gutter is the only thing that should limit it, and it
          already clamps at 160px.

          The height that follows is large on purpose. At 1920 the panel is
          1690x950; plus the wrapper padding the hero is ~1138px, so it runs a
          little past the fold. That is the reference behaviour, not a bug — a
          16:9 panel at 88vw cannot be anything else, and shrinking it to fit the
          fold is exactly what made it look small.

          The source video is 16:9 (verified: its thumbnail is 640x360, ratio
          1.7778), which is why `aspect-video` here makes the iframe fit with no
          bars on any axis.

          Phone: no aspect ratio — a tall portrait panel with its height measured
          in JS, and the video covering the whole surface with the type sitting on
          top of it in the notch. That is the shape the reference uses.
        */}
        <div
          ref={panelRef}
          className="relative w-full md:h-auto md:aspect-video"
          style={
            {
              /* Phone: measured from the content (see `phonePanelH`). Desktop: left
                 undefined so the `md:aspect-video` class governs. The fallback only
                 applies for the single frame before the first measurement lands. */
              height: phonePanelH ? `${phonePanelH}px` : undefined,
              minHeight: phonePanelH ? undefined : "62vh",
              /*
                Republished as a custom property so the iframe's cover width can be
                derived from it in a class — `height x 16/9`. An inline style on the
                iframe could carry the number too, but not the `md:` override that
                switches back to `w-full`, so the value has to reach CSS.
              */
              "--panel-h": phonePanelH ? `${phonePanelH}px` : "0px",
            } as React.CSSProperties
          }
        >
          {/*
            ── SHADOW CASTER ──
            A separate, empty layer whose only job is to be the panel's
            silhouette and cast a shadow from it.

            Two constraints force this shape of solution:

            1. The shadow cannot sit on the clipped element itself. Per CSS
               Masking, `clip-path` is applied *after* `filter`, so a drop-shadow
               declared alongside the clip is clipped away with it and never
               paints. It also cannot be a `box-shadow`, which would trace the
               element's rectangle and draw a hard edge straight across the notch.
            2. It cannot go on a *parent* of the media either — the obvious fix.
               The hero image parallaxes on scroll, and a transforming child
               inside a filtered ancestor forces the browser to re-run the filter
               on every frame. The silhouette never changes, but the browser has
               no way to know that.

            So the filter goes on a layer with no moving contents. It is computed
            once and cached, and the media layer below sits on the same clip path
            with no filter at all, leaving the parallax on the compositor.
          */}
          {/*
            Three stops, not two, and much stronger than the card recipe.

            Shadow values do not transfer between surfaces of different sizes.
            The portfolio cards are around 800px wide and read well at 36px of
            blur; this panel is over 1700px, and the first pass at those same
            values was invisible — the spread was a fraction of the object
            casting it. A surface this large needs the full three-part stack: a
            tight contact edge, a mid shadow that does the lifting, and a wide
            ambient pass that grounds it.
          */}
          {/* Active at every width again. It was `hidden md:block` while phones
              used a stacked layout with no clip-path; now the notch is back on
              phones, so the shadow has to follow the notched silhouette there
              too — a plain box-shadow would cut straight across the cutout. The
              spread is smaller below `md` because the panel is much smaller. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 [filter:drop-shadow(0_2px_6px_rgba(0,0,0,0.10))_drop-shadow(0_14px_28px_rgba(0,0,0,0.16))] dark:[filter:drop-shadow(0_2px_8px_rgba(0,0,0,0.5))_drop-shadow(0_16px_34px_rgba(0,0,0,0.6))] md:[filter:drop-shadow(0_3px_8px_rgba(0,0,0,0.10))_drop-shadow(0_26px_44px_rgba(0,0,0,0.20))_drop-shadow(0_56px_90px_rgba(0,0,0,0.16))] md:dark:[filter:drop-shadow(0_3px_10px_rgba(0,0,0,0.55))_drop-shadow(0_28px_50px_rgba(0,0,0,0.6))_drop-shadow(0_60px_100px_rgba(0,0,0,0.5))]"
          >
            <div
              className="h-full w-full bg-[#161616] dark:bg-[#202020]"
              style={{
                clipPath: clipPath ? `path("${clipPath}")` : undefined,
                WebkitClipPath: clipPath ? `path("${clipPath}")` : undefined,
                borderRadius: clipPath ? undefined : "clamp(14px, 2.6vw, 34px)",
              }}
            />
          </div>

          {/* ── MEDIA ──
              Fills the panel at every width and is clipped to the notched
              outline, so the text card sits in the cutout on phones exactly as it
              does on desktop. */}
          <div
            className="absolute inset-0 overflow-hidden bg-[#161616] dark:bg-[#202020]"
            style={{
              clipPath: clipPath ? `path("${clipPath}")` : undefined,
              WebkitClipPath: clipPath ? `path("${clipPath}")` : undefined,
              /* Radius is inline rather than a class so it can be dropped the
                 moment the clip path resolves — the path draws its own corners,
                 and keeping a border-radius as well would intersect the two and
                 shave every corner twice. */
              borderRadius: clipPath ? undefined : "clamp(20px, 2.6vw, 34px)",
            }}
          >
            {/*
              ── COVER, CENTRED ──

              Why black bars kept reappearing: Cloudflare's player fits the video
              *inside* the iframe and paints its letterbox colour into whatever is
              left over. Those bars are drawn inside the iframe, so styling the
              iframe box cannot remove them. The only fix is to make the iframe
              itself exactly the video's ratio, and then oversize it.

              `object-fit: cover` would do this in one line but does not apply to
              iframes, so the maths is done by hand.

              Phone — the panel is portrait, so height is the constraining axis:
              set the iframe to the panel's full height and give it the width that
              height implies at 16:9 (`height x 16/9`). That is always wider than a
              portrait panel, so it overflows horizontally and the parent's
              `overflow-hidden` plus the clip path crop the sides. Centred on both
              axes with a 50%/-50% pair, so the middle of the frame is what shows.

              Desktop — the panel is already exactly 16:9, so `w-full h-full` is
              the same result for less work, and the transforms are switched off.

              This is why the panel height is a custom property: the width here is
              derived from it, so the two can never drift apart.

              Note the trade-off this makes, because it is real: covering a 366x520
              phone panel with a 16:9 frame shows roughly its middle 40%. That is
              inherent to cover — a landscape video cannot fill a portrait box
              without losing the sides. It suits the reference because its footage
              is a person; for a graphics-and-text animation the proper fix is a
              second portrait export of the video, swapped in here with a
              `matchMedia` check.
            */}
            <iframe
              src="https://customer-8l64zx8lmsynng2s.cloudflarestream.com/a2f314ee5d2cfcc77f3c3b61fddf5c75/iframe?muted=true&preload=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-8l64zx8lmsynng2s.cloudflarestream.com%2Fa2f314ee5d2cfcc77f3c3b61fddf5c75%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&controls=false"
              title="WhyCreatives showreel"
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              loading="eager"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[var(--panel-h)] w-[calc(var(--panel-h)*16/9)] -translate-x-1/2 -translate-y-1/2 border-none md:left-0 md:top-0 md:h-full md:w-full md:translate-x-0 md:translate-y-0"
            />
          </div>

          {/* ── TEXT CARD ── sits over the notch, on the page background, at
              every width. The offset is pure CSS so measurement always reads the
              final position; on phones it goes flush left, which drops the dark
              strip from the cut and leaves a plain top-left cutout — the same
              shape the reference uses there. ── */}
          <div
            ref={cardRef}
            className="absolute left-0 top-0 z-10 flex flex-col items-start [--pad-l:12px] [--pad-r:16px] md:left-[min(7vw,112px)] md:[--pad-l:clamp(14px,1.6vw,24px)] md:[--pad-r:clamp(20px,2vw,30px)]"
          >
            <div
              ref={eyebrowRef}
              className="w-fit"
              style={{
                paddingLeft: padL,
                paddingRight: padR,
                paddingTop: "clamp(12px, 1.4vw, 20px)",
                paddingBottom: "clamp(10px, 1.2vw, 18px)",
              }}
            >
              {/* animations live on children only — the measured boxes never move,
                  so the clip-path stays locked to the type */}
              <motion.span
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-black dark:bg-white" />
                <span className="whitespace-nowrap text-[13px] font-normal leading-none text-black lg:text-[15px] dark:text-white">
                  Hello, we&rsquo;re WhyCreatives &#128075;
                </span>
              </motion.span>
            </div>

            <h1
              className="font-['Schibsted_Grotesk','Plus_Jakarta_Sans',sans-serif] text-black dark:text-white"
              style={{
                /*
                  The slope was 4.4vw, which on a 390px phone renders the
                  headline at 21.6px — a 680px panel wrapped around three lines
                  of body-sized type, which is what made the whole hero read as
                  cluttered rather than composed. 8.4vw gives ~33px there and
                  still lands where 4.4vw did once the cap takes over.

                  8.4 is the ceiling, not a preference. Each line is
                  `whitespace-nowrap` inside an `overflow-hidden` box, so an
                  overlong line is silently cut rather than wrapped. The widest
                  line is 20 characters and this face sets at roughly 0.42em per
                  character, so a line needs about 8.3x the font size. On a 320px
                  screen the card has ~276px of usable width, capping the size at
                  about 33px — and 8.4vw of 320px is 26.9px, comfortably inside
                  it. Raising the slope much further starts clipping on the
                  narrowest phones.
                */
                fontSize: "clamp(1.6rem, 8.4vw, 104px)",
                fontWeight: 500,
                letterSpacing: "-0.022em",
                margin: 0,
              }}
            >
              {HEADLINE.map((line, i) => (
                <span
                  key={line}
                  ref={(el) => {
                    lineRefs.current[i] = el;
                  }}
                  className="block w-fit overflow-hidden whitespace-nowrap"
                  style={{
                    lineHeight: 1,
                    paddingLeft: padL,
                    paddingRight: padR,
                    // the padding/negative-margin pair keeps the visual line
                    // spacing tight (0.89em) while leaving the measured box
                    // below the descenders, so the notch never clips a "g" or "y"
                    paddingBottom: "0.14em",
                    marginBottom: i === HEADLINE.length - 1 ? 0 : "-0.25em",
                  }}
                >
                  <motion.span
                    className="inline-block"
                    initial={{ y: "108%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.08 + i * 0.09 }}
                    style={{ willChange: "transform" }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <div
              ref={actionsRef}
              className="w-fit"
              style={{
                paddingLeft: padL,
                paddingRight: padR,
                paddingTop: "clamp(14px, 1.6vw, 24px)",
                paddingBottom: "clamp(14px, 1.6vw, 24px)",
              }}
            >
              <motion.div
                className="flex items-center gap-5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.45 }}
              >
              <Link
                to="/our-work"
                className="group flex items-center gap-2.5 rounded-full bg-[#161616] py-2 pl-5 pr-2 text-[14px] font-semibold text-white transition-colors hover:bg-black lg:text-[15px] dark:bg-white dark:text-black dark:hover:bg-white/85"
              >
                View our work
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-0.5 dark:bg-black/15">
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                </span>
              </Link>
              {/* Hidden below md again, for two reasons that both come back with
                  the notch: the button row has to stay narrower than the headline
                  or the staircase stops stepping inward, and the reference shows a
                  single button on a phone. */}
              <Link
                to="/people"
                className="group hidden items-center gap-1.5 text-[14px] font-semibold text-black transition-opacity hover:opacity-60 md:flex lg:text-[15px] dark:text-white"
              >
                Meet the team
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2.5}
                />
              </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
