import React, { Component } from "react";
import { isEqual as _isEqual, clone as _clone } from "lodash";
// import { Provider } from "react-redux";

// import store from "../../store";
import { MODAL_RES, MODAL_INTERFACE } from "../../config/common.constants";

import "./dynamic-modal.css";
import { Button } from "../ui/button";

const DEFAULT_CONFIG = ["500px", "auto", "rgba(0,0,0,0.25)"];
class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFullScreen: false,
    };
    // bind function context
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    // listen to document events
    document.addEventListener("keydown", this.handleKeydown);
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    // remove listeners
    document.removeEventListener("keydown", this.handleKeydown);
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  /**
   * toggle (close) if clicked on outside of element and already open
   */
  handleClickOutside(event) {
    // check clicked element is root i.e modal-overlay
    if (event.target.id === "modal-overlay" && this.props.closeOnOutSideClick) {
      this.btnClickHandler("cancel", true);
    }
  }

  // close modal on escape
  handleKeydown(evt) {
    evt = evt || window.event;
    if (evt.keyCode === 27) {
      this.btnClickHandler("cancel", true);
      //on escape IOS opens maximize view of browser to stop it doing prevent default
      evt.preventDefault();
      this.btnClickHandler("cancel", true);
    }
  }

  btnClickHandler(btnText) {
    const modalRes = _clone(MODAL_RES);
    modalRes.btnType = btnText;
    modalRes.resData = this.props?.resData || "";
    this.props.dynamicModalResponseFun(modalRes);
    this.props.hide();
  }

  mergeConfigs() {
    const config = DEFAULT_CONFIG.map((dConfig, index) => {
      return this.props.config[index] ?? dConfig;
    });
    return config;
  }

  toggleFullscreen() {
    this.setState({ isFullScreen: !this.state.isFullScreen });
  }

  render() {
    const { title, content, btns, withJsx } = this.props;
    const { isFullScreen } = this.state;
    // const { fullScreen } = this.props;
    // merge default and user supplied config
    const modalConfig = this.mergeConfigs();
    const [modalWidth, modalHeight, bgColor] = modalConfig;

    let containerStyles = {
      minWidth: "320px",
      maxWidth: "90vw",
      maxHeight: "90vh",
      width: `${modalWidth}`,
      height: `${modalHeight}`,
    };

    // ignore supplied height and width if fullscreen
    if (isFullScreen) {
      containerStyles = {
        maxWidth: "unset",
        maxHeight: "unset",
        width: `100vw`,
        height: `100vh`,
      };
    }

    return (
      // <Provider store={store}>
      <div
        // className={fullScreen ? `dynamic-modal fullscreen` : `dynamic-modal`}
        className={`dynamic-modal`}
      >
        <div className="modal active" id="modal-id">
          <span
            className="modal-overlay"
            id="modal-overlay"
            style={{ background: bgColor }}
            aria-label="Close"
          ></span>
          <div
            className={`modal-container ${this.props.containerClass || ""}`}
            style={containerStyles}
          >
            <div className="modal-header modal-header-override flex items-center justify-center">
              {title ? (
                <div
                  className={`${title[3] ? title[3] : ""} flex-1 ml-9`}
                  style={{
                    textAlign: title[1] ? title[1] : "left",
                    color: title[2] ? title[2] : "",
                  }}
                >
                  <h5 className="mb-0">{title[0]}</h5>
                </div>
              ) : null}
              <div className="flex items-center gap-1">
                <span
                  className={`btn clear-btn btn-fullscreen ${
                    isFullScreen ? "isActive" : ""
                  }`}
                  aria-label="fullscreen"
                  onClick={() => {
                    this.toggleFullscreen();
                  }}
                >
                  <i className="icon-fullscreen"></i>
                </span>
                <span
                  className="btn btn-clear modal-close-btn"
                  aria-label="Close"
                  onClick={() => {
                    this.btnClickHandler("cancel");
                  }}
                ></span>
              </div>
            </div>

            {content && !withJsx ? (
              <div className="modal-body">
                <div
                  style={{ textAlign: content[1], color: content[2] }}
                  className={`modal-content ${content[3]}`}
                >
                  {content[0]}
                </div>
              </div>
            ) : null}

            {withJsx
              ? this.props.isFooterFixed
                ? withJsx
                : withJsx && <div className="modal-body">{withJsx}</div>
              : null}

            {!_isEqual(this.props.btns, []) && (
              <div className="modal-footer mf-override">
                {btns &&
                  btns.map((btn, index) => {
                    const btnText = btn.text;
                    const btnType = btn.type ? btn.type : "outline";
                    return (
                      <React.Fragment key={`dm-modal-btn-${index}`}>
                        {btnType.toLowerCase() === "contained" ? (
                          <Button
                            className="mr-2"
                            type="button"
                            size="sm"
                            onClick={(e) => {
                              this.btnClickHandler(btnText);
                              e.stopPropagation();
                            }}
                          >
                            {btnText}
                            {btn.icon && (
                              <i className={`icon mx-1 ${btn.icon}`}></i>
                            )}
                          </Button>
                        ) : (
                          <Button
                            type="button"
                            variant="outline"
                            className={`mr-2 ${
                              btn.dangerHover ? "hover:text-red-500" : ""
                            }`}
                            size="sm"
                            onClick={(e) => {
                              this.btnClickHandler(btnText);
                              e.stopPropagation();
                            }}
                          >
                            {btn.icon && (
                              <i className={`mr-1 icon mx-1 ${btn.icon}`}></i>
                            )}
                            {btnText}
                          </Button>
                        )}
                      </React.Fragment>
                    );
                  })}

                {!this.props.btns && (
                  <React.Fragment>
                    <Button
                      className="mr-2"
                      type="button"
                      size="sm"
                      onClick={() => this.btnClickHandler("ok")}
                    >
                      Ok
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => this.btnClickHandler("cancel")}
                    >
                      Cancel
                    </Button>
                  </React.Fragment>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      // </Provider>
    );
  }
}

Modal.defaultProps = Object.assign({}, MODAL_INTERFACE);

export default Modal;
