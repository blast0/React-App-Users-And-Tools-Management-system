import { useState } from "react";
import { pageSizes } from "../../Constants/designer-constants";
import "./templatesmodal.css";
import { Button } from "@/components/ui/button";
// import DropdownWithSearch from "@/components/ui/custom/dropdown-with-search";
const SizeTemplatesModal = ({
  resetPage,
  dimensionChangeHandler,
  self,
  hide,
}) => {
  const [selectedSize, setSelectedSize] = useState(pageSizes[0]);
  const [selectedWidth, setSelectedWidth] = useState(null);
  const [selectedHeight, setSelectedHeight] = useState(null);
  return (
    <div className="flex flex-col justify-between">
      <div style={{ position: "relative" }} className="px-5">
        <>
          <lable>Select a Format:</lable>
          {/* <DropdownWithSearch
            value={selectedSize.name}
            selectPlaceholder={"Select option"}
            popoverClassName={"w-full"}
            options={pageSizes.map((el) => ({
              label: el.name,
              value: el.name,
              item:el
            }))}
            onSelect={(name) => {
              let find_selected_item =  pageSizes.find((item)=>item.name === name);
              setSelectedSize(find_selected_item);
            }}
          /> */}
        </>
        <div className="size-table mt-5 slim-scroll">
          <table id="sizes" style={{ width: "100%" }}>
            <tr>
              <th>Name</th>
              <th>Size</th>
              <th>Description</th>
            </tr>
            {selectedSize?.items.map((selected, index) => {
              return (
                <tr
                  key={index}
                  onClick={() => {
                    if (
                      selectedWidth === selected?.width &&
                      selectedHeight === selected?.height
                    ) {
                      setSelectedHeight(null);
                      setSelectedWidth(null);
                    } else {
                      setSelectedHeight(selected.height);
                      setSelectedWidth(selected.width);
                    }
                  }}
                  style={
                    selectedWidth === selected?.width &&
                    selectedHeight === selected?.height
                      ? {
                          backgroundColor: "#c7f2ef",
                          color: "#20868e",
                        }
                      : {}
                  }
                >
                  <td>{selected?.name}</td>
                  <td>
                    {selected?.width} x {selected?.height}
                  </td>
                  <td>{selected?.desc}</td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
      <div className="modal-footer align-center">
        <Button
          type="button"
          className="mr-2"
          onClick={() => {
            dimensionChangeHandler("width", selectedWidth, self);
            dimensionChangeHandler("height", selectedHeight, self);
            resetPage(self);
            hide();
          }}
          disabled={selectedWidth === null || selectedHeight === null}
          size="sm"
        >
          Create
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            hide();
          }}
          size="sm"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};
export default SizeTemplatesModal;
