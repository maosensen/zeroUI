import { Avatar, AvatarFallback, AvatarImage } from "@/components/zero/avatar";
import { Bubble, BubbleContent } from "@/components/zero/bubble";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@/components/zero/message";

export default function MessageTurns() {
  return (
    <MessageGroup className="w-full max-w-md">
      <Message>
        <MessageAvatar>
          <Avatar size="sm">
            <AvatarImage src="/samples/portrait-a.svg" alt="" />
            <AvatarFallback>MK</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>
            <strong>Mara</strong> 21:04
          </MessageHeader>
          <Bubble variant="secondary">
            <BubbleContent>Gate 4 is shut. Taking the canal.</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent>
          <Bubble>
            <BubbleContent>Copy. Sign for it at the north gate.</BubbleContent>
          </Bubble>
          <MessageFooter>Read 21:05</MessageFooter>
        </MessageContent>
      </Message>
    </MessageGroup>
  );
}
