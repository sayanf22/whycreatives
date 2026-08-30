import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SERVICES } from "@/data/services";
import { ACCENT_ORANGE } from "@/lib/brand";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The strip that runs across the top of the panel.
 *
 * Two identical copies in one track, animated to exactly -50%: at that point copy two
 * sits precisely where copy one began, so the loop restarts with nothing to see. The
 * keyframes are the ones the footer marquee already uses, and it runs on `translate3d`,
 * which keeps it on the compositor rather than the main thread.
 */
const STRIP = [
  "Video & motion",
  "Web & app development",
  "Brand & social systems",
  "Performance marketing",
  "UGC & creator work",
  "Identity & design",
];

/**
 * The closing panel for the services page.
 *
 * ── What this is, and what it deliberately is not ──
 *
 * The reference for this section is a testimonial wall: a client quote attributed to a
 * named founder, over a grid of client logos under the words "trusted by industry
 * innovators". The structure is here — dark panel, grid, a statement, a marquee, cells on
 * the grid — and the content is not, because inventing it would mean putting a quote in a
 * real person's mouth and a set of logos next to a claim about who trusts this studio.
 *
 * `ClientStory` on the landing page already set this precedent, in its own words: "this
 * slot is where an approved client quote goes; it is deliberately not a testimonial
 * attributed to a person who has not signed off on the wording."
 *
 * So the statement is the studio's own, attributed to the studio. And the grid cells are
 * the six services you have just scrolled through rather than borrowed logos — which
 * turns out to be the more useful thing to put there anyway: it is a summary of the
 * section above at the moment you have finished reading it.
 *
 * Swap both together when there are real quotes and real logos to use. The layout will
 * take them unchanged.
 */
export const ServiceClosing = () => {
  const ref = useRef<HTMLElement>(null);

  /*
    `start end` to `end start` covers the whole time the panel is anywhere on screen, so
    the parallax has its full travel rather than being crammed into the last stretch.
  */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  /*
    Three layers at three rates, which is what parallax is: the further back a layer sits,
    the less it moves. The grid travels most, the glow about half as far and in the same
    direction, and the content is left alone — a panel whose copy slides around while you
    read it is harder to read, not more alive.

    All of it is `transform` and `opacity` on a handful of nodes, written straight to the
    DOM by Framer without a React render, so this costs a compositor pass and nothing else.
  */
  const gridY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const glowY = useTransform(scrollYProgress, [0, 1], ["-30%", "18%"]);
  /* The panel lifts into place as it arrives and settles. Continuous rather than a
     one-shot `whileInView`, so scrolling back up runs it in reverse. */
  const panelY = useTransform(scrollYProgress, [0, 0.35], [56, 0]);
  const panelOpacity = useTransform(scrollYProgress, [0, 0.22], [0, 1]);

  return (
    <section
      ref={ref}
      className="px-3 pb-[clamp(24px,4vw,56px)] pt-[clamp(72px,11vw,176px)] sm:px-5 md:px-6"
    >
      <motion.div
        className="relative isolate overflow-hidden rounded-[24px] bg-[#0a0a0a] px-5 py-14 text-white sm:px-8 sm:py-20 md:rounded-[40px] md:px-12 md:py-28 lg:px-16 lg:py-32"
        style={{ y: panelY, opacity: panelOpacity }}
      >
        {/*
          The grid: two repeating linear gradients, cheaper than an SVG or an image and it
          scales with the cell size rather than resampling.

          It is oversized and parallaxed, which is the whole reason it is a separate node:
          `-inset-y-1/4` gives it 25% of the panel's height of slack at each end, so it can
          travel without its edge ever entering the frame.

          ── Three things came down from the first version ──

          The fine mesh is gone. There were two grids stacked, a 12px one under a 96px one,
          on the theory that the fine one would read as texture. At that pitch it does not
          read as a grid at all, it reads as noise over the whole panel — and it was the
          thing making this look busy rather than structural. One grid, one pitch.

          The pitch is wider: 120px, and 160px from `md`. A grid is spacing before it is
          lines, and at 96px there were too many cells for the amount of content sitting on
          them.

          The lines are fainter, 0.028 rather than 0.055, and the mask now starts falling
          off immediately from a point near the top rather than holding full strength across
          the middle third. Between them the grid is a suggestion behind the statement and
          gone by the closing line, instead of ruled paper reaching the bottom edge.
        */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-y-1/4 inset-x-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[size:120px_120px] [mask-image:radial-gradient(ellipse_72%_44%_at_50%_24%,#000_0%,transparent_80%)] md:bg-[size:160px_160px]"
          style={{ y: gridY }}
        />

        {/*
          A single soft wash of the accent behind the top of the panel. It is what keeps the
          black from reading as flat, and it moves furthest of the three layers.

          No filter on it. It carried a 100px blur, which was pure waste: a radial gradient
          is already a soft edge, so the blur was spending a full-size GPU pass — on an
          oversized, moving element, on the same page as the card pile — to soften something
          that was not hard. Widening the gradient's falloff does the same job for free.

          Written out in words rather than as the utility name on purpose: Tailwind scans
          this file for class names and does not skip comments, so naming the class here
          would put the rule back in the stylesheet with nothing using it.
        */}
        {/*
          Down from 0.18 with a wider spread, which was reading as a brown haze over the top
          third rather than as a warm edge on the black. It only has to stop the panel being
          flat; once you can name the colour it is doing too much.
        */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-y-1/3 inset-x-0 -z-10 opacity-[0.11]"
          style={{
            y: glowY,
            background: `radial-gradient(50% 38% at 50% 16%, ${ACCENT_ORANGE} 0%, ${ACCENT_ORANGE}40 32%, transparent 72%)`,
          }}
        />

      {/* ── The strip ───────────────────────────────────────────────
          `aria-hidden` and duplicated: it is decoration, and a screen reader
          reading six capability labels twice is noise. The services are named
          properly in the grid below. */}
      <div
        aria-hidden="true"
        className="relative -mx-5 mb-10 flex overflow-hidden border-y border-white/10 py-3 sm:-mx-8 md:-mx-12 md:mb-16 lg:-mx-16"
      >
        <div className="flex shrink-0 animate-[marquee-left_32s_linear_infinite] items-center motion-reduce:animate-none">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {STRIP.map((label) => (
                <span
                  key={label}
                  className="flex shrink-0 items-center gap-4 whitespace-nowrap px-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45 sm:gap-6 sm:px-6 sm:text-[11px]"
                >
                  {label}
                  <span className="h-1 w-1 rounded-full bg-[#FF6B42]" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Statement + service grid ─────────────────────────────── */}
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-12">
        <figure className="lg:col-span-5">
          <motion.blockquote
            className="text-[clamp(1.25rem,2.1vw,2rem)] font-semibold leading-[1.3] tracking-[-0.025em] text-white"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          >
            &ldquo;Six services, one team, and the same standard across all of them.
            We would rather scope the work honestly than sell you a package you do not
            need.&rdquo;
          </motion.blockquote>

          {/* Attributed to the studio, not to a client. See the note above. */}
          <motion.figcaption
            className="mt-7 flex items-center gap-3 border-l-2 border-[#FF6B42] pl-4"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.25 }}
          >
            <span className="leading-tight">
              <span className="block text-xs font-bold uppercase tracking-[0.14em] text-white">
                WhyCreatives Studio
              </span>
              <span className="mt-1 block text-xs text-white/50">
                Creative, product &amp; growth team
              </span>
            </span>
          </motion.figcaption>
        </figure>

        {/* The six services as cells on the grid — one per cell, so the pattern behind
            reads as the thing they are sitting on. */}
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-3 lg:col-span-7">
          {SERVICES.map((service, index) => (
            <motion.li
              key={service.slug}
              className="bg-[#0a0a0a] p-4 sm:p-5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.1 + index * 0.06 }}
            >
              <span className="font-mono text-[10px] tracking-[0.16em] text-white/40">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-4 text-sm font-bold leading-tight tracking-[-0.02em] text-white sm:mt-6 sm:text-base">
                {service.display}
              </p>
              <p className="mt-1.5 text-[11px] leading-snug text-white/50 sm:text-xs">
                {service.title}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* ── The closing line ──────────────────────────────────────── */}
      <div className="mt-12 border-t border-white/10 pt-10 md:mt-20 md:pt-14">
        <motion.h2
          className="max-w-[22ch] text-[clamp(2.25rem,7vw,6rem)] font-bold leading-[0.95] tracking-[-0.045em] text-white"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          Let&rsquo;s build the next one together.
        </motion.h2>

        <motion.div
          className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center md:mt-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
        >
          {/* Full width on a phone, because at this size a centred pill in a wide dark
              panel reads as an afterthought rather than the point of the section. */}
          <Link
            to="/contact"
            className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#FF6B42] px-7 py-4 text-sm font-bold text-black transition-transform duration-300 ease-out hover:scale-[1.02] active:scale-[0.99] motion-reduce:transform-none sm:w-auto sm:text-base"
          >
            Connect with us
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black/15 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none">
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
          </Link>

          <p className="text-sm text-white/50 sm:ml-2">
            Tell us the goal. We will tell you what it actually needs.
          </p>
        </motion.div>
      </div>
      </motion.div>
    </section>
  );
};
