const AppRoutes = Object.freeze({
  login: "/login",
  loginWhenInitFailed: "/login?message=INIT_FAILED",
  signup: "/signup",
  forgetPass: "/forget-pass",
  verifyOTP: "/verify-otp/:action",
  setNewPassword: "/set-new-pass",
  // common routes
  verifyOTPFromEmail: "/otp/:action/:userId/:token/:otp",
  signupThroughProvider: "/auth",
  invitationSignup: "/invitation/:code",
  discountSignup: "/discount/:code",
  unsubscribeCampaign: "/unsubscribe/campaign/:assetId/:mailInstanceName",
  smtpIdentityVerify: "/verify/email",
  previewCampaign: "/preview/campaign/:token",
  plansAndPricing: "/pricing",
  // authenticated
  imageEditor: "/asset/:assetName/:assetId/image-editor",
  gradientMakerPage: "/asset/:assetName/:assetId/gradient-maker",
  randomBlobMaker: "/asset/:assetName/:assetId/blob-maker/random-blob-maker",
  randomBlurryBackgroundMaker:
    "/asset/:assetName/:assetId/blob-maker/random-blurry-background-maker",
  randomLayeredWaveMaker:
    "/asset/:assetName/:assetId/blob-maker/random-layered-wave-maker",
  randomBlobSceneMaker:
    "/asset/:assetName/:assetId/blob-maker/random-blob-scene-maker",
  userProfileUpgradeWithPlan: "/profile/:upgrade/:plan/:mode/:currency",
  userProfilePayment: "/profile/:paymentType/:planIdentifier",
  userProfileUpgrade: "/profile/:upgrade",
  userProfile: "/profile",
  userInvoices: "/invoices",
  assetListing: "/assets",
  assetRouter: "/asset/:assetName/:assetId",
  assetDashboard: "/asset/:assetName/:assetId/dashboard",
  siteImport: "/asset/:assetName/:assetId/site-import/",
  siteImportInventory:
    "/asset/:assetName/:assetId/site-import/:siteImportRequestId",
  editor: "/asset/:assetName/:assetId/editor",
  teams: "/asset/:assetName/:assetId/teams",
  contactListing: "/asset/:assetName/:assetId/manage/contacts",
  manageAudience: "/asset/:assetName/:assetId/manage/contacts",
  manageContact: "/asset/:assetName/:assetId/manage/contacts",
  taskWithId: "/asset/:assetName/:assetId/tasks/:taskId",
  tasks: "/asset/:assetName/:assetId/tasks",
  taskWithIdAdmin: "/tasks/:taskId",
  tasksAdmin: "/tasks",

  //files: `/asset/:assetName/:assetId/view?${queryParamsDocs}`,
  files: `/asset/:assetName/:assetId/view`,
  filesSearch: "/asset/:assetName/:assetId/files/search",
  filesTrash: "/asset/:assetName/:assetId/files/trash",
  filesTrashSearch: "/asset/:assetName/:assetId/files/trash/search",

  //images: `/asset/:assetName/:assetId/view?${queryParamsImage}`,
  images: `/asset/:assetName/:assetId/view`,
  imagesAdmin: "/images",
  imagesSearch: "/asset/:assetName/:assetId/images/search",
  imagesTrash: "/asset/:assetName/:assetId/images/trash",
  imagesTrashSearch: "/asset/:assetName/:assetId/images/trash/search",

  create: `/asset/:assetName/:assetId/create`,

  branding: "/asset/:assetName/:assetId/manage/branding",

  //site settings
  generalSettings:
    "/asset/:assetName/:assetId/common-site-settings/general-settings",
  topMenuSettings:
    "/asset/:assetName/:assetId/common-site-settings/top-menu-settings",
  topMenuLinks:
    "/asset/:assetName/:assetId/common-site-settings/top-menu-links",
  leftMenuSettings:
    "/asset/:assetName/:assetId/common-site-settings/left-menu-settings",
  footerLinks: "/asset/:assetName/:assetId/common-site-settings/footer-links",
  footerSettings:
    "/asset/:assetName/:assetId/common-site-settings/footer-settings",
  pageSettings: "/asset/:assetName/:assetId/common-site-settings/page-settings",
  siteThemes: "/asset/:assetName/:assetId/common-site-settings/site-themes",
  siteColors: "/asset/:assetName/:assetId/common-site-settings/site-colors",
  siteFonts: "/asset/:assetName/:assetId/common-site-settings/fonts",
  featuredItems: "/asset/:assetName/:assetId/featured-items",
  customCodeAddOns: "/asset/:assetName/:assetId/custom-code-&-add-ons",
  publishingOptions: "/asset/:assetName/:assetId/publishing-options",
  maintenance: "/asset/:assetName/:assetId/maintenance",

  plans: "/asset/:assetName/:assetId/plans",
  planContents: "/asset/:assetName/:assetId/plans/:planId/contents/:planType",
  topics: "/asset/:assetName/:assetId/plans/:planId/:planName",
  emailAndDomains: "/asset/:assetName/:assetId/manage/emails-and-domains",
  verifyEmails: "/asset/:assetName/:assetId/manage/verify-emails",
  // addCalendar: "/asset/:assetName/:assetId/manage/ad-calendar",
  campaignListing: "/asset/:assetName/:assetId/mails",
  campaignListingAdmin: "/mails",
  addCampaign:
    "/asset/:assetName/:assetId/mails/instance/:type/add/:showcaseId",
  editCampaign: "/asset/:assetName/:assetId/mails/instance/:type/edit/:mailId",
  duplicateCampaign:
    "/asset/:assetName/:assetId/mails/instance/duplicate/:dupMailId",
  mailTracker:
    "/asset/:assetName/:assetId/mails/mail-tracker/:type/:mailInstanceName/read",
  mailTrackerUnread:
    "/asset/:assetName/:assetId/mails/mail-tracker/:type/:mailInstanceName/unread",
  catalogListing: "/asset/:assetName/:assetId/catalogs",
  addCatalog: "/asset/:assetName/:assetId/catalog/add",
  manageCatalog: "/asset/:assetName/:assetId/catalog/:catalogId/:catalogName",
  resetPage: "/asset/:assetName/:assetId/reset",
  acSuspendedPage: "/account-suspended",
  // forms
  formDesign: "/asset/:assetName/:assetId/forms/design/:formName/:formId",
  formQuestions: "/asset/:assetName/:assetId/forms/questions/:formName/:formId",
  formMessages: "/asset/:assetName/:assetId/forms/messages/:formName/:formId",
  singleFormResponses:
    "/asset/:assetName/:assetId/forms/responses/:formName/:formId",
  formsListing: "/asset/:assetName/:assetId/forms",
  submitForm: "/forms/submit/:assetId/:formId",
  submitFormWithToken: "/forms/submit/:token",
  designer: "/asset/:assetName/:assetId/designer",
  // domains and paths
  manageDomains: "/asset/:assetName/:assetId/domains/manage",
  webPages: "/asset/:assetName/:assetId/web-pages",
  sku: "/asset/:assetName/:assetId/sku",
  // qr code
  manageQrCodes: "/asset/:assetName/:assetId/manage-qr-codes",
  roughPage: "/rough-page",
  allControls: "/all-controls",
  // not related to bmw
  blockCamera: "/blockcamera",
  mailboxArchiveJSONtoXml: "/mailboxArchiveJSONtoXml",
  coupon: "/coupon/:couponCode",
});

export default AppRoutes;
