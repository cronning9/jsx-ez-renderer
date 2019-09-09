import { IntrinsicElements } from './lib/constants/JSX';
import JSXElement from './lib/JSXElement';

export interface RunProps {
  [key: string]: string;
}

interface JSXFactoryRun {
  /** So, the third element is expecting a potential array of FactoryRun....
    * the problem is that what we're actually getting in not the function itself,
    * but the result of it's invocation -- ie, a string.
    * But we don't actually want to just accept any old string -- We need to be able 
    * to check for the proper kind of input. 
    * At a bare minimum, we need to ensure that it's a string that was specifically returned
    * from a FactoryRun. 
    * Later, we can start thinking about whether or not we want to check for valid HTML in the string.
    * That would not be a TypeScript issue, regardless.
    */
  (type: string, props: RunProps | null, ...children: Children): JSXElement;
}

type Children = (JSXElement | null)[];

/**
 * When reading JSX input, the properly-configured TypeScript compiler
 * will output calls to this function, passing JSX arguments to the proper position.
 * 
 * This function should output a JSXElement that outputs valid and accurate HTML.
 */
// TODO: figure out how to type a component identifier
const run: JSXFactoryRun = (type: string, props: RunProps | null, ...children: Children): JSXElement => {
  if (!IntrinsicElements.includes(type)) {
    throw new Error(`{type} is not a valid JSX element.`);
  }

  if (!!children && children.length > 0) {
    // TODO: handle each child.
  }

  return new JSXElement(type, props);
}

export default {
  run,
}
