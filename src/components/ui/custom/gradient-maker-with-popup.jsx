import { noop, orderBy } from "lodash";
import { useRef, useState } from "react";

import { convertGradientToConfig } from "./utilities";
import withPopup from "@/components/hoc/withPopup";
import GradientMaker from "../../gradient-component/index";

const GradientPopup = withPopup(GradientMaker);

function convertToText(config) {
  const { colorStops, type, angle } = config;
  let gradient = "";
  const colorStopsNext = orderBy(colorStops, ["offset"], ["asc"]);
  colorStopsNext.forEach((tab) => {
    gradient = gradient + `${tab.color} ${tab.offset}%,`;
  });
  gradient = gradient.slice(0, gradient.length - 1);
  switch (type) {
    case "linear":
      gradient = `${type}-gradient(${angle}deg, ${gradient})`;
      break;
    case "radial":
      gradient = `${type}-gradient(circle at center, ${gradient})`;
      break;
    default:
      break;
  }
  return gradient;
}

function GradientMakerWithPopup({
  label = "",
  tooltip = "",
  containerStyle = {},
  opt = {},
  onValueChange = noop,
  value = "",
  canChooseGradientType = false,
  controlStyle = {},
  switchToColor = false,
  ...restProps
}) {
  const userConfig = convertGradientToConfig(value);
  const userGrad = convertToText(userConfig);
  const [, setUserGradient] = useState(userGrad);
  const [showSubPopup, setShowSubPopup] = useState(false);
  const elemRef = useRef(null);

  const containerStyles = {
    width: opt?.fullWidth
      ? "100%"
      : opt?.containerWidth
      ? opt?.containerWidth
      : null,
    ...containerStyle,
  };

  return (
    <div className="control-wrapper  popup" style={{ ...containerStyles }}>
      {label ? <label className="InputLabel">{label}</label> : null}
      <div
        className="GradientMakerWithPopUp  control-icon tooltip tooltip-top"
        data-tooltip={tooltip ? tooltip : label}
        ref={elemRef}
        style={{
          background: value,
          ...controlStyle,
        }}
        onClick={() => {
          setShowSubPopup((prevShowSubPopup) => !prevShowSubPopup);
        }}
      ></div>
      {showSubPopup ? (
        <GradientPopup
          {...restProps}
          switchToColor={switchToColor}
          nativeElement={elemRef?.current}
          outsideClickExcludeSelectors={[
            ".ddList",
            ".chrome-picker-container",
            ".Gradient-Icon",
            ".SiteSettingsColor",
          ]}
          value={value}
          onOutsideClick={() => setShowSubPopup(!showSubPopup)}
          canChooseGradientType={canChooseGradientType}
          label={label}
          radius={opt?.radius}
          config={userConfig}
          onGradientChange={(val) => {
            onValueChange(val);
            setUserGradient(val.gradient);
          }}
        />
      ) : null}
    </div>
  );
}

export default GradientMakerWithPopup;
