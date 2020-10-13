module.exports = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    ctx.status = error.status || 403
    ctx.body = {
      message: error.message
    }
  }
}