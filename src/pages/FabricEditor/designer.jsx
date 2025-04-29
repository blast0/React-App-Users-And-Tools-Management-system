import React, { Component } from "react";
import Page from "./Page-Canvas/Page-Canvas";
import RightPanel from "./Controls/rightpanel";

// CONSTANTS
import { ACCEPTED_FILES } from "./Constants/designer-constants";
import { FONT_PROPS_DEFAULT } from "./Constants/font";
import { getCanvasElementNames } from "./Constants/designer-icons";

// HELPERS
import {
  handleDrop,
  onSelectFile,
  onSelectImage,
  initializeApp,
  handleJsonData,
  handleOutsideClick,
  onAddImageFromFile,
  handleRightPanelUpdates,
  createCanvasElementsDropdownData,
} from "./helper-functions";
import Dropzone from "react-dropzone";

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
    this.designer.current.addEventListener("click", (e) =>
      handleOutsideClick(e, this)
    );
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
      pages,
      error,
      pageWidth,
      pageHeight,
      pageBgColor,
      modalActive,
      activePageID,
      isCanvasActive,
      showStyleEditor,
      isTemplateLoaded,
      selectedElementId,
      activeElementProps,
      selectedElementName,
      elementsDropDownData,
    } = this.state;
    const { theme } = this.props;
    const _canvas = Object.values(this.state.canvases)[0];
    return (
      <div
        className={`flex justify-between h-full w-full ${
          theme === "dark" ? "bg-[#333232] " : "bg-[#ffffff]"
        }`}
      >
        <div
          className={`designer relative flex slim-scroll overflow-auto`}
          ref={this.designer}
        >
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
                        <div className="flex p-2 slim-scroll">
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

        <div
          className={`border h-full ${
            theme === "light" ? "bg-white" : "bg-black"
          } border-[#989898]`}
        >
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
              accept={ACCEPTED_FILES}
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
              onChange={(e) => onSelectFile(e, this)}
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
                console.log(action);
                handleRightPanelUpdates(action, data, this);
              }}
              handleJsonData={(e) => handleJsonData(e, this)}
              jsonRef={this.jsonRef}
              siteColorsSettings={this.props.siteColorsSettings}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Designer;
