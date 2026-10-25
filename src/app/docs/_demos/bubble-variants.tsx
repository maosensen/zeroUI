import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "@/components/zero/bubble";

export default function BubbleVariants() {
  return (
    <BubbleGroup className="w-full max-w-md gap-4">
      <Bubble>
        <BubbleContent>Take the canal, it is faster tonight.</BubbleContent>
      </Bubble>
      <Bubble variant="secondary" align="end">
        <BubbleContent>On it. Eighteen minutes.</BubbleContent>
        <BubbleReactions>👍 2</BubbleReactions>
      </Bubble>
      <Bubble variant="muted">
        <BubbleContent>Dispatcher is away until 22:00.</BubbleContent>
      </Bubble>
      <Bubble variant="outline">
        <BubbleContent render={<button type="button" />}>
          Send me the route
        </BubbleContent>
      </Bubble>
      <Bubble variant="danger">
        <BubbleContent>Couldn't reach the north gate.</BubbleContent>
      </Bubble>
    </BubbleGroup>
  );
}
