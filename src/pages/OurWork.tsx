import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Carousel } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { usePortfolioWorks, getStorageUrl } from "@/hooks/use-portfolio-works";

const OurWork = () => {
  const { data: portfolioWorks, isLoading } = usePortfolioWorks(); // All works

  const workSlides = portfolioWorks?.map((work) => (
    <div
      key={work.id}
      className="border w-full relative overflow-hidden rounded-lg bg-card text-card-foreground aspect-[16/9]"
    >
      <div className="w-full h-full overflow-hidden relative group">
        <img
          src={getStorageUrl(work.image_url)}
          alt={work.title}
          className="object-cover h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">{work.title}</h3>
            <p className="text-white/80">{work.description}</p>
          </div>
        </div>
      </div>
    </div>
  )) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-32 pb-24 px-4 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-6">
              {/* Outer ring - static */}
              <div className="absolute inset-0 rounded-full border-4 border-white/20"></div>
              {/* Middle ring - spinning clockwise */}
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-white border-r-white animate-spin"></div>
              {/* Inner ring - spinning counter-clockwise */}
              <div 
                className="absolute inset-2 rounded-full border-4 border-transparent border-b-white/60 border-l-white/60"
                style={{ 
                  animation: 'spin 1.5s linear infinite reverse'
                }}
              ></div>
            </div>
            <h2 className="text-2xl font-bold mb-2 animate-pulse">Loading Portfolio</h2>
            <p className="text-muted-foreground animate-pulse">Fetching creative works...</p>
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
              <Button 
                onClick={() => window.location.href = '/portfolio-gallery'}
                className="h-14 cursor-pointer rounded-full px-10 bg-white text-black hover:bg-muted-foreground font-bold"
              >
                See All Works
              </Button>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OurWork;
