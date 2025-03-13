import React, { useState } from "react";
import ColorInput from "./color-input";
import UnitSelector from "./unit-selector";
import { Label } from "../label";
import { Input } from "../input";
import { ChevronDown, ChevronUp } from "lucide-react";

const transformCSS2Object = (values) =>
  values
    .split(";")
    .map((el) => el.trim())
    .filter(Boolean)
    .reduce((acc, cur) => {
      const [key, value] = cur.split(":").map((v) => v.trim());
      acc[key] = value;
      return acc;
    }, {});

const transformObject2CSS = (styleObject) =>
  Object.entries(styleObject)
    .map(([key, value]) => `${key}: ${value}`)
    .join("; ");

const StyleDesigner = ({ value, onStyleUpdate, label, expand }) => {
  const [openConfigurator, setOpenConfigurator] = useState(false);
  const styleObject = transformCSS2Object(value);

  const updateStyle = (key, newValue) => {
    const updatedStyle = { ...styleObject, [key]: newValue };
    onStyleUpdate(transformObject2CSS(updatedStyle));
  };

  const toggleTextDecoration = (type) => {
    let current = styleObject["text-decoration"] || "";
    current = current.replace("none", "").trim();
    const decorations = current ? current.split(" ").filter(Boolean) : [];
    const hasType = decorations.includes(type);
    const updatedDecorations = hasType
      ? decorations.filter((decoration) => decoration !== type) // Remove the type
      : [...decorations, type];

    const updated = updatedDecorations.join(" ");
    updateStyle("text-decoration", updated || "none");
  };

  return (
    <div>
      {!expand && (
        <>
          <Input
            label={label}
            placeholder={""}
            value={value}
            disabled={true}
            icon={
              openConfigurator ? (
                <ChevronDown
                  color="#cbcbcb"
                  onClick={() => {
                    setOpenConfigurator(!openConfigurator);
                  }}
                />
              ) : (
                <ChevronUp
                  color="#cbcbcb"
                  onClick={() => {
                    setOpenConfigurator(!openConfigurator);
                  }}
                />
              )
            }
            iconPosition="right"
          />
        </>
      )}

      {(expand || openConfigurator) && (
        <>
          {styleObject["background-color"] && (
            <ColorInput
              label="Background Color"
              color={styleObject["background-color"]}
              onChange={(value) => updateStyle("background-color", value)}
            />
          )}
          {styleObject["color"] && (
            <ColorInput
              label="Text Color"
              color={styleObject.color}
              onChange={(value) => updateStyle("color", value)}
            />
          )}
          {styleObject["font-size"] && (
            <UnitSelector
              label="Font Size"
              value={styleObject["font-size"]}
              options={[
                { name: "px", value: "px" },
                { name: "%", value: "%" },
              ]}
              onChange={(value) => updateStyle("font-size", value)}
            />
          )}
          {styleObject["line-height"] && (
            <UnitSelector
              label="Line Height"
              value={styleObject["line-height"]}
              options={[
                { name: "px", value: "px" },
                { name: "%", value: "%" },
              ]}
              onChange={(value) => updateStyle("line-height", value)}
            />
          )}
          {styleObject["text-align"] && (
            <div>
              <Label>Text Align</Label>
              <div className="flex space-x-2">
                {["left", "center", "justify", "right"].map((align) => (
                  <i
                    key={align}
                    className={`icon-align-${align} text-[25px] p-2 cursor-pointer ${
                      styleObject["text-align"] === align ? "bg-gray-300" : ""
                    }`}
                    onClick={() => updateStyle("text-align", align)}
                  />
                ))}
              </div>
            </div>
          )}
          {(styleObject["text-decoration"] || styleObject["font-weight"]) && (
            <div className="mb-2">
              <Label>Text Decoration</Label>
              <div className="flex space-x-2">
                {styleObject["text-decoration"] && (
                  <>
                    <i
                      className={`icon-underline text-[25px] p-2 cursor-pointer ${
                        styleObject["text-decoration"].includes("underline")
                          ? "bg-gray-300"
                          : ""
                      }`}
                      onClick={() => toggleTextDecoration("underline")}
                    />
                    <i
                      className={`icon-strikethrough text-[25px] p-2 cursor-pointer ${
                        styleObject["text-decoration"].includes("line-through")
                          ? "bg-gray-300"
                          : ""
                      }`}
                      onClick={() => toggleTextDecoration("line-through")}
                    />
                  </>
                )}
                {styleObject["font-weight"] && (
                  <i
                    className={`icon-bold text-[25px] p-2 cursor-pointer ${
                      styleObject["font-weight"] === "bold" ? "bg-gray-300" : ""
                    }`}
                    onClick={() =>
                      updateStyle(
                        "font-weight",
                        styleObject["font-weight"] === "bold"
                          ? "normal"
                          : "bold"
                      )
                    }
                  />
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StyleDesigner;
