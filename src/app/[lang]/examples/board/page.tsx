import { enter, type LangProps } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { exampleGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Board } from "./_components/board";

export const generateMetadata = metadataFor("/examples/board");

export default async function BoardExample({ params }: LangProps) {
  await enter(params);
  return (
    <div className="min-h-svh bg-zero-ground bg-(image:--zero-hatch) text-zero-text">
      <JsonLd data={exampleGraph("/examples/board")} />
      <Board />
    </div>
  );
}
