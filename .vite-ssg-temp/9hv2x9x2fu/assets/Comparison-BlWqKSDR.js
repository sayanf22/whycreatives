import { jsxs, jsx } from "react/jsx-runtime";
import { c as cn, N as Navigation, F as FadeInWhenVisible, b as BackgroundPaths, a as Footer } from "../main.mjs";
import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import "vite-react-ssg";
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
import "react-helmet";
import "@supabase/supabase-js";
import "react-markdown";
import "remark-gfm";
const ServicePricingCard = React.forwardRef(
  ({
    imageUrl,
    serviceName,
    savings,
    quality,
    oldPrice,
    oldPriceLabel,
    newPrice,
    newPriceLabel,
    duration,
    className
  }, ref) => {
    const cardVariants = {
      hidden: { opacity: 0, y: 40 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.7,
          ease: "easeOut",
          when: "beforeChildren",
          staggerChildren: 0.15
        }
      }
    };
    const itemVariants = {
      hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
      visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.6, ease: "easeOut" }
      }
    };
    return /* @__PURE__ */ jsxs(
      motion.div,
      {
        ref,
        className: cn(
          "max-w-3xl w-full font-sans rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.12)] hover:shadow-[0_15px_50px_-10px_rgba(0,0,0,0.18)] dark:shadow-2xl bg-card border border-border/50 backdrop-blur-md transition-all duration-300 my-4 sm:my-6",
          className
        ),
        variants: cardVariants,
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-50px" },
        whileHover: { scale: 1.02, transition: { duration: 0.3 } },
        children: [
          /* @__PURE__ */ jsxs("div", { className: "relative h-48 sm:h-64 md:h-80", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: imageUrl,
                alt: serviceName,
                className: "w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" }),
            /* @__PURE__ */ jsx("div", { className: "absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex justify-between items-end", children: /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(
                motion.h3,
                {
                  variants: itemVariants,
                  className: "text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2 tracking-tight",
                  children: serviceName
                }
              ),
              /* @__PURE__ */ jsxs(
                motion.span,
                {
                  variants: itemVariants,
                  className: "px-2 sm:px-3 py-1 sm:py-1.5 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-emerald-400 text-xs sm:text-sm font-bold backdrop-blur-sm inline-block",
                  children: [
                    savings,
                    " OFF"
                  ]
                }
              )
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-4 sm:p-6 md:p-8 lg:p-10", children: [
            /* @__PURE__ */ jsxs(
              motion.div,
              {
                variants: itemVariants,
                className: "flex flex-col sm:flex-row items-center justify-between mb-8 gap-6 sm:gap-0",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "text-center sm:text-left w-full sm:w-auto", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-base text-muted-foreground mb-2 font-medium", children: "Traditional Agency" }),
                    /* @__PURE__ */ jsx("p", { className: "text-2xl sm:text-3xl md:text-5xl font-bold text-muted-foreground line-through decoration-red-500 decoration-2", children: oldPrice }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-muted-foreground mt-2 font-medium", children: oldPriceLabel })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "text-center px-2 sm:px-4 flex flex-col items-center", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 sm:gap-3 my-2 justify-center opacity-70", children: [
                      /* @__PURE__ */ jsx("div", { className: "h-px w-6 sm:w-8 md:w-16 bg-border" }),
                      /* @__PURE__ */ jsx(ArrowRight, { className: "h-5 w-5 sm:h-6 sm:w-6 text-emerald-500" }),
                      /* @__PURE__ */ jsx("div", { className: "h-px w-6 sm:w-8 md:w-16 bg-border" })
                    ] }),
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] sm:text-xs md:text-sm text-emerald-600 dark:text-emerald-500 font-bold tracking-widest uppercase", children: "SWITCH & SAVE" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "text-center sm:text-right w-full sm:w-auto", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-base text-emerald-600 dark:text-emerald-400 mb-2 font-bold tracking-wide", children: "WhyCreatives" }),
                    /* @__PURE__ */ jsx("p", { className: "text-3xl sm:text-4xl md:text-6xl font-black text-foreground drop-shadow-sm dark:shadow-emerald-glow", children: newPrice }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-muted-foreground mt-2 font-medium", children: newPriceLabel })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              motion.div,
              {
                variants: itemVariants,
                className: "border-t border-dashed border-border my-4 sm:my-6 md:my-8"
              }
            ),
            /* @__PURE__ */ jsxs(
              motion.div,
              {
                variants: itemVariants,
                className: "flex justify-between text-center",
                children: [
                  /* @__PURE__ */ jsx(InfoItem, { label: "Quality", value: quality }),
                  /* @__PURE__ */ jsx(InfoItem, { label: "Turnaround", value: duration }),
                  /* @__PURE__ */ jsx(InfoItem, { label: "Guarantee", value: "100% Satisfaction" })
                ]
              }
            )
          ] })
        ]
      }
    );
  }
);
ServicePricingCard.displayName = "ServicePricingCard";
const InfoItem = ({ label, value }) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center px-2 sm:px-4 w-1/3", children: [
  /* @__PURE__ */ jsx("span", { className: "text-[10px] sm:text-xs md:text-sm text-muted-foreground uppercase tracking-wider mb-1 sm:mb-2 font-semibold", children: label }),
  /* @__PURE__ */ jsx("span", { className: "font-bold text-foreground text-xs sm:text-base md:text-lg text-center", children: value })
] });
function PricingHero() {
  return /* @__PURE__ */ jsx("section", { className: "bg-background py-12 sm:py-16 lg:py-24 relative overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsxs("h1", { className: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4 sm:mb-6", children: [
        "Premium Quality At",
        /* @__PURE__ */ jsx("br", { className: "hidden sm:block" }),
        /* @__PURE__ */ jsx("span", { className: "block sm:inline", children: " Affordable Prices" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed", children: "Compare our transparent pricing with traditional agencies. Same professional quality, exceptional value. No hidden fees, no surprises - just honest pricing that helps your business grow." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 sm:mt-12 md:mt-16 flex flex-col items-center gap-6 sm:gap-8 md:gap-12 w-full", children: [
      /* @__PURE__ */ jsx(
        ServicePricingCard,
        {
          imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop",
          serviceName: "Video Production",
          savings: "90%",
          quality: "Premium",
          oldPrice: "₹45k",
          oldPriceLabel: "Avg. Agency",
          newPrice: "₹6,999",
          newPriceLabel: "Starting",
          duration: "3-5 Days"
        }
      ),
      /* @__PURE__ */ jsx(
        ServicePricingCard,
        {
          imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2000&auto=format&fit=crop",
          serviceName: "Web Development",
          savings: "85%",
          quality: "Custom Code",
          oldPrice: "₹35k",
          oldPriceLabel: "Avg. Agency",
          newPrice: "₹4,999",
          newPriceLabel: "Starting",
          duration: "1 Week"
        }
      ),
      /* @__PURE__ */ jsx(
        ServicePricingCard,
        {
          imageUrl: "https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=2000&auto=format&fit=crop",
          serviceName: "Brand Presence",
          savings: "85%",
          quality: "Strategic",
          oldPrice: "₹40k",
          oldPriceLabel: "Per Month",
          newPrice: "₹5,999",
          newPriceLabel: "Per Month",
          duration: "Monthly"
        }
      ),
      /* @__PURE__ */ jsx(
        ServicePricingCard,
        {
          imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop",
          serviceName: "Performance Mkt",
          savings: "73%",
          quality: "High ROI",
          oldPrice: "₹18.5k",
          oldPriceLabel: "Per Month",
          newPrice: "₹4,999",
          newPriceLabel: "Per Month",
          duration: "Ongoing"
        }
      ),
      /* @__PURE__ */ jsx(
        ServicePricingCard,
        {
          imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop",
          serviceName: "Motion Graphics",
          savings: "89%",
          quality: "4K Render",
          oldPrice: "₹36.5k",
          oldPriceLabel: "Per Min",
          newPrice: "₹3,999",
          newPriceLabel: "Starting",
          duration: "48 Hours"
        }
      ),
      /* @__PURE__ */ jsx(
        ServicePricingCard,
        {
          imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2000&auto=format&fit=crop",
          serviceName: "Logo Design",
          savings: "88%",
          quality: "Unique",
          oldPrice: "₹25k",
          oldPriceLabel: "Avg. Agency",
          newPrice: "₹2,999",
          newPriceLabel: "Starting",
          duration: "2-3 Days"
        }
      )
    ] })
  ] }) });
}
const Comparison = () => {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsx(Navigation, {}),
    /* @__PURE__ */ jsx(FadeInWhenVisible, { children: /* @__PURE__ */ jsx("div", { className: "pt-20", children: /* @__PURE__ */ jsx(PricingHero, {}) }) }),
    /* @__PURE__ */ jsx(FadeInWhenVisible, { delay: 0.3, children: /* @__PURE__ */ jsx("div", { className: "mt-16", children: /* @__PURE__ */ jsx(BackgroundPaths, {}) }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
export {
  Comparison as default
};
