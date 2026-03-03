"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
}

interface InternalCardProps extends DisplayCardProps {
  isExpanded?: boolean;
  onClick?: () => void;
}

function DisplayCard({
  className,
  icon = <Sparkles className="size-4 text-blue-300" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  iconClassName = "text-blue-500",
  titleClassName = "text-blue-500",
  isExpanded = false,
  onClick,
}: InternalCardProps) {
  return (
    <div
      className={cn(
        "relative flex select-none flex-col justify-between rounded-xl border-2 cursor-pointer overflow-hidden",
        /* Background: solid on mobile, glassmorphic on desktop */
        "bg-card sm:bg-muted/70 sm:backdrop-blur-sm",
        /* Height: SAME across breakpoints — don't increase */
        "h-32 sm:h-36",
        /* Width: wider at every breakpoint, fills viewport properly */
        "w-[19rem] sm:w-[21rem] md:w-[22rem]",
        /* Padding */
        "px-4 py-2.5 sm:py-3",
        /* Skew — straightens when expanded */
        isExpanded ? "skew-y-0" : "-skew-y-[8deg]",
        /* Right-fade gradient — HIDDEN on mobile, visible on sm+ */
        "sm:after:absolute sm:after:-right-1 sm:after:top-[-5%] sm:after:h-[110%] sm:after:w-[16rem] md:after:w-[20rem] sm:after:bg-gradient-to-l sm:after:from-background sm:after:to-transparent sm:after:content-['']",
        /* Border */
        "border-border",
        /* Hover */
        "hover:border-white/20 hover:bg-muted",
        /* Row layout for children */
        "[&>*]:flex [&>*]:items-center [&>*]:gap-2",
        /* Smooth spring animation */
        "transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
        /* Expanded: slide up, straighten, scale, bring to front */
        isExpanded && "!-translate-y-[160px] !translate-x-0 scale-105 shadow-2xl z-50 !border-primary/40",
        className
      )}
      onClick={onClick}
    >
      <div>
        <span className="relative inline-block rounded-full bg-foreground/10 p-1">
          {icon}
        </span>
        <p className={cn("text-base sm:text-lg font-medium leading-tight", titleClassName)}>
          {title}
        </p>
      </div>
      <p className="text-sm sm:text-base sm:whitespace-nowrap text-foreground/80 leading-snug line-clamp-2">
        {description}
      </p>
      <p className="text-xs sm:text-sm text-muted-foreground">{date}</p>
    </div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const defaultCards: DisplayCardProps[] = [
    {
      className:
        "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      className:
        "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      className:
        "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
    },
  ];

  const displayCards = cards || defaultCards;

  const handleCardClick = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
      {displayCards.map((cardProps, index) => (
        <DisplayCard
          key={index}
          {...cardProps}
          isExpanded={expandedIndex === index}
          onClick={() => handleCardClick(index)}
        />
      ))}
    </div>
  );
}
