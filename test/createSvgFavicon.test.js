const assert = require('assert');

const faviatorIconConfig = require('../faviatorIconConfig');
const createSvgFavicon = require('../createSvgFavicon');

const assertFavicon = (svg) => {
  svg = svg.replace(/(\r|\n)/g, '');
  return {
    size(size) {
      assert.equal(svg.match(/<svg [^>]*?height="([^"]*)"/i)[1], String(size));
      assert.equal(svg.match(/<svg [^>]*?width="([^"]*)"/i)[1], String(size));
      return this;
    },

    text(text) {
      assert.equal(svg.match(new RegExp(`<text.*?>([^<]*)</text>`, 'i'))[1], String(text));
      assert.equal(svg.match(new RegExp(`<text [^>]*?text-anchor="([^"]*)"`, 'i'))[1], 'middle');
      assert.equal(svg.match(new RegExp(`<text [^>]*?dominant-baseline="([^"]*)"`, 'i'))[1], 'central');
      return this;
    },

    dx(dx) {
      assert.equal(svg.match(new RegExp(`<text [^>]*?dx="([^"]*)"`, 'i'))[1], String(dx));
      return this;
    },

    dy(dy) {
      assert.equal(svg.match(new RegExp(`<text [^>]*?dy="([^"]*)"`, 'i'))[1], String(dy));
      return this;
    },

    fontSize(fontSize) {
      assert.equal(svg.match(new RegExp(`<text [^>]*?font-size="([^"]*)"`, 'i'))[1], String(fontSize));
      return this;
    },

    fontFamily(fontFamily) {
      assert.equal(svg.match(new RegExp(`<text [^>]*?font-family="([^"]*)"`, 'i'))[1], String(fontFamily));
      return this;
    },

    fontColor(fontColor) {
      assert.equal(svg.match(new RegExp(`<text [^>]*?fill="([^"]*)"`, 'i'))[1], String(fontColor));
      return this;
    },

    backgroundColor(backgroundColor) {
      assert.equal(svg.match(new RegExp(`<rect [^>]*?fill="([^"]*)"`, 'i'))[1], String(backgroundColor));
      return this;
    },

    borderRadius(borderRadius) {
      this.rx(borderRadius);
      this.ry(borderRadius);
      return this;
    },

    borderColor(borderColor) {
      assert.equal(svg.match(new RegExp(`<rect [^>]*?stroke="([^"]*)"`, 'i'))[1], String(borderColor));
      return this;
    },

    borderWidth(borderWidth) {
      assert.equal(svg.match(new RegExp(`<rect [^>]*?stroke-width="([^"]*)"`, 'i'))[1], String(borderWidth));
      return this;
    },

    rx(rx) {
      assert.equal(svg.match(new RegExp(`<rect [^>]*?rx="([^"]*)"`, 'i'))[1], String(rx));
      return this;
    },

    ry(ry) {
      assert.equal(svg.match(new RegExp(`<rect [^>]*?ry="([^"]*)"`, 'i'))[1], String(ry));
      return this;
    },

    x(x) {
      assert.equal(svg.match(new RegExp(`<text [^>]*?x="([^"]*)"`, 'i'))[1], String(x));
      return this;
    },

    y(y) {
      assert.equal(svg.match(new RegExp(`<text [^>]*?y="([^"]*)"`, 'i'))[1], String(y));
      return this;
    },
  };
};

describe('createSvgFavicon', function() {
  it('should export default as well for es6', function() {
    assert.equal(createSvgFavicon.default, createSvgFavicon);
  });

  it('should generate the doctype tag', function() {
    assert((/<!doctype svg/i).test(createSvgFavicon()));
  });

  it('should generate the faviatorIconConfig properly', function() {
    const svg = createSvgFavicon(faviatorIconConfig);
    const assertThisFavicon = assertFavicon(svg);
    for (let [k, v] of Object.entries(faviatorIconConfig)) {
      assertThisFavicon[k](v);
    }
  });

  it('should generate a svg tag with width and height as specified in config.size', function() {
    const svg = createSvgFavicon({ size: 100 });
    assertFavicon(svg).size(100);
  });

  it('should generate a rect tag with rx, ry, fill', function() {
    const rx = '50%';
    const ry = '50%';
    const backgroundColor = '#03f53a';
    const svg = createSvgFavicon({
      rx,
      ry,
      backgroundColor,
    });
    assertFavicon(svg)
      .rx(rx)
      .ry(ry)
      .backgroundColor(backgroundColor);
  });

  it('should generate a rect tag with rx, ry with value borderRadius', function() {
    const borderRadius = '50%';
    const svg = createSvgFavicon({
      borderRadius,
    });
    assertFavicon(svg).borderRadius(borderRadius);
  });

  it('should generate a text tag with content text, fill, font-family, font-size', function() {
    const text = 'love';
    const fontColor = 'red';
    const fontFamily = 'Open Sans';
    const fontSize = 65;
    const svg = createSvgFavicon({
      text,
      fontColor,
      fontFamily,
      fontSize,
    });
    assertFavicon(svg)
      .text(text)
      .fontColor(fontColor)
      .fontFamily(fontFamily)
      .fontSize(fontSize);
  });

  it('should generate a text tag with at center', function() {
    assertFavicon(createSvgFavicon()).x(50).y(50);
  });
});
