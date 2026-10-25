import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/zero/carousel";

const crates = [
  ["Sealed crate", "Rail yards → North gate", "3,100 cr"],
  ["Cold box", "Harbor → Old market", "1,450 cr"],
  ["Long case", "Tower 9 → Canal docks", "2,275 cr"],
  ["Parcel run", "Old market → Harbor", "640 cr"],
] as const;

export default function CarouselCrates() {
  return (
    <div className="w-full max-w-xs px-14">
      <Carousel>
        <CarouselContent>
          {crates.map(([name, route, reward]) => (
            <CarouselItem key={name}>
              <div className="panel grid aspect-[4/3] content-end gap-1 p-5">
                <div className="font-black font-zero text-zero-xl italic">
                  {name}
                </div>
                <div className="font-medium font-zero-text text-zero-sm text-zero-text-2">
                  {route}
                </div>
                <div className="font-semibold font-zero-text text-zero-accent tabular-nums">
                  {reward}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <CarouselDots className="mt-4" />
      </Carousel>
    </div>
  );
}
