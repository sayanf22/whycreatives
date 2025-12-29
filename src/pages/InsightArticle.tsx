import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { Link, useParams, Navigate } from "react-router-dom";
import { Clock, ArrowLeft, Tag, User, Calendar, Share2, BookOpen } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface InsightFull {
  id: string;
  title: string;
  slug: string;
  meta_description: string;
  content_markdown: string;
  tags: string[] | null;
  category: string | null;
  author: string | null;
  read_time: number | null;
  published_at: string | null;
}

const InsightArticle = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: insight, isLoading, error } = useQuery({
    queryKey: ["insight", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("insights")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .single();
      if (error) throw error;
      return data as InsightFull;
    },
    enabled: !!slug,
  });

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleShare = async () => {
    if (navigator.share && insight) {
      try {
        await navigator.share({
          title: insight.title,
          text: insight.meta_description,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-32 pb-24 px-6">
          <div className="container mx-auto max-w-3xl">
            <div className="animate-pulse space-y-6">
              <div className="h-4 bg-white/5 rounded w-32"></div>
              <div className="h-12 bg-white/5 rounded w-full"></div>
              <div className="h-12 bg-white/5 rounded w-3/4"></div>
              <div className="flex gap-4">
                <div className="h-4 bg-white/5 rounded w-24"></div>
                <div className="h-4 bg-white/5 rounded w-24"></div>
                <div className="h-4 bg-white/5 rounded w-24"></div>
              </div>
              <div className="h-px bg-white/10 my-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-white/5 rounded w-full"></div>
                <div className="h-4 bg-white/5 rounded w-full"></div>
                <div className="h-4 bg-white/5 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !insight) {
    return <Navigate to="/insights" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{insight.title} | WhyCreatives Insights</title>
        <meta name="description" content={insight.meta_description} />
        <link rel="canonical" href={`https://whycreatives.in/insights/${insight.slug}`} />
        <meta property="og:title" content={insight.title} />
        <meta property="og:description" content={insight.meta_description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://whycreatives.in/insights/${insight.slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={insight.title} />
        <meta name="twitter:description" content={insight.meta_description} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: insight.title,
            description: insight.meta_description,
            author: {
              "@type": "Organization",
              name: insight.author || "WhyCreatives",
            },
            publisher: {
              "@type": "Organization",
              name: "WhyCreatives",
              url: "https://whycreatives.in",
            },
            datePublished: insight.published_at,
            mainEntityOfPage: `https://whycreatives.in/insights/${insight.slug}`,
          })}
        </script>
      </Helmet>

      <Navigation />

      <main className="pt-28 pb-24 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Back Link */}
          <FadeInWhenVisible>
            <Link
              to="/insights"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Insights
            </Link>
          </FadeInWhenVisible>

          <article>
            {/* Header */}
            <FadeInWhenVisible delay={0.1}>
              <header className="mb-12">
                {/* Category Badge */}
                {insight.category && (
                  <div className="mb-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium bg-white/10 rounded-full text-white/70 uppercase tracking-wider">
                      <BookOpen className="w-3 h-3" />
                      {insight.category}
                    </span>
                  </div>
                )}

                {/* Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
                  {insight.title}
                </h1>

                {/* Meta Description */}
                <p className="text-lg text-white/60 mb-6 leading-relaxed">
                  {insight.meta_description}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-white/50 mb-6 pb-6 border-b border-white/10">
                  {insight.author && (
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {insight.author}
                    </span>
                  )}
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {formatDate(insight.published_at)}
                  </span>
                  {insight.read_time && (
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {insight.read_time} min read
                    </span>
                  )}
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 hover:text-white transition-colors ml-auto"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>

                {/* Tags */}
                {insight.tags && insight.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {insight.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-3 py-1 text-xs bg-white/5 rounded-full text-white/50 border border-white/10"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </header>
            </FadeInWhenVisible>

            {/* Content */}
            <FadeInWhenVisible delay={0.2}>
              <div
                className="prose prose-invert prose-lg max-w-none
                  prose-headings:font-bold prose-headings:text-white
                  prose-h1:text-3xl prose-h1:mt-12 prose-h1:mb-6
                  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-white/10
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-white/90
                  prose-p:text-white/70 prose-p:leading-relaxed prose-p:mb-5
                  prose-li:text-white/70 prose-li:my-1
                  prose-strong:text-white prose-strong:font-semibold
                  prose-a:text-white prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-white/80
                  prose-ul:my-6 prose-ul:pl-6
                  prose-ol:my-6 prose-ol:pl-6
                  prose-blockquote:border-l-4 prose-blockquote:border-white/30 prose-blockquote:pl-6 prose-blockquote:py-2 prose-blockquote:my-6 prose-blockquote:bg-white/5 prose-blockquote:rounded-r-lg prose-blockquote:italic prose-blockquote:text-white/60
                  prose-code:bg-white/10 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:text-white/80
                  prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl
                  prose-table:my-8
                  prose-th:bg-white/10 prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-semibold prose-th:text-white prose-th:border-b prose-th:border-white/20
                  prose-td:px-4 prose-td:py-3 prose-td:border-b prose-td:border-white/10 prose-td:text-white/70
                  prose-hr:border-white/10 prose-hr:my-10
                  prose-img:rounded-xl prose-img:my-8"
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    a: ({ href, children }) => {
                      // Handle internal links
                      if (href?.startsWith("/")) {
                        return (
                          <Link to={href} className="text-white underline underline-offset-4 hover:text-white/80">
                            {children}
                          </Link>
                        );
                      }
                      return (
                        <a href={href} target="_blank" rel="noopener noreferrer">
                          {children}
                        </a>
                      );
                    },
                  }}
                >
                  {insight.content_markdown}
                </ReactMarkdown>
              </div>
            </FadeInWhenVisible>
          </article>

          {/* CTA Section */}
          <FadeInWhenVisible delay={0.3}>
            <div className="mt-16 pt-8 border-t border-white/10">
              <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 md:p-10 text-center border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Need Help With Your Marketing?
                </h3>
                <p className="text-white/60 mb-6 max-w-lg mx-auto">
                  Get expert creative services at affordable prices. Video production, web design, digital marketing and more.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-white/90 transition-colors"
                  >
                    Get a Free Quote
                  </Link>
                  <Link
                    to="/what-we-do"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-6 py-3 rounded-full font-bold hover:bg-white/20 transition-colors border border-white/10"
                  >
                    View Services
                  </Link>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>

          {/* Related Articles Placeholder */}
          <FadeInWhenVisible delay={0.4}>
            <div className="mt-12">
              <h3 className="text-xl font-bold text-white mb-6">More Insights</h3>
              <Link
                to="/insights"
                className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
              >
                View all articles <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          </FadeInWhenVisible>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default InsightArticle;
