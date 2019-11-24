import { PropsWithRequiredChildren, ElementChildren } from '../alt/types';

export function extractField<T extends {}, K extends keyof T>(
  obj: T,
  key: K,
): [Omit<T, K>, T[K]] {
  const field = obj[key];
  const target = Object.assign({}, ...Object.entries(obj)
    .filter(([k, _]) => k !== key)
    .map(([k, v]) => ({ [k]: v })));

  return [target, field];
}

export function extractChildren<P extends {}>(
  props: PropsWithRequiredChildren<P>
): [Omit<P, 'children'>, ElementChildren] {
  const target = Object.assign({}, ...Object.entries(props)
    .filter(([k, _]) => k !== 'children')
    .map(([k, v]: [string, any]) => ({ [k]: v })));

  return [target, props.children];
}