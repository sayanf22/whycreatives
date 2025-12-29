import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  ogType?: string;
  keywords?: string;
  schema?: object | object[];
  noindex?: boolean;
}

export const SEOHead = ({
  title,
  description,
  canonical,
  ogImage = 'https://whycreatives.in/logo.png',
  ogType = 'website',
  keywords,
  schema,
  noindex = false,
}: SEOHeadProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper to update or create meta tag
    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Helper to update or create link tag
    const setLink = (rel: string, href: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    // Set meta tags
    setMeta('description', description);
    setMeta('robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');
    
    if (keywords) {
      setMeta('keywords', keywords);
    }

    // Open Graph
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:url', canonical, true);
    setMeta('og:image', ogImage, true);
    setMeta('og:type', ogType, true);
    setMeta('og:site_name', 'WhyCreatives', true);
    setMeta('og:locale', 'en_IN', true);

    // Twitter
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', ogImage);
    setMeta('twitter:site', '@why_creatives');

    // Canonical
    setLink('canonical', canonical);

    // Schema markup
    if (schema) {
      // Remove existing schema
      const existingSchema = document.querySelector('script[data-seo-schema]');
      if (existingSchema) {
        existingSchema.remove();
      }

      // Add new schema
      const schemaScript = document.createElement('script');
      schemaScript.type = 'application/ld+json';
      schemaScript.setAttribute('data-seo-schema', 'true');
      schemaScript.textContent = JSON.stringify(schema);
      document.head.appendChild(schemaScript);
    }

    // Cleanup on unmount
    return () => {
      const schemaScript = document.querySelector('script[data-seo-schema]');
      if (schemaScript) {
        schemaScript.remove();
      }
    };
  }, [title, description, canonical, ogImage, ogType, keywords, schema, noindex]);

  return null;
};

// Pre-built schema generators
export const generateBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const generateServiceSchema = (
  name: string,
  description: string,
  price: string,
  url: string
) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${url}#service`,
  name,
  description,
  provider: {
    '@id': 'https://whycreatives.in/#organization',
  },
  areaServed: {
    '@type': 'Country',
    name: 'India',
  },
  offers: {
    '@type': 'Offer',
    price,
    priceCurrency: 'INR',
    priceValidUntil: '2026-12-31',
    availability: 'https://schema.org/InStock',
  },
});

export const generateLocalBusinessSchema = (city: string, coords?: { lat: number; lng: number }) => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `https://whycreatives.in/${city.toLowerCase()}#localbusiness`,
  name: `WhyCreatives - Creative Agency ${city}`,
  image: 'https://whycreatives.in/logo.png',
  url: `https://whycreatives.in/${city.toLowerCase()}`,
  telephone: '+918119811655',
  email: 'hello@whycreatives.in',
  priceRange: '₹₹',
  address: {
    '@type': 'PostalAddress',
    addressLocality: city,
    addressCountry: 'IN',
  },
  ...(coords && {
    geo: {
      '@type': 'GeoCoordinates',
      latitude: coords.lat,
      longitude: coords.lng,
    },
  }),
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '10:00',
      closes: '16:00',
    },
  ],
});

export const generateFAQSchema = (faqs: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});
