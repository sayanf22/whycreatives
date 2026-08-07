import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { Link, useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Spotlight } from "@/components/ui/spotlight-aceternity";
import { ArrowRight, Video, Globe, Share2, Megaphone, Instagram, Palette, Phone, Mail, MapPin, Star, Users, Clock, Shield, CheckCircle2, TrendingUp } from "lucide-react";
import { getLocationData, getMisspellingRedirect, isValidLocationSlug } from "@/data/seoLocations";

// Service summaries; scope and commercial details are shared after discovery.
const services = [
  { icon: Video, name: "Video Editing & Motion Design", desc: "Story-first editing, colour, sound and motion for campaigns and social content", detail: "Film · Reels · Motion" },
  { icon: Globe, name: "Web & App Development", desc: "Custom websites, SaaS products and mobile apps from interface to infrastructure", detail: "Web · iOS · Android" },
  { icon: Palette, name: "Brand Presence", desc: "Positioning, identity systems and repeatable content operations", detail: "Strategy · Identity · Social" },
  { icon: Megaphone, name: "Performance Marketing", desc: "Measured acquisition campaigns, tracking and conversion improvement", detail: "Search · Social · Analytics" },
  { icon: Instagram, name: "UGC Reels & Collaborations", desc: "Natural product stories, creator concepts and platform-native vertical content", detail: "UGC · Reels · Creative" },
  { icon: Share2, name: "Logo & Brand Identity", desc: "Distinctive visual systems built to work across digital and physical touchpoints", detail: "Logo · Type · Guidelines" },
];

// Timeline data for orbital animation (same as homepage)
const timelineData = [
  {
    id: 1,
    title: "Video Editing",
    date: "Professional",
    content: "High-quality video editing with professional transitions and effects.",
    category: "Video",
    icon: Video,
    relatedIds: [2, 4],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "Web Design",
    date: "Modern",
    content: "Responsive and beautiful web designs that convert.",
    category: "Design",
    icon: Globe,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 95,
  },
  {
    id: 3,
    title: "Social Media",
    date: "Engaging",
    content: "Strategic social media management and content creation.",
    category: "Marketing",
    icon: Share2,
    relatedIds: [2, 5],
    status: "in-progress" as const,
    energy: 85,
  },
  {
    id: 4,
    title: "Branding",
    date: "Creative",
    content: "Unique brand identity and visual design solutions.",
    category: "Design",
    icon: Palette,
    relatedIds: [1, 5],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 5,
    title: "Growth",
    date: "Results",
    content: "Data-driven strategies for business growth and success.",
    category: "Strategy",
    icon: TrendingUp,
    relatedIds: [3, 4],
    status: "in-progress" as const,
    energy: 80,
  },
];

const LocationPage = () => {
  const { location } = useParams<{ location: string }>();

  if (!location) {
    return <Navigate to="/" replace />;
  }

  // Check for misspelling redirect
  const redirectTarget = getMisspellingRedirect(location);
  if (redirectTarget) {
    return <Navigate to={`/${redirectTarget}`} replace />;
  }

  // Check if location is valid
  if (!isValidLocationSlug(location)) {
    return <Navigate to="/404" replace />;
  }

  // Get location data
  const data = getLocationData(location);
  if (!data) {
    return <Navigate to="/404" replace />;
  }

  const pageTitle = `Best Creative Agency in ${data.name} | Video Editing, Motion Design, Web & App Development - WhyCreatives`;
  const pageDescription = `WhyCreatives is a multidisciplinary creative agency serving ${data.name}, ${data.state}. We design video, brands, websites, applications, campaigns and content through a modern remote workflow with clear milestones and documented handover.`;
  const pageKeywords = data.keywords.join(", ");

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <link rel="canonical" href={`https://whycreatives.in/${location}`} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={`https://whycreatives.in/${location}`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://whycreatives.in/favicon.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content={`${data.name}, ${data.state}`} />
        {data.population && <meta name="population" content={data.population} />}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": `WhyCreatives - Creative Agency ${data.name}`,
            "description": pageDescription,
            "url": `https://whycreatives.in/${location}`,
            "telephone": "+918210198880",
            "email": "hello@whycreatives.in",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": data.name,
              "addressRegion": data.state,
              "addressCountry": "IN"
            },
            "areaServed": {
              "@type": "City",
              "name": data.name
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": `Creative Services in ${data.name}`,
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Video Editing & Motion Design",
                    "description": `Professional video editing, motion design and production for businesses in ${data.name}`
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Web Development",
                    "description": `Custom websites, applications and digital products for businesses in ${data.name}`
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Digital Marketing",
                    "description": `Performance marketing, measurement and SEO services for businesses in ${data.name}`
                  }
                }
              ]
            }
          })}
        </script>
      </Helmet>

      <Navigation />

      <main>
        {/* Hero Section - Same style as homepage */}
        <section className="min-h-screen flex flex-col justify-start md:justify-center px-5 sm:px-6 pt-28 sm:pt-32 md:pt-36 pb-10 sm:pb-12 relative overflow-x-hidden">
          <Spotlight
            className="hidden md:block -top-40 left-0 md:left-60 md:-top-20 opacity-20"
            fill="white"
          />

          <div className="w-full max-w-7xl mx-auto">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
              {/* Left content */}
              <div className="relative z-10 w-full animate-fade-in-up">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                  <MapPin className="w-4 h-4 text-white/70" />
                  <span className="text-sm text-white/70">Serving {data.name}, {data.state}</span>
                </div>
                <h1 className="text-[2.2rem] leading-[1.15] sm:text-5xl md:text-6xl lg:text-7xl font-black text-foreground mb-4 sm:mb-6 tracking-tight">
                  Best Creative
                  <br />
                  Agency in
                  <br />
                  <span className="text-muted-foreground">{data.name}</span>
                </h1>
                <p className="text-sm sm:text-xl md:text-2xl text-muted-foreground mb-5 sm:mb-8 leading-relaxed">
                  Creative direction, digital products and growth systems for {data.name} businesses—delivered through one connected remote team.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Button
                    size="lg"
                    asChild
                    className="bg-foreground text-background hover:bg-muted-foreground text-base sm:text-lg px-8 py-5 sm:py-6 font-bold w-full sm:w-auto rounded-full"
                  >
                    <Link to="/contact" className="flex items-center justify-center gap-2">
                      Get Free Quote
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-background text-base sm:text-lg px-8 py-5 sm:py-6 font-bold w-full sm:w-auto rounded-full"
                  >
                    <Link to="/our-work" className="flex items-center justify-center">
                      View Our Work
                    </Link>
                  </Button>
                </div>
              </div>

            </div>

            {/* Delivery principles */}
            <FadeInWhenVisible delay={0.2}>
              <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <span className="rounded-full bg-white/5 px-4 py-2">Scope shaped around your goal</span>
                <span className="rounded-full bg-white/5 px-4 py-2">One accountable project lead</span>
                <span className="rounded-full bg-white/5 px-4 py-2">Modern production stack</span>
                <span className="rounded-full bg-white/5 px-4 py-2">Documented handover</span>
              </div>
            </FadeInWhenVisible>

            {/* Process snapshot */}
            <div className="mt-10 grid grid-cols-3 gap-3 border-t border-border pt-10 sm:mt-16 sm:gap-8 sm:pt-16" style={{ animationDelay: "0.6s" }}>
              {["Discover", "Build", "Launch"].map((step, index) => (
                <div key={step} className="text-center">
                  <div className="mb-1 font-mono text-xs text-muted-foreground">0{index + 1}</div>
                  <div className="text-lg font-black text-foreground sm:text-3xl">{step}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Highlights Section */}
        <section className="px-4 sm:px-6 py-12 sm:py-16">
          <div className="container mx-auto max-w-6xl">
            <FadeInWhenVisible>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["Remote collaboration", "Clear milestones", "Modern production stack", "Documented handover"].map((highlight, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                    <CheckCircle2 className="w-5 h-5 text-foreground flex-shrink-0" />
                    <span className="text-sm font-medium">{highlight}</span>
                  </div>
                ))}
              </div>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* Services Section */}
        <section className="px-4 sm:px-6 py-16 sm:py-24 bg-white/[0.02]">
          <div className="container mx-auto max-w-6xl">
            <FadeInWhenVisible>
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
                  Our Services in {data.name}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                  Built around your objective, users and delivery constraints—not a public package or one-size-fits-all rate card.
                </p>
              </div>
            </FadeInWhenVisible>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <FadeInWhenVisible key={index} delay={index * 0.1}>
                  <div className="group p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/[0.08] transition-all duration-300">
                    <div className="mb-4 flex items-start justify-between">
                      <div className="rounded-2xl bg-white/10 p-3 transition-colors group-hover:bg-white/20">
                        <service.icon className="h-6 w-6" />
                      </div>
                      <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mb-2 text-xl font-bold">{service.name}</h3>
                    <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{service.desc}</p>
                    <div className="border-t border-white/10 pt-4 text-xs font-semibold uppercase tracking-[0.12em] text-foreground/70">
                      {service.detail}
                    </div>
                  </div>
                </FadeInWhenVisible>
              ))}
            </div>

            <FadeInWhenVisible delay={0.4}>
              <div className="text-center mt-10">
                <Button size="lg" asChild className="bg-foreground text-background hover:bg-muted-foreground font-bold px-8 py-6 rounded-full">
                  <Link to="/what-we-do" className="flex items-center gap-2">
                    Explore All Services <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="px-4 sm:px-6 py-16 sm:py-24">
          <div className="container mx-auto max-w-6xl">
            <FadeInWhenVisible>
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
                  Why {data.name} Businesses Choose Us
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                  We're not just another agency. We're your creative partner committed to your success.
                </p>
              </div>
            </FadeInWhenVisible>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <FadeInWhenVisible delay={0.1}>
                <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                  <div className="text-3xl sm:text-4xl font-black mb-2 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">Focused</div>
                  <div className="text-sm text-muted-foreground">Scope tied to the business goal</div>
                </div>
              </FadeInWhenVisible>
              <FadeInWhenVisible delay={0.2}>
                <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                  <div className="text-3xl sm:text-4xl font-black mb-2 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">Connected</div>
                  <div className="text-sm text-muted-foreground">Strategy, design and build in one team</div>
                </div>
              </FadeInWhenVisible>
              <FadeInWhenVisible delay={0.3}>
                <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                  <div className="text-3xl sm:text-4xl font-black mb-2 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">Visible</div>
                  <div className="text-sm text-muted-foreground">Milestones, reviews and decisions</div>
                </div>
              </FadeInWhenVisible>
              <FadeInWhenVisible delay={0.4}>
                <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                  <div className="text-3xl sm:text-4xl font-black mb-2 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">Owned</div>
                  <div className="text-sm text-muted-foreground">Files, documentation and clean handover</div>
                </div>
              </FadeInWhenVisible>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 sm:px-6 py-16 sm:py-24 bg-white/[0.02]">
          <div className="container mx-auto max-w-4xl">
            <FadeInWhenVisible>
              <div className="text-center p-8 sm:p-12 rounded-[2rem] bg-gradient-to-br from-white/10 to-white/5 border border-white/10">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
                  Ready to Start Your Project?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg">
                  Share the goal, context and constraints. We will respond with the right questions, a recommended scope and a tailored proposal—without pushing a generic package.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <Button size="lg" asChild className="bg-foreground text-background hover:bg-muted-foreground font-bold text-lg px-10 py-7 rounded-full">
                    <Link to="/contact">
                      Get Free Quote <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="border-2 border-foreground text-lg px-10 py-7 rounded-full font-bold">
                    <a href="tel:+918210198880">
                      <Phone className="mr-2 h-5 w-5" /> Call Now
                    </a>
                  </Button>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-muted-foreground">
                  <a href="tel:+918210198880" className="flex items-center gap-2 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full">
                    <Phone className="w-4 h-4" /> +91 82101 98880
                  </a>
                  <a href="mailto:hello@whycreatives.in" className="flex items-center gap-2 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full">
                    <Mail className="w-4 h-4" /> hello@whycreatives.in
                  </a>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="px-4 sm:px-6 py-16 sm:py-24">
          <div className="container mx-auto max-w-4xl">
            <FadeInWhenVisible>
              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl sm:text-3xl font-black mb-6 text-center">
                  About WhyCreatives in {data.name}
                </h2>
                <div className="text-muted-foreground space-y-4 text-center">
                  <p>
                    WhyCreatives is a multidisciplinary creative agency serving {data.name} with video editing, web and app development, performance marketing, UGC, and brand identity services. Based in Guwahati, Assam, we work with businesses across {data.state} and India through a clear remote collaboration process.
                  </p>
                  <p>
                    Whether you are launching a first website, improving a digital product, building a content system or preparing a growth campaign, we shape the team, technology and deliverables around the outcome. Every engagement has clear milestones, review points and a documented handover.
                  </p>
                  <p>
                    Contact us today for a free consultation and discover why hundreds of businesses across India trust WhyCreatives for their creative needs.
                  </p>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LocationPage;