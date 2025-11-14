import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { MessageSquare, FileCheck, Rocket, ThumbsUp } from "lucide-react";

export const HowItWorks = () => {
  const { ref, isVisible } = useScrollAnimation();

  const steps = [
    {
      icon: MessageSquare,
      number: "01",
      title: "Tell Us Your Vision",
      description: "Share your project requirements, goals, and creative vision. We'll schedule a consultation to understand exactly what you need.",
    },
    {
      icon: FileCheck,
      number: "02",
      title: "Get Your Quote",
      description: "Receive a transparent, detailed quote with no hidden fees. We'll break down the timeline and deliverables so you know exactly what to expect.",
    },
    {
      icon: Rocket,
      number: "03",
      title: "We Create Magic",
      description: "Our expert team gets to work bringing your vision to life. You'll receive regular updates and have full visibility into the progress.",
    },
    {
      icon: ThumbsUp,
      number: "04",
      title: "Review & Launch",
      description: "Review the final deliverables and request any revisions. Once you're 100% satisfied, we'll help you launch and provide ongoing support.",
    },
  ];

  return (
    <section 
      ref={ref}
      className={`py-20 px-6 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
    >
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            How It <span className="text-muted-foreground">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Four simple steps from concept to completion
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className={`relative transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-8xl font-black text-muted/20 absolute -top-4 -left-2 -z-10">
                  {step.number}
                </div>
                <Icon className="w-12 h-12 mb-4 relative z-10" />
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
