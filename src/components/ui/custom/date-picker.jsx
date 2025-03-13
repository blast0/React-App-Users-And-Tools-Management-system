import { Input } from "../input";

const DatePicker = ({ value, label = "", className = "", onChange }) => {
  return (
    <div className="cls">
      <Input
        className={`block ${className}`}
        label={label}
        type="date"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default DatePicker;
