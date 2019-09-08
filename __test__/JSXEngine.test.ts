import JSXEngine from "..";

test('outputs a single div with no content or properties', () => {
  expect(JSXEngine.run('div', null, null)).toBe('<div></div>');
});
