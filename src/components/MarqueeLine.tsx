import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LINE = "Let's make something worth watching.";

/**
 * Oversized scrolling line that sits just above the footer.
 *
 * Two identical tracks sit side by side and the pair translates by exactly
 * -50%, so copy 2 lands precisely where copy 1 started — the loop is seamless
 * with no snap. Rows run in opposite directions for a bit of counter-motion.
 */
const Row = ({ reverse, duration }: { reverse?: boolean; duration: number }) => (
  <div className="flex w-max">
    {[0, 1].map((copy) => (
      <motion.div
        key={copy}
        className="flex w-max shrink-0"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {[0, 1].map((dup) => (
          <span
            key={dup}
            className="whitespace-nowrap pr-[0.35em] text-foreground"
            style={{
              fontSize: "clamp(2.75rem, 11vw, 13rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
              fontWeight: 500,
            }}
          >
            {LINE}
          </span>
        ))}
      </motion.div>
    ))}
  </div>
);

export const MarqueeLine = () => (
  <section
    className="w-full overflow-hidden bg-background font-['Schibsted_Grotesk',sans-serif]"
    style={{
      paddingTop: "clamp(56px, 7vw, 120px)",
      paddingBottom: "clamp(56px, 7vw, 120px)",
    }}
    aria-label="Let's work together"
  >
    <Link
      to="/contact"
      className="group block select-none opacity-90 transition-opacity duration-500 hover:opacity-100"
    >
      <div className="overflow-hidden" aria-hidden="true">
        <Row duration={26} />
      </div>
      <div className="mt-1 overflow-hidden lg:mt-2" aria-hidden="true">
        <Row reverse duration={32} />
      </div>
    </Link>
  </section>
);
