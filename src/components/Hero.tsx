import { Link } from "react-router-dom";

interface HeroProps {
  title?: React.ReactNode;
  subtitle?: string;
}

export const Hero = ({ title, subtitle }: HeroProps) => {
  return (
    <section className="w-full bg-background pt-32 sm:pt-40 lg:pt-44 pb-16 sm:pb-20 lg:pb-24 px-6 sm:px-10 lg:px-16 xl:px-20 font-['Plus_Jakarta_Sans',sans-serif] relative overflow-hidden">
      <div className="w-full max-w-[1600px] mx-auto">
        
        {/* ── MAIN HERO GRID (Matching MadeByShape Grid Alignment) ───── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Badge */}
          <div className="lg:col-span-3 flex items-center gap-2.5 text-muted-foreground text-xs tracking-[0.2em] uppercase font-medium pt-3">
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
            Creative & Digital Agency
          </div>

          {/* Center/Right Column: Display Headline, Subtitle, & Pill Buttons */}
          <div className="lg:col-span-9 flex flex-col gap-6 sm:gap-8">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[6.5rem] font-bold text-foreground tracking-[-0.04em] leading-[1.05] max-w-5xl">
              {title || (
                <>
                  Creative Excellence<br />
                  <span className="text-muted-foreground font-normal">Redefined.</span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl leading-relaxed font-normal">
              {subtitle || "WhyCreatives builds high-impact brand identities, custom web & mobile applications (Next.js, Node.js, Supabase, Convex), and viral video content that elevate businesses."}
            </p>

            {/* Action Pill Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2.5 bg-[#b5ff2b] text-black text-xs sm:text-sm font-bold px-6 py-3 rounded-full hover:bg-[#a8f020] transition-colors group"
              >
                Get Started
                <span className="w-4 h-4 rounded-full bg-black/15 flex items-center justify-center text-[10px] group-hover:translate-x-0.5 transition-transform">
                  ↗
                </span>
              </Link>
              <Link
                to="/what-we-do"
                className="inline-flex items-center gap-2.5 border border-foreground/20 text-foreground text-xs sm:text-sm font-semibold px-6 py-3 rounded-full hover:bg-secondary transition-colors"
              >
                See Our Services ↗
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
