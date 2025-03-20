import React, { Component } from "react";
// import ReactDOM from "react-dom";
import ReactDOM from "react-dom/client";
import { cloneDeep as _cloneDeep } from "lodash";

import DynamicModal from "./dynamic-modal";
import { MODAL_CONSTANTS } from "./constants/constant";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.currentModalProps = null;
    this.renderedModalProps = [];
    this.containerId = "project-dynamic-modal-container";
  }

  /**
   * store data in variable
   * @param {Object} renderProps rendered modal props
   */
  mapPropsToState(renderProps) {
    this.currentModalProps = renderProps;
  }

  /**
   * show modal
   * @param {Object} renderProps rendered modal props
   */
  show({ portalId, ...renderProps }, isFooterFixed) {
    try {
      this.mapPropsToState(renderProps);

      // render element
      const element = React.createElement(DynamicModal, {
        ...renderProps,
        hide: () => this.hide(portalId),
        isFooterFixed,
      });
      this.containerId = portalId ?? this.containerId;
      const root = ReactDOM.createRoot(
        document.getElementById(portalId ?? this.containerId)
      );
      root.render(element);
      // set z index for modal
      this.setZIndex(renderProps);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * set z index for modal
   * @param {Object} renderProps
   */
  setZIndex(renderProps) {
    // add z index for an element
    document.getElementById(this.containerId).style.zIndex =
      renderProps?.zIndex || MODAL_CONSTANTS.zIndex;
  }

  /**
   * update modal
   * @param {Object} renderProps render props
   */
  updateModalContent(renderProps) {
    const element = React.createElement(DynamicModal, {
      ...renderProps,
      hide: (res) => this.hide(res),
    });
    const root = ReactDOM.createRoot(document.getElementById(this.containerId));
    root.render(element);
  }

  /**
   * hide modal
   * @param {Object} res response on hide modal
   */
  hide(portalId, isSuccess = false) {
    try {
      if (this.currentModalProps.cannotClose && !isSuccess) {
        return;
      }
      const container = document.getElementById(
        portalId ? portalId : this.containerId
      );
      const root = ReactDOM.createRoot(container);
      root.unmount();
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * update component props
   * @param {Object} renderProps updated props
   */
  update(renderProps) {
    try {
      const copyProps = this.currentModalProps;
      const updatedData = { ...copyProps, ...renderProps };
      // update newly data
      this.mapPropsToState(updatedData);
      // update modal content
      this.updateModalContent(updatedData);
      // update rendered modals
      this.updateRenderedPropsInArray(updatedData);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   *
   * @param {Object} renderProps update updated props in array
   */
  updateRenderedPropsInArray(renderProps) {
    try {
      const renderedModalProps = _cloneDeep(this.renderedModalProps);
      const lastArrayIndex = renderedModalProps.length
        ? renderedModalProps?.length - 1
        : 0;
      renderedModalProps[lastArrayIndex] = renderProps;
      this.renderedModalProps = renderedModalProps;
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return <React.Fragment></React.Fragment>;
  }
}

export default new Modal();
