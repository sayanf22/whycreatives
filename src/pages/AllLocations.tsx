import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { validLocationSlugs } from "@/data/seoLocations";
import { MapPin } from "lucide-react";

const AllLocations = () => {
    // Sort locations alphabetically
    const sortedLocations = [...validLocationSlugs].sort().map(slug => {
        // Format slug to Title Case
        const name = slug
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        return { slug, name };
    });

    return (
        <div className="min-h-screen bg-background">
            <Helmet>
                <title>Areas We Serve | Best Creative Agency Across India - WhyCreatives</title>
                <meta name="description" content="WhyCreatives provides top-tier video editing, web design, and digital marketing services to 250+ cities across India. Find your local creative partner today." />
                <link rel="canonical" href="https://whycreatives.in/areas-we-serve" />
            </Helmet>

            <Navigation />

            <main className="pt-32 pb-24 px-4 sm:px-6">
                <div className="container mx-auto max-w-7xl">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
                            Areas We Serve
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Delivering world-class creative services to businesses across India. Find your city below and let's start creating.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {sortedLocations.map((loc) => (
                            <Link
                                key={loc.slug}
                                to={`/${loc.slug}`}
                                className="flex items-center gap-2 p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors group"
                            >
                                <MapPin className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors truncate">
                                    {loc.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AllLocations;
