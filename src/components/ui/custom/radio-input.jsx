import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const RadioInput = ({ options, defaultValue, onValueChange }) => {
  return (
    <RadioGroup defaultValue={defaultValue} onValueChange={onValueChange}>
      {options && options.map((option, index) => (
        <div key={index} className="flex items-center space-x-2">
          <RadioGroupItem value={option.value} id={option?.id} />
          <Label htmlFor={option?.id}>{option.name}</Label>
        </div>
      ))}
    </RadioGroup>
  );
};

export default RadioInput;
