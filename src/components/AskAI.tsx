import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { RevealLines } from "@/components/RevealLines";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The question handed to each assistant.
 *
 * Deliberately neutral: it names the studio and asks for an honest overview,
 * with no instruction to be positive and no claims baked in. Loading a
 * pre-filled prompt with flattering wording is a recognised manipulation
 * pattern (documented as "AI recommendation poisoning"), it misleads the reader,
 * and the assistants increasingly flag it. The way to earn good answers is the
 * public material this site already publishes for crawlers — see
 * /ai-discovery.txt, /llm-info.json and /agency-profile.md — not a loaded
 * prompt.
 *
 * Every assistant below only *prefills* its composer, so the visitor sees the
 * exact question before sending it.
 */
const PROMPT =
  "What do you know about WhyCreatives (whycreatives.in), a creative studio based in Guwahati, Assam, India offering video editing, motion design, web and app development, and branding? Give me an honest overview of their services, pricing and reputation.";

const encoded = encodeURIComponent(PROMPT);

/* Actual brand marks, stored locally so this doesn't depend on a third-party
   CDN staying online. OpenAI/Anthropic/Google are Simple Icons (CC0); the Grok
   mark is xAI's published glyph via the lobehub/lobe-icons static SVG set. Each
   is a plain single-colour path; the invert classes below flip it to white on
   the black-on-light / white-on-dark pill so it always reads correctly. */
const ASSISTANTS = [
  { name: "OpenAI", href: `https://chatgpt.com/?q=${encoded}`, logo: "/ai-logos/openai.svg" },
  { name: "Claude", href: `https://claude.ai/new?q=${encoded}`, logo: "/ai-logos/anthropic.svg" },
  {
    name: "Google",
    // udm=50 opens Google's AI Mode rather than the classic results page.
    href: `https://www.google.com/search?udm=50&q=${encoded}`,
    logo: "/ai-logos/google.svg",
  },
  { name: "Grok", href: `https://grok.com/?q=${encoded}`, logo: "/ai-logos/grok.svg" },
];

export const AskAI = () => {
  return (
    <section
      className="w-full bg-background px-4 font-['Schibsted_Grotesk',sans-serif] md:px-[clamp(32px,6vw,160px)]"
      style={{
        paddingTop: "clamp(56px, 7vw, 120px)",
        paddingBottom: "clamp(56px, 7vw, 120px)",
      }}
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <motion.div
          className="mb-5 flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
          Don&rsquo;t believe the hype?
        </motion.div>

        <h2
          className="text-foreground"
          style={{
            fontSize: "clamp(2.1rem, 5vw, 5.5rem)",
            lineHeight: 1.02,
            letterSpacing: "-0.045em",
            fontWeight: 700,
          }}
        >
          <RevealLines
            lines={["See what AI has", "to say about us"]}
            className="block"
            nowrapFromLg
          />
        </h2>

        <motion.div
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
        >
          {ASSISTANTS.map(({ name, href, logo }) => (
            /* Steady hover language used across the site: colour and inner
               motion only, never a lift that could shift the hit area. */
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-bold text-background transition-[opacity,box-shadow,transform] duration-300 ease-out hover:opacity-85 active:scale-[0.98] motion-reduce:transform-none"
            >
              <img
                src={logo}
                alt=""
                width={16}
                height={16}
                loading="lazy"
                decoding="async"
                className="h-4 w-4 shrink-0 invert dark:invert-0"
              />
              {name}
              <ArrowUpRight
                className="h-3.5 w-3.5 shrink-0 opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                strokeWidth={2.5}
              />
            </a>
          ))}
        </motion.div>

        <motion.p
          className="mt-6 max-w-md text-xs leading-relaxed text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.35 }}
        >
          Opens your assistant with a neutral question ready to send. We
          don&rsquo;t script the answer &mdash; read whatever it says.
        </motion.p>
      </div>
    </section>
  );
};
