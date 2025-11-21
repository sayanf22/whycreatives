import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Timeline } from "@/components/ui/timeline";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { Video, Globe, Share2, Megaphone, Sparkles } from "lucide-react";

const WhatWeDo = () => {
  const timelineData = [
    {
      title: "Video Production",
      content: (
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-white/10 to-transparent border border-white/20 shadow-xl backdrop-blur-md flex items-center justify-center">
              <Video className="w-10 h-10 text-white" />
            </div>
            <div>
              <h4 className="text-white text-xl md:text-2xl font-bold mb-2">Full-Service Video Production</h4>
              <p className="text-neutral-400 text-base md:text-lg">From concept to final cut, we craft cinematic experiences.</p>
            </div>
          </div>
          <p className="text-neutral-300 text-base md:text-lg font-normal mb-8">
            We handle everything from on-location shooting with cinema-grade equipment to high-end post-production.
          </p>
          <div className="space-y-4">
            <div className="flex gap-3 items-center text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Professional Cinematography & Shooting
            </div>
            <div className="flex gap-3 items-center text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Scriptwriting & Storyboarding
            </div>
            <div className="flex gap-3 items-center text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Advanced Color Grading & Editing
            </div>
            <div className="flex gap-3 items-center text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Sound Design & Audio Mixing
            </div>
            <div className="flex gap-3 items-center text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Drone & Aerial Videography
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Web Development",
      content: (
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-white/10 to-transparent border border-white/20 shadow-xl backdrop-blur-md flex items-center justify-center">
              <Globe className="w-10 h-10 text-white" />
            </div>
            <div>
              <h4 className="text-white text-xl md:text-2xl font-bold mb-2">High-Performance Web Development</h4>
              <p className="text-neutral-400 text-base md:text-lg">Digital experiences engineered for growth.</p>
            </div>
          </div>
          <p className="text-neutral-300 text-base md:text-lg font-normal mb-8">
            We build scalable, secure, and lightning-fast websites that serve as the foundation of your digital presence.
          </p>
          <div className="space-y-4">
            <div className="flex gap-3 items-center text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Custom Full-Stack Development
            </div>
            <div className="flex gap-3 items-center text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              E-commerce Solutions
            </div>
            <div className="flex gap-3 items-center text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Technical SEO & Optimization
            </div>
            <div className="flex gap-3 items-center text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Progressive Web Apps (PWA)
            </div>
            <div className="flex gap-3 items-center text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              UI/UX Design Systems
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Brand Presence",
      content: (
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-white/10 to-transparent border border-white/20 shadow-xl backdrop-blur-md flex items-center justify-center">
              <Share2 className="w-10 h-10 text-white" />
            </div>
            <div>
              <h4 className="text-white text-xl md:text-2xl font-bold mb-2">Strategic Brand Management</h4>
              <p className="text-neutral-400 text-base md:text-lg">Cultivating communities and driving engagement.</p>
            </div>
          </div>
          <p className="text-neutral-300 text-base md:text-lg font-normal mb-8">
            We don't just post; we curate a cohesive brand identity that resonates with your target audience across all channels.
          </p>
          <div className="space-y-4">
            <div className="flex gap-3 items-center text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Cross-Platform Strategy
            </div>
            <div className="flex gap-3 items-center text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Content Calendar & Production
            </div>
            <div className="flex gap-3 items-center text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Audience Analytics & Insights
            </div>
            <div className="flex gap-3 items-center text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Community Engagement
            </div>
            <div className="flex gap-3 items-center text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Influencer Partnerships
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Performance Marketing",
      content: (
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-white/10 to-transparent border border-white/20 shadow-xl backdrop-blur-md flex items-center justify-center">
              <Megaphone className="w-10 h-10 text-white" />
            </div>
            <div>
              <h4 className="text-white text-xl md:text-2xl font-bold mb-2">Data-Driven Advertising</h4>
              <p className="text-neutral-400 text-base md:text-lg">Turning ad spend into measurable revenue.</p>
            </div>
          </div>
          <p className="text-neutral-300 text-base md:text-lg font-normal mb-8">
            Our campaigns are built on data, optimized for conversion, and scaled for maximum return on investment.
          </p>
          <div className="space-y-4">
            <div className="flex gap-3 items-center text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Multi-Channel Campaigns (Meta, Google, LinkedIn)
            </div>
            <div className="flex gap-3 items-center text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Conversion Rate Optimization (CRO)
            </div>
            <div className="flex gap-3 items-center text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              A/B Testing & Iteration
            </div>
            <div className="flex gap-3 items-center text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Detailed ROI Reporting
            </div>
            <div className="flex gap-3 items-center text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Retargeting Strategies
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Motion Graphics",
      content: (
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-white/10 to-transparent border border-white/20 shadow-xl backdrop-blur-md flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <div>
              <h4 className="text-white text-xl md:text-2xl font-bold mb-2">Animated Storytelling</h4>
              <p className="text-neutral-400 text-base md:text-lg">Captivating visuals that explain and engage.</p>
            </div>
          </div>
          <p className="text-neutral-300 text-base md:text-lg font-normal mb-8">
            We simplify complex ideas into stunning 2D animations and motion graphics that keep viewers watching.
          </p>
          <div className="space-y-4">
            <div className="flex gap-3 items-center text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              2D Explainer Videos
            </div>
            <div className="flex gap-3 items-center text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Logo Animation & Intros
            </div>
            <div className="flex gap-3 items-center text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Typography & Kinetic Text
            </div>
            <div className="flex gap-3 items-center text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              UI/UX Interaction Demos
            </div>
            <div className="flex gap-3 items-center text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Social Media Shorts
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <FadeInWhenVisible>
        <div className="pt-20">
          <Timeline data={timelineData} />
        </div>
      </FadeInWhenVisible>
      <Footer />
    </div>
  );
};

export default WhatWeDo;
