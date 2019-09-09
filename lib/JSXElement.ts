import { RunProps } from '../index';

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

  constructor(type: string, props: RunProps | null) {
    this.type = type;
    this.props = props;
  }

  get htmlString(): string {
    return (
      `<${this.type}></${this.type}>`
    )
  }
}
