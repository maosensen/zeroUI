import { Button } from "@/components/zero/button";
import { ButtonGroup, ButtonGroupText } from "@/components/zero/button-group";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/zero/icons";

export default function ButtonGroupActions() {
  return (
    <div className="grid justify-items-start gap-4">
      <ButtonGroup>
        <Button>Take it</Button>
        <Button variant="secondary">Save</Button>
        <Button variant="secondary">Share</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="secondary" aria-label="Previous job">
          <ChevronLeftIcon />
        </Button>
        <ButtonGroupText>Job 3 of 12</ButtonGroupText>
        <Button variant="secondary" aria-label="Next job">
          <ChevronRightIcon />
        </Button>
      </ButtonGroup>
    </div>
  );
}
