import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { AgencyIntro } from "@/components/AgencyIntro";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { Expertise } from "@/components/Expertise";
import { ClientStory } from "@/components/ClientStory";
import { AskAI } from "@/components/AskAI";
import { MarqueeLine } from "@/components/MarqueeLine";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";

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
      "telephone": "+91-82101-98880",
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
        <title>WhyCreatives | Premium Video Editing, Web Design & Creative Agency</title>
        <meta name="description" content="WhyCreatives is a multidisciplinary creative agency in India for video, web and app development, brand systems, UGC and performance marketing." />
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
      <AgencyIntro />
      <FeaturedProjects />
      <Expertise />
      {/* Story card straddles the panel above: its top half sits on the black
          Expertise panel, its bottom half on the page background. */}
      <ClientStory />
      {/* GooeySection removed: it ran an uncapped rAF loop writing a CSS
          blur() every frame, which was the biggest cause of scroll lag on
          phones. MarqueeLine covers the same "big type" beat far cheaper. */}
      <MarqueeLine />
      {/* Last block before the footer. */}
      <AskAI />
      <Footer />
    </div>
  );
};

export default Index;
