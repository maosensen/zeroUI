import { Badge } from "@/components/zero/badge";
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

const jobs = [
  {
    id: "J-104",
    route: "Rail yards → North gate",
    reward: "3,100",
    rush: true,
  },
  { id: "J-117", route: "Harbor → Old market", reward: "1,450", rush: false },
  { id: "J-121", route: "Tower 9 → Canal docks", reward: "2,275", rush: false },
];

export default function TableJobs() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Job</TableHead>
          <TableHead>Route</TableHead>
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
            <TableCell>
              <span className="flex items-center gap-3">
                {job.route}
                {job.rush ? <Badge>Rush</Badge> : null}
              </span>
            </TableCell>
            <TableCell className="text-right tabular-nums">
              {job.reward} cr
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="text-right tabular-nums">6,825 cr</TableCell>
        </TableRow>
      </TableFooter>
      <TableCaption>Open jobs in the east district.</TableCaption>
    </Table>
  );
}
