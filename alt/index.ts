import { IntrinsicElements } from '../lib/constants/JSX';
import Element, { IElement, ElementChildren } from './Element';

function run(
  identifier: string,
  props: null,
  ...children: ElementChildren<{}>
): IElement<{}> {

  if (!IntrinsicElements.includes(identifier)) {
    throw new InvalidElementError(`${identifier} is not a valid element.`);
  }

  return new Element(identifier, props, ...children);
}

export default {
  run,
}

export class InvalidElementError extends Error { }
