import React from "react";
import manager from "./manager";

class Spinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
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
  show() {
    this.setState({ active: "active" });
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
            className="absolute inset-0 z-[999] flex items-center justify-center bg-black/30"
            style={overlayProps}
          >
            <div className="Spinner-loader"></div>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

Spinner.defaultProps = {
  overlayProps: {},
};

export default Spinner;
