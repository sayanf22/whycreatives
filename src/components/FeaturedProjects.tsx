import { useEffect, useState } from "react";
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
    tags: ["Next.js", "iOS & Android"],
    href: "/our-work",
  },
  {
    id: 3,
    year: "2024",
    client: "WhyCreatives UGC",
    title: "@AreyParo UGC reels, viral scriptwriting & creator marketing",
    image: "/whycreatives-ugc.webp",
    tags: ["UGC Reels", "Social Growth"],
    href: "/our-work",
  },
  {
    id: 4,
    year: "2023",
    client: "NTH Studio",
    title: "Conversion-focused website design and front-end build",
    image: "/project-nth.webp",
    tags: ["Website", "Web Design"],
    href: "/our-work",
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
          onMouseEnter={handleEnter}
          onMouseMove={finePointer ? track : undefined}
          onMouseLeave={() => setHovered(false)}
          className="relative mb-5 aspect-[4/3] w-full overflow-hidden rounded-2xl bg-secondary md:rounded-3xl lg:cursor-none"
        >
          <div className="pointer-events-none absolute right-4 top-4 z-10 flex flex-wrap justify-end gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-background/80 px-3 py-1.5 text-[10px] font-bold text-foreground backdrop-blur-md"
              >
                {tag}
              </span>
            ))}
          </div>

          <img
            src={project.image}
            alt={project.title}
            width={1200}
            height={900}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none"
          />
        </div>

        <div className="mb-2 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          <span>{project.year}</span>
          <span aria-hidden="true">&bull;</span>
          <span>{project.client}</span>
        </div>

        <h3
          className="text-foreground transition-colors duration-300 group-hover:text-muted-foreground"
          style={{
            fontSize: "clamp(1.15rem, 1.7vw, 1.6rem)",
            lineHeight: 1.22,
            letterSpacing: "-0.02em",
            fontWeight: 600,
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
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
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
