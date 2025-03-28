import React, { Component } from "react";
class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        className={`ColorBox bg-[${this.props.color}] w-[20px] h-[20px] rounded-[2px] cursor-pointer`}
        style={{
          background: this.props.color,
        }}
      ></div>
    );
  }
}

export default ColorBox;
