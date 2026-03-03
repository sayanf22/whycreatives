import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link, useParams, Navigate } from "react-router-dom";
import { Clock, ArrowLeft, User, Calendar, Share2, Bookmark, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";

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
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-32 pb-24">
          <div className="max-w-[720px] mx-auto px-6">
            <div className="animate-pulse space-y-8">
              <div className="h-4 bg-white/5 rounded w-32" />
              <div className="space-y-4">
                <div className="h-12 bg-white/5 rounded w-full" />
                <div className="h-12 bg-white/5 rounded w-3/4" />
              </div>
              <div className="h-6 bg-white/5 rounded w-full" />
              <div className="h-px bg-white/10" />
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="h-4 bg-white/5 rounded w-full" />
                ))}
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
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{insight.title} | WhyCreatives Insights</title>
        <meta name="description" content={insight.meta_description} />
        <link rel="canonical" href={`https://whycreatives.in/insights/${insight.slug}`} />
        <meta property="og:title" content={insight.title} />
        <meta property="og:description" content={insight.meta_description} />
        <meta property="og:type" content="article" />
      </Helmet>

      <Navigation />

      {/* Article */}
      <article className="pt-28 pb-20">
        {/* Header Section */}
        <header className="max-w-[720px] mx-auto px-6 mb-12">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-muted-foreground mb-8"
          >
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/insights" className="hover:text-foreground transition-colors">Insights</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground/60 truncate max-w-[200px]">{insight.category || "Article"}</span>
          </motion.nav>

          {/* Category */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider uppercase bg-muted text-foreground rounded-full border border-border/50">
              {insight.category || "Insights"}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-[3.5rem] font-black text-foreground leading-[1.1] tracking-tight mb-8"
          >
            {insight.title}
          </motion.h1>

          {/* Excerpt */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-xl text-muted-foreground leading-relaxed mb-8"
          >
            {insight.meta_description}
          </motion.p>

          {/* Meta Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center justify-between gap-4 py-6 border-y border-border/50"
          >
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground font-bold text-sm border border-border/50">
                  WC
                </div>
                <div>
                  <p className="text-foreground font-medium">{insight.author || "WhyCreatives"}</p>
                  <p className="text-xs text-muted-foreground">Content Team</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(insight.published_at)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{insight.read_time || 5} min read</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground bg-muted hover:bg-muted/80 rounded-full transition-all"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </motion.div>
        </header>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-[720px] mx-auto px-6"
        >
          <div className="article-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl md:text-4xl font-black text-foreground mt-16 mb-6 leading-tight">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-14 mb-5 leading-tight">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground mt-10 mb-4 leading-snug">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-lg text-muted-foreground leading-[1.8] mb-6">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="my-6 ml-1 space-y-3">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="my-6 ml-1 space-y-3 list-decimal list-inside text-muted-foreground">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="text-lg text-muted-foreground leading-[1.7] pl-2 flex gap-3">
                    <span className="text-muted-foreground/40 mt-1">•</span>
                    <span>{children}</span>
                  </li>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-foreground">
                    {children}
                  </strong>
                ),
                em: ({ children }) => (
                  <em className="italic text-foreground/80">
                    {children}
                  </em>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="my-8 pl-6 py-4 border-l-4 border-primary/30 bg-muted rounded-r-lg">
                    <div className="text-lg text-foreground/80 italic leading-relaxed">
                      {children}
                    </div>
                  </blockquote>
                ),
                a: ({ href, children }) => {
                  if (href?.startsWith("/")) {
                    return (
                      <Link
                        to={href}
                        className="text-foreground hover:text-primary underline underline-offset-4 decoration-border hover:decoration-primary/60 transition-colors"
                      >
                        {children}
                      </Link>
                    );
                  }
                  return (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-primary underline underline-offset-4 decoration-border hover:decoration-primary/60 transition-colors"
                    >
                      {children}
                    </a>
                  );
                },
                table: ({ children }) => (
                  <div className="my-8 overflow-x-auto rounded-xl border border-border/50">
                    <table className="w-full text-left">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-muted border-b border-border/50">
                    {children}
                  </thead>
                ),
                th: ({ children }) => (
                  <th className="px-5 py-4 text-sm font-semibold text-foreground uppercase tracking-wider">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="px-5 py-4 text-base text-muted-foreground border-b border-border/50">
                    {children}
                  </td>
                ),
                hr: () => (
                  <hr className="my-12 border-0 h-px bg-border/50" />
                ),
                code: ({ children }) => (
                  <code className="px-2 py-1 text-sm bg-muted text-foreground/80 rounded font-mono">
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre className="my-6 p-5 bg-card border border-border/50 rounded-xl overflow-x-auto text-foreground">
                    {children}
                  </pre>
                ),
              }}
            >
              {insight.content_markdown}
            </ReactMarkdown>
          </div>

          {/* Tags */}
          {insight.tags && insight.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border/50">
              <p className="text-sm text-muted-foreground mb-4">Tagged with:</p>
              <div className="flex flex-wrap gap-2">
                {insight.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 text-sm bg-muted hover:bg-muted/80 text-muted-foreground rounded-full transition-colors cursor-default border border-border/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-[720px] mx-auto px-6 mt-16"
        >
          <div className="relative overflow-hidden rounded-3xl shadow-sm bg-card border border-border/50 p-10 md:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(150,150,150,0.05),transparent_50%)]" />
            <div className="relative text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Ready to Grow Your Business?
              </h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto text-lg">
                Get expert creative services at India's most affordable prices. Video, web, marketing & more.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-8 py-4 rounded-full font-bold hover:opacity-90 transition-all hover:scale-105"
                >
                  Get Free Quote
                </Link>
                <Link
                  to="/what-we-do"
                  className="inline-flex items-center justify-center gap-2 bg-transparent text-foreground px-8 py-4 rounded-full font-bold hover:bg-muted transition-all border border-border/50"
                >
                  View Services
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Back to Insights */}
        <div className="max-w-[720px] mx-auto px-6 mt-12">
          <Link
            to="/insights"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to all insights
          </Link>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default InsightArticle;
