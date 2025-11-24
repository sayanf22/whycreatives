const staticPages = [
    "what-we-do",
    "our-work",
    "portfolio-gallery",
    "pricing-comparison",
    "about-us",
    "people",
    "join-us",
    "contact",
    "insights"
];

const servicePages = [
    "creative-agency-india",
    "video-production-india",
    "web-development-india",
    "digital-marketing-india",
    "branding-india",
    "creative-agency-agartala",
    "creative-agency-tripura",
    "creative-agency-northeast-india"
];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

staticPages.forEach(page => {
    xml += `  <url>
    <loc>https://whycreatives.in/${page}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
});

servicePages.forEach(page => {
    xml += `  <url>
    <loc>https://whycreatives.in/${page}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
`;
});

xml += `</urlset>`;

console.log(xml);
