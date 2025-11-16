import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { useState, useMemo } from "react";
import { usePortfolioWorksByCategory, getStorageUrl } from "@/hooks/use-portfolio-works";

const PortfolioGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { data: portfolioItems, isLoading } = usePortfolioWorksByCategory(selectedCategory);

  // Get unique categories from the data
  const categories = useMemo(() => {
    if (!portfolioItems) return ["All"];
    const uniqueCategories = Array.from(new Set(portfolioItems.map(item => item.category)));
    return ["All", ...uniqueCategories];
  }, [portfolioItems]);

  const filteredItems = portfolioItems || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-32 pb-24 px-4 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-white/20"></div>
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-white border-r-white animate-spin"></div>
              <div 
                className="absolute inset-2 rounded-full border-4 border-transparent border-b-white/60 border-l-white/60"
                style={{ animation: 'spin 1.5s linear infinite reverse' }}
              ></div>
            </div>
            <h2 className="text-2xl font-bold mb-2 animate-pulse">Loading Gallery</h2>
            <p className="text-muted-foreground animate-pulse">Fetching portfolio items...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-32 pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          <FadeInWhenVisible>
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-7xl font-bold mb-6">Portfolio Gallery</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
                Browse through our complete collection of creative work
              </p>

              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-3 mb-16">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full border-2 transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-white text-black border-white"
                      : "bg-transparent text-white border-white/20 hover:border-white/50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          </FadeInWhenVisible>

          {/* Gallery Grid */}
          <FadeInWhenVisible delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-lg border border-white/10 bg-card hover:border-white/30 transition-all duration-300 cursor-pointer aspect-[4/3]"
              >
                <img
                  src={getStorageUrl(item.image_url)}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-sm text-white/70 mb-2">{item.category}</p>
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    <p className="text-sm text-white/60 mt-1">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground">No projects found in this category</p>
              </div>
            )}
          </FadeInWhenVisible>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PortfolioGallery;
