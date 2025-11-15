import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-background border-t-2 border-foreground py-12 sm:py-16 px-4 sm:px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
          <div className="md:col-span-1">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6">
              WhyCreatives
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Professional creative services at prices that make sense for small businesses.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/what-we-do" className="text-muted-foreground hover:text-foreground transition-colors">
                  Video Editing
                </Link>
              </li>
              <li>
                <Link to="/what-we-do" className="text-muted-foreground hover:text-foreground transition-colors">
                  Website Building
                </Link>
              </li>
              <li>
                <Link to="/what-we-do" className="text-muted-foreground hover:text-foreground transition-colors">
                  Social Media
                </Link>
              </li>
              <li>
                <Link to="/what-we-do" className="text-muted-foreground hover:text-foreground transition-colors">
                  Ad Campaigns
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
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4">Connect</h4>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/why_creatives/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 border-t border-border text-center md:text-left">
          <p className="text-xs sm:text-sm text-muted-foreground">
            © 2024 WhyCreatives. Tripura, Agartala 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
};
