import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/zero/resizable";

function Pane({ name }: { name: string }) {
  return (
    <div className="flex size-full items-center justify-center font-bold font-zero text-zero-sm text-zero-text-3 italic">
      {name}
    </div>
  );
}

export default function ResizablePanes() {
  return (
    <div className="h-72 w-full max-w-xl border-(length:--zero-stroke-thin) border-zero-line bg-zero-void">
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel defaultSize="30%" minSize="20%">
          <Pane name="Jobs" />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>
          <ResizablePanelGroup orientation="vertical">
            <ResizablePanel defaultSize="60%">
              <Pane name="Map" />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel>
              <Pane name="Notes" />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
