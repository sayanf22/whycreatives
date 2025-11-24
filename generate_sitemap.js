// FS not needed for stdout


const services = [
    "creative-agency",
    "video-editing",
    "web-design",
    "digital-marketing",
    "branding",
    "social-media"
];

const cities = [
    "mumbai", "delhi", "bangalore", "hyderabad", "ahmedabad", "chennai", "kolkata", "surat", "pune", "jaipur",
    "lucknow", "kanpur", "nagpur", "indore", "thane", "bhopal", "visakhapatnam", "pimpri-chinchwad", "patna", "vadodara",
    "ghaziabad", "ludhiana", "agra", "nashik", "faridabad", "meerut", "rajkot", "kalyan-dombivli", "vasai-virar", "varanasi",
    "srinagar", "aurangabad", "dhanbad", "amritsar", "navi-mumbai", "allahabad", "howrah", "ranchi", "gwalior", "jabalpur",
    "coimbatore", "vijayawada", "jodhpur", "madurai", "raipur", "kota", "guwahati", "chandigarh", "solapur", "hubballi-dharwad",
    "agartala", "shillong", "aizawl", "imphal", "kohima", "gangtok", "itanagar", "dimapur", "silchar", "dibrugarh"
];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

// Add home page
xml += `  <url>
    <loc>https://whycreatives.in/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
`;

// Generate URLs
cities.forEach(city => {
    services.forEach(service => {
        xml += `  <url>
    <loc>https://whycreatives.in/${service}-${city}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
    });
});

xml += `</urlset>`;

console.log(xml);
