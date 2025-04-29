import { fabric } from "fabric";
import { Component } from "react";
import { Pointer } from "lucide-react";

import { ACTIONS } from "../Constants/actions";
import { getObjectTypeIcon } from "../Constants/designer-icons";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Dropdown from "@/components/ui/custom/dropdown";
import GradientContainer from "@/components/ui/custom/gradient-container";

import CanvasControls from "./canvasControls";
import { makeGradient } from "./activeElementHandlers";
import ActiveElementControls from "./activeElementControls";

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

    const activeElement = canvas?.getActiveObject();
    const activeElementType = activeElement?.type;
    console.log(showStyleEditor);
    return (
      <div
        className="DesignerConfigPanel w-[310px]"
        onClick={() => {
          var activeElement = document.activeElement;
          if (activeElement === document.body) {
            onCanvasActive(true);
          } else {
            onCanvasActive(false);
          }
        }}
      >
        <CanvasControls
          theme={theme}
          onChange={onChange}
          jsonRef={jsonRef}
          canvas={canvas}
          handleJsonData={this.handleJsonData}
        />
        <div className="designer-style-container slim-scroll h-[calc(100vh-112px)] pb-[100px] overflow-y-auto p-[10px]">
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
