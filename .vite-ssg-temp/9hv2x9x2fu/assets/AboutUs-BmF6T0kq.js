import { jsx, jsxs } from "react/jsx-runtime";
import { F as FadeInWhenVisible, B as Button, N as Navigation, a as Footer } from "../main.mjs";
import "vite-react-ssg";
import "react";
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
const defaultCompanies = [
  {
    src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-1.svg",
    alt: "Arc"
  },
  {
    src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-2.svg",
    alt: "Descript"
  },
  {
    src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-3.svg",
    alt: "Mercury"
  },
  {
    src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-4.svg",
    alt: "Ramp"
  },
  {
    src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-5.svg",
    alt: "Retool"
  },
  {
    src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-6.svg",
    alt: "Watershed"
  }
];
const defaultAchievements = [
  { label: "Companies Supported", value: "300+" },
  { label: "Projects Finalized", value: "800+" },
  { label: "Happy Customers", value: "99%" },
  { label: "Recognized Awards", value: "10+" }
];
const About3 = ({
  title = "About Us",
  description = "Shadcnblocks is a passionate team dedicated to creating innovative solutions that empower businesses to thrive in the digital age.",
  mainImage = {
    src: "https://shadcnblocks.com/images/block/placeholder-1.svg",
    alt: "placeholder"
  },
  secondaryImage = {
    src: "https://shadcnblocks.com/images/block/placeholder-2.svg",
    alt: "placeholder"
  },
  breakout = {
    src: "https://shadcnblocks.com/images/block/block-1.svg",
    alt: "logo",
    title: "Hundreds of blocks at Shadcnblocks.com",
    description: "Providing businesses with effective tools to improve workflows, boost efficiency, and encourage growth.",
    buttonText: "Discover more",
    buttonUrl: "https://shadcnblocks.com"
  },
  companiesTitle = "Valued by clients worldwide",
  companies = defaultCompanies,
  achievementsTitle = "Our Achievements in Numbers",
  achievementsDescription = "Providing businesses with effective tools to improve workflows, boost efficiency, and encourage growth.",
  achievements = defaultAchievements
} = {}) => {
  return /* @__PURE__ */ jsx("section", { className: "py-16 sm:py-24 md:py-32 px-4 sm:px-6", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto", children: [
    /* @__PURE__ */ jsx(FadeInWhenVisible, { children: /* @__PURE__ */ jsxs("div", { className: "mb-10 sm:mb-14 grid gap-4 sm:gap-5 text-center md:grid-cols-2 md:text-left", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl sm:text-4xl md:text-5xl font-semibold", children: title }),
      /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base text-muted-foreground", children: description })
    ] }) }),
    /* @__PURE__ */ jsx(FadeInWhenVisible, { delay: 0.2, children: /* @__PURE__ */ jsxs("div", { className: "grid gap-7 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: mainImage.src,
          alt: mainImage.alt,
          className: "size-full max-h-[620px] rounded-3xl object-cover lg:col-span-2 shadow-2xl"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-7 md:flex-row lg:flex-col", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between gap-6 rounded-xl bg-muted p-7 md:w-1/2 lg:w-auto", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: breakout.src,
              alt: breakout.alt,
              className: "mr-auto h-24 w-auto rounded-lg shadow-lg mb-4 object-cover"
            }
          ),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "mb-2 text-lg font-semibold", children: breakout.title }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: breakout.description })
          ] }),
          /* @__PURE__ */ jsx(Button, { variant: "outline", className: "mr-auto", asChild: true, children: /* @__PURE__ */ jsx("a", { href: breakout.buttonUrl, target: "_blank", children: breakout.buttonText }) })
        ] }),
        /* @__PURE__ */ jsx(
          "img",
          {
            src: secondaryImage.src,
            alt: secondaryImage.alt,
            className: "grow basis-0 rounded-3xl object-cover md:w-1/2 lg:min-h-0 lg:w-auto shadow-2xl"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(FadeInWhenVisible, { delay: 0.3, children: /* @__PURE__ */ jsxs("div", { className: "py-32", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-center", children: [
        companiesTitle,
        " "
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 flex flex-wrap justify-center gap-8", children: companies.map((company, idx) => /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: company.src,
          alt: company.alt,
          className: "h-6 w-auto md:h-8"
        }
      ) }, company.src + idx)) })
    ] }) }),
    /* @__PURE__ */ jsx(FadeInWhenVisible, { delay: 0.4, children: /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-xl bg-muted p-10 md:p-16", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 text-center md:text-left", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-4xl font-semibold", children: achievementsTitle }),
        /* @__PURE__ */ jsx("p", { className: "max-w-screen-sm text-muted-foreground", children: achievementsDescription })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-10 grid grid-cols-2 md:flex md:flex-wrap md:justify-between gap-8 md:gap-10 text-center", children: achievements.map((item, idx) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 md:gap-4", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm md:text-base", children: item.label }),
        /* @__PURE__ */ jsx("span", { className: "text-3xl md:text-4xl lg:text-5xl font-semibold", children: item.value })
      ] }, item.label + idx)) }),
      /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -top-1 right-1 z-10 hidden h-full w-full bg-[linear-gradient(to_right,hsl(var(--muted-foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted-foreground))_1px,transparent_1px)] bg-[size:80px_80px] opacity-15 [mask-image:linear-gradient(to_bottom_right,#000,transparent,transparent)] md:block" })
    ] }) })
  ] }) });
};
const AboutUs = () => {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsx(Navigation, {}),
    /* @__PURE__ */ jsx(
      About3,
      {
        title: "About WhyCreatives",
        description: "We are a full-service creative agency based in Guwahati, Assam, dedicated to transforming brands through innovative storytelling, cutting-edge design, and strategic digital solutions. Our mission is to empower businesses with world-class creative services that drive measurable results and lasting impact.",
        mainImage: {
          src: "/creative-office.png",
          alt: "Modern creative office space"
        },
        secondaryImage: {
          src: "/team-collab.png",
          alt: "Creative team collaborating"
        },
        breakout: {
          src: "/video-gear.png",
          alt: "Professional video production gear",
          title: "Excellence in Every Project",
          description: "We combine creative excellence with strategic thinking to deliver solutions that not only look exceptional but also drive business growth. Our team of experienced professionals brings together diverse expertise in video production, web development, branding, and digital marketing to create comprehensive solutions tailored to your unique needs.",
          buttonText: "Explore Our Services",
          buttonUrl: "/what-we-do"
        },
        companiesTitle: "Trusted by businesses across industries",
        companies: [
          {
            src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-1.svg",
            alt: "Client 1"
          },
          {
            src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-2.svg",
            alt: "Client 2"
          },
          {
            src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-3.svg",
            alt: "Client 3"
          },
          {
            src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-4.svg",
            alt: "Client 4"
          },
          {
            src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-5.svg",
            alt: "Client 5"
          },
          {
            src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-6.svg",
            alt: "Client 6"
          }
        ],
        achievementsTitle: "Our Impact in Numbers",
        achievementsDescription: "We've partnered with businesses across India to deliver exceptional creative solutions. Our commitment to excellence, innovation, and client success has made us a trusted partner for brands looking to make a lasting impact in their industries.",
        achievements: [
          { label: "Projects Completed", value: "500+" },
          { label: "Cost Savings", value: "Big" },
          { label: "Client Satisfaction", value: "100%" },
          { label: "Support Available", value: "24/7" }
        ]
      }
    ),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
export {
  AboutUs as default
};
