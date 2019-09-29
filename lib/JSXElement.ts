import { RunProps } from '../index';

export type JSXChildren = (JSXElement | null)[];

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
    let renderedChildren = !!this.children ?
      this.children
        .filter(c => c !== null)
        .map(c => (c as JSXElement).htmlString)
        .join('') :
      null;

    return (
      `<${this.type}>${renderedChildren}</${this.type}>`
    )
  }
}
