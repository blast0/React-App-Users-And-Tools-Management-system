import { Image, LoaderCircle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { noop } from "lodash";

import { Input } from "../input";
import { Label } from "../label";
import { isImageUrlValid } from "@/helper";
import FileDialog from "@/components/file-dialog";

const FileInput = ({
  label = "",
  value = "",
  placeholder = "",
  showImagePreview = false,
  className = "",
  mimeTypeExclusions = [],
  onFileIconClick = null,
  onChange = noop,
  onBlur = noop,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUrlValid, setIsUrlValid] = useState(false);

  const checkImageUrl = useCallback(async () => {
    setIsLoading(true);
    try {
      let val = await isImageUrlValid(value);
      setIsUrlValid(val);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [value]);

  useEffect(() => {
    checkImageUrl();
  }, [checkImageUrl]);

  const openFileDialog = () => {
    const openDialogConfig = {
      zIndex: 1,
      fileType: "i",
      returnType: "i",
      rootFolderType: "i",
      exclusionList: mimeTypeExclusions,
      fileDialogResponseFun: (res) => fileDialogResponseFun(res),
      createFolder: (data) => FileDialog.createFolder(data),
      search: (data) => FileDialog.search(data),
      updateLocalFileSystem: (data) => FileDialog.updateLocalFileSystem(data),
      redirectToFileLocation: (lastSelectedFile) =>
        FileDialog.redirectToFileLocation(lastSelectedFile),
    };

    FileDialog.show(openDialogConfig);
  };

  const fileDialogResponseFun = (res) => {
    if (res.type === "btnClick" && res.btnType === "ok") {
      fileDialogOkBtn(res);
    }
  };

  const fileDialogOkBtn = (res) => {
    const fileObj = res.data;
    let url = fileObj?.meta?.imageVariations?.[0]?.url;
    onChange(url, res);
  };

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <Label>{label}</Label>
      <div className="relative border rounded-sm shadow-sm">
        <Input
          containerClassName="pr-5"
          className="border-none shadow-none"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
        />
        <Image
          size={22}
          className="absolute right-0 top-2.5 mr-2 cursor-pointer bg-white"
          onClick={onFileIconClick || openFileDialog}
        />
        {showImagePreview && value && (
          <div
            className="h-[142px] flex items-center justify-center cursor-pointer bg-slate-100"
            onClick={onFileIconClick || openFileDialog}
          >
            {isLoading ? (
              <div className="animate-spin">
                <LoaderCircle />
              </div>
            ) : isUrlValid ? (
              <div className="h-full w-auto p-1">
                <img
                  className="w-full h-full object-contain"
                  src={value}
                  alt="preview"
                />
              </div>
            ) : (
              <div
                className="icon-only"
                onClick={onFileIconClick || openFileDialog}
              >
                <i className="icon-image"></i>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileInput;
