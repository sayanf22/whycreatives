import { jsxs, jsx } from "react/jsx-runtime";
import { B as Button, N as Navigation, a as Footer, F as FadeInWhenVisible } from "../main.mjs";
import { useRef, useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Pause, Play } from "lucide-react";
import { u as usePortfolioWorks, g as getStorageUrl } from "./use-portfolio-works-DMD5TthV.js";
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
import "framer-motion";
import "react-helmet";
import "@supabase/supabase-js";
import "react-markdown";
import "remark-gfm";
const Carousel = (props) => {
  const { slides, options } = props;
  const progressNode = useRef(null);
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 3e3 })
  ]);
  const { autoplayIsPlaying, toggleAutoplay, onAutoplayButtonClick } = useAutoplay(emblaApi);
  const { showAutoplayProgress } = useAutoplayProgress(
    emblaApi,
    progressNode
  );
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);
  return /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsx("div", { className: "overflow-hidden", ref: emblaRef, children: /* @__PURE__ */ jsx("div", { className: "flex touch-pan-y touch-pinch-zoom", children: slides.map((slideContent, index) => /* @__PURE__ */ jsx("div", { className: "flex-[0_0_100%] md:flex-[0_0_85%] px-3 transform-gpu", children: slideContent }, index)) }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex mx-auto max-w-80 justify-between items-center gap-3 mt-7", children: [
      /* @__PURE__ */ jsx("div", { className: "flex justify-center gap-2", children: scrollSnaps.map((_, index) => /* @__PURE__ */ jsx(
        DotButton,
        {
          onClick: () => onAutoplayButtonClick(() => onDotButtonClick(index)),
          className: `w-3 h-3 rounded-full border-2 border-border transition-colors duration-200 ${index === selectedIndex ? "bg-foreground" : "bg-transparent hover:bg-muted"}`
        },
        index
      )) }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `rounded-[1.8rem] border-2 border-border bg-background relative h-2 justify-self-center self-center w-40 max-w-[90%] overflow-hidden transition-opacity duration-300 ease-in-out ${showAutoplayProgress ? "opacity-100" : "opacity-0"}`,
          children: /* @__PURE__ */ jsx(
            "div",
            {
              className: "bg-foreground absolute w-full top-0 bottom-0 -left-full animate-[autoplay-progress_linear_1] [animation-play-state:running]",
              ref: progressNode,
              style: {
                animationPlayState: showAutoplayProgress ? "running" : "paused"
              }
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          size: "icon",
          variant: "secondary",
          onClick: toggleAutoplay,
          type: "button",
          children: autoplayIsPlaying ? /* @__PURE__ */ jsx(Pause, { fill: "currentColor" }) : /* @__PURE__ */ jsx(Play, { fill: "currentColor" })
        }
      )
    ] })
  ] });
};
const useDotButton = (emblaApi) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const onDotButtonClick = useCallback(
    (index) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );
  const onInit = useCallback((emblaApi2) => {
    setScrollSnaps(emblaApi2.scrollSnapList());
  }, []);
  const onSelect = useCallback((emblaApi2) => {
    setSelectedIndex(emblaApi2.selectedScrollSnap());
  }, []);
  useEffect(() => {
    if (!emblaApi) return;
    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);
  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick
  };
};
const DotButton = (props) => {
  const { children, ...restProps } = props;
  return /* @__PURE__ */ jsx("button", { type: "button", ...restProps, children });
};
const useAutoplayProgress = (emblaApi, progressNode) => {
  const [showAutoplayProgress, setShowAutoplayProgress] = useState(false);
  const animationName = useRef("");
  const timeoutId = useRef(0);
  const rafId = useRef(0);
  const startProgress = useCallback((timeUntilNext) => {
    const node = progressNode.current;
    if (!node) return;
    if (timeUntilNext === null) return;
    if (!animationName.current) {
      const style = window.getComputedStyle(node);
      animationName.current = style.animationName;
    }
    node.style.animationName = "none";
    node.style.transform = "translate3d(0,0,0)";
    rafId.current = window.requestAnimationFrame(() => {
      timeoutId.current = window.setTimeout(() => {
        node.style.animationName = animationName.current;
        node.style.animationDuration = `${timeUntilNext}ms`;
      }, 0);
    });
    setShowAutoplayProgress(true);
  }, []);
  useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;
    emblaApi.on("autoplay:timerset", () => startProgress(autoplay.timeUntilNext())).on("autoplay:timerstopped", () => setShowAutoplayProgress(false));
  }, [emblaApi]);
  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafId.current);
      clearTimeout(timeoutId.current);
    };
  }, []);
  return {
    showAutoplayProgress
  };
};
const useAutoplay = (emblaApi) => {
  const [autoplayIsPlaying, setAutoplayIsPlaying] = useState(false);
  const onAutoplayButtonClick = useCallback(
    (callback) => {
      const autoplay = emblaApi?.plugins()?.autoplay;
      if (!autoplay) return;
      const resetOrStop = autoplay.options.stopOnInteraction === false ? autoplay.reset : autoplay.stop;
      resetOrStop();
      callback();
    },
    [emblaApi]
  );
  const toggleAutoplay = useCallback(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;
    const playOrStop = autoplay.isPlaying() ? autoplay.stop : autoplay.play;
    playOrStop();
  }, [emblaApi]);
  useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;
    setAutoplayIsPlaying(autoplay.isPlaying());
    emblaApi.on("autoplay:play", () => setAutoplayIsPlaying(true)).on("autoplay:stop", () => setAutoplayIsPlaying(false)).on("reInit", () => setAutoplayIsPlaying(autoplay.isPlaying()));
  }, [emblaApi]);
  return {
    autoplayIsPlaying,
    toggleAutoplay,
    onAutoplayButtonClick
  };
};
const OurWork = () => {
  const { data: portfolioWorks, isLoading } = usePortfolioWorks();
  const workSlides = portfolioWorks?.map((work) => /* @__PURE__ */ jsxs(
    "div",
    {
      className: "border w-full relative overflow-hidden rounded-lg bg-card text-card-foreground aspect-[16/9]",
      children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: getStorageUrl(work.image_url),
            alt: work.title,
            loading: "lazy",
            decoding: "async",
            className: "object-cover h-full w-full"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6", children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-2", children: work.title }),
          /* @__PURE__ */ jsx("p", { className: "text-white/80", children: work.description })
        ] }) })
      ]
    },
    work.id
  )) || [];
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
              style: {
                animation: "spin 1.5s linear infinite reverse"
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-2 animate-pulse", children: "Loading Portfolio" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground animate-pulse", children: "Fetching creative works..." })
      ] }) }),
      /* @__PURE__ */ jsx(Footer, {})
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsx(Navigation, {}),
    /* @__PURE__ */ jsx("div", { className: "pt-32 pb-24 px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsx(FadeInWhenVisible, { children: /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-5xl md:text-7xl font-bold mb-6", children: "Our Work" }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground max-w-3xl mx-auto", children: "Explore our portfolio of creative projects. From motion graphics to branding, we bring ideas to life with stunning visuals and innovative design." })
      ] }) }),
      /* @__PURE__ */ jsx(FadeInWhenVisible, { delay: 0.2, children: workSlides.length > 0 ? /* @__PURE__ */ jsx(Carousel, { slides: workSlides }) : /* @__PURE__ */ jsx("div", { className: "text-center py-20", children: /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground", children: "No portfolio items yet" }) }) }),
      /* @__PURE__ */ jsx(FadeInWhenVisible, { delay: 0.3, children: /* @__PURE__ */ jsx("div", { className: "flex justify-center mt-10", children: /* @__PURE__ */ jsx(
        Button,
        {
          onClick: () => window.location.href = "/portfolio-gallery",
          className: "h-14 rounded-full px-10 bg-white text-black hover:bg-muted-foreground font-bold",
          children: "See All Works"
        }
      ) }) })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
export {
  OurWork as default
};
