import { Link } from "react-router-dom";

const brandLogos = [
  { name: "20th Century Fox", font: "font-serif tracking-widest text-base sm:text-lg font-black" },
  { name: "SACHA LORD", font: "font-mono tracking-[0.25em] text-sm sm:text-base font-extrabold" },
  { name: "University of Salford", font: "font-sans tracking-tight text-xs sm:text-sm font-bold uppercase" },
  { name: "ROSEBUD", font: "font-serif tracking-[0.3em] text-sm sm:text-base font-semibold" },
  { name: "NHS", font: "font-sans tracking-tighter text-lg sm:text-xl font-black italic" },
];

export const AgencyIntro = () => {
  return (
    <section className="w-full bg-background py-20 sm:py-28 lg:py-32 px-6 sm:px-10 lg:px-16 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-[1500px] mx-auto">
        
        {/* ── TOP AGENCY STATEMENT ──────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-20 sm:mb-28 items-start">
          
          {/* Left Badge */}
          <div className="lg:col-span-3 flex items-center gap-2.5 text-muted-foreground text-xs tracking-[0.2em] uppercase font-medium pt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
            Who are we?
          </div>

          {/* Center Statement & Action Pills */}
          <div className="lg:col-span-9 flex flex-col gap-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold text-foreground leading-[1.2] tracking-[-0.02em] max-w-4xl">
              WhyCreatives is an independent creative & digital agency building high-impact brand identities, custom web & mobile apps, and viral video production.
            </h2>

            {/* Action Pill Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <Link
                to="/about-us"
                className="inline-flex items-center gap-2 bg-[#b5ff2b] text-black text-xs font-bold px-5 py-2.5 rounded-full hover:bg-[#a8f020] transition-colors"
              >
                About WhyCreatives
                <span className="w-4 h-4 rounded-full bg-black/15 flex items-center justify-center text-[10px]">
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

        {/* ── CLEAN LOGO ROW ───────────────────────────────────────── */}
        <div className="pt-12 sm:pt-16 border-t border-border/40 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center opacity-50 hover:opacity-100 transition-opacity duration-300">
          {brandLogos.map((logo) => (
            <div
              key={logo.name}
              className="flex items-center justify-center p-4 rounded-xl border border-border/20 bg-secondary/20 w-full max-w-[200px] h-16 text-center select-none"
            >
              <span className={`text-foreground ${logo.font}`}>
                {logo.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
