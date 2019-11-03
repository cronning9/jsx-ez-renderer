import { IntrinsicElements } from './lib/constants/JSX';
import JSXElement, { JSXChildren } from './lib/JSXElement';

export interface IntrinsicElementAttributes {
  [key: string]: string | boolean | number;
}

export interface Component<P> {
  (props: P): JSXElement<P>
}

type Identifier<P> = string | Component<P>;

/**
 * When reading JSX input, the properly-configured TypeScript compiler
 * will output calls to this function, passing JSX arguments to the proper position.
 * 
 * This function should return a JSXElement that outputs valid and accurate HTML.
 */
function run<P>(
  identifier: Component<P>,
  props: P | null,
  ...children: JSXChildren
): JSXElement<P>;
function run(
  identifier: string,
  props: IntrinsicElementAttributes | null,
  ...children: JSXChildren
): JSXElement<IntrinsicElementAttributes>;
function run<P>(
  identifier: string | Component<P>,
  props: P | IntrinsicElementAttributes | null,
  ...children: JSXChildren
): JSXElement<P | IntrinsicElementAttributes> {
  // check for users who don't use TypeScript
  if (!identifierIsString(identifier) && !identifierIsComponent(identifier)) {
    throw new InvalidElementError(`Identifier ${identifier} must be a string or a function component`);
  }
  if (identifierIsString(identifier)) {
    if (!IntrinsicElements.includes(identifier)) {
      throw new InvalidElementError(`${identifier} is not a valid JSX element.`);
    }

    return new JSXElement(
      identifier,
      props as IntrinsicElementAttributes,
      ...children
    );
  }
  // TODO: figure out how to narrow down down type of props without casting
  const element = identifier(props as P);
  return new JSXElement(element, props as P, ...children);
}

function identifierIsString<P>(identifier: string | Component<P>): identifier is string {
  return typeof identifier === 'string';
}

function identifierIsComponent<P>(identifier: string | Component<P>): identifier is Component<P> {
  const argsAreCorrect = (id: Component<P>) => id.arguments.length === 1 || id.arguments.length === 0;
  if (typeof identifier !== 'function' || !argsAreCorrect(identifier)) {
    return false;
  }

  return true;
}

export default {
  run,
}

export class InvalidElementError extends Error { }