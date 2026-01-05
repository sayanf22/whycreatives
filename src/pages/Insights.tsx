import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { Clock, ArrowRight, Sparkles, BookOpen, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

interface Article {
  id: string;
  title: string;
  slug: string;
  meta_description: string;
  tags: string[] | null;
  category: string | null;
  author: string | null;
  read_time: number | null;
  published_at: string | null;
  is_featured: boolean | null;
}

const Insights = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const { data, error: err } = await supabase
          .from("insights")
          .select("*")
          .eq("is_published", true)
          .order("published_at", { ascending: false });

        if (err) {
          setError(err.message);
        } else {
          setArticles(data || []);
        }
      } catch (e) {
        setError("Failed to load articles");
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const formatDate = (date: string | null) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const featuredArticle = articles[0];
  const otherArticles = articles.slice(1);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Helmet>
        <title>Insights & Resources | WhyCreatives - Marketing Tips & Strategies</title>
        <meta name="description" content="Expert insights on digital marketing, SEO, video production, and creative strategies for Indian businesses." />
        <link rel="canonical" href="https://whycreatives.in/insights" />
      </Helmet>

      <Navigation />

      <main className="pt-28 pb-24">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full mb-6 border border-white/10">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-white/70">Fresh insights every week</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight">
              Insights &{" "}
              <span className="text-white/60">
                Resources
              </span>
            </h1>
            
            <p className="text-xl text-white/60 leading-relaxed max-w-2xl mx-auto">
              Expert perspectives on digital marketing, creative strategies, and business growth for Indian businesses.
            </p>
          </motion.div>
        </section>

        {/* Loading State */}
        {loading && (
          <section className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              <div className="bg-white/5 rounded-3xl p-8 animate-pulse h-[400px]" />
              <div className="space-y-6">
                {[1, 2].map((i) => (
                  <div key={i} className="bg-white/5 rounded-2xl p-6 animate-pulse h-[180px]" />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Error State */}
        {error && !loading && (
          <section className="max-w-2xl mx-auto px-6 text-center py-20">
            <BookOpen className="w-16 h-16 text-white/20 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">Unable to Load Articles</h2>
            <p className="text-white/60 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-white/90 transition-colors"
            >
              Try Again
            </button>
          </section>
        )}

        {/* Articles */}
        {!loading && !error && articles.length > 0 && (
          <>
            {/* Featured + Recent Grid */}
            <section className="max-w-6xl mx-auto px-6 mb-16">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Featured Article */}
                {featuredArticle && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Link
                      to={`/insights/${featuredArticle.slug}`}
                      className="group block h-full bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-semibold">
                          <TrendingUp className="w-3 h-3" />
                          Featured
                        </span>
                        <span className="text-xs text-white/40 uppercase tracking-wider">
                          {featuredArticle.category}
                        </span>
                      </div>
                      
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight group-hover:text-white/90 transition-colors">
                        {featuredArticle.title}
                      </h2>
                      
                      <p className="text-white/60 mb-6 leading-relaxed line-clamp-3">
                        {featuredArticle.meta_description}
                      </p>
                      
                      <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/10">
                        <div className="flex items-center gap-4 text-sm text-white/40">
                          <span>{formatDate(featuredArticle.published_at)}</span>
                          {featuredArticle.read_time && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {featuredArticle.read_time} min
                            </span>
                          )}
                        </div>
                        <span className="flex items-center gap-2 text-white font-medium group-hover:gap-3 transition-all">
                          Read <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                )}

                {/* Recent Articles Stack */}
                <div className="space-y-6">
                  {otherArticles.slice(0, 2).map((article, i) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                    >
                      <Link
                        to={`/insights/${article.slug}`}
                        className="group block bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs text-white/40 uppercase tracking-wider">
                            {article.category}
                          </span>
                          <span className="text-white/20">•</span>
                          <span className="text-xs text-white/40">
                            {formatDate(article.published_at)}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white/90 transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        
                        <p className="text-white/50 text-sm mb-4 line-clamp-2">
                          {article.meta_description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          {article.read_time && (
                            <span className="text-xs text-white/40 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {article.read_time} min read
                            </span>
                          )}
                          <span className="text-sm text-white/60 flex items-center gap-1 group-hover:text-white group-hover:gap-2 transition-all">
                            Read more <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* All Articles Grid */}
            {otherArticles.length > 2 && (
              <section className="max-w-6xl mx-auto px-6">
                <h2 className="text-2xl font-bold text-white mb-8">More Articles</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {otherArticles.slice(2).map((article, i) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                    >
                      <Link
                        to={`/insights/${article.slug}`}
                        className="group block h-full bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300"
                      >
                        <span className="text-xs text-white/40 uppercase tracking-wider">
                          {article.category}
                        </span>
                        
                        <h3 className="text-lg font-bold text-white mt-3 mb-2 group-hover:text-white/90 transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        
                        <p className="text-white/50 text-sm mb-4 line-clamp-2">
                          {article.meta_description}
                        </p>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                          <span className="text-xs text-white/40">
                            {formatDate(article.published_at)}
                          </span>
                          <span className="text-sm text-white/60 flex items-center gap-1 group-hover:text-white transition-colors">
                            Read <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Newsletter CTA */}
            <section className="max-w-4xl mx-auto px-6 mt-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative overflow-hidden rounded-3xl bg-white/5 p-10 md:p-14 border border-white/10"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.03),transparent_50%)]" />
                <div className="relative text-center">
                  <Sparkles className="w-10 h-10 text-white/40 mx-auto mb-4" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Need Expert Creative Services?
                  </h2>
                  <p className="text-white/60 mb-8 max-w-xl mx-auto text-lg">
                    From video production to web design, we help Indian businesses grow with affordable, high-quality creative solutions.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-white/90 transition-all hover:scale-105"
                    >
                      Get Free Quote <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link
                      to="/what-we-do"
                      className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all border border-white/20"
                    >
                      View Services
                    </Link>
                  </div>
                </div>
              </motion.div>
            </section>
          </>
        )}

        {/* Empty State */}
        {!loading && !error && articles.length === 0 && (
          <section className="max-w-2xl mx-auto px-6 text-center py-20">
            <BookOpen className="w-20 h-20 text-white/10 mx-auto mb-8" />
            <h2 className="text-3xl font-bold text-white mb-4">Coming Soon</h2>
            <p className="text-white/60 mb-8 text-lg">
              We are crafting valuable insights on marketing, design, and business growth. Check back soon!
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-white/90 transition-colors"
            >
              Get in Touch
            </Link>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Insights;
