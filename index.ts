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
  return 'test';
}

export default {
  run,
}
