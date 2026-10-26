import { InfoIcon } from "@/components/zero/icons";
import { Marker, MarkerContent, MarkerIcon } from "@/components/zero/marker";

export default function MarkerKinds() {
  return (
    <div className="grid w-full max-w-md gap-5">
      <Marker variant="separator">
        <MarkerContent>Tonight</MarkerContent>
      </Marker>
      <Marker>
        <MarkerIcon>
          <InfoIcon />
        </MarkerIcon>
        <MarkerContent>Mara joined the channel</MarkerContent>
      </Marker>
      <Marker variant="border">
        <MarkerContent>Earlier messages are archived</MarkerContent>
      </Marker>
    </div>
  );
}
