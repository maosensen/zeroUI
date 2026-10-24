"use client";

import { useState } from "react";
import {
  ClearIcon,
  EyeIcon,
  EyeOffIcon,
  SearchIcon,
} from "@/components/zero/icons";
import { Input, InputAction } from "@/components/zero/input";

export default function InputSlots() {
  const [query, setQuery] = useState("rail yards");
  const [shown, setShown] = useState(false);
  return (
    <div className="grid w-full max-w-xs gap-4">
      <Input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search the board"
        aria-label="Search the board"
        start={<SearchIcon />}
        end={
          query ? (
            <InputAction aria-label="Clear" onClick={() => setQuery("")}>
              <ClearIcon />
            </InputAction>
          ) : null
        }
      />
      <Input
        type={shown ? "text" : "password"}
        defaultValue="lantern-42"
        aria-label="Access key"
        end={
          <InputAction
            aria-label={shown ? "Hide the key" : "Show the key"}
            onClick={() => setShown((value) => !value)}
          >
            {shown ? <EyeOffIcon /> : <EyeIcon />}
          </InputAction>
        }
      />
    </div>
  );
}
