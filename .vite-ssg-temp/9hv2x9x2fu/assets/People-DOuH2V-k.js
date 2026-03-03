import { jsxs, jsx } from "react/jsx-runtime";
import { N as Navigation, F as FadeInWhenVisible, a as Footer } from "../main.mjs";
import { Users } from "lucide-react";
import "vite-react-ssg";
import "react";
import "@radix-ui/react-toast";
import "class-variance-authority";
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
const team = [];
const People = () => {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsx(Navigation, {}),
    /* @__PURE__ */ jsx("main", { className: "pt-32 pb-24 px-6", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsx(FadeInWhenVisible, { children: /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-5xl md:text-7xl font-black text-foreground mb-6", children: "Meet Our Team" }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground max-w-2xl mx-auto", children: "Talented professionals dedicated to bringing your creative vision to life" })
      ] }) }),
      /* @__PURE__ */ jsx(FadeInWhenVisible, { delay: 0.2, children: team.length === 0 ? (
        // Empty State
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-20", children: [
          /* @__PURE__ */ jsx("div", { className: "w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6", children: /* @__PURE__ */ jsx(Users, { className: "w-12 h-12 text-muted-foreground" }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black text-white mb-4", children: "Building Our Team" }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground max-w-md text-center mb-8", children: "We're currently assembling our talented team. Check back soon to meet the people behind WhyCreatives." }),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/join-us",
              className: "inline-block bg-white text-black px-8 py-4 font-bold hover:bg-muted-foreground transition-colors",
              children: "Join Our Team"
            }
          )
        ] })
      ) : (
        // Team Grid (will show when data is added)
        /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: team.map((member, index) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "group border-2 border-border hover:border-foreground transition-all duration-300 overflow-hidden",
            children: [
              /* @__PURE__ */ jsx("div", { className: "aspect-square bg-secondary flex items-center justify-center group-hover:bg-muted transition-colors duration-300", children: member.image ? /* @__PURE__ */ jsx("img", { src: member.image, alt: member.name, className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsx("div", { className: "text-6xl font-black text-foreground opacity-30 group-hover:opacity-50 transition-opacity", children: member.name.split(" ").map((n) => n[0]).join("") }) }),
              /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-foreground mb-1 group-hover:text-muted-foreground transition-colors", children: member.name }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground font-semibold mb-4 uppercase tracking-wider", children: member.role }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-6", children: member.bio })
              ] })
            ]
          },
          member.id
        )) })
      ) })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
export {
  People as default
};
