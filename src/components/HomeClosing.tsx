import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ACCENT_ORANGE } from "@/lib/brand";

const EASE = [0.16, 1, 0.3, 1] as const;

/*
  The email, phone and location that were listed under the rule are gone. They are all in
  the footer, which sits directly below this block — the same three lines twice within a
  screen of each other, the second time without the labels or the layout the footer gives
  them. This block is the statement and the way through to /contact; the details belong to
  the footer.
*/

/**
 * One row of the oversized ghost lettering behind the button.
 *
 * Two identical copies in a single track, travelling exactly half its width, so at the end
 * of the cycle copy two sits precisely where copy one began and the loop restarts with
 * nothing to see. The keyframes are the pair the footer marquee already uses, and they
 * animate `translate3d`, which keeps both rows on the compositor.
 *
 * `aria-hidden`, and the text is repeated: it is texture, not content. The real call to
 * action is the link on top of it.
 */
const GhostRow = ({
  reverse = false,
  outlined = false,
  seconds,
}: {
  reverse?: boolean;
  outlined?: boolean;
  seconds: number;
}) => (
  <div aria-hidden="true" className="flex select-none overflow-hidden">
    <div
      className={`flex shrink-0 ${
        reverse
          ? "animate-[marquee-right_linear_infinite]"
          : "animate-[marquee-left_linear_infinite]"
      } motion-reduce:animate-none`}
      style={{ animationDuration: `${seconds}s` }}
    >
      {[0, 1].map((copy) => (
        <div key={copy} className="flex shrink-0">
          {[0, 1, 2].map((word) => (
            <span
              key={word}
              /*
                `-webkit-text-stroke` rather than a border or an SVG outline: it follows the
                letterforms exactly, costs nothing, and is supported everywhere this site
                runs. The filled row sits far enough back to read as a shadow of the
                outlined one rather than as a second piece of copy.
              */
              className={`whitespace-nowrap px-4 text-[clamp(3rem,11vw,9rem)] font-bold uppercase leading-[0.95] tracking-[-0.04em] sm:px-8 ${
                outlined
                  ? "text-transparent [-webkit-text-stroke:1px_hsl(var(--foreground)/0.22)] sm:[-webkit-text-stroke:1.5px_hsl(var(--foreground)/0.22)]"
                  : "text-foreground/[0.07]"
              }`}
            >
              Let&rsquo;s connect
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

/**
 * The closing block on the landing page: a statement, a rule, and the link out sitting on
 * two rows of oversized moving lettering.
 *
 * ── Why the lettering is a CSS animation and the rest is scroll-driven ──
 *
 * The two are doing different jobs. The lettering runs continuously whether you scroll or
 * not, which is what makes the block feel alive when you land on it — that has to be a
 * plain CSS animation on the compositor, because a scroll-driven one stops dead the moment
 * you stop moving. The statement arrives once, in sequence, when you reach it, and the rule
 * draws itself against scroll position.
 */
export const HomeClosing = () => {
  const ref = useRef<HTMLElement>(null);

  /*
    `start end` to `end start` is the whole time the section is anywhere on screen, so the
    parallax has its full travel to play with rather than being crammed into the tail.
  */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  /* The rule draws itself as the section arrives. Transform, not width, so it does not
     lay out on every frame. */
  const ruleScale = useTransform(scrollYProgress, [0.1, 0.45], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden px-4 pb-[clamp(40px,6vw,88px)] pt-[clamp(72px,11vw,168px)] sm:px-6 md:px-[clamp(32px,5vw,96px)]"
    >
      <div className="mx-auto max-w-[1500px]">
        {/*
          ── The statement ────────────────────────────────────────

          One trigger on the wrapper with `staggerChildren`, rather than a `whileInView`
          on each part. The three parts used to have their own triggers at different
          visibility thresholds — 0.6 for the tag, 0.4 for the lines — which means the
          order they arrived in depended on where the section happened to be on screen
          and how fast you were scrolling. They were never reliably one after another.
          Framer sequences the children off the parent's single trigger, so the order is
          fixed: tag, first line, second line.

          The tag also had a scroll-driven drift on `y`, which had to go: a variant that
          animates `y` and a `style` prop holding a `y` motion value are the same
          property, and the style wins. It would have entered with no movement at all.
        */}
        <motion.div
          className="relative"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          variants={{ show: { transition: { staggerChildren: 0.16 } } }}
        >
          <motion.span
            className="mb-4 inline-block rounded-[3px] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-black sm:mb-5 sm:text-[11px]"
            style={{ backgroundColor: ACCENT_ORANGE, rotate: -4 }}
            variants={{
              hidden: { opacity: 0, y: 18, scale: 0.92 },
              show: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.55, ease: EASE },
              },
            }}
          >
            Get in touch
          </motion.span>

          {/*
            Bigger, and the ceiling is set by what fits rather than by taste. The widest
            line is "YOU'RE BUILDING", which at this weight and tracking runs about 8.1
            times the font size. At 10.5vw that is 1223px inside the 1296px a 1440-wide
            window leaves, and 1361px inside the 1500px cap on wider ones. Past that it
            would wrap, which on a two-line statement reads as a mistake.
          */}
          <h2 className="text-[clamp(2.75rem,10.5vw,10.5rem)] font-bold uppercase leading-[0.9] tracking-[-0.045em] text-foreground">
            {["Tell us what", "you're building"].map((line) => (
              <motion.span
                key={line}
                className="block"
                variants={{
                  hidden: { opacity: 0, y: 36 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.8, ease: EASE },
                  },
                }}
              >
                {line}
              </motion.span>
            ))}
          </h2>
        </motion.div>

        {/* ── The rule ──────────────────────────────────────────── */}
        <motion.div
          className="mt-[clamp(32px,5vw,72px)] h-px origin-left bg-foreground/20"
          style={{ scaleX: ruleScale }}
        />

      </div>

      {/* ── The link, on the moving lettering ─────────────────────
          Full bleed on purpose: the lettering has to run off both edges or it reads as a
          word that has been cut in half rather than as a band passing through. */}
      <div className="relative -mx-4 mt-[clamp(48px,7vw,112px)] sm:-mx-6 md:-mx-[clamp(32px,5vw,96px)]">
        {/* In flow, so the two rows are what give the band its height — the link is then
            simply centred on top of them. Absolutely positioning the rows instead would
            need a second invisible copy to hold the space open, which is two more
            marquees running for nothing. */}
        <div className="pointer-events-none">
          <GhostRow seconds={26} />
          <GhostRow reverse outlined seconds={34} />
        </div>

        <div className="absolute inset-0 grid place-items-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 rounded-full border-2 border-foreground px-6 py-3.5 text-sm font-bold uppercase tracking-[0.04em] text-black shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35)] transition-transform duration-300 ease-out hover:scale-[1.03] active:scale-[0.99] motion-reduce:transform-none sm:gap-4 sm:px-9 sm:py-5 sm:text-lg"
              style={{ backgroundColor: ACCENT_ORANGE }}
            >
              Let&rsquo;s connect
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 ease-out group-hover:translate-x-0.5 motion-reduce:transform-none sm:h-11 sm:w-11">
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2.5} />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
