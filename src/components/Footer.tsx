import { Link } from "react-router-dom";
import { BlurReveal, BlurRevealItem } from "@/components/BlurReveal";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const footerLinks = {
  services: [
    { name: "Video Production", href: "/what-we-do" },
    { name: "Web Development", href: "/what-we-do" },
    { name: "Brand Presence", href: "/what-we-do" },
    { name: "Performance Marketing", href: "/what-we-do" },
    { name: "Motion Graphics", href: "/what-we-do" },
    { name: "Logo Design", href: "/what-we-do" },
  ],
  company: [
    { name: "About Us", href: "/about-us" },
    { name: "Our Work", href: "/our-work" },
    { name: "Pricing", href: "/pricing-comparison" },
    { name: "Insights", href: "/insights" },
    { name: "Contact", href: "/contact" },
    { name: "Careers", href: "/join-us" },
  ],
  locations: [
    { name: "Agartala", href: "/agartala" },
    { name: "Tripura", href: "/tripura" },
    { name: "Guwahati", href: "/guwahati" },
    { name: "Kolkata", href: "/kolkata" },
    { name: "Delhi", href: "/delhi" },
    { name: "Mumbai", href: "/mumbai" },
    { name: "Bangalore", href: "/bangalore" },
    { name: "Chennai", href: "/chennai" },
  ],
};

export const Footer = () => {
  return (
    <footer className="relative bg-background overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/[0.02] to-transparent pointer-events-none" />
      
      {/* Main Footer Content */}
      <div className="relative border-t border-white/10">
        {/* CTA Section */}
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            <div className="text-center lg:text-left max-w-2xl">
              <BlurReveal delay={0}>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
                  Ready to create
                  <span className="text-muted-foreground"> something amazing?</span>
                </h2>
              </BlurReveal>
              <BlurReveal delay={0.1}>
                <p className="text-muted-foreground text-lg">
                  Let's bring your vision to life. Get a free quote within 2 hours.
                </p>
              </BlurReveal>
            </div>
            <BlurReveal delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-white text-black hover:bg-white/90 font-bold px-8 py-6 rounded-full group">
                  <Link to="/contact" className="flex items-center gap-2">
                    Start a Project
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-white/20 hover:bg-white/5 px-8 py-6 rounded-full">
                  <a href="tel:+918119811655" className="flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    Call Us
                  </a>
                </Button>
              </div>
            </BlurReveal>
          </div>
        </div>

        {/* Links Section */}
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-12 border-t border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {/* Services Column */}
            <div>
              <BlurReveal delay={0}>
                <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Services</h3>
              </BlurReveal>
              <ul className="space-y-3">
                {footerLinks.services.map((link, index) => (
                  <li key={link.name}>
                    <BlurRevealItem delay={0.05 * index}>
                      <Link 
                        to={link.href}
                        className="text-muted-foreground hover:text-white transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    </BlurRevealItem>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <BlurReveal delay={0.1}>
                <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Company</h3>
              </BlurReveal>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={link.name}>
                    <BlurRevealItem delay={0.1 + 0.05 * index}>
                      <Link 
                        to={link.href}
                        className="text-muted-foreground hover:text-white transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    </BlurRevealItem>
                  </li>
                ))}
              </ul>
            </div>

            {/* Locations Column */}
            <div>
              <BlurReveal delay={0.2}>
                <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Locations</h3>
              </BlurReveal>
              <ul className="space-y-3">
                {footerLinks.locations.map((link, index) => (
                  <li key={link.name}>
                    <BlurRevealItem delay={0.2 + 0.05 * index}>
                      <Link 
                        to={link.href}
                        className="text-muted-foreground hover:text-white transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    </BlurRevealItem>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <BlurReveal delay={0.3}>
                <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Contact</h3>
              </BlurReveal>
              <ul className="space-y-4">
                <li>
                  <BlurRevealItem delay={0.35}>
                    <a 
                      href="mailto:hello@whycreatives.in"
                      className="flex items-center gap-3 text-muted-foreground hover:text-white transition-colors text-sm"
                    >
                      <Mail className="w-4 h-4 flex-shrink-0" />
                      hello@whycreatives.in
                    </a>
                  </BlurRevealItem>
                </li>
                <li>
                  <BlurRevealItem delay={0.4}>
                    <a 
                      href="tel:+918119811655"
                      className="flex items-center gap-3 text-muted-foreground hover:text-white transition-colors text-sm"
                    >
                      <Phone className="w-4 h-4 flex-shrink-0" />
                      +91 81198 11655
                    </a>
                  </BlurRevealItem>
                </li>
                <li>
                  <BlurRevealItem delay={0.45}>
                    <div className="flex items-start gap-3 text-muted-foreground text-sm">
                      <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>Agartala, Tripura, India</span>
                    </div>
                  </BlurRevealItem>
                </li>
              </ul>
              
              {/* Social Links */}
              <BlurReveal delay={0.5}>
                <div className="flex items-center gap-4 mt-6">
                  <a 
                    href="https://www.instagram.com/why_creatives/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.linkedin.com/company/whycreatives/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://twitter.com/why_creatives" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                    aria-label="Twitter"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                </div>
              </BlurReveal>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-6 border-t border-white/10">
          <BlurReveal delay={0.6}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-muted-foreground text-sm">
                © {new Date().getFullYear()} Why Creatives. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <Link to="/privacy-policy" className="text-muted-foreground hover:text-white text-sm transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-muted-foreground hover:text-white text-sm transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </BlurReveal>
        </div>
      </div>
    </footer>
  );
};
