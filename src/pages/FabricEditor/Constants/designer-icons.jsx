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
} from "lucide-react";
import { ACTIONS } from "./designer-constants";

export const TEXT_ALIGNMENT = [
  {
    title: "Align Left",
    icon: "icon-align-left",
    bId: "left",
  },
  {
    title: "Align Center",
    icon: "icon-align-center",
    bId: "center",
  },
  {
    title: "Align Right",
    icon: "icon-align-right",
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
