import JSXEngine, { InvalidElementError } from "../alt";

describe('intrinsic elements', () => {
  test('outputs a single div with no content or properties', () => {
    expect(JSXEngine.run('div', null).htmlString).toBe('<div></div>');
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

    test('outputs text content next to some sibling', () => {
      expect(JSXEngine.run(
        'div',
        null,
        'Hello, world!',
        JSXEngine.run('div', null)
      ).htmlString).toBe(
        '<div>Hello, world!<div></div></div>'
      );
    });

    test('outputs two text siblings with an element in between', () => {
      expect(JSXEngine.run(
        'div',
        null,
        'Hello, world!',
        JSXEngine.run('div', null),
        'Goodbye, world!'
      ).htmlString).toBe(
        '<div>Hello, world!<div></div>Goodbye, world!</div>'
      );
    });

    test('properly outputs the result of expressions', () => {
      const int = 2;
      expect(JSXEngine.run(
        'div',
        null,
        int * 2
      ).htmlString).toBe(
        '<div>4</div>'
      )
    })
  });

  describe('errors', () => {
    test('throws for lowercase element not in IntrinsicElements', () => {
      expect(() => JSXEngine.run('testlol', null))
        .toThrowError(InvalidElementError);
    })
  })
});

// describe('function component identifiers', () => {
//   test('correctly prints single elements with no children', () => {
//     const Div = () => JSXEngine.run("div", null);
//     expect(JSXEngine.run(Div, null).htmlString).toBe('<div></div>');
//   });

//   test('correctly prints single element with props', () => {
//     type Props = { text: string };
//     const DivWithText = ({ text }: Props) => {
//       return JSXEngine.run('div', null,
//         JSXEngine.run('p', null, text));
//     }
//     expect(JSXEngine.run(DivWithText, { text: 'test' })).toBe('<div><p>test</p></div>');
//   })
// });
