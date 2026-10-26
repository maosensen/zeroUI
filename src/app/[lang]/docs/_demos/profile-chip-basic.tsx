"use client";

import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/zero/avatar";
import { Button } from "@/components/zero/button";
import { ProfileChip } from "@/components/zero/profile-chip";

export default function ProfileChipBasic() {
  const [xp, setXp] = useState(685);
  const [level, setLevel] = useState(8);
  const max = 790;
  return (
    <div className="grid justify-items-start gap-5">
      <ProfileChip
        name="Wren"
        level={level}
        xp={xp}
        xpMax={max}
        avatar={
          <Avatar size="sm">
            <AvatarFallback>WR</AvatarFallback>
          </Avatar>
        }
      />
      <Button
        size="sm"
        variant="secondary"
        onClick={() => {
          if (xp + 60 >= max) {
            setLevel((l) => l + 1);
            setXp(xp + 60 - max);
          } else setXp(xp + 60);
        }}
      >
        Deliver (+60 xp)
      </Button>
    </div>
  );
}
