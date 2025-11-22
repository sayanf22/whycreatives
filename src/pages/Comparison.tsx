import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import PricingHero from "@/components/ui/pricing-hero";
import { BackgroundPaths } from "@/components/ui/background-paths";

const Comparison = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section with New Pricing Cards */}
      <FadeInWhenVisible>
        <div className="pt-20">
          <PricingHero />
        </div>
      </FadeInWhenVisible>

      <div className="pb-20 px-6">
        <div className="container mx-auto max-w-[1200px]">
          {/* Bottom CTA */}
          <FadeInWhenVisible delay={0.3}>
            <div className="mt-16">
              <BackgroundPaths />
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Comparison;
