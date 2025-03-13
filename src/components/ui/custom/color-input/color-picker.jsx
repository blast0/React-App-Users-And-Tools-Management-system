import React, { useEffect } from "react";
import { CustomPicker } from "react-color";
import { noop } from "lodash";
import Hue from "react-color/lib/components/common/Hue";
import Saturation from "react-color/lib/components/common/Saturation";
import Alpha from "react-color/lib/components/common/Alpha";

import ChromePointerCircle from "./chrome-pointer-circle";
import ChromePointer from "./chrome-pointer";
import ChromeFields from "./chrome-fields";
import { SketchPresetColors } from "./sketch-preset-colors.jsx";
import { createColorText } from "../utilities.js";

const PRESET_COLORS = [
  "#ffadad",
  "#ffd6a5",
  "#fdffb6",
  "#caffbf",
  "#9bf6ff",
  "#a0c4ff",
  "#bdb2ff",
  "#ffc6ff",
  "#f48c06",
  "#ba181b",
  "#660708",
  "#009688",
  "#004842",
  "#000000",
  "#f5f3f4",
  "#FFFFFF",
];

class SubPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSiteColor: false,
    };
  }
  render() {
    const {
      hsl,
      hsv,
      hex,
      rgb,
      label,
      onChange,
      disableAlpha,
      swatches,
      opt,
      optData,
      onOpenSiteSettings,
      elemRef,
    } = this.props;
    // component styles
    const styles = {
      saturation: {
        width: "100%",
        paddingBottom: "55%",
        position: "relative",
        borderRadius: "2px 2px 0 0",
        overflow: "hidden",
      },
      hue: {
        height: "10px",
        position: "relative",
        marginBottom: "8px",
        width: "100%",
      },
      alpha: {
        position: "relative",
        margin: "10px 0px",
        height: "10px",
        overflow: "hidden",
      },
      Alpha: {
        height: "10px",
        width: "100%",
      },
      body: {
        padding: "8px 0 0 0",
      },
    };

    const containerStyles = {
      width: opt?.fullWidth
        ? "100%"
        : opt?.containerWidth
        ? opt?.containerWidth
        : null,
    };

    const controlStyles = {
      width: opt?.controlWidth ? opt?.controlWidth : "200px",
    };
    return (
      <div
        className="control-wrapper"
        style={{
          ...containerStyles,
        }}
        ref={elemRef?.current}
      >
        <div style={{ ...controlStyles }}>
          {label ? <label className="InputLabel">{label}</label> : null}
          <div style={styles.saturation}>
            <Saturation
              style={styles.saturation}
              hsl={hsl}
              hsv={hsv}
              pointer={ChromePointerCircle}
              onChange={onChange}
            />
          </div>
          <div style={styles.body}>
            <div style={styles.hue}>
              <Hue hsl={hsl} pointer={ChromePointer} onChange={onChange} />
            </div>
            <div style={styles.alpha}>
              <Alpha
                style={styles.Alpha}
                pointer={ChromePointer}
                rgb={rgb}
                hsl={hsl}
                onChange={onChange}
              ></Alpha>
            </div>
            <ChromeFields
              hex={hex}
              onChange={onChange}
              disableAlpha={disableAlpha}
            />
            <SketchPresetColors
              colors={swatches}
              onClick={onChange}
              onSwatchHover={noop}
            />
            {optData?.showSiteSettings ? (
              <span
                className="siteSettingsBtn"
                onClick={() => {
                  this.setState({
                    showSiteColor: true,
                  });
                  if (onOpenSiteSettings) onOpenSiteSettings();
                }}
              >
                <a>Use Site Colors</a>
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

// create a custom picker
const CustomColorPicker = CustomPicker(SubPopup);
const ColorSelector = ({ onChange, ...restProps }) => {
  const { color } = restProps;
  const handleChange = (color) => {
    const _color = createColorText(color);
    onChange(_color);
  };

  useEffect(() => {
    handleChange(color);
  }, []);

  return <CustomColorPicker onChange={handleChange} {...restProps} />;
};

ColorSelector.defaultProps = {
  swatches: PRESET_COLORS,
};

export default ColorSelector;
