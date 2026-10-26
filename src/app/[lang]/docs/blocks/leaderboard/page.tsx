import { Leaderboard } from "@/components/blocks/leaderboard";
import { enter, type LangProps, link } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Block } from "../../_components/block";
import { DocHeader, DocSection, Prose } from "../../_components/doc";
import { Install } from "../../_components/install";

export const generateMetadata = metadataFor("/docs/blocks/leaderboard");

export default async function LeaderboardPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/blocks/leaderboard")} />
      <DocHeader
        title="Leaderboard"
        lead="A leaderboard for React: a tab per period, the top three ranked by tier, and your own row lit and kept at the bottom."
      />
      <DocSection id="install">
        <Install item="leaderboard" />
      </DocSection>
      <DocSection id="preview">
        <Block name="leaderboard">
          <Leaderboard />
        </Block>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          <p>
            The first three ranks wear the legendary, epic and rare colours.
            Your own row is lit with the selection edge and marked for screen
            readers; when you are far from the top it is kept at the bottom,
            under a gap.
          </p>
          <p>
            The runs column folds away on a phone. The names and numbers are
            made up: feed your own.
          </p>
          <p>
            Built from <a href={link("/docs/table")}>Table</a>,{" "}
            <a href={link("/docs/tabs")}>Tabs</a>,{" "}
            <a href={link("/docs/avatar")}>Avatar</a>,{" "}
            <a href={link("/docs/badge")}>Badge</a>. It installs those with it.
          </p>
        </Prose>
      </DocSection>
    </>
  );
}
