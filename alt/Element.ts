import IntrinsicElements from '../lib/JSX/IntrinsicElements';
import { ElementChildren, PropsWithChildren, FC, PropsWithRequiredChildren } from './types';
import { extractChildren } from '../util/extractField';

export interface Element<P = any, T extends string | FC<any> = string | FC<any>> {
  type: T;
  props: Omit<P, 'children'> | null;
  children: ElementChildren | null;
  htmlString: string;
}

abstract class AbstractElement<P, T> {
  public type: T;
  public props: Omit<P, 'children'> | null; // that type is a little convoluted...
  public children: ElementChildren | null;

  constructor(type: T, props?: PropsWithChildren<P> | null, ...children: ElementChildren) {
    this.type = type;
    if (props && props.children && !Array.isArray(props.children)) {
      throw new Error('prop `children` must be an array');
    }

    if (children && props && props.children) {
      throw new Error('cannot receive both children and props.children');
    }

    if (props) {
      if (propsHasChildren(props)) {
        const [propsCopy, c] = extractChildren(props);
        this.props = propsCopy;
        this.children = c;
      } else {
        this.props = props;
        this.children = null;
      }
    }

    if (children && children.length > 0 && children[0] !== null) {
      this.props = null;
      this.children = children;
    }

    throw new Error('Something went wrong.');
  }

  get htmlString(): string {
    let renderedChildren: string;
    if (this.props && this.children && childrenAreElements(this.children)) {
      renderedChildren = this.children
        .map(c => c.htmlString)
        .join('');
    } else if (this.props && this.children && childrenContainsStringOutput(this.children)) {
      renderedChildren = '';
      // TODO: refactor to use ternary operator
      for (const child of this.children) {
        if (child instanceof HTMLElement || child instanceof FCElement) {
          renderedChildren += child.htmlString;
        } else {
          renderedChildren += child;
        }
      }
    } else {
      renderedChildren = '';
    }

    const propString = this.getHtmlAttributes();
    const tag = propString ? `${this.type}${propString}` : this.type;
    return `<${tag}>${renderedChildren}</${this.type}>`;
  }

  private getHtmlAttributes() {
    if (this.props === null || Object.entries(this.props as P).length < 1) {
      return null;
    }
    // TODO: add type safety so that value is not any.
    return Object.entries(this.props as P)
      .reduce((attributes, [key, value]) => {
        if (key === 'className') key = 'class';
        return attributes + ` ${key}="${String(value)}"`
      }, '');
  }
}

export class HTMLElement<P extends {}> extends AbstractElement<P, keyof IntrinsicElements> implements Element { }

export class FCElement<P extends {}> extends AbstractElement<P, FC<P>> implements Element<P> { }

function childrenAreElements<P>(children: ElementChildren): children is Element<P>[] {
  for (const child of children) {
    if (!(child instanceof HTMLElement || child instanceof FCElement)) {
      return false;
    }
  }

  return true;
}

/**
 * Note: non-string values that resolve to string output will count as Strings for our purposes
 * TODO: refactor and clarify exactly what we're doing here, and why. Possibly rewrite type definition 
 * and abstract JSXElement case into some other thing?
 */
function childrenContainsStringOutput(children: ElementChildren): children is (string | number | boolean | Element)[] {
  for (const child of children) {
    if (typeof child === 'string' || typeof child === 'number' || typeof child === 'boolean') {
      return true;
    }
  }

  return false;
}

function propsHasChildren<P>(props: PropsWithChildren<P>): props is PropsWithRequiredChildren<P> {
  return !!props.children && props.children.length > 0;
}