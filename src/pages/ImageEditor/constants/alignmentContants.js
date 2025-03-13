import {
  ArrowTopLeft,
  ArrowTopRight,
  ArrowBottomLeft,
  ArrowBottomRight,
  ArrowCenter,
} from "./customIconSvgs";
import {
  AlignCenterVerticallyTop,
  AlignCenterVerticallyEnd,
  AlignEndVertically,
  AlignStartVertically,
} from "./customIconSvgs";

export const AlignMent = [
  {
    title: "Align Top Left",
    icon: ArrowTopLeft,
    value: "Top-Left",
  },
  {
    title: "Align Top Center",
    icon: AlignCenterVerticallyTop,
    value: "Top-Center",
  },
  {
    title: "Align Top Right",
    icon: ArrowTopRight,
    value: "Top-Right",
  },
  {
    title: "Align Center Left",
    icon: AlignStartVertically,
    value: "Center-Left",
  },
  {
    title: "Align Center",
    icon: ArrowCenter,
    value: "Center",
  },
  {
    title: "Align Center Right",
    icon: AlignEndVertically,
    value: "Center-Right",
  },
  {
    title: "Align Bottom Left",
    icon: ArrowBottomLeft,
    value: "Bottom-Left",
  },
  {
    title: "Align Bottom",
    icon: AlignCenterVerticallyEnd,
    value: "Bottom-Center",
  },
  {
    title: "Align Bottom Right",
    icon: ArrowBottomRight,
    value: "Bottom-Right",
  },
];
