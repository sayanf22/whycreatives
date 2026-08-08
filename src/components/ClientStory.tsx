import { motion } from "framer-motion";
import { ArrowUpRight, Quote } from "lucide-react";
import { Link } from "react-router-dom";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The card is given an explicit height rather than an aspect ratio so the
 * overlap can be exact: STORY_OVERLAP is literally half of CARD_HEIGHT, which is
 * what makes the top half sit on the dark Expertise panel and the bottom half
 * sit on the page. Halving a clamp() is safe because every term scales linearly.
 *
 * The floor went from 320px to 440px. On a phone the clamp bottoms out, and at
 * 320px there was no room left: the quote bubble and its attribution chip take
 * roughly 150px at the top and the controls another 48px at the bottom, which
 * left the photograph as a strip and pushed the two halves into each other.
 */
const CARD_HEIGHT = "clamp(440px, 48vw, 640px)";

/** Exported because the Expertise panel above has to reserve exactly this much
 *  extra bottom padding. It was written out twice, so the two could drift and
 *  the card would land back on top of the last service row. */
export const STORY_OVERLAP = "clamp(220px, 24vw, 320px)";

/* Agency-owned copy. This slot is where an approved client quote goes; it is
   deliberately not a testimonial attributed to a person who has not signed off
   on the wording. Swap QUOTE/ATTRIBUTION together when one is available. */
const QUOTE = "One team from first idea to launch day";
const ATTRIBUTION = {
  name: "WhyCreatives Studio",
  role: "Creative, product & growth team",
};

export const ClientStory = () => (
  /*
    Sibling of the dark Expertise panel, pulled up over it. It cannot live
    inside that section: the section is overflow-hidden, so anything hanging
    past its edge would simply be cut off. `relative z-10` keeps the card above
    the panel it overlaps.
  */
  <div
    id="client-story"
    className="relative z-10 w-full scroll-mt-24 px-3 pb-[clamp(28px,4vw,64px)] sm:px-5 md:px-6"
    style={{ marginTop: `calc(-1 * ${STORY_OVERLAP})` }}
  >
    <motion.figure
      className="relative mx-auto w-full max-w-[1500px] overflow-hidden rounded-[24px] bg-secondary shadow-[0_40px_90px_-50px_rgba(0,0,0,0.7)] md:rounded-[40px]"
      style={{ height: CARD_HEIGHT }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <img
        src="/team-collab.webp"
        alt="The WhyCreatives team working together on a client project"
        width={1600}
        height={900}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Keeps the white bubble and the controls legible over any frame of the
          photograph without washing the image out. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-black/45 via-black/10 to-black/45"
      />

      {/* ── QUOTE BUBBLE (top-left) ─────────────────────────────── */}
      <div className="absolute left-3 top-3 max-w-[min(88%,30rem)] sm:left-6 sm:top-6 md:left-8 md:top-8">
        <motion.div
          className="relative rounded-2xl bg-white px-4 py-3.5 text-black sm:px-6 sm:py-5"
          initial={{ opacity: 0, y: -14, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ type: "spring", stiffness: 260, damping: 24, delay: 0.15 }}
        >
          <p
            className="font-bold tracking-[-0.03em]"
            style={{ fontSize: "clamp(1.05rem, 2.1vw, 2.1rem)", lineHeight: 1.14 }}
          >
            <Quote
              className="mr-1.5 inline-block h-[0.7em] w-[0.7em] -translate-y-[0.15em] text-black"
              strokeWidth={2.5}
              aria-hidden="true"
            />
            {QUOTE}
          </p>

          {/* Speech tail, so the bubble reads as spoken rather than as a label. */}
          <span
            aria-hidden="true"
            className="absolute -bottom-1.5 left-7 h-4 w-4 rotate-45 rounded-[3px] bg-white"
          />
        </motion.div>

        {/* Attribution chip sits under the bubble, as its own surface. */}
        <motion.figcaption
          className="mt-3 inline-flex items-center gap-2.5 rounded-xl bg-white px-3 py-2 text-black sm:gap-3 sm:px-3.5 sm:py-2.5"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.32 }}
        >
          <img
            src="/logo.png"
            alt=""
            width={36}
            height={36}
            loading="lazy"
            decoding="async"
            className="h-8 w-8 shrink-0 rounded-full object-cover sm:h-9 sm:w-9"
          />
          <span className="leading-tight">
            <span className="block text-xs font-bold sm:text-sm">
              {ATTRIBUTION.name}
            </span>
            <span className="block text-[10px] text-black/50 sm:text-xs">
              {ATTRIBUTION.role}
            </span>
          </span>
        </motion.figcaption>
      </div>

      {/* ── CONTROLS ─────────────────────────────────────────────────
          One row across the bottom of the card instead of two independent
          absolute blocks anchored to opposite corners.

          That split was what broke the phone layout. The round button needs
          about 44px, "See client work" about 130px and "About the studio" about
          140px — 320px of controls on a card only ~360px wide, in two boxes that
          could not see each other, so they simply overlapped. Here they share a
          flex row and the phone gets a layout that fits: the round button is
          dropped (it pointed at /our-work, exactly like the pill next to it, so
          nothing is lost) and the two pills stack right-aligned. */}
      <motion.div
        className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-3 sm:inset-x-6 sm:bottom-6 md:inset-x-8 md:bottom-8"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
      >
        {/* Kept as a real link rather than a decorative play button, so nothing
            on the card is a dead control while there is no video asset. */}
        <Link
          to="/our-work"
          aria-label="See client work"
          className="group hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 ease-out hover:scale-110 active:scale-95 motion-reduce:transform-none sm:flex sm:h-14 sm:w-14"
        >
          <ArrowUpRight
            className="h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"
            strokeWidth={2.5}
          />
        </Link>

        {/* `ml-auto` rather than a spacer, so this group stays hard right once
            the round button is hidden. */}
        <div className="ml-auto flex flex-col items-end gap-2 sm:flex-row sm:items-center">
          <Link
            to="/our-work"
            className="group inline-flex items-center gap-2 rounded-full bg-white py-2 pl-4 pr-2 text-[11px] font-bold text-black transition-colors duration-300 hover:bg-white/85 sm:text-xs"
          >
            See client work
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black/15 transition-transform duration-300 ease-out group-hover:translate-x-0.5 motion-reduce:transform-none">
              <ArrowUpRight className="h-3 w-3" strokeWidth={3} />
            </span>
          </Link>
          <Link
            to="/about-us"
            className="group inline-flex items-center gap-2 rounded-full bg-black/85 py-2 pl-4 pr-2 text-[11px] font-bold text-white transition-colors duration-300 hover:bg-black sm:text-xs"
          >
            About the studio
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 ease-out group-hover:translate-x-0.5 motion-reduce:transform-none">
              <ArrowUpRight className="h-3 w-3" strokeWidth={3} />
            </span>
          </Link>
        </div>
      </motion.div>
    </motion.figure>
  </div>
);
