import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { Link, useParams, Navigate } from "react-router-dom";
import { Clock, ArrowLeft, Tag, User, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet";
import ReactMarkdown from "react-markdown";

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
      year: "numeric", month: "long", day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-32 pb-24 px-6">
          <div className="container mx-auto max-w-3xl">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-white/5 rounded w-3/4"></div>
              <div className="h-4 bg-white/5 rounded w-1/2"></div>
              <div className="h-64 bg-white/5 rounded"></div>
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
      </Helmet>
      <Navigation />
      <main className="pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-3xl">
          <FadeInWhenVisible>
            <Link to="/insights" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Insights
            </Link>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.1}>
            <article>
              <header className="mb-10">
                <h1 className="text-3xl md:text-5xl font-black text-foreground mb-6 leading-tight">{insight.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                  {insight.author && (
                    <span className="flex items-center gap-2"><User className="w-4 h-4" />{insight.author}</span>
                  )}
                  <span className="flex items-center gap-2"><Calendar className="w-4 h-4" />{formatDate(insight.published_at)}</span>
                  {insight.read_time && (
                    <span className="flex items-center gap-2"><Clock className="w-4 h-4" />{insight.read_time} min read</span>
                  )}
                </div>
                {insight.tags && insight.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {insight.tags.map((tag) => (
                      <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-white/5 rounded-full text-muted-foreground border border-white/10">
                        <Tag className="w-3 h-3" />{tag}
                      </span>
                    ))}
                  </div>
                )}
              </header>
              <div className="prose prose-invert prose-lg max-w-none
                prose-headings:font-bold prose-headings:text-foreground
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
                prose-li:text-muted-foreground
                prose-strong:text-foreground
                prose-a:text-foreground prose-a:underline hover:prose-a:no-underline
                prose-ul:my-4 prose-ol:my-4
                prose-blockquote:border-l-white/20 prose-blockquote:text-muted-foreground">
                <ReactMarkdown>{insight.content_markdown}</ReactMarkdown>
              </div>
            </article>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.2}>
            <div className="mt-16 pt-8 border-t border-white/10">
              <div className="bg-white/5 rounded-2xl p-8 text-center">
                <h3 className="text-2xl font-bold text-foreground mb-4">Need Help With Your Marketing?</h3>
                <p className="text-muted-foreground mb-6">Get expert creative services at affordable prices. Video production, web design, digital marketing and more.</p>
                <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-white/90 transition-colors">
                  Get a Free Quote
                </Link>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InsightArticle;
