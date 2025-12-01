import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, Video, Globe, Share2, Megaphone, Sparkles, MapPin, Phone, Mail, Star, Clock, Shield, Users, CheckCircle, Building, Camera, Palette } from "lucide-react";
import { Helmet } from "react-helmet";

// Comprehensive location data for SEO pages
const locationData: Record<string, { name: string; state: string; description: string; longDesc?: string; landmarks?: string[] }> = {
  // Agartala Areas & Tripura Districts
  "agartala": { name: "Agartala", state: "Tripura", description: "capital city of Tripura", longDesc: "Agartala, the capital of Tripura, is a rapidly growing city with thriving businesses and startups. WhyCreatives provides top-notch creative services to businesses in Agartala.", landmarks: ["Ujjayanta Palace", "Neermahal", "Tripura Sundari Temple"] },
  "tripura": { name: "Tripura", state: "Northeast India", description: "northeastern state of India", longDesc: "Tripura is one of the seven sister states of Northeast India. WhyCreatives is proud to be the leading creative agency serving all districts of Tripura." },
  "dharmanagar": { name: "Dharmanagar", state: "Tripura", description: "major town in North Tripura", longDesc: "Dharmanagar is an important commercial center in North Tripura. We serve businesses and organizations in Dharmanagar with professional creative services." },
  "udaipur-tripura": { name: "Udaipur", state: "Tripura", description: "historic city in South Tripura", longDesc: "Udaipur, also known as the Lake City of Tripura, is home to the famous Tripura Sundari Temple. We provide creative services to businesses in Udaipur." },
  "kailashahar": { name: "Kailashahar", state: "Tripura", description: "town in Unakoti district", longDesc: "Kailashahar is the headquarters of Unakoti district, known for the famous Unakoti rock carvings. WhyCreatives serves local businesses here." },
  "ambassa": { name: "Ambassa", state: "Tripura", description: "town in Dhalai district", longDesc: "Ambassa is the headquarters of Dhalai district in Tripura. We offer affordable creative services to businesses in Ambassa and surrounding areas." },
  "belonia": { name: "Belonia", state: "Tripura", description: "town in South Tripura", longDesc: "Belonia is an important border town in South Tripura. WhyCreatives provides digital marketing and creative services to businesses here." },
  "sabroom": { name: "Sabroom", state: "Tripura", description: "southernmost town of Tripura", longDesc: "Sabroom is strategically located at the southern tip of Tripura, near the Bangladesh border. We serve businesses in this growing commercial hub." },
  "khowai": { name: "Khowai", state: "Tripura", description: "district headquarters in Tripura", longDesc: "Khowai is a district headquarters in Tripura with growing business opportunities. WhyCreatives offers creative solutions to local enterprises." },
  "teliamura": { name: "Teliamura", state: "Tripura", description: "town in Khowai district", longDesc: "Teliamura is an important town in Khowai district. We provide video editing, web design, and marketing services to businesses here." },
  "bishalgarh": { name: "Bishalgarh", state: "Tripura", description: "town in Sepahijala district", longDesc: "Bishalgarh is a major town in Sepahijala district, known for its agricultural activities. WhyCreatives serves local businesses and cooperatives." },
  "sonamura": { name: "Sonamura", state: "Tripura", description: "border town in Sepahijala", longDesc: "Sonamura is an important border town with significant trade activities. We offer creative and digital marketing services to businesses here." },

  // Northeast India States & Cities
  "guwahati": { name: "Guwahati", state: "Assam", description: "largest city in Northeast India", longDesc: "Guwahati is the gateway to Northeast India and a major commercial hub. WhyCreatives serves businesses across Guwahati with premium creative services." },
  "assam": { name: "Assam", state: "Northeast India", description: "gateway to Northeast India", longDesc: "Assam is the largest state in Northeast India with a thriving business ecosystem. We provide creative services to businesses across all districts of Assam." },
  "silchar": { name: "Silchar", state: "Assam", description: "major city in Barak Valley", longDesc: "Silchar is the main city of Barak Valley in Assam. WhyCreatives offers affordable creative services to businesses in Silchar and surrounding areas." },
  "dibrugarh": { name: "Dibrugarh", state: "Assam", description: "tea city of India", longDesc: "Dibrugarh is known as the Tea City of India. We serve tea estates, businesses, and startups in Dibrugarh with professional creative services." },
  "jorhat": { name: "Jorhat", state: "Assam", description: "cultural capital of Assam", longDesc: "Jorhat is the cultural capital of Assam. WhyCreatives provides video production, web design, and branding services to businesses here." },
  "tezpur": { name: "Tezpur", state: "Assam", description: "cultural city of Assam", longDesc: "Tezpur is known for its rich cultural heritage. We offer creative services to educational institutions, businesses, and organizations in Tezpur." },
  "shillong": { name: "Shillong", state: "Meghalaya", description: "Scotland of the East", longDesc: "Shillong, the capital of Meghalaya, is known as the Scotland of the East. WhyCreatives serves the vibrant business community of Shillong." },
  "meghalaya": { name: "Meghalaya", state: "Northeast India", description: "abode of clouds", longDesc: "Meghalaya is known for its natural beauty and tourism. We provide creative services to tourism businesses, hotels, and local enterprises." },
  "tura": { name: "Tura", state: "Meghalaya", description: "major town in Garo Hills", longDesc: "Tura is the main town of Garo Hills in Meghalaya. WhyCreatives offers digital marketing and creative services to businesses in Tura." },
  "imphal": { name: "Imphal", state: "Manipur", description: "capital of Manipur", longDesc: "Imphal is the capital of Manipur, known for its rich culture. We serve businesses, artisans, and organizations in Imphal with creative solutions." },
  "manipur": { name: "Manipur", state: "Northeast India", description: "jewel of India", longDesc: "Manipur is known as the Jewel of India. WhyCreatives provides creative services to promote local businesses and handicrafts of Manipur." },
  "aizawl": { name: "Aizawl", state: "Mizoram", description: "capital of Mizoram", longDesc: "Aizawl is the capital of Mizoram with a growing business sector. We offer affordable creative services to businesses in Aizawl." },
  "mizoram": { name: "Mizoram", state: "Northeast India", description: "land of the highlanders", longDesc: "Mizoram is known for its scenic beauty and high literacy rate. WhyCreatives serves educational institutions and businesses across Mizoram." },
  "kohima": { name: "Kohima", state: "Nagaland", description: "capital of Nagaland", longDesc: "Kohima is the capital of Nagaland, famous for the Hornbill Festival. We provide creative services to tourism and local businesses." },
  "nagaland": { name: "Nagaland", state: "Northeast India", description: "land of festivals", longDesc: "Nagaland is known for its vibrant tribal culture and festivals. WhyCreatives helps local businesses and artisans with digital presence." },
  "dimapur": { name: "Dimapur", state: "Nagaland", description: "commercial hub of Nagaland", longDesc: "Dimapur is the commercial capital of Nagaland. We serve businesses, traders, and entrepreneurs in Dimapur with creative solutions." },
  "itanagar": { name: "Itanagar", state: "Arunachal Pradesh", description: "capital of Arunachal Pradesh", longDesc: "Itanagar is the capital of Arunachal Pradesh. WhyCreatives provides creative services to government departments and businesses here." },
  "arunachal-pradesh": { name: "Arunachal Pradesh", state: "Northeast India", description: "land of the rising sun", longDesc: "Arunachal Pradesh is the Land of the Rising Sun. We serve tourism businesses, hotels, and local enterprises across the state." },
  "gangtok": { name: "Gangtok", state: "Sikkim", description: "capital of Sikkim", longDesc: "Gangtok is the capital of Sikkim, a major tourist destination. WhyCreatives serves hotels, tour operators, and businesses in Gangtok." },
  "sikkim": { name: "Sikkim", state: "Northeast India", description: "small Himalayan state", longDesc: "Sikkim is India's first fully organic state. We provide creative services to eco-tourism businesses and local enterprises." },

  // Major Indian Cities
  "kolkata": { name: "Kolkata", state: "West Bengal", description: "cultural capital of India", longDesc: "Kolkata is the cultural capital of India with a rich heritage. WhyCreatives serves businesses, startups, and creative industries in Kolkata." },
  "delhi": { name: "Delhi", state: "NCR", description: "capital of India", longDesc: "Delhi is the national capital with a massive business ecosystem. We provide affordable creative services to Delhi-based businesses remotely." },
  "new-delhi": { name: "New Delhi", state: "NCR", description: "national capital of India", longDesc: "New Delhi is home to government offices and major corporations. WhyCreatives offers cost-effective creative solutions to Delhi businesses." },
  "noida": { name: "Noida", state: "NCR", description: "IT hub near Delhi", longDesc: "Noida is a major IT and business hub in NCR. We serve tech companies and startups in Noida with professional creative services." },
  "gurgaon": { name: "Gurgaon", state: "NCR", description: "millennium city", longDesc: "Gurgaon (Gurugram) is a major corporate hub. WhyCreatives provides affordable creative services to Gurgaon-based companies." },
  "mumbai": { name: "Mumbai", state: "Maharashtra", description: "financial capital of India", longDesc: "Mumbai is India's financial capital. We offer cost-effective creative services to Mumbai businesses at 90% less than local agencies." },
  "bangalore": { name: "Bangalore", state: "Karnataka", description: "Silicon Valley of India", longDesc: "Bangalore is India's tech capital. WhyCreatives serves startups and tech companies in Bangalore with affordable creative solutions." },
  "bengaluru": { name: "Bengaluru", state: "Karnataka", description: "IT capital of India", longDesc: "Bengaluru is home to thousands of startups. We provide video editing, web design, and marketing services to Bengaluru businesses." },
  "chennai": { name: "Chennai", state: "Tamil Nadu", description: "gateway to South India", longDesc: "Chennai is a major industrial and cultural hub. WhyCreatives serves businesses in Chennai with professional creative services." },
  "hyderabad": { name: "Hyderabad", state: "Telangana", description: "city of pearls", longDesc: "Hyderabad is a major IT hub. We provide affordable creative services to tech companies and businesses in Hyderabad." },
  "pune": { name: "Pune", state: "Maharashtra", description: "Oxford of the East", longDesc: "Pune is known for education and IT. WhyCreatives serves educational institutions and businesses in Pune." },
  "ahmedabad": { name: "Ahmedabad", state: "Gujarat", description: "commercial hub of Gujarat", longDesc: "Ahmedabad is a major commercial center. We offer creative services to textile, pharma, and other businesses in Ahmedabad." },
  "jaipur": { name: "Jaipur", state: "Rajasthan", description: "Pink City of India", longDesc: "Jaipur is known for tourism and handicrafts. WhyCreatives serves hotels, artisans, and businesses in Jaipur." },
  "lucknow": { name: "Lucknow", state: "Uttar Pradesh", description: "city of nawabs", longDesc: "Lucknow is the capital of UP with growing businesses. We provide creative services to Lucknow-based enterprises." },
  "chandigarh": { name: "Chandigarh", state: "Punjab/Haryana", description: "city beautiful", longDesc: "Chandigarh is a planned city with modern businesses. WhyCreatives serves companies in Chandigarh and surrounding areas." },
  "bhubaneswar": { name: "Bhubaneswar", state: "Odisha", description: "temple city of India", longDesc: "Bhubaneswar is the capital of Odisha. We serve IT companies, temples, and businesses in Bhubaneswar." },
  "kochi": { name: "Kochi", state: "Kerala", description: "queen of Arabian Sea", longDesc: "Kochi is a major port city and IT hub. WhyCreatives provides creative services to businesses in Kochi." },
  "indore": { name: "Indore", state: "Madhya Pradesh", description: "commercial capital of MP", longDesc: "Indore is the commercial capital of Madhya Pradesh. We serve businesses and startups in Indore." },
  "patna": { name: "Patna", state: "Bihar", description: "capital of Bihar", longDesc: "Patna is one of the oldest cities in India. WhyCreatives serves businesses and educational institutions in Patna." },
  "ranchi": { name: "Ranchi", state: "Jharkhand", description: "capital of Jharkhand", longDesc: "Ranchi is the capital of Jharkhand. We provide creative services to businesses and organizations in Ranchi." },
  "raipur": { name: "Raipur", state: "Chhattisgarh", description: "capital of Chhattisgarh", longDesc: "Raipur is a growing industrial city. WhyCreatives serves businesses in Raipur with affordable creative solutions." },

  // Services - Expanded
  "video-editing": { name: "Video Editing", state: "Services", description: "professional video editing services", longDesc: "Our video editing services include color grading, transitions, effects, sound design, and professional post-production. Starting at just ₹500 per video." },
  "video-production": { name: "Video Production", state: "Services", description: "end-to-end video production", longDesc: "Complete video production services from concept to final delivery. Corporate videos, ads, documentaries, and more." },
  "web-design": { name: "Web Design", state: "Services", description: "modern web design services", longDesc: "Custom website design with modern UI/UX, responsive layouts, and conversion-focused design. Starting at ₹2,000." },
  "web-development": { name: "Web Development", state: "Services", description: "full-stack web development", longDesc: "Professional web development using React, Next.js, and modern technologies. E-commerce, portals, and custom applications." },
  "digital-marketing": { name: "Digital Marketing", state: "Services", description: "data-driven digital marketing", longDesc: "Comprehensive digital marketing including SEO, PPC, content marketing, and analytics. Grow your online presence effectively." },
  "seo-services": { name: "SEO Services", state: "Services", description: "search engine optimization", longDesc: "Professional SEO services to rank higher on Google. On-page, off-page, technical SEO, and local SEO for businesses." },
  "branding": { name: "Branding", state: "Services", description: "brand identity design", longDesc: "Complete brand identity design including logo, color palette, typography, brand guidelines, and visual identity systems." },
  "logo-design": { name: "Logo Design", state: "Services", description: "professional logo design", longDesc: "Custom logo design that represents your brand. Multiple concepts, unlimited revisions, and all file formats included." },
  "motion-graphics": { name: "Motion Graphics", state: "Services", description: "animated graphics and videos", longDesc: "Eye-catching motion graphics, animated logos, explainer videos, and visual effects for your brand." },
  "social-media": { name: "Social Media Marketing", state: "Services", description: "social media management", longDesc: "Complete social media management including content creation, scheduling, engagement, and analytics. Starting at ₹3,000/month." },
  "content-creation": { name: "Content Creation", state: "Services", description: "professional content creation", longDesc: "High-quality content creation for blogs, social media, websites, and marketing materials." },
  "graphic-design": { name: "Graphic Design", state: "Services", description: "professional graphic design", longDesc: "Professional graphic design for print and digital. Brochures, posters, social media graphics, and more." },
  "ui-ux-design": { name: "UI/UX Design", state: "Services", description: "user interface and experience design", longDesc: "User-centered UI/UX design for websites and apps. Wireframes, prototypes, and final designs." },
  "ecommerce-development": { name: "E-commerce Development", state: "Services", description: "online store development", longDesc: "Complete e-commerce solutions using Shopify, WooCommerce, or custom platforms. Start selling online today." },
  "ad-campaigns": { name: "Ad Campaigns", state: "Services", description: "advertising campaign management", longDesc: "Professional ad campaign management for Google Ads, Facebook Ads, Instagram Ads, and more. Maximize your ROI." },
  "corporate-videos": { name: "Corporate Videos", state: "Services", description: "professional corporate video production", longDesc: "High-quality corporate videos for training, presentations, testimonials, and brand storytelling." },
  "reels-editing": { name: "Reels Editing", state: "Services", description: "Instagram and YouTube reels editing", longDesc: "Trendy reels editing for Instagram, YouTube Shorts, and TikTok. Engaging content that goes viral." },
  "thumbnail-design": { name: "Thumbnail Design", state: "Services", description: "YouTube thumbnail design", longDesc: "Eye-catching YouTube thumbnail designs that increase click-through rates. Professional and engaging." },
};


const services = [
  { icon: Video, name: "Video Production", desc: "Professional video editing with color grading, effects, and sound design" },
  { icon: Globe, name: "Web Development", desc: "Modern, responsive websites that convert visitors into customers" },
  { icon: Share2, name: "Social Media", desc: "Strategic social media management and content creation" },
  { icon: Megaphone, name: "Digital Marketing", desc: "Data-driven advertising campaigns and SEO services" },
  { icon: Sparkles, name: "Motion Graphics", desc: "Eye-catching animations, explainer videos, and visual effects" },
  { icon: Palette, name: "Branding", desc: "Complete brand identity design and logo creation" },
];

const testimonials = [
  { name: "Rajesh Kumar", location: "Agartala", text: "Best creative agency in Tripura! They delivered our website in just 3 days.", rating: 5 },
  { name: "Priya Sharma", location: "Guwahati", text: "Excellent video editing at unbeatable prices. Highly recommended!", rating: 5 },
  { name: "Amit Das", location: "Kolkata", text: "Professional team, great communication, and amazing results.", rating: 5 },
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
          <p className="text-muted-foreground mb-8">The page you're looking for doesn't exist.</p>
          <Link to="/" className="text-primary hover:underline">Go back home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const isService = data.state === "Services";
  const pageTitle = isService 
    ? `${data.name} Services India | WhyCreatives - Affordable ${data.name}`
    : `Best Creative Agency in ${data.name} | WhyCreatives - ${data.state}`;
  const pageDescription = isService
    ? `Professional ${data.name.toLowerCase()} services at 90% less cost. ${data.longDesc || data.description}. Contact WhyCreatives today!`
    : `WhyCreatives is the #1 creative agency in ${data.name}, ${data.state}. ${data.longDesc || data.description}. Video editing, web design, digital marketing at affordable prices.`;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={`creative agency ${data.name}, video editing ${data.name}, web design ${data.name}, digital marketing ${data.name}, ${data.state} creative agency, WhyCreatives ${data.name}`} />
        <link rel="canonical" href={`https://whycreatives.in/${slug}`} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={`https://whycreatives.in/${slug}`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
      </Helmet>
      
      <Navigation />
      
      <main className="pt-24 sm:pt-32 pb-16 sm:pb-24">
        {/* Hero Section */}
        <FadeInWhenVisible>
          <section className="px-4 sm:px-6 mb-16 sm:mb-24">
            <div className="container mx-auto max-w-6xl text-center">
              <div className="flex items-center justify-center gap-2 mb-4 text-muted-foreground">
                <MapPin className="w-5 h-5" />
                <span>{isService ? "Professional Services Across India" : `Serving ${data.name}, ${data.state}`}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6">
                {isService ? (
                  <>Best <span className="text-muted-foreground">{data.name}</span> Services in India</>
                ) : (
                  <>Best Creative Agency in <span className="text-muted-foreground">{data.name}</span></>
                )}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                {data.longDesc || (isService ? 
                  `WhyCreatives offers ${data.description} at 90% less cost than traditional agencies. Premium quality, affordable prices.` :
                  `WhyCreatives is the leading creative agency serving ${data.name}, ${data.description}. We offer video production, web design, digital marketing, and branding services at 90% less cost.`
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button size="lg" asChild className="bg-white text-black hover:bg-white/90 font-bold">
                  <Link to="/contact">
                    Get Free Quote <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-white/20">
                  <Link to="/our-work">View Our Work</Link>
                </Button>
              </div>
              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500" /> 4.9/5 Rating</span>
                <span className="flex items-center gap-1"><Users className="w-4 h-4" /> 500+ Clients</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 24-48hr Delivery</span>
                <span className="flex items-center gap-1"><Shield className="w-4 h-4" /> 100% Satisfaction</span>
              </div>
            </div>
          </section>
        </FadeInWhenVisible>


        {/* Services Grid */}
        <FadeInWhenVisible delay={0.1}>
          <section className="px-4 sm:px-6 mb-16 sm:mb-24">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
                {isService ? "What's Included in Our Service" : `Our Creative Services in ${data.name}`}
              </h2>
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                {isService ? "Comprehensive solutions tailored to your needs" : `Professional creative services for businesses in ${data.name} and ${data.state}`}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, index) => (
                  <div key={index} className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all hover:scale-105">
                    <service.icon className="w-10 h-10 mb-4 text-white" />
                    <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                    <p className="text-muted-foreground text-sm">{service.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeInWhenVisible>

        {/* Pricing Preview */}
        <FadeInWhenVisible delay={0.2}>
          <section className="px-4 sm:px-6 mb-16 sm:mb-24">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
                Affordable Pricing {!isService && `for ${data.name}`}
              </h2>
              <p className="text-muted-foreground text-center mb-12">90% less than metro agencies, same premium quality</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl border border-white/10 bg-white/5 text-center">
                  <Video className="w-8 h-8 mx-auto mb-4" />
                  <h3 className="font-bold mb-2">Video Editing</h3>
                  <div className="text-3xl font-black mb-2">₹500</div>
                  <p className="text-sm text-muted-foreground">Starting price per video</p>
                </div>
                <div className="p-6 rounded-2xl border border-white/20 bg-white/10 text-center relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold px-3 py-1 rounded-full">POPULAR</div>
                  <Globe className="w-8 h-8 mx-auto mb-4" />
                  <h3 className="font-bold mb-2">Website Design</h3>
                  <div className="text-3xl font-black mb-2">₹2,000</div>
                  <p className="text-sm text-muted-foreground">Starting price</p>
                </div>
                <div className="p-6 rounded-2xl border border-white/10 bg-white/5 text-center">
                  <Share2 className="w-8 h-8 mx-auto mb-4" />
                  <h3 className="font-bold mb-2">Social Media</h3>
                  <div className="text-3xl font-black mb-2">₹3,000</div>
                  <p className="text-sm text-muted-foreground">Per month</p>
                </div>
              </div>
              <div className="text-center mt-8">
                <Button asChild variant="outline" className="border-white/20">
                  <Link to="/pricing-comparison">View Full Pricing</Link>
                </Button>
              </div>
            </div>
          </section>
        </FadeInWhenVisible>

        {/* Stats Section */}
        <FadeInWhenVisible delay={0.3}>
          <section className="px-4 sm:px-6 mb-16 sm:mb-24 bg-white/5 py-16">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
                Why Choose WhyCreatives {!isService && `in ${data.name}`}?
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl font-black mb-2">90%</div>
                  <div className="text-sm text-muted-foreground">Cost Savings vs Metro Agencies</div>
                </div>
                <div>
                  <div className="text-4xl font-black mb-2">500+</div>
                  <div className="text-sm text-muted-foreground">Projects Completed</div>
                </div>
                <div>
                  <div className="text-4xl font-black mb-2">48hr</div>
                  <div className="text-sm text-muted-foreground">Average Turnaround</div>
                </div>
                <div>
                  <div className="text-4xl font-black mb-2">4.9★</div>
                  <div className="text-sm text-muted-foreground">Client Rating</div>
                </div>
              </div>
            </div>
          </section>
        </FadeInWhenVisible>


        {/* Testimonials */}
        <FadeInWhenVisible delay={0.35}>
          <section className="px-4 sm:px-6 mb-16 sm:mb-24">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
                What Our Clients Say
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="p-6 rounded-2xl border border-white/10 bg-white/5">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeInWhenVisible>

        {/* FAQ Section for SEO */}
        <FadeInWhenVisible delay={0.4}>
          <section className="px-4 sm:px-6 mb-16 sm:mb-24">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
                Frequently Asked Questions {!isService && `- ${data.name}`}
              </h2>
              <div className="space-y-4">
                <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
                  <h3 className="font-bold mb-2">What services does WhyCreatives offer {!isService && `in ${data.name}`}?</h3>
                  <p className="text-muted-foreground text-sm">We offer video editing, web design, digital marketing, branding, motion graphics, social media management, and more. All services are available remotely across India.</p>
                </div>
                <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
                  <h3 className="font-bold mb-2">How much do your services cost?</h3>
                  <p className="text-muted-foreground text-sm">Our services start at just ₹500 for video editing, ₹2,000 for web design, and ₹3,000/month for social media management. We're 90% more affordable than metro agencies.</p>
                </div>
                <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
                  <h3 className="font-bold mb-2">What is the turnaround time?</h3>
                  <p className="text-muted-foreground text-sm">Most projects are completed within 24-48 hours. Complex projects may take 3-7 days depending on requirements.</p>
                </div>
                <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
                  <h3 className="font-bold mb-2">Do you work with clients outside {data.name}?</h3>
                  <p className="text-muted-foreground text-sm">Yes! We work with clients across all 28 Indian states. Our team works remotely, so location is never a barrier.</p>
                </div>
              </div>
            </div>
          </section>
        </FadeInWhenVisible>

        {/* Contact CTA */}
        <FadeInWhenVisible delay={0.45}>
          <section className="px-4 sm:px-6">
            <div className="container mx-auto max-w-4xl">
              <div className="p-8 sm:p-12 rounded-3xl bg-white/5 border border-white/10 text-center">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                  Ready to Start Your Project {!isService && `in ${data.name}`}?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Get a free consultation and quote today. We serve clients across {isService ? "all of India" : `${data.name}, ${data.state}, and all of India`}.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                  <Button size="lg" asChild className="bg-white text-black hover:bg-white/90 font-bold">
                    <Link to="/contact">
                      Get Free Quote <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
                  <a href="tel:+918119811655" className="flex items-center gap-2 text-white hover:text-muted-foreground transition-colors">
                    <Phone className="w-5 h-5" /> +91 81198 11655
                  </a>
                  <span className="hidden sm:block text-muted-foreground">|</span>
                  <a href="mailto:hello@whycreatives.in" className="flex items-center gap-2 text-white hover:text-muted-foreground transition-colors">
                    <Mail className="w-5 h-5" /> hello@whycreatives.in
                  </a>
                </div>
              </div>
            </div>
          </section>
        </FadeInWhenVisible>

        {/* Related Locations - Internal Linking for SEO */}
        {!isService && (
          <FadeInWhenVisible delay={0.5}>
            <section className="px-4 sm:px-6 mt-16 sm:mt-24">
              <div className="container mx-auto max-w-6xl">
                <h2 className="text-xl font-bold mb-6 text-center">We Also Serve</h2>
                <div className="flex flex-wrap justify-center gap-3">
                  {Object.entries(locationData)
                    .filter(([key, val]) => val.state !== "Services" && key !== slug)
                    .slice(0, 12)
                    .map(([key, val]) => (
                      <Link key={key} to={`/${key}`} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-sm transition-colors">
                        {val.name}
                      </Link>
                    ))}
                </div>
              </div>
            </section>
          </FadeInWhenVisible>
        )}

        {/* Related Services - Internal Linking for SEO */}
        {isService && (
          <FadeInWhenVisible delay={0.5}>
            <section className="px-4 sm:px-6 mt-16 sm:mt-24">
              <div className="container mx-auto max-w-6xl">
                <h2 className="text-xl font-bold mb-6 text-center">Other Services</h2>
                <div className="flex flex-wrap justify-center gap-3">
                  {Object.entries(locationData)
                    .filter(([key, val]) => val.state === "Services" && key !== slug)
                    .map(([key, val]) => (
                      <Link key={key} to={`/${key}`} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-sm transition-colors">
                        {val.name}
                      </Link>
                    ))}
                </div>
              </div>
            </section>
          </FadeInWhenVisible>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default SEOLandingPage;
