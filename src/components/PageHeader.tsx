import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { BlurLine, BlurLines } from "@/components/BlurLines";

const EASE = [0.16, 1, 0.3, 1] as const;

type PageHeaderProps = {
  /** Small label above/inside the headline. */
  eyebrow: string;
  /**
   * The headline, split by hand into display lines. Splitting is manual because
   * where a line breaks is a typographic decision, not something to leave to
   * the browser at this size.
   */
  lines: string[];
  /** Support copy that sits low and right of the headline. */
  support?: ReactNode;
  /** Anything that should follow the support copy — buttons, meta, counts. */
  children?: ReactNode;
  /** Override the display scale for pages with much longer headlines. */
  fontSize?: string;
  /**
   * Drives the reveal from outside instead of from the viewport.
   *
   * Every page using this header puts it above the fold, so `whileInView` fires the
   * moment the page mounts — which on a page with an intro curtain means the header
   * animates *behind* it and is already sitting there when the curtain clears. Pages
   * with a curtain pass their handoff flag here so the reveal starts when the colour
   * does.
   *
   * Left undefined the header reveals on scroll exactly as before, so callers that
   * have no curtain are untouched.
   */
  active?: boolean;
  className?: string;
};

/**
 * `whileInView` or `animate`, depending on whether the caller is driving the reveal.
 *
 * Kept in one place because the header has three independently animated parts and
 * they must all switch together — one left on `whileInView` would fire early and
 * break the sequence.
 */
const driver = (active: boolean | undefined, amount: number) =>
  active === undefined
    ? ({ whileInView: "show", viewport: { once: true, amount } } as const)
    : ({ animate: active ? "show" : "hidden" } as const);

/**
 * The page header used across Services, Gallery, About, Insights and Contact.
 *
 * Two details matter and are easy to break:
 *
 * 1. The eyebrow rides *inside* the first display line on `sm` and up. That is
 *    what produces the indent step on line one while the rest stay flush to the
 *    gutter. Below `sm` it stacks above the headline instead — inline, the label
 *    plus the first few words is wider than a 375px content box and line one
 *    would run off the edge.
 * 2. The eyebrow uses two nested spans. The outer one still inherits the
 *    headline's huge font-size, so a `marginTop` in `em` scales with the type;
 *    `lineHeight: 0` keeps it from contributing a giant line box of its own.
 *    The inner span drops down to the small label size.
 *
 * The whole block is keyed on its own copy by the caller when the strings come
 * from the database, otherwise an edit leaves the old words frozen mid-reveal.
 */
export const PageHeader = ({
  eyebrow,
  lines,
  support,
  children,
  fontSize = "clamp(2.25rem, 8vw, 8.5rem)",
  active,
  className = "",
}: PageHeaderProps) => (
  <header className={`mb-12 lg:mb-20 ${className}`}>
    {/* Phone: label stacked above the headline. Variants rather than inline targets,
        so the same `hidden` / `show` names work under either driver. */}
    <motion.div
      className="mb-4 flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground sm:hidden"
      initial="hidden"
      variants={{
        hidden: { opacity: 0, x: -8 },
        show: { opacity: 1, x: 0 },
      }}
      transition={{ duration: 0.55, ease: EASE }}
      {...driver(active, 0.6)}
    >
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
      {eyebrow}
    </motion.div>

    <h1>
      <BlurLines
        active={active}
        className="block text-foreground"
        style={{
          fontSize,
          lineHeight: 0.94,
          letterSpacing: "-0.05em",
          fontWeight: 700,
        }}
      >
        {lines.map((line, i) => (
          <BlurLine
            key={`${i}-${line}`}
            delay={0.05 + i * 0.09}
            last={i === lines.length - 1}
          >
            {i === 0 ? (
              <span className="flex items-start gap-3 sm:gap-5">
                <span
                  className="hidden shrink-0 sm:block"
                  style={{ marginTop: "0.42em", lineHeight: 0 }}
                >
                  <span className="flex items-center gap-2 whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground lg:text-xs">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
                    {eyebrow}
                  </span>
                </span>
                <span>{line}</span>
              </span>
            ) : (
              line
            )}
          </BlurLine>
        ))}
      </BlurLines>
    </h1>

    {(support || children) && (
      <div className="mt-8 grid grid-cols-1 lg:mt-14 lg:grid-cols-12">
        <motion.div
          className="lg:col-span-6 lg:col-start-7"
          initial="hidden"
          variants={{
            hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
            show: { opacity: 1, y: 0, filter: "blur(0px)" },
          }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.26 }}
          {...driver(active, 0.4)}
        >
          {support && (
            <p className="max-w-[46ch] text-lg font-medium leading-[1.45] tracking-[-0.02em] text-foreground sm:text-xl md:text-2xl">
              {support}
            </p>
          )}
          {children}
        </motion.div>
      </div>
    )}
  </header>
);
