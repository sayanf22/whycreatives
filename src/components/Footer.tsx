import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { BlurReveal, BlurRevealItem } from "@/components/BlurReveal";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full bg-background p-3 sm:p-5 md:p-6 mt-12 sm:mt-16 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="relative w-full">
        
        {/* ========================================================
            LEFT WHITE SOCIAL STRIP (MADEBYSHAPE EXACT SPEC)
           ======================================================== */}
        
        {/* White Social Strip Container (Positioned top-0 left-0) */}
        <div className="absolute top-0 left-0 w-[56px] h-[280px] bg-white dark:bg-[#121212] rounded-br-[24px] z-20">
          {/* Inner Corner Mask (Bottom-Right concave curve) */}
          <div className="absolute top-[256px] left-[32px] w-[24px] h-[24px] bg-[#0d0d0d] z-20">
            <div className="w-full h-full bg-white dark:bg-[#121212] rounded-br-[24px]" />
          </div>

          {/* Top-Right Transition Mask (Curves top edge down alongside social strip) */}
          <div className="absolute top-0 left-[56px] w-[24px] h-[24px] bg-white dark:bg-[#121212] z-20">
            <div className="w-full h-full bg-[#0d0d0d] rounded-tl-[24px]" />
          </div>

          {/* Bottom-Left Transition Mask (Curves black edge under social strip) */}
          <div className="absolute top-[280px] left-0 w-[24px] h-[24px] bg-white dark:bg-[#121212] z-20">
            <div className="w-full h-full bg-[#0d0d0d] rounded-tl-[24px]" />
          </div>
        </div>

        {/* Vertical Stack of 5 Lime-Green Circle Social Buttons */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="absolute top-4 left-[10px] flex flex-col gap-2.5 z-30"
        >
          <a 
            href="https://www.linkedin.com/company/whycreatives/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-9 h-9 rounded-full bg-[#b5ff2b] text-black flex items-center justify-center font-bold text-xs hover:scale-110 active:scale-95 transition-all select-none"
            aria-label="LinkedIn"
          >
            in
          </a>
          <a 
            href="https://twitter.com/why_creatives" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-9 h-9 rounded-full bg-[#b5ff2b] text-black flex items-center justify-center font-bold text-xs hover:scale-110 active:scale-95 transition-all select-none"
            aria-label="Twitter/X"
          >
            X
          </a>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-9 h-9 rounded-full bg-[#b5ff2b] text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all select-none"
            aria-label="GitHub"
          >
            <svg className="w-4 h-4 fill-black" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>
          <a 
            href="https://www.instagram.com/why_creatives/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-9 h-9 rounded-full bg-[#b5ff2b] text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all select-none"
            aria-label="Instagram"
          >
            <svg className="w-4 h-4 fill-black" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a 
            href="https://behance.net" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-9 h-9 rounded-full bg-[#b5ff2b] text-black flex items-center justify-center font-bold text-[11px] hover:scale-110 active:scale-95 transition-all select-none"
            aria-label="Behance"
          >
            Bē
          </a>
        </motion.div>

        {/* ========================================================
            TOP-RIGHT DESKTOP SCROLL-TO-TOP CUTOUT
           ======================================================== */}
        
        <div 
          onClick={scrollToTop}
          className="absolute top-0 right-0 h-[44px] px-6 bg-white dark:bg-[#121212] rounded-bl-[24px] z-20 hidden md:flex items-center gap-1.5 cursor-pointer text-xs text-neutral-800 dark:text-neutral-200 font-semibold select-none hover:opacity-90 transition-opacity"
        >
          {/* Left Transition Mask (Attached to left edge: -left-[24px]) */}
          <div className="absolute top-0 -left-[24px] w-[24px] h-[24px] bg-white dark:bg-[#121212] z-20">
            <div className="w-full h-full bg-[#0d0d0d] rounded-tr-[24px]" />
          </div>
          {/* Bottom Transition Mask (Attached to bottom edge: top-[44px] right-0) */}
          <div className="absolute top-[44px] right-0 w-[24px] h-[24px] bg-white dark:bg-[#121212] z-20">
            <div className="w-full h-full bg-[#0d0d0d] rounded-tr-[24px]" />
          </div>

          <span>Sh*t I've gone too far, send me back up</span>
          <span className="text-sm">👆</span>
        </div>

        {/* ========================================================
            BOTTOM-RIGHT MOBILE SCROLL-TO-TOP CUTOUT
           ======================================================== */}
        
        <div 
          onClick={scrollToTop}
          className="absolute bottom-0 right-0 h-[44px] px-4 bg-white dark:bg-[#121212] rounded-tl-[24px] z-20 md:hidden flex items-center gap-1.5 cursor-pointer text-[11px] text-neutral-800 dark:text-neutral-200 font-semibold select-none hover:opacity-90 transition-opacity"
        >
          {/* Top Transition Mask (Attached to top edge: -top-[24px]) */}
          <div className="absolute -top-[24px] right-0 w-[24px] h-[24px] bg-white dark:bg-[#121212] z-20">
            <div className="w-full h-full bg-[#0d0d0d] rounded-br-[24px]" />
          </div>
          {/* Left Transition Mask (Attached dynamically to left edge: -left-[24px]) */}
          <div className="absolute bottom-0 -left-[24px] w-[24px] h-[24px] bg-white dark:bg-[#121212] z-20">
            <div className="w-full h-full bg-[#0d0d0d] rounded-br-[24px]" />
          </div>

          <span>Sh*t I've gone too far, send me back up</span>
          <span className="text-sm">👆</span>
        </div>

        {/* ========================================================
            MAIN BLACK FOOTER CONTAINER (FLOATING INSET CARD)
           ======================================================== */}
        <footer className="relative bg-[#0d0d0d] text-white pt-8 md:pt-12 lg:pt-16 pb-16 md:pb-12 px-4 sm:px-8 lg:px-20 overflow-hidden rounded-b-2xl md:rounded-b-3xl rounded-t-none">
          
          <div className="max-w-7xl mx-auto relative">
            
            {/* UNIFIED UPPER SECTION (CTA on left, 3 Columns on right in single flex row) */}
            <div className="pl-16 sm:pl-20 pt-4 pb-12 flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16">
              
              {/* Left CTA Column */}
              <div className="flex flex-col gap-6 items-start max-w-sm">
                <BlurReveal delay={0.1}>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-white">
                    Do you like<br />what you see?
                  </h2>
                </BlurReveal>
                <BlurReveal delay={0.2}>
                  <Link 
                    to="/contact" 
                    className="inline-flex items-center gap-2 bg-[#b5ff2b] text-black font-bold px-6 py-3 rounded-full hover:bg-[#9ee024] hover:shadow-[0_0_20px_rgba(181,255,43,0.4)] transition-all hover:scale-[1.03] group"
                  >
                    <span>Start a project</span>
                    <ArrowUpRight className="w-4.5 h-4.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </BlurReveal>
              </div>

              {/* Right Columns Grid (Learn, Explore, Get in touch) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12 flex-1 w-full lg:w-auto">
                
                {/* Col 1: Learn */}
                <div className="flex flex-col gap-4">
                  <BlurReveal delay={0.15}>
                    <h3 className="text-white font-extrabold tracking-widest text-[11px] uppercase opacity-95">Learn</h3>
                  </BlurReveal>
                  <ul className="flex flex-col gap-2.5 text-neutral-300 text-xs sm:text-sm">
                    <BlurRevealItem delay={0.2}><Link to="/about-us" className="hover:text-[#b5ff2b] transition-colors">About</Link></BlurRevealItem>
                    <BlurRevealItem delay={0.23}><Link to="/about-us" className="hover:text-[#b5ff2b] transition-colors">Culture</Link></BlurRevealItem>
                    <BlurRevealItem delay={0.26}><Link to="/what-we-do" className="hover:text-[#b5ff2b] transition-colors">Testimonials</Link></BlurRevealItem>
                    <BlurRevealItem delay={0.29}><Link to="/what-we-do" className="hover:text-[#b5ff2b] transition-colors">Processes</Link></BlurRevealItem>
                    <BlurRevealItem delay={0.32}><Link to="/contact" className="hover:text-[#b5ff2b] transition-colors">FAQs</Link></BlurRevealItem>
                    <BlurRevealItem delay={0.35}><Link to="/contact" className="hover:text-[#b5ff2b] transition-colors">Branding FAQs</Link></BlurRevealItem>
                    <BlurRevealItem delay={0.38}><Link to="/insights" className="hover:text-[#b5ff2b] transition-colors">Blog</Link></BlurRevealItem>
                  </ul>
                </div>

                {/* Col 2: Explore */}
                <div className="flex flex-col gap-4">
                  <BlurReveal delay={0.2}>
                    <h3 className="text-white font-extrabold tracking-widest text-[11px] uppercase opacity-95">Explore</h3>
                  </BlurReveal>
                  <ul className="flex flex-col gap-2.5 text-neutral-300 text-xs sm:text-sm">
                    <BlurRevealItem delay={0.25}><Link to="/" className="hover:text-[#b5ff2b] transition-colors">Home</Link></BlurRevealItem>
                    <BlurRevealItem delay={0.28} className="flex items-center gap-2">
                      <Link to="/our-work" className="hover:text-[#b5ff2b] transition-colors">Work</Link>
                      <span className="bg-[#b5ff2b] text-black font-extrabold text-[8px] px-1.5 py-0.5 rounded uppercase tracking-wider scale-90">New</span>
                    </BlurRevealItem>
                    <BlurRevealItem delay={0.31}><Link to="/what-we-do" className="hover:text-[#b5ff2b] transition-colors">Services</Link></BlurRevealItem>
                    <BlurRevealItem delay={0.34}><Link to="/join-us" className="hover:text-[#b5ff2b] transition-colors">Careers</Link></BlurRevealItem>
                    <BlurRevealItem delay={0.37}><Link to="/areas-we-serve" className="hover:text-[#b5ff2b] transition-colors">Sectors</Link></BlurRevealItem>
                    <BlurRevealItem delay={0.4}><Link to="/pricing-comparison" className="hover:text-[#b5ff2b] transition-colors">Hex Test</Link></BlurRevealItem>
                    <BlurRevealItem delay={0.43}><Link to="/contact" className="hover:text-[#b5ff2b] transition-colors">Contact</Link></BlurRevealItem>
                  </ul>
                </div>

                {/* Col 3: Get in touch */}
                <div className="col-span-2 sm:col-span-1 flex flex-col gap-4">
                  <BlurReveal delay={0.25}>
                    <h3 className="text-white font-extrabold tracking-widest text-[11px] uppercase opacity-95">Get in touch</h3>
                  </BlurReveal>
                  <ul className="flex flex-col gap-3 text-neutral-300 text-xs sm:text-sm">
                    <BlurRevealItem delay={0.3} className="flex items-center gap-2.5">
                      <Phone className="w-3.5 h-3.5 text-[#b5ff2b] flex-shrink-0" />
                      <a href="tel:+918210198880" className="hover:text-white transition-colors">+91 82101 98880</a>
                    </BlurRevealItem>
                    <BlurRevealItem delay={0.35} className="flex items-center gap-2.5">
                      <Mail className="w-3.5 h-3.5 text-[#b5ff2b] flex-shrink-0" />
                      <a href="mailto:hello@whycreatives.in" className="hover:text-white transition-colors break-all">hello@whycreatives.in</a>
                    </BlurRevealItem>
                    <BlurRevealItem delay={0.4} className="flex items-start gap-2.5">
                      <MapPin className="w-3.5 h-3.5 text-[#b5ff2b] mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-white">WhyCreatives</p>
                        <p className="text-neutral-300 text-xs">Guwahati, Assam, India</p>
                      </div>
                    </BlurRevealItem>
                    <BlurRevealItem delay={0.45} className="flex items-center gap-2.5">
                      <span className="text-[#b5ff2b] text-sm font-bold flex-shrink-0">///</span>
                      <span className="hover:text-white transition-colors text-neutral-300 text-xs">why.creatives.in</span>
                    </BlurRevealItem>
                  </ul>
                </div>

              </div>

            </div>

            {/* Giant Text Section */}
            <div className="border-t border-neutral-900 pt-8 pb-10 overflow-hidden select-none">
              <BlurReveal delay={0.3} duration={0.8} className="w-full overflow-hidden">
                <h1 className="text-[6.5vw] sm:text-[6.5vw] lg:text-[7vw] font-black text-white tracking-tight leading-none text-center lg:text-left opacity-90 uppercase">
                  Crafting since 2020
                </h1>
              </BlurReveal>
            </div>

            {/* Fine Print Bottom Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-neutral-900 pt-6 text-[10px] sm:text-xs text-neutral-400">
              <BlurReveal delay={0.4}>
                <span>WhyCreatives. © WhyCreatives Agency 2026 | Company Reg Number 10529055</span>
              </BlurReveal>
              <BlurReveal delay={0.45}>
                <div className="flex flex-wrap gap-2 sm:gap-4 justify-center">
                  <span>Web Design Assam</span>
                  <span>|</span>
                  <span>All Rights Reserved</span>
                  <span>|</span>
                  <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy (you really care?)</Link>
                </div>
              </BlurReveal>
            </div>

          </div>
        </footer>
      </div>
    </div>
  );
};
