import fs from 'fs';

// --- MASIVE LIST OF CITIES WITH STATES ---
const newCities = [
    // UP
    { slug: "ayodhya", state: "Uttar Pradesh" },
    { slug: "mathura", state: "Uttar Pradesh" },
    { slug: "jhansi", state: "Uttar Pradesh" },
    { slug: "prayagraj", state: "Uttar Pradesh" },
    { slug: "bareilly", state: "Uttar Pradesh" },
    { slug: "aligarh", state: "Uttar Pradesh" },
    { slug: "moradabad", state: "Uttar Pradesh" },
    { slug: "saharanpur", state: "Uttar Pradesh" },
    { slug: "gorakhpur", state: "Uttar Pradesh" },
    // Maharashtra
    { slug: "solapur", state: "Maharashtra" },
    { slug: "amravati", state: "Maharashtra" },
    { slug: "kolhapur", state: "Maharashtra" },
    { slug: "navi-mumbai", state: "Maharashtra" },
    { slug: "kalyan", state: "Maharashtra" },
    { slug: "pune", state: "Maharashtra" },
    { slug: "nagpur", state: "Maharashtra" },
    { slug: "nashik", state: "Maharashtra" },
    // Gujarat
    { slug: "junagadh", state: "Gujarat" },
    { slug: "gandhinagar", state: "Gujarat" },
    { slug: "vadodara", state: "Gujarat" },
    { slug: "rajkot", state: "Gujarat" },
    { slug: "surat", state: "Gujarat" },
    { slug: "ahmedabad", state: "Gujarat" },
    // Karnataka
    { slug: "hubli", state: "Karnataka" },
    { slug: "mangalore", state: "Karnataka" },
    { slug: "belgaum", state: "Karnataka" },
    { slug: "davanagere", state: "Karnataka" },
    { slug: "bellary", state: "Karnataka" },
    { slug: "mysore", state: "Karnataka" },
    // Tamil Nadu
    { slug: "vellore", state: "Tamil Nadu" },
    { slug: "erode", state: "Tamil Nadu" },
    { slug: "tiruppur", state: "Tamil Nadu" },
    { slug: "salem", state: "Tamil Nadu" },
    { slug: "tiruchirappalli", state: "Tamil Nadu" },
    { slug: "madurai", state: "Tamil Nadu" },
    { slug: "coimbatore", state: "Tamil Nadu" },
    // Andhra Pradesh
    { slug: "nellore", state: "Andhra Pradesh" },
    { slug: "kurnool", state: "Andhra Pradesh" },
    { slug: "rajahmundry", state: "Andhra Pradesh" },
    { slug: "tirupati", state: "Andhra Pradesh" },
    { slug: "kakinada", state: "Andhra Pradesh" },
    { slug: "guntur", state: "Andhra Pradesh" },
    { slug: "vijayawada", state: "Andhra Pradesh" },
    { slug: "visakhapatnam", state: "Andhra Pradesh" },
    // Telangana
    { slug: "warangal", state: "Telangana" },
    { slug: "nizamabad", state: "Telangana" },
    { slug: "karimnagar", state: "Telangana" },
    { slug: "ramagundam", state: "Telangana" },
    // Kerala
    { slug: "thrissur", state: "Kerala" },
    { slug: "kannur", state: "Kerala" },
    { slug: "kollam", state: "Kerala" },
    { slug: "kozhikode", state: "Kerala" },
    { slug: "kochi", state: "Kerala" },
    { slug: "thiruvananthapuram", state: "Kerala" },
    // MP
    { slug: "sagar", state: "Madhya Pradesh" },
    { slug: "rewa", state: "Madhya Pradesh" },
    { slug: "ujjain", state: "Madhya Pradesh" },
    { slug: "gwalior", state: "Madhya Pradesh" },
    { slug: "jabalpur", state: "Madhya Pradesh" },
    { slug: "bhopal", state: "Madhya Pradesh" },
    { slug: "indore", state: "Madhya Pradesh" },
    // Rajasthan
    { slug: "alwar", state: "Rajasthan" },
    { slug: "bhilwara", state: "Rajasthan" },
    { slug: "udaipur", state: "Rajasthan" },
    { slug: "ajmer", state: "Rajasthan" },
    { slug: "bikaner", state: "Rajasthan" },
    { slug: "kota", state: "Rajasthan" },
    { slug: "jodhpur", state: "Rajasthan" },
    { slug: "jaipur", state: "Rajasthan" },
    // Punjab & Haryana
    { slug: "bathinda", state: "Punjab" },
    { slug: "patiala", state: "Punjab" },
    { slug: "jalandhar", state: "Punjab" },
    { slug: "amritsar", state: "Punjab" },
    { slug: "ludhiana", state: "Punjab" },
    { slug: "panipat", state: "Haryana" },
    { slug: "ambala", state: "Haryana" },
    { slug: "rohtak", state: "Haryana" },
    { slug: "karnal", state: "Haryana" },
    { slug: "gurgaon", state: "Haryana" },
    { slug: "faridabad", state: "Haryana" },
    // Bihar & Jharkhand
    { slug: "purnia", state: "Bihar" },
    { slug: "darbhanga", state: "Bihar" },
    { slug: "muzaffarpur", state: "Bihar" },
    { slug: "bhagalpur", state: "Bihar" },
    { slug: "gaya", state: "Bihar" },
    { slug: "patna", state: "Bihar" },
    { slug: "deoghar", state: "Jharkhand" },
    { slug: "bokaro", state: "Jharkhand" },
    { slug: "dhanbad", state: "Jharkhand" },
    { slug: "jamshedpur", state: "Jharkhand" },
    { slug: "ranchi", state: "Jharkhand" },
    // Bengal & Odisha & CG
    { slug: "bardhaman", state: "West Bengal" },
    { slug: "malda", state: "West Bengal" },
    { slug: "baharampur", state: "West Bengal" },
    { slug: "durgapur", state: "West Bengal" },
    { slug: "siliguri", state: "West Bengal" },
    { slug: "asansol", state: "West Bengal" },
    { slug: "kolkata", state: "West Bengal" },
    { slug: "brahmapur", state: "Odisha" },
    { slug: "sambalpur", state: "Odisha" },
    { slug: "puri", state: "Odisha" },
    { slug: "rourkela", state: "Odisha" },
    { slug: "cuttack", state: "Odisha" },
    { slug: "bhubaneswar", state: "Odisha" },
    { slug: "korba", state: "Chhattisgarh" },
    { slug: "bilaspur", state: "Chhattisgarh" },
    { slug: "bhilai", state: "Chhattisgarh" },
    { slug: "raipur", state: "Chhattisgarh" },
    // North
    { slug: "roorkee", state: "Uttarakhand" },
    { slug: "haldwani", state: "Uttarakhand" },
    { slug: "haridwar", state: "Uttarakhand" },
    { slug: "dehradun", state: "Uttarakhand" },
    { slug: "jammu", state: "Jammu and Kashmir" },
    { slug: "srinagar", state: "Jammu and Kashmir" },
    // Extra Northeast
    { slug: "bongaigaon", state: "Assam" },
    { slug: "diphu", state: "Assam" },
    { slug: "dhubri", state: "Assam" }
];

// --- MASSIVE LIST OF SERVICES ---
const newServices = [
    "youtube-video-editing",
    "instagram-reels-editing",
    "ecommerce-website-development",
    "real-estate-marketing-agency",
    "healthcare-digital-marketing",
    "restaurant-marketing-agency",
    "startup-pitch-deck-design",
    "corporate-video-production",
    "local-seo-services-india",
    "cheap-logo-design-india",
    "saas-web-design",
    "shopify-store-development",
    "wedding-video-editing-company",
    "social-media-management-agency",
    "b2b-lead-generation-agency",
    "creative-agency-for-startups"
];

// Helper to update XML
function appendToXml(filePath, items, generatorFn) {
    let xml = fs.readFileSync(filePath, 'utf8');
    let addedCount = 0;

    // Find </urlset>
    const insertIndex = xml.lastIndexOf('</urlset>');
    if (insertIndex === -1) {
        console.error("Could not find </urlset> in " + filePath);
        return;
    }

    let injection = "";
    for (const item of items) {
        const slug = typeof item === 'string' ? item : item.slug;
        if (!xml.includes("/" + slug + "</loc>")) {
            injection += generatorFn(item);
            addedCount++;
        }
    }

    if (addedCount > 0) {
        const newXml = xml.slice(0, insertIndex) + injection + "\n</urlset>";
        fs.writeFileSync(filePath, newXml);
        console.log(`Added ${addedCount} new links to ${filePath}`);
    } else {
        console.log(`No new links needed for ${filePath}`);
    }
}

// 1. Update sitemap-locations.xml
appendToXml('public/sitemap-locations.xml', newCities, (city) => {
    return `\n  <url><loc>https://whycreatives.in/${city.slug}</loc><lastmod>2026-03-04</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`;
});

// 2. Update sitemap-services.xml
appendToXml('public/sitemap-services.xml', newServices, (serviceSlug) => {
    return `\n  <url><loc>https://whycreatives.in/services/${serviceSlug}</loc><lastmod>2026-03-04</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`;
});

// 3. Inject explicit state parsing into seoLocations.ts auto-fallback to actually use the states!
// We will generate a quick dictionary string and inject it into the file globally so `getLocationData` has access to it.

let seoLocContents = fs.readFileSync('src/data/seoLocations.ts', 'utf8');

const stateMapCode = `
// Auto-injected state mappings for Tier 2/3 cities
const autoCityStates: Record<string, string> = {
${newCities.map(c => `  "${c.slug}": "${c.state}"`).join(',\n')}
};
`;

if (!seoLocContents.includes('autoCityStates: Record')) {
    // Inject the map near the top
    seoLocContents = seoLocContents.replace('export const misspellingRedirects:', stateMapCode + '\nexport const misspellingRedirects:');

    // Update the fallback logic in getLocationData
    seoLocContents = seoLocContents.replace(
        'state: isBrand ? "India" : "India",',
        'state: isBrand ? "India" : (autoCityStates[slug] || "India"),'
    );

    fs.writeFileSync('src/data/seoLocations.ts', seoLocContents);
    console.log('Updated seoLocations.ts with Auto State Mappings');
}

// 4. Update the main sitemap.xml to bump its lastmod (just rewrite it)
const today = new Date().toISOString().split('T')[0];
const mainSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- WhyCreatives - Global Sitemap Index - Updated: ${today} -->
  <sitemap>
    <loc>https://whycreatives.in/sitemap-pages.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://whycreatives.in/sitemap-services.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://whycreatives.in/sitemap-locations.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://whycreatives.in/sitemap-blog.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>
`;
fs.writeFileSync('public/sitemap.xml', mainSitemap);
console.log('Updated main sitemap.xml');
