import { useRef, useState } from "react";
import BoxShadow from "./box-shadow";
import withPopup from "@/components/hoc/withPopup";
const BoxShadowPopup = withPopup(BoxShadow);
const BoxShadowWithPopUp = (props) => {
  const {
    label,
    tooltip,
    containerStyle,
    controlStyle,
    opt,
    onChange,
    ...restProps
  } = props;

  const [showSubPopup, setShowSubPopup] = useState(false);
  const elemRef = useRef(null);
  const containerStyles = {
    width: opt?.fullWidth
      ? "100%"
      : opt?.containerWidth
      ? opt?.containerWidth
      : null,
    height: opt?.fullHeight
      ? "100%"
      : opt?.containerHeight
      ? opt?.containerHeight
      : null,
    ...containerStyle,
  };
  const handleCrossClick = () => {
    onChange("");
  };
  return (
    <>
      <div className="control-wrapper" style={{ ...containerStyles }}>
        {label ? <label className="InputLabel">{label}</label> : null}
        <div className="flex" style={{ gap: "3px" }}>
          <div
            className="Box-shadow-Icon icon tooltip tooltip-top"
            style={{
              ...controlStyle,
            }}
            data-tooltip={tooltip ? tooltip : label}
            ref={elemRef}
            onClick={() => {
              setShowSubPopup((prevShowSubPopup) => !prevShowSubPopup);
            }}
          ></div>
          <div
            className="shadow-cross-icon"
            title="Clear"
            onClick={() => {
              handleCrossClick();
            }}
          >
            <i className="icon-close p-1 text-[10px]"></i>
          </div>
        </div>
        {showSubPopup ? (
          <BoxShadowPopup
            nativeElement={elemRef?.current}
            outsideClickExcludeSelectors={[
              ".ddList",
              ".chrome-picker-container",
              ".Box-shadow-Icon",
              ".SubPopup",
            ]}
            onOutsideClick={() => setShowSubPopup(!showSubPopup)}
            label={label}
            radius={opt?.radius}
            {...restProps}
            onChange={(e) => onChange(e)}
          />
        ) : null}
      </div>
    </>
  );
};

export default BoxShadowWithPopUp;
