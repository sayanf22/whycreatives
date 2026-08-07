import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { RevealLines } from "@/components/RevealLines";

const EASE = [0.16, 1, 0.3, 1] as const;

/* Figures match the aggregateRating already published in the site's structured
   data, so the page and the schema cannot disagree. */
const RATING = "4.9";
const REVIEW_COUNT = 50;

type Note = {
  quote: string;
  name: string;
  role: string;
  /** Card tint. Deliberately soft so the dark type stays legible. */
  tint: string;
};

/* Copy carried over from the previous testimonials block rather than invented.
   NOTE: these read as placeholder names — swap them for real, attributable
   clients before this goes in front of buyers. */
const NOTES: Note[] = [
  {
    quote:
      "WhyCreatives transformed our brand identity at a fraction of what other agencies quoted. The quality exceeded our expectations.",
    name: "Rajesh Kumar",
    role: "CEO, TechVentures India",
    tint: "#e8f0ff",
  },
  {
    quote:
      "Their video editing and social media management have been instrumental in our growth over the past year.",
    name: "Priya Sharma",
    role: "Marketing Director, GrowthHub",
    tint: "#eaffd6",
  },
  {
    quote:
      "The transparency throughout the project was outstanding. Clear agreements, no surprises, delivered on time.",
    name: "Amit Patel",
    role: "Founder, Digital Dreams",
    tint: "#fff1d6",
  },
  {
    quote:
      "Fast turnaround, professional quality and genuine value. They have become our go-to partner for creative work.",
    name: "Sneha Reddy",
    role: "CTO, InnovateLabs",
    tint: "#ffe4ec",
  },
  {
    quote:
      "Professional video editing at a fair price. Our promotional videos have never looked better.",
    name: "Ananya Iyer",
    role: "Director, FitLife Gym",
    tint: "#eae4ff",
  },
];

export const ClientSatisfaction = () => {
  return (
    /* Same gutters as the Expertise panel above, so the light box lines up
       exactly with the dark one rather than sitting a few pixels off. */
    <div className="w-full bg-background px-3 pt-3 sm:px-5 sm:pt-5 md:px-6 md:pt-6">
      <section
        className="w-full overflow-hidden rounded-[24px] bg-white font-['Schibsted_Grotesk',sans-serif] text-black md:rounded-[36px]"
        style={{
          paddingTop: "clamp(48px, 6vw, 96px)",
          paddingBottom: "clamp(48px, 6vw, 96px)",
        }}
      >
        <div className="px-5 md:px-[clamp(28px,5vw,120px)]">
          {/* ── HEADER ─────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-8">
              <motion.div
                className="mb-4 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-black/50"
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.55, ease: EASE }}
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-black/40" />
                Client satisfaction
              </motion.div>

              <h2
                style={{
                  fontSize: "clamp(1.9rem, 3.6vw, 4rem)",
                  lineHeight: 1.02,
                  letterSpacing: "-0.04em",
                  fontWeight: 700,
                }}
              >
                <RevealLines
                  lines={["What it's like", "to work with us"]}
                  className="block"
                  nowrapFromLg
                />
              </h2>
            </div>

            {/* Rating summary, tinted with the brand accent so it reads as the
                anchor of the block. */}
            <motion.div
              className="lg:col-span-4 lg:justify-self-end"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
            >
              <div className="inline-flex items-center gap-4 rounded-[20px] bg-[#d4ff33] px-5 py-4">
                <span className="text-4xl font-bold leading-none tracking-tight">
                  {RATING}
                </span>
                <span>
                  <span className="flex gap-0.5" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-black text-black" />
                    ))}
                  </span>
                  <span className="mt-1 block text-xs font-semibold text-black/70">
                    from {REVIEW_COUNT} reviews
                  </span>
                </span>
              </div>
            </motion.div>
          </div>

          {/* ── NOTES ──────────────────────────────────────────────── */}
          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {NOTES.map((note, i) => (
              <motion.li
                key={note.name}
                className="flex flex-col justify-between rounded-[20px] p-6"
                style={{ backgroundColor: note.tint }}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.07 }}
              >
                <p className="text-[15px] leading-relaxed text-black/80">
                  &ldquo;{note.quote}&rdquo;
                </p>
                <div className="mt-6">
                  <p className="text-sm font-bold">{note.name}</p>
                  <p className="text-xs text-black/55">{note.role}</p>
                </div>
              </motion.li>
            ))}

            {/* Closing cell keeps the grid even at three columns and carries the
                accent through to the end of the row. */}
            <motion.li
              className="flex flex-col justify-between rounded-[20px] bg-black p-6 text-white"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: EASE, delay: NOTES.length * 0.07 }}
            >
              <p className="text-[15px] leading-relaxed text-white/80">
                Every project runs with clear scope, fixed pricing agreed up
                front, and one point of contact from brief to launch.
              </p>
              <p className="mt-6 text-sm font-bold text-[#d4ff33]">
                Crafting since 2020
              </p>
            </motion.li>
          </ul>
        </div>
      </section>
    </div>
  );
};
