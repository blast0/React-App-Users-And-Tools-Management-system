import React, { useRef, useState } from "react";
import { noop } from "lodash";
import ColorSelector from "./color-picker";
import withPopup from "@/components/hoc/withPopup";

const ColorSelectorPopup = withPopup(ColorSelector);

function ColorSelectorWithPopup(props) {
  const {
    id,
    containerStyle,
    controlStyle,
    containerClass,
    tooltip,
    handleRemove,
    nativeElement,
    onOutsideClick,
    opt,
    showRemoveButton,
    ...restProps
  } = props;
  const [showPicker, setShowPicker] = useState(false);
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
    setShowPicker(false);
    setShowSiteColor(true);
  };
  return (
    <div
      className={`control-wrapper ${containerClass ?? ""} popup`}
      style={{
        backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAHUlEQVQ4jWNgYGAQIYAJglEDhoUBg9+FowbQ2gAARjwKARjtnN8AAAAASUVORK5CYII")`,
        ...containerStyles,
      }}
    >
      <div
        className={`ColorSelectorWithPopup ${
          tooltip ? "tooltip" : ""
        } tooltip-top `}
        id={`${id || ""}`}
        data-tooltip={tooltip ?? restProps.label}
        style={{
          backgroundColor: restProps.color,
          ...controlStyle,
        }}
        ref={elemRef}
        onClick={(e, index) => {
          e.stopPropagation();
          if (showSiteColor) {
            setShowSiteColor(false);
            setShowPicker(false);
          } else {
            setShowPicker((prevState) => !prevState);
          }
        }}
      >
        {showRemoveButton ? (
          <span
            className="close-button"
            onClick={(event) => {
              handleRemove(restProps.index);
            }}
          ></span>
        ) : null}
      </div>

      {showPicker ? (
        <ColorSelectorPopup
          {...restProps}
          nativeElement={elemRef?.current}
          onOutsideClick={(e) => {
            setShowPicker(false);
          }}
          onOpenSiteSettings={openSiteSettings}
          onChange={(color) => restProps.onChange(color)}
        />
      ) : null}
    </div>
  );
}

ColorSelectorWithPopup.defaultProps = {
  showRemoveButton: false,
  handleRemove: noop,
  controlStyle: {},
  containerStyle: {},
};

export default ColorSelectorWithPopup;
export { ColorSelectorPopup };
