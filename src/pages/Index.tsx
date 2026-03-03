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
import { Helmet } from "react-helmet";

const Index = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "WhyCreatives",
    "url": "https://whycreatives.in",
    "logo": "https://whycreatives.in/logo.png",
    "sameAs": [
      "https://www.instagram.com/whycreatives.in",
      "https://www.linkedin.com/company/whycreatives",
      "https://twitter.com/whycreatives"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-81198-11655",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["en", "hi"]
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "WhyCreatives",
    "url": "https://whycreatives.in",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "{search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>WhyCreatives | India's #1 Most Affordable Creative Agency</title>
        <meta name="description" content="Award-winning video editing, web design, and digital marketing agency in India. Premium quality starting at ₹4,999. Get your free consultation today!" />
        <link rel="canonical" href="https://whycreatives.in" />
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
      </Helmet>

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
