import { Button } from "@/components/zero/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/zero/empty";
import { SearchIcon } from "@/components/zero/icons";

export default function EmptyBoard() {
  return (
    <Empty className="border-(length:--zero-stroke-thin) border-zero-line border-dashed">
      <EmptyHeader>
        <EmptyMedia>
          <SearchIcon />
        </EmptyMedia>
        <EmptyTitle>No jobs in this district</EmptyTitle>
        <EmptyDescription>
          The dispatcher posts new jobs at the top of every hour.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>Show every district</Button>
        <Button variant="ghost">Clear the filters</Button>
      </EmptyContent>
    </Empty>
  );
}
