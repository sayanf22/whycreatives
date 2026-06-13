"use client";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Pause, Play } from "lucide-react";

type PropType = {
  slides: React.ReactNode[];
  options?: EmblaOptionsType;
};

const Carousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const progressNode = useRef<HTMLDivElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 3000 }),
  ]);

  const { autoplayIsPlaying, toggleAutoplay, onAutoplayButtonClick } =
    useAutoplay(emblaApi);

  const { showAutoplayProgress } = useAutoplayProgress(
    emblaApi,
    progressNode as React.RefObject<HTMLElement>
  );

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom">
          {slides.map((slideContent, index) => (
            <div className="flex-[0_0_100%] md:flex-[0_0_85%] px-3 transform-gpu" key={index}>
              {slideContent}
            </div>
          ))}
        </div>
      </div>

      <div className="flex mx-auto w-full max-w-sm justify-between items-center gap-4 mt-7 px-4">
        <div className="flex justify-center gap-2 shrink-0">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() =>
                onAutoplayButtonClick(() => onDotButtonClick(index))
              }
              className={`w-3 h-3 rounded-full border border-neutral-300 dark:border-neutral-700 transition-all duration-200 shrink-0 ${
                index === selectedIndex
                  ? "bg-neutral-900 dark:bg-neutral-100 scale-110"
                  : "bg-transparent hover:bg-neutral-200 dark:hover:bg-neutral-800"
              }`}
            />
          ))}
        </div>

        <div
          className={`rounded-full bg-neutral-200/60 dark:bg-neutral-800 relative h-1.5 w-24 overflow-hidden transition-opacity duration-300 ease-in-out shrink-0 ${
            showAutoplayProgress ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="bg-neutral-800 dark:bg-neutral-100 absolute w-full top-0 bottom-0 -left-full animate-[autoplay-progress_linear_1] [animation-play-state:running]"
            ref={progressNode}
            style={{
              animationPlayState: showAutoplayProgress ? "running" : "paused",
            }}
          />
        </div>

        <button
          onClick={toggleAutoplay}
          type="button"
          className="w-10 h-10 rounded-full flex items-center justify-center bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-50 transition-all shadow-sm hover:shadow active:scale-95 shrink-0 border border-neutral-200/50 dark:border-neutral-700/50"
        >
          {autoplayIsPlaying ? (
            <Pause className="w-4 h-4 fill-current text-current" />
          ) : (
            <Play className="w-4 h-4 fill-current text-current ml-0.5" />
          )}
        </button>
      </div>
    </div>
  );
};

type UseDotButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
};

export const useDotButton = (
  emblaApi: EmblaCarouselType | undefined
): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};

type PropTypeButton = React.PropsWithChildren<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
>;

export const DotButton: React.FC<PropTypeButton> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button type="button" {...restProps}>
      {children}
    </button>
  );
};

type UseAutoplayProgressType = {
  showAutoplayProgress: boolean;
};

export const useAutoplayProgress = <ProgressElement extends HTMLElement>(
  emblaApi: EmblaCarouselType | undefined,
  progressNode: React.RefObject<ProgressElement>
): UseAutoplayProgressType => {
  const [showAutoplayProgress, setShowAutoplayProgress] = useState(false);
  const animationName = useRef("");
  const timeoutId = useRef(0);
  const rafId = useRef(0);

  const startProgress = useCallback((timeUntilNext: number | null) => {
    const node = progressNode.current;
    if (!node) return;
    if (timeUntilNext === null) return;

    if (!animationName.current) {
      const style = window.getComputedStyle(node);
      animationName.current = style.animationName;
    }

    node.style.animationName = "none";
    node.style.transform = "translate3d(0,0,0)";

    rafId.current = window.requestAnimationFrame(() => {
      timeoutId.current = window.setTimeout(() => {
        node.style.animationName = animationName.current;
        node.style.animationDuration = `${timeUntilNext}ms`;
      }, 0);
    });

    setShowAutoplayProgress(true);
  }, []);

  useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    emblaApi
      .on("autoplay:timerset", () => startProgress(autoplay.timeUntilNext()))
      .on("autoplay:timerstopped", () => setShowAutoplayProgress(false));
  }, [emblaApi]);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafId.current);
      clearTimeout(timeoutId.current);
    };
  }, []);

  return {
    showAutoplayProgress,
  };
};

type UseAutoplayType = {
  autoplayIsPlaying: boolean;
  toggleAutoplay: () => void;
  onAutoplayButtonClick: (callback: () => void) => void;
};

export const useAutoplay = (
  emblaApi: EmblaCarouselType | undefined
): UseAutoplayType => {
  const [autoplayIsPlaying, setAutoplayIsPlaying] = useState(false);

  const onAutoplayButtonClick = useCallback(
    (callback: () => void) => {
      const autoplay = emblaApi?.plugins()?.autoplay;
      if (!autoplay) return;

      const resetOrStop =
        autoplay.options.stopOnInteraction === false
          ? autoplay.reset
          : autoplay.stop;

      resetOrStop();
      callback();
    },
    [emblaApi]
  );

  const toggleAutoplay = useCallback(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const playOrStop = autoplay.isPlaying() ? autoplay.stop : autoplay.play;
    playOrStop();
  }, [emblaApi]);

  useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    setAutoplayIsPlaying(autoplay.isPlaying());
    emblaApi
      .on("autoplay:play", () => setAutoplayIsPlaying(true))
      .on("autoplay:stop", () => setAutoplayIsPlaying(false))
      .on("reInit", () => setAutoplayIsPlaying(autoplay.isPlaying()));
  }, [emblaApi]);

  return {
    autoplayIsPlaying,
    toggleAutoplay,
    onAutoplayButtonClick,
  };
};

export { Carousel };
