import { useParams, Link, Navigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Check, ArrowLeft, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ServiceDetails = () => {
  const { slug } = useParams<{ slug: string }>();

  // Complete detailed descriptions, packages, and inclusions for all services
  const servicesData: Record<string, {
    title: string;
    subtitle: string;
    description: string;
    inclusions: string[];
    packages?: { name: string; price: string; desc: string }[];
    extraInfo?: string;
    additionalDetails?: { title: string; items: { name: string; desc?: string; price?: string }[] }[];
  }> = {
    "video-production": {
      title: "Video Production & Cinematic Editing",
      subtitle: "Cinematic, fast-paced commercial and short-form video editing.",
      description: "We handle everything from initial script ideation to filming and post-production editing. We edit with high pacing, sound design, hooks, and advanced color grading to ensure maximum engagement for your brand's videos.",
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
    "web-development": {
      title: "Web Design & Custom Development",
      subtitle: "Digital experiences engineered for performance, speed, and growth.",
      description: "We build custom, full-stack websites utilizing high-performance tech like Next.js, Vite, and Supabase. No templates - just custom-coded responsive design systems designed to capture leads and drive results.",
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
    "brand-presence": {
      title: "Brand Presence & Social Media Management",
      subtitle: "Cultivating active communities and driving organic brand awareness.",
      description: "We don't just post. We curate cohesive visual grids, plan weekly calendars, audit analytics, and run active moderation campaigns to turn your social media accounts into growth engines.",
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
    "performance-marketing": {
      title: "Performance Marketing & Paid Campaigns",
      subtitle: "Turning ad spend into measurable business revenue.",
      description: "Data-driven campaign setup and optimizations on Meta (Facebook/Instagram), Google Search, and LinkedIn. We run extensive audience A/B tests to maximize ROI and conversions.",
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
    "ugc-collaborations": {
      title: "@AreyParo UGC & Brand Collaborations",
      subtitle: "End-to-end creative management and collaborations by creator @AreyParo.",
      description: "Get high-engagement joint collaborations and UGC content created directly by creator @AreyParo. We manage everything from strategy, scripting, trends research to post-production delivery.",
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
    "logo-design": {
      title: "Logo & Brand Identity Design",
      subtitle: "Memorable visual identities that leave lasting impressions.",
      description: "Your logo is the face of your brand. We design unique, versatile vector logos that capture your business essence and stand out in the market.",
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

  const service = slug ? servicesData[slug] : null;

  // Redirect if service slug is invalid
  if (!service) {
    return <Navigate to="/what-we-do" replace />;
  }

  return (
    <div className="min-h-screen bg-[#070707] text-white">
      <Helmet>
        <title>{`${service.title} | WhyCreatives Services`}</title>
        <meta name="description" content={service.subtitle} />
      </Helmet>

      <Navigation />

      <main className="pt-32 pb-24 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link
            to="/what-we-do"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white mb-10 transition-colors text-sm font-medium font-sans"
          >
            <ArrowLeft className="w-4.5 h-4.5" />
            <span>Back to Services</span>
          </Link>

          {/* Hero Header */}
          <div className="space-y-4 mb-12 relative">
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-[#b5ff2b]/5 rounded-full blur-[100px] pointer-events-none" />
            <span className="text-[#b5ff2b] text-xs font-bold tracking-widest uppercase font-sans">Services</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-none font-sans">
              {service.title}
            </h1>
            <p className="text-neutral-400 text-lg sm:text-xl font-sans max-w-2xl leading-relaxed">
              {service.subtitle}
            </p>
          </div>

          {/* Overview Section */}
          <section className="bg-[#0f0f0f] border border-neutral-900 rounded-2xl p-6 sm:p-8 mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 font-sans text-white animate-pulse">Overview</h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-sans">
              {service.description}
            </p>
          </section>

          {/* Inclusions checklist */}
          <section className="bg-[#0f0f0f] border border-neutral-900 rounded-2xl p-6 sm:p-8 mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 font-sans text-white border-b border-neutral-900 pb-2">
              What's Included
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.inclusions.map((item, idx) => (
                <div key={idx} className="flex gap-3 items-start text-neutral-300 text-sm sm:text-base font-sans">
                  <div className="w-5 h-5 rounded-full bg-[#b5ff2b]/10 border border-[#b5ff2b]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#b5ff2b]" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Packages */}
          {service.packages && service.packages.length > 0 && (
            <section className="bg-[#0f0f0f] border border-neutral-900 rounded-2xl p-6 sm:p-8 mb-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-6 font-sans text-white border-b border-neutral-900 pb-2">
                Packages & Delivery Pricing
              </h2>
              <div className="space-y-4">
                {service.packages.map((pkg, idx) => (
                  <div key={idx} className="p-5 bg-[#0a0a0a] border border-neutral-900 rounded-xl space-y-2 hover:border-[#b5ff2b]/20 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
                      <span className="font-bold text-white text-base sm:text-lg font-sans">{pkg.name}</span>
                      <span className="font-extrabold text-[#b5ff2b] text-base sm:text-lg font-sans">{pkg.price}</span>
                    </div>
                    <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-sans">{pkg.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Additional details */}
          {service.additionalDetails && service.additionalDetails.map((sec, idx) => (
            <section key={idx} className="bg-[#0f0f0f] border border-neutral-900 rounded-2xl p-6 sm:p-8 mb-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-6 font-sans text-white border-b border-neutral-900 pb-2">
                {sec.title}
              </h2>
              <div className="space-y-4">
                {sec.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="p-5 bg-[#0a0a0a] border border-neutral-900 rounded-xl space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
                      <span className="font-bold text-white text-base sm:text-lg font-sans">{item.name}</span>
                      {item.price && (
                        <span className="font-extrabold text-[#b5ff2b] text-base sm:text-lg font-sans">{item.price}</span>
                      )}
                    </div>
                    {item.desc && (
                      <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-sans">{item.desc}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Extra notes */}
          {service.extraInfo && (
            <div className="p-5 rounded-2xl bg-[#b5ff2b]/5 border border-[#b5ff2b]/15 text-[#b5ff2b] text-sm font-semibold leading-relaxed mb-12 font-sans">
              {service.extraInfo}
            </div>
          )}

          {/* Call to action panel */}
          <div className="bg-gradient-to-r from-[#b5ff2b] to-emerald-400 rounded-3xl p-8 sm:p-12 text-black text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent)]" />
            <h2 className="text-3xl sm:text-4xl font-black mb-4 font-sans tracking-tight">
              Ready to elevate your project?
            </h2>
            <p className="text-black/80 text-sm sm:text-base max-w-lg mx-auto mb-8 font-sans">
              Connect with our creative team. Let's outline the scope, confirm timelines, and start building high-impact visuals.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-black text-white hover:bg-neutral-900 font-bold px-8 py-4 rounded-full shadow-lg transition-transform hover:scale-[1.03]"
            >
              <span>Start a project</span>
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceDetails;
