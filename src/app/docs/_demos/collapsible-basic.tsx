import { Button } from "@/components/zero/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/zero/collapsible";
import { ChevronDownIcon } from "@/components/zero/icons";

export default function CollapsibleBasic() {
  return (
    <Collapsible className="grid w-full max-w-sm gap-3">
      <CollapsibleTrigger
        render={
          <Button
            variant="secondary"
            className="justify-self-start data-panel-open:[&_svg]:rotate-180 [&_svg]:transition-transform [&_svg]:duration-(--zero-dur-base)"
          />
        }
      >
        Route notes
        <ChevronDownIcon />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ul className="grid gap-2 font-medium font-zero-text text-zero-sm text-zero-text-2">
          <li>Gate 4 is closed after 21:00.</li>
          <li>Keep to the east side of the yards.</li>
          <li>Sign for the crate at the north gate.</li>
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}
