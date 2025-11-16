import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import PricingHero from "@/components/ui/pricing-hero";

const Comparison = () => {
  const pricingData = [
    {
      service: "Video Editing",
      whyCreatives: "₹500",
      others: "₹5,000",
      savings: "90%",
    },
    {
      service: "Website Building",
      whyCreatives: "₹2,000",
      others: "₹10,000",
      savings: "80%",
    },
    {
      service: "Social Media Management",
      whyCreatives: "₹3,000/month",
      others: "₹20,000/month",
      savings: "85%",
    },
    {
      service: "Ad Campaigns",
      whyCreatives: "₹2,000",
      others: "₹10,000/month",
      savings: "80%",
    },
    {
      service: "Motion Graphics Animation",
      whyCreatives: "₹1,000 per 10sec",
      others: "₹10,000 per 10sec",
      savings: "90%",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <FadeInWhenVisible>
        <div className="pt-20">
          <PricingHero />
        </div>
      </FadeInWhenVisible>
      
      <div className="pb-20 px-6">
        <div className="container mx-auto max-w-[1000px]">

          {/* Desktop Table */}
          <FadeInWhenVisible delay={0.2}>
            <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-white">
                  <th className="text-left py-6 px-6 text-white font-black uppercase tracking-wider text-sm">
                    Service
                  </th>
                  <th className="text-center py-6 px-6 text-white font-black uppercase tracking-wider text-sm">
                    WhyCreatives<br />Starting Price
                  </th>
                  <th className="text-center py-6 px-6 text-white font-black uppercase tracking-wider text-sm">
                    Other Agencies<br />Starting Price
                  </th>
                  <th className="text-center py-6 px-6 text-white font-black uppercase tracking-wider text-sm">
                    Savings
                  </th>
                </tr>
              </thead>
              <tbody>
                {pricingData.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-white/20 hover:bg-white/5 transition-colors duration-300"
                  >
                    <td className="py-6 px-6 text-white font-semibold text-lg">
                      {row.service}
                    </td>
                    <td className="py-6 px-6 text-center">
                      <span className="text-white font-bold text-2xl">
                        {row.whyCreatives}
                      </span>
                    </td>
                    <td className="py-6 px-6 text-center">
                      <span className="text-muted-foreground line-through text-xl">
                        {row.others}
                      </span>
                    </td>
                    <td className="py-6 px-6 text-center">
                      <span className="inline-block bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 text-primary font-black text-xl px-6 py-3 rounded-2xl">
                        {row.savings}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </FadeInWhenVisible>

          {/* Mobile Cards */}
          <FadeInWhenVisible delay={0.2}>
            <div className="md:hidden space-y-4">
            {pricingData.map((row, index) => (
              <div
                key={index}
                className="border border-white/20 rounded-2xl p-6 hover:border-primary/50 hover:bg-secondary/30 transition-all duration-300 backdrop-blur-sm"
              >
                <h3 className="text-white font-black text-lg mb-4">
                  {row.service}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 rounded-xl bg-secondary/50">
                    <span className="text-muted-foreground text-xs uppercase tracking-wide">WhyCreatives</span>
                    <span className="text-white font-bold text-xl">{row.whyCreatives}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-xl bg-secondary/30">
                    <span className="text-muted-foreground text-xs uppercase tracking-wide">Others</span>
                    <span className="text-muted-foreground line-through text-lg">{row.others}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30">
                    <span className="text-foreground text-xs uppercase tracking-wide font-semibold">You Save</span>
                    <span className="text-primary font-black text-2xl">{row.savings}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </FadeInWhenVisible>

          {/* Bottom CTA */}
          <FadeInWhenVisible delay={0.3}>
            <div className="mt-16 text-center p-8 md:p-10 border-2 border-white rounded-3xl bg-gradient-to-br from-secondary/50 to-secondary/20 backdrop-blur-sm">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Ready to Save 90%?
            </h2>
            <p className="text-xl text-muted-foreground mb-6">
              Get professional creative services at unbeatable prices
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-black font-bold text-lg px-8 py-4 rounded-2xl hover:bg-primary hover:text-primary-foreground hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Started Today →
            </a>
          </div>
          </FadeInWhenVisible>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Comparison;
