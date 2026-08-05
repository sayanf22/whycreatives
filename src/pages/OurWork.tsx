import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Carousel } from "@/components/ui/carousel";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { usePortfolioWorks, getStorageUrl } from "@/hooks/use-portfolio-works";
import { MediaRenderer } from "@/components/MediaRenderer";
import { Globe, Palette, Video, LayoutGrid, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-32 pb-24 px-4">
          <div className="max-w-7xl mx-auto animate-pulse">
            {/* Header Skeleton */}
            <div className="text-center mb-16 space-y-4">
              <div className="h-16 w-64 bg-neutral-900 dark:bg-neutral-800 rounded-2xl mx-auto" />
              <div className="h-6 w-full max-w-xl bg-neutral-900/60 dark:bg-neutral-800/60 rounded-xl mx-auto" />
              <div className="h-6 w-full max-w-md bg-neutral-900/40 dark:bg-neutral-800/40 rounded-xl mx-auto" />
            </div>

            {/* Cards Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-full aspect-[16/9] bg-neutral-900/40 dark:bg-neutral-800/40 rounded-2xl border border-neutral-900 relative overflow-hidden"
                >
                  {/* Bottom Tag Skeleton */}
                  <div className="absolute bottom-4 left-4 w-44 h-10 bg-neutral-900/60 dark:bg-neutral-800/60 rounded-xl" />
                </div>
              ))}
            </div>

            {/* Button Skeleton */}
            <div className="flex justify-center mt-12">
              <div className="w-44 h-14 bg-neutral-900/40 dark:bg-neutral-800/40 rounded-full" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-32 pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          <FadeInWhenVisible>
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl font-bold mb-6">Our Work</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Explore our portfolio of creative projects. From motion graphics to branding, 
                we bring ideas to life with stunning visuals and innovative design.
              </p>
            </div>
          </FadeInWhenVisible>
          
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
                className="group h-14 rounded-full px-10 bg-white text-black hover:bg-neutral-50 font-bold border border-black/10 dark:border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)] transition-all duration-300 flex items-center gap-2"
              >
                <span>See All Works</span>
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
