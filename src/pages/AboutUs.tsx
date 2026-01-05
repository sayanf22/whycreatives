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
        description="We are a full-service creative agency based in Guwahati, Assam, dedicated to transforming brands through innovative storytelling, cutting-edge design, and strategic digital solutions. Our mission is to empower businesses with world-class creative services that drive measurable results and lasting impact."
        mainImage={{
          src: "/creative-office.png",
          alt: "Modern creative office space",
        }}
        secondaryImage={{
          src: "/team-collab.png",
          alt: "Creative team collaborating",
        }}
        breakout={{
          src: "/video-gear.png",
          alt: "Professional video production gear",
          title: "Excellence in Every Project",
          description:
            "We combine creative excellence with strategic thinking to deliver solutions that not only look exceptional but also drive business growth. Our team of experienced professionals brings together diverse expertise in video production, web development, branding, and digital marketing to create comprehensive solutions tailored to your unique needs.",
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
        achievementsDescription="We've partnered with businesses across India to deliver exceptional creative solutions. Our commitment to excellence, innovation, and client success has made us a trusted partner for brands looking to make a lasting impact in their industries."
        achievements={[
          { label: "Projects Completed", value: "500+" },
          { label: "Cost Savings", value: "Big" },
          { label: "Client Satisfaction", value: "100%" },
          { label: "Support Available", value: "24/7" },
        ]}
      />

      <Footer />
    </div>
  );
};

export default AboutUs;
