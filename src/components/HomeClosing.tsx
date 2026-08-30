import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { ACCENT_ORANGE } from "@/lib/brand";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Real values, matching the footer. Kept here rather than re-typed as placeholders. */
const CONTACT = [
  { icon: Mail, label: "hello@whycreatives.in", href: "mailto:hello@whycreatives.in" },
  { icon: Phone, label: "+91 82101 98880", href: "tel:+918210198880" },
  { icon: MapPin, label: "Guwahati, Assam, India", href: null },
];

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
 * The closing block on the landing page: a statement, a rule, the contact details, and the
 * link out, sitting on two rows of oversized moving lettering.
 *
 * ── Why the lettering is a CSS animation and the rest is scroll-driven ──
 *
 * The two are doing different jobs. The lettering runs continuously whether you scroll or
 * not, which is what makes the block feel alive when you land on it — that has to be a
 * plain CSS animation on the compositor, because a scroll-driven one stops dead the moment
 * you stop moving. The statement and the rule are scroll-driven, because their job is to
 * respond to you arriving.
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
  /* The tag drifts against the headline. A small amount — enough to read as depth, not
     enough to look like it has come loose. */
  const tagY = useTransform(scrollYProgress, [0, 1], [26, -26]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden px-4 pb-[clamp(40px,6vw,88px)] pt-[clamp(72px,11vw,168px)] sm:px-6 md:px-[clamp(32px,5vw,96px)]"
    >
      <div className="mx-auto max-w-[1500px]">
        {/* ── The statement ─────────────────────────────────────── */}
        <div className="relative">
          <motion.span
            className="mb-4 inline-block rounded-[3px] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-black sm:text-[11px]"
            style={{ backgroundColor: ACCENT_ORANGE, rotate: -4, y: tagY }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            Get in touch
          </motion.span>

          <h2 className="text-[clamp(2.5rem,9vw,8rem)] font-bold uppercase leading-[0.92] tracking-[-0.045em] text-foreground">
            {["Tell us what", "you're building"].map((line, i) => (
              <motion.span
                key={line}
                className="block"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.75, ease: EASE, delay: i * 0.09 }}
              >
                {line}
              </motion.span>
            ))}
          </h2>
        </div>

        {/* ── The rule ──────────────────────────────────────────── */}
        <motion.div
          className="mt-[clamp(28px,4vw,56px)] h-px origin-left bg-foreground/20"
          style={{ scaleX: ruleScale }}
        />

        {/* ── Contact, under the rule ───────────────────────────── */}
        <ul className="mt-6 flex flex-col gap-4 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-10 sm:gap-y-4">
          {CONTACT.map(({ icon: Icon, label, href }, i) => (
            <motion.li
              key={label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.1 + i * 0.08 }}
              className="flex items-center gap-3 text-sm text-foreground/70 sm:text-base"
            >
              <Icon className="h-4 w-4 shrink-0 text-foreground/45" strokeWidth={2} />
              {href ? (
                <a
                  href={href}
                  className="group relative inline-block transition-colors hover:text-foreground"
                >
                  <span>{label}</span>
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-foreground transition-all duration-300 group-hover:w-full" />
                </a>
              ) : (
                <span>{label}</span>
              )}
            </motion.li>
          ))}
        </ul>
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
