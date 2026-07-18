import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { About3 } from "@/components/ui/about-3";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { Button } from "@/components/ui/button";
import { Instagram, ArrowUpRight } from "lucide-react";

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
        companies={[]}
        achievementsTitle="Our Impact in Numbers"
        achievementsDescription="We've partnered with businesses across India to deliver exceptional creative solutions. Our commitment to excellence, innovation, and client success has made us a trusted partner for brands looking to make a lasting impact in their industries."
        achievements={[
          { label: "Projects Completed", value: "500+" },
          { label: "Cost Savings", value: "Big" },
          { label: "Client Satisfaction", value: "100%" },
          { label: "Support Available", value: "24/7" },
        ]}
      />

      {/* Founder's Journey Section */}
      <section className="pb-24 sm:pb-32 px-4 sm:px-6 relative overflow-hidden bg-background animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <div className="container mx-auto max-w-5xl">
          <FadeInWhenVisible>
            <div className="relative rounded-[2rem] bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 md:p-12 border border-border/50 overflow-hidden group shadow-xl">
              {/* Background gradient orb */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500 pointer-events-none -translate-y-12 translate-x-12" />
              
              <div className="flex flex-col md:flex-row gap-8 items-center justify-between relative z-10">
                <div className="flex-1 text-center md:text-left">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary/70 mb-2 block">
                    Our Founder's Experience
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-4">
                    Follow Our Journey
                  </h2>
                  <p className="text-muted-foreground text-base sm:text-lg mb-6 leading-relaxed">
                    Follow our founder on Instagram, where she shares posts and videos documenting her real-world experiences, creative process, and behind-the-scenes journey of running a creative agency. Follow along to see how we build, create, and grow together!
                  </p>
                  <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 text-foreground font-semibold text-sm border border-border/50">
                      <Instagram className="w-4 h-4 text-pink-500" />
                      @areyparo
                    </span>
                  </div>
                </div>

                <div className="flex-shrink-0 w-full md:w-auto flex justify-center">
                  <Button size="lg" className="rounded-full font-bold px-8 py-6 flex items-center gap-2 group-hover:scale-102 transition-transform duration-300" asChild>
                    <a href="https://www.instagram.com/areyparo" target="_blank" rel="noopener noreferrer">
                      Follow on Instagram
                      <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
