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
  onBtnClick,
  imageWidth,
  ratio,
  canvas,
  theme,
  self,
}) => {
  const [fileName, set_fileName] = useState(defaultFileName);
  const [chosenFileType, set_chosenFileType] = useState(defaultFileType);
  const [ImageWidth, set_ImageWidth] = useState(imageWidth);
  const [ImageHeight, set_ImageHeight] = useState(parseInt(imageWidth / ratio));
  const [jpegQuality, set_jpegQuality] = useState(0.9);
  const [selection, setSelection] = useState("page");
  console.log(jpegQuality);
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
    <div className="SaveDownloadModal modal-body">
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
          <RadioInput
            options={[
              { name: "Full Page", value: "page" },
              { name: "Selected Element", value: "selected" },
            ]}
            onValueChange={(value) => setSelection(value)}
            theme={theme}
            value={"page"}
            label={" Full Page"}
            checked={selection === "page"}
            defaultValue={selection}
          />
        </div>

        <div
          className="text-alignment"
          style={{
            marginTop: "10px",
          }}
        >
          <Label className={`${theme === "dark" ? "text-white" : ""}`}>
            Text Alignment:
          </Label>
          <div className="flex gap-0.5">
            {btns.map((item) => (
              <Title key={item.value} title={item.value}>
                <Button
                  type="button"
                  variant="outline"
                  size="icon-xs"
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
        {chosenFileType === "jpeg" ? (
          <div
            style={{
              marginTop: "10px",
            }}
          >
            <Slider
              min={0}
              max={1}
              step={0.1}
              value={[jpegQuality]}
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

          {/* <IconButton
            btnClick={() => {
              handleRightPanelUpdates(
                ACTIONS.DOWNLOAD_PAGE,
                {
                  fileName,
                  chosenFileType,
                  ImageWidth,
                  ImageHeight,
                  jpegQuality,
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
      <Button
        variant="outline"
        className="flex mt-10 items-center gap-2"
        onClick={() => {
          if (selection === "page") {
            const fileSVGData = canvas.toDataURL({
              format: chosenFileType,
              quality: jpegQuality,
            });
            saveAs(fileSVGData, fileName + "." + chosenFileType);
          } else {
            const fileSVGData = canvas.getActiveObject().toDataURL({
              format: chosenFileType,
              quality: jpegQuality,
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
  );
};

export default SaveModalJsx;
