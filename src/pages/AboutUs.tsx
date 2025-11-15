import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { About3 } from "@/components/ui/about-3";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <About3
        title="About WhyCreatives"
        description="We're a passionate team based in Tripura, Agartala, dedicated to making professional creative services accessible to businesses worldwide. Quality shouldn't be expensive."
        mainImage={{
          src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop",
          alt: "Creative team collaboration",
        }}
        secondaryImage={{
          src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=800&fit=crop",
          alt: "Team meeting",
        }}
        breakout={{
          src: "/logo.png",
          alt: "WhyCreatives Logo",
          title: "Premium Quality at 90% Less Cost",
          description:
            "We connect businesses with talented creators in India, delivering world-class creative services without the agency overhead.",
          buttonText: "Explore Our Services",
          buttonUrl: "/what-we-do",
        }}
        companiesTitle="Trusted by businesses across industries"
        companies={[
          {
            src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-1.svg",
            alt: "Client 1",
          },
          {
            src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-2.svg",
            alt: "Client 2",
          },
          {
            src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-3.svg",
            alt: "Client 3",
          },
          {
            src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-4.svg",
            alt: "Client 4",
          },
          {
            src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-5.svg",
            alt: "Client 5",
          },
          {
            src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-6.svg",
            alt: "Client 6",
          },
        ]}
        achievementsTitle="Our Impact in Numbers"
        achievementsDescription="From startups to established businesses, we've helped hundreds of companies achieve their creative vision with transparency, quality, and value."
        achievements={[
          { label: "Projects Completed", value: "500+" },
          { label: "Cost Savings", value: "90%" },
          { label: "Client Satisfaction", value: "100%" },
          { label: "Support Available", value: "24/7" },
        ]}
      />

      <Footer />
    </div>
  );
};

export default AboutUs;
