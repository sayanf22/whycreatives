import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { RevealLines } from "@/components/RevealLines";
import { ProjectTextStage, type Phrase } from "@/components/ProjectTextStage";
import { NotchedFrame } from "@/components/NotchedFrame";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Buttery trailing follow, so the cursor lags the pointer just slightly. */
const CURSOR_SPRING = { stiffness: 400, damping: 28, mass: 0.5 } as const;

/** Horizontal gutter on the section, and the gap between the two columns. */
const GUTTER = "clamp(32px, 6vw, 160px)";
const COLUMN_GAP = "56px"; /* lg:gap-x-14 */

/**
 * Exactly half a card's height, so a staggered card starts level with the
 * vertical centre of the one beside it.
 *
 * This was a flat `mt-24` — 96px, which is nowhere near half a card and left the
 * right column looking almost aligned with the left rather than deliberately
 * offset. It has to be derived, because the card height is a function of the
 * viewport: each column is `(100vw - 2 gutters - gap) / 2` wide and the media is
 * 4:3, so the height is 0.75 of that and half the height is 0.375 of it —
 * 0.1875 once the /2 for the column is folded in.
 */
const HALF_CARD = `calc(0.1875 * (100vw - 2 * ${GUTTER} - ${COLUMN_GAP}))`;

type Project = {
  id: number;
  year: string;
  client: string;
  title: string;
  /** Fallback photograph, used when the card has no `stage`. */
  image: string;
  tags: string[];
  href: string;
  /**
   * When present the card shows an animated text panel instead of a
   * photograph. Panels alternate tone so the grid reads black / white / black.
   */
  stage?: { tone: "light" | "dark"; phrases: Phrase[] };
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
    /* Tones alternate down the grid — light, dark, light, dark — so the four
       panels read as a set rather than four identical screens. Colours are
       picked per tone: saturated on the light panels, brightened on the dark
       ones, so contrast holds either way. */
    stage: {
      tone: "light",
      phrases: [
        { words: ["Brand", "identity"], color: "#4F46E5" },
        { words: ["Clear", "positioning"], color: "#DB2777" },
        { words: ["Creative", "direction"], color: "#EA580C" },
        { words: ["One", "clear", "voice"], color: "#111111" },
      ],
    },
  },
  {
    id: 2,
    year: "2024",
    client: "Web & Mobile Apps",
    title: "Custom web & mobile apps on production-ready architecture",
    image: "/whycreatives-app.webp",
    tags: ["Web", "Apps"],
    href: "/our-work",
    /* No vendor names on this section. Naming the stack here dates the work and
       says nothing to a buyer — the specific tools belong on the service pages,
       where the choice can be explained. */
    stage: {
      tone: "dark",
      phrases: [
        { words: ["Web", "and", "apps"], color: "#67E8F9" },
        { words: ["Production", "ready"], color: "#A5B4FC" },
        { words: ["Grows", "with", "you"], color: "#F9A8D4" },
        { words: ["Secure", "by", "design"], color: "#FFFFFF" },
      ],
    },
  },
  {
    id: 3,
    year: "2024",
    client: "WhyCreatives UGC",
    title: "UGC reels, viral scriptwriting & creator marketing",
    image: "/whycreatives-ugc.webp",
    tags: ["UGC Reels", "Social"],
    href: "/our-work",
    /* Dark here, light on card 04 — that flips the grid from two parallel
       columns (left always light, right always dark) into a checkerboard, so
       the tones also cross on the diagonal. */
    stage: {
      tone: "dark",
      phrases: [
        { words: ["UGC", "reels"], color: "#F9A8D4" },
        { words: ["Hooks", "that", "hold"], color: "#FDE047" },
        { words: ["Real", "product", "stories"], color: "#5EEAD4" },
        { words: ["Made", "to", "convert"], color: "#FFFFFF" },
      ],
    },
  },
  {
    id: 4,
    year: "2023",
    client: "NTH Studio",
    title: "Conversion-focused website design and front-end build",
    image: "/project-nth.webp",
    tags: ["Website", "SEO"],
    href: "/our-work",
    stage: {
      tone: "light",
      phrases: [
        { words: ["Website", "design"], color: "#7C3AED" },
        { words: ["Front-end", "build"], color: "#0891B2" },
        { words: ["Fast", "by", "default"], color: "#DB2777" },
        { words: ["Search", "ready"], color: "#111111" },
      ],
    },
  },
];

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
  style,
}: {
  project: Project;
  index: number;
  className?: string;
  /** Used for the derived half-card offset, which cannot be a Tailwind class. */
  style?: React.CSSProperties;
}) => {
  const finePointer = useFinePointer();
  const [hovered, setHovered] = useState(false);

  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const cursorX = useSpring(targetX, CURSOR_SPRING);
  const cursorY = useSpring(targetY, CURSOR_SPRING);

  /* Held here rather than inside NotchedFrame because the cursor maths needs
     the same box the notch is measured from. */
  const frameRef = useRef<HTMLDivElement>(null);

  /**
   * Pointer position relative to the card's image box.
   *
   * The cursor is absolutely positioned within this box rather than fixed to the
   * viewport, so it needs local coordinates. Absolute positioning also means the
   * card's scroll-in transform moves the cursor with it, which is why no portal
   * is required.
   */
  const localPoint = (e: React.MouseEvent) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return null;
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const track = (e: React.MouseEvent) => {
    const point = localPoint(e);
    if (!point) return;
    targetX.set(point.x);
    targetY.set(point.y);
  };

  const handleEnter = (e: React.MouseEvent) => {
    // Set regardless of pointer type: this also drives the tag motion, which is
    // not restricted to devices that get the custom cursor.
    setHovered(true);
    if (!finePointer) return;

    const point = localPoint(e);
    if (!point) return;
    targetX.set(point.x);
    targetY.set(point.y);
    // Snap the spring to the entry point, otherwise the circle visibly flies in
    // from wherever the pointer last left this card.
    cursorX.jump(point.x);
    cursorY.jump(point.y);
  };

  return (
    <motion.article
      className={className}
      style={style}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <Link to={project.href} className="group block">
        {/* cursor-none is scoped to the media only, so the caption below stays
            selectable with a normal pointer. The notch geometry itself lives in
            NotchedFrame, shared with the portfolio gallery. */}
        <NotchedFrame
          frameRef={frameRef}
          onMouseEnter={handleEnter}
          onMouseMove={finePointer ? track : undefined}
          onMouseLeave={() => setHovered(false)}
          className="mb-5 aspect-[4/3] lg:cursor-none"
          radiusClassName="rounded-2xl md:rounded-3xl"
          tagsClassName="gap-2.5"
          tagsPaddedClassName="pb-5 pl-6"
          metaClassName="gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground"
          metaPaddedClassName="pr-6 pt-5"
          tags={project.tags.map((tag, i) => (
            /* Pills settle downward and reach full strength on hover. Both are
               transforms/opacity only, so the measured notch never shifts. */
            <motion.span
              key={tag}
              animate={
                hovered
                  ? { y: 5, opacity: 1, scale: 1.04 }
                  : { y: 0, opacity: 0.82, scale: 1 }
              }
              transition={{
                type: "spring",
                stiffness: 420,
                damping: 26,
                delay: hovered ? i * 0.05 : 0,
              }}
              className="whitespace-nowrap rounded-full bg-foreground px-4 py-2 text-xs font-bold text-background"
            >
              {tag}
            </motion.span>
          ))}
          meta={
            <>
              <span>{project.year}</span>
              <span aria-hidden="true">&bull;</span>
              <span className="whitespace-nowrap">{project.client}</span>
            </>
          }
          overlay={
            /*
              Tracking cursor sits alongside the clipped layer, not inside it.
              Inside, the media's own clip-path and overflow-hidden trimmed the
              circle away whenever the pointer neared an edge or a notch, so it
              appeared to vanish. Out here it stays whole and can overlap the cut
              corners.
            */
            <AnimatePresence>
              {finePointer && hovered && (
                <motion.div
                  style={{ x: cursorX, y: cursorY }}
                  initial={{ scale: 0.2, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 24,
                      mass: 0.6,
                    },
                  }}
                  exit={{
                    scale: 0.2,
                    opacity: 0,
                    transition: { duration: 0.35, ease: EASE },
                  }}
                  /* -ml-8/-mt-8 is half of h-16/w-16, centring the circle on the
                     pointer without a second transform fighting x/y. */
                  className="pointer-events-none absolute left-0 top-0 z-30 -ml-8 -mt-8 flex h-16 w-16 items-center justify-center rounded-full bg-foreground text-background shadow-[0_12px_35px_rgba(0,0,0,0.28)]"
                >
                  {/* Arrow trails the puck slightly so the circle reads as
                      growing into an arrow rather than both snapping in. */}
                  <motion.span
                    className="flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.4, rotate: -25 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotate: 0,
                      transition: { duration: 0.3, ease: EASE, delay: 0.08 },
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.4,
                      transition: { duration: 0.15, ease: EASE },
                    }}
                  >
                    <ArrowUpRight className="h-6 w-6" strokeWidth={2.5} />
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>
          }
        >
          <>
            {project.stage ? (
              /* The zoom stays on a wrapper so the panel scales like the photo
                 it replaces, while the type inside is never transformed —
                 scaling text mid-blur reads as a rendering glitch. */
              <div className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transform-none">
                <ProjectTextStage
                  tone={project.stage.tone}
                  phrases={project.stage.phrases}
                  seed={index}
                />
              </div>
            ) : (
              <img
                src={project.image}
                alt={project.title}
                width={1200}
                height={900}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                className="h-full w-full grayscale contrast-110 object-cover transition-[filter,transform] duration-500 ease-out group-hover:scale-105 group-hover:contrast-125 motion-reduce:transform-none"
              />
            )}

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
          </>
        </NotchedFrame>

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

    </motion.article>
  );
};

export const FeaturedProjects = () => {
  return (
    <section
      aria-labelledby="featured-projects-heading"
      className="w-full bg-background px-4 font-['Schibsted_Grotesk',sans-serif] text-foreground md:px-[clamp(32px,6vw,160px)]"
      style={{
        paddingTop: "clamp(64px, 8vw, 132px)",
        paddingBottom: "clamp(64px, 8vw, 132px)",
      }}
    >
      {/*
        Explicit desktop placement rather than two hand-built columns. The header
        comes first in the DOM, so the mobile stack reads header, then projects
        in order; previously it sat inside the right-hand column and surfaced
        halfway down the phone layout, after the first two projects.
      */}
      <div className="grid grid-cols-1 items-start gap-y-16 lg:grid-cols-2 lg:gap-x-14 lg:gap-y-32">
        <div className="lg:col-start-2 lg:row-start-1">
          <motion.div
            className="mb-4 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
            Selected work
          </motion.div>

          <Link to="/our-work" className="group inline-block">
            <h2
              id="featured-projects-heading"
              className="text-foreground transition-colors duration-300 group-hover:text-muted-foreground"
              style={{
                fontSize: "clamp(2.1rem, 4vw, 4.5rem)",
                lineHeight: 1.04,
                letterSpacing: "-0.04em",
                fontWeight: 600,
              }}
            >
              <RevealLines
                lines={["Design in the", "real world \u2197"]}
                className="block"
                nowrapFromLg
              />
            </h2>
          </Link>

          {/* One team across every discipline, and work that keeps up as the
              business gets bigger. */}
          <motion.p
            className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.2 }}
          >
            Brand, video, web and apps handled by one team &mdash; built so the
            work scales up as your business does, instead of being rebuilt.
          </motion.p>
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
        {/*
          The offset is delivered as a CSS variable and consumed by a `lg:` class,
          not applied as a plain inline `marginTop`. An inline style has no
          breakpoint, so it would also push this card down on a phone, where the
          grid is a single column and there is nothing to sit beside.
        */}
        <ProjectCard
          project={PROJECTS[3]}
          index={3}
          className="lg:col-start-2 lg:row-start-3 lg:mt-[var(--half-card)]"
          style={{ "--half-card": HALF_CARD } as React.CSSProperties}
        />
      </div>
    </section>
  );
};
