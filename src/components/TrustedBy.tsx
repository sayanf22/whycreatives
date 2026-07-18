import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Users, Briefcase, Clock, Headphones } from "lucide-react";

export const TrustedBy = () => {
  const { ref, isVisible } = useScrollAnimation();

  const stats = [
    { 
      number: "200+", 
      label: "Happy Clients", 
      icon: Users,
      glowClass: "group-hover:bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_70%)]",
      gradient: "from-blue-400 via-indigo-400 to-indigo-500",
      iconColor: "text-blue-400 dark:text-blue-400 light:text-blue-600"
    },
    { 
      number: "15+", 
      label: "Industries Served", 
      icon: Briefcase,
      glowClass: "group-hover:bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.12),transparent_70%)]",
      gradient: "from-purple-400 via-pink-400 to-pink-500",
      iconColor: "text-purple-400 dark:text-purple-400 light:text-purple-600"
    },
    { 
      number: "48hr", 
      label: "Average Turnaround", 
      icon: Clock,
      glowClass: "group-hover:bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.12),transparent_70%)]",
      gradient: "from-amber-400 via-orange-400 to-orange-500",
      iconColor: "text-amber-400 dark:text-amber-400 light:text-amber-600"
    },
    { 
      number: "24/7", 
      label: "Support Available", 
      icon: Headphones,
      glowClass: "group-hover:bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.12),transparent_70%)]",
      gradient: "from-emerald-400 via-teal-400 to-teal-500",
      iconColor: "text-emerald-400 dark:text-emerald-400 light:text-emerald-600"
    },
  ];

  return (
    <section 
      ref={ref}
      className={`py-16 sm:py-24 md:py-32 px-4 sm:px-6 border-t border-border transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-6">
        <div className="flex flex-col items-center text-center mb-16 sm:mb-24">
          <span className="px-3.5 py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-muted-foreground bg-white/5 dark:bg-white/[0.02] border border-black/10 dark:border-white/5 rounded-full mb-4">
            Track Record
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none text-foreground">
            Trusted by <span className="text-muted-foreground font-medium">Growing Businesses</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index}
                className={`relative group bg-white/5 dark:bg-white/[0.01] border border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/10 p-8 rounded-3xl text-left transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Glow Overlay */}
                <div className={`absolute inset-0 transition-all duration-700 opacity-0 group-hover:opacity-100 ${stat.glowClass}`} />
                
                {/* Content */}
                <div className="relative z-10 flex flex-col justify-between h-full min-h-[160px]">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60 group-hover:text-muted-foreground transition-colors duration-500">
                      Metric {index + 1}
                    </span>
                    <Icon className={`w-6 h-6 ${stat.iconColor} filter drop-shadow-[0_0_8px_rgba(255,255,255,0.1)] group-hover:scale-110 transition-transform duration-500`} />
                  </div>
                  
                  <div className="mt-8">
                    <div className={`text-4xl sm:text-5xl font-black mb-2 tracking-tight bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent group-hover:scale-[1.02] origin-left transition-transform duration-500`}>
                      {stat.number}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground/80 uppercase tracking-widest font-bold">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
