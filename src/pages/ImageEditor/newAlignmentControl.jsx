import { Title } from "@/components/ui/title";
import { Button } from "@/components/ui/button";
import { AlignMent } from "./constants/alignmentContants";

const AlignmentControl = ({
  canvas,
  history,
  canvasWidth,
  canvasHeight,
  activeObject,
  activeElemProps,
  setActiveElemProps,
  alignElementVertically,
  alignElementHorizontally,
}) => {
  const resetPositionState = () => {
    setActiveElemProps({
      ...activeElemProps,
      left: Number(activeObject.left),
      top: Number(activeObject.top),
    });
    history._historySaveAction();
  };

  const AlignItemInCanvas = (item) => {
    if (item.value === "Top-Left") {
      alignElementVertically("top", canvas, canvasHeight, activeObject);
      alignElementHorizontally("left", canvas, canvasWidth, activeObject);
    } else if (item.value === "Top-Center") {
      alignElementVertically("top", canvas, canvasHeight, activeObject);
      alignElementHorizontally("center", canvas, canvasWidth, activeObject);
    } else if (item.value === "Top-Right") {
      alignElementVertically("top", canvas, canvasHeight, activeObject);
      alignElementHorizontally("right", canvas, canvasWidth, activeObject);
    } else if (item.value === "Center-Left") {
      alignElementVertically("middle", canvas, canvasHeight, activeObject);
      alignElementHorizontally("left", canvas, canvasWidth, activeObject);
    } else if (item.value === "Center") {
      alignElementVertically("middle", canvas, canvasHeight, activeObject);
      alignElementHorizontally("center", canvas, canvasWidth, activeObject);
    } else if (item.value === "Center-Right") {
      alignElementVertically("middle", canvas, canvasHeight, activeObject);
      alignElementHorizontally("right", canvas, canvasWidth, activeObject);
    } else if (item.value === "Bottom-Left") {
      alignElementVertically("bottom", canvas, canvasHeight, activeObject);
      alignElementHorizontally("left", canvas, canvasWidth, activeObject);
    } else if (item.value === "Bottom-Center") {
      alignElementVertically("bottom", canvas, canvasHeight, activeObject);
      alignElementHorizontally("center", canvas, canvasWidth, activeObject);
    } else if (item.value === "Bottom-Right") {
      alignElementVertically("bottom", canvas, canvasHeight, activeObject);
      alignElementHorizontally("right", canvas, canvasWidth, activeObject);
    }
    resetPositionState();
  };
  return (
    <div className="flex flex-wrap align-center element-alignment mb-2">
      {AlignMent.map((item) => (
        <div className="flex-1 basis-[30%] mb-1" key={item.title}>
          <Title key={item.bId} title={item.title}>
            <Button
              type="button"
              variant="outline"
              size="icon-xs"
              className="cursor-pointer"
              onClick={() => {
                AlignItemInCanvas(item);
              }}
            >
              {item.icon}
            </Button>
          </Title>
        </div>
      ))}
    </div>
  );
};

export default AlignmentControl;
