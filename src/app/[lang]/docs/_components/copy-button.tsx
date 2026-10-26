"use client";

import { useState } from "react";
import { Button } from "@/components/zero/button";
import { CheckIcon } from "@/components/zero/icons";
import { usePick } from "@/lib/i18n/client";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const { pick } = usePick();
  return (
    <Button
      variant="ghost"
      size="sm"
      cut="both"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      }}
    >
      {copied ? (
        <>
          <CheckIcon className="text-zero-accent" />
          {pick({ en: "Copied", zh: "已复制" })}
        </>
      ) : (
        pick({ en: "Copy", zh: "复制" })
      )}
    </Button>
  );
}
