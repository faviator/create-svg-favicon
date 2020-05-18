export type CreateSvgFaviconConfig = {
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: number | string;
  borderWidth?: number;
  dx?: number;
  dy?: number;
  fontColor?: string;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: string;
  rx?: number | string;
  ry?: number | string;
  size?: number;
  text?: string;
};

const createSvgFavicon = ({
  backgroundColor = '',
  borderColor = '',
  borderRadius = 0,
  borderWidth = 0,
  dx = 0,
  dy = 0,
  fontColor = '',
  fontFamily = '',
  fontSize = 0,
  fontWeight = '',
  rx = 0,
  ry = 0,
  size = 16,
  text = '',
}: CreateSvgFaviconConfig = {}) => `<?xml version="1.0" standalone="no"?>
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
      <defs>
        <style type="text/css">
          @import url('https://fonts.googleapis.com/css?family=${fontFamily.replace(/ /g, '+')}${
  fontWeight && ':' + fontWeight
}');
        </style>
      </defs>

    <rect
      data-name="BackgroundRect"
      x="${borderWidth / 2}"
      y="${borderWidth / 2}"
      rx="${borderRadius || rx}"
      ry="${borderRadius || ry}"
      width="${100 - borderWidth}"
      height="${100 - borderWidth}"
      fill="${backgroundColor}"></rect>

    <text
      data-name="Text"
      x="50"
      y="50"
      dx="${dx}"
      dy="${dy}"
      fill="${fontColor}"
      font-size="${fontSize}"
      font-family="${fontFamily}"
      font-weight="${fontWeight}"
      text-anchor="middle"
      dominant-baseline="central">${text}</text>

    <rect
      data-name="BorderRect"
      x="${borderWidth / 2}"
      y="${borderWidth / 2}"
      rx="${borderRadius || rx}"
      ry="${borderRadius || ry}"
      width="${100 - borderWidth}"
      height="${100 - borderWidth}"
      fill-opacity="0"
      stroke="${borderColor}"
      stroke-width="${borderWidth}"></rect>
    </svg>`;

export default createSvgFavicon;
