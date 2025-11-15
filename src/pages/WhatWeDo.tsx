import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Timeline } from "@/components/ui/timeline";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { Video, Globe, Share2, Megaphone, Sparkles } from "lucide-react";

const WhatWeDo = () => {
  const timelineData = [
    {
      title: "Video Editing",
      content: (
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-20 h-20 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
              <Video className="w-10 h-10 text-white" />
            </div>
            <div>
              <h4 className="text-white text-xl md:text-2xl font-bold mb-2">Professional Video Editing</h4>
              <p className="text-neutral-400 text-base md:text-lg">Transform raw footage into compelling stories</p>
            </div>
          </div>
          <p className="text-neutral-300 text-base md:text-lg font-normal mb-8">
            Professional editing, color grading, and seamless transitions that captivate your audience.
          </p>
          <div className="space-y-4">
            <div className="flex gap-3 items-center text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              4K Support & High Resolution
            </div>
            <div className="flex gap-3 items-center text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Motion Graphics & Visual Effects
            </div>
            <div className="flex gap-3 items-center text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Color Correction & Grading
            </div>
            <div className="flex gap-3 items-center text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Audio Enhancement & Mixing
            </div>
            <div className="flex gap-3 items-center text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Subtitle Integration
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Website Building",
      content: (
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-20 h-20 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
              <Globe className="w-10 h-10 text-white" />
            </div>
            <div>
              <h4 className="text-white text-xl md:text-2xl font-bold mb-2">Modern Web Development</h4>
              <p className="text-neutral-400 text-base md:text-lg">Stunning websites that drive results</p>
            </div>
          </div>
          <p className="text-neutral-300 text-base md:text-lg font-normal mb-8">
            From landing pages to full e-commerce solutions, we build digital experiences that convert.
          </p>
          <div className="space-y-4">
            <div className="flex gap-3 items-center text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Responsive Design
            </div>
            <div className="flex gap-3 items-center text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              SEO Optimized
            </div>
            <div className="flex gap-3 items-center text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Fast Loading Performance
            </div>
            <div className="flex gap-3 items-center text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Mobile First Approach
            </div>
            <div className="flex gap-3 items-center text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Custom Development
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Social Media",
      content: (
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-20 h-20 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
              <Share2 className="w-10 h-10 text-white" />
            </div>
            <div>
              <h4 className="text-white text-xl md:text-2xl font-bold mb-2">Social Media Management</h4>
              <p className="text-neutral-400 text-base md:text-lg">Build your brand presence everywhere</p>
            </div>
          </div>
          <p className="text-neutral-300 text-base md:text-lg font-normal mb-8">
            Strategic content and data-driven engagement strategies across all platforms.
          </p>
          <div className="space-y-4">
            <div className="flex gap-3 items-center text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Content Creation
            </div>
            <div className="flex gap-3 items-center text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Scheduling & Planning
            </div>
            <div className="flex gap-3 items-center text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Analytics & Reporting
            </div>
            <div className="flex gap-3 items-center text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Growth Strategy
            </div>
            <div className="flex gap-3 items-center text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Community Management
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Ad Campaigns",
      content: (
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-20 h-20 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
              <Megaphone className="w-10 h-10 text-white" />
            </div>
            <div>
              <h4 className="text-white text-xl md:text-2xl font-bold mb-2">Advertising Campaigns</h4>
              <p className="text-neutral-400 text-base md:text-lg">Maximize ROI with targeted ads</p>
            </div>
          </div>
          <p className="text-neutral-300 text-base md:text-lg font-normal mb-8">
            Data-driven advertising campaigns across Google, Meta, and more platforms.
          </p>
          <div className="space-y-4">
            <div className="flex gap-3 items-center text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Strategy Planning
            </div>
            <div className="flex gap-3 items-center text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Creative Design
            </div>
            <div className="flex gap-3 items-center text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              A/B Testing
            </div>
            <div className="flex gap-3 items-center text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Performance Reports
            </div>
            <div className="flex gap-3 items-center text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Budget Optimization
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
            <div className="w-20 h-20 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <div>
              <h4 className="text-white text-xl md:text-2xl font-bold mb-2">Motion Graphics</h4>
              <p className="text-neutral-400 text-base md:text-lg">Stunning animated graphics & effects</p>
            </div>
          </div>
          <p className="text-neutral-300 text-base md:text-lg font-normal mb-8">
            Bring your ideas to life with eye-catching animations and visual effects.
          </p>
          <div className="space-y-4">
            <div className="flex gap-3 items-center text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Brand Integration
            </div>
            <div className="flex gap-3 items-center text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Storyboard Development
            </div>
            <div className="flex gap-3 items-center text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Voiceover Production
            </div>
            <div className="flex gap-3 items-center text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Character Animation
            </div>
            <div className="flex gap-3 items-center text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Logo Animation
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
