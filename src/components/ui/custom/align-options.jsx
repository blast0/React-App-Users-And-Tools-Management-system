import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Label } from "../label";
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";

const AlignOptions = ({ label = "", value, onValueChange, className }) => {
  return (
    <div className="flex flex-col">
      <Label className="mb-1">{label}</Label>
      <ToggleGroup
        type="single"
        variant="outline"
        value={value}
        className={className}
        onValueChange={onValueChange}
      >
        <ToggleGroupItem value="l">
          <AlignLeft size={20} />
        </ToggleGroupItem>
        <ToggleGroupItem value="c">
          <AlignCenter size={20} />
        </ToggleGroupItem>
        <ToggleGroupItem value="r">
          <AlignRight size={20} />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default AlignOptions;
