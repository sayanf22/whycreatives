import { useState, useEffect, useMemo } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { Clock, ArrowUpRight, BookOpen, RotateCcw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { useSiteContent } from "@/hooks/use-site-content";

const EASE = [0.16, 1, 0.3, 1] as const;

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

const formatDate = (date: string | null) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

/**
 * Thin meta line above a card title: category, date, read time. Kept as one
 * component so every card in the list reads identically.
 */
const ArticleMeta = ({ article }: { article: Article }) => (
  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
    {article.category && <span>{article.category}</span>}
    {article.published_at && (
      <>
        <span aria-hidden="true" className="text-muted-foreground/40">
          /
        </span>
        <span className="tracking-[0.1em]">{formatDate(article.published_at)}</span>
      </>
    )}
    {article.read_time && (
      <>
        <span aria-hidden="true" className="text-muted-foreground/40">
          /
        </span>
        <span className="inline-flex items-center gap-1.5 tracking-[0.1em]">
          <Clock className="h-3 w-3" aria-hidden="true" />
          {article.read_time} min
        </span>
      </>
    )}
  </div>
);

const Insights = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const { text } = useSiteContent();

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

  /* 100 articles is far too many for one flat list, so the same monochrome
     filter strip the gallery uses reappears here, driven by category. */
  const categories = useMemo(() => {
    const found = Array.from(
      new Set(articles.map((a) => a.category).filter(Boolean) as string[]),
    ).sort((a, b) => a.localeCompare(b));
    return ["All", ...found];
  }, [articles]);

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? articles
        : articles.filter((a) => a.category === activeCategory),
    [articles, activeCategory],
  );

  const [lead, ...rest] = filtered;

  const headingOne = text("insights.heading_line_1", "Notes on");
  const headingTwo = text("insights.heading_line_2", "the craft");

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground font-['Schibsted_Grotesk',sans-serif]">
      <Helmet>
        <title>Insights | Marketing, Design & Development Notes | WhyCreatives</title>
        <meta
          name="description"
          content="Practical writing on digital marketing, SEO, video editing, design and web development for businesses in India."
        />
        <link rel="canonical" href="https://whycreatives.in/insights" />
      </Helmet>

      <Navigation />

      <main
        className="px-4 md:px-[clamp(20px,2.6vw,52px)]"
        style={{
          paddingTop: "clamp(104px, 12vw, 168px)",
          paddingBottom: "clamp(56px, 7vw, 120px)",
        }}
      >
        <div className="mx-auto max-w-[1920px]">
          {/* ── HEADER ── was a centred `font-black` stack with a "Fresh
              insights every week" badge. The badge was a publishing promise
              nothing enforced, so it is gone; the type now matches every other
              page on the site. */}
          <PageHeader
            key={`${headingOne}|${headingTwo}`}
            eyebrow={text("insights.eyebrow", "Insights")}
            lines={[headingOne, headingTwo]}
            support={text(
              "insights.intro",
              "What we have learned building brands, sites and video — written down while it is still useful. No listicles.",
            )}
          />

          {/* ── LOADING ── mirrors the real layout so nothing reflows. */}
          {loading && (
            <div className="animate-pulse">
              <div className="mb-12 flex flex-wrap gap-2 lg:mb-20 lg:gap-2.5">
                {[96, 118, 104, 130].map((w, i) => (
                  <div
                    key={i}
                    className="h-11 rounded-full border border-border bg-foreground/[0.06] sm:h-12"
                    style={{ width: w }}
                  />
                ))}
              </div>
              <div className="h-[clamp(200px,26vw,340px)] rounded-[20px] bg-foreground/[0.06] md:rounded-[34px]" />
              <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-3">
                    <div className="h-3 w-28 rounded bg-foreground/[0.06]" />
                    <div className="h-7 w-full rounded bg-foreground/[0.06]" />
                    <div className="h-7 w-2/3 rounded bg-foreground/[0.06]" />
                    <div className="h-4 w-full rounded bg-foreground/[0.04]" />
                  </div>
                ))}
              </div>
              <span className="sr-only" role="status" aria-live="polite">
                Loading articles
              </span>
            </div>
          )}

          {/* ── ERROR ── was hard-coded `text-white` on a themed background, so
              it was invisible in light mode. */}
          {error && !loading && (
            <div className="border-t border-border py-20 text-center">
              <BookOpen
                className="mx-auto mb-6 h-12 w-12 text-muted-foreground"
                aria-hidden="true"
              />
              <h2
                className="text-foreground"
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                  letterSpacing: "-0.04em",
                  fontWeight: 700,
                }}
              >
                Could not load the articles
              </h2>
              <p className="mx-auto mt-3 max-w-[46ch] text-base text-muted-foreground">
                {error}
              </p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-bold text-background transition-opacity duration-300 hover:opacity-85 sm:h-14 sm:px-8"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Try again
              </button>
            </div>
          )}

          {!loading && !error && articles.length > 0 && (
            <>
              {/* ── CATEGORY FILTER ── */}
              {categories.length > 2 && (
                <div
                  role="group"
                  aria-label="Filter articles by category"
                  className="mb-12 flex flex-wrap items-center gap-2 lg:mb-20 lg:gap-2.5"
                >
                  {categories.map((category) => {
                    const isActive = activeCategory === category;
                    const count =
                      category === "All"
                        ? articles.length
                        : articles.filter((a) => a.category === category).length;

                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setActiveCategory(category)}
                        aria-pressed={isActive}
                        className={`relative flex h-11 items-center overflow-hidden rounded-full border px-5 transition-colors duration-300 sm:h-12 sm:px-6 ${
                          isActive
                            ? "border-foreground"
                            : "border-border hover:border-foreground/40"
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="activeInsightCategory"
                            className="absolute inset-0 rounded-full bg-foreground"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                        <span
                          className={`relative z-10 flex items-center gap-2 text-sm font-bold tracking-[-0.01em] transition-colors duration-300 ${
                            isActive ? "text-background" : "text-muted-foreground"
                          }`}
                        >
                          {category}
                          <span
                            className={`text-[11px] font-semibold tabular-nums ${
                              isActive
                                ? "text-background/55"
                                : "text-muted-foreground/55"
                            }`}
                          >
                            {count}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* ── LEAD ARTICLE ── the newest piece, set at display scale so
                  the page has one clear entry point instead of a wall of
                  equally weighted cards. */}
              {lead && (
                <motion.article
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8% 0px" }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="border-y border-border"
                >
                  <Link
                    to={`/insights/${lead.slug}`}
                    className="group grid grid-cols-1 gap-6 py-8 lg:grid-cols-12 lg:gap-10 lg:py-14"
                  >
                    <div className="lg:col-span-7">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="inline-flex h-7 items-center rounded-full bg-foreground px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-background">
                          Latest
                        </span>
                        <ArticleMeta article={lead} />
                      </div>
                      <h2
                        className="mt-5 text-foreground transition-colors duration-300 group-hover:text-muted-foreground"
                        style={{
                          fontSize: "clamp(1.85rem, 4.4vw, 4.5rem)",
                          lineHeight: 1.0,
                          letterSpacing: "-0.045em",
                          fontWeight: 700,
                        }}
                      >
                        {lead.title}
                      </h2>
                    </div>
                    <div className="flex flex-col justify-end lg:col-span-5">
                      <p className="max-w-[52ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
                        {lead.meta_description}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-foreground">
                        Read the article
                        <ArrowUpRight
                          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 motion-reduce:transform-none"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              )}

              {/* ── ARTICLE LIST ── cards dropped the panel-and-shadow look:
                  a rule, a meta line and a big title carry it, which reads
                  faster at 100 entries and matches the gallery. */}
              {rest.length > 0 && (
                <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-2 md:grid-cols-2 lg:mt-24 lg:grid-cols-3 lg:gap-x-16">
                  {rest.map((article, i) => (
                    <motion.article
                      key={article.id}
                      initial={{ opacity: 0, y: 26 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-6% 0px" }}
                      transition={{
                        duration: 0.6,
                        ease: EASE,
                        /* Stagger within a row only. Multiplying by the flat
                           index would leave the last of 99 cards waiting five
                           seconds after it had already scrolled into view. */
                        delay: (i % 3) * 0.07,
                      }}
                      className="border-t border-border"
                    >
                      <Link
                        to={`/insights/${article.slug}`}
                        className="group flex h-full flex-col py-7 lg:py-9"
                      >
                        <ArticleMeta article={article} />
                        <h3
                          className="mt-4 text-foreground transition-colors duration-300 group-hover:text-muted-foreground"
                          style={{
                            fontSize: "clamp(1.3rem, 1.9vw, 1.9rem)",
                            lineHeight: 1.08,
                            letterSpacing: "-0.035em",
                            fontWeight: 700,
                          }}
                        >
                          {article.title}
                        </h3>
                        <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-muted-foreground">
                          {article.meta_description}
                        </p>
                        <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                          Read
                          <ArrowUpRight
                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 motion-reduce:transform-none"
                            aria-hidden="true"
                          />
                        </span>
                      </Link>
                    </motion.article>
                  ))}
                </div>
              )}

              {filtered.length === 0 && (
                <p className="border-t border-border py-20 text-center text-lg text-muted-foreground">
                  Nothing filed under {activeCategory} yet.
                </p>
              )}

              {/* ── CTA ── */}
              <section className="mt-20 border-t border-border pt-12 lg:mt-32 lg:pt-20">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                  <div className="lg:col-span-7">
                    <h2
                      className="text-foreground"
                      style={{
                        fontSize: "clamp(1.85rem, 4.2vw, 4rem)",
                        lineHeight: 1.0,
                        letterSpacing: "-0.045em",
                        fontWeight: 700,
                      }}
                    >
                      Rather have us do it?
                    </h2>
                    <p className="mt-5 max-w-[48ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
                      Video editing, websites, apps, identity and campaigns —
                      handled by one team. Tell us the outcome and we will scope
                      it.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-start gap-3 lg:col-span-5 lg:justify-end">
                    <Link
                      to="/contact"
                      className="group inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-bold text-background transition-opacity duration-300 hover:opacity-85 sm:h-14 sm:px-8 sm:text-base"
                    >
                      Start a project
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none" />
                    </Link>
                    <Link
                      to="/what-we-do"
                      className="inline-flex h-12 items-center rounded-full border border-border px-6 text-sm font-bold text-foreground transition-colors duration-300 hover:border-foreground/40 sm:h-14 sm:px-8 sm:text-base"
                    >
                      View services
                    </Link>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* ── EMPTY ── also had white-on-white text before. */}
          {!loading && !error && articles.length === 0 && (
            <div className="border-t border-border py-20 text-center">
              <BookOpen
                className="mx-auto mb-6 h-14 w-14 text-muted-foreground"
                aria-hidden="true"
              />
              <h2
                className="text-foreground"
                style={{
                  fontSize: "clamp(1.75rem, 3.4vw, 3rem)",
                  letterSpacing: "-0.04em",
                  fontWeight: 700,
                }}
              >
                Nothing published yet
              </h2>
              <p className="mx-auto mt-4 max-w-[46ch] text-base text-muted-foreground sm:text-lg">
                We are writing up what we have learned on marketing, design and
                build. Check back shortly.
              </p>
              <Link
                to="/contact"
                className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-bold text-background transition-opacity duration-300 hover:opacity-85 sm:h-14 sm:px-8"
              >
                Get in touch
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
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
