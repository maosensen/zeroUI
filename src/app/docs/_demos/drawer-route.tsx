import { Button } from "@/components/zero/button";
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/zero/drawer";

export default function DrawerRoute() {
  return (
    <div className="flex flex-wrap gap-3">
      <Drawer>
        <DrawerTrigger render={<Button />}>Show the route</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Rail yards → North gate</DrawerTitle>
            <DrawerDescription>2.4 km · about 18 minutes</DrawerDescription>
          </DrawerHeader>
          <DrawerBody>
            <ol className="grid list-decimal gap-2 ps-5 text-zero-text-2">
              <li>Leave the yards by the east side.</li>
              <li>Keep to the canal until Tower 9.</li>
              <li>Sign for the crate at the north gate.</li>
            </ol>
          </DrawerBody>
          <DrawerFooter>
            <DrawerClose render={<Button />}>Start</DrawerClose>
            <DrawerClose render={<Button variant="secondary" />}>
              Not yet
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Drawer side="right">
        <DrawerTrigger render={<Button variant="secondary" />}>
          From the right
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Notes</DrawerTitle>
            <DrawerDescription>Swipe it back to the right.</DrawerDescription>
          </DrawerHeader>
          <DrawerBody>
            <p className="text-zero-text-2">Gate 4 is closed after 21:00.</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
