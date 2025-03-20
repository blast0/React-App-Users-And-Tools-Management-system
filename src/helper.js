export const isImageUrlValid = (url) => {
  const img = new Image();
  img.src = url;
  return new Promise((resolve) => {
    img.onerror = () => resolve(false);
    img.onload = () => resolve(true);
  });
};

/**
 * create color text from react-color CustomPicker value
 * @param {string|object} color color value supplied by react-color CustomPicker
 * @returns
 */
export function createColorText(color) {
  let _color;
  const isStr = typeof color === "string" ? true : false;
  if (isStr) {
    _color = color;
  } else if (typeof color === "object") {
    // we will use rgb from color object only if, alpha is used
    if (color.rgb.a === 1) {
      //  no alpha used, used hex value instead
      _color = color.hex;
    } else {
      // alpha is present
      // create rgba text
      _color = "rgba(" + Object.values(color.rgb).join(",") + ")";
    }
  }
  return _color;
}
