import { Alert, AlertDescription, AlertTitle } from "@/components/zero/alert";

export default function AlertTones() {
  return (
    <div className="grid w-full max-w-lg gap-3">
      <Alert>
        <AlertTitle>Route updated</AlertTitle>
        <AlertDescription>
          The north gate opens an hour later tonight.
        </AlertDescription>
      </Alert>
      <Alert variant="success">
        <AlertTitle>Job taken</AlertTitle>
        <AlertDescription>Reach the north gate before 22:00.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTitle>Low on fuel</AlertTitle>
        <AlertDescription>
          Refuel before you take the next job.
        </AlertDescription>
      </Alert>
      <Alert variant="danger">
        <AlertTitle>Crate damaged</AlertTitle>
        <AlertDescription>The reward drops by half.</AlertDescription>
      </Alert>
    </div>
  );
}
