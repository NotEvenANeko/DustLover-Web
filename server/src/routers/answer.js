const Router = require('koa-router')
const AnswerController = require('../controllers/answer')

const router = new Router({ prefix: '/question/answer' })

router.post('/', AnswerController.createAnswer)
      .delete('/:id', AnswerController.deleteAnswer)
      .put('/:id', AnswerController.updateAnswer)
      .get('/', AnswerController.getAnswerList)

module.exports = router