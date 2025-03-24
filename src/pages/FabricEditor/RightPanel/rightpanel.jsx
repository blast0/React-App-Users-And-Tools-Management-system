import { Component } from "react";
import {
  ChevronDown,
  Circle,
  FileCode,
  Image,
  Images,
  ImageUp,
  MessageCircle,
  MessageSquareQuote,
  Plus,
  Proportions,
  Redo,
  Save,
  Shapes,
  Slash,
  Spline,
  Square,
  Trash,
  Triangle,
  TypeOutline,
  Undo,
  Download,
} from "lucide-react";
import {
  ACTIONS,
  // OPEN_OPTIONS,
  ADD_SHAPE_OPTIONS,
  // SAVE_OPTIONS,
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
import { DialogDropDown } from "../../../components/ui/custom/dialogDropDown";

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
    const OPEN_OPTIONS = [
      {
        name: "Open Image",
        icon: <ImageUp />,
        value: ACTIONS.IMAGE_DATA,
      },
      {
        name: "Open Template From File",
        icon: <FileCode />,
        value: ACTIONS.RAW_DATA,
      },
      {
        name: "Custom Size",
        icon: <Proportions />,
        value: ACTIONS.OTHERS,
      },
    ];
    const ADD_SHAPE_OPTIONS = [
      {
        name: "Add Image from library",
        icon: <Images />,
        value: ACTIONS.ADD_FROM_LIBRARY,
      },
      {
        name: "Add Image",
        tooltip: "Upload Image from Desktop",
        icon: <ImageUp />,
        value: ACTIONS.UPLOAD_SVG,
      },
      {
        name: "Add Triangle",
        icon: <Triangle />,
        value: ACTIONS.ADD_TRIANGLE,
      },
      {
        name: "Add Text",
        icon: <TypeOutline />,
        value: ACTIONS.ADD_TEXT,
      },
      {
        name: "Add Rectangle",
        icon: <Square />,
        value: ACTIONS.ADD_RECTANGLE,
      },
      {
        name: "Add Circle",
        icon: <Circle />,
        value: ACTIONS.ADD_CIRCLE,
      },
      {
        name: "Add Solid Line",
        icon: <Slash />,
        value: ACTIONS.ADD_LINE,
      },
      {
        name: "Add Arrow",
        icon: <Spline />,
        value: ACTIONS.ADD_QUADRATIC_CURVE,
      },
      {
        name: "Add Speech Bubble",
        icon: <MessageSquareQuote />,
        value: ACTIONS.ADD_SPEECH_BUBBLE,
      },
      {
        name: "Add Label",
        icon: <MessageCircle />,
        value: ACTIONS.ADD_SPEECH_LABEL,
      },
    ];

    const SAVE_OPTIONS = [
      {
        name: "Save Image",
        tooltip: "Save design as an image in Image Library",
        icon: "icon-image",
        value: ACTIONS.SAVE_PAGE_TO_LIBRARY,
        modalJsx: (
          <DialogDemo
            title="Download Image"
            theme={theme}
            trigger={
              <div className="flex items-center cursor-pointer gap-2">
                <Download />
                Download Image
              </div>
            }
            modalJsx={
              <>
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
              </>
            }
          />
        ),
      },
      {
        name: "Save My Template",
        tooltip: "Save Template design in my Library",
        icon: "icon-image-library",
        value: ACTIONS.UPLOAD_JSON,
        modalJsx: (
          <DialogDemo
            title="Image"
            theme={theme}
            trigger={
              <div className="flex items-center cursor-pointer gap-2">
                <Download />
                else
              </div>
            }
            modalJsx={<>Something Else here</>}
          />
        ),
      },
      {
        name: "Download Template",
        tooltip: "Download Template file",
        icon: "icon-fs-file",
        value: ACTIONS.DOWNLOAD_JSON,
        modalJsx: (
          <DialogDemo
            title="Image"
            theme={theme}
            trigger={
              <div className="flex items-center cursor-pointer gap-2">
                <Download />
                Download Template
              </div>
            }
            modalJsx={
              <>
                <Label className={`${theme === "dark" ? "text-white" : ""}`}>
                  Element Name:
                </Label>
                <Input
                  placeholder="Element Name"
                  value={selectedElementName ? selectedElementName : ""}
                  onChange={(e) => {
                    // const elem = canvas.getActiveObject();
                    // if (elem) {
                    //   elem.customName = true;
                    //   elem.changeName = e.target.value;
                    //   onChange(ACTIONS.ELEMENT_NAME, e);
                    // }
                  }}
                />
              </>
            }
          />
        ),
      },
    ];

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

          <DialogDropDown
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
          </DialogDropDown>
          {/* <DialogDemo
            title="Download Image"
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
                  defaultFileType={"jpeg"}
                  imageWidth={canvas?.width}
                  ratio={canvas?.width / canvas?.height}
                />
              </>
            }
          /> */}
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
