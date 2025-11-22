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

      {/* Bottom CTA - Full Width */}
      <FadeInWhenVisible delay={0.3}>
        <div className="mt-16">
          <BackgroundPaths />
        </div>
      </FadeInWhenVisible>
      <Footer />
    </div>
  );
};

export default Comparison;
