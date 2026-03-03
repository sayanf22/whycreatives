const fs = require('fs');

// Read Sitemaps
const locsXml = fs.readFileSync('public/sitemap-locations.xml', 'utf8');
const locUrls = locsXml.match(/<loc>https:\/\/whycreatives.in\/([^<]+)<\/loc>/g)
    .map(u => u.replace('<loc>https://whycreatives.in/', '').replace('</loc>', ''));

// Add some from services too
const srvXml = fs.readFileSync('public/sitemap-services.xml', 'utf8');
// We extract the ones that don't have '#', e.g. services/affordable-video-editing
// Also extract the misspellings at the root like /whycreative
const srvUrls = srvXml.match(/<loc>https:\/\/whycreatives.in\/([^<#]+)<\/loc>/g)
    .map(u => u.replace('<loc>https://whycreatives.in/', '').replace('</loc>', ''))
    .filter(u => u !== 'what-we-do' && u !== 'our-work' && u !== 'pricing-comparison' && u !== 'portfolio-gallery');

const allUrls = [...new Set([...locUrls, ...srvUrls])];

let content = fs.readFileSync('src/data/seoLocations.ts', 'utf8');

// Replace the validLocationSlugs array
const slugString = JSON.stringify(allUrls, null, 2);
content = content.replace(/export const validLocationSlugs: string\[\] = \[[\s\S]*?\];/, `export const validLocationSlugs: string[] = ${slugString};`);

fs.writeFileSync('src/data/seoLocations.ts', content);
console.log('Successfully updated validLocationSlugs with ' + allUrls.length + ' locations!');
