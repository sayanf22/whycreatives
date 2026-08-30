import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link, Navigate, useParams } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { BlurLine, BlurLines } from "@/components/BlurLines";
import { SERVICES, SERVICES_BY_SLUG } from "@/data/services";

const EASE = [0.16, 1, 0.3, 1] as const;

/*
  The service copy lives in `src/data/services.ts`, shared with the services page.
  It used to be declared here as well, and the two had already drifted apart on the
  third service's title.
*/

const ServiceDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? SERVICES[slug] : undefined;

  if (!service) return <Navigate to="/what-we-do" replace />;

  return (
    /*
      Theme-aware, not hard-coded dark. The page previously forced `bg-[#050505]`
      while <Navigation /> renders from theme tokens, so in light mode the nav
      drew black type onto a black page and looked like it had disappeared.
    */
    <div className="min-h-screen bg-background text-foreground font-['Schibsted_Grotesk',sans-serif]">
      <Helmet>
        <title>{`${service.title} | WhyCreatives`}</title>
        <meta name="description" content={service.subtitle} />
      </Helmet>
      <Navigation />

      <main className="px-4 pb-20 pt-28 sm:px-6 sm:pt-36 md:px-8">
        <div className="mx-auto max-w-6xl">
          <Link to="/what-we-do" className="group mb-8 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground lg:mb-12">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to services
          </Link>

          <header className="grid gap-6 border-b border-border pb-10 lg:grid-cols-12 lg:items-end lg:gap-10 lg:pb-20">
            <div className="lg:col-span-8">
              <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: EASE }} className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground lg:mb-5">
                Service / {String(SERVICES.findIndex((s) => s.slug === slug) + 1).padStart(2, "0")} — {String(SERVICES.length).padStart(2, "0")}
              </motion.p>
              {/* Same masked line reveal as the hero, with the blur folded in. */}
              <h1>
                <BlurLines
                  className="block max-w-5xl text-foreground"
                  style={{
                    fontSize: "clamp(2.15rem, 7vw, 7.5rem)",
                    lineHeight: 0.94,
                    letterSpacing: "-0.05em",
                    fontWeight: 500,
                  }}
                  amount={0.3}
                >
                  <BlurLine last>{service.title}</BlurLine>
                </BlurLines>
              </h1>
            </div>
            <motion.p initial={{ opacity: 0, y: 18, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.7, delay: 0.2, ease: EASE }} className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:col-span-4 lg:text-xl">
              {service.subtitle}
            </motion.p>
          </header>
          <section className="grid gap-5 border-b border-border py-10 lg:grid-cols-12 lg:gap-8 lg:py-20">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground lg:col-span-3">Overview</p>
            <div className="lg:col-span-9">
              <p className="max-w-4xl text-xl font-semibold leading-snug tracking-[-0.025em] text-foreground sm:text-2xl md:text-3xl">{service.description}</p>
              {/* 1px gaps come from the parent's background showing through, so
                  the divider colour has to be a border token rather than a
                  fixed white/15 that vanishes in light mode. */}
              <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3 lg:mt-10">
                {service.outcomes.map((outcome, index) => (
                  <motion.div key={outcome} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: index * 0.07, ease: EASE }} className="bg-background p-5 sm:p-6">
                    <span className="mb-6 block font-mono text-xs text-muted-foreground sm:mb-8">0{index + 1}</span>
                    <p className="font-bold leading-snug">{outcome}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-6 border-b border-border py-10 lg:grid-cols-12 lg:gap-8 lg:py-20">
            <div className="lg:col-span-4">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">What we build</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl lg:mt-4 lg:text-5xl">A clear, useful scope.</h2>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-8">
              {service.deliverables.map((item, index) => (
                <motion.li key={item} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.55, delay: index * 0.06, ease: EASE }} className="flex items-start gap-4 rounded-2xl border border-border bg-secondary/40 p-5 text-base font-semibold leading-snug text-foreground/90 transition-colors hover:bg-secondary sm:min-h-28">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foreground text-background"><Check className="h-3.5 w-3.5" /></span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </section>

          <section className="border-b border-border py-10 lg:py-20">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">How we work</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:mt-8 lg:grid-cols-4">
              {service.process.map((step, index) => (
                <motion.article key={step} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }} className="group flex min-h-40 flex-col justify-between gap-8 rounded-3xl bg-foreground p-5 text-background transition-transform duration-500 hover:-translate-y-1 motion-reduce:transform-none sm:min-h-56 sm:p-6">
                  <span className="font-mono text-sm">0{index + 1}</span>
                  <p className="text-lg font-bold leading-tight tracking-[-0.025em] sm:text-xl">{step}</p>
                </motion.article>
              ))}
            </div>
          </section>
          <section className="grid gap-6 py-10 lg:grid-cols-12 lg:gap-8 lg:py-20">
            <div className="lg:col-span-4">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">Technology &amp; products</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl lg:mt-4 lg:text-5xl">Tools chosen for the work.</h2>
              <p className="mt-4 max-w-sm leading-relaxed text-muted-foreground lg:mt-5">We select the stack after discovery. These are products we regularly use—not a requirement forced onto every project.</p>
            </div>
            <div className="flex content-start flex-wrap gap-2 lg:col-span-8">
              {service.tools.map((tool, index) => (
                <motion.span key={tool} initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.035 }} className="rounded-full border border-border px-3.5 py-2 text-[13px] font-bold text-foreground/80 transition-colors hover:border-foreground hover:bg-foreground hover:text-background sm:px-4 sm:py-2.5 sm:text-sm">
                  {tool}
                </motion.span>
              ))}
            </div>
          </section>

          <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.7, ease: EASE }} className="overflow-hidden rounded-[1.75rem] bg-foreground p-6 text-background sm:rounded-[2rem] sm:p-12 lg:flex lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-background/50">Next step</p>
              <h2 className="mt-3 max-w-3xl text-[clamp(1.9rem,6vw,3.75rem)] font-semibold leading-[0.98] tracking-[-0.045em] lg:mt-4">Tell us what needs to change.</h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-background/70 lg:mt-5">We will review the goal, recommend the right scope and send a tailored proposal after discovery. No generic rate card or unnecessary deliverables.</p>
            </div>
            <Link to="/contact" className="group mt-7 inline-flex shrink-0 items-center gap-3 rounded-full bg-background px-6 py-3.5 text-sm font-bold text-foreground transition-transform duration-300 hover:scale-[1.02] motion-reduce:transform-none lg:mt-0">
              Start a conversation <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none" />
            </Link>
          </motion.section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetails;
