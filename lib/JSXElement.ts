import { RunProps } from "../index";

export type JSXChildren = [string] | (JSXElement | null)[];

/**
 * In order to accept nested children as a run parameter,
 * we need to return some container type, rather than just
 * a completed HTML string.
 *
 * This will contain a variety of data about the input,
 * as well as likely various utility functions.
 */
export default class JSXElement {
  public type: string;
  public props: RunProps | null;
  public children: JSXChildren;

  constructor(type: string, props: RunProps | null, ...children: JSXChildren) {
    this.type = type;
    this.props = props;
    this.children = children;
  }

  get htmlString(): string {
    let renderedChildren: string;
    if (Array.isArray(this.children) && this.children[0] instanceof JSXElement) {
      renderedChildren = (this.children as (JSXElement)[])
        .map((c: JSXElement) => c.htmlString)
        .join('');
    } else if (
      Array.isArray(this.children) &&
      this.children.length === 1 &&
      typeof this.children[0] === 'string'
    ) {
      renderedChildren = this.children[0];
    } else {
      renderedChildren = '';
    }

    return `<${this.type}>${renderedChildren}</${this.type}>`;
  }
}
