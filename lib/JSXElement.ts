export type JSXChildren = (string | number | boolean | JSXElement<unknown> | null)[];
/**
 * The main type of output generated by JSXEngine.run.
 */
export default class JSXElement<P> {
  public type: string | JSXElement<P>;
  public props: P | null;
  public children: JSXChildren;

  constructor(type: string | JSXElement<P>, props: P | null, ...children: JSXChildren) {
    this.type = type;
    this.props = props;
    this.children = children;
  }

  get htmlString(): string {
    let renderedChildren: string;
    if (childrenAreElements(this.children)) {
      renderedChildren = this.children
        .map(c => c.htmlString)
        .join('');
    } else if (childrenContainsStringOutput(this.children)) {
      renderedChildren = '';
      for (const child of this.children) {
        if (child instanceof JSXElement) {
          renderedChildren += child.htmlString;
        } else {
          renderedChildren += child;
        }
      }
    } else {
      renderedChildren = '';
    }

    return `<${this.type}>${renderedChildren}</${this.type}>`;
  }
}

function childrenAreElements<P>(children: JSXChildren): children is JSXElement<P>[] {
  for (const child of children) {
    if (!(child instanceof JSXElement)) {
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
function childrenContainsStringOutput(children: JSXChildren): children is (string | number | boolean | JSXElement)[] {
  for (const child of children) {
    if (typeof child === 'string' || typeof child === 'number' || typeof child === 'boolean') {
      return true;
    }
  }

  return false;
}
