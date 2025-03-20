import React, { Component, Suspense } from "react";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Switch, Redirect, withRouter } from "react-router-dom";

import { getRoutes } from "./routes.config";
import authActions from "../store/actions/auth.actions";
import { SkeletonAdminLike } from "../components/skeleton-loader/skeleton-loader";
import { authenticatedRoutePrefixes, ROUTE_TYPES } from "./common.constants";
import AppRoutes from "./routes";

class AppRouter extends Component {
  constructor(props) {
    super(props);
    // if access token is available in localStorage, we will always get it here
    // otherwise we get null.
    // if we get null, we will save the redirectUrl
    const pathName = this.props.location?.pathname + "";
    const queryParams = this.props.location?.search + "";
    // if pathName is an authenticated route then only we will save it, otherwise not
    const isTargetAutheticatedRoute = authenticatedRoutePrefixes.some((route) =>
      pathName.startsWith(route)
    );
    if (
      !this.props.accessToken &&
      !localStorage.getItem("bmwApp__redirectUrl") &&
      pathName &&
      isTargetAutheticatedRoute
    ) {
      // authenticated routes will not render and
      // NOTE: `pathname` does not contains domain name
      // NOTE: `pathname` does not contains any query parameters, so we have to manually add them if any
      localStorage.setItem("bmwApp__redirectUrl", pathName.concat(queryParams));
    }
  }

  appRoutes() {
    const { initErr, loginRedirect } = this.props;
    const unAuthenticatedRoutes = (
      // unauthenticated routes
      <Suspense fallback={<React.Fragment>&nbsp;</React.Fragment>}>
        <Switch>
          {getRoutes(ROUTE_TYPES.UN_AUTH)}
          {getRoutes(ROUTE_TYPES.COMMON)}
          {initErr === "INIT_FAILED" ? (
            <Redirect to={AppRoutes.loginWhenInitFailed} />
          ) : (
            <Redirect to={AppRoutes.login} />
          )}
        </Switch>
      </Suspense>
    );

    const authenticatedRoutes = (
      // authenticated routes
      <Suspense fallback={<React.Fragment>&nbsp;</React.Fragment>}>
        <Switch>
          {getRoutes(ROUTE_TYPES.AUTH)}
          {getRoutes(ROUTE_TYPES.COMMON)}
          {loginRedirect && <Redirect to={loginRedirect} />}
        </Switch>
      </Suspense>
    );

    return {
      authenticatedRoutes,
      unAuthenticatedRoutes,
    };
  }

  defineRouting() {
    const { accessToken, init, initErr } = this.props;
    const { authenticatedRoutes, unAuthenticatedRoutes } = this.appRoutes();

    // if accessToken authenticatedRoutes || non-authenticated routes
    if (accessToken) {
      // if init is done check if there is any initErr || render nothing
      if (init) {
        // if initErr is set -> render went-wrong image || render authenticated routes
        if (initErr) {
          return <SkeletonAdminLike />; // app will redirect from here
        } else {
          return authenticatedRoutes;
        }
      } else {
        // init is in progress
        return <SkeletonAdminLike />;
      }
    } else {
      //render non-authenticated routes
      return unAuthenticatedRoutes;
    }
  }

  render() {
    return this.defineRouting();
  }
}

const mapStateToProps = (state) => ({
  accessToken: state.auth.accessToken,
  loginRedirect: state.auth.loginRedirect,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...authActions }, dispatch);

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(AppRouter);
