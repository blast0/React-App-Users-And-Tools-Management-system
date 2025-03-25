import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save } from "lucide-react";

const SaveTemplateModal = ({
  currImgDataUrl,
  JsonNodes,
  imgNodes,
  allNames,
  onCancel,
  onSave,
  onOverWrite,
}) => {
  const [nameExists, setNameExists] = useState(false);
  const [fileName, setFileName] = useState("");
  const [imageNode, setImageNode] = useState({});
  const [JsonNode, setJsonNode] = useState(null);
  const [checkReplace, setCheckReplace] = useState(nameExists ? true : false);
  const handleInputChange = (e) => {
    let exists = false;
    let imgNode = null;
    let JsnNode = null;
    allNames.forEach((name) => {
      if (name === e.target.value) {
        exists = true;
        imgNode = imgNodes.find((node) => {
          return node.name === e.target.value + ".jpeg";
        });
        JsnNode = JsonNodes.find((node) => {
          return node.name === e.target.value + ".json";
        });
        return;
      }
    });

    setNameExists(exists);
    if (imgNode) {
      imgNode.meta.document.url += `?${new Date().getTime()}`;
      setImageNode(imgNode);
    }
    if (JsnNode) {
      setJsonNode(JsnNode);
    }
    setFileName(e.target.value);
  };

  return (
    <>
      <div className="modal-body w-[100%] justify-center flex">
        <Input
          type="text"
          containerClassName="w-[90%]"
          label="File Name:"
          onChange={handleInputChange}
        />
        {nameExists ? (
          <>
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              <div>
                Previous
                <div
                  style={{
                    height: "150px",
                    width: "250px",
                    backgroundImage:
                      "url(" + imageNode?.meta?.document?.url + ")",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPositionY: "center",
                    border: "1px solid #cecdcd",
                  }}
                ></div>
              </div>
              <div>
                Current
                <div
                  style={{
                    height: "150px",
                    width: "250px",
                    border: "1px solid #cecdcd",
                  }}
                >
                  <img
                    src={currImgDataUrl}
                    alt="sa"
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>
              </div>
            </div>
            {/* <Checkbox
              onChange={() => {
                setCheckReplace(!checkReplace);
              }}
              checked={checkReplace}
              label="File name already exists (overwrite existing file?)"
            /> */}
          </>
        ) : null}
      </div>
      <Button
        // className="mr-2"
        variant="outline"
        className="w-[100px]"
        onClick={() => {
          // if (checkReplace) {
          // onOverWrite(imageNode, JsonNode, fileName);
          // } else if (!nameExists) {
          onSave(fileName);
          // }
        }}
        disabled={!checkReplace && nameExists}
        size="sm"
      >
        {!checkReplace ? "Save" : "Overwrite"}
      </Button>
    </>
  );
};

export default SaveTemplateModal;
