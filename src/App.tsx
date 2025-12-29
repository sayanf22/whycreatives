import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { lazy, Suspense } from "react";

// Eager load homepage for instant display
import Index from "./pages/Index";

// Lazy load all other pages
const WhatWeDo = lazy(() => import("./pages/WhatWeDo"));
const OurWork = lazy(() => import("./pages/OurWork"));
const PortfolioGallery = lazy(() => import("./pages/PortfolioGallery"));
const Comparison = lazy(() => import("./pages/Comparison"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const Insights = lazy(() => import("./pages/Insights"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const People = lazy(() => import("./pages/People"));
const JoinUs = lazy(() => import("./pages/JoinUs"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const NotFound = lazy(() => import("./pages/NotFound"));

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
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/people" element={<People />} />
            <Route path="/join-us" element={<JoinUs />} />
            <Route path="/pricing-comparison" element={<Comparison />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admindashboard" element={<AdminDashboard />} />

            {/* Redirects - Old URLs to Homepage */}
            <Route path="/comparison" element={<Navigate to="/pricing-comparison" replace />} />
            
            {/* Redirect all old SEO location/service pages to homepage */}
            <Route path="/agartala" element={<Navigate to="/" replace />} />
            <Route path="/tripura" element={<Navigate to="/" replace />} />
            <Route path="/guwahati" element={<Navigate to="/" replace />} />
            <Route path="/assam" element={<Navigate to="/" replace />} />
            <Route path="/shillong" element={<Navigate to="/" replace />} />
            <Route path="/meghalaya" element={<Navigate to="/" replace />} />
            <Route path="/imphal" element={<Navigate to="/" replace />} />
            <Route path="/manipur" element={<Navigate to="/" replace />} />
            <Route path="/aizawl" element={<Navigate to="/" replace />} />
            <Route path="/mizoram" element={<Navigate to="/" replace />} />
            <Route path="/kohima" element={<Navigate to="/" replace />} />
            <Route path="/nagaland" element={<Navigate to="/" replace />} />
            <Route path="/itanagar" element={<Navigate to="/" replace />} />
            <Route path="/arunachal-pradesh" element={<Navigate to="/" replace />} />
            <Route path="/gangtok" element={<Navigate to="/" replace />} />
            <Route path="/sikkim" element={<Navigate to="/" replace />} />
            <Route path="/kolkata" element={<Navigate to="/" replace />} />
            <Route path="/delhi" element={<Navigate to="/" replace />} />
            <Route path="/new-delhi" element={<Navigate to="/" replace />} />
            <Route path="/noida" element={<Navigate to="/" replace />} />
            <Route path="/gurgaon" element={<Navigate to="/" replace />} />
            <Route path="/mumbai" element={<Navigate to="/" replace />} />
            <Route path="/bangalore" element={<Navigate to="/" replace />} />
            <Route path="/bengaluru" element={<Navigate to="/" replace />} />
            <Route path="/chennai" element={<Navigate to="/" replace />} />
            <Route path="/hyderabad" element={<Navigate to="/" replace />} />
            <Route path="/pune" element={<Navigate to="/" replace />} />
            <Route path="/ahmedabad" element={<Navigate to="/" replace />} />
            <Route path="/jaipur" element={<Navigate to="/" replace />} />
            <Route path="/lucknow" element={<Navigate to="/" replace />} />
            <Route path="/chandigarh" element={<Navigate to="/" replace />} />
            <Route path="/bhubaneswar" element={<Navigate to="/" replace />} />
            <Route path="/kochi" element={<Navigate to="/" replace />} />
            <Route path="/indore" element={<Navigate to="/" replace />} />
            <Route path="/patna" element={<Navigate to="/" replace />} />
            <Route path="/ranchi" element={<Navigate to="/" replace />} />
            <Route path="/raipur" element={<Navigate to="/" replace />} />
            
            {/* Redirect service pages to what-we-do */}
            <Route path="/video-editing" element={<Navigate to="/what-we-do" replace />} />
            <Route path="/video-production" element={<Navigate to="/what-we-do" replace />} />
            <Route path="/web-design" element={<Navigate to="/what-we-do" replace />} />
            <Route path="/web-development" element={<Navigate to="/what-we-do" replace />} />
            <Route path="/digital-marketing" element={<Navigate to="/what-we-do" replace />} />
            <Route path="/seo-services" element={<Navigate to="/what-we-do" replace />} />
            <Route path="/branding" element={<Navigate to="/what-we-do" replace />} />
            <Route path="/logo-design" element={<Navigate to="/what-we-do" replace />} />
            <Route path="/motion-graphics" element={<Navigate to="/what-we-do" replace />} />
            <Route path="/social-media" element={<Navigate to="/what-we-do" replace />} />
            <Route path="/content-creation" element={<Navigate to="/what-we-do" replace />} />
            <Route path="/graphic-design" element={<Navigate to="/what-we-do" replace />} />
            <Route path="/ui-ux-design" element={<Navigate to="/what-we-do" replace />} />
            <Route path="/ecommerce-development" element={<Navigate to="/what-we-do" replace />} />
            <Route path="/ad-campaigns" element={<Navigate to="/what-we-do" replace />} />
            <Route path="/corporate-videos" element={<Navigate to="/what-we-do" replace />} />
            <Route path="/reels-editing" element={<Navigate to="/what-we-do" replace />} />
            <Route path="/thumbnail-design" element={<Navigate to="/what-we-do" replace />} />

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
