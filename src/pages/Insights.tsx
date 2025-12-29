import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { Clock, ArrowRight, Sparkles, Lightbulb } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Insights | WhyCreatives</title>
        <meta name="description" content="Expert insights on digital marketing and creative strategies." />
      </Helmet>

      <Navigation />

      <main className="pt-28 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-white/80">Fresh insights weekly</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
              Insights and Resources
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Expert perspectives on digital marketing, creative strategies, and business growth.
            </p>
          </motion.div>

          {loading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white/5 rounded-2xl p-6 animate-pulse">
                  <div className="h-4 bg-white/10 rounded w-20 mb-4"></div>
                  <div className="h-6 bg-white/10 rounded w-full mb-2"></div>
                  <div className="h-4 bg-white/10 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          )}

          {error && !loading && (
            <div className="text-center py-20">
              <Lightbulb className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">Error Loading Articles</h2>
              <p className="text-white/60 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-white text-black px-6 py-2 rounded-full font-bold"
              >
                Retry
              </button>
            </div>
          )}

          {!loading && !error && articles.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={"/insights/" + article.slug}
                    className="block bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all h-full"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs text-white/50 uppercase">
                        {article.category || "Insights"}
                      </span>
                      <span className="text-xs text-white/40">
                        {formatDate(article.published_at)}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-white mb-2 line-clamp-2">
                      {article.title}
                    </h2>
                    <p className="text-white/60 text-sm mb-4 line-clamp-2">
                      {article.meta_description}
                    </p>
                    <div className="flex justify-between items-center pt-3 border-t border-white/10">
                      {article.read_time && (
                        <span className="text-xs text-white/40 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.read_time} min
                        </span>
                      )}
                      <span className="text-sm text-white flex items-center gap-1">
                        Read <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && !error && articles.length === 0 && (
            <div className="text-center py-20">
              <Lightbulb className="w-16 h-16 text-white/20 mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
              <p className="text-white/60 mb-6">
                We are working on valuable content. Check back soon!
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold"
              >
                Get in Touch
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Insights;
