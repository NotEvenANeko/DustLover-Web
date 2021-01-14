const Koa = require('koa')

/**
 * 
 * @param {Koa.Context} ctx 
 * @param {Koa.Next} next 
 */
module.exports = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    console.log(error)
    ctx.status = error.status || 403
    ctx.body = {
      message: error.message
    }
  }
}