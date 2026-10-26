import { JsonLd } from "@/lib/seo/json-ld";
import { exampleGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { OpsConsole } from "./_components/ops-console";

export const metadata = pageMetadata("/examples/ops-console");

export default function OpsConsoleExample() {
  return (
    <>
      <JsonLd data={exampleGraph("/examples/ops-console")} />
      <OpsConsole />
    </>
  );
}
