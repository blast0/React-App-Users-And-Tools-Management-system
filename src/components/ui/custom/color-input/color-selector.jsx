import { useRef, useState } from "react";
import { noop } from "lodash";

import ColorPicker from "./color-picker";
import withPopup from "../../../hoc/withPopup";
import { Popover, PopoverContent, PopoverTrigger } from "../../popover";

const ColorSelectorPopup = withPopup(ColorPicker);

function ColorSelectorWithPopup(props) {
  const {
    id,
    containerStyle = {},
    controlStyle = {},
    containerClass = "",
    tooltip = "",
    handleRemove = noop,
    opt,
    showRemoveButton = false,
    ...restProps
  } = props;
  const [showSiteColor, setShowSiteColor] = useState(false);
  const elemRef = useRef(null);

  const containerStyles = {
    width: opt?.fullWidth
      ? "100%"
      : opt?.containerWidth
      ? opt?.containerWidth
      : null,
    ...containerStyle,
  };
  const openSiteSettings = () => {
    setShowSiteColor(true);
  };
  return (
    <div
      className={`control-wrapper ${containerClass ?? ""} popup`}
      style={{ ...containerStyles }}
    >
      <Popover>
        <PopoverTrigger asChild>
          <div
            className={`ColorSelectorWithPopup w-[24px] h-[24px] border-1 cursor-pointer ${
              tooltip ? "tooltip" : ""
            } tooltip-top `}
            id={`${id || ""}`}
            data-tooltip={tooltip ?? restProps.label}
            style={{
              backgroundColor: restProps.color,
              ...controlStyle,
            }}
            ref={elemRef}
            onClick={(e) => {
              e.stopPropagation();
              if (showSiteColor) {
                setShowSiteColor(false);
              }
            }}
          >
            {showRemoveButton ? (
              <span
                className="close-button"
                onClick={() => {
                  handleRemove(restProps.index);
                }}
              ></span>
            ) : null}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-max z-[55]">
          <ColorPicker
            {...restProps}
            nativeElement={elemRef?.current}
            onOpenSiteSettings={openSiteSettings}
            onChange={(color) => restProps.onChange(color)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default ColorSelectorWithPopup;
export { ColorSelectorPopup };
