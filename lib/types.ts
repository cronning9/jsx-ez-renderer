import DeprecatedElement from "../alt/DeprecatedElement";

export namespace JSX {
  export interface FC<P = {}> {
    (props?: P): IElement<P>;
  }

  export interface PropType {
    [key: string]: string | number | boolean;
  }
}

// export type Props<P> = P extends JSX.PropType ? P : null;
