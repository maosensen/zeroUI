import { AspectRatio } from "@/components/zero/aspect-ratio";

export default function AspectRatioMap() {
  return (
    <div className="w-full max-w-md">
      <AspectRatio
        ratio={16 / 9}
        className="border-(length:--zero-stroke) border-zero-ink"
      >
        {/* biome-ignore lint/performance/noImgElement: a small SVG sample, and the demo is copied into projects without next/image */}
        <img
          src="/samples/route-map.svg"
          alt="The route from the rail yards to the north gate"
        />
      </AspectRatio>
    </div>
  );
}
