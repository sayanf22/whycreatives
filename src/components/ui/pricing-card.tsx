import * as React from "react";
import { motion } from "framer-motion";
import { TrendingDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PricingCardProps {
    imageUrl: string;
    service: string;
    category: string;
    ourPrice: string;
    othersPrice: string;
    savings: string;
    savingsPercent: string;
    features: string[];
    className?: string;
    index?: number;
}

export const PricingCard = React.forwardRef<HTMLDivElement, PricingCardProps>(
    (
        {
            imageUrl,
            service,
            category,
            ourPrice,
            othersPrice,
            savings,
            savingsPercent,
            features,
            className,
            index = 0,
        },
        ref
    ) => {
        const cardVariants = {
            hidden: { opacity: 0, y: 50 },
            visible: {
                opacity: 1,
                y: 0,
                transition: {
                    duration: 0.6,
                    delay: index * 0.15,
                    when: "beforeChildren" as const,
                    staggerChildren: 0.05,
                },
            },
        };

        const itemVariants = {
            hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
            visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: {
                    duration: 0.8,
                    ease: [0.25, 0.4, 0.25, 1] as any
                }
            },
        };

        return (
            <motion.div
                ref={ref}
                className={cn(
                    "w-full font-sans rounded-[2rem] overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.6)] hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.9)] bg-gradient-to-br from-zinc-900/80 via-zinc-900/60 to-zinc-900/80 border-2 border-zinc-600/60 hover:border-zinc-500/80 transition-all duration-500 backdrop-blur-md",
                    className
                )}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{
                    scale: 1.06,
                    y: -20,
                    transition: { duration: 0.2, ease: [0.34, 1.56, 0.64, 1] },
                }}
                style={{
                    transformStyle: "preserve-3d",
                    perspective: "1000px",
                    willChange: "transform",
                }}
            >
                {/* Service Image */}
                <div className="relative h-48">
                    <img
                        src={imageUrl}
                        alt={service}
                        className="w-full h-full object-cover grayscale opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
                </div>

                {/* Pricing Details Container */}
                <div className="p-6 pt-4">
                    {/* Service Category */}
                    <motion.div variants={itemVariants} className="mb-4">
                        <p className="text-xs text-zinc-400 uppercase tracking-wider">{category}</p>
                        <h3 className="text-2xl font-bold text-white mt-1">{service}</h3>
                    </motion.div>

                    {/* Main Pricing Comparison */}
                    <motion.div
                        variants={itemVariants}
                        className="flex items-center justify-between mb-6"
                    >
                        <div className="text-left">
                            <p className="text-xs text-zinc-400 mb-1">WhyCreatives</p>
                            <p className="text-4xl font-black text-white">{ourPrice}</p>
                        </div>

                        <div className="text-center px-4">
                            <div className="flex items-center gap-2">
                                <div className="h-px w-12 bg-zinc-700" />
                                <TrendingDown className="h-5 w-5 text-emerald-400" />
                                <div className="h-px w-12 bg-zinc-700" />
                            </div>
                        </div>

                        <div className="text-right">
                            <p className="text-xs text-zinc-400 mb-1">Others</p>
                            <p className="text-2xl font-bold text-zinc-600 line-through">{othersPrice}</p>
                        </div>
                    </motion.div>

                    {/* Savings Highlight - PROMINENT */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-gradient-to-r from-zinc-900/25 to-emerald-800/30 border border-emerald-600/50 rounded-xl p-4 mb-6"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-emerald-400 font-medium">You Save</p>
                                <p className="text-2xl font-black text-emerald-400">{savings}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-3xl font-black text-emerald-400">{savingsPercent}</p>
                                <p className="text-xs text-emerald-400/80">Less Cost</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Divider */}
                    <motion.div
                        variants={itemVariants}
                        className="border-t border-dashed border-zinc-800 my-5"
                    />

                    {/* Features */}
                    <motion.div variants={itemVariants} className="space-y-2 mb-6">
                        {features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-zinc-300">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                {feature}
                            </div>
                        ))}
                    </motion.div>

                    {/* CTA Button */}
                    <motion.a
                        variants={itemVariants}
                        href="/contact"
                        className="flex items-center justify-center gap-2 w-full bg-white text-black font-bold py-3 px-6 rounded-xl hover:bg-zinc-200 transition-colors group"
                    >
                        Get Started
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </motion.a>
                </div>
            </motion.div>
        );
    }
);

PricingCard.displayName = "PricingCard";
