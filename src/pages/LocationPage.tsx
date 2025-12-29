import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { Link, useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Spotlight } from "@/components/ui/spotlight-aceternity";
import { ArrowRight, Video, Globe, Share2, Megaphone, Sparkles, Palette, Phone, Mail, MapPin, Star, Users, Clock, Shield, CheckCircle2, TrendingUp } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

// Location data with rich content - 70+ locations for comprehensive SEO coverage
const locationData: Record<string, {
  name: string;
  state: string;
  region: string;
  description: string;
  tagline: string;
  highlights: string[];
}> = {
  // ============================================
  // TRIPURA - PRIMARY MARKET (HIGHEST PRIORITY)
  // ============================================
  "agartala": {
    name: "Agartala",
    state: "Tripura",
    region: "Northeast India",
    description: "As the capital city of Tripura, Agartala is home to WhyCreatives headquarters. We understand the local market, culture, and business needs of Agartala businesses. From Ujjayanta Palace to the bustling markets, we've helped hundreds of local businesses grow their digital presence.",
    tagline: "Your Local Creative Partner in Agartala",
    highlights: ["Same-day meetings available", "Local market expertise", "Tripura's #1 rated agency", "500+ local projects completed"]
  },
  "tripura": {
    name: "Tripura",
    state: "Northeast India", 
    region: "Northeast India",
    description: "WhyCreatives is Tripura's leading creative agency, serving businesses across all 8 districts. From Agartala to Dharmanagar, we bring world-class creative services to every corner of Tripura. We understand the unique culture, festivals, and business landscape of our home state.",
    tagline: "Tripura's Most Trusted Creative Agency",
    highlights: ["Serving all 8 districts", "Local language support", "Government project experience", "Fastest turnaround in Tripura"]
  },
  "udaipur-tripura": {
    name: "Udaipur",
    state: "Tripura",
    region: "Northeast India",
    description: "Udaipur, the second largest city in Tripura, is known for its rich heritage and Tripura Sundari Temple. WhyCreatives serves Udaipur businesses with professional video editing, web design, and digital marketing at affordable prices.",
    tagline: "Creative Excellence for Udaipur, Tripura",
    highlights: ["Heritage tourism expertise", "Temple town marketing", "Local business focus", "Quick delivery"]
  },
  "dharmanagar": {
    name: "Dharmanagar",
    state: "Tripura",
    region: "Northeast India",
    description: "Dharmanagar, the gateway to North Tripura, deserves world-class creative services. WhyCreatives brings professional branding and digital marketing to businesses in Dharmanagar and surrounding areas.",
    tagline: "North Tripura's Creative Partner",
    highlights: ["North Tripura coverage", "Tea garden expertise", "Industrial sector focus", "Affordable rates"]
  },
  "kailashahar": {
    name: "Kailashahar",
    state: "Tripura",
    region: "Northeast India",
    description: "Kailashahar, the headquarters of Unakoti district, is home to the famous Unakoti rock carvings. WhyCreatives helps local businesses leverage this unique heritage for tourism and growth.",
    tagline: "Creative Services for Kailashahar",
    highlights: ["Tourism marketing", "Heritage promotion", "Local expertise", "Budget-friendly"]
  },
  "ambassa": {
    name: "Ambassa",
    state: "Tripura",
    region: "Northeast India",
    description: "Ambassa, the headquarters of Dhalai district, is a growing commercial hub in Tripura. WhyCreatives provides affordable creative solutions to help Ambassa businesses compete in the digital age.",
    tagline: "Digital Growth for Ambassa Businesses",
    highlights: ["Commercial hub focus", "Growing market", "Affordable pricing", "Quick turnaround"]
  },
  "belonia": {
    name: "Belonia",
    state: "Tripura",
    region: "Northeast India",
    description: "Belonia, located in South Tripura near the Bangladesh border, has a unique cross-border business ecosystem. WhyCreatives helps Belonia businesses with professional branding and digital presence.",
    tagline: "South Tripura's Creative Agency",
    highlights: ["Border town expertise", "Trade business focus", "Bilingual support", "Local presence"]
  },
  "sabroom": {
    name: "Sabroom",
    state: "Tripura",
    region: "Northeast India",
    description: "Sabroom, the southernmost town of Tripura with the Feni River bridge to Bangladesh, is emerging as a trade hub. WhyCreatives supports local businesses with modern creative solutions.",
    tagline: "Creative Partner for Sabroom",
    highlights: ["Trade hub marketing", "Emerging market", "Cross-border expertise", "Growth-focused"]
  },
  "khowai": {
    name: "Khowai",
    state: "Tripura",
    region: "Northeast India",
    description: "Khowai district, known for its natural beauty and rubber plantations, needs modern creative services. WhyCreatives brings professional video production and web design to Khowai businesses.",
    tagline: "Khowai's Digital Creative Partner",
    highlights: ["Agricultural sector", "Rubber industry", "Natural tourism", "Local expertise"]
  },
  "teliamura": {
    name: "Teliamura",
    state: "Tripura",
    region: "Northeast India",
    description: "Teliamura, a major town in Khowai district, is growing rapidly. WhyCreatives provides affordable creative services to help local businesses establish their digital presence.",
    tagline: "Creative Solutions for Teliamura",
    highlights: ["Growing town", "Local business focus", "Affordable rates", "Quick service"]
  },
  "bishalgarh": {
    name: "Bishalgarh",
    state: "Tripura",
    region: "Northeast India",
    description: "Bishalgarh, one of the largest towns in Sepahijala district, has a thriving local economy. WhyCreatives helps Bishalgarh businesses with professional branding and marketing.",
    tagline: "Bishalgarh's Creative Agency",
    highlights: ["Large town coverage", "Local economy focus", "Professional quality", "Competitive pricing"]
  },
  "sonamura": {
    name: "Sonamura",
    state: "Tripura",
    region: "Northeast India",
    description: "Sonamura, located near the Bangladesh border in Sepahijala district, is an important commercial center. WhyCreatives provides creative services tailored to the local business community.",
    tagline: "Creative Excellence for Sonamura",
    highlights: ["Border commerce", "Local market", "Trade expertise", "Affordable solutions"]
  },
  // ============================================
  // ASSAM - Major State
  // ============================================
  "guwahati": {
    name: "Guwahati",
    state: "Assam",
    region: "Northeast India",
    description: "Guwahati, the gateway to Northeast India and the largest city in the region, deserves world-class creative services. WhyCreatives serves Guwahati businesses with premium video editing, web design, and digital marketing at prices 90% lower than local agencies.",
    tagline: "Premium Creative Services for Guwahati",
    highlights: ["Northeast's largest city coverage", "Quick project delivery", "Competitive metro pricing", "Assamese language support"]
  },
  "assam": {
    name: "Assam",
    state: "Northeast India",
    region: "Northeast India", 
    description: "From Guwahati to Silchar, WhyCreatives serves businesses across Assam with affordable creative solutions. Tea gardens, startups, oil companies, or enterprises - we've got you covered with professional video editing, web design, and branding.",
    tagline: "Creative Excellence Across Assam",
    highlights: ["Pan-Assam coverage", "Tea industry expertise", "Startup-friendly pricing", "Bengali & Assamese support"]
  },
  "silchar": {
    name: "Silchar",
    state: "Assam",
    region: "Northeast India",
    description: "Silchar, the heart of Barak Valley and second largest city in Assam, is a growing business hub. WhyCreatives brings professional creative services to Silchar's thriving business community at affordable prices.",
    tagline: "Barak Valley's Creative Partner",
    highlights: ["Barak Valley coverage", "Bengali language support", "Healthcare sector expertise", "Quick turnaround"]
  },
  "dibrugarh": {
    name: "Dibrugarh",
    state: "Assam",
    region: "Northeast India",
    description: "Dibrugarh, the Tea City of India, is home to major tea estates and oil refineries. WhyCreatives provides professional branding and digital marketing to help Dibrugarh businesses grow.",
    tagline: "Creative Services for the Tea City",
    highlights: ["Tea industry expertise", "Oil & gas sector", "Industrial marketing", "Professional quality"]
  },
  "jorhat": {
    name: "Jorhat",
    state: "Assam",
    region: "Northeast India",
    description: "Jorhat, the cultural capital of Assam and gateway to Majuli, needs modern creative solutions. WhyCreatives serves Jorhat businesses with professional video production and web design.",
    tagline: "Cultural Capital's Creative Agency",
    highlights: ["Cultural tourism", "Tea garden marketing", "Education sector", "Affordable rates"]
  },
  "tezpur": {
    name: "Tezpur",
    state: "Assam",
    region: "Northeast India",
    description: "Tezpur, the cultural capital of Assam known for its scenic beauty and historical significance, deserves quality creative services. WhyCreatives helps Tezpur businesses with professional branding.",
    tagline: "Creative Excellence for Tezpur",
    highlights: ["Tourism marketing", "Cultural heritage", "Educational institutions", "Budget-friendly"]
  },
  "nagaon": {
    name: "Nagaon",
    state: "Assam",
    region: "Northeast India",
    description: "Nagaon, located in central Assam, is an important commercial and agricultural hub. WhyCreatives provides affordable creative solutions to help Nagaon businesses establish their digital presence.",
    tagline: "Central Assam's Creative Partner",
    highlights: ["Agricultural sector", "Commercial hub", "Local expertise", "Quick delivery"]
  },
  // ============================================
  // MEGHALAYA
  // ============================================
  "shillong": {
    name: "Shillong",
    state: "Meghalaya",
    region: "Northeast India",
    description: "The Scotland of the East deserves creative services that match its beauty. WhyCreatives brings professional video production, web design, and digital marketing to Shillong's vibrant business community and thriving tourism industry.",
    tagline: "Creative Services for the Scotland of the East",
    highlights: ["Tourism industry expertise", "Music & culture focus", "Quick turnaround", "Affordable pricing"]
  },
  "meghalaya": {
    name: "Meghalaya",
    state: "Northeast India",
    region: "Northeast India",
    description: "Meghalaya, the abode of clouds, is known for its stunning landscapes and unique culture. WhyCreatives serves businesses across Meghalaya with professional creative services that capture the essence of this beautiful state.",
    tagline: "Creative Partner for the Abode of Clouds",
    highlights: ["Tourism expertise", "Khasi & Garo support", "Eco-tourism focus", "Cultural sensitivity"]
  },
  "tura": {
    name: "Tura",
    state: "Meghalaya",
    region: "Northeast India",
    description: "Tura, the largest town in Garo Hills and gateway to western Meghalaya, is a growing commercial center. WhyCreatives provides professional creative services to Tura businesses.",
    tagline: "Garo Hills' Creative Agency",
    highlights: ["Garo Hills coverage", "Local language support", "Tourism marketing", "Affordable solutions"]
  },
  "cherrapunji": {
    name: "Cherrapunji",
    state: "Meghalaya",
    region: "Northeast India",
    description: "Cherrapunji (Sohra), one of the wettest places on Earth, is a major tourist destination. WhyCreatives helps tourism businesses in Cherrapunji with professional video production and digital marketing.",
    tagline: "Tourism Marketing for Cherrapunji",
    highlights: ["Tourism expertise", "Living root bridges", "Eco-tourism", "Visual storytelling"]
  },
  // ============================================
  // MANIPUR
  // ============================================
  "imphal": {
    name: "Imphal",
    state: "Manipur",
    region: "Northeast India",
    description: "Imphal's growing business ecosystem needs modern creative solutions. WhyCreatives delivers professional branding, web design, and video production to Manipur businesses. From Ima Keithel to modern startups, we help Imphal businesses shine.",
    tagline: "Modern Creative Solutions for Imphal",
    highlights: ["Handloom & handicraft expertise", "Sports industry experience", "Cultural sensitivity", "Fast delivery"]
  },
  "manipur": {
    name: "Manipur",
    state: "Northeast India",
    region: "Northeast India",
    description: "Manipur, the Jewel of India, is known for its rich culture, classical dance, and sports excellence. WhyCreatives serves businesses across Manipur with creative solutions that honor this unique heritage.",
    tagline: "Creative Excellence for the Jewel of India",
    highlights: ["Cultural expertise", "Sports marketing", "Handloom promotion", "Pan-Manipur coverage"]
  },
  // ============================================
  // MIZORAM
  // ============================================
  "aizawl": {
    name: "Aizawl",
    state: "Mizoram",
    region: "Northeast India",
    description: "Aizawl, the capital of Mizoram perched on a ridge, is a unique city with a thriving business community. WhyCreatives brings professional creative services to Aizawl businesses at affordable prices.",
    tagline: "Creative Partner for Aizawl",
    highlights: ["Capital city coverage", "Tourism marketing", "Music industry", "Quick turnaround"]
  },
  "mizoram": {
    name: "Mizoram",
    state: "Northeast India",
    region: "Northeast India",
    description: "Mizoram, the land of the highlanders, is known for its scenic beauty and high literacy rate. WhyCreatives serves businesses across Mizoram with professional video editing, web design, and digital marketing.",
    tagline: "Creative Services for the Land of Highlanders",
    highlights: ["Pan-Mizoram coverage", "Tourism expertise", "Education sector", "Affordable rates"]
  },
  // ============================================
  // NAGALAND
  // ============================================
  "kohima": {
    name: "Kohima",
    state: "Nagaland",
    region: "Northeast India",
    description: "Kohima, the capital of Nagaland and site of the famous WWII battle, is a city rich in history and culture. WhyCreatives provides professional creative services to Kohima businesses.",
    tagline: "Creative Excellence for Kohima",
    highlights: ["Historical tourism", "Hornbill Festival", "Cultural marketing", "Professional quality"]
  },
  "nagaland": {
    name: "Nagaland",
    state: "Northeast India",
    region: "Northeast India",
    description: "Nagaland, the land of festivals, is famous for its vibrant tribal culture and the Hornbill Festival. WhyCreatives helps Nagaland businesses showcase their unique heritage through professional creative services.",
    tagline: "Creative Partner for the Land of Festivals",
    highlights: ["Festival marketing", "Tribal heritage", "Tourism expertise", "Cultural sensitivity"]
  },
  "dimapur": {
    name: "Dimapur",
    state: "Nagaland",
    region: "Northeast India",
    description: "Dimapur, the commercial capital of Nagaland and its only plains town, is the business hub of the state. WhyCreatives serves Dimapur businesses with professional branding and digital marketing.",
    tagline: "Commercial Capital's Creative Agency",
    highlights: ["Business hub coverage", "Commercial expertise", "Quick delivery", "Competitive pricing"]
  },
  // ============================================
  // ARUNACHAL PRADESH
  // ============================================
  "itanagar": {
    name: "Itanagar",
    state: "Arunachal Pradesh",
    region: "Northeast India",
    description: "Itanagar, the capital of Arunachal Pradesh, is the gateway to India's largest northeastern state. WhyCreatives provides professional creative services to help Itanagar businesses grow.",
    tagline: "Creative Services for Itanagar",
    highlights: ["Capital city coverage", "Tourism marketing", "Government projects", "Professional quality"]
  },
  "arunachal-pradesh": {
    name: "Arunachal Pradesh",
    state: "Northeast India",
    region: "Northeast India",
    description: "Arunachal Pradesh, the Land of the Rising Sun, is India's largest northeastern state with incredible biodiversity and tribal cultures. WhyCreatives serves businesses across this beautiful state.",
    tagline: "Creative Partner for the Land of Rising Sun",
    highlights: ["Tourism expertise", "Tribal heritage", "Adventure tourism", "Pan-state coverage"]
  },
  // ============================================
  // SIKKIM
  // ============================================
  "gangtok": {
    name: "Gangtok",
    state: "Sikkim",
    region: "Northeast India",
    description: "Gangtok, the capital of Sikkim with stunning views of Kanchenjunga, is a major tourist destination. WhyCreatives helps Gangtok businesses with professional video production and digital marketing.",
    tagline: "Creative Excellence for Gangtok",
    highlights: ["Tourism marketing", "Himalayan expertise", "Hotel & hospitality", "Visual storytelling"]
  },
  "sikkim": {
    name: "Sikkim",
    state: "Northeast India",
    region: "Northeast India",
    description: "Sikkim, India's first fully organic state with breathtaking Himalayan landscapes, attracts tourists from around the world. WhyCreatives serves Sikkim businesses with creative solutions that capture this magic.",
    tagline: "Creative Partner for Organic Sikkim",
    highlights: ["Eco-tourism focus", "Organic branding", "Adventure tourism", "Pan-Sikkim coverage"]
  },
  // ============================================
  // MAJOR INDIAN CITIES - TIER 1
  // ============================================
  "kolkata": {
    name: "Kolkata",
    state: "West Bengal",
    region: "East India",
    description: "The cultural capital of India meets affordable creativity. WhyCreatives offers Kolkata businesses premium creative services at 90% less than local agencies. From Park Street startups to Salt Lake IT companies, we deliver metro-quality work at smart prices.",
    tagline: "Premium Quality, Kolkata-Friendly Prices",
    highlights: ["90% cost savings vs local agencies", "Bengali language support", "24-48 hour delivery", "500+ happy clients"]
  },
  "delhi": {
    name: "Delhi",
    state: "NCR",
    region: "North India",
    description: "Delhi businesses deserve world-class creative services without the premium price tag. WhyCreatives delivers metro-quality work at small-town prices. From Connaught Place corporates to Nehru Place tech companies, we serve all of Delhi NCR.",
    tagline: "Metro Quality at Smart Prices",
    highlights: ["90% cheaper than Delhi agencies", "Same quality, better value", "Remote collaboration", "Quick turnaround"]
  },
  "new-delhi": {
    name: "New Delhi",
    state: "NCR",
    region: "North India",
    description: "India's capital deserves creative services that match its stature. WhyCreatives provides New Delhi businesses with premium video editing, web design, and branding at prices that make sense.",
    tagline: "Capital Quality, Smart Pricing",
    highlights: ["Government sector expertise", "Corporate experience", "Premium deliverables", "Competitive rates"]
  },
  "mumbai": {
    name: "Mumbai",
    state: "Maharashtra",
    region: "West India",
    description: "India's financial capital meets India's most affordable creative agency. Get Bollywood-quality video editing and world-class web design at a fraction of Mumbai prices. From Bandra startups to BKC corporates, we deliver excellence.",
    tagline: "Bollywood Quality, Smart Pricing",
    highlights: ["Film industry quality", "Startup-friendly rates", "24/7 availability", "Premium deliverables"]
  },
  "bangalore": {
    name: "Bangalore",
    state: "Karnataka",
    region: "South India",
    description: "Silicon Valley of India, meet your affordable creative partner. WhyCreatives serves Bangalore startups and enterprises with tech-savvy creative solutions. From Koramangala to Whitefield, we understand the startup ecosystem.",
    tagline: "Startup-Ready Creative Solutions",
    highlights: ["Tech startup expertise", "SaaS & product experience", "Agile delivery", "Competitive pricing"]
  },
  "bengaluru": {
    name: "Bengaluru",
    state: "Karnataka",
    region: "South India",
    description: "India's tech capital needs creative partners who understand technology. WhyCreatives serves Bengaluru's thriving tech ecosystem with professional video production, web design, and digital marketing.",
    tagline: "Tech-Savvy Creative Partner",
    highlights: ["IT industry expertise", "Product marketing", "Startup ecosystem", "Quick turnaround"]
  },
  "hyderabad": {
    name: "Hyderabad",
    state: "Telangana",
    region: "South India",
    description: "The City of Pearls deserves creative services that shine. WhyCreatives brings affordable excellence to Hyderabad's thriving tech and business community. From HITEC City to Banjara Hills, we serve all of Hyderabad.",
    tagline: "Creative Excellence for the City of Pearls",
    highlights: ["IT industry experience", "Pharma sector expertise", "Telugu support", "Fast delivery"]
  },
  "chennai": {
    name: "Chennai",
    state: "Tamil Nadu",
    region: "South India",
    description: "Gateway to South India, meet your creative partner. WhyCreatives delivers professional video editing, web design, and branding to Chennai businesses. From OMR tech parks to T. Nagar retail, we understand Chennai.",
    tagline: "Professional Creative Services for Chennai",
    highlights: ["Manufacturing expertise", "Tamil language support", "Auto industry experience", "Reliable delivery"]
  },
  "pune": {
    name: "Pune",
    state: "Maharashtra",
    region: "West India",
    description: "The Oxford of the East meets affordable creativity. WhyCreatives serves Pune's education, IT, and manufacturing sectors with premium creative solutions. From Hinjewadi IT parks to Koregaon Park startups.",
    tagline: "Smart Creative Solutions for Smart City",
    highlights: ["Education sector expertise", "IT company experience", "Student-friendly pricing", "Quick turnaround"]
  },
  // ============================================
  // TIER 2 CITIES - HIGH GROWTH MARKETS
  // ============================================
  "ahmedabad": {
    name: "Ahmedabad",
    state: "Gujarat",
    region: "West India",
    description: "Gujarat's commercial capital and a UNESCO World Heritage City deserves quality creative services. WhyCreatives helps Ahmedabad businesses with professional branding, web design, and video production.",
    tagline: "Creative Excellence for Ahmedabad",
    highlights: ["Textile industry expertise", "Startup ecosystem", "Gujarati support", "Competitive pricing"]
  },
  "jaipur": {
    name: "Jaipur",
    state: "Rajasthan",
    region: "North India",
    description: "The Pink City, known for its rich heritage and growing IT sector, needs modern creative solutions. WhyCreatives serves Jaipur businesses with professional video editing and digital marketing.",
    tagline: "Modern Creativity for the Pink City",
    highlights: ["Tourism marketing", "Handicraft promotion", "IT sector experience", "Heritage branding"]
  },
  "lucknow": {
    name: "Lucknow",
    state: "Uttar Pradesh",
    region: "North India",
    description: "The City of Nawabs combines rich heritage with modern business. WhyCreatives provides Lucknow businesses with professional creative services that honor tradition while embracing innovation.",
    tagline: "Creative Partner for the City of Nawabs",
    highlights: ["Heritage marketing", "IT sector growth", "Hindi support", "Affordable rates"]
  },
  "chandigarh": {
    name: "Chandigarh",
    state: "Punjab/Haryana",
    region: "North India",
    description: "India's best planned city deserves well-planned creative solutions. WhyCreatives serves Chandigarh's businesses with professional branding, web design, and digital marketing.",
    tagline: "Planned Creative Solutions for Chandigarh",
    highlights: ["Corporate expertise", "Startup-friendly", "Quick delivery", "Quality focus"]
  },
  "bhubaneswar": {
    name: "Bhubaneswar",
    state: "Odisha",
    region: "East India",
    description: "The Temple City of India is also a growing IT hub. WhyCreatives helps Bhubaneswar businesses with professional creative services that blend heritage with modernity.",
    tagline: "Creative Excellence for the Temple City",
    highlights: ["IT sector expertise", "Temple tourism", "Odia support", "Affordable pricing"]
  },
  "kochi": {
    name: "Kochi",
    state: "Kerala",
    region: "South India",
    description: "Queen of the Arabian Sea and Kerala's commercial capital needs creative services that match its cosmopolitan nature. WhyCreatives serves Kochi businesses with professional video production and web design.",
    tagline: "Creative Partner for Queen of Arabian Sea",
    highlights: ["Tourism expertise", "IT sector", "Malayalam support", "Quick turnaround"]
  },
  "indore": {
    name: "Indore",
    state: "Madhya Pradesh",
    region: "Central India",
    description: "India's cleanest city and a growing commercial hub deserves quality creative services. WhyCreatives helps Indore businesses with professional branding and digital marketing.",
    tagline: "Clean Creative Solutions for Indore",
    highlights: ["Commercial expertise", "Food industry", "Hindi support", "Competitive rates"]
  },
  "patna": {
    name: "Patna",
    state: "Bihar",
    region: "East India",
    description: "One of the oldest continuously inhabited cities in the world is now a growing business hub. WhyCreatives provides Patna businesses with affordable creative solutions.",
    tagline: "Modern Creativity for Ancient Patna",
    highlights: ["Education sector", "Growing market", "Hindi support", "Budget-friendly"]
  },
  "ranchi": {
    name: "Ranchi",
    state: "Jharkhand",
    region: "East India",
    description: "The capital of Jharkhand and a growing IT destination needs modern creative services. WhyCreatives serves Ranchi businesses with professional video editing and web design.",
    tagline: "Creative Services for Ranchi",
    highlights: ["IT sector growth", "Mining industry", "Hindi support", "Affordable rates"]
  },
  "raipur": {
    name: "Raipur",
    state: "Chhattisgarh",
    region: "Central India",
    description: "The capital of Chhattisgarh is a rapidly growing commercial center. WhyCreatives helps Raipur businesses with professional branding and digital marketing at affordable prices.",
    tagline: "Creative Partner for Raipur",
    highlights: ["Industrial sector", "Growing market", "Hindi support", "Quick delivery"]
  },
  "noida": {
    name: "Noida",
    state: "Uttar Pradesh",
    region: "NCR",
    description: "India's film city and IT hub needs creative partners who understand media. WhyCreatives serves Noida businesses with professional video production, web design, and digital marketing.",
    tagline: "Media-Savvy Creative Solutions",
    highlights: ["Film industry expertise", "IT sector", "Media production", "Quick turnaround"]
  },
  "gurgaon": {
    name: "Gurgaon",
    state: "Haryana",
    region: "NCR",
    description: "India's corporate hub and startup capital needs affordable creative solutions. WhyCreatives serves Gurgaon businesses with premium quality at prices that make sense for startups and corporates alike.",
    tagline: "Corporate Quality, Startup Pricing",
    highlights: ["Corporate expertise", "Startup ecosystem", "MNC experience", "Competitive rates"]
  },
  "gurugram": {
    name: "Gurugram",
    state: "Haryana",
    region: "NCR",
    description: "The Millennium City is home to Fortune 500 companies and unicorn startups. WhyCreatives provides Gurugram businesses with world-class creative services at affordable prices.",
    tagline: "World-Class Creative for Millennium City",
    highlights: ["Fortune 500 experience", "Unicorn startups", "Premium quality", "Smart pricing"]
  },
  "surat": {
    name: "Surat",
    state: "Gujarat",
    region: "West India",
    description: "The Diamond City and textile hub of India needs creative services that sparkle. WhyCreatives helps Surat businesses with professional branding, web design, and video production.",
    tagline: "Sparkling Creative Solutions for Surat",
    highlights: ["Diamond industry", "Textile expertise", "Gujarati support", "Quick delivery"]
  },
  "vadodara": {
    name: "Vadodara",
    state: "Gujarat",
    region: "West India",
    description: "The cultural capital of Gujarat combines heritage with industry. WhyCreatives serves Vadodara businesses with professional creative services that honor this unique blend.",
    tagline: "Cultural Creative Excellence",
    highlights: ["Industrial sector", "Cultural heritage", "Gujarati support", "Affordable rates"]
  },
  "nagpur": {
    name: "Nagpur",
    state: "Maharashtra",
    region: "Central India",
    description: "The Orange City and geographic center of India is a growing logistics and IT hub. WhyCreatives helps Nagpur businesses with professional branding and digital marketing.",
    tagline: "Central India's Creative Partner",
    highlights: ["Logistics sector", "IT growth", "Marathi support", "Competitive pricing"]
  },
  "visakhapatnam": {
    name: "Visakhapatnam",
    state: "Andhra Pradesh",
    region: "South India",
    description: "The City of Destiny and Andhra's largest city needs creative services that match its ambition. WhyCreatives serves Vizag businesses with professional video production and web design.",
    tagline: "Creative Destiny for Vizag",
    highlights: ["Port city expertise", "IT sector", "Telugu support", "Quick turnaround"]
  },
  "coimbatore": {
    name: "Coimbatore",
    state: "Tamil Nadu",
    region: "South India",
    description: "The Manchester of South India and a major industrial hub needs quality creative services. WhyCreatives helps Coimbatore businesses with professional branding and digital marketing.",
    tagline: "Industrial Creative Excellence",
    highlights: ["Manufacturing expertise", "Textile industry", "Tamil support", "Affordable rates"]
  },
  "thiruvananthapuram": {
    name: "Thiruvananthapuram",
    state: "Kerala",
    region: "South India",
    description: "Kerala's capital and a major IT hub needs creative services that match its progressive nature. WhyCreatives serves Trivandrum businesses with professional video editing and web design.",
    tagline: "Progressive Creative Solutions",
    highlights: ["IT sector expertise", "Government projects", "Malayalam support", "Quality focus"]
  },
  "mysore": {
    name: "Mysore",
    state: "Karnataka",
    region: "South India",
    description: "The City of Palaces and a growing IT destination combines heritage with technology. WhyCreatives helps Mysore businesses with professional creative services.",
    tagline: "Royal Creative Excellence",
    highlights: ["Tourism marketing", "IT sector", "Heritage branding", "Kannada support"]
  },
  "madurai": {
    name: "Madurai",
    state: "Tamil Nadu",
    region: "South India",
    description: "One of the oldest continuously inhabited cities and a major cultural center needs modern creative solutions. WhyCreatives serves Madurai businesses with professional branding.",
    tagline: "Ancient City, Modern Creativity",
    highlights: ["Temple tourism", "Cultural heritage", "Tamil support", "Affordable pricing"]
  },
};

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
    desc: "Complete brand identity, logo design & visual guidelines",
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
    name: "Social Media", 
    desc: "Content creation, management & growth strategies",
    price: "₹3,999/mo",
    oldPrice: "₹25,000/mo",
    savings: "84%",
    duration: "Monthly"
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
  const data = location ? locationData[location] : null;

  if (!data) {
    return <Navigate to="/" replace />;
  }

  const pageTitle = `Best Creative Agency in ${data.name} | Video Production, Web Design, Digital Marketing - WhyCreatives`;
  const pageDescription = `WhyCreatives is the #1 creative agency in ${data.name}, ${data.state}. Professional video production from ₹6,999, web development from ₹4,999, digital marketing & branding. Up to 90% more affordable than local agencies. ${data.description}`;
  const pageKeywords = `creative agency ${data.name}, video production ${data.name}, video editing ${data.name}, web design ${data.name}, web development ${data.name}, digital marketing ${data.name}, branding ${data.name}, motion graphics ${data.name}, social media marketing ${data.name}, ${data.state} creative agency, affordable creative services ${data.name}, best agency ${data.name}, WhyCreatives ${data.name}, video editing services ${data.name}, website design ${data.name}`;

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
              "reviewCount": "50"
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
