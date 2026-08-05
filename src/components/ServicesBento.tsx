import { Video, Globe, Share2, Megaphone, Instagram } from "lucide-react";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";

const features = [
  {
    Icon: Video,
    name: "Video Production",
    description: "Professional video editing with color grading, transitions, and effects that captivate your audience.",
    href: "/our-work",
    cta: "Learn more",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-transparent" />
    ),
    className: "",
  },
  {
    Icon: Globe,
    name: "Web Development",
    description: "Modern, responsive websites built with latest technologies that drive results.",
    href: "/our-work",
    cta: "Learn more",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-transparent" />
    ),
    className: "",
  },
  {
    Icon: Share2,
    name: "Brand Presence",
    description: "Complete social media strategy and content management across all platforms.",
    href: "/our-work",
    cta: "Learn more",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-transparent" />
    ),
    className: "",
  },
  {
    Icon: Megaphone,
    name: "Performance Marketing",
    description: "Data-driven advertising campaigns across multiple platforms.",
    href: "/our-work",
    cta: "Learn more",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-red-500/20 to-transparent" />
    ),
    className: "",
  },
  {
    Icon: Instagram,
    name: "@AreyParo UGC & Collaborations",
    description: "Tailored content strategy, scriptwriting, and high-impact UGC & joint collaboration reels to elevate your brand presence.",
    href: "/our-work",
    cta: "Learn more",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-[#b5ff2b]/15 via-emerald-500/10 to-transparent" />
    ),
    className: "",
  },
];

export const ServicesBento = () => {
  return (
    <section className="py-12 sm:py-20 md:py-24 px-4 sm:px-6 bg-background">
      <div className="container mx-auto max-w-7xl">
        <FadeInWhenVisible>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-foreground mb-3 sm:mb-4">
              What We Do
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Professional creative services to elevate your brand and grow your business.
            </p>
          </div>
        </FadeInWhenVisible>
        <div className="grid grid-cols-1 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <FadeInWhenVisible key={feature.name} delay={0.1 * index}>
              <BentoCard {...feature} />
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
};
