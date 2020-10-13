const Router = require('koa-router')
const { refreshAccessToken } = require('../utils/token')

const router = new Router({ prefix: '/token' })

router.get('/refresh', refreshAccessToken)

module.exports = router