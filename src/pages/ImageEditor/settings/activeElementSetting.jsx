import {
  alignElementHorizontally,
  alignElementVertically,
  makeGradient,
} from "../helpers/canvasHelpers";
import { Gradient } from "fabric";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import GradientContainer from "../../../components/ui/custom/gradient-container";
import AlignmentControl from "../newAlignmentControl";

const ActiveElementSetting = ({
  canvas,
  theme,
  activeElemProps,
  activeObject,
  setActiveElemProps,
  canvasWidth,
  canvasHeight,
  history,
}) => {
  console.log(activeElemProps?.fill);
  return (
    <>
      {activeElemProps ? (
        <>
          <div className="inputContainer w-[48%]">
            <GradientContainer
              theme={theme}
              canChooseGradientType={true}
              value={activeElemProps.fill}
              previewWidth={200}
              switchToColor={activeObject?.fillGradient ? false : true}
              showInPopup={false}
              label={"Fill Color:"}
              opt={{ showInput: true }}
              isGradientAllowed={true}
              containerClass={"gradient"}
              onValueChange={(gradientText, configKey, rawConfig) => {
                console.log(gradientText);
                if (rawConfig) {
                  let grad = makeGradient(
                    rawConfig,
                    gradientText,
                    activeObject?.height,
                    activeObject?.width,
                    canvas
                  );
                  if (rawConfig.colorStops.length < 2) {
                    activeObject.set("fill", grad);
                    activeObject.set("gradientText", null);
                  } else {
                    activeObject.set("fill", new Gradient(grad));
                    activeObject.set("gradientText", gradientText);
                  }
                  canvas.renderAll();
                  history._historySaveAction();
                }
              }}
            />
          </div>
          <div className="flex flex-col gap-2 w-[48%]">
            <Input
              theme={theme}
              type={"number"}
              label={"Selection Left:"}
              value={activeElemProps?.left}
              onChange={(e) => {
                activeObject.left = Number(e.target.value);
                activeObject.setCoords();
                setActiveElemProps({
                  left: Number(e.target.value),
                  top: activeElemProps.top,
                });
                canvas?.requestRenderAll();
              }}
            />
            <Input
              theme={theme}
              type={"number"}
              label={"Selection Top:"}
              value={activeElemProps?.top}
              onChange={(e) => {
                activeObject.top = Number(e.target.value);
                activeObject.setCoords();
                setActiveElemProps({
                  left: activeElemProps.left,
                  top: Number(e.target.value),
                });
                canvas?.requestRenderAll();
              }}
            />
          </div>
          <div className="element-alignment mb-2 w-[48%]">
            <Label className={`mb-1 ${theme === "dark" ? "text-white" : ""}`}>
              Alignment:
            </Label>
            <AlignmentControl
              canvas={canvas}
              history={history}
              canvasWidth={canvasWidth}
              canvasHeight={canvasHeight}
              activeObject={activeObject}
              activeElemProps={activeElemProps}
              setActiveElemProps={setActiveElemProps}
              alignElementHorizontally={alignElementHorizontally}
              alignElementVertically={alignElementVertically}
            />
          </div>
        </>
      ) : null}
    </>
  );
};

export default ActiveElementSetting;
