import React, { Component } from "react";
import { fabric } from "fabric";
import { noop } from "lodash";

import {
  ACTIONS,
  RESET_ACTIVE_ELEM_PROPS,
  SPACE_EVENLY_OPTIONS,
  ArrowDirection,
  // FONT_STYLES,
  TEXT_ALIGNMENT,
  // FLIP_OPTIONS,
  SPEECH_TEXT_ALIGNMENT_OPTIONS,
  ALIGNMENT_OPTIONS,
} from "../../Constants/designer-constants";
import {
  createNewPoly,
  getNewID,
  handlePatternFit,
  scaleElementTofitCanvas,
} from "../../designer-helper-functions";
import {
  getFrontDropdownData,
  getArrowHeadData,
  updateActiveElement,
  handlePatternSize,
  handlePatternPosition,
  handleShadow,
  updateStyle,
  handleSvgElem,
  handleSelectedTool,
  createConfiguratorData,
  handleRectBorderRadius,
  makeGradient,
  setArrowHead,
  setfontfamily,
  handleFontStyle,
  setBubbleFontFamily,
  getStrokeColorControls,
} from "./activeElementHandlers";
// import ToolsConfiguration from "../../../blob-maker/tools-configuration";
// import { BlobMakerContextProvider } from "../../../blob-maker/blob-maker-context";
import Dropdown from "@/components/ui/custom/dropdown";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import ColorInput from "@/components/ui/custom/color-input";
import FileInput from "@/components/ui/custom/file-input";
import BoxShadowWithInput from "@/components/ui/custom/box-shadow";
// import { ConfiguratorCore } from "@/components/configurator/configurator";
import GradientContainer from "@/components/ui/custom/gradient-container";
import BorderRadius from "@/components/borderRadius";
import { Button } from "@/components/ui/button";
import { Title } from "@/components/ui/title";
import {
  SquareSquare,
  SquareArrowUp,
  SquareArrowLeft,
  SquareArrowDown,
  SquareArrowRight,
  SquareArrowUpLeft,
  SquareArrowUpRight,
  SquareArrowDownLeft,
  SquareArrowDownRight,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  FlipVertical2,
  FlipHorizontal2,
} from "lucide-react";

class ActiveElementControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeColorIndex: null,
      textBackgroundColor: "",
      error: {
        height: false,
        width: false,
      },
      objectHeight: 100,
      objectWidth: 100,
      patternAngle: props.canvas?.getActiveObject()?.patternAngle,
    };
    // refs
    this.colorBoxRef = React.createContext(null);
  }

  render() {
    const {
      canvas,
      onChange,
      siteColorsSettings,
      activeElementProps,
      elementsDropDownData,
      theme,
    } = this.props;
    const activeElement = canvas.getActiveObject();
    console.log(activeElement.left, activeElement.top);

    const ELEMENT_POSITION_OPTIONS = [
      {
        title: "Align Top Left",
        icon: <SquareArrowUpLeft />,
        bId: "Top-Left",
      },
      {
        title: "Align Top Center",
        icon: <SquareArrowUp />,
        bId: "Top-Center",
      },
      {
        title: "Align Top Right",
        icon: <SquareArrowUpRight />,
        bId: "Top-Right",
      },
      {
        title: "Align Center Left",
        icon: <SquareArrowLeft />,
        bId: "Center-Left",
      },
      {
        title: "Align Center Middle",
        icon: <SquareSquare />,
        bId: "Center",
      },
      {
        title: "Align Center Right",
        icon: <SquareArrowRight />,
        bId: "Center-Right",
      },
      {
        title: "Align Bottom Left",
        icon: <SquareArrowDownLeft />,
        bId: "Bottom-Left",
      },
      {
        title: "Align Bottom Center",
        icon: <SquareArrowDown />,
        bId: "Bottom-Center",
      },
      {
        title: "Align Bottom Right",
        icon: <SquareArrowDownRight />,
        bId: "Bottom-Right",
      },
    ];

    const ReplaceSpeechPolygon = (
      newPoints,
      newPolyLeft,
      newPolyTop,
      SpeechPoly,
      SpeechText,
      arrow,
      isLabel
    ) => {
      const polyColor = activeElement.polyColor;
      const polyBorderColor = activeElement.polyBorderColor;
      let newPoly = new fabric.Polygon(newPoints, {
        left: newPolyLeft,
        top: newPolyTop,
        fill: polyColor,
        strokeWidth: SpeechPoly.strokeWidth,
        strokeLineJoin: SpeechPoly.strokeLineJoin,
        stroke: polyBorderColor,
        scaleX: 1,
        scaleY: 1,
        name: "SpeechPoly",
        customType: "SpeechPoly",
        polyPadding: SpeechPoly.polyPadding,
        objectCaching: false,
        bubbleId: SpeechPoly.bubbleId,
        hasBorders: false,
        bubbleName: SpeechPoly.name,
        dirty: false,
        arrow,
        id: getNewID(),
      });

      const SpeechBubble = new fabric.Group([newPoly, SpeechText], {
        customType: "SpeechBubble",
        name: SpeechPoly.bubbleName,
        bubbleId: SpeechPoly.bubbleId,
        subTargetCheck: true,
        polyColor: SpeechPoly.fill,
        polyBorderColor: SpeechPoly.stroke,
        textBgColor: SpeechText?.backgroundColor,
        textColor: SpeechText?.fill,
        strokeSize: SpeechPoly?.strokeWidth,
        arrow,
        isLabel,
      });
      canvas.remove(SpeechPoly);
      canvas.remove(SpeechText);
      canvas.add(SpeechBubble);
      canvas.setActiveObject(SpeechBubble);
      canvas.renderAll();
      canvas.onHistory();
    };

    const handleSpeechArrowChange = (value) => {
      const SpeechText = activeElement._objects?.[1];
      const SpeechPoly = activeElement._objects?.[0];
      const isLabel = activeElement.isLabel;
      const strokeWidth = activeElement.strokeWidth;
      canvas.offHistory();
      activeElement.toActiveSelection();
      canvas.setActiveObject(SpeechPoly);
      let result = createNewPoly(strokeWidth, SpeechText, value);
      let newPoints = result.newPoints;
      let newPolyTop = result.newPolyTop - 2;
      let newPolyLeft = result.newPolyLeft - 2;
      canvas.renderAll();
      ReplaceSpeechPolygon(
        newPoints,
        newPolyLeft,
        newPolyTop,
        SpeechPoly,
        SpeechText,
        value,
        isLabel
      );
    };

    const patternImgController = (
      <div className="image-url-control w-[100%]">
        <Label className={`${theme === "dark" ? "text-white" : ""}`}>
          Fill Image:
        </Label>
        <FileInput
          containerClassName="w-full"
          value={!activeElementProps?.URL ? "" : activeElement?.URL}
          mimeTypeExclusions={["image/svg+xml"]}
          onChange={(url) => {
            onChange(ACTIONS.ADD_PATTERN, url);
          }}
          showImagePreview={true}
          onFileIconClick={() => {
            console.log("onFileClick");
          }}
        />
      </div>
    );

    const boxShadow = (
      <div className="shadow-control w-[48%]">
        <Label className={`${theme === "dark" ? "text-white" : ""}`}>
          Box Shadow:
        </Label>
        <BoxShadowWithInput
          showPreview={false}
          value={
            activeElement?.boxShadow
              ? activeElement?.boxShadow
              : "#606060 0px 0px 5px"
          }
          containerClass={"box-shadow"}
          showCopyClipboard={false}
          showSpread={false}
          showTypeButton={false}
          onChange={(e) => {
            handleShadow(e, this, fabric);
          }}
        />
      </div>
    );

    const rectBorderRadius = (
      <BorderRadius
        onChange={(x, y, lock) => {
          if (lock !== activeElementProps?.BorderLock) {
            activeElement.BorderLock = lock;
          }
          handleRectBorderRadius(x, y, this);
        }}
        lock={activeElementProps?.BorderLock}
        showLockBtn={true}
        showInputBoxes={true}
        defaultValues={[
          {
            label: "BorderX",
            min: 0,
            max: Math.min(
              activeElementProps?.width,
              activeElementProps?.height
            ),
            value: activeElementProps?.rx,
          },
          {
            label: "BorderY",
            min: 0,
            max: Math.min(
              activeElementProps?.width,
              activeElementProps?.height
            ),
            value: activeElementProps?.ry,
          },
        ]}
      />
      // <></>
    );

    const activeFontFamily = (
      <div className="font-family-control">
        <Label className={`${theme === "dark" ? "text-white" : ""}`}>
          Font Family:
        </Label>
        <Dropdown
          className={"bg-white"}
          placeHolder={activeElement?.fontFamily}
          value={activeElement?.fontFamily}
          options={getFrontDropdownData()}
          onValueChange={(value) => {
            setfontfamily(value, this);
          }}
        />
      </div>
    );

    const imageFit = (
      <div className="image-fit-control">
        <Label className={`${theme === "dark" ? "text-white" : ""}`}>
          {activeElementProps?.patternActive
            ? "Background Pattern Fit:"
            : activeElement?.type === "group"
            ? "Group Fit:"
            : activeElement?.type + " Fit:"}
        </Label>
        <Dropdown
          className={"bg-white"}
          placeHolder={
            activeElementProps?.patternActive
              ? activeElementProps.patternFit
              : activeElement?.imageFit
          }
          value={
            activeElementProps?.patternActive
              ? activeElementProps.patternFit
              : activeElementProps?.imageFit
          }
          options={[
            {
              name: activeElementProps?.patternActive
                ? "Show full Image"
                : "Show full Svg",
              value: activeElementProps?.patternActive
                ? "Show full Image"
                : "Show full Svg",
            },
            {
              name: activeElementProps?.patternActive
                ? "Fit Image"
                : "Fit Image to boundary",
              value: activeElementProps?.patternActive
                ? "Fit Image"
                : "Fit Image to boundary",
            },
          ]}
          onValueChange={(value) => {
            if (activeElement.patternActive) {
              const newProps = handlePatternFit(value, canvas, activeElement);
              updateActiveElement(newProps, this);
            } else {
              scaleElementTofitCanvas(
                value,
                canvas.height,
                canvas.width,
                activeElement
              );
              updateActiveElement({ imageFit: value }, this);
              canvas.renderAll();
            }
          }}
        />
      </div>
    );

    const activeArrowHead = (
      <>
        <Label className={`${theme === "dark" ? "text-white" : ""}`}>
          Arrow Head:
        </Label>
        <Dropdown
          className={"bg-white"}
          options={getArrowHeadData()}
          onValueChange={(value) => {
            setArrowHead(value, this);
          }}
        />
      </>
    );

    const activeBgColor = (
      <div className="color-control w-[48%]">
        <Label className={`${theme === "dark" ? "text-white" : ""}`}>
          {activeElement instanceof fabric.IText
            ? "Text Background:"
            : "Background Color:"}
        </Label>
        <ColorInput
          color={activeElementProps?.backgroundColor}
          onChange={(color) => {
            updateActiveElement({ backgroundColor: color }, this);
          }}
        />
      </div>
    );

    const activePattern = (
      <>
        <div className="pattern-controls w-[100%] flex flex-wrap gap-2">
          <div className="w-[48%]">
            <Label className={`${theme === "dark" ? "text-white" : ""}`}>
              Image Width:
            </Label>
            <Input
              type={"number"}
              value={
                parseInt(activeElementProps?.patternWidth)
                  ? parseInt(activeElementProps?.patternWidth)
                  : ""
              }
              onChange={(e) =>
                handlePatternSize(parseInt(e.target.value, 10), null, this)
              }
            />
          </div>
          <div className="w-[48%]">
            <Label className={`${theme === "dark" ? "text-white" : ""}`}>
              Image Height:
            </Label>
            <Input
              type={"number"}
              value={
                parseInt(activeElementProps?.patternHeight)
                  ? parseInt(activeElementProps?.patternHeight)
                  : ""
              }
              onChange={(e) => {
                handlePatternSize(null, parseInt(e.target.value, 10), this);
              }}
            />
          </div>
          <div className="w-[48%]">
            <Label className={`${theme === "dark" ? "text-white" : ""}`}>
              Image Left:
            </Label>
            <Input
              type={"number"}
              value={activeElementProps?.patternLeft}
              onChange={(e) =>
                handlePatternPosition(
                  parseInt(e.target.value),
                  null,
                  null,
                  this
                )
              }
            />
          </div>
          <div className="w-[48%]">
            <Label className={`${theme === "dark" ? "text-white" : ""}`}>
              Image Top:
            </Label>
            <Input
              type={"number"}
              value={activeElementProps?.patternTop}
              onChange={(e) =>
                handlePatternPosition(
                  null,
                  parseInt(e.target.value),
                  null,
                  this
                )
              }
            />
          </div>
        </div>
        <div className="w-full space-y-2">
          <Label className={`${theme === "dark" ? "text-white" : ""}`}>
            Angle:
          </Label>
          <Slider
            min={0}
            max={360}
            step={1}
            unit={"°"}
            value={[this.state.patternAngle ? this.state.patternAngle : 0]}
            onValueChange={(value) => {
              this.setState({ patternAngle: parseInt(value) });
              handlePatternPosition(null, null, parseInt(value), this);
            }}
          />
        </div>
      </>
    );

    const activeElementColor = (
      <div className="w-[48%]">
        <Label className={`${theme === "dark" ? "text-white" : ""}`}>
          {activeElement instanceof fabric.IText
            ? "Text Color:"
            : "Fill Color:"}
        </Label>
        <GradientContainer
          showSiteColorBtn={false}
          canChooseGradientType={true}
          value={
            activeElement?.fillGradient
              ? activeElement?.fillGradient
              : activeElementProps?.colors?.[0]
          }
          previewWidth={200}
          switchToColor={activeElement?.fillGradient ? false : true}
          showInPopup={false}
          opt={{ showInput: true }}
          isGradientAllowed={true}
          containerClass={"gradient"}
          onValueChange={(gradientText, configKey, rawConfig) => {
            if (rawConfig) {
              let grad = makeGradient(
                rawConfig,
                gradientText,
                activeElement?.height,
                activeElement?.width,
                this
              );
              if (rawConfig.colorStops.length < 2) {
                updateActiveElement({ colors: [grad] }, this);
                activeElement.set("fill", grad);
              } else {
                activeElement.set("fill", new fabric.Gradient(grad));
              }
            } else {
              updateActiveElement({ colors: [gradientText] }, this);
              activeElement.set("fill", gradientText);
            }
            activeElement.ElementColor = activeElementProps?.colors[0];
            canvas.renderAll();
          }}
        />
      </div>
    );

    const activeArrowColor = (
      <ColorInput
        label={"Arrow Color:"}
        color={activeElement?.fill}
        onChange={(color) => {
          activeElement.fill = color;
          activeElement._objects.forEach((el) => {
            if (el instanceof fabric.Triangle) {
              el.set("fill", color);
            }
            el.set("stroke", color);
          });
          canvas.renderAll();
          updateActiveElement({ fill: color }, this);
        }}
      />
    );

    const activeBorderColor = (
      <div className="">
        <Label className={`${theme === "dark" ? "text-white" : ""}`}>
          {activeElement instanceof fabric.IText
            ? "Text Border:"
            : activeElement instanceof fabric.Line
            ? "Line Color:"
            : "Border Color:"}
        </Label>
        <ColorInput
          color={activeElement?.stroke}
          onChange={(color) => {
            activeElement.set("stroke", color);
            updateActiveElement({ stroke: color }, this);
          }}
        />
      </div>
    );

    const activeBorderThickness = (
      <div className="">
        <Label className={`${theme === "dark" ? "text-white" : ""}`}>
          Border Thickness:
        </Label>
        <Input
          type={"number"}
          value={activeElementProps?.strokeWidth}
          onChange={(e) => {
            if (e.target.value >= 0) {
              updateActiveElement(
                {
                  strokeWidth: Number(e.target.value),
                },
                this
              );
            }
          }}
        />
      </div>
    );

    const activeRadius = (
      <div className="border-control">
        <Input
          type={"number"}
          label={"Radius"}
          value={activeElementProps?.radius}
          onChange={(e) => {
            updateActiveElement(
              {
                radius: Number(e.target.value) < 0 ? 0 : Number(e.target.value),
              },
              this
            );
          }}
        />
      </div>
    );

    const objectColors = (
      <div className="object-colors mt-2">
        <div>
          {activeElement && activeElement instanceof fabric.IText
            ? "Text Color"
            : "Color(s)"}
        </div>
        <div className="svg-colors-group">
          {/* <ConfiguratorCore
            containerClass="svg-colors-group-Configurator"
            data={createConfiguratorData(this)}
            onResponse={(data) => {
              updateStyle(data, this);
            }}
          /> */}
        </div>
        <div>
          {Object.keys(getStrokeColorControls(this)).length
            ? "StrokeColor(s)"
            : ""}
        </div>
        <div className="svg-colors-group">
          {/* <ConfiguratorCore
            containerClass="svg-stroke-colors-Configurator"
            data={getStrokeColorControls(this)}
            onResponse={(data) => {
              updateStyle(data, this);
            }}
          /> */}
        </div>
      </div>
    );

    const AlignElement = (
      <div className="w-[48%]">
        <Label className={`${theme === "dark" ? "text-white" : ""}`}>
          Alignment:
        </Label>
        <div className="flex flex-wrap align-start">
          {ELEMENT_POSITION_OPTIONS.map((item) => (
            <div className="mb-1 flex-1 basis-[30%]" key={item.title}>
              <Title key={item.bId} title={item.title}>
                <Button
                  type="button"
                  variant="outline"
                  size="icon-xs"
                  className="cursor-pointer w-[45px] h-[40px]"
                  onClick={() => {
                    if (item.bId === "Top-Left") {
                      onChange(ACTIONS.ALIGN_ELEMENT_VERTICALLY, "top");
                      onChange(ACTIONS.ALIGN_ELEMENT_HORIZONTALLTY, "left");
                    } else if (item.bId === "Top-Center") {
                      onChange(ACTIONS.ALIGN_ELEMENT_VERTICALLY, "top");
                      onChange(ACTIONS.ALIGN_ELEMENT_HORIZONTALLTY, "center");
                    } else if (item.bId === "Top-Right") {
                      onChange(ACTIONS.ALIGN_ELEMENT_VERTICALLY, "top");
                      onChange(ACTIONS.ALIGN_ELEMENT_HORIZONTALLTY, "right");
                    } else if (item.bId === "Center-Left") {
                      onChange(ACTIONS.ALIGN_ELEMENT_VERTICALLY, "middle");
                      onChange(ACTIONS.ALIGN_ELEMENT_HORIZONTALLTY, "left");
                    } else if (item.bId === "Center") {
                      onChange(ACTIONS.ALIGN_ELEMENT_VERTICALLY, "middle");
                      onChange(ACTIONS.ALIGN_ELEMENT_HORIZONTALLTY, "center");
                    } else if (item.bId === "Center-Right") {
                      onChange(ACTIONS.ALIGN_ELEMENT_VERTICALLY, "middle");
                      onChange(ACTIONS.ALIGN_ELEMENT_HORIZONTALLTY, "right");
                    } else if (item.bId === "Bottom-Left") {
                      onChange(ACTIONS.ALIGN_ELEMENT_VERTICALLY, "bottom");
                      onChange(ACTIONS.ALIGN_ELEMENT_HORIZONTALLTY, "left");
                    } else if (item.bId === "Bottom-Center") {
                      onChange(ACTIONS.ALIGN_ELEMENT_VERTICALLY, "bottom");
                      onChange(ACTIONS.ALIGN_ELEMENT_HORIZONTALLTY, "center");
                    } else if (item.bId === "Bottom-Right") {
                      onChange(ACTIONS.ALIGN_ELEMENT_VERTICALLY, "bottom");
                      onChange(ACTIONS.ALIGN_ELEMENT_HORIZONTALLTY, "right");
                    }
                  }}
                >
                  {item.icon}
                </Button>
              </Title>
            </div>
          ))}
        </div>
      </div>
    );

    const groupArrowColor = (
      <div className="flex gap-2">
        {AlignElement}
        <div className="w-[48%] flex flex-col gap-3">
          <ColorInput
            label={"Arrow Line:"}
            color={activeElementProps?.stroke}
            onChange={(color) => {
              activeElement.item(0).set("stroke", color);
              updateActiveElement({ stroke: color }, this);
            }}
          />
          <ColorInput
            label={
              activeElement?._objects?.length === 3
                ? "Right Arrow Head:"
                : "Arrow Head:"
            }
            color={activeElementProps.colors?.[1]}
            onChange={(color) => {
              activeElement.item(1).set("fill", color);
              let newColors = activeElementProps.colors;
              newColors[1] = color;
              updateActiveElement({ colors: newColors }, this);
            }}
          />
          {activeElement?._objects?.length === 3 && (
            <ColorInput
              label={"Left Arrow Head:"}
              color={activeElementProps.colors?.[2]}
              onChange={(color) => {
                activeElement.item(2).set("fill", color);
                let newColors = activeElementProps.colors;
                newColors[2] = color;
                updateActiveElement({ colors: newColors }, this);
              }}
            />
          )}
        </div>
      </div>
    );

    const SpaceElementsEvenly = activeElement instanceof
      fabric.ActiveSelection && (
      <div className="space-evenly mt-2">
        <Label className={`${theme === "dark" ? "text-white" : ""}`}>
          Space Objects Evenly
        </Label>
        <div className="flex gap-0.5">
          {SPACE_EVENLY_OPTIONS.map((item) => (
            <Title key={item.bId} title={item.title}>
              <Button
                type="button"
                variant="outline"
                size="icon-xs"
                onClick={() => {
                  onChange(ACTIONS.SPACE_WITHIN_GROUP_EVENLY, item.bId);
                }}
              >
                <i className={item.icon} />
              </Button>
            </Title>
          ))}
        </div>
      </div>
    );

    const FONT_STYLES = [
      {
        title: "Bold Toggle",
        value: "bold",
        icon: <Bold />,
      },
      {
        title: "Italic Toggle",
        value: "italic",
        icon: <Italic />,
      },
      {
        title: "Strikethrough Toggle",
        value: "strikethrough",
        icon: <Strikethrough />,
      },
      {
        title: "Underline Toggle",
        value: "underline",
        icon: <Underline />,
      },
    ];

    const TextStyles = (
      <div className="text-style">
        <Label className={`mb-1 ${theme === "dark" ? "text-white" : ""}`}>
          Text Style:
        </Label>
        <div className="flex gap-0.5">
          {FONT_STYLES.map((item) => (
            <Title key={item.value} title={item.title}>
              <Button
                type="button"
                variant="outline"
                size="icon-xs"
                onClick={() => {
                  handleFontStyle(item.value, activeElement, canvas);
                }}
              >
                {item.icon}
              </Button>
            </Title>
          ))}
        </div>
      </div>
    );

    const FLIP_OPTIONS = [
      {
        title: "Flip Text Horizontally",
        icon: <FlipHorizontal2 />,
        value: "x",
      },
      {
        title: "Flip Text Vertically",
        icon: <FlipVertical2 />,
        value: "y",
      },
    ];

    const FlipElement = (
      <div className="Flip-Controls">
        <Label className={`mb-1 ${theme === "dark" ? "text-white" : ""}`}>
          Flip Element:
        </Label>
        <div className="flex gap-0.5">
          {FLIP_OPTIONS.map((item) => (
            <Title key={item.value} title={item.title}>
              <Button
                type="button"
                variant="outline"
                size="icon-xs"
                onClick={() => {
                  if (item.value === "x")
                    activeElement.set("flipX", !activeElement.flipX);
                  else activeElement.set("flipY", !activeElement.flipY);
                  canvas.renderAll();
                }}
              >
                {item.icon}
              </Button>
            </Title>
          ))}
        </div>
      </div>
    );

    const AlignText = (
      <div className="text-alignment">
        <Label className={`${theme === "dark" ? "text-white" : ""}`}>
          Text Alignment:
        </Label>
        <div className="flex gap-0.5">
          {TEXT_ALIGNMENT.map((item) => (
            <Title key={item.bId} title={item.title}>
              <Button
                type="button"
                variant="outline"
                size="icon-xs"
                onClick={() => {
                  activeElement.set({
                    textAlign: item.bId,
                  });
                  canvas.renderAll();
                }}
              >
                <i className={item.icon} />
              </Button>
            </Title>
          ))}
        </div>
      </div>
    );

    const AlignWithinElement =
      activeElement instanceof fabric.ActiveSelection ? (
        <div className="align-within-Group-Vertically">
          <Label className={`${theme === "dark" ? "text-white" : ""}`}>
            Object Horizontal Alignment
          </Label>
          <div className="flex gap-0.5">
            {ALIGNMENT_OPTIONS.map((item) => (
              <Title key={item.bId} title={item.title}>
                <Button
                  type="button"
                  variant="outline"
                  size="icon-xs"
                  onClick={() => {
                    onChange(
                      ACTIONS.ALIGN_WITHIN_GROUP_HORIZONTALLTY,
                      item.bId
                    );
                  }}
                >
                  <i className={item.icon} />
                </Button>
              </Title>
            ))}
          </div>
        </div>
      ) : null;

    const TextControls =
      activeElement?.type === "text" || activeElement?.type === "i-text" ? (
        <div className="font-controls flex flex-wrap">
          {AlignElement}
          <div className="flex-col gap-2">
            {!activeElement?.patternActive ? activeElementColor : null}
            {activeBgColor}
          </div>
          <div className="flex gap-1">
            {TextStyles}
            {FlipElement}
          </div>
          {AlignText}
          {!activeElement?.patternActive ? boxShadow : null}
          {activeFontFamily}
          {activeBorderThickness}
          {activeBorderColor}
          {patternImgController}
          {activeElement?.patternActive ? activePattern : null}
          {activeElementProps?.patternActive ? imageFit : null}
        </div>
      ) : null;

    const CircleControls =
      activeElement?.type === "circle" ? (
        <div className="cirlce-controls">
          {AlignElement}
          <div className="w-[48%] flex flex-col gap-3">
            {activeRadius}
            {activeBorderThickness}
          </div>
          {!activeElement?.patternActive ? activeElementColor : null}
          {activeBorderColor}
          {activeBgColor}
          {activeElementProps?.patternActive ? imageFit : null}
          {!activeElement?.patternActive ? boxShadow : null}
          {FlipElement}
          {patternImgController}
          {activeElement?.patternActive ? activePattern : null}
        </div>
      ) : null;

    const SpeechBubbleControls = (
      <div className="bubble-controls">
        {activeElement instanceof fabric.Group ? (
          <>
            <div className="color-control">
              <ColorInput
                label="Fill Color:"
                color={activeElementProps?.polyColor}
                onChange={(color) => {
                  activeElement._objects[0].set({
                    fill: color,
                  });
                  activeElement.polyColor = color;
                  activeElement._objects[1].set({
                    backgroundColor: color,
                  });
                  activeElement.textBgColor = color;
                  canvas.renderAll();
                  updateActiveElement(
                    { polyColor: color, textBgColor: color },
                    this
                  );
                }}
              />
            </div>
            <div className="color-control">
              <ColorInput
                label="Border Color:"
                color={activeElementProps?.polyBorderColor}
                onChange={(color) => {
                  activeElement._objects[0].set({
                    stroke: color,
                  });
                  activeElement.polyBorderColor = color;
                  canvas.renderAll();
                  updateActiveElement({ polyBorderColor: color }, this);
                }}
              />
            </div>
            {AlignElement}
            <div className="flex flex-col w-[48%] gap-2">
              <ColorInput
                label="Text Color:"
                color={activeElementProps?.textColor}
                onChange={(color) => {
                  activeElement._objects[1].set({
                    fill: color,
                  });
                  activeElement.textColor = color;
                  canvas.renderAll();
                  updateActiveElement({ textColor: color }, this);
                }}
              />
              {/* </div>
            <div className="border-control"> */}
              <Input
                type={"number"}
                label={"Border Size:"}
                value={activeElementProps.strokeSize}
                onChange={(e) => {
                  if (parseInt(e.target.value) >= 0) {
                    activeElement._objects[0].set({
                      strokeWidth: parseInt(e.target.value),
                    });
                    canvas.offHistory();
                    const objects = activeElement._objects;
                    objects[0].top +=
                      parseInt(activeElement.strokeSize - e.target.value) / 2;
                    objects[0].left +=
                      parseInt(activeElement.strokeSize - e.target.value) / 2;
                    const group = new fabric.Group(objects, {
                      name: activeElement.name,
                      bubbleId: activeElement.bubbleId,
                      subTargetCheck: true,
                      hasControls: false,
                      customType: "SpeechBubble",
                      left: activeElement.left,
                      top: activeElement.top,
                      polyColor: activeElement.fill,
                      polyBorderColor: activeElement.polyBorderColor,
                      textBgColor: activeElement.textBgColor,
                      textColor: activeElement.textColor,
                      strokeSize: e.target.value,
                    });
                    canvas.remove(activeElement);
                    canvas.add(group);
                    canvas.setActiveObject(group);
                    canvas.renderAll();
                    canvas.onHistory();
                    updateActiveElement({ strokeSize: e.target.value }, this);
                  }
                }}
              />
            </div>
            <div className="speech-arrow-dropdown half">
              <Label className={`${theme === "dark" ? "text-white" : ""}`}>
                Speech Arrow:
              </Label>
              <Dropdown
                className={"bg-white"}
                placeHolder={activeElement?.arrow}
                value={activeElement?.arrow}
                options={ArrowDirection}
                onValueChange={(value) => {
                  handleSpeechArrowChange(value);
                }}
              />
            </div>
            <div className="border-control">
              <Input
                type={"number"}
                label={"Text Padding:"}
                min={0}
                value={activeElement._objects?.[1]?.polyPadding}
                onChange={(e) => {
                  if (e.target.value >= 0) {
                    const SpeechText = activeElement._objects?.[1];
                    const SpeechPoly = activeElement._objects?.[0];
                    const arrow = activeElement?.arrow;
                    const isLabel = activeElement.isLabel;
                    const strokeWidth = activeElement.strokeWidth;
                    canvas.offHistory();
                    activeElement.toActiveSelection();
                    canvas.setActiveObject(SpeechPoly);
                    SpeechText.polyPadding = e.target.value;
                    SpeechPoly.polyPadding = e.target.value;
                    let result = createNewPoly(strokeWidth, SpeechText, arrow);
                    let newPoints = result.newPoints;
                    let newPolyTop = result.newPolyTop - 2;
                    let newPolyLeft = result.newPolyLeft - 2;
                    canvas.renderAll();
                    ReplaceSpeechPolygon(
                      newPoints,
                      newPolyLeft,
                      newPolyTop,
                      SpeechPoly,
                      SpeechText,
                      arrow,
                      isLabel
                    );
                  }
                }}
              />
            </div>
            <div className="speech-alignment">
              <Label className={`${theme === "dark" ? "text-white" : ""}`}>
                Text Alignment:
              </Label>
              <div className="flex gap-0.5">
                {SPEECH_TEXT_ALIGNMENT_OPTIONS.map((item) => (
                  <Title key={item.bId} title={item.title}>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon-xs"
                      onClick={() => {
                        activeElement._objects[1].set({
                          textAlign: item.bId,
                        });
                        canvas.renderAll();
                      }}
                    >
                      <i className={item.icon} />
                    </Button>
                  </Title>
                ))}
              </div>
            </div>
            <div className="border-control">
              <Label className={`${theme === "dark" ? "text-white" : ""}`}>
                Font Family:
              </Label>
              <Dropdown
                className={"bg-white"}
                placeHolder={activeElement?._objects[1]?.fontFamily}
                value={activeElement?._objects[1]?.fontFamily}
                options={getFrontDropdownData().sort()}
                onValueChange={(value) => {
                  setBubbleFontFamily(value, activeElement, canvas);
                }}
              />
            </div>
          </>
        ) : null}
      </div>
    );

    const RandomBlobControls = (
      // <BlobMakerContextProvider>
      //   {activeElement?.type === "Image" &&
      //   activeElement?.subType === "RandomShape" ? (
      //     <ToolsConfiguration
      //       defaultTool={activeElement?.selectedTool}
      //       showDropdown={true}
      //       hideHeightWidth={true}
      //       shouldCreateSvgOnMount={false}
      //       getSvgElem={(svg, randomShapePath, states) =>
      //         handleSvgElem(svg, randomShapePath, states, this)
      //       }
      //       getSelectedTool={(selectedTool) =>
      //         handleSelectedTool(selectedTool, activeElement, this)
      //       }
      //       setSvgProps={{
      //         selectedTool: activeElement?.selectedTool,
      //         states: activeElement?.states,
      //         svgPath: activeElement?.randomShapePath,
      //       }}
      //     />
      //   ) : null}
      // </BlobMakerContextProvider>
      <></>
    );

    const RectangleControls =
      activeElement?.type === "rect" ? (
        <div className="rect-controls flex-wrap flex gap-2">
          {AlignElement}
          <div className="flex flex-col justify-between mb-1 w-[48%]">
            {activeBorderThickness}
            {activeBorderColor}
          </div>
          {!activeElement?.patternActive ? activeElementColor : null}
          {!activeElement?.patternActive ? boxShadow : null}
          {rectBorderRadius}
          {patternImgController}
          {activeElementProps?.patternActive ? activePattern : null}
          {activeElementProps?.patternActive ? imageFit : null}
          {/* {FlipElement} */}
        </div>
      ) : null;

    const TriangleControls =
      activeElement?.type === "triangle" ? (
        <div className="triangle-controls">
          {AlignElement}
          <div className="flex flex-col gap-3">
            {!activeElement?.patternActive ? activeElementColor : null}
            {activeBorderColor}
          </div>
          {activeBgColor}
          {activeBorderThickness}
          {!activeElement?.patternActive ? boxShadow : null}
          {FlipElement}
          {patternImgController}
          {activeElement?.patternActive ? activePattern : null}
          {activeElementProps?.patternActive ? imageFit : null}
        </div>
      ) : null;

    const LineControls =
      activeElement && activeElement instanceof fabric.Line ? (
        <div className="line-controls">
          {activeArrowHead}

          <div className="flex flex-col gap-3">
            {activeBorderThickness}
            {activeBorderColor}
          </div>
        </div>
      ) : null;

    const QuadraticArrowControls =
      activeElement && activeElement?.customType === "Quadratic" ? (
        <div className="quad-controls">{activeArrowColor}</div>
      ) : null;

    const ArrowControls =
      activeElement && activeElement?.customType === "arrow" ? (
        <div>{groupArrowColor}</div>
      ) : null;

    const SvgControls =
      activeElement?.type === "group" && !activeElement?.customType ? (
        <div className="flex flex-wrap gap-2">
          {AlignElement}
          <div className="w-[48%] flex flex-col gap-3">
            {imageFit}
            {FlipElement}
          </div>
          {objectColors}
        </div>
      ) : null;

    const AnnotationControls = activeElement?.bubbleId
      ? SpeechBubbleControls
      : null;

    return (
      <>
        {elementsDropDownData.length > 0 ? (
          <>
            {/* {AlignElement} */}
            {AlignWithinElement}
            {SpaceElementsEvenly}
          </>
        ) : null}
        {SvgControls}
        {TextControls}
        {LineControls}
        {ArrowControls}
        {CircleControls}
        {TriangleControls}
        {RectangleControls}
        {AnnotationControls}
        {RandomBlobControls}
        {QuadraticArrowControls}
      </>
    );
  }
}

ActiveElementControls.defaultProps = {
  canvasCore: null,
  activeElementProps: Object.assign({}, RESET_ACTIVE_ELEM_PROPS),
  onActiveElementPropsChange: noop,
  onChange: noop,
};

export default ActiveElementControls;
