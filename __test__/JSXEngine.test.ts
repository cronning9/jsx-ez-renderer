import JSXEngine from "..";

test('outputs a single div with no content or properties', () => {
  expect(JSXEngine.run('div', null, null).htmlString).toBe('<div></div>');
});

// TODO: make this pass
test('outputs an HTML element with a nested HTML element', () => {
  expect(JSXEngine.run('div', null, JSXEngine.run('canvas', null))).toBe(
    '<div>\n' +
    '  <canvas></canvas>\n' +
    '</div>'

  );
})