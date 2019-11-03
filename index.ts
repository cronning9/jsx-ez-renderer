import { IntrinsicElements } from './lib/constants/JSX';
import JSXElement, { JSXChildren } from './lib/JSXElement';

export interface IntrinsicElementAttributes {
  [key: string]: string | boolean | number;
  // banana: string;
}

export interface Component<P = undefined> {
  (props: P): JSXElement
}

type Identifier = string | Component<unknown>;

/**
 * When reading JSX input, the properly-configured TypeScript compiler
 * will output calls to this function, passing JSX arguments to the proper position.
 * 
 * This function should return a JSXElement that outputs valid and accurate HTML.
 */
function run<P extends object>(
  identifier: Component<P>,
  props: P | null,
  ...children: JSXChildren
): JSXElement;
function run(
  identifier: string,
  props: IntrinsicElementAttributes | null,
  ...children: JSXChildren
): JSXElement;
function run<P = undefined>(
  identifier: Identifier,
  props: P | IntrinsicElementAttributes | null,
  ...children: JSXChildren
): JSXElement {
  if (identifierIsString(identifier) && !IntrinsicElements.includes(identifier)) {
    throw new InvalidElementError(`${identifier} is not a valid JSX element.`);
  }

  if (identifierIsComponent<P>(identifier)) {
    const element = identifier(props);
    return new JSXElement(element, props, ...children);
  }

  return new JSXElement(identifier, props, ...children);
}

function identifierIsString(identifier: Identifier): identifier is string {
  return typeof identifier === 'string';
}

function identifierIsComponent<P>(identifier: string | Component<P>): identifier is Component<P> {
  const argsAreCorrect = (id: Component<P>) => id.arguments.length === 1 || id.arguments.length === 0;
  if (!(typeof identifier === 'function') || !argsAreCorrect(identifier)) {
    return false;
  }

  return true;
}

export default {
  run,
}

export class InvalidElementError extends Error { }