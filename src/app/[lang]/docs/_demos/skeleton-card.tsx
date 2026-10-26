import { Skeleton, SkeletonText } from "@/components/zero/skeleton";

export default function SkeletonCard() {
  return (
    <div className="grid w-full max-w-md grid-cols-[5rem_1fr] gap-4">
      <Skeleton className="size-20" />
      <div className="grid content-start gap-4">
        <SkeletonText lines={2} />
        <Skeleton shape="slab" />
      </div>
    </div>
  );
}
