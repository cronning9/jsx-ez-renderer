interface RunProps {
  [key: string]: string;
}

export default class JSXEngine {
  /**
   * The set of compiler steps that will run on input.
   * 
   * TODO: think about different ways we can chain steps, 
   * considering the principle of extensibility. Ideally,
   * I would like to avoid needing to write code in the main run method
   * each time I create a new step.
   */
  private steps: (() => {})[];

  constructor(steps: (() => {})[]) {
    this.steps = steps;
  }

  /**
   * This takes some JSX as input, and outputs valid HTML.
   * Ideally this is the step in the transpile chain after
   * TSX files have been handled.
   * 
   * TODO: make it actually do this
   * 
   * TODO: refine the return type. It might just be a string,
   * but we may also be able to specify that it abides by certain principles.
   * 
   * @param input
   */
  // TODO: figure out how to type a component identifier
  public run = (type: string | {}, props: RunProps | null, children: any): string => {
    return 'test';
  }

  public noop = (input: string): string => input;
}