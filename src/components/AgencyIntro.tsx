import { Link } from "react-router-dom";

const brandLogos = [
  { name: "20th Century Fox", font: "font-serif tracking-widest text-base sm:text-lg font-black uppercase" },
  { name: "SACHA LORD", font: "font-mono tracking-[0.25em] text-sm sm:text-base font-extrabold uppercase" },
  { name: "University of Salford", font: "font-sans tracking-tight text-xs sm:text-sm font-bold uppercase" },
  { name: "ROSEBUD", font: "font-serif tracking-[0.3em] text-sm sm:text-base font-semibold uppercase" },
  { name: "NHS", font: "font-sans tracking-tighter text-xl sm:text-2xl font-black italic uppercase" },
];

export const AgencyIntro = () => {
  return (
    <section className="w-full bg-background py-20 sm:py-28 lg:py-36 px-6 sm:px-10 lg:px-16 xl:px-20 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-[1600px] mx-auto">
        
        {/* ── TOP AGENCY STATEMENT (MadeByShape Grid Alignment) ─────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-20 sm:mb-28 items-start">
          
          {/* Left Badge: Col 1-3 */}
          <div className="lg:col-span-3 flex items-center gap-2.5 text-muted-foreground text-xs tracking-[0.2em] uppercase font-medium pt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
            Who are we?
          </div>

          {/* Statement & Pill Buttons: Col 4-12 */}
          <div className="lg:col-span-9 flex flex-col gap-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] font-normal text-foreground leading-[1.15] tracking-[-0.03em] max-w-5xl">
              WhyCreatives is an independent creative & digital agency building high-impact brand identities, web experiences, and video production.
            </h2>

            {/* Action Pill Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/about-us"
                className="inline-flex items-center gap-2 bg-[#b5ff2b] text-black text-xs font-bold px-5 py-2.5 rounded-full hover:bg-[#a8f020] transition-colors group"
              >
                About WhyCreatives
                <span className="w-4 h-4 rounded-full bg-black/15 flex items-center justify-center text-[10px] group-hover:translate-x-0.5 transition-transform">
                  ↗
                </span>
              </Link>
              <Link
                to="/people"
                className="inline-flex items-center gap-2 border border-foreground/20 text-foreground text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-secondary transition-colors"
              >
                Meet the Team ↗
              </Link>
            </div>
          </div>
        </div>

        {/* ── MINIMALIST PARTNER LOGO MARQUEE ROW (No border boxes) ── */}
        <div className="pt-14 sm:pt-20 border-t border-border/40 flex flex-wrap items-center justify-between gap-8 opacity-45 hover:opacity-100 transition-opacity duration-300 select-none">
          {brandLogos.map((logo) => (
            <span
              key={logo.name}
              className={`text-foreground/80 ${logo.font}`}
            >
              {logo.name}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
};
