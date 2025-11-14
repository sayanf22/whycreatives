import { GooeyText } from "@/components/ui/gooey-text-morphing";

export const GooeySection = () => {
  return (
    <section className="py-32 px-6 bg-background border-t border-border">
      <div className="container mx-auto max-w-7xl">
        <div className="h-[300px] flex items-center justify-center">
          <GooeyText
            texts={["Creative", "Professional", "Affordable", "Transparent"]}
            morphTime={1}
            cooldownTime={0.25}
            className="font-black"
          />
        </div>
        <div className="text-center mt-8">
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the difference with WhyCreatives - where quality meets affordability
          </p>
        </div>
      </div>
    </section>
  );
};
