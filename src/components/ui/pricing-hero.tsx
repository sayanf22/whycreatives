import { ServicePricingCard } from "./service-pricing-card";

export default function PricingHero() {
  return (
    <section className="bg-background py-12 sm:py-16 lg:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6">
            Premium Quality At
            <br className="hidden sm:block" />
            <span className="block sm:inline"> Up to 90% Less Cost</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
            Compare our transparent pricing with traditional agencies. Same professional quality,
            exceptional value. No hidden fees, no surprises - just honest pricing that helps your business grow.
          </p>
        </div>

        {/* Service Cards Display */}
        <div className="mt-8 sm:mt-12 md:mt-16 flex flex-col items-center gap-6 sm:gap-8 md:gap-12 w-full">
          <ServicePricingCard
            imageUrl="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop"
            serviceName="Video Production"
            savings="90%"
            quality="Premium"
            oldPrice="₹45k"
            oldPriceLabel="Avg. Agency"
            newPrice="₹6,999"
            newPriceLabel="Starting"
            duration="3-5 Days"
          />
          <ServicePricingCard
            imageUrl="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2000&auto=format&fit=crop"
            serviceName="Web Development"
            savings="85%"
            quality="Custom Code"
            oldPrice="₹35k"
            oldPriceLabel="Avg. Agency"
            newPrice="₹4,999"
            newPriceLabel="Starting"
            duration="1 Week"
          />
          <ServicePricingCard
            imageUrl="https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=2000&auto=format&fit=crop"
            serviceName="Brand Presence"
            savings="85%"
            quality="Strategic"
            oldPrice="₹40k"
            oldPriceLabel="Per Month"
            newPrice="₹5,999"
            newPriceLabel="Per Month"
            duration="Monthly"
          />
          <ServicePricingCard
            imageUrl="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop"
            serviceName="Performance Mkt"
            savings="73%"
            quality="High ROI"
            oldPrice="₹18.5k"
            oldPriceLabel="Per Month"
            newPrice="₹4,999"
            newPriceLabel="Per Month"
            duration="Ongoing"
          />
          <ServicePricingCard
            imageUrl="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop"
            serviceName="Motion Graphics"
            savings="89%"
            quality="4K Render"
            oldPrice="₹36.5k"
            oldPriceLabel="Per Min"
            newPrice="₹3,999"
            newPriceLabel="Starting"
            duration="48 Hours"
          />
          <ServicePricingCard
            imageUrl="https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2000&auto=format&fit=crop"
            serviceName="Logo Design"
            savings="88%"
            quality="Unique"
            oldPrice="₹25k"
            oldPriceLabel="Avg. Agency"
            newPrice="₹2,999"
            newPriceLabel="Starting"
            duration="2-3 Days"
          />
        </div>
      </div>
    </section>
  );
}
