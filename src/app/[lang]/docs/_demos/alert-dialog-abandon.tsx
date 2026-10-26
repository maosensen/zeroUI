import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogBody,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/zero/alert-dialog";
import { Button } from "@/components/zero/button";

export default function AlertDialogAbandon() {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="danger" />}>
        Abandon the job
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Abandon this job?</AlertDialogTitle>
          <AlertDialogDescription>
            The crate goes back on the board.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogBody>
          <p className="text-zero-text-2">
            You lose the reward, and the dispatcher will not offer you a rush
            job for a day.
          </p>
        </AlertDialogBody>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep it</AlertDialogCancel>
          <AlertDialogAction variant="danger">Abandon</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
