import { jsx, jsxs } from "react/jsx-runtime";
import { N as Navigation, S as Spotlight, B as Button, R as RadialOrbitalTimeline, F as FadeInWhenVisible, a as Footer } from "../main.mjs";
import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { MapPin, ArrowRight, Video, Globe, Share2, Palette, TrendingUp, Star, Users, Clock, Shield, CheckCircle2, Megaphone, Sparkles, Phone, Mail } from "lucide-react";
import "vite-react-ssg";
import "react";
import "@radix-ui/react-toast";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "next-themes";
import "sonner";
import "@radix-ui/react-tooltip";
import "@tanstack/react-query";
import "@radix-ui/react-slot";
import "framer-motion";
import "@supabase/supabase-js";
import "react-markdown";
import "remark-gfm";
const validLocationSlugs = [
  "guwahati",
  "northeast-india",
  "tripura",
  "agartala",
  "udaipur-tripura",
  "dharmanagar",
  "kailashahar",
  "ambassa",
  "belonia",
  "sabroom",
  "khowai",
  "teliamura",
  "bishalgarh",
  "sonamura",
  "kumarghat",
  "kamalpur",
  "assam",
  "silchar",
  "dibrugarh",
  "jorhat",
  "tezpur",
  "nagaon",
  "tinsukia",
  "bongaigaon",
  "halflong",
  "meghalaya",
  "shillong",
  "tura",
  "cherrapunji",
  "manipur",
  "imphal",
  "mizoram",
  "aizawl",
  "nagaland",
  "kohima",
  "dimapur",
  "arunachal-pradesh",
  "itanagar",
  "sikkim",
  "gangtok",
  "india",
  "andhra-pradesh",
  "bihar",
  "chhattisgarh",
  "goa",
  "gujarat",
  "haryana",
  "himachal-pradesh",
  "jharkhand",
  "karnataka",
  "kerala",
  "madhya-pradesh",
  "maharashtra",
  "odisha",
  "punjab",
  "rajasthan",
  "tamil-nadu",
  "telangana",
  "uttar-pradesh",
  "uttarakhand",
  "west-bengal",
  "andaman-and-nicobar",
  "chandigarh-ut",
  "dadra-and-nagar-haveli-and-daman-and-diu",
  "lakshadweep",
  "delhi-ncr",
  "puducherry",
  "ladakh",
  "jammu-and-kashmir",
  "mumbai",
  "delhi",
  "new-delhi",
  "bangalore",
  "bengaluru",
  "hyderabad",
  "ahmedabad",
  "chennai",
  "kolkata",
  "surat",
  "pune",
  "jaipur",
  "lucknow",
  "kanpur",
  "nagpur",
  "indore",
  "thane",
  "bhopal",
  "visakhapatnam",
  "pimpri-chinchwad",
  "patna",
  "vadodara",
  "ghaziabad",
  "ludhiana",
  "agra",
  "nashik",
  "faridabad",
  "meerut",
  "rajkot",
  "kalyan-dombivli",
  "vasai-virar",
  "varanasi",
  "srinagar",
  "aurangabad",
  "dhanbad",
  "amritsar",
  "navi-mumbai",
  "allahabad",
  "howrah",
  "ranchi",
  "gwalior",
  "jabalpur",
  "coimbatore",
  "vijayawada",
  "jodhpur",
  "madurai",
  "raipur",
  "kota",
  "chandigarh",
  "hubli-dharwad",
  "bareilly",
  "moradabad",
  "mysore",
  "gurgaon",
  "gurugram",
  "aligarh",
  "jalandhar",
  "tiruchirappalli",
  "bhubaneswar",
  "salem",
  "mira-bhayandar",
  "thiruvananthapuram",
  "bhiwandi",
  "saharanpur",
  "gorakhpur",
  "guntur",
  "bikaner",
  "amravati",
  "noida",
  "jamshedpur",
  "bhilai",
  "cuttack",
  "firozabad",
  "kochi",
  "nellore",
  "bhavnagar",
  "dehradun",
  "durgapur",
  "asansol",
  "rourkela",
  "nanded",
  "kolhapur",
  "ajmer",
  "akluj",
  "gulbarga",
  "jamnagar",
  "ujjain",
  "loni",
  "siliguri",
  "jhansi",
  "ulhasnagar",
  "jammu",
  "sangli-miraj-kupwad",
  "mangalore",
  "erode",
  "belgaum",
  "kurnool",
  "rajahmundry",
  "tirunelveli",
  "malegaon",
  "gaya",
  "tiruppur",
  "davanagere",
  "kozhikode",
  "akola",
  "bokaro",
  "south-dumdum",
  "bellary",
  "patiala",
  "gopalpur",
  "bhagalpur",
  "muzaffarnagar",
  "bhatpara",
  "panihati",
  "latur",
  "dhule",
  "tirupati",
  "rohtak",
  "korba",
  "bhilwara",
  "berhampur",
  "muzaffarpur",
  "ahmednagar",
  "mathura",
  "kollam",
  "avadi",
  "kadapa",
  "kamarhati",
  "sambalpur",
  "bilaspur",
  "shahjahanpur",
  "satara",
  "bijapur",
  "kakinada",
  "darjeeling",
  "puri",
  "services/affordable-video-editing",
  "services/best-web-design-agency",
  "services/cheap-digital-marketing",
  "services/top-creative-agency-india",
  "services/startup-branding-packages",
  "why-creatives",
  "whycreative",
  "why-creative",
  "ycreatives",
  "y-creatives",
  "wai-creatives",
  "we-creatives",
  "the-why-creatives",
  "why-creative-agency"
];
const misspellingRedirects = {
  // Agartala misspellings
  "agartla": "agartala",
  "agartalla": "agartala",
  "agaratala": "agartala",
  "agratala": "agartala",
  "agartal": "agartala",
  "agartaal": "agartala",
  "agartela": "agartala",
  // Tripura misspellings
  "tripuara": "tripura",
  "tripuraa": "tripura",
  "tripra": "tripura",
  "tripur": "tripura",
  "tripoor": "tripura",
  // Guwahati misspellings
  "guwahti": "guwahati",
  "guwhati": "guwahati",
  "guwahatti": "guwahati",
  "gauhati": "guwahati",
  "guwahathi": "guwahati",
  "guwahaty": "guwahati",
  "guwahat": "guwahati",
  // Shillong misspellings
  "shilong": "shillong",
  "shilling": "shillong",
  "shilongg": "shillong",
  // Kolkata misspellings
  "kolkatta": "kolkata",
  "kolkta": "kolkata",
  "kolkatha": "kolkata",
  "calcutta": "kolkata",
  "kolkota": "kolkata",
  // Delhi misspellings
  "dilli": "delhi",
  "dehli": "delhi",
  "delhii": "delhi",
  "delih": "delhi",
  "deli": "delhi",
  // Mumbai misspellings
  "mumbaii": "mumbai",
  "mumabi": "mumbai",
  "mubai": "mumbai",
  "bombay": "mumbai",
  "mumbay": "mumbai",
  // Bangalore misspellings
  "banglore": "bangalore",
  "bangalor": "bangalore",
  "banglaore": "bangalore",
  "bangluru": "bengaluru",
  "bengalure": "bengaluru",
  "bangaluru": "bengaluru",
  // Hyderabad misspellings
  "hydrabad": "hyderabad",
  "hyderabd": "hyderabad",
  "hiderabad": "hyderabad",
  "hyderabadh": "hyderabad",
  "hyderabaad": "hyderabad",
  // Chennai misspellings
  "chenai": "chennai",
  "chennaii": "chennai",
  "chennnai": "chennai",
  "madras": "chennai",
  "chenna": "chennai",
  // Pune misspellings
  "puna": "pune",
  "punne": "pune",
  "poona": "pune",
  "pone": "pune",
  // Ahmedabad misspellings
  "ahemdabad": "ahmedabad",
  "ahmedabd": "ahmedabad",
  "ahmadabad": "ahmedabad",
  "ahmdabad": "ahmedabad",
  // Jaipur misspellings
  "jaipr": "jaipur",
  "jaipure": "jaipur",
  "jaypur": "jaipur",
  "jaiur": "jaipur",
  // Lucknow misspellings
  "lucknw": "lucknow",
  "luckno": "lucknow",
  "luknow": "lucknow",
  "lakhnow": "lucknow",
  // Imphal misspellings
  "impal": "imphal",
  "impahl": "imphal",
  "imfal": "imphal",
  "imphl": "imphal",
  // Aizawl misspellings
  "aizwal": "aizawl",
  "aizawal": "aizawl",
  "aizawll": "aizawl",
  "aizal": "aizawl",
  // Kohima misspellings
  "kohma": "kohima",
  "kohimaa": "kohima",
  "koheema": "kohima",
  "kohim": "kohima",
  // Itanagar misspellings
  "itangar": "itanagar",
  "itanagarr": "itanagar",
  "itanagr": "itanagar",
  "itanagaar": "itanagar",
  // Gangtok misspellings
  "gangtk": "gangtok",
  "gangtokk": "gangtok",
  "gangtak": "gangtok",
  "gangtook": "gangtok",
  // Silchar misspellings
  "silchr": "silchar",
  "silcharr": "silchar",
  "silcar": "silchar",
  "silchaar": "silchar",
  // Dibrugarh misspellings
  "dibrugrah": "dibrugarh",
  "dibrughar": "dibrugarh",
  "dibrugar": "dibrugarh",
  "dibrugaarh": "dibrugarh",
  // Service-related misspellings
  "vedio": "video",
  "vidio": "video",
  "vedeo": "video",
  "vdo": "video",
  "editting": "editing",
  "editng": "editing",
  "edditing": "editing",
  "webdesign": "web-design",
  "websit": "website",
  "websight": "website",
  "webiste": "website",
  "marketting": "marketing",
  "marketng": "marketing",
  "digtal": "digital",
  "digitl": "digital",
  "braning": "branding",
  "brandng": "branding",
  "brandig": "branding",
  "agancy": "agency",
  "ageny": "agency",
  "agensy": "agency",
  "creativ": "creative",
  "creatve": "creative",
  "creativee": "creative"
};
const locationSEOData = {
  // ============================================
  // TRIPURA - PRIMARY MARKET
  // ============================================
  "agartala": {
    slug: "agartala",
    name: "Agartala",
    state: "Tripura",
    region: "Northeast India",
    description: "Agartala, the capital city of Tripura, is a key market for WhyCreatives. We understand the local market, culture, and business needs of Agartala businesses. From Ujjayanta Palace to the bustling markets, we've helped hundreds of local businesses grow their digital presence.",
    tagline: "Your Creative Partner in Agartala",
    highlights: ["Local market expertise", "Tripura's #1 rated agency", "Quick turnaround", "500+ local projects completed"],
    population: "5 lakh+",
    keywords: ["video editing agartala", "web design agartala", "digital marketing agartala", "creative agency agartala", "best agency in agartala", "agartala video editor", "website design agartala"],
    misspellings: ["agartla", "agartalla", "agaratala", "agratala"],
    nearbyAreas: ["Jirania", "Mohanpur", "Bishalgarh", "Khayerpur", "Badharghat"],
    priority: 1
  },
  "tripura": {
    slug: "tripura",
    name: "Tripura",
    state: "Northeast India",
    region: "Northeast India",
    description: "WhyCreatives is Tripura's leading creative agency, serving businesses across all 8 districts. From Agartala to Dharmanagar, we bring world-class creative services to every corner of Tripura.",
    tagline: "Tripura's Most Trusted Creative Agency",
    highlights: ["Serving all 8 districts", "Local language support", "Government project experience", "Fastest turnaround in Tripura"],
    population: "40 lakh+",
    keywords: ["video editing tripura", "web design tripura", "digital marketing tripura", "creative agency tripura", "best agency in tripura"],
    misspellings: ["tripuara", "tripuraa", "tripra", "tripur"],
    nearbyAreas: ["Agartala", "Udaipur", "Dharmanagar", "Kailashahar", "Ambassa"],
    priority: 1
  },
  "udaipur-tripura": {
    slug: "udaipur-tripura",
    name: "Udaipur",
    state: "Tripura",
    region: "Northeast India",
    description: "Udaipur, the second largest city in Tripura, is known for its rich heritage and Tripura Sundari Temple. WhyCreatives serves Udaipur businesses with professional video editing, web design, and digital marketing.",
    tagline: "Creative Excellence for Udaipur, Tripura",
    highlights: ["Heritage tourism expertise", "Temple town marketing", "Local business focus", "Quick delivery"],
    keywords: ["video editing udaipur tripura", "web design udaipur", "creative agency udaipur tripura"],
    misspellings: ["udaypur tripura", "udaipr tripura"],
    nearbyAreas: ["Agartala", "Sabroom", "Belonia", "Amarpur"],
    priority: 0.9
  },
  "dharmanagar": {
    slug: "dharmanagar",
    name: "Dharmanagar",
    state: "Tripura",
    region: "Northeast India",
    description: "Dharmanagar, the gateway to North Tripura, deserves world-class creative services. WhyCreatives brings professional branding and digital marketing to businesses in Dharmanagar.",
    tagline: "North Tripura's Creative Partner",
    highlights: ["North Tripura coverage", "Tea garden expertise", "Industrial sector focus", "Affordable rates"],
    keywords: ["video editing dharmanagar", "web design dharmanagar", "creative agency dharmanagar"],
    misspellings: ["dharmnagar", "dharmanagr", "dharmanagarr"],
    nearbyAreas: ["Kailashahar", "Kumarghat", "Panisagar"],
    priority: 0.9
  },
  "kailashahar": {
    slug: "kailashahar",
    name: "Kailashahar",
    state: "Tripura",
    region: "Northeast India",
    description: "Kailashahar, the headquarters of Unakoti district, is home to the famous Unakoti rock carvings. WhyCreatives helps local businesses leverage this unique heritage.",
    tagline: "Creative Services for Kailashahar",
    highlights: ["Tourism marketing", "Heritage promotion", "Local expertise", "Budget-friendly"],
    keywords: ["video editing kailashahar", "web design kailashahar", "creative agency kailashahar"],
    misspellings: ["kailasahar", "kailashahr", "kailashar"],
    nearbyAreas: ["Dharmanagar", "Kumarghat", "Unakoti"],
    priority: 0.85
  },
  "ambassa": {
    slug: "ambassa",
    name: "Ambassa",
    state: "Tripura",
    region: "Northeast India",
    description: "Ambassa, the headquarters of Dhalai district, is a growing commercial hub in Tripura. WhyCreatives provides affordable creative solutions to help Ambassa businesses compete.",
    tagline: "Digital Growth for Ambassa Businesses",
    highlights: ["Commercial hub focus", "Growing market", "Affordable pricing", "Quick turnaround"],
    keywords: ["video editing ambassa", "web design ambassa", "creative agency ambassa"],
    misspellings: ["ambasa", "ambassa tripura"],
    nearbyAreas: ["Kamalpur", "Gandacherra", "Longtharai Valley"],
    priority: 0.85
  },
  "belonia": {
    slug: "belonia",
    name: "Belonia",
    state: "Tripura",
    region: "Northeast India",
    description: "Belonia, located in South Tripura near the Bangladesh border, has a unique cross-border business ecosystem. WhyCreatives helps Belonia businesses with professional branding.",
    tagline: "South Tripura's Creative Agency",
    highlights: ["Border town expertise", "Trade business focus", "Bilingual support", "Local presence"],
    keywords: ["video editing belonia", "web design belonia", "creative agency belonia"],
    misspellings: ["beloniya", "belonea"],
    nearbyAreas: ["Sabroom", "Udaipur", "Santirbazar"],
    priority: 0.85
  },
  "sabroom": {
    slug: "sabroom",
    name: "Sabroom",
    state: "Tripura",
    region: "Northeast India",
    description: "Sabroom, the southernmost town of Tripura with the Feni River bridge to Bangladesh, is emerging as a trade hub. WhyCreatives supports local businesses with modern creative solutions.",
    tagline: "Creative Partner for Sabroom",
    highlights: ["Trade hub marketing", "Emerging market", "Cross-border expertise", "Growth-focused"],
    keywords: ["video editing sabroom", "web design sabroom", "creative agency sabroom"],
    misspellings: ["sabrum", "sabroomm"],
    nearbyAreas: ["Belonia", "Udaipur", "South Tripura"],
    priority: 0.85
  },
  "khowai": {
    slug: "khowai",
    name: "Khowai",
    state: "Tripura",
    region: "Northeast India",
    description: "Khowai district, known for its natural beauty and rubber plantations, needs modern creative services. WhyCreatives brings professional video production and web design to Khowai.",
    tagline: "Khowai's Digital Creative Partner",
    highlights: ["Agricultural sector", "Rubber industry", "Natural tourism", "Local expertise"],
    keywords: ["video editing khowai", "web design khowai", "creative agency khowai"],
    misspellings: ["khowaii", "khowae"],
    nearbyAreas: ["Teliamura", "Agartala", "Kalyanpur"],
    priority: 0.85
  },
  "teliamura": {
    slug: "teliamura",
    name: "Teliamura",
    state: "Tripura",
    region: "Northeast India",
    description: "Teliamura, a major town in Khowai district, is growing rapidly. WhyCreatives provides affordable creative services to help local businesses establish their digital presence.",
    tagline: "Creative Solutions for Teliamura",
    highlights: ["Growing town", "Local business focus", "Affordable rates", "Quick service"],
    keywords: ["video editing teliamura", "web design teliamura", "creative agency teliamura"],
    misspellings: ["teliamuraa", "teliamra"],
    nearbyAreas: ["Khowai", "Agartala", "Bishalgarh"],
    priority: 0.8
  },
  "bishalgarh": {
    slug: "bishalgarh",
    name: "Bishalgarh",
    state: "Tripura",
    region: "Northeast India",
    description: "Bishalgarh, one of the largest towns in Sepahijala district, has a thriving local economy. WhyCreatives helps Bishalgarh businesses with professional branding and marketing.",
    tagline: "Bishalgarh's Creative Agency",
    highlights: ["Large town coverage", "Local economy focus", "Professional quality", "Competitive pricing"],
    keywords: ["video editing bishalgarh", "web design bishalgarh", "creative agency bishalgarh"],
    misspellings: ["bishalgar", "bishalgrah"],
    nearbyAreas: ["Agartala", "Sonamura", "Melaghar"],
    priority: 0.8
  },
  "sonamura": {
    slug: "sonamura",
    name: "Sonamura",
    state: "Tripura",
    region: "Northeast India",
    description: "Sonamura, located near the Bangladesh border in Sepahijala district, is an important commercial center. WhyCreatives provides creative services tailored to the local business community.",
    tagline: "Creative Excellence for Sonamura",
    highlights: ["Border commerce", "Local market", "Trade expertise", "Affordable solutions"],
    keywords: ["video editing sonamura", "web design sonamura", "creative agency sonamura"],
    misspellings: ["sonamuraa", "sonamra"],
    nearbyAreas: ["Bishalgarh", "Agartala", "Melaghar"],
    priority: 0.8
  },
  "kumarghat": {
    slug: "kumarghat",
    name: "Kumarghat",
    state: "Tripura",
    region: "Northeast India",
    description: "Kumarghat, a subdivision in Unakoti district, is known for its scenic beauty. WhyCreatives serves Kumarghat businesses with professional creative services.",
    tagline: "Creative Partner for Kumarghat",
    highlights: ["Scenic location", "Tourism potential", "Local expertise", "Affordable rates"],
    keywords: ["video editing kumarghat", "web design kumarghat", "creative agency kumarghat"],
    misspellings: ["kumarghaat", "kumargat"],
    nearbyAreas: ["Kailashahar", "Dharmanagar", "Unakoti"],
    priority: 0.8
  },
  "kamalpur": {
    slug: "kamalpur",
    name: "Kamalpur",
    state: "Tripura",
    region: "Northeast India",
    description: "Kamalpur, a town in Dhalai district, is a growing commercial center. WhyCreatives provides affordable creative solutions for Kamalpur businesses.",
    tagline: "Creative Services for Kamalpur",
    highlights: ["Growing market", "Commercial focus", "Affordable pricing", "Quick delivery"],
    keywords: ["video editing kamalpur", "web design kamalpur", "creative agency kamalpur"],
    misspellings: ["kamalpurr", "kamalpr"],
    nearbyAreas: ["Ambassa", "Gandacherra", "Dhalai"],
    priority: 0.8
  },
  // ============================================
  // ASSAM - PRIMARY MARKET (HEADQUARTERS)
  // ============================================
  "guwahati": {
    slug: "guwahati",
    name: "Guwahati",
    state: "Assam",
    region: "Northeast India",
    description: "Guwahati, the gateway to Northeast India and the largest city in the region, is home to WhyCreatives headquarters. We understand the local market, culture, and business needs of Guwahati businesses. From Kamakhya Temple to the bustling markets, we've helped hundreds of local businesses grow their digital presence.",
    tagline: "Your Local Creative Partner in Guwahati",
    highlights: ["Same-day meetings available", "Local market expertise", "Northeast's #1 rated agency", "500+ local projects completed"],
    population: "10 lakh+",
    keywords: ["video editing guwahati", "web design guwahati", "digital marketing guwahati", "creative agency guwahati", "best agency in guwahati"],
    misspellings: ["guwahti", "guwhati", "guwahatti", "gauhati", "guwahathi"],
    nearbyAreas: ["Dispur", "Kamrup", "Nalbari", "Barpeta", "Goalpara"],
    priority: 1
  },
  "assam": {
    slug: "assam",
    name: "Assam",
    state: "Northeast India",
    region: "Northeast India",
    description: "WhyCreatives is Assam's leading creative agency, serving businesses across all districts. From Guwahati to Silchar, we bring world-class creative services to every corner of Assam. Tea gardens, startups, oil companies, or enterprises - we've got you covered.",
    tagline: "Assam's Most Trusted Creative Agency",
    highlights: ["Pan-Assam coverage", "Tea industry expertise", "Startup-friendly pricing", "Bengali & Assamese support"],
    population: "3.5 crore+",
    keywords: ["video editing assam", "web design assam", "digital marketing assam", "creative agency assam"],
    misspellings: ["asam", "assamm", "assaam"],
    nearbyAreas: ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Tezpur"],
    priority: 1
  },
  "silchar": {
    slug: "silchar",
    name: "Silchar",
    state: "Assam",
    region: "Northeast India",
    description: "Silchar, the heart of Barak Valley and second largest city in Assam, is a growing business hub. WhyCreatives brings professional creative services to Silchar's thriving business community.",
    tagline: "Barak Valley's Creative Partner",
    highlights: ["Barak Valley coverage", "Bengali language support", "Healthcare sector expertise", "Quick turnaround"],
    keywords: ["video editing silchar", "web design silchar", "digital marketing silchar", "creative agency silchar"],
    misspellings: ["silchr", "silcharr", "silcar"],
    nearbyAreas: ["Karimganj", "Hailakandi", "Cachar"],
    priority: 0.85
  },
  "dibrugarh": {
    slug: "dibrugarh",
    name: "Dibrugarh",
    state: "Assam",
    region: "Northeast India",
    description: "Dibrugarh, the Tea City of India, is home to major tea estates and oil refineries. WhyCreatives provides professional branding and digital marketing to help Dibrugarh businesses grow.",
    tagline: "Creative Services for the Tea City",
    highlights: ["Tea industry expertise", "Oil & gas sector", "Industrial marketing", "Professional quality"],
    keywords: ["video editing dibrugarh", "web design dibrugarh", "digital marketing dibrugarh", "creative agency dibrugarh"],
    misspellings: ["dibrugrah", "dibrughar", "dibrugar"],
    nearbyAreas: ["Tinsukia", "Jorhat", "Sivasagar"],
    priority: 0.85
  },
  "jorhat": {
    slug: "jorhat",
    name: "Jorhat",
    state: "Assam",
    region: "Northeast India",
    description: "Jorhat, the cultural capital of Assam and gateway to Majuli, needs modern creative solutions. WhyCreatives serves Jorhat businesses with professional video production and web design.",
    tagline: "Cultural Capital's Creative Agency",
    highlights: ["Cultural tourism", "Tea garden marketing", "Education sector", "Affordable rates"],
    keywords: ["video editing jorhat", "web design jorhat", "digital marketing jorhat", "creative agency jorhat"],
    misspellings: ["jorht", "jorhaat", "jorhat assam"],
    nearbyAreas: ["Majuli", "Sivasagar", "Golaghat"],
    priority: 0.8
  },
  "tezpur": {
    slug: "tezpur",
    name: "Tezpur",
    state: "Assam",
    region: "Northeast India",
    description: "Tezpur, known for its scenic beauty and historical significance, deserves quality creative services. WhyCreatives helps Tezpur businesses with professional branding.",
    tagline: "Creative Excellence for Tezpur",
    highlights: ["Tourism marketing", "Cultural heritage", "Educational institutions", "Budget-friendly"],
    keywords: ["video editing tezpur", "web design tezpur", "digital marketing tezpur", "creative agency tezpur"],
    misspellings: ["tezpr", "tezpurr", "tezpoor"],
    nearbyAreas: ["Guwahati", "Nagaon", "Sonitpur"],
    priority: 0.8
  },
  "nagaon": {
    slug: "nagaon",
    name: "Nagaon",
    state: "Assam",
    region: "Northeast India",
    description: "Nagaon, located in central Assam, is an important commercial and agricultural hub. WhyCreatives provides affordable creative solutions to help Nagaon businesses establish their digital presence.",
    tagline: "Central Assam's Creative Partner",
    highlights: ["Agricultural sector", "Commercial hub", "Local expertise", "Quick delivery"],
    keywords: ["video editing nagaon", "web design nagaon", "digital marketing nagaon", "creative agency nagaon"],
    misspellings: ["nagoan", "nagaonn", "nowgong"],
    nearbyAreas: ["Guwahati", "Tezpur", "Morigaon"],
    priority: 0.8
  },
  "tinsukia": {
    slug: "tinsukia",
    name: "Tinsukia",
    state: "Assam",
    region: "Northeast India",
    description: "Tinsukia, the commercial hub of Upper Assam, is known for its tea and oil industries. WhyCreatives serves Tinsukia businesses with professional creative services.",
    tagline: "Upper Assam's Creative Partner",
    highlights: ["Tea industry", "Oil sector", "Commercial hub", "Professional quality"],
    keywords: ["video editing tinsukia", "web design tinsukia", "digital marketing tinsukia", "creative agency tinsukia"],
    misspellings: ["tinsukiya", "tinsukiaa"],
    nearbyAreas: ["Dibrugarh", "Digboi", "Margherita"],
    priority: 0.8
  },
  // ============================================
  // MEGHALAYA
  // ============================================
  "shillong": {
    slug: "shillong",
    name: "Shillong",
    state: "Meghalaya",
    region: "Northeast India",
    description: "The Scotland of the East deserves creative services that match its beauty. WhyCreatives brings professional video production, web design, and digital marketing to Shillong's vibrant business community.",
    tagline: "Creative Services for the Scotland of the East",
    highlights: ["Tourism industry expertise", "Music & culture focus", "Quick turnaround", "Affordable pricing"],
    population: "3.5 lakh+",
    keywords: ["video editing shillong", "web design shillong", "digital marketing shillong", "creative agency shillong", "best agency in shillong"],
    misspellings: ["shilong", "shilling", "shilongg"],
    nearbyAreas: ["Cherrapunji", "Nongpoh", "Jowai", "Tura"],
    priority: 0.9
  },
  "meghalaya": {
    slug: "meghalaya",
    name: "Meghalaya",
    state: "Northeast India",
    region: "Northeast India",
    description: "Meghalaya, the abode of clouds, is known for its stunning landscapes and unique culture. WhyCreatives serves businesses across Meghalaya with professional creative services.",
    tagline: "Creative Partner for the Abode of Clouds",
    highlights: ["Tourism expertise", "Khasi & Garo support", "Eco-tourism focus", "Cultural sensitivity"],
    keywords: ["video editing meghalaya", "web design meghalaya", "digital marketing meghalaya", "creative agency meghalaya"],
    misspellings: ["meghlaya", "meghalya", "meghalayaa"],
    nearbyAreas: ["Shillong", "Tura", "Cherrapunji", "Jowai"],
    priority: 0.85
  },
  "tura": {
    slug: "tura",
    name: "Tura",
    state: "Meghalaya",
    region: "Northeast India",
    description: "Tura, the largest town in Garo Hills and gateway to western Meghalaya, is a growing commercial center. WhyCreatives provides professional creative services to Tura businesses.",
    tagline: "Garo Hills' Creative Agency",
    highlights: ["Garo Hills coverage", "Local language support", "Tourism marketing", "Affordable solutions"],
    keywords: ["video editing tura", "web design tura", "digital marketing tura", "creative agency tura"],
    misspellings: ["turaa", "tura meghalaya"],
    nearbyAreas: ["Shillong", "Williamnagar", "Baghmara"],
    priority: 0.8
  },
  "cherrapunji": {
    slug: "cherrapunji",
    name: "Cherrapunji",
    state: "Meghalaya",
    region: "Northeast India",
    description: "Cherrapunji (Sohra), one of the wettest places on Earth, is a major tourist destination. WhyCreatives helps tourism businesses in Cherrapunji with professional video production.",
    tagline: "Tourism Marketing for Cherrapunji",
    highlights: ["Tourism expertise", "Living root bridges", "Eco-tourism", "Visual storytelling"],
    keywords: ["video editing cherrapunji", "web design cherrapunji", "tourism marketing cherrapunji"],
    misspellings: ["cherrapunjee", "cherrapunji meghalaya", "sohra"],
    nearbyAreas: ["Shillong", "Mawsynram", "Dawki"],
    priority: 0.8
  },
  // ============================================
  // MANIPUR
  // ============================================
  "imphal": {
    slug: "imphal",
    name: "Imphal",
    state: "Manipur",
    region: "Northeast India",
    description: "Imphal's growing business ecosystem needs modern creative solutions. WhyCreatives delivers professional branding, web design, and video production to Manipur businesses.",
    tagline: "Modern Creative Solutions for Imphal",
    highlights: ["Handloom & handicraft expertise", "Sports industry experience", "Cultural sensitivity", "Fast delivery"],
    population: "5 lakh+",
    keywords: ["video editing imphal", "web design imphal", "digital marketing imphal", "creative agency imphal"],
    misspellings: ["impal", "impahl", "imfal"],
    nearbyAreas: ["Thoubal", "Bishnupur", "Churachandpur"],
    priority: 0.9
  },
  "manipur": {
    slug: "manipur",
    name: "Manipur",
    state: "Northeast India",
    region: "Northeast India",
    description: "Manipur, the Jewel of India, is known for its rich culture, classical dance, and sports excellence. WhyCreatives serves businesses across Manipur with creative solutions.",
    tagline: "Creative Excellence for the Jewel of India",
    highlights: ["Cultural expertise", "Sports marketing", "Handloom promotion", "Pan-Manipur coverage"],
    keywords: ["video editing manipur", "web design manipur", "digital marketing manipur", "creative agency manipur"],
    misspellings: ["manipr", "manipurr", "mnipur"],
    nearbyAreas: ["Imphal", "Thoubal", "Bishnupur", "Churachandpur"],
    priority: 0.85
  },
  // ============================================
  // MIZORAM
  // ============================================
  "aizawl": {
    slug: "aizawl",
    name: "Aizawl",
    state: "Mizoram",
    region: "Northeast India",
    description: "Aizawl, the capital of Mizoram perched on a ridge, is a unique city with a thriving business community. WhyCreatives brings professional creative services to Aizawl businesses.",
    tagline: "Creative Partner for Aizawl",
    highlights: ["Capital city coverage", "Tourism marketing", "Music industry", "Quick turnaround"],
    population: "3 lakh+",
    keywords: ["video editing aizawl", "web design aizawl", "digital marketing aizawl", "creative agency aizawl"],
    misspellings: ["aizwal", "aizawal", "aizal"],
    nearbyAreas: ["Lunglei", "Champhai", "Serchhip"],
    priority: 0.9
  },
  "mizoram": {
    slug: "mizoram",
    name: "Mizoram",
    state: "Northeast India",
    region: "Northeast India",
    description: "Mizoram, the land of the highlanders, is known for its scenic beauty and high literacy rate. WhyCreatives serves businesses across Mizoram with professional creative services.",
    tagline: "Creative Services for the Land of Highlanders",
    highlights: ["Pan-Mizoram coverage", "Tourism expertise", "Education sector", "Affordable rates"],
    keywords: ["video editing mizoram", "web design mizoram", "digital marketing mizoram", "creative agency mizoram"],
    misspellings: ["mizorm", "mizoramm", "mzoram"],
    nearbyAreas: ["Aizawl", "Lunglei", "Champhai"],
    priority: 0.85
  },
  // ============================================
  // NAGALAND
  // ============================================
  "kohima": {
    slug: "kohima",
    name: "Kohima",
    state: "Nagaland",
    region: "Northeast India",
    description: "Kohima, the capital of Nagaland and site of the famous WWII battle, is a city rich in history and culture. WhyCreatives provides professional creative services to Kohima businesses.",
    tagline: "Creative Excellence for Kohima",
    highlights: ["Historical tourism", "Hornbill Festival", "Cultural marketing", "Professional quality"],
    population: "1.5 lakh+",
    keywords: ["video editing kohima", "web design kohima", "digital marketing kohima", "creative agency kohima"],
    misspellings: ["kohma", "kohimaa", "koheema"],
    nearbyAreas: ["Dimapur", "Mokokchung", "Wokha"],
    priority: 0.9
  },
  "nagaland": {
    slug: "nagaland",
    name: "Nagaland",
    state: "Northeast India",
    region: "Northeast India",
    description: "Nagaland, the land of festivals, is famous for its vibrant tribal culture and the Hornbill Festival. WhyCreatives helps Nagaland businesses showcase their unique heritage.",
    tagline: "Creative Partner for the Land of Festivals",
    highlights: ["Festival marketing", "Tribal heritage", "Tourism expertise", "Cultural sensitivity"],
    keywords: ["video editing nagaland", "web design nagaland", "digital marketing nagaland", "creative agency nagaland"],
    misspellings: ["nagland", "nagalandd", "ngaland"],
    nearbyAreas: ["Kohima", "Dimapur", "Mokokchung"],
    priority: 0.85
  },
  "dimapur": {
    slug: "dimapur",
    name: "Dimapur",
    state: "Nagaland",
    region: "Northeast India",
    description: "Dimapur, the commercial capital of Nagaland and its only plains town, is the business hub of the state. WhyCreatives serves Dimapur businesses with professional branding.",
    tagline: "Commercial Capital's Creative Agency",
    highlights: ["Business hub coverage", "Commercial expertise", "Quick delivery", "Competitive pricing"],
    keywords: ["video editing dimapur", "web design dimapur", "digital marketing dimapur", "creative agency dimapur"],
    misspellings: ["dimapurr", "dimapr", "dimpur"],
    nearbyAreas: ["Kohima", "Mokokchung", "Wokha"],
    priority: 0.85
  },
  // ============================================
  // ARUNACHAL PRADESH
  // ============================================
  "itanagar": {
    slug: "itanagar",
    name: "Itanagar",
    state: "Arunachal Pradesh",
    region: "Northeast India",
    description: "Itanagar, the capital of Arunachal Pradesh, is the gateway to India's largest northeastern state. WhyCreatives provides professional creative services to help Itanagar businesses grow.",
    tagline: "Creative Services for Itanagar",
    highlights: ["Capital city coverage", "Tourism marketing", "Government projects", "Professional quality"],
    population: "1 lakh+",
    keywords: ["video editing itanagar", "web design itanagar", "digital marketing itanagar", "creative agency itanagar"],
    misspellings: ["itangar", "itanagarr", "itanagr"],
    nearbyAreas: ["Naharlagun", "Pasighat", "Tawang"],
    priority: 0.9
  },
  "arunachal-pradesh": {
    slug: "arunachal-pradesh",
    name: "Arunachal Pradesh",
    state: "Northeast India",
    region: "Northeast India",
    description: "Arunachal Pradesh, the Land of the Rising Sun, is India's largest northeastern state with incredible biodiversity and tribal cultures. WhyCreatives serves businesses across this beautiful state.",
    tagline: "Creative Partner for the Land of Rising Sun",
    highlights: ["Tourism expertise", "Tribal heritage", "Adventure tourism", "Pan-state coverage"],
    keywords: ["video editing arunachal pradesh", "web design arunachal", "digital marketing arunachal", "creative agency arunachal"],
    misspellings: ["arunachal", "arunachalpradesh", "arunachl pradesh"],
    nearbyAreas: ["Itanagar", "Tawang", "Pasighat", "Ziro"],
    priority: 0.85
  },
  // ============================================
  // SIKKIM
  // ============================================
  "gangtok": {
    slug: "gangtok",
    name: "Gangtok",
    state: "Sikkim",
    region: "Northeast India",
    description: "Gangtok, the capital of Sikkim with stunning views of Kanchenjunga, is a major tourist destination. WhyCreatives helps Gangtok businesses with professional video production.",
    tagline: "Creative Excellence for Gangtok",
    highlights: ["Tourism marketing", "Himalayan expertise", "Hotel & hospitality", "Visual storytelling"],
    population: "1 lakh+",
    keywords: ["video editing gangtok", "web design gangtok", "digital marketing gangtok", "creative agency gangtok"],
    misspellings: ["gangtk", "gangtokk", "gangtak"],
    nearbyAreas: ["Namchi", "Pelling", "Ravangla"],
    priority: 0.9
  },
  "sikkim": {
    slug: "sikkim",
    name: "Sikkim",
    state: "Northeast India",
    region: "Northeast India",
    description: "Sikkim, India's first fully organic state with breathtaking Himalayan landscapes, attracts tourists from around the world. WhyCreatives serves Sikkim businesses with creative solutions.",
    tagline: "Creative Partner for Organic Sikkim",
    highlights: ["Eco-tourism focus", "Organic branding", "Adventure tourism", "Pan-Sikkim coverage"],
    keywords: ["video editing sikkim", "web design sikkim", "digital marketing sikkim", "creative agency sikkim"],
    misspellings: ["sikim", "sikkimm", "sikkim india"],
    nearbyAreas: ["Gangtok", "Namchi", "Pelling"],
    priority: 0.85
  },
  // ============================================
  // MAJOR INDIAN CITIES - TIER 1
  // ============================================
  "kolkata": {
    slug: "kolkata",
    name: "Kolkata",
    state: "West Bengal",
    region: "East India",
    description: "The cultural capital of India meets affordable creativity. WhyCreatives offers Kolkata businesses premium creative services at 90% less than local agencies.",
    tagline: "Premium Quality, Kolkata-Friendly Prices",
    highlights: ["90% cost savings vs local agencies", "Bengali language support", "24-48 hour delivery", "500+ happy clients"],
    population: "1.5 crore+",
    keywords: ["video editing kolkata", "web design kolkata", "digital marketing kolkata", "creative agency kolkata", "best agency in kolkata"],
    misspellings: ["kolkatta", "kolkta", "kolkatha", "calcutta", "kolkota"],
    nearbyAreas: ["Howrah", "Salt Lake", "Rajarhat", "Dum Dum", "Barasat"],
    priority: 0.9
  },
  "delhi": {
    slug: "delhi",
    name: "Delhi",
    state: "NCR",
    region: "North India",
    description: "Delhi businesses deserve world-class creative services without the premium price tag. WhyCreatives delivers metro-quality work at small-town prices.",
    tagline: "Metro Quality at Smart Prices",
    highlights: ["90% cheaper than Delhi agencies", "Same quality, better value", "Remote collaboration", "Quick turnaround"],
    population: "2 crore+",
    keywords: ["video editing delhi", "web design delhi", "digital marketing delhi", "creative agency delhi", "best agency in delhi"],
    misspellings: ["dilli", "dehli", "delhii", "delih"],
    nearbyAreas: ["Noida", "Gurgaon", "Faridabad", "Ghaziabad", "Greater Noida"],
    priority: 0.9
  },
  "new-delhi": {
    slug: "new-delhi",
    name: "New Delhi",
    state: "NCR",
    region: "North India",
    description: "India's capital deserves creative services that match its stature. WhyCreatives provides New Delhi businesses with premium video editing, web design, and branding.",
    tagline: "Capital Quality, Smart Pricing",
    highlights: ["Government sector expertise", "Corporate experience", "Premium deliverables", "Competitive rates"],
    keywords: ["video editing new delhi", "web design new delhi", "digital marketing new delhi", "creative agency new delhi"],
    misspellings: ["newdelhi", "new dilli", "new dehli"],
    nearbyAreas: ["Delhi", "Noida", "Gurgaon"],
    priority: 0.85
  },
  "mumbai": {
    slug: "mumbai",
    name: "Mumbai",
    state: "Maharashtra",
    region: "West India",
    description: "India's financial capital meets India's most affordable creative agency. Get Bollywood-quality video editing and world-class web design at a fraction of Mumbai prices.",
    tagline: "Bollywood Quality, Smart Pricing",
    highlights: ["Film industry quality", "Startup-friendly rates", "24/7 availability", "Premium deliverables"],
    population: "2 crore+",
    keywords: ["video editing mumbai", "web design mumbai", "digital marketing mumbai", "creative agency mumbai", "best agency in mumbai"],
    misspellings: ["mumbaii", "mumabi", "mubai", "bombay", "mumbay"],
    nearbyAreas: ["Navi Mumbai", "Thane", "Andheri", "Bandra", "Powai"],
    priority: 0.9
  },
  "bangalore": {
    slug: "bangalore",
    name: "Bangalore",
    state: "Karnataka",
    region: "South India",
    description: "Silicon Valley of India, meet your affordable creative partner. WhyCreatives serves Bangalore startups and enterprises with tech-savvy creative solutions.",
    tagline: "Startup-Ready Creative Solutions",
    highlights: ["Tech startup expertise", "SaaS & product experience", "Agile delivery", "Competitive pricing"],
    population: "1.5 crore+",
    keywords: ["video editing bangalore", "web design bangalore", "digital marketing bangalore", "creative agency bangalore", "best agency in bangalore"],
    misspellings: ["banglore", "bangalor", "banglaore"],
    nearbyAreas: ["Whitefield", "Koramangala", "HSR Layout", "Electronic City", "Indiranagar"],
    priority: 0.9
  },
  "bengaluru": {
    slug: "bengaluru",
    name: "Bengaluru",
    state: "Karnataka",
    region: "South India",
    description: "India's tech capital needs creative partners who understand technology. WhyCreatives serves Bengaluru's thriving tech ecosystem with professional creative services.",
    tagline: "Tech-Savvy Creative Partner",
    highlights: ["IT industry expertise", "Product marketing", "Startup ecosystem", "Quick turnaround"],
    keywords: ["video editing bengaluru", "web design bengaluru", "digital marketing bengaluru", "creative agency bengaluru"],
    misspellings: ["bangluru", "bengalure", "bangaluru"],
    nearbyAreas: ["Whitefield", "Koramangala", "HSR Layout"],
    priority: 0.85
  },
  "hyderabad": {
    slug: "hyderabad",
    name: "Hyderabad",
    state: "Telangana",
    region: "South India",
    description: "The City of Pearls deserves creative services that shine. WhyCreatives brings affordable excellence to Hyderabad's thriving tech and business community.",
    tagline: "Creative Excellence for the City of Pearls",
    highlights: ["IT industry experience", "Pharma sector expertise", "Telugu support", "Fast delivery"],
    population: "1 crore+",
    keywords: ["video editing hyderabad", "web design hyderabad", "digital marketing hyderabad", "creative agency hyderabad", "best agency in hyderabad"],
    misspellings: ["hydrabad", "hyderabd", "hiderabad", "hyderabadh"],
    nearbyAreas: ["HITEC City", "Gachibowli", "Banjara Hills", "Secunderabad", "Madhapur"],
    priority: 0.9
  },
  "chennai": {
    slug: "chennai",
    name: "Chennai",
    state: "Tamil Nadu",
    region: "South India",
    description: "Gateway to South India, meet your creative partner. WhyCreatives delivers professional video editing, web design, and branding to Chennai businesses.",
    tagline: "Professional Creative Services for Chennai",
    highlights: ["Manufacturing expertise", "Tamil language support", "Auto industry experience", "Reliable delivery"],
    population: "1 crore+",
    keywords: ["video editing chennai", "web design chennai", "digital marketing chennai", "creative agency chennai", "best agency in chennai"],
    misspellings: ["chenai", "chennaii", "chennnai", "madras"],
    nearbyAreas: ["OMR", "T. Nagar", "Anna Nagar", "Velachery", "Adyar"],
    priority: 0.9
  },
  "pune": {
    slug: "pune",
    name: "Pune",
    state: "Maharashtra",
    region: "West India",
    description: "The Oxford of the East meets affordable creativity. WhyCreatives serves Pune's education, IT, and manufacturing sectors with premium creative solutions.",
    tagline: "Smart Creative Solutions for Smart City",
    highlights: ["Education sector expertise", "IT company experience", "Student-friendly pricing", "Quick turnaround"],
    population: "70 lakh+",
    keywords: ["video editing pune", "web design pune", "digital marketing pune", "creative agency pune", "best agency in pune"],
    misspellings: ["puna", "punne", "poona"],
    nearbyAreas: ["Hinjewadi", "Kothrud", "Koregaon Park", "Wakad", "Baner"],
    priority: 0.85
  },
  // ============================================
  // TIER 2 CITIES
  // ============================================
  "ahmedabad": {
    slug: "ahmedabad",
    name: "Ahmedabad",
    state: "Gujarat",
    region: "West India",
    description: "Gujarat's commercial capital and a UNESCO World Heritage City deserves quality creative services. WhyCreatives helps Ahmedabad businesses with professional branding.",
    tagline: "Creative Excellence for Ahmedabad",
    highlights: ["Textile industry expertise", "Startup ecosystem", "Gujarati support", "Competitive pricing"],
    population: "80 lakh+",
    keywords: ["video editing ahmedabad", "web design ahmedabad", "digital marketing ahmedabad", "creative agency ahmedabad"],
    misspellings: ["ahemdabad", "ahmedabd", "ahmadabad", "ahmdabad"],
    nearbyAreas: ["Gandhinagar", "SG Highway", "Prahlad Nagar", "Satellite"],
    priority: 0.8
  },
  "jaipur": {
    slug: "jaipur",
    name: "Jaipur",
    state: "Rajasthan",
    region: "North India",
    description: "The Pink City, known for its rich heritage and growing IT sector, needs modern creative solutions. WhyCreatives serves Jaipur businesses with professional creative services.",
    tagline: "Modern Creativity for the Pink City",
    highlights: ["Tourism marketing", "Handicraft promotion", "IT sector experience", "Heritage branding"],
    population: "40 lakh+",
    keywords: ["video editing jaipur", "web design jaipur", "digital marketing jaipur", "creative agency jaipur"],
    misspellings: ["jaipr", "jaipure", "jaypur"],
    nearbyAreas: ["Mansarovar", "Vaishali Nagar", "Malviya Nagar", "C-Scheme"],
    priority: 0.8
  },
  "lucknow": {
    slug: "lucknow",
    name: "Lucknow",
    state: "Uttar Pradesh",
    region: "North India",
    description: "The City of Nawabs combines rich heritage with modern business. WhyCreatives provides Lucknow businesses with professional creative services.",
    tagline: "Creative Partner for the City of Nawabs",
    highlights: ["Heritage marketing", "IT sector growth", "Hindi support", "Affordable rates"],
    population: "35 lakh+",
    keywords: ["video editing lucknow", "web design lucknow", "digital marketing lucknow", "creative agency lucknow"],
    misspellings: ["lucknw", "luckno", "luknow", "lakhnow"],
    nearbyAreas: ["Gomti Nagar", "Hazratganj", "Aliganj", "Indira Nagar"],
    priority: 0.8
  },
  "chandigarh": {
    slug: "chandigarh",
    name: "Chandigarh",
    state: "Punjab/Haryana",
    region: "North India",
    description: "India's best planned city deserves well-planned creative solutions. WhyCreatives serves Chandigarh's businesses with professional branding and digital marketing.",
    tagline: "Planned Creative Solutions for Chandigarh",
    highlights: ["Corporate expertise", "Startup-friendly", "Quick delivery", "Quality focus"],
    population: "12 lakh+",
    keywords: ["video editing chandigarh", "web design chandigarh", "digital marketing chandigarh", "creative agency chandigarh"],
    misspellings: ["chandigrah", "chandigarrh", "chandighar"],
    nearbyAreas: ["Mohali", "Panchkula", "Zirakpur"],
    priority: 0.8
  },
  "bhubaneswar": {
    slug: "bhubaneswar",
    name: "Bhubaneswar",
    state: "Odisha",
    region: "East India",
    description: "The Temple City of India is also a growing IT hub. WhyCreatives helps Bhubaneswar businesses with professional creative services.",
    tagline: "Creative Excellence for the Temple City",
    highlights: ["IT sector expertise", "Temple tourism", "Odia support", "Affordable pricing"],
    population: "12 lakh+",
    keywords: ["video editing bhubaneswar", "web design bhubaneswar", "digital marketing bhubaneswar", "creative agency bhubaneswar"],
    misspellings: ["bhubaneshwar", "bhubaneswar", "bhubneswar"],
    nearbyAreas: ["Cuttack", "Puri", "Khordha"],
    priority: 0.8
  },
  "kochi": {
    slug: "kochi",
    name: "Kochi",
    state: "Kerala",
    region: "South India",
    description: "Queen of the Arabian Sea and Kerala's commercial capital needs creative services that match its cosmopolitan nature. WhyCreatives serves Kochi businesses.",
    tagline: "Creative Partner for Queen of Arabian Sea",
    highlights: ["Tourism expertise", "IT sector", "Malayalam support", "Quick turnaround"],
    population: "25 lakh+",
    keywords: ["video editing kochi", "web design kochi", "digital marketing kochi", "creative agency kochi", "cochin"],
    misspellings: ["kochii", "cochin", "kochinn"],
    nearbyAreas: ["Ernakulam", "Fort Kochi", "Kakkanad", "Infopark"],
    priority: 0.8
  },
  "indore": {
    slug: "indore",
    name: "Indore",
    state: "Madhya Pradesh",
    region: "Central India",
    description: "India's cleanest city and a growing commercial hub deserves quality creative services. WhyCreatives helps Indore businesses with professional branding.",
    tagline: "Clean Creative Solutions for Indore",
    highlights: ["Commercial expertise", "Food industry", "Hindi support", "Competitive rates"],
    population: "30 lakh+",
    keywords: ["video editing indore", "web design indore", "digital marketing indore", "creative agency indore"],
    misspellings: ["indor", "indoree", "indorre"],
    nearbyAreas: ["Vijay Nagar", "Palasia", "Rau", "Dewas"],
    priority: 0.8
  },
  "patna": {
    slug: "patna",
    name: "Patna",
    state: "Bihar",
    region: "East India",
    description: "One of the oldest continuously inhabited cities in the world is now a growing business hub. WhyCreatives provides Patna businesses with affordable creative solutions.",
    tagline: "Modern Creativity for Ancient Patna",
    highlights: ["Education sector", "Growing market", "Hindi support", "Budget-friendly"],
    population: "25 lakh+",
    keywords: ["video editing patna", "web design patna", "digital marketing patna", "creative agency patna"],
    misspellings: ["patnaa", "patana", "patna bihar"],
    nearbyAreas: ["Boring Road", "Kankarbagh", "Patliputra", "Bailey Road"],
    priority: 0.8
  },
  "ranchi": {
    slug: "ranchi",
    name: "Ranchi",
    state: "Jharkhand",
    region: "East India",
    description: "The capital of Jharkhand and a growing IT destination needs modern creative services. WhyCreatives serves Ranchi businesses with professional creative services.",
    tagline: "Creative Services for Ranchi",
    highlights: ["IT sector growth", "Mining industry", "Hindi support", "Affordable rates"],
    population: "15 lakh+",
    keywords: ["video editing ranchi", "web design ranchi", "digital marketing ranchi", "creative agency ranchi"],
    misspellings: ["ranchii", "ranchi jharkhand"],
    nearbyAreas: ["Doranda", "Lalpur", "Morabadi", "Harmu"],
    priority: 0.8
  },
  "raipur": {
    slug: "raipur",
    name: "Raipur",
    state: "Chhattisgarh",
    region: "Central India",
    description: "The capital of Chhattisgarh is a rapidly growing commercial center. WhyCreatives helps Raipur businesses with professional branding and digital marketing.",
    tagline: "Creative Partner for Raipur",
    highlights: ["Industrial sector", "Growing market", "Hindi support", "Quick delivery"],
    population: "12 lakh+",
    keywords: ["video editing raipur", "web design raipur", "digital marketing raipur", "creative agency raipur"],
    misspellings: ["raipurr", "raipr", "raipur chhattisgarh"],
    nearbyAreas: ["Shankar Nagar", "Telibandha", "Pandri", "Devendra Nagar"],
    priority: 0.8
  },
  "noida": {
    slug: "noida",
    name: "Noida",
    state: "Uttar Pradesh",
    region: "NCR",
    description: "India's film city and IT hub needs creative partners who understand media. WhyCreatives serves Noida businesses with professional video production and web design.",
    tagline: "Media-Savvy Creative Solutions",
    highlights: ["Film industry expertise", "IT sector", "Media production", "Quick turnaround"],
    population: "10 lakh+",
    keywords: ["video editing noida", "web design noida", "digital marketing noida", "creative agency noida"],
    misspellings: ["noidaa", "noida up"],
    nearbyAreas: ["Greater Noida", "Sector 62", "Sector 18", "Film City"],
    priority: 0.8
  },
  "gurgaon": {
    slug: "gurgaon",
    name: "Gurgaon",
    state: "Haryana",
    region: "NCR",
    description: "India's corporate hub and startup capital needs affordable creative solutions. WhyCreatives serves Gurgaon businesses with premium quality at smart prices.",
    tagline: "Corporate Quality, Startup Pricing",
    highlights: ["Corporate expertise", "Startup ecosystem", "MNC experience", "Competitive rates"],
    population: "15 lakh+",
    keywords: ["video editing gurgaon", "web design gurgaon", "digital marketing gurgaon", "creative agency gurgaon"],
    misspellings: ["gurgoan", "gurgaoon", "gurgaon haryana"],
    nearbyAreas: ["Cyber City", "Golf Course Road", "Sohna Road", "MG Road"],
    priority: 0.8
  },
  "gurugram": {
    slug: "gurugram",
    name: "Gurugram",
    state: "Haryana",
    region: "NCR",
    description: "The Millennium City is home to Fortune 500 companies and unicorn startups. WhyCreatives provides Gurugram businesses with world-class creative services.",
    tagline: "World-Class Creative for Millennium City",
    highlights: ["Fortune 500 experience", "Unicorn startups", "Premium quality", "Smart pricing"],
    keywords: ["video editing gurugram", "web design gurugram", "digital marketing gurugram", "creative agency gurugram"],
    misspellings: ["gurugramm", "gurugram haryana"],
    nearbyAreas: ["Cyber Hub", "DLF Phase", "Udyog Vihar"],
    priority: 0.8
  },
  "surat": {
    slug: "surat",
    name: "Surat",
    state: "Gujarat",
    region: "West India",
    description: "The Diamond City and textile hub of India needs creative services that sparkle. WhyCreatives helps Surat businesses with professional branding and video production.",
    tagline: "Sparkling Creative Solutions for Surat",
    highlights: ["Diamond industry", "Textile expertise", "Gujarati support", "Quick delivery"],
    population: "60 lakh+",
    keywords: ["video editing surat", "web design surat", "digital marketing surat", "creative agency surat"],
    misspellings: ["suratt", "surat gujarat"],
    nearbyAreas: ["Vesu", "Adajan", "Varachha", "Katargam"],
    priority: 0.8
  },
  "vadodara": {
    slug: "vadodara",
    name: "Vadodara",
    state: "Gujarat",
    region: "West India",
    description: "The cultural capital of Gujarat combines heritage with industry. WhyCreatives serves Vadodara businesses with professional creative services.",
    tagline: "Creative Excellence for Vadodara",
    highlights: ["Industrial expertise", "Cultural heritage", "Gujarati support", "Affordable rates"],
    population: "25 lakh+",
    keywords: ["video editing vadodara", "web design vadodara", "digital marketing vadodara", "creative agency vadodara", "baroda"],
    misspellings: ["vadodra", "baroda", "vadodara gujarat"],
    nearbyAreas: ["Alkapuri", "Fatehgunj", "Manjalpur", "Gotri"],
    priority: 0.8
  },
  "nagpur": {
    slug: "nagpur",
    name: "Nagpur",
    state: "Maharashtra",
    region: "Central India",
    description: "The Orange City and geographic center of India is a growing business hub. WhyCreatives provides Nagpur businesses with professional creative services.",
    tagline: "Creative Partner for the Orange City",
    highlights: ["Central location", "Growing IT sector", "Marathi support", "Competitive pricing"],
    population: "30 lakh+",
    keywords: ["video editing nagpur", "web design nagpur", "digital marketing nagpur", "creative agency nagpur"],
    misspellings: ["nagpurr", "nagpur maharashtra"],
    nearbyAreas: ["Dharampeth", "Sitabuldi", "Sadar", "Civil Lines"],
    priority: 0.8
  },
  "visakhapatnam": {
    slug: "visakhapatnam",
    name: "Visakhapatnam",
    state: "Andhra Pradesh",
    region: "South India",
    description: "The City of Destiny and Andhra's largest city needs modern creative solutions. WhyCreatives serves Visakhapatnam businesses with professional creative services.",
    tagline: "Creative Excellence for the City of Destiny",
    highlights: ["Port city expertise", "IT sector growth", "Telugu support", "Quick delivery"],
    population: "25 lakh+",
    keywords: ["video editing visakhapatnam", "web design visakhapatnam", "digital marketing visakhapatnam", "creative agency vizag"],
    misspellings: ["vizag", "vishakhapatnam", "visakhapatam"],
    nearbyAreas: ["Gajuwaka", "MVP Colony", "Dwaraka Nagar", "Madhurawada"],
    priority: 0.8
  },
  "coimbatore": {
    slug: "coimbatore",
    name: "Coimbatore",
    state: "Tamil Nadu",
    region: "South India",
    description: "The Manchester of South India is a major industrial and IT hub. WhyCreatives helps Coimbatore businesses with professional branding and digital marketing.",
    tagline: "Industrial Creative Solutions for Coimbatore",
    highlights: ["Manufacturing expertise", "IT sector", "Tamil support", "Affordable rates"],
    population: "20 lakh+",
    keywords: ["video editing coimbatore", "web design coimbatore", "digital marketing coimbatore", "creative agency coimbatore"],
    misspellings: ["coimbator", "kovai", "coimbatoor"],
    nearbyAreas: ["RS Puram", "Gandhipuram", "Peelamedu", "Saibaba Colony"],
    priority: 0.8
  },
  "thiruvananthapuram": {
    slug: "thiruvananthapuram",
    name: "Thiruvananthapuram",
    state: "Kerala",
    region: "South India",
    description: "Kerala's capital and a major IT hub needs creative services that match its progressive nature. WhyCreatives serves Thiruvananthapuram businesses.",
    tagline: "Progressive Creative Solutions",
    highlights: ["IT sector expertise", "Government projects", "Malayalam support", "Professional quality"],
    population: "20 lakh+",
    keywords: ["video editing thiruvananthapuram", "web design trivandrum", "digital marketing thiruvananthapuram", "creative agency trivandrum"],
    misspellings: ["trivandrum", "thiruvanantapuram", "thiruvananthapuramm"],
    nearbyAreas: ["Technopark", "Kazhakkoottam", "Pattom", "Kowdiar"],
    priority: 0.8
  },
  "mysore": {
    slug: "mysore",
    name: "Mysore",
    state: "Karnataka",
    region: "South India",
    description: "The City of Palaces is also a growing IT destination. WhyCreatives helps Mysore businesses with professional creative services that honor its heritage.",
    tagline: "Royal Creative Solutions for Mysore",
    highlights: ["Heritage tourism", "IT sector growth", "Kannada support", "Affordable rates"],
    population: "12 lakh+",
    keywords: ["video editing mysore", "web design mysore", "digital marketing mysore", "creative agency mysore"],
    misspellings: ["mysuru", "mysor", "mysore karnataka"],
    nearbyAreas: ["Vijayanagar", "Kuvempunagar", "Hebbal", "Saraswathipuram"],
    priority: 0.8
  },
  "madurai": {
    slug: "madurai",
    name: "Madurai",
    state: "Tamil Nadu",
    region: "South India",
    description: "The Temple City and one of the oldest cities in India needs modern creative solutions. WhyCreatives serves Madurai businesses with professional creative services.",
    tagline: "Modern Creativity for Ancient Madurai",
    highlights: ["Temple tourism", "Textile industry", "Tamil support", "Budget-friendly"],
    population: "15 lakh+",
    keywords: ["video editing madurai", "web design madurai", "digital marketing madurai", "creative agency madurai"],
    misspellings: ["maduraii", "madurai tamil nadu"],
    nearbyAreas: ["Anna Nagar", "KK Nagar", "Goripalayam", "Tallakulam"],
    priority: 0.8
  },
  // ============================================
  // WEST BENGAL
  // ============================================
  "siliguri": {
    slug: "siliguri",
    name: "Siliguri",
    state: "West Bengal",
    region: "East India",
    description: "The gateway to Northeast India and a major commercial hub. WhyCreatives serves Siliguri businesses with professional creative services.",
    tagline: "Gateway City's Creative Partner",
    highlights: ["Northeast gateway", "Tea industry", "Tourism hub", "Quick delivery"],
    population: "8 lakh+",
    keywords: ["video editing siliguri", "web design siliguri", "digital marketing siliguri", "creative agency siliguri"],
    misspellings: ["siligurii", "siliguri west bengal"],
    nearbyAreas: ["Darjeeling", "Jalpaiguri", "Kalimpong", "Gangtok"],
    priority: 0.8
  },
  "darjeeling": {
    slug: "darjeeling",
    name: "Darjeeling",
    state: "West Bengal",
    region: "East India",
    description: "The Queen of Hills and world-famous tea destination needs creative services that match its charm. WhyCreatives serves Darjeeling businesses.",
    tagline: "Creative Excellence for the Queen of Hills",
    highlights: ["Tea industry expertise", "Tourism marketing", "Heritage branding", "Visual storytelling"],
    keywords: ["video editing darjeeling", "web design darjeeling", "digital marketing darjeeling", "creative agency darjeeling"],
    misspellings: ["darjiling", "darjeelingg"],
    nearbyAreas: ["Siliguri", "Kalimpong", "Kurseong"],
    priority: 0.75
  },
  // ============================================
  // REGIONAL PAGES
  // ============================================
  "northeast-india": {
    slug: "northeast-india",
    name: "Northeast India",
    state: "India",
    region: "Northeast India",
    description: "WhyCreatives is the leading creative agency serving all 8 states of Northeast India. From Tripura to Sikkim, we bring world-class creative services to the entire region.",
    tagline: "Northeast India's Premier Creative Agency",
    highlights: ["All 8 states coverage", "Local language support", "Regional expertise", "Affordable pricing"],
    keywords: ["video editing northeast india", "web design northeast", "digital marketing northeast india", "creative agency northeast"],
    misspellings: ["north east india", "ne india", "northeastern india"],
    nearbyAreas: ["Tripura", "Assam", "Meghalaya", "Manipur", "Mizoram", "Nagaland", "Arunachal Pradesh", "Sikkim"],
    priority: 0.9
  },
  "india": {
    slug: "india",
    name: "India",
    state: "India",
    region: "India",
    description: "WhyCreatives serves businesses across India with affordable, high-quality creative services. From metros to small towns, we deliver excellence everywhere.",
    tagline: "India's Most Affordable Creative Agency",
    highlights: ["Pan-India coverage", "Multi-language support", "24/7 availability", "Best value"],
    keywords: ["video editing india", "web design india", "digital marketing india", "creative agency india", "best creative agency india"],
    misspellings: ["bharat", "hindustan"],
    nearbyAreas: ["Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata", "Hyderabad"],
    priority: 0.85
  }
};
function getLocationData(slug) {
  const correctedSlug = misspellingRedirects[slug.toLowerCase()];
  if (correctedSlug && locationSEOData[correctedSlug]) {
    return locationSEOData[correctedSlug];
  }
  if (locationSEOData[slug]) {
    return locationSEOData[slug];
  }
  if (validLocationSlugs.includes(slug)) {
    const formattedName = slug.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    const isBrand = slug.includes("creative") || slug.includes("ycreative");
    const name = isBrand ? "India" : formattedName;
    return {
      slug,
      name,
      state: isBrand ? "India" : "India",
      region: "India",
      description: `WhyCreatives serves businesses in ${name} with highly affordable, premium creative services. From video editing to web development, we deliver excellence across all digital marketing channels.`,
      tagline: isBrand ? `Your Creative Partner` : `Creative Excellence for ${formattedName}`,
      highlights: ["Professional quality", "Quick turnaround", "Affordable pricing", "100% Satisfaction"],
      keywords: [`video editing ${name}`, `web design ${name}`, `digital marketing ${name}`, `creative agency ${name}`, `affordable agency ${name}`],
      misspellings: [],
      nearbyAreas: [],
      priority: 0.8
    };
  }
  return null;
}
function isValidLocationSlug(slug) {
  return validLocationSlugs.includes(slug) || !!misspellingRedirects[slug.toLowerCase()];
}
function getMisspellingRedirect(slug) {
  return misspellingRedirects[slug.toLowerCase()] || null;
}
const services = [
  {
    icon: Video,
    name: "Video Production",
    desc: "Professional editing, color grading, motion graphics & post-production",
    price: "₹6,999",
    duration: "3-5 Days"
  },
  {
    icon: Globe,
    name: "Web Development",
    desc: "Modern, responsive, conversion-focused custom websites",
    price: "₹4,999",
    duration: "1 Week"
  },
  {
    icon: Palette,
    name: "Brand Presence",
    desc: "Complete brand identity, visual guidelines & strategic positioning",
    price: "₹5,999/mo",
    duration: "Monthly"
  },
  {
    icon: Megaphone,
    name: "Performance Marketing",
    desc: "High ROI ad campaigns, SEO & targeted advertising",
    price: "₹4,999/mo",
    duration: "Ongoing"
  },
  {
    icon: Sparkles,
    name: "Motion Graphics",
    desc: "4K animations, explainers, visual effects & intros",
    price: "₹3,999",
    duration: "48 Hours"
  },
  {
    icon: Share2,
    name: "Logo Design",
    desc: "Unique, memorable logos with multiple concepts & revisions",
    price: "₹2,999",
    duration: "2-3 Days"
  }
];
const timelineData = [
  {
    id: 1,
    title: "Video Editing",
    date: "Professional",
    content: "High-quality video editing with professional transitions and effects.",
    category: "Video",
    icon: Video,
    relatedIds: [2, 4],
    status: "completed",
    energy: 100
  },
  {
    id: 2,
    title: "Web Design",
    date: "Modern",
    content: "Responsive and beautiful web designs that convert.",
    category: "Design",
    icon: Globe,
    relatedIds: [1, 3],
    status: "completed",
    energy: 95
  },
  {
    id: 3,
    title: "Social Media",
    date: "Engaging",
    content: "Strategic social media management and content creation.",
    category: "Marketing",
    icon: Share2,
    relatedIds: [2, 5],
    status: "in-progress",
    energy: 85
  },
  {
    id: 4,
    title: "Branding",
    date: "Creative",
    content: "Unique brand identity and visual design solutions.",
    category: "Design",
    icon: Palette,
    relatedIds: [1, 5],
    status: "completed",
    energy: 90
  },
  {
    id: 5,
    title: "Growth",
    date: "Results",
    content: "Data-driven strategies for business growth and success.",
    category: "Strategy",
    icon: TrendingUp,
    relatedIds: [3, 4],
    status: "in-progress",
    energy: 80
  }
];
const LocationPage = () => {
  const { location } = useParams();
  if (!location) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/", replace: true });
  }
  const redirectTarget = getMisspellingRedirect(location);
  if (redirectTarget) {
    return /* @__PURE__ */ jsx(Navigate, { to: `/${redirectTarget}`, replace: true });
  }
  if (!isValidLocationSlug(location)) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/404", replace: true });
  }
  const data = getLocationData(location);
  if (!data) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/404", replace: true });
  }
  const pageTitle = `Best Creative Agency in ${data.name} | Video Production, Web Design, Digital Marketing - WhyCreatives`;
  const pageDescription = `WhyCreatives is the #1 creative agency in ${data.name}, ${data.state}. Professional video production from ₹6,999, web development from ₹4,999, digital marketing & branding. Affordable pricing with exceptional quality. ${data.description}`;
  const pageKeywords = data.keywords.join(", ");
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: pageTitle }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: pageDescription }),
      /* @__PURE__ */ jsx("meta", { name: "keywords", content: pageKeywords }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: `https://whycreatives.in/${location}` }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: pageTitle }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: pageDescription }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: `https://whycreatives.in/${location}` }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsx("meta", { property: "og:image", content: "https://whycreatives.in/favicon.png" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: pageTitle }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: pageDescription }),
      /* @__PURE__ */ jsx("meta", { name: "geo.region", content: "IN" }),
      /* @__PURE__ */ jsx("meta", { name: "geo.placename", content: `${data.name}, ${data.state}` }),
      data.population && /* @__PURE__ */ jsx("meta", { name: "population", content: data.population }),
      /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
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
      }) })
    ] }),
    /* @__PURE__ */ jsx(Navigation, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsxs("section", { className: "min-h-screen flex flex-col justify-start md:justify-center px-5 sm:px-6 pt-28 sm:pt-32 md:pt-36 pb-10 sm:pb-12 relative overflow-x-hidden", children: [
        /* @__PURE__ */ jsx(
          Spotlight,
          {
            className: "hidden md:block -top-40 left-0 md:left-60 md:-top-20 opacity-20",
            fill: "white"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "w-full max-w-7xl mx-auto", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-12 items-center", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative z-10 w-full animate-fade-in-up", children: [
              /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6", children: [
                /* @__PURE__ */ jsx(MapPin, { className: "w-4 h-4 text-white/70" }),
                /* @__PURE__ */ jsxs("span", { className: "text-sm text-white/70", children: [
                  "Serving ",
                  data.name,
                  ", ",
                  data.state
                ] })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-[2.2rem] leading-[1.15] sm:text-5xl md:text-6xl lg:text-7xl font-black text-foreground mb-4 sm:mb-6 tracking-tight", children: [
                "Best Creative",
                /* @__PURE__ */ jsx("br", {}),
                "Agency in",
                /* @__PURE__ */ jsx("br", {}),
                /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: data.name })
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm sm:text-xl md:text-2xl text-muted-foreground mb-5 sm:mb-8 leading-relaxed", children: [
                data.tagline,
                ". ",
                data.description.slice(0, 150),
                "..."
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3 sm:gap-4", children: [
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    size: "lg",
                    asChild: true,
                    className: "bg-foreground text-background hover:bg-muted-foreground text-base sm:text-lg px-8 py-5 sm:py-6 font-bold w-full sm:w-auto rounded-full",
                    children: /* @__PURE__ */ jsxs(Link, { to: "/contact", className: "flex items-center justify-center gap-2", children: [
                      "Get Free Quote",
                      /* @__PURE__ */ jsx(ArrowRight, { className: "h-5 w-5" })
                    ] })
                  }
                ),
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    size: "lg",
                    variant: "outline",
                    asChild: true,
                    className: "border-2 border-foreground text-foreground hover:bg-foreground hover:text-background text-base sm:text-lg px-8 py-5 sm:py-6 font-bold w-full sm:w-auto rounded-full",
                    children: /* @__PURE__ */ jsx(Link, { to: "/our-work", className: "flex items-center justify-center", children: "View Our Work" })
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: "relative w-full flex items-center justify-center animate-fade-in my-8 lg:my-0",
                style: { animationDelay: "0.2s" },
                children: [
                  /* @__PURE__ */ jsx("div", { className: "lg:hidden w-[120%] -mx-[10%] h-[500px] flex items-center justify-center overflow-visible py-8", children: /* @__PURE__ */ jsx("div", { className: "w-full h-full scale-[0.75]", children: /* @__PURE__ */ jsx(RadialOrbitalTimeline, { timelineData }) }) }),
                  /* @__PURE__ */ jsx("div", { className: "hidden lg:block w-full h-[550px]", children: /* @__PURE__ */ jsx(RadialOrbitalTimeline, { timelineData }) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx(FadeInWhenVisible, { delay: 0.2, children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center gap-4 sm:gap-8 mt-8 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full", children: [
              /* @__PURE__ */ jsx(Star, { className: "w-4 h-4 text-yellow-500 fill-yellow-500" }),
              " 4.9/5 Rating"
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full", children: [
              /* @__PURE__ */ jsx(Users, { className: "w-4 h-4" }),
              " 500+ Projects"
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full", children: [
              /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4" }),
              " 24-48hr Delivery"
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full", children: [
              /* @__PURE__ */ jsx(Shield, { className: "w-4 h-4" }),
              " 100% Satisfaction"
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-3 sm:gap-8 mt-10 sm:mt-16 pt-10 sm:pt-16 border-t border-border animate-fade-in", style: { animationDelay: "0.6s" }, children: [
            /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsx("div", { className: "text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-1 sm:mb-2", children: "Big" }),
              /* @__PURE__ */ jsx("div", { className: "text-[11px] sm:text-sm text-muted-foreground uppercase tracking-wide font-medium", children: "SAVINGS" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsx("div", { className: "text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-1 sm:mb-2", children: "500+" }),
              /* @__PURE__ */ jsx("div", { className: "text-[11px] sm:text-sm text-muted-foreground uppercase tracking-wide font-medium", children: "PROJECTS" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsx("div", { className: "text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-1 sm:mb-2", children: "100%" }),
              /* @__PURE__ */ jsx("div", { className: "text-[11px] sm:text-sm text-muted-foreground uppercase tracking-wide font-medium", children: "TRANSPARENCY" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "px-4 sm:px-6 py-12 sm:py-16", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto max-w-6xl", children: /* @__PURE__ */ jsx(FadeInWhenVisible, { children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: data.highlights.map((highlight, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all", children: [
        /* @__PURE__ */ jsx(CheckCircle2, { className: "w-5 h-5 text-green-500 flex-shrink-0" }),
        /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: highlight })
      ] }, index)) }) }) }) }),
      /* @__PURE__ */ jsx("section", { className: "px-4 sm:px-6 py-16 sm:py-24 bg-white/[0.02]", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-6xl", children: [
        /* @__PURE__ */ jsx(FadeInWhenVisible, { children: /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-3xl sm:text-4xl md:text-5xl font-black mb-4", children: [
            "Our Services in ",
            data.name
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground max-w-2xl mx-auto text-lg", children: "Premium quality at affordable prices. Same professional results, exceptional value." })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: services.map((service, index) => /* @__PURE__ */ jsx(FadeInWhenVisible, { delay: index * 0.1, children: /* @__PURE__ */ jsxs("div", { className: "group p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/[0.08] transition-all duration-300", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-4", children: [
            /* @__PURE__ */ jsx("div", { className: "p-3 rounded-2xl bg-white/10 group-hover:bg-white/20 transition-colors", children: /* @__PURE__ */ jsx(service.icon, { className: "w-6 h-6" }) }),
            /* @__PURE__ */ jsx("span", { className: "px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold", children: "Savings" })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-2", children: service.name }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm mb-4", children: service.desc }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between pt-4 border-t border-white/10", children: [
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: "text-2xl font-black text-white", children: service.price }) }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground bg-white/5 px-3 py-1 rounded-full", children: service.duration })
          ] })
        ] }) }, index)) }),
        /* @__PURE__ */ jsx(FadeInWhenVisible, { delay: 0.4, children: /* @__PURE__ */ jsx("div", { className: "text-center mt-10", children: /* @__PURE__ */ jsx(Button, { size: "lg", asChild: true, className: "bg-foreground text-background hover:bg-muted-foreground font-bold px-8 py-6 rounded-full", children: /* @__PURE__ */ jsxs(Link, { to: "/pricing-comparison", className: "flex items-center gap-2", children: [
          "View Full Pricing ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "h-5 w-5" })
        ] }) }) }) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "px-4 sm:px-6 py-16 sm:py-24", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-6xl", children: [
        /* @__PURE__ */ jsx(FadeInWhenVisible, { children: /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-3xl sm:text-4xl md:text-5xl font-black mb-4", children: [
            "Why ",
            data.name,
            " Businesses Choose Us"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground max-w-2xl mx-auto text-lg", children: "We're not just another agency. We're your creative partner committed to your success." })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-8 text-center", children: [
          /* @__PURE__ */ jsx(FadeInWhenVisible, { delay: 0.1, children: /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-3xl bg-white/5 border border-white/10", children: [
            /* @__PURE__ */ jsx("div", { className: "text-4xl sm:text-5xl font-black mb-2 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent", children: "Big" }),
            /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: "Savings vs Local Agencies" })
          ] }) }),
          /* @__PURE__ */ jsx(FadeInWhenVisible, { delay: 0.2, children: /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-3xl bg-white/5 border border-white/10", children: [
            /* @__PURE__ */ jsx("div", { className: "text-4xl sm:text-5xl font-black mb-2 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent", children: "500+" }),
            /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: "Projects Delivered" })
          ] }) }),
          /* @__PURE__ */ jsx(FadeInWhenVisible, { delay: 0.3, children: /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-3xl bg-white/5 border border-white/10", children: [
            /* @__PURE__ */ jsx("div", { className: "text-4xl sm:text-5xl font-black mb-2 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent", children: "48hr" }),
            /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: "Average Turnaround" })
          ] }) }),
          /* @__PURE__ */ jsx(FadeInWhenVisible, { delay: 0.4, children: /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-3xl bg-white/5 border border-white/10", children: [
            /* @__PURE__ */ jsx("div", { className: "text-4xl sm:text-5xl font-black mb-2 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent", children: "4.9★" }),
            /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: "Client Rating" })
          ] }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "px-4 sm:px-6 py-16 sm:py-24 bg-white/[0.02]", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto max-w-4xl", children: /* @__PURE__ */ jsx(FadeInWhenVisible, { children: /* @__PURE__ */ jsxs("div", { className: "text-center p-8 sm:p-12 rounded-[2rem] bg-gradient-to-br from-white/10 to-white/5 border border-white/10", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl md:text-5xl font-black mb-4", children: "Ready to Start Your Project?" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-8 max-w-2xl mx-auto text-lg", children: "Get a free consultation and quote within 2 hours. No commitment, no hidden fees. Just honest pricing that helps your business grow." }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center mb-8", children: [
          /* @__PURE__ */ jsx(Button, { size: "lg", asChild: true, className: "bg-foreground text-background hover:bg-muted-foreground font-bold text-lg px-10 py-7 rounded-full", children: /* @__PURE__ */ jsxs(Link, { to: "/contact", children: [
            "Get Free Quote ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-5 w-5" })
          ] }) }),
          /* @__PURE__ */ jsx(Button, { size: "lg", variant: "outline", asChild: true, className: "border-2 border-foreground text-lg px-10 py-7 rounded-full font-bold", children: /* @__PURE__ */ jsxs("a", { href: "tel:+918119811655", children: [
            /* @__PURE__ */ jsx(Phone, { className: "mr-2 h-5 w-5" }),
            " Call Now"
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxs("a", { href: "tel:+918119811655", className: "flex items-center gap-2 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full", children: [
            /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4" }),
            " +91 81198 11655"
          ] }),
          /* @__PURE__ */ jsxs("a", { href: "mailto:hello@whycreatives.in", className: "flex items-center gap-2 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full", children: [
            /* @__PURE__ */ jsx(Mail, { className: "w-4 h-4" }),
            " hello@whycreatives.in"
          ] })
        ] })
      ] }) }) }) }),
      /* @__PURE__ */ jsx("section", { className: "px-4 sm:px-6 py-16 sm:py-24", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto max-w-4xl", children: /* @__PURE__ */ jsx(FadeInWhenVisible, { children: /* @__PURE__ */ jsxs("div", { className: "prose prose-invert max-w-none", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-2xl sm:text-3xl font-black mb-6 text-center", children: [
          "About WhyCreatives in ",
          data.name
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-muted-foreground space-y-4 text-center", children: [
          /* @__PURE__ */ jsxs("p", { children: [
            "WhyCreatives is ",
            data.name,
            "'s premier creative agency, offering world-class video production, web development, digital marketing, and branding services at affordable prices. Based in Guwahati, Assam, we serve businesses across ",
            data.state,
            " and all of India with the same commitment to quality and excellence."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Whether you're a startup looking for your first website, an established business needing video content, or an enterprise requiring comprehensive digital marketing - WhyCreatives delivers premium results without the premium price tag. Our team of experienced professionals understands the unique needs of ",
            data.name,
            " businesses and delivers solutions that drive real results."
          ] }),
          /* @__PURE__ */ jsx("p", { children: "Contact us today for a free consultation and discover why hundreds of businesses across India trust WhyCreatives for their creative needs." })
        ] })
      ] }) }) }) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
export {
  LocationPage as default
};
