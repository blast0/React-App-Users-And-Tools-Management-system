import React from "react";
import {
  ADD_SHAPE_OPTIONS,
  DELETE_OPTIONS,
  OPEN_OPTIONS,
} from "../Constants/designer-icons";
import {
  ChevronDown,
  Image,
  Redo,
  Save,
  Shapes,
  Trash,
  Undo,
  ImageDown,
  FileDown,
} from "lucide-react";
import { createJSON } from "../helper-functions";
import { MenuButton } from "@/components/ui/custom/menu-button";
import { Button } from "@/components/ui/button";
import { Title } from "@/components/ui/title";
import { ACTIONS } from "../Constants/actions";
import { DialogBox } from "../../../components/DialogBox";
import SaveModalJsx from "../Templates/saveModal";
import { DialogDropDown } from "../../../components/ui/custom/dialogDropDown";
import SaveTemplateModal from "../Templates/saveTemplateModal";
import { sha256 } from "crypto-hash";

const CanvasControls = ({
  theme,
  onChange,
  jsonRef,
  canvas,
  handleJsonData,
}) => {
  const CANVAS_OPTIONS = [
    {
      name: "Save Image",
      value: ACTIONS.SAVE_PAGE_TO_LIBRARY,
      modalJsx: (
        <DialogBox
          title="Download Image"
          theme={theme}
          trigger={
            <div className="flex items-center cursor-pointer gap-2">
              <ImageDown />
              Download Image
            </div>
          }
          modalJsx={
            <SaveModalJsx
              self={this}
              thumbnailUrl={null}
              canvas={canvas}
              theme={theme}
              defaultFileName={"canvas"}
              defaultFileType={"jpeg"}
              imageWidth={canvas?.width}
              ratio={canvas?.width / canvas?.height}
            />
          }
        />
      ),
    },
    {
      name: "Save My Template",
      value: ACTIONS.UPLOAD_JSON,
      modalJsx: (
        <DialogBox
          title="Image"
          theme={theme}
          trigger={
            <div className="flex items-center h-[27px] cursor-pointer gap-2">
              <FileDown />
              Download Canvas JSON
            </div>
          }
          modalJsx={
            <>
              <SaveTemplateModal
                JsonNodes={{}}
                imgNodes={{}}
                allNames={[]}
                currImgDataUrl={null}
                onCancel={() => {}}
                onSave={async (fileName) => {
                  const temp = createJSON(this, canvas);
                  const hash = await sha256(JSON.stringify(temp));
                  temp.hash = hash;
                  const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
                    JSON.stringify(temp)
                  )}`;
                  const link = document.createElement("a");
                  link.href = jsonString;
                  if (fileName === "") link.download = "sample.json";
                  else link.download = fileName + ".json";
                  link.click();
                }}
                onOverWrite={() => {}}
              />
            </>
          }
        />
      ),
    },
  ];
  return (
    <div
      className={`flex flex-start gap-2 px-2 py-2 border-b-2 ${
        theme === "dark" ? "border-amber-50" : "border-b-fuchsia-500"
      } `}
    >
      <MenuButton
        title="Add Image"
        options={OPEN_OPTIONS}
        onSelect={(option) => {
          onChange(option.value);
        }}
      >
        <Button
          size="icon-xs"
          variant="outline"
          className="flex items-center gap-0"
        >
          <Image />
          <ChevronDown />
        </Button>
      </MenuButton>

      <input
        ref={jsonRef}
        className="hidden"
        type="file"
        accept="application/json"
        onChange={handleJsonData}
      />

      <DialogDropDown
        title="Save to cloud"
        options={CANVAS_OPTIONS}
        onSelect={(option) => onChange(option.value)}
      >
        <Button
          size="icon-xs"
          variant="outline"
          className="flex items-center gap-0"
        >
          <Save />
          <ChevronDown />
        </Button>
      </DialogDropDown>
      <MenuButton
        title="Add shapes"
        options={ADD_SHAPE_OPTIONS}
        onSelect={(option) => onChange(option.value)}
      >
        <Button
          size="icon-xs"
          variant="outline"
          className="flex items-center gap-0"
        >
          <Shapes />
          <ChevronDown />
        </Button>
      </MenuButton>

      <Title title={"Undo last action"}>
        <Button
          className="cursor-pointer"
          size="icon-xs"
          variant="outline"
          onClick={() => onChange(ACTIONS.UNDO_ACTION)}
        >
          <Undo />
        </Button>
      </Title>

      <Title title={"Redo last action"}>
        <Button
          className="cursor-pointer"
          size="icon-xs"
          variant="outline"
          onClick={() => onChange(ACTIONS.REDO_ACTION)}
        >
          <Redo />
        </Button>
      </Title>

      <MenuButton
        title="Reset page"
        options={DELETE_OPTIONS}
        onSelect={(option) => this.deleteHandler(option.value)}
      >
        <Button
          size="icon-xs"
          variant="outline"
          className="flex items-center gap-0"
        >
          <Trash />
          <ChevronDown />
        </Button>
      </MenuButton>
    </div>
  );
};

export default CanvasControls;
