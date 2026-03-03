import { jsx, jsxs } from "react/jsx-runtime";
import { c as cn, F as FadeInWhenVisible, B as Button, N as Navigation, a as Footer } from "../main.mjs";
import * as React from "react";
import React__default from "react";
import { I as Input } from "./input-6XZgwDxx.js";
import { T as Textarea } from "./textarea-6Ttc-Vmm.js";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva } from "class-variance-authority";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Mail, Phone, MapPin, Send, Instagram, Linkedin } from "lucide-react";
import "vite-react-ssg";
import "@radix-ui/react-toast";
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
const labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(LabelPrimitive.Root, { ref, className: cn(labelVariants(), className), ...props }));
Label.displayName = LabelPrimitive.Root.displayName;
const Checkbox = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  CheckboxPrimitive.Root,
  {
    ref,
    className: cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(CheckboxPrimitive.Indicator, { className: cn("flex items-center justify-center text-current"), children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) })
  }
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
const XIcon = () => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", className: "h-5 w-5", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" }) });
const defaultSocialLinks = [
  {
    id: "1",
    name: "Instagram",
    icon: /* @__PURE__ */ jsx(Instagram, { className: "h-5 w-5" }),
    href: "https://www.instagram.com/why.creatives/"
  },
  {
    id: "2",
    name: "LinkedIn",
    icon: /* @__PURE__ */ jsx(Linkedin, { className: "h-5 w-5" }),
    href: "#linkedin"
  },
  {
    id: "3",
    name: "X (Twitter)",
    icon: /* @__PURE__ */ jsx(XIcon, {}),
    href: "#twitter"
  }
];
const ContactSection = ({
  title = "We can turn your dream project into reality",
  mainMessage = "Let's talk! 👋",
  contactEmail = "hello@whycreatives.in",
  socialLinks = defaultSocialLinks,
  backgroundImageSrc = "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2574&auto=format&fit=crop",
  onSubmit
}) => {
  const [formData, setFormData] = React__default.useState({
    name: "",
    email: "",
    message: "",
    projectType: [],
    otherProjectType: ""
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleCheckboxChange = (type, checked) => {
    setFormData((prev) => {
      const currentTypes = prev.projectType;
      if (checked) {
        return { ...prev, projectType: [...currentTypes, type] };
      } else {
        return { ...prev, projectType: currentTypes.filter((t) => t !== type) };
      }
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    } else {
      const message = `*New Project Inquiry*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Project Types:* ${formData.projectType.join(", ") || "Not specified"}%0A%0A*Message:*%0A${formData.message}`;
      window.open(`https://wa.me/918119811655?text=${message}`, "_blank");
    }
    setFormData({
      name: "",
      email: "",
      message: "",
      projectType: [],
      otherProjectType: ""
    });
  };
  const projectTypeOptions = [
    "Video Editing",
    "Website Design",
    "Web App",
    "E-Commerce",
    "Brand Identity",
    "Motion Graphics",
    "Social Media Marketing",
    "Ad Campaigns",
    "Other"
  ];
  return /* @__PURE__ */ jsx("section", { className: "relative min-h-screen w-full overflow-hidden bg-background", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center justify-center w-full min-h-screen pt-24 pb-12 px-4 md:px-8 lg:px-12", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full max-w-7xl", children: [
    /* @__PURE__ */ jsx(FadeInWhenVisible, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center space-y-6 lg:space-y-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-foreground leading-tight mb-4", children: title }),
        /* @__PURE__ */ jsx("p", { className: "text-base md:text-lg text-muted-foreground leading-relaxed", children: "Ready to bring your creative vision to life? Let's discuss your project and create something amazing together." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsx(FadeInWhenVisible, { delay: 0.1, children: /* @__PURE__ */ jsxs("div", { className: "group flex items-center gap-3 p-4 rounded-2xl bg-secondary/50 border border-border/50 hover:border-primary/50 hover:bg-secondary/80 transition-all duration-300 cursor-pointer", children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300", children: /* @__PURE__ */ jsx(Mail, { className: "w-5 h-5 text-primary" }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-muted-foreground mb-0.5 uppercase tracking-wide", children: "Email us" }),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: `mailto:${contactEmail}`,
                className: "text-foreground hover:text-primary transition-colors font-semibold text-sm truncate block",
                children: contactEmail
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(FadeInWhenVisible, { delay: 0.2, children: /* @__PURE__ */ jsxs("div", { className: "group flex items-center gap-3 p-4 rounded-2xl bg-secondary/50 border border-border/50 hover:border-primary/50 hover:bg-secondary/80 transition-all duration-300 cursor-pointer", children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300", children: /* @__PURE__ */ jsx(Phone, { className: "w-5 h-5 text-primary" }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-muted-foreground mb-0.5 uppercase tracking-wide", children: "Call us" }),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "tel:+918119811655",
                className: "text-foreground hover:text-primary transition-colors font-semibold text-sm",
                children: "+91 81198 11655"
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(FadeInWhenVisible, { delay: 0.3, children: /* @__PURE__ */ jsxs("div", { className: "group flex items-center gap-3 p-4 rounded-2xl bg-secondary/50 border border-border/50 hover:border-primary/50 hover:bg-secondary/80 transition-all duration-300", children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300", children: /* @__PURE__ */ jsx(MapPin, { className: "w-5 h-5 text-primary" }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-muted-foreground mb-0.5 uppercase tracking-wide", children: "Location" }),
            /* @__PURE__ */ jsx("p", { className: "text-foreground font-semibold text-sm", children: "Guwahati, Assam 🇮🇳" })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx(FadeInWhenVisible, { delay: 0.4, children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-muted-foreground mb-3 uppercase tracking-wide", children: "Follow us" }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: socialLinks.map((link, index) => /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "icon",
            className: "w-12 h-12 rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary hover:scale-110 transition-all duration-300",
            style: { animationDelay: `${index * 0.1}s` },
            asChild: true,
            children: /* @__PURE__ */ jsx("a", { href: link.href, target: "_blank", rel: "noopener noreferrer", "aria-label": link.name, children: link.icon })
          },
          link.id
        )) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx(FadeInWhenVisible, { delay: 0.2, children: /* @__PURE__ */ jsx("div", { className: "bg-card p-6 md:p-8 rounded-3xl shadow-2xl border border-border", children: /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-black text-foreground mb-2", children: mainMessage }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Fill out the form below and we'll get back to you within 24 hours." })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "name", className: "text-sm font-semibold", children: "Your name *" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "name",
                name: "name",
                placeholder: "John Doe",
                value: formData.name,
                onChange: handleChange,
                className: "h-12 rounded-2xl border-border/50 focus:border-primary transition-all",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "email", className: "text-sm font-semibold", children: "Email address *" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "email",
                name: "name",
                type: "email",
                placeholder: "john@example.com",
                value: formData.email,
                onChange: handleChange,
                className: "h-12 rounded-2xl border-border/50 focus:border-primary transition-all",
                required: true
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "message", className: "text-sm font-semibold", children: "Tell us about your project *" }),
          /* @__PURE__ */ jsx(
            Textarea,
            {
              id: "message",
              name: "message",
              placeholder: "I'm looking for help with...",
              className: "min-h-[120px] rounded-2xl resize-none border-border/50 focus:border-primary transition-all",
              value: formData.message,
              onChange: handleChange,
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx(Label, { className: "text-sm font-semibold", children: "Services you're interested in" }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-2.5", children: projectTypeOptions.map((option, index) => /* @__PURE__ */ jsxs(
            "label",
            {
              htmlFor: option.replace(/\s/g, "-").toLowerCase(),
              className: "flex items-center gap-4 p-4 rounded-2xl border border-border hover:border-primary/50 hover:bg-secondary/50 transition-all duration-300 cursor-pointer group",
              style: { animationDelay: `${index * 0.05}s` },
              children: [
                /* @__PURE__ */ jsx(
                  Checkbox,
                  {
                    id: option.replace(/\s/g, "-").toLowerCase(),
                    checked: formData.projectType.includes(option),
                    onCheckedChange: (checked) => handleCheckboxChange(option, checked),
                    className: "data-[state=checked]:bg-primary data-[state=checked]:border-primary rounded-full w-6 h-6 flex-shrink-0 border-2 shadow-sm"
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "text-sm font-medium cursor-pointer flex-1 group-hover:text-primary transition-colors", children: option })
              ]
            },
            option
          )) }),
          formData.projectType.includes("Other") && /* @__PURE__ */ jsxs("div", { className: "space-y-2 animate-in fade-in slide-in-from-top-2 duration-300", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "otherProjectType", className: "text-sm font-semibold", children: "Please specify" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "otherProjectType",
                name: "otherProjectType",
                placeholder: "Tell us what you need...",
                value: formData.otherProjectType,
                onChange: handleChange,
                className: "h-12 rounded-xl"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "submit",
            size: "lg",
            className: "w-full h-12 md:h-14 rounded-2xl text-sm md:text-base font-bold group hover:shadow-xl transition-all duration-300",
            children: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
              "Send Message",
              /* @__PURE__ */ jsx(Send, { className: "w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" })
            ] })
          }
        ),
        /* @__PURE__ */ jsxs("p", { className: "text-xs text-center text-muted-foreground flex items-center justify-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-green-500 rounded-full animate-pulse" }),
            "24h response"
          ] }),
          /* @__PURE__ */ jsx("span", { children: "•" }),
          /* @__PURE__ */ jsx("span", { children: "Secure" })
        ] })
      ] })
    ] }) }) })
  ] }) }) });
};
const ContactPage = () => {
  const handleFormSubmit = (data) => {
    console.log("Form submitted:", data);
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsx(Navigation, {}),
    /* @__PURE__ */ jsx(
      ContactSection,
      {
        title: "Let's create something amazing together",
        mainMessage: "Get in touch! 👋",
        contactEmail: "hello@whycreatives.in",
        onSubmit: handleFormSubmit
      }
    ),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
export {
  ContactPage as default
};
