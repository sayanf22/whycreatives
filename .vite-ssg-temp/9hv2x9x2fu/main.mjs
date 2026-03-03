import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { ViteReactSSG } from "vite-react-ssg";
import * as React from "react";
import { useEffect, createContext, useContext, useState, useRef, lazy, Suspense } from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva } from "class-variance-authority";
import { X, Sun, Moon, Menu, Zap, Link as Link$1, ArrowRight, Video, Globe, Share2, Palette, TrendingUp, ArrowRightIcon, Megaphone, Sparkles, DollarSign, Shield, Users, MessageSquare, FileCheck, Rocket, ThumbsUp, Phone, Mail, MapPin, BookOpen, Clock, ChevronRight, Calendar, ArrowLeft } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useTheme as useTheme$1 } from "next-themes";
import { Toaster as Toaster$2 } from "sonner";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLocation, Link, useParams, Navigate, Routes, Route } from "react-router-dom";
import { Slot } from "@radix-ui/react-slot";
import { AnimatePresence, motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { createClient } from "@supabase/supabase-js";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1e6;
let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}
const toastTimeouts = /* @__PURE__ */ new Map();
const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId
    });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) => t.id === action.toast.id ? { ...t, ...action.toast } : t)
      };
    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast2) => {
          addToRemoveQueue(toast2.id);
        });
      }
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === toastId || toastId === void 0 ? {
            ...t,
            open: false
          } : t
        )
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === void 0) {
        return {
          ...state,
          toasts: []
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId)
      };
  }
};
const listeners = [];
let memoryState = { toasts: [] };
function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}
function toast({ ...props }) {
  const id = genId();
  const update = (props2) => dispatch({
    type: "UPDATE_TOAST",
    toast: { ...props2, id }
  });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      }
    }
  });
  return {
    id,
    dismiss,
    update
  };
}
function useToast() {
  const [state, setState] = React.useState(memoryState);
  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);
  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId })
  };
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const ToastProvider = ToastPrimitives.Provider;
const ToastViewport = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Viewport,
  {
    ref,
    className: cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    ),
    ...props
  }
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Toast = React.forwardRef(({ className, variant, ...props }, ref) => {
  return /* @__PURE__ */ jsx(ToastPrimitives.Root, { ref, className: cn(toastVariants({ variant }), className), ...props });
});
Toast.displayName = ToastPrimitives.Root.displayName;
const ToastAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Action,
  {
    ref,
    className: cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors group-[.destructive]:border-muted/40 hover:bg-secondary group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 group-[.destructive]:focus:ring-destructive disabled:pointer-events-none disabled:opacity-50",
      className
    ),
    ...props
  }
));
ToastAction.displayName = ToastPrimitives.Action.displayName;
const ToastClose = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Close,
  {
    ref,
    className: cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity group-hover:opacity-100 group-[.destructive]:text-red-300 hover:text-foreground group-[.destructive]:hover:text-red-50 focus:opacity-100 focus:outline-none focus:ring-2 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    ),
    "toast-close": "",
    ...props,
    children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
  }
));
ToastClose.displayName = ToastPrimitives.Close.displayName;
const ToastTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ToastPrimitives.Title, { ref, className: cn("text-sm font-semibold", className), ...props }));
ToastTitle.displayName = ToastPrimitives.Title.displayName;
const ToastDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ToastPrimitives.Description, { ref, className: cn("text-sm opacity-90", className), ...props }));
ToastDescription.displayName = ToastPrimitives.Description.displayName;
function Toaster$1() {
  const { toasts } = useToast();
  return /* @__PURE__ */ jsxs(ToastProvider, { children: [
    toasts.map(function({ id, title, description, action, ...props }) {
      return /* @__PURE__ */ jsxs(Toast, { ...props, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1", children: [
          title && /* @__PURE__ */ jsx(ToastTitle, { children: title }),
          description && /* @__PURE__ */ jsx(ToastDescription, { children: description })
        ] }),
        action,
        /* @__PURE__ */ jsx(ToastClose, {})
      ] }, id);
    }),
    /* @__PURE__ */ jsx(ToastViewport, {})
  ] });
}
const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme$1();
  return /* @__PURE__ */ jsx(
    Toaster$2,
    {
      theme,
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const TooltipProvider = TooltipPrimitive.Provider;
const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(
  TooltipPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const initialState = {
  theme: "dark",
  setTheme: () => null
};
const ThemeProviderContext = createContext(initialState);
function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "ui-theme",
  ...props
}) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(storageKey) || defaultTheme;
    }
    return defaultTheme;
  });
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
      return;
    }
    root.classList.add(theme);
  }, [theme]);
  const value = {
    theme,
    setTheme: (theme2) => {
      if (typeof window !== "undefined") {
        localStorage.setItem(storageKey, theme2);
      }
      setTheme(theme2);
    }
  };
  return /* @__PURE__ */ jsx(ThemeProviderContext.Provider, { ...props, value, children });
}
const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === void 0)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    if (theme === "system") {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "light" : "dark");
    } else {
      setTheme(theme === "dark" ? "light" : "dark");
    }
  };
  return /* @__PURE__ */ jsxs(
    Button,
    {
      variant: "ghost",
      size: "icon",
      onClick: toggleTheme,
      className: "text-foreground hover:bg-secondary/80 h-10 w-10 md:h-12 md:w-12 flex-shrink-0 relative overflow-hidden",
      "aria-label": "Toggle theme",
      children: [
        /* @__PURE__ */ jsx(Sun, { className: "h-5 w-5 md:h-6 md:w-6 transition-all duration-500 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" }),
        /* @__PURE__ */ jsx(Moon, { className: "absolute h-5 w-5 md:h-6 md:w-6 transition-all duration-500 rotate-90 scale-0 dark:rotate-0 dark:scale-100" }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Toggle theme" })
      ]
    }
  );
}
const menuItems = [
  { label: "What We Do", href: "/what-we-do" },
  { label: "Our Work", href: "/our-work" },
  { label: "Pricing Comparison", href: "/pricing-comparison" },
  { label: "Insights", href: "/insights" },
  { label: "About Us", href: "/about-us" },
  { label: "People", href: "/people" },
  { label: "Join Us", href: "/join-us" },
  { label: "Contact Us", href: "/contact" }
];
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isOpen]);
  const handleLinkClick = () => {
    setIsOpen(false);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "nav",
      {
        className: `fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-white dark:bg-black ${scrolled ? "border-b border-border shadow-sm" : ""}`,
        children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 lg:px-16 py-5 md:py-6 flex justify-between items-center", children: [
          /* @__PURE__ */ jsx(Link, { to: "/", className: "flex items-center transition-transform hover:scale-105 duration-300", children: /* @__PURE__ */ jsx("span", { className: "text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground", children: "WhyCreatives" }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-0 ml-auto", children: [
            /* @__PURE__ */ jsx(ThemeToggle, {}),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                onClick: () => setIsOpen(true),
                className: "text-foreground hover:bg-secondary/80 h-10 w-10 md:h-12 md:w-12 flex-shrink-0",
                children: /* @__PURE__ */ jsx(Menu, { className: "h-6 w-6 md:h-7 md:w-7" })
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { x: "100%" },
        animate: { x: 0 },
        exit: { x: "100%" },
        transition: { type: "spring", damping: 30, stiffness: 300 },
        className: "fixed inset-0 z-50 bg-white/95 dark:bg-black/95 backdrop-blur-xl",
        children: /* @__PURE__ */ jsxs("div", { className: "h-full flex flex-col overflow-hidden relative", children: [
          /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, y: -20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.2, duration: 0.4 },
              className: "flex-shrink-0 bg-transparent z-10 border-b border-border/10",
              children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 lg:px-12 py-5 md:py-6 flex justify-between items-center", children: [
                /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx("span", { className: "text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground", children: "WhyCreatives" }) }),
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    onClick: () => setIsOpen(false),
                    className: "text-foreground hover:bg-secondary h-12 w-12 md:h-14 md:w-14 flex-shrink-0",
                    children: /* @__PURE__ */ jsx(X, { className: "h-7 w-7 md:h-9 md:w-9" })
                  }
                )
              ] })
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "flex-1 overflow-y-auto overflow-x-hidden",
              style: {
                WebkitOverflowScrolling: "touch",
                overscrollBehavior: "contain",
                touchAction: "pan-y"
              },
              children: /* @__PURE__ */ jsx("nav", { className: "container mx-auto px-6 lg:px-12 py-8 md:py-12 pb-20", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col space-y-4 md:space-y-6 lg:space-y-8", children: menuItems.map((item, index) => /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: {
                    opacity: 0,
                    x: -30
                  },
                  animate: {
                    opacity: 1,
                    x: 0
                  },
                  transition: {
                    delay: 0.3 + index * 0.1,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1]
                  },
                  children: /* @__PURE__ */ jsx(
                    Link,
                    {
                      to: item.href,
                      onClick: handleLinkClick,
                      className: "block text-left text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground hover:text-muted-foreground transition-colors duration-300 py-2 active:scale-95",
                      children: item.label
                    }
                  )
                },
                item.label
              )) }) })
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.5, duration: 0.4 },
              className: "flex-shrink-0 bg-background border-t border-border/50",
              children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 lg:px-12 py-4 md:py-5", children: /* @__PURE__ */ jsx("p", { className: "text-xs md:text-sm text-muted-foreground", children: "Guwahati, Assam 🇮🇳" }) })
            }
          )
        ] })
      }
    ) })
  ] });
};
const Spotlight = ({ className, fill }) => {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      className: cn(
        "animate-spotlight pointer-events-none absolute z-[1]  h-[169%] w-[138%] lg:w-[84%] opacity-0",
        className
      ),
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 3787 2842",
      fill: "none",
      children: [
        /* @__PURE__ */ jsx("g", { filter: "url(#filter)", children: /* @__PURE__ */ jsx(
          "ellipse",
          {
            cx: "1924.71",
            cy: "273.501",
            rx: "1924.71",
            ry: "273.501",
            transform: "matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)",
            fill: fill || "white",
            fillOpacity: "0.21"
          }
        ) }),
        /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs(
          "filter",
          {
            id: "filter",
            x: "0.860352",
            y: "0.838989",
            width: "3785.16",
            height: "2840.26",
            filterUnits: "userSpaceOnUse",
            colorInterpolationFilters: "sRGB",
            children: [
              /* @__PURE__ */ jsx("feFlood", { floodOpacity: "0", result: "BackgroundImageFix" }),
              /* @__PURE__ */ jsx(
                "feBlend",
                {
                  mode: "normal",
                  in: "SourceGraphic",
                  in2: "BackgroundImageFix",
                  result: "shape"
                }
              ),
              /* @__PURE__ */ jsx(
                "feGaussianBlur",
                {
                  stdDeviation: "151",
                  result: "effect1_foregroundBlur_1065_8"
                }
              )
            ]
          }
        ) })
      ]
    }
  );
};
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
const Card = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("rounded-lg border bg-card text-card-foreground shadow-sm", className), ...props }));
Card.displayName = "Card";
const CardHeader = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("flex flex-col space-y-1.5 p-6", className), ...props })
);
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("h3", { ref, className: cn("text-2xl font-semibold leading-none tracking-tight", className), ...props })
);
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("p", { ref, className: cn("text-sm text-muted-foreground", className), ...props })
);
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props })
);
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("flex items-center p-6 pt-0", className), ...props })
);
CardFooter.displayName = "CardFooter";
function RadialOrbitalTimeline({
  timelineData
}) {
  const [expandedItems, setExpandedItems] = useState({});
  const [viewMode, setViewMode] = useState("orbital");
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [pulseEffect, setPulseEffect] = useState({});
  const [centerOffset, setCenterOffset] = useState({
    x: 0,
    y: 0
  });
  const [activeNodeId, setActiveNodeId] = useState(null);
  const containerRef = useRef(null);
  const orbitRef = useRef(null);
  const nodeRefs = useRef({});
  const handleContainerClick = (e) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };
  const toggleItem = (id) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });
      newState[id] = !prev[id];
      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);
        const relatedItems = getRelatedItems(id);
        const newPulseEffect = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);
        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }
      return newState;
    });
  };
  useEffect(() => {
    let animationFrameId;
    let lastTime = performance.now();
    const animate = (currentTime) => {
      if (autoRotate && viewMode === "orbital") {
        const deltaTime = currentTime - lastTime;
        if (deltaTime >= 33) {
          setRotationAngle((prev) => {
            const newAngle = (prev + 0.5) % 360;
            return Number(newAngle.toFixed(1));
          });
          lastTime = currentTime;
        }
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    if (autoRotate && viewMode === "orbital") {
      animationFrameId = requestAnimationFrame(animate);
    }
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [autoRotate, viewMode]);
  const centerViewOnNode = (nodeId) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = nodeIndex / totalNodes * 360;
    setRotationAngle(270 - targetAngle);
  };
  const getRadius = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 640 ? 120 : 200;
    }
    return 200;
  };
  const calculateNodePosition = (index, total) => {
    const angle = (index / total * 360 + rotationAngle) % 360;
    const radius = getRadius();
    const radian = angle * Math.PI / 180;
    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );
    return { x, y, angle, zIndex, opacity };
  };
  const getRelatedItems = (itemId) => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };
  const isRelatedToActive = (itemId) => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };
  const getStatusStyles = (status) => {
    switch (status) {
      case "completed":
        return "text-background bg-foreground border-foreground";
      case "in-progress":
        return "text-foreground bg-background border-foreground";
      case "pending":
        return "text-background bg-foreground/40 border-foreground/50";
      default:
        return "text-background bg-foreground/40 border-foreground/50";
    }
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "w-full h-full flex flex-col items-center justify-center bg-transparent overflow-visible",
      ref: containerRef,
      onClick: handleContainerClick,
      children: /* @__PURE__ */ jsx("div", { className: "relative w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: "absolute w-full h-full flex items-center justify-center",
          ref: orbitRef,
          style: {
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`
          },
          children: [
            /* @__PURE__ */ jsxs("div", { className: "absolute w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-teal-500 animate-pulse flex items-center justify-center z-10", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute w-20 h-20 rounded-full border border-foreground/20 animate-ping opacity-70" }),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "absolute w-24 h-24 rounded-full border border-foreground/10 animate-ping opacity-50",
                  style: { animationDelay: "0.5s" }
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-background backdrop-blur-md border border-foreground/10" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "absolute w-64 h-64 sm:w-96 sm:h-96 rounded-full border border-foreground/10" }),
            timelineData.map((item, index) => {
              const position = calculateNodePosition(index, timelineData.length);
              const isExpanded = expandedItems[item.id];
              const isRelated = isRelatedToActive(item.id);
              const isPulsing = pulseEffect[item.id];
              const Icon = item.icon;
              const nodeStyle = {
                transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
                zIndex: isExpanded ? 200 : position.zIndex,
                opacity: isExpanded ? 1 : position.opacity,
                willChange: "transform, opacity"
              };
              return /* @__PURE__ */ jsxs(
                "div",
                {
                  ref: (el) => nodeRefs.current[item.id] = el,
                  className: "absolute transition-all duration-700 cursor-pointer",
                  style: nodeStyle,
                  onClick: (e) => {
                    e.stopPropagation();
                    toggleItem(item.id);
                  },
                  children: [
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: `absolute rounded-full -inset-1 ${isPulsing ? "animate-pulse duration-1000" : ""}`,
                        style: {
                          background: `radial-gradient(circle, rgba(128,128,128,0.25) 0%, rgba(128,128,128,0) 70%)`,
                          width: `${item.energy * 0.5 + 40}px`,
                          height: `${item.energy * 0.5 + 40}px`,
                          left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                          top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`
                        }
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: `w-10 h-10 rounded-full flex items-center justify-center
                    ${isExpanded ? "bg-foreground text-background" : isRelated ? "bg-foreground/50 text-background" : "bg-background text-foreground"}
                    border-2 ${isExpanded ? "border-foreground shadow-lg shadow-foreground/30" : isRelated ? "border-foreground animate-pulse" : "border-foreground/40"}
                    transition-all duration-300 transform
                    ${isExpanded ? "scale-150" : ""}`,
                        children: /* @__PURE__ */ jsx(Icon, { size: 16 })
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: `absolute top-12  whitespace-nowrap
                    text-xs font-semibold tracking-wider
                    transition-all duration-300
                    ${isExpanded ? "text-foreground scale-125" : "text-foreground/70"}`,
                        children: item.title
                      }
                    ),
                    isExpanded && /* @__PURE__ */ jsxs(Card, { className: "absolute top-16 sm:top-20 left-1/2 -translate-x-1/2 w-52 sm:w-64 bg-card border-border shadow-xl shadow-foreground/10 overflow-visible z-50", children: [
                      /* @__PURE__ */ jsx("div", { className: "absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-foreground/50" }),
                      /* @__PURE__ */ jsxs(CardHeader, { className: "pb-2", children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
                          /* @__PURE__ */ jsx(
                            Badge,
                            {
                              className: `px-2 text-xs ${getStatusStyles(
                                item.status
                              )}`,
                              children: item.status === "completed" ? "COMPLETE" : item.status === "in-progress" ? "IN PROGRESS" : "PENDING"
                            }
                          ),
                          /* @__PURE__ */ jsx("span", { className: "text-xs font-mono text-muted-foreground", children: item.date })
                        ] }),
                        /* @__PURE__ */ jsx(CardTitle, { className: "text-sm mt-2 text-foreground", children: item.title })
                      ] }),
                      /* @__PURE__ */ jsxs(CardContent, { className: "text-xs text-foreground/80", children: [
                        /* @__PURE__ */ jsx("p", { children: item.content }),
                        /* @__PURE__ */ jsxs("div", { className: "mt-4 pt-3 border-t border-border", children: [
                          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center text-xs mb-1", children: [
                            /* @__PURE__ */ jsxs("span", { className: "flex items-center", children: [
                              /* @__PURE__ */ jsx(Zap, { size: 10, className: "mr-1" }),
                              "Service Capability"
                            ] }),
                            /* @__PURE__ */ jsxs("span", { className: "font-mono", children: [
                              item.energy,
                              "%"
                            ] })
                          ] }),
                          /* @__PURE__ */ jsx("div", { className: "w-full h-1 bg-foreground/10 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx(
                            "div",
                            {
                              className: "h-full bg-gradient-to-r from-blue-500 to-purple-500",
                              style: { width: `${item.energy}%` }
                            }
                          ) })
                        ] }),
                        item.relatedIds.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-4 pt-3 border-t border-border", children: [
                          /* @__PURE__ */ jsxs("div", { className: "flex items-center mb-2", children: [
                            /* @__PURE__ */ jsx(Link$1, { size: 10, className: "text-foreground/70 mr-1" }),
                            /* @__PURE__ */ jsx("h4", { className: "text-xs uppercase tracking-wider font-medium text-foreground/70", children: "Connected Nodes" })
                          ] }),
                          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1", children: item.relatedIds.map((relatedId) => {
                            const relatedItem = timelineData.find(
                              (i) => i.id === relatedId
                            );
                            return /* @__PURE__ */ jsxs(
                              Button,
                              {
                                variant: "outline",
                                size: "sm",
                                className: "flex items-center h-6 px-2 py-0 text-xs rounded-none border-border bg-transparent hover:bg-foreground/10 text-foreground/80 hover:text-foreground transition-all",
                                onClick: (e) => {
                                  e.stopPropagation();
                                  toggleItem(relatedId);
                                },
                                children: [
                                  relatedItem?.title,
                                  /* @__PURE__ */ jsx(
                                    ArrowRight,
                                    {
                                      size: 8,
                                      className: "ml-1 text-foreground/60"
                                    }
                                  )
                                ]
                              },
                              relatedId
                            );
                          }) })
                        ] })
                      ] })
                    ] })
                  ]
                },
                item.id
              );
            })
          ]
        }
      ) })
    }
  );
}
const Hero = ({ title, subtitle }) => {
  const timelineData = [
    {
      id: 1,
      title: "Video Editing",
      date: "Professional",
      content: "High-quality video editing with professional transitions and effects.",
      category: "Video",
      icon: Video,
      relatedIds: [2, 4],
      status: "completed",
      energy: 100
    },
    {
      id: 2,
      title: "Web Design",
      date: "Modern",
      content: "Responsive and beautiful web designs that convert.",
      category: "Design",
      icon: Globe,
      relatedIds: [1, 3],
      status: "completed",
      energy: 95
    },
    {
      id: 3,
      title: "Social Media",
      date: "Engaging",
      content: "Strategic social media management and content creation.",
      category: "Marketing",
      icon: Share2,
      relatedIds: [2, 5],
      status: "in-progress",
      energy: 85
    },
    {
      id: 4,
      title: "Branding",
      date: "Creative",
      content: "Unique brand identity and visual design solutions.",
      category: "Design",
      icon: Palette,
      relatedIds: [1, 5],
      status: "completed",
      energy: 90
    },
    {
      id: 5,
      title: "Growth",
      date: "Results",
      content: "Data-driven strategies for business growth and success.",
      category: "Strategy",
      icon: TrendingUp,
      relatedIds: [3, 4],
      status: "in-progress",
      energy: 80
    }
  ];
  return /* @__PURE__ */ jsxs("section", { className: "min-h-screen flex flex-col justify-start md:justify-center px-5 sm:px-6 pt-28 sm:pt-32 pb-10 sm:pb-12 relative overflow-x-hidden", children: [
    /* @__PURE__ */ jsx(
      Spotlight,
      {
        className: "hidden md:block -top-40 left-0 md:left-60 md:-top-20 opacity-20",
        fill: "white"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "w-full max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-12 items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 w-full animate-fade-in-up", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-[2.2rem] leading-[1.15] sm:text-5xl md:text-7xl lg:text-8xl font-black text-foreground mb-4 sm:mb-6 tracking-tight", children: title || /* @__PURE__ */ jsxs(Fragment, { children: [
            "Creative",
            /* @__PURE__ */ jsx("br", {}),
            "Excellence",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Affordable Prices" })
          ] }) }),
          /* @__PURE__ */ jsx("p", { className: "text-base sm:text-xl md:text-2xl text-muted-foreground mb-5 sm:mb-12 leading-relaxed", children: subtitle || "Professional video editing, web design, and social media management. Transparent pricing. Zero hidden fees." }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3 sm:gap-4", children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                size: "lg",
                asChild: true,
                className: "bg-foreground text-background hover:bg-muted-foreground text-base sm:text-lg px-8 py-5 sm:py-6 font-bold w-full sm:w-auto",
                children: /* @__PURE__ */ jsxs(Link, { to: "/contact", className: "flex items-center justify-center gap-2", children: [
                  "Get a Quote",
                  /* @__PURE__ */ jsx(ArrowRight, { className: "h-5 w-5" })
                ] })
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                size: "lg",
                variant: "outline",
                asChild: true,
                className: "border-2 border-foreground text-foreground hover:bg-foreground hover:text-background text-base sm:text-lg px-8 py-5 sm:py-6 font-bold w-full sm:w-auto",
                children: /* @__PURE__ */ jsx(Link, { to: "/what-we-do", className: "flex items-center justify-center", children: "See Our Services" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "relative w-full flex items-center justify-center animate-fade-in my-8 lg:my-0",
            style: { animationDelay: "0.2s" },
            children: [
              /* @__PURE__ */ jsx("div", { className: "lg:hidden w-full h-[350px] sm:h-[450px] flex items-center justify-center overflow-visible", children: /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsx(RadialOrbitalTimeline, { timelineData }) }) }),
              /* @__PURE__ */ jsx("div", { className: "hidden lg:block w-full h-[600px]", children: /* @__PURE__ */ jsx(RadialOrbitalTimeline, { timelineData }) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-3 sm:gap-8 mt-10 sm:mt-20 pt-10 sm:pt-20 border-t border-border animate-fade-in", style: { animationDelay: "0.6s" }, children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-1 sm:mb-2", children: "Big" }),
          /* @__PURE__ */ jsx("div", { className: "text-[11px] sm:text-sm text-muted-foreground uppercase tracking-wide font-medium", children: "SAVINGS" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-1 sm:mb-2", children: "500+" }),
          /* @__PURE__ */ jsx("div", { className: "text-[11px] sm:text-sm text-muted-foreground uppercase tracking-wide font-medium", children: "PROJECTS" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-1 sm:mb-2", children: "100%" }),
          /* @__PURE__ */ jsx("div", { className: "text-[11px] sm:text-sm text-muted-foreground uppercase tracking-wide font-medium", children: "TRANSPARENCY" })
        ] })
      ] })
    ] })
  ] });
};
const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};
const TrustedBy = () => {
  const { ref, isVisible } = useScrollAnimation();
  const stats = [
    { number: "200+", label: "Happy Clients" },
    { number: "15+", label: "Industries Served" },
    { number: "48hr", label: "Average Turnaround" },
    { number: "24/7", label: "Support Available" }
  ];
  return /* @__PURE__ */ jsx(
    "section",
    {
      ref,
      className: `py-12 sm:py-20 px-4 sm:px-6 border-t border-border transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`,
      children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-7xl", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-2xl sm:text-3xl md:text-4xl font-black text-center mb-10 sm:mb-16 leading-tight", children: [
          "Trusted by ",
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Growing Businesses" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8", children: stats.map((stat, index) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: `text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`,
            style: { transitionDelay: `${index * 100}ms` },
            children: [
              /* @__PURE__ */ jsx("div", { className: "text-3xl sm:text-5xl md:text-6xl font-black mb-1 sm:mb-2", children: stat.number }),
              /* @__PURE__ */ jsx("div", { className: "text-xs sm:text-sm text-muted-foreground uppercase tracking-wider", children: stat.label })
            ]
          },
          index
        )) })
      ] })
    }
  );
};
const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta
}) => /* @__PURE__ */ jsxs(
  "div",
  {
    className: cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl min-h-[280px]",
      "transform-gpu bg-background border border-border/50 shadow-sm transition-all duration-300 hover:shadow-md",
      className
    ),
    children: [
      /* @__PURE__ */ jsx("div", { children: background }),
      /* @__PURE__ */ jsxs("div", { className: "pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-4 sm:p-6 transition-all duration-300 group-hover:-translate-y-10", children: [
        /* @__PURE__ */ jsx(Icon, { className: "h-10 w-10 sm:h-12 sm:w-12 origin-left transform-gpu text-foreground transition-all duration-300 ease-in-out group-hover:scale-75" }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg sm:text-xl font-semibold text-foreground", children: name }),
        /* @__PURE__ */ jsx("p", { className: "max-w-lg text-sm sm:text-base text-muted-foreground", children: description })
      ] }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: cn(
            "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          ),
          children: /* @__PURE__ */ jsx(Button, { variant: "ghost", asChild: true, size: "sm", className: "pointer-events-auto", children: /* @__PURE__ */ jsxs("a", { href, children: [
            cta,
            /* @__PURE__ */ jsx(ArrowRightIcon, { className: "ml-2 h-4 w-4" })
          ] }) })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-foreground/5" })
    ]
  },
  name
);
const FadeInWhenVisible = ({
  children,
  delay = 0,
  duration = 0.5,
  className = ""
}) => {
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 30 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-50px" },
      transition: {
        duration,
        delay,
        ease: "easeOut"
      },
      className,
      style: { willChange: "opacity, transform" },
      children
    }
  );
};
const features = [
  {
    Icon: Video,
    name: "Video Production",
    description: "Professional video editing with color grading, transitions, and effects that captivate your audience.",
    href: "/what-we-do",
    cta: "Learn more",
    background: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-transparent" }),
    className: ""
  },
  {
    Icon: Globe,
    name: "Web Development",
    description: "Modern, responsive websites built with latest technologies that drive results.",
    href: "/what-we-do",
    cta: "Learn more",
    background: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-transparent" }),
    className: ""
  },
  {
    Icon: Share2,
    name: "Brand Presence",
    description: "Complete social media strategy and content management across all platforms.",
    href: "/what-we-do",
    cta: "Learn more",
    background: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-transparent" }),
    className: ""
  },
  {
    Icon: Megaphone,
    name: "Performance Marketing",
    description: "Data-driven advertising campaigns across multiple platforms.",
    href: "/what-we-do",
    cta: "Learn more",
    background: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-orange-500/20 via-red-500/20 to-transparent" }),
    className: ""
  },
  {
    Icon: Sparkles,
    name: "Motion Graphics",
    description: "Eye-catching animated graphics and explainer videos that make your content stand out.",
    href: "/what-we-do",
    cta: "Learn more",
    background: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-orange-500/20 to-transparent" }),
    className: ""
  }
];
const ServicesBento = () => {
  return /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-20 md:py-24 px-4 sm:px-6 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-7xl", children: [
    /* @__PURE__ */ jsx(FadeInWhenVisible, { children: /* @__PURE__ */ jsxs("div", { className: "text-center mb-12 sm:mb-16", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-4xl sm:text-5xl md:text-6xl font-black text-foreground mb-3 sm:mb-4", children: "What We Do" }),
      /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4", children: "Professional creative services to elevate your brand and grow your business." })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4 sm:gap-6 max-w-4xl mx-auto", children: features.map((feature, index) => /* @__PURE__ */ jsx(FadeInWhenVisible, { delay: 0.1 * index, children: /* @__PURE__ */ jsx(BentoCard, { ...feature }) }, feature.name)) })
  ] }) });
};
function DisplayCard({
  className,
  icon = /* @__PURE__ */ jsx(Sparkles, { className: "size-4 text-blue-300" }),
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  iconClassName = "text-blue-500",
  titleClassName = "text-blue-500",
  isExpanded = false,
  onClick
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "relative flex select-none flex-col justify-between rounded-xl border-2 cursor-pointer overflow-hidden",
        /* Background: solid on mobile, glassmorphic on desktop */
        "bg-card sm:bg-muted/70 sm:backdrop-blur-sm",
        /* Height: SAME across breakpoints — don't increase */
        "h-32 sm:h-36",
        /* Width: wider at every breakpoint, fills viewport properly */
        "w-[19rem] sm:w-[21rem] md:w-[22rem]",
        /* Padding */
        "px-4 py-2.5 sm:py-3",
        /* Skew — straightens when expanded */
        isExpanded ? "skew-y-0" : "-skew-y-[8deg]",
        /* Right-fade gradient — HIDDEN on mobile, visible on sm+ */
        "sm:after:absolute sm:after:-right-1 sm:after:top-[-5%] sm:after:h-[110%] sm:after:w-[16rem] md:after:w-[20rem] sm:after:bg-gradient-to-l sm:after:from-background sm:after:to-transparent sm:after:content-['']",
        /* Border */
        "border-border",
        /* Hover */
        "hover:border-white/20 hover:bg-muted",
        /* Row layout for children */
        "[&>*]:flex [&>*]:items-center [&>*]:gap-2",
        /* Smooth spring animation */
        "transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
        /* Expanded: slide up, straighten, scale, bring to front */
        isExpanded && "!-translate-y-[160px] !translate-x-0 scale-105 shadow-2xl z-50 !border-primary/40",
        className
      ),
      onClick,
      children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { className: "relative inline-block rounded-full bg-foreground/10 p-1", children: icon }),
          /* @__PURE__ */ jsx("p", { className: cn("text-base sm:text-lg font-medium leading-tight", titleClassName), children: title })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base sm:whitespace-nowrap text-foreground/80 leading-snug line-clamp-2", children: description }),
        /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-muted-foreground", children: date })
      ]
    }
  );
}
function DisplayCards({ cards }) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const defaultCards = [
    {
      className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0"
    },
    {
      className: "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0"
    },
    {
      className: "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10"
    }
  ];
  const displayCards = cards || defaultCards;
  const handleCardClick = (index) => {
    setExpandedIndex((prev) => prev === index ? null : index);
  };
  return /* @__PURE__ */ jsx("div", { className: "grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700", children: displayCards.map((cardProps, index) => /* @__PURE__ */ jsx(
    DisplayCard,
    {
      ...cardProps,
      isExpanded: expandedIndex === index,
      onClick: () => handleCardClick(index)
    },
    index
  )) });
}
const WhyChooseUs = () => {
  const { ref, isVisible } = useScrollAnimation();
  const rearOverlay = "before:absolute before:w-[100%] before:rounded-xl before:h-[100%] before:content-[''] before:left-0 before:top-0 before:transition-opacity before:duration-700 hover:before:opacity-0 sm:before:bg-blend-overlay sm:before:bg-background/50 sm:before:outline-1 sm:before:outline-border sm:grayscale-[100%] sm:hover:grayscale-0";
  const cards = [
    {
      icon: /* @__PURE__ */ jsx(DollarSign, { className: "size-4 text-emerald-400" }),
      title: "Big Savings",
      description: "Premium quality, fraction of cost",
      date: "Cost Effective",
      iconClassName: "text-emerald-500",
      titleClassName: "text-emerald-400",
      className: `[grid-area:stack] hover:-translate-y-10 ${rearOverlay}`
    },
    {
      icon: /* @__PURE__ */ jsx(Zap, { className: "size-4 text-amber-400" }),
      title: "Fast Delivery",
      description: "Rapid turnaround, top quality",
      date: "Lightning Speed",
      iconClassName: "text-amber-500",
      titleClassName: "text-amber-400",
      className: `[grid-area:stack] translate-x-[14px] translate-y-[24px] sm:translate-x-[20px] sm:translate-y-10 md:translate-x-16 md:translate-y-10 hover:-translate-y-1 ${rearOverlay}`
    },
    {
      icon: /* @__PURE__ */ jsx(Shield, { className: "size-4 text-violet-400" }),
      title: "100% Transparent",
      description: "No hidden fees, clear pricing",
      date: "Honest Pricing",
      iconClassName: "text-violet-500",
      titleClassName: "text-violet-400",
      className: `[grid-area:stack] translate-x-[28px] translate-y-[48px] sm:translate-x-[40px] sm:translate-y-20 md:translate-x-32 md:translate-y-20 hover:translate-y-6 sm:hover:translate-y-10 ${rearOverlay}`
    },
    {
      icon: /* @__PURE__ */ jsx(Users, { className: "size-4 text-blue-300" }),
      title: "24/7 Support",
      description: "Dedicated team, always available",
      date: "Always Here",
      iconClassName: "text-blue-500",
      titleClassName: "text-blue-500",
      className: "[grid-area:stack] translate-x-[42px] translate-y-[72px] sm:translate-x-[60px] sm:translate-y-[120px] md:translate-x-48 md:translate-y-[120px] hover:translate-y-14 sm:hover:translate-y-[100px]"
    }
  ];
  return /* @__PURE__ */ jsx(
    "section",
    {
      ref,
      className: `py-16 sm:py-24 md:py-32 px-5 sm:px-6 bg-background transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`,
      children: /* @__PURE__ */ jsx("div", { className: "w-full max-w-7xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-16 lg:gap-20 items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "lg:hidden w-full text-center mb-2", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-3xl sm:text-4xl font-black mb-3 leading-tight", children: [
            "Why Choose ",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "WhyCreatives?" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base text-muted-foreground leading-relaxed max-w-md mx-auto", children: "Premium quality creative services at unbeatable prices." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "hidden lg:block order-1 w-full", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-6xl lg:text-7xl font-black mb-6 leading-tight", children: [
            "Why Choose ",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "WhyCreatives?" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground mb-10 leading-relaxed max-w-xl", children: "We combine exceptional quality with unbeatable pricing to help your business grow. Our India-based team delivers professional creative services at significantly lower cost than traditional agencies." }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 p-4 border-l-2 border-border hover:border-foreground transition-colors duration-300", children: [
              /* @__PURE__ */ jsx(DollarSign, { className: "w-8 h-8 mt-1 text-foreground flex-shrink-0" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-2 text-foreground", children: "Unbeatable Value" }),
                /* @__PURE__ */ jsx("p", { className: "text-base text-muted-foreground", children: "Big savings without compromising on quality or professionalism" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 p-4 border-l-2 border-border hover:border-foreground transition-colors duration-300", children: [
              /* @__PURE__ */ jsx(Zap, { className: "w-8 h-8 mt-1 text-foreground flex-shrink-0" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-2 text-foreground", children: "Lightning Fast" }),
                /* @__PURE__ */ jsx("p", { className: "text-base text-muted-foreground", children: "Quick turnaround times with efficient workflows" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 p-4 border-l-2 border-border hover:border-foreground transition-colors duration-300", children: [
              /* @__PURE__ */ jsx(Shield, { className: "w-8 h-8 mt-1 text-foreground flex-shrink-0" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-2 text-foreground", children: "100% Transparent" }),
                /* @__PURE__ */ jsx("p", { className: "text-base text-muted-foreground", children: "Clear pricing, no hidden fees, regular updates" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 p-4 border-l-2 border-border hover:border-foreground transition-colors duration-300", children: [
              /* @__PURE__ */ jsx(Users, { className: "w-8 h-8 mt-1 text-foreground flex-shrink-0" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-2 text-foreground", children: "Dedicated Support" }),
                /* @__PURE__ */ jsx("p", { className: "text-base text-muted-foreground", children: "24/7 availability with personal account managers" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "lg:order-2 flex items-center justify-center w-full overflow-visible", children: [
          /* @__PURE__ */ jsx("div", { className: "lg:hidden w-full h-[320px] sm:h-[380px] flex items-center overflow-visible", style: { paddingLeft: "calc((100% - 346px) / 2)" }, children: /* @__PURE__ */ jsx(DisplayCards, { cards }) }),
          /* @__PURE__ */ jsx("div", { className: "hidden lg:flex items-center justify-center min-h-[500px] w-full overflow-visible", children: /* @__PURE__ */ jsx(DisplayCards, { cards }) })
        ] })
      ] }) })
    }
  );
};
const HowItWorks = () => {
  const { ref, isVisible } = useScrollAnimation();
  const steps = [
    {
      icon: MessageSquare,
      number: "01",
      title: "Tell Us Your Vision",
      description: "Share your project requirements, goals, and creative vision. We'll schedule a consultation to understand exactly what you need."
    },
    {
      icon: FileCheck,
      number: "02",
      title: "Get Your Quote",
      description: "Receive a transparent, detailed quote with no hidden fees. We'll break down the timeline and deliverables so you know exactly what to expect."
    },
    {
      icon: Rocket,
      number: "03",
      title: "We Create Magic",
      description: "Our expert team gets to work bringing your vision to life. You'll receive regular updates and have full visibility into the progress."
    },
    {
      icon: ThumbsUp,
      number: "04",
      title: "Review & Launch",
      description: "Review the final deliverables and request any revisions. Once you're 100% satisfied, we'll help you launch and provide ongoing support."
    }
  ];
  return /* @__PURE__ */ jsx(
    "section",
    {
      ref,
      className: `py-20 px-6 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`,
      children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-7xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-4xl md:text-5xl font-black mb-4", children: [
            "How It ",
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Works" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground max-w-2xl mx-auto", children: "Four simple steps from concept to completion" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-8", children: steps.map((step, index) => {
          const Icon = step.icon;
          return /* @__PURE__ */ jsxs(
            "div",
            {
              className: `relative transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`,
              style: { transitionDelay: `${index * 100}ms` },
              children: [
                /* @__PURE__ */ jsx("div", { className: "text-8xl font-black text-muted/20 absolute -top-4 -left-2 -z-10", children: step.number }),
                /* @__PURE__ */ jsx(Icon, { className: "w-12 h-12 mb-4 relative z-10" }),
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-3", children: step.title }),
                /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: step.description })
              ]
            },
            index
          );
        }) })
      ] })
    }
  );
};
function TestimonialCard({
  author,
  text,
  href,
  className
}) {
  const Card2 = href ? "a" : "div";
  const getInitials = (name) => {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };
  return /* @__PURE__ */ jsxs(
    Card2,
    {
      ...href ? { href } : {},
      className: cn(
        "flex flex-col rounded-lg border border-border/50",
        "bg-gradient-to-b from-muted/50 to-muted/10",
        "p-4 text-start sm:p-6",
        "hover:from-muted/60 hover:to-muted/20 hover:border-border",
        "max-w-[320px] sm:max-w-[320px]",
        "transition-colors duration-300",
        className
      ),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "h-12 w-12 rounded-full bg-foreground/10 flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-foreground font-bold text-sm", children: getInitials(author.name) }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-md font-semibold leading-none text-foreground", children: author.name }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: author.handle })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "sm:text-md mt-4 text-sm text-foreground/80 leading-relaxed", children: text })
      ]
    }
  );
}
function TestimonialsSection({
  title,
  description,
  testimonials,
  className
}) {
  const { ref, isVisible } = useScrollAnimation();
  return /* @__PURE__ */ jsx(
    "section",
    {
      ref,
      className: cn(
        "bg-background text-foreground",
        "py-12 sm:py-24 md:py-32 px-0",
        "transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20",
        className
      ),
      children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-container flex-col items-center gap-4 text-center sm:gap-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-4 px-4 sm:gap-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "max-w-[720px] text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight", children: title }),
          /* @__PURE__ */ jsx("p", { className: "text-md max-w-[600px] font-medium text-muted-foreground sm:text-xl", children: description })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative flex w-full flex-col items-center justify-center overflow-hidden", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)] flex-row [--duration:60s]", children: [
            /* @__PURE__ */ jsx("div", { className: "flex shrink-0 [gap:var(--gap)] animate-marquee flex-row", children: testimonials.map((testimonial, i) => /* @__PURE__ */ jsx(
              TestimonialCard,
              {
                ...testimonial
              },
              `first-${i}`
            )) }),
            /* @__PURE__ */ jsx("div", { className: "flex shrink-0 [gap:var(--gap)] animate-marquee flex-row", "aria-hidden": "true", children: testimonials.map((testimonial, i) => /* @__PURE__ */ jsx(
              TestimonialCard,
              {
                ...testimonial
              },
              `second-${i}`
            )) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-background sm:block" }),
          /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-background sm:block" })
        ] })
      ] })
    }
  );
}
const Testimonials = () => {
  const testimonials = [
    {
      author: {
        name: "Rajesh Kumar",
        handle: "CEO, TechVentures India",
        avatar: ""
      },
      text: "WhyCreatives transformed our brand identity at a fraction of what other agencies quoted. The quality exceeded our expectations and the team was incredibly responsive."
    },
    {
      author: {
        name: "Priya Sharma",
        handle: "Marketing Director, GrowthHub",
        avatar: ""
      },
      text: "We've been working with WhyCreatives for over a year now. Their video editing and social media management have been instrumental in our 300% growth."
    },
    {
      author: {
        name: "Amit Patel",
        handle: "Founder, Digital Dreams",
        avatar: ""
      },
      text: "The transparency and communication throughout the project was outstanding. No hidden fees, no surprises - just exceptional work delivered on time."
    },
    {
      author: {
        name: "Sneha Reddy",
        handle: "CTO, InnovateLabs",
        avatar: ""
      },
      text: "Fast turnaround, professional quality, and amazing value. WhyCreatives has become our go-to partner for all creative needs."
    },
    {
      author: {
        name: "Vikram Singh",
        handle: "Owner, Cafe Delight",
        avatar: ""
      },
      text: "Their social media management helped us triple our online engagement. The team truly understands what works in today's digital landscape."
    },
    {
      author: {
        name: "Ananya Iyer",
        handle: "Director, FitLife Gym",
        avatar: ""
      },
      text: "Professional video editing at unbeatable prices. Our promotional videos have never looked better, and our conversion rates prove it."
    },
    {
      author: {
        name: "Arjun Mehta",
        handle: "Founder, StartupHub",
        avatar: ""
      },
      text: "Working with WhyCreatives was a game-changer for our startup. Their creative solutions helped us stand out in a crowded market."
    },
    {
      author: {
        name: "Kavya Nair",
        handle: "Marketing Head, EcomPro",
        avatar: ""
      },
      text: "The team's dedication and creativity are unmatched. They delivered beyond our expectations every single time."
    },
    {
      author: {
        name: "Rohan Gupta",
        handle: "Creative Director, BrandWorks",
        avatar: ""
      },
      text: "Outstanding creative work with lightning-fast delivery. WhyCreatives understands our vision and brings it to life perfectly every time."
    },
    {
      author: {
        name: "Meera Desai",
        handle: "Founder, StyleHub",
        avatar: ""
      },
      text: "The best investment we made for our business. Their designs are modern, professional, and exactly what we needed to scale."
    },
    {
      author: {
        name: "Karan Malhotra",
        handle: "CEO, FinTech Solutions",
        avatar: ""
      },
      text: "Reliable, professional, and incredibly talented. WhyCreatives has been our trusted partner for all creative projects."
    },
    {
      author: {
        name: "Divya Krishnan",
        handle: "Marketing Manager, RetailPro",
        avatar: ""
      },
      text: "Their attention to detail and commitment to quality is impressive. Every project is delivered on time and exceeds expectations."
    }
  ];
  return /* @__PURE__ */ jsx(
    TestimonialsSection,
    {
      title: "What Our Clients Say",
      description: "Don't just take our word for it - hear from businesses we've helped grow",
      testimonials,
      className: "bg-background"
    }
  );
};
function FloatingPaths({ position }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    color: "currentColor",
    width: 0.5 + i * 0.03
  }));
  return /* @__PURE__ */ jsx("div", { className: "absolute inset-0 pointer-events-none", children: /* @__PURE__ */ jsxs(
    "svg",
    {
      className: "w-full h-full text-foreground",
      viewBox: "0 0 696 316",
      fill: "none",
      children: [
        /* @__PURE__ */ jsx("title", { children: "Background Paths" }),
        paths.map((path) => /* @__PURE__ */ jsx(
          motion.path,
          {
            d: path.d,
            stroke: "currentColor",
            strokeWidth: path.width,
            strokeOpacity: 0.1 + path.id * 0.03,
            initial: { pathLength: 0.3, opacity: 0.6 },
            animate: {
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0]
            },
            transition: {
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear"
            }
          },
          path.id
        ))
      ]
    }
  ) });
}
function BackgroundPaths({
  title = "Ready for Big Savings?",
  description = "Get professional creative services at unbeatable prices",
  buttonText = "Get Started Today",
  buttonLink = "/contact"
}) {
  const words = title.split(" ");
  return /* @__PURE__ */ jsxs("div", { className: "relative min-h-[60vh] w-full flex items-center justify-center overflow-hidden bg-background", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0", children: [
      /* @__PURE__ */ jsx(FloatingPaths, { position: 1 }),
      /* @__PURE__ */ jsx(FloatingPaths, { position: -1 })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "relative z-10 container mx-auto px-4 md:px-6 text-center", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true },
        transition: { duration: 2 },
        className: "max-w-4xl mx-auto",
        children: [
          /* @__PURE__ */ jsx("h1", { className: "text-5xl sm:text-7xl md:text-8xl font-bold mb-8 tracking-tighter", children: words.map((word, wordIndex) => /* @__PURE__ */ jsx(
            "span",
            {
              className: "inline-block mr-4 last:mr-0",
              children: word.split("").map((letter, letterIndex) => /* @__PURE__ */ jsx(
                motion.span,
                {
                  initial: { y: 100, opacity: 0 },
                  whileInView: { y: 0, opacity: 1 },
                  viewport: { once: true },
                  transition: {
                    delay: wordIndex * 0.1 + letterIndex * 0.03,
                    type: "spring",
                    stiffness: 150,
                    damping: 25
                  },
                  className: "inline-block text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/80",
                  children: letter
                },
                `${wordIndex}-${letterIndex}`
              ))
            },
            wordIndex
          )) }),
          /* @__PURE__ */ jsx(
            motion.p,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: 1, duration: 0.8 },
              className: "text-xl text-muted-foreground mb-10",
              children: description
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.9 },
              whileInView: { opacity: 1, scale: 1 },
              viewport: { once: true },
              transition: { delay: 1.2, duration: 0.5 },
              className: "inline-block group",
              children: /* @__PURE__ */ jsxs(
                Button,
                {
                  variant: "outline",
                  className: "rounded-2xl px-8 py-6 text-lg font-semibold bg-card text-card-foreground border-2 border-border shadow-lg hover:shadow-xl hover:bg-accent hover:text-accent-foreground transition-all duration-300 group-hover:-translate-y-0.5",
                  onClick: () => window.location.href = buttonLink,
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "opacity-90 group-hover:opacity-100 transition-opacity", children: buttonText }),
                    /* @__PURE__ */ jsx("span", { className: "ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-300", children: "→" })
                  ]
                }
              )
            }
          )
        ]
      }
    ) })
  ] });
}
const CTA = () => {
  return /* @__PURE__ */ jsx(
    BackgroundPaths,
    {
      title: "Ready for Big Savings?",
      description: "Get professional creative services at unbeatable prices",
      buttonText: "Get Started Today",
      buttonLink: "/contact"
    }
  );
};
function GooeyText({
  texts,
  morphTime = 1,
  cooldownTime = 0.25,
  className,
  textClassName
}) {
  const text1Ref = React.useRef(null);
  const text2Ref = React.useRef(null);
  React.useEffect(() => {
    let textIndex = texts.length - 1;
    let time = /* @__PURE__ */ new Date();
    let morph = 0;
    let cooldown = cooldownTime;
    let animationId;
    const setMorph = (fraction) => {
      if (text1Ref.current && text2Ref.current) {
        text2Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
        text2Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
        fraction = 1 - fraction;
        text1Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
        text1Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
      }
    };
    const doCooldown = () => {
      morph = 0;
      if (text1Ref.current && text2Ref.current) {
        text2Ref.current.style.filter = "";
        text2Ref.current.style.opacity = "100%";
        text1Ref.current.style.filter = "";
        text1Ref.current.style.opacity = "0%";
      }
    };
    const doMorph = () => {
      morph -= cooldown;
      cooldown = 0;
      let fraction = morph / morphTime;
      if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
      }
      setMorph(fraction);
    };
    function animate() {
      animationId = requestAnimationFrame(animate);
      const newTime = /* @__PURE__ */ new Date();
      const shouldIncrementIndex = cooldown > 0;
      const dt = (newTime.getTime() - time.getTime()) / 1e3;
      time = newTime;
      cooldown -= dt;
      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex = (textIndex + 1) % texts.length;
          if (text1Ref.current && text2Ref.current) {
            text1Ref.current.textContent = texts[textIndex % texts.length];
            text2Ref.current.textContent = texts[(textIndex + 1) % texts.length];
          }
        }
        doMorph();
      } else {
        doCooldown();
      }
    }
    animate();
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [texts, morphTime, cooldownTime]);
  return /* @__PURE__ */ jsxs("div", { className: cn("relative", className), children: [
    /* @__PURE__ */ jsx("svg", { className: "absolute h-0 w-0", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx("filter", { id: "threshold", children: /* @__PURE__ */ jsx(
      "feColorMatrix",
      {
        in: "SourceGraphic",
        type: "matrix",
        values: "1 0 0 0 0\r\n                      0 1 0 0 0\r\n                      0 0 1 0 0\r\n                      0 0 0 255 -140"
      }
    ) }) }) }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "flex items-center justify-center",
        style: { filter: "url(#threshold)" },
        children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              ref: text1Ref,
              className: cn(
                "absolute inline-block select-none text-center text-6xl md:text-[60pt]",
                "text-foreground",
                textClassName
              )
            }
          ),
          /* @__PURE__ */ jsx(
            "span",
            {
              ref: text2Ref,
              className: cn(
                "absolute inline-block select-none text-center text-6xl md:text-[60pt]",
                "text-foreground",
                textClassName
              )
            }
          )
        ]
      }
    )
  ] });
}
const GooeySection = () => {
  return /* @__PURE__ */ jsx("section", { className: "py-32 px-6 bg-background border-t border-border", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-7xl", children: [
    /* @__PURE__ */ jsx("div", { className: "h-[300px] flex items-center justify-center", children: /* @__PURE__ */ jsx(
      GooeyText,
      {
        texts: ["Creative", "Professional", "Affordable", "Transparent"],
        morphTime: 1,
        cooldownTime: 0.25,
        className: "font-black"
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "text-center mt-8", children: /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground max-w-2xl mx-auto", children: "Experience the difference with WhyCreatives - where quality meets affordability" }) })
  ] }) });
};
const BlurReveal = ({
  children,
  delay = 0,
  duration = 0.6,
  className = ""
}) => {
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: {
        opacity: 0,
        y: 20,
        filter: "blur(10px)"
      },
      whileInView: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)"
      },
      viewport: { once: true, margin: "-30px" },
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1]
        // Smooth cubic bezier
      },
      className,
      style: { willChange: "opacity, transform, filter" },
      children
    }
  );
};
const BlurRevealItem = ({
  children,
  delay = 0,
  className = ""
}) => {
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: {
        opacity: 0,
        x: -10,
        filter: "blur(4px)"
      },
      whileInView: {
        opacity: 1,
        x: 0,
        filter: "blur(0px)"
      },
      viewport: { once: true, margin: "-20px" },
      transition: {
        duration: 0.4,
        delay,
        ease: "easeOut"
      },
      className,
      style: { willChange: "opacity, transform, filter" },
      children
    }
  );
};
const footerLinks = {
  services: [
    { name: "Video Production", href: "/what-we-do" },
    { name: "Web Development", href: "/what-we-do" },
    { name: "Brand Presence", href: "/what-we-do" },
    { name: "Performance Marketing", href: "/what-we-do" },
    { name: "Motion Graphics", href: "/what-we-do" },
    { name: "Logo Design", href: "/what-we-do" }
  ],
  company: [
    { name: "About Us", href: "/about-us" },
    { name: "Our Work", href: "/our-work" },
    { name: "Pricing", href: "/pricing-comparison" },
    { name: "Insights", href: "/insights" },
    { name: "Contact", href: "/contact" },
    { name: "Careers", href: "/join-us" }
  ],
  locations: [
    { name: "Agartala", href: "/agartala" },
    { name: "Agra", href: "/agra" },
    { name: "Ahmedabad", href: "/ahmedabad" },
    { name: "Amritsar", href: "/amritsar" },
    { name: "Bangalore", href: "/bangalore" },
    { name: "Bhopal", href: "/bhopal" },
    { name: "Bhubaneswar", href: "/bhubaneswar" },
    { name: "Chandigarh", href: "/chandigarh" },
    { name: "Chennai", href: "/chennai" },
    { name: "Coimbatore", href: "/coimbatore" },
    { name: "Dehradun", href: "/dehradun" },
    { name: "Delhi", href: "/delhi" },
    { name: "Faridabad", href: "/faridabad" },
    { name: "Ghaziabad", href: "/ghaziabad" },
    { name: "Goa", href: "/goa" },
    { name: "Gurgaon", href: "/gurgaon" },
    { name: "Guwahati", href: "/guwahati" },
    { name: "Hyderabad", href: "/hyderabad" },
    { name: "Indore", href: "/indore" },
    { name: "Jaipur", href: "/jaipur" },
    { name: "Jodhpur", href: "/jodhpur" },
    { name: "Kanpur", href: "/kanpur" },
    { name: "Kochi", href: "/kochi" },
    { name: "Kolkata", href: "/kolkata" },
    { name: "Lucknow", href: "/lucknow" },
    { name: "Ludhiana", href: "/ludhiana" },
    { name: "Madurai", href: "/madurai" },
    { name: "Meerut", href: "/meerut" },
    { name: "Mumbai", href: "/mumbai" },
    { name: "Mysore", href: "/mysore" },
    { name: "Nagpur", href: "/nagpur" },
    { name: "Nashik", href: "/nashik" },
    { name: "Navi Mumbai", href: "/navi-mumbai" },
    { name: "Noida", href: "/noida" },
    { name: "Patna", href: "/patna" },
    { name: "Pune", href: "/pune" },
    { name: "Raipur", href: "/raipur" },
    { name: "Rajkot", href: "/rajkot" },
    { name: "Ranchi", href: "/ranchi" },
    { name: "Shillong", href: "/shillong" },
    { name: "Siliguri", href: "/siliguri" },
    { name: "Surat", href: "/surat" },
    { name: "Thane", href: "/thane" },
    { name: "Thiruvananthapuram", href: "/thiruvananthapuram" },
    { name: "Vadodara", href: "/vadodara" },
    { name: "Varanasi", href: "/varanasi" },
    { name: "Vijayawada", href: "/vijayawada" },
    { name: "Visakhapatnam", href: "/visakhapatnam" }
  ]
};
const Footer = () => {
  return /* @__PURE__ */ jsxs("footer", { className: "relative bg-background overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-foreground/[0.02] to-transparent pointer-events-none" }),
    /* @__PURE__ */ jsxs("div", { className: "relative border-t border-border/50", children: [
      /* @__PURE__ */ jsx("div", { className: "container mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center lg:text-left max-w-2xl", children: [
          /* @__PURE__ */ jsx(BlurReveal, { delay: 0, children: /* @__PURE__ */ jsxs("h2", { className: "text-3xl sm:text-4xl md:text-5xl font-black mb-4 text-foreground", children: [
            "Ready to create",
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: " something amazing?" })
          ] }) }),
          /* @__PURE__ */ jsx(BlurReveal, { delay: 0.1, children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-lg", children: "Let's bring your vision to life. Get a free quote within 2 hours." }) })
        ] }),
        /* @__PURE__ */ jsx(BlurReveal, { delay: 0.2, children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [
          /* @__PURE__ */ jsx(Button, { size: "lg", asChild: true, className: "bg-background text-foreground hover:bg-muted font-bold px-8 py-6 rounded-full group shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-border/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.16)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all", children: /* @__PURE__ */ jsxs(Link, { to: "/contact", className: "flex items-center gap-2", children: [
            "Start a Project",
            /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5 group-hover:translate-x-1 transition-transform" })
          ] }) }),
          /* @__PURE__ */ jsx(Button, { size: "lg", variant: "outline", asChild: true, className: "border-border hover:bg-muted text-foreground px-8 py-6 rounded-full bg-transparent", children: /* @__PURE__ */ jsxs("a", { href: "tel:+918119811655", className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Phone, { className: "w-5 h-5" }),
            "Call Us"
          ] }) })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "container mx-auto max-w-7xl px-4 sm:px-6 py-12 border-t border-border/50", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row justify-between gap-12 lg:gap-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-1/3 flex flex-col items-center sm:items-start text-center sm:text-left gap-6", children: [
          /* @__PURE__ */ jsx(BlurReveal, { delay: 0, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: "/logo.png",
                alt: "WhyCreatives Logo",
                className: "w-10 h-10 dark:invert"
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground", children: "WhyCreatives" })
          ] }) }),
          /* @__PURE__ */ jsx(BlurReveal, { delay: 0.1, children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm max-w-sm", children: "We are a full-service creative agency based in Guwahati, Assam, dedicated to transforming brands through innovative storytelling, cutting-edge design, and strategic digital solutions." }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(BlurReveal, { delay: 0.1, children: /* @__PURE__ */ jsx("h3", { className: "text-foreground font-bold text-sm uppercase tracking-wider mb-6", children: "Services" }) }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: footerLinks.services.map((link, index) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(BlurRevealItem, { delay: 0.15 + 0.05 * index, children: /* @__PURE__ */ jsx(
              Link,
              {
                to: link.href,
                className: "text-muted-foreground hover:text-foreground transition-colors text-sm",
                children: link.name
              }
            ) }) }, link.name)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(BlurReveal, { delay: 0.2, children: /* @__PURE__ */ jsx("h3", { className: "text-foreground font-bold text-sm uppercase tracking-wider mb-6", children: "Company" }) }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: footerLinks.company.map((link, index) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(BlurRevealItem, { delay: 0.25 + 0.05 * index, children: /* @__PURE__ */ jsx(
              Link,
              {
                to: link.href,
                className: "text-muted-foreground hover:text-foreground transition-colors text-sm",
                children: link.name
              }
            ) }) }, link.name)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
            /* @__PURE__ */ jsx(BlurReveal, { delay: 0.3, children: /* @__PURE__ */ jsx("h3", { className: "text-foreground font-bold text-sm uppercase tracking-wider mb-6", children: "Locations We Serve" }) }),
            /* @__PURE__ */ jsx("ul", { className: "columns-2 sm:columns-3 gap-4 space-y-3", children: footerLinks.locations.map((link, index) => /* @__PURE__ */ jsx("li", { className: "break-inside-avoid", children: /* @__PURE__ */ jsx(BlurRevealItem, { delay: 0.35 + 0.02 * (index % 10), children: /* @__PURE__ */ jsx(
              Link,
              {
                to: link.href,
                className: "text-muted-foreground hover:text-foreground transition-colors text-sm whitespace-nowrap",
                children: link.name
              }
            ) }) }, link.name)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(BlurReveal, { delay: 0.4, children: /* @__PURE__ */ jsx("h3", { className: "text-foreground font-bold text-sm uppercase tracking-wider mb-6", children: "Contact" }) }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-4", children: [
              /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(BlurRevealItem, { delay: 0.45, children: /* @__PURE__ */ jsxs(
                "a",
                {
                  href: "mailto:hello@whycreatives.in",
                  className: "flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors text-sm break-all",
                  children: [
                    /* @__PURE__ */ jsx(Mail, { className: "w-4 h-4 flex-shrink-0" }),
                    "hello@whycreatives.in"
                  ]
                }
              ) }) }),
              /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(BlurRevealItem, { delay: 0.5, children: /* @__PURE__ */ jsxs(
                "a",
                {
                  href: "tel:+918119811655",
                  className: "flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors text-sm",
                  children: [
                    /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4 flex-shrink-0" }),
                    "+91 81198 11655"
                  ]
                }
              ) }) }),
              /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(BlurRevealItem, { delay: 0.55, children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 text-muted-foreground text-sm", children: [
                /* @__PURE__ */ jsx(MapPin, { className: "w-4 h-4 flex-shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsx("span", { children: "Guwahati, Assam, India" })
              ] }) }) })
            ] }),
            /* @__PURE__ */ jsx(BlurReveal, { delay: 0.5, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mt-6", children: [
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "https://www.instagram.com/why_creatives/",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "w-10 h-10 rounded-full bg-foreground/5 hover:bg-foreground/10 text-foreground flex items-center justify-center transition-colors",
                  "aria-label": "Instagram",
                  children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" }) })
                }
              ),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "https://www.linkedin.com/company/whycreatives/",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "w-10 h-10 rounded-full bg-foreground/5 hover:bg-foreground/10 text-foreground flex items-center justify-center transition-colors",
                  "aria-label": "LinkedIn",
                  children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" }) })
                }
              ),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "https://twitter.com/why_creatives",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "w-10 h-10 rounded-full bg-foreground/5 hover:bg-foreground/10 text-foreground flex items-center justify-center transition-colors",
                  "aria-label": "Twitter",
                  children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" }) })
                }
              )
            ] }) })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "container mx-auto max-w-7xl px-4 sm:px-6 py-6 border-t border-border/50", children: /* @__PURE__ */ jsx(BlurReveal, { delay: 0.6, children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground text-sm", children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " Why Creatives. All rights reserved."
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6", children: [
          /* @__PURE__ */ jsx(Link, { to: "/privacy-policy", className: "text-muted-foreground hover:text-foreground text-sm transition-colors", children: "Privacy Policy" }),
          /* @__PURE__ */ jsx(Link, { to: "/terms", className: "text-muted-foreground hover:text-foreground text-sm transition-colors", children: "Terms of Service" })
        ] })
      ] }) }) })
    ] })
  ] });
};
const Index = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "WhyCreatives",
    "url": "https://whycreatives.in",
    "logo": "https://whycreatives.in/logo.png",
    "sameAs": [
      "https://www.instagram.com/whycreatives.in",
      "https://www.linkedin.com/company/whycreatives",
      "https://twitter.com/whycreatives"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-81198-11655",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["en", "hi"]
    }
  };
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "WhyCreatives",
    "url": "https://whycreatives.in",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "{search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "WhyCreatives | India's #1 Most Affordable Creative Agency" }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: "Award-winning video editing, web design, and digital marketing agency in India. Premium quality starting at ₹4,999. Get your free consultation today!" }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://whycreatives.in" }),
      /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(organizationSchema) }),
      /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(websiteSchema) })
    ] }),
    /* @__PURE__ */ jsx(Navigation, {}),
    /* @__PURE__ */ jsx(Hero, {}),
    /* @__PURE__ */ jsx(TrustedBy, {}),
    /* @__PURE__ */ jsx(ServicesBento, {}),
    /* @__PURE__ */ jsx(WhyChooseUs, {}),
    /* @__PURE__ */ jsx(HowItWorks, {}),
    /* @__PURE__ */ jsx(Testimonials, {}),
    /* @__PURE__ */ jsx(CTA, {}),
    /* @__PURE__ */ jsx(GooeySection, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const SUPABASE_URL = "https://renskjrttadhptrwnobz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlbnNranJ0dGFkaHB0cndub2J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5MzE2MTgsImV4cCI6MjA3ODUwNzYxOH0.w1njTYtB3x9QVErGQJJLsCWA3jv2LAsQQdt-2ZW0NoU";
const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      storage: typeof window !== "undefined" ? window.localStorage : void 0,
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    },
    global: {
      headers: {
        "x-application-name": "whycreatives"
      }
    }
  }
);
const Insights = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const { data, error: err } = await supabase.from("insights").select("*").eq("is_published", true).order("published_at", { ascending: false });
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
  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };
  const featuredArticle = articles[0];
  const otherArticles = articles.slice(1);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Insights & Resources | WhyCreatives - Marketing Tips & Strategies" }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: "Expert insights on digital marketing, SEO, video production, and creative strategies for Indian businesses." }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://whycreatives.in/insights" })
    ] }),
    /* @__PURE__ */ jsx(Navigation, {}),
    /* @__PURE__ */ jsxs("main", { className: "pt-28 pb-24", children: [
      /* @__PURE__ */ jsx("section", { className: "max-w-6xl mx-auto px-6 mb-16", children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          className: "text-center max-w-3xl mx-auto",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full mb-6 border border-border", children: [
              /* @__PURE__ */ jsx(Sparkles, { className: "w-4 h-4 text-emerald-500" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: "Fresh insights every week" })
            ] }),
            /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-6xl lg:text-7xl font-black text-foreground mb-6 tracking-tight", children: [
              "Insights &",
              " ",
              /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Resources" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto", children: "Expert perspectives on digital marketing, creative strategies, and business growth for Indian businesses." })
          ]
        }
      ) }),
      loading && /* @__PURE__ */ jsx("section", { className: "max-w-6xl mx-auto px-6", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-8 mb-12", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-muted/30 rounded-3xl p-8 animate-pulse h-[400px]" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-6", children: [1, 2].map((i) => /* @__PURE__ */ jsx("div", { className: "bg-muted/30 rounded-2xl p-6 animate-pulse h-[180px]" }, i)) })
      ] }) }),
      error && !loading && /* @__PURE__ */ jsxs("section", { className: "max-w-2xl mx-auto px-6 text-center py-20", children: [
        /* @__PURE__ */ jsx(BookOpen, { className: "w-16 h-16 text-white/20 mx-auto mb-6" }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-4", children: "Unable to Load Articles" }),
        /* @__PURE__ */ jsx("p", { className: "text-white/60 mb-6", children: error }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => window.location.reload(),
            className: "bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-white/90 transition-colors",
            children: "Try Again"
          }
        )
      ] }),
      !loading && !error && articles.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("section", { className: "max-w-6xl mx-auto px-6 mb-16", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-8", children: [
          featuredArticle && /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.1 },
              children: /* @__PURE__ */ jsxs(
                Link,
                {
                  to: `/insights/${featuredArticle.slug}`,
                  className: "group block h-full bg-card hover:bg-muted/50 rounded-3xl p-8 shadow-sm hover:shadow-md border border-border/50 hover:border-border transition-all duration-300",
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
                      /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-semibold", children: [
                        /* @__PURE__ */ jsx(TrendingUp, { className: "w-3 h-3" }),
                        "Featured"
                      ] }),
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: featuredArticle.category })
                    ] }),
                    /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight group-hover:text-primary transition-colors", children: featuredArticle.title }),
                    /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-6 leading-relaxed line-clamp-3", children: featuredArticle.meta_description }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mt-auto pt-6 border-t border-border/50", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-sm text-muted-foreground", children: [
                        /* @__PURE__ */ jsx("span", { children: formatDate(featuredArticle.published_at) }),
                        featuredArticle.read_time && /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                          /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4" }),
                          featuredArticle.read_time,
                          " min"
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2 text-foreground font-medium group-hover:gap-3 transition-all", children: [
                        "Read ",
                        /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
                      ] })
                    ] })
                  ]
                }
              )
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "space-y-6", children: otherArticles.slice(0, 2).map((article, i) => /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.2 + i * 0.1 },
              children: /* @__PURE__ */ jsxs(
                Link,
                {
                  to: `/insights/${article.slug}`,
                  className: "group block bg-card hover:bg-muted/50 rounded-2xl p-6 shadow-sm hover:shadow-md border border-border/50 hover:border-border transition-all duration-300",
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: article.category }),
                      /* @__PURE__ */ jsx("span", { className: "text-muted-foreground/40", children: "•" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: formatDate(article.published_at) })
                    ] }),
                    /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2", children: article.title }),
                    /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm mb-4 line-clamp-2", children: article.meta_description }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                      article.read_time && /* @__PURE__ */ jsxs("span", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
                        /* @__PURE__ */ jsx(Clock, { className: "w-3 h-3" }),
                        article.read_time,
                        " min read"
                      ] }),
                      /* @__PURE__ */ jsxs("span", { className: "text-sm text-muted-foreground flex items-center gap-1 group-hover:text-foreground group-hover:gap-2 transition-all", children: [
                        "Read more ",
                        /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
                      ] })
                    ] })
                  ]
                }
              )
            },
            article.id
          )) })
        ] }) }),
        otherArticles.length > 2 && /* @__PURE__ */ jsxs("section", { className: "max-w-6xl mx-auto px-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-foreground mb-8", children: "More Articles" }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: otherArticles.slice(2).map((article, i) => /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.3 + i * 0.05 },
              children: /* @__PURE__ */ jsxs(
                Link,
                {
                  to: `/insights/${article.slug}`,
                  className: "group block h-full bg-card hover:bg-muted/50 rounded-2xl p-6 shadow-sm hover:shadow-md border border-border/50 hover:border-border transition-all duration-300",
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: article.category }),
                    /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-foreground mt-3 mb-2 group-hover:text-primary transition-colors line-clamp-2", children: article.title }),
                    /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm mb-4 line-clamp-2", children: article.meta_description }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pt-4 border-t border-border/50 mt-auto", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: formatDate(article.published_at) }),
                      /* @__PURE__ */ jsxs("span", { className: "text-sm text-muted-foreground flex items-center gap-1 group-hover:text-foreground transition-colors", children: [
                        "Read ",
                        /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
                      ] })
                    ] })
                  ]
                }
              )
            },
            article.id
          )) })
        ] }),
        /* @__PURE__ */ jsx("section", { className: "max-w-4xl mx-auto px-6 mt-20", children: /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.4 },
            className: "relative overflow-hidden rounded-3xl shadow-sm bg-card border border-border/50 p-10 md:p-14",
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(150,150,150,0.03),transparent_50%)]" }),
              /* @__PURE__ */ jsxs("div", { className: "relative text-center", children: [
                /* @__PURE__ */ jsx(Sparkles, { className: "w-10 h-10 text-muted-foreground mx-auto mb-4" }),
                /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-foreground mb-4", children: "Need Expert Creative Services?" }),
                /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-8 max-w-xl mx-auto text-lg", children: "From video production to web design, we help Indian businesses grow with affordable, high-quality creative solutions." }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
                  /* @__PURE__ */ jsxs(
                    Link,
                    {
                      to: "/contact",
                      className: "inline-flex items-center justify-center gap-2 bg-foreground text-background px-8 py-4 rounded-full font-bold hover:opacity-90 transition-all hover:scale-105",
                      children: [
                        "Get Free Quote ",
                        /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    Link,
                    {
                      to: "/what-we-do",
                      className: "inline-flex items-center justify-center gap-2 bg-transparent text-foreground px-8 py-4 rounded-full font-bold hover:bg-muted transition-all border border-border/50",
                      children: "View Services"
                    }
                  )
                ] })
              ] })
            ]
          }
        ) })
      ] }),
      !loading && !error && articles.length === 0 && /* @__PURE__ */ jsxs("section", { className: "max-w-2xl mx-auto px-6 text-center py-20", children: [
        /* @__PURE__ */ jsx(BookOpen, { className: "w-20 h-20 text-white/10 mx-auto mb-8" }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-4", children: "Coming Soon" }),
        /* @__PURE__ */ jsx("p", { className: "text-white/60 mb-8 text-lg", children: "We are crafting valuable insights on marketing, design, and business growth. Check back soon!" }),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/contact",
            className: "inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-white/90 transition-colors",
            children: "Get in Touch"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const InsightArticle = () => {
  const { slug } = useParams();
  const { data: insight, isLoading, error } = useQuery({
    queryKey: ["insight", slug],
    queryFn: async () => {
      const { data, error: error2 } = await supabase.from("insights").select("*").eq("slug", slug).eq("is_published", true).single();
      if (error2) throw error2;
      return data;
    },
    enabled: !!slug
  });
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };
  const handleShare = async () => {
    if (navigator.share && insight) {
      try {
        await navigator.share({
          title: insight.title,
          text: insight.meta_description,
          url: window.location.href
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
      /* @__PURE__ */ jsx(Navigation, {}),
      /* @__PURE__ */ jsx("main", { className: "pt-32 pb-24", children: /* @__PURE__ */ jsx("div", { className: "max-w-[720px] mx-auto px-6", children: /* @__PURE__ */ jsxs("div", { className: "animate-pulse space-y-8", children: [
        /* @__PURE__ */ jsx("div", { className: "h-4 bg-white/5 rounded w-32" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("div", { className: "h-12 bg-white/5 rounded w-full" }),
          /* @__PURE__ */ jsx("div", { className: "h-12 bg-white/5 rounded w-3/4" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "h-6 bg-white/5 rounded w-full" }),
        /* @__PURE__ */ jsx("div", { className: "h-px bg-white/10" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-4", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsx("div", { className: "h-4 bg-white/5 rounded w-full" }, i)) })
      ] }) }) })
    ] });
  }
  if (error || !insight) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/insights", replace: true });
  }
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsxs("title", { children: [
        insight.title,
        " | WhyCreatives Insights"
      ] }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: insight.meta_description }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: `https://whycreatives.in/insights/${insight.slug}` }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: insight.title }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: insight.meta_description }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "article" })
    ] }),
    /* @__PURE__ */ jsx(Navigation, {}),
    /* @__PURE__ */ jsxs("article", { className: "pt-28 pb-20", children: [
      /* @__PURE__ */ jsxs("header", { className: "max-w-[720px] mx-auto px-6 mb-12", children: [
        /* @__PURE__ */ jsxs(
          motion.nav,
          {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            className: "flex items-center gap-2 text-sm text-muted-foreground mb-8",
            children: [
              /* @__PURE__ */ jsx(Link, { to: "/", className: "hover:text-foreground transition-colors", children: "Home" }),
              /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsx(Link, { to: "/insights", className: "hover:text-foreground transition-colors", children: "Insights" }),
              /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsx("span", { className: "text-foreground/60 truncate max-w-[200px]", children: insight.category || "Article" })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.05 },
            className: "mb-6",
            children: /* @__PURE__ */ jsx("span", { className: "inline-block px-4 py-1.5 text-xs font-semibold tracking-wider uppercase bg-muted text-foreground rounded-full border border-border/50", children: insight.category || "Insights" })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.h1,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.1 },
            className: "text-4xl md:text-5xl lg:text-[3.5rem] font-black text-foreground leading-[1.1] tracking-tight mb-8",
            children: insight.title
          }
        ),
        /* @__PURE__ */ jsx(
          motion.p,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.15 },
            className: "text-xl text-muted-foreground leading-relaxed mb-8",
            children: insight.meta_description
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.2 },
            className: "flex flex-wrap items-center justify-between gap-4 py-6 border-y border-border/50",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground font-bold text-sm border border-border/50", children: "WC" }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-foreground font-medium", children: insight.author || "WhyCreatives" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Content Team" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsx("span", { children: formatDate(insight.published_at) })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    insight.read_time || 5,
                    " min read"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: handleShare,
                  className: "flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground bg-muted hover:bg-muted/80 rounded-full transition-all",
                  children: [
                    /* @__PURE__ */ jsx(Share2, { className: "w-4 h-4" }),
                    "Share"
                  ]
                }
              ) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.3 },
          className: "max-w-[720px] mx-auto px-6",
          children: [
            /* @__PURE__ */ jsx("div", { className: "article-content", children: /* @__PURE__ */ jsx(
              ReactMarkdown,
              {
                remarkPlugins: [remarkGfm],
                components: {
                  h1: ({ children }) => /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-4xl font-black text-foreground mt-16 mb-6 leading-tight", children }),
                  h2: ({ children }) => /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-foreground mt-14 mb-5 leading-tight", children }),
                  h3: ({ children }) => /* @__PURE__ */ jsx("h3", { className: "text-xl md:text-2xl font-semibold text-foreground mt-10 mb-4 leading-snug", children }),
                  p: ({ children }) => /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground leading-[1.8] mb-6", children }),
                  ul: ({ children }) => /* @__PURE__ */ jsx("ul", { className: "my-6 ml-1 space-y-3", children }),
                  ol: ({ children }) => /* @__PURE__ */ jsx("ol", { className: "my-6 ml-1 space-y-3 list-decimal list-inside text-muted-foreground", children }),
                  li: ({ children }) => /* @__PURE__ */ jsxs("li", { className: "text-lg text-muted-foreground leading-[1.7] pl-2 flex gap-3", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-muted-foreground/40 mt-1", children: "•" }),
                    /* @__PURE__ */ jsx("span", { children })
                  ] }),
                  strong: ({ children }) => /* @__PURE__ */ jsx("strong", { className: "font-semibold text-foreground", children }),
                  em: ({ children }) => /* @__PURE__ */ jsx("em", { className: "italic text-foreground/80", children }),
                  blockquote: ({ children }) => /* @__PURE__ */ jsx("blockquote", { className: "my-8 pl-6 py-4 border-l-4 border-primary/30 bg-muted rounded-r-lg", children: /* @__PURE__ */ jsx("div", { className: "text-lg text-foreground/80 italic leading-relaxed", children }) }),
                  a: ({ href, children }) => {
                    if (href?.startsWith("/")) {
                      return /* @__PURE__ */ jsx(
                        Link,
                        {
                          to: href,
                          className: "text-foreground hover:text-primary underline underline-offset-4 decoration-border hover:decoration-primary/60 transition-colors",
                          children
                        }
                      );
                    }
                    return /* @__PURE__ */ jsx(
                      "a",
                      {
                        href,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "text-foreground hover:text-primary underline underline-offset-4 decoration-border hover:decoration-primary/60 transition-colors",
                        children
                      }
                    );
                  },
                  table: ({ children }) => /* @__PURE__ */ jsx("div", { className: "my-8 overflow-x-auto rounded-xl border border-border/50", children: /* @__PURE__ */ jsx("table", { className: "w-full text-left", children }) }),
                  thead: ({ children }) => /* @__PURE__ */ jsx("thead", { className: "bg-muted border-b border-border/50", children }),
                  th: ({ children }) => /* @__PURE__ */ jsx("th", { className: "px-5 py-4 text-sm font-semibold text-foreground uppercase tracking-wider", children }),
                  td: ({ children }) => /* @__PURE__ */ jsx("td", { className: "px-5 py-4 text-base text-muted-foreground border-b border-border/50", children }),
                  hr: () => /* @__PURE__ */ jsx("hr", { className: "my-12 border-0 h-px bg-border/50" }),
                  code: ({ children }) => /* @__PURE__ */ jsx("code", { className: "px-2 py-1 text-sm bg-muted text-foreground/80 rounded font-mono", children }),
                  pre: ({ children }) => /* @__PURE__ */ jsx("pre", { className: "my-6 p-5 bg-card border border-border/50 rounded-xl overflow-x-auto text-foreground", children })
                },
                children: insight.content_markdown
              }
            ) }),
            insight.tags && insight.tags.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-12 pt-8 border-t border-border/50", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Tagged with:" }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: insight.tags.map((tag) => /* @__PURE__ */ jsx(
                "span",
                {
                  className: "px-4 py-2 text-sm bg-muted hover:bg-muted/80 text-muted-foreground rounded-full transition-colors cursor-default border border-border/50",
                  children: tag
                },
                tag
              )) })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.4 },
          className: "max-w-[720px] mx-auto px-6 mt-16",
          children: /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-3xl shadow-sm bg-card border border-border/50 p-10 md:p-12", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(150,150,150,0.05),transparent_50%)]" }),
            /* @__PURE__ */ jsxs("div", { className: "relative text-center", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-2xl md:text-3xl font-bold text-foreground mb-4", children: "Ready to Grow Your Business?" }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-8 max-w-md mx-auto text-lg", children: "Get expert creative services at India's most affordable prices. Video, web, marketing & more." }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    to: "/contact",
                    className: "inline-flex items-center justify-center gap-2 bg-foreground text-background px-8 py-4 rounded-full font-bold hover:opacity-90 transition-all hover:scale-105",
                    children: "Get Free Quote"
                  }
                ),
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    to: "/what-we-do",
                    className: "inline-flex items-center justify-center gap-2 bg-transparent text-foreground px-8 py-4 rounded-full font-bold hover:bg-muted transition-all border border-border/50",
                    children: "View Services"
                  }
                )
              ] })
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "max-w-[720px] mx-auto px-6 mt-12", children: /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/insights",
          className: "inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group",
          children: [
            /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4 group-hover:-translate-x-1 transition-transform" }),
            "Back to all insights"
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const WhatWeDo = lazy(() => import("./assets/WhatWeDo-D3Is0DLL.js"));
const OurWork = lazy(() => import("./assets/OurWork-DzMGIWFm.js"));
const PortfolioGallery = lazy(() => import("./assets/PortfolioGallery-XZiqso7e.js"));
const Comparison = lazy(() => import("./assets/Comparison-BlWqKSDR.js"));
const ContactPage = lazy(() => import("./assets/ContactPage-GjvrijaC.js"));
const AboutUs = lazy(() => import("./assets/AboutUs-BmF6T0kq.js"));
const People = lazy(() => import("./assets/People-DOuH2V-k.js"));
const JoinUs = lazy(() => import("./assets/JoinUs-CbrfCmdW.js"));
const AdminDashboard = lazy(() => import("./assets/AdminDashboard-ChWWpnFS.js"));
const AdminLogin = lazy(() => import("./assets/AdminLogin-C14nYeKv.js"));
const NotFound = lazy(() => import("./assets/NotFound-B8NgJ_7D.js"));
const LocationPage = lazy(() => import("./assets/LocationPage-D_EsTChV.js"));
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1e3 * 60 * 5,
      gcTime: 1e3 * 60 * 10,
      refetchOnWindowFocus: false
    }
  }
});
const PageLoader = () => /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-background flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
  /* @__PURE__ */ jsxs("div", { className: "relative w-16 h-16 mx-auto mb-4", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-full border-4 border-white/20" }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-full border-4 border-transparent border-t-white animate-spin" })
  ] }),
  /* @__PURE__ */ jsx("p", { className: "text-muted-foreground animate-pulse", children: "Loading..." })
] }) });
const App = () => /* @__PURE__ */ jsx(ThemeProvider, { defaultTheme: "system", storageKey: "vite-ui-theme", children: /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxs(TooltipProvider, { children: [
  /* @__PURE__ */ jsx(Toaster$1, {}),
  /* @__PURE__ */ jsx(Toaster, {}),
  /* @__PURE__ */ jsx(Toaster$1, {}),
  /* @__PURE__ */ jsx(Toaster, {}),
  /* @__PURE__ */ jsx(ScrollToTop, {}),
  /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(PageLoader, {}), children: /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Index, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/what-we-do", element: /* @__PURE__ */ jsx(WhatWeDo, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/our-work", element: /* @__PURE__ */ jsx(OurWork, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/portfolio-gallery", element: /* @__PURE__ */ jsx(PortfolioGallery, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/insights", element: /* @__PURE__ */ jsx(Insights, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/insights/:slug", element: /* @__PURE__ */ jsx(InsightArticle, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/about-us", element: /* @__PURE__ */ jsx(AboutUs, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/people", element: /* @__PURE__ */ jsx(People, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/join-us", element: /* @__PURE__ */ jsx(JoinUs, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/pricing-comparison", element: /* @__PURE__ */ jsx(Comparison, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/contact", element: /* @__PURE__ */ jsx(ContactPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/admin-login", element: /* @__PURE__ */ jsx(AdminLogin, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/admindashboard", element: /* @__PURE__ */ jsx(AdminDashboard, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/comparison", element: /* @__PURE__ */ jsx(Navigate, { to: "/pricing-comparison", replace: true }) }),
    /* @__PURE__ */ jsx(Route, { path: "/:location", element: /* @__PURE__ */ jsx(LocationPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/services/*", element: /* @__PURE__ */ jsx(Navigate, { to: "/what-we-do", replace: true }) }),
    /* @__PURE__ */ jsx(Route, { path: "/404", element: /* @__PURE__ */ jsx(NotFound, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(NotFound, {}) })
  ] }) })
] }) }) });
const createApp = ViteReactSSG(
  {
    routes: [
      {
        path: "/",
        element: /* @__PURE__ */ jsx(App, {})
      }
    ]
  }
);
export {
  Button as B,
  Card as C,
  FadeInWhenVisible as F,
  Navigation as N,
  RadialOrbitalTimeline as R,
  Spotlight as S,
  Footer as a,
  BackgroundPaths as b,
  cn as c,
  createApp,
  supabase as s,
  useToast as u
};
