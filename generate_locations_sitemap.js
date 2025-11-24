const locations = [
    { name: "Tripura", slug: "tripura", priority: "1.0" },
    { name: "Agartala", slug: "agartala", priority: "1.0" },
    { name: "Northeast India", slug: "northeast-india", priority: "0.9" },
    { name: "Assam", slug: "assam", priority: "0.8" },
    { name: "Guwahati", slug: "guwahati", priority: "0.8" },
    { name: "Meghalaya", slug: "meghalaya", priority: "0.7" },
    { name: "Manipur", slug: "manipur", priority: "0.7" },
    { name: "Mizoram", slug: "mizoram", priority: "0.7" },
    { name: "Nagaland", slug: "nagaland", priority: "0.7" },
    { name: "Arunachal Pradesh", slug: "arunachal-pradesh", priority: "0.7" },
    { name: "Sikkim", slug: "sikkim", priority: "0.7" },
    { name: "Siliguri", slug: "siliguri", priority: "0.6" }
];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

locations.forEach(loc => {
    xml += `  <url>
    <loc>https://whycreatives.in/creative-agency-${loc.slug}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${loc.priority}</priority>
  </url>
`;
});

xml += `</urlset>`;

console.log(xml);
