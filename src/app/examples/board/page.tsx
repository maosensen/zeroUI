import { JsonLd } from "@/lib/seo/json-ld";
import { exampleGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { Board } from "./_components/board";

export const metadata = pageMetadata("/examples/board");

export default function BoardExample() {
  return (
    <div className="min-h-svh bg-zero-ground bg-(image:--zero-hatch) text-zero-text">
      <JsonLd data={exampleGraph("/examples/board")} />
      <Board />
    </div>
  );
}
