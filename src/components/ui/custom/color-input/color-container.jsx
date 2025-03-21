import { memo } from "react";
import { isEqual } from "lodash";

import ColorSelector from "./color-selector";
import ColorSelectorWithPopup from "./color-selector-with-popup";
import ColorSelectorWithInput from "./color-selector-with-input";

const ColorContainer = ({ showInPopup, configKey, ...restProps }) => {
  return (
    <>
      {!showInPopup ? (
        <ColorSelector
          {...restProps}
          onChange={(color) => restProps.onChange(color, configKey)}
        />
      ) : restProps?.opt?.showInput ? (
        <ColorSelectorWithInput
          {...restProps}
          onChange={(color) => restProps.onChange(color, configKey)}
        />
      ) : (
        <ColorSelectorWithPopup
          {...restProps}
          onChange={(color) => restProps.onChange(color, configKey)}
        />
      )}
    </>
  );
};

export default memo(ColorContainer, isEqual);
