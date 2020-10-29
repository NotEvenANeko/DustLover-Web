const Router = require('koa-router')

const FriendLinkController = require('../controllers/friendlink')

const router = new Router({ prefix: '/friend' })

router.get('/', FriendLinkController.getFriendLinkList)
      .delete('/:linkId', FriendLinkController.deleteFriendLink)
      .post('/', FriendLinkController.addFriendLink)
      .put('/', FriendLinkController.updateFriendLink)

module.exports = router