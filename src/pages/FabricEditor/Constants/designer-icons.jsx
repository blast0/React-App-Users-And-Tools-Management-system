import {
  Wand,
  Bold,
  Circle,
  FlipHorizontal2,
  FlipVertical2,
  Images,
  ImageUp,
  Italic,
  MessageCircle,
  MessageSquareQuote,
  Proportions,
  Slash,
  Spline,
  Square,
  SquareArrowDown,
  SquareArrowDownLeft,
  SquareArrowDownRight,
  SquareArrowLeft,
  SquareArrowRight,
  SquareArrowUp,
  SquareArrowUpLeft,
  SquareArrowUpRight,
  SquareSquare,
  Strikethrough,
  Triangle,
  FileUp,
  TypeOutline,
  Underline,
  LaptopMinimal,
  AlignRight,
  AlignLeft,
  AlignCenter,
  Image,
  Component,
  RectangleHorizontal,
} from "lucide-react";
import { ACTIONS } from "./actions";

export const TEXT_ALIGNMENT = [
  {
    title: "Align Left",
    icon: <AlignLeft />,
    bId: "left",
  },
  {
    title: "Align Center",
    icon: <AlignCenter />,
    bId: "center",
  },
  {
    title: "Align Right",
    icon: <AlignRight />,
    bId: "right",
  },
];

export const DELETE_OPTIONS = [
  {
    name: "Clear Page",
    icon: <LaptopMinimal />,
    value: ACTIONS.CLEAR_PAGE,
  },
  {
    name: "Selected Item",
    icon: <Wand />,
    value: ACTIONS.CLEAR_SELECTED_ITEM,
  },
];

export const OPEN_OPTIONS = [
  {
    name: "Open Image",
    icon: <ImageUp />,
    value: ACTIONS.IMAGE_DATA,
  },
  {
    name: "Open Template From File",
    icon: <FileUp />,
    value: ACTIONS.RAW_DATA,
  },
  {
    name: "Custom Size",
    icon: <Proportions />,
    value: ACTIONS.OTHERS,
  },
];

export const ADD_SHAPE_OPTIONS = [
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

export const ELEMENT_POSITION_OPTIONS = [
  {
    title: "Align Top Left",
    icon: <SquareArrowUpLeft size={30} />,
    bId: "Top-Left",
  },
  {
    title: "Align Top Center",
    icon: <SquareArrowUp size={30} />,
    bId: "Top-Center",
  },
  {
    title: "Align Top Right",
    icon: <SquareArrowUpRight size={30} />,
    bId: "Top-Right",
  },
  {
    title: "Align Center Left",
    icon: <SquareArrowLeft size={30} />,
    bId: "Center-Left",
  },
  {
    title: "Align Center Middle",
    icon: <SquareSquare size={30} />,
    bId: "Center",
  },
  {
    title: "Align Center Right",
    icon: <SquareArrowRight size={30} />,
    bId: "Center-Right",
  },
  {
    title: "Align Bottom Left",
    icon: <SquareArrowDownLeft size={30} />,
    bId: "Bottom-Left",
  },
  {
    title: "Align Bottom Center",
    icon: <SquareArrowDown size={30} />,
    bId: "Bottom-Center",
  },
  {
    title: "Align Bottom Right",
    icon: <SquareArrowDownRight size={30} />,
    bId: "Bottom-Right",
  },
];

export const FONT_STYLES = [
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

export const FLIP_OPTIONS = [
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

export const getObjectTypeIcon = (elem) => {
  if (elem?.customType) {
    switch (elem?.customType) {
      case "svg":
        return (
          <svg
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <title>file_type_svg</title>
              <path
                d="M7.674,14.488a2.218,2.218,0,1,0,0,3.137H24.326a2.218,2.218,0,1,0,0-3.137Z"
                style="fill:#ffffff;stroke:#000000;stroke-width:3.73000001907349px"
              ></path>
              <path
                d="M11.222,9.06A2.218,2.218,0,1,0,9,11.278L20.778,23.052A2.218,2.218,0,1,0,23,20.834Z"
                style="fill:#ffffff;stroke:#000000;stroke-width:3.73000001907349px"
              ></path>
              <path
                d="M17.568,7.73a2.218,2.218,0,1,0-3.137,0V24.382a2.218,2.218,0,1,0,3.137,0Z"
                style="fill:#ffffff;stroke:#000000;stroke-width:3.73000001907349px"
              ></path>
              <path
                d="M23,11.278A2.218,2.218,0,1,0,20.778,9.06L9,20.834a2.218,2.218,0,1,0,2.218,2.218Z"
                style="fill:#ffffff;stroke:#000000;stroke-width:3.73000001907349px"
              ></path>
              <path
                d="M7.674,14.488a2.218,2.218,0,1,0,0,3.137H24.326a2.218,2.218,0,1,0,0-3.137Z"
                style="fill:#ffffff"
              ></path>
              <path
                d="M11.222,9.06A2.218,2.218,0,1,0,9,11.278L20.778,23.052A2.218,2.218,0,1,0,23,20.834Z"
                style="fill:#ffffff"
              ></path>
              <path
                d="M17.568,7.73a2.218,2.218,0,1,0-3.137,0V24.382a2.218,2.218,0,1,0,3.137,0Z"
                style="fill:#ffffff"
              ></path>
              <path
                d="M23,11.278A2.218,2.218,0,1,0,20.778,9.06L9,20.834a2.218,2.218,0,1,0,2.218,2.218Z"
                style="fill:#ffffff"
              ></path>
              <path d="M2,16.056H30V25.95a4.035,4.035,0,0,1-4.106,4.106H6.106A4.035,4.035,0,0,1,2,25.95Z"></path>
              <path
                d="M6.2,23.045A3.628,3.628,0,1,1,12.4,20.48H10.27A1.5,1.5,0,1,0,7.7,21.541h0a1.6,1.6,0,0,0,1.062.441h0a4.118,4.118,0,0,1,2.566,1.063h0a3.628,3.628,0,1,1-6.194,2.565H7.264A1.5,1.5,0,1,0,9.83,24.55h0a1.948,1.948,0,0,0-1.063-.44h0A4.465,4.465,0,0,1,6.2,23.045Z"
                style="fill:#fff"
              ></path>
              <path
                d="M19.651,16.852,17.085,29.24H14.96L12.4,16.852H14.52l1.5,7.255,1.5-7.255Z"
                style="fill:#fff"
              ></path>
              <path
                d="M23.28,21.983h3.628v3.628h0a3.628,3.628,0,1,1-7.257,0h0V20.48h0a3.628,3.628,0,0,1,7.257,0H24.783a1.5,1.5,0,1,0-3.005,0v5.13h0a1.5,1.5,0,0,0,3.005,0h0v-1.5h-1.5V21.983Z"
                style="fill:#fff"
              ></path>
            </g>
          </svg>
        );
      case "Quadratic":
        return "icon-quad-arrow";
      case "customGroup":
        return <Component />;
      case "SpeechBubble":
        return elem?.isLabel ? "icon-engage" : "icon-random-communication";
      default:
        return "";
    }
  } else
    switch (elem?.type) {
      case "i-text":
        return <TypeOutline />;
      case "rect":
        return elem?.patternActive ? <Image /> : <RectangleHorizontal />;
      case "triangle":
        return elem?.patternActive ? <Image /> : <Triangle />;
      case "circle":
        return elem?.patternActive ? <Image /> : <Circle />;
      case "line":
        return elem.strokeDashArray.length === 0
          ? "icon-minus"
          : "icon-more-horizon";
      case "group":
        return <Component />;
      case "Image":
        return elem?.selectedTool ? "icon-blob" : <Image />;
      default:
        return "";
    }
};

export const getCanvasElementNames = (canvas) => {
  if (!canvas) return [];

  let data = [];
  const elements = canvas?.getObjects();
  if (elements?.length) {
    data = elements.map((elem) => {
      if (elem.type === "i-text") {
        if (elem.changedName === true) {
          return {
            name: (
              <div className="flex gap-2 items-center">
                {getObjectTypeIcon(elem)}
                {elem.customName === undefined || elem.customName === ""
                  ? elem.text
                  : elem.customName}
              </div>
            ),
            value: elem.id,
            nameValue:
              elem.name === undefined || elem.name === ""
                ? elem.text
                : elem.name,
          };
        } else {
          return {
            name: (
              <div className="flex gap-2 items-center">
                {getObjectTypeIcon(elem)}
                {elem.text.length > 30 ? elem.text.slice(0, 30) : elem.text}
              </div>
            ),
            value: elem.id,
            nameValue: elem.name
              ? elem.name
              : elem.text.length > 30
              ? elem.text.slice(0, 30)
              : elem.text,
          };
        }
      } else {
        if (elem?.id) {
          return {
            name: (
              <div className="flex gap-2 items-center">
                {getObjectTypeIcon(elem)}
                {elem.name}
              </div>
            ),
            nameValue: elem.name,
            value: elem.id,
          };
        } else {
          return {
            name: (
              <div className="flex gap-2 items-center">
                {getObjectTypeIcon(elem)}
                {elem.name}
              </div>
            ),
            value: elem.bubbleId,
            nameValue: elem.name,
          };
        }
      }
    });
    return data;
  } else {
    return [];
  }
};
