import ButtonGroupActions from "@/app/[lang]/docs/_demos/button-group-actions";
import InputGroupReward from "@/app/[lang]/docs/_demos/input-group-reward";
import InputOTPCode from "@/app/[lang]/docs/_demos/input-otp-code";
import KbdShortcuts from "@/app/[lang]/docs/_demos/kbd-shortcuts";
import LabelBasic from "@/app/[lang]/docs/_demos/label-basic";
import NativeSelectDistrict from "@/app/[lang]/docs/_demos/native-select-district";

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[7rem_1fr] items-start gap-6 border-zero-line border-t-2 py-5">
      <span className="font-bold font-zero text-zero-sm text-zero-text-2 italic">
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-4">{children}</div>
    </div>
  );
}

/** More inputs: OTP, keys, labels, groups, the native select (the docs' demos). */
export function InputsSection() {
  return (
    <section className="grid gap-2">
      <h2 className="font-black text-zero-xl italic">More inputs</h2>
      <div>
        <Row label="input otp">
          <InputOTPCode />
        </Row>
        <Row label="input group">
          <InputGroupReward />
        </Row>
        <Row label="button group">
          <ButtonGroupActions />
        </Row>
        <Row label="native select">
          <NativeSelectDistrict />
        </Row>
        <Row label="kbd">
          <KbdShortcuts />
        </Row>
        <Row label="label">
          <LabelBasic />
        </Row>
      </div>
    </section>
  );
}
