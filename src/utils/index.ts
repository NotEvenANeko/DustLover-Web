import marked from 'marked'
import xss, { whiteList } from 'xss'

import { getLocalStorage, getSessionStorage, saveLocalStorage } from './storage'

const colorList = [
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple'
]

export const compileMarkdown = (mdText: string) => {
  const tokenizer = {
    escape(src: string) {
      const match = src.match(/^\\([!"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~])/)
      if(match) {
        return {
          type: 'escape',
          raw: match[0],
          text: match[1].trim()
        }
      }
      //return false
    },
    br(src: string) {
      const match = src.match(/^( {2,}|)\n(?!\s*$)/)
      if(match) {
        return {
          type: 'br',
          raw: match[0],
          text: match[1].trim()
        }
      }
    }
  }
  marked.use({ tokenizer })
  const tmp = marked(mdText || '', {   
    gfm: true,
    smartLists: true,
    breaks: true,
    smartypants: true
  })
  return xss(tmp, {
    whiteList: {
      code: [],
      ...whiteList
    }
  })
}

export const decodeQuery = (url: string): any => {
  
  const params: LooseObj = {}
  const paramsStr = url.replace(/\.*\?/, '')
  paramsStr.split('&').forEach(v => {
    const d = v.split('=')
    if(d[1] && d[0]) params[d[0]] = d[1]
  })
  return params
}

export const getColorList = (list: Array<any>): Array<any> => {
  const _list = [...list]
  _list.forEach((item, index) => {
    item.color = colorList[index] || colorList[Math.floor(Math.random() * colorList.length)]
  })
  return _list
}

export const getAccessToken = () => {
  let token = ''
  const userInfo = getSessionStorage('userInfo')

  if(userInfo && userInfo.accessToken) {
    token = 'Bearer ' + userInfo.accessToken
  }

  return token
}

export const calcComment = (commentList: Array<LooseObj>)=> {
  let cnt = commentList.length
  commentList.forEach(item => {
    cnt += item.replies.length
  })
  return cnt
}

export const getRefreshToken = () => {
  let token = ''
  const userInfo = getLocalStorage('userInfo')

  if(userInfo && userInfo.refreshToken) {
    token = 'Bearer ' + userInfo.refreshToken
  }

  return token
}