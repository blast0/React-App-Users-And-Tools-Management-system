import { Component } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { Input } from "../input";

class DateTimePicker extends Component {
  constructor(props) {
    super(props);
  }

  changeDate(date) {
    const time = moment(this.props.value).format("HH:mm");
    const newValue = moment(`${date} ${time}`, "YYYY-MM-DD hh:mm")
      .utc()
      .format();

    this.props.onChange(newValue);
  }

  changeTime(time) {
    const date = moment(this.props.value).format("YYYY-MM-DD");
    const newValue = moment(`${date} ${time}`, "YYYY-MM-DD hh:mm")
      .utc()
      .format();

    this.props.onChange(newValue);
  }

  render() {
    const { value, label } = this.props;
    const date = moment(value).format("YYYY-MM-DD");
    const time = moment(value).format("HH:mm");

    return (
      <div className="date-time-picker columns">
        <div className="column col-12">
          <div>
            <span className="label-container">{label}</span>
          </div>
        </div>
        <div className="column col-6">
          <Input
            className="block"
            type="date"
            value={date}
            onChange={(e) => {
              this.changeDate(e.target.value);
            }}
          />
        </div>
        <div className="column col-6">
          <Input
            className="block"
            type="time"
            label=" "
            value={time}
            onChange={(e) => {
              this.changeTime(e.target.value);
            }}
          />
        </div>
      </div>
    );
  }
}

export default DateTimePicker;

DateTimePicker.defaultProps = {
  value: moment().utc().format(),
  label: "Date Time",
};

DateTimePicker.propTypes = {
  value: PropTypes.string,
};
