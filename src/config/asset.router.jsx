import { Component } from "react";
import { Switch, Redirect, withRouter } from "react-router-dom";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
// STORE
import userActions from "../store/actions/user.actions";
import imagesActions from "../store/actions/images.actions";
import domainsActions from "../store/actions/domains.actions";
import webPagesActions from "../store/actions/web-pages.actions";
// PAGES
import { SkeletonAdminLike } from "../components/skeleton-loader/skeleton-loader";
// TODO: LAZY LOADING IN ALL COMPONENTS;
import Navigation from "../navigation-helper";
import AppRoutes from "./routes";
import withToastr from "../hoc/withToastr";
import { decodeJwtToken } from "../helper";
import { Spinner } from "@/components/spinner";
class AssetRouter extends Component {
  constructor(props) {
    super(props);
    // bind context to NavigationHelper
    const { assetName, assetId } = this.props.match.params;
    this.state = {
      hasLoaded: false,
    };
    Navigation.bindContext({
      assetName,
      assetId,
    });
  }

  componentDidMount() {
    this._init();
    if (this.isDeletingDomain()) {
      this.props.toast.error("Error", "The site is already being deleted.");
    }
  }

  componentDidUpdate() {}

  componentWillUnmount() {
    // remove context otherwise project name will show up in header and logo will hide
    localStorage.removeItem("bmwContext");
  }

  // check wheather domain delete is in progress
  isDeletingDomain() {
    const { asset } = this.props;
    const isDomainDeleting = asset.domain?.progress?.activity === "deleting";
    return isDomainDeleting;
  }

  async _init() {
    try {
      const { assetId } = this.props.match.params;
      // NOTE: When we refresh the page, asset key in user reducer becomes empty.
      // If we visit a page which is dependend on asset data but it's not fetched yet
      // - then it can run into error situation. This situation will not happen if
      // - users visits a page which already calls getProjectDetails and populates
      // - the reducer key. To bypass that issue we are populating that key from here.
      // get details of current asset (project)
      // TODO: this also causes fetching asseet details on every routes even though its fetched already. Have to fix
      const { getProjectDetails, getDomain } = this.props;
      if (Object.keys(this.props.asset).length === 0) {
        await getProjectDetails(assetId);
        this.getSiteColor(assetId);
      } else {
        let updateTheme = false;
        if (window.location.pathname.endsWith("/web-pages")) {
          updateTheme = true;
        }
        await getDomain(assetId, updateTheme);
      }
      /**
       * Catch block for getProjectDetails
       * Don't call the getDomain API if there's no asset found
       * Also, redirect the user back to the AssetListing page if no asset was found for the provided assetId
       */
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ hasLoaded: true });
    }
  }

  async getSiteColor() {
    const { asset } = this.props;
    const assetId = asset?._id,
      domainId = asset?.domain?._id;
    if (domainId && assetId)
      try {
        Spinner.showSpinner();
        this.props.getColorsSettings(assetId, domainId);
      } catch (error) {
        console.log(error);
        this.props.toast.error("Error", error);
      } finally {
        Spinner.hideSpinner();
      }
  }

  render() {
    const { accessToken } = this.props;
    const { assetName, assetId } = this.props.match.params;
    const decodedToken = decodeJwtToken(accessToken);
    const userStatus = decodedToken?.user?.status;
    const isUserSuspended = userStatus === "suspended";
    const isWebPageRoute = this.props.match.path === AppRoutes.webPages;

    const assetRoutes = (
      <Switch>
        {/** ROUTES TO RENDER WHEN USER IS DELETING PROGRESS [start] */}
        {this.isDeletingDomain() && isWebPageRoute ? (
          <Redirect
            to={Navigation.interpolate(AppRoutes.manageDomains, {
              assetName,
              assetId,
            })}
          />
        ) : null}
        {this.props.children}
        {/** ROUTES WHICH  RENDER WHEN USER IS DELETING PROGRESS [end] */}
        {/** If no route matches redirect to asset dashboard */}
        <Redirect to={AppRoutes.assetDashboard} />
      </Switch>
    );

    const suspendedRoute = (
      <>
        {/** At this stage context for navigation-helper may not be set, so providing
         * assetId and assetName excusively as pathPatams to `Navigation.interpolate()`
         */}
        <Redirect to={AppRoutes.acSuspendedPage} />
      </>
    );

    return !this.state.hasLoaded ? (
      <SkeletonAdminLike />
    ) : isUserSuspended ? (
      suspendedRoute
    ) : Object.keys(this.props.asset).length === 0 ? (
      <Redirect to={AppRoutes.assetListing} />
    ) : (
      assetRoutes
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  asset: state.user.asset,
  accessToken: state.auth.accessToken,
  siteColorsSetting: state.webPages.siteColorsSetting,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDomain: domainsActions.getDomain,
      postXAssetId: imagesActions.postXAssetId,
      getProjectDetails: userActions.getProjectDetails,
      getColorsSettings: webPagesActions.getColorsSettings,
    },
    dispatch
  );

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withToastr,
  withRouter
)(AssetRouter);
