import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, Video, Globe, Share2, Megaphone, Sparkles, MapPin, Phone, Mail } from "lucide-react";

// Location data for SEO pages
const locationData: Record<string, { name: string; state: string; description: string }> = {
  // Tripura
  "agartala": { name: "Agartala", state: "Tripura", description: "capital city of Tripura" },
  "tripura": { name: "Tripura", state: "Northeast India", description: "northeastern state of India" },
  // Northeast India
  "guwahati": { name: "Guwahati", state: "Assam", description: "largest city in Northeast India" },
  "assam": { name: "Assam", state: "Northeast India", description: "gateway to Northeast India" },
  "shillong": { name: "Shillong", state: "Meghalaya", description: "Scotland of the East" },
  "meghalaya": { name: "Meghalaya", state: "Northeast India", description: "abode of clouds" },
  "imphal": { name: "Imphal", state: "Manipur", description: "capital of Manipur" },
  "manipur": { name: "Manipur", state: "Northeast India", description: "jewel of India" },
  "aizawl": { name: "Aizawl", state: "Mizoram", description: "capital of Mizoram" },
  "mizoram": { name: "Mizoram", state: "Northeast India", description: "land of the highlanders" },
  "kohima": { name: "Kohima", state: "Nagaland", description: "capital of Nagaland" },
  "nagaland": { name: "Nagaland", state: "Northeast India", description: "land of festivals" },
  "itanagar": { name: "Itanagar", state: "Arunachal Pradesh", description: "capital of Arunachal Pradesh" },
  "arunachal-pradesh": { name: "Arunachal Pradesh", state: "Northeast India", description: "land of the rising sun" },
  "gangtok": { name: "Gangtok", state: "Sikkim", description: "capital of Sikkim" },
  "sikkim": { name: "Sikkim", state: "Northeast India", description: "small Himalayan state" },
  // Major Indian Cities
  "kolkata": { name: "Kolkata", state: "West Bengal", description: "cultural capital of India" },
  "delhi": { name: "Delhi", state: "NCR", description: "capital of India" },
  "mumbai": { name: "Mumbai", state: "Maharashtra", description: "financial capital of India" },
  "bangalore": { name: "Bangalore", state: "Karnataka", description: "Silicon Valley of India" },
  "chennai": { name: "Chennai", state: "Tamil Nadu", description: "gateway to South India" },
  "hyderabad": { name: "Hyderabad", state: "Telangana", description: "city of pearls" },
  "pune": { name: "Pune", state: "Maharashtra", description: "Oxford of the East" },
  // Services
  "video-editing": { name: "Video Editing", state: "Services", description: "professional video editing services" },
  "web-design": { name: "Web Design", state: "Services", description: "modern web design services" },
  "digital-marketing": { name: "Digital Marketing", state: "Services", description: "data-driven digital marketing" },
  "branding": { name: "Branding", state: "Services", description: "brand identity design" },
  "motion-graphics": { name: "Motion Graphics", state: "Services", description: "animated graphics and videos" },
  "social-media": { name: "Social Media Marketing", state: "Services", description: "social media management" },
};

const services = [
  { icon: Video, name: "Video Production", desc: "Professional video editing with color grading and effects" },
  { icon: Globe, name: "Web Development", desc: "Modern, responsive websites that convert visitors" },
  { icon: Share2, name: "Brand Presence", desc: "Strategic social media management and content" },
  { icon: Megaphone, name: "Performance Marketing", desc: "Data-driven advertising campaigns" },
  { icon: Sparkles, name: "Motion Graphics", desc: "Eye-catching animations and explainer videos" },
];

const SEOLandingPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const data = slug ? locationData[slug] : null;

  if (!data) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-32 pb-24 px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          <Link to="/" className="text-primary hover:underline">Go back home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const isService = data.state === "Services";
  const pageTitle = isService 
    ? `${data.name} Services India | WhyCreatives`
    : `Creative Agency in ${data.name} | WhyCreatives - ${data.state}`;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 sm:pt-32 pb-16 sm:pb-24">
        {/* Hero Section */}
        <FadeInWhenVisible>
          <section className="px-4 sm:px-6 mb-16 sm:mb-24">
            <div className="container mx-auto max-w-6xl text-center">
              <div className="flex items-center justify-center gap-2 mb-4 text-muted-foreground">
                <MapPin className="w-5 h-5" />
                <span>{isService ? "Professional Services" : `Serving ${data.name}, ${data.state}`}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6">
                {isService ? (
                  <>Best {data.name} Services in India</>
                ) : (
                  <>Best Creative Agency in <span className="text-muted-foreground">{data.name}</span></>
                )}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                {isService ? (
                  `WhyCreatives offers ${data.description} at 90% less cost than traditional agencies. Premium quality, affordable prices.`
                ) : (
                  `WhyCreatives is the leading creative agency serving ${data.name}, ${data.description}. We offer video production, web design, digital marketing, and branding services at 90% less cost.`
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="bg-white text-black hover:bg-white/90 font-bold">
                  <Link to="/contact">
                    Get Free Quote <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-white/20">
                  <Link to="/our-work">View Our Work</Link>
                </Button>
              </div>
            </div>
          </section>
        </FadeInWhenVisible>

        {/* Services Grid */}
        <FadeInWhenVisible delay={0.2}>
          <section className="px-4 sm:px-6 mb-16 sm:mb-24">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
                {isService ? "What's Included" : `Our Services in ${data.name}`}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, index) => (
                  <div key={index} className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                    <service.icon className="w-10 h-10 mb-4 text-white" />
                    <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                    <p className="text-muted-foreground text-sm">{service.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeInWhenVisible>

        {/* Why Choose Us */}
        <FadeInWhenVisible delay={0.3}>
          <section className="px-4 sm:px-6 mb-16 sm:mb-24 bg-white/5 py-16">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
                Why Choose WhyCreatives {!isService && `in ${data.name}`}?
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl font-black mb-2">90%</div>
                  <div className="text-sm text-muted-foreground">Cost Savings</div>
                </div>
                <div>
                  <div className="text-4xl font-black mb-2">500+</div>
                  <div className="text-sm text-muted-foreground">Projects Done</div>
                </div>
                <div>
                  <div className="text-4xl font-black mb-2">48hr</div>
                  <div className="text-sm text-muted-foreground">Turnaround</div>
                </div>
                <div>
                  <div className="text-4xl font-black mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">Satisfaction</div>
                </div>
              </div>
            </div>
          </section>
        </FadeInWhenVisible>

        {/* Contact CTA */}
        <FadeInWhenVisible delay={0.4}>
          <section className="px-4 sm:px-6">
            <div className="container mx-auto max-w-4xl text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                Ready to Start Your Project {!isService && `in ${data.name}`}?
              </h2>
              <p className="text-muted-foreground mb-8">
                Contact us today for a free consultation and quote. We serve clients across {isService ? "India" : `${data.name} and all of ${data.state}`}.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a href="tel:+918119811655" className="flex items-center gap-2 text-white hover:text-muted-foreground transition-colors">
                  <Phone className="w-5 h-5" /> +91 81198 11655
                </a>
                <span className="hidden sm:block text-muted-foreground">|</span>
                <a href="mailto:hello@whycreatives.in" className="flex items-center gap-2 text-white hover:text-muted-foreground transition-colors">
                  <Mail className="w-5 h-5" /> hello@whycreatives.in
                </a>
              </div>
            </div>
          </section>
        </FadeInWhenVisible>
      </main>

      <Footer />
    </div>
  );
};

export default SEOLandingPage;
