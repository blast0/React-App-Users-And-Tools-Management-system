import { useState } from "react";
import PropTypes from "prop-types";

import BoxShadowWithPopUp from "./box-shadow-with-popup";
import { Input } from "../../input";
import { Label } from "../../label";

import "./boxshadow.css";

const BoxShadowWithInput = ({
  label,
  tooltip,
  description,
  containerClass,
  configKey,
  theme,
  value = "",
  onChange = () => {},
  ...restProps
}) => {
  const [inputShadow, setInputShadow] = useState(value);

  const boxShadowChangeHandler = (value) => {
    try {
      setInputShadow(value);
      onChange(value, configKey);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`${containerClass ?? ""}`}
      title={tooltip ? tooltip : label}
    >
      {label ? (
        <Label className={`mb-1 ${theme === "dark" ? "text-white" : ""}`}>
          {label}
        </Label>
      ) : null}
      {description ? <label className="Title">{description}</label> : null}
      <div className="rounded-sm flex items-center justify-between border shadow-sm bg-white w-[100%]">
        <Input
          className="border-none shadow-none"
          value={inputShadow}
          onChange={(e) => boxShadowChangeHandler(e.target.value)}
        />
        <BoxShadowWithPopUp
          {...restProps}
          controlStyle={{
            width: "20px",
            height: "20px",
            backgroundColor: "#fff",
            boxShadow: "grey 5px 5px 0px 0px",
            border: "1px solid #d7dcdf",
            marginRight: "4px",
            marginBottom: "3px",
            cursor: "pointer",
          }}
          onChange={(value) => boxShadowChangeHandler(value)}
        />
      </div>
    </div>
  );
};
BoxShadowWithInput.propTypes = {
  value: PropTypes.string,
};
export default BoxShadowWithInput;
