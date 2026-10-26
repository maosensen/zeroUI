import { Button } from "@/components/zero/button";
import { Spinner } from "@/components/zero/spinner";

export default function SpinnerBasic() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Spinner className="size-6 text-zero-accent" />
      <span className="flex items-center gap-2 font-medium font-zero-text text-zero-sm text-zero-text-2">
        <Spinner aria-label="Finding a driver" />
        Finding a driver
      </span>
      <Button disabled>
        <Spinner aria-hidden />
        Taking the job
      </Button>
    </div>
  );
}
