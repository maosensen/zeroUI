import type { ReactNode } from "react";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/zero/avatar";
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
import { ArrowRightIcon, LockIcon } from "@/components/zero/icons";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/zero/table";

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[7rem_1fr] items-start gap-6 border-zero-line border-t-2 py-5">
      <span className="font-bold font-zero text-zero-sm text-zero-text-2 italic">
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-4">{children}</div>
    </div>
  );
}

const jobs = [
  { id: "J-104", route: "Rail yards → North gate", reward: 3100, tier: "Rush" },
  { id: "J-117", route: "Harbor → Old market", reward: 1450, tier: "" },
  { id: "J-121", route: "Tower 9 → Canal docks", reward: 2275, tier: "Locked" },
];

/** The data display family: card, table, badge, avatar. */
export function DataSection() {
  return (
    <section className="grid gap-2">
      <h2 className="font-black text-zero-xl italic">Data display</h2>
      <div>
        <Row label="badge">
          <Badge>Rush</Badge>
          <Badge variant="secondary">Harbor</Badge>
          <Badge variant="outline">Draft</Badge>
          <Badge variant="danger">Late</Badge>
          <Badge variant="secondary">
            <LockIcon />
            Locked
          </Badge>
          <Badge render={<a href="#top">A link</a>} />
        </Row>
        <Row label="avatar">
          {(["sm", "md", "lg"] as const).map((size) => (
            <Avatar key={size} size={size}>
              <AvatarImage src="/samples/portrait-a.svg" alt="" />
              <AvatarFallback>MK</AvatarFallback>
            </Avatar>
          ))}
          <Avatar>
            <AvatarFallback>MK</AvatarFallback>
            <AvatarBadge />
          </Avatar>
          <Avatar size="lg">
            <AvatarImage src="/samples/portrait-b.svg" alt="" />
            <AvatarFallback>RV</AvatarFallback>
            <AvatarBadge className="bg-zero-danger" />
          </Avatar>
          <AvatarGroup>
            <Avatar>
              <AvatarImage src="/samples/portrait-a.svg" alt="" />
              <AvatarFallback>MK</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="/samples/portrait-b.svg" alt="" />
              <AvatarFallback>RV</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>JO</AvatarFallback>
            </Avatar>
            <AvatarGroupCount>+4</AvatarGroupCount>
          </AvatarGroup>
        </Row>
        <Row label="card">
          <Card className="w-80">
            <CardHeader>
              <CardTitle>Sealed crate</CardTitle>
              <CardDescription>Rail yards → North gate</CardDescription>
              <CardAction>
                <Badge>Rush</Badge>
              </CardAction>
            </CardHeader>
            <CardContent>
              <p className="text-zero-text-2">
                Escort the crate through the yards before the night shift. Do
                not open it.
              </p>
            </CardContent>
            <CardFooter>
              <span className="font-semibold font-zero-text tabular-nums">
                3,100 cr
              </span>
              <Button size="sm" className="ms-auto">
                Take it
                <ArrowRightIcon />
              </Button>
            </CardFooter>
          </Card>
          <Card interactive className="w-64">
            <CardHeader>
              <CardTitle>Interactive</CardTitle>
              <CardDescription>Point at it</CardDescription>
            </CardHeader>
            <CardContent>
              <a
                href="#top"
                className="font-bold font-zero italic outline-none"
              >
                Open the route
              </a>
            </CardContent>
          </Card>
          <Card className="w-56">
            <CardContent>Content only, no header.</CardContent>
          </Card>
        </Row>
        <Row label="table">
          <div className="w-full max-w-2xl">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead />
                  <TableHead className="text-right">Reward</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobs.map((job, index) => (
                  <TableRow
                    key={job.id}
                    data-state={index === 0 ? "selected" : undefined}
                  >
                    <TableCell className="font-semibold">{job.id}</TableCell>
                    <TableCell>{job.route}</TableCell>
                    <TableCell>
                      {job.tier ? (
                        <Badge
                          variant={job.tier === "Rush" ? "default" : "outline"}
                        >
                          {job.tier}
                        </Badge>
                      ) : null}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {job.reward.toLocaleString("en")} cr
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className="text-right tabular-nums">
                    6,825 cr
                  </TableCell>
                </TableRow>
              </TableFooter>
              <TableCaption>Open jobs in the east district.</TableCaption>
            </Table>
          </div>
        </Row>
      </div>
    </section>
  );
}
