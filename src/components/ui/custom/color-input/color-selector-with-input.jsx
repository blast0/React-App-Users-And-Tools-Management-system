import React, { useState, useRef, useEffect } from "react";

import ColorSelector from "./color-selector-with-popup";
import { Input } from "../../input";
import { WEB_SAFE_COLORS } from "../../../../helper";

const ColorSelectorWithInput = ({
  label,
  tooltip,
  description,
  opt,
  containerClass,
  containerStyle,
  controlStyle,
  onChange,
  ...restProps
}) => {
  const descriptionRef = useRef(null);

  const [selectedColor, setSelectedColor] = useState(restProps.color);
  // NOTE: isWebSafeColor is not used for now
  const [isWebSafeColor, setIsWebSafeColor] = useState(false);
  const containerStyles = {
    width: opt?.fullWidth
      ? "100%"
      : opt?.containerWidth
      ? opt?.containerWidth
      : "",
    ...containerStyle,
  };

  const controlStyles = {
    width: opt?.controlWidth ? opt?.controlWidth : "",
    ...controlStyle,
  };

  useEffect(() => {
    if (description) {
      descriptionRef.current.innerHTML = description;
    }
  }, [description]);

  /**
   * validates a web safe color
   * @param {string} color hex based color
   */
  const validateWebSafeColor = (color) => {
    let valid = true;

    if (opt?.validateAgainstWebSafeColors) {
      let colorNames = Object.keys(WEB_SAFE_COLORS);
      let colorCodes = Object.values(WEB_SAFE_COLORS);
      if (colorNames.includes(color) || colorCodes.includes(hex)) {
        valid = true;
      } else {
        valid = false;
      }
    }
    setIsWebSafeColor(valid);
  };

  const colorChangeHandler = (color) => {
    try {
      // check if given color is a web safe or not
      validateWebSafeColor(color);
      setSelectedColor(color);
      onChange(color);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`control-wrapper ${containerClass ?? ""}`}
      style={{ ...containerStyles }}
      title={tooltip ? tooltip : label}
    >
      {label ? (
        <label title={label} className="InputLabel">
          {label}
        </label>
      ) : null}
      {description ? <p className="Title" ref={descriptionRef}></p> : null}
      <div
        className="ColorSelectorWithInput rounded-md"
        style={{ ...controlStyles }}
      >
        <Input
          className={"border-none"}
          value={restProps?.color}
          onChange={(value) => {
            colorChangeHandler(value);
          }}
        />
        <ColorSelector
          {...restProps}
          optData={opt}
          containerStyle={{
            marginRight: "10px",
          }}
          onChange={(color) => colorChangeHandler(color)}
        />
      </div>
    </div>
  );
};

export default ColorSelectorWithInput;
