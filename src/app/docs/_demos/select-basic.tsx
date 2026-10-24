import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/zero/select";

const districts = {
  harbor: "Harbor",
  market: "Old market",
  rail: "Rail yards",
  canal: "Canal side",
};

export default function SelectBasic() {
  return (
    <Select items={districts}>
      <SelectTrigger className="max-w-64">
        <SelectValue placeholder="Pick a district" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(districts).map(([value, label]) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
