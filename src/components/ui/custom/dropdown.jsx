import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Dropdown({
  value,
  options,
  onValueChange,
  disabled,
  className = "",
  dropdownHeight = "",
  side = "bottom",
  sideOffset = 0,
  placeholder = "Select an option",
  emptyPlaceholder = "No options found",
}) {
  return (
    <Select
      onValueChange={onValueChange}
      defaultValue={value}
      value={value}
      disabled={disabled}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent
        side={side}
        sideOffset={sideOffset}
        className={dropdownHeight ? `h-[${dropdownHeight}]` : ""}
      >
        {options.map((option, index) => (
          <SelectItem key={index} value={option.value}>
            {option.name}
          </SelectItem>
        ))}
        {options.length === 0 && (
          <p className="text-center py-3">{emptyPlaceholder}</p>
        )}
      </SelectContent>
    </Select>
  );
}
