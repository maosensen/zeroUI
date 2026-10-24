"use client";

import { type ReactNode, useState } from "react";
import { Checkbox } from "@/components/zero/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/zero/radio-group";
import { Slider } from "@/components/zero/slider";
import { Switch } from "@/components/zero/switch";
import { Textarea } from "@/components/zero/textarea";

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[7rem_1fr] items-center gap-6 border-zero-line border-t-2 py-5">
      <span className="font-bold font-zero text-zero-sm text-zero-text-2 italic">
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-6">{children}</div>
    </div>
  );
}

function Labelled({
  children,
  text,
  size = "text-zero-md",
}: {
  children: ReactNode;
  text: string;
  size?: string;
}) {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: the control is the child
    <label
      className={`flex items-center gap-2.5 font-medium font-zero-text ${size}`}
    >
      {children}
      {text}
    </label>
  );
}

/** The form family in every state: checkbox, switch, radio, textarea, slider. */
export function FormsSection() {
  const [range, setRange] = useState<number[]>([20, 70]);
  return (
    <section className="grid gap-2">
      <h2 className="font-black text-zero-xl italic">Forms</h2>
      <div>
        <Row label="checkbox">
          <Labelled text="Unchecked">
            <Checkbox />
          </Labelled>
          <Labelled text="Checked">
            <Checkbox defaultChecked />
          </Labelled>
          <Labelled text="Indeterminate">
            <Checkbox indeterminate />
          </Labelled>
          <Labelled text="Invalid">
            <Checkbox aria-invalid />
          </Labelled>
          <Labelled text="Disabled">
            <Checkbox disabled defaultChecked />
          </Labelled>
        </Row>
        <Row label="sizes">
          <Labelled text="Small" size="text-zero-sm">
            <Checkbox defaultChecked />
          </Labelled>
          <Labelled text="Medium">
            <Checkbox defaultChecked />
          </Labelled>
          <Labelled text="Large" size="text-zero-lg">
            <Checkbox defaultChecked />
          </Labelled>
          <Labelled text="Large switch" size="text-zero-lg">
            <Switch defaultChecked />
          </Labelled>
        </Row>
        <Row label="switch">
          <Labelled text="Off">
            <Switch />
          </Labelled>
          <Labelled text="On">
            <Switch defaultChecked />
          </Labelled>
          <Labelled text="Disabled">
            <Switch disabled />
          </Labelled>
          <Labelled text="Disabled on">
            <Switch disabled defaultChecked />
          </Labelled>
        </Row>
        <Row label="radio">
          <RadioGroup defaultValue="night" aria-label="Shift">
            <Labelled text="Dawn">
              <RadioGroupItem value="dawn" />
            </Labelled>
            <Labelled text="Day">
              <RadioGroupItem value="day" />
            </Labelled>
            <Labelled text="Night">
              <RadioGroupItem value="night" />
            </Labelled>
            <Labelled text="Closed">
              <RadioGroupItem value="closed" disabled />
            </Labelled>
          </RadioGroup>
        </Row>
        <Row label="textarea">
          <div className="grid w-full max-w-md gap-3">
            <Textarea placeholder="Notes for the courier" />
            <Textarea
              defaultValue={"Leave it at the gate.\nRing twice."}
              aria-invalid
            />
          </div>
        </Row>
        <Row label="slider">
          <div className="grid w-full max-w-md gap-6">
            <Slider defaultValue={40} aria-label="Volume" />
            <Slider
              value={range}
              onValueChange={(value) => setRange(value as number[])}
              aria-label="Range"
            />
            <Slider defaultValue={60} disabled aria-label="Disabled" />
          </div>
        </Row>
      </div>
    </section>
  );
}
