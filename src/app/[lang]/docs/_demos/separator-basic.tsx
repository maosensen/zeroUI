import { Separator } from "@/components/zero/separator";

export default function SeparatorBasic() {
  return (
    <div className="grid w-full max-w-sm gap-4 font-medium font-zero-text text-zero-sm">
      <div>
        <div className="font-black font-zero text-zero-md italic">
          Sealed crate
        </div>
        <div className="text-zero-text-2">Rail yards → North gate</div>
      </div>
      <Separator />
      <div className="flex h-5 items-center gap-4 text-zero-text-2">
        <span>3,100 cr</span>
        <Separator orientation="vertical" />
        <span>Rush</span>
        <Separator orientation="vertical" />
        <span>East district</span>
      </div>
    </div>
  );
}
