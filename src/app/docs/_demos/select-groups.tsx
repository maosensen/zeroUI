import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/zero/select";

const districts = {
  harbor: "Harbor",
  canal: "Canal side",
  market: "Old market",
  rail: "Rail yards",
  tower: "Tower row",
};

export default function SelectGroups() {
  return (
    <Select items={districts} defaultValue="market">
      <SelectTrigger className="max-w-64">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Waterfront</SelectLabel>
          <SelectItem value="harbor">Harbor</SelectItem>
          <SelectItem value="canal">Canal side</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Inland</SelectLabel>
          <SelectItem value="market">Old market</SelectItem>
          <SelectItem value="rail">Rail yards</SelectItem>
          <SelectItem value="tower" disabled>
            Tower row
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
