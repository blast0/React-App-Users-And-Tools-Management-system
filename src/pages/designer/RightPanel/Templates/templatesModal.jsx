import { useState } from "react";
import Modal from "../../../../components/dynamic-modal";
import "./templatesmodal.css";
import ShortcodeCard from "../../../web-pages/add-shortcode/shortcode-card";
import { Title } from "@/components/ui/title";
import { Button } from "@/components/ui/button";
import { LayoutGrid, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
const TemplatesModal = ({
  data,
  toast,
  applyJsonToCanvas,
  getJSON,
  deleteDesign,
  hideDeleteBtn,
}) => {
  const [showDesc, setShowDesc] = useState(false);
  const [largeTemplate, setlargeTemplate] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const onSearch = (val) => {
    setSearchText(val);
    const filtered = data.filter((item) => {
      return item.name.toLowerCase().includes(val.toLowerCase());
    });
    setFilteredData(filtered);
  };

  const addTemplateToCanvas = (item) => {
    getJSON(item?.JsonUrl, (err, data) => {
      if (err !== null) {
        toast.error("Error", "Something went wrong: " + err);
      } else {
        applyJsonToCanvas(data);
        Modal.hide();
      }
    });
  };

  const getTemplateBtns = (item) => {
    const data = [
      {
        icon: <i className="icon-common icon-check" />,
        title: "Add Template to Canvas",
        onClick: () => addTemplateToCanvas(item),
      },
    ];
    if (!hideDeleteBtn) {
      data.push({
        icon: <i className="icon-common icon-delete" />,
        title: "Delete Template from My Templates",
        dangerHover: true,
        onClick: () => deleteDesign(item?.imageId, item?.jsonId),
      });
    }
    return data;
  };
  return (
    <div style={{ position: "relative", overflowY: "scroll" }}>
      <div className="add-shortcode__toolbar ml-3" style={{}}>
        <Input
          value={searchText}
          text={searchText}
          onChange={(e) => {
            onSearch(e.target.value);
          }}
          icon={
            searchText === "" ? (
              <Search />
            ) : (
              <X
                onClick={() => {
                  onSearch("");
                }}
              />
            )
          }
          iconPosition="right"
        />
        <Title title={"Delete this design"}>
          <Button
            type="button"
            className="mr-2 hover:bg-red-600 hover:text-white"
            variant="outline"
            onClick={() => {
              setlargeTemplate((prev) => !prev);
            }}
            size="icon-xs"
          >
            <LayoutGrid />
          </Button>
        </Title>
      </div>
      <div
        className="templates-modal modal-body slim-scroll"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(auto-fit, minmax(${
            largeTemplate ? "500px" : "300px"
          }, 1fr))`,
        }}
      >
        {filteredData.map((item, index) => {
          return (
            <>
              <ShortcodeCard
                filledBtn={true}
                key={"card-container" + index}
                title={item?.name}
                thumbnailDetails={{ url: item?.url }}
                summary={item?.desc}
                showSummary={showDesc}
                btns={getTemplateBtns(item)}
                onToggleSummary={() => {
                  setShowDesc((prev) => !prev);
                }}
              />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default TemplatesModal;
