import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "../label";

const DropdownWithSearch = ({
  options,
  label,
  selectPlaceholder = "Select an option",
  searchPlaceholder = "",
  nothingFoundPlaceholder = "No results found",
  value = "",
  rootClassName = "",
  className = "",
  popoverClassName = "",
  onSelect,
}) => {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");
  const [filteredOptions, setFilteredOptions] = React.useState([]);

  React.useEffect(() => {
    setSelectedValue(value);

    setFilteredOptions(options);
  }, [value, options]);

  const handleValueChange = (value) => {
    if (value === "") {
      setFilteredOptions(options);
    } else {
      const newOptions = options.filter((option) =>
        option.label.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(newOptions);
    }
  };

  return (
    <div className={`flex w-full flex-col ${rootClassName}`}>
      {label && <Label className="mb-1">{label}</Label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={`justify-between ${className}`}
          >
            {selectedValue
              ? options.find((option) => option.value === selectedValue)?.label
              : selectPlaceholder}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className={`${popoverClassName} p-0`}>
          <Command value={selectedValue}>
            <CommandInput
              placeholder={searchPlaceholder}
              className="h-9"
              onValueChange={handleValueChange}
            />
            <CommandList>
              <CommandEmpty>{nothingFoundPlaceholder}</CommandEmpty>
              <CommandGroup>
                {filteredOptions.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.label}
                    className="hover:bg-gray-100"
                    onSelect={(currentValue) => {
                      const value = filteredOptions.find(
                        (option) => option.label === currentValue
                      )?.value;
                      setSelectedValue(value ?? "");
                      onSelect(value ?? "");
                      setOpen(false);
                    }}
                  >
                    {option.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        selectedValue === option.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DropdownWithSearch;
