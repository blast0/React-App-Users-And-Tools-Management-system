import React, { Component } from "react";

// LOCAL COMPONENTS / METHODS
import Page from "./Page-Canvas/Page-Canvas";
import RightPanel from "./Controls/rightpanel";
// import SaveDownloadModal from "../../components/save-download-modal";
import VaulDrawer from "@/components/ui/drawer";
// CONSTANTS
import { FONT_PROPS_DEFAULT } from "./Constants/designer-constants";
import Dropzone from "react-dropzone";
// HELPERS
import {
  onSelectSvg,
  onSelectImage,
  initializeApp,
  handleJsonData,
  // setActiveObject,
  handleOutsideClick,
  // updatePageBreadcrumb,
  handleRightPanelUpdates,
  // addSavedImageFromLibrary,
  createCanvasElementsDropdownData,
  onAddImageFromFile,
  getCanvasElementNames,
  handleDrop,
} from "./helper-functions";

// STYLE
import "./googlefonts.css";

class Designer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeElementProps: {
        id: "",
        colors: [],
        ...Object.assign({}, FONT_PROPS_DEFAULT),
      },
      error: {
        height: false,
        width: false,
      },
      defaultFileType: "webp",
      defaultFileName: "file",
      showDownloadBtn: true,
      pageHeight: 0,
      pageWidth: 0,
      showStyleEditor: false,
      pages: [],
      canvases: {},
      activePageID: null,
      pageBgColor: "#ffffff",
      elementsDropDownData: [],
      selectedElementId: null,
      selectedElementName: "",
      isTemplateLoaded: false,
      isCanvasActive: true,
      shouldSave: false,
      fileDimensions: null,
      blob: null,
      modalActive: false,
      loadingImage: false,
    };
    this.patternSourceCanvas = null;
    this.designer = React.createRef();
    this.jsonRef = React.createRef();
    this.imagetoLibInputRef = React.createRef();
    this.imagetoCanvasRef = React.createRef();
    this.svgInputRef = React.createRef();
    this.dropzoneRef = React.createRef();
    this.queryParams = {};
  }

  componentDidMount() {
    // Adding EventListener to handle outside click.
    this.designer.current.addEventListener("click", (e) =>
      handleOutsideClick(e, this)
    );
    // updatePageBreadcrumb(this);
    initializeApp(this);
  }

  componentDidUpdate() {
    if (this.state.shouldSave) this.setState({ shouldSave: false });
  }

  componentWillUnmount() {
    this.designer.current.removeEventListener("click", (e) =>
      handleOutsideClick(e, this)
    );
  }

  render() {
    const {
      // blob,
      pages,
      error,
      pageWidth,
      pageHeight,
      // shouldSave,
      pageBgColor,
      modalActive,
      // thumbnailUrl,
      activePageID,
      // fileDimensions,
      isCanvasActive,
      // defaultFileType,
      // showDownloadBtn,
      showStyleEditor,
      isTemplateLoaded,
      selectedElementId,
      activeElementProps,
      selectedElementName,
      elementsDropDownData,
      // returnNodeId,
      // defaultFileName,
    } = this.state;
    const { theme } = this.props;
    const _canvas = Object.values(this.state.canvases)[0];
    return (
      <div
        className={`designer p-[10px] h-[100%] ${
          theme === "dark" ? "bg-[#333232] " : "bg-[#ffffff]"
        }`}
        ref={this.designer}
      >
        <VaulDrawer
          theme={theme}
          headerChildren={<></>}
          bodyChildren={
            <div>
              <input
                ref={this.imagetoLibInputRef}
                className="hidden"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  onSelectImage(e, this);
                }}
                onClick={(e) => {
                  onSelectImage(e, this);
                }}
              />
              <input
                ref={this.imagetoCanvasRef}
                className="hidden"
                type="file"
                accept=".png, .jpg, .jpeg, .webp"
                onChange={(e) => {
                  onAddImageFromFile(e, this, pageHeight, pageWidth);
                }}
                onClick={(e) => {
                  onAddImageFromFile(e, this, pageHeight, pageWidth);
                }}
              />
              <input
                ref={this.svgInputRef}
                className="hidden"
                type="file"
                accept=".svg, .png, .jpg, .jpeg, .webp, .gif"
                onChange={(e) => onSelectSvg(e, this)}
              />
              <RightPanel
                theme={theme}
                canvas={_canvas}
                elementsDropDownData={elementsDropDownData}
                onCanvasActive={(isActive) => {
                  if (modalActive) {
                    this.setState({
                      isCanvasActive: false,
                    });
                  } else {
                    this.setState({
                      isCanvasActive: isActive,
                    });
                  }
                }}
                error={error}
                pageWidth={pageWidth}
                pageHeight={pageHeight}
                pageBgColor={pageBgColor}
                showStyleEditor={showStyleEditor}
                selectedElementName={selectedElementName}
                selectedElementId={selectedElementId}
                activeElementProps={activeElementProps}
                onChange={(action, data) => {
                  handleRightPanelUpdates(action, data, this);
                }}
                handleJsonData={(e) => handleJsonData(e, this)}
                jsonRef={this.jsonRef}
                siteColorsSettings={this.props.siteColorsSettings}
              />
            </div>
          }
        />
        <Dropzone
          ref={this.dropzoneRef}
          accept={".jpg, .png, .webp, .jpeg, .svg"}
          multiple={true}
          noClick={true}
          onDrop={(acceptedFiles) => handleDrop(acceptedFiles, this)}
        >
          {({ getRootProps, isDragActive }) => (
            <section className={`dropzone-container`}>
              <div {...getRootProps({ className: "dropzone" })}>
                <React.Fragment>
                  <div className={isDragActive ? "drag-active" : ""}>
                    <React.Fragment>
                      <div
                        className="flex slim-scroll"
                        style={{
                          width: pageWidth,
                        }}
                        onClick={() => {
                          if (
                            _canvas?.getActiveObject() === null ||
                            modalActive
                          ) {
                            this.setState({
                              isCanvasActive: false,
                            });
                          } else {
                            this.setState({
                              isCanvasActive: true,
                            });
                          }
                        }}
                      >
                        {pages.map((page) => {
                          return (
                            <Page
                              isCanvasActive={isCanvasActive && !modalActive}
                              selectedElementId={selectedElementId}
                              key={`page-${page.id}`}
                              activePageID={activePageID}
                              _canvas={_canvas}
                              config={page}
                              activeElementProps={activeElementProps}
                              isTemplateLoaded={isTemplateLoaded}
                              ontemplateLoaded={(elem, __canvas) => {
                                this.setState(
                                  {
                                    isTemplateLoaded: true,
                                  },
                                  () => {
                                    __canvas.clearHistory();
                                    __canvas.requestRenderAll();
                                    if (elem) {
                                      __canvas.setActiveObject(elem);
                                      __canvas.renderAll();
                                    }
                                  }
                                );
                              }}
                              onCanvasPostInit={(id, canvas) => {
                                canvas.renderAll();
                                this.setState({
                                  canvases: {
                                    ...this.state.canvases,
                                    [id]: canvas,
                                  },
                                });
                              }}
                              pageBgColor={pageBgColor}
                              onElementsRendered={() => {
                                createCanvasElementsDropdownData(this);
                              }}
                              onElementDeleteRequested={(action) =>
                                handleRightPanelUpdates(action, null, this)
                              }
                              onElemSelect={(
                                showStyleEditor,
                                activeElementProps,
                                __canvas
                              ) => {
                                let canva = null;
                                if (
                                  activeElementProps.id !== selectedElementId
                                ) {
                                  canva = __canvas ? __canvas : _canvas;
                                  canva.getObjects().forEach(function (item) {
                                    if (item.id === activeElementProps.id) {
                                      canva.setActiveObject(item);
                                      canva.renderAll();
                                    }
                                  });
                                  const canvasElementNames =
                                    getCanvasElementNames(canva);
                                  this.setState({
                                    showStyleEditor,
                                    activeElementProps,
                                    selectedElementName:
                                      activeElementProps.name,
                                    selectedElementId: activeElementProps.id,
                                    elementsDropDownData: canvasElementNames,
                                  });
                                } else {
                                  this.setState({
                                    showStyleEditor,
                                    activeElementProps,
                                    selectedElementName:
                                      activeElementProps.name,
                                    selectedElementId: activeElementProps.id,
                                  });
                                }
                              }}
                              setSelectedName={(name) => {
                                _canvas.getActiveObject().name = name;
                                this.setState({
                                  selectedElementName: name,
                                });
                              }}
                            />
                          );
                        })}
                      </div>
                    </React.Fragment>
                  </div>
                </React.Fragment>
              </div>
            </section>
          )}
        </Dropzone>
      </div>
    );
  }
}

export default Designer;
