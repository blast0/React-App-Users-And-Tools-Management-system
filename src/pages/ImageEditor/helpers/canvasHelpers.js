import {
  Rect,
  Line,
  IText,
  Triangle,
  Circle,
  loadSVGFromString,
  util,
  FabricImage,
  Gradient,
} from "fabric";
// import { toast } from "react-toastify";
import FontFaceObserver from "fontfaceobserver";
import Spinner from "@/components/spinner/manager";
import { ACTIONS } from "../constants/constants";

export const uuidv4 = () => {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      +c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
    ).toString(16)
  );
};

export const GetRectangle = (options) => {
  const rectElement = new Rect({
    ...options,
    id: uuidv4(),
    top: 0,
    left: 0,
    height: 100,
    width: 100,
    // fill: "red",
  });
  return rectElement;
};

export const GetTriangle = (options) => {
  const triangleElement = new Triangle({
    ...options,
    strokeUniform: true,
    id: uuidv4(),
  });
  return triangleElement;
};

export const GetCircle = (options) => {
  const circleElement = new Circle({
    ...options,
    strokeUniform: true,
    radius: 50,
    // fill: "red",
    id: uuidv4(),
  });
  return circleElement;
};

export const GetLine = (options) => {
  const lineElement = new Line([50, 100, 200, 100], {
    ...options,
    id: uuidv4(),
    padding: 10,
    strokeWidth: 2,
    stroke: "#000",
    name: "Line",
  });
  return lineElement;
};

export const GetIText = (text, options) => {
  const textElement = new IText(text, {
    ...options,
    strokeUniform: true,
    // fill: "red",
    id: uuidv4(),
  });
  return textElement;
};

export const GetSvg = async (svgRawText) => {
  let loadedSVG = await loadSVGFromString(svgRawText);
  let svgElem = util.groupSVGElements(loadedSVG.objects);
  svgElem.set({
    scaleY: 1,
    scaleX: 1,
    originX: "center",
    originY: "center",
    visible: true,
    centeredScaling: true,
    selectable: true,
    // fill: "#ff0055",
  });
  return svgElem;
};

export const loadGoogleFont = (fontName) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      var myfont = new FontFaceObserver(fontName);
      const res = await myfont.load();
      resolve(res);
    } catch (err) {
      console.log("font loading failed ", err);
      reject(err);
    }
  });
};

export const addText = async (canvas, text = "sample Text", options = {}) => {
  if (canvas) {
    const textElement = GetIText(text, options);
    if (options?.fontFamily) {
      try {
        await loadGoogleFont(options?.fontFamily);
      } catch (error) {
        // toast.error(error.message);
        console.log("error loading google font ", error);
        canvas.add(textElement);
      } finally {
        canvas.add(textElement);
      }
    } else {
      canvas.add(textElement);
    }
  }
};

export const addTriangle = (canvas, options) => {
  if (!canvas) return;
  const _options = {
    fill: "#00968845",
    stroke: "#ff0000",
    strokeWidth: 1,
    ...options,
  };
  const triangleElement = GetTriangle(_options);
  canvas.add(triangleElement);
};

export const addRectangle = (canvas, options = {}) => {
  if (!canvas) return;
  const _options = {
    fill: "#00968845",
    stroke: "#ff0000",
    strokeWidth: 1,
    ...options,
  };
  const rectElement = GetRectangle(_options);
  canvas.add(rectElement);
  canvas.setActiveObject(rectElement);
};

export const addCircle = (canvas, options) => {
  if (!canvas) return;
  const _options = {
    fill: "#00968845",
    stroke: "#ff0000",
    strokeWidth: 1,
    ...options,
  };
  const circleElement = GetCircle(_options);
  canvas.add(circleElement);
};

export const addLine = (canvas, options) => {
  if (!canvas) return;
  const lineElement = GetLine(options);
  canvas.add(lineElement);
};

export const addImgFromURL = (canvas, url) => {
  return new Promise((resolve, reject) => {
    if (!canvas) return;
    // const { cover, ...restOptions } = options;
    let img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;
    Spinner.showSpinner();
    img.onload = function () {
      Spinner.hideSpinner();
      let image = new FabricImage(img, {
        id: uuidv4(),
        crossOrigin: "anonymous",
        URL: url,
        isUrlValid: true,
        strokeUniform: true,
      });
      canvas.add(image);
      resolve(image);
    };
    img.onerror = function () {
      // toast.error("error adding image");
      Spinner.hideSpinner();
      // reject("error occured adding image");
    };
  });
};

export const handleRightPanelUpdates = (canvas, action) => {
  switch (action) {
    case ACTIONS.ADD_TEXT:
      addText(canvas);
      break;
    case ACTIONS.ADD_TRIANGLE:
      addTriangle(canvas);
      break;
    case ACTIONS.ADD_RECTANGLE:
      addRectangle(canvas, null);
      break;
    case ACTIONS.ADD_CIRCLE:
      addCircle(canvas);
      break;
    case ACTIONS.ADD_LINE:
      addLine(canvas, ACTIONS.ADD_LINE);
      break;
    default:
      console.log("unhandled-action", action);
      break;
  }
};

const deleteObject = (canvas) => {
  const activeObjects = canvas.getActiveObjects();
  canvas.remove(...activeObjects);
  canvas.discardActiveObject();
  canvas.requestRenderAll();
};

export const keydownListener = (event, canvas) => {
  const key = event.key;
  const activeObject = canvas?.getActiveObject();
  if (!activeObject) return;
  if (key === "Delete") {
    if (activeObject.type === "i-text" && activeObject.isEditing) {
      return;
    }
    deleteObject(canvas);
  }
  //ctrl+z key press
  if (event.keyCode === 90 && event.ctrlKey) {
    canvas?.undo();
  }
  //ctrl+y key press
  if (event.keyCode === 89 && event.ctrlKey) {
    canvas?.redo();
  }
  //ctrl+a keypress
  if (event.keyCode === 65 && event.ctrlKey) {
    console.log("select all here");
  }
  const activeItem = canvas?.getActiveObject();
  if (activeItem) {
    //left key
    if (event.keyCode === 37) {
      activeItem.left -= 1;
      activeItem.setCoords();
      canvas?.requestRenderAll();
    }
    //right key
    if (event.keyCode === 39) {
      activeItem.left += 1;
      activeItem.setCoords();
      canvas?.requestRenderAll();
    }
    //up key
    if (event.keyCode === 38) {
      activeItem.top -= 1;
      activeItem.setCoords();
      canvas?.requestRenderAll();
    }
    //down key
    if (event.keyCode === 40) {
      activeItem.top += 1;
      activeItem.setCoords();
      canvas?.requestRenderAll();
    }
  }
  canvas?.requestRenderAll();
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

export const getBottommostCoord = (elem) => {
  return Math.max(
    elem.aCoords.bl.y,
    elem.aCoords.br.y,
    elem.aCoords.tl.y,
    elem.aCoords.tr.y
  );
};

export const alignElementHorizontally = (
  alignment,
  parentCanvasRef,
  pageWidth
) => {
  console.log(alignment);
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
      // parentCanvasRef._historySaveAction();
    }
  } else if (alignment === "center") {
    // leftmostcoord such that the element falls in center
    const leftmostCoordForCenter = pageWidth / 2 - objectWidth / 2;
    if (leftmost !== leftmostCoordForCenter) {
      element.left += leftmostCoordForCenter - leftmost;
      element.setCoords();
      // parentCanvasRef._historySaveAction();
    }
  } else if (alignment === "right") {
    if (rightmost !== pageWidth) {
      element.left += pageWidth - rightmost;
      element.setCoords();
      // parentCanvasRef._historySaveAction();
    }
  }
  parentCanvasRef.renderAll();
};

export const alignElementVertically = (
  alignment,
  parentCanvasRef,
  pageHeight
) => {
  console.log(alignment);
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
      // parentCanvasRef._historySaveAction();
    }
  } else if (alignment === "middle") {
    // topmostcoord such that the element falls in center
    const topCoordForCenter = (pageHeight - objectHeight) / 2;
    // topmost distance from center coord
    const distance = topCoordForCenter - topmost;
    if (topmost !== topCoordForCenter) {
      element.top += distance;
      element.setCoords();
      // parentCanvasRef._historySaveAction();
    }
  } else if (alignment === "bottom") {
    if (bottommost !== pageHeight) {
      element.top += pageHeight - topmost - objectHeight;
      element.setCoords();
      // parentCanvasRef._historySaveAction();
    }
  }
  parentCanvasRef.renderAll();
};

// convert gradient component value to fabric gradient configuration
export const makeGradient = (config, gradientText, h, w, activeElement) => {
  if (!activeElement) return null;
  const { colorStops, type, angle } = config;
  let coords = {};
  let rad = -parseInt(angle, 10) * (Math.PI / 180);
  if (colorStops.length > 1) {
    switch (type) {
      case "linear":
        coords = {
          x1: (Math.round(50 + Math.sin(rad) * 50) * w) / 100,
          y1: (Math.round(50 + Math.cos(rad) * 50) * h) / 100,
          x2: (Math.round(50 + Math.sin(rad + Math.PI) * 50) * w) / 100,
          y2: (Math.round(50 + Math.cos(rad + Math.PI) * 50) * h) / 100,
        };
        break;
      case "radial":
        coords = {
          r1: 0,
          r2: w,
          x1: w / 2,
          y1: h / 2,
          x2: w / 2,
          y2: h / 2,
        };
        break;
      default:
        break;
    }
  }
  let grad = "";
  if (colorStops.length === 1) {
    //do magic
    activeElement.fillColor = colorStops[0].color;
    activeElement.fillGradient = null;
    grad = colorStops[0].color;
  } else {
    grad = {
      type,
      coords,
      colorStops: colorStops.map((stop) => {
        return {
          color: stop.color,
          offset: stop.offset / 100,
        };
      }),
    };
    activeElement.fillColor = null;
    activeElement.fillGradient = gradientText;
    activeElement.gradient = grad;
  }
  return grad;
};

export const applyColorOrGradient = (
  gradientText,
  rawConfig,
  canvas,
  setCanvasBackgroundGradient,
  setCanvasBackgroundColor
) => {
  if (!canvas) return;
  if (rawConfig) {
    let grad = makeGradient(
      rawConfig,
      gradientText,
      canvas?.height,
      canvas?.width,
      canvas
    );
    if (rawConfig.colorStops.length > 1) {
      canvas.set("backgroundColor", new Gradient(grad));
      setCanvasBackgroundGradient(gradientText);
    } else {
      canvas.set("backgroundColor", grad);
      setCanvasBackgroundColor(grad);
      setCanvasBackgroundGradient(null);
    }
    canvas.renderAll();
  }
};
