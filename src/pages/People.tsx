import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { Users } from "lucide-react";

// TODO: Fetch team data from database
const team: any[] = [];

const People = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-7xl">
          <FadeInWhenVisible>
            <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-black text-foreground mb-6">
              Meet Our Team
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Talented professionals dedicated to bringing your creative vision to life
            </p>
          </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.2}>
          {team.length === 0 ? (
            // Empty State
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6">
                <Users className="w-12 h-12 text-muted-foreground" />
              </div>
              <h2 className="text-3xl font-black text-white mb-4">
                Building Our Team
              </h2>
              <p className="text-lg text-muted-foreground max-w-md text-center mb-8">
                We're currently assembling our talented team. Check back soon to meet the people behind WhyCreatives.
              </p>
              <a
                href="/join-us"
                className="inline-block bg-white text-black px-8 py-4 font-bold hover:bg-muted-foreground transition-colors"
              >
                Join Our Team
              </a>
            </div>
          ) : (
            // Team Grid (will show when data is added)
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div
                  key={member.id}
                  className="group border-2 border-border hover:border-foreground transition-all duration-300 overflow-hidden"
                >
                  <div className="aspect-square bg-secondary flex items-center justify-center group-hover:bg-muted transition-colors duration-300">
                    {member.image ? (
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-6xl font-black text-foreground opacity-30 group-hover:opacity-50 transition-opacity">
                        {member.name.split(' ').map((n: string) => n[0]).join('')}
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-foreground mb-1 group-hover:text-muted-foreground transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-sm text-muted-foreground font-semibold mb-4 uppercase tracking-wider">
                      {member.role}
                    </p>
                    <p className="text-sm text-muted-foreground mb-6">
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          </FadeInWhenVisible>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default People;