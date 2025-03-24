import React, { useState } from "react";
// import RangeSlider from "../range-slider";
// import TextInput, {  } from "../Input/text-input";
// import ComboButton from "../Buttons/ButtonGroup";
// import RadioInput from "../radio-button";
// import IconButton from "../Buttons/IconButton";
// import { handleRightPanelUpdates } from "./helper-functions";
// import { ACTIONS } from "./constants";
import { saveAs } from "file-saver";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Title } from "@/components/ui/title";
import { Label } from "@/components/ui/label";
import RadioInput from "@/components/ui/custom/radio-input";
import { Download } from "lucide-react";
import { handleRightPanelUpdates } from "../../designer-helper-functions";
import { ACTIONS } from "../../Constants/designer-constants";

const SaveModalJsx = ({
  defaultFileName,
  defaultFileType,
  imageWidth,
  ratio,
  canvas,
  theme,
}) => {
  const [fileName, set_fileName] = useState(defaultFileName);
  const [chosenFileType, set_chosenFileType] = useState(defaultFileType);
  const [ImageWidth, set_ImageWidth] = useState(imageWidth);
  const [ImageHeight, set_ImageHeight] = useState(parseInt(imageWidth / ratio));
  const [imgQuality, set_jpegQuality] = useState(90);
  const [selection, setSelection] = useState("page");
  console.log(chosenFileType);
  const btns = [
    {
      btnText: "PNG",
      value: "png",
    },
    {
      btnText: "JPEG",
      value: "jpeg",
    },
    {
      btnText: "WEBP",
      value: "webp",
    },
    {
      btnText: "SVG",
      value: "svg",
    },
  ];
  return (
    <div className="SaveDownloadModal p-2 modal-body">
      <Input
        theme={theme}
        autoFocus={true}
        value={fileName}
        onChange={(e) => {
          set_fileName(e.target.value);
        }}
        label="File Name:"
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          marginTop: "10px",
        }}
      >
        <span
          className="fileName"
          style={{
            color: theme !== "dark" ? "black" : "white",
          }}
        >
          {fileName}.{chosenFileType}
        </span>
        <div style={{ display: "flex", gap: "10px" }}>
          <div
            style={{
              height: "120px",
              width: "200px",
              backgroundImage: `url(${
                selection === "page"
                  ? canvas.toDataURL()
                  : canvas.getActiveObject().toDataURL()
              })`,
              backgroundColor: "#fff",
              backgroundSize: "contain",
              backgroundPosition: "50%",
              backgroundRepeat: "no-repeat",
              border: "1px solid #eee",
            }}
          ></div>
          <div className="flex flex-col gap-2">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => {
                setSelection("page");
              }}
            >
              <input type="radio" checked={selection === "page"} />
              <Label
                className={`cursor-pointer ${
                  theme === "dark" ? "text-white" : ""
                }`}
              >
                Full Page
              </Label>
            </div>
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => {
                setSelection("selected");
              }}
            >
              <input type="radio" checked={selection === "selected"} />
              <Label
                className={`cursor-pointer ${
                  theme === "dark" ? "text-white" : ""
                }`}
              >
                Selected Element
              </Label>
            </div>
          </div>
        </div>

        <div className="text-alignment">
          <Label className={`${theme === "dark" ? "text-white" : ""}`}>
            Type:
          </Label>
          <div className="flex gap-0.5 mb-2">
            {btns.map((item) => (
              <Title key={item.value} title={item.value}>
                <Button
                  type="button"
                  variant="outline"
                  className={`cursor-pointer ${
                    chosenFileType === item.value ? "border-emerald-600" : ""
                  }`}
                  onClick={() => {
                    set_chosenFileType(item.value);
                  }}
                >
                  {item.btnText}
                </Button>
              </Title>
            ))}
          </div>
        </div>
        {chosenFileType === "jpeg" || chosenFileType === "webp" ? (
          <div
            style={{
              marginTop: "10px",
            }}
          >
            <Slider
              min={0}
              max={100}
              step={1}
              value={[imgQuality]}
              unit={"%"}
              onValueChange={(value) => {
                console.log(value);
                set_jpegQuality(value[0]);
              }}
              theme={theme}
              label={"Image Quality:"}
            />
          </div>
        ) : null}
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <div className="w-[48%]">
            <Input
              theme={theme}
              autoFocus={true}
              type="number"
              value={ImageWidth}
              onChange={(e) => {
                set_ImageWidth(parseInt(e.target.value));
                set_ImageHeight(parseInt(e.target.value / ratio));
              }}
              label="Width:"
            />
          </div>
          <div className="w-[48%]">
            <Input
              theme={theme}
              autoFocus={true}
              type="number"
              value={ImageHeight}
              onChange={(e) => {
                set_ImageWidth(parseInt(e.target.value * ratio));
                set_ImageHeight(parseInt(e.target.value));
              }}
              label="Height:"
            />
          </div>

          {/* <IconButton
            btnClick={() => {
              handleRightPanelUpdates(
                ACTIONS.DOWNLOAD_PAGE,
                {
                  fileName,
                  chosenFileType,
                  ImageWidth,
                  ImageHeight,
                  imgQuality,
                  selection,
                },
                self
              );
            }}
            btnText={"Download "}
            rightIcon={"icon-download"}
            variant="light"
          />
          <IconButton
            // btnClick={handleShow}
            btnText={"Save To Library "}
            rightIcon={"icon-save"}
            variant="light"
          /> */}
        </div>
      </div>
      <div className="flex mt-8 justify-center mb-5 items-center gap-2">
        <Button
          variant="outline"
          onClick={() => {
            if (selection === "page") {
              const fileSVGData = canvas.toDataURL({
                format: chosenFileType,
                quality: imgQuality / 100,
              });
              saveAs(fileSVGData, fileName + "." + chosenFileType);
            } else {
              const fileSVGData = canvas.getActiveObject().toDataURL({
                format: chosenFileType,
                quality: imgQuality / 100,
              });
              saveAs(fileSVGData, fileName + "." + chosenFileType);
            }
          }}
        >
          <span>
            <Download />
          </span>
          Download
        </Button>
      </div>
    </div>
  );
};

export default SaveModalJsx;
