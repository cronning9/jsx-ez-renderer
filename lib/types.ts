import { Element } from './Element';

export type ElementChildren = (string | number | boolean | Element<any> | null)[];
export type PropsWithChildren<P> = P & { children?: ElementChildren };
export type PropsWithRequiredChildren<P> = P & { children: ElementChildren };
export type PropsWithoutChildren<P> = Omit<P, 'children'>;

export interface FC<P = {}> {
  (props: PropsWithChildren<P>): Element<P>;
}
