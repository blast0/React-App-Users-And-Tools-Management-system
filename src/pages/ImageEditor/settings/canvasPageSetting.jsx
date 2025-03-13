import React from "react";
import { Button } from "@/components/ui/button";
import { MenuButton } from "@/components/ui/custom/menu-button";
import { ADD_SHAPE_OPTIONS, SAVE_OPTIONS } from "../constants/constants";
import { ChevronDown, Plus, Save, Undo, Redo, Trash } from "lucide-react";
import { addImgFromURL, GetSvg } from "../helpers/canvasHelpers";

const CanvasPageSetting = ({
  canvas,
  history,
  theme,
  handleRightPanelUpdates,
  imagetoLibInputRef,
  svgInputRef,
}) => {
  const onSelectImg = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", async () => {
        if (reader.result.includes("data:image")) {
          addImgFromURL(canvas, reader.result);
        }
      });
      reader.readAsDataURL(e.target.files[0]);
    }
    e.target.value = "";
  };

  const onSelectSvg = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", async () => {
        if (reader.result.includes("<svg")) {
          const mySvg = await GetSvg(reader.result);
          canvas.add(mySvg);
          canvas.centerObject(mySvg);
          canvas.renderAll();
        }
      });
      reader.readAsText(e.target.files[0]);
    }
    //clear filereader to detect same file again if not changed on mutliple attempts
    e.target.value = "";
  };
  return (
    <div
      className={`flex flex-start gap-2 px-2 py-2 border-b-2 ${
        theme === "dark" ? "border-amber-50" : "border-b-fuchsia-500"
      } `}
    >
      <input
        ref={svgInputRef}
        style={{
          display: "none",
        }}
        type="file"
        accept=".svg"
        onChange={(e) => onSelectSvg(e)}
      />
      <input
        ref={imagetoLibInputRef}
        style={{
          display: "none",
        }}
        type="file"
        accept=".png, .jpg, .jpeg, .webp, .gif"
        onChange={(e) => onSelectImg(e)}
      />
      <MenuButton
        title="Save to cloud"
        className="cursor-pointer"
        options={ADD_SHAPE_OPTIONS}
        onSelect={(option) => {
          if (option.value === "image") {
            imagetoLibInputRef.current.click();
          } else if (option.value === "svg") {
            svgInputRef.current.click();
          } else {
            handleRightPanelUpdates(canvas, option.value, {});
          }
        }}
      >
        <Button
          size="icon-xs"
          variant="outline"
          className="flex items-center gap-0"
        >
          <Plus />
          <ChevronDown />
        </Button>
      </MenuButton>
      <MenuButton
        title="Save to cloud"
        options={SAVE_OPTIONS}
        onSelect={(option) => handleRightPanelUpdates(canvas, option.value, {})}
      >
        <Button
          size="icon-xs"
          variant="outline"
          className="flex items-center gap-0 cursor-pointer"
        >
          <Save />
          <ChevronDown />
        </Button>
      </MenuButton>
      <Button
        size="icon-xs"
        variant="outline"
        className="flex items-center gap-0 cursor-pointer"
        onClick={() => {
          history?.undo();
        }}
      >
        <Undo />
      </Button>
      <Button
        size="icon-xs"
        variant="outline"
        className="flex items-center gap-0"
        onClick={() => {
          history?.redo();
        }}
      >
        <Redo />
      </Button>
      <Button
        size="icon-xs"
        variant="outline"
        className="flex items-center gap-0"
      >
        <Trash />
      </Button>
    </div>
  );
};

export default CanvasPageSetting;
