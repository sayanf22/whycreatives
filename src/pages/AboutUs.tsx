import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ArrowUpRight, Quote } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { BlurLine, BlurLines } from "@/components/BlurLines";
import { useSiteContent } from "@/hooks/use-site-content";

const EASE = [0.16, 1, 0.3, 1] as const;

/** How a project actually runs, start to handover. */
const PROCESS = [
  {
    title: "Discovery",
    body: "We start with the goal rather than the deliverable — who the work is for, what it has to change, and what already exists to build on.",
  },
  {
    title: "Scope",
    body: "You get a written scope: what is being made, in what order, by when, and what we need from you. Nothing starts before that is agreed.",
  },
  {
    title: "Build",
    body: "Work lands in reviewable pieces instead of one reveal at the end, so direction is corrected while it is still cheap to correct.",
  },
  {
    title: "Handover",
    body: "Files, source, access and documentation are handed to you. You own the output, and you can carry it forward without us.",
  },
];

/** Every discipline, pointing at its own detail page. */
const DISCIPLINES = [
  {
    label: "Video editing & motion",
    note: "Post-production from the footage you supply",
    href: "/services/video-production",
  },
  {
    label: "Web & app development",
    note: "Sites, dashboards, storefronts and mobile apps",
    href: "/services/web-development",
  },
  {
    label: "Brand presence",
    note: "One coherent identity across every channel",
    href: "/services/brand-presence",
  },
  {
    label: "Performance marketing",
    note: "Campaigns measured against revenue, not reach",
    href: "/services/performance-marketing",
  },
  {
    label: "UGC & collaborations",
    note: "Creator-led formats, scripted and produced",
    href: "/services/ugc-collaborations",
  },
  {
    label: "Logo & brand identity",
    note: "Marks, systems and print-ready asset kits",
    href: "/services/logo-design",
  },
];

/**
 * Plain facts only.
 *
 * This replaced a stats bar reading "500+ Projects", "100% Client
 * Satisfaction", "Cost Savings: Big" and "24/7". None of it was measured
 * anywhere, and a satisfaction figure with no reviews behind it is the kind of
 * claim that costs more trust than it buys.
 */
const FACTS = [
  { label: "Based in", value: "Guwahati, Assam" },
  { label: "Working with", value: "Brands across India" },
  { label: "Disciplines", value: "Six, under one roof" },
  { label: "Engagement", value: "Project or retainer" },
];

const AboutUs = () => {
  const { text } = useSiteContent();

  const headingOne = text("about.heading_line_1", "One studio for");
  const headingTwo = text("about.heading_line_2", "brand, product");
  const headingThree = text("about.heading_line_3", "and video");

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground font-['Schibsted_Grotesk',sans-serif]">
      <Helmet>
        <title>About WhyCreatives | Creative Studio in Guwahati, Assam</title>
        <meta
          name="description"
          content="WhyCreatives is a creative studio in Guwahati, Assam working across video editing, web and app development, brand identity, performance marketing and UGC."
        />
        <link rel="canonical" href="https://whycreatives.in/about-us" />
        <meta
          property="og:title"
          content="About WhyCreatives | Creative Studio in Guwahati, Assam"
        />
        <meta
          property="og:description"
          content="One team across video, digital products, brand and growth. See how we scope and run work."
        />
        <meta property="og:url" content="https://whycreatives.in/about-us" />
        <meta property="og:type" content="website" />
      </Helmet>

      <Navigation />

      <main
        className="px-4 md:px-[clamp(20px,2.6vw,52px)]"
        style={{
          paddingTop: "clamp(104px, 12vw, 168px)",
          paddingBottom: "clamp(56px, 7vw, 120px)",
        }}
      >
        <div className="mx-auto max-w-[1920px]">
          {/* ── HEADER ── same system as Services and Gallery: eyebrow riding
              inside line one, oversized masked display lines, support copy set
              low and right. */}
          <PageHeader
            key={`${headingOne}|${headingTwo}|${headingThree}`}
            eyebrow={text("about.eyebrow", "About")}
            lines={[headingOne, headingTwo, headingThree]}
            support={text(
              "about.intro",
              "We are a creative studio in Guwahati, Assam. Video, websites, apps, identity and growth are handled by the same team, so the work stays consistent instead of being stitched together from four vendors.",
            )}
          />

          {/* ── IMAGES ── three frames on one asymmetric grid. Shadows sit on a
              wrapper rather than the clipped element, because `clip-path`
              resolves after `filter`, so a drop-shadow on the clipped box gets
              clipped away with it. */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-12 sm:gap-5 lg:gap-6">
            {[
              {
                src: "/creative-office.webp",
                alt: "The studio workspace in Guwahati",
                span: "sm:col-span-7",
                ratio: "aspect-[16/11]",
                delay: 0,
              },
              {
                src: "/team-collab.webp",
                alt: "The team reviewing work together",
                span: "sm:col-span-5",
                ratio: "aspect-[16/11]",
                delay: 0.08,
              },
            ].map((img) => (
              <motion.div
                key={img.src}
                className={img.span}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.8, ease: EASE, delay: img.delay }}
              >
                <div className="[filter:drop-shadow(0_2px_4px_rgba(0,0,0,0.06))_drop-shadow(0_18px_36px_rgba(0,0,0,0.13))] dark:[filter:drop-shadow(0_2px_5px_rgba(0,0,0,0.5))_drop-shadow(0_22px_44px_rgba(0,0,0,0.65))]">
                  <div
                    className={`${img.ratio} overflow-hidden rounded-[20px] bg-muted md:rounded-[34px]`}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </section>

          {/* ── FACTS ── a definition list, not a stats bar. */}
          <section
            className="mt-14 border-t border-border pt-8 lg:mt-24 lg:pt-10"
            aria-label="Studio details"
          >
            <dl className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
              {FACTS.map((fact, i) => (
                <motion.div
                  key={fact.label}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.55, ease: EASE, delay: i * 0.06 }}
                >
                  <dt className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                    {fact.label}
                  </dt>
                  <dd
                    className="mt-2 text-foreground"
                    style={{
                      fontSize: "clamp(1.15rem, 1.9vw, 1.85rem)",
                      lineHeight: 1.1,
                      letterSpacing: "-0.03em",
                      fontWeight: 700,
                    }}
                  >
                    {fact.value}
                  </dd>
                </motion.div>
              ))}
            </dl>
          </section>

          {/* ── HOW WE WORK ── */}
          <section className="mt-20 lg:mt-36">
            <h2 className="mb-10 lg:mb-16">
              <BlurLines
                className="block text-foreground"
                style={{
                  fontSize: "clamp(2rem, 6.4vw, 6.5rem)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.05em",
                  fontWeight: 700,
                }}
              >
                <BlurLine delay={0.05}>How the work</BlurLine>
                <BlurLine delay={0.14} last>
                  actually runs
                </BlurLine>
              </BlurLines>
            </h2>

            <ol className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
              {PROCESS.map((step, i) => (
                <motion.li
                  key={step.title}
                  className="bg-background p-6 lg:p-8"
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.6, ease: EASE, delay: i * 0.07 }}
                >
                  <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className="mt-4 text-foreground"
                    style={{
                      fontSize: "clamp(1.35rem, 2.2vw, 2.15rem)",
                      lineHeight: 1.05,
                      letterSpacing: "-0.035em",
                      fontWeight: 700,
                    }}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </motion.li>
              ))}
            </ol>
          </section>

          {/* ── DISCIPLINES ── a plain list of rows, each one a link. */}
          <section className="mt-20 lg:mt-36">
            <h2 className="mb-10 lg:mb-16">
              <BlurLines
                className="block text-foreground"
                style={{
                  fontSize: "clamp(2rem, 6.4vw, 6.5rem)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.05em",
                  fontWeight: 700,
                }}
              >
                <BlurLine delay={0.05} last>
                  What we cover
                </BlurLine>
              </BlurLines>
            </h2>

            <ul>
              {DISCIPLINES.map((item, i) => (
                <motion.li
                  key={item.href}
                  className="border-t border-border last:border-b"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.5, ease: EASE, delay: i * 0.04 }}
                >
                  <Link
                    to={item.href}
                    className="group flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 py-6 transition-opacity duration-300 hover:opacity-55 lg:py-9"
                  >
                    <span
                      className="flex items-center gap-3 text-foreground"
                      style={{
                        fontSize: "clamp(1.4rem, 3.4vw, 3.25rem)",
                        lineHeight: 1.02,
                        letterSpacing: "-0.04em",
                        fontWeight: 700,
                      }}
                    >
                      {item.label}
                      <ArrowUpRight
                        className="h-[0.5em] w-[0.5em] shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 motion-reduce:transform-none"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="text-sm font-medium text-muted-foreground sm:text-base">
                      {item.note}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </section>

          {/* ── FOUNDER ── was a tinted gradient card with a pink Instagram
              glyph; now the same monochrome treatment as the rest of the site,
              with the studio's own photo doing the work. */}
          <section className="mt-20 lg:mt-36">
            <div className="grid grid-cols-1 items-center gap-8 rounded-[20px] border border-border p-6 sm:p-8 lg:grid-cols-12 lg:gap-12 lg:rounded-[34px] lg:p-12">
              <div className="lg:col-span-5">
                <div className="[filter:drop-shadow(0_2px_4px_rgba(0,0,0,0.06))_drop-shadow(0_18px_36px_rgba(0,0,0,0.13))] dark:[filter:drop-shadow(0_2px_5px_rgba(0,0,0,0.5))_drop-shadow(0_22px_44px_rgba(0,0,0,0.65))]">
                  <div className="aspect-[4/3] overflow-hidden rounded-[16px] bg-muted lg:rounded-[24px]">
                    <img
                      src="/video-gear.webp"
                      alt="Editing gear in the studio"
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  Behind the studio
                </p>
                <h2
                  className="mt-4 text-foreground"
                  style={{
                    fontSize: "clamp(1.85rem, 3.6vw, 3.5rem)",
                    lineHeight: 1.02,
                    letterSpacing: "-0.045em",
                    fontWeight: 700,
                  }}
                >
                  Follow the process, not just the output
                </h2>
                <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Our founder documents the day-to-day of running the studio on
                  Instagram — the creative process, the calls that get made, and
                  what actually happens between a brief and a finished piece.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href="https://www.instagram.com/areyparo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-bold text-background transition-opacity duration-300 hover:opacity-85 sm:h-14 sm:px-8 sm:text-base"
                  >
                    Follow on Instagram
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none" />
                  </a>
                  <span className="inline-flex h-12 items-center rounded-full border border-border px-6 text-sm font-bold text-muted-foreground sm:h-14">
                    UGC &amp; creator strategy
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* ── CLOSING ── */}
          <section className="mt-20 border-t border-border pt-12 lg:mt-36 lg:pt-20">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
              <motion.blockquote
                className="flex gap-3 sm:gap-4 lg:col-span-6"
                initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <Quote
                  className="mt-1.5 h-5 w-5 shrink-0 fill-foreground text-foreground sm:mt-2 sm:h-6 sm:w-6"
                  aria-hidden="true"
                />
                <p className="max-w-[34ch] text-xl font-bold leading-[1.25] tracking-[-0.02em] text-foreground sm:text-2xl md:text-3xl">
                  Tell us the outcome you need. We will tell you the shortest
                  honest route to it.
                </p>
              </motion.blockquote>

              <div className="flex flex-wrap items-start gap-3 lg:col-span-6 lg:justify-end">
                <Link
                  to="/contact"
                  className="group inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-bold text-background transition-opacity duration-300 hover:opacity-85 sm:h-14 sm:px-8 sm:text-base"
                >
                  Start a project
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none" />
                </Link>
                <Link
                  to="/portfolio-gallery"
                  className="inline-flex h-12 items-center rounded-full border border-border px-6 text-sm font-bold text-foreground transition-colors duration-300 hover:border-foreground/40 sm:h-14 sm:px-8 sm:text-base"
                >
                  See the work
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
