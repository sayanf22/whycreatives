import { jsxs, jsx } from "react/jsx-runtime";
import { N as Navigation, a as Footer, F as FadeInWhenVisible } from "../main.mjs";
import { useState, useMemo } from "react";
import { a as usePortfolioWorksByCategory, g as getStorageUrl } from "./use-portfolio-works-DMD5TthV.js";
import "vite-react-ssg";
import "@radix-ui/react-toast";
import "class-variance-authority";
import "lucide-react";
import "clsx";
import "tailwind-merge";
import "next-themes";
import "sonner";
import "@radix-ui/react-tooltip";
import "@tanstack/react-query";
import "react-router-dom";
import "@radix-ui/react-slot";
import "framer-motion";
import "react-helmet";
import "@supabase/supabase-js";
import "react-markdown";
import "remark-gfm";
const PortfolioGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { data: portfolioItems, isLoading } = usePortfolioWorksByCategory(selectedCategory);
  const categories = useMemo(() => {
    if (!portfolioItems) return ["All"];
    const uniqueCategories = Array.from(new Set(portfolioItems.map((item) => item.category)));
    return ["All", ...uniqueCategories];
  }, [portfolioItems]);
  const filteredItems = portfolioItems || [];
  if (isLoading) {
    return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
      /* @__PURE__ */ jsx(Navigation, {}),
      /* @__PURE__ */ jsx("div", { className: "pt-32 pb-24 px-4 flex items-center justify-center min-h-[60vh]", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative w-24 h-24 mx-auto mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-full border-4 border-white/20" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-full border-4 border-transparent border-t-white border-r-white animate-spin" }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute inset-2 rounded-full border-4 border-transparent border-b-white/60 border-l-white/60",
              style: { animation: "spin 1.5s linear infinite reverse" }
            }
          )
        ] }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-2 animate-pulse", children: "Loading Gallery" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground animate-pulse", children: "Fetching portfolio items..." })
      ] }) }),
      /* @__PURE__ */ jsx(Footer, {})
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsx(Navigation, {}),
    /* @__PURE__ */ jsx("div", { className: "pt-32 pb-24 px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsx(FadeInWhenVisible, { children: /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-5xl md:text-7xl font-bold mb-6", children: "Portfolio Gallery" }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground max-w-3xl mx-auto mb-12", children: "Browse through our complete collection of creative work" }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-3 mb-16", children: categories.map((category) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setSelectedCategory(category),
            className: `px-6 py-2 rounded-full border-2 transition-all duration-300 ${selectedCategory === category ? "bg-white text-black border-white" : "bg-transparent text-white border-white/20 hover:border-white/50"}`,
            children: category
          },
          category
        )) })
      ] }) }),
      /* @__PURE__ */ jsxs(FadeInWhenVisible, { delay: 0.2, children: [
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredItems.map((item) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "group relative overflow-hidden rounded-lg border border-white/10 bg-card hover:border-white/30 transition-all duration-300 cursor-pointer aspect-[4/3]",
            children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: getStorageUrl(item.image_url),
                  alt: item.title,
                  loading: "lazy",
                  decoding: "async",
                  className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300", children: /* @__PURE__ */ jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-6", children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm text-white/70 mb-2", children: item.category }),
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white", children: item.title }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-white/60 mt-1", children: item.description })
              ] }) })
            ]
          },
          item.id
        )) }),
        filteredItems.length === 0 && /* @__PURE__ */ jsx("div", { className: "text-center py-20", children: /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground", children: "No projects found in this category" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
export {
  PortfolioGallery as default
};
