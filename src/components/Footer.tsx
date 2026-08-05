import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { BlurReveal, BlurRevealItem } from "@/components/BlurReveal";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#0d0d0d] text-white rounded-t-[3rem] md:rounded-t-[4.5rem] mt-16 pt-24 pb-12 px-6 md:px-12 lg:px-20 overflow-hidden border-t border-neutral-900 shadow-2xl">
      {/* Decorative top border glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#a8ff35]/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative">
        
        {/* Left Floating Socials (Desktop only) */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="hidden xl:flex flex-col gap-3.5 absolute -left-[4.5rem] top-12 bg-[#121212] p-2.5 rounded-[20px] border border-neutral-800/80 shadow-2xl z-20"
        >
          <a 
            href="https://www.linkedin.com/company/whycreatives/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-9 h-9 rounded-full bg-[#b5ff2b] text-black flex items-center justify-center font-bold text-sm hover:scale-110 hover:shadow-[0_0_15px_rgba(181,255,43,0.3)] transition-all font-sans"
            aria-label="LinkedIn"
          >
            in
          </a>
          <a 
            href="https://twitter.com/why_creatives" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-9 h-9 rounded-full bg-[#b5ff2b] text-black flex items-center justify-center font-bold text-sm hover:scale-110 hover:shadow-[0_0_15px_rgba(181,255,43,0.3)] transition-all font-sans"
            aria-label="Twitter/X"
          >
            X
          </a>
          <a 
            href="https://www.instagram.com/why_creatives/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-9 h-9 rounded-full bg-[#b5ff2b] text-black flex items-center justify-center hover:scale-110 hover:shadow-[0_0_15px_rgba(181,255,43,0.3)] transition-all"
            aria-label="Instagram"
          >
            <svg className="w-4 h-4 fill-black" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a 
            href="https://dribbble.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-9 h-9 rounded-full bg-[#b5ff2b] text-black flex items-center justify-center hover:scale-110 hover:shadow-[0_0_15px_rgba(181,255,43,0.3)] transition-all font-bold text-xs"
            aria-label="Dribbble"
          >
            <svg className="w-4 h-4 fill-black" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm7.65 4.81c.54.76.94 1.63 1.15 2.57-1.39-.32-2.73-.47-4.01-.44-.22-1.02-.48-2-.79-2.91 1.48.16 2.76.47 3.65.78zm-5.61-1.42c.31.87.56 1.8.76 2.78-1.28-.03-2.67-.18-4.14-.49.46-1.03.95-1.92 1.45-2.65.65.12 1.29.24 1.93.36zm-3.69.61c-.48.7-.93 1.55-1.37 2.53-2.09-.59-4.08-.85-5.91-.77.58-1.63 1.71-3 3.19-3.89 1.13.72 2.5 1.43 4.09 2.13zM3.19 10.9c1.94-.09 4.06.18 6.27.81-.39 1.11-.84 2.27-1.36 3.44-2.8-.82-5.41-1.12-7.79-.88-.17-.79-.24-1.62-.24-2.47.38-.3.76-.6 1.12-.9zm1.18 6.01c2.19-.24 4.62.01 7.24.77-.52 1.09-1.08 2.06-1.68 2.87-1.99-.95-3.61-2.44-4.56-4.44.33-.4.67-.8.99-1.2zm6.75 3.51c.56-.76 1.08-1.67 1.56-2.69 1.46.43 2.78 1.01 3.93 1.74-.91.73-1.98 1.29-3.14 1.62-.78-.22-1.57-.45-2.35-.67zm5.2-2.37c-1.07-.68-2.3-1.22-3.66-1.62.48-1.1.9-2.19 1.25-3.23 1.53.11 3.13.43 4.79.95-.31 1.51-1.09 2.85-2.38 3.9z"/>
            </svg>
          </a>
          <a 
            href="https://behance.net" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-9 h-9 rounded-full bg-[#b5ff2b] text-black flex items-center justify-center hover:scale-110 hover:shadow-[0_0_15px_rgba(181,255,43,0.3)] transition-all font-bold text-xs font-sans"
            aria-label="Behance"
          >
            Be
          </a>
        </motion.div>

        {/* Top Scroll to Top link */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="absolute right-0 top-0 text-[11px] sm:text-xs text-neutral-300 hover:text-white cursor-pointer flex items-center gap-1 transition-colors z-10 font-sans tracking-wide font-medium" 
          onClick={scrollToTop}
        >
          <span>Sh*t I've gone too far, send me back up</span>
          <span>👈</span>
        </motion.div>

        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pt-12 pb-16">
          
          {/* Col 1: Do you like what you see? */}
          <div className="flex flex-col gap-6">
            <BlurReveal delay={0.1}>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight text-white font-sans">
                Do you like<br />what you see?
              </h2>
            </BlurReveal>
            <div className="flex flex-col gap-4 items-start">
              <BlurReveal delay={0.2}>
                <Link 
                  to="/contact" 
                  className="inline-flex items-center gap-2 bg-[#b5ff2b] text-black font-bold px-6 py-3 rounded-full hover:bg-[#9ee024] hover:shadow-[0_0_20px_rgba(181,255,43,0.4)] transition-all hover:scale-[1.03] group"
                >
                  <span>Start a project</span>
                  <ArrowUpRight className="w-4.5 h-4.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </BlurReveal>
              
              <BlurReveal delay={0.3}>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[11px] sm:text-xs font-semibold text-neutral-300 font-sans">5.0 from 120+ reviews</span>
                  <div className="flex gap-0.5">
                    {/* Google G Icon */}
                    <svg className="w-3.5 h-3.5 mr-1" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3.5 h-3.5 fill-[#f59e0b] text-[#f59e0b]" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </BlurReveal>
            </div>
          </div>

          {/* Col 2: Learn */}
          <div className="flex flex-col gap-4">
            <BlurReveal delay={0.15}>
              <h3 className="text-white font-extrabold tracking-widest text-[11px] uppercase font-sans opacity-95">Learn</h3>
            </BlurReveal>
            <ul className="flex flex-col gap-2.5 text-neutral-300 text-sm font-sans">
              <BlurRevealItem delay={0.2}><Link to="/about-us" className="hover:text-[#b5ff2b] transition-colors">About</Link></BlurRevealItem>
              <BlurRevealItem delay={0.23}><Link to="/about-us" className="hover:text-[#b5ff2b] transition-colors">Culture</Link></BlurRevealItem>
              <BlurRevealItem delay={0.26}><Link to="/what-we-do" className="hover:text-[#b5ff2b] transition-colors">Testimonials</Link></BlurRevealItem>
              <BlurRevealItem delay={0.29}><Link to="/what-we-do" className="hover:text-[#b5ff2b] transition-colors">Processes</Link></BlurRevealItem>
              <BlurRevealItem delay={0.32}><Link to="/contact" className="hover:text-[#b5ff2b] transition-colors">FAQs</Link></BlurRevealItem>
              <BlurRevealItem delay={0.35}><Link to="/contact" className="hover:text-[#b5ff2b] transition-colors">Branding FAQs</Link></BlurRevealItem>
              <BlurRevealItem delay={0.38}><Link to="/insights" className="hover:text-[#b5ff2b] transition-colors">Blog</Link></BlurRevealItem>
            </ul>
          </div>

          {/* Col 3: Explore */}
          <div className="flex flex-col gap-4">
            <BlurReveal delay={0.2}>
              <h3 className="text-white font-extrabold tracking-widest text-[11px] uppercase font-sans opacity-95">Explore</h3>
            </BlurReveal>
            <ul className="flex flex-col gap-2.5 text-neutral-300 text-sm font-sans">
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

          {/* Col 4: Get in touch */}
          <div className="flex flex-col gap-4">
            <BlurReveal delay={0.25}>
              <h3 className="text-white font-extrabold tracking-widest text-[11px] uppercase font-sans opacity-95">Get in touch</h3>
            </BlurReveal>
            <ul className="flex flex-col gap-4 text-neutral-300 text-sm font-sans">
              <BlurRevealItem delay={0.3} className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#b5ff2b] flex-shrink-0" />
                <a href="tel:+918210198880" className="hover:text-white transition-colors">+91 82101 98880</a>
              </BlurRevealItem>
              <BlurRevealItem delay={0.35} className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#b5ff2b] flex-shrink-0" />
                <a href="mailto:hello@whycreatives.in" className="hover:text-white transition-colors break-all">hello@whycreatives.in</a>
              </BlurRevealItem>
              <BlurRevealItem delay={0.4} className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#b5ff2b] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">WhyCreatives</p>
                  <p className="text-neutral-300">Guwahati, Assam</p>
                  <p className="text-neutral-300">India</p>
                </div>
              </BlurRevealItem>
              <BlurRevealItem delay={0.45} className="flex items-center gap-3">
                <span className="text-[#b5ff2b] text-base font-bold flex-shrink-0">///</span>
                <span className="hover:text-white transition-colors text-neutral-300">why.creatives.in</span>
              </BlurRevealItem>
            </ul>
          </div>

        </div>

        {/* Giant Text Section */}
        <div className="border-t border-neutral-900 pt-8 pb-10 overflow-hidden select-none">
          <BlurReveal delay={0.3} duration={0.8} className="w-full">
            <h1 className="text-[12vw] sm:text-[10vw] font-black text-white tracking-tight leading-none text-center lg:text-left opacity-90 uppercase font-sans">
              Crafting since 2020
            </h1>
          </BlurReveal>
        </div>

        {/* Fine Print Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-neutral-900 pt-6 text-[10px] sm:text-xs text-neutral-400 font-sans">
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
  );
};

