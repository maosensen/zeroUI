import { Button } from "@/components/zero/button";

export default function ButtonCuts() {
  return (
    <>
      <Button cut="end">End</Button>
      <Button cut="start">Start</Button>
      <Button cut="both">Both</Button>
      <Button cut="none">None</Button>
    </>
  );
}
