import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
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
      <div className="pt-20">
        <PricingHero />
      </div>
      
      <div className="pb-20 px-6">
        <div className="container mx-auto max-w-[1000px]">

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto animate-fade-in">
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
                      <span className="inline-block bg-neutral-800 text-white font-bold text-xl px-4 py-2 rounded">
                        {row.savings}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-6 animate-fade-in">
            {pricingData.map((row, index) => (
              <div
                key={index}
                className="border border-white/20 rounded-lg p-6 hover:border-white/40 transition-colors duration-300"
              >
                <h3 className="text-white font-black text-xl mb-4 uppercase">
                  {row.service}
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-muted-foreground text-sm mb-1 uppercase tracking-wider">
                      WhyCreatives Starting Price
                    </p>
                    <p className="text-white font-bold text-2xl">
                      {row.whyCreatives}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm mb-1 uppercase tracking-wider">
                      Other Agencies Starting Price
                    </p>
                    <p className="text-muted-foreground line-through text-xl">
                      {row.others}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm mb-2 uppercase tracking-wider">
                      Your Savings
                    </p>
                    <span className="inline-block bg-neutral-800 text-white font-bold text-xl px-4 py-2 rounded">
                      {row.savings}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center p-8 border-2 border-white rounded-lg animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Ready to Save 90%?
            </h2>
            <p className="text-xl text-muted-foreground mb-6">
              Get professional creative services at unbeatable prices
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-black font-bold text-lg px-8 py-4 hover:bg-muted-foreground transition-colors duration-300"
            >
              Get Started Today
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Comparison;
