const Router = require('koa-router')

const AvatarController = require('../controllers/avatar')

const router = new Router({ prefix: '/avatar' })

router.post('/:id', AvatarController.uploadAvatar)
      .get('/:id', AvatarController.getAvatar)

module.exports = router