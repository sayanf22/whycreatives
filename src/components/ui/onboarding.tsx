import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, AtSign, UserCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface OnboardingCardProps {
  heroImageSrc: string;
  title: string;
  subtitle: string;
  displayName: string;
  onDisplayNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUploadClick: () => void;
  onContinueClick: () => void;
  isLoading?: boolean;
  className?: string;
}

export const OnboardingCard = React.forwardRef<HTMLDivElement, OnboardingCardProps>(
  (
    {
      heroImageSrc,
      title,
      subtitle,
      displayName,
      onDisplayNameChange,
      onUploadClick,
      onContinueClick,
      isLoading = false,
      className,
    },
    ref
  ) => {
    const containerVariants = {
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        transition: {
          staggerChildren: 0.15,
        },
      },
      exit: { opacity: 0 },
    };

    const itemVariants = {
      initial: { opacity: 0, y: 20 },
      animate: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: "easeOut",
        },
      },
      exit: { opacity: 0, y: 20 },
    };

    return (
      <AnimatePresence>
        <motion.div
          ref={ref}
          className={cn(
            "w-full max-w-md overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-lg",
            className
          )}
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.img
            src={heroImageSrc}
            alt="Welcome Hero Image"
            className="h-48 w-full object-cover"
            variants={itemVariants}
          />
          <div className="flex flex-col space-y-6 p-6 sm:p-8">
            <motion.div variants={itemVariants} className="space-y-1.5 text-center">
              <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
              <p className="text-muted-foreground">{subtitle}</p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center justify-between space-x-4 rounded-lg border p-4"
            >
              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <UserCircle2 className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-semibold">Your Photo</p>
                  <p className="text-xs text-muted-foreground">PNG or JPEG, up to 5MB</p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={onUploadClick}>
                <Camera className="mr-2 h-4 w-4" />
                Upload
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="relative flex flex-col space-y-2">
              <label htmlFor="displayName" className="text-sm font-medium">
                Display Name
              </label>
              <AtSign className="absolute bottom-2.5 left-3 h-5 w-5 text-muted-foreground" />
              <Input
                id="displayName"
                type="text"
                placeholder="username"
                value={displayName}
                onChange={onDisplayNameChange}
                className="pl-10"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                className="w-full"
                size="lg"
                onClick={onContinueClick}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Continue"}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }
);

OnboardingCard.displayName = "OnboardingCard";
