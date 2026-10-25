import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/zero/accordion";

const answers = [
  [
    "When am I paid?",
    "When the crate is signed for at the north gate. Half if it arrives late.",
  ],
  [
    "Can I hand a job back?",
    "Until you pick the crate up. After that it is yours to deliver.",
  ],
  [
    "What does Rush mean?",
    "The reward is higher and the window is shorter. Rush jobs cannot be handed back.",
  ],
] as const;

export default function AccordionFaq() {
  return (
    <Accordion defaultValue={["When am I paid?"]} className="max-w-lg">
      {answers.map(([question, answer]) => (
        <AccordionItem key={question} value={question}>
          <AccordionTrigger>{question}</AccordionTrigger>
          <AccordionContent>{answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
