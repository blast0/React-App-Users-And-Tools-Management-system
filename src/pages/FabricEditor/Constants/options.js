import { ACTIONS } from "./actions";

export const SAVE_OPTIONS = [
  {
    name: "Save Image",
    tooltip: "Save design as an image in Image Library",
    icon: "icon-image",
    value: ACTIONS.SAVE_PAGE_TO_LIBRARY,
  },
  {
    name: "Save My Template",
    tooltip: "Save Template design in my Library",
    icon: "icon-image-library",
    value: ACTIONS.UPLOAD_JSON,
  },
  {
    name: "Download Template",
    tooltip: "Download Template file",
    icon: "icon-fs-file",
    value: ACTIONS.DOWNLOAD_JSON,
  },
];
