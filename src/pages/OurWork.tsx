import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Carousel } from "@/components/ui/carousel";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { usePortfolioWorks, getStorageUrl } from "@/hooks/use-portfolio-works";
import { MediaRenderer } from "@/components/MediaRenderer";
import { Globe, Palette, Video, LayoutGrid, ArrowUpRight } from "lucide-react";
import { NotchedFrame } from "@/components/NotchedFrame";
import { PageHeader } from "@/components/PageHeader";
import { useSiteContent } from "@/hooks/use-site-content";

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

/* Shared so the skeleton and the real page cannot drift apart. */
const SHELL = "px-4 md:px-[clamp(20px,2.6vw,52px)]";
const WELL = "mx-auto max-w-[1920px]";
/* The carousel used to sit inside a `max-w-5xl` of its own, nested in a
   `max-w-7xl` wrapper, inside 120px gutters — three caps stacked, which is why
   the preview ended up a fraction of the width of the headline above it. One
   cap now, and it is wide. */
const TRACK = "mx-auto w-full max-w-[1680px]";
const SLIDE = "flex-[0_0_100%] md:flex-[0_0_88%] xl:flex-[0_0_82%]";

const OurWork = () => {
  const { data: portfolioWorks, isLoading } = usePortfolioWorks();
  const { text } = useSiteContent();

  const headingOne = text("work.heading_line_1", "Take a look at");
  const headingTwo = text("work.heading_line_2", "our projects");

  const workSlides =
    portfolioWorks?.map((work) => {
      const body = (
        <>
          {/* Same notched frame as the gallery and the homepage grid, so the
              three places we show a project all read as one system. The old
              slide was a plain rounded card with a blurred glass pill floating
              over the media — a different language on every page. */}
          <NotchedFrame
            className="aspect-[16/10] transition-transform duration-500 will-change-transform group-hover:-translate-y-2 motion-reduce:transform-none"
            radiusClassName="rounded-[20px] md:rounded-[34px]"
            shadowClassName="[filter:drop-shadow(0_2px_4px_rgba(0,0,0,0.06))_drop-shadow(0_18px_36px_rgba(0,0,0,0.13))] group-hover:[filter:drop-shadow(0_3px_6px_rgba(0,0,0,0.08))_drop-shadow(0_30px_56px_rgba(0,0,0,0.2))] dark:[filter:drop-shadow(0_2px_5px_rgba(0,0,0,0.5))_drop-shadow(0_22px_44px_rgba(0,0,0,0.65))] dark:group-hover:[filter:drop-shadow(0_3px_8px_rgba(0,0,0,0.6))_drop-shadow(0_34px_64px_rgba(0,0,0,0.8))]"
            tags={[
              <span
                key="category"
                className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-foreground px-4 py-2 text-xs font-bold text-background"
              >
                {getCategoryIcon(work.category, "w-3.5 h-3.5")}
                {work.category}
              </span>,
            ]}
            meta={
              <span className="whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                {work.created_at
                  ? new Date(work.created_at).getFullYear()
                  : "Project"}
              </span>
            }
          >
            <MediaRenderer
              url={getStorageUrl(work.image_url)}
              mediaType={work.media_type}
              alt={work.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </NotchedFrame>

          {/* Caption below the media rather than a pill on top of it, at the
              display scale the rest of the site uses. */}
          <div className="mt-5 md:mt-7">
            <h3
              className="flex flex-wrap items-baseline gap-x-3 text-foreground transition-colors duration-300 group-hover:text-muted-foreground"
              style={{
                fontSize: "clamp(1.5rem, 2.6vw, 2.85rem)",
                lineHeight: 1.04,
                letterSpacing: "-0.04em",
                fontWeight: 700,
              }}
            >
              {work.title}
              {work.website_url && (
                <ArrowUpRight
                  className="h-[0.55em] w-[0.55em] shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 motion-reduce:transform-none"
                  aria-hidden="true"
                />
              )}
            </h3>
            {(work.short_description || work.description) && (
              <p className="mt-3 line-clamp-2 max-w-[58ch] text-base font-medium leading-relaxed text-muted-foreground sm:text-lg">
                {work.short_description || work.description}
              </p>
            )}
          </div>
        </>
      );

      /* Only wrap in an anchor when there is somewhere to go. It used to render
         `<a>` with an undefined href on every slide, which is a link that
         announces itself to a screen reader and then does nothing. */
      return work.website_url ? (
        <a
          key={work.id}
          href={work.website_url}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          {body}
        </a>
      ) : (
        <div key={work.id} className="group block">
          {body}
        </div>
      );
    }) ?? [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background font-['Schibsted_Grotesk',sans-serif]">
        <Navigation />
        <div
          className={SHELL}
          style={{
            paddingTop: "clamp(104px, 12vw, 168px)",
            paddingBottom: "clamp(56px, 7vw, 120px)",
          }}
        >
          <div className={`${WELL} animate-pulse`}>
            <div className="mb-12 lg:mb-20">
              <div className="mb-4 h-3 w-24 rounded bg-foreground/10 sm:hidden" />
              <div className="space-y-2">
                <div className="h-[clamp(2rem,7.4vw,7.6rem)] w-[min(100%,720px)] rounded-2xl bg-foreground/10" />
                <div className="h-[clamp(2rem,7.4vw,7.6rem)] w-[min(100%,560px)] rounded-2xl bg-foreground/[0.08]" />
              </div>
              <div className="mt-8 grid grid-cols-1 lg:mt-14 lg:grid-cols-12">
                <div className="space-y-2.5 lg:col-span-6 lg:col-start-7">
                  <div className="h-6 w-full rounded-lg bg-foreground/[0.07]" />
                  <div className="h-6 w-[78%] rounded-lg bg-foreground/[0.07]" />
                </div>
              </div>
            </div>

            <div className={TRACK}>
              <div className="overflow-hidden">
                <div className="flex">
                  <div className={`${SLIDE} px-2 sm:px-3 lg:px-4`}>
                    <div className="aspect-[16/10] w-full rounded-[20px] bg-foreground/[0.07] md:rounded-[34px]" />
                    <div className="mt-5 space-y-3 md:mt-7">
                      <div className="h-9 w-[60%] rounded-lg bg-foreground/10" />
                      <div className="h-5 w-[80%] rounded bg-foreground/[0.06]" />
                    </div>
                  </div>
                  <div className="hidden flex-[0_0_88%] px-2 sm:px-3 lg:block lg:px-4">
                    <div className="aspect-[16/10] w-full rounded-[20px] bg-foreground/[0.04] md:rounded-[34px]" />
                  </div>
                </div>
              </div>

              <div className="mx-auto mt-8 flex w-full max-w-md items-center justify-center gap-5 px-4 sm:justify-between lg:mt-10">
                <div className="flex shrink-0 items-center gap-2">
                  <div className="h-2.5 w-7 rounded-full bg-foreground/25" />
                  <div className="h-2.5 w-2.5 rounded-full bg-foreground/10" />
                  <div className="h-2.5 w-2.5 rounded-full bg-foreground/10" />
                </div>
                <div className="hidden h-1.5 w-28 shrink-0 rounded-full bg-foreground/10 sm:block" />
                <div className="hidden h-11 w-11 shrink-0 rounded-full border border-border sm:block" />
              </div>
            </div>

            <div className="mt-14 flex justify-center lg:mt-20">
              <div className="h-16 w-64 rounded-full bg-foreground/10 sm:h-[76px] sm:w-80" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-background font-['Schibsted_Grotesk',sans-serif]">
      <Navigation />
      <div
        className={SHELL}
        style={{
          paddingTop: "clamp(104px, 12vw, 168px)",
          paddingBottom: "clamp(56px, 7vw, 120px)",
        }}
      >
        <div className={WELL}>
          {/* Now the shared header, which also brings the headline to weight 700
              — it was still 500 here while the gallery beside it was 700. */}
          <PageHeader
            key={`${headingOne}|${headingTwo}`}
            eyebrow={text("work.eyebrow", "Our Work")}
            lines={[headingOne, headingTwo]}
            support={text(
              "work.intro",
              "Brand identities, websites, apps and video — built by one team and shipped for real businesses.",
            )}
          />

          <FadeInWhenVisible delay={0.15}>
            {workSlides.length > 0 ? (
              <Carousel
                slides={workSlides}
                className={TRACK}
                slideClassName={SLIDE}
              />
            ) : (
              <div className="border-t border-border py-20 text-center">
                <p className="text-xl text-muted-foreground">
                  No portfolio items yet
                </p>
              </div>
            )}
          </FadeInWhenVisible>

          {/* Bigger, and a real route change. It was a `motion.button` running
              `window.location.href`, which tears down the whole SPA and reloads
              the document just to move between two client-side routes. */}
          <FadeInWhenVisible delay={0.25}>
            <div className="mt-14 flex justify-center lg:mt-20">
              <motion.div
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.985 }}
                transition={{ type: "spring", stiffness: 420, damping: 28 }}
              >
                <Link
                  to="/portfolio-gallery"
                  className="group inline-flex h-16 items-center gap-3 rounded-full bg-foreground pl-8 pr-3 text-background transition-opacity duration-300 hover:opacity-90 sm:h-[76px] sm:pl-11 sm:pr-4"
                >
                  <span
                    style={{
                      fontSize: "clamp(1.05rem, 1.5vw, 1.5rem)",
                      letterSpacing: "-0.03em",
                      fontWeight: 700,
                    }}
                  >
                    {text("work.cta_label", "See All Works")}
                  </span>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background/15 text-background transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 motion-reduce:transform-none sm:h-12 sm:w-12">
                    <ArrowUpRight className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.25} />
                  </span>
                </Link>
              </motion.div>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OurWork;
