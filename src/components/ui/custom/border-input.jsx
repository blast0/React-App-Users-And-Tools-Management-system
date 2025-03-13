import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import UnitSelector from "./unit-selector";
import ColorInput from "./color-input";
import { ChevronDown, ChevronUp } from "lucide-react";

// Function to parse the border value string and extract necessary properties (size, color, style, selected borders)
const parseBorderValue = (value) => {
  const defaultState = {
    borderSize: "1px", // Default border size
    borderColor: "#000000", // Default border color (black)
    borderStyle: "solid", // Default border style
    selectedBorders: ["border-top", "border-bottom"], // Default selected borders (top and bottom)
  };

  if (!value) return defaultState;

  const borders = value.split(";").reduce((acc, part) => {
    const [key, style] = part.split(":").map((s) => s.trim());
    if (key && style) {
      const [size, styleType, color] = style.split(" "); // Extract size, style, and color
      acc[key] = {
        size: size || "1px",
        style: styleType || "solid",
        color: color || "#000000",
      };
    }
    return acc;
  }, {});

  const selectedBorders = Object.keys(borders);
  const {
    size = "1px",
    style = "solid",
    color = "#000000",
  } = borders[selectedBorders[0]] || {};

  return {
    borderSize: size,
    borderColor: color,
    borderStyle: style,
    selectedBorders,
  };
};

// Main component to handle the border input UI and logic
const BorderInput = ({
  label = "",
  value,
  units = [{ name: "px", value: "px" }],
  onChange = () => {},
}) => {
  const { borderSize, borderColor, borderStyle, selectedBorders } =
    parseBorderValue(value);

  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    borderSize,
    borderColor,
    borderStyle,
    selectedBorders,
  });

  const updateBorders = (key, value) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const styles = state.selectedBorders
      .map(
        (side) =>
          `${side}: ${state.borderSize} ${state.borderStyle} ${state.borderColor}`
      )
      .join("; ");
    onChange(styles);
  }, [state]);

  const toggleBorder = (side) => {
    updateBorders(
      "selectedBorders",
      state.selectedBorders.includes(side)
        ? state.selectedBorders.filter((s) => s !== side)
        : [...state.selectedBorders, side]
    );
  };

  const borderMappings = {
    top: "border-top",
    bottom: "border-bottom",
    left: "border-left",
    right: "border-right",
  };

  // Function to handle border style change
  const handleBorderStyleChange = (style) => {
    updateBorders("borderStyle", style);
  };

  return (
    <div>
      {label && <Label>{label}</Label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Input
            className="text-left"
            readOnly
            value={`${state.borderSize} ${state.borderStyle} ${state.borderColor}`}
            onClick={() => setOpen((prev) => !prev)}
            icon={
              open ? (
                <ChevronUp
                  color="#cbcbcb"
                  onClick={() => setOpen((prev) => !prev)}
                />
              ) : (
                <ChevronDown
                  onClick={() => setOpen((prev) => !prev)}
                  color="#cbcbcb"
                />
              )
            }
            iconPosition="right"
          />
        </PopoverTrigger>
        <PopoverContent className="w-56 space-y-2 z-[2]">
          <UnitSelector
            label="Border Size"
            value={state.borderSize}
            options={units}
            onChange={(value) => updateBorders("borderSize", value)}
          />

          <ColorInput
            label="Border Color"
            color={state.borderColor}
            onChange={(value) => updateBorders("borderColor", value)}
          />

          {/* Border Style Selection */}
          <div className="space-y-1">
            <Label>Border Style</Label>
            <div className="flex space-x-2">
              {["solid", "dashed", "dotted"].map((style) => (
                <button
                  key={style}
                  className={`p-2 rounded-md ${
                    state.borderStyle === style
                      ? "bg-[#dedede]"
                      : "bg-[#f9f9f9]"
                  }`}
                  onClick={() => handleBorderStyleChange(style)} // Update border style
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <Label>Border Sides</Label>
            <div className="flex space-x-2">
              {Object.entries(borderMappings).map(([label, side]) => (
                <i
                  key={side}
                  className={`icon-border-${label} text-[30px] rounded-md p-2 cursor-pointer ${
                    state.selectedBorders.includes(side)
                      ? "bg-[#dedede]"
                      : "bg-[#f9f9f9]"
                  }`}
                  onClick={() => toggleBorder(side)}
                />
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default BorderInput;
