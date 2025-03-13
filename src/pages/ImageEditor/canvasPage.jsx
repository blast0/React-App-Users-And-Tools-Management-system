import React, { useEffect, useRef, useState } from "react";
import {
  handleRightPanelUpdates,
  keydownListener,
  // makeGradient,
} from "./helpers/canvasHelpers";
import { Input } from "@/components/ui/input";
import VaulDrawer from "../../components/ui/drawer";
import { Canvas, FabricObject, Gradient } from "fabric";
import CanvasPageSetting from "./settings/canvasPageSetting";
import ActiveElementSetting from "./settings/activeElementSetting";
import "../../styles/canvasPage.css";
import GradientContainer from "../../components/ui/custom/gradient-container";
import { applyColorOrGradient } from "./helpers/canvasHelpers";
import CanvasHistory from "./history";

const CanvasApp = ({ theme = "light" }) => {
  const svgInputRef = useRef(null);
  const imagetoLibInputRef = useRef(null);
  const canvasRef = useRef(null);
  const reactiveHistory = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [history, setHistory] = useState(null);
  const [canvasWidth, setCanvasWidth] = useState(1450);
  const [canvasHeight, setCanvasHeight] = useState(800);
  const [canvasBgColor, setCanvasBgColor] = useState("#9BF6FF45");
  const [canvasBgGradient, setCanvasBgGradient] = useState(null);
  const [activeElemProps, setActiveElemProps] = useState(null);

  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas = new Canvas(canvasRef.current, {
        enableRetinaScaling: true,
        imageSmoothingEnabled: true,
        selectionLineWidth: 2,
        width: canvasWidth,
        height: canvasHeight,
        backgroundColor: canvasBgColor,
      });
      initCanvas.preserveObjectStacking = true;
      initCanvas.controlsAboveOverlay = true;
      FabricObject.prototype.noScaleCache = false;
      const history = new CanvasHistory(initCanvas);
      reactiveHistory.value = history;
      initCanvas.renderAll();
      setCanvas(history.canvas);
      setHistory(history);

      return () => {
        initCanvas.dispose();
        document.removeEventListener("keydown", keydownListener);
      };
    }
  }, []);

  useEffect(() => {
    if (canvas) {
      canvas.setHeight(canvasHeight);
      canvas.setWidth(canvasWidth);
      canvas.renderAll();
    }
  }, [canvasWidth, canvasHeight, canvas]);

  document.addEventListener("keydown", (e) => keydownListener(e, canvas));
  const updateActiveElementProps = (e) => {
    const activeObject = e.selected[0];
    setActiveElemProps({
      left: activeObject.left,
      top: activeObject.top,
      fill: !activeObject.gradientText
        ? activeObject.fill
        : activeObject.gradientText,
    });
  };

  canvas?.on("selection:created", (e) => {
    updateActiveElementProps(e);
  });
  canvas?.on("selection:updated", (e) => {
    updateActiveElementProps(e);
  });

  canvas?.on("selection:cleared", () => {
    setActiveElemProps(null);
  });

  canvas?.on("object:modified", () => {
    console.log("object:modified");
    const activeObject = canvas?.getActiveObject();
    setActiveElemProps({
      left: activeObject.left,
      top: activeObject.top,
      fill: !activeObject.gradientText
        ? activeObject.fill
        : activeObject.gradientText,
    });
  });

  canvas?.on("object:changed", () => {
    console.log("object:changed");
  });

  const activeObject = canvas?.getActiveObject();
  const canvasBackGround = canvasBgGradient ? canvasBgGradient : canvasBgColor;

  return (
    <div
      id="popmenu-container"
      className={`Image-Editor p-[10px] ${
        theme === "dark" ? "bg-[#333232]" : "bg-[#ffffff]"
      }`}
    >
      <VaulDrawer
        theme={theme}
        headerChildren={
          <CanvasPageSetting
            theme={theme}
            canvas={canvas}
            handleRightPanelUpdates={handleRightPanelUpdates}
            imagetoLibInputRef={imagetoLibInputRef}
            svgInputRef={svgInputRef}
            history={history}
          />
        }
        bodyChildren={
          <>
            <div className="flex gap-2 flex-wrap">
              <div className="inputContainer">
                <Input
                  theme={theme}
                  type={"number"}
                  label={"Canvas Width:"}
                  value={canvasWidth}
                  onChange={(e) => setCanvasWidth(Number(e.target.value))}
                />
              </div>
              <div className="inputContainer">
                <Input
                  theme={theme}
                  type={"number"}
                  label={"Canvas Height:"}
                  value={canvasHeight}
                  onChange={(e) => setCanvasHeight(Number(e.target.value))}
                />
              </div>
              <div className="inputContainer">
                <GradientContainer
                  theme={theme}
                  canChooseGradientType={true}
                  value={canvasBackGround}
                  previewWidth={200}
                  switchToColor={!canvasBgGradient}
                  label={"Canvas Background:"}
                  opt={{ showInput: true }}
                  isGradientAllowed={true}
                  onValueChange={(gradientText, key, config) => {
                    applyColorOrGradient(
                      gradientText,
                      config,
                      canvas,
                      setCanvasBgGradient,
                      setCanvasBgColor
                    );
                  }}
                />
              </div>
              <ActiveElementSetting
                history={history}
                canvas={canvas}
                theme={theme}
                activeElemProps={activeElemProps}
                activeObject={activeObject}
                setActiveElemProps={setActiveElemProps}
                canvasWidth={canvasWidth}
                canvasHeight={canvasHeight}
              />
            </div>
          </>
        }
      />
      <div
        className={`${
          theme === "dark"
            ? "bg-[#737373] "
            : "bg-[#ffffff] border-2 border-dashed border-red-500"
        }`}
        style={{
          width: canvasWidth,
          height: canvasHeight,
        }}
      >
        <canvas
          className={`${
            theme === "dark" ? "border-2 border-dashed border-white" : ""
          }`}
          id={"my-canvas"}
          ref={canvasRef}
        />
      </div>
    </div>
  );
};

export default CanvasApp;
