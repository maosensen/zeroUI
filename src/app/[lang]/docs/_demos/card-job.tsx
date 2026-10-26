import { Badge } from "@/components/zero/badge";
import { Button } from "@/components/zero/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/zero/card";
import { ArrowRightIcon } from "@/components/zero/icons";

export default function CardJob() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sealed crate</CardTitle>
        <CardDescription>Rail yards → North gate</CardDescription>
        <CardAction>
          <Badge>Rush</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-zero-text-2">
          Escort the crate through the yards before the night shift. Do not open
          it.
        </p>
      </CardContent>
      <CardFooter>
        <span className="font-semibold tabular-nums">3,100 cr</span>
        <Button size="sm" className="ms-auto">
          Take it
          <ArrowRightIcon />
        </Button>
      </CardFooter>
    </Card>
  );
}
