export const PAGE_TITLE = "BakeMyWeb";
export const PAGE_TITLE_DEV = "BakeMyWeb Dev ";
export const DOMAIN_INIT_TIMEOUT = 15;

export const MIGRATION_INVENTORY_TYPES = Object.freeze({
  IMAGE: "i",
  UNTAGGED: "u",
  DOCUMENT: "d",
  PAGE: "pa",
  POST: "po",
  COMMON: "c",
  ALL: "all",
  CLEAR_TAG: "u",
});

export const MIGRATION_INVENTORY_TYPE_LABELS = Object.freeze({
  u: "Untagged",
  d: "Documents",
  pa: "Pages",
  po: "Posts",
  all: "All",
  i: "Images",
});

export const INVENTORY_DISCOVER_TYPES = Object.freeze({
  ALL: "All",
  ALL_SELECTED_CONTENT: "All selected content",
  ALL_TAGGED_CONTENT: "All tagged content",
  ALL_PAGES: 'All "Pages"',
  ALL_POSTS: 'All "Posts"',
});

export const INVENTORY_IMPORT_TYPES = Object.freeze({
  ALL: "All",
  ALL_SELECTED_CONTENT: "All selected content",
  ALL_TAGGED_CONTENT: "All tagged content",
  ALL_PAGES: 'All "Pages"',
  ALL_POSTS: 'All "Posts"',
});

export const INVENTORY_STATUS = {
  IGNORE: "i",
  FRESH: "f",
  IGNORE_STATUS: "is", //ignores is only to distinguish between type image (i) and status (i)
};

export const SITE_IMPORT_REQUEST_STATUS = {
  SCAN: "s",
  PULL: "p",
  FRESH: "f",
};

export const SITE_IMPORT_PARAMS = {
  contains: "",
};

export const SITE_INVENTORY_PARAMS = {
  matchCase: false,
  includeIgnored: false,
  type: "",
  status: "",
  searchText: "",
  contains: "",
  endsWith: "",
  startsWith: "",
  searchType: "contains",
};

export const PLAN_PARAMS = {
  view: "list",
  sortDir: "",
};

export const TOPIC_PARAMS = {
  parent: "",
};

export const SEARCH_OPTIONS = [
  { label: "Contains", value: "contains", checked: true },
  { label: "Ends With", value: "endsWith", checked: false },
  { label: "Starts With", value: "startsWith", checked: false },
];

export const IMPORT_LOCATION = {
  imagesRoot: "",
  imagesCommon: "",
  filesRoot: "",
  filesCommon: "",
};

export const CURRENCIES = [
  { value: "inr", name: "INR" },
  { value: "usd", name: "USD", selected: true },
];

export const INTERVALS = {
  MONTHLY: "monthly",
  YEARLY: "yearly",
};

export const CUSTOM_PLAN_STATE = {
  ACTIVE: "active",
  PENDING: "pending",
};

export const SWITCH_PLAN_ACTIONS = Object.freeze({
  REQUEST: "request",
  CANCEL_REQUEST: "cancelRequest",
  INITIATE: "initiate",
});

export const STRIPE_SUBSCRIPTION_STATUS = {
  ACTIVE: "active",
  INCOMPLETE: "incomplete",
  NOT_STARTED: "not_started",
};

export const PLAN_CONSTANTS = {
  DONUT: "donut",
  POPULAR_PLAN: 2,
  STORAGE_LIMIT: "storage",
  CONTACT_LISTS_PER_PROJECTS: "assets.contact-lists",
  CONTACTS_PER_CONTACT_LIST: "assets.contact-lists.contacts",
  PAYMENT_FAILED_MSG: "Payment Failed",
  PAYMENT_RES_ERROR: "error",
  ALL_FIELDS_ARE_REQUIRED: "All fields are required",
  INVALID_CARD_DETAILS: "Invalid card details",
  DATE_FORMAT_TO_SHOW: "Do MMM, YY",
  RAZORPAY: "razorpay",
  DEFAULT_INTERVAL: INTERVALS.MONTHLY,
  DEFAULT_CURRIENCY: "inr",
  COUNTRY_INDIA: "IN",
  PAY: "pay",
  INR: "inr",
  USD: "usd",
  CUSTOM_PLAN_MAIL_TO:
    "mailto:billing@bakemyweb.com?subject=I need a custom plan",
};

export const PLAN_OTHER_FEATURES = [
  {
    plan: 0,
    otherFeatures: [
      { name: "Automatic Update", active: true },
      { name: "Automatic Backups", active: true },
      { name: "Create Plans", active: true },
      { name: "Email Support", active: true },
      { name: "Add Image from multiple Source", active: true },
      {
        name: "Automatic Email Verfication for Contacts (no more bounced emails)",
        active: false,
      },
      { name: 'Remove "Powered By"', active: false },
      { name: "Sync Contact from Phone", active: false },
      { name: "Custom Domain", active: false },
      { name: "Import Website", active: false },
      { name: "Phone Support", active: false },
      { name: "Migration Help", active: false },
      { name: "Profanity Filter", active: false },
    ],
  },
  {
    plan: 1,
    otherFeatures: [
      { name: "Automatic Update", active: true },
      { name: "Automatic Backups", active: true },
      { name: "Create Plans", active: true },
      { name: "Email Support", active: true },
      { name: "Add Image from multiple Source", active: true },
      {
        name: "Automatic Email Verfication for Contacts (no more bounced emails)",
        active: true,
      },
      { name: 'Remove "Powered By"', active: true },
      { name: "Sync Contact from Phone", active: true },
      { name: "Custom Domain", active: true },
      { name: "Import Website", active: true },
      { name: "Phone Support", active: true },
      { name: "Migration Help", active: true },
      { name: "Profanity Filter", active: false },
    ],
  },
  {
    plan: 2,
    otherFeatures: [
      { name: "Automatic Update", active: true },
      { name: "Automatic Backups", active: true },
      { name: "Create Plans", active: true },
      { name: "Email Support", active: true },
      { name: "Add Image from multiple Source", active: true },
      {
        name: "Automatic Email Verfication for Contacts (no more bounced emails)",
        active: true,
      },
      { name: 'Remove "Powered By"', active: true },
      { name: "Sync Contact from Phone", active: true },
      { name: "Custom Domain", active: true },
      { name: "Import Website", active: true },
      { name: "Phone Support", active: true },
      { name: "Migration Help", active: true },
      { name: "Profanity Filter", active: true },
    ],
  },
];

export const SPECIAL_WEBMENU_PATHS = [
  "/index.md",
  "/tags",
  "/references",
  "/fragments",
  "/authors",
  "/series",
  "/static",
  "/_index.md",
  "/recycle-bin",
];

export const FLOATLABEL_INPUT_STYLE = Object.freeze({
  backgroundColor: "transparent",
  border: "1px solid #f3f3f3",
  padding: "4px",
  color: "#666",
});

// forms [starts]

export const FORM_THEME_BASE = Object.freeze({
  HEADER_IMAGE_HEIGHT: "200",
  HEADER_IMAGE_WIDTH: "100",
  HEADER_IMAGE_URL: "",
  HEADER_IMAGE_ALIGNMENT: "center",
  FONT: "Open Sans",
  BG_COLOR: "#ffffff",
  SUCCESS_MSG_COLOR: "#20868e",
  ERROR_MSG_COLOR: "#cc0000",
  RESET_BTN_TEXT: "Reset",
  RESET_BTN_COLOR: "#20868e",
  RESET_BTN_TEXT_COLOR: "#ffffff",
  RESET_BTN_BORDER_COLOR: "#20868e",
  SUBMIT_BTN_TEXT: "Submit",
  SUBMIT_BTN_COLOR: "#20868e",
  SUBMIT_BTN_TEXT_COLOR: "#FFFFFF",
  SUBMIT_BTN_BORDER_COLOR: "#20868e",
  BG_IMAGE_URL: "",
  BG_OPTION_HEADER: "cover",
  // THEME_COLOR: "#20868e",
  // INPUT_STYLE: "style1",
});

// every theme extends default theme
export const FORM_THEMES = {
  THEME_1: {
    label: "Theme 1",
    name: "THEME_1",
    style: {
      ...FORM_THEME_BASE,
      BG_IMAGE_URL: "",
      BG_OPTION_HEADER: "cover",
    },
  },
  // THEME_2: {
  //   label: "Theme 2",
  //   name: "THEME_2",
  //   style: {
  //     ...FORM_THEME_BASE,
  //     BG_IMAGE_URL: "",
  //     FONT_SIZE_LABEL: "20px",
  //   },
  // },
  // THEME_3: {
  //   label: "Theme 3",
  //   name: "THEME_3",
  //   style: {
  //     ...FORM_THEME_BASE,
  //     BG_IMAGE_URL: "",
  //     BG_OPTION_HEADER: "cover",
  //   },
  //   layout: {
  //     ...BASE_LAYOUT,
  //   },
  // },
};

const DEFAULT_THEME = FORM_THEMES["THEME_1"];

export const FORM_MESSAGES = Object.freeze({
  SUCCESS_MSG_TEXT: "Your form is submitted successfully.",
  ERROR_MSG_TEXT: "There's some issues submitting your form.",
  ALREADY_MSG_TEXT: "You have already submitted this form.",
  // eslint-disable-next-line no-template-curly-in-string
  MORE_RESPONSES_TEXT: "You have ${n} more responses",
});

export const FORM_CONFIG_DEFAULT = Object.freeze({
  design: Object.assign({}, DEFAULT_THEME),
  messages: {
    success: FORM_MESSAGES.SUCCESS_MSG_TEXT,
    already: FORM_MESSAGES.ALREADY_MSG_TEXT,
    error: FORM_MESSAGES.ERROR_MSG_TEXT,
    moreResponses: FORM_MESSAGES.MORE_RESPONSES_TEXT,
  },
});

export const BASE_LAYOUT = {
  TYPE: "POPUP",
  BUTTON_TEXT: "Submit Response",
};

export const QUESTION_TYPE = {
  RADIO: {
    label: "Single choice",
    name: "singleChoice",
  },
  TEXT: {
    label: "Text",
    name: "text",
  },
  CHECKBOX: {
    label: "Multiple Choice",
    name: "multiChoice",
  },
  NUMBER: {
    label: "Number",
    name: "number",
  },
  DROPDOWN: {
    label: "Dropdown",
    name: "dropDown",
  },
  PARAGRAPH: {
    label: "Paragraph",
    name: "multilineText",
  },
  DATE: {
    label: "Date",
    name: "date",
  },
  TIME: {
    label: "Time",
    name: "time",
  },
};

export const DEFAULT_QUESTION_TYPE = QUESTION_TYPE.TEXT.name;

export const QUESTION = {
  title: "",
  description: "",
  type: DEFAULT_QUESTION_TYPE,
  required: false,
  isVisible: true,
  busy: false,
  errMsg: "",
  images: [],
};

// forms [ends]

export const SWITCH_MODAL_BTNS = {
  OK: "Ok",
  CANCEL: "Cancel",
};

export const PAYMENT_GATEWAYS = [
  {
    nameDropdown: "Subscribe",
    nameUrl: "subscribe",
  },
  {
    nameDropdown: "Pay Manually",
    nameUrl: "pay",
    value: "razorpay",
    description: "For Razorpay",
    selected: true,
  },
];

export const PAYMENT_MODAL_INTERFACE = {
  billing: {},
  modal: true,
  titleText: "",
  priceId: "",
  planId: "",
  plan: "",
  isCardUpdated: false,
  gatewayTypes: PAYMENT_GATEWAYS,
  modalRes: function () {},
  planIntervalClickHandler: function () {},
  currencyChangeDropdownHandler: function () {},
  paymentGatewayTypesChangeHandler: function () {},
  numberFormat: function () {},
};

export const ASSET_SETUP_MODULE_NAMES = Object.freeze({
  SMTP: "smtp",
  BRANDING: "branding",
  DOMAINS: "domains",
  IMAGES: "images",
});

export const PROFILE_STATES = Object.freeze({
  COMPLETED: "completed",
  INCOMPLETE: "incomplete",
});

// create module
export const CREATE_QUERY_PARAMS = Object.freeze({
  type: "",
});

export const BLOCKED_ROUTES_DEV = [];
export const BLOCKED_ROUTES_PROD = [];

export const FAVICON_IMAGES = [
  "favicon-16x16.png",
  "favicon-32x32.png",
  "favicon-96x96.png",
  "favicon-144x144.png",
  "favicon-192x192.png",
  "favicon.png",
];
