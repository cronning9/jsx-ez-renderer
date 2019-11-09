import { IntrinsicElements } from '../lib/constants/JSX';
import Element, { IElement, ElementChildren } from './Element';

type Component = () => Element<{}>;
type Identifier = string | Component;

function run<P extends {}>(
  identifier: string | Component,
  props: P | null,
  ...children: ElementChildren
): IElement<P> {
  if (idIsString(identifier)) {
    if (!IntrinsicElements.includes(identifier)) {
      throw new InvalidElementError(`${identifier} is not a valid element.`);
    }

    return new Element<P>(identifier, props, ...children);
  }

  throw new Error('Components are not currently supported. WIP.')
  // return new Element(identifier, props, ...children);
}

function idIsString(identifier: Identifier): identifier is string {
  return typeof identifier === 'string';
}

export function idIsComponent(identifier: Identifier): identifier is Component {
  if (typeof identifier === 'function') {
    return true;
  }

  return false;
}

export default {
  run,
}

export class InvalidElementError extends Error { }
