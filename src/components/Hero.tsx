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

/*
  Line lengths are part of the shape, not just the reading.

  `buildPanelPath` walks one staircase step per row, and the cut only reads as the
  reference's clean descending staircase if each row is *narrower* than the one
  above. Three lines rather than two, because each line is another notch — the
  reference gets its five steps from an eyebrow, three headline lines and a button
  row, and two lines could only ever produce four.

  Character counts descend 21 / 17 / 15, then the button row lands narrower still.
  Every gap is wider than the `R * 1.4` merge threshold at every breakpoint from
  360px up, so all five steps actually draw; at 320px the last two collapse to one,
  which is a graceful four-step fallback rather than a broken corner.
*/
const HEADLINE = [
  "One stop solution for",
  "all creative needs",
  "and goals",
] as const;
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
 *
 * `leftInset` is the card's own offset from the panel's left edge, and it produces the
 * reference's left-hand notch: the top band still reaches the panel's left edge, but
 * every band below it starts at `leftInset`, so a block of panel shows through at the
 * bottom-left. Pass 0 to skip it.
 *
 * Taking it from the card's measured offset rather than inventing a number is what
 * makes it safe — the cut lands exactly on the card's box, so it can never slice into
 * a glyph no matter what the headline says or how the font clamps.
 *
 * ── Orientation, because the arc sweeps depend on it ──
 * The outline runs clockwise with the panel interior on the right of travel. That is
 * set by the outer rectangle: heading `+x` along the top, the interior is below,
 * which is the right-hand side when `y` grows downward. Every convex corner is
 * therefore a right turn and takes `sweep: 1`; every concave corner is a left turn
 * and takes `sweep: 0`. Getting one of these backwards does not produce a wrong
 * curve, it produces a self-intersecting path that fills inside out.
 */
function buildPanelPath(
  W: number,
  H: number,
  rows: Row[],
  R: number,
  r: number,
  leftInset = 0
): string {
  const bottomY = rows[rows.length - 1].bottom;
  /* Where the card's left edge steps in: the bottom of the top band, which is the
     row the eyebrow and the first headline line share. */
  const stepY = rows[0].bottom;

  /*
    The notch's own fillet, a third of the inset. At a half the two arcs along the
    top of the notch meet tangentially, the flat run between them collapses to zero
    length, and the step reads as a rounded hump instead of a corner.
  */
  const nr = Math.max(4, Math.min(R * 0.6, leftInset / 3));
  const hasLeftNotch =
    leftInset > 12 && stepY >= R + nr && stepY <= bottomY - 2 * nr;

  const d: string[] = [];

  // ── outer rectangle: start on the top edge at the notch, run clockwise ──
  d.push(`M ${n(rows[0].right)} 0`);
  d.push(`H ${n(W - R)}`);
  d.push(arc(R, 1, W, R));
  d.push(`V ${n(H - R)}`);
  d.push(arc(R, 1, W - R, H));
  d.push(`H ${n(R)}`);
  d.push(arc(R, 1, 0, H - R));

  if (hasLeftNotch) {
    /*
      Come up the panel's left edge, stop at `stepY`, cut right by `leftInset`, drop
      to the card's bottom, then head right into the staircase. That encloses the
      block of panel at the bottom-left while leaving the top band touching the
      panel's left edge.

      north->east and east->south are right turns (sweep 1, convex corners of the
      panel block); south->east is a left turn (sweep 0), the concave corner where
      the panel tucks under the card.
    */
    d.push(`V ${n(stepY + nr)}`);
    d.push(arc(nr, 1, nr, stepY));
    d.push(`H ${n(leftInset - nr)}`);
    d.push(arc(nr, 1, leftInset, stepY + nr));
    d.push(`V ${n(bottomY - nr)}`);
    d.push(arc(nr, 0, leftInset + nr, bottomY));
  } else {
    // left edge runs straight up past the card, then rounds into the staircase
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
    const rel = (el: Element): Row => {
      const b = el.getBoundingClientRect();
      return { right: b.right - box.left, bottom: b.bottom - box.top };
    };

    const eb = rel(eyebrow);
    const measured = lines.map(rel);
    const ab = rel(actions);

    /*
      ── DESCENDING STAIRCASE, ENFORCED ──

      Each element is its own step: eyebrow, every headline line, then the button
      row. The eyebrow used to be merged into the first headline line, which cost
      the cut a notch — in the reference the eyebrow is a distinct narrow step that
      the headline steps out from.

      The important part is the loop. The cut only reads as a staircase if each row
      is at least as wide as every row beneath it, and I cannot get that by
      choosing the wording carefully: rendered width has almost nothing to do with
      character count. "needs and goals" is 15 characters and sets *wider* than
      "all your creative" at 17, because n/d/s/g/o/a are wide glyphs where
      l/y/r/i/t are narrow. Picking copy whose widths happen to descend is
      guesswork that breaks on the next content edit, and the failure mode is a
      visible bulge in the panel edge.

      So the geometry is enforced from the real measured boxes instead. Walking
      bottom-up, each row is widened to the widest row below it. That can only ever
      *grow* a row, so no glyph is ever clipped, and the result descends for any
      wording in any font.

      The eyebrow does not get a step of its own. It shares the first headline line's
      right edge, so the card's top edge is one straight run.

      This has now been wrong in both directions, so to be explicit: in the
      reference, at the eyebrow's height the dark card extends to exactly the same
      right edge as the first headline line. Any step here — even the 78%-floored one
      I tried — opens a band of panel between the eyebrow and the headline, which is
      the cream gap that keeps getting reported.

      The four steps come from the three headline lines and the button row, not from
      the eyebrow.
    */
    const body = [...measured, ab];
    for (let i = body.length - 2; i >= 0; i--) {
      body[i] = { ...body[i], right: Math.max(body[i].right, body[i + 1].right) };
    }
    const raw: Row[] = [
      { right: Math.max(eb.right, body[0].right), bottom: body[0].bottom },
      ...body.slice(1),
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

    /*
      The card's real offset from the panel's left edge, which drives the left notch.

      Read from the DOM rather than derived. Computing it here and writing it to state
      would measure the text at the *old* offset, leaving the notch a frame behind
      whenever the breakpoint changed. Reading it means the cut always lands exactly
      on the card's box, so it can never clip a glyph.
    */
    const leftInset = Math.max(0, card.getBoundingClientRect().left - box.left);

    setClipPath(buildPanelPath(W, H, rows, R, R, leftInset));
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
    /*
      `min-h-svh` on phones so the hero always occupies a full screen. The 9:16
      panel plus padding already comes to ~92% of a typical phone viewport, so this
      only tops up the remainder — and `svh` rather than `vh` because `vh` on
      mobile Safari measures the viewport *without* the browser chrome, which would
      push the bottom of the panel under the address bar. Released at `md`, where
      the 16:9 panel is taller than a screen already.
    */
    <section className="relative min-h-svh w-full bg-white transition-colors duration-300 md:min-h-0 dark:bg-[#111]">
      {/* No max-width — the gutter is the only thing that limits the panel, so it
          stays ~91% of the viewport at every size. Capping the width is what made
          the panel shrink on wide monitors.

          The gutter clamps at 120px rather than 160px for the same reason: at 160px
          a side the panel dropped below the reference's ~88% on a wide screen,
          which reads as the panel getting smaller as the screen gets bigger. */}
      <div
        className="w-full px-3 md:px-[clamp(28px,4.5vw,120px)]"
        style={{
          // must clear the mobile nav, which is 88px tall (py-6 + a 40px row)
          paddingTop: "clamp(100px, 11vw, 112px)",
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

          Phone: `aspect-[9/16]` — a true portrait panel, which is what makes it
          fill the screen. At 390px wide the panel is 366x651, and with the
          wrapper's padding the hero comes to ~781px of an 844px viewport. The
          full-screen feel is a consequence of the ratio, not a separate height
          rule fighting it.

          Both ratios are pure CSS. The JS-measured phone height this replaced
          existed only to reserve room for a video band, and there is nothing left
          to budget, so the measurement, its state and its convergence caveat are
          all gone.
        */}
        <div
          ref={panelRef}
          className="relative w-full aspect-[9/16] md:aspect-video"
          style={
            {
              /*
                The panel's own width, in the same terms CSS lays it out with: the
                viewport less the wrapper's `px-3` gutters. Published so the iframe
                can derive its 16:9 height from it in a *class*, which an inline
                style could not do — the value has to reach CSS for the `md:`
                override to switch back to `h-full`.
              */
              "--panel-w": "calc(100vw - 24px)",
            } as React.CSSProperties
          }
        >
          {/* The shadow caster that used to sit here is gone. It was an empty
              layer clipped to the same outline whose only job was to cast a
              drop-shadow the notch could follow; with the shadow dropped there is
              nothing left for it to do, and keeping it would mean a second
              clip-path recomputed on every resize for no visual result. */}

          {/* ── MEDIA ── the panel surface, clipped to the notched outline so the
              text card sits in the cutout. Its background colour is what shows
              around the video on phones, where the video is contained rather than
              cropped to fill. */}
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
              The iframe must always be exactly the video's 16:9 ratio. Cloudflare's
              player fits the video *inside* the iframe and paints its letterbox
              colour into whatever is left over, and those bars are drawn inside the
              iframe where no amount of styling the box can reach them. Matching the
              ratio is the only way to have none.

              Phone — contained, not covered. Full panel width, its implied 16:9
              height, centred vertically, so the whole frame is visible and the
              panel's own colour fills above and below it. That is what the
              reference does: the media sits in the panel with space around it
              rather than filling it.

              This replaced a cover crop, which was the arithmetic problem I had
              been describing rather than fixing — filling a 9:16 panel with a 16:9
              source shows only its middle 32%, so most of a graphics-and-text
              animation was cut away. Containing it costs nothing here because the
              panel is tall enough that the video still lands right under the notch.

              Desktop — the panel is already exactly 16:9, so `h-full` fills it edge
              to edge and the centring transform is switched off.
            */}
            <iframe
              src="https://customer-8l64zx8lmsynng2s.cloudflarestream.com/a2f314ee5d2cfcc77f3c3b61fddf5c75/iframe?muted=true&preload=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-8l64zx8lmsynng2s.cloudflarestream.com%2Fa2f314ee5d2cfcc77f3c3b61fddf5c75%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&controls=false"
              title="WhyCreatives showreel"
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              loading="eager"
              className="pointer-events-none absolute left-0 top-1/2 h-[calc(var(--panel-w)*9/16)] w-full -translate-y-1/2 border-none md:top-0 md:h-full md:translate-y-0"
            />
          </div>

          {/*
            ── TEXT CARD ──
            Must sit at `top-0`. This is not a style preference — `buildPanelPath`
            always starts the outline at `M rows[0].right 0` and walks the
            staircase back up to `V 0`, so the cut reaches the panel's top edge
            whatever the card does. Offsetting the card downward (I briefly had
            `top-[14%]`) therefore carves out the full-width region above it and
            leaves a large empty dark void over the eyebrow, which is exactly the
            broken shape in the screenshot. The reference has the card flush with
            the panel's top edge for the same reason.

            Flush left at every width — no `md:left-...` offset. That offset was a
            misreading of the reference. The dark rounded block at the far left of
            the reference screenshot is a separate decorative element sitting on the
            page, not part of the media panel: the panel's left edge is where the
            photograph begins, and the headline starts about three pixels inside it.
            The card and the panel share a left edge.

            Offsetting the card produced a `leftInset`, which switches on the
            `hasStrip` branch in the path builder and draws a thin dark column down
            the side of the card — plus, above that column, an exposed wedge of the
            panel's own rounded top-left corner. That pair is the "empty top
            section" in the screenshot, and neither exists in the reference.

            With `leftInset` at 0 the builder takes its else-branch, running the
            panel's left edge straight down past the card before rounding into the
            staircase: one clean cut out of the top-left corner.
          */}
          <div
            ref={cardRef}
            className="absolute left-0 top-0 z-10 flex flex-col items-start [--pad-l:12px] [--pad-r:16px] md:left-[min(7vw,104px)] md:[--pad-l:clamp(20px,2.2vw,34px)] md:[--pad-r:clamp(20px,2vw,30px)]"
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
                <span className="whitespace-nowrap text-[12px] font-medium leading-none text-black sm:text-[13px] lg:text-[15px] dark:text-white">
                  WhyCreatives
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
                fontSize: "clamp(1.6rem, 7.5vw, 104px)",
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
              {/* Contact link — visible on all screens now since the hero has
                  no eyebrow above it, the text card is shorter, and the second
                  line is narrower than "Meet the team". */}
              <Link
                to="/contact"
                className="group flex items-center gap-1.5 text-[14px] font-semibold text-black transition-opacity hover:opacity-60 lg:text-[15px] dark:text-white"
              >
                Start a project
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
