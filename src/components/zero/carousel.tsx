"use client";

import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import {
  type ComponentProps,
  createContext,
  type KeyboardEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Button } from "@/components/zero/button";
import { ChevronLeftIcon } from "@/components/zero/icons/chevron-left";
import { ChevronRightIcon } from "@/components/zero/icons/chevron-right";
import { cn } from "@/lib/zero/cn";

/*
 * Slides that move one after another (Embla underneath): dragged, swiped, or stepped with the
 * arrow keys and the two raised slab buttons beside it. CarouselDots is a row of slanted pips, one
 * per slide, the current one in the accent; each pip goes to its slide.
 */

type CarouselApi = UseEmblaCarouselType[1];
type CarouselOptions = Parameters<typeof useEmblaCarousel>[0];
type CarouselPlugin = Parameters<typeof useEmblaCarousel>[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextValue = {
  carouselRef: UseEmblaCarouselType[0];
  api: CarouselApi;
  orientation: "horizontal" | "vertical";
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  selected: number;
  count: number;
};

const CarouselContext = createContext<CarouselContextValue | null>(null);

function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) throw new Error("useCarousel must be used within a Carousel.");
  return context;
}

function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: ComponentProps<"div"> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    { ...opts, axis: orientation === "horizontal" ? "x" : "y" },
    plugins,
  );
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selected, setSelected] = useState(0);
  const [count, setCount] = useState(0);

  const onSelect = useCallback((current: CarouselApi) => {
    if (!current) return;
    setCanScrollPrev(current.canScrollPrev());
    setCanScrollNext(current.canScrollNext());
    setSelected(current.selectedScrollSnap());
    setCount(current.scrollSnapList().length);
  }, []);

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const back = orientation === "horizontal" ? "ArrowLeft" : "ArrowUp";
      const on = orientation === "horizontal" ? "ArrowRight" : "ArrowDown";
      if (event.key === back) {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === on) {
        event.preventDefault();
        scrollNext();
      }
    },
    [orientation, scrollPrev, scrollNext],
  );

  useEffect(() => {
    if (api && setApi) setApi(api);
  }, [api, setApi]);

  useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);
    return () => {
      api.off("reInit", onSelect);
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        orientation,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
        selected,
        count,
      }}
    >
      {/* biome-ignore lint/a11y/useSemanticElements: the ARIA carousel pattern: a region described as a carousel */}
      <div
        role="region"
        onKeyDownCapture={onKeyDown}
        aria-roledescription="carousel"
        data-slot="carousel"
        className={cn("relative", className)}
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

function CarouselContent({ className, ...props }: ComponentProps<"div">) {
  const { carouselRef, orientation } = useCarousel();
  return (
    <div
      ref={carouselRef}
      data-slot="carousel-content"
      className="overflow-hidden"
    >
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ms-4" : "-mt-4 flex-col",
          className,
        )}
        {...props}
      />
    </div>
  );
}

function CarouselItem({ className, ...props }: ComponentProps<"div">) {
  const { orientation } = useCarousel();
  return (
    // biome-ignore lint/a11y/useSemanticElements: the ARIA carousel pattern names each slide a group
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "ps-4" : "pt-4",
        className,
      )}
      {...props}
    />
  );
}

const step = cn(
  "absolute [--slab-px:0.375rem]",
  "w-[calc(var(--height-zero-sm)*(1+tan(var(--zero-slant))))]",
);

function CarouselPrevious({
  className,
  variant = "secondary",
  ...props
}: ComponentProps<typeof Button>) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();
  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size="sm"
      cut="both"
      aria-label="Previous slide"
      className={cn(
        step,
        orientation === "horizontal"
          ? "inset-y-0 -left-14 my-auto"
          : "-top-12 left-1/2 -translate-x-1/2 [&_svg]:rotate-90",
        className,
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ChevronLeftIcon />
    </Button>
  );
}

function CarouselNext({
  className,
  variant = "secondary",
  ...props
}: ComponentProps<typeof Button>) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();
  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size="sm"
      cut="both"
      aria-label="Next slide"
      className={cn(
        step,
        orientation === "horizontal"
          ? "inset-y-0 -right-14 my-auto"
          : "-bottom-12 left-1/2 -translate-x-1/2 [&_svg]:rotate-90",
        className,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ChevronRightIcon />
    </Button>
  );
}

/** One slanted pip per slide, the current one in the accent; each goes to its slide. */
function CarouselDots({ className, ...props }: ComponentProps<"div">) {
  const { api, selected, count } = useCarousel();
  return (
    <div
      data-slot="carousel-dots"
      className={cn("flex items-center justify-center gap-1.5", className)}
      {...props}
    >
      {Array.from({ length: count }, (_, index) => (
        <button
          // biome-ignore lint/suspicious/noArrayIndexKey: one pip per slide, in order
          key={index}
          type="button"
          aria-label={`Slide ${index + 1} of ${count}`}
          aria-current={index === selected ? "true" : undefined}
          onClick={() => api?.scrollTo(index)}
          className={cn(
            "h-2 w-5 -skew-x-(--zero-slant) bg-zero-line outline-none",
            "transition-[background-color,width] duration-(--zero-dur-base) ease-(--zero-ease-out)",
            "hover:bg-zero-text-3 aria-current:w-8 aria-current:bg-zero-accent",
            "focus-visible:outline-solid focus-visible:outline-(length:--zero-stroke-thin) focus-visible:outline-zero-focus focus-visible:outline-offset-2",
          )}
        />
      ))}
    </div>
  );
}

export {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
};
