const Router = require('koa-router')
const TagController = require('../controllers/tag')

const router = new Router()

router.get('/tag', TagController.getTagList)
      .get('/category', TagController.getCategoryList)

module.exports = router