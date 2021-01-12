const { checkAccessToken } = require('../utils/token')
const Koa = require('koa')

const verifyList0 = [

]

const verifyList1 = [
  { regex: /\/question\/answer/, required: 'post, put, delete' },
  { regex: /\/question/, required: 'put, delete' },
  { regex: /\/account\/user/, required: 'all'},
  { regex: /\/account/, required: 'delete' },
  { regex: /\/statistic/, required: 'get'},
  { regex: /\/article/, required: 'put, delete, post' },
  { regex: /\/friend/, required: 'put, delete, put' }
]

const verifyList2 = [
  { regex: /\/account/, required: 'put' },
  { regex: /\question/, required: 'get' },
  { regex: /\/avatar/, required: 'push, delete'},
  { regex: /\/discuss/, required: 'post, delete'}
]

/**
 * 
 * @param {Koa.Context} ctx 
 */
const checkAuth = ctx => {

  const { method, url } = ctx
  const params = JSON.parse(JSON.stringify(ctx.query || ctx.params))
  const verify = verifyList => {
    const target = verifyList.find(verify => {
      return verify.regex.test(url) && (verify.required === 'all' || verify.required.toUpperCase().includes(method))
    })

    return target
  }

  const roleList = []

  const result0 = verify(verifyList0)
  const result1 = verify(verifyList1)
  const result2 = verify(verifyList2)

  if(result0) roleList.push({ url, params, role: 0, method })
  if(result1) roleList.push({ url, params, role: 1, method })
  if(result2) roleList.push({ url, params, role: 2, method })

  return roleList
}

/**
 * 
 * @param {Koa.Context} ctx 
 * @param {Koa.Next} next 
 */
module.exports = async (ctx, next) => {

  const roleList = []//checkAuth(ctx)

  if(roleList.length >= 1) {
    //console.log(await checkAccessToken(ctx, roleList))
    await checkAccessToken(ctx, roleList)
          .then(() => {return next()})
          .catch(err => {
            ctx.throw(401, err)})

  } else {
    await next()
  }

}