"use client";

import { Button } from "@/components/zero/button";
import { ToastProvider, useToast } from "@/components/zero/toast";

function TakeJob() {
  const toast = useToast();
  return (
    <div className="flex flex-wrap gap-3">
      <Button
        onClick={() =>
          toast.add({
            type: "success",
            title: "Job taken",
            description: "Reach the north gate before 22:00.",
          })
        }
      >
        Take the job
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast.add({
            type: "warning",
            title: "Low on fuel",
            description: "Refuel before you take the next job.",
            actionProps: { children: "Find a pump" },
          })
        }
      >
        Check the tank
      </Button>
    </div>
  );
}

export default function ToastBasic() {
  return (
    <ToastProvider>
      <TakeJob />
    </ToastProvider>
  );
}
