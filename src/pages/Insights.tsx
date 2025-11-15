import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { FileText, Clock } from "lucide-react";

const Insights = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <FadeInWhenVisible>
            <div className="text-center">
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <FileText className="h-24 w-24 text-muted-foreground opacity-20" />
                <Clock className="h-12 w-12 text-foreground absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-foreground mb-6">
              Insights Coming Soon
            </h1>
            
            <div className="max-w-2xl mx-auto space-y-4 text-lg text-muted-foreground">
              <p>
                We apologize for the inconvenience. Our Insights & Resources section is currently under development.
              </p>
              <p>
                We're working hard to bring you valuable content including industry insights, practical guides, 
                and strategies to help your business grow with creative services.
              </p>
              <p className="text-foreground font-semibold pt-4">
                Thank you for your patience. Check back soon!
              </p>
            </div>
          </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.2}>
            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                In the meantime, feel free to explore our services or get in touch with us directly.
              </p>
            </div>
          </FadeInWhenVisible>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Insights;