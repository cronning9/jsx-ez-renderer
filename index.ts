import { IntrinsicElements } from './lib/constants/JSX';

interface RunProps {
  [key: string]: string;
}



/**
 * When reading JSX input, the properly-configured TypeScript compiler
 * will output calls to this function, passing JSX arguments to the proper position.
 * 
 * This function should output a string of valid HTML.
 */
// TODO: figure out how to type a component identifier
const run = (type: string, props: RunProps | null, children: any): string => {
  if (!IntrinsicElements.includes(type)) {
    throw new Error(`{type} is not a valid JSX element.`);
  }

  return `<${type}></${type}>`;
}

export default {
  run,
}
