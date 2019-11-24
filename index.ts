import { Element, HTMLElement, FCElement } from './lib/Element';
import { FC, ElementChildren } from './lib/types';
import IntrinsicElements from './lib/JSX/IntrinsicElements';
import { IntrinsicElements as HTMLTags } from './lib/constants/JSX';

function run<P extends {}>(
  type: keyof IntrinsicElements,
  props?: P | null,
  ...children: ElementChildren
): HTMLElement<P>;
function run<P extends {}>(
  type: FC<P>,
  props?: P | null,
  ...children: ElementChildren
): FCElement<P>
function run<P extends {}>(
  type: keyof IntrinsicElements | FC<P>,
  props?: P | null,
  ...children: ElementChildren
): Element<P> {
  if (typeIsString(type)) {
    if (!HTMLTags.includes(type)) {
      throw new InvalidElementError(`${type} is not a valid element.`);
    }

    return new HTMLElement(type, props, ...children);
  } else if (typeIsComponent(type)) {
    return new FCElement(type, props, ...children);
  } else {
    throw new InvalidElementError('type must be a string or Function Component');
  }
}

function typeIsString<P>(identifier: string | FC<P>): identifier is string {
  return typeof identifier === 'string';
}

function typeIsComponent<P>(identifier: string | FC<P>): identifier is FC<P> {
  if (typeof identifier === 'function') {
    return true;
  }

  return false;
}


export default {
  run,
}

export class InvalidElementError extends Error { }
