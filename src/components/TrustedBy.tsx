import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export const TrustedBy = () => {
  const { ref, isVisible } = useScrollAnimation();

  const stats = [
    { number: "200+", label: "Happy Clients" },
    { number: "15+", label: "Industries Served" },
    { number: "48hr", label: "Average Turnaround" },
    { number: "24/7", label: "Support Available" },
  ];

  return (
    <section 
      ref={ref}
      className={`py-12 sm:py-20 px-4 sm:px-6 border-t border-border transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
    >
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-center mb-10 sm:mb-16 leading-tight">
          Trusted by <span className="text-muted-foreground">Growing Businesses</span>
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`text-center transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-3xl sm:text-5xl md:text-6xl font-black mb-1 sm:mb-2">{stat.number}</div>
              <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
