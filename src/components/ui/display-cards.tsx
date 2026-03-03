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
  variant?: "silver" | "dark";
}

interface InternalDisplayCardProps extends DisplayCardProps {
  isExpanded?: boolean;
  onClick?: () => void;
}

function DisplayCard({
  className,
  icon = <Sparkles className="size-4" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  iconClassName = "",
  titleClassName = "",
  variant = "silver",
  isExpanded = false,
  onClick,
}: InternalDisplayCardProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={cn(
        "relative flex select-none flex-col justify-between rounded-2xl overflow-hidden cursor-pointer",
        /* Size: landscape proportion, wider than tall */
        "w-[15rem] h-[7.5rem] sm:w-[18rem] sm:h-[9rem] md:w-[22rem] md:h-[10rem]",
        /* Padding */
        "px-4 sm:px-5 py-3 sm:py-4",
        /* Shadow — stronger when expanded */
        isExpanded ? "shadow-2xl" : "shadow-lg",
        /* Smooth transition for transform */
        "transition-all duration-500 ease-out",
        className
      )}
      style={{
        ...(isDark
          ? {
            background:
              "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)",
          }
          : {
            background:
              "linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 25%, #d4d4d4 50%, #e0e0e0 75%, #f0f0f0 100%)",
            borderTop: "1px solid rgba(255,255,255,0.8)",
            borderLeft: "1px solid rgba(255,255,255,0.6)",
          }),
        /* When expanded: lift card high above the stack */
        ...(isExpanded
          ? {
            transform: "translateX(0px) translateY(-160px) scale(1.08)",
            zIndex: 50,
          }
          : {}),
      }}
      onClick={onClick}
    >
      {/* Row 1: Icon + Title */}
      <div className="flex items-center gap-2.5">
        <span
          className={cn(
            "inline-flex items-center justify-center rounded-full p-2 flex-shrink-0",
            isDark ? "bg-white/15" : "bg-black/10"
          )}
        >
          <span className={isDark ? "text-white" : "text-neutral-700"}>
            {icon}
          </span>
        </span>
        <p
          className={cn(
            "text-base sm:text-lg font-bold leading-tight",
            isDark ? "text-white" : "text-neutral-800",
            titleClassName
          )}
        >
          {title}
        </p>
      </div>

      {/* Row 2: Description */}
      <p
        className={cn(
          "text-xs sm:text-sm font-medium leading-snug line-clamp-2",
          isDark ? "text-neutral-300" : "text-neutral-500"
        )}
      >
        {description}
      </p>

      {/* Row 3: Date */}
      <p
        className={cn(
          "text-[10px] sm:text-xs font-medium",
          isDark ? "text-neutral-400" : "text-neutral-400"
        )}
      >
        {date}
      </p>
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
        "[grid-area:stack] md:hover:-translate-y-10 transition-all duration-700",
    },
    {
      className:
        "[grid-area:stack] md:translate-x-16 md:translate-y-10 md:hover:-translate-y-1 transition-all duration-700",
    },
    {
      className:
        "[grid-area:stack] md:translate-x-32 md:translate-y-20 md:hover:translate-y-10 transition-all duration-700",
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
