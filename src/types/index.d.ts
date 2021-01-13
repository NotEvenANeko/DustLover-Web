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

interface UserDataAbbr {
  uid: number,
  username: string,
  avatar: string
}

interface CommentReturnData {
  id: number,
  content: string,
  createdAt: string,
  replies: {
    id: number,
    content: string,
    createdAt: string,
    userId?: number,
    user: UserDataAbbr[]
  },
  user: UserDataAbbr[]
}

interface ArticleReturnData {
  createdAt: string,
  updatedAt: string,
  id: number,
  title: string,
  content: string,
  viewCnt: number,
  tags: {
    name: string
  }[],
  categories: {
    name: string
  }[],
  comments: CommentReturnData[]
}

interface QuestionReturnData {
  createdAt: string,
  content: string,
  id: number,
  answer: null | {
    createdAt: string,
    content: string,
    id: number
  }
}

type ReturnData = QuestionReturnData | CommentReturnData | ArticleReturnData
interface ReturnMuiData {
  count: number,
  rows: ReturnData[]
}
type ReturnRawData = ReturnMuiData & ReturnData
type DataState = ReturnData | ReturnData[]

type MainRouter = Array<RouterObj>