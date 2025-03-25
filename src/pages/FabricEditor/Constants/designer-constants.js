export const ACTIONS = {
  ADD_CIRCLE: "circle",
  ADD_DASHED_LINE: "dashed_line",
  ADD_FROM_LIBRARY: "add-from-library",
  ADD_FROM_DESKTOP: "add-from-desktop",
  ADD_LINE: "solid_line",
  ADD_PATTERN: "pattern",
  ADD_QUADRATIC_CURVE: "quadratic_curve",
  ADD_RECTANGLE: "rectangle",
  ADD_RANDOM_SHAPE: "random_shape",
  ADD_SPEECH_BUBBLE: "speech_bubble",
  ADD_SPEECH_LABEL: "speech_label",
  ADD_TEXT: "add-text",
  ADD_TRIANGLE: "triangle",
  ALIGN_ELEMENT_HORIZONTALLTY: "align-horizontally",
  ALIGN_ELEMENT_VERTICALLY: "align-vertically",
  ALIGN_WITHIN_GROUP_HORIZONTALLTY: "align-within-group-horizontally",
  ALIGN_WITHIN_GROUP_VERTICALLY: "align-within-group-vertically",
  CHANGE_ACTIVE_ELEMENT_PROPS: "change-active-element-props",
  CHANGE_PAGE_BACKGROUND: "change-page-bakground",
  CHANGE_PAGE_BACKGROUND_IMAGE: "change-page-bakground-image",
  CHANGE_PAGE_DIMENSIONS: "change-page-dimensions",
  CHANGE_PATTERN_SIZE: "change_pattern_size",
  CHANGE_PATTERN_POSITION: "change_pattern_position",
  CLEAR_PAGE: "clear-page",
  CLEAR_SELECTED_ITEM: "selected-item",
  DOWNLOAD_JSON: "download-json",
  DOWNLOAD_PAGE: "download-page",
  DOWNLOAD_SELECTION: "download-selection",
  DELETE_SELECTION: "delete-selection",
  ELEMENT_NAME: "element_name",
  IMAGE_DATA: "img_data",
  MAKE_BLANK: "make-blank",
  PATTERN_IMG_HEIGHT: "PATTERN_IMG_HEIGHT",
  PATTERN_IMG_ANGLE: "pattern_img_angle",
  RAW_DATA: "raw_data",
  REDO_ACTION: "redo-action",
  SAVE_PAGE_TO_LIBRARY: "save-page-to-library",
  SAVE_SELECTION_TO_LIBRARY: "save-selection-to-library",
  SHOW_GLOBAL_TEMPLATES: "show-global-templates",
  SHOW_SAVED_TEMPLATES: "show-saved-templates",
  SPACE_WITHIN_GROUP_EVENLY: "space-within-group-evenly",
  UNDO_ACTION: "undo-action",
  UPDATE_ACTIVE_ELEMENT: "update-active-element",
  UPLOAD_JSON: "upload-file",
  UPLOAD_IMAGE: "image",
  UPLOAD_SVG: "svg",
  OTHERS: "others",
};

export const pageSizes = [
  {
    name: "Google Ads - Square and Rectangle Ads",
    items: [
      {
        name: "Small Square",
        width: 200,
        height: 200,
        desc: "Desktop	Minimal, less intrusive size.",
      },
      {
        name: "Square",
        width: 250,
        height: 250,
        desc: "Compact and versatile size.",
      },
      {
        name: "Medium Rectangle",
        width: 300,
        height: 250,
        desc: "Common for text and display ads.",
      },
      {
        name: "Large Rectangle",
        width: 336,
        height: 280,
        desc: "Ideal for display ads with more space.",
      },
    ],
  },
  {
    name: "Google Ads - Leaderboard Ads",
    items: [
      {
        name: "Leaderboard",
        width: 728,
        height: 90,
        desc: "Great for placements above navigation bars",
      },
      {
        name: "Large Leaderboard",
        width: 970,
        height: 90,
        desc: "A larger alternative to standard leaderboards.",
      },
      {
        name: "Banner",
        width: 468,
        height: 60,
        desc: "Smaller than the leaderboard, suitable for narrow spaces.",
      },
      {
        name: "Mobile Leaderboard",
        width: 320,
        height: 50,
        desc: "Optimized for mobile devices.",
      },
    ],
  },
  {
    name: "Google Ads - Skyscraper Ads",
    items: [
      {
        name: "Skyscraper",
        width: 120,
        height: 600,
        desc: "Narrow vertical ads suitable for sidebars.",
        device: "Desktop",
      },
      {
        name: "Wide Skyscraper",
        width: 160,
        height: 600,
        desc: "Wider option for more ad content.",
        device: "Desktop",
      },
      {
        name: "Half-Page",
        width: 300,
        height: 600,
        desc: "Very impactful due to its large size.",
        device: "Desktop & Mobile",
      },
      {
        name: "Portrait",
        width: 300,
        height: 1050,
        desc: "Premium, tall ad format for high visibility.",
        device: "Desktop",
      },
    ],
  },
  {
    name: "Instagram - Image Posts",
    items: [
      {
        name: "Square Post",
        width: 1080,
        height: 1080,
        desc: "The most common Instagram image format.",
        device: "Desktop",
      },
      {
        name: "Portrait Post",
        width: 1080,
        height: 1350,
        desc: "Taller format ideal for showcasing more content vertically.",
        device: "Desktop & Mobile",
      },
      {
        name: "Landscape Post",
        width: 1080,
        height: 608,
        desc: "Wide-format images, less commonly used but great for cinematic views.",
        device: "Desktop & Mobile",
      },
    ],
  },
  {
    name: "Instagram -IGTV",
    items: [
      {
        name: "Video Thumbnail",
        width: 1080,
        height: 1080,
        desc: "Thumbnails for IGTV videos, center the focal point as edges may be cropped.",
        device: "Desktop",
      },
      {
        name: "IGTV Video",
        width: 1080,
        height: 1920,
        desc: "Full-screen vertical videos for IGTV.",
        device: "Desktop",
      },
    ],
  },
  {
    name: "Blog Cover image - WordPress",
    items: [
      {
        name: "Featured Image",
        width: 1200,
        height: 628,
        desc: "Standard WordPress size for featured images; optimized for social sharing.",
        device: "Desktop",
      },
      {
        name: "Thumbnail Image",
        width: 150,
        height: 150,
        desc: "Used for blog post lists or widgets.",
        device: "Desktop & Mobile",
      },
      {
        name: "Preview Image",
        width: 300,
        height: 200,
        desc: "Used in blog grids or recent post widgets.",
        device: "Desktop & Mobile",
      },
      {
        name: "Header Image",
        width: 1280,
        height: 720,
        desc: "Images for separating sections or categories in the blog layout.",
        device: "Desktop & Mobile",
      },
    ],
  },
  {
    name: "Blog Cover image - Blogger (Google)",
    items: [
      {
        name: "Header Image",
        width: 1600,
        height: 900,
        desc: "Used for custom blog headers.",
        device: "Desktop",
      },
      {
        name: "Post Image",
        width: 1200,
        height: 675,
        desc: "Standard post images for in-article use.",
        device: "Desktop",
      },
      {
        name: "Cover Image",
        width: 1400,
        height: 1120,
        desc: "Displayed at the top of the article and resized for thumbnails.",
        device: "Desktop",
      },
    ],
  },
  {
    name: "Blog Cover image - Social Media Sharing",
    isCollapsed: true,
    items: [
      {
        name: "Facebook Shared Link",
        width: 1200,
        height: 630,
        desc: "Optimized for Facebook link previews.",
        device: "Desktop",
      },
      {
        name: "Pinterest Pin Image",
        width: 1000,
        height: 1500,
        desc: "Ideal for sharing blog covers or infographics on Pinterest.",
        device: "Desktop",
      },
      {
        name: "LinkedIn Post Image",
        width: 1200,
        height: 627,
        desc: "Best for sharing blog links on LinkedIn.",
        device: "Desktop",
      },
    ],
  },
  {
    name: "Blog Cover image - Email Marketing",
    items: [
      {
        name: "Blog Feature in Email",
        width: 600,
        height: 300,
        desc: "Standard size for email marketing headers showcasing blog content.",
        device: "Desktop",
      },
      {
        name: "LinkedIn Post Image",
        width: 1200,
        height: 627,
        desc: "Best for sharing blog links on LinkedIn.",
        device: "Desktop",
      },
    ],
  },
];

export const EXTRA_ELEMENT_PROPS = [
  "selectable",
  "editable",
  "id",
  "name",
  "type",
  "url",
  "URL",
  "fillGradient",
  "imageFit",
  "customType",
  "patternLeft",
  "patternTop",
  "patternWidth",
  "patternHeight",
  "patternFit",
  "patternAngle",
  "patternActive",
  "subType",
  "states",
  "randomShapePath",
  "selectedTool",
  "patternSourceCanvas",
  "bubbleId",
  "objectCaching",
  "pathOffset",
  "polyPadding",
  "lastHeight",
  "lockMovementX",
  "lockMovementY",
  "hasControls",
  "polyColor",
  "polyBorderColor",
  "textBgColor",
  "textColor",
  "strokeSize",
  "customName",
  "bubbleName",
  "boxShadow",
  "BorderX",
  "BorderY",
  "BorderLock",
  "gradient",
  "height",
  "width",
  "groupId",
  "pointsAdded",
];

export const ARROW_DIRECTION = [
  {
    name: "Top",
    value: "Top",
  },
  {
    name: "Left",
    value: "Left",
  },
  {
    name: "Right",
    value: "Right",
  },
  {
    name: "Bottom",
    value: "Bottom",
  },
];

export const ALIGNMENT_OPTIONS = [
  {
    title: "Align Left",
    icon: "icon-align-object-left",
    bId: "left",
  },
  {
    title: "Align Center",
    icon: "icon-align-object-center",
    bId: "center",
  },
  {
    title: "Align Right",
    icon: "icon-align-object-right",
    bId: "right",
  },
  {
    title: "Align Top",
    icon: "icon-align-object-top",
    bId: "top",
  },
  {
    title: "Align Middle",
    icon: "icon-align-object-middle",
    bId: "middle",
  },
  {
    title: "Align Bottom",
    icon: "icon-align-object-bottom",
    bId: "bottom",
  },
];

export const SPEECH_TEXT_ALIGNMENT_OPTIONS = [
  {
    title: "Align Left",
    icon: "icon-align-object-left",
    bId: "left",
  },
  {
    title: "Align Center",
    icon: "icon-align-object-center",
    bId: "center",
  },
  {
    title: "Align Right",
    icon: "icon-align-object-right",
    bId: "right",
  },
];

export const CANVAS_CONTEXT_MENU_ITEMS = [
  { label: "Send Backwards", value: "sendBackwards" },
  { label: "Send To Back", value: "sendToBack" },
  { label: "Bring Forward", value: "bringForward" },
  { label: "Bring To Front", value: "bringToFront" },
  { label: "Group Selected", value: "group" },
  { label: "Ungroup Selected", value: "unGroup" },
  { label: "Duplicate", value: "duplicate" },
  { label: "Delete", value: "delete" },
];

export const CANVAS_PAGE_GUTTER = 200;

export const PAGE_LAYOUTS = {
  print: {
    label: "Print",
    sizes: [
      { label: "A4", value: "A4", width: "595px", height: "842px" },
      { label: "A3", value: "A4", width: "842px", height: "1191px" },
      { label: "Letter", value: "letter", height: "612px", width: "791px" },
      { label: "Custom", value: "custom", height: "100%", width: "100%" },
    ],
  },
  googleAd: {
    label: "Google Ad",
    sizes: [
      { label: "300 x 300", value: "300", height: "300px", width: "300px" },
    ],
  },
};

export const PAGE_CONFIG = Object.freeze({
  id: "",
  orientation: "potrait",
  template: {},
  elements: [],
  style: {
    backgroundColor: "#ffffff",
    backgroundImage: null,
    height: "",
    width: "",
  },
});

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

export const DELETE_OPTIONS = [
  {
    name: "Clear Page",
    icon: "icon-laptop",
    value: ACTIONS.CLEAR_PAGE,
  },
  {
    name: "Selected Item",
    icon: "icon-cancel-circle",
    value: ACTIONS.CLEAR_SELECTED_ITEM,
  },
];

export const CANVAS_ACTION_HISTORY = {
  id: null,
  left: 0,
  top: 0,
  width: 0,
  height: 0,
  z: 0,
  angle: 0,
  actionType: "",
};

export const RESET_ACTIVE_ELEM_PROPS = {
  id: "",
  colors: [],
};

export const ARROW_HEAD = {
  LEFT_ARROW: "Left Arrow",
  RIGHT_ARROW: "Right Arrow",
  DOUBLE_SIDED: "Double Sided",
};

export const SHAPES_PROPS_DEFAULT = Object.freeze({
  fill: "rgba(196, 232, 188, 0.44)",
  stroke: "#000",
  strokeWidth: 1,
  // paintFirst: "stroke",
  backgroundColor: "rgba(0,0,0,0)",
});

export const LINE_PROPS_DEFAULT = Object.freeze({
  strokeWidth: 2,
  stroke: "#000",
});

export const ARROW_HEAD_POSITION = Object.freeze({
  fill: "#000",
  originX: "center",
  originY: "center",
});

export const QUADRATIC_PROPS_DEFAULT = Object.freeze({
  Path: {
    fill: "",
    stroke: "black",
    hasBorders: false,
    hasControls: false,
    objectCaching: false,
    name: "quad_curve",
    customType: "quad_curve",
    selectable: false,
  },
  CurvePoint: {
    originX: "center",
    originY: "center",
    hasBorders: false,
    hasControls: false,
    name: "quad_control",
    customType: "quad_control",
    visible: false,
    hoverCursor: "grab",
    moveCursor: "grabbing",
    scaleX: 0.4,
    scaleY: 0.4,
  },
  Arrow: {
    width: 8,
    height: 8,
    fill: "#000",
    stroke: "#000",
    strokeWidth: 2,
    originX: "center",
    originY: "bottom",
    line1: "",
    line2: "",
    line3: "",
    hasBorders: false,
    hasControls: false,
    name: "quad_arrow",
    customType: "quad_arrow",
  },
});

export const INITIAL_PATH = {
  p0: [50, 50],
  p1: [125, 75],
  p2: [150, 150],
  p3: [65, 100],
};

export const SPEECH_BUBBLE_DEFAULT_PROPS = Object.freeze({
  CONFIGURATION: {
    text: "Hello World!",
  },
  TEXT: {
    width: 180,
    fontFamily: "Quicksand",
    fontSize: 16,
    originY: "center",
    originX: "center",
    stroke: "red",
    objectCaching: false,
    textAlign: "center",
  },
  TAIL_RECT: {
    fill: "transparent",
    hasRotatingPoint: false,
    hasControls: false,
    originY: "center",
    originX: "right",
    width: 24,
    height: 24,
    stroke: "#000",
  },
  BUBBLE_BOX: {
    fill: "white",
    stroke: "#000",
    rx: 8,
    ry: 8,
    objectCaching: false,
  },
  POLYGON_TAIL: {
    fill: "white",
    stroke: "#000",
    objectCaching: false,
    strokeWidth: 2,
    hasBorders: false,
    hasControls: false,
  },
  BUBBLE_OVERLAY: {
    fill: "white",
    objectCaching: false,
    strokeWidth: 2,
    hasBorders: false,
    hasControls: false,
  },
});

export const POLY_POINTS = [
  { x: 0, y: 0 },
  { x: 1, y: 1 },
  { x: 1, y: 0 },
];

export const DeleteIcon =
  "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

export const svg =
  "M829.449,601.585L819.7,611.7a1,1,0,0,1-1.7-.713V604H804v13.962h6.933a1.071,1.071,0,0,1,.989.619,0.954,0.954,0,0,1-.239,1.09l-10.439,9.737a2,2,0,0,1-2.828-.021L788.3,619.66a1,1,0,0,1,.713-1.7H796V604H782v6.986a1,1,0,0,1-1.7.713l-9.748-10.115a2,2,0,0,1-.022-2.828l9.758-10.439a0.957,0.957,0,0,1,1.092-.239,1.073,1.073,0,0,1,.621.989V596h14V582.037h-6.986a1,1,0,0,1-.713-1.7l10.115-9.728a2,2,0,0,1,2.828-.022l10.439,9.738a0.954,0.954,0,0,1,.239,1.09,1.073,1.073,0,0,1-.989.619H804V596h14v-6.933a1.071,1.071,0,0,1,.621-0.989,0.957,0.957,0,0,1,1.092.239l9.758,10.439A2,2,0,0,1,829.449,601.585Z";

export const Ok =
  "M738.133333 311.466667L448 601.6l-119.466667-119.466667-59.733333 59.733334 179.2 179.2 349.866667-349.866667z";

export const FONT_PROPS_DEFAULT = Object.freeze({
  type: "i-text",
  value: "text",
  name: "text",
  fontFamily: "Ubuntu",
  fontSize: 48,
  backgroundColor: "rgba(255,255,255,0)",
  fill: "#000",
  stroke: "#000",
  strokeWidth: 0,
  paintFirst: "stroke",
});

export const DefaultTemplate = {
  name: "Default Template",
  value: "default",
  pageStyles: {
    // width: 888,
    // height: 500,
    width: 100,
    height: 100,
  },
  elements: [
    // {
    //   type: "Pattern",
    //   name: "Background Image",
    //   width: 888,
    //   height: 500,
    //   containerType: "rect", //triangle. circle, rect
    //   url: "https://www.everwallpaper.co.uk/cdn/shop/collections/3D_Wallpaper.jpg?v=1660209305",
    //   imageFit: "Fit Image",
    //   BorderX: 5,
    //   BorderY: 5,
    //   BorderLock: true,
    //   preselected: true,
    //   stopContainerResize: true,
    // },
    {
      type: "rect",
      name: "Overlay Bottom",
      width: 888,
      height: 500,
      fill: "#00000020",
      stroke: "rgba(0,0,0,0)",
      strokeWidth: 0,
      rx: 0,
      ry: 0,
      BorderLock: true,
    },
    {
      type: "rect",
      name: "Overlay Top",
      left: 50,
      top: 50,
      width: 788,
      height: 400,
      fill: "#ffffff50",
      stroke: "rgba(0,0,0,0)",
      strokeWidth: 0,
      rx: 5,
      ry: 5,
      BorderLock: true,
    },
    {
      ...FONT_PROPS_DEFAULT,
      value: "THE ULTIMATE",
      left: 338,
      top: 110,
      fontSize: 32,
      fill: "#660708",
    },
    {
      ...FONT_PROPS_DEFAULT,
      value: `Beginner's Guide`,
      left: 262,
      top: 208,
      fontFamily: "Comforter Brush",
      fontSize: 75,
      fill: "#DB8200",
      stroke: "#a52e2e",
    },
    {
      ...FONT_PROPS_DEFAULT,
      value: "TO BAKING",
      left: 364,
      top: 366,
      fontSize: 32,
      fill: "#660708",
    },
  ],
};

export const BlankTemplate = Object.freeze({
  name: "Blank Page",
  value: "blank",
  pageStyles: {
    backgroundColor: "#ffffff",
    backgroundImage: null,
    width: 595,
    height: 842,
  },
  elements: [],
});

export const SPACE_EVENLY_OPTIONS = [
  {
    title: "Equally Space Horizontal",
    icon: "icon-space-evenly-horizontally",
    bId: "horizontal",
  },
  {
    title: "Equally Space Vertical",
    icon: "icon-space-evenly-vertically",
    bId: "vertical",
  },
];

export const CANVAS_CUSTOM_FONTS = {
  Abril_Fatface: "Abril Fatface",
  Barlow: "Barlow Condensed",
  Bebas_Neue: "Bebas Neue",
  Caprasimo: "Caprasimo",
  comforter: "Comforter Brush",
  Fasthand: "Fasthand",
  Holtwood_One_SC: "Holtwood One SC",
  Josefin_Slab: "Josefin Slab",
  Libre_Baskerville: "Libre Baskerville",
  Montserrat: "Montserrat",
  Patua_One: "Patua One",
  Playfair_Display: "Playfair Display",
  quicksand: "Quicksand",
  Raleway: "Raleway",
  RobotoSlab: "Roboto Slab",
  Rubik: "Rubik",
  Titillium_Web: "Titillium Web",
  Ubuntu: "Ubuntu",
};

export const PAGE_TEMPLATES = [BlankTemplate, DefaultTemplate];
