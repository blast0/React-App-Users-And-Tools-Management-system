import { useEffect, useState } from "react";
import { Slider } from "../../slider";
import ColorInput from "../color-input";
import { Button } from "../../button";
import { Title } from "../../title";
import CopyToClipboard from "@/components/copy-to-clipboard";

import "./boxshadow.css";
import { Input } from "../../input";

const convertToConfig = (val) => {
  let names = val.split(" ");
  const result = names.filter((word) => {
    if (word !== "") return word;
  });
  let _type = "";
  let _shadowColor = "";
  let _xoffset = "";
  let _yoffset = "";
  let _blur = "";
  let _spread = "";
  if (result.length === 4) {
    (_shadowColor = result[0]),
      (_xoffset = parseInt(result[1])),
      (_yoffset = parseInt(result[2])),
      (_blur = parseInt(result[3]));
  } else if (result.length === 5) {
    (_shadowColor = result[0]),
      (_xoffset = parseInt(result[1])),
      (_yoffset = parseInt(result[2])),
      (_blur = parseInt(result[3])),
      (_spread = parseInt(result[4]));
  } else if (result.length === 6) {
    (_type = result[0]),
      (_shadowColor = result[1]),
      (_xoffset = parseInt(result[2])),
      (_yoffset = parseInt(result[3])),
      (_blur = parseInt(result[4])),
      (_spread = parseInt(result[5]));
  } else {
    _type = "";
    _shadowColor = "grey";
    (_xoffset = 5), (_yoffset = 5), (_blur = 0), (_spread = 0);
  }
  return {
    type: _type,
    shadowColor: _shadowColor,
    xoffset: _xoffset,
    yoffset: _yoffset,
    blur: _blur,
    spread: _spread,
  };
};

const BoxShadow = ({
  onChange = () => {},
  showPreview = true,
  configKey,
  showCopyClipboard,
  showSpread,
  showTypeButton,
  value,
}) => {
  const [boxShadow, setBoxShadow] = useState(value);
  const [config, setConfig] = useState(convertToConfig(value));
  const [showInput, setShowInput] = useState(false);
  const { type, shadowColor, xoffset, yoffset, blur, spread } = config;
  useEffect(() => {
    let shadow = "";
    let shadowItems = [];
    if (type) shadowItems.push(type);
    shadowItems.push(shadowColor);
    shadowItems.push(xoffset + "px");
    shadowItems.push(yoffset + "px");
    shadowItems.push(blur + "px");
    if (spread !== "") {
      shadowItems.push(spread + "px");
    }
    shadow = shadowItems.join(" ");
    setBoxShadow(shadow);
    onChange(shadow, configKey);
  }, [config]);

  return (
    <div className="BoxShadow">
      <div className="Control-items">
        {showTypeButton ? (
          <div className="mb-5">
            <div className="text-xs font-bold mb-2">Type</div>
            <div className="flex items-center gap-1">
              {type === "" ? (
                <Button
                  type="button"
                  size="sm"
                  onClick={() => {
                    setConfig({
                      ...config,
                      type: "",
                    });
                  }}
                >
                  Outset
                </Button>
              ) : (
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setConfig({
                      ...config,
                      type: "",
                    });
                  }}
                >
                  Outset
                </Button>
              )}
              {type !== "" ? (
                <Button
                  type="button"
                  size="sm"
                  onClick={() => {
                    setConfig({
                      ...config,
                      type: "inset",
                    });
                  }}
                >
                  Inset
                </Button>
              ) : (
                <Button
                  variant="outline"
                  type="button"
                  size="sm"
                  onClick={() => {
                    setConfig({
                      ...config,
                      type: "inset",
                    });
                  }}
                >
                  Inset
                </Button>
              )}
              {!showInput ? (
                <Title title="Copy to clipboard">
                  <Button
                    variant="outline"
                    type="button"
                    size="sm"
                    onClick={() => {
                      setShowInput(!showInput);
                    }}
                  >
                    <i className="icon-common icon-edit"></i>
                  </Button>
                </Title>
              ) : (
                <Title title="Copy to clipboard">
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => {
                      setShowInput(!showInput);
                    }}
                  >
                    <i className="icon-common icon-edit"></i>
                  </Button>
                </Title>
              )}
            </div>
          </div>
        ) : null}
        <div className="mb-5">
          <div className="mb-2 text-xs font-bold">X-offset</div>
          <div className="flex gap-2 items-center justify-between">
            <div className="w-full">
              <Slider
                valueVisible={showInput ? false : true}
                min={-20}
                max={20}
                step={1}
                value={[xoffset]}
                onValueChange={(value) => {
                  setConfig({
                    ...config,
                    xoffset: value,
                  });
                }}
              />
            </div>
            {showInput ? (
              <div className="w-24">
                <Input
                  type="number"
                  value={xoffset}
                  onChange={(e) => {
                    setConfig({
                      ...config,
                      xoffset: e.target.value,
                    });
                  }}
                />
              </div>
            ) : null}
          </div>
        </div>

        <div className="mb-5">
          <div className="mb-2 text-xs font-bold">Y-offset</div>
          <div className="flex gap-2 items-center justify-between">
            <div className="w-full">
              <Slider
                valueVisible={showInput ? false : true}
                min={-20}
                max={20}
                value={[yoffset]}
                step={1}
                onValueChange={(value) => {
                  setConfig({
                    ...config,
                    yoffset: value,
                  });
                }}
              />
            </div>
            {showInput ? (
              <div className="w-24">
                <Input
                  type="number"
                  value={yoffset}
                  onChange={(e) => {
                    setConfig({
                      ...config,
                      yoffset: e.target.value,
                    });
                  }}
                />
              </div>
            ) : null}
          </div>
        </div>
        <div className="mb-5">
          <div className="mb-2 text-xs font-bold">Blur</div>
          <div className="flex gap-2 items-center justify-between">
            <div className="w-full">
              <Slider
                valueVisible={showInput ? false : true}
                min={0}
                max={20}
                step={1}
                value={[blur]}
                onValueChange={(value) => {
                  setConfig({
                    ...config,
                    blur: value,
                  });
                }}
              />
            </div>
            {showInput ? (
              <div className="w-24">
                <Input
                  type="number"
                  value={blur}
                  onChange={(e) => {
                    setConfig({
                      ...config,
                      blur: e.target.value,
                    });
                  }}
                />
              </div>
            ) : null}
          </div>
        </div>
        {showSpread ? (
          <div className="mb-5">
            <div className="mb-2 text-xs font-bold">Spread</div>
            <div className="flex gap-2 items-center justify-between">
              <div className="w-full">
                <Slider
                  valueVisible={showInput ? false : true}
                  min={0}
                  max={20}
                  step={1}
                  value={[spread]}
                  onValueChange={(value) => {
                    setConfig({
                      ...config,
                      spread: value,
                    });
                  }}
                />
              </div>
              {showInput ? (
                <div className="w-24">
                  <Input
                    type="number"
                    value={spread}
                    onChange={(e) => {
                      setConfig({
                        ...config,
                        spread: e.target.value,
                      });
                    }}
                  />
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
        <div>
          <div className="text-xs font-bold mb-1">Color</div>
          <ColorInput
            color={shadowColor}
            onChange={(color) => {
              setConfig({
                ...config,
                shadowColor: color,
              });
            }}
          />
        </div>
        {showPreview ? (
          <div className="preview mt-5">
            <div className="text-xs font-bold mt-3">Preview</div>
            <div
              className="previewBox m-5"
              style={{ boxShadow: boxShadow }}
            ></div>
          </div>
        ) : null}
        {showCopyClipboard ? (
          <div className="flex items-center gap-1">
            <pre className="code mt-3">
              <code className="code-block">box-shadow:{boxShadow};</code>
            </pre>
            <CopyToClipboard
              copy={boxShadow}
              position="top"
              jsx={
                <Title title="Copy to clipboard">
                  <Button type="button" size="sm">
                    <i className="icon-common icon-copy"></i>
                  </Button>
                </Title>
              }
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default BoxShadow;
