import { SearchIcon } from "@/components/zero/icons";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/zero/input-group";
import { Kbd } from "@/components/zero/kbd";

export default function InputGroupReward() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>cr</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput
          placeholder="Minimum reward"
          aria-label="Minimum reward"
          inputMode="numeric"
        />
        <InputGroupAddon align="end">
          <InputGroupButton>Max</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search jobs" aria-label="Search jobs" />
        <InputGroupAddon align="end">
          <Kbd>/</Kbd>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
