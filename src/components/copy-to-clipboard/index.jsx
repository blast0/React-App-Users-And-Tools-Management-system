import { Component } from "react";
import PropTypes from "prop-types";
import "./css/copy.css";

const COPY_RES = {
  type: "success",
};

class CopyToClipboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCopiedMsg: false,
    };
  }

  /**
   * will copy to clipboard
   * @param {Any} copy data to copy
   */
  copyToClipboardHandler(copy) {
    navigator.clipboard.writeText(copy);
    this.setState({ showCopiedMsg: true });
    // let parent know copied successfully
    this.props.copiedResponse(COPY_RES);
    // hide copied message after 1 second
    setTimeout(() => {
      this.setState({ showCopiedMsg: false });
    }, 1000);
  }

  render() {
    const { showCopiedMsg } = this.state;
    const { copy, iconClass, jsx, position, msg } = this.props;
    return (
      <div
        className="copy-container"
        onClick={() => this.copyToClipboardHandler(copy)}
      >
        <div>{jsx ? jsx : <i className={`${iconClass} icon-copy`}></i>}</div>
        {showCopiedMsg ? (
          <div className={`copied-toaster ${position}`}>
            <span>{msg}</span>
          </div>
        ) : null}
      </div>
    );
  }
}

CopyToClipboard.defaultProps = {
  copy: "copy",
  msg: "Copied!!!",
  copiedResponse: (data) => {},
  position: "bottom",
  iconClass: "",
  jsx: "",
};

CopyToClipboard.propTypes = {
  copy: PropTypes.any,
  msg: PropTypes.string,
  copiedResponse: PropTypes.func,
  position: PropTypes.string,
  iconClass: PropTypes.string,
  jsx: PropTypes.any,
};

export default CopyToClipboard;
