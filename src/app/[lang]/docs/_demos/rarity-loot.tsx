import { Badge } from "@/components/zero/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/zero/card";
import { LockIcon } from "@/components/zero/icons";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/zero/item";

const loot = [
  { name: "Rail pass", line: "One ride across the yards.", rarity: "common" },
  { name: "Canal key", line: "Opens the lock at Tower 9.", rarity: "uncommon" },
  {
    name: "Night permit",
    line: "Work past 22:00 without a fine.",
    rarity: "rare",
  },
  { name: "Sealed crate", line: "Do not open it.", rarity: "epic" },
  {
    name: "North gate seal",
    line: "Signs any job, anywhere.",
    rarity: "legendary",
  },
] as const;

export default function RarityLoot() {
  return (
    <div className="grid w-full max-w-3xl gap-6 md:grid-cols-[minmax(0,1fr)_16rem]">
      <ItemGroup className="gap-1">
        {loot.map(({ name, line, rarity }) => (
          <Item key={name} variant="muted" size="sm" rarity={rarity}>
            <ItemMedia variant="icon">
              <LockIcon />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{name}</ItemTitle>
              <ItemDescription>{line}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Badge rarity={rarity}>{rarity}</Badge>
            </ItemActions>
          </Item>
        ))}
      </ItemGroup>
      <Card rarity="legendary" className="self-start">
        <CardHeader>
          <CardTitle>North gate seal</CardTitle>
          <CardDescription>Found in the rail yards</CardDescription>
          <CardAction>
            <Badge rarity="legendary">Legendary</Badge>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p className="text-zero-text-2">
            Signs any job, anywhere. Only one is known.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
