import { enter, type LangProps } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { exampleGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { OpsConsole } from "./_components/ops-console";

export const generateMetadata = metadataFor("/examples/ops-console");

export default async function OpsConsoleExample({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={exampleGraph("/examples/ops-console")} />
      <OpsConsole />
    </>
  );
}
