import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import WhatWeDo from "./pages/WhatWeDo";
import OurWork from "./pages/OurWork";
import PortfolioGallery from "./pages/PortfolioGallery";
import Comparison from "./pages/Comparison";
import ContactPage from "./pages/ContactPage";
import Insights from "./pages/Insights";
import AboutUs from "./pages/AboutUs";
import People from "./pages/People";
import JoinUs from "./pages/JoinUs";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
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
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
