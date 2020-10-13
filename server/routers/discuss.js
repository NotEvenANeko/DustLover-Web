const Router = require('koa-router')
const DiscussController = require('../controllers/discuss')

const router = new Router({ prefix: '/discuss' })

router.post('/', DiscussController.create)
      .delete('/comment/:commentId', DiscussController.deleteComment)
      .delete('/reply/:replyId', DiscussController.deleteReply)

module.exports = router