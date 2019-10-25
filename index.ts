import { IntrinsicElements } from './lib/constants/JSX';
import JSXElement, { JSXChildren } from './lib/JSXElement';

export interface IntrinsicElementAttributes {
  [key: string]: string | boolean | number;
}

export interface ComponentProps {
  [key: string]: unknown
}

export interface Component<P> {
  (props?: P | null): JSXElement
}

type Identifier = string | /*JSXElement |*/ Component<ComponentProps>;

/**
 * When reading JSX input, the properly-configured TypeScript compiler
 * will output calls to this function, passing JSX arguments to the proper position.
 * 
 * This function should output a JSXElement that outputs valid and accurate HTML.
 */
function run<P extends ComponentProps>(
  identifier: Identifier,
  props: IntrinsicElementAttributes | P | null,
  ...children: JSXChildren
): JSXElement {
  if (identifierIsString(identifier) && !IntrinsicElements.includes(identifier)) {
    throw new InvalidElementError(`${identifier} is not a valid JSX element.`);
  }

  if (identifierIsComponent(identifier)) {
    const element = identifier(props);
    return new JSXElement(element, props, ...children);
  }

  return new JSXElement(identifier, props, ...children);
}

function identifierIsString(identifier: Identifier): identifier is string {
  return typeof identifier === 'string';
}

// function identifierIsJSXElement(identifier: Identifier): identifier is JSXElement {
//   return identifier instanceof JSXElement;
// }

function identifierIsComponent(identifier: Identifier): identifier is Component<ComponentProps> {
  const argsAreCorrect = (id: Component<ComponentProps>) => id.arguments.length === 1 || id.arguments.length === 0;
  if (!(typeof identifier === 'function') || !argsAreCorrect(identifier)) {
    return false;
  }

  return true;
}

interface TestProps extends ComponentProps {
  one: string,
  two: number
}

export default {
  run,
}

export class InvalidElementError extends Error { }