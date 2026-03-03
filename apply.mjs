import fs from 'fs';

let content = fs.readFileSync('src/data/seoLocations.ts', 'utf8');

const targetStr = `// Helper function to get location data
export function getLocationData(slug: string): LocationSEO | null {
  // Check for misspelling redirect
  const correctedSlug = misspellingRedirects[slug.toLowerCase()];
  if (correctedSlug && locationSEOData[correctedSlug]) {
    return locationSEOData[correctedSlug];
  }
  
  // Direct lookup
  if (locationSEOData[slug]) {
    return locationSEOData[slug];
  }
  
  return null;
}`;

const replaceStr = `// Helper function to get location data
export function getLocationData(slug: string): LocationSEO | null {
  // Check for misspelling redirect
  const correctedSlug = misspellingRedirects[slug.toLowerCase()];
  if (correctedSlug && locationSEOData[correctedSlug]) {
    return locationSEOData[correctedSlug];
  }
  
  // Direct lookup
  if (locationSEOData[slug]) {
    return locationSEOData[slug];
  }

  // Auto-generate for slugs in validLocationSlugs that don't have hardcoded data
  if (validLocationSlugs.includes(slug)) {
    const formattedName = slug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
      
    // Categorize generic vs specific
    const isBrand = slug.includes('creative') || slug.includes('ycreative');
    const name = isBrand ? "India" : formattedName;

    return {
      slug,
      name,
      state: isBrand ? "India" : "India",
      region: "India",
      description: \`WhyCreatives serves businesses in \${name} with highly affordable, premium creative services. From video editing to web development, we deliver excellence across all digital marketing channels.\`,
      tagline: isBrand ? \`Your Creative Partner\` : \`Creative Excellence for \${formattedName}\`,
      highlights: ["Professional quality", "Quick turnaround", "Affordable pricing", "100% Satisfaction"],
      keywords: [\`video editing \${name}\`, \`web design \${name}\`, \`digital marketing \${name}\`, \`creative agency \${name}\`, \`affordable agency \${name}\`],
      misspellings: [],
      nearbyAreas: [],
      priority: 0.8
    };
  }
  
  return null;
}`;

// Normalize line endings for replacement to work flawlessly
content = content.replace(/\r\n/g, '\n').replace(targetStr.replace(/\r\n/g, '\n'), replaceStr);

fs.writeFileSync('src/data/seoLocations.ts', content);
console.log('Function Replaced!');
