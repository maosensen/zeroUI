import { JsonLd } from "@/lib/seo/json-ld";
import { exampleGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { SignalBoard } from "./_components/signal-board";

export const metadata = pageMetadata("/examples/signal-board");

export default function SignalBoardExample() {
  return (
    <>
      <JsonLd data={exampleGraph("/examples/signal-board")} />
      <SignalBoard />
    </>
  );
}
