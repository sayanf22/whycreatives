import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { RevealLines } from "@/components/RevealLines";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Buttery trailing follow, so the cursor lags the pointer just slightly. */
const CURSOR_SPRING = { stiffness: 400, damping: 28, mass: 0.5 } as const;

type Project = {
  id: number;
  year: string;
  client: string;
  title: string;
  image: string;
  tags: string[];
  href: string;
};

/* Images are the already-optimised WebP assets in /public — no new raster
   payload is introduced by this section. */
const PROJECTS: Project[] = [
  {
    id: 1,
    year: "2024",
    client: "WhyCreatives Branding",
    title: "Minimalist brand identity, positioning & creative direction",
    image: "/whycreatives-brand.webp",
    tags: ["Branding", "Strategy"],
    href: "/our-work",
  },
  {
    id: 2,
    year: "2024",
    client: "Web & Mobile Apps",
    title: "Custom web & mobile apps built on Next.js, Node.js and Supabase",
    image: "/whycreatives-app.webp",
    tags: ["Next.js", "Apps"],
    href: "/our-work",
  },
  {
    id: 3,
    year: "2024",
    client: "WhyCreatives UGC",
    title: "@AreyParo UGC reels, viral scriptwriting & creator marketing",
    image: "/whycreatives-ugc.webp",
    tags: ["UGC Reels", "Social"],
    href: "/our-work",
  },
  {
    id: 4,
    year: "2023",
    client: "NTH Studio",
    title: "Conversion-focused website design and front-end build",
    image: "/project-nth.webp",
    tags: ["Website", "SEO"],
    href: "/our-work",
  },
];

const n = (v: number) => Math.round(v * 100) / 100;
const arc = (r: number, sweep: 0 | 1, x: number, y: number) =>
  `A ${n(r)} ${n(r)} 0 0 ${sweep} ${n(x)} ${n(y)}`;

type Notch = { w: number; h: number };

/**
 * Outline of a `W` x `H` image with a notch removed from the top-right corner
 * and a matching one from the bottom-left, so the page shows through behind the
 * tag strip and the caption.
 *
 * Same language as the hero's staircase panel: `R` rounds the card's own
 * corners, `r` fillets each notch. Traversed clockwise with the interior on the
 * right, so each notch's two 90-degree corners take sweep 1 while its reflex
 * inner elbow takes sweep 0 to curve the opposite way.
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
    arc(r, 1, W - top.w, r), // top edge turns down into the notch
    `V ${n(top.h - r)}`,
    arc(r, 0, W - top.w + r, top.h), // inner elbow
    `H ${n(W - r)}`,
    arc(r, 1, W, top.h + r), // notch floor turns down the right edge
    `V ${n(H - R)}`,
    arc(R, 1, W - R, H),
    // ── bottom-left notch ──
    `H ${n(bottom.w + r)}`,
    arc(r, 1, bottom.w, H - r), // bottom edge turns up into the notch
    `V ${n(H - bottom.h + r)}`,
    arc(r, 0, bottom.w - r, H - bottom.h), // inner elbow
    `H ${n(r)}`,
    arc(r, 1, 0, H - bottom.h - r), // notch ceiling turns up the left edge
    `V ${n(R)}`,
    arc(R, 1, R, 0),
    "Z",
  ].join(" ");
}

/**
 * True only for real mouse pointers on desktop widths.
 *
 * Both halves matter: `pointer: fine` keeps the tracking cursor off touch
 * devices, where it would leave a ghost circle stuck after a tap, and the width
 * check keeps it off small windows where the layout is a plain stack.
 */
const useFinePointer = () => {
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (min-width: 1024px)");
    setFinePointer(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setFinePointer(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return finePointer;
};

/**
 * One portfolio card, owning its own cursor state.
 *
 * Tracking is deliberately local rather than lifted to the section: a single
 * shared cursor makes every card re-render on each pointer move and lets cards
 * fight over one hover flag when the pointer crosses between them. Position
 * comes from the container's own `onMouseMove`, so there is no window-level
 * listener running while nothing is hovered.
 */
const ProjectCard = ({
  project,
  index,
  className = "",
}: {
  project: Project;
  index: number;
  className?: string;
}) => {
  const finePointer = useFinePointer();
  const [hovered, setHovered] = useState(false);

  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const cursorX = useSpring(targetX, CURSOR_SPRING);
  const cursorY = useSpring(targetY, CURSOR_SPRING);

  // ── notch geometry ────────────────────────────────────────────────
  const frameRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const [clip, setClip] = useState<string | null>(null);

  const measure = useCallback(() => {
    const frame = frameRef.current;
    const tags = tagsRef.current;
    const meta = metaRef.current;
    if (!frame || !tags || !meta) return;

    const W = frame.clientWidth;
    const H = frame.clientHeight;
    const top = { w: tags.offsetWidth, h: tags.offsetHeight };
    const bottom = { w: meta.offsetWidth, h: meta.offsetHeight };

    // Radius is read back from CSS rather than hard-coded, so the clipped shape
    // always agrees with whatever `rounded-*` utility is in play at this
    // breakpoint.
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

    // Fall back to plain rounded corners if a strip outgrows the card, or if the
    // two notches would meet in the middle.
    const fits =
      top.w + r + R <= W &&
      bottom.w + r + R <= W &&
      top.h + r + R <= H &&
      bottom.h + r + R <= H &&
      top.h + bottom.h + 2 * r < H;
    if (!fits) return setClip(null);

    setClip(buildNotchedPath(W, H, top, bottom, R, r));
  }, []);

  useLayoutEffect(() => {
    measure();
    const frame = frameRef.current;
    const tags = tagsRef.current;
    const meta = metaRef.current;
    if (!frame || !tags || !meta) return;
    // Each strip resizes with its own text metrics, which the card's resize does
    // not capture, so all three are observed.
    const ro = new ResizeObserver(() => measure());
    ro.observe(frame);
    ro.observe(tags);
    ro.observe(meta);
    return () => ro.disconnect();
  }, [measure]);

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

  const track = (e: React.MouseEvent) => {
    targetX.set(e.clientX);
    targetY.set(e.clientY);
  };

  const handleEnter = (e: React.MouseEvent) => {
    if (!finePointer) return;
    track(e);
    // Snap the spring to the entry point. Without this the circle visibly flies
    // across the screen from wherever the pointer last left this card.
    cursorX.jump(e.clientX);
    cursorY.jump(e.clientY);
    setHovered(true);
  };

  return (
    <motion.article
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <Link to={project.href} className="group block">
        {/* cursor-none is scoped to the image only, so the caption below stays
            selectable with a normal pointer. */}
        <div
          ref={frameRef}
          onMouseEnter={handleEnter}
          onMouseMove={finePointer ? track : undefined}
          onMouseLeave={() => setHovered(false)}
          className="relative mb-5 aspect-[4/3] w-full rounded-2xl md:rounded-3xl lg:cursor-none"
        >
          {/*
            Both strips sit in their notches, on the page background rather than
            on the photo. They are measured, so each cut matches its content.
            The padding is what sets the size of the step, so it is generous.
          */}
          {/* When the notch cannot fit (very narrow screens) the strips end up
              sitting directly on the photo, so they take a solid backing there
              to stay legible. Adding padding only ever grows them, so this
              cannot flip the fit test back and forth. */}
          <div
            ref={tagsRef}
            className={`absolute right-0 top-0 z-20 flex items-center gap-2.5 ${
              clip ? "pb-5 pl-6" : "rounded-bl-2xl bg-background/95 p-3"
            }`}
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="whitespace-nowrap rounded-full border border-foreground/10 bg-secondary px-4 py-2 text-xs font-bold text-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Caption lives in the opposite step, which is what gives the card
              its staircase on both diagonals. */}
          <div
            ref={metaRef}
            className={`absolute bottom-0 left-0 z-20 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground ${
              clip ? "pr-6 pt-5" : "rounded-tr-2xl bg-background/95 p-3"
            }`}
          >
            <span>{project.year}</span>
            <span aria-hidden="true">&bull;</span>
            <span className="whitespace-nowrap">{project.client}</span>
          </div>

          {/* Everything visual is clipped to the notched outline. */}
          <div
            className="absolute inset-0 overflow-hidden rounded-2xl bg-secondary md:rounded-3xl"
            style={{
              clipPath: clip ? `path("${clip}")` : undefined,
              WebkitClipPath: clip ? `path("${clip}")` : undefined,
            }}
          >
            <img
              src={project.image}
              alt={project.title}
              width={1200}
              height={900}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none"
            />

            {/* Hover info: a soft veil lifts the type off the photo, and the
                label wipes up from behind its own mask. */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 via-black/25 to-transparent opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />
            {/* Anchored bottom-right: the bottom-left corner is now cut away by
                the second notch, so a label there would be clipped off. */}
            <div className="pointer-events-none absolute bottom-6 right-6 overflow-hidden">
              <span className="flex translate-y-full items-center gap-2 text-sm font-bold text-white transition-transform duration-[550ms] ease-out group-hover:translate-y-0 motion-reduce:transform-none">
                View project
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
              </span>
            </div>
          </div>
        </div>

        <h3
          className="text-foreground transition-colors duration-300 group-hover:text-muted-foreground"
          style={{
            fontSize: "clamp(1.2rem, 1.8vw, 1.7rem)",
            lineHeight: 1.2,
            letterSpacing: "-0.025em",
            fontWeight: 700,
          }}
        >
          {project.title}
        </h3>
      </Link>

      {/*
        Portalled to <body> on purpose. A `fixed` element is positioned against
        the nearest transformed ancestor, and this card animates on a transform
        as it scrolls in — leaving the cursor inside would tie it to the card
        instead of the viewport. `finePointer` is false until the client effect
        runs, so this never touches `document` during a prerender.
      */}
      {finePointer &&
        createPortal(
          <AnimatePresence>
            {hovered && (
              <motion.div
                style={{ x: cursorX, y: cursorY }}
                initial={{ scale: 0.3, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  transition: { type: "spring", stiffness: 400, damping: 28 },
                }}
                /* Eased fade rather than a spring to zero. Snapping straight to
                   scale 0 made the circle vanish the instant the pointer left
                   the image; this lets it ease away instead. */
                exit={{
                  scale: 0.4,
                  opacity: 0,
                  transition: { duration: 0.4, ease: EASE },
                }}
                /* -ml-10/-mt-10 is half of h-20/w-20, which centres the circle
                   on the pointer tip without a second transform fighting x/y. */
                className="pointer-events-none fixed left-0 top-0 z-[100] -ml-10 -mt-10 flex h-20 w-20 items-center justify-center rounded-full bg-[#b5ff2b] text-black shadow-xl"
              >
                <ArrowUpRight className="h-7 w-7" strokeWidth={2.5} />
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </motion.article>
  );
};

export const FeaturedProjects = () => {
  return (
    <section
      className="w-full bg-background px-4 font-['Schibsted_Grotesk',sans-serif] md:px-[clamp(32px,6vw,160px)]"
      style={{
        paddingTop: "clamp(56px, 7vw, 120px)",
        paddingBottom: "clamp(56px, 7vw, 120px)",
      }}
    >
      {/*
        Explicit desktop placement rather than two hand-built columns. The header
        comes first in the DOM, so the mobile stack reads header, then projects
        in order; previously it sat inside the right-hand column and surfaced
        halfway down the phone layout, after the first two projects.
      */}
      <div className="grid grid-cols-1 items-start gap-y-14 lg:grid-cols-2 lg:gap-x-14 lg:gap-y-24">
        <div className="lg:col-start-2 lg:row-start-1">
          <motion.div
            className="mb-4 flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground"
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
            Our Work
          </motion.div>

          <Link to="/our-work" className="group inline-block">
            <h2
              className="text-foreground transition-colors duration-300 group-hover:text-muted-foreground"
              style={{
                fontSize: "clamp(2.1rem, 4vw, 4.5rem)",
                lineHeight: 1.04,
                letterSpacing: "-0.04em",
                fontWeight: 600,
              }}
            >
              <RevealLines
                lines={["Take a look at", "our projects \u2197"]}
                className="block"
                nowrapFromLg
              />
            </h2>
          </Link>
        </div>

        {/* The opening card spans both header rows, which is what creates the
            asymmetry: the right column starts lower than the left. */}
        <ProjectCard
          project={PROJECTS[0]}
          index={0}
          className="lg:col-start-1 lg:row-start-1 lg:row-span-2"
        />
        <ProjectCard
          project={PROJECTS[1]}
          index={1}
          className="lg:col-start-2 lg:row-start-2"
        />
        <ProjectCard
          project={PROJECTS[2]}
          index={2}
          className="lg:col-start-1 lg:row-start-3"
        />
        <ProjectCard
          project={PROJECTS[3]}
          index={3}
          className="lg:col-start-2 lg:row-start-3 lg:mt-24"
        />
      </div>
    </section>
  );
};
