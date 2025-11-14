import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { DollarSign, Users, Zap, Shield } from "lucide-react";
import DisplayCards from "@/components/ui/display-cards";

export const WhyChooseUs = () => {
  const { ref, isVisible } = useScrollAnimation();

  const cards = [
    {
      icon: <DollarSign className="size-5 text-white" />,
      title: "90% Savings",
      description: "Premium quality, fraction of cost",
      date: "Cost Effective",
      iconClassName: "text-white",
      titleClassName: "text-white font-bold",
      className:
        "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/70 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Zap className="size-5 text-white" />,
      title: "Fast Delivery",
      description: "Rapid turnaround, top quality",
      date: "Lightning Speed",
      iconClassName: "text-white",
      titleClassName: "text-white font-bold",
      className:
        "[grid-area:stack] translate-x-20 translate-y-12 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/70 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Shield className="size-5 text-white" />,
      title: "100% Transparent",
      description: "No hidden fees, clear pricing",
      date: "Honest Pricing",
      iconClassName: "text-white",
      titleClassName: "text-white font-bold",
      className:
        "[grid-area:stack] translate-x-40 translate-y-24 hover:translate-y-14 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/70 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Users className="size-5 text-white" />,
      title: "24/7 Support",
      description: "Dedicated team, always available",
      date: "Always Here",
      iconClassName: "text-white",
      titleClassName: "text-white font-bold",
      className:
        "[grid-area:stack] translate-x-60 translate-y-36 hover:translate-y-26",
    },
  ];

  return (
    <section 
      ref={ref}
      className={`py-12 sm:py-20 md:py-32 px-5 sm:px-6 bg-background transition-all duration-1000 overflow-x-hidden ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-20 items-center">
          {/* Left side - Text content */}
          <div className="order-2 lg:order-1 w-full">
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 leading-tight">
              Why Choose <br />
              <span className="text-muted-foreground">WhyCreatives?</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-10 leading-relaxed max-w-xl">
              We combine exceptional quality with unbeatable pricing to help your business grow. 
              Our India-based team delivers professional creative services at 90% less cost than traditional agencies.
            </p>
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 border-l-2 border-white/20 hover:border-white transition-colors duration-300">
                <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 mt-1 text-white flex-shrink-0" />
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">Unbeatable Value</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">Save 90% without compromising on quality or professionalism</p>
                </div>
              </div>
              <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 border-l-2 border-white/20 hover:border-white transition-colors duration-300">
                <Zap className="w-6 h-6 sm:w-8 sm:h-8 mt-1 text-white flex-shrink-0" />
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">Lightning Fast</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">Quick turnaround times with efficient workflows</p>
                </div>
              </div>
              <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 border-l-2 border-white/20 hover:border-white transition-colors duration-300">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 mt-1 text-white flex-shrink-0" />
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">100% Transparent</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">Clear pricing, no hidden fees, regular updates</p>
                </div>
              </div>
              <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 border-l-2 border-white/20 hover:border-white transition-colors duration-300">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 mt-1 text-white flex-shrink-0" />
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">Dedicated Support</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">24/7 availability with personal account managers</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Display Cards */}
          <div className="order-1 lg:order-2 flex items-center justify-center w-full my-6 lg:my-0">
            {/* Mobile version - smaller container */}
            <div className="lg:hidden w-full max-w-[300px] h-[300px] mx-auto">
              <DisplayCards cards={cards} />
            </div>
            {/* Desktop version - full size */}
            <div className="hidden lg:flex items-center justify-center min-h-[600px] w-full">
              <DisplayCards cards={cards} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
