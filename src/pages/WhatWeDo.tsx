import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { BlurLine, BlurLines } from "@/components/BlurLines";
import { ServiceStack } from "@/components/ServiceStack";
import { ServiceClosing } from "@/components/ServiceClosing";
import { SERVICES } from "@/data/services";
import { usePageIntro } from "@/hooks/use-page-intro";
import { ACCENT_ORANGE } from "@/lib/brand";

const EASE = [0.16, 1, 0.3, 1] as const;

/*
  The service copy lives in `src/data/services.ts`, shared with the detail pages. It
  was declared here too, as a shorter parallel list, and the two had already drifted
  apart on the third service's title.
*/

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What video services do you offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We are a post-production studio. We work from footage you supply and handle editing, pacing, motion graphics, titles and captions, colour grading, sound design and final delivery for each platform. We do not offer filming or camera crews.",
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

const WhatWeDo = () => {
  const { revealed } = usePageIntro();

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
        style={{ paddingBottom: "clamp(56px, 7vw, 120px)" }}
      >
        {/* ── PAGE HEADER ─────────────────────────────────────────── */}
        {/*
          A full-bleed orange panel, which is what the intro curtain resolves into —
          same colour, so the curtain appears to recede into it rather than vanish.

          The negative margins cancel `main`'s padding and the matching positive ones
          put the gutters back inside, so the colour reaches the viewport edges while
          the copy stays on the page's measure.

          The page's top padding lives here rather than on `main`: on `main` it would
          leave a band of page background above the panel, and the orange has to run
          right up under the navigation for the curtain to land on it seamlessly.

          Type is black in both themes, not `text-foreground` — the panel is orange
          either way, so a token that flips to white would fail in dark mode.
        */}
        {/*
          Full viewport height, which is the fix for the curtain landing badly.

          The curtain covers the whole screen; the panel previously covered only its
          own content. So the moment the curtain cleared you saw orange at the top
          and page background beneath — the "half orange, half dark" split. Matching
          the panel to the viewport means nothing visibly changes when the curtain
          goes, and the section below is reached by scrolling rather than by being
          revealed underneath.

          `100svh`, not `100vh`: on a phone `vh` is measured against the *largest*
          viewport, so with the browser chrome showing, a `100vh` panel is taller
          than the screen and the scroll cue at its foot sits below the fold.
        */}
        {/*
          The bottom corners are rounded to the same radius as the service panels
          below, so the orange reads as the first card in the stack rather than a
          band of colour cut off with a ruler.

          Only the bottom. The top edge runs to the top of the document, under the
          fixed navigation — rounding it would put two notches of page background in
          the top corners of the viewport with the nav floating over them.

          The first service panel's own rounded top corners are invisible at this
          joint, which is why the seam still looked square: that panel is
          `bg-background`, the same colour as the page behind it, so its corner
          cutouts reveal nothing. The visible curve has to come from the orange.
        */}
        <header
          className="-mx-4 flex min-h-[100svh] flex-col rounded-b-[24px] px-4 md:-mx-[clamp(32px,6vw,120px)] md:rounded-b-[40px] md:px-[clamp(32px,6vw,120px)]"
          style={{
            backgroundColor: ACCENT_ORANGE,
            paddingTop: "clamp(104px, 12vw, 168px)",
          }}
        >
          {/* Centres the statement in the panel and lets the scroll cue sit on the
              floor, rather than the copy hugging the top of a full-height block with
              a screen of empty orange under it. */}
          <div className="flex flex-1 flex-col justify-center">
          {/* On phones the label sits above the headline. Inline, it plus
              "We're a creative" is wider than a 375px viewport's content box,
              so line one would overflow the gutter. */}
          {/* Step 1 of the sequence. Driven by the handoff rather than by the
              viewport: this sits above the fold, so `whileInView` would fire it
              behind the curtain and it would already be there when the orange
              cleared. */}
          <motion.div
            className="mb-4 flex items-center gap-2 text-[11px] font-medium tracking-[0.04em] text-black/70 sm:hidden"
            initial={{ opacity: 0, x: -8 }}
            animate={revealed ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-black/60" />
            Services
          </motion.div>

          <h1>
          {/* Step 2. Its three lines carry their own stagger, so the headline builds
              line by line once the curtain hands over. */}
          <BlurLines
            active={revealed}
            className="block text-black"
            style={{
              /* 700 to match the h1 on every other page — this was the last 500
                 left on the site, which made the services heading read lighter
                 than the gallery and about headings it sits beside in the nav. */
              fontSize: "clamp(2.05rem, 7.2vw, 7.25rem)",
              lineHeight: 0.99,
              letterSpacing: "-0.045em",
              fontWeight: 700,
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
                  <span className="flex items-center gap-2 whitespace-nowrap text-xs font-medium tracking-[0.04em] text-black/70">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-black/60" />
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
            {/* Step 3, last. The delay clears the headline's own three-line stagger
                so the support line arrives after the statement has finished
                building rather than racing it. */}
            <motion.p
              className="max-w-[30ch] text-lg leading-[1.35] text-black sm:text-xl md:text-[1.4rem] lg:col-span-5 lg:col-start-7"
              initial={{ opacity: 0, y: 18 }}
              animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.62 }}
            >
              We bring craft and clear thinking to ambitious brands, and build
              work that earns attention.
            </motion.p>
          </div>
          </div>

          {/* Step 4. The panel now fills the screen, so it needs to say that there
              is more below it — otherwise a full bleed of colour reads as the whole
              page. Arrives last, once the statement has settled. */}
          <motion.div
            className="flex items-center gap-3 pb-10 text-[11px] font-semibold uppercase tracking-[0.18em] text-black/70"
            initial={{ opacity: 0, y: 10 }}
            animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.95 }}
          >
            Scroll
            {/* Travels down and fades at the end of its run, so the loop restarts
                from rest instead of snapping back. */}
            <motion.span
              className="block h-6 w-px bg-black/40"
              animate={{ y: [0, 8, 0], opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </header>

        {/* ── SERVICES ────────────────────────────────────────────── */}
        {/*
          A pinned stack: the section holds still and each card slides up over the
          last, so scrolling swaps the service instead of moving the page past it.

          This replaced the drawn ribbon, which is gone entirely. Two reasons. It was
          the most expensive thing in the codebase per frame — `pathLength` is a dash
          pattern, which is not compositable, so every frame of the draw repainted a
          full-bleed SVG as tall as the whole list, while a spring-driven
          `getPointAtLength` walked a ~35-segment path on the side. And it was
          decoration: it carried no information about the services it ran past.

          Full bleed here — the stack owns the whole width, so it sits outside the
          page's content gutters. `main`'s padding is cancelled and each card applies
          its own.
        */}
        <div className="-mx-4 md:-mx-[clamp(32px,6vw,120px)]">
          <ServiceStack services={SERVICES} />
        </div>

        {/* ── CLOSING PANEL ───────────────────────────────────────── */}
        {/*
          Replaces the previous closing CTA — a bordered block with "Not sure where to
          start?" and a "Start a conversation" pill. Two closing calls to action on one
          page is one too many, and the new panel does the same job with more weight at
          the point where someone has just read all six services.

          Full bleed, like the stack above it: `main`'s padding is cancelled and the
          panel applies its own, so the dark surface reaches the viewport edges while its
          copy stays on the page's measure.
        */}
        <div className="-mx-4 md:-mx-[clamp(32px,6vw,120px)]">
          <ServiceClosing />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WhatWeDo;
