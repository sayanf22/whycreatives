import { jsxs, jsx } from "react/jsx-runtime";
import { N as Navigation, F as FadeInWhenVisible, a as Footer } from "../main.mjs";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Video, Globe, Share2, Megaphone, Sparkles, Palette } from "lucide-react";
import { Helmet } from "react-helmet";
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
import "@supabase/supabase-js";
import "react-markdown";
import "remark-gfm";
const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 90%"]
  });
  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "w-full bg-black font-sans md:px-10 overflow-hidden",
      ref: containerRef,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-5xl md:text-6xl font-black mb-4 text-white max-w-4xl", children: "What We Do" }),
          /* @__PURE__ */ jsx("p", { className: "text-neutral-300 text-xl md:text-2xl max-w-2xl", children: "Professional creative services to elevate your brand and grow your business." })
        ] }),
        /* @__PURE__ */ jsxs("div", { ref, className: "relative max-w-7xl mx-auto pb-32", children: [
          data.map((item, index) => /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 50 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, margin: "-50px" },
              transition: {
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.25, 0.4, 0.25, 1]
              },
              className: "flex justify-start pt-10 md:pt-60 md:gap-24",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full", children: [
                  /* @__PURE__ */ jsx("div", { className: "h-10 absolute left-3 md:left-3 w-10 rounded-full bg-black flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "h-4 w-4 rounded-full bg-neutral-800 border border-neutral-700 p-2" }) }),
                  /* @__PURE__ */ jsx("h3", { className: "hidden md:block text-2xl md:pl-20 md:text-6xl font-black text-neutral-400", children: item.title })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "relative pl-20 pr-4 md:pl-4 w-full", children: [
                  /* @__PURE__ */ jsx("h3", { className: "md:hidden block text-3xl mb-4 text-left font-black text-neutral-400", children: item.title }),
                  item.content,
                  " "
                ] })
              ]
            },
            index
          )),
          /* @__PURE__ */ jsx(
            "div",
            {
              style: {
                height: height + "px"
              },
              className: "absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] ",
              children: /* @__PURE__ */ jsx(
                motion.div,
                {
                  style: {
                    height: heightTransform,
                    opacity: opacityTransform
                  },
                  className: "absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
                }
              )
            }
          )
        ] })
      ]
    }
  );
};
const WhatWeDo = () => {
  const timelineData = [
    {
      title: "Video Production",
      content: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
          /* @__PURE__ */ jsx("div", { className: "w-20 h-20 rounded-3xl bg-gradient-to-br from-white/10 to-transparent border border-white/20 shadow-xl backdrop-blur-md flex items-center justify-center", children: /* @__PURE__ */ jsx(Video, { className: "w-10 h-10 text-white" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "text-white text-xl md:text-2xl font-bold mb-2", children: "Full-Service Video Production" }),
            /* @__PURE__ */ jsx("p", { className: "text-neutral-400 text-base md:text-lg", children: "From concept to final cut, we craft cinematic experiences." })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-neutral-300 text-base md:text-lg font-normal mb-8", children: "We handle everything from on-location shooting with cinema-grade equipment to high-end post-production." }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3 items-center text-neutral-300 text-base md:text-lg", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-white rounded-full" }),
            "Professional Cinematography & Shooting"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3 items-center text-neutral-300 text-base md:text-lg", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-white rounded-full" }),
            "Scriptwriting & Storyboarding"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3 items-center text-neutral-300 text-base md:text-lg", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-white rounded-full" }),
            "Advanced Color Grading & Editing"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3 items-center text-neutral-300 text-base md:text-lg", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-white rounded-full" }),
            "Sound Design & Audio Mixing"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3 items-center text-neutral-300 text-base md:text-lg", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-white rounded-full" }),
            "Drone & Aerial Videography"
          ] })
        ] })
      ] })
    },
    {
      title: "Web Development",
      content: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
          /* @__PURE__ */ jsx("div", { className: "w-20 h-20 rounded-3xl bg-gradient-to-br from-white/10 to-transparent border border-white/20 shadow-xl backdrop-blur-md flex items-center justify-center", children: /* @__PURE__ */ jsx(Globe, { className: "w-10 h-10 text-white" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "text-white text-xl md:text-2xl font-bold mb-2", children: "High-Performance Web Development" }),
            /* @__PURE__ */ jsx("p", { className: "text-neutral-400 text-base md:text-lg", children: "Digital experiences engineered for growth." })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-neutral-300 text-base md:text-lg font-normal mb-8", children: "We build scalable, secure, and lightning-fast websites that serve as the foundation of your digital presence." }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3 items-center text-neutral-300 text-base md:text-lg", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-white rounded-full" }),
            "Custom Full-Stack Development"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3 items-center text-neutral-300 text-base md:text-lg", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-white rounded-full" }),
            "E-commerce Solutions"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3 items-center text-neutral-300 text-base md:text-lg", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-white rounded-full" }),
            "Technical SEO & Optimization"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3 items-center text-neutral-300 text-base md:text-lg", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-white rounded-full" }),
            "Progressive Web Apps (PWA)"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3 items-center text-neutral-300 text-base md:text-lg", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-white rounded-full" }),
            "UI/UX Design Systems"
          ] })
        ] })
      ] })
    },
    {
      title: "Brand Presence",
      content: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
          /* @__PURE__ */ jsx("div", { className: "w-20 h-20 rounded-3xl bg-gradient-to-br from-white/10 to-transparent border border-white/20 shadow-xl backdrop-blur-md flex items-center justify-center", children: /* @__PURE__ */ jsx(Share2, { className: "w-10 h-10 text-white" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "text-white text-xl md:text-2xl font-bold mb-2", children: "Strategic Brand Management" }),
            /* @__PURE__ */ jsx("p", { className: "text-neutral-400 text-base md:text-lg", children: "Cultivating communities and driving engagement." })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-neutral-300 text-base md:text-lg font-normal mb-8", children: "We don't just post; we curate a cohesive brand identity that resonates with your target audience across all channels." }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3 items-center text-neutral-300 text-base md:text-lg", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-white rounded-full" }),
            "Cross-Platform Strategy"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3 items-center text-neutral-300 text-base md:text-lg", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-white rounded-full" }),
            "Content Calendar & Production"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3 items-center text-neutral-300 text-base md:text-lg", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-white rounded-full" }),
            "Audience Analytics & Insights"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3 items-center text-neutral-300 text-base md:text-lg", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-white rounded-full" }),
            "Community Engagement"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3 items-center text-neutral-300 text-base md:text-lg", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-white rounded-full" }),
            "Influencer Partnerships"
          ] })
        ] })
      ] })
    },
    {
      title: "Performance Marketing",
      content: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
          /* @__PURE__ */ jsx("div", { className: "w-20 h-20 rounded-3xl bg-gradient-to-br from-white/10 to-transparent border border-white/20 shadow-xl backdrop-blur-md flex items-center justify-center", children: /* @__PURE__ */ jsx(Megaphone, { className: "w-10 h-10 text-white" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "text-white text-xl md:text-2xl font-bold mb-2", children: "Data-Driven Advertising" }),
            /* @__PURE__ */ jsx("p", { className: "text-neutral-400 text-base md:text-lg", children: "Turning ad spend into measurable revenue." })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-neutral-300 text-base md:text-lg font-normal mb-8", children: "Our campaigns are built on data, optimized for conversion, and scaled for maximum return on investment." }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3 items-center text-neutral-300 text-base md:text-lg", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-white rounded-full" }),
            "Multi-Channel Campaigns (Meta, Google, LinkedIn)"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3 items-center text-neutral-300 text-base md:text-lg", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-white rounded-full" }),
            "Conversion Rate Optimization (CRO)"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3 items-center text-neutral-300 text-base md:text-lg", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-white rounded-full" }),
            "A/B Testing & Iteration"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3 items-center text-neutral-300 text-base md:text-lg", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-white rounded-full" }),
            "Detailed ROI Reporting"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3 items-center text-neutral-300 text-base md:text-lg", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-white rounded-full" }),
            "Retargeting Strategies"
          ] })
        ] })
      ] })
    },
    {
      title: "Motion Graphics",
      content: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
          /* @__PURE__ */ jsx("div", { className: "w-20 h-20 rounded-3xl bg-gradient-to-br from-white/10 to-transparent border border-white/20 shadow-xl backdrop-blur-md flex items-center justify-center", children: /* @__PURE__ */ jsx(Sparkles, { className: "w-10 h-10 text-white" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "text-white text-xl md:text-2xl font-bold mb-2", children: "Animated Storytelling" }),
            /* @__PURE__ */ jsx("p", { className: "text-neutral-400 text-base md:text-lg", children: "Captivating visuals that explain and engage." })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-neutral-300 text-base md:text-lg font-normal mb-8", children: "We simplify complex ideas into stunning 2D animations and motion graphics that keep viewers watching." }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3 items-center text-neutral-300 text-base md:text-lg", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-white rounded-full" }),
            "2D Explainer Videos"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3 items-center text-neutral-300 text-base md:text-lg", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-white rounded-full" }),
            "Logo Animation & Intros"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3 items-center text-neutral-300 text-base md:text-lg", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-white rounded-full" }),
            "Typography & Kinetic Text"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3 items-center text-neutral-300 text-base md:text-lg", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-white rounded-full" }),
            "UI/UX Interaction Demos"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3 items-center text-neutral-300 text-base md:text-lg", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-white rounded-full" }),
            "Social Media Shorts"
          ] })
        ] })
      ] })
    },
    {
      title: "Logo Design",
      content: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
          /* @__PURE__ */ jsx("div", { className: "w-20 h-20 rounded-3xl bg-gradient-to-br from-white/10 to-transparent border border-white/20 shadow-xl backdrop-blur-md flex items-center justify-center", children: /* @__PURE__ */ jsx(Palette, { className: "w-10 h-10 text-white" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "text-white text-xl md:text-2xl font-bold mb-2", children: "Memorable Brand Identity" }),
            /* @__PURE__ */ jsx("p", { className: "text-neutral-400 text-base md:text-lg", children: "Crafting logos that leave lasting impressions." })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-neutral-300 text-base md:text-lg font-normal mb-8", children: "Your logo is the face of your brand. We design unique, versatile logos that capture your essence and stand out in any market." }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3 items-center text-neutral-300 text-base md:text-lg", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-white rounded-full" }),
            "Multiple Concept Designs"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3 items-center text-neutral-300 text-base md:text-lg", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-white rounded-full" }),
            "Unlimited Revisions"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3 items-center text-neutral-300 text-base md:text-lg", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-white rounded-full" }),
            "Vector & Print-Ready Files"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3 items-center text-neutral-300 text-base md:text-lg", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-white rounded-full" }),
            "Brand Color Palette"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3 items-center text-neutral-300 text-base md:text-lg", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-white rounded-full" }),
            "Social Media Kit Included"
          ] })
        ] })
      ] })
    }
  ];
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What video production services do you offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer full-service video production including professional cinematography, scriptwriting, advanced color grading, sound design, and drone videography."
        }
      },
      {
        "@type": "Question",
        "name": "Do you build custom websites or use templates?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We provide high-performance custom full-stack web development, e-commerce solutions, PWAs, and custom UI/UX design systems optimized for conversions."
        }
      },
      {
        "@type": "Question",
        "name": "How much does professional video marketing cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our professional video editing starts from ₹6,999. Web design starts from ₹4,999. We offer agency-level performance at highly affordable pricing across India."
        }
      }
    ]
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Creative Services | Web Design, Video Production & Marketing" }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: "Discover WhyCreatives' premium services: High-end video production, custom web development, performance marketing, and branding. Award-winning agency quality at affordable prices." }),
      /* @__PURE__ */ jsx("meta", { name: "keywords", content: "creative services, video production agency, web development company, digital marketing services, branding agency, logo design, performance marketing" }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://whycreatives.in/what-we-do" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Creative Services | Web Design, Video Production & Marketing" }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: "Discover WhyCreatives' premium services. Award-winning agency quality at affordable prices." }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: "https://whycreatives.in/what-we-do" }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(faqSchema) })
    ] }),
    /* @__PURE__ */ jsx(Navigation, {}),
    /* @__PURE__ */ jsx(FadeInWhenVisible, { children: /* @__PURE__ */ jsx("div", { className: "pt-20", children: /* @__PURE__ */ jsx(Timeline, { data: timelineData }) }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
export {
  WhatWeDo as default
};
