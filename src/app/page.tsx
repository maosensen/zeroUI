import Link from "next/link";
import { Button } from "@/components/zero/button";
import { ArrowRightIcon } from "@/components/zero/icons";

// A placeholder until the showcase (phase 2): the wordmark, what the library is, the way in.
export default function Home() {
  return (
    <main className="grid flex-1 place-content-center justify-items-start gap-6 bg-zero-ground bg-(image:--zero-hatch) px-6">
      <h1 className="rotate-(--zero-tilt) font-black text-zero-3xl italic">
        zero<span className="text-zero-accent">UI</span>
      </h1>
      <p className="max-w-md font-semibold text-zero-md text-zero-text-2">
        A dark-only component library on shadcn and Base UI. Slabs cut on the
        slant, thick outlines, one fluorescent accent.
      </p>
      <Button size="lg" nativeButton={false} render={<Link href="/docs" />}>
        Read the docs
        <ArrowRightIcon />
      </Button>
    </main>
  );
}
