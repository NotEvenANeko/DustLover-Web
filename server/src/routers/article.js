const Router = require('koa-router')
const ArticleController = require('../controllers/article')

const router = new Router({ prefix: '/article' })

router.post('/', ArticleController.create)
      .get('/list', ArticleController.getList)
      .get('/:id', ArticleController.findById)
      .post('/upload', ArticleController.upload)
      .post('/checkExist', ArticleController.checkExist)
      .post('/upload/confirm', ArticleController.uploadConfirm)
      .put('/:id', ArticleController.update)
      .delete('/:id', ArticleController.delete)

module.exports = router