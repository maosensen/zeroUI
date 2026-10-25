import { Badge } from "@/components/zero/badge";
import { Button } from "@/components/zero/button";
import { ChevronRightIcon, LockIcon } from "@/components/zero/icons";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/zero/item";

export default function ItemDrivers() {
  return (
    <div className="grid w-full max-w-md gap-4">
      <Item variant="outline">
        <ItemMedia variant="image">
          {/* biome-ignore lint/performance/noImgElement: a small SVG sample, and the demo is copied into projects without next/image */}
          <img src="/samples/portrait-a.svg" alt="" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>
            Mara K. <Badge>Rush</Badge>
          </ItemTitle>
          <ItemDescription>Rail yards · 41 jobs this month</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm" variant="secondary">
            Assign
          </Button>
        </ItemActions>
      </Item>
      <ItemGroup>
        <Item render={(props) => <a href="#locked" {...props} />}>
          <ItemMedia variant="icon">
            <LockIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Locked jobs</ItemTitle>
            <ItemDescription>Open once you reach rank 3.</ItemDescription>
          </ItemContent>
          <ChevronRightIcon className="text-zero-text-3" />
        </Item>
        <ItemSeparator />
        <Item render={(props) => <a href="#history" {...props} />}>
          <ItemContent>
            <ItemTitle>History</ItemTitle>
            <ItemDescription>Every job you handed in.</ItemDescription>
          </ItemContent>
          <ChevronRightIcon className="text-zero-text-3" />
        </Item>
      </ItemGroup>
    </div>
  );
}
