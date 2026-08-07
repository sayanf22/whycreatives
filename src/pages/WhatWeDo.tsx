import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ArrowUpRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { BlurLine, BlurLines } from "@/components/BlurLines";

const EASE = [0.16, 1, 0.3, 1] as const;

type Service = {
  /** The single enormous display word for the row. */
  display: string;
  /** Full service name, kept visible for clarity, SEO and screen readers. */
  title: string;
  tagline: string;
  body: string;
  points: string[];
  href: string;
};

const SERVICES: Service[] = [
  {
    display: "Video",
    title: "Video Editing & Motion Design",
    tagline: "From concept to final cut, we craft cinematic experiences.",
    body: "We handle everything from on-location shooting with cinema-grade equipment to high-end post-production.",
    points: [
      "Professional cinematography and shooting",
      "Scriptwriting and storyboarding",
      "Advanced colour grading and editing",
    ],
    href: "/services/video-production",
  },
  {
    display: "Build",
    title: "Web & App Development",
    tagline: "A practical product stack, selected around your users and operations.",
    body: "We design and build high-performance marketing sites, SaaS platforms, dashboards, e-commerce systems and mobile applications—from interface to backend, deployment and handover.",
    points: [
      "React, Next.js, Vite, React Native and Flutter",
      "Node.js, Supabase and Cloudflare Workers backends",
      "Databases, authentication, APIs, payments and technical SEO",
    ],
    href: "/services/web-development",
  },
  {
    display: "Brand",
    title: "Brand Presence",
    tagline: "Cultivating communities and driving engagement.",
    body: "We don't just post. We curate a cohesive identity that resonates with your audience across every channel.",
    points: [
      "Cross-platform strategy and production",
      "Audience analytics and community engagement",
      "Influencer partnerships",
    ],
    href: "/services/brand-presence",
  },
  {
    display: "Growth",
    title: "Performance Marketing",
    tagline: "Turning ad spend into measurable revenue.",
    body: "Our campaigns are built on data, optimised for conversion and scaled for return on investment.",
    points: [
      "Multi-channel campaigns across Meta, Google and LinkedIn",
      "Conversion rate optimisation and funnel tuning",
      "Retargeting and ROI analytics",
    ],
    href: "/services/performance-marketing",
  },
  {
    display: "Content",
    title: "UGC & Collabs",
    tagline: "UGC reels and joint collaborations.",
    body: "Tailored content strategy, scriptwriting and high-impact reels to lift your brand presence.",
    points: [
      "Tailored content strategy and ideation",
      "UGC reel and joint collaboration formats",
      "End-to-end creative and post-production management",
    ],
    href: "/services/ugc-collaborations",
  },
  {
    display: "Design",
    title: "Logo & Brand Identity",
    tagline: "Crafting logos that leave lasting impressions.",
    body: "Your logo is the face of your brand. We design unique, versatile marks that stand out in any market.",
    points: [
      "Multiple concept designs and guidelines",
      "Unlimited revisions and print-ready files",
      "Social media identity asset kit",
    ],
    href: "/services/logo-design",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What video editing services do you offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer full-service video editing including professional cinematography, scriptwriting, advanced color grading, sound design, and drone videography.",
      },
    },
    {
      "@type": "Question",
      name: "Do you build custom websites or use templates?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We provide high-performance custom full-stack web development, e-commerce solutions, PWAs, and custom UI/UX design systems optimized for conversions.",
      },
    },
    {
      "@type": "Question",
      name: "How are projects scoped?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We begin with a discovery conversation, recommend only the deliverables needed for the goal, and provide a tailored scope, timeline, and proposal before work begins.",
      },
    },
  ],
};

/**
 * One service row: a thin caption strip, then a single enormous display word,
 * then the supporting detail in a two-column read.
 */
const ServiceRow = ({ service, index }: { service: Service; index: number }) => (
  <article className="border-t border-border pt-5 pb-12 lg:pt-7 lg:pb-20">
    {/* Caption strip. The giant word alone would lose the actual service name,
        so the full title rides here for clarity, SEO and screen readers. */}
    <motion.div
      className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:text-xs">
        {service.title}
      </span>
    </motion.div>

    {/* The row's single visual anchor: one word, as large as the column allows.
        `13vw` rather than `15vw` so the longest word ("Content") still clears
        the gutters on a narrow phone instead of running off the edge. */}
    <h2 className="mt-2 lg:mt-3">
      <BlurLines
        className="block text-foreground"
        style={{
          fontSize: "clamp(3rem, 13vw, 15rem)",
          lineHeight: 0.86,
          letterSpacing: "-0.055em",
          fontWeight: 500,
        }}
      >
        <BlurLine last>
          <Link
            to={service.href}
            className="inline-block transition-opacity duration-300 ease-out hover:opacity-55"
          >
            {service.display}
            <span className="sr-only"> — {service.title}</span>
          </Link>
        </BlurLine>
      </BlurLines>
    </h2>

    <div className="mt-8 grid grid-cols-1 gap-8 lg:mt-12 lg:grid-cols-12 lg:gap-10">
      <motion.div
        className="lg:col-span-5"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <p className="text-lg font-semibold text-foreground sm:text-xl">
          {service.tagline}
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {service.body}
        </p>
      </motion.div>

      <motion.div
        className="lg:col-span-7"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
      >
        <ul className="space-y-3">
          {service.points.map((point, i) => (
            <motion.li
              key={point}
              className="flex items-start gap-3 text-base text-foreground/80 sm:text-lg"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.45, ease: EASE, delay: i * 0.06 }}
            >
              <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
              {point}
            </motion.li>
          ))}
        </ul>

        <Link
          to={service.href}
          className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-foreground px-6 py-3 text-sm font-bold text-background transition-[opacity,transform] duration-300 ease-out hover:opacity-85 active:scale-[0.98] motion-reduce:transform-none"
        >
          Explore the service
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-background/15 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none">
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
          </span>
        </Link>
      </motion.div>
    </div>
  </article>
);

const WhatWeDo = () => {
  return (
    <div className="min-h-screen bg-background font-['Schibsted_Grotesk',sans-serif]">
      <Helmet>
        <title>
          Creative Services | Video Editing, Motion Design & Web Development
        </title>
        <meta
          name="description"
          content="Explore WhyCreatives services across video, product design, web and app development, performance marketing, UGC, and brand identity."
        />
        <meta
          name="keywords"
          content="creative services, video editing agency, web development company, digital marketing services, branding agency, logo design, performance marketing"
        />
        <link rel="canonical" href="https://whycreatives.in/what-we-do" />
        <meta
          property="og:title"
          content="Creative Services | Video Editing, Motion Design & Web Development"
        />
        <meta
          property="og:description"
          content="One team for video, digital products, performance, content, and brand identity."
        />
        <meta property="og:url" content="https://whycreatives.in/what-we-do" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Navigation />

      <main
        className="px-4 md:px-[clamp(32px,6vw,120px)]"
        style={{
          paddingTop: "clamp(104px, 12vw, 168px)",
          paddingBottom: "clamp(56px, 7vw, 120px)",
        }}
      >
        {/* ── PAGE HEADER ─────────────────────────────────────────── */}
        <header className="mb-12 lg:mb-20">
          {/* On phones the label sits above the headline. Inline, it plus
              "We're a creative" is wider than a 375px viewport's content box,
              so line one would overflow the gutter. */}
          <motion.div
            className="mb-4 flex items-center gap-2 text-[11px] font-medium tracking-[0.04em] text-muted-foreground sm:hidden"
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
            Services
          </motion.div>

          <h1>
          <BlurLines
            className="block text-foreground"
            style={{
              fontSize: "clamp(2.05rem, 7.2vw, 7.25rem)",
              lineHeight: 0.99,
              letterSpacing: "-0.045em",
              fontWeight: 500,
            }}
          >
            {/* The label rides *inside* the first line rather than sitting in
                its own column, which is what produces the indent on line one
                while lines two and three stay flush to the gutter. */}
            <BlurLine delay={0.05}>
              <span className="flex items-start gap-3 sm:gap-5">
                {/*
                  Two nested spans on purpose. The outer one still inherits the
                  headline's huge font-size, so `marginTop` in em gives an
                  offset that scales with the type; `lineHeight: 0` stops it
                  contributing a giant line box of its own. The inner span sets
                  the small label size.
                */}
                <span
                  className="hidden shrink-0 sm:block"
                  style={{ marginTop: "0.36em", lineHeight: 0 }}
                >
                  <span className="flex items-center gap-2 whitespace-nowrap text-xs font-medium tracking-[0.04em] text-muted-foreground">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
                    Services
                  </span>
                </span>
                <span>We&rsquo;re a creative</span>
              </span>
            </BlurLine>
            <BlurLine delay={0.14}>studio with deep</BlurLine>
            <BlurLine delay={0.23} last>
              expertise
            </BlurLine>
          </BlurLines>
          </h1>

          {/* Support line sits low and to the right of the headline, in full
              foreground rather than muted grey — in the reference it reads as
              a second statement, not as fine print. */}
          <div className="mt-8 grid grid-cols-1 lg:mt-14 lg:grid-cols-12">
            <motion.p
              className="max-w-[30ch] text-lg leading-[1.35] text-foreground sm:text-xl md:text-[1.4rem] lg:col-span-5 lg:col-start-7"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
            >
              We bring craft and clear thinking to ambitious brands, and build
              work that earns attention.
            </motion.p>
          </div>
        </header>

        {/* ── SERVICES ────────────────────────────────────────────── */}
        {SERVICES.map((service, i) => (
          <ServiceRow key={service.title} service={service} index={i} />
        ))}

        {/* ── CLOSING CTA ─────────────────────────────────────────── */}
        <motion.div
          className="border-t border-border pt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <h2
            className="text-foreground"
            style={{
              fontSize: "clamp(1.6rem, 3vw, 3rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              fontWeight: 500,
            }}
          >
            Not sure where to start?
          </h2>
          <p className="mt-3 max-w-lg text-base text-muted-foreground sm:text-lg">
            Tell us what you are trying to achieve and we will tell you honestly
            what it needs.
          </p>
          <Link
            to="/contact"
            className="group mt-7 inline-flex items-center gap-2.5 rounded-full border border-foreground/25 px-6 py-3 text-sm font-semibold text-foreground transition-[background-color,border-color,color,transform] duration-300 ease-out hover:border-foreground hover:bg-foreground hover:text-background active:scale-[0.98] motion-reduce:transform-none"
          >
            Start a conversation
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
          </Link>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default WhatWeDo;
