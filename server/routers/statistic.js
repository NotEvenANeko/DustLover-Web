const Router = require('koa-router')

const BrowserOSController = require('../controllers/browser_os')
const ResolutionController = require('../controllers/resolution')

const router = new Router({ prefix: '/statistic' })

router.get('/browser', BrowserOSController.getBrowserList)
      .get('/os', BrowserOSController.getOSList)
      .post('/client', BrowserOSController.addRecord)
      .get('/resolution', ResolutionController.getList)
      .post('/resolution', ResolutionController.addRecord)

module.exports = router