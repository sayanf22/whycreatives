import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Timeline } from "@/components/ui/timeline";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { Video, Globe, Share2, Megaphone, Instagram, Palette, Check, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const WhatWeDo = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  // High-value pricing and inclusion details for each service
  const serviceDetails: Record<string, {
    title: string;
    subtitle: string;
    inclusions: string[];
    packages?: { name: string; price: string; desc: string }[];
    extraInfo?: string;
    additionalDetails?: { title: string; items: { name: string; desc?: string; price?: string }[] }[];
  }> = {
    "Video Production": {
      title: "Video Production & Cinematic Editing",
      subtitle: "From concept to final cut, we craft high-impact videos.",
      inclusions: [
        "Professional Cinematography & Camera Shooting",
        "Scriptwriting, Hooks & Storyboard Planning",
        "Advanced Color Grading & Color Correction",
        "Sound Design & Custom Audio Mixing",
        "Drone & Aerial Cinematic Videography"
      ],
      packages: [
        { name: "Short-Form Video (Reels/Shorts)", price: "Starting from ₹3,000 / video", desc: "For IG Reels, TikTok, YouTube Shorts. Includes custom hooks, transitions, captions." },
        { name: "Promotional Brand Video", price: "Starting from ₹6,999 / video", desc: "Corporate promos, brand storytelling, cinematic commercials." },
        { name: "Event Videography", price: "Custom Quote", desc: "On-site multi-camera shoot, aerial drone coverage, high-pacing event highlight reels." }
      ],
      extraInfo: "Standard Turnaround: 3-5 days for Reels/Shorts; 7-10 days for complex commercial/brand videos."
    },
    "Web Development": {
      title: "Web Design & Custom Development",
      subtitle: "Digital experiences engineered for performance, speed, and growth.",
      inclusions: [
        "Custom Full-Stack Web Development (React / Next.js / Vite / Node.js)",
        "High-Conversion UI/UX Responsive Design Systems",
        "Secure Custom Databases & Backend API Integration (Supabase / Node)",
        "Technical Search Engine Optimization (SEO) & Performance Tuning",
        "Progressive Web Apps (PWA) & Custom CMS Implementations"
      ],
      packages: [
        { name: "Premium Landing Page", price: "Starting from ₹4,999", desc: "High-conversion single-page website, contact form, optimized for mobile." },
        { name: "Business Multi-Page Suite", price: "Starting from ₹9,999", desc: "Fully custom multi-page website with blog sitemaps, team bios, SEO setup." },
        { name: "E-Commerce Suite", price: "Starting from ₹19,999", desc: "Store setup, custom payment gateway integration, product admin panel." }
      ],
      extraInfo: "All projects include 30 days of complimentary support, analytics dashboard, and hosting setup."
    },
    "Brand Presence": {
      title: "Brand Presence & Social Media Management",
      subtitle: "Cultivating active communities and driving organic brand awareness.",
      inclusions: [
        "Cross-Platform Social Media Strategy (Instagram, LinkedIn, X, YouTube)",
        "Monthly Content Calendar Production & Scheduled Posting",
        "Audience Analytics, Engagement Auditing & Competitive Insights",
        "Interactive Community Engagement & Moderation",
        "Strategic Influencer Partnerships & Outreach Campaigns"
      ],
      packages: [
        { name: "Starter Management", price: "₹15,000 / month", desc: "12 custom grid posts, 6 stories, monthly analytics report." },
        { name: "Growth Management", price: "₹25,000 / month", desc: "20 posts, 12 stories, custom graphic layouts, bio optimization, basic community moderation." },
        { name: "Premium Engagement", price: "₹45,000 / month", desc: "Unlimited posts/stories, professional short-form video content creation, complete community management." }
      ]
    },
    "Performance Marketing": {
      title: "Performance Marketing & Paid Campaigns",
      subtitle: "Turning ad spend into measurable business revenue.",
      inclusions: [
        "Multi-Channel Ad Campaigns (Meta Ads, Google Search, LinkedIn Ads)",
        "Conversion Rate Optimization (CRO) & Funnel Auditing",
        "Rigorous A/B Testing & Audience Variant Analysis",
        "Detailed ROI & Spend Allocation Dashboard Reporting",
        "Advanced Dynamic Retargeting & Custom Audiences"
      ],
      packages: [
        { name: "Ad Setup & Audit", price: "₹8,000 / flat fee", desc: "Ad account creation, pixel tracking configuration, campaign strategy setup." },
        { name: "Monthly Campaign Management", price: "₹15,000 / month", desc: "Ongoing campaign optimization, weekly reports, dynamic scaling. (Excludes ad budget)" }
      ],
      extraInfo: "We recommend a minimum daily ad spend of ₹1,000 to gather optimal conversion data."
    },
    "@AreyParo UGC & Collaborations": {
      title: "@AreyParo Content Creation & Brand Collaborations",
      subtitle: "End-to-end creative management and collaboration by @AreyParo.",
      inclusions: [
        "Tailored Content Strategy & Ideation",
        "Shot Planning & Execution Guidance",
        "Creative Content Planning",
        "Trend Research & Ideation",
        "Scriptwriting & Hook Creation",
        "Professional Post-Production & Editing",
        "Optimized Caption Suggestions",
        "End-to-End Creative Management"
      ],
      extraInfo: "* Client Scope: You only need to provide your product/service—our team handles the entire creative & execution process end-to-end.",
      additionalDetails: [
        {
          title: "Individual Deliverables",
          items: [
            { name: "UGC Reel (User Generated Content)", desc: "Uploaded exclusively on the client's Instagram page. Includes 1 complimentary Instagram story posted on @AreyParo's account.", price: "₹3,000 / video" },
            { name: "Collaboration Reel", desc: "Uploaded as a Joint Collaboration Post directly from @AreyParo's main Instagram account. Includes 1 complimentary Instagram story.", price: "₹5,000 / reel" }
          ]
        },
        {
          title: "Advertisement Usage Rights (Per Video)",
          items: [
            { name: "1 Month Digital Ad Rights", desc: "Permission to run paid ad campaigns using the produced video for 30 days.", price: "₹2,000 / video" },
            { name: "3 Months Digital Ad Rights", desc: "Permission to run paid ad campaigns using the produced video for 90 days.", price: "₹5,000 / video" }
          ]
        },
        {
          title: "Booking & Payment Terms",
          items: [
            { name: "50% Advance Payment", desc: "Required upfront to confirm the booking slot and initiate content strategy." },
            { name: "50% Final Payment", desc: "Payable prior to final content delivery and handover." },
            { name: "Fixed Pricing", desc: "All rates listed in this quotation are strictly non-negotiable." }
          ]
        }
      ]
    },
    "Logo Design": {
      title: "Logo & Brand Identity Design",
      subtitle: "Memorable visual identities that leave lasting impressions.",
      inclusions: [
        "Multiple Custom Logo Design Concepts & Formats",
        "Unlimited Revisions until you are 100% satisfied",
        "Vector & High-Resolution Print-Ready Files (.SVG, .PDF, .PNG)",
        "Custom Brand Color Palette & Typography Guidelines",
        "Social Media Identity Kit (Avatars, Covers, and Banner Layouts)"
      ],
      packages: [
        { name: "Starter Identity", price: "₹3,500 / single logo", desc: "2 logo concepts, high-res files, 3 revisions." },
        { name: "Premium Identity Suite", price: "₹7,500 / full suite", desc: "5 concepts, custom typography, full brand style-guide, unlimited revisions, social media assets." }
      ]
    }
  };

  const timelineData = [
    {
      title: "Video Production",
      content: (
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-black/5 dark:from-white/10 to-transparent border border-black/10 dark:border-white/20 shadow-xl backdrop-blur-md flex items-center justify-center">
              <Video className="w-10 h-10 text-black dark:text-white" />
            </div>
            <div>
              <h4 className="text-foreground dark:text-white text-xl md:text-2xl font-bold mb-2">Full-Service Video Production</h4>
              <p className="text-muted-foreground dark:text-neutral-400 text-base md:text-lg">From concept to final cut, we craft cinematic experiences.</p>
            </div>
          </div>
          <p className="text-neutral-600 dark:text-neutral-300 text-base md:text-lg font-normal mb-8">
            We handle everything from on-location shooting with cinema-grade equipment to high-end post-production.
          </p>
          <div className="space-y-4 mb-8">
            <div className="flex gap-3 items-center text-neutral-600 dark:text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-black dark:bg-white rounded-full"></span>
              Professional Cinematography & Shooting
            </div>
            <div className="flex gap-3 items-center text-neutral-600 dark:text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-black dark:bg-white rounded-full"></span>
              Scriptwriting & Storyboarding
            </div>
            <div className="flex gap-3 items-center text-neutral-600 dark:text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-black dark:bg-white rounded-full"></span>
              Advanced Color Grading & Editing
            </div>
          </div>
          <Button 
            onClick={() => setSelectedService("Video Production")}
            className="bg-[#b5ff2b] text-black hover:bg-[#9ee024] font-bold px-6 py-3 rounded-full hover:shadow-[0_0_15px_rgba(181,255,43,0.3)] transition-all flex items-center gap-2 group"
          >
            <span>View Service Details & Pricing</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </div>
      ),
    },
    {
      title: "Web Development",
      content: (
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-black/5 dark:from-white/10 to-transparent border border-black/10 dark:border-white/20 shadow-xl backdrop-blur-md flex items-center justify-center">
              <Globe className="w-10 h-10 text-black dark:text-white" />
            </div>
            <div>
              <h4 className="text-foreground dark:text-white text-xl md:text-2xl font-bold mb-2">High-Performance Web Development</h4>
              <p className="text-muted-foreground dark:text-neutral-400 text-base md:text-lg">Digital experiences engineered for growth.</p>
            </div>
          </div>
          <p className="text-neutral-600 dark:text-neutral-300 text-base md:text-lg font-normal mb-8">
            We build scalable, secure, and lightning-fast websites that serve as the foundation of your digital presence.
          </p>
          <div className="space-y-4 mb-8">
            <div className="flex gap-3 items-center text-neutral-600 dark:text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-black dark:bg-white rounded-full"></span>
              Custom Full-Stack Development
            </div>
            <div className="flex gap-3 items-center text-neutral-600 dark:text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-black dark:bg-white rounded-full"></span>
              E-commerce Solutions
            </div>
            <div className="flex gap-3 items-center text-neutral-600 dark:text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-black dark:bg-white rounded-full"></span>
              Technical SEO & Optimization
            </div>
          </div>
          <Button 
            onClick={() => setSelectedService("Web Development")}
            className="bg-[#b5ff2b] text-black hover:bg-[#9ee024] font-bold px-6 py-3 rounded-full hover:shadow-[0_0_15px_rgba(181,255,43,0.3)] transition-all flex items-center gap-2 group"
          >
            <span>View Service Details & Pricing</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </div>
      ),
    },
    {
      title: "Brand Presence",
      content: (
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-black/5 dark:from-white/10 to-transparent border border-black/10 dark:border-white/20 shadow-xl backdrop-blur-md flex items-center justify-center">
              <Share2 className="w-10 h-10 text-black dark:text-white" />
            </div>
            <div>
              <h4 className="text-foreground dark:text-white text-xl md:text-2xl font-bold mb-2">Strategic Brand Management</h4>
              <p className="text-muted-foreground dark:text-neutral-400 text-base md:text-lg">Cultivating communities and driving engagement.</p>
            </div>
          </div>
          <p className="text-neutral-600 dark:text-neutral-300 text-base md:text-lg font-normal mb-8">
            We don't just post; we curate a cohesive brand identity that resonates with your target audience across all channels.
          </p>
          <div className="space-y-4 mb-8">
            <div className="flex gap-3 items-center text-neutral-600 dark:text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-black dark:bg-white rounded-full"></span>
              Cross-Platform Strategy & Production
            </div>
            <div className="flex gap-3 items-center text-neutral-600 dark:text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-black dark:bg-white rounded-full"></span>
              Audience Analytics & Community Engagement
            </div>
            <div className="flex gap-3 items-center text-neutral-600 dark:text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-black dark:bg-white rounded-full"></span>
              Influencer Partnerships
            </div>
          </div>
          <Button 
            onClick={() => setSelectedService("Brand Presence")}
            className="bg-[#b5ff2b] text-black hover:bg-[#9ee024] font-bold px-6 py-3 rounded-full hover:shadow-[0_0_15px_rgba(181,255,43,0.3)] transition-all flex items-center gap-2 group"
          >
            <span>View Service Details & Pricing</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </div>
      ),
    },
    {
      title: "Performance Marketing",
      content: (
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-black/5 dark:from-white/10 to-transparent border border-black/10 dark:border-white/20 shadow-xl backdrop-blur-md flex items-center justify-center">
              <Megaphone className="w-10 h-10 text-black dark:text-white" />
            </div>
            <div>
              <h4 className="text-foreground dark:text-white text-xl md:text-2xl font-bold mb-2">Data-Driven Advertising</h4>
              <p className="text-muted-foreground dark:text-neutral-400 text-base md:text-lg">Turning ad spend into measurable revenue.</p>
            </div>
          </div>
          <p className="text-neutral-600 dark:text-neutral-300 text-base md:text-lg font-normal mb-8">
            Our campaigns are built on data, optimized for conversion, and scaled for maximum return on investment.
          </p>
          <div className="space-y-4 mb-8">
            <div className="flex gap-3 items-center text-neutral-600 dark:text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-black dark:bg-white rounded-full"></span>
              Multi-Channel Campaigns (Meta, Google, LinkedIn)
            </div>
            <div className="flex gap-3 items-center text-neutral-600 dark:text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-black dark:bg-white rounded-full"></span>
              Conversion Rate Optimization & Funnel Tuning
            </div>
            <div className="flex gap-3 items-center text-neutral-600 dark:text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-black dark:bg-white rounded-full"></span>
              Retargeting & ROI Analytics
            </div>
          </div>
          <Button 
            onClick={() => setSelectedService("Performance Marketing")}
            className="bg-[#b5ff2b] text-black hover:bg-[#9ee024] font-bold px-6 py-3 rounded-full hover:shadow-[0_0_15px_rgba(181,255,43,0.3)] transition-all flex items-center gap-2 group"
          >
            <span>View Service Details & Pricing</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </div>
      ),
    },
    {
      title: "UGC & Collabs",
      content: (
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-black/5 dark:from-white/10 to-transparent border border-black/10 dark:border-white/20 shadow-xl backdrop-blur-md flex items-center justify-center">
              <Instagram className="w-10 h-10 text-black dark:text-white" />
            </div>
            <div>
              <h4 className="text-foreground dark:text-white text-xl md:text-2xl font-bold mb-2">Content Creation & Collaborations</h4>
              <p className="text-muted-foreground dark:text-neutral-400 text-base md:text-lg">UGC Reels and Joint Collaborations by creator @AreyParo.</p>
            </div>
          </div>
          <p className="text-neutral-600 dark:text-neutral-300 text-base md:text-lg font-normal mb-8">
            Tailored content strategy, scriptwriting, and high-impact UGC & joint collaboration reels to elevate your brand presence.
          </p>
          <div className="space-y-4 mb-8">
            <div className="flex gap-3 items-center text-neutral-600 dark:text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-black dark:bg-white rounded-full"></span>
              Tailored Content Strategy & Ideation
            </div>
            <div className="flex gap-3 items-center text-neutral-600 dark:text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-black dark:bg-white rounded-full"></span>
              UGC Reel & Joint Collaboration Post Formats
            </div>
            <div className="flex gap-3 items-center text-neutral-600 dark:text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-black dark:bg-white rounded-full"></span>
              End-to-End Creative & Post-Production Management
            </div>
          </div>
          <Button 
            onClick={() => setSelectedService("@AreyParo UGC & Collaborations")}
            className="bg-[#b5ff2b] text-black hover:bg-[#9ee024] font-bold px-6 py-3 rounded-full hover:shadow-[0_0_15px_rgba(181,255,43,0.3)] transition-all flex items-center gap-2 group"
          >
            <span>View Service Details & Pricing</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </div>
      ),
    },
    {
      title: "Logo Design",
      content: (
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-black/5 dark:from-white/10 to-transparent border border-black/10 dark:border-white/20 shadow-xl backdrop-blur-md flex items-center justify-center">
              <Palette className="w-10 h-10 text-black dark:text-white" />
            </div>
            <div>
              <h4 className="text-foreground dark:text-white text-xl md:text-2xl font-bold mb-2">Memorable Brand Identity</h4>
              <p className="text-muted-foreground dark:text-neutral-400 text-base md:text-lg">Crafting logos that leave lasting impressions.</p>
            </div>
          </div>
          <p className="text-neutral-600 dark:text-neutral-300 text-base md:text-lg font-normal mb-8">
            Your logo is the face of your brand. We design unique, versatile logos that capture your essence and stand out in any market.
          </p>
          <div className="space-y-4 mb-8">
            <div className="flex gap-3 items-center text-neutral-600 dark:text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-black dark:bg-white rounded-full"></span>
              Multiple Concept Designs & Guidelines
            </div>
            <div className="flex gap-3 items-center text-neutral-600 dark:text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-black dark:bg-white rounded-full"></span>
              Unlimited Revisions & Print-Ready Files
            </div>
            <div className="flex gap-3 items-center text-neutral-600 dark:text-neutral-300 text-base md:text-lg">
              <span className="w-2 h-2 bg-black dark:bg-white rounded-full"></span>
              Social Media Identity Assets Kit
            </div>
          </div>
          <Button 
            onClick={() => setSelectedService("Logo Design")}
            className="bg-[#b5ff2b] text-black hover:bg-[#9ee024] font-bold px-6 py-3 rounded-full hover:shadow-[0_0_15px_rgba(181,255,43,0.3)] transition-all flex items-center gap-2 group"
          >
            <span>View Service Details & Pricing</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </div>
      ),
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What video production services do you offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer full-service video production including professional cinematography, scriptwriting, advanced color grading, sound design, and drone videography."
        }
      },
      {
        "@type": "Question",
        "name": "Do you build custom websites or use templates?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We provide high-performance custom full-stack web development, e-commerce solutions, PWAs, and custom UI/UX design systems optimized for conversions."
        }
      },
      {
        "@type": "Question",
        "name": "How much does professional video marketing cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our professional video editing starts from ₹6,999. Web design starts from ₹4,999. We offer agency-level performance at highly affordable pricing across India."
        }
      }
    ]
  };

  const selectedDetails = selectedService ? serviceDetails[selectedService] : null;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Creative Services | Web Design, Video Production & Marketing</title>
        <meta name="description" content="Discover WhyCreatives' premium services: High-end video production, custom web development, performance marketing, and branding. Award-winning agency quality at affordable prices." />
        <meta name="keywords" content="creative services, video production agency, web development company, digital marketing services, branding agency, logo design, performance marketing" />
        <link rel="canonical" href="https://whycreatives.in/what-we-do" />
        <meta property="og:title" content="Creative Services | Web Design, Video Production & Marketing" />
        <meta property="og:description" content="Discover WhyCreatives' premium services. Award-winning agency quality at affordable prices." />
        <meta property="og:url" content="https://whycreatives.in/what-we-do" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <Navigation />
      <FadeInWhenVisible>
        <div className="pt-20">
          <Timeline data={timelineData} />
        </div>
      </FadeInWhenVisible>
      <Footer />

      {/* Premium Service Details Dialog */}
      <Dialog open={!!selectedService} onOpenChange={(open) => !open && setSelectedService(null)}>
        <DialogContent className="max-w-3xl bg-[#0e0e0e] border border-neutral-800 text-white rounded-2xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto shadow-2xl">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#b5ff2b]/30 to-transparent" />
          
          {selectedDetails && (
            <div className="space-y-6 sm:space-y-8">
              <DialogHeader className="text-left space-y-2">
                <DialogTitle className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
                  <span className="text-[#b5ff2b]">•</span> {selectedDetails.title}
                </DialogTitle>
                <DialogDescription className="text-neutral-400 text-sm sm:text-base leading-relaxed">
                  {selectedDetails.subtitle}
                </DialogDescription>
              </DialogHeader>

              {/* What's Included Section */}
              <div className="space-y-4">
                <h4 className="text-base sm:text-lg font-bold text-white tracking-wide border-b border-neutral-900 pb-2">
                  What's Included in every collaboration
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedDetails.inclusions.map((item, idx) => (
                    <div key={idx} className="flex gap-2.5 items-start text-neutral-300 text-sm">
                      <div className="w-5 h-5 rounded-full bg-[#b5ff2b]/10 border border-[#b5ff2b]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#b5ff2b]" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing Packages & Deliverables Table */}
              {selectedDetails.packages && selectedDetails.packages.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-base sm:text-lg font-bold text-white tracking-wide border-b border-neutral-900 pb-2">
                    Pricing & Deliverable Packages
                  </h4>
                  <div className="space-y-4">
                    {selectedDetails.packages.map((pkg, idx) => (
                      <div key={idx} className="p-4 bg-white/[0.02] border border-neutral-900 rounded-xl space-y-2 hover:border-[#b5ff2b]/20 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                          <span className="font-bold text-white text-base">{pkg.name}</span>
                          <span className="font-extrabold text-[#b5ff2b] text-sm sm:text-base">{pkg.price}</span>
                        </div>
                        <p className="text-neutral-400 text-xs sm:text-sm">{pkg.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Sections (For @AreyParo) */}
              {selectedDetails.additionalDetails && selectedDetails.additionalDetails.map((sec, idx) => (
                <div key={idx} className="space-y-4">
                  <h4 className="text-base sm:text-lg font-bold text-white tracking-wide border-b border-neutral-900 pb-2">
                    {sec.title}
                  </h4>
                  <div className="space-y-3.5">
                    {sec.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="p-4 bg-white/[0.02] border border-neutral-900 rounded-xl space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                          <span className="font-bold text-white text-sm sm:text-base">{item.name}</span>
                          {item.price && (
                            <span className="font-extrabold text-[#b5ff2b] text-sm sm:text-base">{item.price}</span>
                          )}
                        </div>
                        {item.desc && (
                          <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Guidelines or Extra Info */}
              {selectedDetails.extraInfo && (
                <div className="p-4 rounded-xl bg-[#b5ff2b]/5 border border-[#b5ff2b]/10 text-[#b5ff2b] text-xs sm:text-sm font-medium leading-relaxed">
                  {selectedDetails.extraInfo}
                </div>
              )}

              {/* Action Button */}
              <div className="pt-2 flex justify-end">
                <Button 
                  onClick={() => setSelectedService(null)} 
                  className="bg-neutral-800 text-white hover:bg-neutral-700 font-bold px-6 py-2 rounded-xl"
                >
                  Close Details
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WhatWeDo;
