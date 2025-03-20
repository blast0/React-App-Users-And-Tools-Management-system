import { noop, invert as _invert } from "lodash";

//min width we support
export const MIN_WIDTH = 550;
export const COMMON_CONSTANTS = {
  MIN_WIDTH_INFO_TITLE: "Mobile App coming soon! ",
  MIN_WIDTH_SUB_TITLE: "Thanks for trying us out!  ",
  MIN_WIDTH_INFO_CONTENT:
    "We are in the process of launching an App to make the experience better. For now, please use a Mac, PC or a larger screen for better experience.",
};
// page padding
export const PAGE_PADDING = 15;
export const LEFT_NAV_WIDTH = 70;
export const CONFIG_PANEL_WIDTH = 340;
export const CONFIG_PANEL_Z_INDEX_RESPONSIVE_SCREEN = 1;
// used for system wide messages that should stay at extreme top
export const MODULE_Z_INDEX = Object.freeze({
  headerZindex: 0,
  configPanelZIndex: 0,
  toolbarZIndex: 0,
  pageContentZIndex: 0,
  paymentModal: 0,
  uploadContainer: 2, // set 2 because (this is a modal and it will always show on the top of all page)
  dynamicModalContainer: 2, // set 2 because (this is a modal and it will always show on the top of all page)
  fileDialogContainer: 2, // set 2 because (this is a modal and it will always show on the top of all page)
  statusBlockContainer: 2, // default set to 2 (on click of every module it sets 1) to show it top of all set 2
  leftNavZIndex: 0,
  notificationPanelZIndex: 3,
  popoverMenuAndTooltip: 4,
  highestElevatedPortal: 5,
});

export const MODAL_INTERFACE = {
  portalId: "project-dynamic-modal-container",
  zIndex: MODULE_Z_INDEX.dynamicModalContainer,
  resData: "",
  content: ["Caution !", "center"],
  title: ["Caution !", "center"],
  withJsx: null,
  closeOnOutSideClick: true,
  btns: [{ text: "Ok", type: "contained" }, { text: "Cancel" }],
  config: ["auto", "auto"],
  dynamicModalResponseFun: noop,
  fullScreen: false,
  cannotClose: false,
  widthUnit: "px",
  heightUnit: "vh",
};

export const PUBLISH_MODAL_INTERFACE = (() => {
  const modalConfig = Object.assign({}, MODAL_INTERFACE);
  modalConfig.resData = "";
  modalConfig.zIndex = 55;
  modalConfig.title = ["Publish Site", "center"];
  return modalConfig;
})();

export const REQ_CONFIG = {
  noCache: false,
  forced: false,
  cacheInvalidate: false,
};

export const CONTACT_UPLOAD_STATES = {
  NONE: "none",
  QUEUED: "queued",
  ADDING: "adding",
  // SANITIZING: "sanitizing",
  COMPLETED: "completed",
  ERROR: "error", // frontend only
};

export const UTC_TIMEZONE = "(UTC+00:00) Dublin, Edinburgh, Lisbon, London";

export const mailStatus = Object.freeze({
  DRAFT: "draft",
  SENT: "sent",
  SCHEDULED: "scheduled",
  WAITING: "waiting",
  ARCHIVED: "archived",
  ERROR: "error",
  CANCELED: "canceled",
  TIMEOUT: "timeout",
});

export const MODAL_RES = {
  btnType: "",
  data: {},
};

export const MAX_LENGTH_LIMITS = {
  TAG: 20,
  NOTES: 512,
  CREATE_FOLDER: 60,
  OTP: 6,
  EMAIL: 75,
  SMTP_NAME: 30,
  NAME: 50,
  USERNAME: 50,
  PASSWORD: 100,
  PASSWORD_SMTP: 80,
  SMTP_HOST: 50,
  SMTP_PORT: 4,
  IMAGE_NAME_EDIT: 20,
  IMAGE_NAME_EDIT_NUMBER_STARTS: 4,
  IMAGE_REPLACE_TEXT: 20,
  IMAGE_REPLACE_TEXT_WITH: 20,
  IMAGE_WIDTH_AND_HEIGHT: 3,
  H1_SIZE: 3,
  H2_SIZE: 3,
  H3_SIZE: 3,
  H4_SIZE: 3,
  H5_SIZE: 3,
  H6_SIZE: 3,
  CATALOG_TOTAL_IMAGES: 3,
  CATALOG_IMAGES_PER_SECTION: 3,
  MAX_LENGHTH_NUMBER: 5,
  DOMAIN_NAME: 30,
  REASON_REJECT: 100,
};

export const authenticatedRoutePrefixes = [
  "/profile",
  "/assets",
  "/asset",
  "/coupon",
];
export const LEARN_MORE_SMTP_LINK =
  "https://www.bakemyweb.com/learn/connect/smtp";
export const TITLE_SEPARATOR = ">";

export const PHOTO_CLOUD = {
  CREATE_BTN: "Generate Photo Cloud",
  RETRY_BTN: "Retry",
  RE_ORDER: "Re-Order Images",
  SAVE_CLOSE: "Save and Close",
  SHOW_UNUSED_IMAGES: "Unused Images",
  CLOSE_UNUSED_IMAGE: "Close Unused Images",
};

export const socialLinksMap = {
  _FACEBOOK_URL: "Facebook",
  _TWITTER_URL: "Twitter",
  _INSTAGRAM_URL: "Instagram",
  _GITHUB_URL: "GitHub",
  _LINKEDIN_URL: "LinkedIn",
  _REDDIT_URL: "Reddit",
  _PINTEREST_URL: "Pinterest",
  _DIGG_URL: "Digg",
};

export const socialLinksMapReverse = _invert(socialLinksMap);

export const CAMPAIGNS_DATA = {
  newsletter: {
    name: "Newsletters",
    titleText: "You haven't created any newsletter yet!",
    subtitleText: `Send your audience a fantastic newsletter they can't take their eyes off...`,
    url: "newsletter",
    isMailInstance: true,
  },
  randomComm: {
    name: "Random Communication",
    titleText: "Wanna say something to your audience?",
    subtitleText: `Create a mail and say right away...`,
    url: "randomComm",
    isMailInstance: true,
  },
  subscribers: {
    name: "Subscribers",
    titleText: "Your subscribers haven't heard from you yet!",
    subtitleText: `Create a mail and let them know what's going on...`,
    url: "subscribers",
    isMailInstance: true,
  },
  marketing: {
    name: "Marketing",
    titleText: "There is never enough of marketing! Is there?",
    subtitleText: `Let's start a new marketing campaign...`,
    url: "marketing",
    isMailInstance: true,
  },
  showcase: {
    name: "Showcase",
    titleText: "You haven't created any showcase yet!",
    subtitleText: `Let's create a new showcase...`,
    url: "showcase",
    isMailInstance: true,
  },
  systemMail: {
    name: "System Mail",
    titleText: "You haven't created any system mail yet!",
    subtitleText: `Let's create a new system mail...`,
    url: "showcase",
    isMailInstance: true,
  },
  archived: {
    name: "Archived",
    url: "archived",
    titleText: "No archived mails found",
    subtitleText:
      "We don't allow deletion of mails. However, you can archive your old mails and refer to them here.",
  },
};

//immovable section for all users
//un-deleteable section for unpaid plans
export const IMMOVABLE_SECTION = "Powered By";
const assetPath = `/files/public/de/69/2770cae8aabc7706c58dde69/i`;
const baseUrl = `https://www.bakemyweb.com`;
const name = `original?name`;
const extandMimeType = `.png&mimetype=image/png&cd=inline`;
export const normalImageURLs = {
  fb: `${baseUrl}${assetPath}/96/67/669f33322da3cd001e309667/${name}=facebook-270${extandMimeType}`,
  in: `${baseUrl}${assetPath}/96/6f/669f33372da3cd001e30966f/${name}=insta-270${extandMimeType}`,
  tw: `${baseUrl}${assetPath}/96/7f/669f33422da3cd001e30967f/${name}=twitter-270${extandMimeType}`,
  li: `${baseUrl}${assetPath}/96/73/669f333a2da3cd001e309673/${name}=linkedin-270${extandMimeType}`,
  gh: `${baseUrl}${assetPath}/96/6b/669f33342da3cd001e30966b/${name}=git-270${extandMimeType}`,
  re: `${baseUrl}${assetPath}/96/7b/669f333f2da3cd001e30967b/${name}=reddit-270${extandMimeType}`,
  pt: `${baseUrl}${assetPath}/96/77/669f333d2da3cd001e309677/${name}=pinterest-270${extandMimeType}`,
  dig: `${baseUrl}${assetPath}/96/63/669f332e2da3cd001e309663/${name}=digg-270${extandMimeType}`,
};

export const darkImageURLs = {
  fb: `${baseUrl}${assetPath}/49/5c/669f3332a82a23001e5f495c/${name}=facebook-black-326${extandMimeType}`,
  in: `${baseUrl}${assetPath}/49/64/669f3338a82a23001e5f4964/${name}=insta-black-326${extandMimeType}`,
  tw: `${baseUrl}${assetPath}/49/74/669f3343a82a23001e5f4974/${name}=twitter-black-326${extandMimeType}`,
  li: `${baseUrl}${assetPath}/49/68/669f333ba82a23001e5f4968/${name}=linkedin-black-326${extandMimeType}`,
  gh: `${baseUrl}${assetPath}/49/60/669f3335a82a23001e5f4960/${name}=git-black-326${extandMimeType}`,
  re: `${baseUrl}${assetPath}/49/70/669f3340a82a23001e5f4970/${name}=reddit-black-326${extandMimeType}`,
  pt: `${baseUrl}${assetPath}/49/6c/669f333da82a23001e5f496c/${name}=pinterest-black-326${extandMimeType}`,
  dig: `${baseUrl}${assetPath}/49/58/669f332fa82a23001e5f4958/${name}=digg-black-326${extandMimeType}`,
};

export const circleDarkImageURLs = {
  fb: `${baseUrl}${assetPath}/96/69/669f33332da3cd001e309669/${name}=facebook-black-circle-270${extandMimeType}`,
  in: `${baseUrl}${assetPath}/96/71/669f33382da3cd001e309671/${name}=insta-black-circle-270${extandMimeType}`,
  tw: `${baseUrl}${assetPath}/96/81/669f33432da3cd001e309681/${name}=twitter-black-circle-270${extandMimeType}`,
  li: `${baseUrl}${assetPath}/96/75/669f333b2da3cd001e309675/${name}=linkedin-black-circle-270${extandMimeType}`,
  gh: `${baseUrl}${assetPath}/96/6d/669f33362da3cd001e30966d/${name}=git-black-circle-270${extandMimeType}`,
  re: `${baseUrl}${assetPath}/96/7d/669f33412da3cd001e30967d/${name}=reddit-black-circle-270${extandMimeType}`,
  pt: `${baseUrl}${assetPath}/96/79/669f333e2da3cd001e309679/${name}=pinterest-black-circle-270${extandMimeType}`,
  dig: `${baseUrl}${assetPath}/96/65/669f33302da3cd001e309665/${name}=digg-black-circle-270${extandMimeType}`,
};
// notification [starts]
export class INotification {
  assetId = "";
  createdAt = "";
  status = "";
  message = "";
  read = false;
  taskId = "";
  type = "";
  _id = "";
  data = {}; // metadata
}

// categorization of notification events by module name
// primarily used in <notification-panel>
export const eventTypesByModule = {
  files: {
    events: ["size", "delete", "fileChanged", "variation"],
    icon: "icon-fs-folder",
    label: "Files",
  },
  team: {
    events: [
      "addedToTeam",
      "removedFromTeam",
      "approvedTeamInvitation",
      "deniedTeamInvitation",
    ],
    icon: "icon-team",
    label: "Team",
  },
  task: {
    events: ["taskScheduled", "taskStateUpdate", "taskLog"],
    icon: "icon-task",
    label: "Task",
  },
  mail: { events: ["sendMails"], icon: "icon-mail", label: "Mails" },
  contacts: {
    events: ["uploadContacts"],
    icon: "icon-contact",
    label: "Contacts",
  },
  emailAndDomains: {
    events: ["sesIdentitiesVerificationStatus"],
    icon: "icon-verified",
    label: "Emails & Domains",
  },
  payment: {
    events: ["payment"],
    icon: "icon-dollar",
    label: "Payment",
  },
};
// notification [ends]

// global settings

export const ASSET_LISTING_LAYOUTS = Object.freeze({
  THUMB_VIEW: "thumbview",
  LIST_VIEW: "listview",
});

export const SHOWCASE_MODAL_LAYOUTS = Object.freeze({
  REGULAR: "regular",
  LIST_VIEW: "listview",
});

export const ASSET_LISTING_TABS = Object.freeze({
  RECENT_PROJECTS: "recentProjects",
  STARRED_PROJECTS: "starredProjects",
});

// ALL SETTING KEYS
export const SETTING_KEYS = {
  ASSET_LISTING_LAYOUT: "asset_listing_layout",
  ASSET_LISTING_TAB_TYPE: "asset_listing_tab_type",
  VIEW_IMAGE_LAYOUT: "view_image_layout",
  VIEW_IMAGE_VIEW: "view_image_view",
  VIEW_IMAGE_SORT: "view_image_sort",
  VIEW_DOCS_LAYOUT: "view_docs_layout",
  VIEW_DOCS_VIEW: "view_docs_view",
  VIEW_DOCS_SORT: "view_docs_sort",
  SHOWCASE_MODAL_LAYOUT: "showcase_modal_layout",
  IS_EDITOR_SPLIT_PREVIEW_VISIBLE: "is_editor_split_preview_visible",
  IS_ATTRIBUTION_COLLAPSED: "is_attribution_collapsed",
};
// TO UPDATE IMAGES USER CHANGE VERSION i,e fs_nodes_(any number)
export const IMAGE_FS_VERSION = "fs_nodes";

// TO UPDATE SETTINGS USER CHANGE VERSION i,e settings_(any number) settings_5
export const SETTINGS_VERSION_PREFIX = "settings_";
export const SETTINGS_VERSION =
  SETTINGS_VERSION_PREFIX + import.meta.env.VITE_APP_SETTING_CACHE_VERSION;

// ALL DEFAULT SETTINGS VALUE
export const SETTINGS = {
  [SETTING_KEYS.ASSET_LISTING_LAYOUT]: ASSET_LISTING_LAYOUTS.THUMB_VIEW,
  [SETTING_KEYS.ASSET_LISTING_TAB_TYPE]: ASSET_LISTING_TABS.STARRED_PROJECTS,
  [SETTING_KEYS.VIEW_IMAGE_LAYOUT]: 1,
  [SETTING_KEYS.VIEW_IMAGE_VIEW]: 1,
  [SETTING_KEYS.VIEW_IMAGE_SORT]: "name",
  [SETTING_KEYS.VIEW_DOCS_LAYOUT]: 1,
  [SETTING_KEYS.VIEW_DOCS_VIEW]: 1,
  [SETTING_KEYS.VIEW_DOCS_SORT]: "name",
  [SETTING_KEYS.SHOWCASE_MODAL_LAYOUT]: SHOWCASE_MODAL_LAYOUTS.REGULAR,
  [SETTING_KEYS.IS_EDITOR_SPLIT_PREVIEW_VISIBLE]: true,
  [SETTING_KEYS.IS_ATTRIBUTION_COLLAPSED]: true,
};

// ROUTE TYPES
export const ROUTE_TYPES = {
  AUTH: "auth",
  UN_AUTH: "unauth",
  COMMON: "common",
};

// FONTS THAT ARE SUPPORTED THROUGHOUT THE APP
export const FONTS = [
  "Helvetica",
  "Arial",
  "Courier New",
  "Georgia",
  "Impact",
  "Tahoma",
  "Times New Roman",
  "Trebuchet MS",
  "Verdana",
  "Palatino Linotype",
  "Palatino",
];

const svgMimeType = `.svg&mimetype=image/svg+xml&cd=inline`;

export const SOCIAL_IMAGE_ICONS = [
  {
    name: "Email 1",
    value: `${baseUrl}${assetPath}/82/fe/635faec2f4c9a2002b4c82fe/${name}=email-1${svgMimeType}`,
  },
  {
    name: "Email 2",
    value: `${baseUrl}${assetPath}/26/0b/63417c8fffdec1002f61260b/${name}=email-2${svgMimeType}`,
  },
  {
    name: "Facebook round",
    value: `${baseUrl}${assetPath}/46/23/6352ae14350f0d002bd94623/${name}=facebook-round${svgMimeType}`,
  },
  {
    name: "Facebook",
    value: `${baseUrl}${assetPath}/26/2e/6352ae15ffdec1002f61262e/${name}=facebook${svgMimeType}`,
  },
  {
    name: "Github",
    value: `${baseUrl}${assetPath}/46/25/6352ae20350f0d002bd94625/${name}=github${svgMimeType}`,
  },
  {
    name: "Instagram",
    value: `${baseUrl}${assetPath}/46/2a/6352ae45350f0d002bd9462a/${name}=instagram${svgMimeType}`,
  },
  {
    name: "LinkedIn",
    value: `${baseUrl}${assetPath}/5d/e4/635fae13064e46002afa5de4/${name}=linkedin${svgMimeType}`,
  },
  {
    name: "Pinterest",
    value: `${baseUrl}${assetPath}/46/2e/6352ae75350f0d002bd9462e/${name}=pinterest-alt${svgMimeType}`,
  },
  {
    name: "Pinterest dark",
    value: `${baseUrl}${assetPath}/26/37/6352ae76ffdec1002f612637/${name}=pinterest-dark${svgMimeType}`,
  },
  {
    name: "Pinterest round",
    value: `${baseUrl}${assetPath}/46/30/6352ae77350f0d002bd94630/${name}=pinterest-round${svgMimeType}`,
  },
  {
    name: "Reddit",
    value: `${baseUrl}${assetPath}/26/3b/6352ae91ffdec1002f61263b/${name}=reddit${svgMimeType}`,
  },
  {
    name: "Reddit round",
    value: `${baseUrl}${assetPath}/46/32/6352ae90350f0d002bd94632/${name}=reddit-round${svgMimeType}`,
  },
  {
    name: "Snapchat dark",
    value: `${baseUrl}${assetPath}/46/34/6352aea8350f0d002bd94634/${name}=snapchat-dark${svgMimeType}`,
  },
  {
    name: "Snapchat",
    value: `${baseUrl}${assetPath}/46/36/6352aeaa350f0d002bd94636/${name}=snapchat${svgMimeType}`,
  },
  {
    name: "Telegram",
    value: `${baseUrl}${assetPath}/26/3f/6352aebcffdec1002f61263f/${name}=telegram${svgMimeType}`,
  },
  {
    name: "Telegram dark",
    value: `${baseUrl}${assetPath}/46/38/6352aebd350f0d002bd94638/${name}=telegram-dark${svgMimeType}`,
  },
  {
    name: "Telegram round",
    value: `${baseUrl}${assetPath}/46/3a/6352aebe350f0d002bd9463a/${name}=telegram-round${svgMimeType}`,
  },
  {
    name: "Twitter round",
    value: `${baseUrl}${assetPath}/46/3c/6352aed7350f0d002bd9463c/${name}=twitter-round${svgMimeType}`,
  },
  {
    name: "Whatsapp",
    value: `${baseUrl}${assetPath}/26/49/6352aee8ffdec1002f612649/${name}=whatsapp${svgMimeType}`,
  },
  {
    name: "Whatsapp dark",
    value: `${baseUrl}${assetPath}/26/47/6352aee6ffdec1002f612647/${name}=whatsapp-dark${svgMimeType}`,
  },
  {
    name: "Youtube dark",
    value: `${baseUrl}${assetPath}/46/42/6352aeee350f0d002bd94642/${name}=youtube-dark${svgMimeType}`,
  },
  {
    name: "Youtube round",
    value: `${baseUrl}${assetPath}/26/4b/6352aeefffdec1002f61264b/${name}=youtube-round${svgMimeType}`,
  },
  {
    name: "Youtube",
    value: `${baseUrl}${assetPath}/46/44/6352aef0350f0d002bd94644/${name}=youtube${svgMimeType}`,
  },
];
