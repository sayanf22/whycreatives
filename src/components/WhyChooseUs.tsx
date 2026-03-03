import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { DollarSign, Users, Zap, Shield } from "lucide-react";
import DisplayCards from "@/components/ui/display-cards";

export const WhyChooseUs = () => {
  const { ref, isVisible } = useScrollAnimation();

  const cards = [
    {
      icon: <DollarSign className="size-4" />,
      title: "Big Savings",
      description: "Premium quality, fraction of cost",
      date: "Cost Effective",
      variant: "silver" as const,
      className:
        "[grid-area:stack] hover:-translate-y-6 transition-all duration-700",
    },
    {
      icon: <Zap className="size-4" />,
      title: "Fast Delivery",
      description: "Rapid turnaround, top quality",
      date: "Lightning Speed",
      variant: "silver" as const,
      className:
        "[grid-area:stack] translate-x-[40px] translate-y-[20px] sm:translate-x-[60px] sm:translate-y-[24px] lg:translate-x-24 lg:translate-y-16 hover:translate-y-0 transition-all duration-700",
    },
    {
      icon: <Shield className="size-4" />,
      title: "100% Transparent",
      description: "No hidden fees, clear pricing",
      date: "Honest Pricing",
      variant: "silver" as const,
      className:
        "[grid-area:stack] translate-x-[80px] translate-y-[40px] sm:translate-x-[120px] sm:translate-y-[48px] lg:translate-x-48 lg:translate-y-32 hover:translate-y-[20px] transition-all duration-700",
    },
    {
      icon: <Users className="size-4" />,
      title: "24/7 Support",
      description: "Dedicated team, always available",
      date: "Always Here",
      variant: "dark" as const,
      className:
        "[grid-area:stack] translate-x-[120px] translate-y-[60px] sm:translate-x-[180px] sm:translate-y-[72px] lg:translate-x-72 lg:translate-y-48 hover:translate-y-[40px] transition-all duration-700",
    },
  ];

  return (
    <section
      ref={ref}
      className={`py-16 sm:py-24 md:py-32 px-5 sm:px-6 bg-background transition-all duration-1000 overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
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

          {/* Desktop: Full text content */}
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

          {/* Display Cards */}
          <div className="lg:order-2 flex items-center justify-center w-full">
            {/* Mobile */}
            <div className="lg:hidden w-full h-[280px] sm:h-[320px] flex items-start justify-start pl-2 pt-2 overflow-visible">
              <DisplayCards cards={cards} />
            </div>
            {/* Desktop */}
            <div className="hidden lg:flex items-center justify-center min-h-[500px] w-full">
              <DisplayCards cards={cards} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
