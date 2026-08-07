import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { RevealLines } from "@/components/RevealLines";
import {
  ArrowUpRight,
  Globe,
  Instagram,
  Megaphone,
  Palette,
  Share2,
  Video,
  type LucideIcon,
} from "lucide-react";
import { Helmet } from "react-helmet-async";

const EASE = [0.16, 1, 0.3, 1] as const;

type Service = {
  title: string;
  heading: string;
  tagline: string;
  body: string;
  points: string[];
  href: string;
  Icon: LucideIcon;
};

/* Previously six near-identical JSX blocks, each repeating the same wrapper,
   icon frame, bullet list and button. Driving them from data keeps the styling
   in one place so the theme and type stay consistent. */
const SERVICES: Service[] = [
  {
    title: "Video Editing & Motion Design",
    heading: "Full-service video editing and motion design",
    tagline: "From concept to final cut, we craft cinematic experiences.",
    body: "We handle everything from on-location shooting with cinema-grade equipment to high-end post-production.",
    points: [
      "Professional cinematography and shooting",
      "Scriptwriting and storyboarding",
      "Advanced colour grading and editing",
    ],
    href: "/services/video-production",
    Icon: Video,
  },
  {
    title: "Web & App Development",
    heading: "High-performance web and app development",
    tagline: "Digital experiences engineered for growth.",
    body: "We build scalable, secure and lightning-fast products that form the foundation of your digital presence.",
    points: [
      "Custom full-stack development",
      "E-commerce and booking solutions",
      "Technical SEO and Core Web Vitals tuning",
    ],
    href: "/services/web-development",
    Icon: Globe,
  },
  {
    title: "Brand Presence",
    heading: "Strategic brand management",
    tagline: "Cultivating communities and driving engagement.",
    body: "We don't just post. We curate a cohesive identity that resonates with your audience across every channel.",
    points: [
      "Cross-platform strategy and production",
      "Audience analytics and community engagement",
      "Influencer partnerships",
    ],
    href: "/services/brand-presence",
    Icon: Share2,
  },
  {
    title: "Performance Marketing",
    heading: "Data-driven advertising",
    tagline: "Turning ad spend into measurable revenue.",
    body: "Our campaigns are built on data, optimised for conversion and scaled for return on investment.",
    points: [
      "Multi-channel campaigns across Meta, Google and LinkedIn",
      "Conversion rate optimisation and funnel tuning",
      "Retargeting and ROI analytics",
    ],
    href: "/services/performance-marketing",
    Icon: Megaphone,
  },
  {
    title: "UGC & Collabs",
    heading: "Content creation and collaborations",
    tagline: "UGC reels and joint collaborations.",
    body: "Tailored content strategy, scriptwriting and high-impact reels to lift your brand presence.",
    points: [
      "Tailored content strategy and ideation",
      "UGC reel and joint collaboration formats",
      "End-to-end creative and post-production management",
    ],
    href: "/services/ugc-collaborations",
    Icon: Instagram,
  },
  {
    title: "Logo Design",
    heading: "Memorable brand identity",
    tagline: "Crafting logos that leave lasting impressions.",
    body: "Your logo is the face of your brand. We design unique, versatile marks that stand out in any market.",
    points: [
      "Multiple concept designs and guidelines",
      "Unlimited revisions and print-ready files",
      "Social media identity asset kit",
    ],
    href: "/services/logo-design",
    Icon: Palette,
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
      name: "How much does professional video marketing cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our professional video editing starts from ₹6,999. Web design starts from ₹4,999. We offer agency-level performance at highly affordable pricing across India.",
      },
    },
  ],
};

/**
 * One service block. Rows alternate their slide direction so the page reads as
 * a sequence rather than a stack of identical fades.
 */
const ServiceRow = ({ service, index }: { service: Service; index: number }) => {
  const fromLeft = index % 2 === 0;

  return (
    <article className="border-t border-border py-12 lg:py-20">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
        {/* Sticky index and title, so the heading stays with its content while
            the detail column scrolls past on desktop. */}
        <motion.div
          className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start"
          initial={{ opacity: 0, x: fromLeft ? -36 : 36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease: EASE }}
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-secondary">
            <service.Icon className="h-6 w-6 text-foreground" strokeWidth={2} />
          </div>

          <h2
            className="text-foreground"
            style={{
              fontSize: "clamp(1.75rem, 3vw, 3.25rem)",
              lineHeight: 1.03,
              letterSpacing: "-0.04em",
              fontWeight: 700,
            }}
          >
            {service.title}
          </h2>
        </motion.div>

        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, x: fromLeft ? 36 : -36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: EASE, delay: 0.08 }}
        >
          <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            {service.heading}
          </h3>
          <p className="mt-2 text-base text-muted-foreground sm:text-lg">
            {service.tagline}
          </p>
          <p className="mt-5 text-base leading-relaxed text-foreground/80 sm:text-lg">
            {service.body}
          </p>

          <ul className="mt-7 space-y-3">
            {service.points.map((point, i) => (
              <motion.li
                key={point}
                className="flex items-start gap-3 text-base text-foreground/80 sm:text-lg"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.07 }}
              >
                <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
                {point}
              </motion.li>
            ))}
          </ul>

          {/* Same steady hover language as the homepage CTAs: no lift, so the
              button cannot shift out from under the pointer. */}
          <Link
            to={service.href}
            className="group mt-9 inline-flex items-center gap-2.5 rounded-full bg-[#d4ff33] px-6 py-3 text-sm font-bold text-black transition-[background-color,box-shadow,transform] duration-300 ease-out hover:bg-[#c4f020] hover:shadow-[0_12px_30px_-12px_rgba(212,255,51,0.95)] active:scale-[0.98] motion-reduce:transform-none"
          >
            View details &amp; pricing
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black/15 transition-[background-color,transform] duration-300 ease-out group-hover:scale-110 group-hover:bg-black/25 motion-reduce:transform-none">
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
            </span>
          </Link>
        </motion.div>
      </div>
    </article>
  );
};

const WhatWeDo = () => {
  return (
    <div className="min-h-screen bg-background font-['Schibsted_Grotesk',sans-serif]">
      <Helmet>
        <title>
          Creative Services | Video Editing, Motion Design & Web Development
        </title>
        <meta
          name="description"
          content="Discover WhyCreatives' premium services: High-end video editing, custom web development, performance marketing, and branding. Award-winning agency quality at affordable prices."
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
          content="Discover WhyCreatives' premium services. Award-winning agency quality at affordable prices."
        />
        <meta property="og:url" content="https://whycreatives.in/what-we-do" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Navigation />

      <main
        className="px-4 md:px-[clamp(32px,6vw,160px)]"
        style={{
          paddingTop: "clamp(104px, 12vw, 160px)",
          paddingBottom: "clamp(56px, 7vw, 120px)",
        }}
      >
        {/* ── PAGE HEADER ─────────────────────────────────────────── */}
        <header className="mb-14 lg:mb-24">
          <motion.div
            className="mb-5 flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground"
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
            What we do
          </motion.div>

          <h1
            className="text-foreground"
            style={{
              fontSize: "clamp(2.3rem, 5.6vw, 6.5rem)",
              lineHeight: 1.0,
              letterSpacing: "-0.045em",
              fontWeight: 700,
            }}
          >
            <RevealLines
              lines={["Everything your", "brand needs, built", "by one team."]}
              className="block"
              nowrapFromLg
            />
          </h1>

          <motion.p
            className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.25 }}
          >
            Six disciplines under one roof, so nothing gets lost in a handover
            and nothing gets billed twice.
          </motion.p>
        </header>

        {/* ── SERVICES ────────────────────────────────────────────── */}
        {SERVICES.map((service, i) => (
          <ServiceRow key={service.title} service={service} index={i} />
        ))}

        {/* ── CLOSING CTA ─────────────────────────────────────────── */}
        <motion.div
          className="mt-16 border-t border-border pt-12 lg:mt-24"
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
              fontWeight: 700,
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
