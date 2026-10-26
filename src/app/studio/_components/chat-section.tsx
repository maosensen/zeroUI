import AttachmentFiles from "@/app/[lang]/docs/_demos/attachment-files";
import BubbleVariants from "@/app/[lang]/docs/_demos/bubble-variants";
import CodeBlockDiff from "@/app/[lang]/docs/_demos/code-block-diff";
import MarkerKinds from "@/app/[lang]/docs/_demos/marker-kinds";
import MessageScrollerChat from "@/app/[lang]/docs/_demos/message-scroller-chat";
import MessageTurns from "@/app/[lang]/docs/_demos/message-turns";
import QuestionnaireDispatch from "@/app/[lang]/docs/_demos/questionnaire-dispatch";
import TraceSteps from "@/app/[lang]/docs/_demos/trace-steps";

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
      <div className="flex flex-wrap items-start gap-6">{children}</div>
    </div>
  );
}

/** The chat pieces (the docs' demos). */
export function ChatSection() {
  return (
    <section className="grid gap-2">
      <h2 className="font-black text-zero-xl italic">Chat</h2>
      <div>
        <Row label="message">
          <MessageTurns />
        </Row>
        <Row label="bubble">
          <BubbleVariants />
        </Row>
        <Row label="scroller">
          <MessageScrollerChat />
        </Row>
        <Row label="marker">
          <MarkerKinds />
        </Row>
        <Row label="attachment">
          <AttachmentFiles />
        </Row>
        <Row label="code block">
          <CodeBlockDiff />
        </Row>
        <Row label="trace">
          <TraceSteps />
        </Row>
        <Row label="questionnaire">
          <QuestionnaireDispatch />
        </Row>
      </div>
    </section>
  );
}
