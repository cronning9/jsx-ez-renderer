import { IntrinsicElements } from '../lib/constants/JSX';
import DeprecatedElement, { ElementChildren } from './DeprecatedElement';
import { JSX } from '../lib/types';

type Component = () => DeprecatedElement<{}>;
type Identifier = string | Component;

// function run(
//   // TODO: refactor to an enum or keyof interface with all possible tag names
//   identifier: string,
//   props?: {} | null,
//   ...children: ElementChildren
// );

// TODO: check if both props.children and children are there -- only allow one or the other
// The props param should be highlighted as the error.
function run<P extends {}>(
  identifier: string | JSX.FC<P>,
  props?: P | null,
  ...children: ElementChildren
): DeprecatedElement<P> {
  if (idIsString(identifier)) {
    if (!IntrinsicElements.includes(identifier)) {
      throw new InvalidElementError(`${identifier} is not a valid element.`);
    }

    return new DeprecatedElement<P>(identifier, props, ...children);
  }

  const component = props ? identifier(props) : identifier();
  return new DeprecatedElement(component, props, ...children);
}

function idIsString<P>(identifier: string | JSX.FC<P>): identifier is string {
  return typeof identifier === 'string';
}

export function idIsComponent<P>(identifier: string | JSX.FC<P>): identifier is JSX.FC<P> {
  if (typeof identifier === 'function') {
    return true;
  }

  return false;
}

export default {
  run,
}

export class InvalidElementError extends Error { }
