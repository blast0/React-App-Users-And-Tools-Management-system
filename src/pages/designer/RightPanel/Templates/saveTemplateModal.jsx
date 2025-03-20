import { useState } from "react";
import Checkbox from "../../../../components/checkbox/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SaveTemplateModal = ({
  JsonNodes,
  imgNodes,
  allNames,
  onCancel,
  onSave,
  onOverWrite,
  onFileNameChange,
  currImgDataUrl,
}) => {
  const [nameExists, setNameExists] = useState(false);
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

    onFileNameChange(e.target.value, exists);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          gap: "10px",
          justifyContent: "space-between",
        }}
        className="modal-body"
      >
        <Input type="text" label="File Name:" onChange={handleInputChange} />
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
            <Checkbox
              onChange={() => {
                setCheckReplace(!checkReplace);
              }}
              checked={checkReplace}
              label="File name already exists (overwrite existing file?)"
            />
          </>
        ) : null}
      </div>
      <div className="modal-footer align-center">
        <Button
          type="button"
          className="mr-2"
          onClick={() => {
            if (checkReplace) {
              onOverWrite(imageNode, JsonNode);
            } else if (!nameExists) {
              onSave();
            }
          }}
          disabled={!checkReplace && nameExists}
          size="sm"
        >
          {!checkReplace ? "Save" : "Overwrite"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            onCancel();
          }}
          size="sm"
        >
          Cancel
        </Button>
      </div>
    </>
  );
};

export default SaveTemplateModal;
