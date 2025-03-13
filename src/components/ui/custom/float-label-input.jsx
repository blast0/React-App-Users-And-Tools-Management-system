import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Textarea } from "../textarea";

// FloatLabelInput component using ShadCN-like design system
const FloatLabelInput = ({
  label = "",
  errorIcon,
  errorMsg = [],
  successIcon,
  successMsg = "",
  placeholder = " ",
  value = "",
  dropdownElement,
  multiline,
  onChange = () => {},
}) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const inputhandlar = (e) => {
    setInputValue(e.target.value);
    onChange(e);
  };

  return (
    <div>
      {label && <Label>{label}</Label>}

      <Popover open={open} onOpenChange={setOpen}>
        {multiline ? (
          <div className="relative">
            <Textarea
              value={inputValue}
              description={placeholder}
              onChange={(e) => {
                inputhandlar(e);
              }}
            />
            <div className="absolute right-1 top-0 h-full flex items-center">
              {open ? (
                <PopoverTrigger asChild>
                  <ChevronUp color="#cbcbcb" />
                </PopoverTrigger>
              ) : (
                <PopoverTrigger asChild>
                  <ChevronDown color="#cbcbcb" />
                </PopoverTrigger>
              )}
            </div>
          </div>
        ) : (
          <Input
            value={inputValue}
            onChange={(e) => {
              inputhandlar(e);
            }}
            placeholder={placeholder}
            icon={
              dropdownElement &&
              (open ? (
                <PopoverTrigger asChild>
                  <ChevronUp color="#cbcbcb" />
                </PopoverTrigger>
              ) : (
                <PopoverTrigger asChild>
                  <ChevronDown color="#cbcbcb" />
                </PopoverTrigger>
              ))
            }
            iconPosition="right"
          />
        )}
        <PopoverContent className="w-56 space-y-2 z-[2]">
          {dropdownElement && dropdownElement}
        </PopoverContent>
      </Popover>
      {errorMsg.length > 0 && (
        <div className="text-red-500 text-sm flex items-center space-x-2">
          {errorIcon}
          <ul>
            {errorMsg.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </div>
      )}
      {successMsg && (
        <div className="text-green-500 text-sm flex items-center space-x-2">
          {successIcon}
          <span>{successMsg}</span>
        </div>
      )}
    </div>
  );
};

export default FloatLabelInput;
