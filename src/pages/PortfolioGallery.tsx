import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { useState, useMemo } from "react";
import { usePortfolioWorks, getStorageUrl, type PortfolioWork } from "@/hooks/use-portfolio-works";
import { MediaRenderer } from "@/components/MediaRenderer";
import { Globe, Palette, Video, LayoutGrid, X, ExternalLink, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BlurLine, BlurLines } from "@/components/BlurLines";
import { useSiteContent } from "@/hooks/use-site-content";
import { NotchedFrame } from "@/components/NotchedFrame";

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

const EASE = [0.16, 1, 0.3, 1] as const;

const PortfolioGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeLightboxItem, setActiveLightboxItem] = useState<PortfolioWork | null>(null);
  const { data: portfolioItems, isLoading } = usePortfolioWorks();
  const { text } = useSiteContent();

  /* The masked reveal only plays once per mount, so the heading is keyed on its
     own copy — otherwise editing it in the dashboard would leave the old words
     frozen mid-reveal until a hard refresh. */
  const headingOne = text("gallery.heading_line_1", "Every project,");
  const headingTwo = text("gallery.heading_line_2", "in one place");

  // Get unique categories from the full dataset, ordered with Video before Website
  const categories = useMemo(() => {
    if (!portfolioItems) return ["All"];
    const uniqueCategories = Array.from(new Set(portfolioItems.map(item => item.category)));
    
    // Video icon/tab should show before Website
    const customOrder = ["Video", "Website", "Graphics Design"];
    const sortedCategories = uniqueCategories.sort((a, b) => {
      const indexA = customOrder.indexOf(a);
      const indexB = customOrder.indexOf(b);
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return a.localeCompare(b);
    });
    
    return ["All", ...sortedCategories];
  }, [portfolioItems]);

  const filteredItems = useMemo(() => {
    if (!portfolioItems) return [];
    if (selectedCategory === "All") {
      // Sort video items first, keeping the display_order sorting within each group
      return [...portfolioItems].sort((a, b) => {
        const aIsVideo = a.category === "Video" || a.media_type === "video";
        const bIsVideo = b.category === "Video" || b.media_type === "video";
        if (aIsVideo && !bIsVideo) return -1;
        if (!aIsVideo && bIsVideo) return 1;
        return (a.display_order || 0) - (b.display_order || 0);
      });
    }
    return portfolioItems.filter((item) => item.category === selectedCategory);
  }, [portfolioItems, selectedCategory]);

  /* Skeleton mirrors the loaded gallery exactly — same wrapper, heading scale,
     filter pill row and 3-up grid — so the page doesn't reflow on arrival. */
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground font-['Schibsted_Grotesk',sans-serif]">
        <Navigation />
        <div className="px-4 pb-24 pt-28 sm:pt-32 md:px-[clamp(32px,6vw,120px)]">
          <div className="mx-auto max-w-7xl animate-pulse">
            {/* Mirrors the two oversized display lines and the side paragraph, so
                the header does not jump when the query resolves. */}
            <div className="mb-10 lg:mb-16">
              <div className="mb-4 h-3 w-24 rounded bg-foreground/10" />
              <div className="space-y-2">
                <div className="h-[clamp(2rem,7vw,7rem)] w-[min(100%,520px)] rounded-2xl bg-foreground/10" />
                <div className="h-[clamp(2rem,7vw,7rem)] w-[min(100%,420px)] rounded-2xl bg-foreground/[0.08]" />
              </div>
              <div className="mt-8 grid grid-cols-1 lg:mt-12 lg:grid-cols-12">
                <div className="space-y-2.5 lg:col-span-5 lg:col-start-7">
                  <div className="h-5 w-full rounded-lg bg-foreground/[0.07]" />
                  <div className="h-5 w-[80%] rounded-lg bg-foreground/[0.07]" />
                </div>
              </div>
            </div>

            {/* category filter pills — same 44/48px height as the real strip */}
            <div className="mb-12 flex flex-wrap gap-2 lg:mb-20 lg:gap-2.5">
              {[104, 96, 140, 112].map((w, i) => (
                <div
                  key={i}
                  className="h-11 rounded-full border border-border bg-foreground/[0.06] sm:h-12"
                  style={{ width: w }}
                />
              ))}
            </div>

            {/* gallery grid */}
            <div className="grid min-h-[400px] grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-black/10 bg-foreground/[0.07] dark:border-white/10"
                >
                  <div className="absolute bottom-4 left-4 h-10 w-40 rounded-xl bg-foreground/10" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
        <span className="sr-only" role="status" aria-live="polite">
          Loading gallery
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground font-['Schibsted_Grotesk',sans-serif]">
      <Navigation />
      {/* Wider gutters and a wider well: the grid was capped at max-w-7xl
          inside 120px gutters, which left the cards far narrower than the
          headline above them. */}
      {/* Near full-bleed: the reference layout runs its work grid right out to
          the page gutters rather than sitting in a narrow centred column. */}
      <div className="px-4 pb-24 pt-28 sm:pt-32 md:px-[clamp(20px,2.6vw,52px)]">
        <div className="mx-auto max-w-[1920px]">
          {/* ── PAGE HEADER ── same typographic system as the services page:
              small eyebrow, oversized medium-weight display lines that wipe up
              from behind a mask as their blur clears, support copy to the side.
              Every string here is editable from the admin dashboard, with the
              original copy kept as the fallback. */}
          <header className="mb-10 lg:mb-20">
            <motion.div
              className="mb-4 flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground sm:text-xs"
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
              {text("gallery.eyebrow", "Gallery")}
            </motion.div>

            <h1>
              <BlurLines
                key={`${headingOne}|${headingTwo}`}
                className="block text-foreground"
                style={{
                  fontSize: "clamp(2.4rem, 8.6vw, 9.5rem)",
                  lineHeight: 0.94,
                  letterSpacing: "-0.05em",
                  fontWeight: 700,
                }}
              >
                <BlurLine delay={0.05}>{headingOne}</BlurLine>
                <BlurLine delay={0.14} last>
                  {headingTwo}
                </BlurLine>
              </BlurLines>
            </h1>

            <div className="mt-8 grid grid-cols-1 lg:mt-14 lg:grid-cols-12">
              {/* Set as a pull-quote: the mark sits in its own column so the
                  text block stays flush left under itself rather than the
                  second line hanging under the glyph. */}
              <motion.blockquote
                className="flex gap-3 sm:gap-4 lg:col-span-6 lg:col-start-7"
                initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.28 }}
              >
                <Quote
                  className="mt-1.5 h-5 w-5 shrink-0 fill-foreground text-foreground sm:mt-2 sm:h-6 sm:w-6"
                  aria-hidden="true"
                />
                <p className="max-w-[30ch] text-xl font-bold leading-[1.25] tracking-[-0.02em] text-foreground sm:text-2xl md:text-3xl">
                  {text(
                    "gallery.intro",
                    "Every project here is work we shipped — brand identities, websites, apps and video, built by one team.",
                  )}
                </p>
              </motion.blockquote>
            </div>
          </header>

          {/* ── CATEGORY FILTER ──────────────────────────────────────────
              One monochrome control strip. The active fill is a *single* shared
              element carried between buttons by `layoutId`, so choosing a filter
              slides the fill across instead of cross-fading two backgrounds.

              The old pills leaned on effects rather than type: a lift on hover,
              two layered box-shadows per state, a backdrop blur, and hard-coded
              `bg-white / dark:bg-neutral-900`. All of it is gone — inactive
              pills are just an outline, and the icons inherit `currentColor`
              from the label so there is one place that decides the colour. */}
          <motion.div
            role="group"
            aria-label="Filter projects by category"
            className="mb-12 flex flex-wrap items-center gap-2 lg:mb-20 lg:gap-2.5"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {categories.map((category) => {
              const isActive = selectedCategory === category;
              const count =
                category === "All"
                  ? portfolioItems?.length ?? 0
                  : portfolioItems?.filter((item) => item.category === category)
                      .length ?? 0;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  aria-pressed={isActive}
                  /* Fixed height rather than vertical padding: the pills then
                     line up regardless of whether a label has a descender, and
                     44px clears the minimum touch target. */
                  className={`relative flex h-11 items-center overflow-hidden rounded-full border px-5 transition-colors duration-300 sm:h-12 sm:px-6 ${
                    isActive
                      ? "border-foreground"
                      : "border-border hover:border-foreground/40"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeCategoryBg"
                      className="absolute inset-0 rounded-full bg-foreground"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span
                    className={`relative z-10 flex items-center gap-2 text-sm font-bold tracking-[-0.01em] transition-colors duration-300 ${
                      isActive ? "text-background" : "text-muted-foreground"
                    }`}
                  >
                    {getCategoryIcon(category, "h-4 w-4 shrink-0")}
                    <span>{category}</span>
                    <span
                      className={`text-[11px] font-semibold tabular-nums ${
                        isActive ? "text-background/55" : "text-muted-foreground/55"
                      }`}
                    >
                      {count}
                    </span>
                  </span>
                </button>
              );
            })}
          </motion.div>

          {/* Gallery Grid — caption sits *below* the image now rather than as a
              pill floating over it: year and category on a meta line, then the
              project name, then its one-line description from Supabase. */}
          <FadeInWhenVisible delay={0.2}>
            <motion.div
              layout
              className="grid min-h-[400px] grid-cols-1 gap-x-12 gap-y-20 md:grid-cols-2 lg:gap-x-20 lg:gap-y-32"
            >
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, i) => (
                  <motion.article
                    layout
                    /*
                      Scroll-triggered, not mount-triggered. These were using
                      `animate`, so every card in the list played its entrance at
                      once on load and there was nothing left to see on scroll.
                      `whileInView` with a small negative margin starts each card
                      just before it reaches the viewport, and the alternating
                      x offset makes the two columns slide in from their own
                      sides.
                    */
                    initial={{ opacity: 0, y: 56, x: i % 2 === 1 ? 24 : -24 }}
                    whileInView={{ opacity: 1, y: 0, x: 0 }}
                    viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{
                      opacity: { duration: 0.5, ease: EASE },
                      x: { duration: 0.8, ease: EASE },
                      y: { duration: 0.8, ease: EASE },
                      layout: { type: "spring", stiffness: 450, damping: 38 },
                    }}
                    key={item.id}
                    onClick={() => setActiveLightboxItem(item)}
                    /*
                      Odd cards drop by roughly half a card so the right column
                      begins level with the middle of the left one, which is the
                      offset in the reference. A card spans about 46vw at this
                      breakpoint and is 16:10, so half its height is ~14vw; the
                      clamp keeps that sane on very small and very wide screens.
                    */
                    className={`group cursor-pointer ${
                      i % 2 === 1 ? "md:mt-[clamp(90px,14vw,260px)]" : ""
                    }`}
                  >
                    {/* Same notched frame the homepage grid uses: rounded on
                        every corner, with the category stepped into the top
                        right and the year stepped into the bottom left. */}
                    <NotchedFrame
                      className="aspect-[16/10] transition-transform duration-500 will-change-transform group-hover:-translate-y-2 motion-reduce:transform-none"
                      radiusClassName="rounded-[20px] md:rounded-[34px]"
                      /* Two stacked drop-shadows: a tight one for the edge and a
                         wide soft one for depth. Both follow the notched
                         silhouette rather than a rectangle. */
                      shadowClassName="[filter:drop-shadow(0_2px_4px_rgba(0,0,0,0.06))_drop-shadow(0_18px_36px_rgba(0,0,0,0.13))] group-hover:[filter:drop-shadow(0_3px_6px_rgba(0,0,0,0.08))_drop-shadow(0_30px_56px_rgba(0,0,0,0.2))] dark:[filter:drop-shadow(0_2px_5px_rgba(0,0,0,0.5))_drop-shadow(0_22px_44px_rgba(0,0,0,0.65))] dark:group-hover:[filter:drop-shadow(0_3px_8px_rgba(0,0,0,0.6))_drop-shadow(0_34px_64px_rgba(0,0,0,0.8))]"
                      tags={[
                        <span
                          key="category"
                          className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-foreground px-4 py-2 text-xs font-bold text-background"
                        >
                          {getCategoryIcon(item.category, "w-3.5 h-3.5")}
                          {item.category}
                        </span>,
                      ]}
                      meta={
                        <span className="whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                          {item.created_at
                            ? new Date(item.created_at).getFullYear()
                            : "Project"}
                        </span>
                      }
                    >
                      <MediaRenderer
                        url={getStorageUrl(item.image_url)}
                        mediaType={item.media_type}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </NotchedFrame>

                    <div className="mt-5 md:mt-7">
                      <h3
                        className="text-foreground transition-colors duration-300 group-hover:text-muted-foreground"
                        style={{
                          fontSize: "clamp(1.6rem, 3vw, 3rem)",
                          lineHeight: 1.05,
                          letterSpacing: "-0.04em",
                          fontWeight: 700,
                        }}
                      >
                        {item.title}
                      </h3>

                      {/* Falls back to the long description so a project with no
                          short line still reads, just clamped. */}
                      {(item.short_description || item.description) && (
                        <p className="mt-3 line-clamp-2 max-w-[52ch] text-base font-medium leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
                          {item.short_description || item.description}
                        </p>
                      )}
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredItems.length === 0 && (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground">No projects found in this category</p>
              </div>
            )}
          </FadeInWhenVisible>
        </div>
      </div>

      {/* Full Screen Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLightboxItem(null)}
            className="fixed inset-0 z-50 bg-black/60 dark:bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-8 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl flex flex-col md:flex-row gap-6 md:gap-8 text-neutral-900 dark:text-white max-h-[90vh] overflow-y-auto cursor-default"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveLightboxItem(null)}
                className="absolute top-4 right-4 bg-neutral-100 hover:bg-neutral-200 dark:bg-white/10 dark:hover:bg-white/20 border border-black/10 dark:border-white/10 text-neutral-800 dark:text-white p-2.5 rounded-full transition-colors z-10 shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Media Section */}
              <div className="flex-1 flex items-center justify-center bg-neutral-50 dark:bg-black/30 rounded-2xl overflow-hidden aspect-[16/10] relative border border-black/5 dark:border-white/5">
                {activeLightboxItem.media_type === "video" ? (
                  <video
                    src={getStorageUrl(activeLightboxItem.image_url)}
                    controls
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-full object-contain max-h-[50vh]"
                  />
                ) : (
                  <img
                    src={getStorageUrl(activeLightboxItem.image_url)}
                    alt={activeLightboxItem.title}
                    className="w-full h-full object-contain max-h-[50vh]"
                  />
                )}
              </div>

              {/* Content Section */}
              <div className="md:w-80 flex flex-col justify-between py-2">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="bg-neutral-100 dark:bg-white/15 border border-black/10 dark:border-white/10 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 text-neutral-800 dark:text-white">
                      {getCategoryIcon(activeLightboxItem.category, "w-3.5 h-3.5")}
                      {activeLightboxItem.category}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
                    {activeLightboxItem.title}
                  </h2>
                  <p className="text-neutral-600 dark:text-white/70 text-sm leading-relaxed">
                    {activeLightboxItem.description}
                  </p>
                </div>

                <div className="mt-8 space-y-3">
                  {activeLightboxItem.website_url && (
                    <a
                      href={activeLightboxItem.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-xl bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/95 transition-colors font-bold text-center flex items-center justify-center gap-2 shadow-md"
                    >
                      <span>Visit Website</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <button
                    onClick={() => setActiveLightboxItem(null)}
                    className="w-full py-3 px-4 rounded-xl bg-neutral-100 dark:bg-white/10 hover:bg-neutral-200 dark:hover:bg-white/15 border border-black/10 dark:border-white/10 text-neutral-800 dark:text-white transition-colors font-bold text-center shadow-sm"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default PortfolioGallery;
