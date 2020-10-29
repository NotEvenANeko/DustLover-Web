const Router = require('koa-router')
const QuestionController = require('../controllers/question')

const router = new Router({ prefix: '/question' })

router.get('/:id', QuestionController.findQuestion)
      .get('/', QuestionController.getQuestionList)
      .post('/', QuestionController.createQuestion)
      .delete('/:id', QuestionController.deleteQuestion)

module.exports = router