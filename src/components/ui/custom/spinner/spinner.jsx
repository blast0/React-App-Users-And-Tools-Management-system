import React from "react";
import PropTypes from "prop-types";
import manager from "./manager";

class Spinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      msg: "",
    };
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }
  componentDidMount() {
    manager.register(this.props.id, {
      showSpinner: this.show,
      hideSpinner: this.hide,
    });
  }
  show(msg) {
    this.setState({ active: "active", msg });
  }

  hide() {
    this.setState({ active: "" });
  }

  render() {
    const { overlayProps } = this.props;
    return (
      <React.Fragment>
        {this.state.active ? (
          <div
            className="absolute inset-0 z-[999] flex flex-col items-center justify-center bg-black/30"
            style={overlayProps}
          >
            <div className="loading loading-lg"></div>
            <div className="bg-[rgba(244,140,6,0.25)] px-2 text-white">
              {this.state.msg}
            </div>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

Spinner.propTypes = {
  id: PropTypes.string.isRequired,
  overlayProps: PropTypes.object,
};

Spinner.defaultProps = {
  overlayProps: {},
};

export default Spinner;
