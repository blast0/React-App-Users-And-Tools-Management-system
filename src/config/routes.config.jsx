import React from "react";
import { Route } from "react-router-dom";

import ErrorBoundary from "../components/error-boundary/error-boundary";
import AppRoutes from "./routes";
import AssetRouter from "./asset.router";
import { ROUTE_TYPES } from "./common.constants";
import { BLOCKED_ROUTES_DEV, BLOCKED_ROUTES_PROD } from "./app.constants";

const [
  LoginPage,
  SignupPage,
  ForgetPassPage,
  VerifyOtpPage,
  SetNewPassPage,
  VerifyOTPFromEmailPage,
  SignupThroughProvider,
  ReferralPage,
  UnsubscribeCampaign,
  SMTPIdentityVerifyPage,
  PreviewCampaignFromLink,
  AssetListing,
  TasksPage,
  VerifyEmails,
  Branding,
  ResetPage,
  SiteImport,
  MailTrackerUnread,
  AcSuspendedPage,
  FormsConfigurator,
  FormQuestions,
  FormsMessages,
  FormResponses,
  FormsListing,
  ManageDomains,
  PlansAndPricingPage,
  Designer,
  TeamsPage,
  MailInstance,
  MailTracker,
  ProfilePage,
  InvoicePage,
  DashboardPage,
  CouponPage,
  Plans,
  ContactTabs,
  ImagePage,
  SiteImportInventory,
  Create,
  Topics,
  WebPages,
  SubmitFormManager,
  GradientMakerPage,
  ImageEditor,
  SkuListing,
  MailListing,
  ManageQrCodes,
  RandomBlobMaker,
  RandomBlurryBackgroundMaker,
  RandomLayeredWaveMaker,
  RandomBLobSceneMaker,
  RoughPage,
] = [
  "login",
  "signup",
  "forget-pass",
  "verify-otp",
  "set-new-pass",
  "verify-otp-from-email",
  "signup-through-provider",
  "referral",
  "unsub-campaign",
  "smtp-identity-verify",
  "preview-campaign-from-link",
  "asset-listing",
  "tasks",
  "verify-emails",
  "branding",
  "reset-page",
  "site-import",
  "mail-tracker-unread",
  "ac-suspended-page",
  "forms-configurator",
  "form-questions",
  "forms-messages",
  "form-responses",
  "forms-listing",
  "manage-domains",
  "plans-and-pricing",
  "designer",
  "teams",
  "mail-instance",
  "mail-tracker",
  "profile",
  "invoices",
  "dashboard",
  "coupon",
  "plans",
  "contacts",
  "images-page",
  "site-import-inventory",
  "create",
  "topics",
  "web-pages",
  "submit-form",
  "gradient-maker-page",
  "image-editor",
  "sku-listing",
  "campaigns",
  "manage-qr-code",
  "create-random-blob",
  "create-random-blurry-background",
  "create-random-layered-wave",
  "create-random-blob-scene",
  "rough",
].map((component) =>
  React.lazy(() => import(`../pages/${component}/${component}.jsx`))
);

/**
 * TODO:
 * Remove unused routes and components
 * Remove ADMIN routes
 */
export const Routes = {
  /**
   * commonRoutes are routes that should be available in both authenticated & unauthenticated
   * section.
   * asset router routes must have true values key -> auth & assetRequired
   * paths should be imported from AppRouter -> routes.js.
   */
  //#region unauthenticated routes
  login: {
    path: AppRoutes.login,
    component: LoginPage,
    id: "route_login",
  },
  loginWhenInitFailed: {
    path: AppRoutes.loginWhenInitFailed,
    component: LoginPage,
    id: "route_loginWhenInitFailed",
  },
  signup: { path: AppRoutes.signup, component: SignupPage, id: "route_signup" },
  forgetPass: {
    path: AppRoutes.forgetPass,
    component: ForgetPassPage,
    id: "route_forgetPass",
  },
  verifyOTP: {
    path: AppRoutes.verifyOTP,
    component: VerifyOtpPage,
    id: "route_verifyOTP",
  },
  setNewPassword: {
    path: AppRoutes.setNewPassword,
    component: SetNewPassPage,
    id: "route_setNewPassword",
  },
  // //#endregion unauthenticated routes
  // //#region common routes
  verifyOTPFromEmail: {
    path: AppRoutes.verifyOTPFromEmail,
    component: VerifyOTPFromEmailPage,
    id: "route_verifyOTPFromEmail",
    common: true,
  },
  signupThroughProvider: {
    path: AppRoutes.signupThroughProvider,
    component: SignupThroughProvider,
    id: "route_signupThroughProvider",
    common: true,
  },
  invitationSignup: {
    path: AppRoutes.invitationSignup,
    component: ReferralPage,
    id: "route_invitationSignup",
    common: true,
  },
  discountSignup: {
    path: AppRoutes.discountSignup,
    component: ReferralPage,
    id: "route_discountSignup",
    common: true,
  },
  unsubscribeCampaign: {
    path: AppRoutes.unsubscribeCampaign,
    component: UnsubscribeCampaign,
    id: "route_unsubscribeCampaign",
    common: true,
  },
  smtpIdentityVerify: {
    path: AppRoutes.smtpIdentityVerify,
    component: SMTPIdentityVerifyPage,
    id: "route_smtpIdentityVerify",
    common: true,
  },
  previewCampaign: {
    path: AppRoutes.previewCampaign,
    component: PreviewCampaignFromLink,
    id: "route_previewCampaign",
    common: true,
  },
  plansAndPricing: {
    path: AppRoutes.plansAndPricing,
    component: PlansAndPricingPage,
    id: "route_plansAndPricing",
    common: true,
  },
  // //common routes for forms
  submitForm: {
    path: AppRoutes.submitForm,
    component: SubmitFormManager,
    id: "route_submitForm",
    common: true,
  },
  roughPage: {
    path: AppRoutes.roughPage,
    component: RoughPage,
    id: "route_roughPage",
    common: true,
  },
  // //#endregion common routes
  // //#region authenticated routes
  userProfileUpgradeWithPlan: {
    path: AppRoutes.userProfileUpgradeWithPlan,
    component: ProfilePage,
    id: "route_userProfileUpgradeWithPlan",
    auth: true,
  },
  coupon: {
    path: AppRoutes.coupon,
    component: CouponPage,
    id: "route_coupon",
    auth: true,
  },
  manageQrCodes: {
    path: AppRoutes.manageQrCodes,
    component: ManageQrCodes,
    id: "route_manageQrCodes",
    auth: true,
    assetRequired: true,
  },
  imageEditor: {
    path: AppRoutes.imageEditor,
    component: ImageEditor,
    id: "route_imageEditor",
    auth: true,
    assetRequired: true,
  },
  userProfilePayment: {
    path: AppRoutes.userProfilePayment,
    component: ProfilePage,
    id: "route_userProfilePayment",
    auth: true,
  },
  userProfileUpgrade: {
    path: AppRoutes.userProfileUpgrade,
    component: ProfilePage,
    id: "route_userProfileUpgrade",
    auth: true,
  },
  userProfile: {
    path: AppRoutes.userProfile,
    component: ProfilePage,
    id: "route_userProfile",
    auth: true,
  },
  userInvoices: {
    path: AppRoutes.userInvoices,
    component: InvoicePage,
    id: "route_userInvoices",
    auth: true,
  },
  assetListing: {
    path: AppRoutes.assetListing,
    component: AssetListing,
    id: "route_assetListing",
    auth: true,
  },
  // //#region authenticated and asset router routes
  gradientMakerPage: {
    path: AppRoutes.gradientMakerPage,
    component: GradientMakerPage,
    id: "route_gradientMakerPage",
    auth: true,
    assetRequired: true,
  },
  RandomBlobMaker: {
    path: AppRoutes.randomBlobMaker,
    component: RandomBlobMaker,
    id: "route_randomBlobMakerPage",
    auth: true,
    assetRequired: true,
  },
  RandomBlurryBackgroundMaker: {
    path: AppRoutes.randomBlurryBackgroundMaker,
    component: RandomBlurryBackgroundMaker,
    id: "route_randomBlurryBackgroundMaker",
    auth: true,
    assetRequired: true,
  },
  RandomLayeredWaveMaker: {
    path: AppRoutes.randomLayeredWaveMaker,
    component: RandomLayeredWaveMaker,
    id: "route_randomLayeredWaveMaker",
    auth: true,
    assetRequired: true,
  },
  RandomBlobSceneMaker: {
    path: AppRoutes.randomBlobSceneMaker,
    component: RandomBLobSceneMaker,
    id: "route_randomBlobSceneMaker",
    auth: true,
    assetRequired: true,
  },
  assetDashboard: {
    path: AppRoutes.assetDashboard,
    component: DashboardPage,
    id: "route_assetDashboard",
    auth: true,
    assetRequired: true,
  },
  siteImport: {
    path: AppRoutes.siteImport,
    component: SiteImport,
    id: "route_siteImport",
    auth: true,
    assetRequired: true,
  },
  siteImportInventory: {
    path: AppRoutes.siteImportInventory,
    component: SiteImportInventory,
    id: "route_siteImportInventory",
    auth: true,
    assetRequired: true,
  },
  teams: {
    path: AppRoutes.teams,
    component: TeamsPage,
    id: "route_teams",
    auth: true,
    assetRequired: true,
  },
  contactListing: {
    path: AppRoutes.contactListing,
    component: ContactTabs,
    id: "route_contactListing",
    auth: true,
    assetRequired: true,
  },
  manageAudience: {
    path: AppRoutes.manageAudience,
    component: ContactTabs,
    id: "route_manageAudience",
    auth: true,
    assetRequired: true,
  },
  manageContact: {
    path: AppRoutes.manageContact,
    component: ContactTabs,
    id: "route_manageContact",
    auth: true,
    assetRequired: true,
  },
  taskWithId: {
    path: AppRoutes.taskWithId,
    component: TasksPage,
    id: "route_taskWithId",
    auth: true,
    assetRequired: true,
  },
  tasks: {
    path: AppRoutes.tasks,
    component: TasksPage,
    id: "route_taskWithId",
    auth: true,
    assetRequired: true,
  },
  images: {
    path: AppRoutes.images,
    component: ImagePage,
    id: "route_images",
    auth: true,
    assetRequired: true,
  },
  create: {
    path: AppRoutes.create,
    component: Create,
    id: "route_create",
    auth: true,
    assetRequired: true,
  },
  branding: {
    path: AppRoutes.branding,
    component: Branding,
    id: "route_branding",
    auth: true,
    assetRequired: true,
  },
  plans: {
    path: AppRoutes.plans,
    component: Plans,
    id: "route_plans",
    auth: true,
    assetRequired: true,
  },
  topics: {
    path: AppRoutes.topics,
    component: Topics,
    id: "route_topics",
    auth: true,
    assetRequired: true,
  },
  verifyEmails: {
    path: AppRoutes.verifyEmails,
    component: VerifyEmails,
    id: "route_verifyEmails",
    auth: true,
    assetRequired: true,
  },
  campaignListing: {
    path: AppRoutes.campaignListing,
    component: MailListing,
    auth: true,
    assetRequired: true,
  },
  addCampaign: {
    path: AppRoutes.addCampaign,
    component: MailInstance,
    id: "route_addCampaign",
    auth: true,
    assetRequired: true,
  },
  editCampaign: {
    path: AppRoutes.editCampaign,
    component: MailInstance,
    id: "route_editCampaign",
    auth: true,
    assetRequired: true,
  },
  duplicateCampaign: {
    path: AppRoutes.duplicateCampaign,
    component: MailInstance,
    id: "route_duplicateCampaign",
    auth: true,
    assetRequired: true,
  },
  mailTracker: {
    path: AppRoutes.mailTracker,
    component: MailTracker,
    id: "route_mailTracker",
    auth: true,
    assetRequired: true,
  },
  mailTrackerUnread: {
    path: AppRoutes.mailTrackerUnread,
    component: MailTrackerUnread,
    id: "route_mailTrackerUnread",
    auth: true,
    assetRequired: true,
  },
  resetPage: {
    path: AppRoutes.resetPage,
    component: ResetPage,
    id: "route_resetPage",
    auth: true,
    assetRequired: true,
  },
  acSuspendedPage: {
    path: AppRoutes.acSuspendedPage,
    component: AcSuspendedPage,
    id: "route_acSuspendedPage",
    auth: true,
    assetRequired: false,
  },
  manageDomains: {
    path: AppRoutes.manageDomains,
    component: ManageDomains,
    id: "route_manageDomains",
    auth: true,
    assetRequired: true,
  },
  formDesign: {
    path: AppRoutes.formDesign,
    component: FormsConfigurator,
    id: "route_formDesign",
    auth: true,
    assetRequired: true,
  },
  formQuestions: {
    path: AppRoutes.formQuestions,
    component: FormQuestions,
    id: "route_formQuestions",
    auth: true,
    assetRequired: true,
  },
  formMessages: {
    path: AppRoutes.formMessages,
    component: FormsMessages,
    id: "route_formMessages",
    auth: true,
    assetRequired: true,
  },
  singleFormResponses: {
    path: AppRoutes.singleFormResponses,
    component: FormResponses,
    id: "route_singleFormResponses",
    auth: true,
    assetRequired: true,
  },
  formsListing: {
    path: AppRoutes.formsListing,
    component: FormsListing,
    id: "route_formsListings",
    auth: true,
    assetRequired: true,
  },
  webPages: {
    path: AppRoutes.webPages,
    component: WebPages,
    id: "route_webPages",
    auth: true,
    assetRequired: true,
  },
  designer: {
    path: AppRoutes.designer,
    component: Designer,
    id: "route_designer",
    auth: true,
    assetRequired: true,
  },
  sku: {
    path: AppRoutes.sku,
    component: SkuListing,
    id: "sku",
    auth: true,
    assetRequired: true,
  },
  //#endregion authenticated and asset router routes
  //#endregion authenticated routes
};

// delete those route which are blocked in prod
const blockRoute = (BLOCKED_ROUTES) => {
  BLOCKED_ROUTES.forEach((key) => {
    if (Routes.hasOwnProperty(key)) {
      delete Routes[key];
    }
  });
};
const enableUnreleasedFeatures = import.meta.env
  .VITE_APP_ENABLE_UNRELEASED_FEATURES;
if (enableUnreleasedFeatures === "www") {
  blockRoute(BLOCKED_ROUTES_PROD);
}
if (enableUnreleasedFeatures === "dev") {
  blockRoute(BLOCKED_ROUTES_DEV);
}

const getRoutes = (type) => {
  // define route type
  const _routes = [];
  // filter routes where authentication is required
  if (type === ROUTE_TYPES.AUTH) {
    for (let key in Routes) {
      const _route = Routes[key];
      if (_route[ROUTE_TYPES.AUTH] && _route[ROUTE_TYPES.AUTH] === true) {
        _routes.push(_route);
      }
    }
  }
  // filter non-authenticated routes
  if (type === ROUTE_TYPES.UN_AUTH) {
    for (let key in Routes) {
      const _route = Routes[key];
      if (!_route[ROUTE_TYPES.AUTH] && !_route[ROUTE_TYPES.COMMON]) {
        _routes.push(_route);
      }
    }
  }
  // push common routes
  if (type === ROUTE_TYPES.COMMON) {
    for (let key in Routes) {
      const _route = Routes[key];
      if (_route["common"] && _route["common"] === true) {
        _routes.push(_route);
      }
    }
  }
  // create named routes
  return _routes.map((route, index) => {
    const routeJsx = (
      <Route
        exact
        key={`route-${index}`}
        path={route.path}
        render={(routeProps) => (
          <ErrorBoundary id={`from-${route.id}`}>
            {route.auth &&
            route.auth === true &&
            route.assetRequired &&
            route.assetRequired === true ? (
              <AssetRouter>
                {React.createElement(route.component, { ...routeProps })}
              </AssetRouter>
            ) : (
              React.createElement(route.component, { ...routeProps })
            )}
          </ErrorBoundary>
        )}
      />
    );
    return route.vid ? null : routeJsx;
  });
};

export { getRoutes };
