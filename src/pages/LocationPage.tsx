import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { Link, useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Spotlight } from "@/components/ui/spotlight-aceternity";
import { ArrowRight, Video, Globe, Share2, Megaphone, Sparkles, Palette, Phone, Mail, MapPin, Star, Users, Clock, Shield, CheckCircle2, TrendingUp } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { getLocationData, getMisspellingRedirect, isValidLocationSlug } from "@/data/seoLocations";

// Services with CORRECT pricing from pricing-comparison page
const services = [
  { 
    icon: Video, 
    name: "Video Production", 
    desc: "Professional editing, color grading, motion graphics & post-production",
    price: "₹6,999",
    oldPrice: "₹45,000",
    savings: "90%",
    duration: "3-5 Days"
  },
  { 
    icon: Globe, 
    name: "Web Development", 
    desc: "Modern, responsive, conversion-focused custom websites",
    price: "₹4,999",
    oldPrice: "₹35,000",
    savings: "85%",
    duration: "1 Week"
  },
  { 
    icon: Palette, 
    name: "Brand Presence", 
    desc: "Complete brand identity, visual guidelines & strategic positioning",
    price: "₹5,999/mo",
    oldPrice: "₹40,000/mo",
    savings: "85%",
    duration: "Monthly"
  },
  { 
    icon: Megaphone, 
    name: "Performance Marketing", 
    desc: "High ROI ad campaigns, SEO & targeted advertising",
    price: "₹4,999/mo",
    oldPrice: "₹18,500/mo",
    savings: "73%",
    duration: "Ongoing"
  },
  { 
    icon: Sparkles, 
    name: "Motion Graphics", 
    desc: "4K animations, explainers, visual effects & intros",
    price: "₹3,999",
    oldPrice: "₹36,500",
    savings: "89%",
    duration: "48 Hours"
  },
  { 
    icon: Share2, 
    name: "Logo Design", 
    desc: "Unique, memorable logos with multiple concepts & revisions",
    price: "₹2,999",
    oldPrice: "₹25,000",
    savings: "88%",
    duration: "2-3 Days"
  },
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

  const pageTitle = `Best Creative Agency in ${data.name} | Video Production, Web Design, Digital Marketing - WhyCreatives`;
  const pageDescription = `WhyCreatives is the #1 creative agency in ${data.name}, ${data.state}. Professional video production from ₹6,999, web development from ₹4,999, digital marketing & branding. Up to 90% more affordable than local agencies. ${data.description}`;
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
        <meta property="og:image" content="https://whycreatives.in/logo.png" />
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
            "telephone": "+918119811655",
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
            "priceRange": "₹₹",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "50",
              "bestRating": "5",
              "worstRating": "1"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": `Creative Services in ${data.name}`,
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Video Production",
                    "description": `Professional video editing & production in ${data.name} starting from ₹6,999`
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Web Development",
                    "description": `Custom website design and development in ${data.name} starting from ₹4,999`
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Digital Marketing",
                    "description": `Performance marketing and SEO services in ${data.name} from ₹4,999/month`
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
                  {data.tagline}. {data.description.slice(0, 150)}...
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

              {/* Right content - Orbital Timeline */}
              <div
                className="relative w-full flex items-center justify-center animate-fade-in my-8 lg:my-0"
                style={{ animationDelay: "0.2s" }}
              >
                {/* Mobile version */}
                <div className="lg:hidden w-[120%] -mx-[10%] h-[500px] flex items-center justify-center overflow-visible py-8">
                  <div className="w-full h-full scale-[0.75]">
                    <RadialOrbitalTimeline timelineData={timelineData} />
                  </div>
                </div>
                {/* Desktop version */}
                <div className="hidden lg:block w-full h-[550px]">
                  <RadialOrbitalTimeline timelineData={timelineData} />
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <FadeInWhenVisible delay={0.2}>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-8 text-sm text-muted-foreground">
                <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full"><Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> 4.9/5 Rating</span>
                <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full"><Users className="w-4 h-4" /> 500+ Projects</span>
                <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full"><Clock className="w-4 h-4" /> 24-48hr Delivery</span>
                <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full"><Shield className="w-4 h-4" /> 100% Satisfaction</span>
              </div>
            </FadeInWhenVisible>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-8 mt-10 sm:mt-16 pt-10 sm:pt-16 border-t border-border animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-1 sm:mb-2">90%</div>
                <div className="text-[11px] sm:text-sm text-muted-foreground uppercase tracking-wide font-medium">SAVINGS</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-1 sm:mb-2">500+</div>
                <div className="text-[11px] sm:text-sm text-muted-foreground uppercase tracking-wide font-medium">PROJECTS</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-1 sm:mb-2">100%</div>
                <div className="text-[11px] sm:text-sm text-muted-foreground uppercase tracking-wide font-medium">TRANSPARENCY</div>
              </div>
            </div>
          </div>
        </section>

        {/* Highlights Section */}
        <section className="px-4 sm:px-6 py-12 sm:py-16">
          <div className="container mx-auto max-w-6xl">
            <FadeInWhenVisible>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {data.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm font-medium">{highlight}</span>
                  </div>
                ))}
              </div>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* Services Section with CORRECT Pricing */}
        <section className="px-4 sm:px-6 py-16 sm:py-24 bg-white/[0.02]">
          <div className="container mx-auto max-w-6xl">
            <FadeInWhenVisible>
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
                  Our Services in {data.name}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                  Premium quality at up to 90% less cost. Same professional results, exceptional value.
                </p>
              </div>
            </FadeInWhenVisible>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <FadeInWhenVisible key={index} delay={index * 0.1}>
                  <div className="group p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/[0.08] transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 rounded-2xl bg-white/10 group-hover:bg-white/20 transition-colors">
                        <service.icon className="w-6 h-6" />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold">
                        Save {service.savings}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{service.desc}</p>
                    <div className="flex items-end justify-between pt-4 border-t border-white/10">
                      <div>
                        <span className="text-xs text-muted-foreground line-through">{service.oldPrice}</span>
                        <div className="text-2xl font-black text-white">{service.price}</div>
                      </div>
                      <span className="text-xs text-muted-foreground bg-white/5 px-3 py-1 rounded-full">{service.duration}</span>
                    </div>
                  </div>
                </FadeInWhenVisible>
              ))}
            </div>

            <FadeInWhenVisible delay={0.4}>
              <div className="text-center mt-10">
                <Button size="lg" asChild className="bg-foreground text-background hover:bg-muted-foreground font-bold px-8 py-6 rounded-full">
                  <Link to="/pricing-comparison" className="flex items-center gap-2">
                    View Full Pricing <ArrowRight className="h-5 w-5" />
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
                  <div className="text-4xl sm:text-5xl font-black mb-2 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">90%</div>
                  <div className="text-sm text-muted-foreground">Cost Savings vs Local Agencies</div>
                </div>
              </FadeInWhenVisible>
              <FadeInWhenVisible delay={0.2}>
                <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                  <div className="text-4xl sm:text-5xl font-black mb-2 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">500+</div>
                  <div className="text-sm text-muted-foreground">Projects Delivered</div>
                </div>
              </FadeInWhenVisible>
              <FadeInWhenVisible delay={0.3}>
                <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                  <div className="text-4xl sm:text-5xl font-black mb-2 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">48hr</div>
                  <div className="text-sm text-muted-foreground">Average Turnaround</div>
                </div>
              </FadeInWhenVisible>
              <FadeInWhenVisible delay={0.4}>
                <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                  <div className="text-4xl sm:text-5xl font-black mb-2 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">4.9★</div>
                  <div className="text-sm text-muted-foreground">Client Rating</div>
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
                  Get a free consultation and quote within 2 hours. No commitment, no hidden fees. Just honest pricing that helps your business grow.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <Button size="lg" asChild className="bg-foreground text-background hover:bg-muted-foreground font-bold text-lg px-10 py-7 rounded-full">
                    <Link to="/contact">
                      Get Free Quote <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="border-2 border-foreground text-lg px-10 py-7 rounded-full font-bold">
                    <a href="tel:+918119811655">
                      <Phone className="mr-2 h-5 w-5" /> Call Now
                    </a>
                  </Button>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-muted-foreground">
                  <a href="tel:+918119811655" className="flex items-center gap-2 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full">
                    <Phone className="w-4 h-4" /> +91 81198 11655
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
                    WhyCreatives is {data.name}'s premier creative agency, offering world-class video production, web development, digital marketing, and branding services at prices up to 90% lower than traditional agencies. Based in Agartala, Tripura, we serve businesses across {data.state} and all of India with the same commitment to quality and excellence.
                  </p>
                  <p>
                    Whether you're a startup looking for your first website, an established business needing video content, or an enterprise requiring comprehensive digital marketing - WhyCreatives delivers premium results without the premium price tag. Our team of experienced professionals understands the unique needs of {data.name} businesses and delivers solutions that drive real results.
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