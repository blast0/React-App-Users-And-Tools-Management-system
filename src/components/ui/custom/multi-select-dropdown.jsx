"use client";

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

const MultiSelectDropdown = ({
  options = [],
  value = [],
  onSelect,
  className = "",
  popoverClassName = "",
}) => {
  const [open, setOpen] = React.useState(false);
  const [selectedValues, setSelectedValues] = React.useState(value);

  const handleSelect = (currentValue) => {
    const updatedValues = selectedValues.includes(currentValue)
      ? selectedValues.filter((val) => val !== currentValue) // Remove if already selected
      : [...selectedValues, currentValue]; // Add if not selected

    setSelectedValues(updatedValues);
    onSelect(updatedValues); // Call the parent callback with the updated values
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`justify-between ${className}`}
        >
          {selectedValues.length > 0
            ? selectedValues.length === 1
              ? options.find((opt) => opt.value === selectedValues[0])?.name
              : `${
                  options.find((opt) => opt.value === selectedValues[0])?.name
                } + ${selectedValues.length - 1} more`
            : "Select options..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`p-0 ${popoverClassName}`}>
        <Command>
          <CommandInput placeholder="Search options..." />
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {options.map((opt) => (
                <CommandItem
                  key={opt.value}
                  value={opt.value}
                  onSelect={() => handleSelect(opt.value)}
                >
                  <span>{opt.name}</span>
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedValues.includes(opt.value)
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
  );
};

export default MultiSelectDropdown;
