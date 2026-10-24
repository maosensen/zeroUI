import { Button } from "@/components/zero/button";
import { ArrowRightIcon, LockIcon } from "@/components/zero/icons";

export default function ButtonIcon() {
  return (
    <>
      <Button variant="secondary">
        Next job
        <ArrowRightIcon />
      </Button>
      <Button disabled>
        <LockIcon />
        Locked
      </Button>
    </>
  );
}
