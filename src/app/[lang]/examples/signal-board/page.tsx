import { enter, type LangProps } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { exampleGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { SignalBoard } from "./_components/signal-board";

export const generateMetadata = metadataFor("/examples/signal-board");

export default async function SignalBoardExample({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={exampleGraph("/examples/signal-board")} />
      <SignalBoard />
    </>
  );
}
