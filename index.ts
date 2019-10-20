import { IntrinsicElements } from './lib/constants/JSX';
import JSXElement, { JSXChildren } from './lib/JSXElement';

export interface IntrinsicElementAttributes {
  [key: string]: string | boolean | number;
}

export interface Component<P> {
  (props: P | undefined): JSXElement
}

type Identifier<P> = string | Component<P>;

/**
 * When reading JSX input, the properly-configured TypeScript compiler
 * will output calls to this function, passing JSX arguments to the proper position.
 * 
 * This function should output a JSXElement that outputs valid and accurate HTML.
 */
function run<P>(
  identifier: Identifier<P>,
  props: IntrinsicElementAttributes | P | null,
  ...children: JSXChildren
): JSXElement {
  if (identifierIsString(identifier) && !IntrinsicElements.includes(identifier)) {
    throw new InvalidElementError(`${identifier} is not a valid JSX element.`);
  }
  return new JSXElement(identifier, props, ...children);
}

function identifierIsString<P>(identifier: Identifier<P>): identifier is string {
  return typeof identifier === 'string';
}

export default {
  run,
}

export class InvalidElementError extends Error { }