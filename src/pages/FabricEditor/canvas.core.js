import { fabric } from "fabric";
import { INITIAL_PATH, svg } from "./Constants/designer-constants";
import {
  getNewID,
  addPattern,
  loadGoogleFont,
  scaleElementTofitCanvas,
} from "./helper-functions";
import { Spinner } from "@/components/ui/custom/spinner";

class CanvasCore {
  constructor() {
    // ref to fabric canvas element
    this._canvas = null;
  }

  resolveImageURL(imgURL, imgWidth, imgHeight) {
    return new Promise((resolve) => {
      fabric.Image.fromURL(imgURL, function (img, isError) {
        if (isError) resolve(null);
        img.set({
          width: imgWidth,
          height: imgHeight,
          left: 0,
          top: 0,
          originX: "left",
          originY: "top",
        });
        resolve(img);
      });
    });
  }

  createCanvas(cid, cProps) {
    // Make a New Canvas
    this._canvas = new fabric.Canvas(`canvas-${cid}`, {
      // Indicates whether objects should remain in current stack position when selected.
      // When false objects are brought to top and rendered as part of the selection group
      ...cProps,
      preserveObjectStacking: true,
      backgroundColor: "#ffffff",
    });
    return this._canvas;
  }

  async _init(config) {
    const { canvasId, backgroundImage, ...canvasProps } = config;
    const _canvasProps = {
      ...canvasProps,
    };
    // NOTE: if we use backgroundImage prop directly while creating the canvas, 'fabric-history' throws error
    if (backgroundImage) {
      _canvasProps["backgroundImage"] = await this.resolveImageURL(
        backgroundImage,
        canvasProps?.width,
        canvasProps?.height
      );
    }
    // finally create the canvas
    const _canvas = this.createCanvas(canvasId, _canvasProps);
    return _canvas;
  }

  getRef() {
    return this._canvas;
  }

  getJSON() {
    return JSON.stringify(this._canvas);
  }

  async addText(text, options) {
    fabric.charWidthsCache = {};
    if (!this._canvas) return;
    const textElement = new fabric.IText(text, {
      ...options,
      strokeUniform: true,
      id: getNewID(),
    });
    if (!options?.fontFamily) return textElement;
    // try to load google font
    try {
      Spinner.showSpinner(`Loading Font: ${options?.fontFamily}`);
      await loadGoogleFont(options?.fontFamily);
    } catch (error) {
      console.log("error loading google font ", error);
      Spinner.hideSpinner();
    } finally {
      this._canvas.add(textElement);
      if (options.preselected) {
        textElement.preselected = options.preselected;
      }
      Spinner.hideSpinner();
    }
    return textElement;
  }

  addTriangle(options) {
    if (!this._canvas) return;
    const triangleElement = new fabric.Triangle({
      ...options,
      strokeUniform: true,
      id: getNewID(),
    });
    this._canvas.add(triangleElement);
    return triangleElement;
  }

  makeQuadGroup(ObjectsArray) {
    if (!this._canvas) return;
    const group = new fabric.Group(ObjectsArray);
    group.name = "QuadraticArrow";
    group.setControlsVisibility({
      tl: false,
      tr: false,
      br: false,
      bl: false,
      ml: false,
      mt: false,
      mr: false,
      mb: false,
      mtr: false,
    });
    group.name = "QuadraticArrow";
    return group;
  }

  makeEndTriangle(options, left, top, line1, line2, line3) {
    if (!this._canvas) return;
    const triangle = new fabric.Triangle({
      id: getNewID(),
      left: left,
      top: top,
      strokeUniform: true,
      ...options,
    });
    triangle.line1 = line1;
    triangle.line2 = line2;
    triangle.line3 = line3;
    triangle.angle = this.getAngle(line1, line3);
    return triangle;
  }

  getAngle(line1, line3) {
    let x1, y1, x2, y2;
    if (line1) {
      // If line1 is provided (for left arrow)
      x1 = line1.path[0][1]; // Get the x-coordinate of the start point
      y1 = line1.path[0][2]; // Get the y-coordinate of the start point
      x2 = line1.path[1][1]; // Get the x-coordinate of the control point
      y2 = line1.path[1][2]; // Get the y-coordinate of the control point
    } else if (line3) {
      // If line3 is provided (for right arrow)
      x1 = line3.path[1][3]; // Get the x-coordinate of the control point
      y1 = line3.path[1][4]; // Get the y-coordinate of the control point
      x2 = line3.path[1][1]; // Get the x-coordinate of the end point
      y2 = line3.path[1][2]; // Get the y-coordinate of the end point
    } else {
      return 0; // Return 0 if no line is provided
    }
    // Calculate the angle in radians
    const angleRadians = Math.atan2(y2 - y1, x2 - x1);
    // Convert the angle from radians to degrees
    const angleDegrees = fabric.util.radiansToDegrees(angleRadians);
    // Adjust the angle by subtracting 90 degrees
    return angleDegrees - 90;
  }

  createArrow(idType, groupArray) {
    const groupObject = new fabric.Group(groupArray, {
      id: `${idType}` + getNewID(),
      name: `${idType}` + getNewID(),
      customType: "arrow",
    });
    this._canvas.add(groupObject);
    groupArray.forEach((e) => {
      this.removeElement(e);
    });
    this._canvas.setActiveObject(groupObject);
    return groupObject;
  }

  removeElement(element) {
    this._canvas.remove(element);
  }

  addCircle(options) {
    if (!this._canvas) return;
    const circleElement = new fabric.Circle({
      ...options,
      strokeUniform: true,
      id: getNewID(),
    });
    this._canvas.add(circleElement);
    return circleElement;
  }

  drawQuadratic(options) {
    if (!this._canvas) return;
    const curve = new fabric.Path(
      `M ${INITIAL_PATH.p0}, Q ${INITIAL_PATH.p1} ${INITIAL_PATH.p2}`,
      {
        ...options,
      }
    );
    return curve;
  }

  makeControlPoint(options, left, top) {
    if (!this._canvas) return;
    const points = new fabric.Path(svg, {
      left: left,
      top: top,
      ...options,
    });
    return points;
  }

  addLine(options) {
    if (!this._canvas) return;
    const lineElement = new fabric.Line(options.points, {
      ...options,
      id: getNewID(),
    });
    this._canvas.add(lineElement);
    return lineElement;
  }

  addImgFromURL(url, options) {
    console.log("era");
    return new Promise((resolve) => {
      console.log("era");

      if (!this._canvas) return;
      const { ...restOptions } = options;
      let canvas = this._canvas;
      let img = new Image();
      let imageFit = options?.imageFit;
      img.crossOrigin = "anonymous";
      img.src = url;
      Spinner.showSpinner("Loading Image");
      console.log("anonymous");
      img.onload = function () {
        Spinner.hideSpinner();
        let image = new fabric.Image(img, {
          ...restOptions,
          id: options?.id ? options.id : getNewID(),
          crossOrigin: "anonymous",
          URL: url,
          isUrlValid: true,
          strokeUniform: true,
        });
        console.log(image);
        if (imageFit) {
          scaleElementTofitCanvas(imageFit, canvas.height, canvas.width, image);
        }
        canvas.add(image);
        if (restOptions.sendtoback) {
          image.sendToBack();
        }
        if (options.preselected) {
          image.preselected = options.preselected;
        }
        resolve(image);
      };
    });
  }

  addImgAsPatternFromURL(url, options) {
    return new Promise((resolve) => {
      if (!this._canvas) return;
      const { ...restOptions } = options;
      let canvas = this._canvas;
      let containerElem = null;
      if (restOptions?.containerType === "circle") {
        containerElem = new fabric.Circle({
          radius: restOptions?.height / 2,
          name: restOptions?.name,
          stopContainerResize: restOptions?.stopContainerResize,
          imageFit: restOptions?.imageFit,
          id: getNewID(),
          BorderLock: true,
          fill: "rgba(0 0 0 0)",
          left: restOptions.left
            ? restOptions.left
            : (canvas.width - restOptions?.width) / 2,
          top: restOptions.top
            ? restOptions.top
            : (canvas.height - restOptions?.height) / 2,
          stroke: "#000",
          strokeWidth: 0,
          strokeUniform: true,
          URL: url,
        });
      } else if (restOptions?.containerType === "triangle") {
        containerElem = new fabric.Triangle({
          height: restOptions?.height,
          width: restOptions?.width,
          name: restOptions?.name,
          stopContainerResize: restOptions?.stopContainerResize,
          imageFit: restOptions?.imageFit,
          id: getNewID(),
          BorderLock: true,
          fill: "rgba(0 0 0 0)",
          backgroundColor: "rgba(255,255,255,0)",
          left: restOptions.left
            ? restOptions.left
            : (canvas.width - restOptions?.width) / 2,
          top: restOptions.top
            ? restOptions.top
            : (canvas.height - restOptions?.height) / 2,
          stroke: "#000",
          strokeWidth: 0,
          strokeUniform: true,
          URL: url,
        });
      } else {
        containerElem = new fabric.Rect({
          height: restOptions?.height,
          width: restOptions?.width,
          name: restOptions?.name,
          stopContainerResize: restOptions?.stopContainerResize,
          imageFit: restOptions?.imageFit,
          rx: 0,
          ry: 0,
          id: getNewID(),
          BorderLock: true,
          fill: "rgba(0 0 0 0)",
          left: restOptions.left ? restOptions.left : 0,
          top: restOptions.top ? restOptions.top : 0,
          stroke: "#000",
          strokeWidth: 0,
          strokeUniform: true,
          URL: url,
        });
      }
      canvas.add(containerElem);
      canvas.setActiveObject(containerElem);
      if (restOptions.sendtoback) {
        containerElem.sendToBack();
      }
      addPattern(url, canvas, () => {
        setTimeout(() => {
          canvas.requestRenderAll();
        }, 100);
        if (options.preselected) {
          containerElem.preselected = options.preselected;
        }
        resolve(containerElem);
      });
    });
  }

  addRect(options, position) {
    if (!this._canvas) return;
    const _rect = new fabric.Rect({
      ...options,
      strokeUniform: true,
      id: getNewID(),
    });
    if (position) {
      _rect.top = position.top / 2 + 70;
      _rect.left = position.left / 2 - 70;
    }
    this._canvas.add(_rect);
    this._canvas.bringToFront(_rect);
    return _rect;
  }

  addSpeechRect(options) {
    if (!this._canvas) return;
    const _rect = new fabric.Rect({
      ...options,
      strokeUniform: true,
      id: getNewID(),
    });
    return _rect;
  }

  async addTextBox(text, options) {
    if (!this._canvas) return;
    if (options?.fontFamily) {
      await loadGoogleFont(options?.fontFamily);
    }
    const textbox = new fabric.Textbox(text, {
      ...options,
      strokeUniform: true,
      id: getNewID(),
    });
    return textbox;
  }

  addPolygon(points, options) {
    if (!this._canvas) return;
    const polyElement = new fabric.Polygon(points, {
      ...options,
      strokeUniform: true,
      id: getNewID(),
    });
    return polyElement;
  }

  addSVGFromURL(url, options) {
    const promise = new Promise((resolve, reject) => {
      if (!this._canvas) reject();
      let canvas = this._canvas;
      let imageFit = options?.imageFit;
      const { ...restOptions } = options;
      fabric.loadSVGFromURL(url, (objects, svgOptions) => {
        const svg = fabric.util.groupSVGElements(objects, {
          id: getNewID(),
          ...svgOptions,
          ...restOptions,
          type: "group",
        });
        if (imageFit) {
          scaleElementTofitCanvas(imageFit, canvas.height, canvas.width, svg);
        }
        this._canvas.add(svg);
        resolve(svg);
      });
    });
    return promise;
  }
}

export default CanvasCore;
