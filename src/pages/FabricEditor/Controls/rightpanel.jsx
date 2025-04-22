import { Component } from "react";
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
  Pointer,
} from "lucide-react";

import { ACTIONS } from "../Constants/actions";
import ActiveElementControls from "./activeElementControls";
import GradientContainer from "@/components/ui/custom/gradient-container";
import { createJSON } from "../helper-functions";
import { MenuButton } from "@/components/ui/custom/menu-button";
import { Button } from "@/components/ui/button";
import { Title } from "@/components/ui/title";
import { Input } from "@/components/ui/input";
import Dropdown from "@/components/ui/custom/dropdown";
import { Label } from "@/components/ui/label";
import { DialogBox } from "../../../components/DialogBox";
import SaveModalJsx from "../Templates/saveModal";
import { DialogDropDown } from "../../../components/ui/custom/dialogDropDown";
import {
  OPEN_OPTIONS,
  ADD_SHAPE_OPTIONS,
  DELETE_OPTIONS,
  getObjectTypeIcon,
} from "../Constants/designer-icons";
import SaveTemplateModal from "../Templates/saveTemplateModal";
import { sha256 } from "crypto-hash";
import { fabric } from "fabric";
import { makeGradient } from "./activeElementHandlers";

class Rightpanel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleJsonData = this.props.handleJsonData.bind(this);
  }

  deleteHandler(option) {
    if (option === "clear-page") {
      this.props.onChange(ACTIONS.CLEAR_PAGE);
    } else if (option === "selected-item") {
      this.props.onChange(ACTIONS.DELETE_SELECTION);
    }
  }

  render() {
    const {
      activeElementProps,
      showStyleEditor,
      onChange,
      elementIds,
      canvas,
      selectedElementName,
      elementsDropDownData,
      jsonRef,
      onCanvasActive,
      siteColorsSettings,
      selectedElementId,
      pageHeight,
      pageWidth,
      pageBgColor,
      theme,
    } = this.props;
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

    const activeElement = canvas?.getActiveObject();
    const activeElementType = activeElement?.type;
    return (
      <div
        className="DesignerConfigPanel w-[310px] pr-2"
        onClick={() => {
          var activeElement = document.activeElement;
          if (activeElement === document.body) {
            onCanvasActive(true);
          } else {
            onCanvasActive(false);
          }
        }}
      >
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
            onChange={this.handleJsonData}
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
        <div
          className="designer-style-container slim-scroll"
          style={{
            height: "calc(100vh - 112px)",
            paddingBottom: "100px",
            overflowY: "auto",
            padding: "10px",
          }}
        >
          <div className="page-controls mt-2">
            <div className="page-dimensions-control gap-2 flex flex-wrap">
              <div className="w-[48%]">
                <Label className={`${theme === "dark" ? "text-white" : ""}`}>
                  Canvas Width:
                </Label>
                <Input
                  type={"number"}
                  value={pageWidth}
                  onChange={(e) => {
                    onChange(
                      ACTIONS.CHANGE_PAGE_DIMENSIONS,
                      {
                        name: "width",
                        val: Number(e.target.value),
                      },
                      this
                    );
                  }}
                />
              </div>
              <div className="w-[48%]">
                <Label className={`${theme === "dark" ? "text-white" : ""}`}>
                  Canvas Height:
                </Label>
                <Input
                  type={"number"}
                  value={pageHeight}
                  onChange={(e) => {
                    onChange(
                      ACTIONS.CHANGE_PAGE_DIMENSIONS,
                      {
                        name: "height",
                        val: Number(e.target.value),
                      },
                      this
                    );
                  }}
                />
              </div>
            </div>
            <div className="w-[48%]">
              <Label className={`${theme === "dark" ? "text-white" : ""}`}>
                Canvas Background:
              </Label>
              <GradientContainer
                showSiteColorBtn={false}
                canChooseGradientType={true}
                value={pageBgColor}
                previewWidth={200}
                switchToColor={canvas?.fillGradient ? false : true}
                showInPopup={false}
                opt={{ showInput: true }}
                isGradientAllowed={false}
                containerClass={"gradient"}
                onValueChange={(gradientText, configKey, rawConfig) => {
                  if (rawConfig?.colorStops?.length > 1) {
                    let grad = makeGradient(rawConfig, gradientText, canvas);
                    const cangradient = new fabric.Gradient(grad);
                    console.log(cangradient);
                    // canvas.set("backgroundColor", new fabric.Gradient(grad));
                  } else {
                    onChange(ACTIONS.CHANGE_PAGE_BACKGROUND, gradientText);
                  }
                }}
              />
            </div>
          </div>
          {activeElementType !== "activeSelection" &&
          activeElementType !== "polygon" &&
          activeElementType !== "textbox" &&
          activeElement ? (
            <div className="elementName">
              <Label className={`${theme === "dark" ? "text-white" : ""}`}>
                Element Name:
              </Label>
              <Input
                placeholder="Element Name"
                value={selectedElementName ? selectedElementName : ""}
                onChange={(e) => {
                  const elem = canvas.getActiveObject();
                  if (elem) {
                    elem.customName = true;
                    elem.changeName = e.target.value;
                    onChange(ACTIONS.ELEMENT_NAME, e);
                  }
                }}
              />
            </div>
          ) : null}
          <div className="element-selector">
            <Label className={`${theme === "dark" ? "text-white" : ""}`}>
              Selected Object:
            </Label>
            <Dropdown
              className={"bg-white"}
              placeholder={
                selectedElementName ? (
                  <div className="flex gap-2 items-center">
                    {getObjectTypeIcon(activeElement)}
                    <Pointer />
                    {selectedElementName}
                  </div>
                ) : (
                  activeElement?.name
                )
              }
              value={
                selectedElementId ? selectedElementId : activeElement?.name
              }
              options={elementsDropDownData}
              onValueChange={(value) => {
                const selected = elementsDropDownData.find(
                  (el) => el.value === value
                );
                onChange(ACTIONS.UPDATE_ACTIVE_ELEMENT, {
                  id: selected.value,
                  name: selected.nameValue,
                });
              }}
            />
          </div>
          {showStyleEditor ? (
            <ActiveElementControls
              theme={theme}
              siteColorsSettings={siteColorsSettings}
              canvas={canvas}
              elementIds={elementIds}
              activeElementProps={activeElementProps}
              selectedElementName={selectedElementName}
              elementsDropDownData={elementsDropDownData}
              onActiveElementPropsChange={(props) => {
                onChange(ACTIONS.CHANGE_ACTIVE_ELEMENT_PROPS, props);
              }}
              onChange={(action, data) => {
                onChange(action, data);
              }}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

Rightpanel.defaultProps = {
  elementsDropDownData: [],
};

export default Rightpanel;
