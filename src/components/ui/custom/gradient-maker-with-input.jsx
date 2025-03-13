import { useEffect, useRef } from "react";
import { useState } from "react";

import { convertGradientToConfig } from "./utilities";
import GradientMakerWithPopup from "./gradient-maker-with-popup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const GradientMakerWithInput = ({
  label,
  opt,
  tooltip,
  containerStyle,
  containerClass,
  value,
  description,
  controlStyle,
  onValueChange,
  canChooseGradientType,
  theme,
  ...restProps
}) => {
  const descriptionRef = useRef(null);
  const [gradient, setGradient] = useState(value);

  useEffect(() => {
    if (description) {
      descriptionRef.current.innerHTML = description;
    }
    setGradient(value);
  }, [description, value]);

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
  return (
    <>
      <div
        className={`${containerClass ?? ""}`}
        style={{ ...containerStyles }}
        title={tooltip ? tooltip : label}
      >
        {label ? (
          <Label
            title={label}
            className={`InputLabel mb-1 ${
              theme === "dark" ? "text-white" : ""
            }`}
          >
            {label}
          </Label>
        ) : null}
        {description ? <p className="Title" ref={descriptionRef}></p> : null}
        <div
          className="flex bg-white GradientWithInput justify-center items-center rounded-sm shadow-sm"
          style={{ ...controlStyles }}
        >
          <Input
            className="border-none shadow-none"
            value={gradient}
            onChange={(e) => {
              console.log(e);
              setGradient(e.target.value);
              onValueChange({ gradient: e.target.value, config: null });
            }}
          />

          <GradientMakerWithPopup
            {...restProps}
            onValueChange={(val) => {
              setGradient(val.gradient);
              onValueChange(val);
            }}
            value={gradient}
            config={convertGradientToConfig(value)}
            controlStyle={{
              width: "27px",
              height: "27px",
              marginRight: "10px",
              border: "1px solid grey",
              borderRadius: "2px",
              cursor: "pointer",
            }}
            switchToColor={restProps.switchToColor}
            canChooseGradientType={canChooseGradientType}
          />
        </div>
      </div>
    </>
  );
};
export default GradientMakerWithInput;
