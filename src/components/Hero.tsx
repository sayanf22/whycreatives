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
    <section className="min-h-screen flex flex-col justify-center px-4 sm:px-6 pt-20 sm:pt-32 md:pt-36 pb-8 sm:pb-12 relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          {/* Left content */}
          <div className="relative z-10 animate-fade-in-up">
            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-foreground mb-3 sm:mb-6 leading-[1.1]">
              Creative Excellence
              <br />
              <span className="text-muted-foreground">at 90% Less</span>
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-muted-foreground mb-6 sm:mb-12 max-w-2xl leading-relaxed">
              Professional video editing, web design, and social media management. 
              Transparent pricing. Zero hidden fees.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                size="lg"
                asChild
                className="bg-foreground text-background hover:bg-muted-foreground text-sm sm:text-lg px-6 sm:px-8 py-4 sm:py-6 font-bold w-full sm:w-auto"
              >
                <Link to="/contact">
                  Get a Quote
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-background text-sm sm:text-lg px-6 sm:px-8 py-4 sm:py-6 font-bold w-full sm:w-auto"
              >
                <Link to="/what-we-do">
                  See Our Services
                </Link>
              </Button>
            </div>
          </div>

          {/* Right content - Orbital Timeline */}
          <div 
            className="relative h-[300px] sm:h-[500px] lg:h-[600px] animate-fade-in rounded-lg overflow-hidden flex items-center justify-center mt-4 lg:mt-0" 
            style={{ animationDelay: "0.2s" }}
          >
            <div className="w-full h-full scale-90 sm:scale-100">
              <RadialOrbitalTimeline timelineData={timelineData} />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 sm:gap-8 mt-8 sm:mt-20 pt-8 sm:pt-20 border-t border-border animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <div className="text-center">
            <div className="text-2xl sm:text-4xl md:text-5xl font-black text-foreground mb-1 sm:mb-2">90%</div>
            <div className="text-[10px] sm:text-sm text-muted-foreground uppercase tracking-wider">Savings</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-4xl md:text-5xl font-black text-foreground mb-1 sm:mb-2">500+</div>
            <div className="text-[10px] sm:text-sm text-muted-foreground uppercase tracking-wider">Projects</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-4xl md:text-5xl font-black text-foreground mb-1 sm:mb-2">100%</div>
            <div className="text-[10px] sm:text-sm text-muted-foreground uppercase tracking-wider">Transparency</div>
          </div>
        </div>
      </div>
    </section>
  );
};
