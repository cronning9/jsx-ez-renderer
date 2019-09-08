interface RunProps {
  [key: string]: string;
}

export default class JSXEngine {
  /**
   * When reading JSX input, the properly-configured TypeScript compiler
   * will output calls to this function, passing JSX arguments to the proper position.
   * 
   * This function should output a string of valid HTML.
   */
  // TODO: figure out how to type a component identifier
  public static run = (type: string, props: RunProps | null, children: any): string => {
    return 'test';
  }
}