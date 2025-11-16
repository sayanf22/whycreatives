export default function PricingHero() {
  return (
    <section className="bg-background py-12 sm:py-16 lg:py-24 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="hidden sm:block absolute top-20 right-20 w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full"></div>
      <div className="hidden sm:block absolute top-32 right-32 w-2 h-2 sm:w-3 sm:h-3 bg-white/50 rounded-sm transform rotate-45"></div>
      <div className="hidden sm:block absolute top-40 right-16 w-1 h-6 sm:w-2 sm:h-8 bg-white/30"></div>
      <div className="hidden sm:block absolute top-48 right-24 w-4 h-1 sm:w-6 sm:h-2 bg-white/40"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6">
              Premium Quality At
              <br className="hidden sm:block" />
              <span className="block sm:inline"> 90% Less Cost</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Compare our transparent pricing with traditional agencies. Same professional quality, 
              exceptional value. No hidden fees, no surprises - just honest pricing that helps your business grow.
            </p>
          </div>

          <div className="relative mt-8 lg:mt-0">
            {/* Pricing Comparison Card */}
            <div className="relative bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-2xl transform hover:scale-105 transition-all duration-300 max-w-md mx-auto lg:max-w-none border border-white/20">
              <div className="text-white mb-4 sm:mb-5">
                <div className="text-sm sm:text-base text-neutral-300 mb-1 font-semibold">Live Comparison</div>
                <div className="text-xs sm:text-sm text-neutral-500">WhyCreatives vs Others</div>
              </div>

              {/* Pricing bars visualization */}
              <div className="space-y-3 sm:space-y-3.5 mb-5">
                {/* Video Editing */}
                <div>
                  <div className="text-white text-xs sm:text-sm mb-1.5 font-medium">Video Editing</div>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-white h-8 sm:h-9 rounded-xl flex items-center justify-center text-black font-bold text-xs sm:text-sm shadow-md">
                      ₹500
                    </div>
                    <div className="flex-[9] bg-neutral-800 h-8 sm:h-9 rounded-xl flex items-center justify-center text-neutral-500 text-xs sm:text-sm line-through">
                      ₹5,000
                    </div>
                  </div>
                </div>

                {/* Website Building */}
                <div>
                  <div className="text-white text-xs sm:text-sm mb-1.5 font-medium">Website Building</div>
                  <div className="flex gap-2">
                    <div className="flex-[2] bg-white h-8 sm:h-9 rounded-xl flex items-center justify-center text-black font-bold text-xs sm:text-sm shadow-md">
                      ₹2,000
                    </div>
                    <div className="flex-[8] bg-neutral-800 h-8 sm:h-9 rounded-xl flex items-center justify-center text-neutral-500 text-xs sm:text-sm line-through">
                      ₹10,000
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <div className="text-white text-xs sm:text-sm mb-1.5 font-medium">Social Media</div>
                  <div className="flex gap-2">
                    <div className="flex-[3] bg-white h-8 sm:h-9 rounded-xl flex items-center justify-center text-black font-bold text-xs sm:text-sm shadow-md">
                      ₹3k/mo
                    </div>
                    <div className="flex-[7] bg-neutral-800 h-8 sm:h-9 rounded-xl flex items-center justify-center text-neutral-500 text-xs sm:text-sm line-through">
                      ₹20k/mo
                    </div>
                  </div>
                </div>

                {/* Ad Campaigns */}
                <div>
                  <div className="text-white text-xs sm:text-sm mb-1.5 font-medium">Ad Campaigns</div>
                  <div className="flex gap-2">
                    <div className="flex-[2] bg-white h-8 sm:h-9 rounded-xl flex items-center justify-center text-black font-bold text-xs sm:text-sm shadow-md">
                      ₹2,000
                    </div>
                    <div className="flex-[8] bg-neutral-800 h-8 sm:h-9 rounded-xl flex items-center justify-center text-neutral-500 text-xs sm:text-sm line-through">
                      ₹10k/mo
                    </div>
                  </div>
                </div>

                {/* Motion Graphics */}
                <div>
                  <div className="text-white text-xs sm:text-sm mb-1.5 font-medium">Motion Graphics</div>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-white h-8 sm:h-9 rounded-xl flex items-center justify-center text-black font-bold text-xs sm:text-sm shadow-md">
                      ₹1,000
                    </div>
                    <div className="flex-[9] bg-neutral-800 h-8 sm:h-9 rounded-xl flex items-center justify-center text-neutral-500 text-xs sm:text-sm line-through">
                      ₹10,000
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center text-white text-sm sm:text-base border-t border-white/20 pt-4 mt-1">
                <div>
                  <div className="mb-1 font-bold">WhyCreatives</div>
                  <div className="text-neutral-400 text-xs sm:text-sm">Transparent Pricing</div>
                </div>
                <div className="text-right">
                  <div className="mb-1 font-black text-white text-lg sm:text-xl">Save 90%</div>
                  <div className="text-neutral-400 text-xs sm:text-sm">On Average</div>
                </div>
              </div>
            </div>

            {/* Floating decorative elements */}
            <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-lg transform rotate-45"></div>
            <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 w-4 h-4 sm:w-6 sm:h-6 bg-white/70 rounded-full"></div>
            <div className="hidden sm:block absolute top-1/2 -right-8 w-4 h-12 bg-white/30"></div>

            {/* Scattered pixels */}
            <div className="hidden sm:block absolute top-8 right-8 w-2 h-2 bg-white/50"></div>
            <div className="hidden sm:block absolute bottom-12 left-8 w-3 h-3 bg-white/60 rounded-full"></div>
            <div className="hidden sm:block absolute top-16 left-12 w-2 h-6 bg-white/40"></div>
          </div>
        </div>

        {/* Services offered */}
        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-white/10">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 lg:gap-12 opacity-60">
            {[
              "Video Editing",
              "Web Development",
              "Social Media",
              "Ad Campaigns",
              "Motion Graphics",
            ].map((service, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-4 h-4 sm:w-6 sm:h-6 bg-white/40 rounded"></div>
                <span className="text-muted-foreground font-medium text-sm sm:text-base">
                  {service}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
