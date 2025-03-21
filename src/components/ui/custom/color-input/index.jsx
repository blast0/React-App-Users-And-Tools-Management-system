import { useRef, useEffect } from "react";

import ColorSelector from "./color-selector";
import { Input } from "../../input";
import { Label } from "../../label";

const ColorInput = ({
  label,
  description,
  opt,
  containerClassName = "",
  className = "",
  onChange,
  ...restProps
}) => {
  const descriptionRef = useRef(null);

  useEffect(() => {
    if (description) {
      descriptionRef.current.innerHTML = description;
    }
  }, [description]);

  const colorChangeHandler = (color) => {
    try {
      onChange(color);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={containerClassName}>
      <Label className="mb-1">{label}</Label>
      {description ? <p className="Title" ref={descriptionRef}></p> : null}
      <div className={`relative rounded-sm shadow-sm ${className}`}>
        <Input
          value={restProps.color}
          className="border-none shadow-none"
          onChange={(e) => {
            colorChangeHandler(e.target.value);
          }}
        />
        <div className="absolute right-2 top-1.5 bg-white ">
          <ColorSelector
            {...restProps}
            optData={opt}
            onChange={(color) => colorChangeHandler(color)}
          />
        </div>
      </div>
    </div>
  );
};

export default ColorInput;
