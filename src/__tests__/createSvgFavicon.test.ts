import createSvgFavicon from '../createSvgFavicon';

describe('createSvgFavicon', function () {
  it('should generate the doctype tag', function () {
    expect(/<!doctype svg/i.test(createSvgFavicon())).toBe(true);
  });

  it('should generate a svg tag with width and height as specified in config.size', function () {
    const { svg } = faviconSvgToDoms(createSvgFavicon({ size: 100 }));
    expect(svg.getAttribute('width')).toBe('100');
  });

  it('should generate a rect tag with rx, ry, fill', function () {
    const { backgroundRect, borderRect } = faviconSvgToDoms(
      createSvgFavicon({ rx: '50%', ry: '30%', backgroundColor: '#03f53a' }),
    );

    expect(backgroundRect.getAttribute('rx')).toBe('50%');
    expect(backgroundRect.getAttribute('ry')).toBe('30%');
    expect(backgroundRect.getAttribute('fill')).toBe('#03f53a');

    expect(borderRect.getAttribute('rx')).toBe('50%');
    expect(borderRect.getAttribute('ry')).toBe('30%');
    expect(borderRect.getAttribute('fill')).toBeFalsy();
  });

  it('should generate a rect tag with rx, ry with value borderRadius', function () {
    const { backgroundRect, borderRect } = faviconSvgToDoms(
      createSvgFavicon({ borderRadius: '50%' }),
    );

    expect(backgroundRect.getAttribute('rx')).toBe('50%');
    expect(backgroundRect.getAttribute('ry')).toBe('50%');
  });

  it('should generate a text tag with content text, fill, font-family, font-size, font-weight', function () {
    const { text } = faviconSvgToDoms(
      createSvgFavicon({
        text: 'love',
        fontColor: 'red',
        fontFamily: 'Open Sans',
        fontSize: 65,
        fontWeight: '700',
      }),
    );

    expect(text.innerHTML).toBe('love');
    expect(text.getAttribute('fill')).toBe('red');
    expect(text.getAttribute('font-family')).toBe('Open Sans');
    expect(text.getAttribute('font-size')).toBe('65');
    expect(text.getAttribute('font-weight')).toBe('700');
  });

  it('should generate a text tag with at center', function () {
    const { text } = faviconSvgToDoms(createSvgFavicon());

    expect(text.getAttribute('x')).toBe('50');
    expect(text.getAttribute('y')).toBe('50');
  });
});

function faviconSvgToDoms(
  svgString: string,
): {
  svg: SVGSVGElement;
  backgroundRect: SVGRectElement;
  borderRect: SVGRectElement;
  text: SVGTextElement;
} {
  const div = document.createElement('div');
  div.innerHTML = svgString;

  const svg = div.querySelector('svg');
  if (svg === null) throw new Error('no svg found');

  const backgroundRect = svg.querySelector<SVGRectElement>('[data-name=BackgroundRect]');
  if (backgroundRect === null) throw new Error('cannot find background rect');

  const text = svg.querySelector<SVGTextElement>('[data-name=Text]');
  if (text === null) throw new Error('cannot find text');

  const borderRect = svg.querySelector<SVGRectElement>('[data-name=BorderRect]');
  if (borderRect === null) throw new Error('cannot find border rect');

  return {
    svg,
    backgroundRect,
    text,
    borderRect,
  };
}
