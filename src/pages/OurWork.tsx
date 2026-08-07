import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Carousel } from "@/components/ui/carousel";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { usePortfolioWorks, getStorageUrl } from "@/hooks/use-portfolio-works";
import { MediaRenderer } from "@/components/MediaRenderer";
import { Globe, Palette, Video, LayoutGrid, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { BlurLine, BlurLines } from "@/components/BlurLines";
import { useSiteContent } from "@/hooks/use-site-content";

const EASE = [0.16, 1, 0.3, 1] as const;

const getCategoryIcon = (category: string, className = "w-4 h-4") => {
  switch (category) {
    case "Website":
      return <Globe className={className} />;
    case "Graphics Design":
      return <Palette className={className} />;
    case "Video":
      return <Video className={className} />;
    default:
      return <LayoutGrid className={className} />;
  }
};

const OurWork = () => {
  const { data: portfolioWorks, isLoading } = usePortfolioWorks();
  const { text } = useSiteContent();

  /* Keyed on its own copy so an edit in the dashboard replays the reveal
     instead of leaving the previous words frozen. */
  const headingOne = text("work.heading_line_1", "Take a look at");
  const headingTwo = text("work.heading_line_2", "our projects");

  const workSlides = portfolioWorks?.map((work) => (
    <a
      key={work.id}
      href={work.website_url || undefined}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full aspect-[16/9] block cursor-pointer group"
    >
      <div className="w-full h-full overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 relative bg-white dark:bg-neutral-900 shadow-[0_15px_35px_rgba(0,0,0,0.07)] dark:shadow-[0_20px_45px_rgba(0,0,0,0.65)] group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)] dark:group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.85)] group-hover:-translate-y-2 transition-all duration-500 transform-gpu will-change-transform">
        <MediaRenderer
          url={getStorageUrl(work.image_url)}
          mediaType={work.media_type}
          alt={work.title}
          className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-[1.02]"
        />
        {/* Sleek Minimalist Tag - Always visible */}
        <div className="absolute bottom-4 left-4 pointer-events-none">
          <span className="backdrop-blur-md bg-white/80 dark:bg-black/60 border border-black/10 dark:border-white/10 text-black dark:text-white px-4 py-2 rounded-xl text-sm font-semibold tracking-wide shadow-lg flex items-center gap-2">
            {getCategoryIcon(work.category, "w-4 h-4")}
            <span>{work.title}</span>
          </span>
        </div>
      </div>
    </a>
  )) || [];

  /* Skeleton mirrors the real layout below 1:1 — same wrapper padding, same
     max-widths, same carousel geometry — so nothing shifts when data lands.
     Colours are theme tokens, not fixed neutrals, so it reads in both modes. */
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background font-['Schibsted_Grotesk',sans-serif]">
        <Navigation />
        <div className="px-4 pb-24 pt-28 sm:pt-32 md:px-[clamp(32px,6vw,120px)]">
          <div className="max-w-7xl mx-auto animate-pulse">
            {/* Mirrors the eyebrow, the two oversized display lines and the
                side paragraph, so the header does not jump when data lands. */}
            <div className="mb-10 lg:mb-16">
              <div className="mb-4 h-3 w-24 rounded bg-foreground/10" />
              <div className="space-y-2">
                <div className="h-[clamp(2rem,7vw,7rem)] w-[min(100%,480px)] rounded-2xl bg-foreground/10" />
                <div className="h-[clamp(2rem,7vw,7rem)] w-[min(100%,400px)] rounded-2xl bg-foreground/[0.08]" />
              </div>
              <div className="mt-8 grid grid-cols-1 lg:mt-12 lg:grid-cols-12">
                <div className="space-y-2.5 lg:col-span-5 lg:col-start-7">
                  <div className="h-5 w-full rounded-lg bg-foreground/[0.07]" />
                  <div className="h-5 w-[80%] rounded-lg bg-foreground/[0.07]" />
                </div>
              </div>
            </div>

            {/* carousel — same max-w-5xl track and 100%/85% slide width */}
            <div className="mx-auto max-w-5xl">
              <div className="overflow-hidden">
                <div className="flex">
                  <div className="flex-[0_0_100%] px-3 md:flex-[0_0_85%]">
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-black/10 bg-foreground/[0.07] dark:border-white/10">
                      {/* the always-visible category tag on each slide */}
                      <div className="absolute bottom-4 left-4 h-10 w-44 rounded-xl bg-foreground/10" />
                    </div>
                  </div>
                  <div className="hidden flex-[0_0_85%] px-3 md:block">
                    <div className="aspect-[16/9] w-full rounded-2xl border border-black/10 bg-foreground/[0.04] dark:border-white/10" />
                  </div>
                </div>
              </div>

              {/* dots + autoplay progress + play button */}
              <div className="mx-auto mt-7 flex w-full max-w-sm items-center justify-center gap-4 px-4 sm:justify-between">
                <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-2.5 w-2.5 rounded-full sm:h-3 sm:w-3 ${
                        i === 0 ? "bg-foreground/30" : "bg-foreground/10"
                      }`}
                    />
                  ))}
                </div>
                <div className="hidden h-1.5 w-24 shrink-0 rounded-full bg-foreground/10 sm:block" />
                <div className="hidden h-10 w-10 shrink-0 rounded-full bg-foreground/10 sm:block" />
              </div>
            </div>

            {/* "See All Works" button */}
            <div className="mt-10 flex justify-center">
              <div className="h-14 w-44 rounded-full bg-foreground/10" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-['Schibsted_Grotesk',sans-serif]">
      <Navigation />
      <div className="px-4 pb-24 pt-28 sm:pt-32 md:px-[clamp(32px,6vw,120px)]">
        <div className="max-w-7xl mx-auto">
          {/* Same header system as the services page and the gallery. */}
          <header className="mb-10 lg:mb-16">
            <motion.div
              className="mb-4 flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground sm:text-xs"
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
              {text("work.eyebrow", "Our Work")}
            </motion.div>

            <h1>
              <BlurLines
                key={`${headingOne}|${headingTwo}`}
                className="block text-foreground"
                style={{
                  fontSize: "clamp(2.25rem, 8vw, 8.5rem)",
                  lineHeight: 0.97,
                  letterSpacing: "-0.045em",
                  fontWeight: 500,
                }}
              >
                <BlurLine delay={0.05}>{headingOne}</BlurLine>
                <BlurLine delay={0.14} last>
                  {headingTwo}
                </BlurLine>
              </BlurLines>
            </h1>

            <div className="mt-8 grid grid-cols-1 lg:mt-12 lg:grid-cols-12">
              <motion.p
                className="max-w-[34ch] text-base leading-[1.4] text-foreground sm:text-lg md:text-xl lg:col-span-5 lg:col-start-7"
                initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.28 }}
              >
                {text(
                  "work.intro",
                  "Brand identities, websites, apps and video — built by one team and shipped for real businesses.",
                )}
              </motion.p>
            </div>
          </header>
          
          <FadeInWhenVisible delay={0.2}>
            {workSlides.length > 0 ? (
              <Carousel slides={workSlides} />
            ) : (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground">No portfolio items yet</p>
              </div>
            )}
          </FadeInWhenVisible>
          
          <FadeInWhenVisible delay={0.3}>
            <div className="flex justify-center mt-10">
              <motion.button 
                whileHover={{ scale: 1.04, translateY: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.location.href = '/portfolio-gallery'}
                /* Was fixed white-on-black, which sat white-on-white in light
                   mode and relied on its border to be visible at all. */
                className="group flex h-14 items-center gap-2 rounded-full bg-foreground px-10 font-bold text-background transition-opacity duration-300 hover:opacity-85"
              >
                <span>{text("work.cta_label", "See All Works")}</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OurWork;
