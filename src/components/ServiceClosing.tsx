import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SERVICES } from "@/data/services";

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
export const ServiceClosing = () => (
  <section className="px-3 pt-[clamp(48px,7vw,104px)] sm:px-5 md:px-6">
    <motion.div
      /*
        The grid is two repeating linear gradients — cheaper than an SVG or an image, and
        it scales with the cell size rather than resampling. The mask fades it out towards
        the edges so it reads as texture instead of as graph paper, and the cells are
        smaller on a phone so the pattern stays in proportion to the panel.
      */
      className="relative isolate overflow-hidden rounded-[24px] bg-[#0a0a0a] px-5 py-10 text-white sm:px-8 sm:py-14 md:rounded-[40px] md:px-12 md:py-20 lg:px-16"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:38px_38px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,#000_45%,transparent_100%)] md:bg-[size:56px_56px]"
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
