import { extractField, extractChildren } from '../util/extractField';

describe('utility functions', () => {
  test('extractField', () => {
    type Children = [string, number, { [key: string]: symbol }];
    const props = {
      one: 'test',
      two: 42,
      children: ['fish', 1, { banana: Symbol('32') }]
    };

    const [p, children] = extractField(props, 'children');
    expect(p).toEqual({ one: 'test', two: 42 });
    expect(children).toEqual(props.children);
  });

  test('extractChildren', () => {
    const props = {
      one: 'test',
      two: 4,
      children: ['one', 'two']
    };

    const [p, children] = extractChildren(props);
    expect(p).toEqual({ one: 'test', two: 4 });
    expect(children).toEqual(props.children);
  });
});
