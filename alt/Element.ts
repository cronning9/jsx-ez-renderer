import IntrinsicElements from '../lib/JSX/IntrinsicElements';
import { ElementChildren, PropsWithChildren, FC } from './types';

export interface Element<P = any, T extends string | FC<any> = string | FC> {
  type: T;
  props: P;
}

export class HTMLElement<P extends {}> implements Element {
  public type: keyof IntrinsicElements;
  public props: PropsWithChildren<P>;

  constructor(type: keyof IntrinsicElements, props: P, ...children: ElementChildren) {
    this.type = type;
    this.props = { ...props, children };
  }
}

export class FCElement<P> implements Element {
  public type: FC;
  public props: PropsWithChildren<P>;

  // TODO: check for vulnerabilities after compilation. Is children constrained to be an Array?
  constructor(type: FC, props: PropsWithChildren<P>, ...children: ElementChildren) {
    this.type = type;
    if (props.children && !Array.isArray(props.children)) {
      throw new Error('prop `children` must be an array');
    }

    if (children && props.children) {
      throw new Error('cannot receive both children and props.children');
    }

    this.props = props.children ? props : { ...props, children };
  }
}
