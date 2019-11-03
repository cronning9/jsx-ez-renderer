import { IntrinsicElements } from './lib/constants/JSX';
import JSXElement, { JSXChildren } from './lib/JSXElement';

export interface IntrinsicElementAttributes {
  [key: string]: string | boolean | number;
}

export interface Component<P = any> {
  (props: P): JSXElement<P>
}

type Identifier = string | Component;

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
): JSXElement<P>;
function run(
  identifier: string,
  props: IntrinsicElementAttributes | null,
  ...children: JSXChildren
): JSXElement<IntrinsicElementAttributes>;
function run<P>(
  identifier: Identifier,
  props: P | IntrinsicElementAttributes | null,
  ...children: JSXChildren
): JSXElement<P | IntrinsicElementAttributes> {
  // check for users who don't use TypeScript
  if (!identifierIsString(identifier) && !identifierIsComponent(identifier)) {
    throw new InvalidElementError(`Identifier ${identifier} must be a string or a function component`);
  }
  if (identifierIsString(identifier) && !IntrinsicElements.includes(identifier)) {
    throw new InvalidElementError(`${identifier} is not a valid JSX element.`);
  }
  if (identifierIsComponent<P>(identifier)) {
    // TODO: figure out hwo to narrow down to P or IntrinsiceElementAttributes without casting
    const element = identifier(props as P);
    return new JSXElement(element, props as P, ...children);
  }

  return new JSXElement(
    identifier as string,
    props as IntrinsicElementAttributes,
    ...children
  );
}

function identifierIsString(identifier: Identifier): identifier is string {
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