"use client";

import { useState } from "react";
import { Button } from "@/components/zero/button";
import { CheckIcon } from "@/components/zero/icons";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
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
          Copied
        </>
      ) : (
        "Copy"
      )}
    </Button>
  );
}
