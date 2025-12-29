import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
    },
  },
});

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="text-center">
      <div className="relative w-16 h-16 mx-auto mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-white/20"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-white animate-spin"></div>
      </div>
      <p className="text-muted-foreground animate-pulse">Loading...</p>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
            <Route path="/:location" element={<LocationPage />} />

            {/* 404 Page */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
