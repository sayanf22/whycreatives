import { Link } from "react-router-dom";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";

export const Footer = () => {
  return (
    <footer className="bg-background border-t-2 border-foreground py-12 sm:py-16 px-4 sm:px-6">
      <FadeInWhenVisible>
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
            <div className="md:col-span-1">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6">
                WhyCreatives
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                India's most affordable creative agency. Professional video editing, web design, and digital marketing at 90% less cost.
              </p>
              <p className="text-muted-foreground text-xs">
                📍 Agartala, Tripura, India<br />
                📞 +91 81198 11655<br />
                ✉️ hello@whycreatives.in
              </p>
            </div>

            <div>
              <h4 className="font-bold text-foreground mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/video-editing" className="text-muted-foreground hover:text-foreground transition-colors">
                    Video Editing
                  </Link>
                </li>
                <li>
                  <Link to="/web-design" className="text-muted-foreground hover:text-foreground transition-colors">
                    Web Design
                  </Link>
                </li>
                <li>
                  <Link to="/digital-marketing" className="text-muted-foreground hover:text-foreground transition-colors">
                    Digital Marketing
                  </Link>
                </li>
                <li>
                  <Link to="/branding" className="text-muted-foreground hover:text-foreground transition-colors">
                    Branding
                  </Link>
                </li>
                <li>
                  <Link to="/social-media" className="text-muted-foreground hover:text-foreground transition-colors">
                    Social Media
                  </Link>
                </li>
                <li>
                  <Link to="/motion-graphics" className="text-muted-foreground hover:text-foreground transition-colors">
                    Motion Graphics
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/about-us" className="text-muted-foreground hover:text-foreground transition-colors">
                    About Us
                  </Link>
                </li>

                <li>
                  <Link to="/our-work" className="text-muted-foreground hover:text-foreground transition-colors">
                    Our Work
                  </Link>
                </li>
                <li>
                  <Link to="/portfolio-gallery" className="text-muted-foreground hover:text-foreground transition-colors">
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link to="/pricing-comparison" className="text-muted-foreground hover:text-foreground transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/insights" className="text-muted-foreground hover:text-foreground transition-colors">
                    Insights
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/join-us" className="text-muted-foreground hover:text-foreground transition-colors">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-foreground mb-4">Connect</h4>
              <div className="flex gap-4 mb-6">
                <a
                  href="https://www.instagram.com/why_creatives/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  aria-label="Follow WhyCreatives on Instagram"
                >
                  Instagram
                </a>
                <a
                  href="https://www.linkedin.com/company/whycreatives/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  aria-label="Follow WhyCreatives on LinkedIn"
                >
                  LinkedIn
                </a>
              </div>
              <h4 className="font-bold text-foreground mb-3 text-sm">Locations</h4>
              <ul className="space-y-1 text-xs">
                <li>
                  <Link to="/agartala" className="text-muted-foreground hover:text-foreground transition-colors">
                    Agartala
                  </Link>
                </li>
                <li>
                  <Link to="/tripura" className="text-muted-foreground hover:text-foreground transition-colors">
                    Tripura
                  </Link>
                </li>
                <li>
                  <Link to="/guwahati" className="text-muted-foreground hover:text-foreground transition-colors">
                    Guwahati
                  </Link>
                </li>
                <li>
                  <Link to="/kolkata" className="text-muted-foreground hover:text-foreground transition-colors">
                    Kolkata
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* SEO Location Links - Important for Local SEO */}
          <div className="py-6 border-t border-border mb-6">
            <h4 className="font-bold text-foreground mb-4 text-sm">We Serve Across India</h4>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
              <Link to="/agartala" className="hover:text-foreground transition-colors">Creative Agency Agartala</Link>
              <span className="text-border">•</span>
              <Link to="/tripura" className="hover:text-foreground transition-colors">Creative Agency Tripura</Link>
              <span className="text-border">•</span>
              <Link to="/guwahati" className="hover:text-foreground transition-colors">Creative Agency Guwahati</Link>
              <span className="text-border">•</span>
              <Link to="/shillong" className="hover:text-foreground transition-colors">Creative Agency Shillong</Link>
              <span className="text-border">•</span>
              <Link to="/imphal" className="hover:text-foreground transition-colors">Creative Agency Imphal</Link>
              <span className="text-border">•</span>
              <Link to="/kolkata" className="hover:text-foreground transition-colors">Creative Agency Kolkata</Link>
              <span className="text-border">•</span>
              <Link to="/delhi" className="hover:text-foreground transition-colors">Creative Agency Delhi</Link>
              <span className="text-border">•</span>
              <Link to="/mumbai" className="hover:text-foreground transition-colors">Creative Agency Mumbai</Link>
              <span className="text-border">•</span>
              <Link to="/bangalore" className="hover:text-foreground transition-colors">Creative Agency Bangalore</Link>
              <span className="text-border">•</span>
              <Link to="/hyderabad" className="hover:text-foreground transition-colors">Creative Agency Hyderabad</Link>
            </div>
          </div>

          {/* SEO Service Links */}
          <div className="py-6 border-t border-border mb-6">
            <h4 className="font-bold text-foreground mb-4 text-sm">Our Services</h4>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
              <Link to="/video-editing" className="hover:text-foreground transition-colors">Video Editing Services</Link>
              <span className="text-border">•</span>
              <Link to="/web-design" className="hover:text-foreground transition-colors">Web Design Services</Link>
              <span className="text-border">•</span>
              <Link to="/digital-marketing" className="hover:text-foreground transition-colors">Digital Marketing</Link>
              <span className="text-border">•</span>
              <Link to="/seo-services" className="hover:text-foreground transition-colors">SEO Services</Link>
              <span className="text-border">•</span>
              <Link to="/branding" className="hover:text-foreground transition-colors">Branding Services</Link>
              <span className="text-border">•</span>
              <Link to="/social-media" className="hover:text-foreground transition-colors">Social Media Marketing</Link>
              <span className="text-border">•</span>
              <Link to="/motion-graphics" className="hover:text-foreground transition-colors">Motion Graphics</Link>
              <span className="text-border">•</span>
              <Link to="/logo-design" className="hover:text-foreground transition-colors">Logo Design</Link>
            </div>
          </div>

          <div className="pt-6 border-t border-border">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">
                  © {new Date().getFullYear()} WhyCreatives. All rights reserved.
                </p>
                <p className="text-xs text-muted-foreground">
                  Best Creative Agency in Tripura, Northeast India 🇮🇳
                </p>
              </div>
              <div className="flex flex-wrap justify-center md:justify-end gap-4 text-xs text-muted-foreground">
                <Link to="/contact" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
                <span className="text-border">•</span>
                <Link to="/contact" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
                <span className="text-border">•</span>
                <Link to="/contact" className="hover:text-foreground transition-colors">
                  Refund Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </FadeInWhenVisible>
    </footer>
  );
};
