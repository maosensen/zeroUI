import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/zero/avatar";

export default function AvatarKinds() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Avatar size="lg">
        <AvatarImage src="/samples/portrait-a.svg" alt="Mara K." />
        <AvatarFallback>MK</AvatarFallback>
        <AvatarBadge />
      </Avatar>
      <Avatar>
        <AvatarFallback>RV</AvatarFallback>
      </Avatar>
      <AvatarGroup>
        <Avatar size="sm">
          <AvatarImage src="/samples/portrait-a.svg" alt="Mara K." />
          <AvatarFallback>MK</AvatarFallback>
        </Avatar>
        <Avatar size="sm">
          <AvatarImage src="/samples/portrait-b.svg" alt="Rui V." />
          <AvatarFallback>RV</AvatarFallback>
        </Avatar>
        <Avatar size="sm">
          <AvatarFallback>JO</AvatarFallback>
        </Avatar>
        <AvatarGroupCount size="sm">+4</AvatarGroupCount>
      </AvatarGroup>
    </div>
  );
}
