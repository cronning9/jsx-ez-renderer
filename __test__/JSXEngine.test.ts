import JSXEngine, { InvalidElementError } from "..";

describe('intrinsic elements', () => {
  test('outputs a single div with no content or properties', () => {
    expect(JSXEngine.run('div', null, null).htmlString).toBe('<div></div>');
  });

  test('outputs an HTML element with a nested HTML element', () => {
    expect(JSXEngine.run(
      'div',
      null,
      JSXEngine.run('canvas', null)
    ).htmlString).toBe(
      '<div><canvas></canvas></div>'
    );
  });

  test('outputs an HTML element with two nested sibling elements', () => {
    expect(JSXEngine.run(
      'div',
      null,
      JSXEngine.run('div', null),
      JSXEngine.run('div', null)
    ).htmlString).toBe(
      '<div><div></div><div></div></div>'
    );
  });

  test('outputs an HTML element, with a nested child, that has a nested child', () => {
    expect(JSXEngine.run(
      'div',
      null,
      JSXEngine.run('div',
        null,
        JSXEngine.run('div', null)
      )
    ).htmlString).toBe(
      '<div><div><div></div></div></div>'
    );
  });

  describe('text content', () => {
    test('outputs text content for a p', () => {
      expect(JSXEngine.run(
        'div',
        null,
        JSXEngine.run('p', null, 'Hello, world!')
      ).htmlString).toBe(
        '<div><p>Hello, world!</p></div>'
      );
    });
  });

  describe('errors', () => {
    test('throws for lowercase element not in IntrinsicElements', () => {
      expect(() => JSXEngine.run('testlol', null))
        .toThrowError(InvalidElementError);
    })
  })
});
