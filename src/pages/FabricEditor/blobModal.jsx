import { useEffect, useState } from "react";
import { isEqual } from "lodash";

import { BLOB_TYPES } from "../blob-maker/blob.constants";
import { Title } from "@/components/ui/title";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Dropdown from "@/components/ui/custom/dropdown";
import LayeredBlobGenerator from "../create-random-layered-wave/layered-blob-generator";
import RandomBlobGenerator from "../create-random-blob/random-blob-generator";
import RandomBlob from "../create-random-blob/random-blob";
import LayeredWave from "../create-random-layered-wave/layered-wave";
import BlobSceneGenerator from "../create-random-blob-scene/blob-scene-generator";
import BlobScene from "../create-random-blob-scene/blob-scene";
import BlurryBlob from "../create-random-blurry-background/blurry-blob";
import BlurryBlobGenerator from "../create-random-blurry-background/blurry-blob-generator";

import "./blobModal.css";

const RandomBlobModal = ({
  onChange,
  pageWidth,
  pageHeight,
  canvasRef,
  theme,
}) => {
  const [svgData, setSvgData] = useState({});
  const [selectedTool, set_selectedTool] = useState(BLOB_TYPES.RANDOM_BLOB);
  const [shouldRandomize, setShouldRandomize] = useState(false);
  const [blobStateProps, setBlobStateProps] = useState({
    backgroundColor: "transparent",
    img: null,
    backgroundImg: null,
  });

  useEffect(() => {
    if (shouldRandomize) {
      setShouldRandomize(false);
    }
  }, [shouldRandomize]);

  const dropdownArr = [
    { name: "Random Blob", value: BLOB_TYPES.RANDOM_BLOB },
    { name: "Layered Blob", value: BLOB_TYPES.LAYERED_BLOB },
    { name: "Blurry Blob", value: BLOB_TYPES.BLURRY_BLOB },
    { name: "Blob Scene", value: BLOB_TYPES.BLOB_SCENE },
  ];
  return (
    <div className="Blob-Modal-Body">
      <div className="blob-preview-and-controls">
        <div
          className="blob-preview"
          style={{
            display: "flex",
            width:
              svgData?.svgWidth < 320
                ? "320px"
                : svgData?.svgWidth > 568
                ? "568px"
                : svgData?.svgWidth + "px",
            maxHeight:
              svgData?.svgHeight < 240
                ? "240px"
                : svgData?.svgHeight > 432
                ? "434px"
                : svgData?.svgHeight + "px",
            maxWidth: "100%",
            height: "320px",
            // backgroundImage: showBg
            //   ? "url(" + canvasRef.toDataURL() + ")"
            //   : null,
            backgroundRepeat: "no-repeat",
            justifyContent: "center",
            objectFit: "contain",
          }}
        >
          {selectedTool === BLOB_TYPES.RANDOM_BLOB ? (
            <RandomBlob
              attributes={svgData}
              getPngDataUrl={(svg, elem) => {
                if (elem.current) {
                  var serializer = new XMLSerializer();
                  var svgString = serializer.serializeToString(elem.current);
                  onChange(svgString);
                }
              }}
            />
          ) : null}
          {selectedTool === BLOB_TYPES.LAYERED_BLOB ? (
            <LayeredWave
              attributes={svgData}
              getPngDataUrl={(svg, elem) => {
                if (elem.current) {
                  var serializer = new XMLSerializer();
                  var svgString = serializer.serializeToString(elem.current);
                  // fabricSvg = svgString;
                  onChange(svgString);
                }
              }}
            />
          ) : null}
          {selectedTool === BLOB_TYPES.BLURRY_BLOB ? (
            <BlurryBlob
              attributes={svgData}
              getPngDataUrl={(svg, elem) => {
                if (elem.current) {
                  var serializer = new XMLSerializer();
                  var svgString = serializer.serializeToString(elem.current);
                  // fabricSvg = svgString;
                  onChange(svgString);
                }
              }}
            />
          ) : null}
          {selectedTool === BLOB_TYPES.BLOB_SCENE ? (
            <BlobScene
              attributes={svgData}
              getPngDataUrl={(svg, elem) => {
                if (elem.current) {
                  var serializer = new XMLSerializer();
                  var svgString = serializer.serializeToString(elem.current);
                  // fabricSvg = svgString;
                  onChange(svgString);
                }
              }}
            />
          ) : null}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <div>
            <Label className={`mr-2 ${theme === "dark" ? "text-white" : ""}`}>
              Generate New:
            </Label>
            <Title title="Randomize">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShouldRandomize(true);
                }}
                size="icon-xs"
              >
                <i className="icon-common icon-dice"></i>
              </Button>
            </Title>
          </div>
          <div className="flex items-center">
            <Label className={`mr-2 ${theme === "dark" ? "text-white" : ""}`}>
              Selected:
            </Label>
            <Dropdown
              className="w-[250px]"
              value={selectedTool}
              options={dropdownArr.map((item) => {
                return { name: item.name, value: item.value };
              })}
              onValueChange={(res) => {
                set_selectedTool(res);
                setSvgData({});
                setBlobStateProps({
                  backgroundColor: "transparent",
                  img: null,
                  backgroundImg: null,
                });
              }}
            />
          </div>
        </div>
      </div>

      <div className="designer-blob-maker">
        {selectedTool === BLOB_TYPES.RANDOM_BLOB ? (
          <RandomBlobGenerator
            hideControls={[
              "rotate",
              "blurImg",
              "blurBackground",
              "backgroundImg",
              "img",
              "applyGradient",
            ]}
            isRandomized={shouldRandomize}
            shouldCreateSvgOnMount={true}
            getSvgElem={(elem) => {
              if (elem !== null && !isEqual(elem, svgData)) {
                setSvgData(elem);
              }
            }}
            blobStateProps={blobStateProps}
            pageWidth={pageWidth}
            pageHeight={pageHeight}
          />
        ) : null}
        {selectedTool === BLOB_TYPES.LAYERED_BLOB ? (
          <LayeredBlobGenerator
            hideControls={[
              "rotate",
              "blurImg",
              "blurBackground",
              "backgroundImg",
              "img",
              "applyGradient",
            ]}
            getSvgElem={(elem) => {
              if (elem !== null && !isEqual(elem, svgData)) {
                setSvgData(elem);
              }
            }}
            isRandomized={shouldRandomize}
            blobStateProps={blobStateProps}
            shouldCreateSvgOnMount={true}
            pageWidth={pageWidth}
            pageHeight={pageHeight}
          />
        ) : null}
        {selectedTool === BLOB_TYPES.BLURRY_BLOB ? (
          <BlurryBlobGenerator
            hideControls={[
              "rotate",
              "blurImg",
              "blurBackground",
              "backgroundImg",
              "img",
              "applyGradient",
            ]}
            isRandomized={shouldRandomize}
            shouldCreateSvgOnMount={true}
            getSvgElem={(elem) => {
              if (elem !== null && !isEqual(elem, svgData)) {
                setSvgData(elem);
              }
            }}
            blobStateProps={blobStateProps}
            pageWidth={pageWidth}
            pageHeight={pageHeight}
          />
        ) : null}
        {selectedTool === BLOB_TYPES.BLOB_SCENE ? (
          <BlobSceneGenerator
            hideControls={[
              "rotate",
              "blurImg",
              "blurBackground",
              "backgroundImg",
              "img",
              "applyGradient",
            ]}
            isRandomized={shouldRandomize}
            shouldCreateSvgOnMount={true}
            getSvgElem={(elem) => {
              if (elem !== null && !isEqual(elem, svgData)) {
                setSvgData(elem);
              }
            }}
            blobStateProps={blobStateProps}
            pageWidth={pageWidth}
            pageHeight={pageHeight}
          />
        ) : null}
      </div>
    </div>
  );
};

export default RandomBlobModal;
