const Router = require('koa-router')
const UserController = require('../controllers/user')

const router = new Router({ prefix: '/account' })

router.post('/login', UserController.login)
      .post('/register', UserController.register)
      .get('/user', UserController.getUserList)
      .get('/:id', UserController.getUserInfo)
      .delete('/:id', UserController.deleteUser)
      .put('/:id', UserController.updateUserInfo)
      .put('/password/:id', UserController.changeUserPasswd)

module.exports = router