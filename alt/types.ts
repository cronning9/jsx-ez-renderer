import { Element } from './Element';

export type ElementChildren = (string | number | boolean | Element<any> | null)[];
export type PropsWithChildren<P> = P & { children?: ElementChildren };

export interface FC<P = {}> {
  (props: PropsWithChildren<P>): Element<P>;
}
