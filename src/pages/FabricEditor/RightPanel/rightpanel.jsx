import { Component } from "react";
import {
  ChevronDown,
  Image,
  Plus,
  Redo,
  Save,
  Trash,
  Undo,
} from "lucide-react";
import {
  ACTIONS,
  OPEN_OPTIONS,
  ADD_SHAPE_OPTIONS,
  SAVE_OPTIONS,
  DELETE_OPTIONS,
} from "../Constants/designer-constants";
import ActiveElementControls from "./ActiveElementControls/activeElementControls";
import { getObjectTypeIcon } from "../designer-helper-functions";
import { MenuButton } from "@/components/ui/custom/menu-button";
import { Button } from "@/components/ui/button";
import { Title } from "@/components/ui/title";
import { Input } from "@/components/ui/input";
import Dropdown from "@/components/ui/custom/dropdown";
import { Label } from "@/components/ui/label";
import { DialogDemo } from "../../../components/DialogBox";
import SaveModalJsx from "./Templates/saveModal";

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
      theme,
    } = this.props;
    const activeElementType = canvas?.getActiveObject()?.type;
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
          {/* 
          <MenuButton
            title="Save to cloud"
            options={SAVE_OPTIONS}
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
          </MenuButton> */}
          <DialogDemo
            theme={theme}
            trigger={
              <Button
                size="icon-xs"
                variant="outline"
                className="flex items-center gap-0"
              >
                <Save />
              </Button>
            }
            modalJsx={
              <>
                <SaveModalJsx
                  self={this}
                  thumbnailUrl={null}
                  canvas={canvas}
                  // theme={theme}
                  defaultFileName={"canvas"}
                  defaultFileType={"jpg"}
                  imageWidth={canvas?.width}
                  ratio={canvas?.width / canvas?.height}
                />
              </>
            }
          />
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
              <Plus />
              <ChevronDown />
            </Button>
          </MenuButton>

          <Title title={"Undo last action"}>
            <Button
              size="icon-xs"
              variant="outline"
              onClick={() => onChange(ACTIONS.UNDO_ACTION)}
            >
              <Undo />
            </Button>
          </Title>

          <Title title={"Redo last action"}>
            <Button
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
            height: "calc(100vh - 100px)",
            paddingBottom: "100px",
            overflowY: "auto",
            paddingRight: "10px",
          }}
        >
          <div className="page-dimensions mt-2">
            <div className="page-dimensions-control">
              <></>
            </div>
          </div>
          {activeElementType !== "activeSelection" &&
          activeElementType !== "polygon" &&
          activeElementType !== "textbox" &&
          canvas?.getActiveObject() ? (
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
                  <p
                    style={{ margin: 0, display: "flex", alignItems: "center" }}
                  >
                    <i
                      className={
                        "icon-common mr-2 " +
                        getObjectTypeIcon(canvas?.getActiveObject())
                      }
                    ></i>{" "}
                    {selectedElementName}
                  </p>
                ) : (
                  canvas?.getActiveObject()?.name
                )
              }
              value={
                selectedElementId
                  ? selectedElementId
                  : canvas?.getActiveObject()?.name
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
