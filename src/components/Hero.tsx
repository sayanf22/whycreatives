import { Button } from "@/components/ui/button";
import { ArrowRight, Video, Globe, Share2, Palette, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Spotlight } from "@/components/ui/spotlight-aceternity";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

export const Hero = () => {
  const timelineData = [
    {
      id: 1,
      title: "Video Editing",
      date: "Professional",
      content: "High-quality video editing with professional transitions and effects.",
      category: "Video",
      icon: Video,
      relatedIds: [2, 4],
      status: "completed" as const,
      energy: 100,
    },
    {
      id: 2,
      title: "Web Design",
      date: "Modern",
      content: "Responsive and beautiful web designs that convert.",
      category: "Design",
      icon: Globe,
      relatedIds: [1, 3],
      status: "completed" as const,
      energy: 95,
    },
    {
      id: 3,
      title: "Social Media",
      date: "Engaging",
      content: "Strategic social media management and content creation.",
      category: "Marketing",
      icon: Share2,
      relatedIds: [2, 5],
      status: "in-progress" as const,
      energy: 85,
    },
    {
      id: 4,
      title: "Branding",
      date: "Creative",
      content: "Unique brand identity and visual design solutions.",
      category: "Design",
      icon: Palette,
      relatedIds: [1, 5],
      status: "completed" as const,
      energy: 90,
    },
    {
      id: 5,
      title: "Growth",
      date: "Results",
      content: "Data-driven strategies for business growth and success.",
      category: "Strategy",
      icon: TrendingUp,
      relatedIds: [3, 4],
      status: "in-progress" as const,
      energy: 80,
    },
  ];

  return (
    <section className="min-h-screen flex flex-col justify-start md:justify-center px-5 sm:px-6 pt-28 sm:pt-32 md:pt-36 pb-10 sm:pb-12 relative overflow-x-hidden">
      <Spotlight
        className="hidden md:block -top-40 left-0 md:left-60 md:-top-20 opacity-20"
        fill="white"
      />
      
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          {/* Left content */}
          <div className="relative z-10 w-full animate-fade-in-up">
            <h1 className="text-[2.2rem] leading-[1.15] sm:text-5xl md:text-7xl lg:text-8xl font-black text-foreground mb-4 sm:mb-6 tracking-tight">
              Creative
              <br />
              Excellence
              <br />
              <span className="text-muted-foreground">at 90% Less</span>
            </h1>
            <p className="text-sm sm:text-xl md:text-2xl text-muted-foreground mb-5 sm:mb-12 leading-relaxed">
              Professional video editing, web design, and social media management. 
              Transparent pricing. Zero hidden fees.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                size="lg"
                asChild
                className="bg-foreground text-background hover:bg-muted-foreground text-base sm:text-lg px-8 py-5 sm:py-6 font-bold w-full sm:w-auto"
              >
                <Link to="/contact" className="flex items-center justify-center gap-2">
                  Get a Quote
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-background text-base sm:text-lg px-8 py-5 sm:py-6 font-bold w-full sm:w-auto"
              >
                <Link to="/what-we-do" className="flex items-center justify-center">
                  See Our Services
                </Link>
              </Button>
            </div>
          </div>

          {/* Right content - Orbital Timeline */}
          <div 
            className="relative w-full flex items-center justify-center animate-fade-in my-8 lg:my-0" 
            style={{ animationDelay: "0.2s" }}
          >
            {/* Mobile version - scaled to fit perfectly */}
            <div className="lg:hidden w-[120%] -mx-[10%] h-[600px] flex items-center justify-center overflow-visible py-12">
              <div className="w-full h-full scale-[0.85]">
                <RadialOrbitalTimeline timelineData={timelineData} />
              </div>
            </div>
            {/* Desktop version - full size */}
            <div className="hidden lg:block w-full h-[600px]">
              <RadialOrbitalTimeline timelineData={timelineData} />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 sm:gap-8 mt-10 sm:mt-20 pt-10 sm:pt-20 border-t border-border animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-1 sm:mb-2">90%</div>
            <div className="text-[11px] sm:text-sm text-muted-foreground uppercase tracking-wide font-medium">SAVINGS</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-1 sm:mb-2">500+</div>
            <div className="text-[11px] sm:text-sm text-muted-foreground uppercase tracking-wide font-medium">PROJECTS</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-1 sm:mb-2">100%</div>
            <div className="text-[11px] sm:text-sm text-muted-foreground uppercase tracking-wide font-medium">TRANSPARENCY</div>
          </div>
        </div>
      </div>
    </section>
  );
};
