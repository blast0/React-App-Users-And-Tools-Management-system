import { memo } from "react";
import { isEqual } from "lodash";

import GradientMakerWithInput from "./gradient-maker-with-input";
import GradientMakerWithPopup from "./gradient-maker-with-popup";
import GradientMaker from "./gradient-component/index";
import { convertGradientToConfig } from "./utilities";

const GradientContainer = ({ showInPopup, configKey, ...restProps }) => {
  const config =
    typeof restProps.value === "object"
      ? convertGradientToConfig(restProps.value)
      : restProps.value;
  return (
    <>
      {showInPopup ? (
        <GradientMakerWithPopup
          {...restProps}
          controlStyle={{
            width: "24px",
            height: "24px",
            borderRadius: "3px",
          }}
          onValueChange={(val) =>
            restProps.onValueChange(val.gradient, configKey, val.config)
          }
        />
      ) : restProps?.opt?.showInput ? (
        <GradientMakerWithInput
          {...restProps}
          onValueChange={(val) =>
            restProps.onValueChange(val.gradient, configKey, val.config)
          }
        />
      ) : (
        <GradientMaker
          {...restProps}
          outsideClickExcludeSelectors={[
            ".ddList",
            ".chrome-picker-container",
            ".Gradient-Icon",
          ]}
          label={restProps.label}
          controlStyle={{ ...restProps.controlStyle, gap: "20px" }}
          config={config}
          onGradientChange={(val) =>
            restProps.onValueChange(val.gradient, configKey, val.config)
          }
        />
      )}
    </>
  );
};

export default memo(GradientContainer, isEqual);
