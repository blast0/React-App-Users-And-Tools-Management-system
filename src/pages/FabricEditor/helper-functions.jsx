import { fabric } from "fabric";
// EXTERNAL PACKAGES
import produce from "immer";
import { sha256 } from "crypto-hash";
import { inRange } from "lodash";
import { saveAs } from "file-saver";
import { cloneDeep, uniqueId } from "lodash";

// CONSTANTS
import {
  PAGE_CONFIG,
  PAGE_TEMPLATES,
  LINE_PROPS_DEFAULT,
  CANVAS_PAGE_GUTTER,
  SHAPES_PROPS_DEFAULT,
  QUADRATIC_PROPS_DEFAULT,
  SPEECH_BUBBLE_DEFAULT_PROPS,
} from "./Constants/designer-constants";
import { ACTIONS } from "./Constants/actions";
import { FONT_PROPS_DEFAULT } from "./Constants/font";
// LOCAL COMPONENTS / METHODS
import { Spinner } from "@/components/ui/custom/spinner";
import { Button } from "@/components/ui/button";
import FontFaceObserver from "fontfaceobserver";
import { toast } from "react-toastify";
import { getCanvasElementNames } from "./Constants/designer-icons";
import { EXTRA_ELEMENT_PROPS } from "./Constants/historyProps";
// import axios from "axios";

export const handleDrop = (images, self) => {
  console.log(images);
  const { pages, activePageID, pageHeight, pageWidth } = self.state;
  const elements = cloneDeep(pages[0].elements);
  if (!activePageID) return;
  let imagesCount = countElementTypes("Image", self);
  let svgCount = countElementTypes("Svg", self);
  images.forEach(async (image, index) => {
    let _width = null;
    let _height = null;
    const name = image.name;
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      if (reader.result.includes("svg+xml")) {
        if (!activePageID) return;
        ({ _width, _height } = svgSize(name, _width, _height));
        let zoomX = getSVGSize("300px", pageWidth, pageHeight);
        let zoomY = getSVGSize("300px", pageWidth, pageHeight);
        let zoom = zoomX > zoomY ? zoomY : zoomX;
        const svgElementSchema = {
          id: getNewID(),
          type: "Svg",
          url: reader.result,
          center: true,
          scaleX: zoom,
          scaleY: zoom,
          name: "Svg " + svgCount,
          _height: _height > 0 ? _height : null,
          _width: _width > 0 ? _width : null,
          imageFit: "Show full Svg", //contain= Show full Svg, cover=Fit Svg to boundary
        };
        svgCount++;
        elements.push(svgElementSchema);
        if (index + 1 === images.length) {
          self.setState({ pages: [{ ...pages[0], elements }] });
        }
      } else if (reader.result.includes("data:image")) {
        let img = new Image();
        img.src = reader.result;
        img.onload = function () {
          const imgElementSchema = {
            id: getNewID(),
            type: "Image",
            name: "Image " + imagesCount,
            left: 0,
            top: 0,
            preselected: true,
            sendtoback: false,
            url: reader.result,
            imageFit: "Show full Image", //contain= Show full Image, cover=Fit Image to boundary
            BorderX: 5,
            BorderY: 5,
          };
          imagesCount++;
          console.log(imgElementSchema);
          elements.push(imgElementSchema);
          if (index + 1 === images.length) {
            self.setState({ pages: [{ ...pages[0], elements }] });
          }
        };
      }
    });
    reader.readAsDataURL(image);
  });
};

/**
 * round a number upto given decimal point
 * https://stackoverflow.com/questions/6134039/format-number-to-always-show-2-decimal-places
 */
export const roundToDecimal = (num, decimalPoint = 2) => {
  try {
    return Number(
      Math.round(parseFloat(num + "e" + decimalPoint)) + "e-" + decimalPoint
    );
  } catch (error) {
    console.log("error", error);
  }
};

/**
 * checks if string contains only alpha numeric value and "-"
 * @param {string} str
 * @returns boolean
 */
export function isAlphaNumeric(str, checkForStatic) {
  var code, i, len;

  for (i = 0, len = str.length; i < len; i++) {
    code = str.charCodeAt(i);
    if (
      !(code > 47 && code < 58) && // numeric (0-9)
      !(checkForStatic && code === 46) && // "." is only valid for static files only
      !(code > 96 && code < 123) && // lower alpha (a-z)
      str[i] !== "-"
    ) {
      return false;
    }
  }
  return true;
}

// delete old local storage data when that version updated
export function validateString(name, checkForStatic) {
  let validName = name;
  validName = validName.replace(" ", "-");
  validName = validName.toLowerCase();
  let isValid = isAlphaNumeric(validName, checkForStatic);
  return [validName, isValid];
}

export const loadGoogleFont = (fontName) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    try {
      Spinner.showSpinner(`Loading Font: ${fontName}`);
      var myfont = new FontFaceObserver(fontName);
      const res = await myfont.load();
      Spinner.hideSpinner();
      resolve(res);
    } catch (err) {
      console.log("font loading failed ", err);
      Spinner.hideSpinner();
      resolve(err);
    }
  });
};

/**
 * generate random id
 * @returns string
 */
export const getNewID = () => {
  return uniqueId();
};

export const addPattern = async (url, canvasRef, cb) => {
  const activeObject = canvasRef.getActiveObject();
  const imageFit = activeObject?.imageFit
    ? activeObject.imageFit
    : "Show full Image";
  if (url === "") {
    activeObject.URL = "";
    activeObject.patternActive = false;
    const _newProps = {
      URL: "",
      patternActive: false,
    };
    cb(_newProps);
  } else {
    Spinner.showSpinner("Adding Background Pattern");
    var img = new Image();
    img.onload = function () {
      fabric.Image.fromURL(
        url,
        async (img) => {
          let patternSourceCanvas = new fabric.StaticCanvas();
          patternSourceCanvas.add(img);
          let patternHeight = canvasRef.height;
          let ratio = img.height / patternHeight;
          let patternWidth = img.width / ratio;
          if (img.width <= canvasRef.width && img.height <= canvasRef.height) {
            if (!activeObject?.stopContainerResize) {
              activeObject.width = img.width;
              activeObject.height = img.height;
            }
          } else if (
            img.width > canvasRef.width ||
            img.height > canvasRef.height
          ) {
            const testelem = new fabric.Rect({
              id: getNewID(),
              name: "testbox",
              height: img.height,
              width: img.width,
            });
            scaleElementTofitCanvas(
              imageFit,
              canvasRef.height,
              canvasRef.width,
              testelem
            );
            if (!activeObject?.stopContainerResize) {
              activeObject.width = testelem.width * testelem.scaleX;
              activeObject.height = testelem.height * testelem.scaleX;
            }
          }
          let patternLeft = 0;
          let patternTop = 0;
          const pattern = new fabric.Pattern({
            source: patternSourceCanvas.getElement(),
            repeat: "no-repeat",
            offsetX: patternLeft,
            offsetY: patternTop,
          });
          activeObject.set({
            fill: pattern,
            objectCaching: false,
            centeredRotation: true,
            patternSourceCanvas,
          });
          activeObject.patternLeft = patternLeft;
          activeObject.patternTop = patternTop;
          activeObject.patternWidth = patternWidth;
          activeObject.patternHeight = patternHeight;
          activeObject.patternAngle = 0;
          activeObject.patternActive = true;
          activeObject.patternFit = imageFit;
          const newProps = CheckPattern(imageFit, canvasRef, activeObject);
          cb(newProps, img);
        },
        { crossOrigin: "Anonymous" }
      );
      canvasRef.renderAll();
      canvasRef.requestRenderAll();
      Spinner.hideSpinner();
    };
    img.onerror = function () {
      console.log("img loading failed");
      Spinner.hideSpinner();
      activeObject.patternActive = false;
      const _activeElementProps = {
        patternActive: false,
      };
      cb(_activeElementProps);
    };
    img.src = url;
  }
};

export const alignElementHorizontally = (
  alignment,
  parentCanvasRef,
  pageWidth
) => {
  const element = parentCanvasRef.getActiveObject();
  if (!element) return;
  element.alignHorizontally = alignment;
  // find the leftmost bounding vertex of the element
  let leftmost = getLeftmostCoord(element);
  // find the rightmost bounding vertex of the element
  let rightmost = getRightmostCoord(element);
  // width of element taking rotation into account
  const objectWidth = rightmost - leftmost;
  if (alignment === "left") {
    if (leftmost !== 0) {
      element.left -= leftmost;
      element.setCoords();
      parentCanvasRef._historySaveAction();
    }
  } else if (alignment === "center") {
    // leftmostcoord such that the element falls in center
    const leftmostCoordForCenter = pageWidth / 2 - objectWidth / 2;
    if (leftmost !== leftmostCoordForCenter) {
      element.left += leftmostCoordForCenter - leftmost;
      element.setCoords();
      parentCanvasRef._historySaveAction();
    }
  } else if (alignment === "right") {
    if (rightmost !== pageWidth) {
      element.left += pageWidth - rightmost;
      element.setCoords();
      parentCanvasRef._historySaveAction();
    }
  }
  parentCanvasRef.renderAll();
};

export const alignElementVertically = (
  alignment,
  parentCanvasRef,
  pageHeight
) => {
  const element = parentCanvasRef.getActiveObject();
  if (!element) return;
  // Set the vertical alignment property of the active element
  element.alignVertically = alignment;
  if (!element) return;
  element.alignHorizontally = alignment;
  // find the topmost bounding vertey of the element
  let topmost = getTopmostCoord(element);
  // find the bottommost bounding vertex of the element
  let bottommost = getBottommostCoord(element);
  // height of element taking rotation into account
  const objectHeight = bottommost - topmost;
  if (alignment === "top") {
    if (topmost !== 0) {
      element.top -= topmost;
      element.setCoords();
      parentCanvasRef._historySaveAction();
    }
  } else if (alignment === "middle") {
    // topmostcoord such that the element falls in center
    const topCoordForCenter = (pageHeight - objectHeight) / 2;
    // topmost distance from center coord
    const distance = topCoordForCenter - topmost;
    if (topmost !== topCoordForCenter) {
      element.top += distance;
      element.setCoords();
      parentCanvasRef._historySaveAction();
    }
  } else if (alignment === "bottom") {
    if (bottommost !== pageHeight) {
      element.top += pageHeight - topmost - objectHeight;
      element.setCoords();
      parentCanvasRef._historySaveAction();
    }
  }
  parentCanvasRef.renderAll();
};

export const alignElementToCenter = (
  parentCanvasRef,
  pageWidth,
  pageHeight
) => {
  alignElementHorizontally("center", parentCanvasRef, pageWidth);
  alignElementVertically("center", parentCanvasRef, pageHeight);
};

export const CheckPattern = (value, _canvas, activeElement) => {
  if (!activeElement.patternSourceCanvas._objects?.[0]) {
    addPattern(activeElement.URL, _canvas, (props, img) => {
      let newProps = handlePatternFit(value, _canvas, activeElement, img);
      return newProps;
    });
  } else {
    let newProps = handlePatternFit(value, _canvas, activeElement);
    return newProps;
  }
};

export const handlePatternFit = (value, _canvas, activeElement, image) => {
  let img = activeElement?.patternSourceCanvas?._objects?.[0];
  if (image) {
    img = image;
  }
  if (!img) {
    CheckPattern(value, _canvas, activeElement);
  } else {
    img.rotate(0);
    let imgHeight = img.height;
    let imgWidth = img.width;
    let patternHeight = activeElement.patternHeight;
    let ratio = img.height / patternHeight;
    let patternWidth = img.width / ratio;
    let patternLeft = 0;
    let patternTop = 0;
    const scaleX = activeElement.width / imgWidth;
    const scaleY = activeElement.height / imgHeight;
    if (value === "Fit Image") {
      if (scaleX > scaleY) {
        //wider when scaled
        patternHeight = imgHeight * scaleX;
        patternWidth = imgWidth * scaleX;
        patternTop = parseInt((activeElement.height - patternHeight) / 2);
      } else {
        //taller when scaled
        patternHeight = activeElement.height;
        patternWidth = imgWidth * scaleY;
        patternLeft = parseInt((activeElement.width - patternWidth) / 2);
      }
    } else {
      if (scaleX < scaleY) {
        //wider when scaled
        patternHeight = imgHeight * scaleX;
        patternWidth = imgWidth * scaleX;
        patternTop = parseInt((activeElement.height - patternHeight) / 2);
      } else {
        //taller when scaled
        patternHeight = activeElement.height;
        patternWidth = imgWidth * scaleY;
        patternLeft = parseInt((activeElement.width - patternWidth) / 2);
      }
    }
    img.scaleToWidth(patternWidth / fabric.devicePixelRatio);
    activeElement.patternSourceCanvas.setDimensions({
      width: patternWidth,
      height: patternHeight,
    });
    activeElement.patternWidth = patternWidth;
    activeElement.patternHeight = patternHeight;
    activeElement.fill.offsetX = patternLeft;
    activeElement.fill.offsetY = patternTop;
    activeElement.patternLeft = patternLeft;
    activeElement.patternFit = value;
    activeElement.patternTop = patternTop;
    const newProps = {
      patternLeft,
      patternTop,
      patternWidth,
      patternHeight,
      patternFit: value,
      patternActive: true,
    };
    img.rotate(activeElement.patternAngle);
    return newProps;
  }
};

export const dataURLtoBlob = (dataurl) => {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

export const getBottommostCoord = (elem) => {
  return Math.max(
    elem.aCoords.bl.y,
    elem.aCoords.br.y,
    elem.aCoords.tl.y,
    elem.aCoords.tr.y
  );
};

export const getLeftmostCoord = (elem) => {
  return Math.min(
    elem.aCoords.bl.x,
    elem.aCoords.br.x,
    elem.aCoords.tl.x,
    elem.aCoords.tr.x
  );
};

export const getRightmostCoord = (elem) => {
  return Math.max(
    elem.aCoords.bl.x,
    elem.aCoords.br.x,
    elem.aCoords.tl.x,
    elem.aCoords.tr.x
  );
};

export const getTopmostCoord = (elem) => {
  return Math.min(
    elem.aCoords.bl.y,
    elem.aCoords.br.y,
    elem.aCoords.tl.y,
    elem.aCoords.tr.y
  );
};

export const scaleElementTofitCanvas = (
  imageFit,
  canvasHeight,
  canvasWidth,
  elem
) => {
  const xscale = canvasWidth / elem.width;
  const yscale = canvasHeight / elem.height;

  if (
    canvasWidth !== elem.width ||
    canvasHeight !== elem.height ||
    elem.scaleX !== 1 ||
    elem.scaleY !== 1
  ) {
    if (imageFit === "Show full Image" || imageFit === "Show full Svg") {
      if (xscale > yscale) {
        elem.scaleX = elem.scaleY = yscale;
        const scaledleft = canvasWidth - elem.width * yscale;
        elem.left = scaledleft / 2;
        elem.top = 0;
      } else {
        elem.scaleX = elem.scaleY = xscale;
        const scaledtop = canvasHeight - elem.height * xscale;
        elem.top = scaledtop / 2;
        elem.left = 0;
      }
      elem.imageFit = imageFit;
    } else if (
      imageFit === "Fit Image to boundary" ||
      imageFit === "Fit Svg to boundary"
    ) {
      if (xscale < yscale) {
        const scaledleft = canvasWidth - elem.width * yscale;
        elem.left = scaledleft / 2;
        elem.scaleX = elem.scaleY = yscale;
        elem.top = 0;
      } else {
        const scaledtop = canvasHeight - elem.height * xscale;
        elem.top = scaledtop / 2;
        elem.scaleX = elem.scaleY = xscale;
        elem.left = 0;
      }
      elem.imageFit = imageFit;
    }
  } else {
    const left = (canvasWidth - elem.width) / 2;
    elem.left = left;
    const top = (canvasHeight - elem.height) / 2;
    elem.top = top;
  }
};

export const handleOutsideClick = (event, self) => {
  const canvasRef = Object.values(self.state.canvases)[0];
  if (!event.target.className.includes("canvas")) {
    canvasRef.discardActiveObject().renderAll();
    self.setState({
      showStyleEditor: false,
      selectedElementName: "Please select",
      selectedElementId: null,
    });
  }
};

// export const updatePageBreadcrumb = (self) => {
//   const { assetName } = self.props.match.params;
//   self.props.updatePageBreadcrumb([
//     {
//       name: assetName,
//       routeFn: () => Navigation.goTo(AppRoutes.assetDashboard),
//     },
//     {
//       name: "Cover Image",
//       routeFn: () => Navigation.goTo(AppRoutes.designer + "?template=default"),
//     },
//   ]);
// };

export const initializeApp = async (self) => {
  // if query param contains a template, load it on page init

  // if template is not defined in query parameter, use default template
  const tmpl = PAGE_TEMPLATES[1];

  // get svg image properties from query params
  const svgURL = self.queryParams.url;
  const svgSizes = {
    height: self.queryParams.SVGHeight,
    width: self.queryParams.SVGwidth,
  };
  // if template found
  if (tmpl) {
    // if svg url is defined in URL query param, determine page size from incoming SVG size
    if (svgURL) {
      const templatePageSize = {
        width: tmpl?.pageStyles?.width,
        height: tmpl?.pageStyles?.height,
      };
      // determine page height and width
      const [pageWidth, pageHeight] = determinePageSize(
        svgSizes,
        templatePageSize
      );
      // override template props
      tmpl.pageStyles.width = pageWidth;
      tmpl.pageStyles.height = pageHeight;
    }
    // finally add the page
    await addPage(tmpl, self);
    if (svgURL) {
      addSVGToPage(svgURL, svgSizes.height, svgSizes.width, self);
    }
    // generate canvas element names dropdown data
    createCanvasElementsDropdownData(self);
  }
  setActiveObject(self.state.selectedElementId, self);
};

/**
 * determine canvas page size based on incoming svg image size
 * @param {object} svgSizes svg image width and height
 * @param {object} canvasSizes svg image width and height
 * @returns Array
 */
export const determinePageSize = (svgSizes, canvasSizes) => {
  try {
    const { height: canvasHeight, width: canvasWidth } = canvasSizes;
    const { height: svgHeight, width: svgWidth } = svgSizes;
    // remove unit and get numeric part
    const canvasHeightNum = parseInt(canvasHeight);
    const canvasWidthNum = parseInt(canvasWidth);

    const pageHeight =
      svgHeight < Number(canvasHeightNum)
        ? svgHeight + CANVAS_PAGE_GUTTER
        : Number(canvasHeightNum);
    const pageWidth =
      svgWidth < Number(canvasWidthNum)
        ? svgWidth + CANVAS_PAGE_GUTTER
        : Number(canvasWidthNum);

    return [pageHeight, pageWidth];
  } catch (error) {
    console.log(error);
    // if there's some problem calculating page size, return canvasSizes
    return canvasSizes;
  }
};

export const addPage = (template, self) => {
  const newTemplate = cloneDeep(template);
  newTemplate.elements.forEach((elem) => {
    if (elem.type === "i-text") {
      elem.name = elem.value;
    }
  });
  const promise = new Promise((resolve, reject) => {
    const newPage = produce(PAGE_CONFIG, (draftState) => {
      /**
       * if template is passed, it has highest priority, height,width will be determined from it
       */
      draftState.id = getNewID();
      draftState.style = {
        ...newTemplate?.pageStyles,
      };
      // copy tempate elements to page elements
      draftState.elements = newTemplate.elements;
      let preselected = null;
      draftState.elements.forEach((item) => {
        if (item.preselected === true) {
          preselected = true;
        }
      });
      if (preselected === null) {
        // draftState.elements[0].sendtoback = true;
        draftState.elements[0].preselected = true;
      }
    });
    // add a new page and make it active
    self.setState(
      {
        // to add page
        pages: [newPage],
        activePageID: newPage.id,
        // update control values for right panel
        pageWidth: newPage.style.width,
        pageHeight: newPage.style.height,
      },
      () => {
        resolve();
      }
    );
  });
  return promise;
};

// PAGE DIMENSIONS HANDLER
export const dimensionChangeHandler = (key, value, self) => {
  if (key === "height") {
    if (inRange(value, 0, 2001)) {
      self.setState(
        {
          pageHeight: value,
          error: {
            height: false,
          },
        },
        () => {
          resizePage(self);
        }
      );
    } else {
      self.props.toast.error("Error", "Please provide appropriate height");
      self.setState({
        error: {
          height: true,
        },
      });
    }
  }
  if (key === "width") {
    if (inRange(value, 0, 2001)) {
      self.setState(
        {
          pageWidth: value,
          error: {
            width: false,
          },
        },
        () => {
          resizePage(self);
        }
      );
    } else {
      self.props.toast.error("Error", "Please provide appropriate width");
      self.setState({
        error: {
          width: true,
        },
      });
    }
  }
};

export const createSelectionFromObject = (objects, self) => {
  const canvasRef = Object.values(self.state.canvases)[0];
  var selection = new fabric.ActiveSelection(objects, {
    canvas: canvasRef,
  });
  canvasRef.setActiveObject(selection);
};

export const alignGroupHorizontally = (alignment, self) => {
  const canvasRef = Object.values(self.state.canvases)[0];
  //active selection container
  const activeElem = canvasRef.getActiveObject();
  if (!activeElem) return;
  //all objects in selection
  const objects = activeElem.getObjects();
  //active selection left coord
  const containerLeft = parseInt(activeElem.left);
  //active selection right coord
  const containerRight = parseInt(activeElem.left + activeElem.width);
  //active selection width
  const containerWidth = activeElem.width;
  let needChange = false;
  if (alignment === "left") {
    canvasRef.discardActiveObject();
    objects.forEach((obj) => {
      let leftmost = getLeftmostCoord(obj);
      //check if change is needed(update if difference is greater than 1 pixel)
      if (leftmost - containerLeft >= 1 || leftmost - containerLeft <= -1) {
        needChange = true;
      }
    });
    createSelectionFromObject(objects, self);
    if (needChange) {
      canvasRef.discardActiveObject();
      objects.forEach((obj) => {
        //left coord for rotated/scaled/transformed object
        let leftmost = getLeftmostCoord(obj);
        obj.left = containerLeft + (obj.left - leftmost);
      });
      canvasRef._historySaveAction();
      createSelectionFromObject(objects, self);
    }
  } else if (alignment === "center") {
    let centerCoord = null;
    canvasRef.discardActiveObject();
    objects.forEach((obj) => {
      //left coord for rotated/scaled/transformed object
      let leftmost = getLeftmostCoord(obj);
      //right coord for rotated/scaled/transformed object
      let rightmost = getRightmostCoord(obj);
      //effective width for rotated/scaled/transformed object
      let objectWidth = rightmost - leftmost;
      centerCoord =
        containerWidth / 2 -
        objectWidth / 2 +
        containerLeft +
        (obj.left - leftmost);
      if (obj.left - centerCoord >= 1 || obj.left - centerCoord <= 1)
        needChange = true;
    });
    createSelectionFromObject(objects, self);
    if (needChange) {
      canvasRef.discardActiveObject();
      objects.forEach((obj) => {
        //left coord for rotated/scaled/transformed object
        let leftmost = getLeftmostCoord(obj);
        //right coord for rotated/scaled/transformed object
        let rightmost = getRightmostCoord(obj);
        //effective width for rotated/scaled/transformed object
        let objectWidth = rightmost - leftmost;
        obj.left =
          containerWidth / 2 -
          objectWidth / 2 +
          containerLeft +
          (obj.left - leftmost);
      });
      canvasRef._historySaveAction();
      createSelectionFromObject(objects, self);
    }
  } else if (alignment === "right") {
    canvasRef.discardActiveObject();
    objects.forEach((obj) => {
      //right coord for rotated/scaled/transformed object
      let rightmost = getRightmostCoord(obj);
      if (rightmost - containerRight >= 1 || rightmost - containerRight <= -1)
        needChange = true;
    });
    createSelectionFromObject(objects, self);
    if (needChange) {
      canvasRef.discardActiveObject();
      objects.forEach((obj) => {
        //right coord for rotated/scaled/transformed object
        let rightmost = getRightmostCoord(obj);
        obj.left = containerRight + (obj.left - rightmost);
      });
      canvasRef._historySaveAction();
      createSelectionFromObject(objects, self);
    }
  }
  canvasRef.requestRenderAll();
};

export const handlePatternSize = (w, h, self) => {
  const canvasRef = Object.values(self.state.canvases)[0];
  const activeObject = canvasRef.getActiveObject();
  const { activeElementProps } = self.state;
  let imgObj = activeObject.patternSourceCanvas._objects?.[0];
  if (!imgObj) {
    addPattern(
      activeObject.patternSourceCanvas.objects[0].src,
      canvasRef,
      () => {}
    );
  } else {
    let ratio = imgObj.width / imgObj.height;
    let width = w;
    let height = h;
    if (!w) {
      width = height * ratio;
    }
    if (!h) {
      height = width / ratio;
    }
    if (width > 1 && height > 1) {
      imgObj.scaleToWidth(width / fabric.devicePixelRatio);
      activeObject.patternSourceCanvas.setDimensions({
        width,
        height,
      });
      activeObject.patternWidth = width;
      activeObject.patternHeight = height;
    }
    const _activeElementProps = {
      ...activeElementProps,
      patternWidth: width,
      patternHeight: height,
    };
    self.setState(
      {
        activeElementProps: _activeElementProps,
      },
      () => {
        canvasRef.requestRenderAll();
      }
    );
  }
};

export const handlePatternPosition = (left, top, angle, self) => {
  const canvasRef = Object.values(self.state.canvases)[0];
  const { activeElementProps } = self.state;
  const activeObject = canvasRef.getActiveObject();
  if (!activeObject.patternSourceCanvas._objects?.[0]) {
    addPattern(
      activeObject.patternSourceCanvas.objects[0].src,
      canvasRef,
      () => {}
    );
  } else {
    if (left !== null && left !== undefined) {
      activeObject.fill.offsetX = left;
      const _activeElementProps = {
        ...activeElementProps,
        patternLeft: left,
      };
      activeObject.patternLeft = left;
      self.setState({
        activeElementProps: _activeElementProps,
      });
    } else if (top !== null && top !== undefined) {
      activeObject.fill.offsetY = top;
      const _activeElementProps = {
        ...activeElementProps,
        patternTop: top,
      };
      activeObject.patternTop = top;
      self.setState({
        activeElementProps: _activeElementProps,
      });
    } else if (angle !== null && angle !== undefined) {
      activeObject.patternSourceCanvas._objects[0].rotate(angle);
      activeObject.patternAngle = angle;
      activeObject.patternSourceCanvas.renderAll();
      canvasRef.renderAll();
    }
  }
};

// Function to evenly space selected objects in a given alignment (horizontal/vertical).
export const spaceGroupEvenly = (alignment, self) => {
  const canvasRef = Object.values(self.state.canvases)[0];

  // Get the currently selected objects on the canvas.
  const selectedObjects = canvasRef.getActiveObjects();

  // If there are fewer than or equal to 2 selected objects, return without any changes.
  if (selectedObjects.length <= 2) return;

  // Get the bounding rectangle of the selected objects.
  const selectedObject = canvasRef.getActiveObject();
  const bounding = selectedObject.getBoundingRect();

  if (alignment === "horizontal") {
    handleHorizontalSpace(selectedObjects, bounding);
  } else {
    handleVerticalSpace(selectedObjects, bounding);
  }
  canvasRef.renderAll();
};

// Function to handle horizontal spacing of selected objects.
export const handleHorizontalSpace = (activeObjects, bounding) => {
  // Sort selected objects based on their left coordinate in ascending order (from left to right).
  const sortedObjects = activeObjects.sort((a, b) => {
    return a.left - b.left;
  });

  // Calculate the total width of all transformed objects.
  let totalTransformedWidth = 0;
  activeObjects.forEach((obj) => {
    const boundingRect = obj.getBoundingRect(true);
    totalTransformedWidth += boundingRect.width;
  });

  // Calculate the total gap between objects and the number of gaps.
  const totalGap = bounding.width - totalTransformedWidth;
  const gapCount = activeObjects.length - 1;
  const gap = totalGap / gapCount;

  // Apply spacing to the objects.
  for (let i = 1; i <= gapCount; i++) {
    const prevObject = sortedObjects[i - 1].getBoundingRect(true);
    sortedObjects[i].left = prevObject.left + prevObject.width + gap;
    sortedObjects[i].setCoords();
  }
};

// Function to handle vertical spacing of selected objects.
export const handleVerticalSpace = (activeObjects, bounding) => {
  // Sort selected objects based on their top coordinate in ascending order (from top to bottom).
  const sortedObjects = activeObjects.sort((a, b) => {
    return a.top - b.top;
  });
  // Calculate the total height of all transformed objects.
  let totalTransformedHeight = 0;
  activeObjects.forEach((obj) => {
    const boundingRect = obj.getBoundingRect(true);
    totalTransformedHeight += boundingRect.height;
  });

  // Calculate the total gap between objects and the number of gaps.
  const totalGap = bounding.height - totalTransformedHeight;
  const gapCount = activeObjects.length - 1;
  const gap = totalGap / gapCount;

  // Apply spacing to the objects.
  for (let i = 1; i <= gapCount; i++) {
    const prevObject = sortedObjects[i - 1].getBoundingRect(true);
    sortedObjects[i].top = prevObject.top + prevObject.height + gap;
    sortedObjects[i].setCoords();
  }
};

// UPDATE PAGE DIMENSIONS
export const resizePage = (self, cb = () => {}) => {
  const { pages, pageHeight, pageWidth } = self.state;
  const page = pages[0];
  const newPage = {
    ...page,
    style: {
      ...page.style,
      height: pageHeight,
      width: pageWidth,
    },
  };
  self.setState(
    {
      // to add page
      pages: [newPage],
      activePageID: newPage.id,
    },
    () => {
      cb();
    }
  );
};

// ADD IMAGE TO CANVAS HANDLER
export const addImage = (url, self) => {
  const { pages, activePageID } = self.state;
  if (!activePageID) return;
  let count = countElementTypes("Image", self);
  const imgElementSchema = {
    id: getNewID(),
    type: "Image",
    name: "Image " + count,
    left: 0,
    top: 0,
    preselected: true,
    sendtoback: false,
    url,
    imageFit: "Show full Image", //contain= Show full Image, cover=Fit Image to boundary
    BorderX: 5,
    BorderY: 5,
  };
  const _pagesNext = produce(pages, (draftState) => {
    const activePage = draftState.find((p) => p.id === activePageID);
    activePage.elements.push(imgElementSchema);
  });
  self.setState({ pages: _pagesNext });
};

//add blob from blobmaker as a pattern image
export const addRandomShape = (self, svg) => {
  const { pages, activePageID } = self.state;
  if (!activePageID) return;
  const canvasRef = Object.values(self.state.canvases)[0];
  let count = 1;
  canvasRef.getObjects().forEach((item) => {
    if (item.subType === "svg") {
      count++;
    }
  });
  const randomShapeSchema = {
    id: getNewID(),
    type: "svg",
    subType: "svg",
    name: "RandomShape " + count,
    preselected: true,
    sendtoback: false,
    selectedTool: BLOB_TYPES.LAYERED_BLOB,
    selectable: true,
    svgStr: svg,
  };
  const _pagesNext = produce(pages, (draftState) => {
    const activePage = draftState.find((p) => p.id === activePageID);
    activePage.elements.push(randomShapeSchema);
  });
  self.setState({ pages: _pagesNext });
};

//change canvas background color
export const changePageBackGround = (color, self) => {
  const canvasRef = Object.values(self.state.canvases)[0];
  canvasRef.backgroundColor = color;
  canvasRef.renderAll();
  self.setState({ pageBgColor: color });
};

//return count of existing elements of given type
export const countElementTypes = (type, self) => {
  const canvasRef = Object.values(self.state.canvases)[0];
  let count = 1;
  canvasRef.getObjects().forEach((item) => {
    if (item.type === type) {
      count++;
    }
  });
  return count;
};

//add text element to canvas
export const addText = (self) => {
  const { pages, activePageID } = self.state;
  if (!activePageID) return;
  let count = countElementTypes("i-text", self);
  const svgElementSchema = {
    ...Object.assign({}, FONT_PROPS_DEFAULT),
    id: getNewID(),
    value: "Text",
    type: "i-text",
    name: "Text" + count,
  };
  const _pagesNext = produce(pages, (draftState) => {
    const activePage = draftState.find((p) => p.id === activePageID);
    activePage.elements.push(svgElementSchema);
  });
  self.setState({ pages: _pagesNext });
};

export const addTriangle = (self) => {
  const { pages, activePageID } = self.state;
  if (!activePageID) return;
  let count = countElementTypes("triangle", self);
  const triangleElementSchema = {
    id: getNewID(),
    type: "triangle",
    name: "Triangle " + count,
    selectable: true,
    ...Object.assign({}, SHAPES_PROPS_DEFAULT),
  };
  const _pagesNext = produce(pages, (draftState) => {
    const activePage = draftState.find((p) => p.id === activePageID);
    activePage.elements.push(triangleElementSchema);
  });
  self.setState({ pages: _pagesNext });
};

export const addRectangle = (height, width, self) => {
  const { pages, activePageID, pageHeight, pageWidth } = self.state;
  if (!activePageID) return;
  let count = countElementTypes("rect", self);
  const rectangleElementSchema = {
    id: getNewID(),
    type: "rect",
    name: "Rectangle " + count,
    height: height ? height : pageHeight / 3,
    width: width ? width : pageWidth / 3,
    selectable: true,
    ...Object.assign({}, SHAPES_PROPS_DEFAULT),
  };
  const _pagesNext = produce(pages, (draftState) => {
    const activePage = draftState.find((p) => p.id === activePageID);
    activePage.elements.push(rectangleElementSchema);
  });
  self.setState({ pages: _pagesNext });
};

export const addCircle = (self) => {
  const { pages, activePageID } = self.state;
  if (!activePageID) return;
  let count = countElementTypes("circle", self);
  const circleElementSchema = {
    id: getNewID(),
    type: "circle",
    name: "Circle " + count,
    radius: 50,
    selectable: true,
    ...Object.assign({}, SHAPES_PROPS_DEFAULT),
  };
  const _pagesNext = produce(pages, (draftState) => {
    const activePage = draftState.find((p) => p.id === activePageID);
    activePage.elements.push(circleElementSchema);
  });
  self.setState({ pages: _pagesNext });
};

export const addLine = (type, self) => {
  const { pages, activePageID } = self.state;
  if (!activePageID) return;
  let count = countElementTypes("line", self);
  const lineElementSchema = {
    id: getNewID(),
    padding: 10,
    type: "line",
    name: "Line " + count,
    points: [50, 100, 200, 100],
    strokeDashArray: type === ACTIONS.ADD_DASHED_LINE ? [5, 5] : [],
    selectable: true,
    ...Object.assign({}, LINE_PROPS_DEFAULT),
  };
  const _pagesNext = produce(pages, (draftState) => {
    const activePage = draftState.find((p) => p.id === activePageID);
    activePage.elements.push(lineElementSchema);
  });
  self.setState({ pages: _pagesNext });
};

export const getQuadraticSchema = (canvasRef) => {
  let count = 1;
  canvasRef.getObjects().forEach((item) => {
    if (item?.customType === "Quadratic") {
      count++;
    }
  });
  return {
    id: getNewID(),
    type: "Quadratic",
    name: "Quadratic " + count,
    ...Object.assign({}, QUADRATIC_PROPS_DEFAULT),
  };
};

export const addQuadratic = (self) => {
  const { pages, activePageID } = self.state;
  const canvasRef = Object.values(self.state.canvases)[0];
  const quadraticElementSchema = getQuadraticSchema(canvasRef);
  const _pagesNext = produce(pages, (draftState) => {
    const activePage = draftState.find((p) => p.id === activePageID);
    activePage.elements.push(quadraticElementSchema);
  });
  self.setState({ pages: _pagesNext });
};

export const getNextSpeechBubbleSchema = (canvasRef, obj) => {
  let count = 1;
  canvasRef.getObjects().forEach((item) => {
    if (!item.isLabel && item?.customType === "SpeechBubble") {
      count++;
    }
  });
  const bubbleElementSchema = {
    id: getNewID(),
    type: "speech_bubble",
    name: "Speech Bubble " + count,
    text: "Hello World!",
    fontFamily: "Ubuntu",
    left: 100,
    top: 50,
    width: 200,
    textPadding: 15,
    selectable: true,
    arrowWidth: 14,
    strokeWidth: 1,
    textColor: "#000",
    isLabel: false,
    arrow: "Bottom",
    ...Object.assign({}, SPEECH_BUBBLE_DEFAULT_PROPS),
  };
  let prevTextBox = null;
  let prevPolygon = null;
  let arrow = null;
  if (obj?.customType === "SpeechBubble") {
    arrow = obj.arrow;
    prevTextBox = obj._objects.find((item) => {
      return item.customType === "Speechtext";
    });
    prevPolygon = obj._objects.find((item) => {
      return item.customType === "SpeechPoly";
    });
  } else {
    canvasRef.getObjects().forEach((item) => {
      if (item?.customType === "SpeechBubble" && !item.isLabel) {
        arrow = item.arrow;
        prevTextBox = item._objects.find((item) => {
          return item.customType === "Speechtext";
        });
        prevPolygon = item._objects.find((item) => {
          return item.customType === "SpeechPoly";
        });
      }
    });
  }
  if (prevTextBox && prevPolygon) {
    bubbleElementSchema.width = prevTextBox.width;
    bubbleElementSchema.textPadding = prevTextBox.polyPadding;
    bubbleElementSchema.borderColor = prevPolygon.stroke;
    bubbleElementSchema.textBgColor = prevTextBox.backgroundColor;
    bubbleElementSchema.polyColor = prevPolygon.fill;
    bubbleElementSchema.textColor = prevTextBox.fill;
    bubbleElementSchema.arrow = arrow;
    bubbleElementSchema.fontFamily = prevTextBox.fontFamily;
  }
  return bubbleElementSchema;
};

export const getNextSpeechLabelSchema = (canvasRef, obj) => {
  let count = 1;
  canvasRef.getObjects().forEach((item) => {
    if (item?.customType === "SpeechBubble") {
      if (item.isLabel) {
        count++;
      }
    }
  });
  let schema = {
    id: getNewID(),
    type: "speech_bubble",
    name: "Speech Label " + count,
    left: 100,
    top: 50,
    width: 25,
    textPadding: 0,
    selectable: true,
    arrowWidth: 14,
    strokeWidth: 4,
    borderColor: "#fcfcfc",
    fontFamily: "Ubuntu",
    text: String(count),
    isLabel: true,
    textBgColor: "#fcfcfc",
    textColor: "#303030",
    arrow: "Bottom",
    polyColor: "#fcfcfc",
  };
  let prevTextBox = null;
  let prevPolygon = null;
  let arrow = null;
  if (obj?.customType === "SpeechBubble") {
    arrow = obj.arrow;
    prevTextBox = obj._objects.find((item) => {
      return item.customType === "Speechtext";
    });
    prevPolygon = obj._objects.find((item) => {
      return item.customType === "SpeechPoly";
    });
  } else {
    canvasRef.getObjects().forEach((item) => {
      if (item?.customType === "SpeechBubble" && item.isLabel) {
        arrow = item.arrow;
        prevTextBox = item._objects.find((item) => {
          return item.customType === "Speechtext";
        });
        prevPolygon = item._objects.find((item) => {
          return item.customType === "SpeechPoly";
        });
      }
    });
  }
  if (prevTextBox && prevPolygon) {
    schema.width = prevTextBox.width;
    schema.textPadding = prevTextBox.polyPadding;
    schema.borderColor = prevPolygon.stroke;
    schema.textBgColor = prevTextBox.backgroundColor;
    schema.polyColor = prevPolygon.fill;
    schema.textColor = prevTextBox.fill;
    schema.arrow = arrow;
    schema.fontFamily = prevTextBox.fontFamily;
  }
  const bubbleElementSchema = {
    ...schema,
    ...Object.assign({}, SPEECH_BUBBLE_DEFAULT_PROPS),
  };
  return bubbleElementSchema;
};

export const addSpeechLabel = (self) => {
  const { pages, activePageID } = self.state;
  if (!activePageID) return;
  const canvasRef = Object.values(self.state.canvases)[0];
  const bubbleElementSchema = getNextSpeechLabelSchema(canvasRef, null);
  const _pagesNext = produce(pages, (draftState) => {
    const activePage = draftState.find((p) => p.id === activePageID);
    activePage.elements.push(bubbleElementSchema);
  });
  self.setState({ pages: _pagesNext });
};

export const addSpeechBubble = (self) => {
  const { pages, activePageID } = self.state;
  if (!activePageID) return;
  const canvasRef = Object.values(self.state.canvases)[0];
  const bubbleElementSchema = getNextSpeechBubbleSchema(canvasRef);
  const _pagesNext = produce(pages, (draftState) => {
    const activePage = draftState.find((p) => p.id === activePageID);
    activePage.elements.push(bubbleElementSchema);
  });
  self.setState({ pages: _pagesNext });
};

export const addSVGToPage = (svgURL, SVGHeight, SVGWidth, self) => {
  // svg will be added on active page
  const { activePageID, pages, pageHeight, pageWidth } = self.state;
  if (!activePageID) return;
  let zoomX = getSVGSize(SVGWidth, pageWidth, pageHeight);
  let zoomY = getSVGSize(SVGHeight, pageWidth, pageHeight);
  let zoom = zoomX > zoomY ? zoomY : zoomX;
  let count = countElementTypes("Svg", self);
  const svgElementSchema = {
    id: getNewID(),
    type: "Svg",
    url: svgURL,
    center: true,
    scaleX: zoom,
    scaleY: zoom,
    name: "Svg " + count,
    imageFit: "Show full Svg", //contain= Show full Svg, cover=Fit Svg to boundary
  };
  const _pagesNext = produce(pages, (draftState) => {
    const activePage = draftState.find((p) => p.id === activePageID);
    activePage.elements.push(svgElementSchema);
  });
  self.setState({ pages: _pagesNext });
};

export const getSVGSize = (SVGsize, canvasPageWidth, canvasPageHeight) => {
  // taking out 0th index value and converting into Number for compare
  const canvasOriginalWidth = Number(canvasPageWidth);
  const canvasOriginalHeight = Number(canvasPageHeight);
  let SVGSize;
  if (SVGsize) {
    if (SVGsize > (canvasOriginalWidth || canvasOriginalHeight)) {
      // setting the scale value in ratio of 0 to 1
      SVGSize = 0.5;
    } else {
      SVGSize = 1;
    }
    return SVGSize;
  }
  // returning 1 if SVGsize undefine so that we can add svg by add SVG button
  return 1;
};

export const saveToImageLibrary = (
  type = ACTIONS.SAVE_PAGE_TO_LIBRARY,
  self
) => {
  const { pageHeight, pageWidth } = self.state;
  const canvasRef = Object.values(self.state.canvases)[0];
  const selected = cloneDeep(canvasRef.getActiveObject());
  if (type === ACTIONS.SAVE_SELECTION_TO_LIBRARY && selected) {
    //Selection exist so download selection
    const fileSVGData2 = selected.toDataURL();
    var myselectionblob = dataURLtoBlob(fileSVGData2);
    self.setState({
      shouldSave: true,
      thumbnailUrl: fileSVGData2,
      fileDimensions: {
        height: parseInt(selected.height),
        width: parseInt(selected.width),
      },
      showDownloadBtn: true,
      blob: myselectionblob,
      returnNodeId: false,
      defaultFileName: "canvas",
    });
  } else {
    // Save Entire Page to Image library
    const fileSVGData = canvasRef.toDataURL();
    var myblob = dataURLtoBlob(fileSVGData);
    self.setState({
      shouldSave: true,
      thumbnailUrl: fileSVGData,
      fileDimensions: {
        height: pageHeight,
        width: pageWidth,
      },
      showDownloadBtn: true,
      blob: myblob,
      returnNodeId: false,
      defaultFileName: "canvas",
    });
  }
};

export const downloadPage = (self) => {
  const canvasRef = Object.values(self.state.canvases)[0];
  const fileSVGData = canvasRef.toDataURL();
  saveAs(fileSVGData, "canvas.png");
};

// DOWNLOAD SELECTED OBJECTS/ITEMS
export const downloadSelection = (self) => {
  const canvasRef = Object.values(self.state.canvases)[0];
  const selected = cloneDeep(canvasRef.getActiveObject());
  if (selected) {
    const fileSVGData2 = selected.toDataURL();
    var myblob = dataURLtoBlob(fileSVGData2);
    saveAs(myblob, "object.png");
  } else {
    downloadPage(self);
  }
};

export const isGroupPresent = (canvas) => {
  const objects = canvas.getObjects();
  for (const obj of objects) {
    if (obj.type === "Quadratic") {
      return true;
    }
  }
  return false;
};

export const downloadJSON = (self) => {
  const modalConfig = cloneDeep(MODAL_INTERFACE);
  modalConfig.resData = "";
  modalConfig.title = ["Cover Image name", "center"];
  modalConfig.btns = [];
  let fileName = "";
  modalConfig.config = ["550px", "230px"];
  modalConfig.withJsx = (
    <>
      {/* <SaveTemplateModal
        JsonNodes={{}}
        imgNodes={{}}
        allNames={[]}
        fileName={fileName}
        currImgDataUrl={null}
        onFileNameChange={(name) => {
          fileName = name;
        }}
        onCancel={() => {
          Modal.hide();
          self.setState({ modalActive: false });
        }}
        onSave={async () => {
          const temp = createJSON(self);
          const hash = await sha256(JSON.stringify(temp));
          temp.hash = hash;
          const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(temp)
          )}`;
          const link = document.createElement("a");
          link.href = jsonString;
          if (fileName === "") link.download = "sample.json";
          else link.download = fileName + ".json";
          link.click();
          Modal.hide();
          self.setState({ modalActive: false });
        }}
        onOverWrite={() => {}}
      /> */}
    </>
  );
  Modal.show(modalConfig, true);
  self.setState({ modalActive: true });
};

export const createJSON = (self, _canvas) => {
  const groupPresent = isGroupPresent(_canvas);
  if (groupPresent) {
    toast.error("Error", `Group object is not allowed to export`);
    return;
  }
  const temp = _canvas.toJSON(EXTRA_ELEMENT_PROPS);
  return temp;
};

export const getJSON = (url, callback) => {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "json";
  Spinner.showSpinner();
  xhr.onload = () => {
    var status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
};

const initializeObject = (val) => {
  val.objects.forEach((obj) => {
    switch (obj.customType) {
      case "quad_curve":
      case "quad_control":
      case "quad_arrow":
      case "SpeechBubble":
        obj.hasControls = false;
        break;
      default:
        obj.hasControls = true;
    }
    obj.lockMovementX = false;
    obj.lockMovementY = false;
    obj.selectable = true;
  });
};

export const showGlobalTemplates = async (self) => {
  const { toast } = self.props;
  const data = [];
  try {
    Spinner.showSpinner();
    const files = await self.props.getDesignerCovers();
    files.resources.forEach((item) => {
      data.push({
        name: item.name,
        url: item.latestVersion.url + "/image.jpeg",
        JsonUrl: item.latestVersion.url + "/canvas.json",
      });
    });
  } catch (error) {
    Spinner.hideSpinner();
    console.log(error);
  } finally {
    Spinner.hideSpinner();
    const modalConfig = Object.assign(MODAL_INTERFACE);
    modalConfig.resData = "";
    modalConfig.title = ["Select Design", "center"];
    modalConfig.btns = [
      { text: "OK", type: "contained" },
      { text: "Cancel", className: "dangerBtn" },
    ];
    modalConfig.config = ["90vw", "auto"];
    modalConfig.withJsx = (
      // <TemplatesModal
      //   data={data}
      //   toast={toast}
      //   applyJsonToCanvas={(val) => {
      //     Modal.hide();
      //     initializeObject(val);
      //     applyJsonToCanvas(val, self);
      //   }}
      //   getJSON={async (url, cb) => {
      //     Spinner.showSpinner();
      //     const json = await self.props.getCoverJson(
      //       url + "?mimetype=application/json&cd=inline"
      //     );
      //     cb(null, json);
      //   }}
      //   deleteDesign={(imgId, jsonId) => {
      //     // confirmDeletion(imgId, jsonId, self);
      //   }}
      //   hideDeleteBtn={true}
      // />
      <></>
    );
    modalConfig.dynamicModalResponseFun = ({ btnType }) => {
      // show the modal
    };
    Modal.show(modalConfig, true);
    self.setState({ modalActive: true });
  }
};

export const showSavedTemplates = async (self) => {
  const { asset, toast } = self.props;
  const parentNodeId = asset.reservedNodes.coverImages;
  const data = [];
  try {
    Spinner.showSpinner();
    const files = await self.props.getGlobalCoverTemplates(asset._id, {
      parentNodeId,
    });
    const images = files.nodes.filter((image) => {
      return image.meta.document.mimetype === "image/jpeg";
    });
    images.forEach((image) => {
      data.push({
        url: image.meta.document.url,
        name: image.name.replace(".jpeg", ""),
        imageId: image?._id,
      });
    });
    data.forEach((item) => {
      const node = files.nodes.find((node) => {
        return (
          node.name.includes(".json") &&
          node.name.replace(".json", "") === item.name
        );
      });
      item.JsonUrl = node?.meta?.document?.url;
      item.jsonId = node?._id;
    });
  } catch (error) {
    Spinner.hideSpinner();
    console.log(error);
  } finally {
    Spinner.hideSpinner();
    if (data.length === 0) {
      toast.error("Error", "No Designer Templates saved");
    } else {
      const modalConfig = Object.assign(MODAL_INTERFACE);
      modalConfig.resData = "";
      modalConfig.title = ["Select Design", "center"];
      modalConfig.btns = [
        { text: "OK", type: "contained" },
        { text: "Cancel", className: "dangerBtn" },
      ];
      modalConfig.config = ["90vw", "auto"];
      modalConfig.withJsx = (
        <TemplatesModal
          data={data}
          toast={toast}
          applyJsonToCanvas={(val) => {
            Spinner.showSpinner();
            Modal.hide();
            initializeObject(val);
            applyJsonToCanvas(val, self);
          }}
          getJSON={getJSON}
          deleteDesign={(imgId, jsonId) => {
            confirmDeletion(imgId, jsonId, self);
          }}
        />
      );
      modalConfig.dynamicModalResponseFun = ({ btnType }) => {
        // show the modal
      };
      Modal.show(modalConfig, true);
      self.setState({ modalActive: true });
    }
  }
};

export const confirmDeletion = (imgId, jsonId, self) => {
  const modalConfig = cloneDeep(MODAL_INTERFACE);
  modalConfig.portalId = "ui-kit-dynamic-modal-container";
  modalConfig.title = ["Delete selected Design?", "center"];
  modalConfig.config = ["auto", "auto"];
  modalConfig.withJsx = (
    <>
      <div className="delete-modal modal-body">
        <p className="text-center">
          Selected Design in self page will be deleted.
        </p>
      </div>
      <div className="modal-footer align-center">
        <Button
          type="button"
          className="mr-2 bg-red-600"
          onClick={() => {
            Modal.hide("ui-kit-dynamic-modal-container");
            deleteDesign(imgId, jsonId, self);
          }}
          size="sm"
        >
          OK
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            Modal.hide("ui-kit-dynamic-modal-container");
          }}
          size="sm"
        >
          Cancel
        </Button>
      </div>
    </>
  );
  modalConfig.btns = [];
  Modal.show(modalConfig, true);
};

export const deleteDesign = async (imgId, jsonId, self) => {
  try {
    deleteTemplate(imgId, jsonId, self);
  } catch (error) {
    console.log(error);
  }
};

export const deleteTemplate = async (imgId, jsonId, self) => {
  const { asset, toast } = self.props;
  try {
    Spinner.showSpinner();
    const deleteTemplate = self.props.fsOperations(asset._id, "trash", [
      imgId,
      jsonId,
    ]);
    const res = await Promise.all([deleteTemplate]);
    if (res) {
      toast.success("Success", "Cover deleted Successfully");
    }
  } catch (error) {
    Spinner.hideSpinner();
    toast.error("Error", error);
  } finally {
    Spinner.hideSpinner();
    Modal.hide();
    showSavedTemplates(self);
  }
};

export const uploadTemplate = async (fileName, Modal, self) => {
  try {
    const temp = createJSON(self);
    var blob = new Blob([JSON.stringify(temp)], {
      type: "text/plain",
    });
    var file = new File([blob], "file", {
      type: "application/json",
    });
    upload(file, fileName, self);
  } catch (err) {
    console.log(err);
  } finally {
    Modal.hide();
  }
};

export const uploadTemplateModal = async (self) => {
  const modalConfig = Object.assign(MODAL_INTERFACE);
  let fileName = "";
  const { asset } = self.props;
  const parentNodeId = asset.reservedNodes.coverImages;
  let allNames = [];
  let imgNodes = [];
  let JsonNodes = [];
  const canvasRef = Object.values(self.state.canvases)[0];
  const fileSVGData = canvasRef.toDataURL({
    format: "jpeg",
    quality: 0.8,
  });
  try {
    const reqConfig = cloneDeep(REQ_CONFIG);
    reqConfig.cacheInvalidate = true;
    const files = await self.props.getFiles(
      asset._id,
      { parentNodeId },
      reqConfig
    );
    const imageNodes = files.data.nodes.filter((image) => {
      return image.meta.document.mimetype === "image/jpeg";
    });
    const JsonFiles = files.data.nodes.filter((json) => {
      return json.meta.document.mimetype === "application/json";
    });
    JsonFiles.forEach((JsonNode) => {
      JsonNodes.push(JsonNode);
    });
    imageNodes.forEach((imageNode) => {
      imgNodes.push(imageNode);
      allNames.push(imageNode.name.replace(".jpeg", ""));
    });
  } catch (error) {
    console.log(error);
  } finally {
    modalConfig.resData = "";
    modalConfig.title = ["Cover Image name", "center"];
    modalConfig.btns = [];
    modalConfig.config = ["550px"];
    modalConfig.withJsx = (
      <>
        <SaveTemplateModal
          JsonNodes={JsonNodes}
          imgNodes={imgNodes}
          allNames={allNames}
          fileName={fileName}
          currImgDataUrl={fileSVGData}
          onFileNameChange={(name) => {
            fileName = name;
          }}
          onCancel={() => {
            Modal.hide();
            self.setState({ modalActive: false });
          }}
          onSave={() => {
            uploadTemplate(fileName, Modal, self);
          }}
          onOverWrite={(imageNode, JsonNode) => {
            //call patch api instead of post api for image and json
            updateTemplate(imageNode, JsonNode, self);
            Modal.hide();
          }}
        />
      </>
    );
    Modal.show(modalConfig, true);
    self.setState({ modalActive: true });
  }
};

export const updateTemplate = async (imageNode, JsonNode, self) => {
  const { asset, toast } = self.props;
  const canvasRef = Object.values(self.state.canvases)[0];
  const temp = createJSON(self);
  var blob = new Blob([JSON.stringify(temp)], {
    type: "text/plain",
  });
  var file = new File([blob], "file", { type: "application/json" });
  const fileSVGData = canvasRef.toDataURL({
    format: "jpeg",
    quality: 0.8,
  });
  var imageblob = dataURLtoBlob(fileSVGData);
  try {
    Spinner.showSpinner();
    const updateJson = self.props.patchImageFile(asset._id, JsonNode._id, file);
    const updateImg = self.props.patchImageFile(
      asset._id,
      imageNode._id,
      imageblob
    );
    const res = await Promise.all([updateJson, updateImg]);
    if (res) {
      Spinner.hideSpinner();
      toast.success("Success", "Cover Updated Successfully");
    }
  } catch (error) {
    Spinner.hideSpinner();
    toast.error("Error", error);
    console.log(error);
  } finally {
    Spinner.hideSpinner();
  }
};

export const upload = async (file, templateName, self) => {
  const { asset, toast } = self.props;
  const parentNodeId = asset.reservedNodes.coverImages;
  const canvasRef = Object.values(self.state.canvases)[0];
  const fileSVGData = canvasRef.toDataURL({
    format: "jpeg",
    quality: 0.8,
  });
  var myblob = dataURLtoBlob(fileSVGData);
  try {
    Spinner.showSpinner();
    const uploadJson = self.props.uploadAssets(
      asset._id,
      "d",
      parentNodeId,
      templateName + ".json",
      file,
      true,
      false,
      false,
      true
    );
    const uploadImg = self.props.uploadAssets(
      asset._id,
      "d",
      parentNodeId,
      templateName + ".jpeg",
      myblob,
      true,
      false,
      false,
      true
    );
    const res = await Promise.all([uploadJson, uploadImg]);
    if (res) {
      toast.success("Success", "Cover Saved Successfully");
    }
  } catch (error) {
    Spinner.hideSpinner();
    toast.error("Error", error);
  } finally {
    Spinner.hideSpinner();
  }
};

export const onSelectFile = (e, self) => {
  console.log("onSelectFile");
  if (e.target.files && e.target.files.length > 0) {
    const files = [];
    Object.keys(e.target.files).forEach((key) => {
      files.push(e.target.files[key]);
    });
    handleDrop(files, self);
  }
  //clear filereader to detect same file again if not changed on mutliple attempts
  e.target.value = "";
};

// UPLOAD IMAGE/SVG TO CANVAS PAGE
export const onSelectImage = (e, self) => {
  if (e.target.files && e.target.files.length > 0) {
    const [name, isValid] = validateString(e.target.files[0].name);
    const reader = new FileReader();
    let fType = e.target.files[0].type.split("/")[1];
    let img = new Image();
    reader.addEventListener("load", () => {
      // TODO: handle svg and image separately
      if (
        reader.result.includes("data:image") &&
        !reader.result.includes("svg+xml")
      ) {
        img.src = reader.result;
        img.onload = function () {
          var myselectionblob = dataURLtoBlob(reader.result);
          self.setState({
            shouldSave: true,
            thumbnailUrl: reader.result,
            defaultFileType: fType,
            showDownloadBtn: false,
            fileDimensions: {
              height: img.height,
              width: img.width,
            },
            blob: myselectionblob,
            defaultFileName: name,
            returnNodeId: true,
          });
        };
      }
    });
    reader.readAsDataURL(e.target.files[0]);
  }
  //clear filereader to detect same file again if not changed on mutliple attempts
  e.target.value = "";
};

function svgSize(name) {
  const match = name.match(/\b(\d{1,4})x(\d{1,4})\b/);
  if (match) {
    const width = parseInt(match[1], 10);
    const height = parseInt(match[2], 10);
    return {
      _width: width > 2000 ? 2000 : width,
      _height: height > 2000 ? 2000 : height,
    };
  } else {
    return { _width: null, _height: null };
  }
}

export const onAddImageFromFile = (e, self, pageHeight, pageWidth) => {
  console.log(e, self, pageHeight, pageWidth);
  const canvasRef = Object.values(self.state.canvases)[0];
  if (e.target.files && e.target.files.length > 0) {
    const reader = new FileReader();
    let img = new Image();
    let fileName = "";
    let _width = null;
    let _height = null;
    const files = [];
    Object.keys(e.target.files).forEach((key) => {
      fileName = e.target.files[key].name;
      files.push(e.target.files[key]);
    });
    ({ _width, _height } = svgSize(fileName, _width, _height));

    reader.addEventListener("load", () => {
      img.src = reader.result;
      img.onload = function () {
        canvasRef.clear();
        canvasRef.backgroundColor = "#ffffff";
        canvasRef.renderAll();
        const styles = window.getComputedStyle(self.designer?.current);
        const widthLimit = parseInt(styles?.width) - 20;
        const heightLimit = parseInt(styles?.height) - 20;
        const imgRatio = img.width / img.height;
        console.log(imgRatio);
        if (
          img.width > parseInt(styles?.width) - 20 ||
          img.height > parseInt(styles?.height) - 20
        ) {
          console.log("here");
          if (imgRatio > widthLimit / heightLimit) {
            //wider image
            if (img.width > widthLimit) {
              if (widthLimit / imgRatio > heightLimit) {
                self.setState(
                  {
                    pageHeight: parseInt(heightLimit * imgRatio),
                  },
                  () => {
                    resizePage(self, () => {
                      handleDrop(files, self);
                    });
                  }
                );
              } else {
                self.setState(
                  {
                    pageWidth: widthLimit,
                    pageHeight: parseInt(widthLimit / imgRatio),
                  },
                  () => {
                    resizePage(self, () => {
                      handleDrop(files, self);
                    });
                  }
                );
              }
            } else if (img.width > pageWidth) {
              self.setState(
                {
                  pageWidth: img.width,
                  pageHeight: parseInt(img.width / imgRatio),
                },
                () => {
                  resizePage(self, () => {
                    handleDrop(files, self);
                  });
                }
              );
            }
          } else {
            //longer image
            if (img.height > heightLimit) {
              self.setState(
                {
                  pageWidth: parseInt(heightLimit * imgRatio),
                  pageHeight: heightLimit,
                },
                () => {
                  resizePage(self, () => {
                    handleDrop(files, self);
                  });
                }
              );
            } else if (img.height > pageHeight) {
              self.setState(
                {
                  pageWidth: parseInt(img.height * imgRatio),
                  pageHeight: img.height,
                },
                () => {
                  resizePage(self, () => {
                    handleDrop(files, self);
                  });
                }
              );
            }
          }
        } else {
          console.log("here", files);
          self.setState(
            {
              pageWidth: _width ? _width : parseInt(img.height * imgRatio),
              pageHeight: _height ? _height : img.height,
            },
            () => {
              resizePage(self, () => {
                handleDrop(files, self);
              });
            }
          );
        }
      };
    });
    reader.readAsDataURL(e.target.files[0]);
  }
  //clear filereader to detect same file again if not changed on mutliple attempts
  e.target.value = "";
};

export const applyJsonToCanvas = async (jsonData, self) => {
  const canvasRef = Object.values(self.state.canvases)[0];
  canvasRef.clear();
  self.setState({
    showStyleEditor: false,
    selectedElementName: "Please select",
  });
  const textObjects = jsonData.objects.filter((item) => {
    return item.type === "i-text";
  });
  for (const obj of textObjects) {
    await loadGoogleFont(obj?.fontFamily);
  }
  if (jsonData?.hasOwnProperty("background")) {
    self.setState({ pageBgColor: jsonData?.background });
  }
  if (jsonData?.hasOwnProperty("height")) {
    dimensionChangeHandler("height", jsonData?.height, self);
  }
  if (jsonData?.hasOwnProperty("width")) {
    dimensionChangeHandler("width", jsonData?.width, self);
  }
  canvasRef.loadFromJSON(jsonData, () => {
    canvasRef.renderAll.bind(canvasRef);
    canvasRef.getObjects().forEach((obj, index) => {
      obj.id = index + 1;
    });
    Spinner.hideSpinner();
  });
};

export const handleJsonData = (event, self) => {
  const { toast } = self.props;
  const file = event.target.files[0];
  if (!file) {
    return;
  }
  // Use FileReader to read the contents of the uploaded file.
  const reader = new FileReader();
  reader.onload = async () => {
    try {
      // Parse the JSON data and store it in the state.
      let jsonData = JSON.parse(reader.result);
      const prevHash = jsonData.hash;
      delete jsonData.hash;
      const hash = await sha256(JSON.stringify(jsonData));
      if (prevHash === hash || !prevHash) {
        // Soon, you won't be able to upload a file unless it has a hash value
        // Disabling existing hash since there are many templates that has to be uploaded
        initializeObject(jsonData);
        applyJsonToCanvas(jsonData, self);
      } else {
        toast.error("Error", "Template is Corrupt");
        Spinner.hideSpinner();
      }
    } catch (error) {
      console.error("Invalid Template:", error);
      Spinner.hideSpinner();
    } finally {
      Spinner.hideSpinner();
    }
  };
  // Read the file as text.
  reader.readAsText(file);
};

export const showRandomBlob = (self, canvasRef) => {
  let title = "blob";
  let mySvg = null;
  const { pageWidth, pageHeight } = self.state;
  const modalConfig = cloneDeep(MODAL_INTERFACE);
  modalConfig.title = [title, "center"];
  modalConfig.config = ["auto", "900px"];
  modalConfig.withJsx = (
    <>
      {/* <RandomBlobModal
        canvasRef={canvasRef}
        onChange={(svg) => {
          mySvg = svg;
        }}
        pageWidth={pageWidth}
        pageHeight={pageHeight}
      /> */}
      <div className="modal-footer align-center">
        <Button
          type="button"
          className="mr-2 bg-red-600"
          onClick={() => {
            // onAdd(fabricSvg);
            addRandomShape(self, mySvg);
            Modal.hide();
            self.setState({ modalActive: false });
          }}
          size="sm"
        >
          OK
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            Modal.hide();
            self.setState({ modalActive: false });
          }}
          size="sm"
        >
          Cancel
        </Button>
      </div>
    </>
  );
  modalConfig.btns = [];
  Modal.show(modalConfig, true);
  self.setState({ modalActive: true });
};

// SHOW PAGE RESET WARNING
export const showPageResetWarning = (deleteType, self) => {
  let title =
    deleteType === ACTIONS.DELETE_SELECTION
      ? "Clear selected item(s)?"
      : "Caution! Clear all object(s)?";
  const modalConfig = cloneDeep(MODAL_INTERFACE);
  modalConfig.title = [title, "center"];
  modalConfig.config = ["480px", "auto"];
  modalConfig.withJsx = (
    <>
      <div className="delete-modal modal-body">
        <p className="text-center">
          This will clear
          {deleteType === ACTIONS.CLEAR_PAGE ? " all " : " Selected "}
          object(s) from the screen. Are you sure?
        </p>
      </div>
      <div className="modal-footer align-center">
        <Button
          type="button"
          className="mr-2 bg-red-600"
          onClick={() => {
            Modal.hide();
            self.setState({ modalActive: false });
            if (deleteType === ACTIONS.CLEAR_PAGE) resetPage(self);
            else if (deleteType === ACTIONS.DELETE_SELECTION)
              deleteSelection(self);
          }}
          size="sm"
        >
          OK
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            Modal.hide();
            self.setState({ modalActive: false });
          }}
          size="sm"
        >
          Cancel
        </Button>
      </div>
    </>
  );
  modalConfig.btns = [];
  Modal.show(modalConfig, true);
  self.setState({ modalActive: true });
};

// RESET PAGE TO EMPTY PAGE
export const resetPage = (self) => {
  const canvasRef = Object.values(self.state.canvases)[0];
  canvasRef.clear();
  canvasRef.backgroundColor = "#ffffff";
  canvasRef.renderAll();
  self.setState({
    activeElementProps: {
      id: "",
      colors: [],
      ...Object.assign({}, FONT_PROPS_DEFAULT),
    },
    error: {
      height: false,
      width: false,
    },
    showStyleEditor: false,
    pageBgColor: "#ffffff",
    elementsDropDownData: [],
    selectedElementName: "Please select",
  });
};

export const updateActiveElement = (id, name, self) => {
  const canvasRef = Object.values(self.state.canvases)[0];
  const elem = canvasRef.getObjects().find((i) => {
    return i.id === id;
  });
  if (elem) {
    canvasRef.setActiveObject(elem);
  } else {
    const bubble = canvasRef.getObjects().find((i) => {
      return i.bubbleId === id && i.customType === "SpeechBubble";
    });
    if (bubble !== undefined) {
      canvasRef.setActiveObject(bubble);
    }
  }
  if (canvasRef.getActiveObject()?.changedName === true) {
    self.setState({
      selectedElementId: id,
      selectedElementName: canvasRef.getActiveObject().customName,
      isCanvasActive: true,
    });
  } else {
    self.setState({
      selectedElementId: id,
      selectedElementName: name,
      isCanvasActive: true,
    });
  }
  canvasRef.requestRenderAll();
};

export const deleteSelection = (self) => {
  const canvasRef = Object.values(self.state.canvases)[0];
  const activeObjects = canvasRef.getActiveObjects();
  canvasRef.remove(...activeObjects);
  canvasRef.discardActiveObject();
  self.setState({
    selectedElementName: "No Element(s) Selected",
    name: null,
    id: null,
  });
  createCanvasElementsDropdownData(self);
};

export const handleNameElement = (val, self) => {
  const _canvas = Object.values(self.state.canvases)[0];
  if (_canvas.getActiveObject()?.changedName === true) {
    _canvas.getActiveObject().customName = _canvas.getActiveObject().customName;
    self.setState({
      selectedElementName: _canvas?.getActiveObject()?.customName,
    });
  } else {
    _canvas.getActiveObject().name = _canvas.getActiveObject().val;
    self.setState({
      selectedElementName: val,
    });
  }
};

export const openImageLibrary = (self) => {
  const openDialogConfig = {
    zIndex: 5,
    // localFileSystem: self.props._localFileSystem,
    fileType: "i",
    returnType: "i",
    rootFolderType: "i",
    fileDialogResponseFun: (res) => fileDialogResponseFun(res, self),
    createFolder: (data) => FileDialog.createFolder(data),
    search: (data) => FileDialog.search(data),
    updateLocalFileSystem: (data) => FileDialog.updateLocalFileSystem(data),
    redirectToFileLocation: (lastSelectedFile) =>
      FileDialog.redirectToFileLocation(lastSelectedFile),
  };
  FileDialog.show(openDialogConfig);
};

export const fileDialogResponseFun = (res, self) => {
  if (res.type === "btnClick" && res.btnType === "ok") {
    fileDialogOkBtn(res, self);
  }
};

export const fileDialogOkBtn = (res, self) => {
  const { pageHeight, pageWidth } = self.state;
  const fileObj = res.data;
  const url = fileObj?.meta?.imageVariations?.[0]?.url;
  const oheight = fileObj.meta.imageVariations?.[0].height;
  const owidth = fileObj.meta.imageVariations?.[0].width;
  const height = fileObj.meta.image.originalHeight;
  const width = fileObj.meta.image.originalWidth;
  const heightDiff = oheight - pageHeight;
  const widthDiff = owidth - pageWidth;
  let scale = 1;
  let left = 0;
  let top = 0;
  if (heightDiff > 0 || widthDiff > 0) {
    if (pageHeight / oheight < pageWidth / owidth) {
      scale = pageHeight / oheight;
      left = (pageWidth - width * scale) / 2;
    } else if (pageHeight / oheight > pageWidth / owidth) {
      scale = pageWidth / owidth;
      top = (pageHeight - height * scale) / 2;
    }
  } else {
    left = (pageWidth - owidth) / 2;
    top = (pageHeight - oheight) / 2;
  }
  if (fileObj.meta.image.mimetype === "image/svg+xml") {
    addSVGToPage(url, height, width, self);
  } else {
    const canvasRef = Object.values(self.state.canvases)[0];
    const _rect = new fabric.Rect({
      height: oheight * scale,
      width: owidth * scale,
      rx: 0,
      ry: 0,
      id: getNewID(),
      BorderLock: true,
      fill: "rgba(0 0 0 0)",
      left,
      top,
      stroke: "#000",
      strokeWidth: 0,
      URL: url,
      patternActive: true,
      name: res.data.name,
    });
    canvasRef.add(_rect);
    canvasRef.setActiveObject(_rect);
    addPattern(url, canvasRef, (newProps) => {
      const _activeElementProps = {
        ...self.state.activeElementProps,
        ...newProps,
      };
      self.setState(
        {
          activeElementProps: {
            ..._activeElementProps,
            height: oheight * scale,
            width: owidth * scale,
            rx: 0,
            ry: 0,
            BorderLock: true,
            fill: "rgba(0 0 0 0)",
            left,
            top,
            stroke: "#000",
            URL: url,
            patternActive: true,
          },
          loadingImage: false,
        },
        () => {
          _rect.patternActive = true;
          canvasRef.requestRenderAll();
        }
      );
    });
  }
};

export const undoAction = (self) => {
  const canvasRef = Object.values(self.state.canvases)[0];
  canvasRef.undo(() => {
    canvasRef.getObjects().forEach((item) => {
      switch (item.customType) {
        case "quad_curve":
        case "quad_control":
        case "quad_arrow":
        case "SpeechBubble":
          item.hasControls = false;
          break;
        default:
          item.hasControls = true;
      }
      item.lockMovementX = false;
      item.lockMovementY = false;
      if (item.id === self.state.selectedElementId) {
        if (item.url) {
          self.setState(
            {
              showStyleEditor: true,
              selectedElementName: item.name,
              selectedElementId: item.id,
              activeElementProps: {
                ...self.state.activeElementProps,
                URL: item.url,
                colors: [],
              },
            },
            () => {
              canvasRef.setActiveObject(item);
            }
          );
        }
        self.setState({
          showStyleEditor: true,
          selectedElementName: item.name,
          selectedElementId: item.id,
        });
      }
    });
  });
};

// SET AN OBJECT TO ACTIVE BY PASSING THE OBJECT ID
export const setActiveObject = (id, self) => {
  if (!id) return;
  const _canvas = Object.values(self.state.canvases)[0];
  _canvas.getObjects().forEach(function (item) {
    if (item.id === id) {
      _canvas.setActiveObject(item);
      _canvas.renderAll();
    }
  });
};

// update elements names and ids for selection
export const createCanvasElementsDropdownData = (self) => {
  const canvas = Object.values(self.state.canvases)[0];
  const canvasElementNames = getCanvasElementNames(canvas);
  self.setState({
    elementsDropDownData: canvasElementNames,
  });
};

// add image to canvas from image library
export const addSavedImageFromLibrary = async (nodeId, self) => {
  const { getFile } = self.props;
  const { assetId } = self.props.match.params;
  let url = "";
  try {
    const file = await getFile(assetId, nodeId, false);
    url = file.meta.image.originalUrl;
  } catch (error) {
    console.log(error);
  } finally {
    Spinner.showSpinner();
    addImage(url, self);
  }
};

/**
 * get sibling elements of a HTML element
 * @param {HTML element} el element which for to find siblings
 * @returns sibling elements of passed element
 */
export const siblings = function (el) {
  if (el.parentNode === null) return [];
  return Array.prototype.filter.call(el.parentNode.children, function (child) {
    return child !== el;
  });
};

export const openSizeTemplates = async (self) => {
  Spinner.hideSpinner();
  const modalConfig = Object.assign(MODAL_INTERFACE);
  modalConfig.resData = "";
  modalConfig.title = ["Select Design", "center"];
  modalConfig.btns = [];
  modalConfig.config = ["900px", "auto"];
  modalConfig.closeOnOutSideClick = false;
  modalConfig.withJsx = (
    // <SizeTemplatesModal
    //   dimensionChangeHandler={dimensionChangeHandler}
    //   resetPage={resetPage}
    //   self={self}
    //   hide={() => {
    //     Modal.hide();
    //   }}
    // />
    <></>
  );
  // Modal.show(modalConfig, true);
  self.setState({ modalActive: true });
};

// HANDLE EVENTS ON RIGHT PANEL AND PERFORM ACTIONS ACCORDINGLY
export const handleRightPanelUpdates = (action, data, self) => {
  const canvasRef = Object.values(self.state.canvases)[0];
  const alignment = data;
  const { pageHeight, pageWidth, loadingImage } = self.state;
  const activeElement = canvasRef.getActiveObject();
  switch (action) {
    case ACTIONS.SHOW_SAVED_TEMPLATES:
      showSavedTemplates(self);
      break;
    case ACTIONS.SHOW_GLOBAL_TEMPLATES:
      showGlobalTemplates(self);
      break;
    case ACTIONS.OTHERS:
      // openSizeTemplates(self);
      break;
    case ACTIONS.ADD_FROM_LIBRARY:
      openImageLibrary(self);
      break;
    case ACTIONS.ADD_TEXT:
      addText(self);
      break;
    case ACTIONS.CHANGE_ACTIVE_ELEMENT_PROPS:
      self.setState(
        {
          showStyleEditor: true,
          activeElementProps: data,
          selectedElementName: data.name,
          selectedElementId: data.id,
        },
        () => {
          canvasRef.requestRenderAll();
        }
      );
      setActiveObject(data.id, self);
      break;
    case ACTIONS.CHANGE_PAGE_BACKGROUND:
      changePageBackGround(data, self);
      break;
    case ACTIONS.ELEMENT_NAME:
      handleNameElement(data.target.value, self);
      break;
    case ACTIONS.CHANGE_PAGE_DIMENSIONS:
      dimensionChangeHandler(data.name, data.val, self);
      break;
    case ACTIONS.CLEAR_PAGE:
      resetPage(self);
      break;
    case ACTIONS.CLEAR_SELECTED_ITEM:
      deleteSelection(self);
      break;
    case ACTIONS.DOWNLOAD_PAGE:
      downloadPage(self);
      break;
    case ACTIONS.DOWNLOAD_SELECTION:
      downloadSelection(self);
      break;
    case ACTIONS.DOWNLOAD_JSON:
      downloadJSON(self);
      break;
    case ACTIONS.UPLOAD_JSON:
      uploadTemplateModal(self);
      break;
    case ACTIONS.UPLOAD_IMAGE:
      self.imagetoLibInputRef.current.click();
      break;
    case ACTIONS.UPLOAD_SVG:
      self.svgInputRef.current.click();
      break;
    case ACTIONS.DELETE_SELECTION:
      deleteSelection(self);
      break;
    case ACTIONS.REDO_ACTION:
      canvasRef.redo();
      break;
    case ACTIONS.SAVE_PAGE_TO_LIBRARY:
      saveToImageLibrary(ACTIONS.SAVE_PAGE_TO_LIBRARY, self);
      break;
    case ACTIONS.SAVE_SELECTION_TO_LIBRARY:
      saveToImageLibrary(ACTIONS.SAVE_SELECTION_TO_LIBRARY, self);
      break;
    case ACTIONS.UNDO_ACTION:
      undoAction(self);
      break;
    case ACTIONS.UPDATE_ACTIVE_ELEMENT:
      updateActiveElement(data.id, data.name, self);
      break;
    case ACTIONS.ADD_TRIANGLE:
      addTriangle(self);
      break;
    case ACTIONS.ADD_RECTANGLE:
      addRectangle(null, null, self);
      break;
    case ACTIONS.ADD_CIRCLE:
      addCircle(self);
      break;
    case ACTIONS.ADD_LINE:
      addLine(ACTIONS.ADD_LINE, self);
      break;
    case ACTIONS.ADD_DASHED_LINE:
      addLine(ACTIONS.ADD_DASHED_LINE, self);
      break;
    case ACTIONS.ADD_QUADRATIC_CURVE:
      addQuadratic(self);
      break;
    case ACTIONS.ALIGN_ELEMENT_HORIZONTALLTY:
      if (activeElement?.bubbleId) {
        if (!activeElement._objects) {
          return;
        }
      }
      alignElementHorizontally(alignment, canvasRef, pageWidth, activeElement);
      break;
    case ACTIONS.ALIGN_ELEMENT_VERTICALLY:
      if (activeElement?.bubbleId) {
        if (!activeElement._objects) {
          return;
        }
      }
      alignElementVertically(alignment, canvasRef, pageHeight, activeElement);
      break;
    case ACTIONS.ALIGN_WITHIN_GROUP_HORIZONTALLTY:
      alignGroupHorizontally(data, self);
      break;
    case ACTIONS.ADD_SPEECH_BUBBLE:
      addSpeechBubble(self);
      break;
    case ACTIONS.ADD_SPEECH_LABEL:
      addSpeechLabel(self, true);
      break;
    case ACTIONS.ADD_RANDOM_SHAPE:
      showRandomBlob(self, canvasRef);
      break;
    case ACTIONS.SPACE_WITHIN_GROUP_EVENLY:
      spaceGroupEvenly(data, self);
      break;
    case ACTIONS.RAW_DATA:
      self.jsonRef.current.click();
      break;
    case ACTIONS.IMAGE_DATA:
      self.imagetoCanvasRef.current.click();
      break;
    case ACTIONS.ADD_PATTERN:
      activeElement.URL = data;
      const _activeElementProps = {
        ...self.state.activeElementProps,
        URL: data,
      };
      self.setState({ activeElementProps: _activeElementProps });
      if (!loadingImage) {
        addPattern(data, canvasRef, (newProps) => {
          const _activeElementProps = {
            ...self.state.activeElementProps,
            ...newProps,
          };
          self.setState(
            { activeElementProps: _activeElementProps, loadingImage: false },
            () => {
              canvasRef.requestRenderAll();
            }
          );
        });
      }
      break;
    case ACTIONS.CHANGE_PATTERN_SIZE:
      handlePatternSize(data.width, data.height, self);
      break;
    case ACTIONS.CHANGE_PATTERN_POSITION:
      handlePatternPosition(data.left, data.top, data.angle, self);
      break;
    case ACTIONS.MAKE_BLANK:
      resetPage(self);
      canvasRef.clearHistory();
      break;
    default:
      console.log("unhandled-action", action);
      break;
  }
};

export const getTopPoints = (llimit, rlimit, Height, Width) => {
  let newPoints = [];
  newPoints.push({ x: llimit, y: 30 }); //0
  newPoints.push({
    x: llimit + Width / 2 - 8,
    y: 30,
  }); //1
  newPoints.push({
    x: Width / 2,
    y: 0,
  }); //2
  newPoints.push({
    x: llimit + 8 + Width / 2,
    y: 30,
  }); //3
  newPoints.push({ x: rlimit, y: 30 }); //4
  newPoints.push({ x: rlimit, y: Height / 2 - 8 + 30 }); //5
  newPoints.push({ x: rlimit, y: Height / 2 + 30 }); //6
  newPoints.push({ x: rlimit, y: Height / 2 + 8 + 30 }); //7
  newPoints.push({ x: rlimit, y: Height + 30 }); //8
  newPoints.push({
    x: llimit + 8 + Width / 2,
    y: Height + 30,
  }); //9
  newPoints.push({ x: Width / 2, y: Height + 30 }); //10
  newPoints.push({
    x: llimit - 8 + Width / 2,
    y: Height + 30,
  }); //11
  newPoints.push({ x: llimit, y: Height + 30 }); //12
  newPoints.push({ x: llimit, y: Height / 2 + 8 + 30 }); //13
  newPoints.push({ x: 0, y: Height / 2 + 30 }); //14
  newPoints.push({ x: llimit, y: Height / 2 - 8 + 30 });
  return newPoints;
};

export const getBotomPoints = (llimit, rlimit, Height, Width) => {
  let newPoints = [];
  newPoints.push({ x: llimit, y: 0 }); //0
  newPoints.push({
    x: llimit + Width / 2 - 8,
    y: 0,
  }); //1
  newPoints.push({
    x: Width / 2,
    y: 0,
  }); //2
  newPoints.push({
    x: llimit + 8 + Width / 2,
    y: 0,
  }); //3
  newPoints.push({ x: rlimit, y: 0 }); //4
  newPoints.push({ x: rlimit, y: Height / 2 - 8 }); //5
  newPoints.push({ x: rlimit, y: Height / 2 }); //6
  newPoints.push({ x: rlimit, y: Height / 2 + 8 }); //7
  newPoints.push({ x: rlimit, y: Height }); //8
  newPoints.push({
    x: llimit + 4 + Width / 2,
    y: Height,
  }); //9
  newPoints.push({ x: Width / 2, y: Height + 30 }); //10
  newPoints.push({
    x: llimit - 4 + Width / 2,
    y: Height,
  }); //11
  newPoints.push({ x: llimit, y: Height }); //12
  newPoints.push({ x: llimit, y: Height / 2 + 8 }); //13
  newPoints.push({ x: 0, y: Height / 2 }); //14
  newPoints.push({ x: llimit, y: Height / 2 - 8 });
  return newPoints;
};

export const getRightPoints = (llimit, rlimit, Height, Width) => {
  let newPoints = [];
  newPoints.push({ x: llimit, y: 0 }); //0
  newPoints.push({
    x: llimit + Width / 2 - 8,
    y: 0,
  }); //1
  newPoints.push({
    x: Width / 2,
    y: 0,
  }); //2
  newPoints.push({
    x: llimit + 8 + Width / 2,
    y: 0,
  }); //3
  newPoints.push({ x: rlimit - 30, y: 0 }); //4
  newPoints.push({ x: rlimit - 30, y: Height / 2 - 8 }); //5
  newPoints.push({ x: rlimit, y: Height / 2 }); //6
  newPoints.push({ x: rlimit - 30, y: Height / 2 + 8 }); //7
  newPoints.push({ x: rlimit - 30, y: Height }); //8
  newPoints.push({ x: llimit + 8 + Width / 2, y: Height }); //9
  newPoints.push({ x: Width / 2, y: Height }); //10
  newPoints.push({ x: llimit - 8 + Width / 2, y: Height }); //11
  newPoints.push({ x: llimit, y: Height }); //12
  newPoints.push({ x: llimit, y: Height / 2 + 8 }); //13
  newPoints.push({ x: 0, y: Height / 2 }); //14
  newPoints.push({ x: llimit, y: Height / 2 - 8 }); //15
  return newPoints;
};

export const getLeftPoints = (llimit, rlimit, Height, Width) => {
  let newPoints = [];
  newPoints.push({ x: llimit, y: 0 }); //0
  newPoints.push({
    x: Width / 2 - 8 + 30,
    y: 0,
  }); //1
  newPoints.push({
    x: Width / 2 + 30,
    y: 0,
  }); //2
  newPoints.push({
    x: Width / 2 + 8 + 30,
    y: 0,
  }); //3
  newPoints.push({ x: rlimit, y: 0 }); //4
  newPoints.push({ x: rlimit, y: Height / 2 - 8 }); //5
  newPoints.push({ x: rlimit, y: Height / 2 }); //6
  newPoints.push({ x: rlimit, y: Height / 2 + 8 }); //7
  newPoints.push({ x: rlimit, y: Height }); //8
  newPoints.push({ x: Width / 2 + 8 + 30, y: Height }); //9
  newPoints.push({ x: Width / 2 + 30, y: Height }); //10
  newPoints.push({ x: Width / 2 - 8 + 30, y: Height }); //11
  newPoints.push({ x: llimit, y: Height }); //12
  newPoints.push({ x: llimit, y: Height / 2 + 8 }); //13
  newPoints.push({ x: 0, y: Height / 2 }); //14
  newPoints.push({ x: llimit, y: Height / 2 - 8 }); //15
  return newPoints;
};

export const createNewPoly = (strokeWidth, textbox, arrow) => {
  let newPoints = [];
  const Width = textbox.width + 2 * textbox.polyPadding;
  const Height = textbox.getBoundingRect().height + 2 * textbox.polyPadding + 3;
  let newPolyLeft =
    textbox.getBoundingRect().left - textbox.polyPadding - strokeWidth / 2;
  let newPolyTop =
    textbox.getBoundingRect().top - 2 - textbox.polyPadding - strokeWidth / 2;
  let llimit = 0;
  let rlimit = Width;
  switch (arrow) {
    case "Left":
      llimit = 30;
      rlimit = Width + 30;
      newPoints = getLeftPoints(llimit, rlimit, Height, Width);
      newPolyLeft = newPolyLeft - 30;
      break;
    case "Right":
      rlimit = Width + 30;
      newPoints = getRightPoints(llimit, rlimit, Height, Width);
      break;
    case "Top":
      newPoints = getTopPoints(llimit, rlimit, Height, Width);
      newPolyTop -= 30;
      break;
    case "Bottom":
      newPoints = getBotomPoints(llimit, rlimit, Height, Width);
      break;
    default:
      console.log("unknown value", arrow);
      break;
  }
  return { newPoints, newPolyLeft, newPolyTop };
};
