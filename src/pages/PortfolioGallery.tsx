import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { useState, useMemo } from "react";
import { usePortfolioWorks, getStorageUrl, type PortfolioWork } from "@/hooks/use-portfolio-works";
import { MediaRenderer } from "@/components/MediaRenderer";
import { Globe, Palette, Video, LayoutGrid, X, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BlurLine, BlurLines } from "@/components/BlurLines";

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

const PortfolioGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeLightboxItem, setActiveLightboxItem] = useState<PortfolioWork | null>(null);
  const { data: portfolioItems, isLoading } = usePortfolioWorks();

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

            {/* category filter pills */}
            <div className="mb-12 flex flex-wrap gap-2.5 sm:gap-3 lg:mb-16">
              {[92, 84, 128, 100].map((w, i) => (
                <div
                  key={i}
                  className="h-[42px] rounded-full border border-black/10 bg-foreground/[0.07] dark:border-white/10"
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
      <div className="px-4 pb-24 pt-28 sm:pt-32 md:px-[clamp(32px,6vw,120px)]">
        <div className="max-w-7xl mx-auto">
          {/* ── PAGE HEADER ── same typographic system as the services page:
              small eyebrow, oversized medium-weight display lines that wipe up
              from behind a mask as their blur clears, support copy to the side. */}
          <header className="mb-10 lg:mb-16">
            <motion.div
              className="mb-4 flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground sm:text-xs"
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
              Gallery
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
                <BlurLine delay={0.05}>Every project,</BlurLine>
                <BlurLine delay={0.14} last>
                  in one place
                </BlurLine>
              </BlurLines>
            </h1>

            <div className="mt-8 grid grid-cols-1 lg:mt-12 lg:grid-cols-12">
              <motion.p
                className="max-w-[34ch] text-base leading-[1.4] text-foreground sm:text-lg md:text-xl lg:col-span-5 lg:col-start-7"
                initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
              >
                The full collection — brand identities, websites, apps and video,
                filtered however you want to read it.
              </motion.p>
            </div>
          </header>

          <FadeInWhenVisible>
            <div className="mb-12">
              {/* Category Filter with Sliding Animation & Depth */}
              <div className="relative mb-12 flex flex-wrap gap-2.5 sm:gap-3 lg:mb-16">
                {categories.map((category) => {
                  const isActive = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className="relative px-6 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 overflow-hidden border border-black/10 dark:border-white/10 bg-white/90 dark:bg-neutral-900/40 backdrop-blur-sm shadow-[0_4px_12px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)] hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeCategoryBg"
                          className="absolute inset-0 bg-black dark:bg-white z-0 shadow-[0_4px_12px_rgba(0,0,0,0.15)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.08)]"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className={`relative z-10 flex items-center gap-2 transition-colors duration-300 ${
                        isActive 
                          ? "text-white dark:text-black" 
                          : "text-black/70 dark:text-white/70"
                      }`}>
                        {getCategoryIcon(
                          category, 
                          isActive 
                            ? "text-white dark:text-black w-4 h-4 transition-colors duration-300" 
                            : "text-black/70 dark:text-white/70 w-4 h-4 transition-colors duration-300"
                        )}
                        <span>{category}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </FadeInWhenVisible>

          {/* Gallery Grid */}
          <FadeInWhenVisible delay={0.2}>
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px] p-4"
            >
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ 
                      opacity: { duration: 0.2 },
                      layout: { type: "spring", stiffness: 450, damping: 38 },
                      scale: { duration: 0.2 }
                    }}
                    key={item.id}
                    onClick={() => setActiveLightboxItem(item)}
                    className="group relative cursor-pointer aspect-[16/10]"
                  >
                    <div className="w-full h-full overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 relative bg-white dark:bg-neutral-900 shadow-[0_15px_35px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_45px_rgba(0,0,0,0.65)] group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)] dark:group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.85)] group-hover:-translate-y-2.5 transition-all duration-500 transform-gpu will-change-transform">
                      <MediaRenderer
                        url={getStorageUrl(item.image_url)}
                        mediaType={item.media_type}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      {/* Sleek Minimalist Tag - Always visible */}
                      <div className="absolute bottom-4 left-4 pointer-events-none">
                        <span className="backdrop-blur-md bg-white/80 dark:bg-black/60 border border-black/10 dark:border-white/10 text-black dark:text-white px-4 py-2 rounded-xl text-xs font-semibold tracking-wide shadow-lg flex items-center gap-1.5">
                          {getCategoryIcon(item.category, "w-3.5 h-3.5")}
                          <span>{item.title}</span>
                        </span>
                      </div>
                    </div>
                  </motion.div>
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
