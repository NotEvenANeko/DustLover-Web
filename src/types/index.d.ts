declare module 'marked';

interface LooseObj {
  [key: string]: any
}

interface JSXFunction {
  (props: LooseObj): JSX.Element
}

interface RouterObj {
  path: string,
  name?: string,
  component: JSXFunction,
  childRoutes?: MainRouter
}

type MainRouter = Array<RouterObj>