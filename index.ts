import { IntrinsicElements } from './lib/constants/JSX';
import JSXElement, { JSXChildren } from './lib/JSXElement';

export interface RunProps {
  [key: string]: string | boolean | number;
}

interface JSXFactoryRun {
  (type: string, props: RunProps | null, ...children: JSXChildren): JSXElement;
}

/**
 * When reading JSX input, the properly-configured TypeScript compiler
 * will output calls to this function, passing JSX arguments to the proper position.
 * 
 * This function should output a JSXElement that outputs valid and accurate HTML.
 */
const run: JSXFactoryRun = (identifier: string, props: RunProps | null, ...children: JSXChildren): JSXElement => {
  if (!IntrinsicElements.includes(identifier)) {
    throw new InvalidElementError(`${identifier} is not a valid JSX element.`);
  }

  return new JSXElement(identifier, props, ...children);
}

export default {
  run,
}

export class InvalidElementError extends Error { }