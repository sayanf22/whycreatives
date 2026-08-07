import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { lazy, Suspense } from "react";

// Eager load homepage and insights for instant display
import Index from "./pages/Index";
import Insights from "./pages/Insights";
import InsightArticle from "./pages/InsightArticle";

// Lazy load all other pages
const WhatWeDo = lazy(() => import("./pages/WhatWeDo"));
const OurWork = lazy(() => import("./pages/OurWork"));
const PortfolioGallery = lazy(() => import("./pages/PortfolioGallery"));
const Comparison = lazy(() => import("./pages/Comparison"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const People = lazy(() => import("./pages/People"));
const JoinUs = lazy(() => import("./pages/JoinUs"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const NotFound = lazy(() => import("./pages/NotFound"));
const LocationPage = lazy(() => import("./pages/LocationPage"));
const AllLocations = lazy(() => import("./pages/AllLocations"));
const ServiceDetails = lazy(() => import("./pages/ServiceDetails"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
    },
  },
});

/**
 * Route-level loading skeleton.
 *
 * Mirrors the shared page chrome (fixed nav + `pt-32 pb-24 px-4` /
 * `max-w-7xl` content well) so the layout doesn't jump when the chunk lands.
 * Uses `foreground/…` tokens rather than fixed neutrals — the previous spinner
 * was white-on-white and effectively invisible in light mode.
 */
const PageLoader = () => (
  <div className="min-h-screen bg-background">
    {/* nav placeholder — same height and gutters as <Navigation /> */}
    <div
      className="fixed inset-x-0 top-0 z-[60] bg-background py-6"
      style={{
        paddingLeft: "clamp(20px, 3.2vw, 84px)",
        paddingRight: "clamp(20px, 3.2vw, 84px)",
      }}
    >
      <div className="flex animate-pulse items-center justify-between">
        <div className="h-7 w-40 rounded-lg bg-foreground/10" />
        <div className="hidden items-center gap-10 lg:flex">
          {[56, 40, 46, 36, 54].map((w, i) => (
            <div key={i} className="h-3 rounded bg-foreground/10" style={{ width: w }} />
          ))}
        </div>
        <div className="flex items-center gap-4">
          <div className="h-8 w-8 rounded-full bg-foreground/10" />
          <div className="h-10 w-32 rounded-full bg-foreground/10" />
        </div>
      </div>
    </div>

    <div className="px-4 pb-24 pt-32">
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="mb-16 text-center">
          <div className="mx-auto mb-6 h-12 w-[280px] rounded-2xl bg-foreground/10 md:h-[72px] md:w-[380px]" />
          <div className="mx-auto max-w-3xl space-y-3">
            <div className="h-5 w-full rounded-lg bg-foreground/[0.07]" />
            <div className="mx-auto h-5 w-[85%] rounded-lg bg-foreground/[0.07]" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="aspect-[16/9] w-full rounded-2xl border border-black/10 bg-foreground/[0.07] dark:border-white/10"
            />
          ))}
        </div>
      </div>
    </div>
    <span className="sr-only" role="status" aria-live="polite">
      Loading page
    </span>
  </div>
);

import { ThemeProvider } from "@/components/ThemeProvider";

const App = () => (
  <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Toaster />
        <Sonner />
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Main Pages */}
            <Route path="/" element={<Index />} />
            <Route path="/what-we-do" element={<WhatWeDo />} />
            <Route path="/our-work" element={<OurWork />} />
            <Route path="/portfolio-gallery" element={<PortfolioGallery />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/insights/:slug" element={<InsightArticle />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/people" element={<People />} />
            <Route path="/join-us" element={<JoinUs />} />
            <Route path="/pricing-comparison" element={<Comparison />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Admin Routes */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admindashboard" element={<AdminDashboard />} />

            {/* Redirects */}
            <Route path="/comparison" element={<Navigate to="/pricing-comparison" replace />} />

            {/* SEO Location Pages - Professional Landing Pages */}
            <Route path="/areas-we-serve" element={<AllLocations />} />
            <Route path="/:location" element={<LocationPage />} />

            {/* Service Details Page */}
            <Route path="/services/:slug" element={<ServiceDetails />} />

            {/* 404 Page */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
