import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { TrustedBy } from "@/components/TrustedBy";
import { ServicesBento } from "@/components/ServicesBento";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { CTA } from "@/components/CTA";
import { GooeySection } from "@/components/GooeySection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <TrustedBy />
      <ServicesBento />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <GooeySection />
      <Footer />
    </div>
  );
};

export default Index;
