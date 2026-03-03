import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { DollarSign, Users, Zap, Shield } from "lucide-react";
import DisplayCards from "@/components/ui/display-cards";

export const WhyChooseUs = () => {
  const { ref, isVisible } = useScrollAnimation();

  /* ---------- grayscale overlay classes (shared by rear cards) ---------- */
  /* Rear card overlay: grayscale + dim on desktop only. On mobile just a subtle border overlay */
  const rearOverlay =
    "before:absolute before:w-[100%] before:rounded-xl before:h-[100%] before:content-[''] before:left-0 before:top-0 before:transition-opacity before:duration-700 hover:before:opacity-0 sm:before:bg-blend-overlay sm:before:bg-background/50 sm:before:outline-1 sm:before:outline-border sm:grayscale-[100%] sm:hover:grayscale-0";

  const cards = [
    {
      icon: <DollarSign className="size-4 text-emerald-400" />,
      title: "Big Savings",
      description: "Premium quality, fraction of cost",
      date: "Cost Effective",
      iconClassName: "text-emerald-500",
      titleClassName: "text-emerald-400",
      className: `[grid-area:stack] hover:-translate-y-10 ${rearOverlay}`,
    },
    {
      icon: <Zap className="size-4 text-amber-400" />,
      title: "Fast Delivery",
      description: "Rapid turnaround, top quality",
      date: "Lightning Speed",
      iconClassName: "text-amber-500",
      titleClassName: "text-amber-400",
      className: `[grid-area:stack] translate-x-6 translate-y-8 sm:translate-x-12 sm:translate-y-10 md:translate-x-16 md:translate-y-10 hover:-translate-y-1 ${rearOverlay}`,
    },
    {
      icon: <Shield className="size-4 text-violet-400" />,
      title: "100% Transparent",
      description: "No hidden fees, clear pricing",
      date: "Honest Pricing",
      iconClassName: "text-violet-500",
      titleClassName: "text-violet-400",
      className: `[grid-area:stack] translate-x-12 translate-y-16 sm:translate-x-24 sm:translate-y-20 md:translate-x-32 md:translate-y-20 hover:translate-y-6 sm:hover:translate-y-10 ${rearOverlay}`,
    },
    {
      icon: <Users className="size-4 text-blue-300" />,
      title: "24/7 Support",
      description: "Dedicated team, always available",
      date: "Always Here",
      iconClassName: "text-blue-500",
      titleClassName: "text-blue-500",
      className:
        "[grid-area:stack] translate-x-[72px] translate-y-24 sm:translate-x-36 sm:translate-y-[120px] md:translate-x-48 md:translate-y-[120px] hover:translate-y-14 sm:hover:translate-y-[100px]",
    },
  ];

  return (
    <section
      ref={ref}
      className={`py-16 sm:py-24 md:py-32 px-5 sm:px-6 bg-background transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-16 lg:gap-20 items-center">

          {/* Mobile: Heading first */}
          <div className="lg:hidden w-full text-center mb-2">
            <h2 className="text-3xl sm:text-4xl font-black mb-3 leading-tight">
              Why Choose <br />
              <span className="text-muted-foreground">WhyCreatives?</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
              Premium quality creative services at unbeatable prices.
            </p>
          </div>

          {/* Desktop: Full text content with feature list */}
          <div className="hidden lg:block order-1 w-full">
            <h2 className="text-6xl lg:text-7xl font-black mb-6 leading-tight">
              Why Choose <br />
              <span className="text-muted-foreground">WhyCreatives?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-xl">
              We combine exceptional quality with unbeatable pricing to help your business grow.
              Our India-based team delivers professional creative services at significantly lower cost than traditional agencies.
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 border-l-2 border-border hover:border-foreground transition-colors duration-300">
                <DollarSign className="w-8 h-8 mt-1 text-foreground flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">Unbeatable Value</h3>
                  <p className="text-base text-muted-foreground">Big savings without compromising on quality or professionalism</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 border-l-2 border-border hover:border-foreground transition-colors duration-300">
                <Zap className="w-8 h-8 mt-1 text-foreground flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">Lightning Fast</h3>
                  <p className="text-base text-muted-foreground">Quick turnaround times with efficient workflows</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 border-l-2 border-border hover:border-foreground transition-colors duration-300">
                <Shield className="w-8 h-8 mt-1 text-foreground flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">100% Transparent</h3>
                  <p className="text-base text-muted-foreground">Clear pricing, no hidden fees, regular updates</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 border-l-2 border-border hover:border-foreground transition-colors duration-300">
                <Users className="w-8 h-8 mt-1 text-foreground flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">Dedicated Support</h3>
                  <p className="text-base text-muted-foreground">24/7 availability with personal account managers</p>
                </div>
              </div>
            </div>
          </div>

          {/* Display Cards — responsive */}
          <div className="lg:order-2 flex items-center justify-center w-full overflow-visible">
            {/* Mobile & Tablet */}
            <div className="lg:hidden w-full h-[320px] sm:h-[380px] flex items-start justify-start pl-2 pt-4 overflow-visible">
              <DisplayCards cards={cards} />
            </div>
            {/* Desktop */}
            <div className="hidden lg:flex items-center justify-center min-h-[500px] w-full overflow-visible">
              <DisplayCards cards={cards} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
