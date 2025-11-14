import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const CTA = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section 
      ref={ref}
      className={`py-32 px-6 transition-all duration-1000 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
    >
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-4xl md:text-6xl font-black mb-6">
          Ready to Save 90% on Your Next Project?
        </h2>
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          Join hundreds of businesses who trust WhyCreatives for their design, video, and marketing needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            asChild
            className="bg-foreground text-background hover:bg-muted-foreground text-lg px-8 py-6 font-bold"
          >
            <Link to="/contact">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-background text-lg px-8 py-6 font-bold"
          >
            <Link to="/our-work">
              View Our Portfolio
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
