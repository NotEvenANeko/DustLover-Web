const Koa = require('koa')
const error = require('koa-json-error')
const cors = require('koa-cors')
const logger = require('koa-logger')
const koaBody = require('koa-body')

const routerLoader = require('./routers')
const { sequelize } = require('./models')
const authHandler = require('./middleware/authHandle')
const errorHandler = require('./middleware/errorHandle')

const app = new Koa()

app.use(cors())
   .use(logger())
   .use(error({
     postFormat: ((e, { stack, ...rest }) => rest)
   }))
   .use(koaBody({
     multipart: true,
     formidable: {
       keepExtensions: true,
       maxFileSize: 200 * 1024 * 1024
     }
   }))

app.use(errorHandler)
app.use(authHandler)

routerLoader(app)

app.listen(6060, () => {
  sequelize
    .sync({ force: false })
    .then(() => {
      console.log('Server listening on localhost:6060')
    })
    .catch(err => {
      console.error(err)
    })
})