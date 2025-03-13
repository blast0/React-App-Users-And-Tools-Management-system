import { useEffect, useState } from "react";
import Dropdown from "./dropdown";
import { Input } from "../input";
import { Label } from "../label";

const AUTO = {
  name: "auto",
  value: "auto",
};

const UnitSelector = ({
  label,
  value = "",
  className,
  style,
  options,
  onChange,
}) => {
  useEffect(() => {
    if (value === "auto") {
      setDropdownValue("auto");
      return;
    }

    const regex = /^(\d*\.?\d+)(\D+)$/;
    const match = value.match(regex);
    if (match) {
      const numberValue = match[1];
      const unit = match[2];
      setInputValue(numberValue);
      setDropdownValue(unit);
    }
  }, [value]);

  const [inputValue, setInputValue] = useState(0);
  const [dropdownValue, setDropdownValue] = useState("");

  const inputChangeHandler = (e) => {
    setInputValue(e.target.value);
    onChange(e.target.value + dropdownValue);
  };

  const dropdownChangeHandler = (value) => {
    setDropdownValue(value);
    let finalValue = value === "auto" ? "auto" : inputValue + value;
    onChange(finalValue);
  };

  return (
    <div className={className} style={style}>
      <Label>{label}</Label>
      <div className="flex items-center justify-between border rounded-sm shadow-sm">
        {dropdownValue !== "auto" && (
          <Input
            type="number"
            value={inputValue || 0}
            onChange={inputChangeHandler}
            className="border-none text-xs shadow-none focus-visible:ring-0 pr-0"
          />
        )}
        <Dropdown
          value={dropdownValue}
          placeholder=""
          className={`border-none shadow-none rounded-none rounded-tr-sm rounded-br-sm focus:ring-0 bg-slate-100 px-2 pr-1 ${
            dropdownValue === "auto" ? "w-full rounded-sm" : "w-max"
          }`}
          options={[AUTO, ...options]}
          onValueChange={dropdownChangeHandler}
        />
      </div>
    </div>
  );
};

export default UnitSelector;
