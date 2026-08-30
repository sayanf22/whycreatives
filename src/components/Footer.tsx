import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { BlurReveal, BlurRevealItem } from "@/components/BlurReveal";
import { BrandMark } from "@/components/BrandMark";
/* Three marks, not the full set — see `social-marks.ts`. */
import { SOCIAL_MARKS } from "@/data/social-marks";

/**
 * Geometry of the white social rail punched into the card's top-left corner.
 *
 * All of it derives from the buttons, which is the point. The rail's box and its
 * three corner masks used to be hard-coded pixels — `w-[56px] h-[220px]`, masks
 * at `top-[196px]` / `top-[220px]` / `left-[32px]` / `left-[56px]` — while the
 * buttons inside them are sized in rem (`w-9`, `gap-2.5`, `top-4`). Those two
 * only agree at a 16px root font size. Raise the root to 20px, which is what
 * Android's "large" display font and any bumped browser default do, and the four
 * buttons need 237px of a rail that is still 220px: the last one hangs out of the
 * rail and lands on the black corner mask. That is the overlap.
 *
 * Everything below is therefore in rem too, so the rail grows with its contents
 * instead of staying a fixed box around them. `--rail-notch` is the exception and
 * stays in px on purpose: it is a corner radius, matched to the card's own
 * `rounded-[24px]`, which is also px.
 */
const RAIL = {
  /** Must equal the buttons' rendered size — they read it from here. */
  "--rail-icon": "2.25rem",
  /** Vertical space between buttons. */
  "--rail-gap": "0.625rem",
  /** Space from a button to the rail's left, right and bottom edges. */
  "--rail-inset": "0.625rem",
  /** Top offset, clear of the card's rounded top-left corner. */
  "--rail-top": "1rem",
  /** Radius of the three concave corner fillets. */
  "--rail-notch": "24px",
  "--rail-w": "calc(2 * var(--rail-inset) + var(--rail-icon))",
  "--rail-h":
    "calc(var(--rail-top) + var(--rail-count) * var(--rail-icon) + (var(--rail-count) - 1) * var(--rail-gap) + var(--rail-inset) + var(--rail-notch))",
} as React.CSSProperties;

/** Read by each button, so the rail's width can never disagree with them. */
const RAIL_ICON = {
  width: "var(--rail-icon)",
  height: "var(--rail-icon)",
} as React.CSSProperties;

/**
 * The rail's buttons, as data.
 *
 * `--rail-count` is taken from this array's length rather than written down, so
 * the rail resizes itself when a network is added or dropped. These were four
 * hand-copied anchors under a comment that said "Stack of 5", which is exactly
 * the drift this removes — with the old fixed height, adding the fifth would have
 * pushed it out of the rail and onto the card.
 *
 * The glyphs come from `<BrandMark>` keyed on the label, so this is now four lines of
 * link data rather than two inlined SVG paths and two letters in a `<span>`. Those two
 * SVGs were also `fill-black` — a fixed colour on a button whose surface is a token, so
 * the mark would have vanished the moment the rail's fill changed. `BrandMark` draws in
 * `currentColor` and inherits the button's `text-black`.
 *
 * LinkedIn still renders as "in" rather than a mark, and that is not an oversight:
 * LinkedIn asked to be removed from Simple Icons, so there is no path data to license.
 */
const SOCIALS: { href: string; label: string }[] = [
  { href: "https://www.linkedin.com/company/whycreatives/", label: "LinkedIn" },
  { href: "https://wa.me/918210198880", label: "WhatsApp" },
  { href: "https://twitter.com/why_creatives", label: "X" },
  { href: "https://www.instagram.com/areyparo", label: "Instagram" },
];

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    /* Two local tokens drive every surface in here:
         --footer-frame  the gutter/page colour the notches must blend into.
                         Bound to the theme background so it can never drift.
         --footer-card   the floating card surface.
       Light mode keeps its near-black card on white. Dark mode lifts the card
       off pure black instead of sitting at #0d0d0d, which had made the card
       edge, its rounded corners and the notches invisible against the page. */
    <div className="w-full bg-background p-3 sm:p-5 md:p-6 mt-12 sm:mt-16 font-['Schibsted_Grotesk',sans-serif] [--footer-card:#0d0d0d] [--footer-frame:hsl(var(--background))] dark:[--footer-card:#1c1c1c]">
      {/* The rail's measurements are declared here and consumed by the rail, its
          masks and its buttons below, so a change to any one of them cannot leave
          the others behind. `--rail-count` comes off the array. */}
      <div
        className="relative w-full overflow-hidden"
        style={{ ...RAIL, "--rail-count": SOCIALS.length } as React.CSSProperties}
      >
        {/* ========================================================
            LEFT WHITE SOCIAL RAIL
           ======================================================== */}

        {/* radius here must match the card's, or this rail's square corner
            pokes out past the card's rounded top-left */}
        <div
          className="absolute top-0 left-0 bg-[var(--footer-frame)] rounded-br-[24px] rounded-tl-[24px] md:rounded-tl-[32px] z-20"
          style={{ width: "var(--rail-w)", height: "var(--rail-h)" }}
        >
          {/* Inner Corner Mask (Bottom-Right concave curve). Pinned to the rail's
              own bottom-right, so it follows the rail when it grows rather than
              sitting where a 220px-tall rail used to end. */}
          <div
            className="absolute bg-[var(--footer-card)] z-20"
            style={{
              top: "calc(var(--rail-h) - var(--rail-notch))",
              left: "calc(var(--rail-w) - var(--rail-notch))",
              width: "var(--rail-notch)",
              height: "var(--rail-notch)",
            }}
          >
            <div className="w-full h-full bg-[var(--footer-frame)] rounded-br-[24px]" />
          </div>

          {/* Top-Right Transition Mask (curves the card's top edge down alongside
              the rail) */}
          <div
            className="absolute top-0 bg-[var(--footer-frame)] z-20"
            style={{
              left: "var(--rail-w)",
              width: "var(--rail-notch)",
              height: "var(--rail-notch)",
            }}
          >
            <div className="w-full h-full bg-[var(--footer-card)] rounded-tl-[24px]" />
          </div>

          {/* Bottom-Left Transition Mask (curves the card's edge back under the
              rail) */}
          <div
            className="absolute left-0 bg-[var(--footer-frame)] z-20"
            style={{
              top: "var(--rail-h)",
              width: "var(--rail-notch)",
              height: "var(--rail-notch)",
            }}
          >
            <div className="w-full h-full bg-[var(--footer-card)] rounded-tl-[24px]" />
          </div>
        </div>

        {/* The buttons. Sized, spaced and inset from the same values the rail
            is built from, so the rail is always exactly big enough to hold
            them at any root font size. */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="absolute flex flex-col z-30"
          style={{
            top: "var(--rail-top)",
            left: "var(--rail-inset)",
            gap: "var(--rail-gap)",
          }}
        >
          {SOCIALS.map(({ href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all select-none"
              style={RAIL_ICON}
              aria-label={label}
            >
              <BrandMark name={label} marks={SOCIAL_MARKS} className="h-4 w-4" />
            </a>
          ))}
        </motion.div>

        {/* ========================================================
            TOP-RIGHT DESKTOP SCROLL-TO-TOP CUTOUT
           ======================================================== */}
        
        <div 
          onClick={scrollToTop}
          className="absolute top-0 right-0 h-[44px] px-6 bg-[var(--footer-frame)] rounded-bl-[24px] rounded-tr-[24px] md:rounded-tr-[32px] z-20 hidden md:flex items-center gap-1.5 cursor-pointer text-xs text-neutral-800 dark:text-neutral-200 font-semibold select-none hover:opacity-90 transition-opacity"
        >
          {/* Cover strip on the right edge, hiding the card edge along y=0..44px */}
          <div className="absolute top-0 -right-1 w-2 h-full bg-[var(--footer-frame)]" />

          {/* Left Transition Mask (Attached to left edge: -left-[24px]) */}
          <div className="absolute top-0 -left-[24px] w-[24px] h-[24px] bg-[var(--footer-frame)] z-20">
            <div className="w-full h-full bg-[var(--footer-card)] rounded-tr-[24px]" />
          </div>
          {/* Bottom Transition Mask (Positioned flush at right-0 w-[24px] h-[24px]) */}
          <div className="absolute top-[44px] right-0 w-[24px] h-[24px] bg-[var(--footer-frame)] z-20">
            <div className="w-full h-full bg-[var(--footer-card)] rounded-tr-[24px]" />
          </div>

          <span>Sh*t I've gone too far, send me back up</span>
          <span className="text-sm">👆</span>
        </div>

        {/* ========================================================
            BOTTOM-RIGHT MOBILE SCROLL-TO-TOP CUTOUT
           ======================================================== */}
        
        <div 
          onClick={scrollToTop}
          className="absolute bottom-0 right-0 h-[44px] px-4 bg-[var(--footer-frame)] rounded-tl-[24px] rounded-br-[24px] z-20 md:hidden flex items-center gap-1.5 cursor-pointer text-[11px] text-neutral-800 dark:text-neutral-200 font-semibold select-none hover:opacity-90 transition-opacity"
        >
          {/* Top Transition Mask (Attached to top edge: -top-[24px]) */}
          <div className="absolute -top-[24px] right-0 w-[24px] h-[24px] bg-[var(--footer-frame)] z-20">
            <div className="w-full h-full bg-[var(--footer-card)] rounded-br-[24px]" />
          </div>
          {/* Left Transition Mask (Attached dynamically to left edge: -left-[24px]) */}
          <div className="absolute bottom-0 -left-[24px] w-[24px] h-[24px] bg-[var(--footer-frame)] z-20">
            <div className="w-full h-full bg-[var(--footer-card)] rounded-br-[24px]" />
          </div>

          <span>Sh*t I've gone too far, send me back up</span>
          <span className="text-sm">👆</span>
        </div>

        {/* ========================================================
            MAIN BLACK FOOTER CONTAINER (FLOATING INSET CARD)
           ======================================================== */}
        {/* Fully rounded floating card — the wrapper's padding above provides
            the light margin that frames it on all four sides. */}
        <footer className="relative bg-[var(--footer-card)] text-white pt-8 md:pt-12 lg:pt-16 pb-16 md:pb-12 px-4 sm:px-8 lg:px-20 overflow-hidden rounded-[24px] md:rounded-[32px]">
          
          <div className="max-w-7xl mx-auto relative">
            
            {/* UNIFIED UPPER SECTION (CTA on left, 3 Columns on right in single flex row) */}
            <div className="pl-16 sm:pl-20 pt-4 pb-12 flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16">
              
              {/* Left CTA Column */}
              <div className="flex flex-col gap-6 items-start max-w-sm">
                {/* Brand lockup. The card is dark in both themes, so the black
                    mark is inverted to white unconditionally here. */}
                <BlurReveal delay={0.05}>
                  <Link to="/" className="group inline-flex items-center gap-3" aria-label="WhyCreatives home">
                    <img
                      src="/logo.png"
                      alt=""
                      width={48}
                      height={48}
                      loading="lazy"
                      decoding="async"
                      className="h-10 w-10 shrink-0 object-contain invert transition-transform duration-300 group-hover:scale-105 motion-reduce:transform-none sm:h-11 sm:w-11"
                    />
                    <span className="text-xl font-black tracking-tighter text-white sm:text-2xl">
                      WhyCreatives.
                    </span>
                  </Link>
                </BlurReveal>

                <BlurReveal delay={0.1}>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-white">
                    Do you like<br />what you see?
                  </h2>
                </BlurReveal>
                <BlurReveal delay={0.2}>
                  <div className="flex flex-wrap items-center gap-5">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-full hover:bg-white/85 transition-all hover:scale-[1.03] group"
                    >
                      <span>Start a project</span>
                      <ArrowUpRight className="w-4.5 h-4.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>

                    <div className="flex flex-col gap-1 leading-none">
                      <span className="text-[11px] font-semibold text-white">
                        Scope-led proposals
                      </span>
                      <span className="text-[10px] text-neutral-400">
                        Built around your brief
                      </span>
                    </div>
                  </div>
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
                    <BlurRevealItem delay={0.2}><Link to="/about-us" className="group relative inline-block hover:text-white transition-colors"><span>About</span><span className="absolute left-0 -bottom-0.5 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" /></Link></BlurRevealItem>
                    <BlurRevealItem delay={0.23}><Link to="/about-us" className="group relative inline-block hover:text-white transition-colors"><span>Culture</span><span className="absolute left-0 -bottom-0.5 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" /></Link></BlurRevealItem>
                    <BlurRevealItem delay={0.26}><Link to="/our-work" className="group relative inline-block hover:text-white transition-colors"><span>Client work</span><span className="absolute left-0 -bottom-0.5 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" /></Link></BlurRevealItem>
                    <BlurRevealItem delay={0.29}><Link to="/what-we-do" className="group relative inline-block hover:text-white transition-colors"><span>Processes</span><span className="absolute left-0 -bottom-0.5 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" /></Link></BlurRevealItem>
                    <BlurRevealItem delay={0.32}><Link to="/contact" className="group relative inline-block hover:text-white transition-colors"><span>FAQs</span><span className="absolute left-0 -bottom-0.5 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" /></Link></BlurRevealItem>
                    <BlurRevealItem delay={0.35}><Link to="/contact" className="group relative inline-block hover:text-white transition-colors"><span>Branding FAQs</span><span className="absolute left-0 -bottom-0.5 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" /></Link></BlurRevealItem>
                    <BlurRevealItem delay={0.38}><Link to="/insights" className="group relative inline-block hover:text-white transition-colors"><span>Blog</span><span className="absolute left-0 -bottom-0.5 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" /></Link></BlurRevealItem>
                  </ul>
                </div>

                {/* Col 2: Explore */}
                <div className="flex flex-col gap-4">
                  <BlurReveal delay={0.2}>
                    <h3 className="text-white font-extrabold tracking-widest text-[11px] uppercase opacity-95">Explore</h3>
                  </BlurReveal>
                  <ul className="flex flex-col gap-2.5 text-neutral-300 text-xs sm:text-sm">
                    <BlurRevealItem delay={0.25}><Link to="/" className="group relative inline-block hover:text-white transition-colors"><span>Home</span><span className="absolute left-0 -bottom-0.5 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" /></Link></BlurRevealItem>
                    <BlurRevealItem delay={0.28} className="flex items-center gap-2">
                      <Link to="/our-work" className="group relative inline-block hover:text-white transition-colors"><span>Work</span><span className="absolute left-0 -bottom-0.5 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" /></Link>
                      <span className="bg-white text-black font-extrabold text-[8px] px-1.5 py-0.5 rounded uppercase tracking-wider scale-90">New</span>
                    </BlurRevealItem>
                    <BlurRevealItem delay={0.31}><Link to="/what-we-do" className="group relative inline-block hover:text-white transition-colors"><span>Services</span><span className="absolute left-0 -bottom-0.5 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" /></Link></BlurRevealItem>
                    <BlurRevealItem delay={0.34}><Link to="/join-us" className="group relative inline-block hover:text-white transition-colors"><span>Careers</span><span className="absolute left-0 -bottom-0.5 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" /></Link></BlurRevealItem>
                    <BlurRevealItem delay={0.37}><Link to="/areas-we-serve" className="group relative inline-block hover:text-white transition-colors"><span>Sectors</span><span className="absolute left-0 -bottom-0.5 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" /></Link></BlurRevealItem>
                    <BlurRevealItem delay={0.43}><Link to="/contact" className="group relative inline-block hover:text-white transition-colors"><span>Contact</span><span className="absolute left-0 -bottom-0.5 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" /></Link></BlurRevealItem>
                  </ul>
                </div>

                {/* Col 3: Get in touch */}
                <div className="col-span-2 sm:col-span-1 flex flex-col gap-4">
                  <BlurReveal delay={0.25}>
                    <h3 className="text-white font-extrabold tracking-widest text-[11px] uppercase opacity-95">Get in touch</h3>
                  </BlurReveal>
                  <ul className="flex flex-col gap-3 text-neutral-300 text-xs sm:text-sm">
                    <BlurRevealItem delay={0.3} className="flex items-center gap-2.5">
                      <Phone className="w-3.5 h-3.5 text-white flex-shrink-0" />
                      <a href="tel:+918210198880" className="group relative inline-block hover:text-white transition-colors"><span>+91 82101 98880</span><span className="absolute left-0 -bottom-0.5 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" /></a>
                    </BlurRevealItem>
                    <BlurRevealItem delay={0.35} className="flex items-center gap-2.5">
                      <Mail className="w-3.5 h-3.5 text-white flex-shrink-0" />
                      <a href="mailto:hello@whycreatives.in" className="group relative inline-block hover:text-white transition-colors break-all"><span>hello@whycreatives.in</span><span className="absolute left-0 -bottom-0.5 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" /></a>
                    </BlurRevealItem>
                    <BlurRevealItem delay={0.4} className="flex items-start gap-2.5">
                      <MapPin className="w-3.5 h-3.5 text-white mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-white">WhyCreatives</p>
                        <p className="text-neutral-300 text-xs">Guwahati, Assam, India</p>
                      </div>
                    </BlurRevealItem>
                    <BlurRevealItem delay={0.45} className="flex items-center gap-2.5">
                      <span className="text-white text-sm font-bold flex-shrink-0">///</span>
                      <span className="hover:text-white transition-colors text-neutral-300 text-xs">why.creatives.in</span>
                    </BlurRevealItem>
                  </ul>
                </div>

              </div>

            </div>

            {/* Giant Text Section */}
            {/* dividers are tied to the text colour, not a fixed neutral, so
                they stay equally faint on both card shades */}
            <div className="border-t border-white/10 pt-8 pb-10 overflow-hidden select-none">
              <BlurReveal delay={0.3} duration={0.8} className="w-full overflow-hidden">
                <h1 className="text-[6.5vw] sm:text-[6.5vw] lg:text-[7vw] font-black text-white tracking-tight leading-none text-center lg:text-left opacity-90 uppercase">
                  Crafting since 2020
                </h1>
              </BlurReveal>
            </div>

            {/* Fine Print Bottom Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6 text-[10px] sm:text-xs text-neutral-400">
              <BlurReveal delay={0.4}>
                <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 md:justify-start">
                  <Link
                    to="/"
                    className="flex shrink-0 items-center gap-2 transition-opacity hover:opacity-80"
                  >
                    {/* Was rendering black-on-black here and reading as a blank
                        gap; inverted so it actually shows on the dark card. */}
                    <img
                      src="/logo.png"
                      alt=""
                      width={24}
                      height={24}
                      loading="lazy"
                      decoding="async"
                      className="h-6 w-6 shrink-0 object-contain invert"
                    />
                    <span className="text-sm font-black tracking-tighter text-white">
                      WhyCreatives.
                    </span>
                  </Link>
                  <span className="hidden text-white/25 md:inline">|</span>
                  <span>© WhyCreatives Agency 2026</span>
                  <span className="text-white/25">|</span>
                  <span>Guwahati, Assam, India</span>
                </div>
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
