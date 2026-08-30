import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SERVICES } from "@/data/services";
import { ACCENT_ORANGE } from "@/lib/brand";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Two identical copies move exactly half of the track width, producing a seamless loop.
 * The animation is paused while this section is offscreen so it does not consume a
 * compositor layer for the rest of the unusually long services page.
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
 * The reference used a testimonial and client logos. Until approved material exists, this
 * keeps the same structure but uses the studio's own statement and the six real services;
 * it never fabricates an endorsement.
 *
 * Performance note: this panel used to attach a target-relative `useScroll` subscription
 * and move the entire clipped surface plus two oversized gradient layers on every scroll
 * update. That made the browser blend three large textures while the preceding sticky card
 * stack was still settling. The shell and decorative layers are now static. The existing
 * one-time content reveals preserve the arrival motion without keeping the panel in the
 * scroll path.
 */
export const ServiceClosing = () => {
  const ref = useRef<HTMLElement>(null);
  const isVisible = useInView(ref, { margin: "200px 0px" });

  return (
    <section
      ref={ref}
      className="px-3 pb-[clamp(24px,4vw,56px)] pt-[clamp(72px,11vw,176px)] sm:px-5 md:px-6"
    >
      <div className="relative isolate overflow-hidden rounded-[24px] bg-[#0a0a0a] px-5 py-14 text-white sm:px-8 sm:py-20 md:rounded-[40px] md:px-12 md:py-28 lg:px-16 lg:py-32">
        {/*
          A single low-contrast grid. It no longer needs overscan because it does not move;
          keeping it to the panel bounds reduces the raster area without changing the
          visible clipped result.
        */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[size:120px_120px] [mask-image:radial-gradient(ellipse_72%_44%_at_50%_12%,#000_0%,transparent_80%)] md:bg-[size:160px_160px]"
        />

        {/* A radial gradient is already soft, so no blur or animated overscan is needed. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.11]"
          style={{
            background: `radial-gradient(50% 38% at 50% 0%, ${ACCENT_ORANGE} 0%, ${ACCENT_ORANGE}40 32%, transparent 72%)`,
          }}
        />

        {/* Decorative and duplicated, so hidden from assistive technology. */}
        <div
          aria-hidden="true"
          className="relative -mx-5 mb-10 flex overflow-hidden border-y border-white/10 py-3 sm:-mx-8 md:-mx-12 md:mb-16 lg:-mx-16"
        >
          <div
            className="flex shrink-0 animate-[marquee-left_32s_linear_infinite] items-center motion-reduce:animate-none"
            style={{ animationPlayState: isVisible ? "running" : "paused" }}
          >
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
      </div>
    </section>
  );
};
