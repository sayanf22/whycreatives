import { jsxs, jsx } from "react/jsx-runtime";
import { N as Navigation, F as FadeInWhenVisible, B as Button, a as Footer } from "../main.mjs";
import { I as Input } from "./input-6XZgwDxx.js";
import { T as Textarea } from "./textarea-6Ttc-Vmm.js";
import { User, Mail, Phone, FileText } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
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
const JoinUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    portfolio: "",
    message: ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `*New Job Application*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A*Position:* ${formData.position}%0A*Portfolio:* ${formData.portfolio || "Not provided"}%0A%0A*About:*%0A${formData.message}`;
    window.open(`https://wa.me/918119811655?text=${message}`, "_blank");
  };
  const inputVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsx(Navigation, {}),
    /* @__PURE__ */ jsx("main", { className: "pt-20 sm:pt-28 md:pt-32 pb-12 sm:pb-20 md:pb-24 px-4 sm:px-6", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-5xl", children: [
      /* @__PURE__ */ jsx(FadeInWhenVisible, { children: /* @__PURE__ */ jsxs("div", { className: "text-center mb-10 sm:mb-14 md:mb-16", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-foreground mb-4 sm:mb-6", children: "Join Our Team" }),
        /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4", children: "Be part of WhyCreatives and help businesses grow with professional creative services" })
      ] }) }),
      /* @__PURE__ */ jsx(FadeInWhenVisible, { delay: 0.1, children: /* @__PURE__ */ jsxs("div", { className: "mb-12 text-center", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-lg text-muted-foreground", children: [
          /* @__PURE__ */ jsx("span", { className: "font-bold text-foreground", children: "Location:" }),
          " Tripura, Agartala 🇮🇳"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-2", children: "Remote positions available" })
      ] }) }),
      /* @__PURE__ */ jsx(FadeInWhenVisible, { delay: 0.2, children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 },
          className: "border-2 border-border/50 p-4 sm:p-6 md:p-8 lg:p-12 rounded-3xl bg-secondary/30 backdrop-blur-md shadow-xl",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "text-center mb-6 sm:mb-8", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl font-black text-foreground mb-2", children: "Apply Now" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base text-muted-foreground", children: "Fill out the form below to join our team" })
            ] }),
            /* @__PURE__ */ jsxs("form", { className: "space-y-6", onSubmit: handleSubmit, children: [
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  variants: inputVariants,
                  initial: "initial",
                  animate: "animate",
                  transition: { delay: 0.1 },
                  children: [
                    /* @__PURE__ */ jsxs("label", { className: "block text-foreground font-bold mb-2 flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx(User, { className: "w-4 h-4" }),
                      "Full Name *"
                    ] }),
                    /* @__PURE__ */ jsx(
                      Input,
                      {
                        type: "text",
                        placeholder: "Enter your full name",
                        className: "bg-background border-border/50 text-foreground placeholder:text-muted-foreground focus:border-foreground/40 transition-colors rounded-xl",
                        value: formData.name,
                        onChange: (e) => setFormData({ ...formData, name: e.target.value }),
                        required: true
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  variants: inputVariants,
                  initial: "initial",
                  animate: "animate",
                  transition: { delay: 0.2 },
                  children: [
                    /* @__PURE__ */ jsxs("label", { className: "block text-foreground font-bold mb-2 flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx(Mail, { className: "w-4 h-4" }),
                      "Email Address *"
                    ] }),
                    /* @__PURE__ */ jsx(
                      Input,
                      {
                        type: "email",
                        placeholder: "your.email@example.com",
                        className: "bg-background border-border/50 text-foreground placeholder:text-muted-foreground focus:border-foreground/40 transition-colors rounded-xl",
                        value: formData.email,
                        onChange: (e) => setFormData({ ...formData, email: e.target.value }),
                        required: true
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  variants: inputVariants,
                  initial: "initial",
                  animate: "animate",
                  transition: { delay: 0.3 },
                  children: [
                    /* @__PURE__ */ jsxs("label", { className: "block text-foreground font-bold mb-2 flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4" }),
                      "Phone Number *"
                    ] }),
                    /* @__PURE__ */ jsx(
                      Input,
                      {
                        type: "tel",
                        placeholder: "+91 81198 11655",
                        className: "bg-background border-border/50 text-foreground placeholder:text-muted-foreground focus:border-foreground/40 transition-colors rounded-xl",
                        value: formData.phone,
                        onChange: (e) => setFormData({ ...formData, phone: e.target.value }),
                        required: true
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  variants: inputVariants,
                  initial: "initial",
                  animate: "animate",
                  transition: { delay: 0.4 },
                  children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-foreground font-bold mb-2", children: "Position Applying For *" }),
                    /* @__PURE__ */ jsx(
                      Input,
                      {
                        type: "text",
                        placeholder: "e.g., Video Editor, Web Developer, Social Media Manager",
                        className: "bg-background border-border/50 text-foreground placeholder:text-muted-foreground focus:border-foreground/40 transition-colors rounded-xl",
                        value: formData.position,
                        onChange: (e) => setFormData({ ...formData, position: e.target.value }),
                        required: true
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  variants: inputVariants,
                  initial: "initial",
                  animate: "animate",
                  transition: { delay: 0.5 },
                  children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-foreground font-bold mb-2", children: "Portfolio / Website Link" }),
                    /* @__PURE__ */ jsx(
                      Input,
                      {
                        type: "url",
                        placeholder: "https://your-portfolio.com",
                        className: "bg-background border-border/50 text-foreground placeholder:text-muted-foreground focus:border-foreground/40 transition-colors rounded-xl",
                        value: formData.portfolio,
                        onChange: (e) => setFormData({ ...formData, portfolio: e.target.value })
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  variants: inputVariants,
                  initial: "initial",
                  animate: "animate",
                  transition: { delay: 0.6 },
                  children: [
                    /* @__PURE__ */ jsxs("label", { className: "block text-foreground font-bold mb-2 flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx(FileText, { className: "w-4 h-4" }),
                      "Tell Us About Yourself *"
                    ] }),
                    /* @__PURE__ */ jsx(
                      Textarea,
                      {
                        placeholder: "Share your experience, skills, and why you want to join WhyCreatives...",
                        className: "bg-background border-border/50 text-foreground placeholder:text-muted-foreground min-h-[150px] focus:border-foreground/40 transition-colors rounded-xl",
                        value: formData.message,
                        onChange: (e) => setFormData({ ...formData, message: e.target.value }),
                        required: true
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.95 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { delay: 0.7 },
                  children: /* @__PURE__ */ jsx(
                    Button,
                    {
                      type: "submit",
                      size: "lg",
                      className: "w-full bg-foreground text-background hover:bg-foreground/90 font-bold text-lg py-6 transition-all hover:scale-[1.02] rounded-xl",
                      children: "Submit Application"
                    }
                  )
                }
              )
            ] })
          ]
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
export {
  JoinUs as default
};
