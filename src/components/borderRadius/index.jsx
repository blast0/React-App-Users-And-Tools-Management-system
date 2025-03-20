import { useState } from "react";

import { Slider } from "../ui/slider";

import "./borderRadius.css";
import { Link2, Unlink } from "lucide-react";

const BorderRadius = ({
  onChange = () => {},
  lock = false,
  showLockBtn = false,
  showInputBoxes = false,
  defaultValues = [
    { label: "BorderX", min: 0, max: 100, value: 5 },
    { label: "BorderY", min: 0, max: 100, value: 5 },
  ],
}) => {
  const initialValues = [];
  const showLockButton = showLockBtn && defaultValues.length === 2;
  const isLocked = lock && defaultValues.length === 2;
  defaultValues.forEach((item) => {
    if (item.value) {
      initialValues.push(item.value);
    } else {
      initialValues.push(5);
    }
  });
  const [locked, setLocked] = useState(isLocked);
  const [values, setValues] = useState(initialValues);
  const toggleLock = () => {
    let bigger = values[0] > values[1] ? values[0] : values[1];
    const newValues = [];
    newValues.push(bigger);
    newValues.push(bigger);
    values.forEach((val, valueIndex) => {
      if (valueIndex > 1) {
        newValues.push(val);
      }
    });
    setValues(newValues);
    setLocked(!locked);
    onChange(...newValues, !locked);
  };

  const updateUnlockedValues = (newValues, controlIndex, value) => {
    values.forEach((val, valueIndex) => {
      if (valueIndex === controlIndex) {
        newValues.push(value);
      } else {
        newValues.push(val);
      }
    });
  };

  return (
    <div className="Slider-With-Input-Controls">
      {showLockButton ? (
        <div className="Toggle-icon-container">
          <span
            className={`toggle-lock-icon ${!locked ? "off" : ""}`}
            onClick={() => {
              toggleLock();
            }}
          >
            {locked ? <Link2 /> : <Unlink />}
          </span>
        </div>
      ) : null}
      {defaultValues.map((item, controlIndex) => {
        return (
          <div
            key={"inputAndSlider" + controlIndex}
            style={{
              width: "100%",
            }}
          >
            <label>{item.label}</label>
            <div className="inputAndSlider">
              {showInputBoxes ? (
                <div className="TextInput">
                  <input
                    type="number"
                    min={item?.min}
                    max={item?.max ? item.max : 100}
                    value={item?.value}
                    onChange={(e) => {
                      let value = parseInt(e.target.value);
                      // if (value > 100) {
                      //   value = 100;
                      // }
                      let newValues = [];
                      if (locked) {
                        if (controlIndex === 0 || controlIndex === 1) {
                          newValues.push(value);
                          newValues.push(value);
                          values.forEach((val, valueIndex) => {
                            if (valueIndex > 1) {
                              newValues.push(val);
                            }
                          });
                        } else {
                          updateUnlockedValues(newValues, controlIndex, value);
                        }
                      } else {
                        updateUnlockedValues(newValues, controlIndex, value);
                      }
                      setValues(newValues);
                      onChange(...newValues, locked);
                    }}
                  />
                </div>
              ) : null}
              <Slider
                min={item?.min}
                max={item?.max ? item.max : 100}
                step={1}
                value={[item?.value]}
                onValueChange={(value) => {
                  let val = parseInt(value);
                  let newValues = [];
                  if (locked) {
                    if (controlIndex === 0 || controlIndex === 1) {
                      newValues.push(val);
                      newValues.push(val);
                      values.forEach((v, valueIndex) => {
                        if (valueIndex > 1) {
                          newValues.push(v);
                        }
                      });
                    } else {
                      updateUnlockedValues(newValues, controlIndex, val);
                    }
                  } else {
                    updateUnlockedValues(newValues, controlIndex, val);
                  }
                  setValues(newValues);
                  onChange(...newValues, locked);
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BorderRadius;
