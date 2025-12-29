import { Link } from "react-router-dom";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-12 sm:py-16 px-4 sm:px-6">
      <FadeInWhenVisible>
        <div className="container mx-auto max-w-7xl">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-10">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                WhyCreatives
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                India's most affordable creative agency. Professional video editing, web design, and digital marketing at 90% less cost.
              </p>
              <div className="text-muted-foreground text-xs space-y-1">
                <p>📍 Agartala, Tripura, India</p>
                <p>📞 +91 81198 11655</p>
                <p>✉️ hello@whycreatives.in</p>
              </div>
            </div>

            {/* Services Column */}
            <div>
              <h4 className="font-bold text-foreground mb-4 text-sm">Services</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/what-we-do" className="text-muted-foreground hover:text-foreground transition-colors">
                    Video Editing
                  </Link>
                </li>
                <li>
                  <Link to="/what-we-do" className="text-muted-foreground hover:text-foreground transition-colors">
                    Web Design
                  </Link>
                </li>
                <li>
                  <Link to="/what-we-do" className="text-muted-foreground hover:text-foreground transition-colors">
                    Digital Marketing
                  </Link>
                </li>
                <li>
                  <Link to="/what-we-do" className="text-muted-foreground hover:text-foreground transition-colors">
                    Branding
                  </Link>
                </li>
                <li>
                  <Link to="/what-we-do" className="text-muted-foreground hover:text-foreground transition-colors">
                    Social Media
                  </Link>
                </li>
                <li>
                  <Link to="/what-we-do" className="text-muted-foreground hover:text-foreground transition-colors">
                    Motion Graphics
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="font-bold text-foreground mb-4 text-sm">Company</h4>
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

            {/* Connect Column */}
            <div>
              <h4 className="font-bold text-foreground mb-4 text-sm">Connect</h4>
              <div className="flex gap-4 mb-6">
                <a
                  href="https://www.instagram.com/why_creatives/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Instagram
                </a>
                <a
                  href="https://www.linkedin.com/company/whycreatives/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  LinkedIn
                </a>
              </div>
              <h4 className="font-bold text-foreground mb-3 text-sm">Locations</h4>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li><Link to="/agartala" className="hover:text-foreground transition-colors">Agartala</Link></li>
                <li><Link to="/tripura" className="hover:text-foreground transition-colors">Tripura</Link></li>
                <li><Link to="/guwahati" className="hover:text-foreground transition-colors">Guwahati</Link></li>
                <li><Link to="/shillong" className="hover:text-foreground transition-colors">Shillong</Link></li>
                <li><Link to="/kolkata" className="hover:text-foreground transition-colors">Kolkata</Link></li>
                <li><Link to="/delhi" className="hover:text-foreground transition-colors">Delhi</Link></li>
                <li><Link to="/mumbai" className="hover:text-foreground transition-colors">Mumbai</Link></li>
                <li><Link to="/bangalore" className="hover:text-foreground transition-colors">Bangalore</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-border">
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
