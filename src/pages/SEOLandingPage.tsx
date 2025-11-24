import { useParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { TrustedBy } from "@/components/TrustedBy";
import { ServicesBento } from "@/components/ServicesBento";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { CTA } from "@/components/CTA";
import { GooeySection } from "@/components/GooeySection";
import { Footer } from "@/components/Footer";
import { useEffect, useState } from "react";
import NotFound from "./NotFound";

const SEOLandingPage = () => {
    const { slug } = useParams();
    const [isValid, setIsValid] = useState(true);
    const [parsedData, setParsedData] = useState<{ service: string; city: string } | null>(null);

    useEffect(() => {
        if (!slug) return;

        const patterns = [
            { prefix: "creative-agency-", service: "Creative Agency" },
            { prefix: "video-editing-", service: "Video Editing" },
            { prefix: "video-production-", service: "Video Production" },
            { prefix: "web-design-", service: "Web Design" },
            { prefix: "web-development-", service: "Web Development" },
            { prefix: "digital-marketing-", service: "Digital Marketing" },
            { prefix: "branding-", service: "Branding" },
            { prefix: "social-media-", service: "Social Media" },
        ];

        const match = patterns.find(p => slug.startsWith(p.prefix));

        if (match) {
            const citySlug = slug.replace(match.prefix, "");
            if (citySlug.length > 0) {
                setParsedData({
                    service: match.service,
                    city: citySlug
                });
                setIsValid(true);
            } else {
                setIsValid(false);
            }
        } else {
            // Check for generic "service-in-city" pattern if needed, or just fail
            setIsValid(false);
        }
    }, [slug]);

    // Update meta tags
    useEffect(() => {
        if (!parsedData) return;

        const { service, city } = parsedData;

        // Format city name (e.g., "mumbai" -> "Mumbai", "new-delhi" -> "New Delhi")
        const formatName = (str: string) => {
            return str
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
        };

        const formattedCity = formatName(city);
        const formattedService = service;

        document.title = `${formattedService} in ${formattedCity} | WhyCreatives`;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute("content", `Best ${formattedService} in ${formattedCity}. Professional services at 90% less cost. Trusted by businesses in ${formattedCity}.`);
        }
    }, [parsedData]);

    // Inject LocalBusiness Schema for Agartala/Tripura
    useEffect(() => {
        if (!parsedData) return;
        const { city } = parsedData;

        if (["agartala", "tripura"].includes(city)) {
            const schema = {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "name": "WhyCreatives",
                "image": "https://whycreatives.in/logo.png",
                "@id": "https://whycreatives.in",
                "url": "https://whycreatives.in",
                "telephone": "+917005625989",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Agartala",
                    "addressLocality": "Agartala",
                    "addressRegion": "TR",
                    "postalCode": "799001",
                    "addressCountry": "IN"
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 23.8315,
                    "longitude": 91.2868
                },
                "openingHoursSpecification": {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": [
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday"
                    ],
                    "opens": "09:00",
                    "closes": "20:00"
                }
            };

            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.text = JSON.stringify(schema);
            document.head.appendChild(script);

            return () => {
                document.head.removeChild(script);
            };
        }
    }, [parsedData]);

    if (!isValid) {
        return <NotFound />;
    }

    if (!parsedData) {
        return null; // Loading state
    }

    const { service, city } = parsedData;

    // Format city name (e.g., "mumbai" -> "Mumbai", "new-delhi" -> "New Delhi")
    const formatName = (str: string) => {
        return str
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    const formattedCity = formatName(city);
    const formattedService = service;

    // Dynamic content generation
    const getTitle = () => {
        const isLocal = ["tripura", "agartala", "northeast-india"].includes(city);

        if (isLocal) {
            return (
                <>
                    Leading {formattedService}
                    <br />
                    in {formattedCity}
                    <br />
                    <span className="text-muted-foreground">Local Experts • Global Quality</span>
                </>
            );
        }

        if (service !== "Creative Agency") {
            return (
                <>
                    Best {formattedService}
                    <br />
                    in {formattedCity}
                    <br />
                    <span className="text-muted-foreground">at 90% Less</span>
                </>
            );
        }
        return (
            <>
                Top Creative
                <br />
                Agency in {formattedCity}
                <br />
                <span className="text-muted-foreground">at 90% Less</span>
            </>
        );
    };

    const getSubtitle = () => {
        const isLocal = ["tripura", "agartala", "northeast-india"].includes(city);

        if (isLocal) {
            return `Based in Agartala, serving the entire Northeast. We provide premium ${formattedService.toLowerCase()} services for local businesses and startups.`;
        }

        if (service !== "Creative Agency") {
            return `Looking for affordable ${formattedService.toLowerCase()} in ${formattedCity}? We deliver premium quality at unbeatable prices.`;
        }
        return `The most affordable creative agency in ${formattedCity}. Video editing, web design, and digital marketing services for local businesses.`;
    };

    return (
        <div className="min-h-screen bg-background">
            <Navigation />
            <Hero
                title={getTitle()}
                subtitle={getSubtitle()}
            />
            <TrustedBy />
            <ServicesBento />
            <WhyChooseUs />
            <HowItWorks />
            <Testimonials />
            <CTA />
            <GooeySection />
            <Footer />
        </div>
    );
};

export default SEOLandingPage;
