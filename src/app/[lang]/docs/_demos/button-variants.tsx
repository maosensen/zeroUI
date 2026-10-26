import { Button } from "@/components/zero/button";

export default function ButtonVariants() {
  return (
    <>
      <Button>Accept commission</Button>
      <Button variant="secondary">Save for later</Button>
      <Button variant="danger">Abandon</Button>
      <Button variant="ghost">Skip</Button>
    </>
  );
}
