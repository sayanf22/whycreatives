import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ServicePricingCardProps {
    imageUrl: string;
    serviceName: string;
    savings: string;
    quality: string;
    oldPrice: string;
    oldPriceLabel: string;
    newPrice: string;
    newPriceLabel: string;
    duration: string;
    className?: string;
}

export const ServicePricingCard = React.forwardRef<HTMLDivElement, ServicePricingCardProps>(
    (
        {
            imageUrl,
            serviceName,
            savings,
            quality,
            oldPrice,
            oldPriceLabel,
            newPrice,
            newPriceLabel,
            duration,
            className,
        },
        ref
    ) => {
        const cardVariants = {
            hidden: { opacity: 0, y: 40 },
            visible: {
                opacity: 1,
                y: 0,
                transition: {
                    duration: 0.7,
                    ease: "easeOut" as const,
                    when: "beforeChildren",
                    staggerChildren: 0.15,
                },
            },
        };

        const itemVariants = {
            hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
            visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.6, ease: "easeOut" as const }
            },
        };

        return (
            <motion.div
                ref={ref}
                className={cn(
                    "max-w-3xl w-full font-sans rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-black/40 border border-white/10 backdrop-blur-md my-4 sm:my-6",
                    className
                )}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            >
                {/* Service Image */}
                <div className="relative h-48 sm:h-64 md:h-80">
                    <img
                        src={imageUrl}
                        alt={serviceName}
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                    <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex justify-between items-end">
                        <div>
                            <motion.h3
                                variants={itemVariants}
                                className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2 tracking-tight"
                            >
                                {serviceName}
                            </motion.h3>
                            <motion.span
                                variants={itemVariants}
                                className="px-2 sm:px-3 py-1 sm:py-1.5 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-emerald-400 text-xs sm:text-sm font-bold backdrop-blur-sm inline-block"
                            >
                                {savings} OFF
                            </motion.span>
                        </div>
                    </div>
                </div>

                {/* Details Container */}
                <div className="p-4 sm:p-6 md:p-8 lg:p-10">
                    {/* Price Comparison Route */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-6 sm:gap-0"
                    >
                        <div className="text-center sm:text-left w-full sm:w-auto">
                            <p className="text-xs sm:text-base text-neutral-400 mb-2 font-medium">Traditional Agency</p>
                            <p className="text-2xl sm:text-3xl md:text-5xl font-bold text-neutral-600 line-through decoration-red-500/50 decoration-2">
                                {oldPrice}
                            </p>
                            <p className="text-xs sm:text-sm text-neutral-500 mt-2 font-medium">{oldPriceLabel}</p>
                        </div>

                        <div className="text-center px-2 sm:px-4 flex flex-col items-center">
                            <div className="flex items-center gap-2 sm:gap-3 my-2 justify-center opacity-50">
                                <div className="h-px w-6 sm:w-8 md:w-16 bg-white/20" />
                                <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-500" />
                                <div className="h-px w-6 sm:w-8 md:w-16 bg-white/20" />
                            </div>
                            <p className="text-[10px] sm:text-xs md:text-sm text-emerald-500 font-bold tracking-widest uppercase">SWITCH & SAVE</p>
                        </div>

                        <div className="text-center sm:text-right w-full sm:w-auto">
                            <p className="text-xs sm:text-base text-emerald-400 mb-2 font-medium">WhyCreatives</p>
                            <p className="text-3xl sm:text-4xl md:text-6xl font-black text-white shadow-emerald-glow">
                                {newPrice}
                            </p>
                            <p className="text-xs sm:text-sm text-neutral-400 mt-2 font-medium">{newPriceLabel}</p>
                        </div>
                    </motion.div>

                    {/* Divider */}
                    <motion.div
                        variants={itemVariants}
                        className="border-t border-dashed border-white/10 my-4 sm:my-6 md:my-8"
                    />

                    {/* Additional Details */}
                    <motion.div
                        variants={itemVariants}
                        className="flex justify-between text-center"
                    >
                        <InfoItem label="Quality" value={quality} />
                        <InfoItem label="Turnaround" value={duration} />
                        <InfoItem label="Guarantee" value="100% Satisfaction" />
                    </motion.div>
                </div>
            </motion.div>
        );
    }
);

ServicePricingCard.displayName = "ServicePricingCard";

const InfoItem = ({ label, value }: { label: string; value: string }) => (
    <div className="flex flex-col items-center px-2 sm:px-4">
        <span className="text-[10px] sm:text-xs md:text-sm text-neutral-500 uppercase tracking-wider mb-1 sm:mb-2 font-semibold">{label}</span>
        <span className="font-bold text-white text-xs sm:text-base md:text-lg text-center">{value}</span>
    </div>
);
