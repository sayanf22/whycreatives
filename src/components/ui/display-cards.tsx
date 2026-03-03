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
        "relative flex h-36 select-none flex-col justify-between rounded-xl border-2 bg-muted/70 backdrop-blur-sm px-4 py-3 cursor-pointer",
        /* Responsive width */
        "w-[15rem] sm:w-[18rem] md:w-[22rem]",
        /* Skew for stacked look */
        "-skew-y-[8deg]",
        /* Right-fade gradient overlay */
        "after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[12rem] sm:after:w-[16rem] md:after:w-[20rem] after:bg-gradient-to-l after:from-background after:to-transparent after:content-['']",
        /* Hover & interaction */
        "hover:border-white/20 hover:bg-muted",
        /* Row layout for children */
        "[&>*]:flex [&>*]:items-center [&>*]:gap-2",
        /* Smooth transition */
        "transition-all duration-500 ease-out",
        /* Expanded state: stronger shadow */
        isExpanded && "shadow-2xl z-50 !-skew-y-0 !border-primary/30",
        className
      )}
      style={
        isExpanded
          ? {
            transform: "translateX(0px) translateY(-140px) skewY(0deg) scale(1.05)",
            zIndex: 50,
          }
          : undefined
      }
      onClick={onClick}
    >
      <div>
        <span
          className={cn(
            "relative inline-block rounded-full p-1",
            iconClassName ? "" : "bg-blue-800"
          )}
          style={
            !iconClassName
              ? undefined
              : undefined
          }
        >
          {icon}
        </span>
        <p className={cn("text-lg font-medium", titleClassName)}>{title}</p>
      </div>
      <p className="whitespace-nowrap text-lg">{description}</p>
      <p className="text-muted-foreground">{date}</p>
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
