export function convertGradientToConfig(str) {
  const regex = /(?<color>rgba\([0-9,\. ]+\)|#[\d\w]+)\s*(?<offset>[0-9]*)%?/gi;
  let angleStartPosition = str?.indexOf("(") ? str.indexOf("(") : -1;
  let angleEndPosition = str?.indexOf("deg") ? str.indexOf("deg") : -1;
  let angleText = "";
  let gradientType = "linear";
  if (str?.includes("radial") && !str?.includes("linear"))
    gradientType = "radial";
  if (angleEndPosition !== -1 && angleStartPosition !== -1) {
    for (let i = angleStartPosition + 1; i < angleEndPosition; i++) {
      angleText += str[i];
    }
    if (angleText !== "") {
      angleText = parseInt(angleText);
    }
  }
  let colors = [];
  let colorStops = [];
  let hasNext = true;
  while (hasNext) {
    const val = regex.exec(str);
    if (val) {
      colors.push(val);
    } else {
      hasNext = false;
    }
  }
  for (let i = 0; i < colors.length; i++) {
    colorStops.push({
      color: colors[i].groups.color,
      offset: colors[i].groups?.offset
        ? colors[i].groups.offset
        : parseInt(((i + 1) * 100) / colors.length),
    });
  }
  if (colors.length === 1) {
    colorStops = [
      {
        color: str,
        offset: 100,
      },
    ];
  } else if (colorStops.length < 2)
    colorStops = [
      {
        color: "rgba(252, 165, 241, 1)",
        offset: 10,
      },
      {
        color: "rgba(181, 255, 255, 1)",
        offset: 70,
      },
    ];
  let angleValue = parseInt(angleText);
  let config = {
    colorStops: colorStops,
    type: gradientType,
    angle: isNaN(angleValue) ? 45 : angleValue,
  };
  return config;
}

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
